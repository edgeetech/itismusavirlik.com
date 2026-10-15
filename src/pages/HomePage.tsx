import { Seo } from '../components/Seo'
import { SectionHeader } from '../components/common/SectionHeader'
import { ContactSection } from '../components/contact/ContactSection'
import { GallerySection } from '../components/gallery/GallerySection'
import { StatsStrip } from '../components/content/StatsStrip'
import { ServiceCard } from '../components/services/ServiceCard'
import { TeamGrid } from '../components/team/TeamGrid'
import { useServices } from '../data/services'
import { useSite } from '../data/site'
import { useTeamMembers } from '../data/team'
import { getRoutePath, useCurrentLanguage } from '../i18n/routing'
import { useLocale } from '../i18n/useLocale'
import { useEqualHeightRows } from '../hooks/useEqualHeightRows'
import { withBasePath } from '../utils/paths'

export function HomePage() {
  const language = useCurrentLanguage()
  const { t } = useLocale()
  const site = useSite()
  const services = useServices()
  const teamMembers = useTeamMembers()
  const featuredMembers = teamMembers.filter((member) => member.featured)
  const servicesRef = useEqualHeightRows<HTMLDivElement>('.service-item')
  const aboutPath = getRoutePath('about', language)
  const servicesPath = getRoutePath('services', language)
  const homePath = getRoutePath('home', language)

  return (
    <>
      <Seo
        title={t('seo.home.title')}
        description={t('seo.home.description')}
        path={homePath}
        routeKey="home"
        image={site.images.hero}
      />

      <div className="hero" id="home">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="eyebrow">{t('home.hero.tagline')} · {site.city}</p>
              <h1>{t('home.hero.title')}</h1>
              <p className="hero-description">{t('home.hero.description')}</p>
              <div className="hero-actions">
              <a className="btn" href="#contact">
                {t('common.actions.contactUs')}
              </a>
              <a className="btn btn-secondary" href="#services">
                {t('common.actions.exploreServices')}
              </a>
              </div>
            </div>
            <div className="col-md-6">
              <img src={withBasePath(site.images.hero)} alt={t('home.hero.imageAlt')} />
            </div>
          </div>
        </div>
      </div>

      <div className="about" id="about">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-6">
              <img src={withBasePath(site.images.about)} alt={t('home.about.imageAlt')} />
            </div>
            <div className="col-md-6">
              <h2 className="section-title">{t('home.about.title')}</h2>
              <p>{t('home.about.paragraphs.0')}</p>
              <p>{t('home.about.paragraphs.1')}</p>
              <a className="btn" href={withBasePath(aboutPath)}>
                {t('common.actions.learnMore')}
              </a>
            </div>
          </div>
        </div>
      </div>

      <StatsStrip />

      <div ref={servicesRef} className="service" id="services">
        <div className="container-fluid">
          <SectionHeader
            title={t('home.services.title')}
            description={t('home.services.description')}
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
              <a className="btn" href={withBasePath(servicesPath)}>
                {t('common.actions.allServices')}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="about" id="team" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container-fluid">
          <SectionHeader
            centered
            title={t('home.team.title')}
            description={t('home.team.description')}
          />
          <TeamGrid members={featuredMembers} />
        </div>
      </div>

      <GallerySection />
      <ContactSection />
    </>
  )
}
