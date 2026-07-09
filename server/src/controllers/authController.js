import { asyncHandler } from "../middleware/asyncHandler.js";
import {
  registerUser,
  authenticateUser,
  getUserProfile,
  googleOAuth,
  facebookOAuth,
  requestPasswordReset,
  resetPassword,
} from "../services/authService.js";
import { AppError } from "../utils/appError.js";

export const register = asyncHandler(async (req, res, next) => {
  const result = await registerUser(req.body);
  if (!result) {
    return next(new AppError("Registration failed", 400));
  }

  res.status(201).json({ status: "success", token: result.token, user: result.user });
});

export const login = asyncHandler(async (req, res) => {
  const { token, user } = await authenticateUser(req.body);
  res.json({ status: "success", token, user });
});

export const me = asyncHandler(async (req, res, next) => {
  const profile = await getUserProfile(req.user.id);
  if (!profile) {
    return next(new AppError("User not found", 404));
  }
  res.json({ status: "success", data: profile });
});

export const googleAuth = asyncHandler(async (req, res, next) => {
  const { idToken } = req.body;

  if (!idToken) {
    return next(AppError.localized("auth.googleTokenRequired", 400));
  }

  const { token, user } = await googleOAuth(idToken);
  res.json({ status: "success", token, user });
});

export const facebookAuth = asyncHandler(async (req, res, next) => {
  const { accessToken } = req.body;

  if (!accessToken) {
    return next(AppError.localized("auth.facebookTokenRequired", 400));
  }

  const { token, user } = await facebookOAuth(accessToken);
  res.json({ status: "success", token, user });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  await requestPasswordReset({ email: req.body.email, lang: req.language });
  // Always return the same generic message to avoid account enumeration.
  res.json({ status: "success", message: req.t("auth.resetEmailSent") });
});

export const resetPasswordController = asyncHandler(async (req, res) => {
  await resetPassword({ token: req.body.token, password: req.body.password });
  res.json({ status: "success", message: req.t("auth.resetSuccess") });
});
