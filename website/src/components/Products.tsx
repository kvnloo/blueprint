import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Sprout, Trophy, User, Users } from 'lucide-react';

const systems = [
  {
    title: 'Personal digital twin',
    subtitle: 'A living model, not a score',
    icon: User,
    body: 'Goals, training history, physiology, movement, skill, recovery, interventions and uncertainty in one longitudinal model.',
    status: 'RESEARCH + PROTOTYPE',
  },
  {
    title: 'Sport labs',
    subtitle: 'Rules + simulation per sport',
    icon: Trophy,
    body: 'Each sport brings its own machine-readable rules, state and semantics on top of a minimal reusable simulation substrate.',
    status: 'PROTOTYPE',
  },
  {
    title: 'Expert network',
    subtitle: 'Bring the right people into the loop',
    icon: Users,
    body: 'Connect athletes with coaches, PTs, physicians, nutritionists, scientists and peers around the specific plateau being investigated.',
    status: 'RESEARCH',
  },
  {
    title: 'Agent layer',
    subtitle: 'Extend human attention',
    icon: Bot,
    body: 'Agents research, compare evidence, run simulations and coordinate follow-up while authority stays with the person and relevant experts.',
    status: 'ACTIVE R&D',
  },
  {
    title: 'Facility + food',
    subtitle: 'Environment becomes part of the twin',
    icon: Sprout,
    body: 'Training spaces, recovery, labs, community, agriculture and nutrition can eventually share one evidence model without becoming one monolithic system.',
    status: 'VISION + PROTOTYPE',
  },
];

const Products = () => {
  return (
    <section id="system" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-xs font-semibold tracking-wider text-emerald-400 uppercase mb-5">The ACE system</div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            One loop. Many specialized systems.
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            ACE should stay modular: shared evidence and simulation infrastructure underneath, domain-specific expertise and rules above it.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {systems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-2xl border border-white/10 bg-[#0A0A0A] p-7"
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <span className="px-2.5 py-1 rounded-full border border-white/10 text-[9px] font-mono tracking-wider text-gray-500">
                  {item.status}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
              <div className="text-sm text-emerald-400 mb-4">{item.subtitle}</div>
              <p className="text-sm text-gray-500 leading-relaxed">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
