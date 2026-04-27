import { NavLink, useLocation } from 'react-router-dom'
import { site } from '../../data/site'

export function Footer() {
  const location = useLocation()
  const teamHref = location.pathname === '/' ? '#team' : '/#team'
  const contactHref = location.pathname === '/' ? '#contact' : '/#contact'

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <div className="footer-about">
              <h2>{site.legalName}</h2>
              <p>1983&apos;ten Beri Ankara&apos;da Mali Müşavirlik Hizmetleri</p>
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
              <img src={site.images.logo} alt="ITIS Logo" className="footer-logo" />
            </div>
          </div>
          <div className="col-md-3">
            <div className="footer-link">
              <h2>Menü</h2>
              <NavLink to="/">Anasayfa</NavLink>
              <NavLink to="/about/">Hakkımızda</NavLink>
              <NavLink to="/services/">Hizmetlerimiz</NavLink>
              <a href={teamHref}>Ekibimiz</a>
              <a href={contactHref}>İletişim</a>
            </div>
          </div>
          <div className="col-md-4">
            <div className="row">
              <div className="footer-link">
                <h2>Sosyal Medya</h2>
                <a href={site.social.facebook} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f" /> Facebook
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
              &copy; {new Date().getFullYear()} {site.legalName}. Tüm Hakları Saklıdır.{' '}
              <span className="copyright-note">
                adına{' '}
                <a href="https://edgee.tech" target="_blank" rel="noopener noreferrer">
                  EdgeeTech Yazılım
                </a>{' '}
                tarafından hazırlanmıştır.
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
