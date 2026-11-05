// Public project manifest for the Work grid, Featured work and the OSS page.
// Every entry must be a public repository; statuses were checked against GitHub
// (visibility, last push, live page) on 2026-11-03. Private work never appears here.

export type Area = 'autonomy' | 'worlds' | 'growth' | 'flow' | 'public';
export type Status = 'live' | 'active' | 'prototype' | 'early' | 'archived';

export interface Project {
  slug: string;
  name: string;
  line: string;
  area: Area;
  status: Status;
  repo: string;
  live?: string;
  featured?: boolean;
}

export const AREAS: Record<Area, { label: string; short: string; meaning: string }> = {
  autonomy: { label: 'Autonomy and agents', short: 'Autonomy', meaning: 'Intelligence turned into safe action' },
  worlds: { label: 'Systems and worlds', short: 'Worlds', meaning: 'Modelling the real world before touching it' },
  growth: { label: 'Health, learning and growing', short: 'Growing', meaning: 'Helping people and living things do better over time' },
  flow: { label: 'Developer flow', short: 'Flow', meaning: 'Tools that protect flow' },
  public: { label: 'Build in public', short: 'In public', meaning: 'Evidence and credit' },
};

export const STATUSES: Record<Status, { label: string; meaning: string }> = {
  live: { label: 'Live', meaning: 'A running page or usable release exists' },
  active: { label: 'Active', meaning: 'Under active development; not a finished product' },
  prototype: { label: 'Prototype', meaning: 'Works in parts; expect rough edges' },
  early: { label: 'Early', meaning: 'Scaffold or first experiments' },
  archived: { label: 'Archived', meaning: 'Kept for the record' },
};

const gh = (name: string) => `https://github.com/kvnloo/${name}`;
const pages = (name: string) => `https://kvnloo.github.io/${name}/`;

export const PROJECTS: Project[] = [
  // Autonomy and agents
  { slug: 'z0intelligence', name: 'z0intelligence', line: 'Evidence-backed context, routing and bounded decisions for agents.', area: 'autonomy', status: 'active', repo: gh('z0intelligence'), featured: true },
  { slug: 'aodl', name: 'aodl', line: 'Typed IR for agent orchestration graphs: a schema plus a validator that fails closed. Not a scheduler.', area: 'autonomy', status: 'live', repo: gh('aodl'), live: pages('aodl'), featured: true },
  { slug: 'z0evals', name: 'z0evals', line: 'Reproducible evaluations and public research reports: the frozen evidence layer.', area: 'autonomy', status: 'live', repo: gh('z0evals'), live: pages('z0evals'), featured: true },
  { slug: 'evolution-lab', name: 'evolution-lab', line: 'Experiment engine: genomes, a recovery gym for agents, Pareto and MAP-Elites search.', area: 'autonomy', status: 'live', repo: gh('evolution-lab'), live: pages('evolution-lab') },
  { slug: 'kerdoios', name: 'kerdoios', line: 'Allots scarce compute to agents: placement, budget awareness and routing.', area: 'autonomy', status: 'active', repo: gh('kerdoios') },
  { slug: 'tokenomics', name: 'tokenomics', line: 'Vendor-neutral measurement contracts for agents on OpenTelemetry.', area: 'autonomy', status: 'prototype', repo: gh('tokenomics') },
  { slug: 'hermes-keel', name: 'hermes-keel', line: 'A performance-based execution kernel for Hermes Agent.', area: 'autonomy', status: 'prototype', repo: gh('hermes-keel') },
  { slug: 'hermes-privilege-broker', name: 'hermes-privilege-broker', line: 'One-time, human-approved privileges with typed operations and no reusable sudo password.', area: 'autonomy', status: 'prototype', repo: gh('hermes-privilege-broker') },
  { slug: 'bend-native', name: 'bend-native', line: 'Proof-aware developer tooling for Hermes and Bend.', area: 'autonomy', status: 'prototype', repo: gh('bend-native') },
  { slug: 'frontier-kb', name: 'frontier-kb', line: 'A knowledge base of frontier AI work: models, tool use, measurement and autoresearch.', area: 'autonomy', status: 'active', repo: gh('frontier-kb') },
  { slug: 'ripple', name: 'ripple', line: 'An ephemeral intent surface: agents propose, a person picks, draws or talks back.', area: 'autonomy', status: 'active', repo: gh('ripple') },

  // Systems and worlds
  { slug: 'ace', name: 'ACE', line: 'A feedback-loop environment for human performance: the facility is the setting, the loop around the person is the product.', area: 'worlds', status: 'live', repo: gh('ace'), live: pages('ace'), featured: true },
  { slug: 'smartcity', name: 'smartcity', line: 'A nested digital twin of Chicagoland: Unreal 5.4, SUMO traffic and MapLibre.', area: 'worlds', status: 'live', repo: gh('smartcity'), live: pages('smartcity') },
  { slug: 'quackles', name: 'Microduck study', line: 'A mobile product study for Pollen Robotics\u2019 Microduck, rendered frame by frame in Blender Cycles.', area: 'worlds', status: 'prototype', repo: gh('quackles') },

  // Health, learning and growing
  { slug: 'humanity-vault', name: 'humanity-vault', line: 'A mobile-first learning OS: encode, retrieve, rest, measure, prune.', area: 'growth', status: 'early', repo: gh('humanity-vault'), live: pages('humanity-vault') },
  { slug: 'garden-room', name: 'garden-room', line: 'A phone 3D room planner for houseplants, with voice and AR measurement.', area: 'growth', status: 'prototype', repo: gh('garden-room') },
  { slug: 'openpaw', name: 'openpaw', line: 'Software for canine wellbeing.', area: 'growth', status: 'early', repo: gh('openpaw') },
  { slug: 'what-i-learned-from-oss', name: 'what-i-learned-from-oss', line: 'Lessons retained from open-source work, written to be studied and recalled.', area: 'growth', status: 'early', repo: gh('what-i-learned-from-oss') },

  // Developer flow
  { slug: 'dash', name: 'Dash', line: 'A phone UI for laptop coding agents over Tailscale: steer the work from anywhere.', area: 'flow', status: 'active', repo: gh('dash'), featured: true },
  { slug: 'z0live', name: 'z0live', line: 'Realtime voice experiments for talking to agents hands-free.', area: 'flow', status: 'prototype', repo: gh('z0live') },
  { slug: 'dotfiles', name: '.files', line: 'A Linux workspace, terminal tooling and audio DSP. \u201cStay in flow while u code.\u201d', area: 'flow', status: 'live', repo: gh('.files'), live: pages('.files') },
  { slug: 'dsh-tern', name: 'dsh-tern', line: 'A terminal UI bundle for DeepSeek Harness.', area: 'flow', status: 'active', repo: gh('dsh-tern') },
  { slug: 'fframestudio', name: 'fframestudio', line: 'A video studio on fframes with a bring-your-own-agent assistant.', area: 'flow', status: 'active', repo: gh('fframestudio') },
  { slug: 'ephemeral-ui', name: 'ephemeral-ui', line: 'A kit of generative app cards agents can render on the fly.', area: 'flow', status: 'active', repo: gh('ephemeral-ui'), live: pages('ephemeral-ui') },
  { slug: 'hermes-liquid-glass', name: 'hermes-liquid-glass', line: 'Liquid glass for Hermes Desktop on Linux.', area: 'flow', status: 'live', repo: gh('hermes-liquid-glass') },
  { slug: 'tmux-agent-fleet', name: 'tmux-agent-fleet', line: 'A harness-neutral command palette for coding agents across tmux panes.', area: 'flow', status: 'live', repo: gh('tmux-agent-fleet') },
  { slug: 'audioengine', name: 'AudioEngine', line: 'A 2017 iOS real-time noise meter and 14-band EQ. Where it started.', area: 'flow', status: 'archived', repo: gh('AudioEngine'), live: pages('AudioEngine') },

  // Build in public
  { slug: 'boplog', name: 'boplog', line: 'The build-in-public log: synced three times a day, with an OSS ledger, CLI, MCP server and llms.txt.', area: 'public', status: 'live', repo: gh('boplog'), live: pages('boplog'), featured: true },
  { slug: 'gh-contrib-archive', name: 'gh-contrib-archive', line: 'A public-safe view of issues, PRs and commits. Private work is counted, never opened.', area: 'public', status: 'live', repo: gh('gh-contrib-archive'), live: pages('gh-contrib-archive') },
  { slug: 'verified-oss-loop', name: 'verified-oss-loop', line: 'A protocol for evidence-backed human and agent OSS contributions.', area: 'public', status: 'active', repo: gh('verified-oss-loop') },
  { slug: 'hermes-maintainer', name: 'hermes-maintainer', line: 'An ops board and playbook for keeping Hermes Agent\u2019s queue small.', area: 'public', status: 'live', repo: gh('hermes-maintainer'), live: pages('hermes-maintainer') },
  { slug: 'portfolio', name: 'portfolio', line: 'Portfolio and a small 3D shop fed from boplog.', area: 'public', status: 'live', repo: gh('portfolio'), live: pages('portfolio') },
];

