import React, { useState } from "react";
import {
  ArrowUpRight,
  Check,
  ChartNoAxesCombined,
  Code2,
  Database,
  FileCheck2,
  Layers,
  MousePointer2,
  Target,
  Zap,
} from "lucide-react";

const systems = [
  {
    name: "Campaign operations",
    label: "AEGON · CAMPAIGN BUILDER",
    title: "Less admin. More time for the decisions that matter.",
    body: "An Apps Script campaign builder standardizes UTMs, naming and compliance controls. Adopted team-wide.",
    metric: "−60%",
    metricLabel: "compliance review time",
    flow: ["Campaign inputs", "Apps Script builder", "Compliant launch"],
    icons: [Database, Code2, FileCheck2],
    note: "Approximately 12 working days saved annually · estimate associated with the builder",
  },
  {
    name: "Conversion signals",
    label: "AEGON · MEASUREMENT",
    title: "Teach the platforms what a qualified outcome looks like.",
    body: "HubSpot offline conversions connect qualified leads, booked calls and applications to Google and Meta optimization.",
    metric: "+25%",
    metricLabel: "Meta Event Match Quality",
    flow: ["CRM outcomes", "Server-side signals", "Better optimization"],
    icons: [Database, Layers, Target],
    note: "Relative improvement in Event Match Quality · GA4, server-side GTM, Enhanced Conversions and Meta CAPI",
  },
  {
    name: "LinkedIn ABM",
    label: "AEGON · ACCOUNT-BASED MARKETING",
    title: "Build around the accounts that matter.",
    body: "An affluent-investor acquisition program using Matched Audiences, Thought Leader Ads and carousel creative.",
    metric: "50+",
    metricLabel: "ad accounts in my wider remit",
    flow: ["Matched Audiences", "Relevant creative", "Account openings"],
    icons: [Target, Layers, ChartNoAxesCombined],
    note: "US and Canadian business units · absolute budgets and performance metrics remain confidential",
  },
  {
    name: "Conversion experience",
    label: "DATS · ACQUISITION + EXPERIENCE",
    title: "A better landing page is part of the media strategy.",
    body: "A simpler lead form and an AI assistant connect paid traffic to a faster, clearer enquiry experience.",
    metric: "4×",
    metricLabel: "faster enquiry responses",
    flow: ["Paid traffic", "Simpler enquiry", "Around-the-clock reply"],
    icons: [MousePointer2, FileCheck2, Zap],
    note: "Client-reported response time compared with manual replies, including after hours",
  },
];

export function Systems() {
  const [active, setActive] = useState(0);
  const s = systems[active];
  return (
    <section className="systems-section section" id="systems">
      <div className="container">
        <div className="section-heading reveal">
          <div>
            <div className="eyebrow light">BUILT AND PUT TO WORK</div>
            <h2>
              The systems behind
              <br />
              the performance.
            </h2>
          </div>
          <p className="section-intro">
            Campaigns perform better when the
            <br /> measurement and operations work together.
          </p>
        </div>
        <div className="system-tabs" aria-label="Explore systems">
          {systems.map((s, i) => (
            <button
              key={s.name}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
            >
              <span>0{i + 1}</span>
              {s.name}
              <ArrowUpRight size={16} />
            </button>
          ))}
        </div>
        <div className="systems-content" key={s.name}>
          <div className="systems-flow">
            <div className="flow-caption">
              <span className="live-dot" /> FROM INPUT TO OUTCOME
            </div>
            {s.flow.map((name, i) => {
              const Icon = s.icons[i];
              return (
                <div className="flow-step" key={name}>
                  <div className="flow-node">
                    <Icon size={22} />
                    <div>
                      <small>0{i + 1}</small>
                      <strong>{name}</strong>
                    </div>
                    <Check size={16} />
                  </div>
                  {i < 2 && (
                    <div className="flow-line">
                      <span />
                    </div>
                  )}
                </div>
              );
            })}
            <span className="flow-bottom">
              REPEATABLE BY DESIGN <Layers size={15} />
            </span>
          </div>
          <div className="systems-story">
            <div className="eyebrow light">{s.label}</div>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
            <div className="system-key-metric">
              <strong>{s.metric}</strong>
              <span>{s.metricLabel}</span>
            </div>
            <small>{s.note}</small>
          </div>
        </div>
        <div className="systems-bottom">
          <Check size={16} /> Built into the work. Measured by what gets better.
        </div>
      </div>
    </section>
  );
}
