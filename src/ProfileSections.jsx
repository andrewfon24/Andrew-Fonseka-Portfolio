import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Plus,
  Minus,
  ScanLine,
  Target,
  Zap,
  ChartNoAxesCombined,
} from "lucide-react";
import { experience, testimonials } from "./data";
import BrandIcon from "./BrandIcon";

const approach = [
  [
    ScanLine,
    "Audit the signal",
    "Tracking, CRM fields, creative and search terms. Start with data you can trust.",
  ],
  [
    Target,
    "Define the outcome",
    "Agree the business goal. Build the channel mix and a focused test plan.",
  ],
  [
    Zap,
    "Test. Learn. Reallocate.",
    "Test audiences, offers and creative. Let the evidence guide the next move.",
  ],
  [
    ChartNoAxesCombined,
    "Report what matters",
    "Cost per customer, pipeline quality and a clear recommendation for what’s next.",
  ],
];

export function ApproachReferences() {
  const [index, setIndex] = useState(0);
  const quote = testimonials[index];
  return (
    <section
      className="approach-references"
      id="references"
      aria-labelledby="approach-title"
    >
      <div className="container">
        <div className="combined-approach" id="approach">
          <div className="combined-heading">
            <div>
              <p className="profile-label">Approach</p>
              <h2 id="approach-title">
                Signal first.
                <br />
                <span>Budget follows evidence.</span>
              </h2>
            </div>
            <p>
              Good performance starts before the first ad.
              <br />
              Here’s how I connect strategy to execution.
            </p>
          </div>
          <ol className="combined-steps">
            {approach.map(([Icon, title, body], i) => (
              <li key={title}>
                <div className="combined-step-top">
                  <Icon size={23} aria-hidden="true" />
                  <span aria-hidden="true">0{i + 1}</span>
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="combined-reference" aria-labelledby="reference-title">
          <div>
            <p className="profile-label">References</p>
            <h2 id="reference-title">
              What colleagues say
              <br />
              <span>about the work.</span>
            </h2>
            <div className="combined-controls">
              <button
                aria-label="Previous recommendation"
                onClick={() =>
                  setIndex(
                    (index + testimonials.length - 1) % testimonials.length,
                  )
                }
              >
                <ArrowLeft size={18} aria-hidden="true" />
              </button>
              <span
                aria-label={`Recommendation ${index + 1} of ${testimonials.length}`}
              >
                0{index + 1} / 0{testimonials.length}
              </span>
              <button
                aria-label="Next recommendation"
                onClick={() => setIndex((index + 1) % testimonials.length)}
              >
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="combined-quote" aria-live="polite" aria-atomic="true">
            <span className="combined-quote-mark" aria-hidden="true">
              “
            </span>
            <blockquote>{quote.quote}</blockquote>
            <div className="combined-person">
              <span className="reference-initials" aria-hidden="true">
                {quote.initials}
              </span>
              <p>
                <strong>{quote.name}</strong>
                <span>{quote.role}</span>
              </p>
              <a
                className="testimonial-linkedin"
                href="https://www.linkedin.com/in/andrewfonseka/details/recommendations/"
                target="_blank"
                rel="noreferrer"
                aria-label={`Read LinkedIn recommendations for Andrew, including ${quote.name}`}
                data-track="linkedin_click"
              >
                <BrandIcon domain="linkedin.com" />
              </a>
            </div>
            <p className="combined-source">Verbatim LinkedIn recommendation</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PersonBehindWork() {
  return (
    <section
      className="restored-about about-section section"
      id="about"
      aria-labelledby="about-title"
    >
      <div className="container about-grid">
        <div className="about-copy">
          <p className="profile-label">The person behind the work</p>
          <h2 id="about-title">
            From Colombo to Vancouver.
            <br />
            Still asking better questions.
          </h2>
          <p>
            I’m Andrew, and I love figuring out what makes a campaign work. I
            started in Colombo’s agency teams after studying Management &amp;
            Digital Innovation at the University of London. Working with clients
            across banking, retail and education got me excited about connecting
            marketing to real business results.
          </p>
          <p>
            That curiosity brought me to Vancouver for my MBA at University
            Canada West. Most recently I worked in-house at Aegon (2025–2026),
            running paid media for U.S. and Canadian business units. I also
            advise a small number of clients independently. I enjoy getting
            involved in the whole process, from the first campaign idea to the
            systems and reporting behind it.
          </p>
          <p>
            What keeps me excited is seeing the work make a difference: a
            student enrolling, a lead becoming a customer, or a team getting
            hours back in their week. I’m always keen to learn, ask better
            questions and find the next thing we can improve.
          </p>
          <div className="about-location">
            <MapPin size={17} aria-hidden="true" />
            <span>
              Greater Vancouver, BC
              <br />
              <small>Authorized to work in Canada</small>
            </span>
          </div>
          <a
            className="resume-pill"
            href="/documents/Andrew_Fonseka_Resume.pdf"
            download
            data-track="resume_download"
            data-where="about"
          >
            The full story, in my résumé{" "}
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
        <div className="experience-list">
          <div className="timeline-label">
            The journey so far <span>2019 – NOW</span>
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
                <Plus size={19} className="expand-plus" aria-hidden="true" />
                <Minus size={19} className="expand-minus" aria-hidden="true" />
              </summary>
              <div className="experience-detail">
                <p>{e.description}</p>
                {e.location && (
                  <small>
                    <MapPin size={12} aria-hidden="true" />
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
  );
}
