import React from "react";
import { ArrowRight } from "lucide-react";

const previews = {
  university: {
    context: "Education · Saudi Arabia · 2026",
    numbers: [
      ["312", "fee-paid enrolments"],
      ["~US$20", "ad spend per enrolment"],
    ],
    method:
      "Two low-intake colleges got a dedicated campaign: 125 paid enrolments versus 17 from the broad one. I helped connect reporting to the university’s CRM.",
    role: "Advised on strategy and helped launch the campaigns, for a partner agency’s client.",
  },
  aegon: {
    context: "Financial services · Aegon · 2025–now",
    numbers: [
      ["−13%", "cost per lead"],
      ["+18%", "completed applications"],
    ],
    method:
      "Same media budget, H1 2026. I connected Google and Meta campaigns to CRM-qualified outcomes and cleaned up double-counted conversions.",
    role: "Launch and manage 20+ campaigns for 50 business units, with weekly senior-management and biweekly CMO reporting.",
  },
  panasia: {
    context: "Banking · Pan Asia Bank · 2023",
    numbers: [
      ["259", "funded gold loans"],
      ["~US$97", "ad spend per funded loan"],
    ],
    method:
      "I allocated US$25K across Meta and Google using lead quality, judged results on funded loans and presented the strategy to the client.",
    role: "Led the account and client calls at Kites Global.",
  },
  petmart: {
    context: "E-commerce",
    summary:
      "About $4 of first-order sales for every $1 of ad spend, from Google Shopping and Performance Max.",
  },
  dats: {
    context: "Education",
    summary:
      "Advised on acquisition strategy and supported a Google Ads and Meta rebuild, adding Microsoft Advertising at flat spend.",
  },
};

function CardDataVisual({ id }) {
  if (id === "university")
    return (
      <figure className="card-data card-funnel">
        <div className="card-data-rows">
          {[
            ["Leads", 821],
            ["Qualified", 430],
            ["Enrolled", 312],
          ].map(([label, value]) => (
            <div className="card-funnel-row" key={label}>
              <span>{label}</span>
              <span className="card-data-track" aria-hidden="true">
                <i style={{ width: `${(value / 821) * 100}%` }} />
              </span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
        <figcaption>From Meta lead to fee-paid enrolment.</figcaption>
      </figure>
    );
  if (id === "aegon")
    return (
      <figure className="card-data card-comparison">
        {[
          ["Cost per lead", 87],
          ["Applications", 118],
        ].map(([label, value]) => (
          <div className="card-comparison-row" key={label}>
            <div>
              <span>{label}</span>
              <strong>100 → {value}</strong>
            </div>
            <div className="card-compare-tracks" aria-hidden="true">
              <i
                className="card-before"
                style={{ width: `${(100 / 118) * 100}%` }}
              />
              <i
                className="card-after"
                style={{ width: `${(value / 118) * 100}%` }}
              />
            </div>
          </div>
        ))}
        <figcaption>Before → after · Each baseline = 100.</figcaption>
      </figure>
    );
  return (
    <figure className="card-data card-budget">
      <p className="card-data-title">US$25K media budget</p>
      <div
        className="card-budget-bar"
        aria-label="Meta 60 percent, Google Ads 40 percent"
      >
        <span>60%</span>
        <span>40%</span>
      </div>
      <div className="card-budget-labels">
        <span>
          Meta<strong>US$15K</strong>
        </span>
        <span>
          Google Ads<strong>US$10K</strong>
        </span>
      </div>
      <figcaption>Spend allocation, guided by lead quality.</figcaption>
    </figure>
  );
}

export default function WorkCard({ project, compact = false }) {
  const story = previews[project.id];
  return (
    <article className={compact ? "result-row" : "result-card"}>
      <a
        className="project-open"
        href={`/case-studies/${project.id}/`}
        data-track="case_open"
        data-case={project.id}
      >
        {compact ? (
          <>
            <div className="more-card-copy">
              <p className="more-card-client">{project.client}</p>
              <h3 className="project-client">{project.title}</h3>
              <p>{story.summary}</p>
            </div>
            <div className="more-card-metric">
              <strong>{project.metric}</strong>
              <span>{project.metricLabel}</span>
              {project.id === "petmart" ? (
                <div
                  className="return-visual"
                  aria-label="One unit of ad spend returns four units of first-order sales"
                >
                  <i aria-hidden="true" />
                  <ArrowRight size={12} aria-hidden="true" />
                  <span aria-hidden="true">
                    {[1, 2, 3, 4].map((n) => (
                      <i key={n} />
                    ))}
                  </span>
                </div>
              ) : (
                <div
                  className="growth-visual"
                  aria-label="Qualified leads increased from a baseline index of 100 to 120"
                >
                  <i style={{ width: "83.333%" }} />
                  <i style={{ width: "100%" }} />
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <p className="project-client">{story.context}</p>
            <h3 className="result-story-title">{project.title}</h3>
            <div className="result-numbers">
              {story.numbers.map(([value, label]) => (
                <div key={label}>
                  <strong>{value}</strong>
                  <span>
                    {label}
                    {project.id === "university" &&
                    label === "ad spend per enrolment"
                      ? " · Meta Ads"
                      : ""}
                  </span>
                </div>
              ))}
            </div>
            <CardDataVisual id={project.id} />
            <p className="result-method">{story.method}</p>
            <p className="result-role">
              <strong>My role.</strong> {story.role}
            </p>
          </>
        )}
        <span className="project-case-link">
          Read the case study <ArrowRight size={17} aria-hidden="true" />
        </span>
      </a>
    </article>
  );
}
