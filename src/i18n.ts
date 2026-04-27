import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { en } from './locales/en'
import { tr } from './locales/tr'

export const languageStorageKey = 'itismusavirlik-language'

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        tr: { translation: tr },
        en: { translation: en },
      },
      lng: 'tr',
      fallbackLng: 'tr',
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ['localStorage', 'navigator'],
        lookupLocalStorage: languageStorageKey,
        caches: ['localStorage'],
      },
      react: {
        useSuspense: false,
      },
    })
}

export default i18n
