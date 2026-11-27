// Single source for public site copy. Figures match Andrew’s résumé and portfolio
// PDFs (Drive masters dated 27 Nov 2026) in public/documents. See docs/career-facts.md.

export const profile = {
  name: 'Andrew Fonseka',
  title: 'Paid Media Specialist',
  email: 'andrew@andrewfonseka.com',
  mailto: 'mailto:andrew@andrewfonseka.com?subject=Paid%20Media%20Specialist%20role%20%E2%80%93%20introduction',
  linkedin: 'https://www.linkedin.com/in/andrewfonseka/',
  recommendations: 'https://www.linkedin.com/in/andrewfonseka/details/recommendations/',
  site: 'https://andrewfonseka.com',
  resume: '/documents/Andrew_Fonseka_Resume.pdf',
  portfolio: '/documents/Andrew_Fonseka_Portfolio.pdf',
};

export const brand = (file) => `/images/brands/${file}.svg`;

// Aegon comparison window, written the same way on the site and in the PDFs.
export const periods = { aegon: 'H2 2025 to H1 2026' };

export const metrics = [
  { value: '−15%', label: 'cost per lead at flat spend', source: 'Aegon, H2 2025 to H1 2026', href: '/case-studies/aegon/', lead: true },
  { value: '+17 pts', label: 'qualified lead rate', source: 'Aegon, H2 2025 to H1 2026', href: '/case-studies/aegon/' },
  { value: '259', label: 'funded gold loans', source: 'Pan Asia Bank, ~2.4× prior monthly volume', href: '/case-studies/panasia/' },
  { value: '22', label: 'colleagues used my campaign builder', source: 'Aegon, ~200 campaigns launched', href: '/case-studies/aegon/' },
];

// Toolkit and certifications match the portfolio PDF (toolkit) and résumé (certifications).
export const toolGroups = [
  [
    { name: 'Ad platforms', tools: [['Google Ads', 'google-ads'], ['Meta Ads', 'meta-icon'], ['LinkedIn Ads', 'linkedin-icon']] },
    { name: 'Google Ads campaign types', tools: [['Search', 'google-ads'], ['Shopping', 'google-ads'], ['Performance Max', 'google-ads'], ['Demand Gen', 'google-ads'], ['YouTube (Video)', 'google-ads']] },
  ],
  [
    { name: 'Measurement and tracking', tools: [['GA4', 'google-analytics'], ['Server-side GTM', 'google-tag-manager'], ['Enhanced Conversions', 'google-ads'], ['Meta CAPI', 'meta-icon'], ['Meta Conversion Lift', 'meta-icon'], ['Looker Studio', 'looker-icon']] },
    { name: 'CRM and automation', tools: [['HubSpot', 'hubspot-symbol'], ['Merchant Center', 'google-icon'], ['Shopify', 'shopify-symbol'], ['Google Ads API', 'google-ads'], ['Google Apps Script', 'google-apps-script'], ['Google Ads Scripts', 'google-ads'], ['Zapier', 'zapier-icon']] },
  ],
];

export const certifications = [
  ['Google Ads Search', 'Google, 2026', 'google-icon'],
  ['Google Ads Measurement', 'Google, 2026', 'google-icon'],
  ['Meta Marketing Analytics', 'Meta', 'meta-icon'],
];

export const career = [
  { years: '2025 to 2026', org: 'Aegon, Langley, BC', role: 'Intermediate Channel Marketing Specialist (Paid Media). 50+ insurance and investment products in Canada and the U.S. Connected the CRM to bidding.', icon: 'building', current: true },
  { years: '2023 to 2024', org: 'University Canada West, Vancouver', role: 'MBA. Moved to Canada and completed my MBA, July 2023 to October 2024.', icon: 'cap' },
  { years: '2023', org: 'Kites Global, Colombo', role: 'Digital Marketing Strategist. Ran four client accounts. Learned to judge campaigns by sales, not leads.', icon: 'briefcase' },
  { years: '2022', org: 'Enfection, Colombo', role: 'Digital Marketing Intern. Shopping, Performance Max and Discovery for CDB Bank, Costa Coffee Singapore and Keells.', icon: 'spark' },
  { years: 'Graduated June 2022', org: 'University of London', role: 'BSc (Hons), Management and Digital Innovation.', icon: 'book' },
];

