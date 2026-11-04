// Copy for the zer0 company site. Every line here traces to a public source
// (kvnloo profile README, boplog, z0evals and repo READMEs); nothing quotes
// private material.

export const THESIS = 'Engineering for human flourishing.';
export const SUBHEAD =
  'zer0 builds autonomous systems that protect flow and widen human reach, from agent infrastructure to digital twins of the real world. Evidence first, in public, with credit where it\u2019s due.';

export const LINKS = {
  github: 'https://github.com/kvnloo',
  x: 'https://x.com/_kvnloo',
  boplog: 'https://kvnloo.github.io/boplog/',
  portfolio: 'https://kvnloo.github.io/portfolio/',
  z0evals: 'https://kvnloo.github.io/z0evals/',
  boplogLlms: 'https://kvnloo.github.io/boplog/llms.txt',
  contribArchive: 'https://kvnloo.github.io/gh-contrib-archive/',
};

export const PRINCIPLES = [
  { title: 'Tools should fade into flow.', body: 'The best software gets out of the way so people can think, make and explore.' },
  { title: 'Evidence over hype.', body: 'Every claim carries a label: verified, reported, provisional or deprecated. High activity never implies promotion.' },
  { title: 'Fail closed, keep the human in charge.', body: 'Typed specs, validators that refuse rather than guess, and privileges a person approves once.' },
  { title: 'Build in public, in small steps.', body: 'Experiments, patches and reviews, logged as they happen.' },
  { title: 'Credit the maintainers.', body: 'A fork, draft or review is not an upstream merge. Upstream work is named by its upstream first.' },
  { title: 'Code is the great equalizer.', body: 'Automate humanitarian work (health, infrastructure, agency) so competence compounds without gatekeepers.' },
  { title: 'Machines that read you back.', body: 'Every surface ships a layer agents can read: llms.txt, feeds and typed APIs.' },
];

export const CLAIM_LEVELS = [
  { label: 'Verified', body: 'Checked against a receipt: a merged PR, a passing run or a pinned report.' },
  { label: 'Reported', body: 'Observed and written down, not independently re-run.' },
  { label: 'Provisional', body: 'An idea or early result. Expect it to change.' },
  { label: 'Deprecated', body: 'Kept for the record; no longer how we work.' },
];

export const PILLARS = [
  {
    tone: 'amber' as const,
    title: 'Intelligence you can audit.',
    body: 'Context, routing and compute allocation for agents, with typed plans that fail closed and evaluations anyone can reproduce.',
    projects: ['z0intelligence', 'aodl', 'kerdoios', 'z0evals'],
  },
  {
    tone: 'blue' as const,
    title: 'Models of the real world.',
    body: 'Digital twins of cities, facilities and machines, so changes can be tested before they reach people and places.',
    projects: ['smartcity', 'ACE', 'Microduck study'],
  },
  {
    tone: 'green' as const,
    title: 'Tools for growing.',
    body: 'Learning, wellbeing and living things: software that helps people and plants do better over time.',
    projects: ['humanity-vault', 'garden-room', 'openpaw'],
  },
];

/** The evidence chain from the z0evals README, upstream to decision. */
export const PIPELINE = [
  { name: 'frontier-kb', role: 'Literature' },
  { name: 'evolution-lab', role: 'Experiments' },
  { name: 'tokenomics', role: 'Measurement' },
  { name: 'z0evals', role: 'Frozen reports' },
  { name: 'z0intelligence', role: 'Promotion decisions' },
  { name: 'kerdoios', role: 'Resource placement' },
];

/** Third-party work the early pretotype leaned on. Credited, never claimed. */
export const RESEARCH_WE_BUILD_ON = [
  { who: 'AeroFarms with Nokia Bell Labs', topic: 'Autonomous drones and machine vision for crop monitoring in vertical farms (case study).', url: 'https://www.datanext.ai/case-study/aerofarms-aeroponics-vertical-farming/' },
  { who: 'Sustainability (MDPI), 2024', topic: 'A digital twin framework with AI environmental control for vertical farms.', url: 'https://www.mdpi.com/2071-1050/16/24/10958' },
  { who: 'Ain Shams Engineering Journal, 2023', topic: 'Low-cost IoT automation for hydroponic nutrient delivery.', url: 'https://www.sciencedirect.com/science/article/pii/S2090447923002307' },
  { who: 'Horticulturae (MDPI), 2023', topic: 'Neural-network temperature prediction for greenhouse climate control.', url: 'https://www.mdpi.com/2311-7524/9/8/853' },
];

export const TIMELINE = [
  { year: '2017', body: 'AudioEngine: a real-time iOS noise meter and 14-band EQ. The first public build.' },
  { year: '2025', body: 'The Blueprint pretotype: a vision site for autonomous agriculture, health and simulation.' },
  { year: '2026', body: 'The zer0 stack: agent infrastructure, evaluations, digital twins and phone control, built in public.' },
];
