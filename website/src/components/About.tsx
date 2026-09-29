import React from 'react';
import { motion } from 'framer-motion';

const principles = [
  ['Goals stay human', 'ACE can clarify tradeoffs and surface options, but the person defines what they are trying to become.'],
  ['The twin stays a model', 'Observed facts, estimates, expert judgments and simulations remain separate so uncertainty is visible.'],
  ['Experts gain leverage', 'Coaches, physicians, PTs, nutritionists, scientists and peers collaborate with agents instead of being replaced by them.'],
  ['Learning compounds', 'Every intervention becomes evidence about what worked, for whom, in what context and with what confidence.'],
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
              The campus is the interface.
              <span className="block text-white font-bold">The human feedback loop is the product.</span>
            </h2>
            <div className="space-y-5 text-lg text-gray-400 leading-relaxed">
              <p>
                ACE brings sport, training, recovery, nutrition, medicine, learning, research, community and simulation into one environment designed to help people discover and break plateaus.
              </p>
              <p>
                A person might move between a coach, physical therapist, physician, nutritionist, biomechanist, scientist or peer. Their digital twin keeps the shared evidence coherent while each expert keeps domain authority.
              </p>
              <p>
                The direction is inspired in part by continuous-measurement systems such as Bryan Johnson&apos;s Blueprint, then broadened beyond biomarkers toward capability, learning, expertise, relationships and environment.
              </p>
              <p className="text-sm text-gray-600">
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
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-teal-500/20 transition-colors"
              >
                <div className="text-xs font-mono text-teal-500 mb-4">0{index + 1}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-24 pt-10 border-t border-white/5">
          <p className="text-center text-xs font-semibold tracking-widest text-gray-600 uppercase mb-8">
            A multidisciplinary environment around one person
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-gray-500">
            {['Athletes', 'Coaches', 'Physical therapists', 'Physicians', 'Nutritionists', 'Biomechanists', 'Scientists', 'Learning experts', 'Farmers', 'Engineers', 'Peers'].map((role) => (
              <span key={role} className="px-3 py-1 rounded-full border border-white/5 bg-white/[0.02]">{role}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
