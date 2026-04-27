import { Seo } from '../components/Seo'
import { SectionHeader } from '../components/common/SectionHeader'
import { ServiceCard } from '../components/services/ServiceCard'
import { useServices } from '../data/services'
import { useSite } from '../data/site'
import { getRoutePath, useCurrentLanguage } from '../i18n/routing'
import { useLocale } from '../i18n/useLocale'
import { useEqualHeightRows } from '../hooks/useEqualHeightRows'
import { withBasePath } from '../utils/paths'

export function ServicesPage() {
  const language = useCurrentLanguage()
  const { t } = useLocale()
  const site = useSite()
  const services = useServices()
  const servicesRef = useEqualHeightRows<HTMLDivElement>('.service-item')
  const servicesPath = getRoutePath('services', language)
  const contactPath = getRoutePath('home', language)
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
        title={t('seo.services.title')}
        description={t('seo.services.description')}
        path={servicesPath}
        routeKey="services"
        image={site.images.whyUs}
        schema={schema}
      />

      <div ref={servicesRef} className="service content-offset-top">
        <div className="container-fluid">
          <SectionHeader
            title={t('servicesPage.title')}
            description={t('servicesPage.description')}
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
              <img src={withBasePath(site.images.whyUs)} alt={t('servicesPage.whyUs.imageAlt')} />
            </div>
            <div className="col-md-6">
              <h2 className="section-title">{t('servicesPage.whyUs.title')}</h2>
              {(t('servicesPage.whyUs.items', { returnObjects: true }) as Array<{
                id: string
                label: string
                text: string
              }>).map((item, index) => (
                <p
                  key={item.id}
                  style={{
                    textAlign: 'justify',
                    marginBottom: index === 4 ? undefined : '15px',
                  }}
                >
                  <strong>{item.label}</strong> {item.text}
                </p>
              ))}
              <a className="btn" href={withBasePath(`${contactPath}#contact`)}>
                {t('common.actions.contactUs')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
