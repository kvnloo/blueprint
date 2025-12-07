import React from 'react';
import { ArrowLeft, Share2 } from 'lucide-react';

interface NavigationControlsProps {
  onBack: () => void;
}

const NavigationControls: React.FC<NavigationControlsProps> = ({ onBack }) => {
  return (
    <div className="fixed top-24 left-6 z-40 hidden xl:flex flex-col gap-4">
      <button
        onClick={onBack}
        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
      >
        <ArrowLeft size={18} />
      </button>
      <div className="w-10 h-px bg-white/10 mx-auto" />
      <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
        <Share2 size={16} />
      </button>
    </div>
  );
};

export default NavigationControls;
