# Design: Andrew Fonseka portfolio

## System
- Purpose: help recruiters and marketing leaders evaluate Andrew’s work and contact him for an interview.
- Genre: editorial portfolio, retaining Andrew’s navy, blue and pale-blue brand.
- Homepage: portrait-led introduction, experience strip, a leading technical case, paired outcome cases, combined approach and references, story and timeline, tools, contact.
- Case studies: clear role and context, then the problem, contribution and evidence. The financial-services case is qualitative, with a labelled conceptual diagram.

## Tokens
`src/tokens.css` supplies spacing and type scales; brand tokens originate in `src/styles.css`. `src/hallmark.css` applies the current layouts.
- Display: Archivo, weight 800.
- Body: Inter, regular and semibold.
- Navy: hsl(215 65% 13%).
- Ink: hsl(215 35% 13%).
- Accessible action blue: #2164a9.
- Pale surface: hsl(208 68% 95%).
- Neutral paper and rules keep charts and text readable.
- Content capped at 1280px including gutters; case-reading content is narrower.
- Radius: 4px for visual surfaces and portrait; 8px for work cards. Preserve existing tools and contact treatment.

## Controls
- Primary action: navy fill, light text, at least 48px target.
- Secondary action: blue text and a clear focus ring.
- Keep case-study CTA arrows, user-requested navigation and all real destinations.
- Timeline entries begin closed. Evidence panels remain available for cases with public supporting data.

## Motion
No whole-page or section entrance animation. Existing 1.5-second number and chart animations run once. Respect reduced motion and render readable content without JavaScript.

## Content boundaries
Use cleared factual copy and attributable evidence. Never invent results, testimonials or logos. Conceptual diagrams must identify themselves as illustrative. The Aegon case must not regain removed internal results, scale figures or investor-strategy details.

## Exports
Shared stylesheet: `src/hallmark.css`; tokens: `src/tokens.css`; baseline: `src/base.css`.
