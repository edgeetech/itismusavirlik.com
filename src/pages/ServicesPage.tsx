import { Seo } from '../components/Seo'
import { SectionHeader } from '../components/common/SectionHeader'
import { ServiceCard } from '../components/services/ServiceCard'
import { services } from '../data/services'
import { site } from '../data/site'
import { useEqualHeightRows } from '../hooks/useEqualHeightRows'

export function ServicesPage() {
  const servicesRef = useEqualHeightRows<HTMLDivElement>('.service-item')
  const schema = services.map((service) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.title,
    provider: {
      '@type': 'LocalBusiness',
      name: site.legalName,
      url: site.url,
    },
    areaServed: 'Ankara',
    description: service.shortDescription,
  }))

  return (
    <>
      <Seo
        title={`Hizmetlerimiz - ${site.legalName}`}
        description="ITIS Muhasebe Mali Müşavirlik hizmetleri: muhasebe, vergi danışmanlığı, sosyal güvenlik ve kuruluş işlemleri."
        path="/services"
        image={site.images.whyUs}
        schema={schema}
      />

      <div ref={servicesRef} className="service content-offset-top">
        <div className="container-fluid">
          <SectionHeader
            title="Neler Yapıyoruz"
            description="Sunduğumuz hizmetlerin detaylı bilgileri"
          />
          <div className="row">
            {services.slice(0, 2).map((service) => (
              <div key={service.id} className="col-lg-6 col-md-12 d-flex">
                <ServiceCard service={service} variant="detail" />
              </div>
            ))}
          </div>
          <div className="row" style={{ marginTop: '30px' }}>
            {services.slice(2).map((service) => (
              <div key={service.id} className="col-lg-6 col-md-12 d-flex">
                <ServiceCard service={service} variant="detail" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="about" style={{ backgroundColor: '#f8f9fa', padding: '60px 0' }}>
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-6">
              <img src={site.images.whyUs} alt="SMMM Tabela" />
            </div>
            <div className="col-md-6">
              <h2 className="section-title">Neden Bizi Seçmelisiniz?</h2>
              <p style={{ textAlign: 'justify', marginBottom: '15px' }}>
                <strong>40+ Yıllık Tecrübe:</strong> 1983 yılından bu yana muhasebe ve
                mali müşavirlik alanında hizmet veriyoruz.
              </p>
              <p style={{ textAlign: 'justify', marginBottom: '15px' }}>
                <strong>Uzman Kadro:</strong> 2 SMMM ve deneyimli personelimizle
                profesyonel hizmet sunuyoruz.
              </p>
              <p style={{ textAlign: 'justify', marginBottom: '15px' }}>
                <strong>Güncel Mevzuat Takibi:</strong> Sürekli değişen vergi ve sosyal
                güvenlik mevzuatını yakından takip ediyor, müşterilerimize en güncel
                bilgileri sağlıyoruz.
              </p>
              <p style={{ textAlign: 'justify', marginBottom: '15px' }}>
                <strong>Kişiye Özel Çözümler:</strong> Her müşterimizin ihtiyaçları
                farklıdır. Size özel çözümler üretiyor, işletmenizin büyümesine katkı
                sağlıyoruz.
              </p>
              <p style={{ textAlign: 'justify' }}>
                <strong>Güvenilir ve Sorumluluk Sahibi:</strong> İşinizi güvenle emanet
                edebileceğiniz, sorumluluklarını bilen bir ekibiz.
              </p>
              <a className="btn" href="/#contact">
                Bize Ulaşın
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
