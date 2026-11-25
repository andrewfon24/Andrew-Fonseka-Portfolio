// Synthetic demonstration of the campaign preparation workflow.
// Scripted templates only: no AI service, no network requests, no storage,
// no employer data or logic. Nothing typed here leaves the browser.
import { useEffect, useMemo, useRef, useState } from 'react';

type Brief = { id: string; label: string; product: string; offer: string; market: 'Canada' | 'United States'; objective: 'Leads' | 'Online sales'; url: string; code: string; keywords: string[]; hook: string; audience: string };

const BRIEFS: Brief[] = [
  { id: 'pets', label: 'Pet supplies, spring sale', product: 'Northwind Pet Supplies', offer: 'Spring dog food sale', market: 'Canada', objective: 'Online sales', url: 'https://example.com/spring-sale', code: 'NWPS', keywords: ['dog food sale', 'premium dog food', 'grain free dog food', 'dog food delivery'], hook: 'Your dog’s favourite food, without the full price.', audience: 'People searching for dog food and delivery, plus past site visitors as an audience signal.' },
  { id: 'dental', label: 'Dental clinic, new patients', product: 'Brightside Dental', offer: 'New patient exams', market: 'United States', objective: 'Leads', url: 'https://example.com/new-patients', code: 'BSD', keywords: ['dentist near me', 'new patient dental exam', 'family dentist', 'dental checkup booking'], hook: 'Overdue for a checkup? Book in under a minute.', audience: 'Local searches for dentists and checkups within the clinic’s service area.' },
  { id: 'fitness', label: 'Gym, trial memberships', product: 'Lumen Fitness', offer: '14-day trial membership', market: 'Canada', objective: 'Leads', url: 'https://example.com/trial', code: 'LMF', keywords: ['gym trial pass', 'gym near me', 'free gym trial', 'fitness classes near me'], hook: 'Try every class for two weeks before you decide.', audience: 'Local gym and class searches, with an audience signal of fitness-interest visitors.' },
];

const STEPS = ['Brief', 'Draft', 'Human review', 'Export', 'Ads Editor & launch'];
const REVIEW = ['I reviewed and edited the copy', 'I checked the final URL and tracking parameters', 'Brand, legal or compliance review is done where required'];

const clip = (s: string, n: number) => (s.length <= n ? s : s.slice(0, n - 1).trimEnd() + '…');
const csvCell = (v: string) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);

function draftFor(b: Brief, product: string, offer: string, market: string, objective: string) {
  const mkt = market === 'Canada' ? 'CA' : 'US';
  const obj = objective === 'Leads' ? 'LEADS' : 'SALES';
  const campaign = `${b.code}_${mkt}_${obj}_SEARCH_DEMO`;
  const adGroup = `${b.code}_${b.keywords[0].replace(/\s+/g, '-').toUpperCase()}`;
  const cta = objective === 'Leads' ? 'Book Online in Minutes' : 'Shop the Sale Online';
  return {
    campaign,
    adGroup,
    headlines: [clip(product, 30), clip(offer, 30), cta],
    descriptions: [clip(`${offer} from ${product}. ${objective === 'Leads' ? 'Book online in minutes.' : 'Order online today.'}`, 90), clip(`Sample copy for a synthetic brief in ${market}. Edit before use.`, 90)],
    keywords: b.keywords.map((k, i) => ({ text: k, match: i % 2 === 0 ? 'Phrase' : 'Exact' })),
    utm: `utm_source=google&utm_medium=cpc&utm_campaign=${campaign.toLowerCase()}`,
  };
}

