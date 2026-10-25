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

Astro generates complete HTML for the homepage, five case studies and a custom 404 page in `dist/`. React hydrates the navigation, filters, system selectors, dashboards and testimonials. The main content, contact details and case-study narratives are present in the HTML before JavaScript runs.

## Validate

```sh
npx playwright install chromium
npm test
```

Ten Playwright checks cover documents, filters, direct page navigation, browser back and refresh, responsive layouts, the AF monogram, education dates, interactive dashboards, shared contact sections, automated WCAG 2.1 AA checks, server-rendered HTML and 404 recovery. Chromium is read from `CHROMIUM_PATH` or `/usr/bin/chromium`. Automated accessibility checks supplement visual and keyboard review.

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
- `src/FeaturedSections.jsx`: interactive “Built and put to work” section.
- `docs/design-and-sources.md`: content and asset provenance.
- `docs/impeccable-review.md`: Impeccable review scope and decisions.

Selected work features Aegon, the private Saudi university and Pan Asia Bank in that order, followed by smaller Petmart and DATS cards. All five studies have dedicated pages. The compact career timeline keeps employers, institutions, dates and roles visible, with supporting details available on expansion.

Brand identities were researched through Brandfetch. Locally hosted product marks and fallbacks preserve recognizability; other marks use the exact Brandfetch display URLs. The Data Analysis credential has a neutral icon because its issuer was not supplied. Marks do not imply endorsement.

Andrew confirmed his bachelor’s dates as September 2019–June 2022 and his MBA dates as August 2023–October 2024. Testimonials and supplied PDF downloads remain faithful to their original wording. The university stays anonymous, and confidential Aegon acquisition figures are not published.
