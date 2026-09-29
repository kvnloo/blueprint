import React from 'react';
import { Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-black pt-20 pb-12 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-16">
          <div className="max-w-2xl">
            <div className="text-xs font-mono tracking-wider text-teal-400 mb-4">ACE · RESEARCH IN PUBLIC</div>
            <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">Build systems that help people become more capable.</h2>
            <p className="text-gray-500 leading-relaxed">
              ACE is an evolving zer0 research project spanning digital twins, sport simulation, expert collaboration, personalized learning and future physical environments.
            </p>
          </div>

          <div className="flex items-start">
            <a
              href="https://github.com/kvnloo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all"
            >
              <Github size={17} />
              Follow the work
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-4 text-xs text-gray-700">
          <span>© 2026 zer0 LLC</span>
          <span>Research prototype · claims are intentionally status-labeled</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
