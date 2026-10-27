import React from "react";
import { ArrowRight } from "lucide-react";

const previews = {
  university: {
    context: "Contract via partner agency SOL · Meta Ads · May–Aug 2026",
    method:
      "821 Meta leads → 430 qualified → 312 fee-paid, matched in the client CRM on name, phone and student ID.",
    problem:
      "The lowest-intake colleges needed students, not just more enquiries. I gave them a dedicated campaign and followed every lead through admissions.",
    role: "SOL brought the client; I ran strategy, campaign build, creative testing, optimization and CRM reporting from end to end.",
    note: "312 fee-paid enrolments overall. The full story explains why a higher-cost lead worked harder.",
  },
  panasia: {
    context: "Kites Global, agency · 2023",
    method:
      "259 funded loans matched back to campaign leads. About US$25K media, split 60/40 Meta and Google.",
    problem:
      "A fixed budget had to win borrowers in a competitive gold-loan market. Lead quality shaped the channel split; funded loans defined success.",
    role: "I led the account at Kites Global, designed and presented the Meta video strategy pitch and ran client calls through delivery.",
    note: "259 funded gold loans. See how the decisions connected media spend to lending outcomes.",
  },
  aegon: {
    context: "In-house, US and Canada · Jan 2025–present",
    method:
      "Google and Meta acquisition · H1 2026 · unchanged media spend. LinkedIn ABM is discussed separately in the case study.",
    problem:
      "I connected bidding to HubSpot outcomes, cleaned up conversion tracking and built a repeatable campaign workflow across a large account remit.",
    role: "I own the account work day to day, forecast allocations for Director sign-off and built the measurement and campaign workflows.",
    note: "Better acquisition signals and faster reviews. Explore the systems behind the reported improvements.",
  },
  petmart: {
    summary:
      "Separated new and returning customers in Google Shopping and Performance Max, with Meta supporting the retail brief.",
  },
  dats: {
    summary:
      "Rebuilt acquisition at flat spend and integrated Fin to answer enquiries and help hand them over to admissions.",
  },
};

function PreviewGraphic({ id }) {
  if (id === "university")
    return (
      <figure className="preview-graphic priority-preview">
        {[
          ["Dedicated priority campaign", 125],
          ["Broad campaign, same colleges", 17],
        ].map(([label, value]) => (
          <div className="preview-bar" key={label}>
            <div>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
            <span className="preview-track" aria-hidden="true">
              <i style={{ width: `${(value / 125) * 100}%` }} />
            </span>
          </div>
        ))}
        <figcaption>
          Fee-paid enrolments, two lowest-intake colleges. A dedicated vs broad
          campaign comparison, not a controlled test.
        </figcaption>
      </figure>
    );
  if (id === "panasia")
    return (
      <figure className="preview-graphic allocation-preview">
        <div
          className="preview-split"
          aria-label="Media spend: Meta 60%, Google Ads 40%"
        >
          <span>60%</span>
          <span>40%</span>
        </div>
        <div className="preview-legend">
          <span>
            <i />
            Meta <b>US$15K</b>
          </span>
          <span>
            <i />
            Google Ads <b>US$10K</b>
          </span>
        </div>
        <figcaption>
          Budget split guided by lead quality; results judged on funded loans.
        </figcaption>
      </figure>
    );
  return (
    <figure className="preview-graphic aegon-preview">
      <p className="preview-subhead">Supporting changes</p>
      {[
        ["Meta Event Match Quality", "signal quality", "+25%", 25],
        ["Campaign-builder review time", "operations", "−60%", 60],
      ].map(([label, kind, value, width]) => (
        <div className="preview-change" key={label}>
          <span>
            {label}
            <em>{kind}</em>
          </span>
          <span className="preview-track" aria-hidden="true">
            <i style={{ width: `${width}%` }} />
          </span>
          <strong>{value}</strong>
        </div>
      ))}
      <figcaption>
        Relative changes in signal quality and review time. Separate from the
        acquisition results above.
      </figcaption>
    </figure>
  );
}

export default function WorkCard({ project, compact = false }) {
  const story = previews[project.id];
  const metrics =
    project.id === "aegon"
      ? [
          ["−13%", "cost per lead"],
          ["+18%", "completed applications"],
        ]
      : [
          [project.metric, project.metricLabel],
          [
            project.secondary,
            project.id === "university"
              ? "media cost per enrolment"
              : project.secondaryLabel,
          ],
        ];
  return (
    <article
      className={`project-card story-card ${compact ? "story-card-compact" : "story-card-featured"}`}
    >
      <a
        className="project-open"
        href={`/case-studies/${project.id}/`}
        data-track="case_open"
        data-case={project.id}
      >
        <div className="story-card-heading">
          <p className="story-client project-client">{project.client}</p>
          {!compact && <p className="story-context">{story.context}</p>}
          <h3>{project.title}</h3>
        </div>
        {compact ? (
          <>
            <p className="story-summary">{story.summary}</p>
            <div className="story-small-result">
              <strong>{project.metric}</strong>
              <span>{project.metricLabel}</span>
            </div>
          </>
        ) : (
          <>
            <div className="story-metrics">
              {metrics.map(([value, label]) => (
                <div key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <PreviewGraphic id={project.id} />
            <p className="story-summary">{story.problem}</p>
            <p className="story-method">{story.method}</p>
            <p className="story-role">
              <b>My role.</b> {story.role}
            </p>
          </>
        )}
        <span className="project-case-link">
          Read the case study <ArrowRight size={16} aria-hidden="true" />
        </span>
      </a>
    </article>
  );
}
