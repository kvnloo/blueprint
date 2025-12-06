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

// 4. Comparison Table - Supports multiple data formats
export const ComparisonVis: React.FC<VisProps> = ({ data }) => {
  // Handle categories format (side-by-side comparison cards)
  if (data?.categories?.length) {
    return (
      <div className="my-12">
        {data.title && (
          <h4 className="text-sm font-mono text-gray-500 mb-2 uppercase tracking-wider">{data.title}</h4>
        )}
        {data.subtitle && (
          <p className="text-sm text-gray-400 mb-6">{data.subtitle}</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.categories.map((cat: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 bg-white/5 border border-white/10 rounded-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  cat.color === 'yellow' ? 'bg-yellow-500/20' :
                  cat.color === 'purple' ? 'bg-purple-500/20' :
                  cat.color === 'blue' ? 'bg-blue-500/20' :
                  cat.color === 'green' ? 'bg-green-500/20' :
                  'bg-teal-500/20'
                }`}>
                  <span className="text-lg">{cat.icon === 'zap' ? '⚡' : cat.icon === 'brain' ? '🧠' : '📊'}</span>
                </div>
                <div>
                  <h5 className="font-bold text-white">{cat.name}</h5>
                  {cat.subtitle && <p className="text-xs text-gray-500">{cat.subtitle}</p>}
                </div>
              </div>
              <ul className="space-y-3">
                {cat.items?.map((item: any, j: number) => (
                  <li key={j} className="flex items-start gap-2">
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                      item.impact === 'critical' ? 'bg-red-400' :
                      item.impact === 'high' ? 'bg-yellow-400' :
                      item.impact === 'medium' ? 'bg-blue-400' :
                      'bg-gray-400'
                    }`} />
                    <div>
                      <span className="text-sm font-medium text-teal-400">{item.name}</span>
                      {item.description && (
                        <span className="text-sm text-gray-400"> — {item.description}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              {cat.netEffect && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-sm text-emerald-400 font-medium">{cat.netEffect}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (!data?.rows?.length) return null;

  // Support both old format (metric/human/robot) and new format (aspect/left/right)
  const firstRow = data.rows[0];
  const hasOldFormat = 'metric' in firstRow;
  const hasNewFormat = 'aspect' in firstRow || 'left' in firstRow;

  // Determine headers
  const headers = hasOldFormat
    ? ['Metric', 'Human', 'Current Robot']
    : [data.metricHeader || 'Aspect', data.leftHeader || 'Option A', data.rightHeader || 'Option B'];

  // Get status color
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'error': return 'border-l-4 border-red-500/50 bg-red-500/5';
      case 'warning': return 'border-l-4 border-yellow-500/50 bg-yellow-500/5';
      case 'success': return 'border-l-4 border-emerald-500/50 bg-emerald-500/5';
      default: return '';
    }
  };

  return (
    <div className="my-12 overflow-hidden rounded-xl border border-white/10">
      {data.title && (
        <div className="px-4 py-3 bg-white/5 border-b border-white/10">
          <h4 className="text-sm font-mono text-gray-500 uppercase tracking-wider">{data.title}</h4>
          {data.subtitle && <p className="text-xs text-gray-600 mt-1">{data.subtitle}</p>}
        </div>
      )}
      <div className="grid grid-cols-3 bg-white/5 p-4 text-xs font-bold uppercase tracking-wider text-gray-400">
        {headers.map((header, i) => (
          <div key={i}>{header}</div>
        ))}
      </div>
      <div className="divide-y divide-white/5 bg-black/20">
        {data.rows.map((row: any, i: number) => {
          const col1 = row.metric || row.aspect || row.category || '';
          const col2 = row.human || row.left || row.value1 || '';
          const col3 = row.robot || row.right || row.value2 || '';

          return (
            <div key={i} className={`grid grid-cols-3 p-4 text-sm hover:bg-white/5 transition-colors ${getStatusColor(row.status)}`}>
              <div className="text-teal-400 font-medium">{col1}</div>
              <div className="text-gray-300">{col2}</div>
              <div className="text-gray-500">{col3}</div>
            </div>
          );
        })}
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
