import React, { useMemo, useState } from 'react';
import { AREAS, PROJECTS, STATUSES, VISION_SHELF, type Area, type Status } from '../../data/projects';
import { AREA_TONE, ProjectCard, Section, SectionHeading } from './primitives';
import './site.css';

const AREA_KEYS = Object.keys(AREAS) as Area[];
const STATUS_KEYS = Object.keys(STATUSES) as Status[];

const Toggle: React.FC<{ pressed: boolean; onClick: () => void; children: React.ReactNode; className?: string }> = ({ pressed, onClick, children, className = '' }) => (
  <button
    type="button"
    aria-pressed={pressed}
    onClick={onClick}
    className={`z-chip !text-xs !py-1.5 !px-3 transition-colors ${pressed ? '!border-[color:var(--z-amber)] !bg-white/10' : 'hover:!border-white/30'} ${className}`}
  >
    {children}
  </button>
);

/** Every public project, filterable by area and status. */
const WorkPage: React.FC = () => {
  const [area, setArea] = useState<Area | null>(null);
  const [status, setStatus] = useState<Status | null>(null);
  const shown = useMemo(
    () => PROJECTS.filter((p) => (!area || p.area === area) && (!status || p.status === status)),
    [area, status],
  );

  return (
    <>
      <Section className="pt-32">
        <SectionHeading
          eyebrow="Work" level={1}
          title="Everything public, labelled honestly."
          lede="Every project here is a public repository. Status says how far along it is, not how much it is worked on."
        />
        <div className="flex flex-col gap-3 mb-10" role="group" aria-label="Filter projects">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs z-text-faint w-14">Area</span>
            <Toggle pressed={!area} onClick={() => setArea(null)} className="z-text-ink">All</Toggle>
            {AREA_KEYS.map((a) => (
              <Toggle key={a} pressed={area === a} onClick={() => setArea(area === a ? null : a)} className={AREA_TONE[a].text}>
                <span className="z-dot" style={{ background: AREA_TONE[a].dot }} />
                {AREAS[a].short}
              </Toggle>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs z-text-faint w-14">Status</span>
            <Toggle pressed={!status} onClick={() => setStatus(null)} className="z-text-ink">All</Toggle>
            {STATUS_KEYS.map((s) => (
              <Toggle key={s} pressed={status === s} onClick={() => setStatus(status === s ? null : s)} className="z-text-dim">
                <span title={STATUSES[s].meaning}>{STATUSES[s].label}</span>
              </Toggle>
            ))}
          </div>
        </div>
        <p className="text-sm z-text-faint mb-5" aria-live="polite" data-testid="work-count">
          {shown.length} of {PROJECTS.length} projects
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => <ProjectCard key={p.slug} project={p} />)}
        </div>
        {shown.length === 0 && <p className="z-text-dim">Nothing matches both filters.</p>}
      </Section>

      <Section id="vision">
        <SectionHeading
          eyebrow="Vision · provisional"
          title="Where this started."
          lede="The 2025 Blueprint pretotype sketched three tracks. They are ideas, not products, and are kept here so the history stays honest."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {VISION_SHELF.map((v) => (
            <article key={v.name} className="z-glass rounded-2xl p-6 border-dashed" data-testid="vision-card">
              <span className="z-chip z-text-faint font-mono uppercase">Provisional</span>
              <h3 className="mt-4 text-lg font-semibold z-text-ink">{v.name}</h3>
              <p className="mt-2 text-sm z-text-dim leading-relaxed">{v.line}</p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
};

export default WorkPage;
