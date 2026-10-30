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
        I contributed strategic advice, helped build parts of the landing page
        and helped integrate Fin, connecting prospective students’ enquiries
        with admissions follow-up.
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
