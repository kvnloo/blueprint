import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { VisProps } from './types';

export const ASCIIArtVis: React.FC<VisProps> = ({ data, className = '' }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [revealed, setRevealed] = useState(false);

  if (!data || !data.content) return null;

  useEffect(() => {
    if (isInView && !revealed) {
      setRevealed(true);
    }
  }, [isInView, revealed]);

  const lines = data.content.split('\n');

  return (
    <div ref={ref} className={`my-12 overflow-hidden ${className}`}>
      {data.title && (
        <h4 className="text-sm font-mono text-gray-500 mb-4 uppercase tracking-wider">
          {data.title}
        </h4>
      )}

      <div className="p-6 bg-[#0a0a0a] border border-white/10 rounded-xl overflow-x-auto">
        <pre className="font-mono text-xs md:text-sm leading-relaxed">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={revealed ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.02, duration: 0.3 }}
              className="text-teal-400/80 whitespace-pre"
            >
              {line || '\u00A0'}
            </motion.div>
          ))}
        </pre>
      </div>
    </div>
  );
};

export default ASCIIArtVis;
