# Andrew Fonseka’s portfolio

Live site: [andrewfonseka.com](https://andrewfonseka.com).

A portfolio for recruiters, hiring managers and CMOs evaluating Andrew for paid media and performance marketing roles. Built with Astro, React, Lucide icons, and locally hosted Archivo and Inter fonts.

## Develop and build

Use Node.js 22.12+ and npm. The `.nvmrc` file pins the version used for the published site.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

Astro generates complete HTML for the homepage, five case studies and a custom 404 page in `dist/`. The homepage is static HTML with a small script for navigation, testimonial controls and metric counters and chart animations; it does not download React. Case-study pages hydrate their interactive dashboards with React. The main content, contact details and case-study narratives are present in the HTML before JavaScript runs.

CSS is pruned at build time and inlined to avoid a render-blocking stylesheet request. Dynamic dashboard classes and pseudo-only hover/focus rules are explicitly preserved. Critical Archivo and Inter font files are preloaded. When adding homepage interactions, implement them in `src/homepage.js` or a focused Astro island rather than hydrating the full page.

## Validate

```sh
npx playwright install chromium
npm test
```

Eleven Playwright checks cover documents, direct page navigation, browser back and refresh, responsive layouts, the timeline, interactive dashboards, shared contact sections, automated WCAG 2.1 AA checks, server-rendered HTML, 404 recovery, reduced-motion preferences and the homepage loading budget. Chromium is read from `CHROMIUM_PATH` or `/usr/bin/chromium`. Automated accessibility checks supplement visual and keyboard review.

## Publish

For a Vercel Git import, select the Astro preset, use `npm run build` as the build command and `dist` as the output directory. You can also deploy the generated `dist/` directory as static output. The production project is `andrew-fonseka-portfolio` under Andrew Fonseka’s projects. Its verified domains are `andrewfonseka.com` and `www.andrewfonseka.com`, with www redirecting to the apex domain.

The build uses `https://andrewfonseka.com` for canonical links, per-page social metadata and the sitemap. `public/robots.txt` points to the generated sitemap. No backend, contact-form service, analytics tracker or API key is needed.

## Sources and structure

- `src/pages/`: native Astro routes and sitemap generation.
- `src/layouts/SiteLayout.astro`: metadata, structured data, fonts and global styles.
- `src/App.jsx`: homepage, shared navigation and page shell.
- `src/CaseStudyPage.jsx`: case narratives, dashboards and evidence.
- `src/ContactSection.jsx`: the same contact section on every page.
- `src/data.js` and `src/caseStories.js`: career history, credentials, campaign figures, narratives and measurement qualifications.
- `src/homepage.js`: progressive enhancement for homepage interactions.
- `src/entranceMotion.js`: shared, reduced-motion-aware metric counters and chart animations.
- `src/testimonials.js`: verbatim recommendations shared by static and hydrated views.
- `docs/design-and-sources.md`: content and asset provenance.
- `docs/impeccable-review.md`: Impeccable review scope and decisions.

Selected work features the private Saudi university, Pan Asia Bank and Aegon as three infographic story cards, followed by smaller Petmart and DATS cards. Every card links to its full case study. All five studies have dedicated pages. The compact career timeline keeps employers, institutions, dates and roles visible, with supporting details available on expansion.

Brand identities were researched through Brandfetch. Locally hosted product marks and fallbacks preserve recognizability; other marks use the exact Brandfetch display URLs. The Data Analysis credential has a neutral icon because its issuer was not supplied. Marks do not imply endorsement.

Andrew confirmed his bachelor’s dates as September 2019–June 2022 and his MBA dates as August 2023–October 2024. Testimonials and supplied PDF downloads remain faithful to their original wording. The university stays anonymous, and confidential Aegon acquisition figures are not published.
