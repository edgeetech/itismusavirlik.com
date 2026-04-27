import { useMemo, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useSite } from '../../data/site'
import {
  getHomeAnchorPath,
  getLocalizedPathname,
  getRoutePath,
  normalizePath,
  useCurrentLanguage,
} from '../../i18n/routing'
import { useLocale } from '../../i18n/useLocale'
import { withBasePath } from '../../utils/paths'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const language = useCurrentLanguage()
  const { t } = useLocale()
  const site = useSite()

  const navItems = useMemo(
    () => [
      { label: t('common.nav.home'), to: getRoutePath('home', language) },
      { label: t('common.nav.about'), to: getRoutePath('about', language) },
      { label: t('common.nav.services'), to: getRoutePath('services', language) },
    ],
    [language, t],
  )

  const isHomePage = normalizePath(location.pathname) === getRoutePath('home', language)

  const teamHref = useMemo(
    () =>
      isHomePage ? '#team' : withBasePath(getHomeAnchorPath('team', language)),
    [isHomePage, language],
  )
  const contactHref = useMemo(
    () =>
      isHomePage ? '#contact' : withBasePath(getHomeAnchorPath('contact', language)),
    [isHomePage, language],
  )

  const closeMenu = () => setIsOpen(false)

  const getLanguageHref = (targetLanguage: 'tr' | 'en') => {
    const nextPath = getLocalizedPathname(location.pathname, targetLanguage)
    const nextHash = isHomePage ? location.hash : ''
    return withBasePath(`${nextPath}${nextHash}`)
  }

  return (
    <header className="header">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-lg-2">
              <NavLink
                to={getRoutePath('home', language)}
                onClick={closeMenu}
                aria-label={t('header.logoAriaLabel')}
              >
                <img src={withBasePath(site.images.logo)} alt="ITIS Logo" />
              </NavLink>
          </div>
          <div className="col-lg-10">
            <div className="topbar">
              <div className="topbar-col">
                <a href={`tel:${site.phoneNumbers[0]}`}>
                  <i className="fa fa-phone-alt" />
                  {site.phoneNumbers[0]}
                </a>
              </div>
              <div className="topbar-col">
                <a href={`mailto:${site.email}`}>
                  <i className="fa fa-envelope" />
                  {site.email}
                </a>
              </div>
              <div className="topbar-col">
                <div className="topbar-social">
                  <a
                    href={site.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <i className="fab fa-facebook-f" />
                  </a>
                </div>
              </div>
              <div className="topbar-col">
                <div
                  className="topbar-lang-switcher"
                  role="group"
                  aria-label={t('common.languageSwitcherLabel')}
                >
                  {(['tr', 'en'] as const).map((targetLanguage) => (
                    <a
                      key={targetLanguage}
                      href={getLanguageHref(targetLanguage)}
                      className={`topbar-lang-switcher__link${
                        language === targetLanguage ? ' is-active' : ''
                      }`}
                      onClick={closeMenu}
                      hrefLang={targetLanguage}
                      lang={targetLanguage}
                    >
                      {t(`common.languages.${targetLanguage}`)}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <nav className="navbar navbar-expand-lg bg-light navbar-light">
              <button
                type="button"
                className={`navbar-toggle header__menu-toggle${isOpen ? ' is-open' : ''}`}
                aria-label={t('header.menuToggleLabel')}
                aria-controls="navbarCollapse"
                aria-expanded={isOpen}
                onClick={() => setIsOpen((value) => !value)}
              >
                <span className="sr-only">{t('header.menuToggleScreenReader')}</span>
                <span className="header__menu-toggle-box" aria-hidden="true">
                  <span className="header__menu-toggle-bar" />
                  <span className="header__menu-toggle-bar" />
                  <span className="header__menu-toggle-bar" />
                </span>
              </button>

              <div
                className={`navbar-collapse collapse justify-content-between${isOpen ? ' in show' : ''}`}
                id="navbarCollapse"
              >
                <ul className="nav navbar-nav navbar-right">
                  {navItems.map((item) => (
                    <li key={item.to}>
                      <NavLink
                        to={item.to}
                        end={item.to === '/'}
                        className={({ isActive }) => (isActive ? 'active' : undefined)}
                        onClick={closeMenu}
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                  <li>
                    <a href={teamHref} onClick={closeMenu}>
                      {t('common.nav.team')}
                    </a>
                  </li>
                  <li>
                    <a href={contactHref} onClick={closeMenu}>
                      {t('common.nav.contact')}
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
