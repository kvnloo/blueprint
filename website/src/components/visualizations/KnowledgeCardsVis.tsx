import React from 'react';
import { motion, useInView } from 'framer-motion';
import { VisProps, KnowledgeCard } from './types';
import { getIcon } from './iconMap';

export const KnowledgeCardsVis: React.FC<VisProps> = ({ data, className = '' }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (!data) return null;
  const cards: KnowledgeCard[] = data.cards || [];
  if (cards.length === 0) return null;

  return (
    <div ref={ref} className={`my-12 ${className}`}>
      {data.title && (
        <h4 className="text-sm font-mono text-gray-500 mb-6 uppercase tracking-wider border-b border-white/5 pb-2">
          {data.title}
        </h4>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, i) => {
          const Icon = getIcon(card.icon);

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="p-5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors group"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-500/30 transition-colors">
                  <Icon className="w-5 h-5 text-teal-400" />
                </div>
                <h5 className="font-bold text-white pt-2">{card.title}</h5>
              </div>

              <p className="text-sm text-gray-400 leading-relaxed mb-3">
                {card.content}
              </p>

              {card.tags && card.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {card.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="text-[10px] px-2 py-1 rounded-full bg-white/5 text-gray-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default KnowledgeCardsVis;
