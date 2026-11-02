// Single source of truth for the site. Every figure and claim comes from the
// supplied résumé and portfolio PDFs (2026). Do not add numbers that are not
// in those documents.

export const profile = {
  name: "Andrew Fonseka",
  title: "Paid Media & Performance Marketing Specialist",
  email: "andrew@andrewfonseka.com",
  linkedin: "https://www.linkedin.com/in/andrewfonseka/",
  location: "Greater Vancouver, BC",
  resume: "/documents/Andrew_Fonseka_Resume.pdf",
  portfolio: "/documents/Andrew_Fonseka_Portfolio.pdf",
  status: "Open to paid media roles in Greater Vancouver",
};

export const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(
  "Paid media role – intro",
)}`;

// The band under the hero, as on the owner's earlier site.
export const metrics = [
  { value: "Agency", label: "Strategy and client-facing delivery" },
  { value: "In-house", label: "Measurement and marketing operations" },
  { value: "3 years", count: 3, suffix: " years", label: "in Paid Media" },
];

// Headline results, in portfolio-PDF order. `count` drives the counter.
export const proof = [
  {
    value: "312",
    count: 312,
    label: "fee-paid enrolments",
    source: "Private university, Saudi Arabia, May to Aug 2026",
    case: "university",
  },
  {
    value: "259",
    count: 259,
    label: "funded gold loans",
    source: "Pan Asia Bank, US$25K media budget",
    case: "panasia",
  },
  {
    value: "4:1",
    prefix: "",
    count: 4,
    suffix: ":1",
    label: "first-order ROAS",
    source: "Petmart.lk, Google Shopping and PMax",
    case: "petmart",
  },
  {
    value: "+19%",
    count: 19,
    prefix: "+",
    suffix: "%",
    label: "CRM-qualified leads at flat spend",
    source: "DIMO Academy for Technical Studies, 2026",
    case: "dats",
  },
];

export const cases = [
  {
    id: "aegon",
    number: "01",
    client: "Aegon",
    sector: "Financial services",
    context: "In-house",
    period: "2025 to 2026",
    headline: ["Trust the data.", "Then automate the routine."],
    summary:
      "Paid media for annuity, life insurance, pension and wealth products in the U.S. and Canada, with the tracking, CRM signal and automation behind it.",
    role: "Managed Google Ads, Meta and LinkedIn campaigns for U.S. and Canadian financial products, and helped develop and launch the LinkedIn account-based program with the team.",
    note: "Illustrative process. No employer results, budgets or figures are shown.",
    channels: ["Google Ads", "Meta Ads", "LinkedIn Ads"],
  },
  {
    id: "university",
    number: "02",
    client: "Private university",
    clientShort: "Private university, Saudi Arabia",
    sector: "Education",
    context: "Independent project, via partner agency",
    period: "May to Aug 2026",
    headline: ["Optimize for enrolments,", "not form fills."],
    summary:
      "A dedicated Meta campaign for two priority colleges, every campaign judged on fee-paid enrolments in the CRM.",
    problem:
      "Two colleges needed more students. A broad undergraduate campaign produced enquiries, but only 17 enrolments for those colleges.",
    decision:
      "A dedicated Meta campaign and budget for the two priority colleges, separate from the broad undergraduate campaign. Every campaign judged on fee-paid enrolments in the university’s CRM, not form fills.",
    role: "Advised on Meta lead-generation strategy and helped set up and implement the campaigns.",
    stats: [
      { value: "312", count: 312, label: "fee-paid enrolments" },
      { value: "~US$20", count: 20, prefix: "~US$", label: "media cost per enrolment" },
      { value: "38%", count: 38, suffix: "%", label: "lead-to-enrolment" },
    ],
    note: "Fee-paid = first-semester deposit plus admission fee. Sources: Meta Ads Manager and the university’s admissions CRM. Spend SAR 23,421 converted at SAR 3.75.",
    channels: ["Meta Ads", "Admissions CRM"],
  },
  {
    id: "panasia",
    number: "03",
    client: "Pan Asia Bank",
    sector: "Banking",
    context: "Agency, Kites Global",
    period: "2023",
    headline: ["Lead quality made", "the allocation decision."],
    summary:
      "A fixed US$25K budget split 60/40 across Meta and Google Ads by lead quality, measured on funded loans in the bank’s own system.",
    problem:
      "Pan Asia Bank wanted gold-loan customers from paid media. A fixed US$25K budget had to produce funded loans, not just enquiries.",
    decision:
      "Allocate 60% to Meta and 40% to Google Ads by lead quality, and measure the result on funded loans in the bank’s own system.",
    role: "Account lead: strategy, the Meta video pitch and client calls.",
    stats: [
      { value: "259", count: 259, label: "funded gold loans", sub: "Client-reported" },
      { value: "~US$97", count: 97, prefix: "~US$", label: "media cost per funded loan" },
      { value: "US$500K", count: 500, prefix: "US$", suffix: "K", label: "loan principal lent", sub: "Client-reported" },
    ],
    note: "Funded loans and principal are client-reported. Loan principal is not bank revenue or profit, and the principal-to-media ratio is not ROAS. Channel-level funded-loan counts are not available.",
    channels: ["Meta Ads", "Google Ads"],
  },
  {
    id: "petmart",
    number: "04",
    client: "Petmart.lk",
    sector: "Retail",
    context: "Agency, Kites Global",
    period: "Mar to May 2023",
    headline: ["First orders.", "Lasting customers."],
    summary:
      "Google Shopping and Performance Max split by new and returning customers, read alongside paid-attributed sales and subscriptions.",
    problem:
      "Petmart.lk wanted paid media to drive first orders and subscriptions, and needed to see which spend was acquiring new customers.",
    decision:
      "Split Google Shopping and Performance Max by new vs returning customers, and read first-order return alongside paid-attributed sales and subscriptions.",
    decisionLabel: "Actions",
    role: "Paid media strategy and delivery, and helped launch a Valentine’s Day activation with Sugar Beach (HI Magazine coverage).",
    stats: [
      { value: "4:1", count: 4, suffix: ":1", label: "first-order ROAS", sub: "Google Shopping and Performance Max" },
      { value: "+40%", count: 40, prefix: "+", suffix: "%", label: "paid-attributed sales, QoQ", sub: "Client-reported" },
      { value: "+30%", count: 30, prefix: "+", suffix: "%", label: "subscriptions", sub: "Client-reported" },
    ],
    note: "Client-reported, Mar to May 2023 quarter, which was also boosted by the Valentine’s Day campaign. Revenue is attributed to paid media and the brand activation together; first-order ROAS excludes customer lifetime value and is not an incrementality test.",
    channels: ["Google Shopping", "Performance Max"],
  },
  {
    id: "dats",
    number: "05",
    client: "DIMO Academy for Technical Studies",
    clientShort: "DIMO Academy",
    sector: "Trades education",
    context: "Independent project",
    period: "2026",
    headline: ["More qualified leads.", "Same budget."],
    summary:
      "Google Ads and Meta rebuilt around CRM-qualified leads, Microsoft Advertising added, at an unchanged ~US$900 a month.",
    problem:
      "The college needed more enrolment-ready prospects at the same budget.",
    decision:
      "Judge campaigns on CRM-qualified leads, rebuild Google Ads and Meta around them, and add Microsoft Advertising as a new intent source.",
    role: "Advised on acquisition strategy and supported the Google Ads and Meta rebuild. Deployed the AI chat assistant and added Microsoft Advertising.",
    stats: [
      { value: "+19%", count: 19, prefix: "+", suffix: "%", label: "CRM-qualified leads vs prior quarter" },
      { value: "~US$900", count: 900, prefix: "~US$", label: "monthly media budget, unchanged" },
    ],
    actions: [
      "Rebuilt Google Ads and Meta around qualified leads, with a new landing page and shorter form.",
      "Added Microsoft Advertising as a new source.",
      "Deployed an AI chat assistant.",
    ],
    note: "Client-reported before-and-after comparison of consecutive quarters, not a controlled test. Budget about US$900 a month throughout.",
    channels: ["Google Ads", "Meta Ads", "Microsoft Advertising"],
  },
];

export const caseById = Object.fromEntries(cases.map((c) => [c.id, c]));

// University campaign table (portfolio PDF, page 4).
export const university = {
  funnel: [
    { label: "Meta leads", value: 821 },
    { label: "CRM-qualified", value: 430 },
    { label: "Fee-paid enrolments", value: 312 },
  ],
  spend: "about US$6.2K media spend (US$7.61 per lead)",
  window: "All campaigns, 1 May to 31 Aug 2026",
  blended: { leads: 821, enrolled: 312, rate: 38.0, cpe: 20.02 },
  campaigns: [
    { id: "priority", name: "Priority colleges", leads: 161, enrolled: 125, rate: 77.6, cpe: 28.06 },
    { id: "retargeting", name: "Retargeting", leads: 57, enrolled: 20, rate: 35.1, cpe: 31.79 },
    { id: "broad", name: "Broad undergraduate", leads: 603, enrolled: 167, rate: 27.7, cpe: 12.59 },
  ],
  matchNote:
    "Enrolments matched on name, phone and student ID, and de-duplicated. Qualification data is available for all campaigns combined only.",
  totalsNote:
    "Campaign totals: priority 125 of 161, retargeting 20 of 57, broad undergraduate 167 of 603; 821 leads and 312 enrolments in all. Comparison between campaigns with different targeting, not a controlled lift test.",
  tradeoff:
    "The priority campaign cost more per enrolment (US$28 vs US$13 for broad) but filled the colleges that needed students, which the blended US$20 average had hidden. Retargeting converted 35.1% (20 of 57).",
};

export const aegon = {
  goLive: [
    { title: "Build", body: "Campaign structure, copy and settings built.", icon: "hammer" },
    { title: "QA", body: "Naming, UTMs and tracking checked.", icon: "scan-search" },
    { title: "Compliance", body: "Quebec and U.S. state advertising rules for financial products.", icon: "shield-check" },
    { title: "Launch", body: "Final approval, then live on Google Ads, Meta and LinkedIn.", icon: "rocket" },
    { title: "Pace", body: "Spend tracked against budget.", icon: "gauge" },
    { title: "Report", body: "Biweekly reporting to senior management.", icon: "presentation" },
  ],
  journey: [
    { title: "Prioritize", body: "Define the high-net-worth investor audience." },
    { title: "Reach", body: "Reach them on LinkedIn." },
    { title: "Enquire", body: "Enquiries captured and qualified in the CRM." },
    { title: "Meet", body: "Qualified investors speak with an advisor." },
    { title: "Prepare", body: "Paperwork and the account are prepared." },
    { title: "Fund", body: "Success is measured on funded accounts." },
  ],
  systems: [
    {
      title: "HubSpot offline conversions",
      body: "Qualified leads, booked calls and completed applications fed back to Google Smart Bidding and Meta; targeting, lead forms and landing pages rebuilt around them.",
      icon: "refresh",
    },
    {
      title: "Tracking rebuild",
      body: "GA4, GTM, Enhanced Conversions and Meta Conversions API with hashed customer data: higher Event Match Quality, double-counted conversions removed.",
      icon: "radar",
    },
    {
      title: "Automation",
      body: "A Google Apps Script campaign builder (naming, UTM, compliance QA) adopted team-wide, plus Google Ads Scripts for routine checks.",
      icon: "workflow",
    },
    {
      title: "Compliance",
      body: "Quebec and U.S. state ad rules checked before launch, with web, finance, sales, product and creative.",
      icon: "shield",
    },
    {
      title: "Budget pacing",
      body: "Dashboards that eliminated recurring wasted spend, reported biweekly to senior management.",
      icon: "gauge",
    },
  ],
};

export const approach = {
  headline: ["Signal first.", "Budget follows evidence."],
  steps: [
    { title: "Audit the signal", body: "Tracking, CRM fields, creative and search terms.", icon: "radar" },
    { title: "Define the outcome", body: "Business goal, channel mix and a focused test plan.", icon: "target" },
    { title: "Test, learn, reallocate", body: "Audiences, offers and creative, judged on outcomes.", icon: "split" },
    { title: "Report what matters", body: "Cost per customer, pipeline quality and a recommendation.", icon: "presentation" },
  ],
};

// Career history, from the résumé.
export const experience = [
  {
    org: "Aegon",
    role: "Intermediate Channel Marketing Specialist (Paid Media)",
    kind: "In-house",
    place: "Langley, BC",
    date: "Jan 2025 to Oct 2026",
    start: 2025,
    points: [
      "Launched and managed Google Ads, Meta and LinkedIn campaigns for annuity, life insurance, pension and wealth products in the U.S. and Canada.",
      "Helped develop and launch the LinkedIn ABM program targeting high-net-worth investors with the team.",
      "Connected HubSpot offline conversions to Smart Bidding and Meta: lower cost per lead and more completed applications at flat spend.",
      "Rebuilt tracking with GA4, GTM, Enhanced Conversions and Meta Conversions API.",
      "Built a Google Apps Script campaign builder adopted team-wide, cutting compliance review time.",
    ],
    footnote: "Performance figures withheld at the employer’s request.",
    clients: [],
  },
  {
    org: "Independent projects",
    role: "Freelance Marketing Consultant",
    kind: "Independent",
    place: "Greater Vancouver, BC",
    date: "Jan 2026 to Sep 2026",
    start: 2026,
    points: [
      "Saudi private university (via partner agency, May to Aug 2026): advised on Meta lead-generation strategy through to fee-paid enrolments.",
      "DIMO Academy for Technical Studies: Google Ads and Meta rebuild, AI chat assistant and Microsoft Advertising; CRM-qualified leads +19% at flat spend.",
    ],
    clients: [
      { name: "Private university, Saudi Arabia", detail: "Meta lead generation to enrolment", href: "/case-studies/university/" },
      { name: "DIMO Academy", detail: "Google Ads, Meta and Microsoft Ads", href: "/case-studies/dats/" },
    ],
  },
  {
    org: "University Canada West",
    role: "MBA, Business Administration and Management",
    kind: "Education",
    place: "Vancouver, BC",
    date: "Jun 2023 to Oct 2024",
    start: 2023,
    points: ["GPA 4.00 / 4.33."],
    clients: [],
  },
  {
    org: "Kites Global",
    role: "Digital Marketing Strategist",
    kind: "Agency",
    place: "Colombo, Sri Lanka (last 2 months remote)",
    date: "Jan 2023 to Aug 2023",
    start: 2023,
    points: [
      "Managed 4 client accounts end to end and supported 5 more across banking, retail, e-commerce and education.",
    ],
    clients: [
      { name: "Pan Asia Bank", detail: "Account lead, Meta and Google Ads", href: "/case-studies/panasia/" },
      { name: "Petmart.lk", detail: "Shopping and Performance Max", href: "/case-studies/petmart/" },
      { name: "Godrej India", detail: "30-creator influencer program and TikTok Ads" },
      { name: "B2B apparel retailer", detail: "Beat the lead target by 20%; built the Shopify store" },
    ],
  },
  {
    org: "Enfection",
    role: "Digital Marketing Intern",
    kind: "Agency",
    place: "Colombo, Sri Lanka",
    date: "Jul 2022 to Dec 2022",
    start: 2022,
    points: [
      "Supported Google Shopping, Performance Max and Meta campaigns across 3 markets.",
    ],
    clients: [
      { name: "CDB Bank", detail: "Shopping, PMax and Meta" },
      { name: "Costa Coffee Singapore", detail: "Shopping, PMax and Meta" },
      { name: "Keells", detail: "Catalogue ads; Demand Gen lifted conversions 27%" },
    ],
  },
  {
    org: "University of London",
    role: "BSc (Hons), Management and Digital Innovation",
    kind: "Education",
    place: "",
    date: "Sep 2019 to Jun 2022",
    start: 2019,
    points: [],
    clients: [],
  },
];

// Toolkit: kept exactly as the current site lists it, at the owner's request.
export const stackGroups = [
  {
    id: "paid",
    name: "Paid media platforms",
    tools: ["Google Ads", "Meta Ads", "Microsoft Advertising", "LinkedIn Ads", "TikTok Ads"],
  },
  {
    id: "analytics",
    name: "Analytics & tracking",
    tools: [
      "Google Analytics 4",
      "Google Search Console",
      "Google Tag Manager",
      "Microsoft Clarity",
      "Looker Studio",
      "Ahrefs",
      "SEMrush",
      "Zapier",
      "Screaming Frog",
    ],
  },
  {
    id: "productivity",
    name: "Productivity, systems & project management",
    tools: ["Microsoft 365", "Google Workspace", "Asana", "ClickUp", "Notion", "Dynamics 365", "Jira"],
  },
  { id: "email", name: "Email & CRM", tools: ["HubSpot", "Mailchimp", "Klaviyo"] },
  { id: "cms", name: "CMS, e-commerce & design", tools: ["Shopify", "Canva"] },
];

export const certifications = [
  { title: "Google Ads Search", issuer: "Google", year: "2026", domain: "google.com" },
  { title: "Google Ads Measurement", issuer: "Google", year: "2026", domain: "google.com" },
  { title: "Meta Marketing Analytics", issuer: "Meta", domain: "meta.com" },
  { title: "Data Analysis with Spreadsheets and SQL", issuer: "Coursera", domain: "coursera.org" },
  { title: "Google AI Essentials", issuer: "Google", domain: "google.com" },
  { title: "Email Marketing", issuer: "HubSpot", domain: "hubspot.com" },
];

export const languages = ["English", "Sinhala"];

export { testimonials } from "../testimonials.js";
