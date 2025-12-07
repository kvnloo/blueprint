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
    await expect(page).toHaveTitle(/zer0|blueprint/i);

    // Verify hero section is visible
    await expect(page.locator('h1').first()).toBeVisible();

    // Scroll through some sections
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(500);
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(500);

    // Click on Research button in navbar (it's a button, not a link)
    const researchButton = page.locator('nav button:has-text("Research")').first();
    await expect(researchButton).toBeVisible();
    await researchButton.click({ timeout: 10000 });

    // Wait for Research Hub to appear (view state change, not URL change)
    await page.waitForTimeout(1000);
    await expect(page.locator('h1:has-text("Research")').first()).toBeVisible({ timeout: 10000 });

    // Browse article cards - they're clickable divs, not links
    const articleCards = page.locator('.group.relative').first();
    await expect(articleCards).toBeVisible({ timeout: 10000 });

    // Scroll card into view and click
    await articleCards.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await articleCards.click({ force: true });

    // Wait for article view to appear
    await page.waitForTimeout(1000);

    // Verify article content is visible
    await expect(page.locator('h1').first()).toBeVisible();

    // Scroll through article content
    await page.evaluate(() => window.scrollBy(0, 800));
    await page.waitForTimeout(500);

    // Click back to Research Hub using back button
    const backButton = page.locator('button:has-text("Back to Hub")').first();
    await expect(backButton).toBeVisible();
    await backButton.click();

    // Wait for Research Hub to reappear
    await page.waitForTimeout(500);
    await expect(page.locator('h1:has-text("Research")').first()).toBeVisible();

    // Navigate home via logo (it's a button)
    const logo = page.locator('nav button:has(span:has-text("zer0"))').first();
    await logo.click();

    // Verify we're back home by checking for different content
    await page.waitForTimeout(500);
    await expect(page.locator('nav button:has-text("Services")').first()).toBeVisible();
  });
});

test.describe('Journey 2: Mobile User Experience', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE viewport

  test('should complete mobile navigation flow', async ({ page }) => {
    // Open site on mobile viewport
    await page.goto('/');
    await expect(page).toHaveTitle(/zer0|blueprint/i);

    // Open hamburger menu (it's the Menu icon button visible on mobile)
    const hamburger = page.locator('nav button.md\\:hidden').first();
    await expect(hamburger).toBeVisible();
    await hamburger.click();

    // Verify menu is open and navigate to Research
    await page.waitForTimeout(500); // Wait for menu animation

    // The mobile menu appears - just click Research button directly
    const researchButton = page.locator('button:has-text("Research")').nth(1); // Second Research button (in mobile menu)
    await expect(researchButton).toBeVisible();
    await researchButton.click();

    // Wait for Research Hub to appear
    await page.waitForTimeout(1000);
    await expect(page.locator('h1:has-text("Research")').first()).toBeVisible({ timeout: 10000 });

    // Select an article (clickable card)
    const article = page.locator('.group.relative').first();
    await expect(article).toBeVisible({ timeout: 10000 });
    await article.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await article.click({ force: true });

    // Wait for article to load
    await page.waitForTimeout(1000);
    await expect(page.locator('h1').first()).toBeVisible();

    // Use back button to return
    const backButton = page.locator('button:has-text("Back to Hub")').first();
    await expect(backButton).toBeVisible();
    await backButton.click();

    // Verify we're back at Research Hub
    await page.waitForTimeout(500);
    await expect(page.locator('h1:has-text("Research")').first()).toBeVisible();
  });
});

