import React from 'react';
import { Leaf, Gauge, Cpu, Timer } from 'lucide-react';

const Showcase = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-900/20 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">

        <div className="relative mx-auto lg:mx-0 order-2 lg:order-1 w-full max-w-md">
            <div className="relative z-10 rounded-3xl border border-white/10 bg-[#0A0A0A] overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5">
                    <span className="text-xs font-mono text-amber-400">grow_twin · CEA spec</span>
                    <span className="text-[10px] font-mono text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">PRETOTYPE</span>
                </div>
                <div className="relative aspect-[4/5] bg-gradient-to-br from-[#1a3d24] via-[#243d28] to-[#0c0d0b]">
                    <div
                      className="absolute inset-0 opacity-40"
                      style={{
                        backgroundImage:
                          'repeating-linear-gradient(90deg, transparent 0, transparent 18px, rgba(16,185,129,0.12) 18px, rgba(199,237,36,0.12) 20px), repeating-linear-gradient(0deg, transparent 0, transparent 22px, rgba(16,185,129,0.08) 22px, rgba(16,185,129,0.08) 24px)',
                      }}
                    />
                    <div className="absolute inset-0 flex flex-col justify-end p-6 space-y-3">
                        <div className="bg-black/50 backdrop-blur-md rounded-2xl border border-white/10 p-4">
                            <div className="text-[10px] font-mono text-gray-400 mb-1">Yield · predicted</div>
                            <div className="text-2xl font-bold text-white">until a physical build</div>
                        </div>
                        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                            <div className="text-[10px] font-mono text-gray-400 mb-1">Watts · predicted</div>
                            <div className="text-lg font-bold text-amber-200">specify the stack first</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/10 blur-3xl -z-10 rounded-full" />
        </div>

        <div className="order-1 lg:order-2 space-y-12">
            <div>
                <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Specify, simulate,</span>
                    <span className="block">then bind the twin.</span>
                </h2>
                <p className="text-lg text-gray-400 max-w-md">
                    GrowTwin is PCPartPicker for farms. This site is the marketing pretotype — not a live twin, not Unreal in the browser, and not a wellness app.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
                {[
                    { title: 'Software offer', val: 'CEA spec', icon: Leaf },
                    { title: 'Honest metrics', val: 'Yield · W', icon: Gauge },
                    { title: 'Twin claim', val: 'UE5 elsewhere', icon: Cpu },
                    { title: 'Human week', val: '<1 hour', icon: Timer },
                ].map((item, i) => (
                    <div key={i} className="flex flex-col gap-2">
                        <item.icon className="w-6 h-6 text-emerald-500 mb-2" />
                        <div className="text-3xl font-bold text-white">{item.val}</div>
                        <div className="text-sm text-gray-500">{item.title}</div>
                        <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent mt-4" />
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
