import React, { useState } from "react";
import { BadgeCheck } from "lucide-react";
import assets from "./brandAssets.json";

const toolBrands = {
  "Google Ads": "google.com",
  GA4: "google.com",
  "Google Tag Manager": "google.com",
  "Enhanced Conversions": "google.com",
  "Apps Script": "google.com",
  "Google Ads scripts": "google.com",
  "Microsoft Advertising": "microsoft.com",
  "Power BI": "microsoft.com",
  "Microsoft Clarity": "microsoft.com",
  "Dynamics 365": "dynamics.microsoft.com",
  Jira: "jira.com",
  "Meta Ads": "meta.com",
  "Meta CAPI": "meta.com",
  "LinkedIn Ads": "linkedin.com",
  "TikTok Ads": "tiktok.com",
  "Looker Studio": "looker.com",
  HubSpot: "hubspot.com",
  Zapier: "zapier.com",
  Lovable: "lovable.dev",
  Klaviyo: "klaviyo.com",
  Mailchimp: "mailchimp.com",
  Shopify: "shopify.com",
  Notion: "notion.so",
  ClickUp: "clickup.com",
  Asana: "asana.com",
  Ahrefs: "ahrefs.com",
  Semrush: "semrush.com",
  "Microsoft 365": "microsoft.com",
  "Google Workspace": "workspace.google.com",
  Canva: "canva.com",
  "Google Analytics 4": "google.com",
  "Google Search Console": "google.com",
  "Microsoft Clarity": "microsoft.com",
  BrightLocal: "brightlocal.com",
  SEMrush: "semrush.com",
  "Screaming Frog": "screamingfrog.co.uk",
  Airtable: "airtable.com",
  Supermetrics: "supermetrics.com",
  Drip: "drip.com",
  WordPress: "wordpress.org",
  Wix: "wix.com",
};

const localMarks = {
  "jira.com": "jira",
  "dynamics.microsoft.com": "dynamics-365",
  "klaviyo.com": "klaviyo",
  "screamingfrog.co.uk": "screaming-frog",
  "notion.so": "notion-icon",
  "clickup.com": "clickup",
  "asana.com": "asana-icon",
  "ahrefs.com": "ahrefs",
  "semrush.com": "semrush",
  "workspace.google.com": "google-icon",
  "canva.com": "canva",
  "google.com": "google-icon",
  "microsoft.com": "microsoft-icon",
  "meta.com": "meta-icon",
  "linkedin.com": "linkedin-icon",
  "tiktok.com": "tiktok-icon",
  "hubspot.com": "hubspot-symbol",
  "zapier.com": "zapier-icon",
  "lovable.dev": "lovable",
  "mailchimp.com": "mailchimp-freddie",
  "shopify.com": "shopify-symbol",
  "coursera.org": "coursera-symbol",
  "looker.com": "looker-icon",
};
const productMarks = {
  Jira: "jira",
  "Dynamics 365": "dynamics-365",
  "Google Search Console": "google-search-console",
  "Microsoft Advertising": "bing",
  "Microsoft 365": "microsoft-365",
  "Google Workspace": "google-icon",
  "Google Ads": "google-ads",
  GA4: "google-analytics",
  "Google Analytics 4": "google-analytics",
  "Google Tag Manager": "google-tag-manager",
  "Enhanced Conversions": "google-ads",
  "Apps Script": "google-apps-script",
  "Google Ads scripts": "google-ads",
  "Power BI": "microsoft-power-bi",
  "Looker Studio": "looker-icon",
};

// Brandfetch's display CDN URLs are embedded verbatim, as required by its policy.
// Prefer local product marks for crisp, reliable rendering; use the brand CDN as fallback.
export default function BrandIcon({ tool, domain, className = "" }) {
  const [attempt, setAttempt] = useState(0);
  const brand = domain || toolBrands[tool];
  const local = productMarks[tool] || localMarks[brand];
  const fallback = local ? `/images/brands/${local}.svg` : undefined;
  const src = [fallback, assets[brand]].filter(Boolean)[attempt];
  return (
    <span className={`brand-icon ${className}`} aria-hidden="true">
      {src ? (
        <img
          src={src}
          alt=""
          width="24"
          height="24"
          loading="lazy"
          onError={() => setAttempt((value) => value + 1)}
        />
      ) : tool ? (
        <b className="brand-letter">{tool.replace(/^(Google|Microsoft) /, "")[0]}</b>
      ) : (
        <BadgeCheck size={20} />
      )}
    </span>
  );
}
