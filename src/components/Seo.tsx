import { Helmet } from 'react-helmet-async'
import { site } from '../data/site'

type SeoProps = {
  title: string
  description: string
  path: string
  keywords?: string[]
  image?: string
  schema?: Record<string, unknown> | Array<Record<string, unknown>>
}

export function Seo({ title, description, path, keywords, image, schema }: SeoProps) {
  const normalizedPath = path === '/' ? '/' : `${path.replace(/\/$/, '')}/`
  const canonicalUrl =
    normalizedPath === '/' ? site.url : `${site.url}${normalizedPath}`
  const imageUrl = image ? `${site.url}${image}` : `${site.url}${site.images.og}`
  const keywordValue = [...site.keywords, ...(keywords ?? [])].join(', ')

  return (
    <Helmet>
      <html lang="tr" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordValue} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="tr_TR" />
      <meta property="og:site_name" content={site.legalName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {schema ? (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      ) : null}
    </Helmet>
  )
}
