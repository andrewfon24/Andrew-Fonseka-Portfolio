import React from "react";

// Compact proof strip. The long-form story for each system lives in the
// Aegon and DATS case studies; this keeps the homepage scannable on a phone.
const systems = [
  {
    name: "Campaign operations",
    metric: "−60%",
    metricLabel: "compliance review time",
    blurb: "Apps Script builder standardizes naming, UTMs and compliance QA.",
  },
  {
    name: "Conversion signals",
    metric: "+25%",
    metricLabel: "Meta Event Match Quality",
    blurb: "HubSpot offline conversions and server-side tagging feed Google and Meta.",
  },
  {
    name: "LinkedIn ABM",
    metric: "H1 2026",
    metricLabel: "new program, time-tracked launch",
    blurb: "Affluent-investor program using Matched Audiences and Thought Leader Ads.",
  },
  {
    name: "Conversion experience",
    metric: "4×",
    metricLabel: "faster enquiry replies",
    blurb: "Simpler lead form plus a 24/7 AI assistant for DATS.",
  },
];

export function Systems() {
  return (
    <section className="systems-section systems-compact section" id="systems">
      <div className="container">
        <div className="compact-head reveal">
          <div className="eyebrow light">BUILT AND PUT TO WORK</div>
          <h2>The systems behind the performance.</h2>
        </div>
        <div className="systems-grid">
          {systems.map((s) => (
            <article className="system-card reveal" key={s.name}>
              <small>{s.name}</small>
              <strong>{s.metric}</strong>
              <span>{s.metricLabel}</span>
              <p>{s.blurb}</p>
            </article>
          ))}
        </div>
        <p className="systems-note">
          Aegon figures are relative changes; absolute budgets and results are
          confidential. Full detail in the case studies.
        </p>
      </div>
    </section>
  );
}
