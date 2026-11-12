# Hallmark and Impeccable review

Applied at the owner's request during the November 2026 redesign: Hallmark 2.0.0 (Nutlope/hallmark), redesign at full depth, and Impeccable's audit and craft floor (pbakaus/impeccable). Neither skill's scripts were executed; their published rules were applied by hand and verified in the browser and with Playwright and axe.

## Hallmark

- Locked system in `design.md`; the brand (navy, blue, gold, Archivo and Inter) is kept, not dealt a theme.
- Stamp, critique and waivers are the first lines of `src/styles/site.css`.
- Waived on the record: 38iii, the two-tone headline, which is the brand pattern from the owner's PDFs.
- Answered: 47a, the demos are drawn as the app's own panel with no OS title bar, traffic lights or URL pill; 84, the products shown are private and cannot be captured, so the demos are labelled illustrative.
- No eyebrows, tracked-caps labels or middle-dot meta strings; meta is separate chips.
- Every colour, font and spacing value goes through `tokens.css`; animations use transform and opacity; reveals only hide content under the `.js` class; every motion has a reduced-motion state.

## Impeccable

Fixed: a decorative grid overlay in the hero, bordered cards that also carried a wide resting shadow, card radii above 16px, a role label that turned the testimonial avatar grey on navy, gold text under 4.5:1 on the pale paper, a navy-panel caption in grey, and a scrollable table that was not keyboard-focusable.

Kept on purpose: the four-figure proof band under the hero. Impeccable lists the big-number band as a template, but these are the owner's figures from the portfolio cover; each links to its case study and carries its source.

Validation: production build, twelve Playwright checks, axe WCAG 2.1 AA at 1440 and 375 px on every page, no-JavaScript and reduced-motion runs, and desktop and phone review in the browser. No performance score or formal accessibility certification is claimed.
