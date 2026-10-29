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
      <figure className="overview-figure priority-comparison">
        <h3>The places that needed filling</h3>
        <p className="visual-subtitle">
          Fee-paid enrolments in the same two priority colleges
        </p>
        <div className="priority-bars">
          {[
            ["Dedicated campaign", 125],
            ["Broad campaign", 17],
          ].map(([label, value]) => (
            <div className="priority-bar" key={label}>
              <div>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
              <div className="priority-track" aria-hidden="true">
                <i style={{ width: `${(value / 125) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="intake-total">
          <h3>Across all three campaigns</h3>
          <ol>
            {[
              ["Meta leads", "821"],
              ["CRM-qualified", "430"],
              ["Fee-paid enrolments", "312"],
            ].map(([label, value]) => (
              <li key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </li>
            ))}
          </ol>
        </div>
        <figcaption>
          May–Aug 2026. The 125 and 17 compare the same colleges; the 312 total
          includes enrolments across all three campaigns.
        </figcaption>
      </figure>
    );
  if (id === "panasia")
    return (
      <figure className="overview-figure bank-outcome-flow">
        <div className="bank-budget-heading">
          <h3>One budget. A clear business outcome.</h3>
          <p>
            <strong>US$25,000</strong>
            <span>Total media spend</span>
          </p>
        </div>
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
        <div className="bank-outcome-line">
          <span>Combined campaign outcome</span>
          <div>
            <p>
              <strong>259</strong>
              <span>Funded gold loans</span>
            </p>
            <span className="outcome-divider" aria-hidden="true" />{" "}
            <p>
              <strong>~US$97</strong>
              <span>Media cost per funded loan</span>
            </p>
          </div>
        </div>
        <figcaption>
          US$25,000 ÷ 259 = US$96.53 per funded loan. Channel bars show spend
          allocation, not funded loans by channel.
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
