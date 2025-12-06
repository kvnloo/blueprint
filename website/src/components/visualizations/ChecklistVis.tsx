import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, ChevronDown, ChevronRight } from 'lucide-react';
import { VisProps, ChecklistItem } from './types';
import { getIcon } from './iconMap';

/**
 * Processes text to handle escaped newlines
 */
const processTextContent = (text: string | undefined): string => {
  if (!text) return '';
  return text.replace(/\\n/g, '\n');
};

interface ChecklistTier {
  id: string;
  name: string;
  subtitle?: string;
  importance?: 'critical' | 'high' | 'medium' | 'low';
  items: ChecklistItem[];
}

interface ChecklistAction {
  title: string;
  steps: string[];
  summary?: string;
}

export const ChecklistVis: React.FC<VisProps> = ({ data, className = '' }) => {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [expandedTiers, setExpandedTiers] = useState<Set<string>>(new Set(['tier1']));
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (!data) return null;

  // Support both flat items array and tiered structure
  const tiers: ChecklistTier[] = data.tiers || [];
  const flatItems: ChecklistItem[] = data.items || [];
  const action: ChecklistAction | undefined = data.action;

  // If using flat items, wrap them in a single tier
  const allTiers: ChecklistTier[] = tiers.length > 0 ? tiers : flatItems.length > 0 ? [{
    id: 'default',
    name: data.title || 'Checklist',
    items: flatItems
  }] : [];

  if (allTiers.length === 0 && !action) return null;

  // Calculate total items across all tiers
  const totalItems = allTiers.reduce((sum: number, tier) => sum + (tier.items?.length || 0), 0);

  const toggleItem = (id: string) => {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleTier = (tierId: string) => {
    setExpandedTiers(prev => {
      const next = new Set(prev);
      if (next.has(tierId)) next.delete(tierId);
      else next.add(tierId);
      return next;
    });
  };

  const progress = totalItems > 0 ? (checked.size / totalItems) * 100 : 0;

  const getImportanceColor = (importance?: string) => {
    switch (importance) {
      case 'critical': return 'border-red-500/30 bg-red-500/5';
      case 'high': return 'border-orange-500/30 bg-orange-500/5';
      case 'medium': return 'border-yellow-500/30 bg-yellow-500/5';
      case 'low': return 'border-gray-500/30 bg-gray-500/5';
      default: return 'border-white/10 bg-white/5';
    }
  };

  const getImportanceBadge = (importance?: string) => {
    switch (importance) {
      case 'critical': return <span className="px-2 py-0.5 text-xs bg-red-500/20 text-red-400 rounded">CRITICAL</span>;
      case 'high': return <span className="px-2 py-0.5 text-xs bg-orange-500/20 text-orange-400 rounded">HIGH</span>;
      case 'medium': return <span className="px-2 py-0.5 text-xs bg-yellow-500/20 text-yellow-400 rounded">MEDIUM</span>;
      default: return null;
    }
  };

  return (
    <div ref={ref} className={`my-12 p-6 bg-white/5 border border-white/10 rounded-xl ${className}`}>
      {/* Header */}
      {data.title && (
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-white">
              {data.title}
            </h4>
            <span className="text-sm font-mono text-teal-400">
              {checked.size}/{totalItems}
            </span>
          </div>
          {data.subtitle && (
            <p className="text-sm text-gray-400 mt-1">{data.subtitle}</p>
          )}
        </div>
      )}

      {/* Progress bar */}
      {totalItems > 0 && (
        <div className="h-2 bg-gray-800 rounded-full mb-6 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}

      {/* Tiered checklist */}
      <div className="space-y-4">
        {allTiers.map((tier, tierIndex) => {
          const isExpanded = expandedTiers.has(tier.id);
          const tierItems = tier.items || [];
          const tierChecked = tierItems.filter(item => checked.has(item.id)).length;

          return (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: tierIndex * 0.1 }}
              className={`border rounded-lg overflow-hidden ${getImportanceColor(tier.importance)}`}
            >
              {/* Tier header */}
              <button
                onClick={() => toggleTier(tier.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{tier.name}</span>
                      {getImportanceBadge(tier.importance)}
                    </div>
                    {tier.subtitle && (
                      <span className="text-xs text-gray-500">{tier.subtitle}</span>
                    )}
                  </div>
                </div>
                <span className="text-sm font-mono text-gray-400">
                  {tierChecked}/{tierItems.length}
                </span>
              </button>

              {/* Tier items */}
              {isExpanded && tierItems.length > 0 && (
                <div className="border-t border-white/10 p-4 space-y-3">
                  {tierItems.map((item, itemIndex) => {
                    const isChecked = checked.has(item.id);
                    const IconComponent = item.icon ? getIcon(item.icon) : null;

                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: itemIndex * 0.05 }}
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

                        {IconComponent && (
                          <IconComponent className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isChecked ? 'text-gray-500' : 'text-teal-400'}`} />
                        )}

                        <div className="flex-1">
                          <div className={`text-sm font-medium ${isChecked ? 'text-gray-400 line-through' : 'text-white'}`}>
                            {item.name || item.label}
                          </div>
                          {item.description && (
                            <div className="text-xs text-gray-500 mt-0.5 whitespace-pre-line">{processTextContent(item.description)}</div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Action section */}
      {action && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: allTiers.length * 0.1 }}
          className="mt-6 p-4 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 border border-teal-500/30 rounded-lg"
        >
          <h5 className="font-semibold text-teal-400 mb-3">{action.title}</h5>
          <ol className="space-y-2">
            {action.steps?.map((step, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="font-mono text-teal-500">{i + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          {action.summary && (
            <p className="mt-3 text-sm text-gray-400 italic">{action.summary}</p>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default ChecklistVis;
