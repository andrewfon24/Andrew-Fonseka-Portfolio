export const projects = [
  {
    id: "university",
    category: "Education",
    client: "Private university · Saudi Arabia",
    period: "May–Aug 2026",
    context: "Contract · via partner agency SOL",
    title: "From interest to intake.",
    summary: "A sharper signal. A stronger student pipeline.",
    metric: "312",
    metricLabel: "fee-paid enrolments",
    secondary: "~US$20",
    secondaryLabel: "per enrolment",
    channels: ["Meta Ads", "CRM outcomes"],
    problem:
      "Two colleges had the lowest intakes. Broad targeting was generating leads, but not enough enrolments in the programs that needed them.",
    decision:
      "Built a dedicated campaign with high-intent lead forms, its own budget and A/B-tested creative. Connected campaign reporting to admissions CRM outcomes.",
    learning:
      "The cheapest lead is not always the most valuable one. A higher CPL delivered the enrolments the priority colleges actually needed.",
    note: "Meta Ads Manager, 1 May–31 Aug 2026. Fee-paid enrolments from the admissions CRM. USD converted at SAR 3.75. Institution identifiers removed.",
    stats: [
      ["821", "Meta leads"],
      ["430", "CRM-qualified leads"],
      ["312", "Fee-paid enrolments"],
      ["38.0%", "Lead → enrolment"],
    ],
  },
  {
    id: "petmart",
    category: "E-commerce",
    client: "Petmart.lk",
    period: "Apr–Jun 2023",
    context: "Kites Global · agency",
    title: "First orders. Lasting customers.",
    summary: "Acquisition connected to repeat commerce.",
    metric: "4:1",
    metricLabel: "first-order ROAS",
    secondary: "+40%",
    secondaryLabel: "sales growth",
    channels: ["Google Shopping", "Performance Max", "Meta"],
    problem:
      "The pet-supplies retailer needed stronger acquisition and more subscription customers. Campaigns did not clearly separate prospecting from returning-customer activity.",
    decision:
      "Restructured Google Shopping and Performance Max, with complementary Meta campaigns supporting the acquisition mix.",
    learning:
      "Acquisition becomes more valuable when the strategy also makes room for repeat purchases and subscriptions.",
    note: "Client-reported results over April–June 2023. 4:1 first-order ROAS for Google Shopping and Performance Max. Sales and subscription changes are not measures of incremental lift.",
    stats: [
      ["4:1", "First-order ROAS"],
      ["+40%", "Sales"],
      ["+30%", "Subscriptions"],
      ["3 months", "Reporting period"],
    ],
  },
  {
    id: "panasia",
    category: "Financial services",
    client: "Pan Asia Bank",
    period: "2023",
    context: "Kites Global · agency",
    title: "Follow the leads that become loans.",
    summary: "Lead quality made the allocation decision.",
    metric: "259",
    metricLabel: "funded gold loans",
    secondary: "~US$97",
    secondaryLabel: "media cost per funded loan",
    channels: ["Meta Ads", "Google Ads"],
    problem:
      "Win borrowers in Sri Lanka’s competitive gold-loan market on a fixed media budget.",
    decision:
      "Allocated 60% to Meta and 40% to Google Ads based on cost and lead quality. Evaluated performance against funded loans, not form submissions.",
    learning:
      "A low cost per lead means little until qualified leads become funded loans.",
    note: "Funded loans and US$500K principal lent are client-reported. US$25K media spend. Loan value is not bank revenue or profit; the loan-value-to-media ratio is not ROAS.",
    stats: [
      ["259", "Funded loans"],
      ["~US$97", "Media cost / funded loan"],
      ["US$25K", "Media spend"],
      ["US$500K", "Loan principal lent"],
    ],
  },
  {
    id: "dats",
    category: "Education",
    client: "DIMO Academy of Technical Studies",
    period: "Feb 2026–present",
    context: "Independent · trades education",
    title: "More qualified. Same budget.",
    summary: "Better acquisition, a simpler path to enrolment.",
    metric: "+20%",
    metricLabel: "CRM-qualified leads",
    secondary: "4×",
    secondaryLabel: "faster enquiry responses",
    channels: ["Google Ads", "Microsoft Ads", "Meta"],
    problem:
      "Generate more enrolment-ready prospects without increasing an approximately US$900 monthly media budget.",
    decision:
      "Rebuilt Google and Meta lead generation, added Microsoft Advertising, and rebuilt the landing page with a simpler form and an AI assistant for around-the-clock enquiries.",
    learning:
      "Improve the traffic and the conversion path together before asking for more budget.",
    note: "Lead counts and response times supplied by the client. Before-and-after comparison, not a controlled test. Microsoft Advertising delivered 40% of 212 leads in the second quarter on the account.",
    stats: [
      ["+20%", "CRM-qualified leads"],
      ["4×", "Faster response"],
      ["40%", "Leads from Microsoft Ads"],
      ["~US$900", "Monthly media budget"],
    ],
  },
  {
    id: "aegon",
    category: "Financial services",
    client: "Aegon",
    period: "Jan 2025–present",
    context: "In-house · US & Canada",
    title: "Better signals. Smarter scale.",
    summary: "Measurement and operations across 50+ ad accounts.",
    metric: "−60%",
    metricLabel: "compliance review time",
    secondary: "+25%",
    secondaryLabel: "Meta Event Match Quality",
    channels: ["LinkedIn ABM", "Google Ads", "Measurement"],
    problem:
      "Support a seven-figure annual paid media program across US and Canadian business units with reliable measurement and consistent campaign operations.",
    decision:
      "Connected HubSpot offline conversions, implemented GA4 and server-side GTM, improved event deduplication, and built an Apps Script campaign builder with naming, UTM and compliance controls.",
    learning:
      "Trustworthy conversion signals and repeatable operations make better decisions possible at scale.",
    note: "Relative changes in cost per lead (−13%) and completed applications (+18%) were supplied in Andrew’s updated case-study reference. Absolute budgets and performance figures remain confidential. Event Match Quality is a relative improvement. Approximately 12 working days saved annually is an estimate associated with the campaign builder.",
    stats: [
      ["50+", "Business-unit ad accounts"],
      ["−60%", "Compliance review time"],
      ["~12 days", "Working time saved / year"],
      ["+25%", "Meta Event Match Quality"],
    ],
  },
];

