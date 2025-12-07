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
            <span className="text-xs text-gray-400">Autonomous research-to-deployment systems</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
            <div>
                <div className="flex items-center gap-2 mb-6">
                    <span className="text-xs font-bold text-gray-600 px-2 py-1 rounded bg-white/5 border border-white/5">THE VISION</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-medium leading-tight text-gray-100 mb-8">
                    Building the <span className="text-white font-bold">Blueprint Protocol</span>—open source health optimization at scale.
                </h2>
                <div className="space-y-6 text-lg text-gray-400">
                    <p>
                    Three integrated tracks: Blueprint Protocol for health tracking, World Simulation for robotics and vertical farming, and Evolve for AI orchestration. All connected through the C(RAID) methodology.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-8 lg:gap-12 content-center">
                {[
                    { val: '3', label: 'Active Tracks' },
                    { val: '4', label: 'Health Modules' },
                    { val: '6', label: 'Pipeline Stages' },
                    { val: '∞', label: 'Automation Loop' }
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

        {/* Technology Stack */}
        <div className="mt-32 border-t border-white/5 pt-12">
            <p className="text-center text-xs font-semibold tracking-widest text-gray-600 uppercase mb-12">Built with leading technology</p>
            <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                {['Claude Flow', 'Unity/Unreal', 'E2B Sandbox', 'Git Worktree', 'PyTorch'].map((logo) => (
                    <div key={logo} className="text-lg font-bold font-display text-white flex items-center gap-2 hover:text-teal-400 transition-colors cursor-default">
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