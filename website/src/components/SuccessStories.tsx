import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ArrowUpRight } from 'lucide-react';

const stories = [
  {
    id: 'research',
    category: 'AI + ROBOTICS',
    client: 'AeroFarms + Nokia Bell Labs',
    challenge: 'Traditional vertical farms lacked real-time crop monitoring and precision data collection across large-scale indoor operations.',
    solution: 'Deployed 5G-connected autonomous drones with AI vision systems and IoT sensor networks for continuous crop health monitoring.',
    result: 'Achieved real-time anomaly detection, optimized resource allocation, and established a scalable model for AI-driven precision agriculture.',
    caseStudyUrl: 'https://www.datanext.ai/case-study/aerofarms-aeroponics-vertical-farming/',
    caseStudySource: 'DataNext AI Case Study: AeroFarms Aeroponic Vertical Farming'
  },
  {
    id: 'vertical',
    category: 'VERTICAL FARMING',
    client: 'AI-GECS Research Consortium',
    challenge: 'Energy-intensive HVAC systems in controlled environment agriculture were driving unsustainable operational costs.',
    solution: 'Developed a digital twin framework with AI-based environmental control for predictive climate management and energy optimization.',
    result: 'Demonstrated significant energy reduction while maintaining optimal growing conditions through intelligent load balancing.',
    caseStudyUrl: 'https://www.mdpi.com/2071-1050/16/24/10958',
    caseStudySource: 'MDPI Sustainability: AI-Based Greenhouse Environmental Control'
  },
  {
    id: 'hydro',
    category: 'HYDROPONICS',
    client: 'Cairo Smart Agriculture Lab',
    challenge: 'Manual nutrient and pH monitoring in hydroponic greenhouses led to inconsistent growing conditions and crop losses.',
    solution: 'Implemented IoT-based automation with ESP32 microcontrollers, real-time sensors, and mobile app control for nutrient delivery.',
    result: 'Achieved fully automated nutrient management with remote monitoring, reducing labor costs and improving crop consistency.',
    caseStudyUrl: 'https://www.sciencedirect.com/science/article/pii/S2090447923002307',
    caseStudySource: 'ScienceDirect: Smart Automated Hydroponic System Using IoT'
  },
  {
    id: 'greenhouse',
    category: 'GREENHOUSE',
    client: 'Taiwan TARI Research Institute',
    challenge: 'Unpredictable temperature fluctuations in greenhouses were causing heat stress and reduced crop yields.',
    solution: 'Built an AI-powered temperature prediction system using neural networks trained on historical climate data for proactive control.',
    result: 'Enabled predictive ventilation and cooling activation, preventing heat damage and optimizing energy use in greenhouse operations.',
    caseStudyUrl: 'https://www.mdpi.com/2311-7524/9/8/853',
    caseStudySource: 'MDPI Horticulturae: AI Temperature Prediction for Greenhouses'
  }
];

const SuccessStories = () => {
  const [expandedId, setExpandedId] = useState<string | null>('research');

  return (
    <section className="py-24 px-6 relative z-10 bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <h2 className="text-4xl md:text-5xl font-display font-bold">Success Stories</h2>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-orange-500">
             <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
             CASE STUDIES
          </div>
        </div>

        <div className="divide-y divide-white/10 border-t border-b border-white/10">
          {stories.map((story) => {
            const isOpen = expandedId === story.id;
            return (
              <div 
                key={story.id} 
                className="group cursor-pointer bg-transparent transition-colors hover:bg-white/[0.02]"
                onClick={() => setExpandedId(isOpen ? null : story.id)}
              >
                {/* Header Row */}
                <div className="py-8 flex items-center justify-between">
                  <div className="grid md:grid-cols-2 gap-8 w-full items-center">
                    <div className="text-xs font-mono text-gray-500 uppercase tracking-widest pl-4 border-l border-teal-500/0 group-hover:border-teal-500 transition-colors">
                      {story.category}
                    </div>
                    <div className="flex items-center justify-between pr-4">
                      <div className="text-xl md:text-2xl font-display font-medium text-white group-hover:text-teal-400 transition-colors">
                        {story.client}
                      </div>
                      <div className={`p-2 rounded-full border border-white/10 text-white/50 transition-all duration-300 ${isOpen ? 'bg-teal-500 text-black border-teal-500 rotate-90' : 'group-hover:bg-white/10 group-hover:text-white'}`}>
                        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-10 pt-2 grid md:grid-cols-3 gap-8 pl-4 pr-12">
                         <div className="space-y-2">
                            <div className="text-xs font-bold text-gray-600 uppercase">Challenge</div>
                            <p className="text-sm text-gray-400 leading-relaxed">{story.challenge}</p>
                         </div>
                         <div className="space-y-2">
                            <div className="text-xs font-bold text-gray-600 uppercase">Solution</div>
                            <p className="text-sm text-gray-400 leading-relaxed">{story.solution}</p>
                         </div>
                         <div className="space-y-2">
                            <div className="text-xs font-bold text-teal-600 uppercase">Result</div>
                            <p className="text-sm text-gray-200 leading-relaxed font-medium">{story.result}</p>
                         </div>
                      </div>
                      
                      <div className="pb-8 pl-4">
                         <a
                           href={story.caseStudyUrl}
                           target="_blank"
                           rel="noopener noreferrer"
                           onClick={(e) => e.stopPropagation()}
                           className="text-xs font-bold uppercase tracking-wider text-teal-500 flex items-center gap-1 hover:text-teal-400 transition-colors"
                         >
                            Read Related Research <ArrowUpRight size={14} />
                         </a>
                         <p className="text-xs text-gray-600 mt-1">{story.caseStudySource}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;