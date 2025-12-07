import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ArrowUpRight } from 'lucide-react';

const stories = [
  {
    id: 'research',
    category: 'RESEARCH',
    client: 'AgriTech Labs',
    challenge: 'Data fragmentation slowed down yield prediction models significantly.',
    solution: 'Deployed zer0\'s distributed agent network to unify data streams.',
    result: 'Achieved a 40% reduction in modeling time and doubled prediction accuracy.'
  },
  {
    id: 'vertical',
    category: 'VERTICAL FARMING',
    client: 'Urban Greens Co',
    challenge: 'High energy costs in climate control systems eating into margins.',
    solution: 'Implemented AI-driven HVAC modulation using digital twins.',
    result: 'Reduced energy consumption by 22% while increasing crop yield by 15%.'
  },
  {
    id: 'hydro',
    category: 'HYDROPONICS',
    client: 'AquaGrow Systems',
    challenge: 'Manual nutrient monitoring was leading to inconsistent PH levels.',
    solution: 'Autonomous sensor array with real-time chemical balancing agents.',
    result: 'Eliminated manual testing completely. 100% consistent nutrient delivery.'
  },
  {
    id: 'greenhouse',
    category: 'GREENHOUSE',
    client: 'SolarLeaf Farms',
    challenge: 'Unpredictable weather patterns disrupting harvest schedules.',
    solution: 'Predictive weather modeling integrated with automated shielding.',
    result: 'Prevented 3 major crop loss events in the first year alone.'
  }
];

const SuccessStories = () => {
  const [expandedId, setExpandedId] = useState<string | null>('research');

  return (
    <section className="py-24 px-6 relative z-10 bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <h2 className="text-4xl md:text-5xl font-display font-bold">Success Stories</h2>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-orange-500">
             <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
             CASE STUDIES
          </div>
        </div>

        <div className="divide-y divide-white/10 border-t border-b border-white/10">
          {stories.map((story) => {
            const isOpen = expandedId === story.id;
            return (
              <div 
                key={story.id} 
                className="group cursor-pointer bg-transparent transition-colors hover:bg-white/[0.02]"
                onClick={() => setExpandedId(isOpen ? null : story.id)}
              >
                {/* Header Row */}
                <div className="py-8 flex items-center justify-between">
                  <div className="grid md:grid-cols-2 gap-8 w-full items-center">
                    <div className="text-xs font-mono text-gray-500 uppercase tracking-widest pl-4 border-l border-teal-500/0 group-hover:border-teal-500 transition-colors">
                      {story.category}
                    </div>
                    <div className="flex items-center justify-between pr-4">
                      <div className="text-xl md:text-2xl font-display font-medium text-white group-hover:text-teal-400 transition-colors">
                        {story.client}
                      </div>
                      <div className={`p-2 rounded-full border border-white/10 text-white/50 transition-all duration-300 ${isOpen ? 'bg-teal-500 text-black border-teal-500 rotate-90' : 'group-hover:bg-white/10 group-hover:text-white'}`}>
                        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-10 pt-2 grid md:grid-cols-3 gap-8 pl-4 pr-12">
                         <div className="space-y-2">
                            <div className="text-xs font-bold text-gray-600 uppercase">Challenge</div>
                            <p className="text-sm text-gray-400 leading-relaxed">{story.challenge}</p>
                         </div>
                         <div className="space-y-2">
                            <div className="text-xs font-bold text-gray-600 uppercase">Solution</div>
                            <p className="text-sm text-gray-400 leading-relaxed">{story.solution}</p>
                         </div>
                         <div className="space-y-2">
                            <div className="text-xs font-bold text-teal-600 uppercase">Result</div>
                            <p className="text-sm text-gray-200 leading-relaxed font-medium">{story.result}</p>
                         </div>
                      </div>
                      
                      <div className="pb-8 pl-4">
                         <button className="text-xs font-bold uppercase tracking-wider text-teal-500 flex items-center gap-1 hover:text-teal-400">
                            Read Full Case Study <ArrowUpRight size={14} />
                         </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;