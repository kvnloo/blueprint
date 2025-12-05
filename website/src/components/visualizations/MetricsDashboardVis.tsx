import React from 'react';
import { motion, useInView } from 'framer-motion';
import { VisProps, MetricCard } from './types';
import { getIcon } from './iconMap';

export const MetricsDashboardVis: React.FC<VisProps> = ({ data, className = '' }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (!data) return null;
  const metrics: MetricCard[] = data.metrics || [];
  if (metrics.length === 0) return null;

  return (
    <div ref={ref} className={`my-12 ${className}`}>
      {data.title && (
        <h4 className="text-sm font-mono text-gray-500 mb-6 uppercase tracking-wider border-b border-white/5 pb-2">
          {data.title}
        </h4>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric, i) => {
          const Icon = getIcon(metric.icon);

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.05 }}
              className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-teal-400" />
                </div>
                {metric.change !== undefined && (
                  <span className={`text-xs font-mono ${metric.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {metric.change >= 0 ? '+' : ''}{metric.change}%
                  </span>
                )}
              </div>

              <div className="text-2xl font-bold text-white mb-1">
                {metric.value}
                {metric.unit && <span className="text-sm text-gray-500 ml-1">{metric.unit}</span>}
              </div>
              <div className="text-xs text-gray-500">{metric.label}</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default MetricsDashboardVis;
