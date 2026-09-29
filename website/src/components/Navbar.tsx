import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  ['Thesis', '#thesis'],
  ['Loop', '#loop'],
  ['System', '#system'],
  ['Status', '#status'],
  ['Research', '#research'],
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#050505]/85 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center">
            <span className="font-display font-bold text-black text-xs">ACE</span>
          </div>
          <div>
            <div className="font-display font-bold text-lg tracking-tight leading-none">ACE</div>
            <div className="text-[9px] text-gray-600 tracking-widest uppercase mt-1">by zer0</div>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-400">
          {links.map(([label, href]) => (
            <a key={label} href={href} className="hover:text-teal-400 transition-colors">{label}</a>
          ))}
        </div>

        <a
          href="https://github.com/kvnloo"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex px-5 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300 hover:bg-white/10 transition-colors"
        >
          Open work
        </a>

        <button
          className="md:hidden text-gray-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#050505] border-b border-white/10 p-6 flex flex-col gap-4">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-gray-300 hover:text-teal-400"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
