import { Helmet } from 'react-helmet-async'
import { useSite } from '../data/site'
import { type RouteKey, getRoutePath, useCurrentLanguage } from '../i18n/routing'

type SeoProps = {
  title: string
  description: string
  path: string
  routeKey?: RouteKey
  keywords?: string[]
  image?: string
  schema?: Record<string, unknown> | Array<Record<string, unknown>>
  noindex?: boolean
}

const localeMap = {
  tr: 'tr_TR',
  en: 'en_US',
} as const

export function Seo({ title, description, path, routeKey, keywords, image, schema, noindex = false }: SeoProps) {
  const language = useCurrentLanguage()
  const site = useSite()
  const normalizedPath = path === '/' ? '/' : `${path.replace(/\/$/, '')}/`
  const canonicalUrl = new URL(normalizedPath, `${site.url}/`).toString()
  const imageUrl = new URL(image ?? site.images.og, `${site.url}/`).toString()
  const keywordValue = [...site.keywords, ...(keywords ?? [])].join(', ')
  const trUrl = routeKey ? `${site.url}${getRoutePath(routeKey, 'tr')}` : null
  const enUrl = routeKey ? `${site.url}${getRoutePath(routeKey, 'en')}` : null
  const businessId = `${site.url}/#business`
  const websiteId = `${site.url}/#website`
  const breadcrumb = routeKey && routeKey !== 'home' ? {
    '@type': 'BreadcrumbList', '@id': `${canonicalUrl}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: language === 'tr' ? 'Anasayfa' : 'Home', item: `${site.url}${getRoutePath('home', language)}` },
      { '@type': 'ListItem', position: 2, name: title.split(' - ')[0], item: canonicalUrl },
    ],
  } : null
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AccountingService', '@id': businessId,
        name: 'ITIS Muhasebe ve Mali Müşavirlik', url: `${site.url}/`,
        description: site.description, foundingDate: site.foundedYear,
        telephone: '+90' + site.phoneNumbers[0].replace(/\D/g, '').replace(/^0/, ''),
        email: site.email, logo: new URL(site.images.logo, `${site.url}/`).toString(),
        image: new URL(site.images.hero, `${site.url}/`).toString(),
        address: { '@type': 'PostalAddress', streetAddress: site.address, addressLocality: site.city, addressCountry: 'TR' },
        areaServed: site.city, sameAs: [site.social.facebook],
      },
      { '@type': 'WebSite', '@id': websiteId, url: `${site.url}/`, name: 'ITIS', inLanguage: ['tr', 'en'], publisher: { '@id': businessId } },
      {
        '@type': 'WebPage', '@id': `${canonicalUrl}#webpage`, url: canonicalUrl,
        name: title, description, inLanguage: language, isPartOf: { '@id': websiteId },
        about: { '@id': businessId }, ...(breadcrumb ? { breadcrumb: { '@id': breadcrumb['@id'] } } : {}),
      },
      ...(breadcrumb ? [breadcrumb] : []),
      ...(schema ? Array.isArray(schema) ? schema : [schema] : []),
    ],
  }

  return (
    <Helmet>
      <html lang={language} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large'} />
      <meta name="keywords" content={keywordValue} />
      {!noindex ? <link rel="canonical" href={canonicalUrl} /> : null}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={localeMap[language]} />
      <meta
        property="og:locale:alternate"
        content={localeMap[language === 'tr' ? 'en' : 'tr']}
      />
      <meta property="og:site_name" content={site.legalName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={site.legalName} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {trUrl ? <link rel="alternate" hrefLang="tr" href={trUrl} /> : null}
      {enUrl ? <link rel="alternate" hrefLang="en" href={enUrl} /> : null}
      {trUrl ? <link rel="alternate" hrefLang="x-default" href={trUrl} /> : null}
      {!noindex ? <script type="application/ld+json">{JSON.stringify(structuredData).replace(/</g, '\\u003c')}</script> : null}
    </Helmet>
  )
}
