/**
 * Markdown Parser Utilities
 *
 * Parses original markdown files to extract content elements for comparison
 * against rendered website output.
 */

import * as fs from 'fs';
import * as path from 'path';

export interface MarkdownTable {
  headers: string[];
  rows: string[][];
  rawText: string;
  lineNumber: number;
}

export interface ASCIIDiagram {
  content: string;
  lineNumber: number;
  hasBoxChars: boolean;
}

export interface CodeBlock {
  language: string;
  content: string;
  lineNumber: number;
}

export interface MarkdownHeader {
  level: number;
  text: string;
  lineNumber: number;
}

export interface ParsedMarkdown {
  tables: MarkdownTable[];
  asciiDiagrams: ASCIIDiagram[];
  codeBlocks: CodeBlock[];
  headers: MarkdownHeader[];
  wordCount: number;
  lineCount: number;
}

// Box-drawing characters used in ASCII diagrams
const BOX_CHARS = /[═─│┌┐└┘├┤┬┴┼╔╗╚╝║╠╣╦╩╬▲▼◄►█▀▄░▒▓]/;

/**
 * Parse a markdown file and extract all content elements
 */
export function parseMarkdownFile(filePath: string): ParsedMarkdown {
  const content = fs.readFileSync(filePath, 'utf-8');
  return parseMarkdownContent(content);
}

/**
 * Parse markdown content string
 */
export function parseMarkdownContent(content: string): ParsedMarkdown {
  const lines = content.split('\n');

  return {
    tables: extractTables(content),
    asciiDiagrams: extractASCIIDiagrams(content),
    codeBlocks: extractCodeBlocks(content),
    headers: extractHeaders(content),
    wordCount: countWords(content),
    lineCount: lines.length
  };
}

/**
 * Extract markdown tables from content
 */
export function extractTables(content: string): MarkdownTable[] {
  const tables: MarkdownTable[] = [];
  const lines = content.split('\n');

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    // Look for table header row (starts with |)
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      // Check if next line is separator row
      if (i + 1 < lines.length && /^\|[\s:-]+\|/.test(lines[i + 1])) {
        const tableStart = i;
        const headerCells = parseTableRow(line);
        const rows: string[][] = [];

        // Skip separator row
        i += 2;

        // Collect data rows
        while (i < lines.length && lines[i].trim().startsWith('|')) {
          rows.push(parseTableRow(lines[i]));
          i++;
        }

        // Collect raw table text
        const rawText = lines.slice(tableStart, i).join('\n');

        tables.push({
          headers: headerCells,
          rows,
          rawText,
          lineNumber: tableStart + 1
        });
        continue;
      }
    }
    i++;
  }

  return tables;
}

/**
 * Parse a single table row into cells
 */
function parseTableRow(row: string): string[] {
  return row
    .split('|')
    .slice(1, -1) // Remove empty first and last elements
    .map(cell => cell.trim());
}

/**
 * Extract ASCII diagrams from code blocks
 */
export function extractASCIIDiagrams(content: string): ASCIIDiagram[] {
  const diagrams: ASCIIDiagram[] = [];
  const codeBlockRegex = /```[\s\S]*?```/g;
  const lines = content.split('\n');

  let match;
  while ((match = codeBlockRegex.exec(content)) !== null) {
    const blockContent = match[0];
    const hasBoxChars = BOX_CHARS.test(blockContent);

    // Calculate line number
    const beforeMatch = content.substring(0, match.index);
    const lineNumber = beforeMatch.split('\n').length;

    // Extract content without the backticks
    const innerContent = blockContent
      .replace(/^```\w*\n?/, '')
      .replace(/\n?```$/, '');

    if (hasBoxChars) {
      diagrams.push({
        content: innerContent,
        lineNumber,
        hasBoxChars: true
      });
    }
  }

  return diagrams;
}

/**
 * Extract all code blocks from content
 */
