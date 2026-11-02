import { useEffect, useRef, useState } from 'react'
import { Liveline } from 'liveline'
import type { LivelinePoint } from 'liveline'

// Illustrative pacing: spend to date as a share of plan, streaming and
// settling onto the plan line. No axis values, no badge, no figures: the
// shape tells the story (spend tracked against budget), nothing more.

const PLAN = 100

function seed(now: number): LivelinePoint[] {
  const points: LivelinePoint[] = []
  for (let i = 40; i > 0; i--) {
    const t = now - i * 0.5
    // Over and under plan early in the window, narrowing as pacing is corrected.
    points.push({ time: t, value: PLAN + 6 * Math.sin(i / 3.2) * (0.35 + i / 60) })
  }
  return points
}

export default function PacingLine({ active = true, token = '--color-blue', theme = 'light' as 'light' | 'dark' }) {
  // Canvas needs a resolved colour: read the site token once mounted.
  const [color, setColor] = useState<string>()
  useEffect(() => {
    setColor(getComputedStyle(document.documentElement).getPropertyValue(token).trim())
  }, [token])
  const [data, setData] = useState<LivelinePoint[]>(() => seed(Date.now() / 1000))
  const [value, setValue] = useState(() => data[data.length - 1].value)
  const step = useRef(0)

  useEffect(() => {
    if (!active) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => {
      step.current += 1
      const k = step.current
      // Drift toward plan with a little day-to-day noise.
      const drift = 2.2 * Math.exp(-k / 40) * Math.sin(k / 3.2)
      const noise = Math.sin(k * 1.3) * 0.5
      const v = PLAN + drift + noise
      const t = Date.now() / 1000
      setData((d) => [...d.slice(-120), { time: t, value: v }])
      setValue(v)
    }, 500)
    return () => window.clearInterval(id)
  }, [active])

  if (!color) return null

  return (
    <Liveline
      data={data}
      value={value}
      color={color}
      theme={theme}
      window={20}
      grid={false}
      badge={false}
      scrub={false}
      momentum={false}
      fill
      pulse
      lineWidth={2.5}
      referenceLine={{ value: PLAN, label: 'Plan' }}
      formatTime={() => ''}
      formatValue={() => ''}
      padding={{ top: 16, right: 16, bottom: 12, left: 8 }}
    />
  )
}
