import { NavLink, useLocation } from 'react-router-dom'
import { useSite } from '../../data/site'
import {
  getHomeAnchorPath,
  getRoutePath,
  normalizePath,
  useCurrentLanguage,
} from '../../i18n/routing'
import { useLocale } from '../../i18n/useLocale'
import { withBasePath } from '../../utils/paths'

export function Footer() {
  const location = useLocation()
  const language = useCurrentLanguage()
  const { t } = useLocale()
  const site = useSite()
  const isHomePage = normalizePath(location.pathname) === getRoutePath('home', language)
  const teamHref = isHomePage ? '#team' : withBasePath(getHomeAnchorPath('team', language))
  const contactHref =
    isHomePage ? '#contact' : withBasePath(getHomeAnchorPath('contact', language))

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <div className="footer-about">
              <h2>{site.legalName}</h2>
              <p>{t('home.hero.tagline')}</p>
              <br />
              <p>
                <i className="fa fa-map-marker-alt" />
                {site.address}
              </p>
              <p>
                <a href={`tel:${site.phoneNumbers[0]}`}>
                  <i className="fa fa-phone-alt" />
                  {site.phoneNumbers[0]}
                </a>
              </p>
              <p>
                <a href={`mailto:${site.email}`}>
                  <i className="fa fa-envelope" />
                  {site.email}
                </a>
              </p>
              <img
                src={withBasePath(site.images.logo)}
                alt="ITIS Logo"
                className="footer-logo"
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="footer-link">
              <h2>{t('common.footer.menuTitle')}</h2>
              <NavLink to={getRoutePath('home', language)}>{t('common.nav.home')}</NavLink>
              <NavLink to={getRoutePath('about', language)}>{t('common.nav.about')}</NavLink>
              <NavLink to={getRoutePath('services', language)}>
                {t('common.nav.services')}
              </NavLink>
              <a href={teamHref}>{t('common.nav.team')}</a>
              <a href={contactHref}>{t('common.nav.contact')}</a>
            </div>
          </div>
          <div className="col-md-4">
            <div className="row">
              <div className="footer-link">
                <h2>{t('common.footer.socialMediaTitle')}</h2>
                <a href={site.social.facebook} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f" /> {t('common.footer.facebookLabel')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container copyright">
        <div className="row">
          <div className="col-md-12 text-center">
            <p>
              &copy; {new Date().getFullYear()} {site.legalName}.{' '}
              {t('common.footer.copyrightText')}{' '}
              <span className="copyright-note">
                {t('common.footer.preparedByPrefix')}{' '}
                <a href="https://edgee.tech" target="_blank" rel="noopener noreferrer">
                  EdgeeTech Yazılım
                </a>{' '}
                {t('common.footer.preparedBySuffix')}
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
