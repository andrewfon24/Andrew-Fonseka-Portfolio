import React, { useEffect, useState } from "react";
import {
  ArrowDown,
  Download,
  Mail,
  ArrowUp,
  GraduationCap,
} from "lucide-react";
import { projects, stackGroups } from "./data";
import CaseStudyPage from "./CaseStudyPage";
import ContactSection from "./ContactSection";
import BrandIcon from "./BrandIcon";
import WorkCard from "./WorkCard";
import { ApproachReferences, PersonBehindWork } from "./ProfileSections";
import useEntranceMotion from "./useEntranceMotion";

const resume = "/documents/Andrew_Fonseka_Resume.pdf";
const email =
  "mailto:rafandrewf@gmail.com?subject=Paid%20media%20specialist%20%E2%80%93%20intro";
function Label({ children }) {
  return (
    <div className="eyebrow">
      <span />
      {children}
    </div>
  );
}

function MetricValue({ value, suffix = "" }) {
  return (
    <strong data-count-to={value} data-count-suffix={suffix}>
      <span className="metric-count-display" aria-hidden="true">
        {value}
        {suffix}
      </span>
      <span className="metric-count-label">
        {value}
        {suffix}
      </span>
    </strong>
  );
}

export default function App({ projectId = null }) {
  useEntranceMotion();
  const caseProject = projects.find((p) => p.id === projectId);
  const [active, setActive] = useState("");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            if (entry.target.id) setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-10% 0px -40% 0px" },
    );
    document
      .querySelectorAll("section[id], #approach, .reveal")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="header rebuild-header">
        <div className="nav-shell">
          <a href="/" className="brand">
            <span className="brand-monogram" aria-hidden="true">
              A<span>F</span>
            </span>
            <span>
              Andrew Fonseka<span className="brand-dot">.</span>
            </span>
          </a>
          <nav className="navigation" aria-label="Main navigation">
            {[
              ["work", "Results"],
              ["approach", "Approach"],
              ["references", "References"],
              ["about", "About"],
              ["contact", "Contact"],
            ].map(([id, label]) => (
              <a
                key={id}
                className={active === id ? "active" : ""}
                href={`${caseProject && id !== "contact" ? "/" : ""}#${id}`}
              >
                {label}
              </a>
            ))}
          </nav>
          <a
            className="nav-contact"
            href={resume}
            download
            data-track="resume_download"
            data-where="header"
          >
            <span className="resume-desktop">Download résumé</span>
            <span className="resume-mobile">Résumé</span>
            <Download size={16} aria-hidden="true" />
          </a>
        </div>
      </header>
      {caseProject ? (
        <CaseStudyPage project={caseProject} />
      ) : (
        <main id="main" className="home-rebuild">
          <section
            className="intro-hero container"
            aria-labelledby="hero-title"
          >
            <div className="intro-copy">
              <h1 id="hero-title">
                I turn ad spend into{" "}
                <span>enrolments, loans and applications.</span>
              </h1>
              <p className="intro-description">
                Three years across agency, in-house and advisory work. I connect
                campaigns to CRM-qualified outcomes, build reliable measurement
                and explain what the numbers mean for the business.
              </p>
              <div className="intro-actions">
                <a
                  className="button primary"
                  href={email}
                  data-track="email_click"
                  data-where="hero"
                >
                  Email me <Mail size={18} aria-hidden="true" />
                </a>
                <a className="text-link" href="#work">
                  See the results <ArrowDown size={17} aria-hidden="true" />
                </a>
              </div>
              <p className="intro-identity">
                Paid media and digital marketing. Vancouver, BC.
              </p>
              <p className="intro-note">MBA. Authorized to work in Canada.</p>
            </div>
            <div className="intro-portrait">
              <img
                src="/images/andrew-fonseka-480.webp"
                srcSet="/images/andrew-fonseka-240.webp 240w, /images/andrew-fonseka-480.webp 480w"
                sizes="(max-width: 640px) 80px, (max-width: 960px) 240px, 360px"
                alt="Andrew Fonseka"
                fetchPriority="high"
                width="1122"
                height="1402"
              />
            </div>
          </section>
          <div className="metric-band">
            <div className="container rebuild-stats">
              <div>
                <strong>Agency</strong>
                <span>Strategy and client-facing delivery</span>
              </div>
              <div>
                <strong>In-house</strong>
                <span>Measurement and marketing operations</span>
              </div>
              <div>
                <MetricValue value={3} suffix=" years" />
                <span>in Paid Media</span>
              </div>
            </div>
          </div>
          <section
            className="rebuild-work"
            id="work"
            aria-labelledby="work-title"
          >
            <div className="container">
              <div className="results-heading">
                <h2 id="work-title">The results, in context.</h2>
                <p>
                  Different briefs. One focus: what the business needed next.
                </p>
              </div>
              <div className="rebuild-featured">
                {["aegon", "university", "panasia"].map((id) => (
                  <WorkCard
                    key={id}
                    project={projects.find((p) => p.id === id)}
                  />
                ))}
              </div>
              <h3 className="more-work-title">More work</h3>
              <div className="rebuild-more">
                {["petmart", "dats"].map((id) => (
                  <WorkCard
                    key={id}
                    project={projects.find((p) => p.id === id)}
                    compact
                  />
                ))}
              </div>
            </div>
          </section>
          <ApproachReferences />
          <PersonBehindWork />
          <section className="expertise-section section" id="toolkit">
            <div className="container">
              <div className="section-heading reveal">
                <div>
                  <Label>STACK & CREDENTIALS</Label>
                  <h2>
                    The platforms I use.
                    <br />
                    <span>The thinking comes first.</span>
                  </h2>
                </div>
                <p className="section-intro">
                  Paid search, paid social, measurement and the tools that help
                  me keep the account and the team connected.
                </p>
              </div>
              <div className="stack-grid">
                {stackGroups.map((g) => (
                  <div className={`stack-group stack-${g.id}`} key={g.id}>
                    <h3>{g.name}</h3>
                    <ul>
                      {g.tools.map((t) => (
                        <li key={t}>
                          <BrandIcon tool={t} />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
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
                      "Coursera",
                      "coursera.org",
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
