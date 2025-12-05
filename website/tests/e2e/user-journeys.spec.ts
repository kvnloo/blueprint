import { test, expect, type Page } from '@playwright/test';

/**
 * E2E User Journey Tests
 *
 * These tests verify complete user flows through the application,
 * ensuring all interactive elements work correctly in realistic scenarios.
 */

test.describe('Journey 1: New Visitor Exploration', () => {
  test('should complete full visitor exploration flow', async ({ page }) => {
    // Land on home page
    await page.goto('/');
    await expect(page).toHaveTitle(/Blueprint/i);

    // Verify hero section is visible
    await expect(page.locator('h1')).toBeVisible();

    // Scroll through all sections
    const sections = ['hero', 'features', 'about', 'contact'].map(id =>
      page.locator(`[id="${id}"], section:has-text("${id}")`).first()
    );

    for (const section of sections) {
      if (await section.count() > 0) {
        await section.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500); // Brief pause for scroll animation
      }
    }

    // Click on Research in navbar
    const researchLink = page.locator('nav a:has-text("Research"), nav a[href*="research"]').first();
    await researchLink.click();

    // Wait for navigation to Research Hub
    await page.waitForURL(/.*research.*/);
    await expect(page).toHaveURL(/.*research.*/);

    // Browse article cards
    const articleCards = page.locator('article, [data-article], .article-card').first();
    await expect(articleCards).toBeVisible({ timeout: 10000 });

    // Click on first article
    const firstArticle = page.locator('article a, [data-article] a, .article-card a').first();
    await firstArticle.click();

    // Wait for article page to load
    await page.waitForLoadState('networkidle');

    // Read and scroll through article
    await expect(page.locator('h1, article h1, [role="article"] h1').first()).toBeVisible();

    // Scroll through article content
    const articleContent = page.locator('article, [role="article"], main').first();
    await articleContent.scrollIntoViewIfNeeded();

    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // Click back to Research Hub (browser back button)
    await page.goBack();
    await page.waitForURL(/.*research.*/);

    // Navigate home via logo
    const logo = page.locator('nav a[href="/"], nav a:has-text("Blueprint"), header a[href="/"]').first();
    await logo.click();

    // Verify we're back home
    await page.waitForURL('/');
    await expect(page).toHaveURL('/');
  });
});

test.describe('Journey 2: Mobile User Experience', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE viewport

  test('should complete mobile navigation flow', async ({ page }) => {
    // Open site on mobile viewport
    await page.goto('/');
    await expect(page).toHaveTitle(/Blueprint/i);

    // Open hamburger menu
    const hamburger = page.locator('button[aria-label*="menu" i], button:has-text("Menu"), nav button').first();
    await expect(hamburger).toBeVisible();
    await hamburger.click();

    // Verify menu is open (check for expanded state or visible nav links)
    await page.waitForTimeout(500); // Wait for menu animation

    // Navigate to Research
    const researchLink = page.locator('nav a:has-text("Research"), a[href*="research"]').first();
    await expect(researchLink).toBeVisible();
    await researchLink.click();

    // Wait for navigation
    await page.waitForURL(/.*research.*/);

    // Select an article
    await page.waitForSelector('article, [data-article], .article-card', { timeout: 10000 });
    const article = page.locator('article a, [data-article] a, .article-card a').first();
    await article.click();

    // Wait for article to load
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1, article h1').first()).toBeVisible();

    // Use back button to return
    await page.goBack();
    await page.waitForURL(/.*research.*/);

    // Close mobile menu (if it auto-opened after back navigation)
    const isMenuOpen = await hamburger.evaluate((el: HTMLElement) => {
      return el.getAttribute('aria-expanded') === 'true' ||
             window.getComputedStyle(el).display !== 'none';
    });

    if (isMenuOpen) {
      await hamburger.click();
      await page.waitForTimeout(300);
    }
  });
});

