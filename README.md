# Andrew Fonseka’s portfolio

Production: https://andrewfonseka.com

Astro static site using the approved narrative design in light, navy and blue, Archivo and Inter fonts, and the owner's portrait. The homepage, five case studies and 404 page share a persistent full-width navigation and contact footer. Native disclosures provide the career timeline and recommendations; a small script powers the evidence comparison.

## Run

Use Node 24. `npm ci`, `npm run dev`, `npm run build`, `npm run preview`.

## Validate

`npm test` builds and checks desktop/mobile layout, keyboard interactions, links, evidence, PDF downloads, SEO and automated accessibility. For local Chrome set `CHROMIUM_PATH`.

## Publish

Vercel project `andrew-fonseka-portfolio`, Astro preset, build `npm run build`, output `dist`. Production domain `andrewfonseka.com`; www redirects to apex. Canonical URLs and sitemap use that origin. Vercel Analytics remains installed; optional GA4 uses PUBLIC_GA4_ID.

## Structure

- `src/pages/index.astro` and `src/pages/case-studies/[slug].astro`: approved production pages.
- `src/layouts/EditorialLayout.astro`: metadata, navigation, contact and analytics.
- `src/components/editorial`: static components and evidence controls.
- `src/content/site.js`, `src/content/editorial.js`, `src/testimonials.js`: content and source facts.
- `src/styles/preview.css`, `editorial.css` and `storytelling.css`: approved design's base and refinement styles; filename retained from local preview history.
- `public/documents`: rebuilt résumé and portfolio downloads.
- `docs/pdf-verification.json`: exact text, image, link, font and layout preservation checks.

Earlier comparison previews and review-only materials are not published. Archived components remain in source history but do not load on production pages.
