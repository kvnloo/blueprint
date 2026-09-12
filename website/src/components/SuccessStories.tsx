import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const stories = [
  {
    id: 'specify',
    category: 'SPECIFY',
    client: 'PCPartPicker for farms',
    challenge: 'Hardware catalogs romanticize the greenhouse before the stack is even named.',
    solution: 'Name the CEA stack first — lights, racks, climate — the way a parts list names a PC.',
    result: 'No yield receipt until a physical build exists. Predicted numbers stay labeled.'
  },
  {
    id: 'simulate',
    category: 'SIMULATE',
    client: 'Yield and watts',
    challenge: 'Spreadsheets and screenshots get treated as the farm.',
    solution: 'Simulate the loop: what the crop needs, what it costs in watts, what it returns in yield.',
    result: 'Sim fidelity beats a hero screenshot when they conflict.'
  },
  {
    id: 'bind',
    category: 'BIND',
    client: 'Live twin is elsewhere',
    challenge: 'This React site is easy to mistake for the photoreal twin.',
    solution: 'Bind a live twin after the spec. Photoreal UE5/Cesium is the twin claim — not this pretotype.',
    result: 'Workers never merge a fake Unreal canvas into Pages.'
  },
  {
    id: 'cell',
    category: 'SOIL TO CELL',
    client: 'Robot chef is downstream',
    challenge: 'Meal-from-biomarker copy collapses this product into a medical protocol.',
    solution: 'Nutrition is logistics after the farm. Measure ethic stays on a separate track.',
    result: 'Johnson Don’t Die is a name collision, not the offer.'
  }
];

const SuccessStories = () => {
  const [expandedId, setExpandedId] = useState<string | null>('specify');

  return (
    <section className="py-24 px-6 relative z-10 bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <h2 className="text-4xl md:text-5xl font-display font-bold">What GrowTwin is for</h2>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400">
             <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
             PRETOTYPE · NO CASE-STUDY RECEIPTS
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

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-10 grid md:grid-cols-3 gap-8 px-4 text-sm text-gray-400">
                        <div>
                          <div className="text-[10px] font-mono text-gray-600 mb-2">TENSION</div>
                          {story.challenge}
                        </div>
                        <div>
                          <div className="text-[10px] font-mono text-gray-600 mb-2">MOVE</div>
                          {story.solution}
                        </div>
                        <div>
                          <div className="text-[10px] font-mono text-gray-600 mb-2">STAMP</div>
                          {story.result}
                        </div>
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
