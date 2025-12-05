import React from 'react';
import { motion } from 'framer-motion';
import { Clock, FileText, AlertTriangle } from 'lucide-react';
import { trackColors } from './types';

interface ArticleHeaderProps {
  title: string;
  description: string;
  track: string | string[];  // Single track or array of tracks
  type: string;
  readTime: string;
  renderedWordCount: number;
  verificationStatus: 'verifying' | 'valid' | 'truncated';
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  title,
  description,
  track,
  type,
  readTime,
  renderedWordCount,
  verificationStatus,
}) => {
  // Normalize track to array for consistent rendering
  const tracks = Array.isArray(track) ? track : [track];

  return (
    <>
      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          {tracks.map((t, index) => (
            <div
              key={t}
              className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${trackColors[t] || 'text-gray-400 border-gray-500/30 bg-gray-950/30'}`}
            >
              {t} Track
            </div>
          ))}
          <div className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-400">
            {type}
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 leading-tight bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
          {title}
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs md:text-sm text-gray-500 font-mono border-t border-b border-white/10 py-6">
          <span className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-[10px] text-white font-bold">Z0</div>
            zer0 LLC
          </span>
          <span className="hidden md:inline text-gray-700">•</span>
          <span className="flex items-center gap-2">
            <Clock size={14} /> {readTime}
          </span>
          <span className="hidden md:inline text-gray-700">•</span>

          {/* Verification Stat */}
          <div className={`flex items-center gap-2 px-2 py-1 rounded bg-white/5 border ${verificationStatus === 'truncated' ? 'border-red-500/50 text-red-400' : 'border-teal-500/20 text-teal-500/80'}`}>
            {verificationStatus === 'truncated' ? <AlertTriangle size={14} /> : <FileText size={14} />}
            <span>{renderedWordCount.toLocaleString()} words</span>
          </div>

          <span className="hidden md:inline text-gray-700">•</span>
          <span>{new Date().getFullYear()} Research</span>
        </div>
      </motion.div>

      {/* Abstract */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-gradient-to-r from-teal-500/10 to-transparent border-l-2 border-teal-500 p-8 rounded-r-xl mb-16 italic text-gray-300 leading-relaxed text-lg"
      >
        {description}
      </motion.div>
    </>
  );
};

export default ArticleHeader;
