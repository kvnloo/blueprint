import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check } from 'lucide-react';
import { VisProps, ChecklistItem } from './types';

export const ChecklistVis: React.FC<VisProps> = ({ data, className = '' }) => {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (!data) return null;
  const items: ChecklistItem[] = data.items || [];
  if (items.length === 0) return null;

  const toggleItem = (id: string) => {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const progress = (checked.size / items.length) * 100;

  return (
    <div ref={ref} className={`my-12 p-6 bg-white/5 border border-white/10 rounded-xl ${className}`}>
      {data.title && (
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-sm font-mono text-gray-500 uppercase tracking-wider">
            {data.title}
          </h4>
          <span className="text-sm font-mono text-teal-400">
            {checked.size}/{items.length}
          </span>
        </div>
      )}

      {/* Progress bar */}
      <div className="h-2 bg-gray-800 rounded-full mb-6 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="space-y-3">
        {items.map((item, i) => {
          const isChecked = checked.has(item.id);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.05 }}
              onClick={() => toggleItem(item.id)}
              className={`
                flex items-start gap-3 p-3 rounded-lg cursor-pointer
                ${isChecked ? 'bg-teal-500/10' : 'bg-white/5 hover:bg-white/10'}
                transition-colors duration-200
              `}
            >
              <div className={`
                w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5
                ${isChecked ? 'border-teal-500 bg-teal-500' : 'border-gray-600'}
                transition-colors duration-200
              `}>
                {isChecked && <Check className="w-3 h-3 text-white" />}
              </div>

              <div>
                <div className={`text-sm font-medium ${isChecked ? 'text-gray-400 line-through' : 'text-white'}`}>
                  {item.label}
                </div>
                {item.description && (
                  <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ChecklistVis;
