import type { LookTokens } from '../kit'

// Demos tell the step list beside them which beat they are on (see motion.js).
export function emitStep(list: string, index: number) {
  window.dispatchEvent(new CustomEvent('demo-step', { detail: { list, index } }))
}

// The site's navy tokens mapped onto the kit's dark theme.
export const NAVY_TOKENS: LookTokens = {
  '--ss-canvas': 'var(--color-ground)',
  '--ss-surface': 'var(--color-navy)',
  '--ss-chrome': 'var(--color-navy-raised)',
  '--ss-raised': 'var(--color-navy-raised)',
  '--ss-well': 'var(--color-ground)',
  '--ss-text': 'var(--color-on-dark-muted)',
  '--ss-text-strong': 'var(--color-on-dark)',
  '--ss-accent': 'var(--color-sky)',
  '--ss-accent-2': 'var(--color-sky)',
  '--ss-font': 'var(--font-body)',
}

// The site's paper tokens mapped onto the kit's light theme.
export const PAPER_TOKENS: LookTokens = {
  '--ss-canvas': 'var(--color-paper)',
  '--ss-surface': 'var(--color-surface)',
  '--ss-text': 'var(--color-body)',
  '--ss-text-strong': 'var(--color-ink)',
  '--ss-accent': 'var(--color-blue)',
  '--ss-accent-2': 'var(--color-blue)',
  '--ss-font': 'var(--font-body)',
}
