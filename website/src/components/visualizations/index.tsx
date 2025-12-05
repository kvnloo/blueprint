import React, { useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  ChevronRight, ChevronDown, Zap, Brain, Leaf, Home,
  Target, Layers, GitBranch, ArrowRight, Check, Clock,
  Lightbulb, BookOpen, Dumbbell, Heart, Star, Trophy,
  Flame, Droplets, Sun, Moon, Wind, Sparkles
} from 'lucide-react';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface VisProps {
  data: any;
  className?: string;
}

export interface FloorPlanRoom {
  id: string;
  name: string;
  subtitle?: string;
  description?: string;
  icon?: string;
  color?: string;
  position?: { x: number; y: number };
  connections?: string[];
}

export interface FloorPlanData {
  title: string;
  rooms: FloorPlanRoom[];
  layout?: 'grid' | 'radial' | 'flow';
}

export interface HierarchyNode {
  id: string;
  label: string;
  description?: string;
  children?: HierarchyNode[];
  icon?: string;
  color?: string;
  metrics?: { label: string; value: string }[];
}

export interface ProcessStep {
  id: string;
  label: string;
  description?: string;
  duration?: string;
  icon?: string;
  substeps?: string[];
}

export interface MetricCard {
  label: string;
  value: string | number;
  unit?: string;
  change?: number;
  icon?: string;
  color?: string;
}

export interface ComparisonItem {
  category: string;
  items: { label: string; value: string | number; highlight?: boolean }[];
}

// ============================================================================
// ICON MAPPING
// ============================================================================

const iconMap: Record<string, React.ElementType> = {
  zap: Zap, brain: Brain, leaf: Leaf, home: Home,
  target: Target, layers: Layers, branch: GitBranch, arrow: ArrowRight,
  check: Check, clock: Clock, lightbulb: Lightbulb, book: BookOpen,
  dumbbell: Dumbbell, heart: Heart, star: Star, trophy: Trophy,
  flame: Flame, droplets: Droplets, sun: Sun, moon: Moon,
  wind: Wind, sparkles: Sparkles
};

const getIcon = (name?: string) => {
  if (!name) return Sparkles;
  return iconMap[name.toLowerCase()] || Sparkles;
};

// ============================================================================
// 1. INTERACTIVE FLOOR PLAN
// ============================================================================

export const FloorPlanVis: React.FC<VisProps> = ({ data, className = '' }) => {
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Null check to prevent blank rendering
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
                    className="text-sm text-gray-400 mt-3 leading-relaxed"
                  >
                    {room.description}
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

// ============================================================================
// 2. ANIMATED HIERARCHY TREE
// ============================================================================

export const HierarchyVis: React.FC<VisProps> = ({ data, className = '' }) => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['root']));
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Null check to prevent blank rendering
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
              <div className="text-xs text-gray-500 mt-0.5">{node.description}</div>
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

// ============================================================================
// 3. PROCESS FLOW TIMELINE
// ============================================================================

// Calculate reading time based on text length (average 200 words per minute)
const calculateStepDuration = (step: ProcessStep): number => {
  const baseTime = 2000; // Minimum 2 seconds
  const wordsPerMs = 200 / 60000; // words per millisecond

  let textLength = (step.label?.length || 0) + (step.description?.length || 0);
  if (step.substeps) {
    textLength += step.substeps.join(' ').length;
  }

  // Estimate word count (average 5 chars per word)
  const wordCount = textLength / 5;
  const readingTime = wordCount / wordsPerMs;

  // Return at least base time, max 8 seconds
  return Math.min(Math.max(baseTime, readingTime), 8000);
};

