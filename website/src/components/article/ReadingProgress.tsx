import React from 'react';
import { motion, MotionValue } from 'framer-motion';

interface ReadingProgressProps {
  scaleX: MotionValue<number>;
}

const ReadingProgress: React.FC<ReadingProgressProps> = ({ scaleX }) => {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-emerald-400 origin-left z-50"
      style={{ scaleX }}
    />
  );
};

export default ReadingProgress;
