import { Gauge, Rocket } from 'lucide-react'
import { Badge, Bar, Check, Collapse, Meter, Spinner, Stage, type Act } from '../kit'
import { emitStep, NAVY_TOKENS } from './shared'
import './demos.css'

// Aegon, illustrative: how a campaign goes live. Beats follow the six steps
// listed beside it (Build, QA, Compliance, Launch, Pace, Report) and tell the
// list which one is lit. The QA pass catches a UTM problem, the cursor fixes
// it, compliance clears, the launch lights the three platforms, pacing fills
// against budget and the report is scheduled. No figures, no employer data.
//
// Real strings: the check names, the three platforms, the statuses.

type Row = 'idle' | 'pending' | 'ok' | 'warn'
type S = {
  naming: Row
  utm: Row
  tracking: Row
  compliance: Row
  status: 'draft' | 'review' | 'live'
  live: boolean
  pace: number
  report: boolean
}

const initial: S = { naming: 'idle', utm: 'idle', tracking: 'idle', compliance: 'idle', status: 'draft', live: false, pace: 0, report: false }
const poster: S = { naming: 'ok', utm: 'ok', tracking: 'ok', compliance: 'ok', status: 'live', live: true, pace: 0.64, report: true }

async function script(a: Act<S>) {
  emitStep('golive', 0)
  await a.wait(700)
  await a.move('run')
  emitStep('golive', 1)
  await a.click('run')
  a.put({ status: 'review', naming: 'pending' })
  await a.wait(500)
  a.put({ naming: 'ok', utm: 'pending' })
  await a.wait(550)
  a.put({ utm: 'warn' })
  await a.wait(500)
  await a.move('fix')
  await a.click('fix')
  a.put({ utm: 'ok', tracking: 'pending' })
  await a.wait(550)
  a.put({ tracking: 'ok' })
  emitStep('golive', 2)
  a.put({ compliance: 'pending' })
  await a.wait(1100)
  a.put({ compliance: 'ok' })
  await a.wait(400)
  emitStep('golive', 3)
  await a.move('run')
  await a.click('run')
  a.put({ status: 'live', live: true })
  await a.wait(900)
  emitStep('golive', 4)
  a.put({ pace: 0.38 })
  await a.wait(700)
  a.put({ pace: 0.64 })
  await a.wait(900)
  emitStep('golive', 5)
  a.put({ report: true })
  await a.wait(2600)
  await a.set({ report: false, pace: 0 })
  await a.set({ ...initial })
  await a.wait(400)
}

const CHECKS: { key: keyof S; label: string }[] = [
  { key: 'naming', label: 'Naming convention' },
  { key: 'utm', label: 'UTM parameters' },
  { key: 'tracking', label: 'Conversion tracking' },
  { key: 'compliance', label: 'Quebec and U.S. state ad rules' },
]

const PLATFORMS = ['Google Ads', 'Meta', 'LinkedIn']

export default function GoLiveDemo() {
  return (
    <Stage<S>
      width={640}
      height={540}
      compact={{ below: 560, width: 358, height: 600 }}
      theme="dark"
      tokens={NAVY_TOKENS}
      initial={initial}
      poster={poster}
      script={script}
      cursor={{ at: { wide: { x: 560, y: 490 }, compact: { x: 300, y: 560 } }, style: 'arrow', ripple: true }}
      className="demo-stage demo-golive"
    >
      {(s, _rect, layout) => (
        <div className="dp dp--dark" data-layout={layout}>
          <header className="dp__head">
            <div className="dp__title">
              <span>New campaign</span>
              <Bar w={layout === 'compact' ? 90 : 150} h={7} tone={2} />
            </div>
            <Badge tone={s.status === 'live' ? 'success' : s.status === 'review' ? 'accent' : 'neutral'} className="dp__status">
              {s.status === 'live' ? 'Live' : s.status === 'review' ? 'In review' : 'Draft'}
            </Badge>
          </header>

          <div className="dp__section">Pre-launch checks</div>
          <ul className="dp__checks">
            {CHECKS.map(({ key, label }) => {
              const v = s[key] as Row
              return (
                <li key={key} className="dp__check" data-state={v}>
                  <span className="dp__mark">
                    {v === 'pending' ? <Spinner size={14} /> : <Check on={v === 'ok'} size={16} />}
                  </span>
                  <span className="dp__check-label">{label}</span>
                  {key === 'utm' && (
                    <span className="dp__fix" data-show={v === 'warn' || undefined}>
                      <Badge tone="warning">utm_campaign missing</Badge>
                      <span className="dp__mini" data-target="fix" data-cursor="pointer">Fix</span>
                    </span>
                  )}
                </li>
              )
            })}
          </ul>

          <div className="dp__platforms">
            {PLATFORMS.map((p, i) => (
              <span key={p} className="dp__platform" data-on={s.live || undefined} style={{ transitionDelay: `${i * 140}ms` }}>
                <i />
                {p}
              </span>
            ))}
          </div>

          <Collapse open={s.live}>
            <div className="dp__pace">
              <span className="dp__pace-label"><Gauge size={14} />Spend against budget</span>
              <Meter value={s.pace} tone="accent" className="dp__meter" />
            </div>
          </Collapse>

          <footer className="dp__foot">
            <span className="dp__report" data-show={s.report || undefined}>Biweekly report scheduled</span>
            <span className="dp__primary" data-target="run" data-cursor="pointer">
              {s.status === 'draft' ? 'Run QA' : <><Rocket size={14} />{s.status === 'live' ? 'Launched' : 'Launch'}</>}
            </span>
          </footer>
        </div>
      )}
    </Stage>
  )
}
