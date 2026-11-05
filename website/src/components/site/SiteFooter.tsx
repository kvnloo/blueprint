import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { LINKS } from '../../data/site';
import './site.css';

const CONTACTS = [
  { label: 'GitHub', handle: 'kvnloo', url: LINKS.github },
  { label: 'X', handle: '@_kvnloo', url: LINKS.x },
  { label: 'Build log', handle: 'boplog', url: LINKS.boplog },
  { label: 'Portfolio', handle: 'kvnloo.github.io/portfolio', url: LINKS.portfolio },
];

/** Closing call to action plus the contact block every page ends with. */
const SiteFooter: React.FC = () => (
  <footer id="contact" className="relative pt-24 pb-10 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 relative">
      <div className="z-glass z-rim-gold rounded-3xl p-8 md:p-12 grid gap-10 md:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="font-serif-display text-3xl md:text-5xl leading-tight z-text-ink">
            Software should give imagination room to move.
          </p>
          <p className="mt-4 z-text-dim">Follow the build log, or get in touch.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="z-btn z-btn-primary" href={LINKS.boplog} target="_blank" rel="noopener noreferrer">Build log</a>
            <a className="z-btn z-btn-ghost" href={LINKS.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
        <div>
          <h2 className="text-xs font-semibold tracking-[0.14em] uppercase z-text-amber mb-4">Contact</h2>
          <ul className="divide-y divide-white/10">
            {CONTACTS.map((c) => (
              <li key={c.label}>
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between py-3 group">
                  <span className="z-text-dim text-sm">{c.label}</span>
                  <span className="z-text-ink text-sm inline-flex items-center gap-1 group-hover:text-[color:var(--z-amber)]">
                    {c.handle} <ArrowUpRight size={14} aria-hidden />
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs z-text-faint">
            For agents: a plain-text summary lives at <a className="z-link" href="llms.txt">llms.txt</a>.
          </p>
        </div>
      </div>
      <div className="mt-10 flex flex-col md:flex-row gap-3 justify-between text-xs z-text-faint">
        <span>zer0 · Kevin Rajan · 2017–{new Date().getFullYear()}</span>
        <span>Claims on this site are labelled. A fork, draft or review is not an upstream merge.</span>
      </div>
      <div aria-hidden className="font-serif-display text-[22vw] leading-none text-center select-none mt-6 bg-clip-text text-transparent bg-gradient-to-b from-white/10 to-transparent">
        zer0
      </div>
    </div>
  </footer>
);

export default SiteFooter;
