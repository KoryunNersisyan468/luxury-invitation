import { translate } from "../i18n/index.js";

export class AppError extends Error {
  /**
   * @param {string} message  Human-readable fallback (English).
   * @param {number} statusCode
   * @param {{ translationKey?: string, translationParams?: object }} [options]
   */
  constructor(message, statusCode = 500, options = {}) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    this.translationKey = options.translationKey;
    this.translationParams = options.translationParams;
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Build an error whose message is resolved from the i18n catalog at
   * response time using the request language.
   */
  static localized(translationKey, statusCode = 400, translationParams) {
    const fallback = translate(translationKey, "en", translationParams);
    return new AppError(fallback, statusCode, { translationKey, translationParams });
  }
}
