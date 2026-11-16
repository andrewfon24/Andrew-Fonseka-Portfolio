export { profile, mailto, cases, university, aegon, builder, experience } from './site.js';
export { testimonials } from '../testimonials.js';

export const capabilities = [
  { title: 'Paid search & paid social', body: 'Campaign strategy, hands-on builds, audience targeting and ongoing optimisation across Google Ads, Meta and LinkedIn.', tools: 'Google Ads · Meta Ads · LinkedIn Ads · Microsoft Advertising' },
  { title: 'Measurement that reaches the CRM', body: 'Conversion tracking and offline signals that connect media spend to qualified leads, customers and enrolments.', tools: 'GA4 · Google Tag Manager · HubSpot · Looker Studio' },
  { title: 'Commercial judgement & execution', body: 'Budget allocation, pacing, creative testing and reporting that explain what happened—and what to do next.', tools: 'Acquisition cost · Lead quality · Campaign QA · Budget pacing' },
];

export const supportingWork = [
  { id: 'aegon', name: 'Aegon', context: 'In-house · Canada & U.S.', title: 'Built a more consistent way to launch.', body: 'Managed paid search and social; built a campaign builder for naming, UTMs and compliance QA.', outcome: 'Adopted team-wide', qualifier: 'Process case · results confidential' },
  { id: 'panasia', name: 'Pan Asia Bank', context: 'Agency · Financial services', title: 'Allocated the budget around lead quality.', body: 'Led Google and Meta campaigns with a fixed US$25K budget and funded loans as the outcome.', outcome: '259 funded loans', qualifier: 'Client-reported' },
  { id: 'petmart', name: 'Petmart.lk', context: 'Agency · E-commerce', title: 'Separated new customers from returning buyers.', body: 'Split Google Shopping and Performance Max to make first-order acquisition easier to evaluate.', outcome: '4:1 first-order ROAS', qualifier: 'Client-reported · Mar–May 2023' },
  { id: 'dats', name: 'DIMO Academy', context: 'Independent · Education', title: 'Rebuilt campaigns around qualified enquiries.', body: 'Reworked Google Ads and Meta, and introduced Microsoft Advertising at the same media budget.', outcome: '+19% qualified leads', qualifier: '178 → 212 · quarter-on-quarter' },
];