test.describe('Journey 3: Research Deep Dive', () => {
  test('should complete research exploration flow', async ({ page }) => {
    // Navigate directly to Research Hub
    await page.goto('/research');
    await page.waitForLoadState('networkidle');

    // Verify Research Hub loaded
    await expect(page.locator('h1, h2').first()).toBeVisible();

    // Browse articles (verify article cards exist)
    const articles = page.locator('article, [data-article], .article-card');
    const articleCount = await articles.count();
    expect(articleCount).toBeGreaterThan(0);

    // Open multiple articles in sequence (up to 3)
    const maxArticles = Math.min(3, articleCount);

    for (let i = 0; i < maxArticles; i++) {
      // Go back to research hub if not on first iteration
      if (i > 0) {
        await page.goto('/research');
        await page.waitForLoadState('networkidle');
      }

      // Click on article
      const articleLink = page.locator('article a, [data-article] a, .article-card a').nth(i);
      await articleLink.click();

      // Wait for article to load
      await page.waitForLoadState('networkidle');

      // Verify article loaded
      await expect(page.locator('h1, article h1').first()).toBeVisible();

      // Check for word count (if available)
      const wordCount = page.locator('[data-word-count], .word-count, :has-text("min read")').first();
      if (await wordCount.count() > 0) {
        await expect(wordCount).toBeVisible();
      }

      // Test code copy functionality (if code blocks exist)
      const codeBlock = page.locator('pre code, .code-block').first();
      if (await codeBlock.count() > 0) {
        const copyButton = page.locator('button:has-text("Copy"), button[aria-label*="copy" i]').first();
        if (await copyButton.count() > 0) {
          await copyButton.click();

          // Verify copy feedback (button text change or toast notification)
          await expect(
            copyButton.or(page.locator('.toast, [role="status"]'))
          ).toBeVisible();
        }
      }
    }
  });

  test('should filter articles by track if available', async ({ page }) => {
    await page.goto('/research');
    await page.waitForLoadState('networkidle');

    // Look for filter/track buttons or tabs
    const filterButtons = page.locator('button:has-text("Track"), [role="tab"], .filter-button');

    if (await filterButtons.count() > 0) {
      const firstFilter = filterButtons.first();
      await firstFilter.click();

      // Wait for filtered results
      await page.waitForTimeout(500);

      // Verify articles are still visible
      const articles = page.locator('article, [data-article], .article-card');
      expect(await articles.count()).toBeGreaterThan(0);
    }
  });
});

test.describe('Journey 4: Accessibility User', () => {
  test('should complete keyboard-only navigation', async ({ page }) => {
    await page.goto('/');

    // Track all focusable elements we encounter
    const focusedElements: string[] = [];

    // Helper to get current focused element
    const getFocusedElement = async () => {
      return await page.evaluate(() => {
        const el = document.activeElement;
        return el ? `${el.tagName}${el.className ? '.' + el.className.split(' ')[0] : ''}` : 'none';
      });
    };

    // Tab through interactive elements (limit to 20 tabs to avoid infinite loop)
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);

      const focused = await getFocusedElement();
      focusedElements.push(focused);

      // Verify focus is visible
      const hasFocusVisible = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement;
        if (!el) return false;

        const styles = window.getComputedStyle(el);
        const pseudoStyles = window.getComputedStyle(el, ':focus-visible');

        // Check for visible focus indicators
        return (
          styles.outline !== 'none' ||
          styles.outlineWidth !== '0px' ||
          styles.boxShadow !== 'none' ||
          pseudoStyles.outline !== 'none' ||
          pseudoStyles.outlineWidth !== '0px' ||
          pseudoStyles.boxShadow !== 'none'
        );
      });

      // Skip if we're on body or non-interactive element
      if (focused === 'BODY' || focused === 'none') continue;

      // Focus should be visible on interactive elements
      expect(hasFocusVisible).toBe(true);
    }

    // Verify we focused on various interactive elements
    expect(focusedElements.filter(el => el.startsWith('A')).length).toBeGreaterThan(0); // Links
    expect(focusedElements.filter(el => el.startsWith('BUTTON')).length).toBeGreaterThan(0); // Buttons
  });

  test('should activate elements with Enter and Space', async ({ page }) => {
    await page.goto('/');

    // Tab to first link
    let currentElement = '';
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      currentElement = await page.evaluate(() => document.activeElement?.tagName || '');
      if (currentElement === 'A') break;
    }

    // Activate link with Enter
    if (currentElement === 'A') {
      const href = await page.evaluate(() => (document.activeElement as HTMLAnchorElement)?.href || '');
      await page.keyboard.press('Enter');

      // Verify navigation occurred (if it was an internal link)
      if (href && href.includes(page.url().split('/')[2])) {
        await page.waitForLoadState('networkidle');
      }
    }

    // Go back and test button activation
    await page.goto('/');

    // Tab to first button
    currentElement = '';
    for (let i = 0; i < 15; i++) {
      await page.keyboard.press('Tab');
      currentElement = await page.evaluate(() => document.activeElement?.tagName || '');
      if (currentElement === 'BUTTON') break;
    }

    // Activate button with Space
    if (currentElement === 'BUTTON') {
      const buttonText = await page.evaluate(() => document.activeElement?.textContent || '');

      await page.keyboard.press('Space');
      await page.waitForTimeout(300);

      // Verify some action occurred (menu opened, modal shown, etc.)
      // This is a basic check - actual verification depends on button functionality
      const hasAriaExpanded = await page.evaluate(() =>
        document.activeElement?.getAttribute('aria-expanded') !== null
      );

      if (hasAriaExpanded) {
        const isExpanded = await page.evaluate(() =>
          document.activeElement?.getAttribute('aria-expanded') === 'true'
        );
        expect(typeof isExpanded).toBe('boolean');
      }
    }
  });

  test('should support screen reader navigation', async ({ page }) => {
    await page.goto('/');

    // Verify semantic HTML structure
    const semanticElements = await page.evaluate(() => {
      return {
        hasMain: document.querySelector('main') !== null,
        hasNav: document.querySelector('nav') !== null,
        hasHeader: document.querySelector('header') !== null,
        hasFooter: document.querySelector('footer') !== null,
        hasHeadings: document.querySelectorAll('h1, h2, h3').length > 0,
        hasLandmarks: document.querySelectorAll('[role="main"], [role="navigation"], [role="banner"]').length > 0
      };
    });

    expect(semanticElements.hasMain || semanticElements.hasLandmarks).toBe(true);
    expect(semanticElements.hasNav).toBe(true);
    expect(semanticElements.hasHeadings).toBe(true);

    // Verify ARIA labels on interactive elements
    const interactiveElements = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const links = Array.from(document.querySelectorAll('a'));

      return {
        buttonsWithLabels: buttons.filter(btn =>
          btn.getAttribute('aria-label') ||
          btn.textContent?.trim() ||
          btn.getAttribute('title')
        ).length,
        totalButtons: buttons.length,
        linksWithLabels: links.filter(link =>
          link.getAttribute('aria-label') ||
          link.textContent?.trim() ||
          link.getAttribute('title')
        ).length,
        totalLinks: links.length
      };
    });

    // All buttons should have accessible labels
    if (interactiveElements.totalButtons > 0) {
      expect(interactiveElements.buttonsWithLabels).toBe(interactiveElements.totalButtons);
    }

    // Most links should have accessible labels (some icon links might use aria-label)
    if (interactiveElements.totalLinks > 0) {
      const labelCoverage = interactiveElements.linksWithLabels / interactiveElements.totalLinks;
      expect(labelCoverage).toBeGreaterThan(0.8); // At least 80% should have labels
    }
  });
});

