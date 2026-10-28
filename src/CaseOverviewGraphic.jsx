import React from "react";

function Comparison({ label, before, after, max }) {
  return (
    <div className="overview-comparison">
      <h3>{label}</h3>
      {[
        ["Before", before],
        ["After", after],
      ].map(([name, value]) => (
        <div className="overview-bar" key={name}>
          <span>{name}</span>
          <div className="overview-track" aria-hidden="true">
            <i
              className={name === "Before" ? "baseline" : ""}
              style={{ width: `${(value / max) * 100}%` }}
            />
          </div>
          <strong>{value}</strong>
        </div>
      ))}
    </div>
  );
}

export default function CaseOverviewGraphic({ id }) {
  if (id === "university")
    return (
      <figure className="overview-figure">
        <h3>From enquiry to enrolment</h3>
        <ol className="admissions-funnel">
          {[
            ["Meta leads", 821],
            ["CRM-qualified leads", 430],
            ["Fee-paid enrolments", 312],
          ].map(([label, value]) => (
            <li key={label}>
              <div>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
              <div className="funnel-track" aria-hidden="true">
                <i style={{ width: `${(value / 821) * 100}%` }} />
              </div>
            </li>
          ))}
        </ol>
        <figcaption>
          May–Aug 2026 · All three campaigns. Widths show the share of the
          original 821 leads at each stage.
        </figcaption>
      </figure>
    );
  if (id === "panasia")
    return (
      <figure className="overview-figure">
        <h3>US$25,000, allocated around lead quality</h3>
        <div
          className="budget-share"
          aria-label="Media budget allocation: Meta 60 percent, Google Ads 40 percent"
        >
          <span>60%</span>
          <span>40%</span>
        </div>
        <div className="budget-labels">
          <p>
            <i aria-hidden="true" />
            Meta<strong>US$15,000</strong>
          </p>
          <p>
            <i aria-hidden="true" />
            Google Ads<strong>US$10,000</strong>
          </p>
        </div>
        <figcaption>
          259 funded loans from US$25,000 in media spend = US$96.53 per funded
          loan, rounded to US$97.
        </figcaption>
      </figure>
    );
  return (
    <figure className={`overview-figure overview-${id}`}>
      <div className="overview-legend">
        <span>
          <i className="baseline" />
          Before
        </span>
        <span>
          <i />
          After
        </span>
      </div>
      {id === "aegon" ? (
        <>
          <Comparison label="Cost per lead" before={100} after={87} max={118} />
          <Comparison
            label="Completed applications"
            before={100}
            after={118}
            max={118}
          />
        </>
      ) : id === "petmart" ? (
        <>
          <Comparison
            label="Paid-attributed sales"
            before={100}
            after={140}
            max={140}
          />
          <Comparison
            label="Subscriptions"
            before={100}
            after={130}
            max={140}
          />
        </>
      ) : (
        <>
          <Comparison
            label="CRM-qualified leads"
            before={100}
            after={120}
            max={120}
          />
          <div className="dats-channel-share">
            <h3>A new source of intent</h3>
            <div
              className="dats-share-bar"
              aria-label="Share of 212 leads in the second quarter: Microsoft Advertising 40%, Google Ads and Meta 60%"
            >
              <span>40%</span>
              <span>60%</span>
            </div>
            <div className="dats-share-labels">
              <span>Microsoft Advertising</span>
              <span>Google Ads &amp; Meta</span>
            </div>
          </div>
        </>
      )}
      <figcaption>
        {id === "aegon"
          ? "Google & Meta · H1 2026 · Unchanged spend. "
          : id === "petmart"
            ? "Client-reported changes · Apr–Jun 2023. "
            : "Unchanged monthly media spend. "}
        Each before-and-after measure starts at an index of 100. These are
        relative changes, not raw counts or currency.
        {id === "dats" &&
          " The channel split describes 212 leads in the engagement’s second quarter. It is a separate measure from the qualified-lead increase."}
      </figcaption>
    </figure>
  );
}
