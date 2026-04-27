import { useMemo } from 'react'
import { useLocale } from '../i18n/useLocale'

const siteConfig = {
  url: 'https://itismusavirlik.com',
  phoneNumbers: ['(0312) 431 75 66', '(0312) 431 89 74'],
  email: 'info@itismusavirlik.com',
  foundedYear: '1983',
  social: {
    facebook: 'https://www.facebook.com/itismalimusavirlik/',
    linkedin: 'https://www.linkedin.com/in/hasan-kemal-iti%C5%9Fken-6623b288/',
  },
  images: {
    logo: '/img/logo-banner.jpeg',
    hero: '/img/foto2.jpg',
    about: '/img/slide2-dark.jpg',
    whyUs: '/img/foto3.jpg',
    og: '/img/logo-banner.jpeg',
  },
} as const

type SiteTranslation = {
  name: string
  legalName: string
  title: string
  city: string
  description: string
  address: string
  keywords: string[]
}

export function useSite() {
  const { t } = useLocale()

  return useMemo(
    () =>
      ({
        ...siteConfig,
        ...(t('site', { returnObjects: true }) as SiteTranslation),
      }) as typeof siteConfig & SiteTranslation,
    [t],
  )
}
