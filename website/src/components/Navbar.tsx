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

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#050505]/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center">
            <span className="font-display font-bold text-black text-sm">z0</span>
          </div>
          <span className="font-display font-bold text-xl tracking-tight">zer0</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#" className="hover:text-teal-400 transition-colors">Services</a>
          <a href="#" className="hover:text-teal-400 transition-colors">Technology</a>
          <a href="#" className="hover:text-teal-400 transition-colors">Projects</a>
          <a href="#" className="hover:text-teal-400 transition-colors">Pricing</a>
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium hover:text-white text-gray-400 transition-colors">Log In</a>
          <button className="group relative px-6 py-2 rounded-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-sm font-medium overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(20,184,166,0.3)]">
            <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-out -skew-x-12 -translate-x-full" />
            <span className="relative flex items-center gap-2">
              Get Started
            </span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-gray-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#050505] border-b border-white/10 p-6 flex flex-col gap-4 animate-in slide-in-from-top-4 fade-in duration-200">
          <a href="#" className="text-lg font-medium text-gray-300 hover:text-teal-400">Services</a>
          <a href="#" className="text-lg font-medium text-gray-300 hover:text-teal-400">Technology</a>
          <a href="#" className="text-lg font-medium text-gray-300 hover:text-teal-400">Projects</a>
          <hr className="border-white/10" />
          <a href="#" className="text-lg font-medium text-gray-300 hover:text-white">Log In</a>
          <button className="w-full py-3 rounded-lg bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-medium">
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;