export const ProcessFlowVis: React.FC<VisProps> = ({ data, className = '' }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Null check to prevent blank rendering
  if (!data) return null;
  const steps: ProcessStep[] = data.steps || [];
  if (steps.length === 0) return null;

  // Auto-advance to next step based on content length
  useEffect(() => {
    if (!isInView || isPaused) return;

    const currentStep = steps[activeStep];
    const duration = calculateStepDuration(currentStep);

    const timer = setTimeout(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, duration);

    return () => clearTimeout(timer);
  }, [activeStep, isInView, isPaused, steps]);

  const handleStepClick = useCallback((index: number) => {
    setActiveStep(index);
    setIsPaused(true);
    // Resume auto-play after 5 seconds of inactivity
    setTimeout(() => setIsPaused(false), 5000);
  }, []);

  return (
    <div ref={ref} className={`my-12 ${className}`}>
      {data.title && (
        <h4 className="text-sm font-mono text-gray-500 mb-6 uppercase tracking-wider border-b border-white/5 pb-2">
          {data.title}
        </h4>
      )}

      {/* Progress Bar */}
      <div className="relative mb-8">
        {/* Background line */}
        <div className="absolute top-4 left-[4%] right-[4%] h-0.5 bg-gray-800" />
        {/* Progress line */}
        <motion.div
          className="absolute top-4 left-[4%] h-0.5 bg-gradient-to-r from-teal-500 to-emerald-400"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${((activeStep) / (steps.length - 1)) * 92}%` } : {}}
          transition={{ duration: 0.5 }}
        />

        <div className="relative flex justify-between">
          {steps.map((step, i) => {
            const Icon = getIcon(step.icon);
            const isActive = i === activeStep;
            const isComplete = i < activeStep;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                onClick={() => handleStepClick(i)}
                className="flex flex-col items-center cursor-pointer group"
              >
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center
                  border-2 transition-all duration-300 bg-[#0a0a0a]
                  ${isActive
                    ? 'border-teal-500 bg-teal-500/20 shadow-lg shadow-teal-500/30 scale-110'
                    : isComplete
                      ? 'border-emerald-500 bg-emerald-500/20'
                      : 'border-gray-600 bg-[#0a0a0a] group-hover:border-gray-500'
                  }
                `}>
                  {isComplete ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Icon className={`w-4 h-4 ${isActive ? 'text-teal-400' : 'text-gray-500'}`} />
                  )}
                </div>

                <div className="mt-3 text-center">
                  <div className={`
                    text-xs font-medium transition-colors duration-200
                    ${isActive ? 'text-teal-400' : 'text-gray-500'}
                  `}>
                    {step.label}
                  </div>
                  {step.duration && (
                    <div className="text-[10px] text-gray-600 mt-0.5">{step.duration}</div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Active Step Detail */}
      <AnimatePresence mode="wait">
        {steps[activeStep] && (
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-6 bg-white/5 border border-white/10 rounded-xl"
          >
            <h5 className="font-bold text-white mb-2">{steps[activeStep].label}</h5>
            {steps[activeStep].description && (
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {steps[activeStep].description}
              </p>
            )}
            {steps[activeStep].substeps && (
              <ul className="space-y-2">
                {steps[activeStep].substeps.map((sub, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-2 text-sm text-gray-300"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                    {sub}
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================================================
// 4. METRICS DASHBOARD
// ============================================================================

export const MetricsDashboardVis: React.FC<VisProps> = ({ data, className = '' }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Null check to prevent blank rendering
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

// ============================================================================
// 5. ANIMATED COMPARISON MATRIX
// ============================================================================

export const ComparisonMatrixVis: React.FC<VisProps> = ({ data, className = '' }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Null check to prevent blank rendering
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

// ============================================================================
// 6. RADIAL PROGRESS CHART
// ============================================================================

export const RadialProgressVis: React.FC<VisProps> = ({ data, className = '' }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Null check to prevent blank rendering
  if (!data) return null;
  const items: { label: string; value: number; color?: string }[] = data.items || [];
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

// ============================================================================
// 7. INTERACTIVE CHECKLIST
// ============================================================================

export const ChecklistVis: React.FC<VisProps> = ({ data, className = '' }) => {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Null check to prevent blank rendering
  if (!data) return null;
  const items: { id: string; label: string; description?: string }[] = data.items || [];
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

// ============================================================================
// 8. ANIMATED QUOTE HIGHLIGHT
// ============================================================================

export const QuoteHighlightVis: React.FC<VisProps> = ({ data, className = '' }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Null check to prevent blank rendering
  if (!data || !data.quote) return null;

  return (
    <motion.blockquote
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6 }}
      className={`
        my-16 relative px-8 py-10
        bg-gradient-to-br from-teal-500/10 to-emerald-500/5
        border-l-4 border-teal-500 rounded-r-2xl
        ${className}
      `}
    >
      <div className="absolute top-4 left-4 text-6xl text-teal-500/20 font-serif">"</div>

      <p className="relative text-xl md:text-2xl font-medium text-white leading-relaxed mb-4">
        {data.quote}
      </p>

      {data.author && (
        <footer className="text-sm text-gray-400">
          — <span className="text-teal-400">{data.author}</span>
          {data.source && <span className="text-gray-500">, {data.source}</span>}
        </footer>
      )}
    </motion.blockquote>
  );
};

// ============================================================================
// 9. KNOWLEDGE CARD GRID
// ============================================================================

export const KnowledgeCardsVis: React.FC<VisProps> = ({ data, className = '' }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Null check to prevent blank rendering
  if (!data) return null;
  const cards: { title: string; content: string; icon?: string; tags?: string[] }[] = data.cards || [];
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

// ============================================================================
// 10. ANIMATED ASCII ART (For preserving original diagrams)
// ============================================================================

export const ASCIIArtVis: React.FC<VisProps> = ({ data, className = '' }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [revealed, setRevealed] = useState(false);

  // Null check to prevent crashes when data is missing
  if (!data || !data.content) return null;

  useEffect(() => {
    if (isInView && !revealed) {
      setRevealed(true);
    }
  }, [isInView, revealed]);

  const lines = data.content.split('\n');

  return (
    <div ref={ref} className={`my-12 overflow-hidden ${className}`}>
      {data.title && (
        <h4 className="text-sm font-mono text-gray-500 mb-4 uppercase tracking-wider">
          {data.title}
        </h4>
      )}

      <div className="p-6 bg-[#0a0a0a] border border-white/10 rounded-xl overflow-x-auto">
        <pre className="font-mono text-xs md:text-sm leading-relaxed">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={revealed ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.02, duration: 0.3 }}
              className="text-teal-400/80 whitespace-pre"
            >
              {line || '\u00A0'}
            </motion.div>
          ))}
        </pre>
      </div>
    </div>
  );
};

// ============================================================================
// EXPORT ALL
// ============================================================================

export {
  FloorPlanVis as FloorPlan,
  HierarchyVis as Hierarchy,
  ProcessFlowVis as ProcessFlow,
  MetricsDashboardVis as MetricsDashboard,
  ComparisonMatrixVis as ComparisonMatrix,
  RadialProgressVis as RadialProgress,
  ChecklistVis as Checklist,
  QuoteHighlightVis as QuoteHighlight,
  KnowledgeCardsVis as KnowledgeCards,
  ASCIIArtVis as ASCIIArt
};
