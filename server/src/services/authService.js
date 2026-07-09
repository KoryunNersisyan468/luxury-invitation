import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { OAuth2Client } from "google-auth-library";
import { prisma } from "../db/prisma.js";
import { appConfig } from "../config/index.js";
import { AppError } from "../utils/appError.js";
import { sendPasswordResetEmail } from "./emailService.js";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const signToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, appConfig.jwtSecret, {
    expiresIn: appConfig.jwtExpiresIn,
  });
};

export const registerUser = async ({ email, password }) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw AppError.localized("auth.emailInUse", 409);
  }

  const hasAdmin = await prisma.user.count({ where: { role: "ADMIN" } });
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: hasAdmin ? "USER" : "ADMIN",
      isEmailVerified: false,
    },
  });

  const token = signToken(user);
  return { token, user: { id: user.id, email: user.email, role: user.role } };
};

export const authenticateUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.password) {
    throw AppError.localized("auth.invalidCredentials", 401);
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw AppError.localized("auth.invalidCredentials", 401);
  }

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, appConfig.jwtSecret, {
    expiresIn: appConfig.jwtExpiresIn,
  });

  return { token, user: { id: user.id, email: user.email, role: user.role } };
};

export const getUserProfile = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, role: true, isEmailVerified: true, createdAt: true, updatedAt: true },
  });
  return user;
};

export const googleOAuth = async (idToken) => {
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload.email;
    const name = payload.name;

    if (!email) {
      throw new Error("Google token does not contain email");
    }

    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      // Create new user from Google data
      const hasAdmin = await prisma.user.count({ where: { role: "ADMIN" } });
      user = await prisma.user.create({
        data: {
          email,
          password: "", // OAuth users don't have passwords
          role: hasAdmin ? "USER" : "ADMIN",
          isEmailVerified: true, // Google-verified
        },
      });
    } else if (!user.isEmailVerified) {
      // Mark as verified if logging in via Google
      user = await prisma.user.update({
        where: { id: user.id },
        data: { isEmailVerified: true },
      });
    }

    const token = signToken(user);
    return { token, user: { id: user.id, email: user.email, role: user.role, isEmailVerified: user.isEmailVerified } };
  } catch (error) {
    throw new Error(`Google OAuth failed: ${error.message}`);
  }
};

export const facebookOAuth = async (accessToken) => {
  try {
    // Fetch user info from Facebook
    const response = await fetch(
      `https://graph.facebook.com/me?fields=id,name,email&access_token=${accessToken}`
    );
    
    if (!response.ok) {
      throw new Error("Invalid Facebook access token");
    }

    const facebookUser = await response.json();
    const { email, name } = facebookUser;

    if (!email) {
      throw new Error("Facebook profile does not have a public email");
    }

    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      // Create new user from Facebook data
      const hasAdmin = await prisma.user.count({ where: { role: "ADMIN" } });
      user = await prisma.user.create({
        data: {
          email,
          password: "", // OAuth users don't have passwords
          role: hasAdmin ? "USER" : "ADMIN",
          isEmailVerified: true, // Facebook-verified
        },
      });
    } else if (!user.isEmailVerified) {
      // Mark as verified if logging in via Facebook
      user = await prisma.user.update({
        where: { id: user.id },
        data: { isEmailVerified: true },
      });
    }

    const token = signToken(user);
    return { token, user: { id: user.id, email: user.email, role: user.role, isEmailVerified: user.isEmailVerified } };
  } catch (error) {
    throw new Error(`Facebook OAuth failed: ${error.message}`);
  }
};

const hashToken = (rawToken) => crypto.createHash("sha256").update(rawToken).digest("hex");

/**
 * Begin a password reset. Always resolves without revealing whether the email
 * exists (enumeration-safe). When the account exists and has a password, a
 * single-use, time-limited token is generated and emailed.
 */
export const requestPasswordReset = async ({ email, lang }) => {
  const user = await prisma.user.findUnique({ where: { email } });

  // Silently succeed for unknown or social-login-only accounts.
  if (!user || !user.password) {
    return { delivered: false };
  }

  // Invalidate any outstanding tokens for this user before issuing a new one.
  await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } });

  const rawToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = hashToken(rawToken);
  const expiresAt = new Date(Date.now() + appConfig.passwordReset.ttlMinutes * 60 * 1000);

  await prisma.passwordResetToken.create({
    data: { userId: user.id, tokenHash, expiresAt },
  });

  const resetUrl = `${appConfig.clientUrl}/reset-password?token=${rawToken}`;
  await sendPasswordResetEmail({ to: user.email, resetUrl, lang });

  return { delivered: true };
};

/**
 * Complete a password reset using a raw token. Validates that the token exists,
 * is unused and unexpired, then updates the password and consumes the token.
 */
export const resetPassword = async ({ token, password }) => {
  const tokenHash = hashToken(token);
  const record = await prisma.passwordResetToken.findUnique({ where: { tokenHash } });

  if (!record || record.usedAt || record.expiresAt < new Date()) {
    throw AppError.localized("auth.resetTokenInvalid", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.$transaction([
    prisma.user.update({ where: { id: record.userId }, data: { password: hashedPassword } }),
    prisma.passwordResetToken.deleteMany({ where: { userId: record.userId } }),
  ]);

  return { success: true };
};
