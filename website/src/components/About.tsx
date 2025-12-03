import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion, useMediaQuery } from '../hooks';

const About = () => {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const blurAmount = isMobile ? 3 : 8;

  // Animation variants with blur effect
  const badgeVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      filter: prefersReducedMotion ? 'blur(0px)' : `blur(${blurAmount}px)`
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0.2, 0.8, 0.2, 1]
      }
    }
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      x: -30,
      filter: prefersReducedMotion ? 'blur(0px)' : `blur(${blurAmount}px)`
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        delay: 0.1,
        ease: [0.2, 0.8, 0.2, 1]
      }
    }
  };

  const statVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: prefersReducedMotion ? 'blur(0px)' : `blur(${blurAmount}px)`
    },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        delay: 0.2 + delay * 0.1,
        duration: 0.5,
        ease: [0.2, 0.8, 0.2, 1]
      }
    })
  };

  const techVariants = {
    hidden: {
      opacity: 0,
      filter: prefersReducedMotion ? 'blur(0px)' : `blur(${blurAmount}px)`
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        delay: 0.5,
        ease: [0.2, 0.8, 0.2, 1]
      }
    }
  };

  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Version / Badge */}
        <motion.div
          variants={badgeVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex justify-start mb-16"
          style={{ willChange: 'transform, opacity, filter' }}
        >
          <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-teal-500/30 bg-teal-900/10">
            <span className="flex h-2 w-2 rounded-full bg-teal-400 animate-pulse"></span>
            <span className="text-xs font-mono text-teal-300 tracking-wider">CLAUDE FLOW POWERED</span>
            <span className="w-px h-3 bg-teal-500/30"></span>
            <span className="text-xs text-gray-400">Autonomous research-to-deployment systems</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              variants={contentVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              style={{ willChange: 'transform, opacity, filter' }}
            >
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
            </motion.div>

            <div className="grid grid-cols-2 gap-8 lg:gap-12 content-center">
                {[
                    { val: '3', label: 'Active Tracks' },
                    { val: '4', label: 'Health Modules' },
                    { val: '6', label: 'Pipeline Stages' },
                    { val: '∞', label: 'Automation Loop' }
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        custom={i}
                        variants={statVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        whileHover={prefersReducedMotion ? {} : { y: -5 }}
                        className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-teal-500/30 transition-colors"
                        style={{ willChange: 'transform, opacity, filter' }}
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
        <motion.div
          variants={techVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-32 border-t border-white/5 pt-12"
          style={{ willChange: 'transform, opacity, filter' }}
        >
            <p className="text-center text-xs font-semibold tracking-widest text-gray-600 uppercase mb-12">Built with leading technology</p>
            <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                {['Claude Flow', 'Unity/Unreal', 'E2B Sandbox', 'Git Worktree', 'PyTorch'].map((logo) => (
                    <div key={logo} className="text-lg font-bold font-display text-white flex items-center gap-2 hover:text-teal-400 transition-colors cursor-default">
                        {logo}
                    </div>
                ))}
            </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;