import React, { useState } from "react";
import { ArrowRight, Mail, MapPin, Plus, Minus } from "lucide-react";
import {
  projects,
  experience,
  testimonials,
  toolkit,
  certifications,
  questions,
  email,
} from "./data";
import CaseStudyPage from "./CaseStudyPage";
import BrandIcon from "./BrandIcon";
import { Header, Contact, Footer } from "./Shell";
import { HeroFunnel, CompareBars, SplitBar, DeltaBars, DotMatrix } from "./Charts";

const byId = (id) => projects.find((p) => p.id === id);

const cardViz = {
  university: () => (
    <CompareBars
      rows={[
        { label: "Dedicated priority campaign", value: 125, display: "125", highlight: true },
        { label: "Broad campaign, same colleges", value: 17, display: "17" },
      ]}
      caption="Enrolments for the two lowest-intake colleges"
    />
  ),
  panasia: () => (
    <SplitBar
      parts={[
        { label: "Meta", value: 60, amount: "US$15K" },
        { label: "Google Ads", value: 40, amount: "US$10K" },
      ]}
      caption="Split set on lead quality, judged on funded loans"
    />
  ),
  aegon: () => (
    <DeltaBars
      rows={[
        { label: "Cost per lead", value: -13 },
        { label: "Completed applications", value: 18 },
        { label: "Meta Event Match Quality", value: 25 },
        { label: "Compliance review time", value: -60 },
      ]}
      caption="Relative change. Absolute figures stay under NDA."
    />
  ),
};

function CaseCard({ p }) {
  const Viz = cardViz[p.id];
  return (
    <article className="case-card">
      <header className="cc-head">
        <span className="cc-client">{p.client}</span>
        <span className="cc-context">{p.context}</span>
      </header>
      <h3>
        <a href={`/case-studies/${p.id}/`} data-track="case_open" data-case={p.id}>
          {p.title}
        </a>
      </h3>
      <div className="cc-metrics">
        <div>
          <strong>{p.metric}</strong>
          <span>{p.metricLabel}</span>
        </div>
        <div>
          <strong>{p.secondary}</strong>
          <span>{p.secondaryLabel}</span>
        </div>
      </div>
      <div className="cc-viz">
        <Viz />
      </div>
      <p className="cc-role">
        <b>My role.</b> {p.role}
      </p>
      <span className="cc-link" aria-hidden="true">
        Read the case <ArrowRight size={16} />
      </span>
    </article>
  );
}

function MiniCase({ p }) {
  return (
    <a className="mini-case" href={`/case-studies/${p.id}/`} data-track="case_open" data-case={p.id}>
      <div>
        <span className="cc-client">{p.client}</span>
        <h3>{p.title}</h3>
        <p>{p.summary}</p>
      </div>
      <div className="mini-metric">
        <strong>{p.metric}</strong>
        <span>{p.metricLabel}</span>
      </div>
    </a>
  );
}

const steps = [
  {
    title: "Fix the signal",
    body: "Tracking, CRM fields and deduplication before any budget moves.",
    proof: "Removed double-counted GTM conversions at Aegon; the corrected data reset reported CPA.",
  },
  {
    title: "Optimize to what the business counts",
    body: "Bid on qualified leads, enrolments or funded loans, not form fills.",
    proof: "HubSpot offline conversions into Smart Bidding: CPL −13%, completed applications +18%.",
  },
  {
    title: "Test, then reallocate",
    body: "Separate what needs its own budget, and move money on evidence.",
    proof: "A dedicated priority-college campaign converted 77.6% of leads into enrolments.",
  },
  {
    title: "Report and systemize",
    body: "Clear dashboards, and tools so the next launch is faster.",
    proof: "Looker Studio client dashboards; an Apps Script builder cut compliance review 60%.",
  },
];

