import React from 'react';
import { motion } from 'framer-motion';
import { Search, BarChart3, GitMerge, Rocket, ArrowRight, Heart, Globe, Cpu, ChefHat } from 'lucide-react';

const Pipeline = () => {
  const phases = [
    {
      abbr: 'R',
      name: 'Research',
      description: 'Autonomous information gathering and literature review',
      icon: Search,
      color: 'from-blue-500 to-blue-600',
      glowColor: 'rgba(59, 130, 246, 0.3)'
    },
    {
      abbr: 'A',
      name: 'Analysis',
      description: 'Processing, pattern recognition, insight extraction',
      icon: BarChart3,
      color: 'from-purple-500 to-purple-600',
      glowColor: 'rgba(168, 85, 247, 0.3)'
    },
    {
      abbr: 'I',
      name: 'Integration',
      description: 'Merging new knowledge into existing systems',
      icon: GitMerge,
      color: 'from-teal-500 to-teal-600',
      glowColor: 'rgba(20, 184, 166, 0.3)'
    },
    {
      abbr: 'D',
      name: 'Deployment',
      description: 'Shipping updates to production',
      icon: Rocket,
      color: 'from-emerald-500 to-emerald-600',
      glowColor: 'rgba(16, 185, 129, 0.3)'
    }
  ];

  return (
    <section id="pipeline" className="py-32 relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-teal-900/10 blur-[150px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-purple-400 uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            PARADIGM SHIFT
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="text-white">Beyond Traditional </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400">
              CI/CD
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            C(RAID) represents a paradigm shift from traditional software development to autonomous research systems—where the pipeline doesn't just deploy code, but continuously researches, analyzes, and evolves the system itself.
          </p>
        </div>

        {/* Pipeline Flow */}
        <div className="relative mb-24 pt-6">
          {/* LAYER 1: Pure SVG Loop (z-0, decorative) - Animated on scroll */}
          <motion.svg
            className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Single path draws entire loop with gap for label */}
            <motion.path
              d="
                M 8,4 L 42,4
                M 58,4 L 92,4
                Q 98,4 98,10 L 98,50
                L 98,90 Q 98,96 92,96
                L 8,96 Q 2,96 2,90
                L 2,50 L 2,10 Q 2,4 8,4
              "
              fill="none"
              stroke="rgb(75,85,99)"
              strokeOpacity="0.5"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
              variants={{
                hidden: { pathLength: 0 },
                visible: { pathLength: 1 }
              }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </motion.svg>

          {/* LAYER 2: "Continuous" Label (z-10) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0A0A0A] px-4 z-10 hidden lg:block">
            <span className="text-xs text-gray-500 tracking-widest uppercase">Continuous</span>
          </div>

          {/* LAYER 3: Cards container with connection line (z-20) */}
          <div className="relative z-20">
            {/* Connection line - centered on cards */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-teal-500/30 -translate-y-1/2 hidden lg:block" />

            {/* Arrow on left side pointing into R card */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-2 text-gray-500 hidden lg:block">
              <ArrowRight className="w-5 h-5" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {phases.map((phase, idx) => (
              <motion.div
                key={phase.abbr}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="group relative"
              >
                {/* Arrow connector */}
                {idx < phases.length - 1 && (
                  <div className="absolute top-1/2 -right-4 -translate-y-1/2 text-gray-600 hidden lg:block z-10">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}

                {/* Card */}
                <div className="relative h-full bg-[#0A0A0A] rounded-2xl border border-white/10 p-6 overflow-hidden hover:border-white/20 transition-all duration-300">
                  {/* Glow effect on hover - matching Products cards */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${phase.glowColor}, transparent 70%)`
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Phase badge */}
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${phase.color} mb-4`}>
                      <phase.icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Abbreviation */}
                    <div className="text-2xl font-mono font-bold text-white mb-2">{phase.abbr}</div>

                    {/* Name */}
                    <div className="text-sm font-medium text-gray-300 mb-3">{phase.name}</div>

                    {/* Description */}
                    <p className="text-sm text-gray-500 leading-relaxed">{phase.description}</p>
                  </div>
                </div>
              </motion.div>
              ))}
            </div>
          </div>

        </div>

        {/* Integration Diagram */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-[#0A0A0A] rounded-3xl border border-white/10 p-8 md:p-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-display font-bold text-white mb-3">Integration Points</h3>
            <p className="text-gray-400">All three tracks connect through the C(RAID) methodology</p>
          </div>

          {/* Integration Flow Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Blueprint Track */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="group bg-teal-500/10 rounded-xl border border-teal-500/20 p-6 text-center cursor-pointer hover:border-teal-500/40 hover:bg-teal-500/15 transition-colors duration-300"
            >
              <motion.div
                className="mx-auto mb-3 w-8 h-8"
                whileHover={{ scale: [1, 1.2, 1], transition: { repeat: Infinity, duration: 0.8 } }}
              >
                <Heart className="w-8 h-8 text-teal-400" />
              </motion.div>
              <div className="font-bold text-white mb-1">Blueprint</div>
              <div className="text-sm text-teal-400 mb-3">Health Tracker</div>
              <div className="text-xs text-gray-500">Nutrition needs + seed selection</div>
            </motion.div>

            {/* World Sim Track */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="group bg-amber-500/10 rounded-xl border border-amber-500/20 p-6 text-center cursor-pointer hover:border-amber-500/40 hover:bg-amber-500/15 transition-colors duration-300"
            >
              <motion.div
                className="mx-auto mb-3 w-8 h-8"
                whileHover={{ rotate: 360, transition: { duration: 2, ease: "linear" } }}
              >
                <Globe className="w-8 h-8 text-amber-400" />
              </motion.div>
              <div className="font-bold text-white mb-1">World Sim</div>
              <div className="text-sm text-amber-400 mb-3">+ Robotics</div>
              <div className="text-xs text-gray-500">Autonomous farm + robot training</div>
            </motion.div>

            {/* Evolve Track */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="group bg-emerald-500/10 rounded-xl border border-emerald-500/20 p-6 text-center cursor-pointer hover:border-emerald-500/40 hover:bg-emerald-500/15 transition-colors duration-300"
            >
              <motion.div
                className="mx-auto mb-3 w-8 h-8"
                whileHover={{ filter: ["brightness(1)", "brightness(1.4)", "brightness(1)"], transition: { repeat: Infinity, duration: 1 } }}
              >
                <Cpu className="w-8 h-8 text-emerald-400" />
              </motion.div>
              <div className="font-bold text-white mb-1">Evolve</div>
              <div className="text-sm text-emerald-400 mb-3">Orchestration</div>
              <div className="text-xs text-gray-500">Agent coordination + documentation</div>
            </motion.div>
          </div>

          {/* Arrow pointing down */}
          <div className="flex justify-center mb-8">
            <div className="flex flex-col items-center gap-2">
              <div className="w-px h-8 bg-gradient-to-b from-white/20 to-white/5" />
              <ArrowRight className="w-5 h-5 text-gray-500 rotate-90" />
            </div>
          </div>

          {/* Final Output */}
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-r from-teal-500/10 via-amber-500/10 to-emerald-500/10 rounded-xl border border-white/10 p-6 text-center max-w-md mx-auto cursor-pointer hover:border-white/25 hover:from-teal-500/15 hover:via-amber-500/15 hover:to-emerald-500/15 transition-all duration-300"
          >
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <ChefHat className="w-10 h-10 text-white mx-auto mb-3" />
            </motion.div>
            <div className="font-bold text-white text-lg mb-2">Robot Chef Output</div>
            <div className="text-sm text-gray-400">Personalized, automated meals based on your health data</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pipeline;
