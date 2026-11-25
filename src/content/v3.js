// Single source for public site copy: homepage tiles, problem cards, case cards,
// case pages and the PDF documents all read from here, so figures cannot drift.
// Public claims only. The full claims register (sources, permissions, private
// values) lives outside this public repository. See docs/career-facts.md.

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

// Comparison windows, written out in full wherever a figure appears.
export const periods = {
  aegon: 'Jul–Dec 2025 vs Jan–Jun 2026',
  aegonLong: 'July–December 2025 compared with January–June 2026',
  panasia: 'Feb–Jun 2023',
  godrej: 'Feb–Jul 2023',
  petmart: 'Feb–May 2023',
};

export const metrics = [
  { value: '−18%', label: 'cost per application', source: `Aegon, ${periods.aegon}, same media spend`, href: '/case-studies/aegon/#outcome', lead: true },
  { value: '+17 pp', label: 'qualified lead rate', source: `Aegon, same periods. Percentage points, not percent`, href: '/case-studies/aegon/#outcome' },
  { value: '~2.4×', label: 'monthly funded loans', source: 'Pan Asia Bank, 259 loans vs the bank’s prior estimate', href: '/case-studies/panasia/#outcome' },
  { value: '4×', label: 'ROAS across the campaign', source: `Petmart, ${periods.petmart}, ad revenue ÷ all US$5K media spend`, href: '/case-studies/petmart/#outcome' },
];

export const problems = [
  {
    id: 'measurement',
    label: 'Measurement and optimization',
    client: 'Aegon',
    title: 'The ad platforms and the CRM disagreed.',
    problem: 'Platform counts and HubSpot outcomes didn’t line up, so campaign quality was hard to judge.',
    did: 'I led the tracking implementation with colleagues, helped connect CRM lead stages to campaign decisions and contributed to lead-form testing.',
    outcome: [['−18%', 'cost per application'], ['+17 pp', 'qualified lead rate']],
    note: `${periods.aegon}. Same media spend, consistent measurement. A team result across several changes.`,
    chart: { title: 'Cost per application, indexed', rows: [['Jul–Dec 2025', 100, '100'], ['Jan–Jun 2026', 82, '82']] },
    href: '/case-studies/aegon/#measurement',
    cta: 'Read the measurement case',
  },
  {
    id: 'budget',
    label: 'Account ownership',
    client: 'Pan Asia Bank',
    title: 'The client wanted cheaper leads. The business needed funded loans.',
    problem: 'The bank questioned our cost per lead, but cost per lead couldn’t show which leads became loans.',
    did: 'I owned strategy, execution, optimization and client reporting, with manager support. I used qualification data and sales feedback to defend the targeting and reviewed channel budgets monthly.',
    outcome: [['259', 'funded gold loans, bank CRM reported'], ['~2.4×', 'prior monthly paid-media volume']],
    note: 'Feb–Jun 2023 vs the bank’s estimate for the previous six months. Not a controlled test; earlier spend unavailable.',
    chart: { title: 'Funded loans per month', rows: [['Before (estimate)', 21.2, '~21.2'], ['Campaign', 51.8, '51.8']] },
    href: '/case-studies/panasia/#budget-decision',
    cta: 'Read the budget decision',
  },
  {
    id: 'acquisition',
    label: 'Campaign leadership and e-commerce',
    client: 'Petmart',
    title: 'A one-day event doesn’t build a customer base.',
    problem: 'Petmart wanted Valentine’s Day attention and in-store sales, then ongoing online customers.',
    did: 'I led a dog-friendly Valentine’s date night with Sugar Beach (giveaway, event and US$500 of paid promotion), then built the Merchant Center feed and ran Shopping and Performance Max with customer acquisition goals.',
    outcome: [['US$25K', 'in-store sales on event coupons'], ['4×', 'ROAS across the campaign']],
    note: `${periods.petmart}. ROAS = ad-attributed revenue ÷ all US$5K media spend. Coupon sales are counted separately and reflect the whole event, not ads alone.`,
    phases: [['Jan', 'Giveaway'], ['Feb 14', 'Event'], ['Mar–May', 'Always-on']],
    href: '/case-studies/petmart/#acquisition',
    cta: 'Read the Petmart case',
  },
];

export const toolGroups = [
  [
    { name: 'Paid media platforms', tools: [['Google Ads', 'google-ads'], ['Meta Ads', 'meta-icon'], ['Microsoft Advertising', 'bing'], ['LinkedIn Ads', 'linkedin-icon'], ['TikTok Ads', 'tiktok-icon']] },
    { name: 'Productivity, project management & automation', tools: [['Microsoft 365', 'microsoft-365'], ['Google Workspace', 'google-icon'], ['Asana', 'asana-icon'], ['ClickUp', 'clickup'], ['Notion', 'notion-icon'], ['Jira', 'jira'], ['Zapier', 'zapier-icon']] },
    { name: 'CMS, e-commerce & design', tools: [['Shopify', 'shopify-symbol'], ['Canva', 'canva']] },
  ],
  [
    { name: 'Analytics & tracking', tools: [['Google Analytics 4', 'google-analytics'], ['Google Search Console', 'google-search-console'], ['Google Tag Manager', 'google-tag-manager'], ['Microsoft Clarity', 'microsoft-icon'], ['Looker Studio', 'looker-icon']] },
    { name: 'Email & CRM', tools: [['Dynamics 365', 'dynamics-365'], ['HubSpot', 'hubspot-symbol'], ['Mailchimp', 'mailchimp-freddie'], ['Klaviyo', 'klaviyo']] },
    { name: 'SEO & search research', tools: [['Ahrefs', 'ahrefs'], ['SEMrush', 'semrush'], ['Screaming Frog', 'screaming-frog']] },
  ],
];

