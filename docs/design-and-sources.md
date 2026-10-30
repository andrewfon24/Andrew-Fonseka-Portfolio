# Design direction and source record

## Reference inspected

`https://www.skmfahd.com` was fetched and rendered on 22 October 2026. Its HTML, CSS, JavaScript-rendered content and desktop layout were inspected. The browser’s direct certificate store did not trust the managed proxy, so reference resources were fetched through Python’s trusted TLS configuration and rendered using Playwright route fulfillment. TLS and network verification remained enabled.

The visual system comes from the reference’s published CSS:

| Token      | Reference value    |
| ---------- | ------------------ |
| Navy       | `hsl(215 65% 13%)` |
| Soft navy  | `hsl(215 61% 18%)` |
| Blue       | `hsl(210 64% 48%)` |
| Light blue | `hsl(207 68% 63%)` |
| Pale blue  | `hsl(208 68% 95%)` |
| Gold       | `hsl(38 63% 46%)`  |
| Light gold | `hsl(38 66% 55%)`  |
| Ink        | `hsl(215 35% 13%)` |
| Body grey  | `hsl(213 23% 31%)` |
| Border     | `hsl(210 30% 89%)` |

Headings use Archivo; body text uses Inter. Fonts are self-hosted through Fontsource. Small text receives darker foregrounds where needed for contrast while retaining the reference’s hue family. The reference’s main content shell is approximately 1096 px wide at a 1440 px viewport.

The adapted sequence follows its portrait hero → navy metrics band → approach → interactive systems → selected results → references → career and education → tools and credentials → hiring contact. Andrew’s content is shorter, with more visible diagrams and interactive data. No SKM Fahd career history, testimonials, employer details, or performance claims are used as Andrew’s experience.

## Authoritative content

1. User-supplied `Andrew_Fonseka_Portfolio.pdf` (nine pages).
2. User-supplied `Andrew_Fonseka_Resume_Design.pdf`.
3. User interview: hiring-manager audience; paid media/performance marketing positioning; named clients may appear publicly; PDFs are current; original-site screenshots may be reused; no résumé rewrite requested.
4. `https://www.andrewfonseka.com` and its `/case-studies/agency-work/`, `/case-studies/saudi-university/`, `/case-studies/dats/`, and `/case-studies/aegon/` pages, inspected for assets and supporting context.

The original website contained a different freelance client count in its About section. Andrew explicitly confirmed the PDFs as current, so the site uses **7 clients across 4 industries**, not the original website’s conflicting count.

## Asset provenance

- `andrew-fonseka.jpg`: original 1122 × 1402 portrait extracted from the supplied portfolio PDF; matches the user’s attached portrait. No synthetic changes to the portrait.
- `university-ads-results.png`: downloaded from `https://www.andrewfonseka.com/assets/university-meta-dashboard.png`. Institution identifiers were already removed in the source.
- `petmart-valentines.jpg`: downloaded from `https://www.andrewfonseka.com/assets/petmart-valentines.jpg`. Used as a creative example in the Petmart detail panel, not as proof of the April–June performance period.
- Résumé and portfolio downloads: copies of the supplied PDFs.

## Metric interpretation

- University: 821 leads → 430 CRM-qualified → 312 fee-paid enrolments. All-campaign lead-to-enrolment rate 38.0%; cost per enrolment US$20.02. Priority colleges: 161 leads → 125 enrolments (77.6%), cost per enrolment US$28.06. Campaign groups have different objectives; low CPL alone does not establish effectiveness. USD conversion SAR 3.75, per portfolio.
- Pan Asia Bank: 259 client-reported funded loans and US$500K loan principal on US$25K media spend. About US$97 media cost per funded loan. Principal lent is not bank revenue or profit, and the loan-value-to-spend ratio is not ROAS.
- Petmart: 4:1 first-order ROAS for Shopping/PMax; client-reported +40% sales and +30% subscriptions over April–June 2023. Not an incrementality claim.
- DATS: +20% CRM-qualified leads at approximately unchanged spend; before/after index 100 → 120, not raw counts. Four-times faster enquiries is client-reported. Microsoft Ads contributed 40% of 212 leads in Andrew’s second quarter on the account.
- No fabricated time-series data, self-rated skill percentages, invented clients, synthetic testimonials, or forecasted ROI are displayed.

Charts are semantic HTML/CSS with the actual values visible. Interactive controls expose pressed state, native dialogs manage focus, reduced-motion preferences are respected, and case studies preserve the source qualifications.

## Requested refinement · October 2026

