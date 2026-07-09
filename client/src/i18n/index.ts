import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { en } from './locales/en'
import { ru } from './locales/ru'
import { hy } from './locales/hy'

export const SUPPORTED_LANGUAGES = ['en', 'ru', 'hy'] as const
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]

export const LANGUAGE_STORAGE_KEY = 'belleame.lang'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en, ru, hy },
    fallbackLng: 'en',
    supportedLngs: SUPPORTED_LANGUAGES as unknown as string[],
    nonExplicitSupportedLngs: true, // treat "hy-AM" as "hy"
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: LANGUAGE_STORAGE_KEY,
      caches: ['localStorage'],
    },
  })

// Keep <html lang> in sync for accessibility and correct font rendering.
const applyHtmlLang = (lng: string) => {
  document.documentElement.lang = lng
}
applyHtmlLang(i18n.resolvedLanguage ?? 'en')
i18n.on('languageChanged', applyHtmlLang)

export default i18n
