import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const close = () => setIsMobileMenuOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#050505]/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center">
            <span className="font-display font-bold text-black text-sm">A</span>
          </div>
          <span className="font-display font-bold text-xl tracking-tight">ATLAS</span>
          <span className="ml-2 text-[10px] tracking-widest font-mono font-normal text-amber-400/90 border border-amber-400/40 px-2 py-0.5 rounded-full">PRETOTYPE</span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#products" className="hover:text-teal-400 transition-colors">Tracks</a>
          <a href="#pipeline" className="hover:text-teal-400 transition-colors">C(RAID)</a>
          <a href="https://github.com/kvnloo/blueprint" className="hover:text-teal-400 transition-colors">Repo</a>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <a
            href="#pipeline"
            className="group relative px-6 py-2 rounded-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-sm font-medium overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(20,184,166,0.3)]"
          >
            <span className="relative flex items-center gap-2">
              Read C(RAID)
              <ArrowRight className="w-4 h-4" />
            </span>
          </a>
        </div>

        <button
          className="md:hidden text-gray-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#050505] border-b border-white/10 p-6 flex flex-col gap-4 animate-in slide-in-from-top-4 fade-in duration-200">
          <a href="#products" onClick={close} className="text-lg font-medium text-gray-300 hover:text-teal-400">Tracks</a>
          <a href="#pipeline" onClick={close} className="text-lg font-medium text-gray-300 hover:text-teal-400">C(RAID)</a>
          <a href="https://github.com/kvnloo/blueprint" className="text-lg font-medium text-gray-300 hover:text-teal-400">Repo</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
