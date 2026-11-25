# Andrew Fonseka’s portfolio

Production: https://andrewfonseka.com

Astro static site in light, navy and blue, with Archivo and Inter fonts and the owner's portrait. The homepage, four case studies and 404 page share a sticky navigation and contact footer. The Aegon case includes a synthetic campaign-builder demo (React island, no network calls).

## Run

Use Node 24. `npm ci`, `npm run dev`, `npm run build`, `npm run preview`. `npm run documents` rebuilds the résumé and portfolio PDFs in `public/documents/` (needs Chrome; set `CHROMIUM_PATH`).

## Validate

`npm test` builds and checks desktop/mobile layout, banned or stale claims in the built site, the builder demo, links, PDF downloads, SEO and automated accessibility. For local Chrome set `CHROMIUM_PATH`.

## Publish

Vercel project `andrew-fonseka-portfolio`, Astro preset, build `npm run build`, output `dist`. Production domain `andrewfonseka.com`; www redirects to apex. Canonical URLs and sitemap use that origin. Vercel Analytics remains installed; optional GA4 uses PUBLIC_GA4_ID.

## Structure

- `src/pages/index.astro` and `src/pages/case-studies/[slug].astro`: the pages.
- `src/layouts/Site.astro`: metadata, navigation, contact and analytics.
- `src/components/v3`: icons, charts, evidence notes, the CRM diagram and the builder demo.
- `src/content/v3.js`: every public figure and story, shared by pages and PDFs.
- `src/styles/v3.css`: tokens and styles.
- `documents/` and `scripts/build-documents.mjs`: PDF templates and generator.
- `docs/career-facts.md`: the public claims allowed on the site.
