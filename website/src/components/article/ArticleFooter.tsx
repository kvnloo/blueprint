import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface ArticleFooterProps {
  onBack: () => void;
}

const ArticleFooter: React.FC<ArticleFooterProps> = ({ onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="mt-24 pt-12 border-t border-white/10"
    >
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-teal-400 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Hub
        </button>
        <div className="text-xs text-gray-600 font-mono">
          END OF TRANSMISSION
        </div>
      </div>

      {/* Mission Statement */}
      <div className="text-center py-8 border-t border-white/5">
        <p className="text-sm text-gray-500 italic max-w-xl mx-auto">
          This knowledge is shared freely to democratize peak performance and eliminate
          information barriers. Everyone deserves access to research-backed insights.
        </p>
      </div>
    </motion.div>
  );
};

export default ArticleFooter;
