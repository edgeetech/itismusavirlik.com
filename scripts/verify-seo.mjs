import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const dist = new URL('../dist/', import.meta.url)
const origin = 'https://www.itismusavirlik.com'
const pairs = [['/', '/en/'], ['/about/', '/en/about/'], ['/services/', '/en/services/']]
const routes = pairs.flat()
const titles = new Set()
for (const route of routes) {
  const html = await readFile(new URL(`${route.slice(1)}index.html`, dist), 'utf8')
  const head = html.slice(0, html.indexOf('</head>'))
  const lang = route.startsWith('/en/') ? 'en' : 'tr'
  assert.match(html, new RegExp(`<html lang="${lang}"`))
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${route}: one H1`)
  const title = head.match(/<title>(.*?)<\/title>/s)?.[1]
  assert.ok(title && !titles.has(title), `${route}: unique title`)
  titles.add(title)
  assert.equal((head.match(/rel="canonical"/g) || []).length, 1, `${route}: one canonical`)
  assert.ok(head.includes(`href="${origin}${route}"`), `${route}: canonical URL`)
  assert.match(head, /name="description" content="[^"]+"/)
  assert.match(head, /name="robots" content="index,follow,max-image-preview:large"/)
  for (const locale of ['tr', 'en', 'x-default']) assert.ok(head.includes(`hrefLang="${locale}"`) || head.includes(`hreflang="${locale}"`))
  const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
  assert.equal(scripts.length, 1, `${route}: one JSON-LD graph`)
  const data = JSON.parse(scripts[0][1])
  assert.equal(data['@context'], 'https://schema.org')
  const graph = data['@graph']
  const business = graph.find(node => node['@type'] === 'AccountingService')
  assert.equal(business['@id'], `${origin}/#business`)
  assert.equal(business.telephone, '+903124317566')
  const page = graph.find(node => node['@type'] === 'WebPage')
  assert.equal(page.url, `${origin}${route}`)
  assert.equal(page.inLanguage, lang)
  if (route.includes('about') || route.includes('services')) assert.ok(graph.some(node => node['@type'] === 'BreadcrumbList'))
  if (route.includes('services')) {
    const services = graph.filter(node => node['@type'] === 'Service')
    assert.equal(services.length, 4)
    for (const service of services) {
      assert.equal(service.provider['@id'], business['@id'])
      assert.ok(html.includes(`id="${service.url.split('#')[1]}"`))
    }
  }
  assert.ok(!html.includes('cloud.umami.is'), 'Umami remains deferred')
  console.log(`PASS ${route}: metadata, language, static content and structured data`)
}
const sitemap = await readFile(new URL('sitemap.xml', dist), 'utf8')
assert.equal((sitemap.match(/<loc>/g) || []).length, 6)
assert.equal((sitemap.match(/<xhtml:link /g) || []).length, 18)
for (const route of routes) assert.ok(sitemap.includes(`<loc>${origin}${route}</loc>`))
assert.ok(!sitemap.includes('<lastmod>'), 'Do not invent modification dates')
const robots = await readFile(new URL('robots.txt', dist), 'utf8')
assert.match(robots, /User-agent: \*\s+Allow: \//)
assert.ok(robots.includes(`${origin}/sitemap.xml`))
const guide = await readFile(new URL('llms.txt', dist), 'utf8')
for (const route of routes) assert.ok(guide.includes(`(${origin}${route})`))
for (const file of ['404.html', 'en/404.html']) {
  const notFound = await readFile(new URL(file, dist), 'utf8')
  assert.match(notFound, /name="robots" content="noindex,follow"/)
  assert.ok(!notFound.includes('rel="canonical"'))
  assert.match(notFound, /<header /)
  assert.match(notFound, /<footer /)
  assert.match(notFound, /\/img\/404\/owl.webp/)
  assert.equal((notFound.match(/<h1[ >]/g) || []).length, 1)
  assert.ok(!sitemap.includes(`<loc>${origin}/${file}</loc>`))
}
console.log('PASS sitemap, robots, agent guide and static 404')
for (const character of ['owl', 'sparrow', 'penguin']) {
  const image = await readFile(new URL(`img/404/${character}.webp`, dist))
  assert.equal(image.subarray(8, 12).toString(), 'WEBP', `${character}: image asset`)
}
console.log('PASS all three 404 illustration assets')
