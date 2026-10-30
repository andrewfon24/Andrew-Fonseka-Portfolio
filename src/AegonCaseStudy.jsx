import React from "react";
import { ArrowRight } from "lucide-react";
import { MeasurementWorkflow } from "./CaseDecisionVisual";

const approaches = [
  {
    title: "Connecting paid media with CRM outcomes",
    body: "I worked on connecting CRM conversion signals with advertising platforms to support optimization beyond initial form submissions.",
    detail:
      "This approach helped bring greater attention to meaningful downstream customer actions and the quality of acquisition activity, rather than relying only on surface-level lead volumes.",
    tools: ["Paid media", "CRM-integrated measurement"],
  },
  {
    title: "Strengthening conversion tracking",
    body: "I implemented and reviewed conversion tracking across paid media platforms, addressing measurement inconsistencies and supporting more reliable campaign analysis.",
    detail:
      "The work involved Google Analytics 4, Google Tag Manager, Enhanced Conversions and Meta Conversions API.",
    tools: ["Tracking validation", "Performance analytics"],
  },
  {
    title: "Automating campaign operations",
    body: "I developed automation solutions using Google Apps Script and Google Ads Scripts to streamline repetitive campaign workflows and support more consistent execution.",
    detail:
      "My work covered campaign setup, tracking conventions, quality-assurance checks and operational controls. I particularly enjoyed combining hands-on advertising knowledge with technical problem-solving.",
    tools: ["Campaign automation", "Quality assurance"],
  },
  {
    title: "Making performance reporting more useful",
    body: "I developed budget pacing and performance reporting dashboards to support ongoing campaign monitoring and provide clearer information for planning and decision-making.",
    detail:
      "I also collaborated with cross-functional teams and external partners to coordinate campaign activity, review performance and identify opportunities for improvement.",
    tools: ["Budget pacing", "Stakeholder reporting"],
  },
];

export default function AegonCaseStudy() {
  return (
    <main id="main" className="case-page case-story-dialog aegon-editorial">
      <article className="dialog-content" aria-labelledby="case-title">
        <a className="text-link case-back" href="/#work">
          <ArrowRight size={16} className="back-arrow" aria-hidden="true" />{" "}
          Selected work
        </a>
        <header className="case-summary">
          <h1 id="case-title">
            Making paid media measurement more reliable through automation.
          </h1>
          <dl className="aegon-facts">
            <div>
              <dt>Role</dt>
              <dd>Digital Marketing Strategist</dd>
            </div>
            <div>
              <dt>Sector</dt>
              <dd>Financial services, Aegon</dd>
            </div>
            <div>
              <dt>Period</dt>
              <dd>2025 to 2026</dd>
            </div>
          </dl>
          <ul className="case-specialisms" aria-label="Specializations">
            <li>Paid media strategy</li>
            <li>Marketing automation</li>
            <li>Conversion tracking</li>
            <li>Performance analytics</li>
          </ul>
          <p className="case-answer">
            Effective performance marketing requires more than generating clicks
            or leads. It depends on reliable data, consistent execution and a
            clear understanding of how advertising contributes to wider business
            objectives.
          </p>
          <p>
            In my role as a Digital Marketing Strategist, I worked across paid
            media, conversion measurement, reporting and automation in a
            regulated financial services environment. My focus was on connecting
            campaign execution with useful marketing signals while identifying
            practical opportunities to improve the way campaigns were managed.
          </p>
        </header>
        <section className="aegon-challenge" aria-labelledby="challenge-title">
          <h2 id="challenge-title">The challenge</h2>
          <div>
            <p>
              Marketing teams need dependable conversion measurement and
              repeatable processes to make informed campaign decisions.
            </p>
            <p>
              When tracking is inconsistent or routine campaign tasks require
              extensive manual effort, it becomes harder to understand
              performance, maintain quality and focus on higher-value strategic
              work.
            </p>
            <p>
              The opportunity was to strengthen measurement, improve workflow
              consistency and support more actionable reporting within the
              requirements of a regulated industry.
            </p>
          </div>
        </section>
        <section className="aegon-approach" aria-labelledby="approach-title">
          <h2 id="approach-title">My approach</h2>
          <ol>
            {approaches.map((item, index) => (
              <li key={item.title}>
                <span className="approach-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <p>{item.detail}</p>
                </div>
                <ul
                  className="approach-skills"
                  aria-label={`Focus: ${item.title}`}
                >
                  {item.tools.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>
        <MeasurementWorkflow />
        <section
          className="aegon-demonstrated"
          aria-labelledby="demonstrated-title"
        >
          <h2 id="demonstrated-title">What this work demonstrated</h2>
          <div>
            <p>The experience helped me strengthen my ability to:</p>
            <ul>
              <li>
                Apply paid media expertise alongside marketing technology and
                automation.
              </li>
              <li>
                Connect campaign measurement with meaningful business and CRM
                outcomes.
              </li>
              <li>
                Build more repeatable execution and quality-assurance processes.
              </li>
              <li>
                Translate marketing data into clearer, practical
                recommendations.
              </li>
              <li>
                Collaborate across teams while working within a regulated
                environment.
              </li>
            </ul>
            <p className="qualitative-note">
              These describe the work and capabilities involved, not quantified
              performance improvements.
            </p>
          </div>
        </section>
        <section className="aegon-takeaway" aria-labelledby="takeaway-title">
          <h2 id="takeaway-title">
            Good performance marketing starts with reliable data and repeatable
            processes.
          </h2>
          <p>
            I believe that combining paid media strategy with technical
            curiosity and thoughtful automation helps marketing teams spend more
            time on analysis, creativity and better decision-making, and less
            time repeating routine tasks.
          </p>
        </section>
        <aside className="confidentiality-note">
          <h2>Confidentiality note</h2>
          <p>
            This case study describes general professional responsibilities and
            approaches. Internal campaign results, financial figures,
            proprietary documentation, confidential operating details and
            employer-specific system architecture are intentionally excluded.
            The conceptual workflow is illustrative.
          </p>
        </aside>
        <div className="case-next">
          <span>Next case study</span>
          <a
            href="/case-studies/university/"
            data-track="case_open"
            data-case="university"
          >
            Private university <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
        <a className="text-link case-return" href="/#work">
          Back to selected work <ArrowRight size={16} aria-hidden="true" />
        </a>
      </article>
    </main>
  );
}
