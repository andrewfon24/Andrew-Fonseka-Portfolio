// Public case summaries. Confidential LinkedIn ABM figures are excluded.
export const caseBriefs = {
  university: {
    result:
      "312 fee-paid enrolments at approximately US$20 in media spend each, from Meta campaigns matched to admissions outcomes.",
    stats: [
      ["312", "Fee-paid enrolments"],
      ["~US$20", "Media cost / enrolment"],
    ],
    role: "Strategy, build, creative testing, optimization and CRM reporting, delivered through partner agency SOL.",
    problem:
      "Two colleges needed more students. A broad undergraduate campaign brought enquiries, but only 17 enrolments for those priority colleges.",
    actions: [
      "Gave the two priority colleges a dedicated campaign and budget.",
      "Tested creative and higher-intent lead forms to improve enquiry quality.",
      "Matched leads to fee-paid enrolments in the CRM and removed duplicates.",
    ],
    caveat:
      "The dedicated campaign produced 125 enrolments versus 17 from the broad campaign for the same colleges. Different targeting means this is a comparison, not a controlled test.",
  },
  aegon: {
    result:
      "13% lower cost per lead and 18% more completed applications at unchanged Google and Meta media spend in H1 2026.",
    stats: [
      ["−13%", "Cost per lead"],
      ["+18%", "Completed applications"],
    ],
    role: "Paid media across 50 US and Canadian business units, with forecasts for Director sign-off and biweekly reporting to the CMO.",
    problem:
      "Form fills obscured lead quality. Duplicate conversion events made it harder to see which campaigns were delivering useful outcomes.",
    actions: [
      "Connected HubSpot CRM-qualified outcomes to campaign optimization.",
      "Removed duplicate conversions and rebuilt tracking across Google and Meta.",
      "Refined targeting, forms and budget allocation using CRM evidence.",
      "Built a rules-based campaign tool that flags issues for human review and Director approval.",
    ],
    caveat:
      "Reported before-and-after acquisition changes, not a controlled lift test. Each chart uses its own baseline. These figures are separate from the confidential LinkedIn ABM program.",
  },
  panasia: {
    result:
      "259 funded gold loans from US$25,000 in media spend, equivalent to approximately US$97 per funded loan.",
    stats: [
      ["259", "Funded gold loans"],
      ["~US$97", "Media cost / funded loan"],
    ],
    role: "Account lead at Kites Global: campaign strategy, the Meta video pitch and client calls through delivery.",
    problem:
      "Pan Asia Bank needed borrowers in a competitive gold-loan market. A fixed budget had to produce useful enquiries that became funded loans.",
    actions: [
      "Presented the Meta video strategy to the client.",
      "Allocated 60% to Meta and 40% to Google based on cost and lead quality.",
      "Reviewed funded loans matched to campaign leads to judge the outcome.",
    ],
    caveat:
      "Funded loans are client-reported. The chart shows media spend, not loans by channel. Loan principal lent is not bank revenue or profit.",
  },
  petmart: {
    result:
      "About $4 of first-order sales for every $1 of Google Shopping and Performance Max ad spend, alongside growth in sales and subscriptions.",
    stats: [
      ["4:1", "First-order ROAS"],
      ["+40%", "Paid-attributed sales"],
      ["+30%", "Subscriptions"],
    ],
    role: "Paid media delivery at Kites Global across Google Shopping, Performance Max and supporting Meta campaigns.",
    problem:
      "Petmart.lk needed new customers and more subscriptions. Its account structure did not clearly separate acquisition from returning-customer activity.",
    actions: [
      "Separated new and returning customers in Shopping and Performance Max.",
      "Ran complementary Meta campaigns alongside Google activity.",
      "Reviewed first-order return alongside paid-attributed sales and subscriptions.",
    ],
    caveat:
      "Client-reported April–June 2023 figures. Sales growth is quarter over quarter; subscription growth is a separate measure. Neither proves incremental lift, and ROAS excludes lifetime value.",
  },
  dats: {
    result:
      "20% more CRM-qualified leads at unchanged media spend, after rebuilding acquisition and improving the enquiry experience.",
    stats: [
      ["+20%", "CRM-qualified leads"],
      ["~US$900", "Monthly media budget"],
    ],
    role: "Independent delivery across paid media, the landing page and integration of Fin, an AI enquiry assistant.",
    problem:
      "DIMO Academy needed more enrolment-ready prospects on the same budget, plus a useful response when the admissions team was away.",
    actions: [
      "Rebuilt Google and Meta campaigns and added Microsoft Advertising.",
      "Simplified the landing page and form to make enquiries easier.",
      "Integrated Fin for questions, appointment booking and admissions reminders.",
    ],
    caveat:
      "Client-reported before-and-after results, not a controlled test. Indexed values show relative change, not lead counts. Fin’s response-time comparison is documented in the evidence below.",
  },
};
