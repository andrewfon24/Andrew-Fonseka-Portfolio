// Letter-landscape portfolio PDF: summary, four cases, references and contact.
// Figures and caveats repeat the site exactly (src/content/v3.js and the case pages).
import { baseCss, esc, file, bars, evidence } from './shared.mjs';
import { profile, metrics, problems, stories, references, periods } from '../src/content/v3.js';

const story = (id) => stories.find((s) => s.id === id);
const head = (id, n) => {
  const s = story(id);
  return `<div class="case-head"><span class="eyebrow">Case study ${n} of 4 · ${esc(s.short)}</span><h2>${esc(s.title)}</h2><p class="meta">${esc(s.meta)}. ${esc(s.role)}.</p></div>`;
};
const tiles = (items) => `<div class="tiles">${items.map(([v, l], i) => `<div class="${i === 0 ? 'is-lead' : ''}"><span class="stat num">${esc(v)}</span><small>${esc(l)}</small></div>`).join('')}</div>`;
const block = (title, text) => `<div class="blk"><b>${esc(title)}</b><p>${esc(text)}</p></div>`;
const foot = (n) => `<div class="pfoot"><span>Andrew Fonseka · Paid Media Specialist · andrewfonseka.com</span><span>${n} / 6</span></div>`;

export default function portfolio({ crmSvg }) {
  return `<!doctype html><html lang="en-CA"><head><meta charset="utf-8"><title>Andrew Fonseka Portfolio, Paid Media Specialist</title>
<meta name="author" content="Andrew Fonseka"><meta name="description" content="Four paid media case studies by Andrew Fonseka">
<style>${baseCss}
@page{size:11in 8.5in;margin:0}
.page{width:11in;height:8.5in;padding:40px 48px 30px;display:flex;flex-direction:column;gap:14px;overflow:hidden;position:relative;break-after:page;font-size:11px;line-height:1.5;background:var(--ground)}
.page:last-child{break-after:auto}
.pfoot{margin-top:auto;display:flex;justify-content:space-between;font-size:8.5px;color:var(--muted);border-top:1px solid var(--rule);padding-top:7px}
.meta{font-size:10.8px;color:var(--muted)}
.case-head{display:flex;flex-direction:column;gap:4px}
.case-head h2{font-size:27px;letter-spacing:-.02em;line-height:1.1}
.cols{display:grid;gap:22px;flex:1;min-height:0}
.col{display:flex;flex-direction:column;gap:10px;min-width:0}
.blk b{display:block;font-size:11px;color:var(--ink);margin-bottom:1px}
.blk p{font-size:11.6px}
.tiles{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.tiles div{background:#fff;border:1px solid var(--rule);border-radius:10px;padding:8px 10px;display:flex;flex-direction:column;gap:3px}
.tiles .is-lead{background:var(--blue);border-color:var(--blue)}
.tiles .is-lead .stat{color:#fff}.tiles .is-lead small{color:var(--blue-tint)}
.tiles .stat{font-size:23px}.tiles small{font-size:9.6px;line-height:1.35}
.bars{margin:0;background:#fff;border:1px solid var(--rule);border-radius:10px;padding:9px 11px;display:flex;flex-direction:column;gap:5px}
.bars figcaption{font-size:9.5px;font-weight:600;color:var(--ink)}
.bar-row{display:grid;grid-template-columns:1fr auto;grid-template-areas:'l l' 't v';gap:2px 8px;align-items:center;font-size:9.6px}
.bl{grid-area:l}.bt{grid-area:t;height:13px;border-left:2px solid var(--ink)}.bb{display:block;height:100%;background:var(--slate);border-radius:0 3px 3px 0}.bb.is-blue{background:var(--blue)}
.bar-row b{grid-area:v;color:var(--ink);font-size:9.5px}
.evidence{background:var(--pale);border-radius:10px;padding:10px 12px;font-size:9.6px;line-height:1.45}
.evidence>b{color:var(--ink);font-size:9.5px}
.evidence dl{margin:4px 0 0;display:grid;grid-template-columns:62px 1fr;gap:3px 9px}
.evidence dt{font-weight:600;color:var(--ink)}.evidence dd{margin:0}
.creative{margin:0;display:flex;flex-direction:column;gap:6px}
.creative img{width:100%;border-radius:12px;border:1px solid var(--rule);display:block;object-fit:cover}
.creative figcaption{font-size:10px}
.split{display:flex;height:22px;border-radius:6px;overflow:hidden;font-size:9px;font-weight:600}
.split span{display:flex;align-items:center;padding:0 8px}
.fig{background:#fff;border:1px solid var(--rule);border-radius:10px;padding:9px 11px;display:flex;flex-direction:column;gap:6px}
.fig .cap{font-size:10.4px;font-weight:600;color:var(--ink)}
.fig .n{font-size:9.2px;color:var(--muted)}
.chain{display:grid;gap:5px}
.chain div{border:1px solid var(--rule);border-radius:8px;padding:7px 8px;font-size:9.2px;line-height:1.35;background:#fff}
.chain div b{display:block;color:var(--ink);font-size:9px}
.chain div.is-blue{background:var(--blue);border-color:var(--blue);color:var(--blue-tint)}.chain div.is-blue b{color:#fff}
.limit{font-size:10.5px;color:var(--body)}
.next{background:var(--pale-2);border-radius:10px;padding:9px 12px;font-size:10.4px;color:var(--ink)}
.next b{margin-right:5px}
.arch-svg{width:100%;height:auto;display:block}
.arch-svg .arch-tag{font-family:var(--text);font-size:12px;font-weight:600;letter-spacing:.08em}
.arch-svg .arch-title{font-family:var(--display);font-size:18px;font-weight:600}
.arch-svg .arch-sub{font-family:var(--text);font-size:14px}
.arch-svg .arch-labels text{font-family:var(--text);font-size:13px;fill:var(--muted)}
/* cover */
.cover-top{display:grid;grid-template-columns:150px 1fr;gap:24px;align-items:center}
.cover-top img{width:150px;height:170px;object-fit:cover;object-position:50% 15%;border-radius:14px;border:1px solid var(--rule)}
.cover-top h1{font-size:34px;letter-spacing:-.025em;line-height:1.05;margin:6px 0 8px}
.cover-top h1 span{color:var(--blue)}
.cover-top p{font-size:11.5px;color:var(--ink);max-width:640px}
.proof{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
.proof div{background:#fff;border:1px solid var(--rule);border-radius:12px;padding:10px 12px;display:flex;flex-direction:column;gap:3px}
.proof div:first-child{background:var(--blue);border-color:var(--blue)}
.proof div:first-child .stat,.proof div:first-child b{color:#fff}.proof div:first-child small{color:var(--blue-tint)}
.proof .stat{font-size:26px}.proof b{font-size:10.5px;color:var(--ink);font-weight:600}.proof small{font-size:8.6px;line-height:1.35;color:var(--muted)}
.probs{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.prob{background:#fff;border:1px solid var(--rule);border-radius:12px;padding:11px 13px;display:flex;flex-direction:column;gap:5px}
.prob .lab{font-size:9px;font-weight:600;color:var(--blue-ink)}
.prob h3{font-size:14px;line-height:1.2}
.prob .out{display:flex;gap:14px}.prob .out .stat{font-size:17px;display:block}.prob .out small{font-size:8.5px;line-height:1.3;display:block}
.prob p{font-size:9.5px}
.sec{font-family:var(--text);font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--blue-ink)}
/* last page */
.navy{background:var(--ink);color:var(--on-navy)}
.navy h2{color:#fff;font-size:28px;letter-spacing:-.02em;line-height:1.1;max-width:720px}
.quotes{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.quotes figure{margin:0;background:#1d3a5c;border-radius:12px;padding:14px;display:flex;flex-direction:column;gap:10px}
.quotes blockquote{margin:0;font-family:var(--display);font-weight:600;font-size:12.5px;line-height:1.4;color:#fff;flex:1}
.quotes figcaption{font-size:9px;color:var(--on-navy)}.quotes figcaption b{display:block;color:#fff;font-size:10px}
.navy .pfoot{border-color:#4a6585;color:var(--on-navy)}
.cta{display:flex;flex-wrap:wrap;gap:10px}
.cta a{border:1px solid #4a6585;border-radius:999px;padding:7px 14px;color:#fff;font-size:10.5px}
.cta a:first-child{background:#fff;color:var(--ink);border-color:#fff}
</style></head><body>

<section class="page">
  <div class="cover-top">
    <img src="${file('public/images/andrew-fonseka-480.webp')}" alt="Andrew Fonseka">
    <div><span class="eyebrow">Andrew Fonseka, MBA · Paid Media Specialist</span>
      <h1>Most ad reports stop at the click. <span>Mine start there.</span></h1>
      <p>I follow every campaign past the click to the loan, the application or the sale. I’ve owned client accounts at an agency in Colombo and run paid media for Canadian and U.S. financial services at Aegon, across Google, Meta and LinkedIn, with conversion tracking and CRM data behind every decision. I also built an AI-assisted campaign builder that gets campaigns ready for review and launch.</p>
    </div>
  </div>
  <span class="sec">What happened after the click</span>
  <div class="proof">${metrics.map((m) => `<div><span class="stat num">${esc(m.value)}</span><b>${esc(m.label)}</b><small>${esc(m.source)}</small></div>`).join('')}</div>
  <span class="sec">Three challenging problems I solved</span>
  <div class="probs">${problems.map((p, i) => `<div class="prob"><span class="lab">0${i + 1} · ${esc(p.label)} · ${esc(p.client)}</span><h3>${esc(p.title)}</h3><div class="out">${p.outcome.map(([v, l]) => `<div><span class="stat num">${esc(v)}</span><small>${esc(l)}</small></div>`).join('')}</div><p>${esc(p.did)}</p><p class="note">${esc(p.note)}</p></div>`).join('')}</div>
  ${foot(1)}
</section>

<section class="page">
  ${head('aegon', 1)}
  <div class="cols" style="grid-template-columns:1.05fr 1fr">
    <div class="col">
      <div class="fig"><span class="cap">How CRM lead stages feed back to ad platforms (conceptual)</span>${crmSvg}<span class="n">Conceptual representation. Exact event paths, consent controls and platform integrations depend on implementation. No employer data shown.</span></div>
      ${block('The campaign builder', 'An AI-assisted preparation workflow: a marketer enters the brief, the tool drafts copy, hooks, targeting ideas, keywords, naming and UTMs, and a person reviews everything. For suitable Google Ads bulk campaigns it produces a CSV for Google Ads Editor, where the campaign is checked and launched through the normal approval process. It doesn’t buy media, launch on its own or certify compliance. Try the synthetic demo at andrewfonseka.com/case-studies/aegon/#builder.')}
    </div>
    <div class="col">
      ${block('Context', 'When the advertising platforms and downstream CRM records did not align, it was difficult to evaluate campaign quality consistently. Our team needed to optimize for outcomes beyond form fills.')}
      ${block('My role', 'I worked across strategy, execution, measurement and reporting. I led tracking implementation with support from colleagues, while sharing campaign execution and optimization responsibilities within the team.')}
      ${block('What we did', 'Rebuilt tracking (GA4, server-side GTM, Enhanced Conversions, Meta CAPI; March to May 2026), mapped HubSpot lead stages to conversion actions on eligible platforms, and tested lead-form variants against HubSpot qualified-lead rate (June 2026). The variants changed both question count and design, so the test can’t isolate either one.')}
      ${tiles([['−18%', 'cost per application'], ['+17 pp', 'qualified lead rate (percentage points)'], ['+22%', 'applications at the same media spend']])}
      ${evidence([['Source', 'Ad platform and HubSpot CRM reporting, recalculated with consistent definitions for both periods.'], ['Period', `${periods.aegonLong}: two six-month periods with the same paid media spend.`], ['Metric', 'Cost per application = spend ÷ applications: 1 ÷ 1.22, about 18% lower. Cost per lead fell 15%.'], ['Limits', 'Whole account, several changes and team contributions; not a controlled test. Applications aren’t funded policies or revenue.']])}
      <div class="next"><b>Next time</b>Validate the measurement architecture and CRM conversion definitions before scaling, then check whether conversion volume and value data support further downstream bidding.</div>
    </div>
  </div>
  ${foot(2)}
</section>

<section class="page">
  ${head('panasia', 2)}
  <div class="cols" style="grid-template-columns:240px 1fr 1fr">
    <div class="col">
      <figure class="creative"><img src="${file('public/images/campaigns/gold2cash.webp')}" alt="Gold2Cash ad for Pan Asia Bank: gold jewellery on a cobwebbed stand"><figcaption><b>The insight:</b> gold kept at home earns nothing. Creative concept developed with the Kites Global designers.</figcaption></figure>
    </div>
    <div class="col">
      ${block('Context', 'The bank’s objective was funded gold loans, not form fills. Cost per lead couldn’t show which leads became loans, and when the client questioned it, the obvious move would have been to chase cheaper leads.')}
      ${block('My role', 'As the agency account lead, I owned strategy, execution, optimization and reporting, with support from my manager.')}
      ${block('The decision', 'I explained why lower-cost leads were not necessarily more valuable, defended the targeting and reviewed budget allocation every month using platform performance, qualification data and the sales team’s feedback.')}
      <div class="fig"><span class="cap">The monthly review loop</span><div class="chain" style="grid-template-columns:repeat(5,1fr)"><div><b>Platform reporting</b>Spend, leads, CPL</div><div><b>Qualification and sales feedback</b></div><div><b>Client discussion</b>The trade-off</div><div><b>Budget adjustment</b>Meta and Google</div><div class="is-blue"><b>Next monthly review</b></div></div></div>
      <div class="fig"><span class="cap">Cumulative media allocation, Feb–Jun 2023</span><div class="split"><span style="flex:60;background:var(--blue);color:#fff">Meta 60% · US$15K</span><span style="flex:40;background:var(--pale-2);color:var(--ink);justify-content:flex-end">Google 40% · US$10K</span></div><span class="n">Totals across five months, not a fixed or final split.</span></div>
    </div>
    <div class="col">
      ${tiles([['259', 'funded gold loans, reported by the bank’s CRM'], ['~2.45×', 'monthly paid-media funded loans vs the prior baseline'], ['~US$97', 'media cost per funded loan']])}
      ${bars('Funded gold loans per month', [['Before: ~127 in 6 months (bank estimate)', 21.2, '~21.2'], [`During: 259 in 5 months (${periods.panasia})`, 51.8, '51.8']])}
      <p class="limit">US$25,000 of actual media spend. Funded principal was about US$500,000: loan value, not bank revenue or return.</p>
      ${evidence([['Source', 'The bank’s CRM (advertising-generated funded loans); the baseline is the bank’s own estimate.'], ['Metric', '259 ÷ 5 = 51.8 a month vs ~127 ÷ 6 ≈ 21.2. US$25,000 ÷ 259 ≈ US$97.'], ['Limits', 'Earlier spend and channel-level loan cost unavailable; observational, not an incrementality test.']])}
      <div class="next"><b>Next time</b>Set up a reliable CRM-to-platform feedback process and measure funded-loan cost by channel where matching and consent permit.</div>
    </div>
  </div>
  ${foot(3)}
</section>

<section class="page">
  ${head('godrej', 3)}
  <div class="cols" style="grid-template-columns:240px 1fr 1fr">
    <div class="col">
      <figure class="creative"><img src="${file('public/images/campaigns/godrej.webp')}" alt="Godrej Expert Rich Crème ad: a pixelated Error 404 with the line Sorry, no grey hair found"><figcaption><b>The insight:</b> a 404 joke gets noticed and makes the same grey-coverage promise. Creative by the Kites Global team.</figcaption></figure>
    </div>
    <div class="col">
      ${block('Context', 'A competitive hair colour launch where every brand already promises full grey coverage. The team needed a memorable way to say it.')}
      ${block('My role', 'I owned the paid media strategy and execution across Meta and YouTube, with a US$23,000 media investment, and contributed to the agency’s creative strategy within a 30-creator campaign. Colleagues managed the creators and promo codes.')}
      ${block('What we did', 'Combined creator partnerships with paid amplification. Creator-specific promo codes tracked retail redemptions from both paid and organic audiences.')}
      <div class="fig"><span class="cap">Two routes to the same promo codes</span><div class="chain" style="grid-template-columns:1fr 1fr 1fr"><div><b>Creator posts</b>Organic reach, 30 creators</div><div><b>Paid amplification</b>Meta and YouTube, US$23K</div><div class="is-blue"><b>Creator promo codes</b>~US$350K tracked retail sales</div></div><span class="n">Both routes end in the same codes, so sales can’t be split between paid and organic.</span></div>
      <div class="fig"><span class="cap">Total campaign cost: US$30,000</span><div class="split"><span style="flex:23;background:var(--blue);color:#fff">Paid media US$23K</span><span style="flex:7;background:var(--pale-2);color:var(--ink);justify-content:flex-end">US$7K</span></div><span class="n">US$23,000 media plus US$7,000 influencer costs.</span></div>
    </div>
    <div class="col">
      ${tiles([['~11.7×', 'tracked retail sales per total campaign dollar'], ['3.25%', 'Meta click-through rate, campaign-wide'], ['45%', 'YouTube view rate, campaign-wide']])}
      ${bars('Total campaign cost vs. sales tracked by creator codes', [['Total campaign cost (media and influencers)', 30, 'US$30K'], ['Tracked retail sales (paid and organic)', 350, '~US$350K']])}
      ${evidence([['Source', 'Retail redemptions of the creator codes; platform reporting for CTR and view rate.'], ['Period', `${periods.godrej.replace('Feb', 'February').replace('Jul', 'July')}.`], ['Metric', '~US$350,000 ÷ US$30,000 ≈ 11.7×. Not ROAS, ROI or profit.'], ['Limits', 'Codes were open to organic and paid audiences, so paid media’s own contribution and incremental lift weren’t measured.']])}
      <div class="next"><b>Next time</b>Separate paid and organic tracking where feasible, and design a holdout or another incrementality study before attributing sales to paid distribution.</div>
    </div>
  </div>
  ${foot(4)}
</section>

<section class="page">
  ${head('petmart', 4)}
  <div class="cols" style="grid-template-columns:220px 1fr 1fr">
    <div class="col">
      <figure class="creative"><img src="${file('public/images/campaigns/petmart.webp')}" alt="Petmart and Sugar Beach Valentine’s ad: a golden retriever in a heart collar"><figcaption><b>The insight:</b> pet owners don’t want to leave the dog at home on date night.</figcaption></figure>
    </div>
    <div class="col">
      ${block('Context', 'Petmart wanted to grow its audience and drive in-store sales around Valentine’s Day, then build ongoing e-commerce acquisition.')}
      ${block('My role', 'I led the campaign strategy and execution: an organic giveaway, an in-person activation and paid promotion. I later built the Merchant Center feed and ran Shopping and Performance Max with customer acquisition goals and audience signals.')}
      <div class="fig"><span class="cap">Timeline</span><div class="chain" style="grid-template-columns:repeat(4,1fr)"><div><b>January</b>Giveaway, organic</div><div class="is-blue"><b>February 14</b>Sugar Beach event, coupons</div><div><b>Late February</b>Paid promotion, US$500</div><div><b>March to May</b>Shopping and Performance Max</div></div></div>
      ${block('Phase 1: Activation', '1,700 giveaway entries and US$25,000 in in-store sales tracked through event coupons. Valentine’s paid promotion cost US$500. The event results reflect the giveaway, partner event and promotion together, not advertising alone.')}
      ${block('Phase 2: Acquisition', 'Across the campaign, ad-attributed revenue was four times the US$5,000 total media spend, which includes the US$500 Valentine’s promotion.')}
    </div>
    <div class="col">
      ${tiles([['4×', 'ROAS across the campaign, February to May'], ['US$25K', 'in-store sales on event coupons'], ['1,700', 'giveaway entries']])}
      <div class="fig"><span class="cap">Total media spend: US$5,000, Feb–May 2023</span><div class="split"><span style="flex:1;background:var(--ink)"></span><span style="flex:9;background:var(--blue);color:#fff">Rest of the campaign US$4,500</span></div><span class="n">The navy sliver is the US$500 Valentine’s promotion, part of the total rather than extra.</span></div>
      ${evidence([['Source', 'Platform revenue attribution for the 4×; client-reported coupon redemptions for store sales.'], ['Metric', 'ROAS = ad-attributed revenue across both phases ÷ US$5,000 total media. Coupon sales are separate and not added.'], ['Limits', 'Event sales reflect combined activities. The 4× isn’t first-order ROAS, profit or a lift estimate.']])}
      <div class="next"><b>Next time</b>Align spend and revenue windows by phase, keep event and always-on results apart from the start, and capture consented first-party data where appropriate.</div>
    </div>
  </div>
  ${foot(5)}
</section>

<section class="page navy">
  <span class="eyebrow" style="color:var(--sky,#8dbbe8)">References</span>
  <div class="quotes">${references.map((r) => `<figure><blockquote>“${esc(r.quote)}”</blockquote><figcaption><b>${esc(r.name)}</b>${esc(r.role)}</figcaption></figure>`).join('')}</div>
  <div style="margin-top:22px;display:flex;flex-direction:column;gap:12px">
    <h2>Hiring a Paid Media Specialist?</h2>
    <p style="font-size:12px;max-width:640px">Whether you’re an agency managing client accounts or an in-house team growing your own, I can help connect paid media to the outcomes that matter: qualified leads, applications and sales.</p>
    <div class="cta"><a href="${profile.mailto}">${profile.email}</a><a href="${profile.linkedin}">linkedin.com/in/andrewfonseka</a><a href="${profile.site}">andrewfonseka.com</a></div>
  </div>
  ${foot(6)}
</section>
</body></html>`;
}
