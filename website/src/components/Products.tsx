import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Heart, Globe, ArrowRight, ExternalLink, FlaskConical, Apple, Dumbbell, Moon, Map, Bot, Leaf, ChefHat, FileCode, Workflow, GitBranch, Container } from 'lucide-react';
import { useReducedMotion, useMediaQuery } from '../hooks';

const products = [
  {
    name: 'Blueprint Protocol',
    tagline: 'Open Source Health Optimization',
    description: "Open sourcing Bryan Johnson's Blueprint protocol as an all-in-one health tracker. Systems-thinking design with integrated modules for complete health optimization.",
    icon: Heart,
    color: 'teal',
    gradient: 'from-teal-500 to-teal-600',
    glowColor: 'rgba(20, 184, 166, 0.3)',
    status: 'Track 1',
    statusColor: 'bg-teal-500',
    link: null,
    features: [
      { icon: FlaskConical, text: 'Labs Ingestor - Bloodwork & biomarkers' },
      { icon: Apple, text: 'Nutrition Tracker - Macro/micronutrients' },
      { icon: Dumbbell, text: 'Fitness - Exercise & workout logging' },
      { icon: Moon, text: 'Sleep - Quality, duration, HRV' }
    ]
  },
  {
    name: 'World Simulation',
    tagline: 'Digital Twin to Robot Chef Pipeline',
    description: 'From Google Maps data to fully autonomous robot chef. Create digital twins for robotics training, vertical farming, and complete farm-to-table automation.',
    icon: Globe,
    color: 'amber',
    gradient: 'from-amber-500 to-orange-500',
    glowColor: 'rgba(251, 191, 36, 0.3)',
    status: 'Track 2',
    statusColor: 'bg-amber-500',
    link: null,
    features: [
      { icon: Map, text: 'House Model - Google Maps + indoor pics' },
      { icon: Bot, text: 'Robotics Training - RL in virtual space' },
      { icon: Leaf, text: 'Vertical Farm - Autonomous crop management' },
      { icon: ChefHat, text: 'Robot Chef - Farm-to-table automation' }
    ]
  },
  {
    name: 'Evolve',
    tagline: 'C(RAID) Orchestration',
    description: 'End-to-end autonomous development framework. Multi-agent coordination with Claude Flow integration, custom skills, and parallel git worktree workflows.',
    icon: Cpu,
    color: 'emerald',
    gradient: 'from-emerald-500 to-emerald-600',
    glowColor: 'rgba(16, 185, 129, 0.3)',
    status: 'Track 3',
    statusColor: 'bg-emerald-500',
    link: 'https://github.com/kvnloo/evolve',
    features: [
      { icon: FileCode, text: 'Architecture Diagrams & data flows' },
      { icon: Workflow, text: 'Claude Flow - Multi-agent orchestration' },
      { icon: GitBranch, text: 'Git Worktree - Parallel development' },
      { icon: Container, text: 'E2B Containerization - Sandboxed execution' }
    ]
  }
];

const Products = () => {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 768px)');
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

  return (
    <section id="products" className="py-32 relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-teal-900/10 blur-[150px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-teal-400 uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            THE BLUEPRINT SYSTEM
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="text-white">Products that </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-amber-400">
              work together
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Each product in the Blueprint ecosystem connects to create a unified platform for autonomous self-care.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, idx) => (
            <motion.div
              key={product.name}
              custom={idx}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15, margin: "0px 0px -10% 0px" }}
              whileHover={prefersReducedMotion ? {} : { y: -8, transition: { duration: 0.3 } }}
              className="group relative"
              style={{ willChange: 'transform, opacity, filter' }}
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
            All products share the <span className="text-teal-500">C(RAID)</span> methodology and integrate through the Blueprint platform.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Products;