export default function BuilderDemo() {
  const [step, setStep] = useState(0);
  const [briefId, setBriefId] = useState(BRIEFS[0].id);
  const brief = BRIEFS.find((b) => b.id === briefId)!;
  const [product, setProduct] = useState(brief.product);
  const [offer, setOffer] = useState(brief.offer);
  const [market, setMarket] = useState<string>(brief.market);
  const [objective, setObjective] = useState<string>(brief.objective);
  const [headlines, setHeadlines] = useState<string[]>([]);
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [checks, setChecks] = useState<boolean[]>(REVIEW.map(() => false));
  const [announce, setAnnounce] = useState('');
  const headingRef = useRef<HTMLHeadingElement>(null);
  const mounted = useRef(false);

  const draft = useMemo(() => draftFor(brief, product || brief.product, offer || brief.offer, market, objective), [brief, product, offer, market, objective]);
  const finalUrl = `${brief.url}?${draft.utm}`;

  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    headingRef.current?.focus();
    setAnnounce(`Step ${step + 1} of 5: ${STEPS[step]}`);
  }, [step]);

  const pickBrief = (id: string) => {
    const b = BRIEFS.find((x) => x.id === id)!;
    setBriefId(id); setProduct(b.product); setOffer(b.offer); setMarket(b.market); setObjective(b.objective);
  };
  const generate = () => { setHeadlines(draft.headlines); setDescriptions(draft.descriptions); setChecks(REVIEW.map(() => false)); setStep(1); };
  const validations = [
    ...headlines.map((h, i) => ({ ok: h.trim().length > 0 && h.length <= 30, label: `Headline ${i + 1}: ${h.length}/30 characters` })),
    ...descriptions.map((d, i) => ({ ok: d.trim().length > 0 && d.length <= 90, label: `Description ${i + 1}: ${d.length}/90 characters` })),
    { ok: /^[A-Z0-9]+_(CA|US)_(LEADS|SALES)_SEARCH_DEMO$/.test(draft.campaign), label: 'Campaign name follows the naming pattern' },
    { ok: finalUrl.startsWith('https://') && finalUrl.includes('utm_campaign='), label: 'Final URL uses https and carries UTM parameters' },
  ];
  const valid = validations.every((v) => v.ok);
  const approved = valid && checks.every(Boolean);

  const rows = useMemo(() => {
    const head = ['Campaign', 'Ad group', 'Row type', 'Keyword', 'Match type', 'Headline 1', 'Headline 2', 'Headline 3', 'Description 1', 'Description 2', 'Final URL'];
    const kw = draft.keywords.map((k) => [draft.campaign, draft.adGroup, 'Keyword', k.text, k.match, '', '', '', '', '', '']);
    const ad = [draft.campaign, draft.adGroup, 'Responsive search ad', '', '', headlines[0] || '', headlines[1] || '', headlines[2] || '', descriptions[0] || '', descriptions[1] || '', finalUrl];
    return [head, ...kw, ad];
  }, [draft, headlines, descriptions, finalUrl]);

  const download = () => {
    const csv = rows.map((r) => r.map(csvCell).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url; a.download = `example-${draft.campaign.toLowerCase()}.csv`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const reset = () => { pickBrief(BRIEFS[0].id); setHeadlines([]); setDescriptions([]); setChecks(REVIEW.map(() => false)); setStep(0); };

  return (
    <div className="bd" data-step={step}>
      <div className="bd-banner"><strong>Synthetic demonstration</strong> No employer data or proprietary logic. Scripted templates stand in for the AI step, and nothing you type leaves your browser.</div>
      <ol className="bd-steps" aria-label="Workflow">
        {STEPS.map((s, i) => (
          <li key={s} className={i === step ? 'is-current' : i < step ? 'is-done' : ''} aria-current={i === step ? 'step' : undefined}>
            <span className="bd-dot" aria-hidden="true">{i < step ? '✓' : i + 1}</span>{s}
          </li>
        ))}
      </ol>
      <p className="bd-sr" aria-live="polite">{announce}</p>

      {step === 0 && (
        <section className="bd-panel" aria-labelledby="bd-h">
          <h3 id="bd-h" ref={headingRef} tabIndex={-1}>1. Enter a sample brief</h3>
          <fieldset className="bd-briefs">
            <legend>Choose a fictional brief</legend>
            {BRIEFS.map((b) => (
              <label key={b.id} className={b.id === briefId ? 'is-on' : ''}>
                <input type="radio" name="bd-brief" value={b.id} checked={b.id === briefId} onChange={() => pickBrief(b.id)} />
                {b.label}
              </label>
            ))}
          </fieldset>
          <div className="bd-fields">
            <label>Product or brand<input value={product} maxLength={40} onChange={(e) => setProduct(e.target.value)} /></label>
            <label>Offer<input value={offer} maxLength={40} onChange={(e) => setOffer(e.target.value)} /></label>
            <label>Market<select value={market} onChange={(e) => setMarket(e.target.value)}><option>Canada</option><option>United States</option></select></label>
            <label>Objective<select value={objective} onChange={(e) => setObjective(e.target.value)}><option>Leads</option><option>Online sales</option></select></label>
          </div>
          <p className="bd-note">Channel: Google Search. Landing page: {brief.url} (example domain).</p>
          <button type="button" className="pill pill-fill" onClick={generate}>Generate draft</button>
        </section>
      )}

      {step === 1 && (
        <section className="bd-panel" aria-labelledby="bd-h">
          <h3 id="bd-h" ref={headingRef} tabIndex={-1}>2. Draft campaign assets</h3>
          <div className="bd-grid">
            <div><b>Headlines</b><ul>{headlines.map((h) => <li key={h}>{h}</li>)}</ul></div>
            <div><b>Descriptions</b><ul>{descriptions.map((d) => <li key={d}>{d}</li>)}</ul></div>
            <div><b>Social hook</b><p>{brief.hook}</p></div>
            <div><b>Targeting idea</b><p>{brief.audience}</p></div>
            <div><b>Keywords</b><ul>{draft.keywords.map((k) => <li key={k.text}>{k.match === 'Exact' ? `[${k.text}]` : `"${k.text}"`} <small>{k.match}</small></li>)}</ul></div>
            <div><b>Naming and tracking</b><p className="bd-mono">{draft.campaign}<br />{draft.adGroup}<br />?{draft.utm}</p></div>
          </div>
          <div className="bd-actions">
            <button type="button" className="pill pill-fill" onClick={() => setStep(2)}>Send to human review</button>
            <button type="button" className="pill pill-quiet" onClick={() => setStep(0)}>Back to brief</button>
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="bd-panel" aria-labelledby="bd-h">
          <h3 id="bd-h" ref={headingRef} tabIndex={-1}>3. Human review and edits</h3>
          <p className="bd-note">Edit anything. The example checks update as you type, and the draft can’t be approved until a person signs off.</p>
          <div className="bd-fields is-wide">
            {headlines.map((h, i) => (
              <label key={`h${i}`}>Headline {i + 1}<input value={h} onChange={(e) => setHeadlines(headlines.map((x, j) => (j === i ? e.target.value : x)))} /></label>
            ))}
            {descriptions.map((d, i) => (
              <label key={`d${i}`}>Description {i + 1}<textarea rows={2} value={d} onChange={(e) => setDescriptions(descriptions.map((x, j) => (j === i ? e.target.value : x)))} /></label>
            ))}
          </div>
          <div className="bd-cols">
            <div>
              <b>Example input validation</b>
              <ul className="bd-checks">{validations.map((v) => <li key={v.label} className={v.ok ? 'ok' : 'bad'}><span aria-hidden="true">{v.ok ? '✓' : '!'}</span>{v.label}{v.ok ? '' : ' (fix before approval)'}</li>)}</ul>
            </div>
            <fieldset className="bd-review">
              <legend>Review required</legend>
              {REVIEW.map((r, i) => (
                <label key={r}><input type="checkbox" checked={checks[i]} onChange={(e) => setChecks(checks.map((c, j) => (j === i ? e.target.checked : c)))} />{r}</label>
              ))}
            </fieldset>
          </div>
          <div className="bd-actions">
            <button type="button" className="pill pill-fill" disabled={!approved} aria-disabled={!approved} onClick={() => setStep(3)}>Approve draft</button>
            <button type="button" className="pill pill-quiet" onClick={() => setStep(1)}>Back to draft</button>
          </div>
          {!approved && <p className="bd-note">Approval unlocks once every check passes and all three review boxes are ticked.</p>}
        </section>
      )}

      {step >= 3 && (
        <section className="bd-panel" aria-labelledby="bd-h">
          <h3 id="bd-h" ref={headingRef} tabIndex={-1}>{step === 3 ? '4. Approved output and example CSV' : '5. Import, validate and launch'}</h3>
          {step === 3 ? (
            <>
              <p className="bd-note">Illustrative layout only. It hasn’t been validated against the Google Ads Editor import format, and it uses safe sample data.</p>
              <div className="bd-table" tabIndex={0} role="region" aria-label="Example CSV preview">
                <table>
                  <thead><tr>{rows[0].map((c) => <th key={c} scope="col">{c}</th>)}</tr></thead>
                  <tbody>{rows.slice(1).map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
                </table>
              </div>
              <div className="bd-actions">
                <button type="button" className="pill pill-fill" onClick={download}>Download example CSV</button>
                <button type="button" className="pill pill-line" onClick={() => setStep(4)}>What happens next</button>
              </div>
            </>
          ) : (
            <>
              <ol className="bd-next">
                <li>A marketer imports the file into Google Ads Editor.</li>
                <li>Editor flags errors and policy issues; the marketer fixes and checks everything again.</li>
                <li>The campaign goes through the normal approval process, then a person launches it.</li>
              </ol>
              <p className="bd-note">This demo never connects to an ad account, asks for credentials or spends money. Launch authority stays with people.</p>
              <div className="bd-actions"><button type="button" className="pill pill-quiet" onClick={reset}>Start over</button></div>
            </>
          )}
        </section>
      )}
    </div>
  );
}
