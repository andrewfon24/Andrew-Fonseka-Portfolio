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

Astro generates complete HTML for the homepage, five case studies and a custom 404 page in `dist/`. Static sections are Astro components with no client JavaScript; a small script (`src/scripts/motion.js`) adds scroll reveals, counters, chart drawing and the testimonial, toolkit and timeline controls. React loads only for the interactive islands: three Stageshow product demos (two on the homepage, the CRM funnel on the university case), the Liveline pacing line and the university campaign explorer, each hydrated when it scrolls into view. The hero funnel panel is static HTML and CSS. Every figure, chart value and case narrative is in the HTML before JavaScript runs.

## Validate

```sh
npx playwright install chromium
npm test
```

Fourteen Playwright checks cover the positioning and primary action, the hero funnel and accounts line, the four results chapters and their alignment, documents and analytics hooks, navigation, case routes with refresh and back, the university evidence that replaced the Meta Ads screenshot, the figure-free Aegon case, the timeline, testimonials and toolkit filters, automated WCAG 2.1 AA checks at desktop and phone widths, no-JavaScript reading, reduced motion, counters and 404 recovery. Chromium is read from `CHROMIUM_PATH` or `/usr/bin/chromium`; on macOS, `CHROMIUM_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"` uses an installed Chrome.

## Publish

For a Vercel Git import, select the Astro preset, use `npm run build` as the build command and `dist` as the output directory. You can also deploy the generated `dist/` directory as static output. The production project is `andrew-fonseka-portfolio` under Andrew Fonseka’s projects. Its verified domains are `andrewfonseka.com` and `www.andrewfonseka.com`, with www redirecting to the apex domain.

The build uses `https://andrewfonseka.com` for canonical links, per-page social metadata and the sitemap. `public/robots.txt` points to the generated sitemap. No backend, contact-form service, analytics tracker or API key is needed.

## Sources and structure

- `design.md`: the locked design system (tokens, rules, motion, content boundaries).
- `src/content/site.js`: every fact on the site, from the 2026 résumé and portfolio PDFs.
- `src/pages/`: the homepage, the case-study route, 404 and sitemap.
- `src/layouts/SiteLayout.astro`: metadata, structured data, fonts, nav, contact and footer.
- `src/components/`: static sections (`home/`), charts (`charts/`), icons and figures.
- `src/islands/`: React islands. `GoLiveDemo`, `FunnelCrmDemo` and `ApproachDemo` are built with the Stageshow kit; `PacingLine` uses Liveline; `CampaignExplorer` drives the university per-campaign charts.
- `src/kit/`: the Stageshow kit (MIT, benjitaylor/skills), copied unmodified.
- `src/styles/tokens.css` and `site.css`: the only place colours, type, spacing and motion are declared.
- `src/scripts/motion.js`: progressive enhancement for every page.
- `docs/design-and-sources.md`: content and asset provenance; `docs/impeccable-review.md`: the Hallmark and Impeccable review.

The demos are illustrations of real processes, labelled as such, drawn as the app's own panel without OS window chrome. They show no employer results, client data or student data. The university case presents the Meta Ads Manager figures as charts (funnel, rate, cost per enrolment, volume against conversion and a table) instead of the original screenshot.
