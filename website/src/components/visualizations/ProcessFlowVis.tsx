import React, { useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { VisProps, ProcessStep } from './types';
import { getIcon } from './iconMap';

// Calculate reading time based on text length (average 200 words per minute)
const calculateDuration = (step: ProcessStep): number => {
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

  if (!data) return null;
  const steps: ProcessStep[] = data.steps || [];
  if (steps.length === 0) return null;

  // Auto-advance to next step
  useEffect(() => {
    if (!isInView || isPaused) return;

    const currentStep = steps[activeStep];
    const duration = calculateDuration(currentStep);

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
        {/* Background line - positioned behind icons */}
        <div className="absolute top-4 left-[4%] right-[4%] h-0.5 bg-gray-800" style={{ zIndex: 0 }} />

        {/* Progress line - positioned behind icons */}
        <motion.div
          className="absolute top-4 left-[4%] h-0.5 bg-gradient-to-r from-teal-500 to-emerald-400"
          style={{ zIndex: 0 }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${((activeStep) / (steps.length - 1)) * 92}%` } : {}}
          transition={{ duration: 0.5 }}
        />

        <div className="relative flex justify-between" style={{ zIndex: 1 }}>
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
                      : 'border-gray-600 group-hover:border-gray-500'
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

export default ProcessFlowVis;
