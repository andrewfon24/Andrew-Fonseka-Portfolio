# Andrew Fonseka’s portfolio

Production: https://andrewfonseka.com

Astro static site in light, navy and blue, with Archivo and Inter fonts and the owner's portrait. The homepage, four case studies and 404 page share a sticky navigation and contact footer.

## Run

Use Node 24. `npm ci`, `npm run dev`, `npm run build`, `npm run preview`.

## Validate

`npm test` builds and checks desktop/mobile layout, withdrawn claims in the built site, links, PDF downloads, SEO and automated accessibility. For local Chrome set `CHROMIUM_PATH`.

## Publish

Vercel project `andrew-fonseka-portfolio`, Astro preset, build `npm run build`, output `dist`. Production domain `andrewfonseka.com`; www redirects to apex. Canonical URLs and sitemap use that origin. Vercel Analytics remains installed; optional GA4 uses PUBLIC_GA4_ID.

## Structure

- `src/pages/index.astro` and `src/pages/case-studies/[slug].astro`: the pages.
- `src/layouts/Site.astro`: metadata, navigation, contact and analytics.
- `src/components/v3`: icons.
- `src/content/v3.js`: public figures and stories, matching the PDFs.
- `src/styles/v3.css`: tokens and styles.
- `public/documents`: résumé and portfolio PDFs copied from Andrew’s Drive masters.
- `docs/career-facts.md`: the public claims and their source PDFs.
