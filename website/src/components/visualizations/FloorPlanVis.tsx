import React, { useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { VisProps, FloorPlanRoom } from './types';
import { getIcon } from './iconMap';

/**
 * Processes text to handle escaped newlines
 */
const processTextContent = (text: string | undefined): string => {
  if (!text) return '';
  return text.replace(/\\n/g, '\n');
};

export const FloorPlanVis: React.FC<VisProps> = ({ data, className = '' }) => {
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (!data) return null;
  const rooms = data.rooms || [];
  if (rooms.length === 0) return null;
  const gridCols = Math.min(rooms.length, 4);

  return (
    <div ref={ref} className={`my-12 ${className}`}>
      {data.title && (
        <h4 className="text-sm font-mono text-gray-500 mb-6 uppercase tracking-wider border-b border-white/5 pb-2">
          {data.title}
        </h4>
      )}

      <div className={`grid grid-cols-2 md:grid-cols-${gridCols} gap-4`}>
        {rooms.map((room: FloorPlanRoom, i: number) => {
          const Icon = getIcon(room.icon);
          const isActive = activeRoom === room.id;

          return (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              onClick={() => setActiveRoom(isActive ? null : room.id)}
              className={`
                relative p-6 rounded-xl border cursor-pointer
                transition-all duration-300 group
                ${isActive
                  ? 'bg-teal-500/20 border-teal-500/50 shadow-lg shadow-teal-500/20'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }
              `}
            >
              <div className={`
                w-12 h-12 rounded-lg flex items-center justify-center mb-4
                ${isActive ? 'bg-teal-500/30' : 'bg-white/10'}
                transition-colors duration-300
              `}>
                <Icon className={`w-6 h-6 ${isActive ? 'text-teal-400' : 'text-gray-400'}`} />
              </div>

              <h5 className="font-bold text-white mb-1">{room.name}</h5>
              {room.subtitle && (
                <p className="text-xs text-teal-400 font-mono mb-2">{room.subtitle}</p>
              )}

              <AnimatePresence>
                {isActive && room.description && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-sm text-gray-400 mt-3 leading-relaxed whitespace-pre-line"
                  >
                    {processTextContent(room.description)}
                  </motion.p>
                )}
              </AnimatePresence>

              <div className={`
                absolute top-3 right-3 w-2 h-2 rounded-full
                ${isActive ? 'bg-teal-400' : 'bg-gray-600'}
                transition-colors duration-300
              `} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default FloorPlanVis;
