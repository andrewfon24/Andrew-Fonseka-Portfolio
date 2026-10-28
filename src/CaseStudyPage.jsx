import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  FileCheck2,
  Users,
  GraduationCap,
  Clock3,
  CircleDollarSign,
  Target,
  ChartNoAxesCombined,
} from "lucide-react";
import { caseStories, universityCampaigns } from "./caseStories";
import { projects } from "./data";
import { caseBriefs } from "./caseBriefs";
import CaseOverviewGraphic from "./CaseOverviewGraphic";
import {
  ABMJourney,
  CampaignWorkflow,
  EnquiryWorkflow,
} from "./NarrativeVisuals";

function StatStrip({ stats }) {
  return (
    <div className="dialog-stats infographic-stats">
      {stats.map(([value, label]) => {
        const Icon = /enrol/i.test(label)
          ? GraduationCap
          : /time|response|period|year/i.test(label)
            ? Clock3
            : /spend|cost|budget|principal|ROAS|Sales/i.test(label)
              ? CircleDollarSign
              : /leads|accounts|subscriptions/i.test(label)
                ? Users
                : /quality/i.test(label)
                  ? Target
                  : ChartNoAxesCombined;
        return (
          <div key={label}>
            <Icon
              className="stat-symbol"
              aria-hidden="true"
              strokeWidth={1.4}
            />
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        );
      })}
    </div>
  );
}

function Bars({ rows, note }) {
  return (
    <figure className="case-bars">
      {rows.map(({ label, value, width, detail }) => (
        <div className="case-bar-row" key={label}>
          <div>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
          <div className="case-bar-track">
            <i style={{ width: `${width}%` }} />
          </div>
          {detail && <small>{detail}</small>}
        </div>
      ))}
      <figcaption>{note}</figcaption>
    </figure>
  );
}

function Workflow({ steps, label }) {
  return (
    <ol className="case-workflow" aria-label={label}>
      {steps.map(([title, body], i) => (
        <li key={title}>
          <span className="workflow-count">0{i + 1}</span>
          <h4>{title}</h4>
          <p>{body}</p>
          {i < steps.length - 1 && <ArrowRight aria-hidden="true" size={18} />}
        </li>
      ))}
    </ol>
  );
}

