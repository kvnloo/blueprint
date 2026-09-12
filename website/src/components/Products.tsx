import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Heart, Globe, ArrowRight, ExternalLink, FlaskConical, Apple, Dumbbell, Moon, Map, Bot, Leaf, ChefHat, FileCode, Workflow, GitBranch, Container } from 'lucide-react';

const products = [
  {
    name: 'Measure (health track)',
    tagline: 'Ethics, not Don’t Die',
    description: "Copy the measurement ethic (biomarkers over ‘I tried hard’). This repo does not ship Bryan Johnson’s Blueprint Protocol or a medical stack. Name collision: Johnson ≠ this CEA product ≠ factory law.",
    icon: Heart,
    color: 'teal',
    gradient: 'from-teal-500 to-teal-600',
    glowColor: 'rgba(20, 184, 166, 0.3)',
    status: 'Track 1',
    statusColor: 'bg-teal-500',
    link: null,
    features: [
      { icon: FlaskConical, text: 'Measure the loop — not a medical protocol' },
      { icon: Apple, text: 'Nutrition as logistics, not Don’t Die copy' },
      { icon: Dumbbell, text: 'Effort is not the metric — close the loop' },
      { icon: Moon, text: 'Recovery is observed, not a sleep-tracker SaaS' }
    ]
  },
  {
    name: 'GrowTwin / World Simulation',
    tagline: 'PCPartPicker for farms',
    description: 'Specify a CEA stack, simulate yield and watts, then bind a live twin. Robot chef is downstream. Photoreal UE5/Cesium is the twin claim — not this React pretotype.',
    icon: Globe,
    color: 'amber',
    gradient: 'from-amber-500 to-orange-500',
    glowColor: 'rgba(251, 191, 36, 0.3)',
    status: 'Track 2',
    statusColor: 'bg-amber-500',
    link: null,
    features: [
      { icon: Map, text: 'Specify the CEA stack — PCPartPicker for farms' },
      { icon: Bot, text: 'Simulate yield and watts before a physical build' },
      { icon: Leaf, text: 'Bind a live twin — UE5/Cesium is the twin claim' },
      { icon: ChefHat, text: 'Robot chef is downstream of the farm' }
    ]
  },
  {
    name: 'Evolve',
    tagline: 'C(RAID) Orchestration',
    description: 'C(RAID) over a backlog. Evolve is inspiration. AODL is the IR — not a second language, not Claude Flow as the runtime on this site.',
    icon: Cpu,
    color: 'emerald',
    gradient: 'from-emerald-500 to-emerald-600',
    glowColor: 'rgba(16, 185, 129, 0.3)',
    status: 'Track 3',
    statusColor: 'bg-emerald-500',
    link: 'https://github.com/kvnloo/evolve',
    features: [
      { icon: FileCode, text: 'Architecture diagrams & data flows' },
      { icon: Workflow, text: 'AODL IR — typed graphs, not Claude Flow as runtime' },
      { icon: GitBranch, text: 'Git worktree — parallel development' },
      { icon: Container, text: 'Sandboxed execution (E2B is a claim, not this site)' }
    ]
  }
];

const Products = () => {
  return (
    <section id="products" className="py-32 relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-teal-900/10 blur-[150px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-teal-400 uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            THREE TRACKS · CEA FIRST
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="text-white">Measure, GrowTwin, </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-amber-400">
              Evolve
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Soil to cell is the product. Health tracking is a separate ethic, not a wellness SaaS, and not Bryan Johnson’s protocol.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, idx) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full bg-[#0A0A0A] rounded-2xl border border-white/10 p-8 overflow-hidden hover:border-white/20 transition-all duration-300">
                {/* Glow effect on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${product.glowColor}, transparent 70%)`
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon & Status */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${product.gradient} p-3 shadow-lg`}>
                      <product.icon className="w-full h-full text-white" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${product.statusColor}/20 text-white border border-white/10`}>
                      {product.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all">
                    {product.name}
                  </h3>
                  <p className={`text-sm font-medium text-${product.color}-400 mb-4`}>
                    {product.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-gray-400">
                        <feature.icon className={`w-4 h-4 text-${product.color}-500 flex-shrink-0`} />
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  {product.link ? (
                    <a
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 text-sm font-medium text-${product.color}-400 hover:text-${product.color}-300 transition-colors`}
                    >
                      Explore {product.name}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-600">
                      {product.status === 'Coming Soon' ? 'Join waitlist' : 'Learn more'}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Integration Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-gray-600">
            Tracks share <span className="text-teal-500">C(RAID)</span> as a named hybrid. This site is a pretotype, not the UE5 twin.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Products;
