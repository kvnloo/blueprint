import React from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import { AREAS, STATUSES, type Area, type Project, type Status } from '../../data/projects';
import './site.css';

export const AREA_TONE: Record<Area, { text: string; rim: string; dot: string }> = {
  autonomy: { text: 'z-text-amber', rim: 'z-rim-amber', dot: 'var(--z-amber)' },
  worlds: { text: 'z-text-blue', rim: 'z-rim-blue', dot: 'var(--z-blue)' },
  growth: { text: 'z-text-green', rim: 'z-rim-green', dot: 'var(--z-green)' },
  flow: { text: 'z-text-ink', rim: 'z-rim-gold', dot: 'rgba(245,165,36,0.55)' },
  public: { text: 'z-text-ink', rim: 'z-rim-gold', dot: 'var(--z-gold)' },
};

/** Small uppercase label above a section heading. */
export const Eyebrow: React.FC<{ children: React.ReactNode; tone?: string }> = ({ children, tone = 'z-text-amber' }) => (
  <div className={`text-[11px] font-semibold tracking-[0.18em] uppercase mb-4 ${tone}`}>{children}</div>
);

/** Section shell with consistent spacing; `id` makes it addressable. */
export const Section: React.FC<{ id?: string; className?: string; children: React.ReactNode }> = ({ id, className = '', children }) => (
  <section id={id} className={`relative py-20 md:py-28 ${className}`}>
    <div className="max-w-7xl mx-auto px-6">{children}</div>
  </section>
);

/** `level={1}` for the title of a page; sections below it stay h2. */
export const SectionHeading: React.FC<{ eyebrow: string; title: string; lede?: string; tone?: string; level?: 1 | 2 }> = ({ eyebrow, title, lede, tone, level = 2 }) => {
  const H = level === 1 ? 'h1' : 'h2';
  return (
  <div className="max-w-3xl mb-12">
    <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
    <H className="font-serif-display text-4xl md:text-6xl leading-[1.02] z-text-ink z-legible">{title}</H>
    {lede && <p className="mt-5 text-base md:text-lg z-text-dim leading-relaxed z-legible">{lede}</p>}
  </div>
  );
};

export const AreaChip: React.FC<{ area: Area }> = ({ area }) => (
  <span className={`z-chip ${AREA_TONE[area].text}`} data-area={area}>
    <span className="z-dot" style={{ background: AREA_TONE[area].dot }} />
    {AREAS[area].short}
  </span>
);

export const StatusBadge: React.FC<{ status: Status }> = ({ status }) => (
  <span className="z-chip z-text-dim font-mono uppercase" data-status={status} title={STATUSES[status].meaning}>
    {STATUSES[status].label}
  </span>
);

export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <article
    className={`z-glass ${AREA_TONE[project.area].rim} rounded-2xl p-6 flex flex-col gap-4 h-full`}
    data-testid="project-card"
    data-slug={project.slug}
  >
    <div className="flex items-center justify-between gap-3">
      <AreaChip area={project.area} />
      <StatusBadge status={project.status} />
    </div>
    <h3 className="text-xl font-semibold z-text-ink">{project.name}</h3>
    <p className="text-sm z-text-dim leading-relaxed flex-1">{project.line}</p>
    <div className="flex flex-wrap gap-4 text-sm">
      <a className="z-link inline-flex items-center gap-1.5" href={project.repo} target="_blank" rel="noopener noreferrer">
        <Github size={14} aria-hidden /> Source
      </a>
      {project.live && (
        <a className="z-link inline-flex items-center gap-1" href={project.live} target="_blank" rel="noopener noreferrer">
          Live <ArrowUpRight size={14} aria-hidden />
        </a>
      )}
    </div>
  </article>
);