function UniversityDashboard() {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const all = selectedIndex === -1;
  const selected = all
    ? {
        leads: 821,
        enrolled: 312,
        rate: "38.0%",
        cpl: "US$7.61",
        cpe: "US$20.02",
      }
    : universityCampaigns[selectedIndex];
  return (
    <>
      <div className="dashboard-header">
        <div>
          <span className="case-kicker">ADMISSIONS PERFORMANCE</span>
          <h4>From enquiry to a fee-paid place.</h4>
        </div>
        <span>May–Aug 2026</span>
      </div>
      <div className="campaign-picker" aria-label="Choose campaign group">
        {["All campaigns", ...universityCampaigns.map((c) => c.name)].map(
          (name, i) => (
            <button
              key={name}
              aria-pressed={selectedIndex === i - 1}
              onClick={() => setSelectedIndex(i - 1)}
            >
              {name}
            </button>
          ),
        )}
      </div>
      <div aria-live="polite" className="dashboard-live">
        <div className="campaign-results">
          <div>
            <strong>{selected.leads}</strong>
            <span>Meta leads</span>
          </div>
          <ArrowRight aria-hidden="true" />
          <div>
            <strong>{selected.enrolled}</strong>
            <span>Fee-paid enrolments</span>
          </div>
          <div>
            <strong>{selected.rate}</strong>
            <span>Lead → enrolment</span>
          </div>
        </div>
        <Bars
          rows={
            all
              ? [
                  { label: "Meta leads", value: "821", width: 100 },
                  {
                    label: "CRM-qualified leads",
                    value: "430",
                    width: (430 / 821) * 100,
                  },
                  {
                    label: "Fee-paid enrolments",
                    value: "312",
                    width: (312 / 821) * 100,
                  },
                ]
              : [
                  {
                    label: "Meta leads",
                    value: String(selected.leads),
                    width: 100,
                  },
                  {
                    label: "Fee-paid enrolments",
                    value: String(selected.enrolled),
                    width: (selected.enrolled / selected.leads) * 100,
                  },
                ]
          }
          note="Funnel widths show the share of leads reaching each reported stage. Qualification is available for the all-campaign total."
        />
        <div className="campaign-costs">
          <span>
            Cost per lead <b>{selected.cpl}</b>
          </span>
          <span>
            Cost per enrolment <b>{selected.cpe}</b>
          </span>
        </div>
      </div>
      <div
        className="case-table-scroll"
        tabIndex={0}
        role="region"
        aria-label="Campaign comparison table, scroll horizontally"
      >
        <table className="case-table">
          <caption>Campaign comparison · reported figures</caption>
          <thead>
            <tr>
              <th scope="col">Campaign</th>
              <th scope="col">Leads</th>
              <th scope="col">Enrolled</th>
              <th scope="col">Conversion</th>
              <th scope="col">Cost / enrolment</th>
            </tr>
          </thead>
          <tbody>
            {universityCampaigns.map((c) => (
              <tr key={c.name}>
                <th scope="row">{c.name}</th>
                <td>{c.leads}</td>
                <td>{c.enrolled}</td>
                <td>{c.rate}</td>
                <td>{c.cpe}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figure className="case-source-image">
        <a
          href="/images/university-ads-results.png"
          target="_blank"
          rel="noreferrer"
          aria-label="Open original Meta Ads Manager screenshot"
        >
          <img
            src="/images/university-ads-results.png"
            alt="Anonymized Meta Ads Manager evidence for the three university campaigns, showing 821 leads and SAR 23,421.20 spend"
            loading="lazy"
          />
        </a>
        <figcaption>
          <FileCheck2 size={16} aria-hidden="true" /> Original Meta Ads Manager
          screenshot. Enrolments are from the admissions CRM.{" "}
          <a
            href="/images/university-ads-results.png"
            target="_blank"
            rel="noreferrer"
          >
            Inspect full size <ArrowUpRight size={14} />
          </a>
        </figcaption>
      </figure>
    </>
  );
}

function PetmartDashboard() {
  return (
    <>
      <div className="dashboard-header">
        <div>
          <span className="case-kicker">COMMERCE SNAPSHOT</span>
          <h4>A first order, and a reason to return.</h4>
        </div>
        <span>Apr–Jun 2023</span>
      </div>
      <div className="case-commerce">
        <div className="case-roas">
          <strong>4:1</strong>
          <span>First-order ROAS</span>
          <small>Google Shopping + Performance Max</small>
        </div>
        <Bars
          rows={[
            {
              label: "Paid-attributed sales",
              value: "+40%",
              width: 100,
              detail: "Client-reported change",
            },
            {
              label: "Subscriptions",
              value: "+30%",
              width: 75,
              detail: "Client-reported change",
            },
          ]}
          note="Bar lengths compare the two growth percentages. These are client-reported changes, not a causal attribution model."
        />
      </div>
      <Workflow
        label="Petmart acquisition strategy"
        steps={[
          ["Structure", "Restructured Google Shopping and Performance Max."],
          ["Support", "Complementary Meta campaigns in the acquisition mix."],
          [
            "Assess",
            "Read first-order return alongside sales and subscriptions.",
          ],
        ]}
      />
      <figure className="case-source-image petmart-evidence">
        <a
          href="/images/petmart-valentines.jpg"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="/images/petmart-valentines.jpg"
            alt="Petmart and Sugar Beach Pawfect Partner Valentine’s campaign creative with a golden retriever and dinner giveaway"
            loading="lazy"
          />
        </a>
        <figcaption>
          Creative example from my original portfolio. This Valentine’s campaign
          image illustrates the brand work; it does not substantiate the
          April–June performance figures.
        </figcaption>
      </figure>
    </>
  );
}

function BankDashboard() {
  const [channel, setChannel] = useState("Total budget");
  const selected =
    channel === "Meta"
      ? ["US$15,000", "60% of total media budget"]
      : channel === "Google Ads"
        ? ["US$10,000", "40% of total media budget"]
        : ["US$25,000", "Total media budget"];
  return (
    <>
      <div className="dashboard-header">
        <div>
          <span className="case-kicker">ALLOCATION & OUTCOME</span>
          <h4>Follow the quality signal.</h4>
        </div>
        <span>2023 · Kites Global</span>
      </div>
      <div className="case-bank">
        <div>
          <div className="bank-donut">
            <div>
              <strong>US$25K</strong>
              <span>media budget</span>
            </div>
          </div>
          <p className="case-chart-caption">
            Budget split: Meta 60% · Google Ads 40%
          </p>
        </div>
        <div>
          <div
            className="campaign-picker"
            aria-label="Inspect budget allocation"
          >
            {["Total budget", "Meta", "Google Ads"].map((name) => (
              <button
                key={name}
                aria-pressed={channel === name}
                onClick={() => setChannel(name)}
              >
                {name}
              </button>
            ))}
          </div>
          <div className="allocation-insight" aria-live="polite">
            <strong>{selected[0]}</strong>
            <span>{selected[1]}</span>
          </div>
          <p className="case-body">
            The split follows cost and lead quality. Budget amounts are
            calculated from the reported US$25,000 spend and 60/40 allocation.
          </p>
        </div>
      </div>
      <div className="case-calculation">
        <span>MEDIA COST PER FUNDED LOAN</span>
        <div>
          <b>US$25,000</b>
          <span>÷</span>
          <b>259 loans</b>
          <span>=</span>
          <strong>US$96.53</strong>
        </div>
        <small>Rounded to approximately US$97 per funded loan.</small>
      </div>
      <Workflow
        label="Lead quality to lending outcome"
        steps={[
          ["Compare", "Meta delivered higher-quality leads at a lower CPL."],
          ["Allocate", "60% Meta and 40% Google Ads on a fixed budget."],
          [
            "Evaluate",
            "259 client-reported funded loans; US$500K principal lent.",
          ],
        ]}
      />
      <p className="case-evidence-note">
        Results are from the supplied portfolio. Channel-level funded-loan
        counts and the bank’s internal dashboard were not supplied. Loan
        principal is not revenue or profit.
      </p>
    </>
  );
}

function DatsDashboard() {
  return (
    <>
      <div className="dashboard-header">
        <div>
          <span className="case-kicker">ACQUISITION + EXPERIENCE</span>
          <h4>More qualified leads. Same budget.</h4>
        </div>
        <span>Feb 2026–present</span>
      </div>
      <Bars
        rows={[
          {
            label: "Before the rebuild",
            value: "100",
            width: (100 / 120) * 100,
          },
          { label: "After the rebuild", value: "120", width: 100 },
        ]}
        note="CRM-qualified leads indexed to 100 before the rebuild. A 20% increase produces an index of 120. These are not raw lead counts."
      />
      <EnquiryWorkflow />
      <div className="case-two-insights">
        <div>
          <span>CHANNEL CONTRIBUTION</span>
          <strong>40%</strong>
          <p>
            of 212 leads came from Microsoft Advertising in my second quarter on
            the account.
          </p>
        </div>
        <div>
          <span>MONTHLY MEDIA BUDGET</span>
          <strong>~US$900</strong>
          <p>
            Media spend stayed unchanged while CRM-qualified leads increased.
            The acquisition strategy was judged on CRM-qualified outcomes.
          </p>
        </div>
      </div>
      <p className="case-evidence-note">
        Client-reported, before-and-after comparison at approximately US$900 per
        month. The channel share and qualified-lead improvement describe
        different measures. No controlled lift study or original CRM dashboard
        is available here.
      </p>
    </>
  );
}

function AegonDashboard() {
  const [system, setSystem] = useState("Conversion signals");
  const measurement = system === "Conversion signals";
  return (
    <>
      <div className="aegon-acquisition">
        <span className="case-kicker">GOOGLE & META · H1 2026</span>
        <h4>Acquisition outcomes at unchanged spend.</h4>
        <div className="case-result-pair">
          <div>
            <strong>−13%</strong>
            <span>cost per lead</span>
          </div>
          <div>
            <strong>+18%</strong>
            <span>completed applications</span>
          </div>
        </div>
        <Bars
          rows={[
            {
              label: "Cost per lead · before",
              value: "100",
              width: 100 / 1.18,
            },
            { label: "Cost per lead · after", value: "87", width: 87 / 1.18 },
            {
              label: "Completed applications · before",
              value: "100",
              width: 100 / 1.18,
            },
            {
              label: "Completed applications · after",
              value: "118",
              width: 100,
            },
          ]}
          note="Each measure is indexed to its own baseline of 100. These are relative comparisons, not costs or application counts. They describe Google and Meta acquisition, separately from LinkedIn ABM."
        />
      </div>
      <div className="dashboard-header">
        <div>
          <span className="case-kicker">MEASUREMENT & OPERATIONS</span>
          <h4>Make the signal useful. Make the work repeatable.</h4>
        </div>
      </div>
      <div className="campaign-picker" aria-label="Explore Aegon systems">
        {["Conversion signals", "Campaign operations"].map((name) => (
          <button
            key={name}
            aria-pressed={system === name}
            onClick={() => setSystem(name)}
          >
            {name}
          </button>
        ))}
      </div>
      <div className="aegon-system" aria-live="polite">
        {measurement ? (
          <Workflow
            label="Conversion signals"
            steps={[
              [
                "Capture",
                "GA4, server-side Google Tag Manager, Enhanced Conversions and Meta CAPI.",
              ],
              [
                "Validate",
                "Remove duplicate events and connect HubSpot offline conversion outcomes.",
              ],
              [
                "Optimize",
                "Use qualified leads, booked calls and applications to inform bidding.",
              ],
            ]}
          />
        ) : (
          <CampaignWorkflow />
        )}
        <div className="case-system-outcome">
          <Check size={22} aria-hidden="true" />
          <div>
            <strong>{measurement ? "6.5 → 8.0" : "−60%"}</strong>
            <span>
              {measurement
                ? "Meta Event Match Quality · before → after, on a 0–10 scale"
                : "Compliance review time · approximately 12 working days saved annually"}
            </span>
          </div>
        </div>
        {measurement && (
          <Bars
            rows={[
              { label: "Before", value: "6.5 / 10", width: 65 },
              { label: "After", value: "8.0 / 10", width: 80 },
            ]}
            note="Meta Event Match Quality scores on the same 0–10 scale. Scores are shown directly, not as a percentage increase."
          />
        )}
        {!measurement && (
          <Bars
            rows={[
              {
                label: "Compliance review time · before",
                value: "100",
                width: 100,
              },
              {
                label: "Compliance review time · after",
                value: "40",
                width: 40,
              },
            ]}
            note="Review time indexed to 100 before the builder. A reported 60% reduction gives an index of 40 afterward. These are not hours or days."
          />
        )}
      </div>
      <p className="case-evidence-note">
        Process diagrams illustrate the implemented workflows. Internal
        dashboards and absolute performance figures are confidential.
      </p>
    </>
  );
}

function LinkedInStory() {
  return (
    <section
      className="case-briefing"
      id="linkedin-abm"
      aria-labelledby="abm-title"
    >
      <h2 id="abm-title">Inside the LinkedIn investor program.</h2>
      <p>
        I owned the strategy and execution of a high-net-worth investor program
        across the US and Canada in H1 2026. I organized custom priority
        audiences in Google Sheets using job titles, seniority, company
        attributes and account lists. Matched Audiences, Thought Leader Ads and
        carousel creative were the main formats.
      </p>
      <p>
        I used forecasting and a visual presentation to explain the audience
        strategy and recommended campaign mix before launch.
      </p>
      <p>
        I integrated HubSpot with LinkedIn Campaign Manager so I could examine
        qualified enquiries alongside campaign activity. One US region was
        producing fewer qualified enquiries than other regions. I used that
        evidence to revise targeting and reallocate budget toward the stronger
        regions.
      </p>
      <p>
        The customer journey continued through an adviser meeting, document
        exchange and account funding. HubSpot supported revenue-attribution
        analysis of LinkedIn’s influence within that journey. Campaign results,
        targets, budget and performance metrics remain confidential.
      </p>
      <ABMJourney />
    </section>
  );
}

const dashboards = {
  university: UniversityDashboard,
  petmart: PetmartDashboard,
  panasia: BankDashboard,
  dats: DatsDashboard,
  aegon: AegonDashboard,
};

export default function CaseStudyPage({ project }) {
  const story = caseStories[project.id];
  const brief = caseBriefs[project.id];
  const Dashboard = dashboards[project.id];
  const order = ["aegon", "university", "panasia", "petmart", "dats"];
  const next = projects.find(
    (p) => p.id === order[(order.indexOf(project.id) + 1) % order.length],
  );
  useEffect(() => {
    const revealHash = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      const target = document.getElementById(id);
      if (!target) return;
      let parent = target.parentElement;
      while (parent) {
        if (parent.tagName === "DETAILS") parent.open = true;
        parent = parent.parentElement;
      }
      if (id === "linkedin-abm") target.scrollIntoView();
    };
    revealHash();
    window.addEventListener("hashchange", revealHash);
    return () => window.removeEventListener("hashchange", revealHash);
  }, [project.id]);
  return (
    <main id="main" className="case-page case-story-dialog compact-case">
      <article className="dialog-content" aria-labelledby="case-title">
        <a className="text-link case-back" href="/#work">
          <ArrowRight size={16} className="back-arrow" aria-hidden="true" />{" "}
          Selected work
        </a>
        <header className="case-summary">
          <p className="case-client">{project.client}</p>
          <h1 id="case-title">{project.title}</h1>
          <p className="case-period">
            {project.context} · {project.period}
          </p>
          <p className="case-answer">{brief.result}</p>
          <StatStrip stats={brief.stats} />
          <p className="case-role-note">
            <strong>My role.</strong> {brief.role}
          </p>
        </header>
        <div className="compact-story">
          <section aria-labelledby="case-problem">
            <h2 id="case-problem">The problem</h2>
            <p>{brief.problem}</p>
          </section>
          <section aria-labelledby="case-action">
            <h2 id="case-action">What I did</h2>
            <ul className="compact-actions">
              {brief.actions.map((action) => (
                <li key={action}>{action}</li>
              ))}
            </ul>
          </section>
        </div>
        <section
          id="case-result"
          className="overview-results"
          aria-labelledby="result-title"
        >
          <h2 id="result-title">The result</h2>
          <CaseOverviewGraphic id={project.id} />
        </section>
        <aside className="measurement-caveat">
          <h2>How to read these results</h2>
          <p>{brief.caveat}</p>
        </aside>
        <details className="case-evidence-details" id="evidence-details">
          <summary>
            <span>Evidence & measurement details</span>
            <span className="disclosure-mark" aria-hidden="true">
              +
            </span>
          </summary>
          <div className="expanded-evidence">
            <p className="evidence-intro">
              Explore the supporting figures, campaign decisions and measurement
              notes.
            </p>
            <section
              id="case-evidence"
              className="case-dashboard"
              aria-label={`${project.client} results dashboard`}
            >
              <Dashboard />
            </section>
            <div className="evidence-narrative">
              <h2>Inside the work</h2>
              {story.actions.map(([title, body]) => (
                <div key={title}>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              ))}
              {story.result.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {project.id === "aegon" && <LinkedInStory />}
            <div className="case-source">
              <h2>Sources & measurement</h2>
              <p>{project.note}</p>
            </div>
          </div>
        </details>
        <div className="case-next">
          <span>Next case study</span>
          <a
            href={`/case-studies/${next.id}/`}
            data-track="case_open"
            data-case={next.id}
          >
            {next.client} <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
        <a className="text-link case-return" href="/#work">
          Back to selected work <ArrowRight size={16} aria-hidden="true" />
        </a>
      </article>
    </main>
  );
}
