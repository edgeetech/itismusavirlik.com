import { useEffect } from 'react'
import i18n, { languageStorageKey } from '../i18n'
import { useCurrentLanguage } from '../i18n/routing'

export function LanguageSync() {
  const language = useCurrentLanguage()

  useEffect(() => {
    void i18n.changeLanguage(language)

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(languageStorageKey, language)
    }
  }, [language])

  return null
}
