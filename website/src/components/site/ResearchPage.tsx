import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import ResearchHub from '../ResearchHub';
import { LINKS, PIPELINE, RESEARCH_WE_BUILD_ON } from '../../data/site';
import { href } from '../../lib/route';
import { Section, SectionHeading } from './primitives';
import './site.css';

/** Evaluations, writing, and the third-party research the work stands on. */
const ResearchPage: React.FC = () => (
  <>
    <Section className="pt-32 !pb-12">
      <SectionHeading
        eyebrow="Research" level={1}
        title="Evidence you can re-run."
        lede="Public evaluations live in z0evals. A study enters only after its inputs are pinned and its results can be reproduced or independently inspected."
      />
      <div className="grid gap-5 md:grid-cols-[1.2fr_1fr]">
        <article className="z-glass z-rim-amber rounded-2xl p-7">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase z-text-amber">z0evals</span>
            <span className="z-chip z-text-dim font-mono uppercase">In progress</span>
          </div>
          <h3 className="mt-4 text-2xl font-semibold z-text-ink">slm-router-v0</h3>
          <p className="mt-2 text-sm z-text-dim leading-relaxed">
            The first study: routing agent work with small local models. Reserved and in progress; no results are claimed until the report is frozen.
          </p>
          <a className="mt-5 z-link text-sm inline-flex items-center gap-1" href={LINKS.z0evals} target="_blank" rel="noopener noreferrer">
            Open z0evals <ArrowUpRight size={14} aria-hidden />
          </a>
        </article>
        <article className="z-glass z-rim-gold rounded-2xl p-7">
          <span className="text-[11px] font-semibold tracking-[0.18em] uppercase z-text-ink">The evidence chain</span>
          <ol className="mt-4 space-y-2 text-sm">
            {PIPELINE.map((s, i) => (
              <li key={s.name} className="flex gap-3">
                <span className="font-mono z-text-faint">{i + 1}</span>
                <span className="z-text-ink">{s.name}</span>
                <span className="z-text-dim">· {s.role}</span>
              </li>
            ))}
          </ol>
        </article>
      </div>
    </Section>

    <ResearchHub onNavigate={(view) => { window.location.hash = href({ page: 'article', id: view.replace(/^article:/, '') }); }} />

    <Section id="learning-layer" className="!pt-0">
      <SectionHeading
        eyebrow="Learning layer"
        tone="z-text-green"
        title="What we read, and what we keep."
        lede="frontier-kb collects frontier AI work as it lands. humanity-vault turns what matters into things a person can recall: encode, retrieve, rest, measure, prune."
      />
      <div className="flex flex-wrap gap-3">
        <a className="z-btn z-btn-ghost" href="https://github.com/kvnloo/frontier-kb" target="_blank" rel="noopener noreferrer">frontier-kb <ArrowUpRight size={16} aria-hidden /></a>
        <a className="z-btn z-btn-ghost" href="https://github.com/kvnloo/humanity-vault" target="_blank" rel="noopener noreferrer">humanity-vault <ArrowUpRight size={16} aria-hidden /></a>
      </div>
    </Section>

    <Section id="build-on">
      <SectionHeading
        eyebrow="Research we build on"
        title="Other people's work, credited."
        lede="The early pretotype leaned on these studies of farms, greenhouses and digital twins. We did not run them; their authors did."
      />
      <ul className="grid gap-4 md:grid-cols-2">
        {RESEARCH_WE_BUILD_ON.map((r) => (
          <li key={r.url}>
            <a href={r.url} target="_blank" rel="noopener noreferrer" className="block z-glass rounded-2xl p-6 h-full hover:border-white/25 transition-colors">
              <div className="text-xs z-text-faint">{r.who}</div>
              <p className="mt-2 z-text-ink">{r.topic}</p>
              <span className="mt-3 text-sm z-link inline-flex items-center gap-1">Read the source <ArrowUpRight size={14} aria-hidden /></span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  </>
);

export default ResearchPage;
