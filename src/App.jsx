import React, { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  ArrowLeft,
  Download,
  MapPin,
  Menu,
  X,
  Target,
  ChartNoAxesCombined,
  Zap,
  Workflow,
  Check,
  ArrowUp,
  Plus,
  Minus,
  GraduationCap,
  CircleCheck,
  ScanLine,
} from "lucide-react";
import { projects, capabilities, experience, testimonials } from "./data";
import CaseStudyPage from "./CaseStudyPage";
import ContactSection from "./ContactSection";
import BrandIcon from "./BrandIcon";
import WorkCard from "./WorkCard";
import { Systems } from "./FeaturedSections";

const resume = "/documents/Andrew_Fonseka_Resume.pdf";
const icons = {
  target: Target,
  chart: ChartNoAxesCombined,
  zap: Zap,
  workflow: Workflow,
};

function Label({ children, light = false }) {
  return (
    <div className={`eyebrow ${light ? "light" : ""}`}>
      <span />
      {children}
    </div>
  );
}

const featuredWorkIds = ["university", "panasia", "aegon"];
const additionalWorkIds = ["petmart", "dats"];

export default function App({ projectId = null }) {
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState("All work");
  const caseProject = projects.find((p) => p.id === projectId);
  const [capability, setCapability] = useState(0);
  const [testimonial, setTestimonial] = useState(0);
  const [active, setActive] = useState("");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );
    document
      .querySelectorAll("section[id]")
      .forEach((el) => navObserver.observe(el));
    return () => {
      observer.disconnect();
      navObserver.disconnect();
    };
  }, []);
  useEffect(() => {
    if (!menu) return;
    const close = (e) => {
      if (e.key === "Escape") setMenu(false);
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [menu]);
  const current = capabilities[capability];
  const CapabilityIcon = icons[current.icon];
  const quote = testimonials[testimonial];
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="header">
        <div className="nav-shell">
          <a href="/" className="brand">
            <span className="brand-monogram">
              A<span>F</span>
            </span>
            <span>
              Andrew Fonseka<span className="brand-dot">.</span>
            </span>
          </a>
          <nav
            className={menu ? "navigation open" : "navigation"}
            aria-label="Main navigation"
            id="main-navigation"
          >
            {[
              ["approach", "Approach"],
              ["systems", "Systems"],
              ["work", "Results"],
              ["references", "References"],
              ["contact", "Contact"],
            ].map(([id, label]) => (
              <a
                className={active === id ? "active" : ""}
                key={id}
                href={`${caseProject && id !== "contact" ? "/" : ""}#${id}`}
                onClick={() => setMenu(false)}
              >
                {label}
              </a>
            ))}
            <a href={resume} download className="mobile-resume">
              Résumé <Download size={14} />
            </a>
          </nav>
          <a className="nav-contact" href={resume} download>
            Download résumé <Download size={15} />
          </a>
          <button
            className="menu-toggle icon-button"
            aria-label={menu ? "Close navigation" : "Open navigation"}
            aria-expanded={menu}
            aria-controls="main-navigation"
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      {caseProject ? (
        <CaseStudyPage project={caseProject} />
      ) : (
        <main id="main">
          <section className="hero container" aria-labelledby="hero-title">
            <div className="hero-copy">
              <div className="eyebrow">
                OPEN TO PAID MEDIA & PERFORMANCE MARKETING ROLES
              </div>
              <h1 id="hero-title">
                Paid media judged
                <br />
                on customers,
                <br />
                <span>not clicks.</span>
              </h1>
              <p className="hero-role">
                <span className="hero-role-name">Andrew Fonseka</span>
                <span className="hero-role-title">
                  Paid Media &amp; Performance Marketing Specialist
                </span>
              </p>
              <p className="hero-description">
                I connect media, measurement and the customer journey.
                <br className="desktop-break" /> The goal: qualified leads,
                enrolled students, funded loans
                <br className="desktop-break" /> and customers who come back.
              </p>
              <div className="hero-actions">
                <a className="button primary" href={resume} download>
                  Download résumé <Download size={17} />
                </a>
                <a className="button secondary" href="#work">
                  Explore the results <ArrowDown size={17} />
                </a>
              </div>
              <div className="hero-note">
                <MapPin size={14} />
                <span>
                  MBA · Greater Vancouver, BC · Authorized to work in Canada
                </span>
              </div>
            </div>
            <div className="hero-art">
              <div className="portrait-frame">
                <img
                  src="/images/andrew-fonseka.jpg"
                  alt="Andrew Fonseka, Paid Media and Performance Marketing Specialist"
                  fetchPriority="high"
                  width="1122"
                  height="1402"
                />
              </div>
            </div>
          </section>
          <div className="metric-band">
            <div className="container stats-strip">
              {[
                ["3+", "years in agency & in-house"],
                ["7-figure", "budget managed at Aegon"],
                ["50+", "business units managed at Aegon"],
                [
                  "6 markets",
                  "Singapore · Malaysia · Sri Lanka · Saudi Arabia · US · Canada",
                ],
              ].map(([value, label]) => (
                <div key={label}>
                  {value === "6 markets" && (
                    <small className="metric-prefix">Across</small>
                  )}
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <section className="approach-section section" id="approach">
            <div className="container">
              <div className="section-heading reveal">
                <div>
                  <Label>APPROACH</Label>
                  <h2>
                    Signal first.
                    <br />
                    <span>Budget follows evidence.</span>
                  </h2>
                </div>
                <p className="section-intro">
                  Good performance starts before the first ad.
                  <br /> Here’s how I connect strategy to execution.
                </p>
              </div>
              <div className="process-grid">
                {[
                  [
                    ScanLine,
                    "01",
                    "Audit the signal",
                    "Tracking, CRM fields, creative and search terms. Start with data you can trust.",
                    "WEEK 1",
                  ],
                  [
                    Target,
                    "02",
                    "Define the outcome",
                    "Agree the business goal. Build the channel mix and a focused test plan.",
                    "WEEKS 2–4",
                  ],
                  [
                    Zap,
                    "03",
                    "Test. Learn. Reallocate.",
                    "Test audiences, offers and creative. Let the evidence guide the next move.",
                    "MONTH 2 ON",
                  ],
                  [
                    ChartNoAxesCombined,
                    "04",
                    "Report what matters",
                    "Cost per customer, pipeline quality and a clear recommendation for what’s next.",
                    "EVERY MONTH",
                  ],
                ].map(([Icon, n, title, body, timing]) => (
                  <div className="process-card reveal" key={n}>
                    <div className="process-top">
                      <Icon size={25} />
                      <span>{n}</span>
                    </div>
                    <h3>{title}</h3>
                    <p>{body}</p>
                    <small>{timing}</small>
                  </div>
                ))}
              </div>
              <div className="approach-bottom">
                <span className="live-dot" />
                <span>The goal isn’t more data. It’s a better decision.</span>
              </div>
            </div>
          </section>

          <Systems />
          <section className="work-section section" id="work">
            <div className="container">
              <div className="section-heading reveal">
                <div>
                  <Label>RESULTS · SELECTED WORK</Label>
                  <h2>
                    The accounts.
                    <br />
                    <span>The decisions. The results.</span>
                  </h2>
                </div>
                <div className="section-intro">
                  <p>
                    Different industries. Different challenges.
                    <br /> One standard: a result that matters.
                  </p>
                </div>
              </div>
              <div className="filters" aria-label="Filter case studies">
                {[
                  "All work",
                  "Education",
                  "E-commerce",
                  "Financial services",
                ].map((name) => (
                  <button
                    key={name}
                    aria-pressed={filter === name}
                    onClick={() => setFilter(name)}
                  >
                    {name}
                    {name === "All work" && <span>05</span>}
                  </button>
                ))}
              </div>
              <div className="work-feature-list">
                {featuredWorkIds.map((id) => {
                  const p = projects.find((project) => project.id === id);
                  return (
                    (filter === "All work" || p.category === filter) && (
                      <WorkCard key={id} project={p} />
                    )
                  );
                })}
              </div>
              {additionalWorkIds.some(
                (id) =>
                  filter === "All work" ||
                  projects.find((p) => p.id === id).category === filter,
              ) && (
                <div className="work-more">
                  <div className="work-more-heading">
                    <h3>More work</h3>
                    <span>More ways I’ve put the approach to work.</span>
                  </div>
                  <div className="work-more-grid">
                    {additionalWorkIds.map((id) => {
                      const p = projects.find((project) => project.id === id);
                      return (
                        (filter === "All work" || p.category === filter) && (
                          <WorkCard key={id} project={p} compact />
                        )
                      );
                    })}
                  </div>
                </div>
              )}
              <p className="work-footnote">
                <CircleCheck size={14} /> Real campaigns. Source notes and
                attribution context inside every case study.
              </p>
            </div>
          </section>

          <section className="testimonials-section section" id="references">
            <div className="container testimonial-layout">
              <div>
                <Label light>REFERENCES</Label>
                <h2>
                  What colleagues say
                  <br />
                  <span>about the work.</span>
                </h2>
                <div className="quote-controls">
                  <button
                    className="icon-button"
                    aria-label="Previous recommendation"
                    onClick={() =>
                      setTestimonial(
                        (testimonial + testimonials.length - 1) %
                          testimonials.length,
                      )
                    }
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <span>0{testimonial + 1} / 02</span>
                  <button
                    className="icon-button"
                    aria-label="Next recommendation"
                    onClick={() =>
                      setTestimonial((testimonial + 1) % testimonials.length)
                    }
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
              <div className="quote-panel" aria-live="polite">
                <span className="quote-mark">“</span>
                <blockquote key={quote.name}>{quote.quote}</blockquote>
                <div className="quote-person">
                  <span>{quote.initials}</span>
                  <div>
                    <b>{quote.name}</b>
                    <small>{quote.role}</small>
                  </div>
                  <a
                    className="testimonial-linkedin"
                    href="https://www.linkedin.com/in/andrewfonseka/details/recommendations/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Read LinkedIn recommendations for Andrew, including ${quote.name}`}
                  >
                    <BrandIcon domain="linkedin.com" />
                  </a>
                </div>
                <p className="quote-source">Verbatim LinkedIn recommendation</p>
              </div>
            </div>
          </section>

          <section className="about-section section" id="about">
            <div className="container about-grid">
              <div className="about-copy reveal">
                <Label>THE PERSON BEHIND THE WORK</Label>
                <h2>
                  From Colombo to Vancouver.
                  <br />
                  Still asking better questions.
                </h2>
                <p>
                  I’m Andrew, and I love figuring out what makes a campaign
                  work. I started in Colombo’s agency teams after studying
                  Management &amp; Digital Innovation at the University of
                  London. Working with clients across banking, retail and
                  education got me excited about connecting marketing to real
                  business results.
                </p>
                <p>
                  That curiosity brought me to Vancouver for my MBA at
                  University Canada West. Today, I work in-house at Aegon across
                  US and Canadian accounts, while also supporting clients as an
                  independent paid media consultant. I enjoy getting involved in
                  the whole process, from the first campaign idea to the systems
                  and reporting behind it.
                </p>
                <p>
                  What keeps me excited is seeing the work make a difference: a
                  student enrolling, a lead becoming a customer, or a team
                  getting hours back in their week. I’m always keen to learn,
                  ask better questions and find the next thing we can improve.
                </p>
                <div className="about-location">
                  <MapPin size={17} />
                  <span>
                    Greater Vancouver, BC
                    <br />
                    <small>
                      Authorized to work in Canada · No sponsorship required
                    </small>
                  </span>
                </div>
                <a className="text-link" href={resume} download>
                  The full story, in my résumé <ArrowUpRight size={17} />
                </a>
              </div>
              <div className="experience-list">
                <div className="timeline-label">
                  THE JOURNEY SO FAR <span>2019 – NOW</span>
                </div>
                {experience.map((e) => (
                  <details className="experience-item" key={e.company}>
                    <summary>
                      <div className="timeline-dot" />
                      <div>
                        <div className="experience-date">
                          {e.date}
                          <span>{e.type}</span>
                        </div>
                        <h3>{e.company}</h3>
                        <p>{e.role}</p>
                      </div>
                      <Plus size={19} className="expand-plus" />
                      <Minus size={19} className="expand-minus" />
                    </summary>
                    <div className="experience-detail">
                      <p>{e.description}</p>
                      {e.location && (
                        <small>
                          <MapPin size={12} />
                          {e.location}
                        </small>
                      )}
                      <div className="project-tags">
                        {e.tags.map((t) => (
                          <span key={t}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section className="expertise-section section" id="toolkit">
            <div className="container">
              <div className="section-heading reveal">
                <div>
                  <Label>STACK & CREDENTIALS</Label>
                  <h2>
                    The tools behind
                    <br />
                    <span>the outcomes.</span>
                  </h2>
                </div>
                <p className="section-intro">
                  Hands-on across the platforms, signals
                  <br /> and systems that make growth work.
                </p>
              </div>
              <div className="expertise-layout">
                <div
                  className="capability-buttons"
                  aria-label="Explore capabilities"
                >
                  {capabilities.map((c, i) => {
                    const Icon = icons[c.icon];
                    return (
                      <button
                        key={c.name}
                        aria-pressed={i === capability}
                        onClick={() => setCapability(i)}
                      >
                        <Icon size={20} />
                        <span>{c.name}</span>
                        <ArrowUpRight size={19} />
                      </button>
                    );
                  })}
                </div>
                <div className="capability-panel" key={current.name}>
                  <div className="capability-heading">
                    <div className="capability-icon">
                      <CapabilityIcon size={29} />
                    </div>
                    <span>
                      {String(capability + 1).padStart(2, "0")} /{" "}
                      {String(capabilities.length).padStart(2, "0")}
                    </span>
                  </div>
                  <h3>{current.title}</h3>
                  <p>{current.description}</p>
                  <div className="tool-tags">
                    {current.tools.map((t) => (
                      <span key={t}>
                        <BrandIcon tool={t} />
                        {t}
                      </span>
                    ))}
                  </div>
                  {current.supporting && (
                    <div className="capability-supporting">
                      <h4>{current.supporting.label}</h4>
                      <div className="tool-tags">
                        {current.supporting.tools.map((tool) => (
                          <span key={tool}>
                            <BrandIcon tool={tool} />
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="capability-points">
                    {current.points.map((p) => (
                      <span key={p}>
                        <Check size={14} />
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="certifications">
                <div className="cert-heading">
                  <GraduationCap size={22} />
                  <h3>Learning that shows up in the work.</h3>
                </div>
                <div className="cert-grid">
                  {[
                    ["Google Ads Search", "Google · 2026", "google.com"],
                    ["Google Ads Measurement", "Google · 2026", "google.com"],
                    ["Meta Marketing Analytics", "Meta · Coursera", "meta.com"],
                    ["Google AI Essentials", "Google", "google.com"],
                    [
                      "Data Analysis with Spreadsheets and SQL",
                      "Professional development",
                    ],
                    ["Email Marketing", "HubSpot", "hubspot.com"],
                  ].map(([title, issuer, domain]) => (
                    <div key={title}>
                      <BrandIcon domain={domain} />
                      <span>
                        <b>{title}</b>
                        <small>{issuer}</small>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      )}
      <ContactSection />
      <footer className="reference-footer">
        <div className="reference-footer-inner">
          <small>© {new Date().getFullYear()} Andrew Fonseka</small>
          <span>Paid media · Business growth · Account ownership</span>
          <a href="#">
            Back to top <ArrowUp size={13} />
          </a>
        </div>
      </footer>
    </>
  );
}
