import React, { useEffect, useRef, useState } from "react";

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Adds `is-in` once the element scrolls into view. Server HTML renders the
// final state (via .no-js fallback in CSS), so nothing is hidden without JS.
export function useInView(options = { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReduced() || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        io.disconnect();
      }
    }, options);
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
}

// Counts from 0 to `value` once `run` is true. Renders the final value on the
// server so crawlers, no-JS readers and screen readers get the real number.
export function CountUp({ value, run, prefix = "", suffix = "", duration = 1100, decimals = 0 }) {
  const [shown, setShown] = useState(value);
  const started = useRef(false);
  useEffect(() => {
    if (!run || started.current || prefersReduced()) return;
    started.current = true;
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setShown(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    setShown(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run]);
  const n = decimals ? shown.toFixed(decimals) : Math.round(shown).toLocaleString("en-CA");
  return (
    <span aria-hidden="true">
      {prefix}
      {n}
      {suffix}
    </span>
  );
}

// Hero visual: the thesis as a chart. What Ads Manager counts vs what the
// business counts, for one real campaign.
export function HeroFunnel() {
  const [ref, inView] = useInView({ threshold: 0.2 });
  const rows = [
    { value: 821, label: "Leads in Ads Manager", note: "What most reports stop at", tone: "muted" },
    { value: 430, label: "Qualified in the CRM", note: "Matched on name, phone, ID", tone: "mid" },
    { value: 312, label: "Fee-paid enrolments", note: "What the client pays for", tone: "strong" },
  ];
  return (
    <figure
      ref={ref}
      className={`hero-funnel ${inView ? "is-in" : ""}`}
      aria-label="Private university campaign: 821 Meta leads, 430 qualified in the CRM, 312 fee-paid enrolments at about US$20 each."
    >
      <figcaption className="hf-head">
        <span className="hf-client">Private university, Saudi Arabia</span>
        <span className="hf-meta">Meta Ads, May–Aug 2026</span>
      </figcaption>
      <ol className="hf-rows">
        {rows.map((r, i) => (
          <li key={r.label} className={`hf-row tone-${r.tone}`} style={{ "--w": r.value / 821, "--i": i }}>
            <div className="hf-bar" />
            <div className="hf-text">
              <strong>{r.value}</strong>
              <span>
                {r.label}
                <small>{r.note}</small>
              </span>
            </div>
          </li>
        ))}
      </ol>
      <div className="hf-foot">
        <span>
          <b>~US$20</b> media cost per enrolment
        </span>
        <a href="/case-studies/university/" data-track="case_open" data-case="university">
          See the case
        </a>
      </div>
    </figure>
  );
}

// Two horizontal bars compared on the same scale.
export function CompareBars({ rows, max, caption }) {
  const [ref, inView] = useInView();
  const top = max || Math.max(...rows.map((r) => r.value));
  return (
    <figure ref={ref} className={`viz compare ${inView ? "is-in" : ""}`}>
      {rows.map((r, i) => (
        <div className={`cb-row ${r.highlight ? "hl" : ""}`} key={r.label} style={{ "--w": r.value / top, "--i": i }}>
          <div className="cb-label">
            <span>{r.label}</span>
            <b>{r.display || r.value}</b>
          </div>
          <div className="cb-track">
            <i />
          </div>
        </div>
      ))}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

// A single 100% bar split into named segments.
export function SplitBar({ parts, caption }) {
  const [ref, inView] = useInView();
  return (
    <figure ref={ref} className={`viz split ${inView ? "is-in" : ""}`}>
      <div className="sb-track" role="img" aria-label={parts.map((p) => `${p.label} ${p.value}%`).join(", ")}>
        {parts.map((p, i) => (
          <i key={p.label} className={`seg seg-${i}`} style={{ "--w": p.value / 100, "--i": i }}>
            <span>{p.value}%</span>
          </i>
        ))}
      </div>
      <div className="sb-legend">
        {parts.map((p, i) => (
          <span key={p.label}>
            <em className={`dot seg-${i}`} />
            {p.label}
            {p.amount && <b>{p.amount}</b>}
          </span>
        ))}
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

// Relative changes around a zero line. Good direction is always drawn in blue,
// whichever way the number points.
export function DeltaBars({ rows, caption }) {
  const [ref, inView] = useInView();
  const max = Math.max(...rows.map((r) => Math.abs(r.value)));
  return (
    <figure ref={ref} className={`viz delta ${inView ? "is-in" : ""}`}>
      {rows.map((r, i) => (
        <div className={`db-row ${r.value < 0 ? "neg" : "pos"}`} key={r.label} style={{ "--w": Math.abs(r.value) / max, "--i": i }}>
          <span className="db-label">{r.label}</span>
          <div className="db-track">
            <i />
          </div>
          <b>
            {r.value > 0 ? "+" : "−"}
            {Math.abs(r.value)}%
          </b>
        </div>
      ))}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

// One dot per ad account: owned solid, co-managed outlined.
export function DotMatrix({ owned = 50, shared = 100 }) {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const dots = Array.from({ length: owned + shared }, (_, i) => i < owned);
  return (
    <figure
      ref={ref}
      className={`viz dots ${inView ? "is-in" : ""}`}
      aria-label={`${owned} ad accounts owned and about ${shared} co-managed at Aegon`}
    >
      <div className="dm-grid" aria-hidden="true">
        {dots.map((solid, i) => (
          <i key={i} className={solid ? "own" : "co"} style={{ "--i": i }} />
        ))}
      </div>
      <figcaption className="dm-legend">
        <span>
          <em className="own" /> <b>50</b> accounts I own
        </span>
        <span>
          <em className="co" /> <b>~100</b> co-managed with the team
        </span>
      </figcaption>
    </figure>
  );
}
