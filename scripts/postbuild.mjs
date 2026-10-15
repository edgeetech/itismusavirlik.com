import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const distDir = new URL('../dist/', import.meta.url)
const rootPrefixPattern = /(<div id="root" data-server-rendered="true">)([\s\S]*?)(<div class="wrapper">)/
const seoTagPattern =
  /<title>[\s\S]*?<\/title>|<meta\s+(?:name="(?:description|keywords|robots|twitter:[^"]+)"|property="og:[^"]+")\s+[^>]*>|<link\s+rel="(?:canonical|alternate)"\s+[^>]*>|<script type="application\/ld\+json">[\s\S]*?<\/script>/g

const pages = ['about', 'services', 'en', 'en/about', 'en/services']

for (const page of pages) {
  const sourcePath = new URL(`${page}.html`, distDir)
  const targetPath = new URL(`${page}/index.html`, distDir)

  await mkdir(dirname(fileURLToPath(targetPath)), { recursive: true })
  await copyFile(fileURLToPath(sourcePath), fileURLToPath(targetPath))
}

const htmlPages = [
  'index.html',
  'about.html',
  'services.html',
  'about/index.html',
  'services/index.html',
  'en.html',
  'en/index.html',
  'en/about.html',
  'en/about/index.html',
  'en/services.html',
  'en/services/index.html',
]

for (const page of htmlPages) {
  const pageUrl = new URL(page, distDir)
  const pagePath = fileURLToPath(pageUrl)
  const lang = page.startsWith('en') ? 'en' : 'tr'
  const html = await readFile(pagePath, 'utf8')
  let updatedHtml = html.replace('<html lang="tr">', `<html lang="${lang}">`)
  const rootPrefixMatch = updatedHtml.match(rootPrefixPattern)

  if (rootPrefixMatch) {
    const [, rootOpen, rootPrefix, wrapperOpen] = rootPrefixMatch
    const seoTags = [...rootPrefix.matchAll(seoTagPattern)].map(([tag]) => tag).join('')
    const cleanedRootPrefix = rootPrefix.replace(seoTagPattern, '')

    updatedHtml = updatedHtml
      .replace(/<meta name="description" content="[^"]*">\s*/, '')
      .replace(/<title>[\s\S]*?<\/title>\s*/, '')

    if (seoTags) {
      updatedHtml = updatedHtml.replace('</head>', `${seoTags}</head>`)
    }

    updatedHtml = updatedHtml.replace(rootPrefixPattern, `${rootOpen}${cleanedRootPrefix}${wrapperOpen}`)
  }

  await writeFile(pagePath, updatedHtml, 'utf8')
}

// Build the sitemap from the same six public routes; no invented modification dates.
const origin = 'https://www.itismusavirlik.com'
const routePairs = [['/', '/en/'], ['/about/', '/en/about/'], ['/services/', '/en/services/']]
const sitemapEntries = routePairs.flatMap(([tr, en]) => [tr, en].map((path) =>
  `  <url><loc>${origin}${path}</loc>` +
  `<xhtml:link rel="alternate" hreflang="tr" href="${origin}${tr}"/>` +
  `<xhtml:link rel="alternate" hreflang="en" href="${origin}${en}"/>` +
  `<xhtml:link rel="alternate" hreflang="x-default" href="${origin}${tr}"/></url>`,
))
await writeFile(new URL('sitemap.xml', distDir),
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
  sitemapEntries.join('\n') + '\n</urlset>\n', 'utf8')
