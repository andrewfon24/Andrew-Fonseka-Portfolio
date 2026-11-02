import { Fingerprint } from 'lucide-react'
import { Badge, Bar, Collapse, Count, Segmented, Stage, type Act } from '../kit'
import { PAPER_TOKENS } from './shared'
import './demos.css'

// Private university, illustrative CRM view of the real funnel. The cursor
// filters the admissions CRM from all Meta leads to CRM-qualified to
// fee-paid enrolments; the count rolls 821 to 430 to 312, the rows that drop
// out close up, and the match rule appears last as the payoff.
//
// Real strings: the three stage names, the three counts, the match rule.
// Rows are placeholders: no student data.

type S = { stage: 0 | 1 | 2; matched: boolean }
const initial: S = { stage: 0, matched: false }
const poster: S = { stage: 2, matched: true }

const STAGES = [
  { label: 'Meta leads', value: 821 },
  { label: 'CRM-qualified', value: 430 },
  { label: 'Fee-paid', value: 312 },
]

// Placeholder rows: the furthest stage each one reaches.
const ROWS: (0 | 1 | 2)[] = [2, 0, 1, 2, 0, 2]
const WIDTHS = [128, 96, 112, 140, 104, 120]

async function script(a: Act<S>) {
  await a.wait(900)
  await a.move('seg-1')
  await a.click('seg-1')
  a.put({ stage: 1 })
  await a.wait(1500)
  await a.move('seg-2')
  await a.click('seg-2')
  a.put({ stage: 2 })
  await a.wait(900)
  a.put({ matched: true })
  await a.wait(2800)
  await a.move('seg-0')
  await a.click('seg-0')
  await a.set({ stage: 0, matched: false })
  await a.wait(600)
}

export default function FunnelCrmDemo() {
  return (
    <Stage<S>
      width={600}
      height={430}
      compact={{ below: 520, width: 358, height: 470 }}
      tokens={PAPER_TOKENS}
      greys="cool"
      initial={initial}
      poster={poster}
      script={script}
      cursor={{ at: { wide: { x: 520, y: 380 }, compact: { x: 300, y: 430 } }, style: 'arrow', ripple: true }}
      className="demo-stage demo-crm"
    >
      {(s, _rect, layout) => (
        <div className="dp dp--light" data-layout={layout}>
          <header className="dp__head">
            <div className="dp__title">
              <span>Admissions CRM</span>
              <Bar w={layout === 'compact' ? 70 : 120} h={7} tone={2} />
            </div>
            <Segmented
              items={layout === 'compact' ? ['Leads', 'Qualified', 'Fee-paid'] : ['All leads', 'Qualified', 'Fee-paid']}
              value={s.stage}
              targets={['seg-0', 'seg-1', 'seg-2']}
              className="dp__seg"
            />
          </header>

          <div className="dp__crm">
            <div className="dp__kpi">
              <span className="dp__kpi-label">{STAGES[s.stage].label}</span>
              <Count value={STAGES[s.stage].value} className="dp__kpi-value" duration={800} />
              <div className="dp__mini-funnel">
                {STAGES.map((st, i) => (
                  <div key={st.label} className="dp__mf-row" data-on={i <= s.stage || undefined} data-current={i === s.stage || undefined}>
                    <span className="dp__mf-bar" style={{ transform: `scaleX(${st.value / 821})` }} />
                  </div>
                ))}
              </div>
            </div>

            <div className="dp__list">
              {ROWS.map((reach, i) => (
                <Collapse key={i} open={reach >= s.stage}>
                  <div className="dp__lrow">
                    <span className="dp__avatar" />
                    <span className="dp__lines">
                      <Bar w={WIDTHS[i]} h={8} tone={3} />
                      <Bar w={WIDTHS[i] - 40} h={6} tone={1} />
                    </span>
                    <Badge tone={s.stage === 2 ? 'success' : s.stage === 1 ? 'accent' : 'neutral'}>
                      {s.stage === 2 ? 'Fee-paid' : s.stage === 1 ? 'Qualified' : 'New lead'}
                    </Badge>
                  </div>
                </Collapse>
              ))}
            </div>
          </div>

          <footer className="dp__match" data-show={s.matched || undefined}>
            <Fingerprint size={15} />
            Matched on name, phone and student ID, de-duplicated
          </footer>
        </div>
      )}
    </Stage>
  )
}
