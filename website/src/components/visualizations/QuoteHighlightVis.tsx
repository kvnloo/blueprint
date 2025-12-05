import React from 'react';
import { motion, useInView } from 'framer-motion';
import { VisProps } from './types';

export const QuoteHighlightVis: React.FC<VisProps> = ({ data, className = '' }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (!data || !data.quote) return null;

  return (
    <motion.blockquote
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6 }}
      className={`
        my-16 relative px-8 py-10
        bg-gradient-to-br from-teal-500/10 to-emerald-500/5
        border-l-4 border-teal-500 rounded-r-2xl
        ${className}
      `}
    >
      <div className="absolute top-4 left-4 text-6xl text-teal-500/20 font-serif">"</div>

      <p className="relative text-xl md:text-2xl font-medium text-white leading-relaxed mb-4">
        {data.quote}
      </p>

      {data.author && (
        <footer className="text-sm text-gray-400">
          — <span className="text-teal-400">{data.author}</span>
          {data.source && <span className="text-gray-500">, {data.source}</span>}
        </footer>
      )}
    </motion.blockquote>
  );
};

export default QuoteHighlightVis;
