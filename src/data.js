// Every figure here comes from claude/job-search-master-copy.md (the single
// source of truth). Aegon figures are relative only (NDA).

export const resume = "/documents/Andrew_Fonseka_Resume.pdf";
export const portfolioPdf = "/documents/Andrew_Fonseka_Portfolio.pdf";
export const email = "rafandrewf@gmail.com";
export const linkedin = "https://www.linkedin.com/in/andrewfonseka/";

export const projects = [
  {
    id: "university",
    category: "Education",
    client: "Private university, Saudi Arabia",
    shortClient: "Saudi university",
    period: "May–Aug 2026",
    context: "Contract, via partner agency SOL",
    channels: ["Meta Ads", "Instant forms", "Admissions CRM"],
    title: "From interest to intake.",
    summary:
      "Meta lead generation judged on fee-paid enrolments in the admissions CRM, with a dedicated campaign for the two colleges that needed students most.",
    role: "End to end. SOL brought the client; I ran strategy, build, creative testing, optimization and CRM reporting.",
    metric: "312",
    metricLabel: "fee-paid enrolments",
    secondary: "~US$20",
    secondaryLabel: "media cost per enrolment",
    note: "Meta Ads Manager, 1 May–31 Aug 2026. Fee-paid enrolments matched in the admissions CRM on name, phone and student ID. USD converted at SAR 3.75. Institution identifiers removed.",
    stats: [
      ["821", "Meta leads"],
      ["430", "CRM-qualified"],
      ["312", "Fee-paid enrolments"],
      ["~US$20", "Per enrolment"],
    ],
  },
  {
    id: "panasia",
    category: "Financial services",
    client: "Pan Asia Bank",
    shortClient: "Pan Asia Bank",
    period: "2023",
    context: "Kites Global, agency",
    channels: ["Meta Ads", "Google Ads"],
    title: "Follow the leads that become loans.",
    summary:
      "A fixed US$25K budget split 60/40 Meta to Google on lead quality, judged weekly on funded gold loans rather than form fills.",
    role: "Led the account at Kites Global: designed and presented the Meta video strategy pitch, set the channel split and ran client calls through delivery.",
    metric: "259",
    metricLabel: "funded gold loans",
    secondary: "~US$97",
    secondaryLabel: "media cost per funded loan",
    note: "Funded loans and US$500K loan principal are client-reported and matched to campaign leads. US$25K media spend. Loan principal is not bank revenue or profit, so the ratio is not ROAS.",
    stats: [
      ["259", "Funded loans"],
      ["~US$97", "Per funded loan"],
      ["US$25K", "Media spend"],
      ["US$500K", "Loan principal"],
    ],
  },
  {
    id: "aegon",
    category: "Financial services",
    client: "Aegon",
    shortClient: "Aegon",
    period: "Jan 2025–present",
    context: "In-house, US and Canada",
    channels: ["LinkedIn", "Google Ads", "Meta", "Measurement"],
    title: "Better signals. Smarter scale.",
    summary:
      "Moved bidding from form fills to HubSpot offline conversions, rebuilt measurement and standardized launches across a seven-figure annual program.",
    role: "I run the 50 business-unit accounts I own day to day; my Director reviews. The measurement rebuild and campaign builder are my work.",
    metric: "−13%",
    metricLabel: "cost per lead",
    secondary: "+18%",
    secondaryLabel: "completed applications",
    note: "Relative figures only; absolute budgets and performance are confidential under NDA. Event Match Quality is a relative improvement. About 12 working days saved per year is an estimate associated with the campaign builder.",
    stats: [
      ["−13%", "Cost per lead"],
      ["+18%", "Completed applications"],
      ["+25%", "Meta Event Match Quality"],
      ["−60%", "Compliance review time"],
    ],
  },
  {
    id: "petmart",
    category: "E-commerce",
    client: "Petmart.lk",
    shortClient: "Petmart.lk",
    period: "Apr–Jun 2023",
    context: "Kites Global, agency",
    channels: ["Google Shopping", "Performance Max", "Meta"],
    title: "First orders. Lasting customers.",
    summary:
      "Restructured Google Shopping and Performance Max, with Meta in support, and read results on subscriptions as well as first orders.",
    role: "Restructured Shopping and Performance Max and ran the supporting Meta campaigns at Kites Global.",
    metric: "4:1",
    metricLabel: "first-order ROAS",
    secondary: "+40%",
    secondaryLabel: "paid-attributed sales, QoQ",
    note: "Client-reported results, April–June 2023. 4:1 first-order ROAS for Google Shopping and Performance Max. Sales and subscription changes are not measures of incremental lift.",
    stats: [
      ["4:1", "First-order ROAS"],
      ["+40%", "Paid-attributed sales"],
      ["+30%", "Subscriptions"],
      ["3 mo", "Reporting period"],
    ],
  },
  {
    id: "dats",
    category: "Education",
    client: "DIMO Academy of Technical Studies",
    shortClient: "DIMO Academy",
    period: "Feb 2026–present",
    context: "Contract, trades education",
    channels: ["Google Ads", "Microsoft Ads", "Meta"],
    title: "More qualified. Same budget.",
    summary:
      "Rebuilt Google Ads and Meta, added Microsoft Advertising and a new landing page with a 24/7 AI assistant, all at flat spend.",
    role: "Sole consultant: media, landing page and AI assistant.",
    metric: "+20%",
    metricLabel: "CRM-qualified leads",
    secondary: "4×",
    secondaryLabel: "faster enquiry replies",
    note: "Client-reported, before-and-after comparison at about US$900 per month, not a controlled test. Microsoft Advertising delivered 40% of 212 leads in the engagement’s second quarter.",
    stats: [
      ["+20%", "CRM-qualified leads"],
      ["4×", "Faster replies"],
      ["40%", "Leads from Microsoft Ads"],
      ["~US$900", "Monthly budget"],
    ],
  },
];

