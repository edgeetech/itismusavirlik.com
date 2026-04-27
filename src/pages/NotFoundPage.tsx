import { useLocation } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { getRoutePath, useCurrentLanguage } from '../i18n/routing'
import { useLocale } from '../i18n/useLocale'
import { withBasePath } from '../utils/paths'

export function NotFoundPage() {
  const location = useLocation()
  const language = useCurrentLanguage()
  const { t } = useLocale()

  return (
    <>
      <Seo
        title={t('seo.notFound.title')}
        description={t('seo.notFound.description')}
        path={location.pathname}
      />
      <div className="not-found-page">
        <div className="container">
          <h1>{t('notFound.title')}</h1>
          <p>{t('notFound.description')}</p>
          <a className="btn" href={withBasePath(getRoutePath('home', language))}>
            {t('common.actions.backHome')}
          </a>
        </div>
      </div>
    </>
  )
}
