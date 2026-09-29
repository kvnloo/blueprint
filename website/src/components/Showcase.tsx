import React from 'react';
import { Activity, Building2, FlaskConical, Network, Sprout } from 'lucide-react';

const work = [
  {
    status: 'WORKING / PRIVATE',
    title: 'HomeBase facility twin',
    text: 'The racquet-sports digital twin is the main live proving ground for rules, facility software, 3D scenes and match-state integration.',
    icon: Activity,
  },
  {
    status: 'PROTOTYPE',
    title: '2026 sport rules kernel',
    text: 'Pickleball has a provenance-backed 2026 rule profile plus a deterministic transition seam and sport-extension protocol.',
    icon: FlaskConical,
  },
  {
    status: 'PROTOTYPE',
    title: 'GrowTwin',
    text: 'Agriculture and environmental simulation explore how food, facility systems and physical-world state can join the same evidence loop.',
    icon: Sprout,
  },
  {
    status: 'RESEARCH',
    title: 'Expert + agent graph',
    text: 'We are designing how coaches, clinicians, scientists, peers and agents collaborate around a person without collapsing authority into one model.',
    icon: Network,
  },
  {
    status: 'VISION',
    title: 'ACE campus',
    text: 'A future physical environment combining sport, performance science, recovery, research, nutrition, community and engineering. It is a design target, not a built facility.',
    icon: Building2,
  },
];

const Showcase = () => {
  return (
    <section id="status" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold tracking-wider text-amber-400 uppercase mb-5">Current state</div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-5">Show the work without pretending the future already exists.</h2>
            <p className="text-lg text-gray-400">
              ACE is being assembled through concrete digital-twin, rules, simulation and facility experiments. The labels below are part of the product.
            </p>
          </div>
          <div className="text-xs font-mono text-gray-600 max-w-sm">
            WORKING / PRIVATE ≠ public product · PROTOTYPE ≠ validated outcome · VISION ≠ built
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {work.map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 flex gap-5">
              <div className="w-11 h-11 shrink-0 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <div className="text-[10px] font-mono tracking-wider text-amber-400 mb-2">{item.status}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Showcase;
