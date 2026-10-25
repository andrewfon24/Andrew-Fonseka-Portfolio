import React, { useState } from "react";
import { BadgeCheck, ShoppingCart } from "lucide-react";
import assets from "./brandAssets.json";

const toolBrands = {
  "Google Ads": "google.com",
  "Google Ads Editor": "google.com",
  "Merchant Center": "google.com",
  GA4: "google.com",
  "Google Tag Manager": "google.com",
  "Enhanced Conversions": "google.com",
  "Apps Script": "google.com",
  "Google Ads scripts": "google.com",
  "Microsoft Advertising": "microsoft.com",
  "Power BI": "microsoft.com",
  "Microsoft Clarity": "microsoft.com",
  "Dynamics 365": "microsoft.com",
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
};

const localMarks = {
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
  "Microsoft 365": "microsoft-365",
  "Google Workspace": "google-icon",
  "Google Ads": "google-ads",
  GA4: "google-analytics",
  "Google Tag Manager": "google-tag-manager",
  "Enhanced Conversions": "google-ads",
  "Apps Script": "google-apps-script",
  "Google Ads scripts": "google-ads",
  "Google Ads Editor": "google-ads",
  "Power BI": "microsoft-power-bi",
  "Looker Studio": "looker-icon",
};

// Brandfetch's display CDN URLs are embedded verbatim, as required by its policy.
// Product names retain their exact labels; marks identify the owning brand.
export default function BrandIcon({ tool, domain, className = "" }) {
  const [failed, setFailed] = useState(false);
  const brand = domain || toolBrands[tool];
  const local = productMarks[tool] || localMarks[brand];
  const fallback = local ? `/images/brands/${local}.svg` : undefined;
  const src = productMarks[tool] || failed ? fallback : assets[brand];
  if (tool === "Amazon Ads")
    return (
      <span className={`brand-icon ${className}`} aria-hidden="true">
        <ShoppingCart size={18} />
      </span>
    );
  return (
    <span className={`brand-icon ${className}`} aria-hidden="true">
      {src ? (
        <img
          src={src}
          alt=""
          width="24"
          height="24"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <BadgeCheck size={20} />
      )}
    </span>
  );
}
