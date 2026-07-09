import { resolveLanguage, translate } from "../i18n/index.js";

/**
 * Attaches the resolved request language and a bound translator to every
 * request so controllers/services can localize responses.
 */
export const languageMiddleware = (req, _res, next) => {
  req.language = resolveLanguage(req);
  req.t = (key, params) => translate(key, req.language, params);
  next();
};
