import React from "react";
import { Mail, FileText, Download } from "lucide-react";
import BrandIcon from "./BrandIcon";
const email = "rafandrewf@gmail.com";
const resume = "/documents/Andrew_Fonseka_Resume.pdf";
const portfolio = "/documents/Andrew_Fonseka_Portfolio.pdf";
export default function ContactSection() {
  return (
    <section
      className="contact-reference"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div className="contact-reference-inner">
        <h2 id="contact-heading">Let’s talk paid media</h2>
        <p>
          Hiring for a paid media role, or want to talk through one of the case
          studies? Email me or
          <br className="contact-line-break" /> connect on LinkedIn.
        </p>
        <div className="contact-reference-actions">
          <a
            className="contact-linkedin"
            href="https://www.linkedin.com/in/andrewfonseka/"
            target="_blank"
            rel="noreferrer"
            data-track="linkedin_click"
          >
            <BrandIcon domain="linkedin.com" />
            Connect on LinkedIn
          </a>
          <a href={`mailto:${email}?subject=${encodeURIComponent("Paid media role · Andrew Fonseka")}`} data-track="email_click">
            <Mail size={17} />
            {email}
          </a>
          <a href={resume} download data-track="resume_download" data-where="contact">
            <FileText size={17} />
            Download résumé
          </a>
          <a href={portfolio} download data-track="portfolio_download">
            <Download size={17} />
            Portfolio PDF
          </a>
        </div>
        <p className="contact-reference-location">
          Greater Vancouver, BC · Authorized to work in Canada
        </p>
      </div>
    </section>
  );
}
