import React, { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Briefcase,
  Building2,
  ChartNoAxesCombined,
  Check,
  CircleCheck,
  Copy,
  Download,
  FileText,
  FlaskConical,
  GraduationCap,
  Layers,
  Lightbulb,
  Mail,
  MapPin,
  Menu,
  Phone,
  ScanLine,
  Search,
  Target,
  TrendingUp,
  Workflow,
  X,
  Zap,
} from "lucide-react";
import BrandIcon from "./BrandIcon";
import { experience, testimonials } from "./data";

export const EMAIL = "rafandrewf@gmail.com";
export const PHONE = "+1 778 681 9041";
const TEL = "tel:+17786819041";
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "Paid media role · Andrew Fonseka",
)}`;
const RESUME = "/documents/Andrew_Fonseka_Resume.pdf";
const PORTFOLIO = "/documents/Andrew_Fonseka_Portfolio.pdf";
const LINKEDIN = "https://www.linkedin.com/in/andrewfonseka/";

/* ---------- Motion helpers ---------- */

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window) || prefersReducedMotion()) {
      nodes.forEach((n) => n.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
}

// Counts a figure up once when it scrolls into view. The server renders the
// final value, so search engines, no-JS visitors and reduced-motion users
// always see the real number.
function Count({ value }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(value);
  useEffect(() => {
    const match = value.match(/^([^\d]*)([\d,]*\.?\d+)(.*)$/);
    const el = ref.current;
    if (!match || !el || prefersReducedMotion()) return;
    const [, pre, num, post] = match;
    const target = parseFloat(num.replace(/,/g, ""));
    const decimals = (num.split(".")[1] || "").length;
    const fmt = (n) =>
      `${pre}${n.toLocaleString("en-CA", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${post}`;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) return; // already visible
    setShown(fmt(0));
    let raf;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1300;
        const tick = (t) => {
          const p = Math.min(1, (t - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          setShown(p === 1 ? value : fmt(target * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);
  return (
    <span ref={ref}>
      <span aria-hidden="true">{shown}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}

function CopyEmail({ className = "icon-btn", where }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      const t = document.createElement("textarea");
      t.value = EMAIL;
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      t.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };
  return (
    <button
      type="button"
      className={`${className} copy-btn`}
      onClick={copy}
      data-copied={copied}
      data-track="copy_email"
      data-where={where}
    >
      {copied ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied" : "Copy email address"}
      </span>
      <span className="copy-toast" aria-hidden="true">
        Email copied
      </span>
    </button>
  );
}

function Eyebrow({ children }) {
  return <div className="eyebrow">{children}</div>;
}

/* ---------- Content ---------- */

const navItems = [
  ["work", "Results"],
  ["approach", "Approach"],
  ["references", "References"],
  ["about", "About"],
];

const metrics = [
  ["7-figure", "Annual budget co-managed", "Aegon · U.S. and Canada"],
  ["50 + ~100", "Business-unit ad accounts", "Owned · co-managed with the team"],
  ["6", "Markets", "CA · US · SA · LK · SG · MY"],
  ["3 yrs", "Hands-on paid media", "Agency · in-house · contract"],
];

const models = [
  [
    Building2,
    "01 / In-house",
    "Aegon",
    "Regulated financial services across U.S. and Canada. CRM-driven bidding.",
  ],
  [
    Briefcase,
    "02 / Contract",
    "7 clients since 2026",
    "Lead generation tied to client CRMs: education, local services, auto, hospitality.",
  ],
  [
    Layers,
    "03 / Agency",
    "Kites Global · Enfection",
    "Multi-client delivery: banking, retail, consumer brands. Sri Lanka, Singapore, Malaysia.",
  ],
];

const chapterIndex = [
  ["university", "University enrolments"],
  ["panasia", "Bank lending"],
  ["aegon", "CRM-connected bidding"],
  ["aegon-measurement", "Measurement & automation"],
  ["dats", "Trades education"],
];

function Beat({ icon: Icon, label, children, gold }) {
  return (
    <div className="beat">
      <span className={`beat-icon${gold ? " is-gold" : ""}`} aria-hidden="true">
        <Icon size={16} />
      </span>
      <div>
        <small>{label}</small>
        <p>{children}</p>
      </div>
    </div>
  );
}

function Kpi({ value, label, sub, dark }) {
  return (
    <div className={`kpi${dark ? " is-dark" : ""}`}>
      <strong>
        <Count value={value} />
      </strong>
      <span>{label}</span>
      {sub && <small>{sub}</small>}
    </div>
  );
}

function HBar({ label, value, detail, width, color, ghost }) {
  return (
    <div>
      <div className="hbar-head">
        <b>{label}</b>
        <span>
          {detail} {value && <strong>· {value}</strong>}
        </span>
      </div>
      <div className="hbar-track" aria-hidden="true">
        {ghost != null && (
          <i className="is-ghost" style={{ "--w": `${ghost}%` }} />
        )}
        <i style={{ "--w": `${width}%`, "--bar": color }} />
      </div>
    </div>
  );
}

function Chapter({ id, num, meta, client, title, beats, role, tags, panel, href }) {
  return (
    <article
      className="chapter"
      id={`case-${id}`}
      aria-labelledby={`case-${id}-title`}
      data-reveal
    >
      <div className="chapter-story">
        <div className="chapter-meta">
          <span className="chapter-num">{num}</span>
          {meta}
        </div>
        <h3 className="display-3" id={`case-${id}-title`}>
          {title}
        </h3>
        <p className="chapter-client">{client}</p>
        <div className="beats">{beats}</div>
        {role && (
          <p className="role-line">
            <b>My role.</b> {role}
          </p>
        )}
        <div className="chapter-foot">
          <div className="tags">
            {tags.map((t) => (
              <span className="tag" key={t}>
                {t}
              </span>
            ))}
          </div>
          <a
            className="case-link"
            href={href}
            data-track="case_open"
            data-case={id}
          >
            Read the case study <ArrowRight size={17} />
          </a>
        </div>
      </div>
      <div className="panel">{panel}</div>
    </article>
  );
}

function PanelBar({ left, right }) {
  return (
    <div className="panel-bar">
      <span>
        <i className="panel-dot" aria-hidden="true" />
        {left}
      </span>
      <span>{right}</span>
    </div>
  );
}

/* ---------- Page ---------- */

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("");
  const [dock, setDock] = useState(false);
  useReveal();

  useEffect(() => {
    const spy = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-35% 0px -60% 0px" },
    );
    navItems.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) spy.observe(el);
    });
    const hero = document.getElementById("top");
    const contact = document.getElementById("contact");
    let heroOut = false;
    let contactIn = false;
    const dockIo = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.target === hero) heroOut = !e.isIntersecting;
        if (e.target === contact) contactIn = e.isIntersecting;
      });
      setDock(heroOut && !contactIn);
    });
    hero && dockIo.observe(hero);
    contact && dockIo.observe(contact);
    return () => {
      spy.disconnect();
      dockIo.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e) => e.key === "Escape" && setMenu(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menu]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="header">
        <div className="container header-inner">
          <a href="/" className="brand">
            <span className="monogram" aria-hidden="true">
              AF
            </span>
            <span className="brand-name">
              Andrew Fonseka<span className="brand-dot">.</span>
            </span>
          </a>
          <nav
            id="site-nav"
            className={`nav${menu ? " is-open" : ""}`}
            aria-label="Main navigation"
          >
            {navItems.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={active === id ? "true" : undefined}
                onClick={() => setMenu(false)}
              >
                {label}
              </a>
            ))}
            <a
              className="mobile-only"
              href={RESUME}
              download
              data-track="resume_download"
              data-where="menu"
            >
              Download résumé
            </a>
          </nav>
          <div className="header-actions">
            <a
              className="btn btn-resume"
              href={RESUME}
              download
              data-track="resume_download"
              data-where="header"
            >
              Résumé <Download size={16} />
            </a>
            <a
              className="btn btn-primary btn-sm"
              href={MAILTO}
              data-track="email_click"
              data-where="header"
            >
              Email me <Mail size={16} />
            </a>
          </div>
          <button
            className="menu-toggle"
            aria-label={menu ? "Close navigation" : "Open navigation"}
            aria-expanded={menu}
            aria-controls="site-nav"
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main id="main">
        {/* ---------- Hero ---------- */}
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="container hero-grid">
            <div data-reveal>
              <Eyebrow>Paid Media Specialist · Greater Vancouver</Eyebrow>
              <h1 className="display-1" id="hero-title">
                Paid media judged on customers, <span>not clicks.</span>
              </h1>
              <p className="hero-lead">
                I connect ad platforms to the CRM, so budget follows{" "}
                <b>qualified leads, enrolments and funded accounts.</b>
              </p>
              <ul className="platforms" aria-label="Platforms">
                {[
                  ["Google Ads", "Google Ads"],
                  ["Meta Ads", "Meta"],
                  ["LinkedIn Ads", "LinkedIn"],
                  ["Microsoft Advertising", "Microsoft Ads"],
                  ["GA4", "GA4 · server-side GTM"],
                ].map(([tool, label]) => (
                  <li className="platform" key={label}>
                    <BrandIcon tool={tool} />
                    {label}
                  </li>
                ))}
              </ul>
              <div className="hero-actions">
                <a
                  className="btn btn-primary"
                  href={MAILTO}
                  data-track="email_click"
                  data-where="hero"
                >
                  Email me <Mail size={17} />
                </a>
                <CopyEmail where="hero" />
                <a
                  className="btn btn-secondary"
                  href="#work"
                  data-track="explore_results"
                >
                  See the results <ArrowDown size={17} />
                </a>
              </div>
              <p className="hero-note">
                <MapPin size={14} aria-hidden="true" />
                Authorized to work in Canada · MBA · References on request
              </p>
            </div>

            <div className="hero-visual">
              <div className="portrait" data-reveal>
                <img
                  src="/images/andrew-fonseka-480.webp"
                  srcSet="/images/andrew-fonseka-240.webp 240w, /images/andrew-fonseka-480.webp 480w"
                  sizes="(max-width: 640px) 280px, 420px"
                  alt="Andrew Fonseka, Paid Media Specialist"
                  fetchPriority="high"
                  width="480"
                  height="600"
                />
              </div>
              <div className="float-card float-pipeline" data-reveal>
                <span className="float-label">Aegon · H1 2026</span>
                <div className="kpi-pair" style={{ marginTop: 10 }}>
                  <div>
                    <strong>−13%</strong>
                    <span>cost per lead</span>
                  </div>
                  <div>
                    <strong className="is-blue">+18%</strong>
                    <span>completed applications</span>
                  </div>
                  <div>
                    <strong>0%</strong>
                    <span>change in spend</span>
                  </div>
                </div>
              </div>
              <div className="float-card float-enrol" data-reveal>
                <span className="float-label">University · 2026</span>
                <span className="float-figure">312</span>
                <span className="float-sub">fee-paid enrolments · ~US$20 each</span>
                <div className="mini-funnel" aria-hidden="true">
                  <div>
                    <i style={{ "--w": "100%", "--bar": "#c7dbef" }} />
                    <b>821</b>
                  </div>
                  <div>
                    <i style={{ "--w": "52%", "--bar": "#8fbbe6" }} />
                    <b>430</b>
                  </div>
                  <div>
                    <i style={{ "--w": "38%" }} />
                    <b>312</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Metric band ---------- */}
        <section className="ground-navy" aria-label="At a glance">
          <div className="container metric-row" data-reveal>
            {metrics.map(([value, label, sub]) => (
              <div className="metric" key={label}>
                <strong>
                  <Count value={value} />
                </strong>
                <span>{label}</span>
                <small>{sub}</small>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- Work ---------- */}
        <section className="section" id="work" aria-labelledby="work-title">
          <div className="container">
            <div className="section-head" data-reveal>
              <div>
                <Eyebrow>Results · Selected work</Eyebrow>
                <h2 className="display-2" id="work-title">
                  Three operating models. <span>One scoreboard.</span>
                </h2>
              </div>
              <p>
                Agency, in-house and contract. Every result is measured past
                the form fill.
              </p>
            </div>

            <ul className="models" data-reveal>
              {models.map(([Icon, kicker, name, body]) => (
                <li className="model" key={kicker}>
                  <span className="model-icon" aria-hidden="true">
                    <Icon size={18} />
                  </span>
                  <small>{kicker}</small>
                  <b>{name}</b>
                  <p>{body}</p>
                </li>
              ))}
            </ul>

            <nav className="chapter-index" aria-label="Case studies on this page" data-reveal>
              <span>In this section</span>
              {chapterIndex.map(([id, label], i) => (
                <a href={`#case-${id}`} key={id}>
                  <b>0{i + 1}</b> {label}
                </a>
              ))}
            </nav>

            <div className="chapters">
              {/* 01 University */}
              <Chapter
                id="university"
                num="01"
                meta="Contract via partner agency · Saudi Arabia · May – Aug 2026"
                client="Private university"
                title={
                  <>
                    Optimize for enrolments, <span>not form fills.</span>
                  </>
                }
                href="/case-studies/university/"
                tags={["Meta lead forms", "CRM-matched enrolments", "A/B creative"]}
                role="The partner agency brought the client. I ran strategy, build, creative testing, optimization and CRM reporting end to end."
                beats={
                  <>
                    <Beat icon={Search} label="Problem">
                      Two low-intake colleges got only 17 enrolments from the
                      broad campaign.
                    </Beat>
                    <Beat icon={Target} label="Decision">
                      A dedicated campaign: higher-intent lead form, own
                      budget, tighter targeting.
                    </Beat>
                    <Beat icon={Lightbulb} label="Learning" gold>
                      The cheapest lead is rarely the one that enrols.
                    </Beat>
                  </>
                }
                panel={
                  <>
                    <PanelBar left="Meta · CRM matched" right="1 May – 31 Aug 2026" />
                    <div className="kpis">
                      <Kpi value="312" label="Fee-paid enrolments" sub="Matched on name, phone, student ID" dark />
                      <Kpi value="~US$20" label="Per enrolment" sub="~US$6.2K total spend" dark />
                    </div>
                    <div className="viz">
                      <p className="viz-title">Lead → enrolment funnel</p>
                      <div className="hbars">
                        <HBar label="Meta leads" detail="821" width={100} color="#c7dbef" />
                        <HBar label="CRM-qualified" detail="430" width={52.4} color="#8fbbe6" />
                        <HBar label="Fee-paid enrolments" detail="312" value="38.0%" width={38} />
                      </div>
                    </div>
                    <div className="viz">
                      <p className="viz-title">Leads → enrolments by campaign</p>
                      <div className="hbars">
                        <HBar label="Priority colleges" detail="125 of 161" value="77.6%" width={77.6} />
                        <HBar label="Retargeting" detail="20 of 57" value="35.1%" width={35.1} color="#5f97cf" />
                        <HBar label="Broad undergraduate" detail="167 of 603" value="27.7%" width={27.7} color="#5f97cf" />
                      </div>
                      <p className="viz-note">
                        Enrolments matched in the university CRM and
                        deduplicated. Institution identifiers removed.
                      </p>
                    </div>
                  </>
                }
              />

              {/* 02 Pan Asia */}
              <Chapter
                id="panasia"
                num="02"
                meta="Kites Global · Sri Lanka · 2023"
                client="Pan Asia Bank"
                title={
                  <>
                    Follow the leads <span>that become loans.</span>
                  </>
                }
                href="/case-studies/panasia/"
                tags={["Meta Ads", "Google Ads", "Budget allocation"]}
                beats={
                  <>
                    <Beat icon={Search} label="Problem">
                      Win borrowers in a competitive gold-loan market on a fixed
                      budget.
                    </Beat>
                    <Beat icon={Target} label="Decision">
                      Meta produced better leads for less. Split 60 / 40 and
                      judge on funded loans.
                    </Beat>
                    <Beat icon={Lightbulb} label="Learning" gold>
                      A low CPL means little until the lead becomes a loan.
                    </Beat>
                  </>
                }
                panel={
                  <>
                    <PanelBar left="Client-reported outcomes" right="2023" />
                    <div className="kpis">
                      <Kpi value="259" label="Funded gold loans" dark />
                      <Kpi value="~US$97" label="Media cost per funded loan" dark />
                      <Kpi value="US$25K" label="Media spend" />
                      <Kpi value="US$500K" label="Loan principal lent" sub="Client-reported" />
                    </div>
                    <div className="viz">
                      <p className="viz-title">Budget split, judged on funded loans</p>
                      <div className="split" role="img" aria-label="Budget split: 60% Meta, 40% Google Ads">
                        <div className="meta">Meta · 60%</div>
                        <div className="google">Google · 40%</div>
                      </div>
                      <div className="equation" aria-label="US$25K media divided by 259 funded loans equals about US$97 per loan">
                        <div>
                          <strong>US$25K</strong>
                          <span>media</span>
                        </div>
                        <em aria-hidden="true">÷</em>
                        <div>
                          <strong>259</strong>
                          <span>funded loans</span>
                        </div>
                        <em aria-hidden="true">=</em>
                        <div>
                          <strong>~US$97</strong>
                          <span>per loan</span>
                        </div>
                      </div>
                      <p className="viz-note">
                        Loan principal is not bank revenue, so the ratio is not
                        ROAS.
                      </p>
                    </div>
                  </>
                }
              />

              {/* 03 Aegon bidding */}
              <Chapter
                id="aegon"
                num="03"
                meta="In-house · Financial services · H1 2026"
                client="Aegon · U.S. and Canada"
                title={
                  <>
                    Bid on pipeline, <span>not form fills.</span>
                  </>
                }
                href="/case-studies/aegon/"
                tags={["Google Ads", "Meta", "HubSpot offline conversions"]}
                beats={
                  <>
                    <Beat icon={Search} label="Problem">
                      Smart Bidding and Meta optimized to form fills, not
                      qualified applicants.
                    </Beat>
                    <Beat icon={Target} label="Decision">
                      Fed HubSpot stages back as offline conversions, then
                      restructured and reallocated.
                    </Beat>
                    <Beat icon={Lightbulb} label="Learning" gold>
                      Bidding gets smarter when the algorithm sees what sales
                      sees.
                    </Beat>
                  </>
                }
                panel={
                  <>
                    <PanelBar left="Relative change" right="H1 2026" />
                    <div className="kpis is-3">
                      <Kpi value="−13%" label="Cost per lead" dark />
                      <Kpi value="+18%" label="Completed applications" dark />
                      <Kpi value="0%" label="Change in media spend" />
                    </div>
                    <div className="viz">
                      <p className="viz-title">Optimization point moved down the funnel</p>
                      <ol className="stages" aria-label="Funnel stages: ad click, form fill, qualified lead, booked call, application">
                        <li className="stage">Ad click</li>
                        <li className="stage">Form fill</li>
                        <li className="stage s3">Qualified lead</li>
                        <li className="stage s4">Booked call</li>
                        <li className="stage s5">Application</li>
                      </ol>
                      <div className="stage-markers" aria-hidden="true">
                        <span className="before">Before</span>
                        <span className="after">Now: bidding on these</span>
                      </div>
                      <p className="viz-note">
                        Absolute budgets and results are confidential.
                      </p>
                    </div>
                  </>
                }
              />

              {/* 04 Aegon measurement */}
              <Chapter
                id="aegon-measurement"
                num="04"
                meta="In-house · Measurement & operations"
                client="Aegon · 50 owned + ~100 co-managed ad accounts"
                title={
                  <>
                    Trust the data. <span>Then automate.</span>
                  </>
                }
                href="/case-studies/aegon/"
                tags={["GA4", "Server-side GTM", "Meta CAPI", "Apps Script"]}
                role="I also supervise two agency partners and report biweekly to the CMO."
                beats={
                  <>
                    <Beat icon={Search} label="Problem">
                      Overlapping GTM tags were double-counting conversions.
                    </Beat>
                    <Beat icon={Target} label="Decision">
                      Rebuilt on GA4, server-side GTM, Enhanced Conversions and
                      CAPI. Then automated QA.
                    </Beat>
                    <Beat icon={Lightbulb} label="Outcome" gold>
                      Clean data reset CPA decisions and brought one agency’s
                      work in-house.
                    </Beat>
                  </>
                }
                panel={
                  <>
                    <PanelBar left="Measurement · operations" right="2025 – 2026" />
                    <div className="kpis">
                      <Kpi value="+25%" label="Meta Event Match Quality" dark />
                      <Kpi value="5-figure" label="Annual wasted spend cut" dark />
                      <Kpi value="−60%" label="Compliance review time" />
                      <Kpi value="~12 days" label="Working time saved / year" />
                    </div>
                    <div className="viz">
                      <p className="viz-title">Apps Script campaign builder, adopted team-wide</p>
                      <ol className="chain">
                        <li>
                          <FileText size={16} aria-hidden="true" />
                          Campaign inputs
                        </li>
                        <li>
                          <Zap size={16} aria-hidden="true" />
                          Apps Script builder
                        </li>
                        <li>
                          <ScanLine size={16} aria-hidden="true" />
                          Naming · UTM · QA
                        </li>
                        <li>
                          <CircleCheck size={16} aria-hidden="true" />
                          Approved launch
                        </li>
                      </ol>
                      <div className="hbars" style={{ marginTop: 16 }}>
                        <HBar label="Compliance review time · before" detail="Index 100" width={100} color="#c7dbef" />
                        <HBar label="After the builder" detail="Index 40" value="−60%" width={40} />
                      </div>
                    </div>
                  </>
                }
              />

              {/* 05 DATS */}
              <Chapter
                id="dats"
                num="05"
                meta="Contract · Trades education · 2026"
                client="DIMO Academy for Technical Studies"
                title={
                  <>
                    More qualified leads. <span>Same budget.</span>
                  </>
                }
                href="/case-studies/dats/"
                tags={["Google Ads", "Meta", "Microsoft Ads", "Dynamics 365"]}
                beats={
                  <>
                    <Beat icon={Search} label="Signal">
                      CRM-qualified leads in Dynamics 365 showed where the
                      funnel leaked.
                    </Beat>
                    <Beat icon={Target} label="Decision">
                      Rebuilt Google and Meta, added Microsoft Ads, launched a
                      24/7 AI enquiry assistant.
                    </Beat>
                    <Beat icon={Lightbulb} label="Learning" gold>
                      Fix the traffic and the conversion path before asking for
                      budget.
                    </Beat>
                  </>
                }
                panel={
                  <>
                    <PanelBar left="Client-supplied counts" right="~US$900 / month, unchanged" />
                    <div className="kpis">
                      <Kpi value="+20%" label="CRM-qualified leads" sub="At flat spend" dark />
                      <Kpi value="4×" label="Faster enquiry replies" sub="AI assistant vs. manual" dark />
                    </div>
                    <div className="viz">
                      <p className="viz-title">CRM-qualified leads · index (before = 100)</p>
                      <div className="columns">
                        <div className="col">
                          <b>100</b>
                          <i style={{ "--h": "105px" }} />
                        </div>
                        <div className="col">
                          <b>120</b>
                          <i style={{ "--h": "126px", "--bar": "var(--blue-bar)" }} />
                        </div>
                        <div className="col-aside">
                          <strong>
                            <Count value="40%" />
                          </strong>
                          <span>of 212 leads came from Microsoft Ads in the second quarter.</span>
                        </div>
                      </div>
                      <div className="col-labels" aria-hidden="true">
                        <span>Before</span>
                        <span>After</span>
                      </div>
                      <p className="viz-note">
                        Before-and-after comparison, not a controlled test.
                      </p>
                    </div>
                  </>
                }
              />
            </div>

            {/* Compact: Petmart */}
            <a
              className="compact"
              href="/case-studies/petmart/"
              data-track="case_open"
              data-case="petmart"
              data-reveal
            >
              <div>
                <span className="compact-label">
                  More work · Kites Global · E-commerce · 2023
                </span>
                <h3>Petmart.lk: First orders. Lasting customers.</h3>
                <p>
                  Restructured Google Shopping and Performance Max, with Meta
                  supporting acquisition.
                </p>
              </div>
              <div className="compact-stats">
                <div>
                  <strong>4:1</strong>
                  <span>first-order ROAS</span>
                </div>
                <div>
                  <strong>+40%</strong>
                  <span>paid-attributed sales</span>
                </div>
              </div>
              <span className="case-link">
                Read the case study <ArrowRight size={17} />
              </span>
            </a>

            <div className="inline-cta" data-reveal>
              <p>
                Want this thinking <span>on your accounts?</span>
                <small>One email is enough. I’ll take it from there.</small>
              </p>
              <div className="actions">
                <a
                  className="btn btn-on-dark"
                  href={MAILTO}
                  data-track="email_click"
                  data-where="mid"
                >
                  Email me <Mail size={17} />
                </a>
                <a
                  className="btn btn-ghost-dark"
                  href={PORTFOLIO}
                  download
                  data-track="portfolio_download"
                  data-where="mid"
                >
                  Portfolio PDF <Download size={17} />
                </a>
              </div>
            </div>

            <p className="work-footnote">
              <CircleCheck size={14} aria-hidden="true" /> Real campaigns.
              Source notes and attribution context inside every case study.
            </p>
          </div>
        </section>

        {/* ---------- Approach ---------- */}
        <section
          className="section ground-pale"
          id="approach"
          aria-labelledby="approach-title"
        >
          <div className="container">
            <div className="section-head" data-reveal>
              <div>
                <Eyebrow>How I work</Eyebrow>
                <h2 className="display-2" id="approach-title">
                  A better signal. <span>A better decision.</span>
                </h2>
              </div>
              <p>The same five steps on every account, agency or in-house.</p>
            </div>
            <ol className="steps" data-reveal>
              {[
                [ScanLine, "Find the constraint", "Audit tracking, search terms, creative, landing pages and CRM quality."],
                [Target, "Define the outcome", "Agree the business result. Build the channel mix around it."],
                [FlaskConical, "Test what matters", "Prioritized experiments with success criteria set up front."],
                [TrendingUp, "Scale on evidence", "Report outcomes. Move budget to what works."],
                [Workflow, "Systemize", "Document results. Automate the repeatable."],
              ].map(([Icon, title, body], i) => (
                <li className="step" key={title}>
                  <span className="step-icon" aria-hidden="true">
                    <Icon size={18} />
                  </span>
                  <small>0{i + 1}</small>
                  <b>{title}</b>
                  <span>{body}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------- References ---------- */}
        <section
          className="section ground-navy"
          id="references"
          aria-labelledby="references-title"
        >
          <div className="container">
            <div className="section-head" data-reveal>
              <div>
                <Eyebrow>References</Eyebrow>
                <h2 className="display-2" id="references-title">
                  What colleagues say <span>about the work.</span>
                </h2>
              </div>
              <p>Verbatim, from my agency years. More references on request.</p>
            </div>
            <div className="quotes" data-reveal>
              {testimonials.map((q) => (
                <figure className="quote" key={q.name}>
                  <span className="quote-mark" aria-hidden="true">
                    “
                  </span>
                  <blockquote>{q.quote}</blockquote>
                  <figcaption className="quote-person">
                    <span className="quote-initials" aria-hidden="true">
                      {q.initials}
                    </span>
                    <span>
                      <b>{q.name}</b>
                      <small>{q.role}</small>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="quote-source">
              Verbatim LinkedIn recommendations ·{" "}
              <a
                href="https://www.linkedin.com/in/andrewfonseka/details/recommendations/"
                target="_blank"
                rel="noreferrer"
                data-track="linkedin_click"
                data-where="references"
              >
                Read them on LinkedIn
              </a>
            </p>
          </div>
        </section>

        {/* ---------- About & journey ---------- */}
        <section
          className="section ground-pale"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="container about-grid">
            <div className="about-copy" data-reveal>
              <Eyebrow>The person behind the work</Eyebrow>
              <h2 className="display-2" id="about-title">
                From Colombo to Vancouver. <span>Still asking better questions.</span>
              </h2>
              <p>
                I started in Colombo’s agency teams, moved to Vancouver for my
                MBA, and now run paid media in-house at Aegon alongside
                contract clients. I like the whole chain: the campaign idea,
                the tracking behind it and the CRM result at the end.
              </p>
              <ul className="facts">
                <li className="fact">
                  <MapPin size={17} aria-hidden="true" /> Greater Vancouver, BC
                </li>
                <li className="fact">
                  <CircleCheck size={17} aria-hidden="true" /> Authorized to work in Canada
                </li>
                <li className="fact">
                  <GraduationCap size={17} aria-hidden="true" /> MBA · GPA 4.00 / 4.33
                </li>
                <li className="fact">
                  <ChartNoAxesCombined size={17} aria-hidden="true" /> 6 markets, 3 operating models
                </li>
              </ul>
            </div>
            <div data-reveal>
              <div className="journey-label">
                <span>The journey so far</span>
                <span>2019 – now</span>
              </div>
              <ol className="journey">
                {experience.map((e) => (
                  <li key={e.company}>
                    <h3>{e.company}</h3>
                    <span className="date">{e.date}</span>
                    <span className="role">{e.role}</span>
                    <span className="badge">{e.type}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ---------- Stack ---------- */}
        <section className="section" id="toolkit" aria-labelledby="toolkit-title">
          <div className="container">
            <div className="section-head" data-reveal>
              <div>
                <Eyebrow>Stack & credentials</Eyebrow>
                <h2 className="display-2" id="toolkit-title">
                  The tools behind <span>the outcomes.</span>
                </h2>
              </div>
              <p>Hands-on across the platforms, signals and systems.</p>
            </div>
            <div className="stack" data-reveal>
              {[
                [Target, "Paid media", ["Google Ads", "Microsoft Advertising", "Meta Ads", "LinkedIn Ads", "TikTok Ads"], ["Performance Max", "Demand Gen", "Shopping"]],
                [ChartNoAxesCombined, "Measurement", ["GA4", "Google Tag Manager", "Meta CAPI", "Enhanced Conversions", "Looker Studio"], ["Offline conversions", "Server-side GTM"]],
                [Workflow, "CRM & automation", ["HubSpot", "Dynamics 365", "Apps Script", "Google Ads scripts", "Zapier", "Supermetrics"], []],
              ].map(([Icon, name, tools, extras]) => (
                <div className="stack-group" key={name}>
                  <h3>
                    <Icon size={15} aria-hidden="true" /> {name}
                  </h3>
                  <ul className="chips">
                    {tools.map((t) => (
                      <li className="chip" key={t}>
                        <BrandIcon tool={t} />
                        {t}
                      </li>
                    ))}
                    {extras.map((t) => (
                      <li className="chip" key={t} style={{ paddingLeft: 12 }}>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="creds-head">
              <GraduationCap size={22} aria-hidden="true" /> Certifications
            </p>
            <ul className="creds" data-reveal>
              {[
                ["Google Ads Search", "Google · 2026", "google.com"],
                ["Google Ads Measurement", "Google · 2026", "google.com"],
                ["Meta Marketing Analytics", "Meta · Coursera", "meta.com"],
                ["Google AI Essentials", "Google", "google.com"],
                ["Data Analysis with Spreadsheets and SQL", "Professional development"],
                ["Email Marketing", "HubSpot", "hubspot.com"],
              ].map(([title, issuer, domain]) => (
                <li className="cred" key={title}>
                  <BrandIcon domain={domain} />
                  <span>
                    <b>{title}</b>
                    <small>{issuer}</small>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <Contact />
      <Footer />

      <div className={`dock${dock ? " is-visible" : ""}`} aria-hidden={!dock}>
        <a
          className="btn btn-primary"
          href={MAILTO}
          tabIndex={dock ? 0 : -1}
          data-track="email_click"
          data-where="dock"
        >
          Email me <Mail size={17} />
        </a>
        <a
          className="btn btn-secondary"
          href={TEL}
          tabIndex={dock ? 0 : -1}
          aria-label={`Call ${PHONE}`}
          data-track="call_click"
          data-where="dock"
        >
          <Phone size={17} />
        </a>
      </div>
    </>
  );
}

export function Contact() {
  return (
    <section
      className="contact ground-deep"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="container">
        <Eyebrow>Let’s talk</Eyebrow>
        <h2 className="display-1" id="contact-title">
          Let’s talk <span>paid media.</span>
        </h2>
        <p className="contact-sub">
          Paid search, paid social and measurement for teams accountable to
          business outcomes.
        </p>
        <a
          className="contact-email"
          href={MAILTO}
          data-track="email_click"
          data-where="contact-address"
        >
          {EMAIL}
        </a>
        <div className="contact-actions">
          <a
            className="btn btn-on-dark"
            href={MAILTO}
            data-track="email_click"
            data-where="contact"
          >
            Email me <Mail size={17} />
          </a>
          <CopyEmail where="contact" />
          <a
            className="btn btn-ghost-dark"
            href={TEL}
            data-track="call_click"
            data-where="contact"
          >
            <Phone size={17} /> {PHONE}
          </a>
        </div>
        <div className="contact-secondary">
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noreferrer"
            data-track="linkedin_click"
            data-where="contact"
          >
            Connect on LinkedIn <ArrowUpRight size={15} />
          </a>
          <a
            href={RESUME}
            download
            data-track="resume_download"
            data-where="contact"
          >
            Download résumé <Download size={15} />
          </a>
          <a
            href={PORTFOLIO}
            download
            data-track="portfolio_download"
            data-where="contact"
          >
            Portfolio PDF <Download size={15} />
          </a>
        </div>
        <p className="contact-where">
          Greater Vancouver, BC · Authorized to work in Canada · References
          available on request
        </p>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer ground-deep">
      <div className="container footer-inner">
        <small>© 2026 Andrew Fonseka</small>
        <span>Paid media · Measurement · CRM outcomes</span>
        <a href="#top">
          Back to top <ArrowUp size={13} />
        </a>
      </div>
    </footer>
  );
}