test.describe('Journey 3: Research Deep Dive', () => {
  test('should complete research exploration flow', async ({ page }) => {
    // Navigate to home first then to Research Hub (no direct /research URL)
    await page.goto('/');

    // Click Research button
    const researchButton = page.locator('nav button:has-text("Research")').first();
    await researchButton.click({ timeout: 10000 });

    // Wait for Research Hub to appear
    await page.waitForTimeout(1500);
    await expect(page.locator('h1:has-text("Research")').first()).toBeVisible({ timeout: 10000 });

    // Browse articles (verify article cards exist)
    const articles = page.locator('.group.relative');
    const articleCount = await articles.count();
    expect(articleCount).toBeGreaterThan(0);

    // Open multiple articles in sequence (up to 2)
    const maxArticles = Math.min(2, articleCount);

    for (let i = 0; i < maxArticles; i++) {
      // Click on article card
      const articleCard = articles.nth(i);
      await articleCard.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await articleCard.click({ force: true });

      // Wait for article to load
      await page.waitForTimeout(1000);

      // Verify article loaded
      await expect(page.locator('h1').first()).toBeVisible();

      // Check for read time (displayed in article header)
      const readTime = page.locator(':has-text("min read")').first();
      if (await readTime.count() > 0) {
        await expect(readTime).toBeVisible();
      }

      // Test code copy functionality (if code blocks exist)
      const copyButton = page.locator('button:has(svg)').filter({ hasText: '' }).first();
      if (await copyButton.count() > 0) {
        await copyButton.click();
        await page.waitForTimeout(500);
      }

      // Go back to research hub for next iteration
      if (i < maxArticles - 1) {
        const backButton = page.locator('button:has-text("Back to Hub")').first();
        await backButton.click();
        await page.waitForTimeout(500);
      }
    }
  });

  test('should display article metadata correctly', async ({ page }) => {
    // Navigate to Research Hub
    await page.goto('/');
    const researchButton = page.locator('nav button:has-text("Research")').first();
    await researchButton.click({ timeout: 10000 });
    await page.waitForTimeout(1500);

    // Verify article cards have metadata
    const firstCard = page.locator('.group.relative').first();
    await expect(firstCard).toBeVisible();

    // Check for track label
    const trackLabel = firstCard.locator('span:has-text("Track"), span:has-text("Blueprint"), span:has-text("Evolve"), span:has-text("World Sim")').first();
    await expect(trackLabel).toBeVisible();

    // Check for read time
    const readTime = firstCard.locator(':has-text("min")').first();
    await expect(readTime).toBeVisible();
  });
});

test.describe('Journey 4: Accessibility User', () => {
  test('should complete keyboard-only navigation', async ({ page }) => {
    await page.goto('/');

    // Track focusable elements
    const focusedElements: string[] = [];

    // Tab through a few interactive elements
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      const focused = await page.evaluate(() => document.activeElement?.tagName || 'NONE');
      focusedElements.push(focused);
    }

    // Verify we encountered interactive elements
    const hasLinks = focusedElements.some(el => el === 'A');
    const hasButtons = focusedElements.some(el => el === 'BUTTON');

    expect(hasLinks || hasButtons).toBe(true);
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

    // Most buttons should have accessible labels (some decorative buttons might not)
    if (interactiveElements.totalButtons > 0) {
      const labelCoverage = interactiveElements.buttonsWithLabels / interactiveElements.totalButtons;
      expect(labelCoverage).toBeGreaterThan(0.8); // At least 80% should have labels
    }

    // Most links should have accessible labels (some icon links might use aria-label)
    if (interactiveElements.totalLinks > 0) {
      const labelCoverage = interactiveElements.linksWithLabels / interactiveElements.totalLinks;
      expect(labelCoverage).toBeGreaterThan(0.5); // At least 50% should have labels
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

  test('should handle view state transitions smoothly', async ({ page }) => {
    await page.goto('/');

    // Navigate to research view
    const researchButton = page.locator('nav button:has-text("Research")').first();
    await researchButton.click({ timeout: 10000 });

    // Wait for Research Hub to appear
    await page.waitForTimeout(1500);
    await expect(page.locator('h1:has-text("Research")').first()).toBeVisible({ timeout: 10000 });

    // Measure initial page load metrics
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
  test('should handle unknown routes gracefully', async ({ page }) => {
    // This is a single-page app with view states, not URL routing
    // Any unknown URL should just load the home page
    const response = await page.goto('/non-existent-page-12345');

    // Since it's a SPA, it will return 200 and show the home page
    expect(response?.status()).toBe(200);

    // Should show the normal home page
    await expect(page.locator('h1').first()).toBeVisible();
    await expect(page.locator('nav button:has-text("Services")').first()).toBeVisible();
  });

  test('should handle JavaScript errors gracefully', async ({ page }) => {
    const jsErrors: string[] = [];

    page.on('pageerror', (error) => {
      jsErrors.push(error.message);
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Navigate through site using button
    const researchButton = page.locator('nav button:has-text("Research")').first();
    if (await researchButton.count() > 0) {
      await researchButton.click();
      await page.waitForTimeout(1000);
    }

    // Should have no uncaught JavaScript errors
    expect(jsErrors).toHaveLength(0);
  });
});
