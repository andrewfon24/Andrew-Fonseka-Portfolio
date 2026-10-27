import React from "react";
import {
  ArrowRight,
  ListFilter,
  Presentation,
  Users,
  MessageSquare,
  CalendarDays,
  FileCheck2,
  Landmark,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

export function ProcessDiagram({ steps, label, className = "" }) {
  return (
    <ol className={`process-diagram ${className}`} aria-label={label}>
      {steps.map(([Icon, title, description], index) => (
        <li key={title}>
          <Icon size={23} strokeWidth={1.5} aria-hidden="true" />
          <strong>{title}</strong>
          <span>{description}</span>
          {index < steps.length - 1 && (
            <ArrowRight
              className="process-arrow"
              size={16}
              aria-hidden="true"
            />
          )}
        </li>
      ))}
    </ol>
  );
}

export function ABMJourney() {
  return (
    <figure className="abm-journey">
      <ProcessDiagram
        label="LinkedIn investor journey"
        steps={[
          [
            ListFilter,
            "Prioritize",
            "Custom audience lists organized in Google Sheets",
          ],
          [
            Users,
            "Reach",
            "Matched Audiences, Thought Leader Ads and carousel creative",
          ],
          [MessageSquare, "Enquire", "A prospect responds through a lead form"],
          [
            CalendarDays,
            "Meet",
            "An adviser contacts the prospect and books a meeting",
          ],
          [
            FileCheck2,
            "Prepare",
            "The adviser and prospect exchange account documents",
          ],
          [
            Landmark,
            "Fund",
            "The customer opens and funds the investment account",
          ],
        ]}
      />
      <div className="feedback-loop">
        <RefreshCw size={20} aria-hidden="true" />
        <div>
          <strong>Bring the learning back into the account.</strong>
          <p>
            LinkedIn campaign activity → HubSpot-qualified enquiries → regional
            analysis → audience and budget decisions.
          </p>
        </div>
      </div>
      <figcaption>
        Process illustration. LinkedIn influenced customers within a wider
        adviser-led journey. Campaign results and financial figures are
        confidential.
      </figcaption>
    </figure>
  );
}

export function ABMStory() {
  return (
    <article className="decision-story" aria-labelledby="decision-title">
      <div className="decision-copy">
        <span className="story-context">
          Aegon · LinkedIn ABM · US & Canada · H1 2026
        </span>
        <h3 id="decision-title">
          A strategy I could explain. An account I could keep improving.
        </h3>
        <p>
          For a high-net-worth investor program, I owned the strategy and
          execution. My Director challenged the initial proposal. I used
          forecasting and a visual presentation to explain the plan and win
          support.
        </p>
        <p>
          Once live, I connected LinkedIn with HubSpot and compared qualified
          enquiries across regions. When one region lagged, I adjusted the
          audience strategy and moved budget toward the stronger regions.
        </p>
        <a
          className="text-link"
          href="/case-studies/aegon/#linkedin-abm"
          data-track="case_open"
          data-case="aegon"
        >
          Inside the LinkedIn strategy{" "}
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      </div>
      <ABMJourney />
    </article>
  );
}

export function CampaignWorkflow() {
  return (
    <figure className="automation-workflow">
      <ProcessDiagram
        label="Campaign builder and human approval"
        steps={[
          [
            ListFilter,
            "Campaign inputs",
            "The team enters campaign details in Google Sheets.",
          ],
          [
            FileCheck2,
            "Templates & rules",
            "Apps Script assembles campaign structure, descriptions, copy and tracking conventions.",
          ],
          [
            ShieldCheck,
            "Review the flags",
            "Checks against configured US and Canadian rules flag potential issues for a person to review.",
          ],
          [
            Users,
            "Director approval",
            "The Director gives final approval before launch.",
          ],
        ]}
      />
      <figcaption>
        I developed the Apps Script with Claude’s assistance and refined it for
        the team. The running builder uses templates and rules; people review
        flagged issues and approve campaigns.
      </figcaption>
    </figure>
  );
}

export function EnquiryWorkflow() {
  return (
    <figure className="enquiry-workflow">
      <ProcessDiagram
        label="DATS enquiry and admissions handoff"
        steps={[
          [
            MessageSquare,
            "Answer",
            "Fin responds to prospective students, including after hours.",
          ],
          [
            CalendarDays,
            "Book",
            "The assistant helps book appointments into the college calendar.",
          ],
          [
            Users,
            "Hand over",
            "Email notifications and reminders keep the admissions team informed.",
          ],
        ]}
      />
      <figcaption>
        The reported 4× improvement compares AI and human response times during
        working hours. After-hours availability is a separate benefit.
      </figcaption>
    </figure>
  );
}

export function ClientPartnership() {
  return (
    <section
      className="client-partnership section"
      aria-labelledby="partnership-title"
    >
      <div className="container partnership-grid">
        <div>
          <h2 id="partnership-title">
            Make the recommendation easy to understand.
          </h2>
          <p>
            During a breast cancer campaign for a Malaysian pharmaceutical
            client, I spotted proposed copy and creative that risked breaching
            Meta’s advertising rules.
          </p>
          <p>
            To make the recommendation clear across a language barrier, I built
            a visual deck and walked the client through the concerns and a
            revised approach. We tightened the copy before launch. The client
            accepted the strategy and later extended the contract.
          </p>
          <p className="partnership-note">
            Client communication example · client name withheld
          </p>
        </div>
        <div className="partnership-visual">
          <Presentation size={32} strokeWidth={1.5} aria-hidden="true" />
          <ol aria-label="How I brought the client along">
            <li>
              <strong>Spot the risk</strong>
              <span>Review the proposed creative and copy.</span>
            </li>
            <li>
              <strong>Make it visual</strong>
              <span>Explain the concern and the alternative in a deck.</span>
            </li>
            <li>
              <strong>Agree the next step</strong>
              <span>Revise the copy with the client before launch.</span>
            </li>
          </ol>
          <p>Clear analysis matters. So does helping the client act on it.</p>
        </div>
      </div>
    </section>
  );
}
