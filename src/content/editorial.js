export { profile, mailto, cases, university, aegon, builder, experience } from './site.js';
export { testimonials } from '../testimonials.js';

export const capabilities = [
  {
    title: 'Ask who actually became a customer.',
    body: 'I start with the people who handle the enquiries. At Pan Asia Bank, the sales team’s experience with Meta leads helped me decide how to split US$25,000 across two channels.',
    example: 'What I look at · Sales feedback and funded loans',
  },
  {
    title: 'Check what the platforms are bidding on.',
    body: 'At Aegon, someone who booked a call looked different in HubSpot from someone who just filled out a form. I sent those stages back to Google and Meta so bidding could use completed applications.',
    example: 'What I build · CRM feedback and conversion tracking',
  },
  {
    title: 'Make the trade-off explicit.',
    body: 'The university’s broad campaign averaged about US$13 per enrolment. The dedicated campaign cost about US$28, but reached the two colleges with seats to fill. That’s the comparison I’d bring to a budget review.',
    example: 'What I report · Cost per outcome and who it served',
  },
];

export const supportingWork = [
  { id: 'aegon', name: 'Aegon', context: 'In-house · Financial services', title: 'A good launch starts before the launch.', body: 'Working in-house meant bringing campaigns, tracking and compliance together. I built a tool to give the team a more consistent way to prepare campaigns.', outcome: 'Adopted team-wide', qualifier: 'Operating-process case · results confidential' },
  { id: 'panasia', name: 'Pan Asia Bank', context: 'Agency · Financial services', title: 'The sales team helped shape the media plan.', body: 'With a fixed US$25K budget, I used the bank’s lead-quality feedback to plan the Google and Meta split. The outcome we followed was a funded loan.', outcome: '259 funded loans', qualifier: 'Client-reported · Jan–Jun 2023' },
  { id: 'petmart', name: 'Petmart.lk', context: 'Agency · E-commerce', title: 'A first order tells a different story.', body: 'New and returning shoppers were answering different questions. I separated them in Shopping and Performance Max to give first-order acquisition a clearer view.', outcome: '4:1 first-order ROAS', qualifier: 'Client-reported · Mar–May 2023' },
  { id: 'dats', name: 'DIMO Academy', context: 'Independent · Education', title: 'The budget stayed. The approach changed.', body: 'The college needed more enrolment-ready prospects. I helped rebuild the campaigns around qualified enquiries and added Microsoft Advertising within the existing budget.', outcome: '+19% qualified leads', qualifier: '178 → 212 · consecutive-quarter comparison' },
];
