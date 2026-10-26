export const caseStories = {
  university: {
    intro:
      "A university intake campaign where the most useful result was hidden behind the cheapest lead.",
    problem: [
      "The university needed to fill places in two colleges with the lowest intakes. Broad undergraduate targeting brought in enquiries, but the distribution of those enquiries did not match the admissions team’s priorities.",
      "The broad campaign looked attractive on cost per lead. Yet it produced only 17 enrolments for the two priority colleges. That made a blended CPL an incomplete measure of success: the account needed students in specific programs, not just more names in a lead list.",
    ],
    actions: [
      [
        "Separate the priority",
        "I gave the two colleges a dedicated campaign and their own budget, rather than relying on the broad undergraduate campaign to fill every program.",
      ],
      [
        "Ask for stronger intent",
        "I used high-intent Meta lead forms and A/B-tested creative, giving the priority campaign a clearer acquisition brief.",
      ],
      [
        "Close the loop with admissions",
        "I connected campaign reporting to admissions CRM outcomes and compared campaigns on fee-paid enrolments, alongside lead costs.",
      ],
    ],
    result: [
      "The priority-colleges campaign generated 125 fee-paid enrolments from 161 leads: a 77.6% lead-to-enrolment rate at US$28.06 per enrolment. Its US$21.79 CPL was more than six times the broad campaign’s US$3.49, but it delivered the intake the university needed.",
      "Across all three campaigns, 821 Meta leads became 430 CRM-qualified leads and 312 fee-paid enrolments, at US$20.02 per enrolment. The priority campaign and broad campaign served different intake needs, so their rates should be read in that context.",
    ],
    takeaway:
      "A cheap lead only helps if it becomes the student the institution needs.",
    sourcePage: 5,
  },
  petmart: {
    intro:
      "Connecting first-order acquisition to a retail business that also depends on customers coming back.",
    problem: [
      "Petmart.lk needed stronger e-commerce acquisition and more subscription customers. The campaign structure did not clearly distinguish prospecting from returning-customer activity, leaving room to make the role of each campaign clearer.",
      "The task was to support both first purchases and repeat commerce. A single acquisition figure would not tell the whole story, so the outcome needed to include sales and subscription growth alongside first-order advertising return.",
    ],
    actions: [
      [
        "Rebuild the acquisition structure",
        "At Kites Global, I restructured Google Shopping and Performance Max to address the retailer’s acquisition challenge.",
      ],
      [
        "Support the channel mix",
        "I ran complementary Meta campaigns alongside the Google activity, connecting paid search and social to the wider retail brief.",
      ],
      [
        "Read beyond the first order",
        "I assessed the work using first-order ROAS together with the client’s sales and subscription results over the three-month reporting period.",
      ],
    ],
    result: [
      "From April to June 2023, the client reported 4:1 first-order ROAS from Google Shopping and Performance Max, 40% sales growth and 30% subscription growth.",
      "Those figures describe the reported business performance over the period. They do not isolate how much growth advertising caused, and the first-order ROAS figure does not represent lifetime customer value.",
    ],
    takeaway:
      "Acquisition is more useful when the strategy also makes room for the next purchase.",
    sourcePage: 4,
  },
  panasia: {
    intro:
      "A fixed media budget, a competitive lending market, and a decision grounded in the quality of the lead.",
    problem: [
      "Pan Asia Bank needed to win borrowers in Sri Lanka’s competitive gold-loan market with a fixed US$25,000 media budget. Generating enquiries was only the beginning: the business needed those enquiries to become funded loans.",
      "Channel selection therefore had to account for lead quality as well as cost. Meta was producing higher-quality leads at a lower CPL than Google Ads, creating a practical signal for how to allocate the budget.",
    ],
    actions: [
      [
        "Read the quality signal",
        "Working at Kites Global, I used the difference in cost and lead quality between Meta and Google Ads to guide the media mix.",
      ],
      [
        "Allocate to the evidence",
        "I set a 60% Meta / 40% Google Ads split. On the US$25,000 budget, that represents US$15,000 and US$10,000 respectively.",
      ],
      [
        "Judge the business outcome",
        "I evaluated the campaign against funded gold loans rather than treating every form submission as an equally valuable result.",
      ],
    ],
    result: [
      "The client reported 259 funded gold loans and US$500,000 in loan principal lent from US$25,000 in media spend. Dividing media spend by funded loans gives approximately US$96.53 per funded loan, rounded to US$97.",
      "Loan principal is the amount lent to borrowers. It is not bank revenue or profit, so the loan-value-to-media ratio is not presented as ROAS. The supplied results do not break funded loans down by channel.",
    ],
    takeaway:
      "Keep CPL in the report. Let funded outcomes guide the allocation decision.",
    sourcePage: 3,
  },
  dats: {
    intro:
      "Improving the traffic and the enquiry experience before asking for a bigger budget.",
    problem: [
      "DIMO Academy for Technical Studies needed more enrolment-ready prospects without increasing an approximately US$900 monthly media budget. Raw form fills were not enough to show whether acquisition was attracting the right students.",
      "CRM-qualified leads in Microsoft Dynamics 365 provided a more useful signal. The opportunity was to improve both the channel mix and the path from an ad click to a useful conversation with the academy.",
    ],
    actions: [
      [
        "Rebuild the traffic mix",
        "I rebuilt Google Ads and Meta lead generation and added Microsoft Advertising to the acquisition mix.",
      ],
      [
        "Simplify the enquiry",
        "I rebuilt the landing page in Lovable and simplified the lead form, addressing the conversion experience alongside campaign performance.",
      ],
      [
        "Keep enquiries moving",
        "I added an AI assistant that answers enquiries around the clock, including after hours, and used CRM-qualified leads to assess the outcome.",
      ],
    ],
    result: [
      "The client reported a 20% increase in CRM-qualified leads at approximately unchanged spend. Indexed to 100 before the rebuild, that becomes 120 afterward; these are comparison indices, not raw lead counts.",
      "The AI assistant replied four times faster than manual staff responses. Microsoft Advertising contributed 40% of 212 leads in my second quarter on the account. That share describes all leads in the reported quarter, rather than a breakdown of the CRM-qualified improvement.",
    ],
    takeaway:
      "Better media and a clearer conversion path can work together within the same budget.",
    sourcePage: 6,
  },
  aegon: {
    intro:
      "Making the conversion data trustworthy and the campaign workflow repeatable across a large account remit.",
    problem: [
      "At Aegon, I own bidding and campaign structure for 50 US and Canadian business-unit ad accounts and co-manage about 100 more, forecasting channel allocations for Director sign-off. A program at that scale needs reliable conversion signals and consistent campaign operations.",
      "Overlapping GTM tags and triggers had caused double-counted events and conversions. At the same time, campaign setup needed consistent naming, UTMs and compliance controls. Both issues affected how confidently the team could operate and interpret performance.",
    ],
    actions: [
      [
        "Make the signal trustworthy",
        "I implemented GA4, server-side GTM, Enhanced Conversions and Meta CAPI, improved browser-to-server event deduplication, and removed double-counted conversions.",
      ],
      [
        "Move bidding down the funnel",
        "I connected HubSpot offline conversions, including qualified leads, booked calls and completed applications, to Google Ads Smart Bidding and Meta optimization. I also built LinkedIn ABM activity using Matched Audiences, Thought Leader Ads and carousel creative.",
      ],
      [
        "Make execution repeatable",
        "I built a Google Apps Script campaign builder with naming, UTM and compliance controls. It was adopted team-wide. I also supervise two external agency partners (strategy, build and optimization reviews) and present biweekly performance reports to the CMO.",
      ],
    ],
    result: [
      "Reported acquisition outcomes include a 13% reduction in cost per lead and an 18% increase in completed applications. These are relative changes; absolute figures remain confidential.",
      "The campaign builder reduced compliance review time by 60%, with an estimated 12 working days saved annually. Measurement work improved Meta Event Match Quality by 25% relative to the previous level, rather than by 25 percentage points.",
      "These are the operational and measurement figures approved for public discussion. Absolute budgets, pipeline values and acquisition figures remain confidential; the diagrams below explain the work without exposing internal dashboards or inventing substitute data.",
    ],
    takeaway:
      "Reliable signals and consistent execution give a large program a stronger basis for decisions.",
    sourcePage: 7,
  },
};

export const universityCampaigns = [
  {
    name: "Priority colleges",
    leads: 161,
    enrolled: 125,
    rate: "77.6%",
    cpl: "US$21.79",
    cpe: "US$28.06",
  },
  {
    name: "Broad undergraduate",
    leads: 603,
    enrolled: 167,
    rate: "27.7%",
    cpl: "US$3.49",
    cpe: "US$12.59",
  },
  {
    name: "Retargeting",
    leads: 57,
    enrolled: 20,
    rate: "35.1%",
    cpl: "US$11.15",
    cpe: "US$31.79",
  },
];
