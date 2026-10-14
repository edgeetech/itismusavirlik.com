# itismusavirlik.com
ITIS Mali Musavirlik ve Muhasebe website

## Development and validation

Run `npm ci`, then `npm run dev`. To inspect the production output, run
`npm run build` and `npm run preview`.

Before publishing: `npm run lint`, `npm run build`, `npm run verify:seo`.
The SEO check validates all six statically rendered Turkish/English pages,
metadata, structured data, language alternates, crawler discovery and the 404.
Both pull-request validation and the Pages deployment build run these checks.

## Search and agent discovery

The public website uses canonical `https://www.itismusavirlik.com/` URLs.
Content is rendered to HTML at build time and remains readable without JavaScript.
Each page includes language alternates and linked AccountingService, WebSite,
WebPage and (on interior pages) BreadcrumbList JSON-LD. Service definitions link
to the same business identifier and visible service sections.

`scripts/postbuild.mjs` generates `dist/sitemap.xml` with reciprocal language
alternates. `public/robots.txt` allows public crawling. `public/llms.txt` is an
optional public navigation guide, not an indexing or AI citation guarantee.
Keep it in sync with the visible business information when content changes.
`public/404.html` supplies GitHub Pages' native error document with noindex;
an SPA fallback that returns successful responses for unknown URLs is not used.

Reference: [Google's AI features guidance](https://developers.google.com/search/docs/appearance/ai-features),
[AccountingService](https://schema.org/AccountingService).

## Analytics

Umami Cloud was deferred at the owner's request because of the account limit.
No tracker, analytics identifier or tracking events are installed.
After publication, submit the sitemap in an owner-verified Search Console
property and validate the hosted 404 status and structured data. This repository
does not contain Search Console ownership credentials or verification tokens.
