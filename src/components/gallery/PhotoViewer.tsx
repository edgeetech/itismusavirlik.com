import { useEffect, useId, useRef } from 'react'
import { useLocale } from '../../i18n/useLocale'
import { withBasePath } from '../../utils/paths'

type PhotoViewerProps = {
  items: { src: string; alt: string; caption: string }[]
  index: number
  onChange: (index: number) => void
  onClose: () => void
}

export function PhotoViewer({ items, index, onChange, onClose }: PhotoViewerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const captionId = useId()
  const { t } = useLocale()
  const item = items[index]
  const previous = () => onChange((index - 1 + items.length) % items.length)
  const next = () => onChange((index + 1) % items.length)

  useEffect(() => {
    const dialog = dialogRef.current
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    dialog?.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog?.close()
      document.body.style.overflow = previousOverflow
      previousFocus?.focus({ preventScroll: true })
    }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      className="photo-viewer"
      aria-labelledby={captionId}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault()
          previous()
        } else if (event.key === 'ArrowRight') {
          event.preventDefault()
          next()
        }
      }}
    >
      <button type="button" className="photo-viewer__close" onClick={onClose} aria-label={t('gallery.viewer.close')}>
        <span aria-hidden="true">×</span>
      </button>
      <button type="button" className="photo-viewer__previous" onClick={previous} aria-label={t('gallery.viewer.previous')}>
        <span aria-hidden="true">‹</span>
      </button>
      <figure className="photo-viewer__figure">
        <img src={withBasePath(item.src)} alt={item.alt} className="photo-viewer__image" />
        <figcaption id={captionId} className="photo-viewer__caption" aria-live="polite">
          {item.caption} <span>{index + 1} / {items.length}</span>
        </figcaption>
      </figure>
      <button type="button" className="photo-viewer__next" onClick={next} aria-label={t('gallery.viewer.next')}>
        <span aria-hidden="true">›</span>
      </button>
    </dialog>
  )
}
