import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useGalleryItems } from '../../data/gallery'
import { useLocale } from '../../i18n/useLocale'
import { withBasePath } from '../../utils/paths'
import { SectionHeader } from '../common/SectionHeader'

const MOBILE_BREAKPOINT = 768
const DESKTOP_BREAKPOINT = 1200
const AUTOPLAY_DELAY = 4500

function getSlidesPerView(width: number) {
  if (width >= DESKTOP_BREAKPOINT) {
    return 3
  }

  if (width >= MOBILE_BREAKPOINT) {
    return 2
  }

  return 1
}

function getSlideGap(width: number) {
  return width < MOBILE_BREAKPOINT ? 16 : 24
}

export function GallerySection() {
  const galleryItems = useGalleryItems()
  const { t } = useLocale()
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const [slidesPerView, setSlidesPerView] = useState(1)
  const [viewportWidth, setViewportWidth] = useState(0)
  const [slideGap, setSlideGap] = useState(getSlideGap(DESKTOP_BREAKPOINT))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const viewport = viewportRef.current
      const nextSlidesPerView = getSlidesPerView(window.innerWidth)

      setSlidesPerView(nextSlidesPerView)
      setSlideGap(getSlideGap(window.innerWidth))
      setViewportWidth(viewport?.clientWidth ?? 0)
      setCurrentIndex((previousIndex) =>
        Math.min(previousIndex, Math.max(galleryItems.length - nextSlidesPerView, 0)),
      )
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [galleryItems.length])

  const maxIndex = Math.max(galleryItems.length - slidesPerView, 0)
  const pageCount = maxIndex + 1
  const shouldAutoplay = pageCount > 1
  const slideWidth =
    viewportWidth > 0 ? (viewportWidth - slideGap * (slidesPerView - 1)) / slidesPerView : 0
  const trackStyle = {
    gap: `${slideGap}px`,
    transform: `translateX(-${currentIndex * (slideWidth + slideGap)}px)`,
  } as CSSProperties
  const slideStyle = {
    flex: `0 0 calc((100% - ${(slidesPerView - 1) * slideGap}px) / ${slidesPerView})`,
  } as CSSProperties

  useEffect(() => {
    if (!shouldAutoplay || isPaused) {
      return
    }

    const intervalId = window.setInterval(() => {
      setCurrentIndex((previousIndex) => (previousIndex >= maxIndex ? 0 : previousIndex + 1))
    }, AUTOPLAY_DELAY)

    return () => window.clearInterval(intervalId)
  }, [isPaused, maxIndex, shouldAutoplay])

  const showPreviousSlide = () => {
    setCurrentIndex((previousIndex) => (previousIndex <= 0 ? maxIndex : previousIndex - 1))
  }

  const showNextSlide = () => {
    setCurrentIndex((previousIndex) => (previousIndex >= maxIndex ? 0 : previousIndex + 1))
  }

  return (
    <div className="testimonial gallery-section">
      <div className="container-fluid">
        <SectionHeader
          centered
          title={t('gallery.sectionTitle')}
          description={t('gallery.sectionDescription')}
        />
        <div
          className="gallery-section__carousel"
          style={{ marginTop: '40px' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          {shouldAutoplay ? (
            <button
              type="button"
              className="gallery-section__control gallery-section__control--prev"
              onClick={showPreviousSlide}
              aria-label={t('gallery.controls.previous')}
            >
              <span aria-hidden="true">‹</span>
            </button>
          ) : null}

          <div ref={viewportRef} className="gallery-section__viewport">
            <div className="gallery-section__track" style={trackStyle}>
              {galleryItems.map((item, index) => (
                <div
                  key={item.src}
                  className="gallery-section__slide"
                  style={slideStyle}
                  aria-hidden={index < currentIndex || index >= currentIndex + slidesPerView}
                >
                  <figure className="gallery-section__card">
                    <div className="gallery-section__image-frame">
                      <img
                        src={withBasePath(item.src)}
                        alt={item.alt}
                        className="gallery-section__image"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <figcaption className="gallery-section__caption">{item.alt}</figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>

          {shouldAutoplay ? (
            <button
              type="button"
              className="gallery-section__control gallery-section__control--next"
              onClick={showNextSlide}
              aria-label={t('gallery.controls.next')}
            >
              <span aria-hidden="true">›</span>
            </button>
          ) : null}
        </div>

        {shouldAutoplay ? (
          <div className="gallery-section__dots" aria-label={t('gallery.controls.dots')}>
            {Array.from({ length: pageCount }, (_, index) => (
              <button
                key={index}
                type="button"
                className={`gallery-section__dot${index === currentIndex ? ' is-active' : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={t('gallery.controls.dotLabel', { index: index + 1 })}
                aria-pressed={index === currentIndex}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
