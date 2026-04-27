import { useMemo } from 'react'
import { useLocale } from '../i18n/useLocale'

const historyMeta = [
  {
    id: 'officeMoveMutlukent',
    year: '2020',
    side: 'right' as const,
    icon: 'fa-building',
  },
  {
    id: 'websiteLaunch',
    year: '2018',
    side: 'left' as const,
    icon: 'fa-globe',
  },
  {
    id: 'westGateMove',
    year: '2017',
    side: 'right' as const,
    icon: 'fa-building',
  },
  {
    id: 'hasanSmmm',
    year: '2017',
    side: 'left' as const,
    icon: 'fa-certificate',
  },
  {
    id: 'kizilayMove',
    year: '1996',
    side: 'right' as const,
    icon: 'fa-building',
  },
] as const

type HistoryTranslation = {
  title: string
  description: string
}

export function useHistoryItems() {
  const { t } = useLocale()

  return useMemo(() => {
    const items = t('history.items', {
      returnObjects: true,
    }) as Record<(typeof historyMeta)[number]['id'], HistoryTranslation>

    return historyMeta.map((item) => ({
      year: item.year,
      side: item.side,
      icon: item.icon,
      title: items[item.id].title,
      description: items[item.id].description,
    }))
  }, [t])
}
