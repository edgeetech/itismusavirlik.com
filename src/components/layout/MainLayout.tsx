import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'
import { useLocale } from '../../i18n/useLocale'

export function MainLayout() {
  const { t } = useLocale()
  return (
    <div className="wrapper">
      <a className="skip-link" href="#main-content">{t('common.skipToContent')}</a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
