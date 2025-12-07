import React from 'react';
import { motion, useInView } from 'framer-motion';
import { VisProps, ComparisonItem } from './types';

export const ComparisonMatrixVis: React.FC<VisProps> = ({ data, className = '' }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (!data) return null;
  const headers: string[] = data.headers || [];
  const rows: ComparisonItem[] = data.rows || [];
  if (rows.length === 0) return null;

  return (
    <div ref={ref} className={`my-12 overflow-hidden rounded-xl border border-white/10 ${className}`}>
      {data.title && (
        <div className="px-6 py-4 bg-white/5 border-b border-white/10">
          <h4 className="text-sm font-mono text-gray-500 uppercase tracking-wider">
            {data.title}
          </h4>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-white/5">
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                Category
              </th>
              {headers.map((h, i) => (
                <th key={i} className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {rows.map((row, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.05 }}
                className="hover:bg-white/5 transition-colors"
              >
                <td className="px-6 py-4 text-sm font-medium text-teal-400">
                  {row.category}
                </td>
                {row.items.map((item, j) => (
                  <td
                    key={j}
                    className={`px-6 py-4 text-sm ${item.highlight ? 'text-emerald-400 font-medium' : 'text-gray-300'}`}
                  >
                    {item.value}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonMatrixVis;
