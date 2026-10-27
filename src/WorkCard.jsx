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
      "Two low-intake colleges got a dedicated campaign: 125 paid enrolments versus 17 from the broad one. I tracked leads through the university’s CRM.",
    role: "End to end, for a partner agency’s client.",
  },
  aegon: {
    context: "Financial services · Aegon · 2025–now",
    numbers: [
      ["−13%", "cost per lead"],
      ["+18%", "completed applications"],
    ],
    method:
      "Same media budget, H1 2026. I connected Google and Meta campaigns to CRM-qualified outcomes and cleaned up double-counted conversions.",
    role: "Manage 50 business units; report to the CMO every two weeks.",
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
      "20% more qualified leads at the same budget, after rebuilding acquisition and adding an AI enquiry assistant.",
  },
};

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
            <div>
              <h3 className="project-client">
                {project.id === "dats" ? "DIMO Academy" : project.client}
                <span> · {story.context}</span>
              </h3>
              <p>{story.summary}</p>
            </div>
          </>
        ) : (
          <>
            <h3 className="project-client">{story.context}</h3>
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
