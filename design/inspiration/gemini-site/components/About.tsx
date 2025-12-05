import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Version / Badge */}
        <div className="flex justify-start mb-16">
          <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-teal-500/30 bg-teal-900/10">
            <span className="flex h-2 w-2 rounded-full bg-teal-400 animate-pulse"></span>
            <span className="text-xs font-mono text-teal-300 tracking-wider">CLAUDE FLOW POWERED</span>
            <span className="w-px h-3 bg-teal-500/30"></span>
            <span className="text-xs text-gray-400">Next generation autonomous systems</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
            <div>
                <div className="flex items-center gap-2 mb-6">
                    <span className="text-xs font-bold text-gray-600 px-2 py-1 rounded bg-white/5 border border-white/5">ABOUT US</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-medium leading-tight text-gray-100 mb-8">
                    We are an <span className="text-white font-bold">autonomous systems lab</span> dedicated to transforming how industries operate.
                </h2>
                <div className="space-y-6 text-lg text-gray-400">
                    <p>
                    With deep expertise in AI agents, digital twins, and controlled environment agriculture, we build infrastructure that empowers ambitious teams to design, simulate, and scale at the speed of thought.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-8 lg:gap-12 content-center">
                {[
                    { val: '$2M+', label: 'Cost Savings' },
                    { val: '95%', label: 'Automation Rate' },
                    { val: '50+', label: 'Systems Deployed' },
                    { val: '4.9', label: 'Client Rating' }
                ].map((stat, i) => (
                    <motion.div 
                        whileHover={{ y: -5 }}
                        className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-teal-500/30 transition-colors"
                        key={i}
                    >
                        <div className="text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-2">
                            {stat.val}
                        </div>
                        <div className="text-sm font-medium text-teal-500/80 uppercase tracking-wide">
                            {stat.label}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>

        {/* Trusted By */}
        <div className="mt-32 border-t border-white/5 pt-12">
            <p className="text-center text-xs font-semibold tracking-widest text-gray-600 uppercase mb-12">Built with leading technology</p>
            <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                {['Claude', 'Unreal Engine', 'Blender', 'Python', 'PyTorch'].map((logo) => (
                    <div key={logo} className="text-xl font-bold font-display text-white flex items-center gap-2 hover:text-teal-400 transition-colors cursor-default">
                        {logo === 'Unreal Engine' && <div className="w-6 h-6 rounded-full border-2 border-current" />}
                        {logo}
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default About;