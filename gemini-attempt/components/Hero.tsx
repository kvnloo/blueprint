import React from 'react';
import { ArrowRight, LayoutGrid, Cpu, Rocket, Play, Activity, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Column: Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-teal-400 uppercase">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            AUTONOMOUS SYSTEMS 2.0
          </div>

          {/* Headline */}
          <h1 className="text-5xl lg:text-7xl font-display font-bold leading-tight">
            Build Smarter <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-200">
              Systems.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
            Transform operations with AI-powered autonomous agents and digital twins. Our systems learn, adapt, and optimize—so you can focus on what matters.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <button className="group px-8 py-4 rounded-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-medium hover:shadow-[0_0_30px_rgba(20,184,166,0.4)] transition-all flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              Start Building
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <span className="text-sm text-gray-500 flex items-center gap-2">
              <span className="text-teal-500">✓</span> Free consultation
            </span>
          </div>

          {/* Steps */}
          <div className="pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: 'Design Architecture', icon: LayoutGrid, step: '01' },
              { title: 'AI Simulation', icon: Cpu, step: '02' },
              { title: 'Deploy & Scale', icon: Rocket, step: '03' }
            ].map((item, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="text-xs font-mono text-gray-600 mb-2 group-hover:text-teal-400 transition-colors">{item.step}</div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                  <item.icon className="w-4 h-4 text-gray-500 group-hover:text-teal-400" />
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Visuals */}
        <div className="relative perspective-1000 group">
          
          {/* Main Card */}
          <motion.div 
            initial={{ opacity: 0, rotateX: 20, rotateY: -20, scale: 0.9 }}
            animate={{ opacity: 1, rotateX: 0, rotateY: 0, scale: 1 }}
            transition={{ duration: 1, type: "spring" }}
            className="relative z-20 bg-[#0A0A0A] rounded-2xl border border-white/10 shadow-2xl overflow-hidden group-hover:rotate-y-2 group-hover:rotate-x-2 transition-transform duration-500"
          >
            {/* Header UI */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5">
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
               </div>
               <div className="text-xs font-mono text-gray-500">system_monitor_v2.0</div>
            </div>

            {/* Content Image/Dashboard */}
            <div className="relative aspect-video bg-gray-900 overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&q=80" 
                    alt="Autonomous System Dashboard" 
                    className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                
                {/* Overlay UI Elements */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center backdrop-blur-md border border-teal-500/30">
                            <Activity className="w-5 h-5 text-teal-400" />
                        </div>
                        <div>
                            <div className="text-xs text-teal-400 font-mono">SYSTEM STATUS</div>
                            <div className="text-sm font-bold text-white">OPTIMIZING: 98.4%</div>
                        </div>
                    </div>
                     <div className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-xs text-teal-300 font-mono">
                        LIVE FEED
                    </div>
                </div>

                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            </div>
            
            {/* Control Bar */}
            <div className="p-4 bg-[#0F0F0F] border-t border-white/5 space-y-3">
                <div className="flex items-center justify-between text-xs text-gray-500 font-mono">
                    <span>Input: Sensor_Array_A</span>
                    <span>Output: Actuator_B</span>
                </div>
                <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full animate-pulse" />
                </div>
            </div>
          </motion.div>

          {/* Floating Element 1 - Testimonial */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute -bottom-10 -left-10 z-30 max-w-xs"
          >
             <div className="glass-card p-6 rounded-xl border border-teal-500/20 bg-[#0A0A0A]/90 shadow-[0_10px_40px_-10px_rgba(20,184,166,0.2)]">
                <div className="flex items-center gap-3 mb-3">
                     <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-white/10" />
                     <div className="text-teal-500 text-xl font-serif">"</div>
                </div>
                <p className="text-sm text-gray-300 mb-4 font-medium">
                "zer0's autonomous agents reduced our optimization cycles from weeks to hours."
                </p>
                <div className="text-[10px] font-bold tracking-wider text-teal-600 uppercase">
                    Verified Client • 5.0 Rating
                </div>
             </div>
          </motion.div>

          {/* Background Glow */}
          <div className="absolute -inset-20 bg-teal-500/20 blur-[100px] -z-10 rounded-full opacity-50 pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default Hero;