import React from 'react';
import { Twitter, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-black pt-24 pb-12 overflow-hidden">
      {/* Background Effect */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-24">
           
           {/* Left: Contact */}
           <div className="space-y-8">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 w-fit">
                 <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                 <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Get In Touch</span>
              </div>
              
              <div className="space-y-1">
                 <a
                    href="https://github.com/kvnloo/blueprint"
                    className="block text-3xl md:text-4xl font-display font-medium text-white hover:text-teal-400 transition-colors"
                 >
                    github.com/kvnloo/blueprint
                 </a>
                 <div className="text-3xl md:text-4xl font-display font-medium text-white/80 uppercase">
                    hello@zer0.llc
                 </div>
              </div>

              <div className="flex gap-4">
                 <a href="https://x.com/_kvnloo" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-all">
                    <Twitter size={18} />
                 </a>
                 <a href="https://github.com/kvnloo/blueprint" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-all">
                    <Github size={18} />
                 </a>
              </div>
           </div>

           {/* Right: Links */}
           <div className="flex gap-12 text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="space-y-4">
                 <a href="#" className="block hover:text-white transition-colors">Privacy & Policy</a>
                 <a href="#" className="block hover:text-white transition-colors">Terms of Service</a>
              </div>
              <div className="space-y-4">
                 <div className="block text-gray-700">©2026 zer0 LLC.</div>
              </div>
           </div>
        </div>

        {/* Giant Text */}
        <div className="relative">
           <h1 className="text-[20vw] leading-none font-bold font-display text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent select-none text-center tracking-tighter">
              ATLAS
           </h1>
           <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;