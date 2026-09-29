import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Brain, Eye, FlaskConical, RefreshCcw, ShieldCheck, Target } from 'lucide-react';

const phases = [
  { name: 'Goal', text: 'Define what you want to improve and what constraints matter.', icon: Target },
  { name: 'Observe', text: 'Collect real-world evidence from training, sensors, experts and self-report.', icon: Eye },
  { name: 'Model', text: 'Update a digital twin with explicit confidence and provenance.', icon: Brain },
  { name: 'Intervene', text: 'Choose a drill, recovery plan, nutrition change, expert session or other experiment.', icon: FlaskConical },
  { name: 'Measure', text: 'Observe what actually changed after the intervention.', icon: Activity },
  { name: 'Verify', text: 'Separate real outcomes from estimates, stories and model predictions.', icon: ShieldCheck },
  { name: 'Learn', text: 'Update the twin and use the evidence to choose the next experiment.', icon: RefreshCcw },
];

const Pipeline = () => {
  return (
    <section id="loop" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold tracking-wider text-teal-400 uppercase mb-5">The feedback loop</div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Measure enough to learn.
            <span className="block text-gray-500">Not enough to drown in dashboards.</span>
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            ACE treats coaching as an evidence loop. Simulation can propose counterfactuals and agents can search the space, but real-world outcomes are what update the system.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="group rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 hover:border-teal-500/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                  <phase.icon className="w-5 h-5 text-teal-400" />
                </div>
                <span className="text-[10px] font-mono text-gray-700">0{index + 1}</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{phase.name}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{phase.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-purple-500/20 bg-purple-500/[0.05] p-6">
          <div className="text-xs font-mono tracking-wider text-purple-300 mb-2">SIMULATE BETWEEN MODEL + INTERVENE</div>
          <p className="text-sm text-gray-400 max-w-4xl">
            Match simulation, biomechanics models and agent research should help rank hypotheses and design experiments. They do not get to label a predicted outcome as something that happened.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pipeline;
