import React from "react";
import { ArrowRight } from "lucide-react";

const previews = {
  university: {
    context: "Contract, via partner agency SOL",
    problem:
      "The lowest-intake colleges needed students, not just more enquiries. I gave them a dedicated campaign and followed every lead through admissions.",
    role: "SOL brought the client; I ran strategy, campaign build, creative testing, optimization and CRM reporting from end to end.",
    note: "312 fee-paid enrolments overall. The full story explains why a higher-cost lead worked harder.",
  },
  panasia: {
    context: "Kites Global, agency",
    problem:
      "A fixed budget had to win borrowers in a competitive gold-loan market. Lead quality shaped the channel split; funded loans defined success.",
    role: "I led the account at Kites Global, designed and presented the Meta video strategy pitch, set the channel split and ran client calls through delivery.",
    note: "259 funded gold loans. See how the decisions connected media spend to lending outcomes.",
  },
  aegon: {
    context: "In-house, US and Canada",
    problem:
      "Across 50+ business-unit accounts, unreliable conversion signals and repetitive setup made scale harder. I rebuilt measurement and the campaign workflow.",
    role: "I run the accounts I own day to day, with my Director reviewing the work. The measurement rebuild and campaign builder are my work.",
    note: "Better acquisition signals and faster reviews. Explore the systems behind the reported improvements.",
  },
  petmart: {
    summary:
      "Restructured Google Shopping and Performance Max, with Meta in support, and tracked subscriptions alongside first orders.",
  },
  dats: {
    summary:
      "Rebuilt Google and Meta campaigns, added Microsoft Advertising and a new landing page with a 24/7 AI assistant, at flat spend.",
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
          Fee-paid enrolments for the two lowest-intake colleges.
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
      {[
        ["Cost per lead", "−13%", 13],
        ["Completed applications", "+18%", 18],
        ["Meta Event Match Quality", "+25%", 25],
        ["Compliance review time", "−60%", 60],
      ].map(([label, value, width]) => (
        <div className="preview-change" key={label}>
          <span>{label}</span>
          <span className="preview-track" aria-hidden="true">
            <i style={{ width: `${width}%` }} />
          </span>
          <strong>{value}</strong>
        </div>
      ))}
      <figcaption>
        Relative changes. Absolute figures remain confidential.
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
      <a className="project-open" href={`/case-studies/${project.id}/`}>
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
