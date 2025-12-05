
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, Clock, Share2, Printer, ChevronRight, Copy, Check, FileText, AlertTriangle } from 'lucide-react';
import { researchData, ArticleSection } from '../data/researchData';

// --- Visualization Components ---

interface VisProps {
  data: any;
}

// 1. Timeline / Process Flow
const TimelineVis: React.FC<VisProps> = ({ data }) => (
  <div className="my-12 p-8 bg-white/5 border border-white/10 rounded-xl overflow-x-auto">
    <div className="min-w-[600px] flex items-center justify-between relative">
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-800 -z-10" />
      {data.steps.map((step: any, i: number) => (
        <div key={i} className="flex flex-col items-center gap-4 relative z-10">
          <div className="w-4 h-4 rounded-full bg-teal-500 border-4 border-[#050505] shadow-[0_0_15px_rgba(20,184,166,0.5)]" />
          <div className="text-center">
            <div className="text-xs font-bold text-teal-400 mb-1 uppercase tracking-wider">{step.label}</div>
            <div className="text-sm font-medium text-gray-300 bg-[#0A0A0A] px-3 py-1 rounded border border-white/10">{step.value}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// 2. Bar Chart
const BarChartVis: React.FC<VisProps> = ({ data }) => (
  <div className="my-12 p-8 bg-white/5 border border-white/10 rounded-xl">
    <h4 className="text-sm font-mono text-gray-500 mb-6 uppercase tracking-wider border-b border-white/5 pb-2">{data.title}</h4>
    <div className="space-y-4">
      {data.items.map((item: any, i: number) => (
        <div key={i} className="group">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-300 font-medium">{item.label}</span>
            <span className="text-teal-400 font-mono">{item.value}%</span>
          </div>
          <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: `${item.value}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-teal-600 to-emerald-400 rounded-full group-hover:shadow-[0_0_10px_rgba(20,184,166,0.3)] transition-all"
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

// 3. System Architecture Stack
const SystemStackVis: React.FC<VisProps> = ({ data }) => (
  <div className="my-12 flex flex-col gap-2 max-w-lg mx-auto">
    {data.layers.map((layer: any, i: number) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1 }}
        className="p-4 rounded-lg border border-teal-500/20 bg-teal-900/10 text-center relative overflow-hidden group hover:bg-teal-900/20 transition-colors"
      >
        <div className="text-xs font-mono text-teal-500 mb-1">{layer.type}</div>
        <div className="font-bold text-white">{layer.label}</div>
        {i < data.layers.length - 1 && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-px h-4 bg-teal-500/30" />
        )}
      </motion.div>
    ))}
  </div>
);

// 4. Comparison Table
const ComparisonVis: React.FC<VisProps> = ({ data }) => (
  <div className="my-12 overflow-hidden rounded-xl border border-white/10">
    <div className="grid grid-cols-3 bg-white/5 p-4 text-xs font-bold uppercase tracking-wider text-gray-400">
      <div>Metric</div>
      <div>Human</div>
      <div>Current Robot</div>
    </div>
    <div className="divide-y divide-white/5 bg-black/20">
      {data.rows.map((row: any, i: number) => (
        <div key={i} className="grid grid-cols-3 p-4 text-sm hover:bg-white/5 transition-colors">
          <div className="text-teal-400 font-medium">{row.metric}</div>
          <div className="text-gray-300">{row.human}</div>
          <div className="text-gray-500">{row.robot}</div>
        </div>
      ))}
    </div>
  </div>
);

// 5. Pyramid / Knowledge Architecture
const PyramidVis: React.FC<VisProps> = ({ data }) => (
    <div className="my-12 flex flex-col items-center gap-1">
        {data.levels.map((level: any, i: number) => {
            const width = 100 - (i * 20) + '%';
            return (
                <div key={i} className="relative group" style={{ width: width, maxWidth: '600px' }}>
                    <div className="bg-gradient-to-r from-teal-900/40 to-emerald-900/40 border border-teal-500/30 text-center py-3 rounded-sm hover:bg-teal-500/20 transition-colors cursor-default">
                        <div className="text-xs text-teal-400 uppercase tracking-widest font-mono mb-1">{level.category}</div>
                        <div className="font-bold text-white text-sm">{level.label}</div>
                    </div>
                </div>
            )
        })}
    </div>
);

// 6. Code Block
const CodeBlock: React.FC<{ language?: string, code: string }> = ({ language = 'bash', code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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

// --- Main Reader Component ---

const ArticleView = ({ articleId, onBack }: { articleId: string, onBack: () => void }) => {
  const article = researchData.find(a => a.id === articleId);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Verification Logic: Calculate rendered word count
  const [renderedWordCount, setRenderedWordCount] = useState(0);
  const [verificationStatus, setVerificationStatus] = useState<'verifying' | 'valid' | 'truncated'>('verifying');

  useEffect(() => {
    if (article) {
        let count = 0;
        article.content.forEach(block => {
            if (block.value) {
                // Approximate word count by splitting on whitespace
                count += block.value.trim().split(/\s+/).length;
            }
        });
        setRenderedWordCount(count);
        
        // Validation: If rendered count is at least 90% of expected, we are good.
        if (count >= article.wordCount * 0.9) {
            setVerificationStatus('valid');
        } else {
            setVerificationStatus('truncated');
        }
    }
  }, [article]);

  if (!article) return <div>Article not found</div>;

  const trackColors = {
    'Blueprint': 'text-cyan-400 border-cyan-500/30 bg-cyan-950/30',
    'World Sim': 'text-orange-400 border-orange-500/30 bg-orange-950/30',
    'Evolve': 'text-emerald-400 border-emerald-500/30 bg-emerald-950/30',
  };

  return (
    <div className="relative bg-[#050505] min-h-screen pt-24 pb-32">
      
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-teal-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation & Controls */}
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

      <div className="max-w-3xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-16 text-center">
           <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
             <div className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${trackColors[article.track]}`}>
                {article.track} Track
             </div>
             <div className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-400">
                {article.type}
             </div>
           </div>
           
           <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 leading-tight">
              {article.title}
           </h1>
           <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs md:text-sm text-gray-500 font-mono border-t border-b border-white/10 py-6">
              <span className="flex items-center gap-2">
                 <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-[10px] text-white font-bold">Z0</div>
                 ECE Solutions
              </span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center gap-2">
                 <Clock size={14} /> {article.readTime}
              </span>
              <span className="hidden md:inline">•</span>
              
              {/* Verification Stat - Always visible now */}
              <div className={`flex items-center gap-2 px-2 py-1 rounded bg-white/5 border ${verificationStatus === 'truncated' ? 'border-red-500/50 text-red-400' : 'border-teal-500/20 text-teal-500/80'}`}>
                 {verificationStatus === 'truncated' ? <AlertTriangle size={14} /> : <FileText size={14} />}
                 <span>{renderedWordCount.toLocaleString()} words</span>
              </div>

              <span className="hidden md:inline">•</span>
              <span>{new Date().getFullYear()} Research</span>
           </div>
        </div>

        {/* Abstract */}
        <div className="bg-white/5 border-l-2 border-teal-500 p-8 rounded-r-xl mb-16 italic text-gray-300 leading-relaxed text-lg">
           {article.description}
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          {article.content.map((block, i) => {
            if (block.type === 'text') {
              return (
                <div key={i} className="mb-8 text-gray-300 leading-relaxed whitespace-pre-line">
                  {block.value}
                </div>
              );
            }
            if (block.type === 'header') {
              return (
                <h2 key={i} className="text-3xl font-display font-bold text-white mt-16 mb-8 flex items-center gap-3">
                  <span className="text-teal-500 opacity-50">#</span> {block.value}
                </h2>
              );
            }
            if (block.type === 'subheader') {
              return (
                <h3 key={i} className="text-xl font-bold text-teal-100 mt-12 mb-4">
                  {block.value}
                </h3>
              );
            }
            if (block.type === 'diagram') {
              if (block.diagramType === 'timeline') return <TimelineVis key={i} data={block.data} />;
              if (block.diagramType === 'barchart') return <BarChartVis key={i} data={block.data} />;
              if (block.diagramType === 'stack') return <SystemStackVis key={i} data={block.data} />;
              if (block.diagramType === 'comparison') return <ComparisonVis key={i} data={block.data} />;
              if (block.diagramType === 'pyramid') return <PyramidVis key={i} data={block.data} />;
            }
            if (block.type === 'code') {
              return <CodeBlock key={i} language={block.language} code={block.value || ''} />;
            }
            if (block.type === 'quote') {
                return (
                    <blockquote key={i} className="text-2xl font-display font-medium text-center text-teal-200 my-16 max-w-2xl mx-auto leading-normal">
                        "{block.value}"
                    </blockquote>
                )
            }
            return null;
          })}
        </div>

        {/* Footer */}
        <div className="mt-24 pt-12 border-t border-white/10 flex justify-between items-center">
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

      </div>
    </div>
  );
};

export default ArticleView;
