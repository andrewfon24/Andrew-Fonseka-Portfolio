import { ArrowRightLeft, Lightbulb } from 'lucide-react'
import { Badge, Bar, Check, Meter, Segmented, Stage, Tabs, type Act } from '../kit'
import PacingLine from './PacingLine'
import { emitStep, PAPER_TOKENS } from './shared'
import './demos.css'

// How I work, illustrative: one account review moving through the four
// steps. Audit ticks the signal checks; Define switches the optimization
// target from form fills to qualified leads; Test fills two variants and
// moves budget to the winner; Report shows spend pacing against plan
// (Liveline) and the recommendation. The step list beside it follows.
//
// Real strings: the tab names, the check names, the optimization target,
// the variant decisions and the recommendation. No figures.

type S = { tab: 0 | 1 | 2 | 3; audited: number; goal: 0 | 1; test: number; winner: boolean }
const initial: S = { tab: 0, audited: 0, goal: 0, test: 0, winner: false }
const poster: S = { tab: 3, audited: 4, goal: 1, test: 1, winner: true }

const TABS = ['Audit', 'Define', 'Test', 'Report']
const CHECKS = ['Conversion tracking', 'CRM fields', 'Creative', 'Search terms']

async function script(a: Act<S>) {
  emitStep('approach', 0)
  await a.wait(500)
  await a.stagger([1, 2, 3, 4], async (n) => {
    a.put({ audited: n })
    await a.wait(420)
  }, 0)
  await a.wait(500)
  await a.move('tab-1')
  await a.click('tab-1')
  emitStep('approach', 1)
  a.put({ tab: 1 })
  await a.wait(700)
  await a.move('goal-1')
  await a.click('goal-1')
  a.put({ goal: 1 })
  await a.wait(1200)
  await a.move('tab-2')
  await a.click('tab-2')
  emitStep('approach', 2)
  a.put({ tab: 2 })
  await a.wait(400)
  a.put({ test: 1 })
  await a.wait(1300)
  a.put({ winner: true })
  await a.wait(1100)
  await a.move('tab-3')
  await a.click('tab-3')
  emitStep('approach', 3)
  a.put({ tab: 3 })
  await a.wait(4200)
  await a.move('tab-0')
  await a.click('tab-0')
  await a.set({ ...initial })
  await a.wait(300)
}

export default function ApproachDemo() {
  return (
    <Stage<S>
      width={620}
      height={440}
      compact={{ below: 540, width: 358, height: 470 }}
      tokens={PAPER_TOKENS}
      greys="cool"
      initial={initial}
      poster={poster}
      script={script}
      cursor={{ at: { wide: { x: 540, y: 400 }, compact: { x: 300, y: 430 } }, style: 'arrow', ripple: true }}
      className="demo-stage demo-approach"
    >
      {(s, _rect, layout) => (
        <div className="dp dp--light" data-layout={layout}>
          <header className="dp__head">
            <div className="dp__title">
              <span>Account review</span>
              <Bar w={layout === 'compact' ? 60 : 110} h={7} tone={2} />
            </div>
          </header>
          <Tabs items={TABS} value={s.tab} targets={['tab-0', 'tab-1', 'tab-2', 'tab-3']} className="dp__tabs" />

          <div className="dp__views">
            <section className="dp__view" data-on={s.tab === 0 || undefined}>
              <div className="dp__section">Is the signal trustworthy?</div>
              <ul className="dp__checks">
                {CHECKS.map((c, i) => (
                  <li key={c} className="dp__check" data-state={s.audited > i ? 'ok' : 'idle'}>
                    <span className="dp__mark"><Check on={s.audited > i} size={16} /></span>
                    <span className="dp__check-label">{c}</span>
                    <Bar w={layout === 'compact' ? 40 : 90} h={6} tone={1} />
                  </li>
                ))}
              </ul>
            </section>

            <section className="dp__view" data-on={s.tab === 1 || undefined}>
              <div className="dp__section">Optimize campaigns for</div>
              <Segmented items={['Form fills', 'Qualified leads']} value={s.goal} targets={['goal-0', 'goal-1']} className="dp__goal" />
              <div className="dp__section">Channel mix</div>
              <div className="dp__chips">
                {['Google Ads', 'Meta', 'Microsoft Ads'].map((c) => (
                  <span key={c} className="dp__chip">{c}</span>
                ))}
              </div>
              <p className="dp__hint" data-show={s.goal === 1 || undefined}>
                <Lightbulb size={14} />Bidding now learns from CRM outcomes
              </p>
            </section>

            <section className="dp__view" data-on={s.tab === 2 || undefined}>
              <div className="dp__section">Audience test, judged on qualified leads</div>
              {[
                { name: 'Variant A', a: 0.34, w: 0.22 },
                { name: 'Variant B', a: 0.72, w: 0.86 },
              ].map((v, i) => (
                <div key={v.name} className="dp__variant">
                  <span className="dp__check-label">{v.name}</span>
                  <Meter value={s.test ? (s.winner ? v.w : v.a) : 0} tone={i === 1 ? 'success' : 'ink'} className="dp__meter" />
                  <Badge tone={i === 1 ? 'success' : 'neutral'} className="dp__decision" data-show={s.winner || undefined}>
                    {i === 1 ? 'Scale' : 'Pause'}
                  </Badge>
                </div>
              ))}
              <p className="dp__hint" data-show={s.winner || undefined}>
                <ArrowRightLeft size={14} />Budget reallocated to the winner
              </p>
            </section>

            <section className="dp__view" data-on={s.tab === 3 || undefined}>
              <div className="dp__section dp__section--row">
                <span>Spend against plan</span>
                <Badge tone="neutral">Illustrative</Badge>
              </div>
              <div className="dp__pacing">
                <PacingLine active={s.tab === 3} />
              </div>
              <p className="dp__rec">
                <Lightbulb size={14} />
                Recommendation: cost per customer, pipeline quality, next move
              </p>
            </section>
          </div>
        </div>
      )}
    </Stage>
  )
}