- Contact and footer were rebuilt against the user-supplied screenshot; all contact links and PDF downloads retain Andrew’s real destinations.
- The user explicitly retained Built and put to work. The standalone measurement and allocation sections are removed; their useful evidence is available inside full case studies.
- Selected-work card visuals, client names, filters and ordering remain. The action is now “Read the case study →”, matching the user’s second reference.
- All five narratives follow problem → action → result. They draw exclusively on the supplied PDFs and the evidence described above. University campaign comparison uses the supplied campaign table; no channel-attributed funded-loan counts, daily time series or private Aegon screenshots were invented.
- Brandfetch get_brands and brand_search identified the toolkit brands; build_logo_urls provided exact display-only URLs, embedded verbatim. The implementation does not programmatically download those display-only URLs.
- Locally hosted product icons and fallbacks: SVG Logos 1.2.13 (Gil Barbara, CC0) via @iconify-json/logos; Apps Script, HubSpot, Shopify and Coursera symbols from Simple Icons 11.15.0 (CC0); Lovable from pheralb/svgl (MIT), https://raw.githubusercontent.com/pheralb/svgl/main/static/library/lovable.svg. Logos remain their respective owners’ trademarks.
- Product-specific symbols are used for Google Ads, Analytics, Tag Manager, Apps Script, Looker and Power BI. Other products use the verified owning brand mark where a separate product asset is unavailable.
- Brandfetch’s CDN cannot be reached from the managed browser validation environment. Locally hosted marks cover most brands for that situation. Klaviyo continues to use the Brandfetch CDN; its text label remains visible even if the image cannot load. Issuer for Data Analysis with Spreadsheets and SQL was not supplied, so no issuer logo is invented.

## Stack update · October 2026

The user removed Apps Script, Google Ads scripts, Power BI and Enhanced Conversions from the toolkit, and renamed Server-side GTM to Google Tag Manager. Historical case-study evidence remains unchanged. Microsoft Clarity is grouped with measurement; Shopify remains in CRM & lifecycle. Added three compact groups for SEO, collaboration and productivity tools. “Newly” was explicitly withdrawn by the user.

New brands were verified through Brandfetch, with exact display URLs retained. Local fallback marks: Notion and Asana from SVG Logos 1.2.13 (CC0), Semrush from Simple Icons 16.7.0 (CC0), Ahrefs, ClickUp, Canva and Microsoft Office/365 from pheralb/svgl (MIT). Google Workspace uses the Google brand symbol. All marks remain their respective owners’ trademarks. Brandfetch asset downloads were unavailable from this environment, so local fallbacks ensure the new tools render reliably.

The three supporting tool groups are now integrated into the main interactive toolkit as selectable categories, with the same logo chips and panel format as the original four categories. The separate supporting-tools row was removed.

Final toolkit grouping: four original categories retained. Paid media includes research and creative (Ahrefs, Semrush, Canva); Measurement includes reporting and collaboration (Microsoft 365, Google Workspace); Automation includes planning and workflow (Notion, ClickUp, Asana). CRM & lifecycle retains Shopify and the existing CRM tools. Supporting tools appear as compact labelled rows inside their relevant panel.


Navbar sizing restored to the earlier compact design while retaining the current links. The hero name and complete role now align inline on desktop, with natural mobile wrapping. The portrait favicon embeds the original unmodified JPEG in an SVG viewport focused on the face; the new favicon URL avoids stale monogram caches.

Navbar clarification: retained the larger 88px desktop bar and 48px link targets, with Approach, Systems, Results, References and Contact in the middle. Paragraph typography remains unchanged pending discussion.

## Featured story cards and Drive résumé


Résumé replaced with the PDF downloaded through the authenticated Google Drive connection from file 1x_UrUejTH4t4T_Wdb5qr2ePsnV0hs78i, preserving its original bytes.


### October 2026 stack refresh

Navigation retains Results, Approach, References and Contact. Systems content remains on the page. The stack removes Supermetrics, BrightLocal, Airtable, Drip, WordPress and Wix, and adds Dynamics 365 and Jira. The original logo dimensions, chip padding and spacing are restored at the user’s request. Tool additions, removals and corrected logo assets remain.

Brandfetch verified Jira, Dynamics/Microsoft, Klaviyo and Screaming Frog. Its returned display URLs remain verbatim in the asset map; local SVGs avoid dependence on third-party image requests. Dynamics resolves to the Microsoft parent brand in Brandfetch, so the local product-specific mark is used. New local marks: Jira, Bing and Google Search Console from SVG Logos/Iconify 1.2.13; Dynamics 365 from Simple Icons 11.15.0; Klaviyo from DeskproApps/klaviyo `icon.svg`; Screaming Frog from AnthonyGleason/Portfolio-Site `src/assets/skills/screamingFrog.svg` at 5f2948cd5f459e6866c2302c644698b4c2aea461. Trademarks remain their owners’ property.


Aegon disclosure revision (2026-10-30): employer name and qualitative replacement copy cleared by the owner. Website performance figures, scope counts, detailed investor programme and evidence panel removed. Existing PDFs retained at the owner’s explicit request pending replacements; this is an outstanding document exception, not confirmation of document clearance.
