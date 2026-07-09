import { AppError } from "../utils/appError.js";
import { translate, DEFAULT_LANGUAGE } from "../i18n/index.js";

export const errorHandler = (err, req, res, next) => {
  const lang = req.language || DEFAULT_LANGUAGE;
  let error = err;

  if (err.name === "ValidationError" || err.name === "ZodError") {
    error = new AppError(err.message || "Validation failed", 400);
  }

  if (err.code === "P2002") {
    error = AppError.localized("error.duplicate", 409);
  }

  const statusCode = error.statusCode || 500;

  // Prefer a translation key when the error carries one; otherwise fall back to
  // the raw message (already localized upstream, or a plain string).
  const message = error.translationKey
    ? translate(error.translationKey, lang, error.translationParams)
    : error.message || translate("error.internal", lang);

  res.status(statusCode).json({
    status: error.status || "error",
    message,
  });
};
