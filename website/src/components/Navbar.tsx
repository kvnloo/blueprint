import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { ViewState } from '../App';

// Aura-style button CSS (teal theme)
const buttonStyles = `
  .button-custom-teal {
    cursor: pointer;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: all 0.25s ease;
    background: radial-gradient(65.28% 65.28% at 50% 100%, rgba(20, 184, 166, 0.8) 0%, rgba(20, 184, 166, 0) 100%), linear-gradient(0deg, #059669, #059669);
    border-radius: 9999px;
    border: none;
    padding: 8px 24px;
    min-height: 40px;
  }
  .button-custom-teal::before {
    content: "";
    position: absolute;
    inset: 1px;
    background: linear-gradient(177.95deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%);
    border-radius: 9999px;
    transition: all 0.5s ease-in-out;
    z-index: 0;
  }
  .button-custom-teal::after {
    content: "";
    position: absolute;
    inset: 2px;
    background: radial-gradient(65.28% 65.28% at 50% 100%, rgba(20, 184, 166, 0.8) 0%, rgba(20, 184, 166, 0) 100%), linear-gradient(0deg, #059669, #059669);
    border-radius: 9999px;
    transition: all 0.5s ease-in-out;
    z-index: 0;
  }
  .button-custom-teal:hover {
    box-shadow: 0 0 20px rgba(20, 184, 166, 0.4);
  }
  .btn-inner-teal {
    z-index: 2;
    gap: 8px;
    position: relative;
    width: 100%;
    color: white;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.875rem;
    font-weight: 500;
  }
  .points_wrapper_teal { overflow: hidden; width: 100%; height: 100%; pointer-events: none; position: absolute; z-index: 1; }
  .points_wrapper_teal .point { bottom: -10px; position: absolute; animation: floating-points-teal infinite ease-in-out; pointer-events: none; width: 2px; height: 2px; background-color: #fff; border-radius: 9999px; }
  @keyframes floating-points-teal { 0% { transform: translateY(0); } 85% { opacity: 0; } 100% { transform: translateY(-45px); opacity: 0; } }
  .points_wrapper_teal .point:nth-child(1) { left: 10%; opacity: 1; animation-duration: 2.35s; animation-delay: 0.2s; }
  .points_wrapper_teal .point:nth-child(2) { left: 30%; opacity: 0.7; animation-duration: 2.5s; animation-delay: 0.5s; }
  .points_wrapper_teal .point:nth-child(3) { left: 25%; opacity: 0.8; animation-duration: 2.2s; animation-delay: 0.1s; }
  .points_wrapper_teal .point:nth-child(4) { left: 44%; opacity: 0.6; animation-duration: 2.05s; }
  .points_wrapper_teal .point:nth-child(5) { left: 50%; opacity: 1; animation-duration: 1.9s; }
  .points_wrapper_teal .point:nth-child(6) { left: 75%; opacity: 0.5; animation-duration: 1.5s; animation-delay: 1.5s; }
  .points_wrapper_teal .point:nth-child(7) { left: 88%; opacity: 0.9; animation-duration: 2.2s; animation-delay: 0.2s; }
`;

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const Navbar = ({ currentView, onNavigate }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: ViewState) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
  };

  const isActive = (view: ViewState) => currentView === view;

  return (
    <>
    <style>{buttonStyles}</style>
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#050505]/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center">
            <span className="font-display font-bold text-black text-sm">z0</span>
          </div>
          <span className="font-display font-bold text-xl tracking-tight">zer0</span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <button
            onClick={() => handleNavClick('home')}
            className={`hover:text-teal-400 transition-colors ${isActive('home') ? 'text-teal-400' : ''}`}
          >
            Services
          </button>
          <button
            onClick={() => handleNavClick('research')}
            className={`hover:text-teal-400 transition-colors ${isActive('research') || currentView.startsWith('article:') ? 'text-teal-400' : ''}`}
          >
            Research
          </button>
          <button
            onClick={() => handleNavClick('home')}
            className={`hover:text-teal-400 transition-colors`}
          >
            Projects
          </button>
          <button
            onClick={() => handleNavClick('home')}
            className={`hover:text-teal-400 transition-colors`}
          >
            Pricing
          </button>
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium hover:text-white text-gray-400 transition-colors">Log In</a>
          <button className="button-custom-teal">
            <div className="points_wrapper_teal">
              <div className="point"></div>
              <div className="point"></div>
              <div className="point"></div>
              <div className="point"></div>
              <div className="point"></div>
              <div className="point"></div>
              <div className="point"></div>
            </div>
            <span className="btn-inner-teal">
              Get Access
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
          <button
            onClick={() => handleNavClick('home')}
            className={`text-lg font-medium text-left hover:text-teal-400 ${isActive('home') ? 'text-teal-400' : 'text-gray-300'}`}
          >
            Services
          </button>
          <button
            onClick={() => handleNavClick('research')}
            className={`text-lg font-medium text-left hover:text-teal-400 ${isActive('research') || currentView.startsWith('article:') ? 'text-teal-400' : 'text-gray-300'}`}
          >
            Research
          </button>
          <button
            onClick={() => handleNavClick('home')}
            className="text-lg font-medium text-gray-300 text-left hover:text-teal-400"
          >
            Projects
          </button>
          <hr className="border-white/10" />
          <a href="#" className="text-lg font-medium text-gray-300 hover:text-white">Log In</a>
          <button className="w-full py-3 rounded-lg bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-medium">
            Get Access
          </button>
        </div>
      )}
    </nav>
    </>
  );
};

export default Navbar;
