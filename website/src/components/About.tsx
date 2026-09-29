import React from 'react';
import { motion } from 'framer-motion';

const principles = [
  ['Goals stay human', 'ACE can help clarify tradeoffs and surface options, but the person defines what they are trying to become.'],
  ['The twin is a model', 'Observed facts, estimates, expert judgments and simulations remain separate so uncertainty is visible.'],
  ['Experts get more leverage', 'Coaches, physicians, PTs, nutritionists, scientists and peers collaborate with agents instead of being replaced by them.'],
  ['Learning compounds', 'Every intervention becomes evidence about what worked, for whom, in what context, and with what confidence.'],
];

const About = () => {
  return (
    <section id="thesis" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="inline-flex items-center gap-2 mb-6 text-xs font-bold text-teal-400 tracking-widest uppercase">
              The thesis
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-medium leading-tight text-gray-100 mb-8">
              The facility is the interface.
              <span className="block text-white font-bold">The human feedback loop is the product.</span>
            </h2>
            <div className="space-y-5 text-lg text-gray-400 leading-relaxed">
              <p>
                ACE brings training, recovery, nutrition, medicine, learning, research, community and simulation into one environment designed to help people break plateaus.
              </p>
              <p>
                It takes inspiration from continuous-measurement systems such as Bryan Johnson&apos;s Blueprint, then broadens the idea beyond biomarkers into capability, learning, expertise, relationships and environment.
              </p>
              <p className="text-sm text-gray-500">
                ACE is an independent research project and is not affiliated with Blueprint.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {principles.map(([title, text], index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/10"
              >
                <div className="text-xs font-mono text-teal-500 mb-4">0{index + 1}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
