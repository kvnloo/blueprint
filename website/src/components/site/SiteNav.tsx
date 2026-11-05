import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { href, type Route } from '../../lib/route';
import './site.css';

const ITEMS: { route: Route; label: string }[] = [
  { route: { page: 'work' }, label: 'Work' },
  { route: { page: 'research' }, label: 'Research' },
  { route: { page: 'about' }, label: 'About' },
  { route: { page: 'oss' }, label: 'Open source' },
];

/** Contact lives in the footer on every page; scroll there without touching the route hash. */
export const toContact = (e: React.MouseEvent) => {
  e.preventDefault();
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const isActive = (current: Route, item: Route) =>
  current.page === item.page || (current.page === 'article' && item.page === 'research');

/** Glass top bar. Hash links, so it works with or without JS routing. */
const SiteNav: React.FC<{ route: Route }> = ({ route }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [route]);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${scrolled || open ? 'z-glass z-glass-strong border-x-0 border-t-0' : ''}`}>
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between" aria-label="Primary">
        <a href="#/" className="font-serif-display text-2xl z-text-ink tracking-wide z-legible" aria-label="zer0 home">
          zer<span className="z-text-amber">0</span>
        </a>
        <ul className="hidden md:flex items-center gap-8 text-sm">
          {ITEMS.map((item) => (
            <li key={item.label}>
              <a
                href={href(item.route)}
                aria-current={isActive(route, item.route) ? 'page' : undefined}
                className={`z-legible transition-colors ${isActive(route, item.route) ? 'z-text-amber' : 'z-text-dim hover:text-white'}`}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" onClick={toContact} className="z-btn z-btn-ghost !py-2 !min-h-0 text-sm">Contact</a>
          </li>
        </ul>
        <button
          type="button"
          className="md:hidden p-3 -mr-3 z-text-ink"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      {open && (
        <ul id="mobile-menu" className="md:hidden px-6 pb-6 flex flex-col gap-1 text-lg">
          {ITEMS.map((item) => (
            <li key={item.label}>
              <a href={href(item.route)} className={`block py-3 ${isActive(route, item.route) ? 'z-text-amber' : 'z-text-ink'}`}>
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" onClick={(e) => { setOpen(false); toContact(e); }} className="block py-3 z-text-ink">Contact</a>
          </li>
        </ul>
      )}
    </header>
  );
};

export default SiteNav;