export const experience = [
  {
    company: "Paid Media Consultant",
    role: "Contract, part-time",
    date: "Jan 2026 – now",
    year: "2026",
    kind: "Contract",
    detail:
      "7 clients in education, local services, automotive and hospitality, alongside my full-time role. Saudi engagements delivered through partner agency SOL; active engagements transfer to SOL when I start a new full-time role.",
  },
  {
    company: "Aegon",
    role: "Digital Marketing Specialist",
    date: "Jan 2025 – now",
    year: "2025",
    kind: "In-house",
    detail:
      "Own bidding and campaign structure for 50 business-unit ad accounts and co-manage ~100 more. Supervise two agency partners and report biweekly to the CMO.",
  },
  {
    company: "University Canada West",
    role: "MBA, GPA 4.00 / 4.33",
    date: "Aug 2023 – Oct 2024",
    year: "2023",
    kind: "Education",
    detail: "Full-time MBA in Vancouver, straight into Aegon afterward.",
  },
  {
    company: "Kites Global",
    role: "Digital Marketing Strategist",
    date: "Jan – Aug 2023",
    year: "2023",
    kind: "Agency",
    detail:
      "Led four client accounts end to end and supported five more. Pitched Pan Asia Bank and contributed to the Godrej India pitch.",
  },
  {
    company: "Enfection",
    role: "Digital Marketing Intern, full-time",
    date: "Jul – Dec 2022",
    year: "2022",
    kind: "Agency",
    detail:
      "Google Shopping, Performance Max, GTM and Meta for Keells Super, Rocell, CDB Bank and Costa Coffee Singapore.",
  },
];

export const testimonials = [
  {
    quote:
      "Andrew is a highly dedicated and responsible professional who consistently demonstrated a deep understanding of digital marketing principles. Any task assigned to him—whether it was campaign execution, analytics reporting, or content creation—was always handled with remarkable attention to detail and delivered at an exceptional standard.",
    name: "Don Chanaka Perera",
    role: "Managed Andrew directly at Kites Global",
    initials: "DP",
  },
  {
    quote:
      "His creativity, analytical skills, and proactive approach consistently elevated our marketing campaigns. A true team player with a positive attitude, Andrew brought fresh ideas and delivered results.",
    name: "Hashan Nalinda Fernando",
    role: "Performance Marketing Strategist, Enfection",
    initials: "HF",
  },
];

export const toolkit = [
  {
    group: "Search and shopping",
    tools: ["Google Ads", "Microsoft Advertising", "Google Ads Editor", "Merchant Center"],
    skills: "Search-term mining, match types, tCPA and tROAS testing, RSA testing, Shopping, Performance Max",
  },
  {
    group: "Social and ABM",
    tools: ["Meta Ads", "LinkedIn Ads", "TikTok Ads", "Amazon Ads"],
    skills: "Lead gen, Matched Audiences, Thought Leader Ads, audience and creative A/B tests",
  },
  {
    group: "Measurement",
    tools: ["GA4", "Google Tag Manager", "Meta CAPI", "Looker Studio"],
    skills: "Server-side GTM, Enhanced Conversions, offline conversions, call tracking, Supermetrics",
  },
  {
    group: "CRM and automation",
    tools: ["HubSpot", "Dynamics 365", "Klaviyo", "Apps Script"],
    skills: "Google Ads Scripts, Zapier, Lovable, pacing and forecasting in Sheets",
  },
];

export const certifications = [
  ["Google Ads Search", "Google, 2026", "google.com"],
  ["Google Ads Measurement", "Google, 2026", "google.com"],
  ["Meta Marketing Analytics", "Meta via Coursera", "meta.com"],
  ["Google AI Essentials", "Google", "google.com"],
  ["Email Marketing", "HubSpot Academy", "hubspot.com"],
];

// Questions agency hiring managers ask. Public-safe answers only.
export const questions = [
  {
    q: "What did you personally do?",
    a: "At Aegon I run the 50 business-unit accounts I own day to day; my Director reviews. The measurement rebuild and the campaign builder are my work. The Saudi university and DIMO Academy were end to end and solo. At Kites Global I led four accounts and supported five.",
  },
  {
    q: "Have you worked agency-side?",
    a: "Yes. Eight months as a strategist at Kites Global, where I ran client calls, designed and presented the Meta video strategy pitch to Pan Asia Bank and worked on the Godrej India pitch. Before that, a six-month full-time internship at Enfection. At Aegon I supervise two external agencies, so I also know what a good agency partner looks like from the client side.",
  },
  {
    q: "How many accounts can you keep moving?",
    a: "Today: 50 owned and about 100 co-managed accounts at Aegon, plus 7 contract clients this year. At Kites Global: four accounts led and five supported at once. The ABM program launched on a tight, time-tracked schedule.",
  },
  {
    q: "How do you know the 312 enrolments are real?",
    a: "They were matched in the university’s CRM on name, phone and student ID against the instant-form submissions. The 38% lead-to-enrolment rate is high because the forms were program-specific and high-intent, and admissions followed up well.",
  },
  {
    q: "Why so few Aegon numbers?",
    a: "NDA. I publish relative changes only, and I’m happy to walk through exactly how I got each one.",
  },
  {
    q: "Where is your platform depth?",
    a: "Google Ads (Search, Shopping, Performance Max), Meta, LinkedIn including ABM, and Microsoft Advertising, with hands-on Amazon Ads. Programmatic and DV360: light exposure only.",
  },
];
