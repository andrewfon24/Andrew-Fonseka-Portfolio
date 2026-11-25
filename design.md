# Andrew Fonseka portfolio: design notes

## Purpose

Help agency recruiters, hiring managers and CMOs decide whether to interview Andrew for a Paid Media Specialist role. A recruiter should find his role, proof points and contact action within a minute; a director should be able to judge four case studies in a few minutes. Email (“Contact me”) is the primary action, the résumé the secondary. Never invent results or promise interviews.

## Visual system

- Light #f7faff and white, navy #0c2037, blue #2164a9, pale accents #eef5fc, rules #d6e0ea. Navy contact ending.
- Archivo display, Inter body, locally hosted. One H1 per page, H2 for sections, H3 for blocks.
- Sticky translucent navigation with the square headshot before the name; opaque fallback for reduced transparency.
- Pill buttons and links; rounded cards with subtle borders.
- Diagram roles: acquisition blue, CRM navy, measurement teal #0b6b6a with dashed borders, feedback solid blue. Every node also carries a text label, so colour is never the only cue.
- Charts start at zero, label their periods and baselines, and keep their evidence note beside them.

## Layout

Hero (role-first copy, portrait) → proof strip (four tiles with source lines) → results (Aegon, Kites Global: Pan Asia Bank, Godrej, Petmart) → approach (four steps) → about with career timeline → toolkit → references → contact. Case pages: context, my role, what we did with a visual, outcome with tiles, chart and evidence note, limits, next time, then the next case.

On phones the hero copy and buttons come before the portrait, and the Aegon architecture diagram becomes a numbered vertical list.

## Documents

`npm run documents` prints the résumé (one Letter page) and portfolio (Letter landscape: summary, four cases, contact) from `documents/` templates and `src/content/v3.js`, so the PDFs repeat the site’s figures and caveats. Text stays selectable.
