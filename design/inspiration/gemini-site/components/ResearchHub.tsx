
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, BookOpen, Layers, Zap } from 'lucide-react';
import { researchData } from '../data/researchData';
import { ViewState } from '../App';

const ResearchHub = ({ onNavigate }: { onNavigate: (view: ViewState) => void }) => {

  const trackConfig = {
    'Blueprint': { color: 'text-cyan-400', bg: 'bg-cyan-500', border: 'border-cyan-500/30', glow: 'bg-cyan-500/10', icon: Zap },
    'World Sim': { color: 'text-orange-400', bg: 'bg-orange-500', border: 'border-orange-500/30', glow: 'bg-orange-500/10', icon: Layers },
    'Evolve': { color: 'text-emerald-400', bg: 'bg-emerald-500', border: 'border-emerald-500/30', glow: 'bg-emerald-500/10', icon: BookOpen },
  };

  return (
    <section className="pt-32 pb-24 px-6 relative z-10 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-teal-400 uppercase mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            SCIENTIFIC DEEP DIVES & GUIDES
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold mb-6"
          >
            Research <span className="text-gray-600">Hub</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl"
          >
            Explore our latest whitepapers on autonomous systems, biophilic design, and human performance optimization.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {researchData.map((article, i) => {
            const config = trackConfig[article.track];
            const Icon = config.icon;
            
            return (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                className="group relative"
                onClick={() => onNavigate(`article:${article.id}`)}
              >
                {/* Card Container */}
                <div className="h-full bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-500 cursor-pointer flex flex-col relative overflow-hidden">
                  
                  {/* Track Stripe */}
                  <div className={`absolute top-0 left-0 w-1 h-full ${config.bg} opacity-50 group-hover:opacity-100 transition-opacity`} />

                  {/* Hover Glow */}
                  <div className={`absolute top-0 right-0 w-64 h-64 ${config.glow} blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  {/* Header Meta */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
                     <div className="flex items-center gap-2">
                        <span className={`flex items-center gap-1.5 px-2 py-1 rounded bg-black/40 border ${config.border} ${config.color} text-[10px] font-bold uppercase tracking-wider`}>
                          <Icon size={10} /> {article.track}
                        </span>
                        <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                          {article.type}
                        </span>
                     </div>
                     <span className="flex items-center gap-1 text-xs font-mono text-gray-500">
                        <Clock size={12} /> {article.readTime}
                     </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-white transition-colors relative z-10">
                    {article.title}
                  </h3>
                  <p className="text-gray-400 mb-8 line-clamp-3 relative z-10 text-sm leading-relaxed">
                    {article.description}
                  </p>

                  {/* Footer */}
                  <div className="mt-auto flex items-center justify-between relative z-10 border-t border-white/5 pt-6">
                    <div className="flex -space-x-2">
                       <div className="w-8 h-8 rounded-full border border-black bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-400">
                          z0
                       </div>
                    </div>
                    <button className={`flex items-center gap-2 text-sm font-bold text-gray-300 group-hover:${config.color} transition-colors`}>
                      Read Article <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ResearchHub;