export const capabilities = [
  {
    name: "Paid media",
    title: "Right channel. Real intent.",
    description:
      "Search, social and account-based campaigns built around the outcome that matters.",
    tools: [
      "Google Ads",
      "Microsoft Advertising",
      "Meta Ads",
      "LinkedIn Ads",
      "TikTok Ads",
    ],
    points: [
      "Search · Shopping · Performance Max",
      "Lead generation · Retargeting · ABM",
      "Budget allocation · Creative testing",
    ],
    supporting: {
      label: "Research & creative",
      tools: ["Ahrefs", "Semrush", "Canva"],
    },
    icon: "target",
  },
  {
    name: "Measurement",
    title: "Give the algorithm a better signal.",
    description:
      "Connect the click to the CRM, so optimization follows qualified leads and customers.",
    tools: [
      "GA4",
      "Google Tag Manager",
      "Meta CAPI",
      "Looker Studio",
      "Microsoft Clarity",
    ],
    points: [
      "Offline conversions · Event deduplication",
      "CRM outcomes · Call tracking",
      "Measurement audits · Reporting",
    ],
    supporting: {
      label: "Reporting & collaboration",
      tools: ["Microsoft 365", "Google Workspace"],
    },
    icon: "chart",
  },
  {
    name: "Automation",
    title: "Less repetition. More momentum.",
    description:
      "Build practical systems that free up time for the decisions only a marketer can make.",
    tools: ["Zapier", "Lovable"],
    points: [
      "Campaign builders · UTM standards",
      "AI enquiry assistants · Landing pages",
      "Compliance controls · Budget pacing",
    ],
    supporting: {
      label: "Planning & workflow",
      tools: ["Notion", "ClickUp", "Asana"],
    },
    icon: "zap",
  },
  {
    name: "CRM & lifecycle",
    title: "Keep the customer journey connected.",
    description:
      "Bring acquisition, qualification and follow-up into the same conversation.",
    tools: ["HubSpot", "Dynamics 365", "Klaviyo", "Mailchimp", "Shopify"],
    points: [
      "CRM-qualified lead signals",
      "Email campaigns · Subscription growth",
      "Lead-to-enrolment reporting",
    ],
    icon: "workflow",
  },
];

