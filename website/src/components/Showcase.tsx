import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Zap, BarChart3, Globe2 } from 'lucide-react';
import { useReducedMotion, useMediaQuery } from '../hooks';

const Showcase = () => {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const blurAmount = isMobile ? 3 : 8;

  // Animation variants with blur effect
  const phoneVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      filter: prefersReducedMotion ? 'blur(0px)' : `blur(${blurAmount}px)`
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.2, 0.8, 0.2, 1]
      }
    }
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      x: 30,
      filter: prefersReducedMotion ? 'blur(0px)' : `blur(${blurAmount}px)`
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        delay: 0.2,
        ease: [0.2, 0.8, 0.2, 1]
      }
    }
  };

  const statVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: prefersReducedMotion ? 'blur(0px)' : `blur(${blurAmount}px)`
    },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        delay: 0.4 + delay * 0.1,
        duration: 0.5,
        ease: [0.2, 0.8, 0.2, 1]
      }
    })
  };

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-900/20 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        
        {/* Phone Mockup */}
        <motion.div
          variants={phoneVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="relative mx-auto lg:mx-0 order-2 lg:order-1"
          style={{ willChange: 'transform, opacity, filter' }}
        >
            <div className="relative z-10 w-[300px] h-[600px] bg-[#0A0A0A] rounded-[3rem] border-8 border-[#1a1a1a] shadow-2xl overflow-hidden ring-1 ring-white/10">
                {/* Dynamic Island */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-3xl z-20" />
                
                {/* Screen Content */}
                <div className="w-full h-full bg-[#050505] relative overflow-hidden flex flex-col">
                    <img 
                        src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" 
                        alt="App Interface" 
                        className="absolute inset-0 w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50" />
                    
                    {/* UI Elements */}
                    <div className="relative z-10 p-6 pt-12 flex-1 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-white font-bold text-lg">zer0.ai</span>
                                <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                            </div>
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-4 border border-white/5">
                                <div className="text-xs text-gray-400 mb-1">System Efficiency</div>
                                <div className="text-2xl font-bold text-white">98.2%</div>
                                <div className="w-full h-1 bg-gray-700 rounded-full mt-3 overflow-hidden">
                                    <div className="h-full w-[98%] bg-teal-500" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="bg-teal-600 text-white p-4 rounded-xl font-medium text-center shadow-lg shadow-teal-900/20">
                                Run Optimization
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Glow behind phone */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-teal-500/10 blur-3xl -z-10 rounded-full" />
        </motion.div>

        {/* Text Content */}
        <motion.div
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="order-1 lg:order-2 space-y-12"
          style={{ willChange: 'transform, opacity, filter' }}
        >
            <div>
                <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Monitor & Control</span>
                    <span className="block">from anywhere.</span>
                </h2>
                <p className="text-lg text-gray-400 max-w-md">
                    Access your digital twin simulations and autonomous agent controls directly from your device. Real-time insights at your fingertips.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
                {[
                    { title: 'Industries Served', val: '10+', icon: Globe2 },
                    { title: 'Data Points', val: '500K+', icon: BarChart3 },
                    { title: 'Efficiency Gains', val: '1,800%', icon: Zap },
                    { title: 'Autonomous', val: '24/7', icon: CheckCircle2 },
                ].map((item, i) => (
                    <motion.div
                      key={i}
                      custom={i}
                      variants={statVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="flex flex-col gap-2"
                      style={{ willChange: 'transform, opacity, filter' }}
                    >
                        <item.icon className="w-6 h-6 text-teal-500 mb-2" />
                        <div className="text-3xl font-bold text-white">{item.val}</div>
                        <div className="text-sm text-gray-500">{item.title}</div>
                        <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent mt-4" />
                    </motion.div>
                ))}
            </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Showcase;