import React from 'react';
import { motion } from 'framer-motion';

interface VisProps {
  data: any;
}

// 1. Timeline / Process Flow
export const TimelineVis: React.FC<VisProps> = ({ data }) => {
  if (!data?.steps?.length) return null;
  return (
    <div className="my-12 p-8 bg-white/5 border border-white/10 rounded-xl overflow-x-auto">
      <div className="min-w-[600px] flex items-center justify-between relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-800 -z-10" />
        {data.steps.map((step: any, i: number) => (
          <div key={i} className="flex flex-col items-center gap-4 relative z-10">
            <div className="w-4 h-4 rounded-full bg-teal-500 border-4 border-[#050505] shadow-[0_0_15px_rgba(20,184,166,0.5)]" />
            <div className="text-center">
              <div className="text-xs font-bold text-teal-400 mb-1 uppercase tracking-wider">{step.label}</div>
              <div className="text-sm font-medium text-gray-300 bg-[#0A0A0A] px-3 py-1 rounded border border-white/10">{step.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 2. Bar Chart
export const BarChartVis: React.FC<VisProps> = ({ data }) => {
  if (!data?.items?.length) return null;
  return (
    <div className="my-12 p-8 bg-white/5 border border-white/10 rounded-xl">
      <h4 className="text-sm font-mono text-gray-500 mb-6 uppercase tracking-wider border-b border-white/5 pb-2">{data.title}</h4>
      <div className="space-y-4">
        {data.items.map((item: any, i: number) => (
          <div key={i} className="group">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-300 font-medium">{item.label}</span>
              <span className="text-teal-400 font-mono">{item.value}%</span>
            </div>
            <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${item.value}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-teal-600 to-emerald-400 rounded-full group-hover:shadow-[0_0_10px_rgba(20,184,166,0.3)] transition-all"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 3. System Architecture Stack
export const SystemStackVis: React.FC<VisProps> = ({ data }) => {
  if (!data?.layers?.length) return null;
  return (
    <div className="my-12 flex flex-col gap-2 max-w-lg mx-auto">
      {data.layers.map((layer: any, i: number) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="p-4 rounded-lg border border-teal-500/20 bg-teal-900/10 text-center relative overflow-hidden group hover:bg-teal-900/20 transition-colors"
        >
          <div className="text-xs font-mono text-teal-500 mb-1">{layer.type}</div>
          <div className="font-bold text-white">{layer.label}</div>
          {i < data.layers.length - 1 && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-px h-4 bg-teal-500/30" />
          )}
        </motion.div>
      ))}
    </div>
  );
};

// 4. Comparison Table
export const ComparisonVis: React.FC<VisProps> = ({ data }) => {
  if (!data?.rows?.length) return null;
  return (
    <div className="my-12 overflow-hidden rounded-xl border border-white/10">
      <div className="grid grid-cols-3 bg-white/5 p-4 text-xs font-bold uppercase tracking-wider text-gray-400">
        <div>Metric</div>
        <div>Human</div>
        <div>Current Robot</div>
      </div>
      <div className="divide-y divide-white/5 bg-black/20">
        {data.rows.map((row: any, i: number) => (
          <div key={i} className="grid grid-cols-3 p-4 text-sm hover:bg-white/5 transition-colors">
            <div className="text-teal-400 font-medium">{row.metric}</div>
            <div className="text-gray-300">{row.human}</div>
            <div className="text-gray-500">{row.robot}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 5. Pyramid / Knowledge Architecture
export const PyramidVis: React.FC<VisProps> = ({ data }) => {
  if (!data?.levels?.length) return null;
  return (
    <div className="my-12 flex flex-col items-center gap-1">
      {data.levels.map((level: any, i: number) => {
        const width = 100 - (i * 20) + '%';
        return (
          <div key={i} className="relative group" style={{ width: width, maxWidth: '600px' }}>
            <div className="bg-gradient-to-r from-teal-900/40 to-emerald-900/40 border border-teal-500/30 text-center py-3 rounded-sm hover:bg-teal-500/20 transition-colors cursor-default">
              <div className="text-xs text-teal-400 uppercase tracking-widest font-mono mb-1">{level.category}</div>
              <div className="font-bold text-white text-sm">{level.label}</div>
            </div>
          </div>
        )
      })}
    </div>
  );
};
