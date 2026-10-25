# Andrew Fonseka’s portfolio

Live site: [andrewfonseka.com](https://andrewfonseka.com).

A proof-first portfolio for agency hiring managers evaluating Andrew for paid media roles. Built with Astro, React, Lucide icons and self-hosted variable Archivo (with width axis) and Inter.

## Develop and build

Use Node.js 22.12+ and npm.

```
npm ci
npm run dev
npm run build
npm run preview
```

Astro generates complete HTML for the homepage, five case studies and a custom 404 page in `dist/`. React hydrates the navigation, charts, question panel and case-study evidence pickers. All content and figures are in the HTML before JavaScript runs.

## Validate

```
CHROMIUM_PATH=/path/to/chromium npm test
```

Playwright checks cover the homepage story, retired claims (none of the old “open to roles”, “3+ years”, “50+”, “no sponsorship” or ≈100× wording may reappear), every case page’s problem/action/result/role structure, the evidence picker, the question accordion, mobile navigation, overflow at 320–1440px, reduced motion, analytics hooks, WCAG 2.1 AA (axe) on mobile and desktop, no-JS rendering and the 404 page.

## Analytics

- **Vercel Web Analytics** is wired in via `@vercel/analytics/astro`. Enable Web Analytics on the Vercel project for page views to record.
- **Conversion events**: every link or button with `data-track` sends an event (`resume_download`, `portfolio_download`, `email_click`, `linkedin_click`, `case_open`, `question_open`) to Vercel (custom events need a Pro plan) and to GA4 when configured.
- **GA4** is optional: set `PUBLIC_GA4_ID` (for example `G-XXXXXXX`) as an environment variable at build time and the gtag snippet is added.

## Publish

The production project is `andrew-fonseka-portfolio` on Vercel (Astro preset, `npm run build`, output `dist`). Verified domains are `andrewfonseka.com` and `www.andrewfonseka.com`, with www redirecting to the apex domain.

## Content rules

- Every figure comes from the job-search master copy. Aegon figures are relative only (NDA).
- `src/data.js`: projects, roles, experience, testimonials, toolkit and the hiring-manager questions.
- `src/caseStories.js`: case narratives and the university campaign table.
- `src/Charts.jsx`: hero funnel, comparison, split, delta and dot-matrix charts.
- `src/CaseStudyPage.jsx`: case template and per-case evidence.
- `src/site.css`: the whole design system. Brand tokens: navy, blue and gold; Archivo + Inter.
- The university stays anonymous. Testimonials are verbatim LinkedIn recommendations.
