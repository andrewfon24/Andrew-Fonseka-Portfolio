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
- Hero: eyebrow “Andrew Fonseka, MBA · Paid Media Specialist”, headline “Most ad reports stop at the click. Mine start there.”, “Contact me” and “View résumé (PDF)”, then “Open to paid media roles.” Contact section “Hiring a Paid Media Specialist?” addresses agency and in-house teams. No location on the site pages; the PDFs carry contact details.
- The PDFs in `public/documents/` are copies of the Drive masters, not generated. Replace them byte for byte when Andrew updates the masters.
- Glass navbar with a square headshot before the name. Pill buttons and links. Navy #0c2037 and blue #2164a9, Archivo headings, Inter body. Full-width footer bar.
- Update this guide or docs/career-facts.md in the same commit as a change to an approved decision or claim.
