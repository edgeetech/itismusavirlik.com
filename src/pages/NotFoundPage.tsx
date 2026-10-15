import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Seo } from '../components/Seo'
import { getRoutePath, useCurrentLanguage } from '../i18n/routing'
import { useLocale } from '../i18n/useLocale'
import { withBasePath } from '../utils/paths'

export function NotFoundPage() {
  const location = useLocation()
  const language = useCurrentLanguage()
  const { t } = useLocale()
  // Match server HTML during hydration; swap only once the chosen asset is loaded.
  const [illustration, setIllustration] = useState('owl')
  useEffect(() => {
    const characters = ['owl', 'sparrow', 'penguin']
    const character = characters[Math.floor(Math.random() * characters.length)]
    const image = new Image()
    image.onload = () => setIllustration(character)
    image.src = withBasePath(`/img/404/${character}.webp`)
    return () => { image.onload = null }
  }, [location.pathname])

  return (
    <>
      <Seo
        title={t('seo.notFound.title')}
        description={t('seo.notFound.description')}
        path={location.pathname}
        noindex
      />
      <section className="not-found-page" aria-labelledby="not-found-title">
        <div className="container-fluid">
          <p className="not-found-page__code">404 · {t('notFound.eyebrow')}</p>
          <img className="not-found-page__illustration" src={withBasePath(`/img/404/${illustration}.webp`)} alt={t('notFound.imageAlt')} width="720" height="480" />
          <h1 id="not-found-title">{t('notFound.title')}</h1>
          <p>{t('notFound.description')}</p>
          <div className="not-found-page__actions">
          <a className="btn" href={withBasePath(getRoutePath('home', language))}>
            {t('common.actions.backHome')}
          </a>
          <a className="btn btn-secondary" href={withBasePath(getRoutePath('services', language))}>{t('common.actions.exploreServices')}</a>
          </div>
          <a className="not-found-page__contact" href={withBasePath(`${getRoutePath('home', language)}#contact`)}>{t('common.actions.contactUs')} <span aria-hidden="true">↗</span></a>
        </div>
      </section>
    </>
  )
}
