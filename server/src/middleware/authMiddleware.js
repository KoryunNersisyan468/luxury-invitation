import jwt from "jsonwebtoken";
import { prisma } from "../db/prisma.js";
import { appConfig } from "../config/index.js";
import { AppError } from "../utils/appError.js";

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return next(AppError.localized("error.unauthorized", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, appConfig.jwtSecret);
    const user = await prisma.user.findUnique({ where: { id: payload.id } });

    if (!user) {
      return next(AppError.localized("auth.userNotFound", 401));
    }

    req.user = { id: user.id, email: user.email, role: user.role };
    next();
  } catch (error) {
    return next(AppError.localized("error.invalidToken", 401));
  }
};

export const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "ADMIN") {
    return next(AppError.localized("error.forbidden", 403));
  }

  next();
};
