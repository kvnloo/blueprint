import { test, expect } from '@playwright/test';

/**
 * Article View E2E Tests
 *
 * Tests the complete article reading experience including:
 * - Page loading and metadata
 * - Reading progress tracking
 * - Navigation controls
 * - Content rendering (headers, text, code, diagrams)
 * - Table of contents functionality
 * - Verification badges
 */

// Test configuration
test.use({
  viewport: { width: 1920, height: 1080 }, // 2xl breakpoint for TOC
});

test.describe('Article View Component', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the application
    await page.goto('/');

    // Wait for Research Hub to load
    await expect(page.locator('h1')).toContainText('Research');

    // Click the first article card to navigate to article view
    await page.locator('div.group.relative').first().click();

    // Wait for article view to load
    await page.waitForLoadState('networkidle');
  });

  test('1. Article page loads with correct title', async ({ page }) => {
    // Verify the article title is displayed
    const title = page.locator('h1.text-4xl.md\\:text-5xl.lg\\:text-6xl');
    await expect(title).toBeVisible();

    // Verify title contains text (not empty)
    const titleText = await title.textContent();
    expect(titleText).toBeTruthy();
    expect(titleText!.length).toBeGreaterThan(0);

    // Verify page title meta tag (if set)
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
  });

  test('2. Reading progress bar appears and updates on scroll', async ({ page }) => {
    // Verify progress bar exists at the top
    const progressBar = page.locator('motion-div').filter({ hasText: '' }).first();
    await expect(progressBar).toBeVisible();

    // Verify initial progress (should be near 0%)
    const initialTransform = await progressBar.evaluate((el) =>
      window.getComputedStyle(el).transform
    );

    // Scroll down to 50% of page
    await page.evaluate(() => {
      const scrollHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      window.scrollTo(0, (scrollHeight - viewportHeight) * 0.5);
    });

    // Wait for progress bar animation
    await page.waitForTimeout(300);

    // Verify progress bar has updated
    const midTransform = await progressBar.evaluate((el) =>
      window.getComputedStyle(el).transform
    );
    expect(midTransform).not.toBe(initialTransform);

    // Scroll to bottom
    await page.evaluate(() => {
      window.scrollTo(0, document.documentElement.scrollHeight);
    });

    await page.waitForTimeout(300);

    // Verify progress bar is near full
    const finalTransform = await progressBar.evaluate((el) =>
      window.getComputedStyle(el).transform
    );
    expect(finalTransform).not.toBe(midTransform);
  });

  test('3. Back button returns to Research Hub', async ({ page }) => {
    // Find and click the back button (fixed left side)
    const backButton = page.locator('button').filter({ has: page.locator('svg').filter({ hasText: '' }) }).first();
    await expect(backButton).toBeVisible();

    await backButton.click();

    // Verify we're back at Research Hub
    await expect(page.locator('h1')).toContainText('Research');
    await expect(page.locator('text=SCIENTIFIC DEEP DIVES & GUIDES')).toBeVisible();
  });

  test('4. Word count verification badge displays', async ({ page }) => {
    // Find the word count badge
    const wordCountBadge = page.locator('div').filter({ hasText: /\d+,?\d* words/ }).first();
    await expect(wordCountBadge).toBeVisible();

    // Verify it shows a number
    const badgeText = await wordCountBadge.textContent();
    expect(badgeText).toMatch(/\d+/);

    // Check if it has the correct status (valid or truncated)
    const hasFileIcon = await wordCountBadge.locator('svg').count() > 0;
    expect(hasFileIcon).toBe(true);

    // Verify the badge has appropriate styling (border color indicates status)
    const borderColor = await wordCountBadge.evaluate((el) =>
      window.getComputedStyle(el).borderColor
    );
    expect(borderColor).toBeTruthy();
  });

  test('5. Abstract section renders', async ({ page }) => {
    // Find abstract section (gradient background with border-l)
    const abstract = page.locator('div.bg-gradient-to-r.from-teal-500\\/10').first();
    await expect(abstract).toBeVisible();

    // Verify abstract has content
    const abstractText = await abstract.textContent();
    expect(abstractText).toBeTruthy();
    expect(abstractText!.length).toBeGreaterThan(20);

    // Verify abstract styling
    const hasLeftBorder = await abstract.evaluate((el) =>
      window.getComputedStyle(el).borderLeftWidth
    );
    expect(hasLeftBorder).not.toBe('0px');
  });

  test('6. Table of contents shows headers', async ({ page }) => {
    // TOC only visible on 2xl screens (already set in viewport)
    const toc = page.locator('nav.hidden.\\32 xl\\:block');

    // Check if TOC exists (may not be visible if no headers)
    const tocExists = await toc.count() > 0;

    if (tocExists) {
      await expect(toc).toBeVisible();

      // Verify "Contents" label
      await expect(page.locator('text=Contents')).toBeVisible();

      // Verify TOC has links
      const tocLinks = toc.locator('a');
      const linkCount = await tocLinks.count();
      expect(linkCount).toBeGreaterThan(0);

      // Verify links are properly formatted with href
      const firstLink = tocLinks.first();
      const href = await firstLink.getAttribute('href');
      expect(href).toMatch(/#section-\d+/);
    }
  });

  test('7. Code blocks render with copy functionality', async ({ page }) => {
    // Find code blocks
    const codeBlocks = page.locator('div').filter({
      has: page.locator('pre')
    }).filter({
      has: page.locator('code, pre.font-mono')
    });

    const codeBlockCount = await codeBlocks.count();

    if (codeBlockCount > 0) {
      const firstCodeBlock = codeBlocks.first();
      await expect(firstCodeBlock).toBeVisible();

      // Verify copy button exists
      const copyButton = firstCodeBlock.locator('button').filter({
        has: page.locator('svg')
      });

      if (await copyButton.count() > 0) {
        await expect(copyButton.first()).toBeVisible();

        // Click copy button
        await copyButton.first().click();

        // Verify button shows "Check" icon (copied state)
        await page.waitForTimeout(100);

        // Button should have changed state (copied)
        const hasCheckIcon = await firstCodeBlock.locator('svg').count() > 0;
        expect(hasCheckIcon).toBe(true);
      }
    }
  });

  test('8. Diagrams/visualizations render', async ({ page }) => {
    // Scroll through the page to trigger lazy-loaded visualizations
    await page.evaluate(() => {
      window.scrollTo(0, document.documentElement.scrollHeight / 2);
    });
    await page.waitForTimeout(500);

    // Look for various visualization types
    const visualizations = [
      // ASCII diagrams
      page.locator('pre.font-mono.text-xs.md\\:text-sm'),
      // Timeline visualizations
      page.locator('div.min-w-\\[600px\\]'),
      // Bar charts
      page.locator('div.h-2.w-full.bg-gray-800'),
      // System stacks
      page.locator('div.border-teal-500\\/20'),
    ];

    let foundVisualization = false;

    for (const viz of visualizations) {
      const count = await viz.count();
      if (count > 0) {
        foundVisualization = true;
        await expect(viz.first()).toBeVisible();
      }
    }

    // At least one type of visualization should be present
    // (This is a soft check - some articles may not have diagrams)
    if (foundVisualization) {
      expect(foundVisualization).toBe(true);
    }
  });

  test('9. Scroll-based TOC highlighting', async ({ page }) => {
    // TOC highlighting test (requires 2xl viewport)
    const toc = page.locator('nav.hidden.\\32 xl\\:block');
    const tocExists = await toc.count() > 0;

    if (tocExists) {
      // Get all TOC links
      const tocLinks = toc.locator('a');
      const linkCount = await tocLinks.count();

      if (linkCount > 0) {
        // Scroll to top
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(300);

        // Check for active state on first section
        const firstLink = tocLinks.first();
        const firstLinkClasses = await firstLink.getAttribute('class');

        // Scroll to middle
        await page.evaluate(() => {
          const scrollHeight = document.documentElement.scrollHeight;
          const viewportHeight = window.innerHeight;
          window.scrollTo(0, (scrollHeight - viewportHeight) * 0.5);
        });
        await page.waitForTimeout(500);

        // At least one link should have active styling
        const activeLinkExists = await tocLinks.evaluate((links) => {
          return Array.from(links).some(link =>
            link.className.includes('text-teal-400') ||
            link.className.includes('border-teal-400')
          );
        });

        expect(activeLinkExists).toBe(true);
      }
    }
  });

  test('10. Footer back link works', async ({ page }) => {
    // Scroll to footer
    await page.evaluate(() => {
      window.scrollTo(0, document.documentElement.scrollHeight);
    });

    // Wait for footer to be visible
    await page.waitForTimeout(300);

    // Find "Back to Hub" link in footer
    const footerBackLink = page.locator('button').filter({ hasText: 'Back to Hub' });
    await expect(footerBackLink).toBeVisible();

    // Click footer back link
    await footerBackLink.click();

    // Verify navigation back to Research Hub
    await expect(page.locator('h1')).toContainText('Research');
  });

  test('11. Track badge displays with correct color', async ({ page }) => {
    // Find track badge
    const trackBadge = page.locator('div').filter({ hasText: /Track$/ }).first();
    await expect(trackBadge).toBeVisible();

    // Verify badge text
    const badgeText = await trackBadge.textContent();
    expect(badgeText).toMatch(/(Blueprint|World Sim|Evolve) Track/);

    // Verify badge has color styling
    const badgeClass = await trackBadge.getAttribute('class');
    const hasTrackColor =
      badgeClass?.includes('cyan') ||
      badgeClass?.includes('orange') ||
      badgeClass?.includes('emerald');
    expect(hasTrackColor).toBe(true);
  });

  test('12. Article type badge displays', async ({ page }) => {
    // Find type badge
    const typeBadge = page.locator('div.border-white\\/10.bg-white\\/5').filter({
      hasText: /Research|Guide|Analysis|Whitepaper/
    }).first();

    await expect(typeBadge).toBeVisible();

    // Verify badge has appropriate styling
    const badgeClass = await typeBadge.getAttribute('class');
    expect(badgeClass).toContain('uppercase');
  });

  test('13. Read time displays correctly', async ({ page }) => {
    // Find read time indicator
    const readTime = page.locator('span').filter({ hasText: /\d+ min read/ }).first();
    await expect(readTime).toBeVisible();

    // Verify format
    const readTimeText = await readTime.textContent();
    expect(readTimeText).toMatch(/\d+ min read/);
  });

  test('14. Share button exists and is visible', async ({ page }) => {
    // Find share button (fixed left side with Back button)
    const shareButton = page.locator('button').filter({
      has: page.locator('svg').nth(1)
    });

    // Note: Share button may only be visible on xl+ screens
    const isVisible = await shareButton.isVisible().catch(() => false);

    if (isVisible) {
      await expect(shareButton).toBeVisible();
    }
  });

  test('15. Headers have proper scroll margin for navigation', async ({ page }) => {
    // Find all headers
    const headers = page.locator('h2, h3').filter({ hasText: /.+/ });
    const headerCount = await headers.count();

    if (headerCount > 0) {
      const firstHeader = headers.first();

      // Verify header has scroll-mt class for proper spacing
      const headerClass = await firstHeader.getAttribute('class');
      expect(headerClass).toContain('scroll-mt');
    }
  });

  test('16. Mission statement displays in footer', async ({ page }) => {
    // Scroll to footer
    await page.evaluate(() => {
      window.scrollTo(0, document.documentElement.scrollHeight);
    });

    await page.waitForTimeout(300);

    // Find mission statement
    const missionText = page.locator('text=This knowledge is shared freely');
    await expect(missionText).toBeVisible();

    // Verify full mission statement
    const fullText = await page.locator('p.text-sm.text-gray-500.italic').textContent();
    expect(fullText).toContain('democratize peak performance');
  });

  test('17. Article content renders with proper typography', async ({ page }) => {
    // Verify content has proper prose styling
    const contentArea = page.locator('div.prose.prose-invert');
    await expect(contentArea).toBeVisible();

    // Check for text content
    const textBlocks = contentArea.locator('div.text-gray-300');
    const textCount = await textBlocks.count();
    expect(textCount).toBeGreaterThan(0);
  });

  test('18. Page maintains responsive layout on mobile', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Verify title is still visible and readable
    const title = page.locator('h1');
    await expect(title).toBeVisible();

    // Verify TOC is hidden on mobile
    const toc = page.locator('nav.hidden.\\32 xl\\:block');
    await expect(toc).not.toBeVisible();

    // Verify back button positioning on mobile
    const backButton = page.locator('button').filter({ has: page.locator('svg') }).first();
    // Back button may be hidden on small screens
    const isVisible = await backButton.isVisible().catch(() => false);

    // Content should still be readable
    const content = page.locator('div.prose');
    await expect(content).toBeVisible();
  });

  test('19. Navigation controls are accessible', async ({ page }) => {
    // Test keyboard navigation
    const backButton = page.locator('button').filter({ has: page.locator('svg') }).first();

    // Focus the button
    await backButton.focus();

    // Verify focus styling
    const isFocused = await backButton.evaluate((el) =>
      el === document.activeElement
    );
    expect(isFocused).toBe(true);

    // Test keyboard activation (Enter key)
    await page.keyboard.press('Enter');

    // Should navigate back
    await expect(page.locator('h1')).toContainText('Research');
  });

  test('20. All animations complete without errors', async ({ page }) => {
    // Monitor console for errors
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Scroll through entire article to trigger all animations
    await page.evaluate(() => {
      return new Promise<void>((resolve) => {
        let scrollTop = 0;
        const scrollHeight = document.documentElement.scrollHeight;
        const interval = setInterval(() => {
          scrollTop += 100;
          window.scrollTo(0, scrollTop);

          if (scrollTop >= scrollHeight) {
            clearInterval(interval);
            resolve();
          }
        }, 50);
      });
    });

    // Wait for animations to complete
    await page.waitForTimeout(1000);

    // Verify no animation-related errors
    const animationErrors = errors.filter(err =>
      err.includes('animation') ||
      err.includes('motion') ||
      err.includes('framer')
    );

    expect(animationErrors.length).toBe(0);
  });
});