export const FEATURED = PROJECTS.filter((p) => p.featured);

/** Old Blueprint tracks, kept as clearly labelled provisional ideas. */
export const VISION_SHELF = [
  { name: 'Health tracker', line: 'Continuous personal measurement feeding experiments a person chooses. Lives on as NOOP work and N-of-1 habit experiments.' },
  { name: 'World simulation', line: 'Simulate environments before acting in them. Lives on as ACE, smartcity and the sport kernels.' },
  { name: 'Robot chef', line: 'Food grown, cooked and tuned to measured response. Still a vision: nothing here cooks.' },
];

/** Upstream projects we contribute to. Upstream and maintainers first. */
export const COLLABORATIONS = [
  { name: 'Hermes Agent', by: 'Nous Research', url: 'https://github.com/NousResearch/hermes-agent', focus: 'Runtime reliability, memory, native desktop UX, terminal UI experiments', level: 'active' as const },
  { name: 'CUA', by: 'trycua', url: 'https://github.com/trycua/cua', focus: 'Computer use: native control, latency and verifiable execution', level: 'active' as const },
  { name: 'NOOP', by: 'ryanbr and contributors', url: 'https://github.com/ryanbr/noop', focus: 'Offline wearable companion: Health Connect sync, Oura ring support, agent access', level: 'exploring' as const },
  { name: 'KMind Palace', by: 'suka233', url: 'https://github.com/suka233/kmind-palace', focus: 'Memory palaces for notes, used for spaced recall', level: 'exploring' as const },
  { name: 'gdp-wired', by: 'monotykamary', url: 'https://github.com/monotykamary/gdp-wired', focus: 'Proven stateful rules, used for laws in agent tooling', level: 'exploring' as const },
  { name: 'LayerFS', by: 'LayerFS', url: 'https://layerfs.ai/', focus: 'Ephemeral agent workspaces with shared history', level: 'exploring' as const },
];
