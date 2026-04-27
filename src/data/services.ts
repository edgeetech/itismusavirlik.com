import { useMemo } from 'react'
import { useLocale } from '../i18n/useLocale'

export type Service = {
  id: string
  title: string
  shortDescription: string
  image: string
  imageAlt: string
  iconClass?: string
  details?: string[]
}

const serviceMeta = [
  {
    id: 'accounting',
    image: '/img/service-accounting.svg',
    iconClass: 'fa-briefcase',
  },
  {
    id: 'tax-advisory',
    image: '/img/service-tax.svg',
    iconClass: 'fa-question',
  },
  {
    id: 'incorporation',
    image: '/img/service-incorporation.svg',
    iconClass: 'fa-envelope-square',
  },
  {
    id: 'social-security',
    image: '/img/service-sgk.svg',
    iconClass: 'fa-user-secret',
  },
] as const

type ServiceTranslation = {
  title: string
  shortDescription: string
  imageAlt: string
  details: string[]
}

export function useServices() {
  const { t } = useLocale()

  return useMemo(() => {
    const items = t('services.items', {
      returnObjects: true,
    }) as Record<(typeof serviceMeta)[number]['id'], ServiceTranslation>

    return serviceMeta.map((service) => ({
      ...service,
      title: items[service.id].title,
      shortDescription: items[service.id].shortDescription,
      imageAlt: items[service.id].imageAlt,
      details: items[service.id].details,
    })) as Service[]
  }, [t])
}
