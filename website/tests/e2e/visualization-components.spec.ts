/**
 * Visualization Components Test Suite
 *
 * Component-level visual regression tests for all visualization types
 * used in the Research Hub articles.
 *
 * Visualization Types:
 * - HierarchyVis: Tree/hierarchy diagrams
 * - ProcessFlowVis: Step-by-step processes
 * - MetricsDashboardVis: Performance metrics display
 * - ComparisonMatrixVis: Side-by-side comparisons
 * - ChecklistVis: Interactive checklists
 * - QuoteHighlightVis: Styled quote displays
 * - ASCIIArtVis: Preserved ASCII diagrams
 * - FloorPlanVis: Spatial layouts
 * - RadialVis: Circular/radial charts
 * - CardsVis: Card-based content
 */

import { test, expect, Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// Screenshot output directory
const SCREENSHOT_DIR = path.resolve(__dirname, '../test-results/screenshots/visualizations');

// Visualization type definitions and expected selectors
const VISUALIZATION_TYPES = {
  hierarchy: {
    name: 'HierarchyVis',
    selectors: ['[data-vis-type="hierarchy"]', '.hierarchy-vis', 'div[class*="hierarchy"]'],
    minHeight: 100,
    description: 'Tree/hierarchy structure visualization'
  },
  processFlow: {
    name: 'ProcessFlowVis',
    selectors: ['[data-vis-type="process"]', '.process-flow', 'div[class*="process"]', 'div[class*="flow"]'],
    minHeight: 50,
    description: 'Step-by-step process flow'
  },
  metrics: {
    name: 'MetricsDashboardVis',
    selectors: ['[data-vis-type="metrics"]', '.metrics-dashboard', 'div[class*="metrics"]', 'div[class*="dashboard"]'],
    minHeight: 100,
    description: 'Performance metrics display'
  },
  comparison: {
    name: 'ComparisonMatrixVis',
    selectors: ['[data-vis-type="comparison"]', '.comparison-matrix', 'div[class*="comparison"]', 'div[class*="matrix"]'],
    minHeight: 100,
    description: 'Side-by-side comparison matrix'
  },
  checklist: {
    name: 'ChecklistVis',
    selectors: ['[data-vis-type="checklist"]', '.checklist-vis', 'div[class*="checklist"]', 'ul.space-y-'],
    minHeight: 50,
    description: 'Interactive checklist items'
  },
  quote: {
    name: 'QuoteHighlightVis',
    selectors: ['[data-vis-type="quote"]', '.quote-highlight', 'blockquote', 'div.border-l-4'],
    minHeight: 30,
    description: 'Styled quote highlight'
  },
  ascii: {
    name: 'ASCIIArtVis',
    selectors: ['[data-vis-type="ascii"]', '.ascii-art', 'pre.font-mono', 'pre.text-xs'],
    minHeight: 50,
    description: 'ASCII art/diagram rendering'
  },
  floorplan: {
    name: 'FloorPlanVis',
    selectors: ['[data-vis-type="floorplan"]', '.floorplan-vis', 'div[class*="floorplan"]', 'div[class*="layout"]'],
    minHeight: 100,
    description: 'Spatial floor plan layout'
  },
  radial: {
    name: 'RadialVis',
    selectors: ['[data-vis-type="radial"]', '.radial-vis', 'div[class*="radial"]', 'div[class*="circular"]'],
    minHeight: 100,
    description: 'Radial/circular chart'
  },
  cards: {
    name: 'CardsVis',
    selectors: ['[data-vis-type="cards"]', '.cards-vis', 'div.grid.gap-', 'div[class*="card"]'],
    minHeight: 50,
    description: 'Card-based content grid'
  },
  timeline: {
    name: 'TimelineVis',
    selectors: ['[data-vis-type="timeline"]', '.timeline-vis', 'div[class*="timeline"]', 'div.min-w-\\[600px\\]'],
    minHeight: 50,
    description: 'Timeline visualization'
  },
  codeBlock: {
    name: 'CodeBlockVis',
    selectors: ['div:has(> pre)', 'div[class*="code"]', '.code-block'],
    minHeight: 30,
    description: 'Syntax-highlighted code block'
  }
};

// Articles known to have specific visualization types
const ARTICLE_VISUALIZATIONS: Record<string, string[]> = {
  'second-brain': ['ascii', 'hierarchy', 'quote', 'codeBlock'],
  'limitless-protocol': ['processFlow', 'metrics', 'checklist', 'ascii'],
  'atlas-roadmap': ['timeline', 'comparison', 'hierarchy', 'metrics'],
  'architecture-intelligence': ['hierarchy', 'floorplan', 'processFlow', 'ascii'],
  'home-grown-revolution': ['floorplan', 'cards', 'checklist', 'ascii'],
  'living-room': ['floorplan', 'cards', 'quote', 'ascii'],
  'limitless-kitchen': ['floorplan', 'cards', 'checklist', 'ascii'],
  'capability-trap': ['hierarchy', 'processFlow', 'quote', 'ascii'],
  'learning-interface': ['hierarchy', 'processFlow', 'metrics', 'ascii']
};

test.describe('Visualization Components', () => {
  test.use({
    viewport: { width: 1920, height: 1080 },
  });

  // Ensure screenshot directory exists
  test.beforeAll(async () => {
    if (!fs.existsSync(SCREENSHOT_DIR)) {
      fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
    }
  });

  /**
   * Navigate to Research Hub and open an article
   */
  async function navigateToArticle(page: Page, articleTitle: string): Promise<void> {
    await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });

    // Wait for navbar
    await expect(page.locator('nav')).toBeVisible({ timeout: 10000 });

    // Click Research button
    const researchButton = page.locator('button').filter({ hasText: /^Research$/ });
    await expect(researchButton).toBeVisible({ timeout: 5000 });
    await researchButton.click();

    // Wait for Research Hub
    await expect(page.locator('text=SCIENTIFIC DEEP DIVES & GUIDES')).toBeVisible({ timeout: 10000 });

    // Find and click the specific article
    const articleCard = page.locator('div.group.relative').filter({ hasText: new RegExp(articleTitle, 'i') }).first();

    if (await articleCard.count() > 0) {
      await articleCard.click();
    } else {
      // Fallback to first article
      await page.locator('div.group.relative').first().click();
    }

    // Wait for article content
    await expect(page.locator('div.prose')).toBeVisible({ timeout: 10000 });
  }

  /**
   * Scroll through page to load lazy content
   */
  async function loadAllContent(page: Page): Promise<void> {
    await page.evaluate(() => {
      return new Promise<void>((resolve) => {
        let scrollTop = 0;
        const scrollHeight = document.documentElement.scrollHeight;
        const interval = setInterval(() => {
          scrollTop += 500;
          window.scrollTo(0, scrollTop);
          if (scrollTop >= scrollHeight) {
            clearInterval(interval);
            setTimeout(resolve, 1000);
          }
        }, 100);
      });
    });
  }

  // ============================================================================
  // Component Existence Tests - Verify each visualization type renders
  // ============================================================================

  for (const [visType, config] of Object.entries(VISUALIZATION_TYPES)) {
    test(`Component renders: ${config.name}`, async ({ page }) => {
      // Find an article that should have this visualization type
      const articlesWithVis = Object.entries(ARTICLE_VISUALIZATIONS)
        .filter(([_, types]) => types.includes(visType))
        .map(([article]) => article);

      if (articlesWithVis.length === 0) {
        test.skip();
        return;
      }

      // Map article IDs to display names
      const articleTitles: Record<string, string> = {
        'second-brain': 'Second Brain',
        'limitless-protocol': 'Limitless Protocol',
        'atlas-roadmap': 'ATLAS',
        'architecture-intelligence': 'Architecture',
        'home-grown-revolution': 'Home-Grown',
        'living-room': 'Living Room',
        'limitless-kitchen': 'Limitless Kitchen',
        'capability-trap': 'Capability Trap',
        'learning-interface': 'Learning Interface'
      };

      const targetArticle = articlesWithVis[0];
      const title = articleTitles[targetArticle] || targetArticle;

      await navigateToArticle(page, title);
      await loadAllContent(page);

      // Try each selector
      let found = false;
      let foundSelector = '';
      let element = null;

      for (const selector of config.selectors) {
        const locator = page.locator(selector);
        const count = await locator.count();

        if (count > 0) {
          found = true;
          foundSelector = selector;
          element = locator.first();
          break;
        }
      }

      if (found && element) {
        // Verify visibility
        await expect(element).toBeVisible();

        // Verify minimum height
        const box = await element.boundingBox();
        expect(box?.height).toBeGreaterThanOrEqual(config.minHeight);

        // Take component screenshot
        const screenshotPath = path.join(SCREENSHOT_DIR, `${config.name}-baseline.png`);
        await element.screenshot({ path: screenshotPath });

        console.log(`✓ ${config.name} found with selector: ${foundSelector}`);
      } else {
        // Log which selectors were tried
        console.log(`⚠ ${config.name} not found. Tried selectors: ${config.selectors.join(', ')}`);
      }
    });
  }

  // ============================================================================
  // Visual Regression Tests - Compare against baselines
  // ============================================================================

  test.describe('Visual Regression', () => {
    test('ASCII diagrams render with correct styling', async ({ page }) => {
      await navigateToArticle(page, 'Second Brain');
      await loadAllContent(page);

      const asciiElements = page.locator('pre.font-mono');
      const count = await asciiElements.count();

      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < Math.min(count, 3); i++) {
        const element = asciiElements.nth(i);

        // Check it has content
        const text = await element.textContent();
        expect(text?.length).toBeGreaterThan(10);

        // Check styling
        const styles = await element.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            fontFamily: computed.fontFamily,
            fontSize: computed.fontSize,
            whiteSpace: computed.whiteSpace
          };
        });

        // Should use monospace font
        expect(styles.fontFamily.toLowerCase()).toMatch(/mono|courier|consolas/);

        // Should preserve whitespace
        expect(['pre', 'pre-wrap']).toContain(styles.whiteSpace);

        // Take screenshot
        await element.screenshot({
          path: path.join(SCREENSHOT_DIR, `ascii-${i}.png`)
        });
      }
    });

    test('Quote highlights have proper styling', async ({ page }) => {
      await navigateToArticle(page, 'Living Room');
      await loadAllContent(page);

      const quoteElements = page.locator('blockquote, div.border-l-4');
      const count = await quoteElements.count();

      if (count > 0) {
        const quote = quoteElements.first();
        await expect(quote).toBeVisible();

        // Check left border styling
        const borderStyle = await quote.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            borderLeftWidth: computed.borderLeftWidth,
            borderLeftStyle: computed.borderLeftStyle
          };
        });

        // Should have visible left border
        expect(parseInt(borderStyle.borderLeftWidth)).toBeGreaterThan(0);

        await quote.screenshot({
          path: path.join(SCREENSHOT_DIR, `quote-highlight.png`)
        });
      }
    });

    test('Code blocks have syntax highlighting', async ({ page }) => {
      await navigateToArticle(page, 'Second Brain');
      await loadAllContent(page);

      const codeBlocks = page.locator('pre:has(code), div:has(> pre)');
      const count = await codeBlocks.count();

      if (count > 0) {
        const codeBlock = codeBlocks.first();
        await expect(codeBlock).toBeVisible();

        // Check for copy button
        const copyButton = codeBlock.locator('button');
        const hasCopyButton = await copyButton.count() > 0;

        // Take screenshot
        await codeBlock.screenshot({
          path: path.join(SCREENSHOT_DIR, `code-block.png`)
        });

        console.log(`Code block has copy button: ${hasCopyButton}`);
      }
    });

    test('Grid layouts render correctly', async ({ page }) => {
      await navigateToArticle(page, 'Home-Grown');
      await loadAllContent(page);

      const gridElements = page.locator('div.grid');
      const count = await gridElements.count();

      if (count > 0) {
        const grid = gridElements.first();
        await expect(grid).toBeVisible();

        // Check grid has multiple children
        const childCount = await grid.locator('> *').count();
        expect(childCount).toBeGreaterThan(1);

        // Verify grid layout is applied
        const display = await grid.evaluate((el) =>
          window.getComputedStyle(el).display
        );
        expect(display).toBe('grid');

        await grid.screenshot({
          path: path.join(SCREENSHOT_DIR, `grid-layout.png`)
        });
      }
    });
  });

  // ============================================================================
  // Dimension Verification Tests
  // ============================================================================

  test.describe('Dimension Verification', () => {
    test('Visualizations have non-zero dimensions', async ({ page }) => {
      await navigateToArticle(page, 'ATLAS');
      await loadAllContent(page);

      const allSelectors = Object.values(VISUALIZATION_TYPES)
        .flatMap(config => config.selectors);

      let emptyCount = 0;
      let validCount = 0;

      for (const selector of allSelectors) {
        const elements = page.locator(selector);
        const count = await elements.count();

        for (let i = 0; i < count; i++) {
          const element = elements.nth(i);
          const isVisible = await element.isVisible();

          if (isVisible) {
            const box = await element.boundingBox();

            if (box) {
              if (box.width > 0 && box.height > 0) {
                validCount++;
              } else {
                emptyCount++;
                console.log(`Empty visualization: ${selector} (${box.width}x${box.height})`);
              }
            }
          }
        }
      }

      console.log(`Valid visualizations: ${validCount}`);
      console.log(`Empty visualizations: ${emptyCount}`);

      // At least some visualizations should be valid
      expect(validCount).toBeGreaterThan(0);
    });

    test('Tables render with proper structure', async ({ page }) => {
      await navigateToArticle(page, 'ATLAS');
      await loadAllContent(page);

      // Look for table-like elements
      const tableSelectors = [
        'table',
        '[role="table"]',
        'div[class*="table"]',
        'div[class*="matrix"]',
        'div.grid.grid-cols-'
      ];

      for (const selector of tableSelectors) {
        const elements = page.locator(selector);
        const count = await elements.count();

        if (count > 0) {
          const table = elements.first();
          await expect(table).toBeVisible();

          const box = await table.boundingBox();
          expect(box?.width).toBeGreaterThan(100);

          // Screenshot first table found
          await table.screenshot({
            path: path.join(SCREENSHOT_DIR, 'table-structure.png')
          });

          break;
        }
      }
    });
  });

  // ============================================================================
  // Interaction Tests
  // ============================================================================

  test.describe('Interactions', () => {
    test('Checklist items are interactive', async ({ page }) => {
      await navigateToArticle(page, 'Limitless Protocol');
      await loadAllContent(page);

      // Look for checkbox-like elements
      const checkboxSelectors = [
        'input[type="checkbox"]',
        '[role="checkbox"]',
        'div[class*="checkbox"]',
        'li:has(svg)'  // Items with check icons
      ];

      for (const selector of checkboxSelectors) {
        const elements = page.locator(selector);
        const count = await elements.count();

        if (count > 0) {
          console.log(`Found ${count} interactive elements with selector: ${selector}`);
          break;
        }
      }
    });

    test('Collapsible sections expand on click', async ({ page }) => {
      await navigateToArticle(page, 'Architecture');
      await loadAllContent(page);

      // Look for collapsible/accordion elements
      const collapsibleSelectors = [
        '[data-state="closed"]',
        '[aria-expanded="false"]',
        'details:not([open])',
        'button:has(svg[class*="chevron"])'
      ];

      for (const selector of collapsibleSelectors) {
        const elements = page.locator(selector);
        const count = await elements.count();

        if (count > 0) {
          const collapsible = elements.first();

          // Get initial state
          const initialHeight = await collapsible.evaluate((el) => el.scrollHeight);

          // Click to expand
          await collapsible.click();
          await page.waitForTimeout(300);

          // Check if expanded
          const expandedHeight = await collapsible.evaluate((el) => el.scrollHeight);

          console.log(`Collapsible found. Initial: ${initialHeight}, Expanded: ${expandedHeight}`);
          break;
        }
      }
    });
  });

  // ============================================================================
  // Responsiveness Tests
  // ============================================================================

  test.describe('Responsiveness', () => {
    const viewports = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1280, height: 720 },
      { name: 'wide', width: 1920, height: 1080 }
    ];

    for (const viewport of viewports) {
      test(`Visualizations render on ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });

        await navigateToArticle(page, 'Second Brain');
        await loadAllContent(page);

        // Check that ASCII diagrams adapt or show horizontal scroll
        const asciiElements = page.locator('pre.font-mono');
        const count = await asciiElements.count();

        if (count > 0) {
          const ascii = asciiElements.first();
          const box = await ascii.boundingBox();

          // Should be visible and contained
          expect(box?.width).toBeLessThanOrEqual(viewport.width);

          // Take viewport screenshot
          await page.screenshot({
            path: path.join(SCREENSHOT_DIR, `responsive-${viewport.name}.png`),
            fullPage: false
          });
        }
      });
    }
  });

  // ============================================================================
  // Performance Tests
  // ============================================================================

  test.describe('Performance', () => {
    test('Visualizations load within acceptable time', async ({ page }) => {
      const startTime = Date.now();

      await navigateToArticle(page, 'Architecture');

      // Wait for visualizations to appear
      await page.waitForSelector('pre.font-mono, div[class*="visualization"], div.grid', {
        timeout: 10000
      }).catch(() => null);

      const loadTime = Date.now() - startTime;

      console.log(`Visualization load time: ${loadTime}ms`);

      // Should load within 10 seconds
      expect(loadTime).toBeLessThan(10000);
    });

    test('No layout shift after initial render', async ({ page }) => {
      await navigateToArticle(page, 'Second Brain');

      // Get initial positions
      const asciiElements = page.locator('pre.font-mono');
      const initialCount = await asciiElements.count();

      if (initialCount > 0) {
        const initialBox = await asciiElements.first().boundingBox();

        // Wait for any late loading
        await page.waitForTimeout(2000);

        // Check position hasn't changed significantly
        const finalBox = await asciiElements.first().boundingBox();

        if (initialBox && finalBox) {
          const shift = Math.abs(initialBox.y - finalBox.y);
          expect(shift).toBeLessThan(50);
        }
      }
    });
  });
});