function Approach() {
  return (
    <section className="section approach" id="approach" aria-labelledby="approach-title">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">How I work</p>
          <h2 id="approach-title">Signal first. Budget follows evidence.</h2>
        </div>
        <ol className="steps">
          {steps.map((s, i) => (
            <li key={s.title} className="step">
              <span className="step-n" aria-hidden="true">
                {i + 1}
              </span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <p className="step-proof">{s.proof}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Range() {
  return (
    <section className="section range" aria-labelledby="range-title">
      <div className="wrap range-grid">
        <div>
          <p className="kicker">Range</p>
          <h2 id="range-title">Built for agency pace.</h2>
          <p className="lede">One dot per ad account at Aegon. Plus a contract book and an agency past.</p>
          <dl className="range-stats">
            <div>
              <dt>7</dt>
              <dd>contract clients in 2026, across four industries</dd>
            </div>
            <div>
              <dt>4 + 5</dt>
              <dd>accounts led and supported at once at Kites Global</dd>
            </div>
            <div>
              <dt>6</dt>
              <dd>markets: Canada, US, Saudi Arabia, Sri Lanka, Singapore, Malaysia</dd>
            </div>
          </dl>
        </div>
        <DotMatrix owned={50} shared={100} />
      </div>
    </section>
  );
}

function Ask() {
  const [i, setI] = useState(0);
  return (
    <section className="section ask" id="questions" aria-labelledby="ask-title">
      <div className="wrap ask-grid">
        <div>
          <p className="kicker">Before you call</p>
          <h2 id="ask-title">Questions hiring managers ask me.</h2>
          <div className="ask-chips">
            {questions.map((item, n) => (
              <React.Fragment key={item.q}>
                <button
                  aria-expanded={i === n}
                  aria-controls={`ask-inline-${n}`}
                  onClick={() => setI(i === n && window.matchMedia("(max-width: 899px)").matches ? -1 : n)}
                  data-track="question_open"
                  data-question={n + 1}
                >
                  {item.q}
                </button>
                {i === n && (
                  <div className="ask-inline" id={`ask-inline-${n}`}>
                    {item.a}
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="ask-answer" aria-live="polite">
          <p className="ask-q">{questions[Math.max(i, 0)].q}</p>
          <p className="ask-a" key={i}>
            {questions[Math.max(i, 0)].a}
          </p>
          <a className="ask-more" href={`mailto:${email}`} data-track="email_click" data-where="questions">
            Ask me something else
          </a>
        </div>
      </div>
    </section>
  );
}

function Toolkit() {
  return (
    <section className="section toolkit" aria-labelledby="toolkit-title">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">Toolkit</p>
          <h2 id="toolkit-title">Hands-on, not just listed.</h2>
        </div>
        <div className="tool-groups">
          {toolkit.map((g) => (
            <div className="tool-group" key={g.group}>
              <h3>{g.group}</h3>
              <ul className="tool-list">
                {g.tools.map((t) => (
                  <li key={t}>
                    <BrandIcon tool={t} />
                    {t}
                  </li>
                ))}
              </ul>
              <p>{g.skills}</p>
            </div>
          ))}
        </div>
        <ul className="certs" aria-label="Certifications">
          {certifications.map(([name, issuer, domain]) => (
            <li key={name}>
              <BrandIcon domain={domain} />
              <span>
                <b>{name}</b>
                <small>{issuer}</small>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function References() {
  return (
    <section className="section references" id="references" aria-labelledby="refs-title">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">References</p>
          <h2 id="refs-title">From people who managed the work.</h2>
        </div>
        <div className="quotes">
          {testimonials.map((t) => (
            <figure className="quote" key={t.name}>
              <blockquote>{t.quote}</blockquote>
              <figcaption>
                <span className="q-initials" aria-hidden="true">
                  {t.initials}
                </span>
                <span>
                  <b>{t.name}</b>
                  <small>{t.role}</small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <a
          className="text-link"
          href="https://www.linkedin.com/in/andrewfonseka/details/recommendations/"
          target="_blank"
          rel="noreferrer"
          data-track="linkedin_click"
          data-where="references"
        >
          Verbatim LinkedIn recommendations
        </a>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="wrap about-grid">
        <div className="about-copy">
          <div>
            <p className="kicker">About</p>
            <h2 id="about-title">From Colombo agencies to Vancouver.</h2>
            <p>
              I started on agency teams in Colombo, did a full-time MBA in Vancouver, and now run paid media in-house
              at Aegon alongside a small contract book. The constant: I want to know what happened after the click.
            </p>
            <p className="about-loc">
              <MapPin size={16} aria-hidden="true" /> Greater Vancouver, BC. Authorized to work in Canada.
            </p>
          </div>
        </div>
        <ol className="timeline" aria-label="Career timeline">
          {experience.map((e) => (
            <li key={e.company + e.date} className={`tl-item kind-${e.kind.toLowerCase()}`}>
              <details className="experience-item">
                <summary>
                  <span className="tl-date">{e.date}</span>
                  <span className="tl-main">
                    <b>{e.company}</b>
                    <span>{e.role}</span>
                  </span>
                  <span className="tl-kind">{e.kind}</span>
                  <Plus className="tl-plus" size={18} aria-hidden="true" />
                  <Minus className="tl-minus" size={18} aria-hidden="true" />
                </summary>
                <p className="experience-detail">{e.detail}</p>
              </details>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Home() {
  return (
    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <div className="hero-id">
              <img src="/images/andrew-fonseka-avatar.webp" alt="" width="192" height="192" fetchPriority="high" />
              <span>
                <b>Andrew Fonseka</b>
                <span>Paid Media Specialist, Greater Vancouver</span>
              </span>
            </div>
            <h1 id="hero-title">Paid media judged on customers, not clicks.</h1>
            <p className="hero-sub">
              I plan, build and optimize Google, Meta, LinkedIn and Microsoft Ads to what the business counts: qualified
              leads, enrolments, funded loans.
            </p>
            <div className="hero-actions">
              <a className="btn btn-gold" href={`mailto:${email}`} data-track="email_click" data-where="hero">
                <Mail size={18} aria-hidden="true" /> Email me
              </a>
              <a className="btn btn-outline-light" href="#work">
                See the work
              </a>
            </div>
          </div>
          <HeroFunnel />
        </div>
        <div className="wrap">
          <dl className="proof">
            <div>
              <dt>Since 2022</dt>
              <dd>agency, in-house and contract</dd>
            </div>
            <div>
              <dt>7-figure</dt>
              <dd>annual program at Aegon</dd>
            </div>
            <div>
              <dt>50 + ~100</dt>
              <dd>accounts owned and co-managed</dd>
            </div>
            <div>
              <dt>6 markets</dt>
              <dd>North America, Middle East, Asia</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section work" id="work" aria-labelledby="work-title">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker">Selected work</p>
            <h2 id="work-title">Three accounts. Three business outcomes.</h2>
          </div>
          <div className="case-grid">
            {["university", "panasia", "aegon"].map((id) => (
              <CaseCard key={id} p={byId(id)} />
            ))}
          </div>
          <div className="more-work">
            <h3 className="more-title">More work</h3>
            {["petmart", "dats"].map((id) => (
              <MiniCase key={id} p={byId(id)} />
            ))}
          </div>
          <p className="fine">Real campaigns. Sources and measurement notes are inside every case.</p>
        </div>
      </section>

      <Range />
      <Approach />
      <Ask />
      <Toolkit />
      <References />
      <About />
    </main>
  );
}

export default function App({ projectId = null }) {
  const caseProject = projectId ? byId(projectId) : null;
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header onCase={Boolean(caseProject)} />
      {caseProject ? <CaseStudyPage project={caseProject} /> : <Home />}
      <Contact />
      <Footer />
    </>
  );
}
