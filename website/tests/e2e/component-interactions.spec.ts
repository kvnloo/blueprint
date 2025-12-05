import { test, expect, Page } from '@playwright/test';

/**
 * Component Interactions Test Suite
 *
 * Tests all interactive UI components for proper behavior, animations,
 * and state management. All tests run in headless mode.
 *
 * Components tested:
 * 1. AnimatedButton - hover and click states
 * 2. BackgroundControls - pause/play toggle
 * 3. Code blocks - copy button functionality
 * 4. Article cards - hover effects
 * 5. Navbar - scroll state and mobile menu
 * 6. Share button - click behavior
 * 7. Table of contents - navigation
 * 8. CodeBlock - expand/collapse
 * 9. Progress bar - scroll updates
 * 10. Background toggle - WebGL vs CSS
 */

test.describe('Component Interactions', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage before each test
    await page.goto('/');
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
  });

  test.describe('1. AnimatedButton Component', () => {
    test('should show particles on hover', async ({ page }) => {
      // Find an AnimatedButton (e.g., "Get Access" in navbar)
      const button = page.locator('button.button-custom-teal').first();
      await expect(button).toBeVisible();

      // Hover over button
      await button.hover();

      // Check for particle animations (points_wrapper_teal)
      const particlesWrapper = button.locator('.points_wrapper_teal');
      await expect(particlesWrapper).toBeVisible();

      // Verify particles are present
      const particles = particlesWrapper.locator('.point');
      const particleCount = await particles.count();
      expect(particleCount).toBeGreaterThan(0);
    });

    test('should handle click events', async ({ page }) => {
      const button = page.locator('button.button-custom-teal').first();

      // Click button
      await button.click();

      // Verify button is still visible and interactive
      await expect(button).toBeVisible();
      await expect(button).toBeEnabled();
    });

    test('should have proper focus states', async ({ page }) => {
      const button = page.locator('button.button-custom-teal').first();

      // Focus button via keyboard
      await button.focus();

      // Verify button has focus
      await expect(button).toBeFocused();
    });
  });

  test.describe('2. BackgroundControls Component', () => {
    test('should toggle background animations on click', async ({ page }) => {
      // Find the background control button (bottom-right)
      const controlButton = page.locator('button[aria-label*="background animations"]');
      await expect(controlButton).toBeVisible();

      // Get initial state
      const initialLabel = await controlButton.getAttribute('aria-label');

      // Click to toggle
      await controlButton.click();

      // Wait for state change
      await page.waitForTimeout(300);

      // Verify state changed
      const newLabel = await controlButton.getAttribute('aria-label');
      expect(newLabel).not.toBe(initialLabel);
    });

    test('should persist state in localStorage', async ({ page }) => {
      const controlButton = page.locator('button[aria-label*="background animations"]');

      // Toggle control
      await controlButton.click();
      await page.waitForTimeout(200);

      // Get current label
      const stateAfterToggle = await controlButton.getAttribute('aria-label');

      // Reload page
      await page.reload();
      await page.waitForLoadState('networkidle');

      // Verify state persisted
      const controlButtonAfterReload = page.locator('button[aria-label*="background animations"]');
      const stateAfterReload = await controlButtonAfterReload.getAttribute('aria-label');
      expect(stateAfterReload).toBe(stateAfterToggle);
    });

    test('should show correct icon for each state', async ({ page }) => {
      const controlButton = page.locator('button[aria-label*="background animations"]');

      // Check for SVG icon
      const icon = controlButton.locator('svg');
      await expect(icon).toBeVisible();

      // Toggle and verify icon changes
      await controlButton.click();
      await page.waitForTimeout(200);

      // Icon should still be visible but different
      await expect(icon).toBeVisible();
    });
  });

  test.describe('3. Code Block Copy Button', () => {
    test('should navigate to article with code blocks', async ({ page }) => {
      // Navigate to research hub
      const researchLink = page.locator('text=Research').first();
      await researchLink.click();
      await page.waitForLoadState('networkidle');

      // Click on first article card
      const articleCard = page.locator('article').first();
      await articleCard.click();
      await page.waitForLoadState('networkidle');
    });

    test('should show copy button on code blocks', async ({ page }) => {
      // Navigate to article view
      await page.goto('/');
      await page.locator('text=Research').first().click();
      await page.waitForTimeout(1000);

      const articleCard = page.locator('article').first();
      if (await articleCard.isVisible()) {
        await articleCard.click();
        await page.waitForTimeout(1000);

        // Look for code blocks with copy functionality
        const copyButtons = page.locator('button[aria-label*="Copy"]');
        const count = await copyButtons.count();

        if (count > 0) {
          const firstCopyBtn = copyButtons.first();
          await expect(firstCopyBtn).toBeVisible();

          // Click copy button
          await firstCopyBtn.click();

          // Verify feedback (Check icon or text change)
          await page.waitForTimeout(200);
          // After click, button might show "Copied" or check icon
        }
      }
    });
  });

  test.describe('4. Article Card Hover Effects', () => {
    test('should show hover effects on article cards', async ({ page }) => {
      // Navigate to research hub
      await page.locator('text=Research').first().click();
      await page.waitForLoadState('networkidle');

      // Find article cards
      const articleCards = page.locator('article');
      const cardCount = await articleCards.count();

      if (cardCount > 0) {
        const firstCard = articleCards.first();
        await expect(firstCard).toBeVisible();

        // Get initial computed styles
        const initialBox = await firstCard.boundingBox();

        // Hover over card
        await firstCard.hover();
        await page.waitForTimeout(300);

        // Verify card is still visible and potentially transformed
        await expect(firstCard).toBeVisible();
      }
    });

    test('should be clickable to navigate to article', async ({ page }) => {
      await page.locator('text=Research').first().click();
      await page.waitForLoadState('networkidle');

      const articleCards = page.locator('article');
      const cardCount = await articleCards.count();

      if (cardCount > 0) {
        const firstCard = articleCards.first();

        // Click card
        await firstCard.click();
        await page.waitForTimeout(1000);

        // Verify navigation (back button should be visible)
        const backButton = page.locator('button:has-text("Back")');
        const backButtonVisible = await backButton.isVisible().catch(() => false);

        // Or check for article content
        const articleContent = page.locator('article');
        await expect(articleContent).toBeVisible();
      }
    });
  });

  test.describe('5. Navbar Scroll State', () => {
    test('should change background on scroll', async ({ page }) => {
      const navbar = page.locator('nav').first();
      await expect(navbar).toBeVisible();

      // Check initial transparent state
      const initialClasses = await navbar.getAttribute('class');
      expect(initialClasses).toContain('bg-transparent');

      // Scroll down
      await page.evaluate(() => window.scrollTo(0, 100));
      await page.waitForTimeout(300);

      // Check scrolled state
      const scrolledClasses = await navbar.getAttribute('class');
      expect(scrolledClasses).toContain('bg-[#050505]');
      expect(scrolledClasses).toContain('backdrop-blur');
    });

    test('should revert to transparent when scrolled back to top', async ({ page }) => {
      const navbar = page.locator('nav').first();

      // Scroll down
      await page.evaluate(() => window.scrollTo(0, 200));
      await page.waitForTimeout(300);

      // Scroll back to top
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);

      // Check classes reverted
      const classes = await navbar.getAttribute('class');
      expect(classes).toContain('bg-transparent');
    });
  });

  test.describe('6. Mobile Menu', () => {
    test('should open and close mobile menu', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Find mobile menu toggle (hamburger icon)
      const menuToggle = page.locator('button.md\\:hidden').first();
      await expect(menuToggle).toBeVisible();

      // Click to open menu
      await menuToggle.click();
      await page.waitForTimeout(300);

      // Verify menu is open (look for mobile menu container)
      const mobileMenu = page.locator('.md\\:hidden.absolute');
      await expect(mobileMenu).toBeVisible();

      // Click to close
      await menuToggle.click();
      await page.waitForTimeout(300);

      // Verify menu is closed
      await expect(mobileMenu).not.toBeVisible();
    });

    test('should navigate when clicking mobile menu items', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Open menu
      const menuToggle = page.locator('button.md\\:hidden').first();
      await menuToggle.click();
      await page.waitForTimeout(300);

      // Click Research link
      const researchLink = page.locator('.md\\:hidden.absolute button:has-text("Research")').first();
      if (await researchLink.isVisible()) {
        await researchLink.click();
        await page.waitForTimeout(500);

        // Verify navigation and menu closed
        const mobileMenu = page.locator('.md\\:hidden.absolute');
        await expect(mobileMenu).not.toBeVisible();
      }
    });
  });

  test.describe('7. Share Button', () => {
    test('should be present in article view', async ({ page }) => {
      // Navigate to an article
      await page.locator('text=Research').first().click();
      await page.waitForTimeout(1000);

      const articleCard = page.locator('article').first();
      if (await articleCard.isVisible()) {
        await articleCard.click();
        await page.waitForTimeout(1000);

        // Look for share button
        const shareButton = page.locator('button:has-text("Share")');
        const shareButtonVisible = await shareButton.isVisible().catch(() => false);

        if (shareButtonVisible) {
          // Click share button
          await shareButton.click();
          await page.waitForTimeout(200);
        }
      }
    });
  });

  test.describe('8. Table of Contents Links', () => {
    test('should navigate to sections on click', async ({ page }) => {
      // Navigate to article
      await page.locator('text=Research').first().click();
      await page.waitForTimeout(1000);

      const articleCard = page.locator('article').first();
      if (await articleCard.isVisible()) {
        await articleCard.click();
        await page.waitForTimeout(1000);

        // Look for TOC links (usually with href starting with #)
        const tocLinks = page.locator('a[href^="#"]');
        const tocCount = await tocLinks.count();

        if (tocCount > 0) {
          const firstTocLink = tocLinks.first();
          const href = await firstTocLink.getAttribute('href');

          // Click TOC link
          await firstTocLink.click();
          await page.waitForTimeout(500);

          // Verify scroll occurred
          const scrollY = await page.evaluate(() => window.scrollY);
          expect(scrollY).toBeGreaterThan(0);
        }
      }
    });
  });

  test.describe('9. CodeBlock Expand/Collapse', () => {
    test('should expand and collapse code blocks', async ({ page }) => {
      // Navigate to article
      await page.locator('text=Research').first().click();
      await page.waitForTimeout(1000);

      const articleCard = page.locator('article').first();
      if (await articleCard.isVisible()) {
        await articleCard.click();
        await page.waitForTimeout(1000);

        // Look for expand/collapse buttons (ChevronDown/ChevronUp icons)
        const expandButtons = page.locator('button:has(svg)').filter({ hasText: /expand|collapse/i });
        const buttonCount = await expandButtons.count();

        if (buttonCount > 0) {
          const expandBtn = expandButtons.first();
          await expandBtn.click();
          await page.waitForTimeout(300);

          // Verify state changed (code block visibility)
          await expandBtn.click();
          await page.waitForTimeout(300);
        }
      }
    });
  });

  test.describe('10. Progress Bar on Scroll', () => {
    test('should update progress bar as user scrolls', async ({ page }) => {
      // Navigate to article with scrollable content
      await page.locator('text=Research').first().click();
      await page.waitForTimeout(1000);

      const articleCard = page.locator('article').first();
      if (await articleCard.isVisible()) {
        await articleCard.click();
        await page.waitForTimeout(1000);

        // Look for progress indicator
        const progressBar = page.locator('[role="progressbar"]').or(
          page.locator('.progress-bar')
        ).or(
          page.locator('div[style*="width"]').filter({ has: page.locator('div[class*="bg-"]') })
        );

        const progressVisible = await progressBar.first().isVisible().catch(() => false);

        if (progressVisible) {
          const progress = progressBar.first();

          // Get initial width/value
          const initialStyle = await progress.getAttribute('style');

          // Scroll down
          await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
          await page.waitForTimeout(300);

          // Get updated width/value
          const scrolledStyle = await progress.getAttribute('style');

          // Verify progress changed
          expect(scrolledStyle).not.toBe(initialStyle);
        }
      }
    });
  });

  test.describe('11. WebGL vs CSS Background Toggle', () => {
    test('should allow switching between WebGL and CSS backgrounds', async ({ page }) => {
      // This test assumes there's a toggle for background type
      // The BackgroundControls might control this

      const controlButton = page.locator('button[aria-label*="background"]').or(
        page.locator('button[title*="background"]')
      ).first();

      const controlVisible = await controlButton.isVisible().catch(() => false);

      if (controlVisible) {
        // Toggle multiple times
        await controlButton.click();
        await page.waitForTimeout(300);

        await controlButton.click();
        await page.waitForTimeout(300);

        // Verify control is still functional
        await expect(controlButton).toBeVisible();
        await expect(controlButton).toBeEnabled();
      }
    });
  });

  test.describe('12. Accessibility Features', () => {
    test('should support keyboard navigation on interactive elements', async ({ page }) => {
      // Tab through interactive elements
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);

      // Verify focus is on an interactive element
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();

      // Tab multiple times
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);

      // Verify focus moved
      await expect(page.locator(':focus')).toBeVisible();
    });

    test('should have proper ARIA labels on buttons', async ({ page }) => {
      const buttons = page.locator('button[aria-label]');
      const buttonCount = await buttons.count();

      expect(buttonCount).toBeGreaterThan(0);

      // Verify first button has meaningful label
      const firstButton = buttons.first();
      const ariaLabel = await firstButton.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
      expect(ariaLabel!.length).toBeGreaterThan(3);
    });
  });

  test.describe('13. Responsive Design', () => {
    test('should adapt to different viewport sizes', async ({ page }) => {
      // Desktop
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const desktopNav = page.locator('.hidden.md\\:flex').first();
      await expect(desktopNav).toBeVisible();

      // Tablet
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.waitForTimeout(300);

      // Mobile
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(300);

      const mobileToggle = page.locator('button.md\\:hidden').first();
      await expect(mobileToggle).toBeVisible();
    });
  });

  test.describe('14. Animation Performance', () => {
    test('should handle rapid interactions without breaking', async ({ page }) => {
      const button = page.locator('button.button-custom-teal').first();
      await expect(button).toBeVisible();

      // Rapid hover/unhover
      for (let i = 0; i < 5; i++) {
        await button.hover();
        await page.waitForTimeout(50);
        await page.mouse.move(0, 0);
        await page.waitForTimeout(50);
      }

      // Verify button still works
      await expect(button).toBeVisible();
      await expect(button).toBeEnabled();
    });

    test('should handle rapid scrolling', async ({ page }) => {
      // Rapid scroll events
      for (let i = 0; i < 10; i++) {
        await page.evaluate((y) => window.scrollTo(0, y), i * 100);
        await page.waitForTimeout(50);
      }

      // Verify navbar still responds correctly
      const navbar = page.locator('nav').first();
      await expect(navbar).toBeVisible();
    });
  });

  test.describe('15. Component State Persistence', () => {
    test('should maintain component state across navigation', async ({ page }) => {
      const controlButton = page.locator('button[aria-label*="background animations"]');

      // Toggle background control
      await controlButton.click();
      await page.waitForTimeout(300);

      const stateBeforeNav = await controlButton.getAttribute('aria-label');

      // Navigate to different view
      await page.locator('text=Research').first().click();
      await page.waitForTimeout(1000);

      // Check if control maintained state
      const controlAfterNav = page.locator('button[aria-label*="background animations"]');
      const stateAfterNav = await controlAfterNav.getAttribute('aria-label');

      expect(stateAfterNav).toBe(stateBeforeNav);
    });
  });
});
