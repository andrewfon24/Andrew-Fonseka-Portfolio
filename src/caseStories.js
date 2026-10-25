export const caseStories = {
  university: {
    problem:
      "Two colleges had the lowest intakes. The broad campaign had a cheap CPL but produced only 17 enrolments for them.",
    actions: [
      ["Split the priority", "Gave the two colleges their own campaign and budget."],
      ["Raise the intent", "Program-specific instant forms and A/B-tested creative."],
      ["Judge on enrolments", "Compared campaigns on CRM-matched, fee-paid enrolments, not CPL."],
    ],
    result:
      "The priority campaign turned 161 leads into 125 enrolments (77.6%). Its CPL was six times the broad campaign’s, and it delivered the intake the university needed.",
    takeaway: "A cheap lead only helps if it becomes the student the institution needs.",
  },
  panasia: {
    problem:
      "Win gold-loan borrowers in a competitive market on a fixed US$25K budget, where an enquiry means little until it becomes a funded loan.",
    actions: [
      ["Read the quality signal", "Meta delivered higher-quality leads at a lower CPL than Google."],
      ["Allocate to it", "Set a 60/40 Meta / Google split: US$15K and US$10K."],
      ["Judge on loans", "Reviewed weekly against funded loans matched to campaign leads."],
    ],
    result:
      "259 funded gold loans and US$500K in client-reported loan principal from US$25K in media: about US$97 per funded loan.",
    takeaway: "Keep CPL in the report. Let funded outcomes make the allocation call.",
  },
  aegon: {
    problem:
      "Smart Bidding and Meta were optimizing to form fills, and overlapping GTM tags were double-counting conversions across a seven-figure program.",
    actions: [
      ["Bid on real outcomes", "Fed HubSpot offline conversions (qualified leads, booked calls, completed applications) to Google and Meta, and restructured Google Ads accounts."],
      ["Fix the signal", "GA4, server-side GTM, Enhanced Conversions and Meta CAPI; removed double-counted conversions."],
      ["Standardize launches", "Built an Apps Script campaign builder for naming, UTM and compliance QA, now used team-wide."],
    ],
    result:
      "Cost per lead down 13% and completed applications up 18%. Corrected data reset reported CPA, budget decisions and agency spend, cutting five-figure annual waste. Compliance review time down 60%.",
    takeaway: "Trustworthy signals and repeatable launches make better decisions possible at scale.",
  },
  petmart: {
    problem:
      "The pet-supplies retailer needed more first orders and more subscribers, and campaigns didn’t separate prospecting from returning customers.",
    actions: [
      ["Restructure Google", "Rebuilt Google Shopping and Performance Max."],
      ["Support with Meta", "Ran complementary Meta campaigns in the acquisition mix."],
      ["Read beyond order one", "Assessed first-order ROAS alongside subscriptions."],
    ],
    result:
      "4:1 first-order ROAS, paid-attributed sales up 40% quarter on quarter and subscriptions up 30% (client-reported, Apr–Jun 2023).",
    takeaway: "Acquisition is worth more when the strategy makes room for the next purchase.",
  },
  dats: {
    problem:
      "Get more enrolment-ready prospects without raising an approximately US$900 monthly budget.",
    actions: [
      ["Rebuild the traffic", "Rebuilt Google Ads and Meta; added Microsoft Advertising."],
      ["Simplify the enquiry", "New Lovable landing page with a shorter form."],
      ["Reply around the clock", "A 24/7 AI assistant answers enquiries, including after hours."],
    ],
    result:
      "CRM-qualified leads up 20% at flat spend, replies 4× faster, and Microsoft Advertising delivered 40% of 212 leads in the second quarter.",
    takeaway: "Fix the traffic and the conversion path together before asking for more budget.",
  },
};

export const universityCampaigns = [
  { name: "Priority colleges", leads: 161, enrolled: 125, rate: "77.6%", cpl: "US$21.79", cpe: "US$28.06" },
  { name: "Broad undergraduate", leads: 603, enrolled: 167, rate: "27.7%", cpl: "US$3.49", cpe: "US$12.59" },
  { name: "Retargeting", leads: 57, enrolled: 20, rate: "35.1%", cpl: "US$11.15", cpe: "US$31.79" },
];