export const certifications = [
  ['Google Ads Search', 'Google, 2026', 'google-icon'],
  ['Google Ads Measurement', 'Google, 2026', 'google-icon'],
  ['Meta Marketing Analytics', 'Meta', 'meta-icon'],
  ['Google AI Essentials', 'Google', 'google-icon'],
  ['Email Marketing', 'HubSpot', 'hubspot-symbol'],
];

export const career = [
  { years: 'Jan 2025 to Oct 2026', org: 'Aegon, Langley, BC', role: 'Intermediate Channel Marketing Specialist (Paid Media). Canadian and U.S. financial services. Led tracking implementation with colleagues.', icon: 'building', current: true },
  { years: 'Jul 2023 to Oct 2024', org: 'University Canada West, Vancouver', role: 'MBA.', icon: 'cap' },
  { years: 'Jan to Aug 2023', org: 'Kites Global, Colombo', role: 'Digital Marketing Strategist. Owned four client accounts and supported five more.', icon: 'briefcase' },
  { years: 'Jul to Dec 2022', org: 'Enfection, Colombo', role: 'Digital Marketing Intern. Shopping, Performance Max, Discovery and Meta for CDB Bank, Costa Coffee Singapore and Keells.', icon: 'spark' },
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
    meta: 'Aegon, insurance and investments, Google, Meta and LinkedIn, Canada and U.S., January 2025 to October 2026',
    role: 'Intermediate Channel Marketing Specialist (Paid Media), in-house',
    title: 'Better measurement. Better leads. More applications.',
    lede: 'Our ad platforms and our CRM disagreed about what a good lead was. We fixed the measurement, fed CRM lead stages back to eligible platforms and tested the lead forms. Across the account, applications rose 22% at the same media spend.',
    description: 'How Andrew Fonseka’s team at Aegon recorded 22% more applications and about 18% lower cost per application at the same media spend, by fixing measurement and feeding CRM lead stages back to ad platforms.',
    next: { id: 'panasia', teaser: 'When the client questioned cost per lead' },
  },
  {
    id: 'panasia',
    number: 2,
    short: 'Pan Asia Bank',
    meta: 'Pan Asia Bank, banking, Meta and Google, Sri Lanka, February to June 2023',
    role: 'Agency account lead, Kites Global',
    title: 'The cheapest lead wasn’t the most valuable lead.',
    lede: 'Pan Asia Bank needed funded gold loans. When the client questioned our cost per lead, I looked past the form fill to qualification data and the bank’s sales feedback, and defended the targeting.',
    description: 'How Andrew Fonseka defended lead quality over cost per lead for Pan Asia Bank: 259 bank-reported funded gold loans, about 2.45 times the prior monthly volume, at about US$97 of media per loan.',
    next: { id: 'godrej', teaser: 'One joke on a crowded beauty shelf' },
  },
  {
    id: 'godrej',
    number: 3,
    short: 'Godrej',
    meta: 'Godrej Expert Rich Crème, consumer goods, Meta and YouTube, India, February to July 2023',
    role: 'Paid media lead (Meta and YouTube), Kites Global',
    title: 'Error 404: grey hair not found.',
    lede: 'A hair colour launch on a crowded shelf. Our team turned the grey-coverage promise into a 404 joke, thirty creators posted it, and I ran the paid amplification on Meta and YouTube.',
    description: 'Error 404: a creator-led Godrej hair colour launch where Andrew Fonseka ran Meta and YouTube. Creator promo codes tracked about US$350K in retail sales against a US$30K total campaign cost.',
    next: { id: 'petmart', teaser: 'The Valentine’s date where the dog was invited' },
  },
  {
    id: 'petmart',
    number: 4,
    short: 'Petmart',
    meta: 'Petmart × Sugar Beach, pet retail, Instagram, Facebook and Google, Sri Lanka, January to May 2023',
    role: 'Campaign lead, strategy and execution, Kites Global',
    title: 'From a Valentine’s activation to always-on customer acquisition.',
    lede: 'Pet owners don’t want to leave the dog at home on date night, so we invited it. Then I turned the attention into always-on Shopping and Performance Max.',
    description: 'A Valentine’s activation with Sugar Beach drove US$25K in coupon-tracked store sales for Petmart, followed by always-on Shopping and Performance Max at 4× ROAS across the campaign.',
    next: null,
  },
];
