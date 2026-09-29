import React from 'react';
import { Brain, Microscope, Target, Users } from 'lucide-react';

const questions = [
  {
    icon: Target,
    title: 'Can simulation improve the next real decision?',
    text: 'Use match and world models to rank tactical or training hypotheses, then judge them by what happens in reality.',
  },
  {
    icon: Brain,
    title: 'Can coaching adapt to response instead of labels?',
    text: 'Measure how an individual responds to cues, drills, feedback timing and practice structure instead of assigning a fixed learning style.',
  },
  {
    icon: Users,
    title: 'Can expert collaboration become easier than referral chains?',
    text: 'Route a plateau to the right combination of coach, PT, physician, nutritionist, scientist or peer with context and consent intact.',
  },
  {
    icon: Microscope,
    title: 'Can each intervention make the system smarter?',
    text: 'Build an evidence history that distinguishes correlation, expert judgment, hypothesis and verified outcome across time.',
  },
];

const SuccessStories = () => {
  return (
    <section id="questions" className="py-28 px-6 relative z-10 bg-[#050505]/80">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold tracking-wider text-purple-400 uppercase mb-5">Open research questions</div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-5">
            The point is to learn what actually helps people flourish.
          </h2>
          <p className="text-lg text-gray-400">
            These are experiments, not testimonials. ACE should earn stronger claims by measuring real outcomes over time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {questions.map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-[#0A0A0A] p-7">
              <item.icon className="w-6 h-6 text-purple-400 mb-5" />
              <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
              <p className="text-sm leading-relaxed text-gray-500">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-teal-500/20 bg-teal-500/[0.04] p-6">
          <div className="text-xs font-mono text-teal-300 mb-2">RESEARCH RULE</div>
          <p className="text-sm text-gray-400">
            Do not optimize what cannot yet be measured. Do not claim what cannot yet be verified.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
