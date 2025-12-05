import React from 'react';
import { motion, useInView } from 'framer-motion';
import { VisProps, RadialItem } from './types';

export const RadialProgressVis: React.FC<VisProps> = ({ data, className = '' }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (!data) return null;
  const items: RadialItem[] = data.items || [];
  if (items.length === 0) return null;
  const size = 200;
  const strokeWidth = 12;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;

  return (
    <div ref={ref} className={`my-12 flex flex-col md:flex-row items-center gap-8 ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {items.map((item, i) => {
            const circumference = 2 * Math.PI * (radius - i * 20);
            const offset = circumference - (item.value / 100) * circumference;

            return (
              <g key={i}>
                {/* Background */}
                <circle
                  cx={center}
                  cy={center}
                  r={radius - i * 20}
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth={strokeWidth - 2}
                />
                {/* Progress */}
                <motion.circle
                  cx={center}
                  cy={center}
                  r={radius - i * 20}
                  fill="none"
                  stroke={item.color || `hsl(${160 + i * 20}, 70%, 50%)`}
                  strokeWidth={strokeWidth - 2}
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={isInView ? { strokeDashoffset: offset } : {}}
                  transition={{ duration: 1, delay: i * 0.2, ease: "easeOut" }}
                />
              </g>
            );
          })}
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">
              {Math.round(items.reduce((sum, item) => sum + item.value, 0) / items.length)}%
            </div>
            <div className="text-xs text-gray-500">Average</div>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-3">
        {data.title && (
          <h4 className="text-sm font-mono text-gray-500 uppercase tracking-wider mb-4">
            {data.title}
          </h4>
        )}
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-3"
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color || `hsl(${160 + i * 20}, 70%, 50%)` }}
            />
            <span className="text-sm text-gray-300 flex-1">{item.label}</span>
            <span className="text-sm font-mono text-white">{item.value}%</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RadialProgressVis;
