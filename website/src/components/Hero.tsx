import React from 'react';
import { ArrowRight, Search, BarChart3, GitMerge, Rocket, Leaf } from 'lucide-react';
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
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            C(RAID) · named hybrid
          </div>

          <h1 className="text-5xl lg:text-7xl font-display font-bold leading-tight">
            Soil to cell.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-400 to-teal-300">
              Under an hour a week.
            </span>
          </h1>

          <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
            GrowTwin is PCPartPicker for farms: specify a CEA stack, simulate it, then bind a live twin. This site is the marketing pretotype — not Unreal in the browser, and not Bryan Johnson’s Blueprint Protocol.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <a href="#pipeline" className="group px-8 py-4 rounded-full bg-gradient-to-r from-emerald-700 to-teal-700 text-white font-medium hover:shadow-[0_0_30px_rgba(16,185,129,0.35)] transition-all flex items-center gap-2">
              <Leaf className="w-4 h-4" />
              Read C(RAID)
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <span className="text-sm text-gray-500 flex items-center gap-2">
              <span className="text-amber-400">●</span> Pretotype · photoreal twin is UE5 elsewhere
            </span>
          </div>

          <div className="pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { title: 'Continuous Research', icon: Search, step: 'R', desc: 'What the crop needs' },
              { title: 'Continuous Analysis', icon: BarChart3, step: 'A', desc: 'Yield, watts, cost' },
              { title: 'Continuous Integration', icon: GitMerge, step: 'I', desc: 'Spec into the twin' },
              { title: 'Continuous Deployment', icon: Rocket, step: 'D', desc: 'Bind the physical' }
            ].map((item, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="text-xs font-mono text-teal-500 mb-2 group-hover:text-teal-300 transition-colors font-bold">{item.step}</div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-300 group-hover:text-white transition-colors mb-1">
                  <item.icon className="w-4 h-4 text-gray-500 group-hover:text-teal-400" />
                  {item.title.split(' ')[1]}
                </div>
                <div className="text-xs text-gray-600">{item.desc}</div>
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
               <div className="text-xs font-mono text-gray-500">grow_twin · pretotype</div>
            </div>

            {/* Content Image/Dashboard */}
            <div className="relative aspect-video bg-gray-900 overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&q=80" 
                    alt="Vertical farm foliage — marketing still, not the UE5 twin"
                    className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                    <div>
                        <div className="text-xs text-amber-400 font-mono">GARDEN FIRST</div>
                        <div className="text-sm font-bold text-white">CEA stack · specify then simulate</div>
                    </div>
                     <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 font-mono">
                        PRETOTYPE
                    </div>
                </div>

                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            </div>
            
            {/* Control Bar */}
            <div className="p-4 bg-[#0F0F0F] border-t border-white/5 space-y-3">
                <div className="flex items-center justify-between text-xs text-gray-500 font-mono">
                    <span>Input: CEA spec</span>
                    <span>Output: yield · watts</span>
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
                "Specify the cheapest-viable CEA stack. Measure yield and watts. Do not romanticize the greenhouse."
                </p>
                <div className="text-[10px] font-bold tracking-wider text-amber-600 uppercase">
                    GrowTwin · measure, don’t guess
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