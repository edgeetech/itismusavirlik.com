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
import { withBasePath } from '../utils/paths'

export function AboutPage() {
  const language = useCurrentLanguage()
  const { t } = useLocale()
  const site = useSite()
  const teamMembers = useTeamMembers()
  const aboutPath = getRoutePath('about', language)

  return (
    <>
      <Seo
        title={t('seo.about.title')}
        description={t('seo.about.description')}
        path={aboutPath}
        routeKey="about"
        image={site.images.about}
      />

      <div className="about content-offset-top">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-6">
              <img src={withBasePath(site.images.about)} alt={t('aboutPage.imageAlt')} />
            </div>
            <div className="col-md-6">
              <h1 className="section-title">{t('aboutPage.title')}</h1>
              <p>{t('aboutPage.paragraphs.0')}</p>
              <p>{t('aboutPage.paragraphs.1')}</p>
              <p>{t('aboutPage.paragraphs.2')}</p>
            </div>
          </div>
        </div>
      </div>

      <StatsStrip />

      <div className="about" id="team">
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
