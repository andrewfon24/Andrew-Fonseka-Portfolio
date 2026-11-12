# Design: Andrew Fonseka portfolio

Locked system for every page. Hallmark reads this file first; it overrides theme dealing.

## Purpose
Help hiring managers and marketing leaders see, in under a minute, that Andrew runs paid media judged on business outcomes, then email him. Positioning: Paid Media & Performance Marketing Specialist.

## Story (November 2026 pass)
Written first for agency hiring managers in Greater Vancouver; the one action is email. One thread runs top to bottom: campaigns are judged on customers in the CRM, not clicks in the ad platform.
1. Hero: the belief, the email action, "available now" and the portrait. Beneath it, three outcomes (312 fee-paid enrolments, 259 funded loans, 4:1 first-order ROAS), each linked to its case study, so the first screen carries proof.
2. Results: four accounts as cards, two to a row: context, headline, the one-line result, the evidence (figures, chart, caveat), then role and link. The problem and decision live on the case-study pages. Card rows use subgrid so a pair lines up row for row.
3. Aegon: the demo with three facts beside it (the problem, what I built, who I worked with). The step list stays on the Aegon case page. It follows the four results so all the work sits together.
4. Approach: closes the Aegon section in the same dark band, under a hairline: Audit, Define, Test, Report in one row. The approach demo is no longer on the homepage.
5. Colleagues, journey, stack, contact (email first).

## Genre and posture
Premium SaaS product page crossed with a personal brand site. Dark navy for the story-telling bands (hero, Aegon systems, contact); pale blue paper for evidence (case cards, charts). Minimal prose: every section leads with a visual (chart, product demo, timeline), with words as captions.

## Tokens
All colour and type go through `src/styles/tokens.css`. Brand values come from the résumé and portfolio PDFs.
- Navy ground `#061224`, navy `#0c2037`, raised navy `#12304d`.
- Blue `#2c7ac9` (light surfaces, actions), sky `#5ba6e3` (accent words on dark).
- Gold `#c08a2b` on light, `#d9a441` on dark: result figures only.
- Paper `#eef5fc`, surface `#ffffff`, ink `#121c2a`, body `#3d4c61`, rule `#d6e0ea`.
- Display: Archivo 800, tight tracking. Body: Inter 400/500/600.
- Container 1200px, 24px gutters (16px under 640px). Radius 14px cards, 22px feature panels, 999px chips.

## Rules
- Headline pattern from the PDF: a plain clause, then the accent clause in sky (dark) or blue (light). Never italic.
- No eyebrows, no tracked capitals, no middle-dot meta strings, except where the owner's reference screenshots ask for them: the stack and credentials kicker and group labels, the journey list head, the contact meta line and the footer tagline. Elsewhere, meta is separate chips or a two-line label.
- Result figures are gold and tabular. Every figure carries its source or qualification within one glance.
- Charts are inline SVG or HTML with their values printed; they animate with transform and opacity only.
- Product demos use the Stageshow kit (`src/kit`). Hallmark gate 47a (drawn app windows) is waived for these demos only: they illustrate a process, carry an "Illustrative" label and show no employer results.
- Liveline renders the illustrative pacing line only: no axis values, no result figures.

## Motion
Rich and purposeful. The hero enters once on load. Sections reveal once on entry (opacity plus 16px rise, 600ms, ease-out); counters run 1.2s; charts draw on entry; cards respond to the pointer with a soft spotlight. Demos play when in view and pause when offscreen. Under `prefers-reduced-motion: reduce` everything renders in its final state and demos show their poster frame. Without JavaScript all content is visible.

## Content boundaries
The résumé and portfolio PDFs are the source of truth. Never invent results, testimonials, logos or client names. Aegon shows process and responsibilities, never figures. The Saudi university stays anonymous. Phone number stays off the site; email is andrew@andrewfonseka.com.
