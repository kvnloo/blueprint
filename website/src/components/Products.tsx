import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Globe2, Sprout, Trophy, User, Users } from 'lucide-react';

const systems = [
  {
    title: 'Personal digital twin',
    subtitle: 'A living model, not a single score',
    icon: User,
    body: 'Goals, training history, physiology, movement, skill, recovery, interventions and uncertainty can live in one longitudinal model without pretending every field is directly measurable.',
    status: 'RESEARCH + PROTOTYPE',
  },
  {
    title: 'Sport labs',
    subtitle: 'Rules and simulation stay sport-specific',
    icon: Trophy,
    body: 'Each sport supplies its own machine-readable rules, state and semantics on top of a minimal reusable kernel. Pickleball is the current proving ground.',
    status: 'WORKING + PROTOTYPE',
  },
  {
    title: 'Expert network',
    subtitle: 'Bring the right people into the loop',
    icon: Users,
    body: 'Route a plateau to the right combination of coach, PT, physician, nutritionist, scientist, specialist or peer while keeping consent and domain authority explicit.',
    status: 'RESEARCH',
  },
  {
    title: 'Agent layer',
    subtitle: 'Extend human attention',
    icon: Bot,
    body: 'Agents can research, compare evidence, run simulations, prepare context and coordinate follow-up. They should not silently become the authority over the person.',
    status: 'ACTIVE R&D',
  },
  {
    title: 'World + simulation substrate',
    subtitle: 'Reality underneath the rules',
    icon: Globe2,
    body: 'Time, geometry, bodies, contacts, trajectories and deterministic replay can become reusable infrastructure while each domain assigns its own meaning to those observations.',
    status: 'PROTOTYPE + RESEARCH',
  },
  {
    title: 'Facility + food',
    subtitle: 'The environment becomes part of the twin',
    icon: Sprout,
    body: 'Training, recovery, labs, community, agriculture and nutrition can share evidence infrastructure without becoming one monolithic model or one universal optimizer.',
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
            Reuse the substrate, not the ontology. Shared evidence and simulation infrastructure sits underneath independently extensible sports, expertise and facility systems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {systems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
              className="rounded-2xl border border-white/10 bg-[#0A0A0A]/85 backdrop-blur p-7 hover:border-emerald-500/20 transition-colors"
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <span className="px-2.5 py-1 rounded-full border border-white/10 text-[9px] font-mono tracking-wider text-gray-500 text-right">
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
