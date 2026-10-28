import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { CampaignWorkflow, EnquiryWorkflow } from "./NarrativeVisuals";

export function Systems() {
  const [selected, setSelected] = useState("Campaign builder");
  const builder = selected === "Campaign builder";
  return (
    <section className="systems-section systems-compact section" id="systems">
      <div className="container">
        <div className="compact-head">
          <div className="eyebrow light">BUILT AND PUT TO WORK</div>
          <h2>Give the team its time back.</h2>
          <p className="systems-intro">
            Repeated setup and slow follow-up take time away from the account. I
            build practical tools that make those tasks easier, with a clear
            handoff to the people responsible.
          </p>
        </div>
        <div className="system-switch" aria-label="Explore working systems">
          {["Campaign builder", "Enquiry assistant"].map((name) => (
            <button
              key={name}
              aria-pressed={selected === name}
              onClick={() => setSelected(name)}
            >
              {name}
            </button>
          ))}
        </div>
        <div className="system-story" aria-live="polite">
          <div className="system-explanation">
            <h3>
              {builder
                ? "Build consistently. Review deliberately."
                : "Keep the enquiry moving, even after hours."}
            </h3>
            <p>
              {builder
                ? "At Aegon, I turned campaign setup into a Google Sheets and Apps Script workflow. Templates assemble the campaign, rules flag potential compliance issues, and my Director approves the final work."
                : "At DIMO Academy, I helped integrate Fin to answer enquiries and help arrange appointments. Calendar bookings and email notifications give admissions a clearer handoff."}
            </p>
            <div className="system-proof">
              <strong>{builder ? "−60%" : "+20%"}</strong>
              <span>
                {builder
                  ? "compliance review time"
                  : "CRM-qualified leads at flat spend"}
              </span>
            </div>
            <p className="system-detail">
              {builder
                ? "Approximately 12 working days saved annually, based on the reported review-time reduction."
                : "Client-reported acquisition results at unchanged spend. Fin supports the admissions handoff; these results are not attributed to Fin alone."}
            </p>
            <a
              className="text-link"
              href={
                builder
                  ? "/case-studies/aegon/#case-evidence"
                  : "/case-studies/dats/#case-evidence"
              }
              data-track="case_open"
              data-case={builder ? "aegon" : "dats"}
            >
              See the workflow in context{" "}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
          {builder ? <CampaignWorkflow /> : <EnquiryWorkflow />}
        </div>
      </div>
    </section>
  );
}
