# Andrew Fonseka’s portfolio

The site helps agency and in-house hiring managers decide whether to interview Andrew for a paid media role. Agency roles managing multiple accounts come first; in-house paid media roles are a secondary target, so the contact and About copy speak to both. The primary action is an email to Andrew. Production is `andrewfonseka.com`, built by Vercel project `andrew-fonseka-portfolio` from `main` in [the GitHub repository](https://github.com/andrewfon24/Andrew-Fonseka-Portfolio).

## Where to edit

| Task | Start here |
| --- | --- |
| Hero, proof strip, results, approach, about, toolkit or references | `src/pages/index.astro`. All public copy and figures (metrics, stories, career, references, plus the problem summaries used on the portfolio PDF cover) live in `src/content/v3.js`. |
| Case-study pages | `src/pages/case-studies/[slug].astro`, one block per story id: `aegon`, `panasia`, `godrej`, `petmart`. |
| Navigation, contact section, metadata, analytics | `src/layouts/Site.astro`. |
| Styles and tokens | `src/styles/v3.css`. Icons: `src/components/v3/Icon.astro`. |
| Downloadable PDFs | `public/documents/`: copies of Andrew’s Drive masters (see docs/career-facts.md). |
| Build and checks | [README](README.md). `tests/portfolio.spec.js` covers content, withdrawn claims, responsive layout, accessibility, links and documents. |

## Editorial decisions (26 November 2026)

- Andrew’s Drive résumé and portfolio (dated 27 Nov) are the source of truth, and LinkedIn follows the same rules (see the 27 Nov table in docs/career-facts.md). The site copy follows them; see docs/career-facts.md. Aegon figures are cleared to share.
- Aegon comparison wording is “H2 2025 to H1 2026”; Meta EMQ is 5.5 to 7.0. Never use “H1 to H2 2026” or 7.8.
- Freelance work (Saudi university, DIMO Academy) and the B2B apparel account stay removed. `/case-studies/university/` and `/case-studies/dats/` redirect to `/#results` in `vercel.json`.
- Homepage order: hero, four-metric strip, Results (Aegon, then Kites Global: Pan Asia Bank, Godrej, Petmart), Approach, About, Toolkit, References, contact. Navigation: Results, Approach, About, References, Contact.
- Hero: eyebrow “Andrew Fonseka, MBA · Paid Media Specialist”, headline “Most ad reports stop at the click. Mine start there.”, one-liner “Paid media measured to the sale, with the automation to run it at scale.”, “Contact me” and “View résumé (PDF)”, then “Based in Greater Vancouver. Open to paid media roles.” Contact heading “Let’s talk about what happens after the click.” addresses agencies first, then in-house teams. No phone on the site.
- About (27 Nov 2026): headline “Each move added a layer.” and the layered career arc; positioning, core messages and voice are in docs/career-facts.md.
- The PDFs in `public/documents/` are copies of the Drive masters, not generated. Replace them byte for byte when Andrew updates the masters.
- Plain white navbar with a hairline and a square headshot before the name. Pill buttons; tags and chips use small radii. Navy #0c2037 and blue #2164a9, Archivo headings (600 at most), Inter body. Sentence-case labels, no uppercase tracking. Full-width footer bar.
- 27 Nov 2026 unslop polish (heydamir/unslop, light-slop mode): no glass or gradient surfaces, one accent per chart, quiet meta text instead of pills, spacing on a 4px grid. The contact section keeps four buttons in one row on desktop (Contact me, LinkedIn, résumé, portfolio). The hero no longer repeats the campaign builder; it stays in the metric strip and the Aegon story.
- Update this guide or docs/career-facts.md in the same commit as a change to an approved decision or claim.
