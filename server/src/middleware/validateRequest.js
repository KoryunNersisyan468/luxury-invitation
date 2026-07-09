import { ZodError } from "zod";
import { AppError } from "../utils/appError.js";
import { translate, DEFAULT_LANGUAGE } from "../i18n/index.js";

export const validateRequest = (schema, target = "body") => (req, res, next) => {
  try {
    const data = schema.parse(req[target]);
    req[target] = data;
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const lang = req.language || DEFAULT_LANGUAGE;
      // Zod message strings double as i18n keys (e.g. "validation.email").
      // Unknown keys fall back to their own text, so plain messages still work.
      const message = error.errors
        .map((err) => translate(err.message, lang))
        .join(", ");
      return next(new AppError(message, 400));
    }
    next(error);
  }
};
