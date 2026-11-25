// One-page Letter résumé built from the site's public claims (src/content/v3.js).
import { baseCss, esc } from './shared.mjs';
import { profile, metrics, certifications, periods } from '../src/content/v3.js';

const skills = ['Google Ads', 'Meta Ads', 'LinkedIn Ads', 'GA4 and GTM (server-side)', 'Enhanced Conversions and Meta CAPI', 'HubSpot CRM signals', 'Shopping and Performance Max', 'Google Ads Editor', 'Budget pacing and client reporting'];

const jobs = [
  {
    role: 'Intermediate Channel Marketing Specialist (Paid Media)', org: 'Aegon', when: 'Jan 2025 – Oct 2026 · Langley, BC',
    intro: 'Multinational life insurance, pensions and asset management company. In-house paid media for Canada and the U.S.',
    bullets: [
      'Shared campaign execution and optimization across Google Ads, Meta and LinkedIn for Canadian and U.S. financial services; contributed to strategy, measurement and reporting.',
      'Led tracking implementation with colleague support (GA4, server-side GTM, Enhanced Conversions, Meta CAPI) and fed HubSpot lead stages back to eligible ad platforms as conversion signals.',
      `Contributed to account-level results of 22% more applications and about 18% lower cost per application at the same paid media spend (${periods.aegon}; consistent measurement definitions).`,
      'Evaluated lead-form variants against HubSpot qualified-lead rate; contributed to a 17-percentage-point account-level improvement across several interventions, not the form test alone.',
      'Built an AI-assisted campaign preparation workflow producing reviewable ad copy, targeting, keyword and tracking inputs, including Google Ads Editor bulk-upload files where applicable.',
      'Designed the strategy, target account list, audiences and reporting for a LinkedIn account-based marketing program for high-net-worth investors; built budget pacing dashboards and presented biweekly results to senior leadership.',
    ],
  },
  {
    role: 'Digital Marketing Strategist', org: 'Kites Global', when: 'Jan 2023 – Aug 2023 · Colombo, Sri Lanka',
    intro: 'Digital agency. Owned 4 client accounts end to end and supported 5 more across banking, e-commerce, retail and consumer goods; worked with creative teams and presented results to clients.',
    bullets: [
      'Pan Asia Bank: managed US$25K actual media spend and adjusted allocation monthly using lead qualification and sales feedback; the bank’s CRM reported 259 funded gold loans (~US$97 of media per funded loan), about 2.4× its prior monthly paid-media volume.',
      'Godrej Expert Rich Crème: owned Meta and YouTube paid media (US$23K) within a US$30K creator campaign; creator promo codes tracked ~US$350K in retail sales across paid and organic audiences; 3.25% Meta CTR, 45% YouTube view rate.',
      `Petmart: led a Valentine’s activation with Sugar Beach (US$25K in-store sales on event coupons, from combined activities), then built the Merchant Center feed and ran Shopping and Performance Max; 4× ROAS across ${periods.petmart} on US$5K total media, including the Valentine’s promotion.`,
    ],
  },
  {
    role: 'Digital Marketing Intern', org: 'Enfection', when: 'Jul 2022 – Dec 2022 · Colombo, Sri Lanka',
    bullets: ['Supported Shopping, Performance Max, Discovery and Meta campaigns for clients in three markets (CDB Bank, Costa Coffee Singapore, Keells).'],
  },
];

