import { useMemo, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { site } from '../../data/site'

const navItems = [
  { label: 'Anasayfa', to: '/' },
  { label: 'Hakkımızda', to: '/about/' },
  { label: 'Hizmetlerimiz', to: '/services/' },
] as const

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const teamHref = useMemo(
    () => (location.pathname === '/' ? '#team' : '/#team'),
    [location.pathname],
  )
  const contactHref = useMemo(
    () => (location.pathname === '/' ? '#contact' : '/#contact'),
    [location.pathname],
  )

  const closeMenu = () => setIsOpen(false)

  return (
    <header className="header">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-lg-2">
            <div className="brand">
              <NavLink to="/" onClick={closeMenu} aria-label="ITIS anasayfa">
                <img src={site.images.logo} alt="ITIS Logo" />
              </NavLink>
            </div>
          </div>
          <div className="col-lg-4">
            <p className="site-brand-title">{site.title}</p>
          </div>
          <div className="col-lg-6">
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
            </div>

            <nav className="navbar navbar-expand-lg bg-light navbar-light">
              <button
                type="button"
                className={`navbar-toggle header__menu-toggle${isOpen ? ' is-open' : ''}`}
                aria-label="Navigasyonu aç veya kapat"
                aria-controls="navbarCollapse"
                aria-expanded={isOpen}
                onClick={() => setIsOpen((value) => !value)}
              >
                <span className="sr-only">Menüyü aç veya kapat</span>
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
                      Ekibimiz
                    </a>
                  </li>
                  <li>
                    <a href={contactHref} onClick={closeMenu}>
                      İletişim
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
