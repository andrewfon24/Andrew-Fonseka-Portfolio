import React, { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, FileCheck2 } from "lucide-react";
import { caseStories, universityCampaigns } from "./caseStories";
import { projects } from "./data";
import { CompareBars, SplitBar, DeltaBars } from "./Charts";

function Flow({ steps, label }) {
  return (
    <ol className="flow" aria-label={label}>
      {steps.map(([title, body], i) => (
        <li key={title}>
          <span className="flow-n" aria-hidden="true">
            {i + 1}
          </span>
          <b>{title}</b>
          <span>{body}</span>
        </li>
      ))}
    </ol>
  );
}

function UniversityEvidence() {
  const [sel, setSel] = useState(-1);
  const all = { name: "All campaigns", leads: 821, enrolled: 312, rate: "38.0%", cpl: "US$7.61", cpe: "US$20.02" };
  const c = sel === -1 ? all : universityCampaigns[sel];
  return (
    <>
      <div className="ev-head">
        <h3>From enquiry to a fee-paid place</h3>
        <span>May–Aug 2026</span>
      </div>
      <div className="picker" role="group" aria-label="Choose campaign">
        {[all, ...universityCampaigns].map((x, i) => (
          <button key={x.name} aria-pressed={sel === i - 1} onClick={() => setSel(i - 1)}>
            {x.name}
          </button>
        ))}
      </div>
      <div className="ev-live" aria-live="polite">
        <div className="campaign-results">
          <div>
            <strong>{c.leads}</strong>
            <span>Meta leads</span>
          </div>
          <div>
            <strong>{c.enrolled}</strong>
            <span>Fee-paid enrolments</span>
          </div>
          <div>
            <strong>{c.rate}</strong>
            <span>Lead to enrolment</span>
          </div>
        </div>
        <CompareBars
          key={c.name}
          max={c.leads}
          rows={
            sel === -1
              ? [
                  { label: "Meta leads", value: 821 },
                  { label: "CRM-qualified", value: 430 },
                  { label: "Fee-paid enrolments", value: 312, highlight: true },
                ]
              : [
                  { label: "Meta leads", value: c.leads },
                  { label: "Fee-paid enrolments", value: c.enrolled, highlight: true },
                ]
          }
          caption="Bar length is the share of leads reaching each stage. Qualification is reported for the all-campaign total only."
        />
        <div className="cost-pair">
          <span>
            Cost per lead <b>{c.cpl}</b>
          </span>
          <span>
            Cost per enrolment <b>{c.cpe}</b>
          </span>
        </div>
      </div>
      <div className="table-scroll" tabIndex={0} role="region" aria-label="Campaign comparison table, scroll horizontally">
        <table className="data-table">
          <caption>Campaign comparison, reported figures</caption>
          <thead>
            <tr>
              <th scope="col">Campaign</th>
              <th scope="col">Leads</th>
              <th scope="col">Enrolled</th>
              <th scope="col">Rate</th>
              <th scope="col">CPL</th>
              <th scope="col">Per enrolment</th>
            </tr>
          </thead>
          <tbody>
            {universityCampaigns.map((x) => (
              <tr key={x.name}>
                <th scope="row">{x.name}</th>
                <td>{x.leads}</td>
                <td>{x.enrolled}</td>
                <td>{x.rate}</td>
                <td>{x.cpl}</td>
                <td>{x.cpe}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figure className="evidence-img">
        <a href="/images/university-ads-results.png" target="_blank" rel="noreferrer">
          <img
            src="/images/university-ads-results.png"
            alt="Anonymized Meta Ads Manager view of the three university campaigns, showing 821 leads and SAR 23,421.20 spend"
            loading="lazy"
          />
        </a>
        <figcaption>
          <FileCheck2 size={16} aria-hidden="true" /> Original Meta Ads Manager screenshot. Enrolments come from the
          admissions CRM.{" "}
          <a href="/images/university-ads-results.png" target="_blank" rel="noreferrer">
            Full size <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </figcaption>
      </figure>
    </>
  );
}

function BankEvidence() {
  return (
    <>
      <div className="ev-head">
        <h3>Follow the quality signal</h3>
        <span>2023, Kites Global</span>
      </div>
      <SplitBar
        parts={[
          { label: "Meta", value: 60, amount: "US$15,000" },
          { label: "Google Ads", value: 40, amount: "US$10,000" },
        ]}
        caption="Allocation of the fixed US$25,000 media budget."
      />
      <div className="calc">
        <span className="calc-label">Media cost per funded loan</span>
        <div>
          <b>US$25,000</b>
          <span>÷</span>
          <b>259 loans</b>
          <span>=</span>
          <strong>US$96.53</strong>
        </div>
      </div>
      <p className="ev-note">
        Channel-level funded-loan counts were not supplied. Loan principal is the amount lent, not revenue or profit.
      </p>
    </>
  );
}

function AegonEvidence() {
  return (
    <>
      <div className="ev-head">
        <h3>Trust the signal. Simplify the work.</h3>
        <span>US and Canada</span>
      </div>
      <DeltaBars
        rows={[
          { label: "Cost per lead", value: -13 },
          { label: "Completed applications", value: 18 },
          { label: "Meta Event Match Quality", value: 25 },
          { label: "Compliance review time", value: -60 },
        ]}
        caption="Relative changes. Blue marks the good direction."
      />
      <div className="two-flows">
        <div>
          <h4>Conversion signals</h4>
          <Flow
            label="Conversion signals"
            steps={[
              ["Capture", "GA4, server-side GTM, Enhanced Conversions, Meta CAPI"],
              ["Clean", "Deduplicated events; double counting removed"],
              ["Optimize", "Offline outcomes feed Smart Bidding and Meta"],
            ]}
          />
        </div>
        <div>
          <h4>Campaign operations</h4>
          <Flow
            label="Campaign operations"
            steps={[
              ["Standardize", "Builder applies naming and UTM rules"],
              ["Check", "Compliance QA built into setup"],
              ["Repeat", "Adopted team-wide; ~12 working days saved a year"],
            ]}
          />
        </div>
      </div>
      <p className="ev-note">
        Diagrams explain the systems; they are not screenshots of internal tools. Absolute budgets and acquisition
        figures remain confidential.
      </p>
    </>
  );
}

function PetmartEvidence() {
  return (
    <>
      <div className="ev-head">
        <h3>A first order, and a reason to return</h3>
        <span>Apr–Jun 2023</span>
      </div>
      <DeltaBars
        rows={[
          { label: "Paid-attributed sales, QoQ", value: 40 },
          { label: "Subscriptions", value: 30 },
        ]}
        caption="Client-reported growth over the period, alongside 4:1 first-order ROAS from Shopping and Performance Max."
      />
      <figure className="evidence-img petmart-evidence">
        <a href="/images/petmart-valentines.jpg" target="_blank" rel="noreferrer">
          <img
            src="/images/petmart-valentines.jpg"
            alt="Petmart and Sugar Beach Valentine’s campaign creative with a golden retriever and a dinner giveaway"
            loading="lazy"
          />
        </a>
        <figcaption>Creative example from the account. It illustrates the brand work, not the Apr–Jun figures.</figcaption>
      </figure>
    </>
  );
}

function DatsEvidence() {
  return (
    <>
      <div className="ev-head">
        <h3>More qualified leads, same budget</h3>
        <span>Feb 2026–present</span>
      </div>
      <CompareBars
        rows={[
          { label: "Before the rebuild", value: 100 },
          { label: "After the rebuild", value: 120, highlight: true },
        ]}
        caption="CRM-qualified leads indexed to 100 before the rebuild. Indices, not raw counts."
      />
      <div className="insights">
        <div>
          <strong>40%</strong>
          <span>of 212 leads came from Microsoft Advertising in the second quarter</span>
        </div>
        <div>
          <strong>4×</strong>
          <span>faster replies from the AI assistant than manual responses</span>
        </div>
      </div>
    </>
  );
}

const evidence = {
  university: UniversityEvidence,
  panasia: BankEvidence,
  aegon: AegonEvidence,
  petmart: PetmartEvidence,
  dats: DatsEvidence,
};

const order = ["university", "panasia", "aegon", "petmart", "dats"];

export default function CaseStudyPage({ project }) {
  const story = caseStories[project.id];
  const Evidence = evidence[project.id];
  const next = projects.find((p) => p.id === order[(order.indexOf(project.id) + 1) % order.length]);
  return (
    <main id="main" className="case-page">
      <article className="wrap case-wrap" aria-labelledby="case-title">
        <a className="back-link" href="/#work">
          <ArrowLeft size={16} aria-hidden="true" /> Back to selected work
        </a>
        <header className="case-hero">
          <p className="case-meta">
            <b>{project.client}</b>
            <span>{project.context}</span>
            <span>{project.period}</span>
          </p>
          <h1 id="case-title">{project.title}</h1>
          <p className="case-summary">{project.summary}</p>
          <p className="case-role">
            <b>My role.</b> {project.role}
          </p>
          <ul className="case-channels" aria-label="Channels">
            {project.channels.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </header>
        <dl className="case-stats">
          {project.stats.map(([v, l]) => (
            <div key={l}>
              <dt>{v}</dt>
              <dd>{l}</dd>
            </div>
          ))}
        </dl>
        <div className="case-story">
          <section aria-labelledby="case-problem">
            <h2 id="case-problem">The problem</h2>
            <p>{story.problem}</p>
          </section>
          <section aria-labelledby="case-action">
            <h2 id="case-action">What I did</h2>
            <ol className="actions">
              {story.actions.map(([t, b]) => (
                <li key={t}>
                  <b>{t}.</b> {b}
                </li>
              ))}
            </ol>
          </section>
          <section aria-labelledby="case-result">
            <h2 id="case-result">The result</h2>
            <p>{story.result}</p>
          </section>
        </div>
        <section className="case-evidence" aria-label={`${project.client} results`}>
          <Evidence />
        </section>
        <aside className="takeaway">
          <p>{story.takeaway}</p>
        </aside>
        <div className="case-source">
          <h2>Sources and measurement</h2>
          <p>{project.note}</p>
        </div>
        <nav className="case-next" aria-label="More case studies">
          <a className="back-link" href="/#work">
            All work
          </a>
          <a className="next-link" href={`/case-studies/${next.id}/`} data-track="case_open" data-case={next.id}>
            <span>Next case</span>
            <b>
              {next.client} <ArrowRight size={16} aria-hidden="true" />
            </b>
          </a>
        </nav>
      </article>
    </main>
  );
}
