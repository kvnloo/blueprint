import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { COLLABORATIONS } from '../../data/projects';
import { LINKS } from '../../data/site';
import { Section, SectionHeading } from './primitives';
import './site.css';

/** Upstream work, named by its upstream and maintainers first. */
const OssPage: React.FC = () => (
  <Section className="pt-32">
    <SectionHeading
      eyebrow="Open source" level={1}
      title="Other people's projects, credited first."
      lede="We use, study and contribute to these projects. The maintainers did the hard part."
    />
    <div className="z-glass z-rim-gold rounded-2xl px-6 py-4 mb-10 max-w-3xl" role="note">
      <p className="z-text-ink"><strong>A fork, draft, or review is not an upstream merge.</strong></p>
      <p className="mt-1 text-sm z-text-dim">
        Only merged work counts as a contribution. The build log keeps the ledger of what actually landed upstream.
      </p>
    </div>
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {COLLABORATIONS.map((c) => (
        <article key={c.name} className={`z-glass ${c.level === 'active' ? 'z-rim-amber' : 'z-rim-gold'} rounded-2xl p-6 flex flex-col gap-3`} data-testid="collab-card">
          <div className="flex items-center justify-between gap-3">
            <span className="z-chip z-text-dim font-mono uppercase">{c.level === 'active' ? 'Active' : 'Exploring'}</span>
            <span className="z-chip z-text-faint">upstream</span>
          </div>
          <h3 className="text-xl font-semibold z-text-ink">{c.name}</h3>
          <p className="text-sm z-text-dim">by {c.by}</p>
          <p className="text-sm z-text-faint leading-relaxed flex-1">Our focus: {c.focus}</p>
          <a className="z-link text-sm inline-flex items-center gap-1" href={c.url} target="_blank" rel="noopener noreferrer">
            Upstream <ArrowUpRight size={14} aria-hidden />
          </a>
        </article>
      ))}
    </div>
    <div className="mt-12 flex flex-wrap gap-3">
      <a className="z-btn z-btn-ghost" href={LINKS.boplog} target="_blank" rel="noopener noreferrer">Contribution ledger <ArrowUpRight size={16} aria-hidden /></a>
      <a className="z-btn z-btn-ghost" href={LINKS.contribArchive} target="_blank" rel="noopener noreferrer">Issues and PRs archive <ArrowUpRight size={16} aria-hidden /></a>
    </div>
  </Section>
);

export default OssPage;
