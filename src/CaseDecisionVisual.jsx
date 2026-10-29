import React from "react";
import {
  MousePointer2,
  FileText,
  UserCheck,
  CalendarCheck,
  ClipboardCheck,
  ArrowRight,
  CornerDownLeft,
} from "lucide-react";

export function AegonSignalJourney() {
  const stages = [
    [MousePointer2, "Ad click", "The starting point"],
    [FileText, "Form fill", "Before: bidding signal"],
    [UserCheck, "Qualified lead", "After: CRM signal"],
    [CalendarCheck, "Booked call", "After: CRM signal"],
    [ClipboardCheck, "Completed application", "After: CRM signal"],
  ];
  return (
    <figure
      className="signal-journey"
      aria-label="Campaign optimization moved from form submissions to HubSpot-qualified outcomes"
    >
      <ol>
        {stages.map(([Icon, title, label], index) => (
          <li
            key={title}
            className={index > 1 ? "signal-qualified" : "signal-entry"}
          >
            <span className="signal-icon">
              <Icon size={22} aria-hidden="true" />
            </span>
            <div>
              <strong>{title}</strong>
              <span>{label}</span>
            </div>
            {index < stages.length - 1 && (
              <ArrowRight
                className="signal-arrow"
                size={17}
                aria-hidden="true"
              />
            )}
          </li>
        ))}
      </ol>
      <figcaption>
        <CornerDownLeft size={18} aria-hidden="true" /> HubSpot offline
        conversions fed qualified outcomes back to Google and Meta.
      </figcaption>
    </figure>
  );
}