export default function resume() {
  return `<!doctype html><html lang="en-CA"><head><meta charset="utf-8"><title>Andrew Fonseka Résumé, Paid Media Specialist</title>
<meta name="author" content="Andrew Fonseka"><meta name="description" content="Résumé of Andrew Fonseka, Paid Media Specialist">
<style>${baseCss}
@page{size:8.5in 11in;margin:0}
.page{width:8.5in;height:11in;padding:40px 50px 34px;display:flex;flex-direction:column;gap:13px;overflow:hidden;font-size:10.2px;line-height:1.45}
header{display:flex;flex-direction:column;gap:5px;border-bottom:2px solid var(--ink);padding-bottom:11px}
header h1{font-size:30px;letter-spacing:-.02em;line-height:1}
.contact{font-size:10px;color:var(--ink)}
.contact span+span::before{content:'·';margin:0 7px;color:var(--slate)}
h2{font-family:var(--text);font-size:9.5px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--blue-ink);margin-bottom:6px}
.profile p{font-size:10.5px;color:var(--ink)}
.skills{display:flex;flex-wrap:wrap;gap:5px;margin-top:8px}
.skills span{border:1px solid var(--rule);border-radius:999px;padding:2px 8px;font-size:9.2px;color:var(--ink);background:#fff}
.proof{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
.proof div{border:1px solid var(--rule);border-radius:9px;padding:8px 10px;display:flex;flex-direction:column;gap:2px}
.proof div:first-child{background:var(--blue);border-color:var(--blue)}
.proof div:first-child .stat,.proof div:first-child b{color:#fff}.proof div:first-child small{color:var(--blue-tint)}
.proof .stat{font-size:19px}.proof b{font-size:9.5px;color:var(--ink);font-weight:600}.proof small{font-size:8.2px;line-height:1.35;color:var(--muted)}
.job{display:flex;flex-direction:column;gap:3px;margin-bottom:9px}
.job h3{font-size:12.5px}
.job h3 span{font-family:var(--text);font-weight:500;color:var(--blue-ink)}
.when{font-size:9px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}
.intro{font-style:normal;color:var(--muted)}
ul{margin:2px 0 0;padding-left:14px;display:flex;flex-direction:column;gap:2.5px}
li{color:var(--body)}
.foot{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:auto}
.foot p{color:var(--ink)}.foot p small{display:block;color:var(--muted);font-size:9.5px}
.foot .gap{margin-top:4px}
</style></head><body><div class="page">
<header>
  <h1>Andrew Fonseka</h1>
  <div class="eyebrow">Paid Media Specialist</div>
  <div class="contact"><span>Greater Vancouver, BC</span><span><a href="mailto:${profile.email}">${profile.email}</a></span><span><a href="${profile.linkedin}">linkedin.com/in/andrewfonseka</a></span><span><a href="${profile.site}">andrewfonseka.com</a></span></div>
</header>
<section class="profile"><h2>Profile</h2>
  <p>Paid Media Specialist with agency and in-house experience in paid search, paid social, lead generation and e-commerce. Focused on CRM-connected measurement, conversion tracking, campaign optimization and account performance. Experienced in client reporting, budget decisions and AI-assisted campaign preparation. MBA, University Canada West.</p>
  <div class="skills">${skills.map((s) => `<span>${esc(s)}</span>`).join('')}</div>
</section>
<section class="proof">${metrics.map((m) => `<div><span class="stat num">${esc(m.value)}</span><b>${esc(m.label)}</b><small>${esc(m.source)}</small></div>`).join('')}</section>
<section><h2>Experience</h2>
${jobs.map((j) => `<div class="job"><h3>${esc(j.role)} <span>· ${esc(j.org)}</span></h3><div class="when">${esc(j.when)}</div>${j.intro ? `<p class="intro">${esc(j.intro)}</p>` : ''}<ul>${j.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul></div>`).join('')}
</section>
<section class="foot">
  <div><h2>Education</h2><p>MBA, Business Administration<small>University Canada West, Vancouver, BC · Jul 2023 – Oct 2024</small></p><p class="gap">BSc (Hons), Management and Digital Innovation<small>University of London · Jun 2022</small></p></div>
  <div><h2>Certifications</h2>${certifications.map(([t, i]) => `<p>${esc(t)} <small style="display:inline">· ${esc(i)}</small></p>`).join('')}<p class="gap"><small>Case studies and references: <a href="${profile.site}">andrewfonseka.com</a></small></p></div>
</section>
</div></body></html>`;
}
