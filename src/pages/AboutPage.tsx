import { Seo } from '../components/Seo'
import { SectionHeader } from '../components/common/SectionHeader'
import { GallerySection } from '../components/gallery/GallerySection'
import { StatsStrip } from '../components/content/StatsStrip'
import { StoryTimeline } from '../components/story/StoryTimeline'
import { TeamGrid } from '../components/team/TeamGrid'
import { useSite } from '../data/site'
import { useTeamMembers } from '../data/team'
import { getRoutePath, useCurrentLanguage } from '../i18n/routing'
import { useLocale } from '../i18n/useLocale'
import { useEqualHeightRows } from '../hooks/useEqualHeightRows'
import { withBasePath } from '../utils/paths'

export function AboutPage() {
  const language = useCurrentLanguage()
  const { t } = useLocale()
  const site = useSite()
  const teamMembers = useTeamMembers()
  const teamGridRef = useEqualHeightRows<HTMLDivElement>('.team-card')
  const aboutPath = getRoutePath('about', language)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.legalName,
    url: `${site.url}${aboutPath}`,
    logo: new URL(site.images.logo, `${site.url}/`).toString(),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: site.phoneNumbers[0],
      email: site.email,
      areaServed: 'TR',
    },
    sameAs: [site.social.facebook],
  }

  return (
    <>
      <Seo
        title={t('seo.about.title')}
        description={t('seo.about.description')}
        path={aboutPath}
        routeKey="about"
        image={site.images.about}
        schema={schema}
      />

      <div className="about content-offset-top">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-6">
              <img src={withBasePath(site.images.about)} alt={t('aboutPage.imageAlt')} />
            </div>
            <div className="col-md-6">
              <h2 className="section-title">{t('aboutPage.title')}</h2>
              <p style={{ textAlign: 'justify' }}>{t('aboutPage.paragraphs.0')}</p>
              <p style={{ textAlign: 'justify' }}>{t('aboutPage.paragraphs.1')}</p>
              <p style={{ textAlign: 'justify' }}>{t('aboutPage.paragraphs.2')}</p>
            </div>
          </div>
        </div>
      </div>

      <StatsStrip />

      <div className="about" id="team" ref={teamGridRef}>
        <div className="container-fluid">
          <SectionHeader
            centered
            title={t('aboutPage.team.title')}
            description={t('aboutPage.team.description')}
          />
          <TeamGrid members={teamMembers} />
        </div>
      </div>

      <StoryTimeline />
      <GallerySection />
    </>
  )
}
