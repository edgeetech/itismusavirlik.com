import { Seo } from '../components/Seo'
import { SectionHeader } from '../components/common/SectionHeader'
import { GallerySection } from '../components/gallery/GallerySection'
import { StatsStrip } from '../components/content/StatsStrip'
import { StoryTimeline } from '../components/story/StoryTimeline'
import { TeamGrid } from '../components/team/TeamGrid'
import { site } from '../data/site'
import { teamMembers } from '../data/team'
import { withBasePath } from '../utils/paths'

export function AboutPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.legalName,
    url: `${site.url}/about/`,
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
        title={`Hakkımızda - ${site.legalName}`}
        description="ITIS Muhasebe Mali Müşavirlik hakkında bilgiler, tarihçemiz ve ekibimiz."
        path="/about"
        image={site.images.about}
        schema={schema}
      />

      <div className="about content-offset-top">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-6">
              <img src={withBasePath(site.images.about)} alt="Muhasebe" />
            </div>
            <div className="col-md-6">
              <h2 className="section-title">Hakkımızda</h2>
              <p style={{ textAlign: 'justify' }}>
                Orhan İtişken tarafından 1983 yılında Ankara Ulus&apos;da <strong>Sezen
                Muhasebe</strong> adıyla faaliyete başlayan firmamızda sizin ve
                işletmenizin tüm ihtiyaçları için var gücümüzle çalışıyoruz.
              </p>
              <p style={{ textAlign: 'justify' }}>
                Muhasebe ve mali müşavirlik alanında 40 yılı aşkın tecrübemizle,
                müşterilerimize en kaliteli hizmeti sunmak için çalışıyoruz. Tecrübe ve
                dinamizmin bir arada olduğu güçlü bir ekibiz.
              </p>
              <p style={{ textAlign: 'justify' }}>
                Firmamız, yıllar içinde Ankara&apos;nın farklı bölgelerinde hizmet vermiş,
                2020 yılında Çankaya Mutlukent&apos;teki modern ofisimize taşınmıştır. Bu
                süreçte, sürekli gelişen mevzuata ayak uydurarak, müşterilerimize en güncel
                ve doğru hizmeti sunmayı ilke edindik.
              </p>
            </div>
          </div>
        </div>
      </div>

      <StatsStrip />

      <div className="about" id="team">
        <div className="container-fluid">
          <SectionHeader
            centered
            title="Ekibimiz"
            description="Tecrübe ve dinamizmin bir arada olduğu güçlü bir ekibiz"
          />
          <TeamGrid members={teamMembers} />
        </div>
      </div>

      <StoryTimeline />
      <GallerySection />
    </>
  )
}
