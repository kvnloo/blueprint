import React from 'react';
import { motion } from 'framer-motion';
import { Search, BarChart3, GitMerge, Rocket, ArrowRight, Heart, Globe, Cpu, ChefHat } from 'lucide-react';
import { useReducedMotion, useMediaQuery } from '../hooks';

const Pipeline = () => {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Reduce blur intensity on mobile for performance
  const blurAmount = isMobile ? 3 : 8;

  // Animation variants with blur effect
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: prefersReducedMotion ? 'blur(0px)' : `blur(${blurAmount}px)`
    },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        delay: delay * 0.15,
        duration: 0.6,
        ease: [0.2, 0.8, 0.2, 1]
      }
    })
  };

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
        <div className="relative mb-24">
          {/* "Continuous" label with bracket visualization */}
          <div className="hidden lg:flex items-center justify-center mb-8">
            {/* Left bracket arm */}
            <div className="flex items-center">
              <svg width="40" height="24" viewBox="0 0 40 24" className="text-gray-600">
                <path d="M38 22 C20 22, 8 22, 8 12 C8 2, 20 2, 38 2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>

            {/* Label */}
            <div className="px-6 flex items-center gap-3">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-gray-600" />
              <span className="text-sm font-medium text-gray-400 tracking-widest uppercase">Continuous</span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-gray-600" />
            </div>

            {/* Right bracket arm */}
            <div className="flex items-center">
              <svg width="40" height="24" viewBox="0 0 40 24" className="text-gray-600">
                <path d="M2 2 C20 2, 32 2, 32 12 C32 22, 20 22, 2 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          </div>


          {/* Cards container with connection line */}
          <div className="relative">
            {/* Connection line - centered on cards */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-teal-500/30 -translate-y-1/2 hidden lg:block" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {phases.map((phase, idx) => (
              <motion.div
                key={phase.abbr}
                custom={idx}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15, margin: "0px 0px -10% 0px" }}
                whileHover={prefersReducedMotion ? {} : { y: -8, transition: { duration: 0.3 } }}
                className="group relative"
                style={{ willChange: 'transform, opacity, filter' }}
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

          {/* Feedback loop indicator - subtle curved arrow from D back to R */}
          <div className="hidden lg:flex justify-center mt-6">
            <div className="flex items-center gap-2 text-gray-600">
              <svg width="200" height="20" viewBox="0 0 200 20" className="text-gray-600">
                <defs>
                  <marker id="feedbackArrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" />
                  </marker>
                </defs>
                <path
                  d="M180 5 C140 5, 100 15, 60 15 C40 15, 25 10, 20 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="4 3"
                  markerEnd="url(#feedbackArrow)"
                />
              </svg>
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
            <div className="bg-teal-500/10 rounded-xl border border-teal-500/20 p-6 text-center">
              <Heart className="w-8 h-8 text-teal-400 mx-auto mb-3" />
              <div className="font-bold text-white mb-1">Blueprint</div>
              <div className="text-sm text-teal-400 mb-3">Health Tracker</div>
              <div className="text-xs text-gray-500">Nutrition needs + seed selection</div>
            </div>

            {/* World Sim Track */}
            <div className="bg-amber-500/10 rounded-xl border border-amber-500/20 p-6 text-center">
              <Globe className="w-8 h-8 text-amber-400 mx-auto mb-3" />
              <div className="font-bold text-white mb-1">World Sim</div>
              <div className="text-sm text-amber-400 mb-3">+ Robotics</div>
              <div className="text-xs text-gray-500">Autonomous farm + robot training</div>
            </div>

            {/* Evolve Track */}
            <div className="bg-emerald-500/10 rounded-xl border border-emerald-500/20 p-6 text-center">
              <Cpu className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
              <div className="font-bold text-white mb-1">Evolve</div>
              <div className="text-sm text-emerald-400 mb-3">Orchestration</div>
              <div className="text-xs text-gray-500">Agent coordination + documentation</div>
            </div>
          </div>

          {/* Arrow pointing down */}
          <div className="flex justify-center mb-8">
            <div className="flex flex-col items-center gap-2">
              <div className="w-px h-8 bg-gradient-to-b from-white/20 to-white/5" />
              <ArrowRight className="w-5 h-5 text-gray-500 rotate-90" />
            </div>
          </div>

          {/* Final Output */}
          <div className="bg-gradient-to-r from-teal-500/10 via-amber-500/10 to-emerald-500/10 rounded-xl border border-white/10 p-6 text-center max-w-md mx-auto">
            <ChefHat className="w-10 h-10 text-white mx-auto mb-3" />
            <div className="font-bold text-white text-lg mb-2">Robot Chef Output</div>
            <div className="text-sm text-gray-400">Personalized, automated meals based on your health data</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pipeline;
