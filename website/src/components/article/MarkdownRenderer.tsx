import React from 'react';

/**
 * Processes inline markdown syntax and returns React nodes
 * Handles: **bold**, *italic*, [links](url), `code`, and escaped characters
 */
export const processMarkdown = (text: string): React.ReactNode => {
  if (!text) return null;

  // Pattern matches: **bold**, *italic*, `code`, [text](url), escaped apostrophes
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|\\['"])/g;

  const parts = text.split(pattern);

  return parts.map((part, i) => {
    if (!part) return null;

    // Bold: **text**
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
    }

    // Italic: *text*
    if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
      return <em key={i} className="italic text-gray-200">{part.slice(1, -1)}</em>;
    }

    // Inline code: `code`
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="px-1.5 py-0.5 bg-white/10 text-teal-300 rounded text-sm font-mono">
          {part.slice(1, -1)}
        </code>
      );
    }

    // Links: [text](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a
          key={i}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-400 hover:text-teal-300 underline underline-offset-2 transition-colors"
        >
          {linkMatch[1]}
        </a>
      );
    }

    // Escaped apostrophes: \' or \"
    if (part === "\\'" || part === '\\"') {
      return part.slice(1);
    }

    // Plain text - also handle any remaining escaped characters
    return part.replace(/\\(['""])/g, '$1');
  });
};

interface MarkdownTextProps {
  children: string;
  className?: string;
}

/**
 * Component wrapper for processMarkdown
 */
const MarkdownText: React.FC<MarkdownTextProps> = ({ children, className }) => {
  return <span className={className}>{processMarkdown(children)}</span>;
};

export default MarkdownText;
