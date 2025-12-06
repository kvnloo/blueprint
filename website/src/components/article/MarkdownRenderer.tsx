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
 * Processes markdown text, handling both tables and inline syntax
 * Handles: **bold**, *italic*, [links](url), `code`, escaped characters, and tables
 */
export const processMarkdown = (text: string): React.ReactNode => {
  if (!text) return null;

  // Check if text contains a markdown table
  if (containsMarkdownTable(text)) {
    // Split text into parts: before table, table, after table
    const lines = text.split('\n');
    const result: React.ReactNode[] = [];
    let currentBlock: string[] = [];
    let inTable = false;
    let tableLines: string[] = [];
    let tableCount = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();
      const isPipeLine = trimmed.includes('|');

      if (isPipeLine && !inTable) {
        // Starting a table - flush current block
        if (currentBlock.length > 0) {
          const blockText = currentBlock.join('\n');
          result.push(
            <span key={`text-${result.length}`} className="whitespace-pre-line">
              {processInlineMarkdown(blockText)}
            </span>
          );
          currentBlock = [];
        }
        inTable = true;
        tableLines = [line];
      } else if (isPipeLine && inTable) {
        // Continue table
        tableLines.push(line);
      } else if (!isPipeLine && inTable) {
        // End table - render it
        const tableNode = parseMarkdownTable(tableLines.join('\n'), `table-${tableCount++}`);
        if (tableNode) {
          result.push(tableNode);
        }
        tableLines = [];
        inTable = false;
        // Start new text block
        if (trimmed) {
          currentBlock.push(line);
        }
      } else {
        // Regular text line
        currentBlock.push(line);
      }
    }

    // Flush remaining table
    if (inTable && tableLines.length > 0) {
      const tableNode = parseMarkdownTable(tableLines.join('\n'), `table-${tableCount++}`);
      if (tableNode) {
        result.push(tableNode);
      }
    }

    // Flush remaining text block
    if (currentBlock.length > 0) {
      const blockText = currentBlock.join('\n');
      result.push(
        <span key={`text-${result.length}`} className="whitespace-pre-line">
          {processInlineMarkdown(blockText)}
        </span>
      );
    }

    return <>{result}</>;
  }

  // No table - process as inline markdown
  return processInlineMarkdown(text);
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
