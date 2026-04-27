import { Seo } from '../components/Seo'
import { SectionHeader } from '../components/common/SectionHeader'
import { ContactSection } from '../components/contact/ContactSection'
import { GallerySection } from '../components/gallery/GallerySection'
import { StatsStrip } from '../components/content/StatsStrip'
import { ServiceCard } from '../components/services/ServiceCard'
import { TeamGrid } from '../components/team/TeamGrid'
import { services } from '../data/services'
import { site } from '../data/site'
import { teamMembers } from '../data/team'
import { useEqualHeightRows } from '../hooks/useEqualHeightRows'

export function HomePage() {
  const featuredMembers = teamMembers.filter((member) => member.featured)
  const servicesRef = useEqualHeightRows<HTMLDivElement>('.service-item')

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: site.legalName,
    image: `${site.url}${site.images.logo}`,
    url: site.url,
    telephone: site.phoneNumbers[0],
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.city,
      streetAddress: site.address,
      addressCountry: 'TR',
    },
    sameAs: [site.social.facebook],
  }

  return (
    <>
      <Seo
        title={`${site.legalName} - Ankara`}
        description={site.description}
        path="/"
        image={site.images.hero}
        schema={schema}
      />

      <div className="hero" id="home">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2>{site.legalName}</h2>
              <h2>
                <span>{site.city.toUpperCase()}</span>
              </h2>
              <p>Sizin ve Şirketiniz İçin 1983&apos;ten Beri</p>
              <a className="btn" href="#services">
                Hizmetlerimiz
              </a>
            </div>
            <div className="col-md-6">
              <img src={site.images.hero} alt="ITIS Muhasebe" />
            </div>
          </div>
        </div>
      </div>

      <div className="about" id="about">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-6">
              <img src={site.images.about} alt="Muhasebe" />
            </div>
            <div className="col-md-6">
              <h2 className="section-title">Hakkımızda</h2>
              <p style={{ textAlign: 'justify' }}>
                Orhan İtişken tarafından 1983 yılında Ankara Ulus&apos;da Sezen Muhasebe
                adıyla faaliyete başlayan firmamızda sizin ve işletmenizin tüm ihtiyaçları
                için var gücümüzle çalışıyoruz.
              </p>
              <p style={{ textAlign: 'justify' }}>
                Muhasebe ve mali müşavirlik alanında 40 yılı aşkın tecrübemizle,
                müşterilerimize en kaliteli hizmeti sunmak için çalışıyoruz. Tecrübe ve
                dinamizmin bir arada olduğu güçlü bir ekibiz.
              </p>
              <a className="btn" href="/about/">
                Detaylı Bilgi
              </a>
            </div>
          </div>
        </div>
      </div>

      <StatsStrip />

      <div ref={servicesRef} className="service" id="services">
        <div className="container-fluid">
          <SectionHeader
            title="Neler Yapıyoruz"
            description="Sunduğumuz hizmetlerin bazıları şunlardır"
          />
          <div className="row">
            {services.map((service) => (
              <div key={service.id} className="col-lg-3 col-md-6 d-flex">
                <ServiceCard service={service} variant="preview" />
              </div>
            ))}
          </div>
          <div className="row" style={{ marginTop: '30px' }}>
            <div className="col-12 text-center">
              <a className="btn" href="/services/">
                Tüm Hizmetlerimiz
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="about" id="team" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container-fluid">
          <SectionHeader
            centered
            title="Ekibimiz"
            description="Tecrübe ve dinamizmin bir arada olduğu güçlü bir ekibiz"
          />
          <TeamGrid members={featuredMembers} />
        </div>
      </div>

      <GallerySection />
      <ContactSection />
    </>
  )
}
