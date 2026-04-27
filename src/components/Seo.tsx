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
}

const localeMap = {
  tr: 'tr_TR',
  en: 'en_US',
} as const

export function Seo({ title, description, path, routeKey, keywords, image, schema }: SeoProps) {
  const language = useCurrentLanguage()
  const site = useSite()
  const normalizedPath = path === '/' ? '/' : `${path.replace(/\/$/, '')}/`
  const canonicalUrl =
    normalizedPath === '/' ? site.url : `${site.url}${normalizedPath}`
  const imageUrl = new URL(image ?? site.images.og, `${site.url}/`).toString()
  const keywordValue = [...site.keywords, ...(keywords ?? [])].join(', ')
  const trUrl = routeKey ? `${site.url}${getRoutePath(routeKey, 'tr')}` : null
  const enUrl = routeKey ? `${site.url}${getRoutePath(routeKey, 'en')}` : null

  return (
    <Helmet>
      <html lang={language} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordValue} />
      <link rel="canonical" href={canonicalUrl} />
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
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {trUrl ? <link rel="alternate" hrefLang="tr" href={trUrl} /> : null}
      {enUrl ? <link rel="alternate" hrefLang="en" href={enUrl} /> : null}
      {trUrl ? <link rel="alternate" hrefLang="x-default" href={trUrl} /> : null}
      {schema ? (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      ) : null}
    </Helmet>
  )
}
