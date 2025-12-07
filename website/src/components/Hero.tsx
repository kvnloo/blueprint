import React from 'react';
import { ArrowRight, Search, BarChart3, GitMerge, Rocket, ChefHat } from 'lucide-react';
import { motion } from 'framer-motion';

// Aura-style button CSS
const buttonStyles = `
  .button-custom {
    cursor: pointer;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: all 0.25s ease;
    background: radial-gradient(65.28% 65.28% at 50% 100%, rgba(251, 191, 36, 0.8) 0%, rgba(251, 191, 36, 0) 100%), linear-gradient(0deg, #ea580c, #ea580c);
    border-radius: 9999px;
    border: none;
    padding: 16px 32px;
    min-height: 52px;
  }
  .button-custom::before {
    content: "";
    position: absolute;
    inset: 1px;
    background: linear-gradient(177.95deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%);
    border-radius: 9999px;
    transition: all 0.5s ease-in-out;
    z-index: 0;
  }
  .button-custom::after {
    content: "";
    position: absolute;
    inset: 2px;
    background: radial-gradient(65.28% 65.28% at 50% 100%, rgba(251, 191, 36, 0.8) 0%, rgba(251, 191, 36, 0) 100%), linear-gradient(0deg, #ea580c, #ea580c);
    border-radius: 9999px;
    transition: all 0.5s ease-in-out;
    z-index: 0;
  }
  .button-custom:hover {
    box-shadow: 0 0 30px rgba(251, 191, 36, 0.4);
  }
  .button-custom:hover .btn-inner svg { transform: translateX(2px); }
  .btn-inner {
    z-index: 2;
    gap: 8px;
    position: relative;
    width: 100%;
    color: white;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.875rem;
    font-weight: 500;
  }
  .btn-inner svg { width: 16px; height: 16px; transition: transform 0.3s ease; }
  .points_wrapper { overflow: hidden; width: 100%; height: 100%; pointer-events: none; position: absolute; z-index: 1; }
  .points_wrapper .point { bottom: -10px; position: absolute; animation: floating-points infinite ease-in-out; pointer-events: none; width: 2px; height: 2px; background-color: #fff; border-radius: 9999px; }
  @keyframes floating-points { 0% { transform: translateY(0); } 85% { opacity: 0; } 100% { transform: translateY(-55px); opacity: 0; } }
  .points_wrapper .point:nth-child(1) { left: 10%; opacity: 1; animation-duration: 2.35s; animation-delay: 0.2s; }
  .points_wrapper .point:nth-child(2) { left: 30%; opacity: 0.7; animation-duration: 2.5s; animation-delay: 0.5s; }
  .points_wrapper .point:nth-child(3) { left: 25%; opacity: 0.8; animation-duration: 2.2s; animation-delay: 0.1s; }
  .points_wrapper .point:nth-child(4) { left: 44%; opacity: 0.6; animation-duration: 2.05s; }
  .points_wrapper .point:nth-child(5) { left: 50%; opacity: 1; animation-duration: 1.9s; }
  .points_wrapper .point:nth-child(6) { left: 75%; opacity: 0.5; animation-duration: 1.5s; animation-delay: 1.5s; }
  .points_wrapper .point:nth-child(7) { left: 88%; opacity: 0.9; animation-duration: 2.2s; animation-delay: 0.2s; }
`;

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
      <style>{buttonStyles}</style>
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
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            AUTONOMOUS HEALTH SYSTEM
          </div>

          {/* Headline - Animated text reveal */}
          <h1 className="text-5xl lg:text-7xl font-display font-bold leading-tight">
            {['Farm', 'to', 'Table,'].map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                className="inline-block mr-4"
              >
                {word}
              </motion.span>
            ))}
            <br />
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 inline-block"
            >
              Automated.
            </motion.span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
            A robot chef trained in simulation, cooking meals personalized to your Blueprint health data. From vertical farm to your plate—fully autonomous.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <button className="button-custom">
              <div className="points_wrapper">
                <div className="point"></div>
                <div className="point"></div>
                <div className="point"></div>
                <div className="point"></div>
                <div className="point"></div>
                <div className="point"></div>
                <div className="point"></div>
              </div>
              <span className="btn-inner">
                <ChefHat />
                See How It Works
                <ArrowRight />
              </span>
            </button>
            <span className="text-sm text-gray-500 flex items-center gap-2">
              <span className="text-amber-500">✓</span> Open source protocol
            </span>
          </div>

          {/* C(RAID) Steps */}
          <div className="pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { title: 'Continuous Research', icon: Search, step: 'R', desc: 'Autonomous discovery' },
              { title: 'Continuous Analysis', icon: BarChart3, step: 'A', desc: 'Pattern recognition' },
              { title: 'Continuous Integration', icon: GitMerge, step: 'I', desc: 'Knowledge merging' },
              { title: 'Continuous Deployment', icon: Rocket, step: 'D', desc: 'Ship to production' }
            ].map((item, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="text-xs font-mono text-amber-500 mb-2 group-hover:text-amber-300 transition-colors font-bold">{item.step}</div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-300 group-hover:text-white transition-colors mb-1">
                  <item.icon className="w-4 h-4 text-gray-500 group-hover:text-amber-400" />
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
               <div className="text-xs font-mono text-gray-500">robot_chef_v1.0</div>
            </div>

            {/* Content Image/Dashboard */}
            <div className="relative aspect-video bg-gray-900 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"
                    alt="Robot Chef Kitchen"
                    className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />

                {/* Overlay UI Elements */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center backdrop-blur-md border border-amber-500/30">
                            <ChefHat className="w-5 h-5 text-amber-400" />
                        </div>
                        <div>
                            <div className="text-xs text-amber-400 font-mono">MEAL PREP STATUS</div>
                            <div className="text-sm font-bold text-white">COOKING: 94.2%</div>
                        </div>
                    </div>
                     <div className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 font-mono">
                        LIVE FEED
                    </div>
                </div>

                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            </div>
            
            {/* Control Bar */}
            <div className="p-4 bg-[#0F0F0F] border-t border-white/5 space-y-3">
                <div className="flex items-center justify-between text-xs text-gray-500 font-mono">
                    <span>Protein: 42g</span>
                    <span>Carbs: 28g</span>
                    <span>Fats: 18g</span>
                </div>
                <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-pulse" />
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
             <div className="glass-card p-6 rounded-xl border border-amber-500/20 bg-[#0A0A0A]/90 shadow-[0_10px_40px_-10px_rgba(251,191,36,0.2)]">
                <div className="flex items-center gap-3 mb-3">
                     <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-white/10" />
                     <div className="text-amber-500 text-xl font-serif">"</div>
                </div>
                <p className="text-sm text-gray-300 mb-4 font-medium">
                "My robot chef knows my bloodwork better than I do. Meals are perfectly calibrated to my health goals."
                </p>
                <div className="text-[10px] font-bold tracking-wider text-amber-600 uppercase">
                    Blueprint User • Early Adopter
                </div>
             </div>
          </motion.div>

          {/* Background Glow */}
          <div className="absolute -inset-20 bg-amber-500/20 blur-[100px] -z-10 rounded-full opacity-50 pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default Hero;