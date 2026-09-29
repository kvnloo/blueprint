import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ArrowRight, ShieldCheck, Target, Users } from 'lucide-react';

const loop = ['Goal', 'Observe', 'Model', 'Hypothesize', 'Connect', 'Intervene', 'Measure', 'Learn'];

const Hero = () => {
  return (
    <section id="top" className="relative pt-32 pb-24 lg:pt-44 lg:pb-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-teal-400 uppercase">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            ACE · HUMAN FLOURISHING R&D
          </div>

          <h1 className="text-5xl lg:text-7xl font-display font-bold leading-tight">
            Build a feedback loop
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-white">
              around your potential.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed">
            ACE is a physical + digital environment for helping people understand themselves, connect with the right experts, test interventions, and continuously improve.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4">
            <a
              href="#loop"
              className="group px-7 py-4 rounded-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-medium hover:shadow-[0_0_30px_rgba(20,184,166,0.35)] transition-all flex items-center gap-2"
            >
              Explore the loop
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#status"
              className="px-7 py-4 rounded-full border border-white/10 bg-white/5 text-gray-200 font-medium hover:bg-white/10 transition-all"
            >
              What exists today
            </a>
          </div>

          <div className="pt-8 border-t border-white/10 grid sm:grid-cols-3 gap-5">
            {[
              { icon: Target, title: 'Human-defined goals', text: 'You choose what better means.' },
              { icon: Users, title: 'Experts + agents', text: 'Technology extends people instead of replacing them.' },
              { icon: ShieldCheck, title: 'Evidence before claims', text: 'Prediction and reality stay visibly separate.' },
            ].map((item) => (
              <div key={item.title} className="space-y-2">
                <item.icon className="w-5 h-5 text-teal-400" />
                <div className="text-sm font-semibold text-white">{item.title}</div>
                <div className="text-xs leading-relaxed text-gray-500">{item.text}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, rotateY: -6 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="relative perspective-1000"
        >
          <div className="relative bg-[#0A0A0A]/90 backdrop-blur-xl rounded-3xl border border-white/10 p-6 md:p-8 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-emerald-500/5" />
            <div className="relative">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="text-xs font-mono tracking-widest text-teal-400 mb-2">ACE LOOP</div>
                  <h2 className="text-2xl font-display font-bold">One person. Continuous learning.</h2>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-teal-400" />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {loop.map((step, index) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + index * 0.06 }}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <div className="text-[10px] font-mono text-gray-600 mb-2">0{index + 1}</div>
                    <div className="text-sm font-semibold text-gray-200">{step}</div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/[0.05] p-4">
                <div className="text-xs font-mono text-amber-300 mb-1">SIMULATION IS A HYPOTHESIS TOOL</div>
                <p className="text-sm text-gray-400">
                  Models can help choose what to try next. Only observed outcomes get to update what ACE believes happened.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 text-[10px] font-mono tracking-wider">
                {['FACT', 'OBSERVATION', 'ESTIMATE', 'HYPOTHESIS', 'SIMULATION', 'INTERVENTION'].map((label) => (
                  <span key={label} className="px-3 py-1 rounded-full border border-white/10 text-gray-500">{label}</span>
                ))}
                <span className="px-3 py-1 rounded-full border border-teal-500/30 text-teal-300">VERIFIED OUTCOME</span>
              </div>
            </div>
          </div>
          <div className="absolute -inset-16 bg-teal-500/10 blur-[100px] -z-10 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
