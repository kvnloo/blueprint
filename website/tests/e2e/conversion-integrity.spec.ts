/**
 * Conversion Integrity Test Suite
 *
 * Detects markdown-to-website conversion issues by comparing rendered pages
 * against original markdown source files.
 *
 * Issue Types Detected:
 * - UNCONVERTED_TABLE: Raw markdown table syntax in rendered output
 * - LITERAL_NEWLINE: \n appearing as text instead of line break
 * - EMPTY_VISUALIZATION: Diagram container renders but is empty
 * - BROKEN_FORMATTING: **bold** or *italic* not rendered properly
 * - MISSING_CONTENT: Content in markdown not present in rendered page
 * - TRUNCATED_CONTENT: Significant content loss (>5% missing)
 * - MISSING_ASCII_DIAGRAM: ASCII diagram from markdown not preserved
 */

import { test, expect, Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import {
  parseMarkdownFile,
  detectMarkdownPatterns,
  ARTICLE_MAP,
  getMarkdownPath,
  countWords
} from '../utils/markdown-parser';
import {
  createIssue,
  generateReport,
  writeReportFile,
  printSummary,
  ConversionIssue,
  IssueType,
  ConversionReport
} from '../utils/issue-reporter';

// Global issue collector
const allIssues: ConversionIssue[] = [];

// Test configuration
const PUBLIC_DIR = path.resolve(__dirname, '../../src/public');
const REPORT_OUTPUT = path.resolve(__dirname, '../test-results/conversion-issues.json');
const SCREENSHOT_DIR = path.resolve(__dirname, '../test-results/screenshots/conversion');

// Article URL mapping
const ARTICLE_URLS: Record<string, string> = {
  'second-brain': '/research/second-brain',
  'limitless-protocol': '/research/limitless-protocol',
  'atlas-roadmap': '/research/atlas-roadmap',
  'architecture-intelligence': '/research/architecture-intelligence',
  'home-grown-revolution': '/research/home-grown-revolution',
  'living-room': '/research/living-room',
  'limitless-kitchen': '/research/limitless-kitchen',
  'capability-trap': '/research/capability-trap',
  'learning-interface': '/research/learning-interface'
};

test.describe('Conversion Integrity Tests', () => {
  test.use({
    viewport: { width: 1920, height: 1080 },
  });

  // Ensure screenshot directory exists
  test.beforeAll(async () => {
    if (!fs.existsSync(SCREENSHOT_DIR)) {
      fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
    }
  });

  // Generate report after all tests
  test.afterAll(async () => {
    const report = generateReport(allIssues);

    // Ensure output directory exists
    const reportDir = path.dirname(REPORT_OUTPUT);
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    writeReportFile(report, REPORT_OUTPUT);
    printSummary(report);
  });

  /**
   * Helper function to navigate to an article
   */
  async function navigateToArticle(page: Page, articleId: string): Promise<void> {
    const baseUrl = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';
    await page.goto(baseUrl + '/', { waitUntil: 'domcontentloaded' });

    // Wait for navbar
    await expect(page.locator('nav')).toBeVisible({ timeout: 10000 });

    // Click Research button
    const researchButton = page.locator('button').filter({ hasText: /^Research$/ });
    await expect(researchButton).toBeVisible({ timeout: 5000 });
    await researchButton.click({ force: true, timeout: 10000 });

    // Wait for Research Hub - use multiple possible selectors
    await page.waitForTimeout(1000); // Brief pause for navigation
    const researchHubLocator = page.locator('[class*="research"], div.group.relative').first();
    await expect(researchHubLocator).toBeVisible({ timeout: 10000 });

    // Find and click the specific article card
    const articleTitle = getArticleDisplayTitle(articleId);
    const articleCard = page.locator('div.group.relative').filter({ hasText: new RegExp(articleTitle, 'i') }).first();

    if (await articleCard.count() > 0) {
      await articleCard.click({ force: true, timeout: 10000 });
      await page.waitForTimeout(1000);
    } else {
      // Fallback: click first available article
      const firstCard = page.locator('div.group.relative').first();
      await firstCard.click({ force: true, timeout: 10000 });
      await page.waitForTimeout(1000);
    }

    // Wait for article content to load - use multiple selectors
    const contentLocator = page.locator('div.prose, article, [class*="article"], main').first();
    await expect(contentLocator).toBeVisible({ timeout: 15000 });
  }

  /**
   * Get display title from article ID
   */
  function getArticleDisplayTitle(articleId: string): string {
    const titles: Record<string, string> = {
      'second-brain': 'Second Brain',
      'limitless-protocol': 'Limitless Protocol',
      'atlas-roadmap': 'ATLAS',
      'architecture-intelligence': 'Architecture of Intelligence',
      'home-grown-revolution': 'Home-Grown Revolution',
      'living-room': 'Living Room',
      'limitless-kitchen': 'Limitless Kitchen',
      'capability-trap': 'Capability Trap',
      'learning-interface': 'Learning Interface'
    };
    return titles[articleId] || articleId;
  }

  /**
   * Helper to capture screenshot for an issue
   */
  async function captureIssueScreenshot(
    page: Page,
    articleId: string,
    issueType: string,
    index: number
  ): Promise<string> {
    const filename = `${articleId}-${issueType.toLowerCase()}-${index}.png`;
    const filepath = path.join(SCREENSHOT_DIR, filename);
    await page.screenshot({ path: filepath, fullPage: false });
    return filepath;
  }

  // ============================================================================
  // TEST SUITE: Unconverted Table Detection
  // ============================================================================

  for (const [articleId, markdownFile] of Object.entries(ARTICLE_MAP)) {
    test(`Unconverted Tables - ${articleId}`, async ({ page }) => {
      await navigateToArticle(page, articleId);

      // Get all visible text content
      const pageText = await page.locator('body').textContent() || '';

      // Regex patterns for unconverted markdown tables
      const tablePatterns = [
        /\|[\s-]+\|/g,           // Table separator rows: |---|---|
        /\|\s*[^|]+\s*\|\s*[^|]+\s*\|/g,  // Table data rows with multiple pipes
      ];

      let issueIndex = 0;
      for (const pattern of tablePatterns) {
        const matches = pageText.match(pattern);
        if (matches) {
          for (const match of matches) {
            // Verify it's actually a table pattern, not other content
            if (match.includes('---') || (match.split('|').length > 3)) {
              const screenshotPath = await captureIssueScreenshot(
                page, articleId, 'UNCONVERTED_TABLE', issueIndex++
              );

              allIssues.push(createIssue(
                articleId,
                'UNCONVERTED_TABLE',
                { section: 'page content' },
                `Raw markdown table syntax found: "${match.substring(0, 50)}..."`,
                {
                  renderedSnippet: match,
                  screenshotPath
                }
              ));
            }
          }
        }
      }

      // Also check for visible pipe characters in table-like patterns
      const tableElements = page.locator('*:has-text("|")');
      const count = await tableElements.count();

      for (let i = 0; i < Math.min(count, 20); i++) {
        const element = tableElements.nth(i);
        const text = await element.textContent();

        if (text && text.match(/\|.*\|.*\|/)) {
          // Exclude code blocks
          const tagName = await element.evaluate(el => el.tagName.toLowerCase());
          if (!['pre', 'code'].includes(tagName)) {
            allIssues.push(createIssue(
              articleId,
              'UNCONVERTED_TABLE',
              { selector: `element ${i}` },
              'Possible unconverted table detected in non-code element'
            ));
          }
        }
      }
    });
  }

  // ============================================================================
  // TEST SUITE: Literal Newline Detection
  // ============================================================================

  for (const [articleId] of Object.entries(ARTICLE_MAP)) {
    test(`Literal Newlines - ${articleId}`, async ({ page }) => {
      await navigateToArticle(page, articleId);

      // Get all text nodes
      const pageText = await page.locator('div.prose').textContent() || '';

      // Check for literal \n characters (escaped newlines appearing as text)
      const literalNewlinePattern = /\\n/g;
      const matches = pageText.match(literalNewlinePattern);

      if (matches && matches.length > 0) {
        // Find the specific locations
        const textElements = page.locator('div.prose *:not(pre):not(code)');
        const count = await textElements.count();

        let issueIndex = 0;
        for (let i = 0; i < count && issueIndex < matches.length; i++) {
          const element = textElements.nth(i);
          const text = await element.textContent();

          if (text && text.includes('\\n')) {
            const screenshotPath = await captureIssueScreenshot(
              page, articleId, 'LITERAL_NEWLINE', issueIndex
            );

            // Extract context around the literal newline
            const contextMatch = text.match(/.{0,30}\\n.{0,30}/);
            const context = contextMatch ? contextMatch[0] : text.substring(0, 60);

            allIssues.push(createIssue(
              articleId,
              'LITERAL_NEWLINE',
              { section: 'prose content' },
              `Literal \\n found in text: "${context}"`,
              {
                renderedSnippet: context,
                screenshotPath
              }
            ));

            issueIndex++;
          }
        }

        // If we found matches but couldn't locate them precisely
        if (issueIndex === 0 && matches.length > 0) {
          allIssues.push(createIssue(
            articleId,
            'LITERAL_NEWLINE',
            { section: 'page content' },
            `Found ${matches.length} literal \\n character(s) in page content`
          ));
        }
      }
    });
  }

  // ============================================================================
  // TEST SUITE: Empty Visualization Detection
  // ============================================================================

  for (const [articleId] of Object.entries(ARTICLE_MAP)) {
    test(`Empty Visualizations - ${articleId}`, async ({ page }) => {
      await navigateToArticle(page, articleId);

      // Scroll through the page to trigger lazy-loaded content
      await page.evaluate(() => {
        return new Promise<void>((resolve) => {
          let scrollTop = 0;
          const scrollHeight = document.documentElement.scrollHeight;
          const interval = setInterval(() => {
            scrollTop += 500;
            window.scrollTo(0, scrollTop);
            if (scrollTop >= scrollHeight) {
              clearInterval(interval);
              setTimeout(resolve, 500);
            }
          }, 100);
        });
      });

      // Check for diagram containers
      const diagramSelectors = [
        '[data-diagram-type]',
        '.visualization',
        '.diagram-container',
        'div[class*="diagram"]',
        'div[class*="visualization"]',
        'div[class*="chart"]',
        'div.min-w-\\[600px\\]',  // Common visualization wrapper
      ];

      let issueIndex = 0;

      for (const selector of diagramSelectors) {
        const containers = page.locator(selector);
        const count = await containers.count();

        for (let i = 0; i < count; i++) {
          const container = containers.nth(i);
          const isVisible = await container.isVisible();

          if (isVisible) {
            const box = await container.boundingBox();
            const childCount = await container.locator('*').count();
            const textContent = await container.textContent();

            const isEmpty = (
              (box && box.height < 10) ||
              (childCount === 0 && (!textContent || textContent.trim().length === 0))
            );

            if (isEmpty) {
              const screenshotPath = await captureIssueScreenshot(
                page, articleId, 'EMPTY_VISUALIZATION', issueIndex++
              );

              allIssues.push(createIssue(
                articleId,
                'EMPTY_VISUALIZATION',
                { selector },
                `Empty visualization container found (height: ${box?.height || 0}px, children: ${childCount})`,
                { screenshotPath }
              ));
            }
          }
        }
      }

      // Also check for ASCII art containers that might be empty
      const preElements = page.locator('pre.font-mono');
      const preCount = await preElements.count();

      for (let i = 0; i < preCount; i++) {
        const pre = preElements.nth(i);
        const text = await pre.textContent();

        if (!text || text.trim().length === 0) {
          const screenshotPath = await captureIssueScreenshot(
            page, articleId, 'EMPTY_VISUALIZATION', issueIndex++
          );

          allIssues.push(createIssue(
            articleId,
            'EMPTY_VISUALIZATION',
            { section: `pre element ${i}` },
            'Empty pre/code block found (possibly failed ASCII diagram conversion)',
            { screenshotPath }
          ));
        }
      }
    });
  }

  // ============================================================================
  // TEST SUITE: Broken Markdown Formatting Detection
  // ============================================================================

  for (const [articleId] of Object.entries(ARTICLE_MAP)) {
    test(`Broken Formatting - ${articleId}`, async ({ page }) => {
      await navigateToArticle(page, articleId);

      // Get text content excluding code blocks
      const textElements = page.locator('div.prose *:not(pre):not(code):not(pre *)');
      const count = await textElements.count();

      const formattingPatterns = [
        { pattern: /\*\*[^*]+\*\*/g, type: 'unrendered bold' },
        { pattern: /(?<!\*)\*[^*]+\*(?!\*)/g, type: 'unrendered italic' },
        { pattern: /`[^`]+`/g, type: 'unrendered inline code' },
        { pattern: /\[([^\]]+)\]\([^)]+\)/g, type: 'unrendered link' },
      ];

      let issueIndex = 0;

      for (let i = 0; i < count; i++) {
        const element = textElements.nth(i);
        const text = await element.textContent();
        const tagName = await element.evaluate(el => el.tagName.toLowerCase());

        // Skip actual formatting elements
        if (['strong', 'em', 'b', 'i', 'a', 'code'].includes(tagName)) {
          continue;
        }

        if (text) {
          for (const { pattern, type } of formattingPatterns) {
            const matches = text.match(pattern);

            if (matches) {
              for (const match of matches) {
                // Skip if it looks like it's inside a code context
                const context = text.indexOf(match);
                const beforeContext = text.substring(Math.max(0, context - 20), context);

                if (!beforeContext.includes('`') && !beforeContext.includes('code')) {
                  const screenshotPath = await captureIssueScreenshot(
                    page, articleId, 'BROKEN_FORMATTING', issueIndex++
                  );

                  allIssues.push(createIssue(
                    articleId,
                    'BROKEN_FORMATTING',
                    { section: `text element ${i}` },
                    `Possible ${type}: "${match.substring(0, 40)}"`,
                    {
                      renderedSnippet: match,
                      screenshotPath
                    }
                  ));
                }
              }
            }
          }
        }
      }
    });
  }

  // ============================================================================
  // TEST SUITE: ASCII Diagram Preservation
  // ============================================================================

  for (const [articleId, markdownFile] of Object.entries(ARTICLE_MAP)) {
    test(`ASCII Diagram Preservation - ${articleId}`, async ({ page }) => {
      // Parse original markdown
      const markdownPath = getMarkdownPath(articleId, PUBLIC_DIR);

      if (!fs.existsSync(markdownPath)) {
        test.skip();
        return;
      }

      const parsed = parseMarkdownFile(markdownPath);

      if (parsed.asciiDiagrams.length === 0) {
        // No ASCII diagrams to check
        return;
      }

      await navigateToArticle(page, articleId);

      // Scroll through page to load all content
      await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
      await page.waitForTimeout(1000);

      // Get all pre/code content from the page
      const preElements = page.locator('pre, code.block, div.font-mono');
      const preCount = await preElements.count();

      const renderedDiagrams: string[] = [];
      for (let i = 0; i < preCount; i++) {
        const text = await preElements.nth(i).textContent();
        if (text) {
          renderedDiagrams.push(text);
        }
      }

      let issueIndex = 0;

      // Check each original ASCII diagram has a corresponding rendered version
      for (const diagram of parsed.asciiDiagrams) {
        // Look for box-drawing characters in rendered content
        const hasMatchingContent = renderedDiagrams.some(rendered => {
          // Check if at least 50% of the diagram's key characters are present
          const keyChars = diagram.content.match(/[═─│┌┐└┘├┤┬┴┼╔╗╚╝║╠╣╦╩╬▲▼◄►█▀▄░▒▓]/g);
          if (!keyChars) return true; // No special chars to check

          const matchedChars = keyChars.filter(char => rendered.includes(char));
          return matchedChars.length >= keyChars.length * 0.5;
        });

        if (!hasMatchingContent) {
          const screenshotPath = await captureIssueScreenshot(
            page, articleId, 'MISSING_ASCII_DIAGRAM', issueIndex++
          );

          allIssues.push(createIssue(
            articleId,
            'MISSING_ASCII_DIAGRAM',
            { lineNumber: diagram.lineNumber },
            `ASCII diagram from line ${diagram.lineNumber} not found in rendered output`,
            {
              originalSnippet: diagram.content.substring(0, 100),
              screenshotPath
            }
          ));
        }
      }
    });
  }

  // ============================================================================
  // TEST SUITE: Content Completeness
  // ============================================================================

  for (const [articleId, markdownFile] of Object.entries(ARTICLE_MAP)) {
    test(`Content Completeness - ${articleId}`, async ({ page }) => {
      // Parse original markdown
      const markdownPath = getMarkdownPath(articleId, PUBLIC_DIR);

      if (!fs.existsSync(markdownPath)) {
        test.skip();
        return;
      }

      const parsed = parseMarkdownFile(markdownPath);
      const originalWordCount = parsed.wordCount;

      await navigateToArticle(page, articleId);

      // Wait for full content load
      await page.waitForTimeout(2000);

      // Scroll through entire page
      await page.evaluate(() => {
        return new Promise<void>((resolve) => {
          let scrollTop = 0;
          const scrollHeight = document.documentElement.scrollHeight;
          const interval = setInterval(() => {
            scrollTop += 500;
            window.scrollTo(0, scrollTop);
            if (scrollTop >= scrollHeight) {
              clearInterval(interval);
              setTimeout(resolve, 500);
            }
          }, 100);
        });
      });

      // Get rendered word count
      const pageText = await page.locator('div.prose').textContent() || '';
      const renderedWordCount = countWords(pageText);

      // Calculate completeness
      const completenessRatio = renderedWordCount / originalWordCount;

      if (completenessRatio < 0.95) {
        const missingPercentage = ((1 - completenessRatio) * 100).toFixed(1);

        allIssues.push(createIssue(
          articleId,
          'TRUNCATED_CONTENT',
          { section: 'full article' },
          `Content truncated: ${missingPercentage}% missing (original: ${originalWordCount} words, rendered: ${renderedWordCount} words)`,
          {
            originalSnippet: `Original word count: ${originalWordCount}`,
            renderedSnippet: `Rendered word count: ${renderedWordCount}`
          }
        ));
      }

      // Also check header count
      const headerElements = page.locator('div.prose h1, div.prose h2, div.prose h3, div.prose h4');
      const renderedHeaderCount = await headerElements.count();
      const originalHeaderCount = parsed.headers.length;

      if (renderedHeaderCount < originalHeaderCount * 0.8) {
        allIssues.push(createIssue(
          articleId,
          'MISSING_CONTENT',
          { section: 'headers' },
          `Missing headers: original has ${originalHeaderCount}, rendered has ${renderedHeaderCount}`,
        ));
      }
    });
  }

  // ============================================================================
  // TEST SUITE: Table Count Verification
  // ============================================================================

  for (const [articleId, markdownFile] of Object.entries(ARTICLE_MAP)) {
    test(`Table Conversion Verification - ${articleId}`, async ({ page }) => {
      // Parse original markdown
      const markdownPath = getMarkdownPath(articleId, PUBLIC_DIR);

      if (!fs.existsSync(markdownPath)) {
        test.skip();
        return;
      }

      const parsed = parseMarkdownFile(markdownPath);

      if (parsed.tables.length === 0) {
        // No tables to verify
        return;
      }

      await navigateToArticle(page, articleId);

      // Scroll through page
      await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
      await page.waitForTimeout(1000);

      // Count rendered table-like elements
      const tableSelectors = [
        'table',
        '[role="table"]',
        'div[class*="table"]',
        'div[class*="matrix"]',
        'div[class*="comparison"]',
        'div[class*="grid"]',  // Some tables become grids
      ];

      let renderedTableCount = 0;
      for (const selector of tableSelectors) {
        const count = await page.locator(selector).count();
        renderedTableCount += count;
      }

      // Check if we have fewer rendered tables than original
      if (renderedTableCount < parsed.tables.length) {
        const missing = parsed.tables.length - renderedTableCount;

        allIssues.push(createIssue(
          articleId,
          'UNCONVERTED_TABLE',
          { section: 'tables' },
          `Table conversion incomplete: ${missing} of ${parsed.tables.length} tables may not be properly converted`,
          {
            originalSnippet: `Original table count: ${parsed.tables.length}`,
            renderedSnippet: `Rendered table-like elements: ${renderedTableCount}`
          }
        ));
      }
    });
  }

  // ============================================================================
  // TEST: Summary Report Generation
  // ============================================================================

  test('Generate Conversion Report Summary', async ({ page }) => {
    // This test runs last and just ensures the report is generated
    // The actual report generation happens in afterAll

    // Give other tests time to complete and populate allIssues
    await page.waitForTimeout(1000);

    // Log current issue count for debugging
    console.log(`\nTotal issues collected: ${allIssues.length}`);

    // Categorize issues
    const criticalCount = allIssues.filter(i => i.severity === 'critical').length;
    const majorCount = allIssues.filter(i => i.severity === 'major').length;
    const minorCount = allIssues.filter(i => i.severity === 'minor').length;

    console.log(`Critical: ${criticalCount}`);
    console.log(`Major: ${majorCount}`);
    console.log(`Minor: ${minorCount}`);
  });
});
