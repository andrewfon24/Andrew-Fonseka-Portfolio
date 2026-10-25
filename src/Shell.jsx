import React, { useEffect, useState } from "react";
import { Download, Mail, Menu, X, FileText } from "lucide-react";
import BrandIcon from "./BrandIcon";
import { email, linkedin, resume, portfolioPdf } from "./data";

const links = [
  ["work", "Work"],
  ["approach", "Approach"],
  ["about", "About"],
  ["contact", "Contact"],
];

export function Header({ onCase = false }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const esc = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [open]);
  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""} ${open ? "menu-open" : ""}`}>
      <div className="wrap header-row">
        <a href="/" className="brand">
          <span className="brand-monogram" aria-hidden="true">
            A<span>F</span>
          </span>
          <span className="brand-name">Andrew Fonseka</span>
        </a>
        <nav id="site-nav" className="site-nav" aria-label="Main navigation">
          {links.map(([id, label]) => (
            <a key={id} href={`${onCase && id !== "contact" ? "/" : ""}#${id}`} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a className="nav-mobile-resume" href={resume} download data-track="resume_download" data-where="menu">
            Download résumé <Download size={16} aria-hidden="true" />
          </a>
        </nav>
        <a className="btn btn-ghost header-resume" href={resume} download data-track="resume_download" data-where="header">
          Résumé <Download size={15} aria-hidden="true" />
        </a>
        <button
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}

export function Contact() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-heading">
      <div className="wrap contact-inner">
        <h2 id="contact-heading">Let’s talk paid media</h2>
        <p>Questions about a case study, or a paid media problem worth solving? Email is fastest.</p>
        <div className="contact-actions">
          <a className="btn btn-gold" href={`mailto:${email}`} data-track="email_click">
            <Mail size={18} aria-hidden="true" />
            Email Andrew
          </a>
          <a className="btn btn-outline-light" href={linkedin} target="_blank" rel="noreferrer" data-track="linkedin_click">
            <BrandIcon domain="linkedin.com" />
            Connect on LinkedIn
          </a>
        </div>
        <p className="contact-email">{email}</p>
        <div className="contact-docs">
          <a href={resume} download data-track="resume_download" data-where="contact">
            <FileText size={16} aria-hidden="true" />
            Download résumé
          </a>
          <a href={portfolioPdf} download data-track="portfolio_download">
            <Download size={16} aria-hidden="true" />
            Portfolio PDF
          </a>
        </div>
        <p className="contact-fine">Greater Vancouver, BC. Authorized to work in Canada.</p>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-row">
        <small>© {new Date().getFullYear()} Andrew Fonseka</small>
        <span>Paid media judged on customers, not clicks.</span>
        <a href="#top">Back to top</a>
      </div>
    </footer>
  );
}
