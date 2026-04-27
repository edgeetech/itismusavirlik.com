import { useMemo } from 'react'
import { useLocale } from '../i18n/useLocale'

const statIcons = [
  { id: 'experience', icon: 'fa-clock' },
  { id: 'employees', icon: 'fa-users' },
  { id: 'sectors', icon: 'fa-building' },
  { id: 'clients', icon: 'fa-smile' },
] as const

type StatTranslation = {
  value: string
  label: string
}

export function useStats() {
  const { t } = useLocale()

  return useMemo(() => {
    const items = t('stats.items', {
      returnObjects: true,
    }) as Record<(typeof statIcons)[number]['id'], StatTranslation>

    return statIcons.map((stat) => ({
      icon: stat.icon,
      value: items[stat.id].value,
      label: items[stat.id].label,
    }))
  }, [t])
}