export function extractCodeBlocks(content: string): CodeBlock[] {
  const blocks: CodeBlock[] = [];
  const codeBlockRegex = /```(\w*)\n([\s\S]*?)```/g;

  let match;
  while ((match = codeBlockRegex.exec(content)) !== null) {
    const beforeMatch = content.substring(0, match.index);
    const lineNumber = beforeMatch.split('\n').length;

    blocks.push({
      language: match[1] || 'plaintext',
      content: match[2],
      lineNumber
    });
  }

  return blocks;
}

/**
 * Extract headers from markdown content
 */
export function extractHeaders(content: string): MarkdownHeader[] {
  const headers: MarkdownHeader[] = [];
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headerMatch) {
      headers.push({
        level: headerMatch[1].length,
        text: headerMatch[2].trim(),
        lineNumber: index + 1
      });
    }
  });

  return headers;
}

/**
 * Count words in content (excluding code blocks and special characters)
 */
export function countWords(content: string): number {
  // Remove code blocks
  let text = content.replace(/```[\s\S]*?```/g, '');

  // Remove markdown syntax
  text = text
    .replace(/[#*_`\[\]()]/g, ' ')
    .replace(/\|/g, ' ')
    .replace(/[-=]{3,}/g, ' ');

  // Count words
  const words = text.split(/\s+/).filter(word => word.length > 0);
  return words.length;
}

/**
 * Detect unconverted markdown patterns in rendered text
 */
export function detectMarkdownPatterns(text: string): {
  hasUnconvertedTables: boolean;
  hasLiteralNewlines: boolean;
  hasBrokenFormatting: boolean;
  patterns: { type: string; match: string; }[];
} {
  const patterns: { type: string; match: string; }[] = [];

  // Check for unconverted table patterns
  const tablePattern = /\|[\s-]+\|/g;
  let match;
  while ((match = tablePattern.exec(text)) !== null) {
    patterns.push({ type: 'UNCONVERTED_TABLE', match: match[0] });
  }

  // Check for literal \n characters (not actual newlines)
  const newlinePattern = /\\n/g;
  while ((match = newlinePattern.exec(text)) !== null) {
    patterns.push({ type: 'LITERAL_NEWLINE', match: match[0] });
  }

  // Check for unrendered bold/italic
  const boldPattern = /\*\*[^*]+\*\*/g;
  while ((match = boldPattern.exec(text)) !== null) {
    // Exclude if inside code block context
    if (!text.substring(Math.max(0, match.index - 10), match.index).includes('`')) {
      patterns.push({ type: 'BROKEN_FORMATTING', match: match[0] });
    }
  }

  const italicPattern = /(?<!\*)\*[^*]+\*(?!\*)/g;
  while ((match = italicPattern.exec(text)) !== null) {
    if (!text.substring(Math.max(0, match.index - 10), match.index).includes('`')) {
      patterns.push({ type: 'BROKEN_FORMATTING', match: match[0] });
    }
  }

  return {
    hasUnconvertedTables: patterns.some(p => p.type === 'UNCONVERTED_TABLE'),
    hasLiteralNewlines: patterns.some(p => p.type === 'LITERAL_NEWLINE'),
    hasBrokenFormatting: patterns.some(p => p.type === 'BROKEN_FORMATTING'),
    patterns
  };
}

/**
 * Article mapping from IDs to markdown filenames
 */
export const ARTICLE_MAP: Record<string, string> = {
  'second-brain': 'the-second-brain.md',
  'limitless-protocol': 'limitless-protocol-blog.md',
  'atlas-roadmap': 'ATLAS-Technical-Roadmap.md',
  'architecture-intelligence': 'the-architecture-of-intelligence-evolve-framework.md',
  'home-grown-revolution': 'home-grown-revolution-blog.md',
  'living-room': 'the-living-room-solarpunk-blog.md',
  'limitless-kitchen': 'limitless-kitchen-blog.md',
  'capability-trap': 'the-capability-trap.md',
  'learning-interface': 'the-learning-interface.md'
};

/**
 * Get the markdown file path for an article ID
 */
export function getMarkdownPath(articleId: string, publicDir: string): string {
  const filename = ARTICLE_MAP[articleId];
  if (!filename) {
    throw new Error(`Unknown article ID: ${articleId}`);
  }
  return path.join(publicDir, filename);
}