export const references = [
  { quote: 'Any task assigned to him—whether it was campaign execution, analytics reporting, or content creation—was always handled with remarkable attention to detail and delivered at an exceptional standard.', name: 'Don Chanaka Perera', role: 'Managed Andrew directly at Kites Global', initials: 'DP' },
  { quote: 'His creativity, analytical skills, and proactive approach consistently elevated our marketing campaigns.', name: 'Hashan Fernando', role: 'Performance Marketing Strategist, worked with Andrew at Enfection', initials: 'HF' },
  { quote: 'He showed great talent in learning Digital marketing and leveraging AI to refine the strategies, keywords, and tactics.', name: 'Nabi Zadeh', role: 'Senior Director, Analytics and Insights, Klick; Andrew’s MBA instructor', initials: 'NZ' },
];

export const stories = [
  {
    id: 'aegon',
    number: 1,
    short: 'Aegon',
    meta: 'Aegon, insurance and investments, Google, Meta and LinkedIn, Canada and U.S., 2025 to 2026',
    title: 'First, make the numbers match. Then make them grow.',
    lede: 'Three platforms counted leads three different ways, and none of them agreed with HubSpot. I fixed the count, taught bidding what a good lead looks like, and then fixed the leads themselves.',
    description: 'How Andrew Fonseka cut cost per lead 15% at flat spend and raised the qualified lead rate 17 percentage points for Aegon (H2 2025 to H1 2026) by connecting HubSpot to Google, Meta and LinkedIn bidding.',
    next: { id: 'panasia', teaser: 'When the scoreboard is a funded loan, not a lead' },
  },
  {
    id: 'panasia',
    number: 2,
    short: 'Pan Asia Bank',
    meta: 'Pan Asia Bank, banking, Meta and Google, Sri Lanka, February to June 2023',
    title: 'Gold in a drawer earns nothing. That was the idea.',
    lede: 'The bank needed funded gold loans. Cost per lead was the easy scoreboard, but a lead isn’t a loan, so I moved the budget toward the leads that became loans.',
    description: 'How Andrew Fonseka helped Pan Asia Bank fund 259 gold loans at US$97 of media each, about 2.4 times its prior monthly volume.',
    next: { id: 'godrej', teaser: 'One joke on a crowded beauty shelf' },
  },
  {
    id: 'godrej',
    number: 3,
    short: 'Godrej',
    meta: 'Godrej Expert Rich Crème, consumer goods, Meta and YouTube, India, 2023',
    title: 'Error 404: grey hair not found.',
    lede: 'A hair colour launch on one of India’s most crowded beauty shelves. A 404 joke got stopped for, thirty creators posted it, and I ran Meta and YouTube behind them.',
    description: 'How a 404 joke and 30 creators turned a US$30K paid media budget into about US$350K in promo-code-tracked sales for Godrej Expert Rich Crème.',
    next: { id: 'petmart', teaser: 'The Valentine’s date where the dog was invited' },
  },
  {
    id: 'petmart',
    number: 4,
    short: 'Petmart',
    meta: 'Petmart × Sugar Beach, pet retail, Instagram, Facebook and Google, Sri Lanka, January to April 2023',
    title: 'Valentine’s date? Bring the dog.',
    lede: 'Pet owners don’t want to leave the dog at home on date night. So we invited it, then turned the attention into always-on Shopping and Performance Max.',
    description: 'How a Valentine’s partnership with Sugar Beach drove US$25K in coupon-tracked sales for Petmart, followed by 4:1 ROAS on Shopping and Performance Max.',
    next: null,
  },
];
