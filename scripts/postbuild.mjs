import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const distDir = new URL('../dist/', import.meta.url)
const rootPrefixPattern = /(<div id="root" data-server-rendered="true">)([\s\S]*?)(<div class="wrapper">)/
const seoTagPattern =
  /<title>[\s\S]*?<\/title>|<meta\s+(?:name="(?:description|keywords|twitter:[^"]+)"|property="og:[^"]+")\s+[^>]*>|<link\s+rel="(?:canonical|alternate)"\s+[^>]*>/g

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
