import { Seo } from '../components/Seo'
import { site } from '../data/site'
import { withBasePath } from '../utils/paths'

export function NotFoundPage() {
  return (
    <>
      <Seo
        title={`Sayfa Bulunamadı - ${site.legalName}`}
        description="Aradığınız sayfa bulunamadı."
        path="/404"
      />
      <div className="not-found-page">
        <div className="container">
          <h1>Sayfa Bulunamadı</h1>
          <p>
            İstediğiniz sayfa mevcut değil veya taşınmış olabilir. Ana sayfaya dönerek
            güncel içeriğe ulaşabilirsiniz.
          </p>
          <a className="btn" href={withBasePath('/')}>
            Anasayfaya Dön
          </a>
        </div>
      </div>
    </>
  )
}
