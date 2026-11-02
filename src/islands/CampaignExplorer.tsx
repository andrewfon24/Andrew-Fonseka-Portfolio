import { useEffect, useRef, useState } from 'react'

// University, per-campaign comparison from the portfolio PDF (page 4).
// Replaces the Meta Ads Manager screenshot: the same figures, no account data.
// Picking a campaign highlights it in every chart and the table.

type Campaign = { id: string; name: string; leads: number; enrolled: number; rate: number; cpe: number }

const money = (n: number) => `US$${n.toFixed(2)}`

function useInView<T extends Element>() {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setInView(true)
        io.disconnect()
      }
    }, { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, inView] as const
}

export default function CampaignExplorer({ campaigns, blended }: { campaigns: Campaign[]; blended: { leads: number; enrolled: number; rate: number; cpe: number } }) {
  const [selected, setSelected] = useState<string>('all')
  const [ref, inView] = useInView<HTMLDivElement>()
  const dim = (id: string) => (selected !== 'all' && selected !== id ? '' : undefined)
  const tone = (id: string) => (id === 'priority' ? 'bar-fill bar-fill--gold' : 'bar-fill')
  const maxCpe = 35

  return (
    <div className="explorer" ref={ref}>
      <div className="explorer__tabs" role="group" aria-label="Highlight a campaign">
        {[{ id: 'all', name: 'All campaigns' }, ...campaigns].map((c) => (
          <button key={c.id} type="button" className="filter" aria-pressed={selected === c.id} onClick={() => setSelected(c.id)}>
            {c.name}
          </button>
        ))}
      </div>

      <div className={`explorer__grid${inView ? ' is-in' : ''}`} data-idraw>
        <section className="panel" aria-labelledby="rate-title">
          <h3 id="rate-title">Lead-to-enrolment rate</h3>
          <p className="panel__sub">Share of Meta leads that became fee-paid enrolments</p>
          <div className="bars" role="img" aria-label={campaigns.map((c) => `${c.name} ${c.rate}%`).join(', ')}>
            {campaigns.map((c, i) => (
              <div key={c.id} className="bar-row" aria-hidden="true" data-dim={dim(c.id)}>
                <span>{c.name}</span>
                <span className="bar-track">
                  <span className={tone(c.id)} style={{ ['--v' as string]: (c.rate / 100).toFixed(4), ['--delay' as string]: `${i * 140}ms` }} />
                </span>
                <span className="bar-row__value">{c.rate.toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </section>

        <section className="panel" aria-labelledby="cpe-title">
          <h3 id="cpe-title">Media cost per enrolment</h3>
          <p className="panel__sub">US$ by campaign; the dashed line is the blended average</p>
          <div className="cpe" style={{ ['--b' as string]: (blended.cpe / maxCpe).toFixed(4) }}>
            <span className="cpe__blended" aria-hidden="true"><span>Blended {money(blended.cpe)}</span></span>
            <div className="bars" role="img" aria-label={`${campaigns.map((c) => `${c.name} ${money(c.cpe)}`).join(', ')}; blended ${money(blended.cpe)}`}>
              {campaigns.map((c, i) => (
                <div key={c.id} className="bar-row" aria-hidden="true" data-dim={dim(c.id)}>
                  <span>{c.name}</span>
                  <span className="bar-track">
                    <span className={tone(c.id)} style={{ ['--v' as string]: (c.cpe / maxCpe).toFixed(4), ['--delay' as string]: `${i * 140}ms` }} />
                  </span>
                  <span className="bar-row__value">{money(c.cpe)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="panel" aria-labelledby="bubble-title">
          <h3 id="bubble-title">Volume against conversion</h3>
          <p className="panel__sub">Meta leads per campaign (across) against lead-to-enrolment rate (up); bubble size is enrolments</p>
          <Bubbles campaigns={campaigns} dim={dim} />
          <div className="table-wrap" tabIndex={0} role="region" aria-label="Campaign table">
            <table className="data-table">
              <caption className="visually-hidden">University campaigns, 1 May to 31 August 2026</caption>
              <thead>
                <tr>
                  <th scope="col">Campaign</th>
                  <th scope="col">Meta leads</th>
                  <th scope="col">Fee-paid enrolments</th>
                  <th scope="col">Lead to enrolment</th>
                  <th scope="col">Cost per enrolment</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c) => (
                  <tr key={c.id} data-dim={dim(c.id)}>
                    <th scope="row">{c.name}</th>
                    <td>{c.leads}</td>
                    <td>{c.enrolled}</td>
                    <td>{c.rate.toFixed(1)}%</td>
                    <td>{money(c.cpe)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th scope="row">All campaigns</th>
                  <td>{blended.leads}</td>
                  <td>{blended.enrolled}</td>
                  <td>{blended.rate.toFixed(1)}%</td>
                  <td>{money(blended.cpe)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}

function Bubbles({ campaigns, dim }: { campaigns: Campaign[]; dim: (id: string) => string | undefined }) {
  const W = 640
  const H = 260
  const pad = { l: 44, r: 24, t: 16, b: 36 }
  const x = (v: number) => pad.l + (v / 700) * (W - pad.l - pad.r)
  const y = (v: number) => H - pad.b - (v / 100) * (H - pad.t - pad.b)
  const r = (n: number) => 6 + Math.sqrt(n) * 2.1
  return (
    <svg className="bubble-chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={campaigns.map((c) => `${c.name}: ${c.leads} leads, ${c.rate}% converted, ${c.enrolled} enrolled`).join('; ')}>
      {[0, 25, 50, 75, 100].map((t) => (
        <g key={t}>
          <line className="axis" x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} />
          <text x={pad.l - 8} y={y(t) + 4} textAnchor="end">{t}%</text>
        </g>
      ))}
      {[0, 200, 400, 600].map((t) => (
        <text key={t} x={x(t)} y={H - 12} textAnchor="middle">{t}</text>
      ))}
      {campaigns.map((c, i) => (
        <g key={c.id} className="bubble" data-dim={dim(c.id)}>
          <circle
            cx={x(c.leads)}
            cy={y(c.rate)}
            r={r(c.enrolled)}
            fill={c.id === 'priority' ? 'var(--color-gold-mark)' : 'var(--color-blue-bright)'}
            fillOpacity={0.88}
            style={{ transitionDelay: `${i * 160}ms` }}
          />
          <text
            className="bubble-label"
            x={c.id === 'broad' ? x(c.leads) - r(c.enrolled) - 8 : x(c.leads) + r(c.enrolled) + 8}
            y={cyLabel(y(c.rate), c.id === 'broad' ? -r(c.enrolled) - 10 : -2)}
            textAnchor={c.id === 'broad' ? 'end' : 'start'}
          >
            {c.name}
          </text>
          <text
            x={c.id === 'broad' ? x(c.leads) - r(c.enrolled) - 8 : x(c.leads) + r(c.enrolled) + 8}
            y={cyLabel(y(c.rate), c.id === 'broad' ? -r(c.enrolled) + 6 : 14)}
            textAnchor={c.id === 'broad' ? 'end' : 'start'}
          >
            {c.enrolled} enrolled
          </text>
        </g>
      ))}
    </svg>
  )
}

const cyLabel = (cy: number, offset: number) => cy + offset
