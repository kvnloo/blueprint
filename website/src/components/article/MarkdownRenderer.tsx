import React from 'react';

/**
 * Checks if text contains a markdown table
 */
const containsMarkdownTable = (text: string): boolean => {
  const lines = text.split('\n');
  // A table needs at least 2 lines with pipes and a separator row
  let pipeLines = 0;
  let hasSeparator = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.includes('|')) {
      pipeLines++;
      // Check for separator row (e.g., |---|---|)
      if (/^\|?[\s\-:|]+\|[\s\-:|]+\|?$/.test(trimmed)) {
        hasSeparator = true;
      }
    }
  }

  return pipeLines >= 2 && hasSeparator;
};

/**
 * Parses and renders a markdown table as HTML
 */
const parseMarkdownTable = (tableText: string, keyPrefix: string): React.ReactNode => {
  const lines = tableText.trim().split('\n').filter(line => line.trim());

  if (lines.length < 2) return null;

  // Parse cells from a row
  const parseCells = (line: string): string[] => {
    return line
      .split('|')
      .map(cell => cell.trim())
      .filter((_, i, arr) => i > 0 && i < arr.length - 1 || (arr.length === 1 && i === 0));
  };

  // Find the separator row index
  let separatorIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    if (/^\|?[\s\-:|]+\|[\s\-:|]+\|?$/.test(lines[i].trim())) {
      separatorIndex = i;
      break;
    }
  }

  if (separatorIndex === -1) return null;

  // Header is everything before separator
  const headerRows = lines.slice(0, separatorIndex);
  const headers = headerRows.length > 0 ? parseCells(headerRows[headerRows.length - 1]) : [];

  // Data rows are everything after separator
  const dataRows = lines.slice(separatorIndex + 1);

  return (
    <div key={keyPrefix} className="overflow-x-auto my-4">
      <table className="min-w-full border-collapse">
        {headers.length > 0 && (
          <thead>
            <tr className="border-b border-white/20">
              {headers.map((header, i) => (
                <th
                  key={`${keyPrefix}-h-${i}`}
                  className="px-4 py-2 text-left text-sm font-semibold text-teal-300 bg-white/5"
                >
                  {processInlineMarkdown(header)}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {dataRows.map((row, rowIndex) => {
            const cells = parseCells(row);
            return (
              <tr
                key={`${keyPrefix}-r-${rowIndex}`}
                className="border-b border-white/10 hover:bg-white/5 transition-colors"
              >
                {cells.map((cell, cellIndex) => (
                  <td
                    key={`${keyPrefix}-r-${rowIndex}-c-${cellIndex}`}
                    className="px-4 py-2 text-sm text-gray-300"
                  >
                    {processInlineMarkdown(cell)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

/**
 * Processes inline markdown syntax (bold, italic, code, links)
 */
const processInlineMarkdown = (text: string): React.ReactNode => {
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

/**
 * Renders a markdown header
 */
const renderHeader = (level: number, content: string, key: string): React.ReactNode => {
  const processedContent = processInlineMarkdown(content);

  switch (level) {
    case 1:
      return <h1 key={key} className="text-2xl font-bold text-white mt-8 mb-4">{processedContent}</h1>;
    case 2:
      return <h2 key={key} className="text-xl font-semibold text-white mt-6 mb-3">{processedContent}</h2>;
    case 3:
      return <h3 key={key} className="text-lg font-semibold text-teal-400 mt-5 mb-2">{processedContent}</h3>;
    case 4:
      return <h4 key={key} className="text-base font-semibold text-teal-300 mt-4 mb-2">{processedContent}</h4>;
    case 5:
      return <h5 key={key} className="text-sm font-semibold text-gray-300 mt-3 mb-1">{processedContent}</h5>;
    case 6:
      return <h6 key={key} className="text-sm font-medium text-gray-400 mt-3 mb-1">{processedContent}</h6>;
    default:
      return <p key={key} className="text-gray-300">{processedContent}</p>;
  }
};

/**
 * Renders a list item
 */
const renderListItem = (content: string, key: string): React.ReactNode => {
  return (
    <li key={key} className="text-gray-300 ml-4 pl-2">
      {processInlineMarkdown(content)}
    </li>
  );
};

/**
 * Block types for parsing
 */
type BlockType = 'paragraph' | 'header' | 'list' | 'table';

interface ParsedBlock {
  type: BlockType;
  content: string;
  level?: number; // For headers
  items?: string[]; // For lists
}

/**
 * Parses text into blocks (headers, lists, paragraphs, tables)
 */
const parseBlocks = (text: string): ParsedBlock[] => {
  const lines = text.split('\n');
  const blocks: ParsedBlock[] = [];
  let currentList: string[] = [];
  let currentParagraph: string[] = [];
  let inTable = false;
  let tableLines: string[] = [];

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const content = currentParagraph.join('\n').trim();
      if (content) {
        blocks.push({ type: 'paragraph', content });
      }
      currentParagraph = [];
    }
  };

  const flushList = () => {
    if (currentList.length > 0) {
      blocks.push({ type: 'list', content: '', items: [...currentList] });
      currentList = [];
    }
  };

  const flushTable = () => {
    if (tableLines.length > 0) {
      blocks.push({ type: 'table', content: tableLines.join('\n') });
      tableLines = [];
    }
    inTable = false;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Check for table lines
    if (trimmed.includes('|') && !inTable) {
      flushParagraph();
      flushList();
      inTable = true;
      tableLines = [line];
      continue;
    }

    if (inTable) {
      if (trimmed.includes('|')) {
        tableLines.push(line);
        continue;
      } else {
        flushTable();
        // Fall through to process this line
      }
    }

    // Check for headers: # Header, ## Header, ### Header, etc.
    const headerMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (headerMatch) {
      flushParagraph();
      flushList();
      blocks.push({
        type: 'header',
        level: headerMatch[1].length,
        content: headerMatch[2]
      });
      continue;
    }

    // Check for list items: - item or * item
    const listMatch = trimmed.match(/^[-*]\s+(.+)$/);
    if (listMatch) {
      flushParagraph();
      currentList.push(listMatch[1]);
      continue;
    }

    // If we were in a list and hit a non-list line, flush the list
    if (currentList.length > 0 && !listMatch) {
      flushList();
    }

    // Empty line - flush paragraph
    if (!trimmed) {
      flushParagraph();
      continue;
    }

    // Regular text - add to paragraph
    currentParagraph.push(line);
  }

  // Flush remaining content
  flushTable();
  flushParagraph();
  flushList();

  return blocks;
};

/**
 * Processes markdown text, handling headers, lists, tables and inline syntax
 * Handles: # headers, - lists, **bold**, *italic*, [links](url), `code`, tables
 */
export const processMarkdown = (text: string): React.ReactNode => {
  if (!text) return null;

  // Check for block-level markdown elements
  const hasBlockElements = /^#{1,6}\s|^[-*]\s/m.test(text) || containsMarkdownTable(text);

  if (hasBlockElements) {
    const blocks = parseBlocks(text);

    return (
      <>
        {blocks.map((block, index) => {
          const key = `block-${index}`;

          switch (block.type) {
            case 'header':
              return renderHeader(block.level || 1, block.content, key);

            case 'list':
              return (
                <ul key={key} className="list-disc list-outside my-3 space-y-1">
                  {block.items?.map((item, i) => renderListItem(item, `${key}-item-${i}`))}
                </ul>
              );

            case 'table':
              return parseMarkdownTable(block.content, key);

            case 'paragraph':
            default:
              return (
                <p key={key} className="text-gray-300 my-2 whitespace-pre-line">
                  {processInlineMarkdown(block.content)}
                </p>
              );
          }
        })}
      </>
    );
  }

  // No block elements - process as inline markdown with preserved whitespace
  return (
    <span className="whitespace-pre-line">
      {processInlineMarkdown(text)}
    </span>
  );
};

interface MarkdownTextProps {
  children: string;
  className?: string;
}

/**
 * Component wrapper for processMarkdown
 */
const MarkdownText: React.FC<MarkdownTextProps> = ({ children, className }) => {
  return <div className={className}>{processMarkdown(children)}</div>;
};

export default MarkdownText;
