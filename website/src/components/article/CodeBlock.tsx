import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { CodeBlockProps } from './types';

const CodeBlock: React.FC<CodeBlockProps> = ({ language = 'bash', code, title }) => {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Detect if this is an ASCII diagram
  const isASCIIDiagram = language === 'diagram' ||
    code.includes('┌') || code.includes('│') || code.includes('═') ||
    code.includes('╔') || code.includes('┃') || code.includes('▓') ||
    code.includes('╭') || code.includes('╰');

  const lines = code.split('\n');
  const isLong = lines.length > 30;

  if (isASCIIDiagram) {
    return (
      <div ref={ref} className="my-10 overflow-hidden">
        {title && (
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-mono text-teal-500 uppercase tracking-wider">
              {title}
            </h4>
            <button
              onClick={handleCopy}
              className="text-gray-500 hover:text-white transition-colors p-1"
            >
              {copied ? <Check size={14} className="text-teal-400" /> : <Copy size={14} />}
            </button>
          </div>
        )}

        <div className="relative rounded-xl border border-teal-500/20 bg-gradient-to-br from-[#0a0a0a] to-[#050505] overflow-hidden">
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-teal-500/30 rounded-tl-xl" />
          <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-teal-500/30 rounded-tr-xl" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-teal-500/30 rounded-bl-xl" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-teal-500/30 rounded-br-xl" />

          {isLong && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="absolute top-2 right-2 z-10 flex items-center gap-1 px-2 py-1 bg-teal-500/20 rounded text-xs text-teal-400 hover:bg-teal-500/30 transition-colors"
            >
              {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              {isExpanded ? 'Collapse' : 'Expand'}
            </button>
          )}

          <div className={`p-6 overflow-x-auto ${isLong && !isExpanded ? 'max-h-[400px] overflow-y-hidden' : ''}`}>
            <pre className="font-mono text-xs md:text-sm leading-relaxed">
              {lines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: Math.min(i * 0.01, 0.5), duration: 0.2 }}
                  className="text-teal-400/90 whitespace-pre hover:text-teal-300 transition-colors"
                >
                  {line || '\u00A0'}
                </motion.div>
              ))}
            </pre>
          </div>

          {isLong && !isExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
          )}
        </div>
      </div>
    );
  }

  // Regular code block
  return (
    <div className="my-8 rounded-lg overflow-hidden border border-white/10 bg-[#0d1117]">
      <div className="flex justify-between items-center px-4 py-2 bg-white/5 border-b border-white/5">
        <span className="text-xs font-mono text-gray-400">{language}</span>
        <button
          onClick={handleCopy}
          className="text-gray-400 hover:text-white transition-colors"
        >
          {copied ? <Check size={14} className="text-teal-400" /> : <Copy size={14} />}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="font-mono text-sm leading-relaxed text-gray-300">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
