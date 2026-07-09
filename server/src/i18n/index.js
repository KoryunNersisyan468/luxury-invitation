import { messages, SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from "./messages.js";

export { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE };

/**
 * Resolve the best supported language from a request.
 * Priority: explicit ?lang / x-lang header, then Accept-Language, then default.
 */
export const resolveLanguage = (req) => {
  const explicit =
    (req.query && req.query.lang) ||
    (req.headers && (req.headers["x-lang"] || req.headers["x-language"]));
  if (explicit && SUPPORTED_LANGUAGES.includes(String(explicit).toLowerCase())) {
    return String(explicit).toLowerCase();
  }

  const header = req.headers && req.headers["accept-language"];
  if (header) {
    // e.g. "hy-AM,hy;q=0.9,en;q=0.8" -> ["hy", "en"]
    const ranked = String(header)
      .split(",")
      .map((part) => part.split(";")[0].trim().slice(0, 2).toLowerCase())
      .filter(Boolean);
    const match = ranked.find((lang) => SUPPORTED_LANGUAGES.includes(lang));
    if (match) return match;
  }

  return DEFAULT_LANGUAGE;
};

const interpolate = (template, params) =>
  template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key) =>
    params && params[key] != null ? String(params[key]) : "",
  );

/**
 * Translate a message key for the given language, with {{param}} interpolation.
 * Falls back to English, then to the raw key so nothing ever renders blank.
 */
export const translate = (key, lang = DEFAULT_LANGUAGE, params) => {
  const language = SUPPORTED_LANGUAGES.includes(lang) ? lang : DEFAULT_LANGUAGE;
  const template =
    (messages[language] && messages[language][key]) ||
    (messages[DEFAULT_LANGUAGE] && messages[DEFAULT_LANGUAGE][key]) ||
    key;
  return interpolate(template, params);
};
