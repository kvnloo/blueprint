import React from 'react';
import { CLAIM_LEVELS, LINKS, PRINCIPLES, TIMELINE } from '../../data/site';
import { Section, SectionHeading } from './primitives';
import './site.css';

/** Founder note, principles, the claim legend and a short history. */
const AboutPage: React.FC = () => (
  <>
    <Section className="pt-32">
      <SectionHeading eyebrow="About" level={1} title="A studio of one, working in public." />
      <div className="z-glass z-rim-gold rounded-3xl p-8 md:p-10 max-w-3xl">
        <p className="font-serif-display text-2xl md:text-3xl z-text-ink leading-snug">
          zer0 is Kevin Rajan&rsquo;s studio for autonomous systems that widen what people can explore, make and become.
        </p>
        <p className="mt-5 z-text-dim leading-relaxed">
          The work runs from agent infrastructure (context, routing, compute allocation and typed orchestration) out to the real world:
          digital twins of cities and facilities, tools for growing things, and phone and voice interfaces that let people steer agents from anywhere.
          Everything is built in public and shipped with evidence, and work on other people&rsquo;s projects is credited to their maintainers.
        </p>
        <p className="mt-5 text-sm z-text-faint">Kevin Rajan · builder, engineer, scientist, solutions architect, systems thinker, automator.</p>
      </div>
    </Section>

    <Section id="principles">
      <SectionHeading eyebrow="Ethos" title="Seven principles." />
      <ol className="grid gap-4 md:grid-cols-2">
        {PRINCIPLES.map((p, i) => (
          <li key={p.title} className="z-glass rounded-2xl p-6 flex gap-5" data-testid="principle">
            <span className="font-mono text-sm z-text-amber pt-1">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3 className="text-lg font-semibold z-text-ink">{p.title}</h3>
              <p className="mt-1 text-sm z-text-dim leading-relaxed">{p.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>

    <Section id="claims">
      <SectionHeading eyebrow="How claims are labelled" title="Say how sure you are." />
      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CLAIM_LEVELS.map((c) => (
          <div key={c.label} className="z-glass z-rim-gold rounded-2xl p-5">
            <dt className="font-mono text-xs uppercase z-text-amber">{c.label}</dt>
            <dd className="mt-2 text-sm z-text-dim">{c.body}</dd>
          </div>
        ))}
      </dl>
    </Section>

    <Section id="timeline">
      <SectionHeading eyebrow="Timeline" title="How it got here." />
      <ol className="relative border-l border-[color:var(--z-gold)] ml-2 max-w-3xl">
        {TIMELINE.map((t) => (
          <li key={t.year} className="pl-6 pb-8 last:pb-0 relative">
            <span className="absolute -left-[5px] top-2 w-[9px] h-[9px] rounded-full bg-[color:var(--z-amber)]" />
            <div className="font-serif-display text-3xl z-text-ink">{t.year}</div>
            <p className="text-sm z-text-dim mt-1">{t.body}</p>
          </li>
        ))}
      </ol>
      <p className="mt-10 text-sm z-text-dim">
        Where the evidence lives: <a className="z-link" href={LINKS.boplog} target="_blank" rel="noopener noreferrer">the build log</a>,{' '}
        <a className="z-link" href={LINKS.contribArchive} target="_blank" rel="noopener noreferrer">the contribution archive</a> and{' '}
        <a className="z-link" href={LINKS.github} target="_blank" rel="noopener noreferrer">GitHub</a>.
      </p>
    </Section>
  </>
);

export default AboutPage;
