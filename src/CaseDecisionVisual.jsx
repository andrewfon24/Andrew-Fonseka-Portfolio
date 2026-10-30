import React from "react";
import {
  Target,
  ScanLine,
  Users,
  ChartNoAxesCombined,
  Workflow,
  ArrowRight,
} from "lucide-react";

export function MeasurementWorkflow() {
  const steps = [
    [Target, "Paid media campaigns", "Start with the marketing objective."],
    [
      ScanLine,
      "Conversion tracking & validation",
      "Check the signals used to assess activity.",
    ],
    [Users, "CRM outcomes", "Connect measurement to meaningful actions."],
    [
      ChartNoAxesCombined,
      "Analysis & optimization",
      "Turn reliable signals into decisions.",
    ],
    [
      Workflow,
      "Reporting & operational improvements",
      "Make the next cycle more consistent.",
    ],
  ];
  return (
    <figure className="concept-workflow" aria-labelledby="workflow-title">
      <h2 id="workflow-title">How the elements fit together</h2>
      <p className="concept-disclaimer">
        Illustrative process only; not an actual employer system diagram.
      </p>
      <ol>
        {steps.map(([Icon, title, detail], index) => (
          <li key={title}>
            <Icon size={28} strokeWidth={1.5} aria-hidden="true" />
            <h3>{title}</h3>
            <p>{detail}</p>
            {index < steps.length - 1 && (
              <ArrowRight
                className="concept-connector"
                size={18}
                aria-hidden="true"
              />
            )}
          </li>
        ))}
      </ol>
      <figcaption>
        Good campaign decisions depend on trustworthy signals and processes that
        teams can apply consistently.
      </figcaption>
    </figure>
  );
}
