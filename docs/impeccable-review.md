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

## Story pass (November 2026)

Direction A ("Signal") was chosen by the owner from three side-by-side directions (the Oil UI method): the existing brand kept, the story restructured for agency hiring managers.

- Removed the hero eyebrow. At the owner's request the hero keeps the portrait, and the strip beneath it shows three facts about the person (years, agency accounts, platforms) instead of outcome figures, so it does not repeat the results cards. Impeccable lists the figure strip as a template; it is kept on purpose.
- Motion: the hero enters once on load. Curves and durations come from the existing tokens (ease-out entrances, transform and opacity only, hover gated behind `(hover: hover)`, reduced motion shipped with the animation).
- Results are four chapters on one grid instead of a feature card and a bento of unequal cards: story left (problem, decision, result), evidence right, every edge shared. Only figures already in `src/content/site.js` are used. A "Questions you're about to ask" section was drafted and removed at the owner's request.
- Text selection is themed from the palette.
- Not used: the Brand Identity skill (the brand was kept), Dimensional Drawing (no spec sheet was needed for the page) and the Awwwards MCP (an MCP server cannot be added mid-session). No third-party skill scripts were executed.

Validation: production build, fourteen Playwright checks, axe WCAG 2.1 AA at 1440 and 375 px on every page, and desktop and phone review in the browser.

## Tightening pass

The homepage was cut from about 10.4 to 8.9 desktop screens (21.2 to 17.4 on a phone): result cards carry the headline and the result only, Aegon drops the step list that repeated the demo, the stack keeps every tool but sets them compactly, and the hero strip shows three outcomes linked to their cases.

Approach was then merged into the Aegon section (one dark band, four steps in a row), taking the homepage to about 8.3 desktop screens and 16.5 on a phone. `ApproachDemo.tsx` and `PacingLine.tsx` are kept in `src/islands` but are no longer imported.

## Objection pass (November 2026)
A hiring-manager read of the site raised six objections; the owner answered each and the true answers were worked in without adding a section.
- Hands-on depth: every result card's role line now says who made the changes in the account, and the Results intro states it once (three accounts hands-on week to week; strategy and build on the university).
- Agency scope: the Experience story names the four accounts led at Kites Global and the client calls; the Kites Global and Enfection entries carry the approved Pan Asia Bank video pitch, the Godrej India quarter and a retained pharmaceutical client.
- Budget size and the Aegon gap: one context pill, "Seven-figure annual budget", plus the same wording in the role text. No other Aegon figure.
- Practical fit: five platforms the owner will be tested on, and hybrid or on-site, stated in the toolkit intro, the story and the contact band.
- Kept off the site on purpose: the budget-entry mistake (interview story; only the pre-launch checklist is mentioned) and the work-permit end date.
- Testimonials: a third excerpt, from the owner's lecturer at University Canada West (LinkedIn, 4 November 2026), now leads the row; it is the first from Canada and the first to mention paid search and GA4. The section heading no longer says "colleagues".
- Why agency after in-house: one line in the Experience story (Aegon was one sector; the owner wants breadth across industries again). The reason the Aegon role ended, a restructuring, stays off the site as an interview answer.
- Still open: a recommendation from an Aegon colleague has been requested and is not yet on the site.