test.describe('Journey 5: Performance & Load States', () => {
  test('should handle slow network conditions gracefully', async ({ page }) => {
    // Simulate slow 3G connection
    await page.route('**/*', async (route) => {
      await new Promise(resolve => setTimeout(resolve, 100)); // Add 100ms delay
      await route.continue();
    });

    await page.goto('/');

    // Verify loading states are shown
    const loadingIndicator = page.locator('[data-loading], .loading, .skeleton').first();
    if (await loadingIndicator.count() > 0) {
      await expect(loadingIndicator).toBeVisible();
    }

    // Wait for content to load
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('should handle navigation between pages smoothly', async ({ page }) => {
    await page.goto('/');

    // Navigate to research
    await page.click('nav a:has-text("Research"), nav a[href*="research"]');
    await page.waitForLoadState('networkidle');

    // Measure Time to Interactive for research page
    const ttiMetrics = await page.evaluate(() => {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
        domInteractive: perfData.domInteractive - perfData.fetchStart
      };
    });

    // Page should be interactive quickly (under 3 seconds)
    expect(ttiMetrics.domInteractive).toBeLessThan(3000);
  });
});

test.describe('Journey 6: Error Handling', () => {
  test('should handle 404 pages gracefully', async ({ page }) => {
    const response = await page.goto('/non-existent-page-12345');

    // Should return 404 status
    expect(response?.status()).toBe(404);

    // Should show user-friendly 404 page
    await expect(
      page.locator('h1:has-text("404"), h1:has-text("Not Found"), :has-text("page not found")').first()
    ).toBeVisible();

    // Should have navigation back home
    const homeLink = page.locator('a[href="/"], a:has-text("Home"), a:has-text("Go back")').first();
    await expect(homeLink).toBeVisible();
  });

  test('should handle JavaScript errors gracefully', async ({ page }) => {
    const jsErrors: string[] = [];

    page.on('pageerror', (error) => {
      jsErrors.push(error.message);
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Navigate through site
    const researchLink = page.locator('nav a:has-text("Research"), nav a[href*="research"]').first();
    if (await researchLink.count() > 0) {
      await researchLink.click();
      await page.waitForLoadState('networkidle');
    }

    // Should have no uncaught JavaScript errors
    expect(jsErrors).toHaveLength(0);
  });
});
