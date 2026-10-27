import React, { useEffect, useState } from "react";
import {
  ArrowUpRight,
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

export default function App({ projectId = null }) {
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
      .querySelectorAll("section[id], .reveal")
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
              <p className="intro-label">
                Paid media specialist · Vancouver, BC
              </p>
              <h1 id="hero-title">
                I turn ad spend into{" "}
                <span>enrolments, loans and applications.</span>
              </h1>
              <p className="intro-description">
                Paid media specialist with agency, in-house and contract
                experience. I tie campaigns to real business outcomes and
                explain the results in plain English.
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
              <p className="intro-note">MBA · Authorized to work in Canada</p>
            </div>
            <div className="intro-portrait">
              <img
                src="/images/andrew-fonseka-480.webp"
                srcSet="/images/andrew-fonseka-240.webp 240w, /images/andrew-fonseka-480.webp 480w"
                sizes="(max-width: 640px) 64px, (max-width: 960px) 240px, 320px"
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
                <strong>7-figure</strong>
                <span>annual ad budget co-managed at Aegon</span>
              </div>
              <div>
                <strong>50</strong>
                <span>business units managed at Aegon</span>
              </div>
              <div>
                <strong>3 years</strong>
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
              <h2 id="work-title">The results, in context.</h2>
              <div className="rebuild-featured">
                {["university", "aegon", "panasia"].map((id) => (
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
          <section
            className="rebuild-reference"
            id="references"
            aria-labelledby="reference-title"
          >
            <div className="container">
              <h2 id="reference-title">A colleague’s perspective.</h2>
              <blockquote>
                “Any task assigned to him—whether it was campaign execution,
                analytics reporting, or content creation—was always handled with
                remarkable attention to detail and delivered at an exceptional
                standard.”
              </blockquote>
              <div className="reference-attribution">
                <p>
                  <strong>Don Chanaka Perera</strong>
                  <span>Managed me directly at Kites Global · 2023</span>
                </p>
                <a
                  className="testimonial-linkedin"
                  href="https://www.linkedin.com/in/andrewfonseka/details/recommendations/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Read the LinkedIn recommendation from Don Chanaka Perera"
                  data-track="linkedin_click"
                >
                  <BrandIcon domain="linkedin.com" />
                </a>
              </div>
              <p className="reference-excerpt">
                Excerpt from LinkedIn recommendation
              </p>
            </div>
          </section>
          <section
            className="rebuild-about"
            id="about"
            aria-labelledby="about-title"
          >
            <div className="container rebuild-about-grid">
              <h2 id="about-title">
                From Colombo
                <br />
                to Vancouver.
              </h2>
              <div>
                <p>
                  I started in Colombo’s agency world, running paid media for
                  banks and retailers. I moved to Vancouver for my MBA, and now
                  manage paid media across Aegon’s US and Canadian business
                  units while taking on a few independent clients. I like
                  finding what’s holding an account back, explaining it plainly
                  and fixing it.
                </p>
                <p className="role-history">
                  Aegon (2025–now) · Independent (2026–now) · Kites Global,
                  Marketing Strategist (2023) · Enfection (2022)
                </p>
                <a
                  className="resume-pill"
                  href={resume}
                  download
                  data-track="resume_download"
                  data-where="about"
                >
                  The full story, in my résumé{" "}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </div>
            </div>
          </section>
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
