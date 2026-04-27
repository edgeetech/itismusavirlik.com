import { useMemo } from 'react'
import { useLocale } from '../i18n/useLocale'

const galleryAssets = [
  { id: 'portfolio1', src: '/img/portfolio1.jpg' },
  { id: 'portfolio2', src: '/img/portfolio2.jpg' },
  { id: 'hasanOffice', src: '/img/hasanOfis.jpg' },
  { id: 'portfolio3', src: '/img/portfolio3.jpg' },
] as const

type GalleryTranslation = {
  alt: string
  caption: string
}

export function useGalleryItems() {
  const { t } = useLocale()

  return useMemo(() => {
    const items = t('gallery.items', {
      returnObjects: true,
    }) as Record<(typeof galleryAssets)[number]['id'], GalleryTranslation>

    return galleryAssets.map((item) => ({
      src: item.src,
      alt: items[item.id].alt,
      caption: items[item.id].caption,
    }))
  }, [t])
}
