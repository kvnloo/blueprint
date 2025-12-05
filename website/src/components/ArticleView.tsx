import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { researchData, ArticleSection } from '../data/researchData';
import {
  FloorPlanVis,
  HierarchyVis,
  ProcessFlowVis,
  MetricsDashboardVis,
  ComparisonMatrixVis,
  RadialProgressVis,
  ChecklistVis,
  QuoteHighlightVis,
  KnowledgeCardsVis,
  ASCIIArtVis
} from './visualizations';

// Import extracted sub-components
import {
  ReadingProgress,
  TableOfContents,
  CodeBlock,
  processMarkdown,
  ArticleHeader,
  ArticleFooter,
  NavigationControls,
  TimelineVis,
  BarChartVis,
  SystemStackVis,
  ComparisonVis,
  PyramidVis,
} from './article';
import type { TOCItem } from './article';

// --- Main Article Component ---

const ArticleView = ({ articleId, onBack }: { articleId: string, onBack: () => void }) => {
  const article = researchData.find(a => a.id === articleId);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // State
  const [renderedWordCount, setRenderedWordCount] = useState(0);
  const [verificationStatus, setVerificationStatus] = useState<'verifying' | 'valid' | 'truncated'>('verifying');
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Helper to get text content from any property name variant
  const getBlockText = (block: ArticleSection): string => {
    return block.value || block.text || block.content || block.code || '';
  };

  // Build TOC and count words
  useEffect(() => {
    if (article) {
      let count = 0;
      const toc: TOCItem[] = [];

      article.content.forEach((block, i) => {
        const text = getBlockText(block);
        if (text) {
          count += text.trim().split(/\s+/).length;
        }

        if (block.type === 'header') {
          const id = `section-${i}`;
          toc.push({ id, text: text.substring(0, 50), level: 1 });
        } else if (block.type === 'subheader') {
          const id = `section-${i}`;
          toc.push({ id, text: text.substring(0, 40), level: 2 });
        }
      });

      setRenderedWordCount(count);
      setTocItems(toc);

      if (count >= article.wordCount * 0.9) {
        setVerificationStatus('valid');
      } else {
        setVerificationStatus('truncated');
      }
    }
  }, [article]);

  // Track active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    tocItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [tocItems]);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-gray-400">
        Article not found
      </div>
    );
  }

  // Render a content block with visualization support
  const renderBlock = (block: ArticleSection, i: number) => {
    const blockText = getBlockText(block);

    if (block.type === 'text') {
      return (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mb-8 text-gray-300 leading-relaxed whitespace-pre-line"
        >
          {processMarkdown(blockText)}
        </motion.div>
      );
    }

    if (block.type === 'header') {
      return (
        <h2
          key={i}
          id={`section-${i}`}
          className="text-3xl font-display font-bold text-white mt-16 mb-8 flex items-center gap-3 scroll-mt-24"
        >
          <span className="text-teal-500 opacity-50">#</span> {processMarkdown(blockText)}
        </h2>
      );
    }

    if (block.type === 'subheader') {
      return (
        <h3
          key={i}
          id={`section-${i}`}
          className="text-xl font-bold text-teal-100 mt-12 mb-4 scroll-mt-24"
        >
          {processMarkdown(blockText)}
        </h3>
      );
    }

    if (block.type === 'diagram') {
      // New visualization types
      if (block.diagramType === 'floorplan' && block.data) {
        return <FloorPlanVis key={i} data={block.data} />;
      }
      if (block.diagramType === 'hierarchy' && block.data) {
        return <HierarchyVis key={i} data={block.data} />;
      }
      if (block.diagramType === 'process' && block.data) {
        return <ProcessFlowVis key={i} data={block.data} />;
      }
      if (block.diagramType === 'metrics' && block.data) {
        return <MetricsDashboardVis key={i} data={block.data} />;
      }
      if (block.diagramType === 'matrix' && block.data) {
        return <ComparisonMatrixVis key={i} data={block.data} />;
      }
      if (block.diagramType === 'radial' && block.data) {
        return <RadialProgressVis key={i} data={block.data} />;
      }
      if (block.diagramType === 'checklist' && block.data) {
        return <ChecklistVis key={i} data={block.data} />;
      }
      if (block.diagramType === 'cards' && block.data) {
        return <KnowledgeCardsVis key={i} data={block.data} />;
      }
      if (block.diagramType === 'ascii' && block.data) {
        return <ASCIIArtVis key={i} data={block.data} />;
      }

      // Handle alternate diagram type names
      if (block.diagramType === 'process-flow' && block.data) {
        return <ProcessFlowVis key={i} data={block.data} />;
      }
      if (block.diagramType === 'comparison-matrix' && block.data) {
        return <ComparisonMatrixVis key={i} data={block.data} />;
      }
      if (block.diagramType === 'spectrum' && block.data) {
        return <CodeBlock key={i} language="json" code={JSON.stringify(block.data, null, 2)} title="Spectrum Data" />;
      }

      // Legacy visualization types
      if (block.diagramType === 'timeline' && block.data) {
        return <TimelineVis key={i} data={block.data} />;
      }
      if (block.diagramType === 'barchart' && block.data) {
        return <BarChartVis key={i} data={block.data} />;
      }
      if (block.diagramType === 'stack' && block.data) {
        return <SystemStackVis key={i} data={block.data} />;
      }
      if (block.diagramType === 'comparison' && block.data) {
        return <ComparisonVis key={i} data={block.data} />;
      }
      if (block.diagramType === 'pyramid' && block.data) {
        return <PyramidVis key={i} data={block.data} />;
      }

      // ASCII diagram fallback
      if (block.language === 'diagram' || (blockText && !block.diagramType)) {
        return <CodeBlock key={i} language="diagram" code={blockText} />;
      }
    }

    if (block.type === 'code') {
      return <CodeBlock key={i} language={block.language} code={blockText} />;
    }

    if (block.type === 'quote') {
      if (block.data) {
        return <QuoteHighlightVis key={i} data={block.data} />;
      }
      return (
        <motion.blockquote
          key={i}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-2xl font-display font-medium text-center text-teal-200 my-16 max-w-2xl mx-auto leading-normal"
        >
          "{processMarkdown(blockText)}"
          {block.author && (
            <footer className="text-base text-gray-400 mt-4 font-normal">
              — <span className="text-teal-400">{block.author}</span>
              {block.source && <span className="text-gray-500 italic"> ({block.source})</span>}
            </footer>
          )}
        </motion.blockquote>
      );
    }

    // Debug: Log unhandled diagram types in development
    if (process.env.NODE_ENV !== 'production' && block.type === 'diagram' && block.diagramType) {
      console.warn(`[ArticleView] Unhandled diagram type: "${block.diagramType}"`, {
        articleId: article?.id,
        blockIndex: i,
        blockData: block.data ? 'present' : 'missing'
      });
    }

    return null;
  };

  return (
    <div className="relative z-10 bg-[#050505] min-h-screen pt-24 pb-32">
      {/* Reading Progress Bar */}
      <ReadingProgress scaleX={scaleX} />

      {/* Navigation & Controls */}
      <NavigationControls onBack={onBack} />

      {/* Table of Contents */}
      <TableOfContents items={tocItems} activeId={activeSection} />

      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <ArticleHeader
          title={article.title}
          description={article.description}
          track={article.track}
          type={article.type}
          readTime={article.readTime}
          renderedWordCount={renderedWordCount}
          verificationStatus={verificationStatus}
        />

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          {article.content.map((block, i) => renderBlock(block, i))}
        </div>

        {/* Footer */}
        <ArticleFooter onBack={onBack} />
      </div>
    </div>
  );
};

export default ArticleView;
