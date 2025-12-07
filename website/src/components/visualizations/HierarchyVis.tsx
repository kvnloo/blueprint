import React, { useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { VisProps, HierarchyNode } from './types';
import { getIcon } from './iconMap';

/**
 * Processes text to handle escaped newlines
 */
const processTextContent = (text: string | undefined): string => {
  if (!text) return '';
  return text.replace(/\\n/g, '\n');
};

export const HierarchyVis: React.FC<VisProps> = ({ data, className = '' }) => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['root']));
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (!data) return null;
  if (!data.root && (!data.nodes || data.nodes.length === 0)) return null;

  const toggleNode = (id: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const renderNode = (node: HierarchyNode, depth: number = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expanded.has(node.id);
    const Icon = getIcon(node.icon);

    return (
      <motion.div
        key={node.id}
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: depth * 0.1 }}
        className="mb-2"
      >
        <div
          onClick={() => hasChildren && toggleNode(node.id)}
          className={`
            flex items-center gap-3 p-3 rounded-lg
            ${hasChildren ? 'cursor-pointer' : ''}
            ${depth === 0 ? 'bg-teal-500/20 border border-teal-500/30' : 'bg-white/5 border border-white/10'}
            hover:bg-white/10 transition-colors duration-200
          `}
          style={{ marginLeft: depth * 24 }}
        >
          {hasChildren && (
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </motion.div>
          )}
          {!hasChildren && <div className="w-4" />}

          <div className={`
            w-8 h-8 rounded-lg flex items-center justify-center
            ${depth === 0 ? 'bg-teal-500/30' : 'bg-white/10'}
          `}>
            <Icon className={`w-4 h-4 ${depth === 0 ? 'text-teal-400' : 'text-gray-400'}`} />
          </div>

          <div className="flex-1">
            <div className="font-medium text-white text-sm">{node.label}</div>
            {node.description && (
              <div className="text-xs text-gray-500 mt-0.5 whitespace-pre-line">{processTextContent(node.description)}</div>
            )}
          </div>

          {node.metrics && node.metrics.length > 0 && (
            <div className="flex gap-4">
              {node.metrics.map((m, i) => (
                <div key={i} className="text-right">
                  <div className="text-xs text-gray-500">{m.label}</div>
                  <div className="text-sm font-mono text-teal-400">{m.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <AnimatePresence>
          {hasChildren && isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {node.children!.map(child => renderNode(child, depth + 1))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div ref={ref} className={`my-12 p-6 bg-white/5 border border-white/10 rounded-xl ${className}`}>
      {data.title && (
        <h4 className="text-sm font-mono text-gray-500 mb-6 uppercase tracking-wider border-b border-white/5 pb-2">
          {data.title}
        </h4>
      )}
      {data.root && renderNode(data.root)}
      {data.nodes && data.nodes.map((node: HierarchyNode) => renderNode(node))}
    </div>
  );
};

export default HierarchyVis;