export const experience = [
  {
    company: "Independent, Self-employed (project-based)",
    role: "Paid Media Consultant",
    date: "2026 – Present",
    type: "Part-time",
    location: "Greater Vancouver, BC",
    description:
      "Paid media for seven clients across education, landscaping, automotive and restaurants, alongside my full-time role. Some engagements are delivered through a partner agency.",
    tags: ["7 clients", "4 industries", "Lead generation"],
  },
  {
    company: "Aegon",
    role: "Digital Marketing Specialist",
    date: "2025 – Present",
    type: "In-house",
    location: "Langley, BC",
    description:
      "Own bidding, budget allocation and campaign structure across 50+ US and Canadian ad accounts. Guide two agency partners and report biweekly to the CMO.",
    tags: ["Financial services", "LinkedIn ABM", "Measurement"],
  },
  {
    company: "University Canada West",
    role: "Master of Business Administration (MBA)",
    date: "Aug 2023 – Oct 2024",
    type: "Education",
    location: "Vancouver, BC",
    description:
      "Completed my MBA between my agency role at Kites Global and my move into in-house marketing in Canada.",
    tags: ["MBA", "GPA 4.00 / 4.33"],
  },
  {
    company: "Kites Global",
    role: "Digital Marketing Strategist",
    date: "Jan – Aug 2023",
    type: "Agency",
    location: "Colombo, Sri Lanka",
    description:
      "Led four client accounts end to end and supported five more across banking, consumer goods, retail, beauty and education. Owned strategy, execution, budgets and reporting.",
    tags: ["4 accounts led", "5 supported", "B2B & B2C"],
  },
  {
    company: "Enfection",
    role: "Digital Marketing Intern",
    date: "Jul – Dec 2022",
    type: "Agency",
    location: "Colombo, Sri Lanka",
    description:
      "Supported campaign setup, search-term reviews and reporting for Keells Super, Rocell, CDB Bank and Costa Coffee Singapore.",
    tags: ["Google Shopping", "Performance Max", "Meta"],
  },
  {
    company: "University of London",
    role: "BSc (Hons), Management & Digital Innovation",
    date: "Sep 2019 – Jun 2022",
    type: "Education",
    description:
      "Completed my bachelor’s in Management & Digital Innovation before beginning my agency career.",
    tags: ["Management", "Digital innovation"],
  },
];

export const testimonials = [
  {
    quote:
      "Andrew is a highly dedicated and responsible professional who consistently demonstrated a deep understanding of digital marketing principles. Any task assigned to him—whether it was campaign execution, analytics reporting, or content creation—was always handled with remarkable attention to detail and delivered at an exceptional standard.",
    name: "Don Chanaka Perera",
    role: "Managed Andrew directly · Kites Global",
    initials: "DP",
  },
  {
    quote:
      "His creativity, analytical skills, and proactive approach consistently elevated our marketing campaigns. A true team player with a positive attitude, Andrew brought fresh ideas and delivered results.",
    name: "Hashan Nalinda Fernando",
    role: "Performance Marketing Strategist · Enfection",
    initials: "HF",
  },
];
