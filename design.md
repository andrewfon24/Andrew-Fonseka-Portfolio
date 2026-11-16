# Andrew Fonseka — approved editorial design

Andrew approved publication of the narrative refinement on 15 November 2026, including a compact approach section, redesigned recommendations, larger hero metrics and a translucent navbar on scroll.

## Purpose and content

Help hiring managers evaluate Andrew for paid media specialist roles in Greater Vancouver and remote within Canada. Email is the primary action, résumé the secondary. Keep the founder mindset grounded in acquisition cost, lead quality and commercial judgement; do not invent business outcomes or promise interviews.

Source facts remain in `src/content/site.js`, with homepage copy in `src/content/editorial.js` and case narratives in `src/content/stories.js`. The voice follows Andrew’s career journey and personality, supported by results. Preserve confidentiality boundaries for Aegon. University screenshot supports Meta leads and spend; enrolments are separately attributed to the admissions CRM. Recommendations retain the source quotations.

## Visual system

- Predominantly light #f7faff / white, navy #0c2037 and blue #2164a9. Pale accents #eef5fc, rules #d6e0ea. Navy contact ending. No gold accents.
- Archivo display and Inter body, locally hosted. Clear hierarchy, restrained motion and generous spacing.
- Full-width, constant-height sticky navigation. Solid at the top; 88% white with 16px backdrop blur after scrolling, with an opaque reduced-transparency fallback. AF roundel and identity left, links centered on desktop, email action right. On narrow screens links occupy a second row.
- Large personal introduction and square portrait. Three prominent outcome links, one featured university story and four supporting cards. Outcome links stack into readable rows on phones.
- Rounded rectangular case cards; pill-shaped actions with white/blue fills. Contact uses rectangular icon buttons from the owner's reference, email primary.
- Results → What I bring → grouped tools and credentials → personal introduction beside collapsible career timeline → three recommendations → contact.
- Compact three-column approach on desktop and stacked on phones. Recommendations feature the direct manager’s exact quote beside the teacher and colleague quotes, using pale blue and white cards. Native disclosures for career, recommendations and source evidence. Campaign comparison changes only on user input. No autoplay or ornamental animation.
- Case return action has 64px desktop / 48px phone breathing room before contact.

## Production checks

Astro static output: homepage, five case studies, custom 404 and sitemap. Canonical and social metadata use andrewfonseka.com. Preview-only chrome and paths are absent from production. Existing Vercel Analytics retained; optional GA4 configuration preserved.

14 Playwright tests cover 320–1440px responsive layout, sticky header, links, documents, native keyboard controls, campaign controls, image integrity, no-JavaScript reading, reduced motion, 404 recovery and automated WCAG A/AA checks. Visual refinement review follows the requested Oil UI workflow. Impeccable, brand and motion guidance inform implementation; approved user choices take priority over generic template rules.

## Documents

The résumé remains one Letter page; portfolio remains eight landscape pages. Fonts, words, image bytes, links, geometry and all non-colour PDF drawing operations are preserved. Palette changes align opening pages with the light website; the portfolio closing contact page remains navy. Verification receipt: `docs/pdf-verification.json`.

## Delivery performance

Responsive 480/720px WebP portrait avoids the original high-resolution JPEG download. Brand icons below the fold load lazily. Critical styles are inlined, two primary font files are preloaded, and static images have a one-week browser cache policy. No new runtime dependencies. Analytics and public indexing remain enabled in production.
