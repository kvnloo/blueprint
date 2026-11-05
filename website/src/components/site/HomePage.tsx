import React, { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { FEATURED, PROJECTS, COLLABORATIONS } from '../../data/projects';
import { LINKS, PILLARS, PIPELINE, SUBHEAD, THESIS } from '../../data/site';
import { ProjectCard, Section, SectionHeading } from './primitives';
import './site.css';

const PILLAR_TONE = {
  amber: { rim: 'z-rim-amber', text: 'z-text-amber', label: 'Autonomy' },
  blue: { rim: 'z-rim-blue', text: 'z-text-blue', label: 'Worlds' },
  green: { rim: 'z-rim-green', text: 'z-text-green', label: 'Growing' },
} as const;

/** Public project count from boplog's llms.txt; null until fetched or if offline. */
function useBoplogCount(): string | null {
  const [count, setCount] = useState<string | null>(null);
  useEffect(() => {
    const ctrl = new AbortController();
    fetch(LINKS.boplogLlms, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.text() : ''))
      .then((t) => setCount(/Public project count:\s*(\d+)/.exec(t)?.[1] ?? null))
      .catch(() => {});
    return () => ctrl.abort();
  }, []);
  return count;
}

const Hero = () => (
  <section className="relative min-h-[100svh] flex items-center pt-24 pb-16">
    <div className="max-w-7xl mx-auto px-6 w-full">
      <div className="max-w-3xl z-onart">
        <p className="text-xs font-semibold tracking-[0.14em] uppercase z-text-amber mb-6 z-legible">zer0 · studio for autonomous systems</p>
        <h1 className="font-serif-display text-5xl sm:text-6xl md:text-8xl leading-[0.98] z-text-ink z-legible">{THESIS}</h1>
        <p className="mt-6 text-lg md:text-xl z-text-dim leading-relaxed max-w-xl z-legible">{SUBHEAD}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href="#/work" className="z-btn z-btn-primary">See the work <ArrowRight size={16} aria-hidden /></a>
          <a href={LINKS.boplog} target="_blank" rel="noopener noreferrer" className="z-btn z-btn-ghost">Read the evidence <ArrowUpRight size={16} aria-hidden /></a>
        </div>
      </div>
    </div>
  </section>
);

const ThesisBand = () => (
  <Section className="!py-12">
    <figure className="z-glass z-rim-gold rounded-3xl p-8 md:p-12 max-w-4xl">
      <blockquote className="font-serif-display text-3xl md:text-5xl leading-tight z-text-ink">
        &ldquo;civilization advances by automating important actions &amp; reducing decision fatigue.&rdquo;
      </blockquote>
      <figcaption className="mt-5">
        <details className="text-sm z-text-dim">
          <summary className="cursor-pointer select-none">Where this comes from</summary>
          <p className="mt-2">A paraphrase of Alfred North Whitehead, An Introduction to Mathematics (1911): &ldquo;Civilization advances by extending the number of important operations which we can perform without thinking about them.&rdquo;</p>
        </details>
      </figcaption>
    </figure>
  </Section>
);

const Pillars = () => (
  <Section id="pillars">
    <SectionHeading eyebrow="What we build" title="Three directions, one loop." lede="Colour carries meaning across the site: amber for autonomy, blue for models of the world, green for growing." />
    <div className="grid gap-5 md:grid-cols-3">
      {PILLARS.map((p) => {
        const tone = PILLAR_TONE[p.tone];
        return (
          <article key={p.title} className={`z-glass ${tone.rim} rounded-2xl p-7 flex flex-col gap-4`} data-pillar={p.tone}>
            <span className={`text-xs font-semibold tracking-[0.14em] uppercase ${tone.text}`}>{tone.label}</span>
            <h3 className="font-serif-display text-3xl z-text-ink leading-tight">{p.title}</h3>
            <p className="text-sm z-text-dim leading-relaxed flex-1">{p.body}</p>
            <p className="text-xs z-text-faint">{p.projects.join(' · ')}</p>
          </article>
        );
      })}
    </div>
    <div className="mt-5 z-glass z-rim-gold rounded-2xl px-7 py-5 flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
      <span className="text-xs font-semibold tracking-[0.14em] uppercase z-text-ink">Flow</span>
      <span className="z-text-dim text-sm flex-1">The best tools fade into the background.</span>
      <span className="text-xs z-text-faint">.files · Dash · z0live · tmux-agent-fleet</span>
    </div>
  </Section>
);

const Featured = () => (
  <Section id="featured">
    <SectionHeading eyebrow="Featured work" title="Shipped in public." lede="Each card says how far along it is. Source is always linked." />
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {FEATURED.map((p) => <ProjectCard key={p.slug} project={p} />)}
    </div>
    <a href="#/work" className="mt-8 inline-flex items-center gap-2 z-link">All {PROJECTS.length} projects <ArrowRight size={16} aria-hidden /></a>
  </Section>
);

const HowWeWork = () => (
  <Section id="how-we-work">
    <SectionHeading eyebrow="How we work" title="From a paper to a decision." lede="A study enters z0evals only after its inputs are pinned and its results can be reproduced or independently inspected." />
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
      {PIPELINE.map((step, i) => (
        <li key={step.name} className="z-glass z-rim-amber rounded-2xl p-5 relative">
          <span className="font-mono text-xs z-text-faint">{String(i + 1).padStart(2, '0')}</span>
          <div className="mt-3 font-semibold z-text-ink">{step.name}</div>
          <div className="text-sm z-text-dim">{step.role}</div>
        </li>
      ))}
    </ol>
  </Section>
);

const ProofStrip = () => {
  const count = useBoplogCount();
  const upstreams = COLLABORATIONS.length;
  const items = [
    { value: count ?? '—', label: 'public projects logged', href: LINKS.boplog },
    { value: '2017–2026', label: 'years of public work', href: LINKS.boplog },
    { value: '3× daily', label: 'build log sync', href: 'https://github.com/kvnloo/boplog/actions/workflows/sync-github.yml' },
    { value: String(upstreams), label: 'upstream projects credited', href: '#/oss' },
  ];
  return (
    <Section id="proof" className="!py-12">
      <ul className="grid gap-3 grid-cols-2 lg:grid-cols-4" aria-label="Proof">
        {items.map((it) => (
          <li key={it.label}>
            <a href={it.href} {...(it.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="block z-glass z-rim-gold rounded-2xl p-6 h-full hover:border-[color:var(--z-amber)] transition-colors">
              <div className="font-serif-display text-4xl md:text-5xl z-text-ink" data-proof={it.label}>{it.value}</div>
              <div className="mt-1 text-sm z-text-dim">{it.label}</div>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs z-text-faint">Every number links to its source. The project count is read live from the build log.</p>
    </Section>
  );
};

const OssBand = () => (
  <Section id="oss-band">
    <div className="z-glass z-rim-gold rounded-3xl p-8 md:p-12 max-w-4xl">
      <p className="font-serif-display text-2xl md:text-4xl leading-snug z-text-ink">
        We work on other people&rsquo;s projects too. Credit belongs to the maintainers of Hermes Agent, CUA and more.
      </p>
      <p className="mt-4 z-text-dim italic">A fork, draft, or review is not an upstream merge.</p>
      <a href="#/oss" className="mt-8 z-btn z-btn-ghost">Open-source work <ArrowRight size={16} aria-hidden /></a>
    </div>
  </Section>
);

const HomePage: React.FC = () => (
  <>
    <Hero />
    <ThesisBand />
    <Pillars />
    <Featured />
    <HowWeWork />
    <ProofStrip />
    <OssBand />
  </>
);

export default HomePage;
