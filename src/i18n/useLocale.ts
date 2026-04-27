import { useMemo } from 'react'
import i18n from '../i18n'
import { useCurrentLanguage } from './routing'

export function useLocale() {
  const language = useCurrentLanguage()
  const t = useMemo(() => i18n.getFixedT(language), [language])

  return {
    language,
    t,
  }
}
