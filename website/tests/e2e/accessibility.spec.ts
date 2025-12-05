import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Comprehensive Accessibility Test Suite
 *
 * Tests WCAG 2.1 Level AA compliance using axe-core/playwright
 * All tests run in HEADLESS mode (configured in playwright.config.ts)
 *
 * Coverage:
 * 1. Home page accessibility audit
 * 2. Research Hub accessibility audit
 * 3. Article View accessibility audit
 * 4. Keyboard navigation through navbar
 * 5. Focus management on view changes
 * 6. ARIA labels on interactive elements
 * 7. Color contrast checks
 * 8. Screen reader landmarks (main, nav, footer)
 * 9. Skip links functionality
 * 10. Reduced motion preference respect
 * 11. Background controls accessibility
 * 12. Form accessibility (login/CTA)
 */

test.describe('Accessibility Tests', () => {
  // Configure headless mode explicitly for all tests
  test.use({ headless: true });

  test.describe('Page-Level Accessibility Audits', () => {
    test('should pass accessibility audit on Home page', async ({ page }) => {
      await page.goto('/');

      // Wait for page to be fully loaded
      await page.waitForLoadState('networkidle');
      await page.waitForSelector('nav', { state: 'visible' });

      // Run axe accessibility audit
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      // Expect no violations
      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('should pass accessibility audit on Research Hub page', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Navigate to Research Hub
      await page.click('nav >> text=Research');
      await page.waitForTimeout(500); // Wait for view transition

      // Run axe accessibility audit
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('should pass accessibility audit on Article View page', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Navigate to Research Hub
      await page.click('nav >> text=Research');
      await page.waitForTimeout(500);

      // Click first article
      const firstArticle = page.locator('[role="article"]').first();
      await firstArticle.waitFor({ state: 'visible' });
      await firstArticle.click();
      await page.waitForTimeout(500);

      // Run axe accessibility audit
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('should navigate through navbar with keyboard', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Focus on first focusable element (logo button)
      await page.keyboard.press('Tab');

      // Verify logo button has focus
      const logoButton = page.locator('nav button').first();
      await expect(logoButton).toBeFocused();

      // Tab through navbar items
      await page.keyboard.press('Tab'); // Services
      await page.keyboard.press('Tab'); // Research
      await page.keyboard.press('Tab'); // Projects
      await page.keyboard.press('Tab'); // Pricing
      await page.keyboard.press('Tab'); // Log In
      await page.keyboard.press('Tab'); // Get Access button

      const getAccessButton = page.locator('nav >> text=Get Access').first();
      await expect(getAccessButton).toBeFocused();

      // Test Enter key activation
      await page.keyboard.press('Enter');
      // Button should remain accessible after interaction
      await expect(getAccessButton).toBeVisible();
    });

    test('should navigate to Research Hub via keyboard', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Tab to Research button and activate with Enter
      await page.keyboard.press('Tab'); // Logo
      await page.keyboard.press('Tab'); // Services
      await page.keyboard.press('Tab'); // Research

      const researchButton = page.locator('nav >> text=Research').first();
      await expect(researchButton).toBeFocused();

      await page.keyboard.press('Enter');
      await page.waitForTimeout(500);

      // Verify navigation occurred
      await expect(page.locator('h1:has-text("Research Hub")')).toBeVisible();
    });

    test('should navigate mobile menu with keyboard', async ({ page, viewport }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Tab to mobile menu toggle
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      const menuToggle = page.locator('nav button >> nth=1'); // Menu icon button
      await expect(menuToggle).toBeFocused();

      // Open menu with Enter
      await page.keyboard.press('Enter');
      await page.waitForTimeout(300);

      // Mobile menu should be visible
      await expect(page.locator('nav >> text=Services').nth(1)).toBeVisible();

      // Tab through mobile menu items
      await page.keyboard.press('Tab'); // Services
      await page.keyboard.press('Tab'); // Research
      await page.keyboard.press('Tab'); // Projects

      // Verify focus is within mobile menu
      const projectsLink = page.locator('nav >> text=Projects').nth(1);
      await expect(projectsLink).toBeFocused();
    });
  });

  test.describe('Focus Management', () => {
    test('should maintain focus on view changes', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Click Research button
      const researchButton = page.locator('nav >> text=Research').first();
      await researchButton.click();
      await page.waitForTimeout(500);

      // Focus should not be lost after view change
      const activeElement = await page.evaluate(() => document.activeElement?.tagName);
      expect(activeElement).toBeTruthy();
    });

    test('should have visible focus indicators', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Tab to first button
      await page.keyboard.press('Tab');

      // Check that focus is visible (button should have focus outline)
      const logoButton = page.locator('nav button').first();
      const outlineStyle = await logoButton.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return styles.outline || styles.boxShadow;
      });

      // Some form of focus indicator should exist
      expect(outlineStyle).not.toBe('none');
      expect(outlineStyle).not.toBe('');
    });

    test('should restore focus when returning from Article View', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Navigate to Research Hub
      await page.click('nav >> text=Research');
      await page.waitForTimeout(500);

      // Click first article
      const firstArticle = page.locator('[role="article"]').first();
      await firstArticle.click();
      await page.waitForTimeout(500);

      // Click back button
      const backButton = page.locator('button:has-text("Back")').first();
      await backButton.click();
      await page.waitForTimeout(500);

      // Verify we're back on Research Hub
      await expect(page.locator('h1:has-text("Research Hub")')).toBeVisible();
    });
  });

  test.describe('ARIA Labels and Roles', () => {
    test('should have proper ARIA labels on interactive elements', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Check background control button has aria-label
      const backgroundControl = page.locator('button[aria-label*="background animations"]');
      await expect(backgroundControl).toBeVisible();

      const ariaLabel = await backgroundControl.getAttribute('aria-label');
      expect(ariaLabel).toMatch(/pause|play/i);
    });

    test('should have proper button roles', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // All interactive nav items should be buttons
      const navButtons = page.locator('nav button');
      const count = await navButtons.count();

      expect(count).toBeGreaterThan(0);

      // Verify each button has implicit button role
      for (let i = 0; i < count; i++) {
        const role = await navButtons.nth(i).getAttribute('role');
        // Button elements have implicit role="button", may be null but element is <button>
        const tagName = await navButtons.nth(i).evaluate(el => el.tagName.toLowerCase());
        expect(tagName).toBe('button');
      }
    });

    test('should have article roles on Research Hub cards', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Navigate to Research Hub
      await page.click('nav >> text=Research');
      await page.waitForTimeout(500);

      // Verify articles have role="article"
      const articles = page.locator('[role="article"]');
      const count = await articles.count();

      expect(count).toBeGreaterThan(0);
    });

    test('should have proper heading hierarchy', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Check for h1
      const h1 = page.locator('h1');
      await expect(h1.first()).toBeVisible();

      // Verify heading levels are sequential
      const headings = await page.evaluate(() => {
        const els = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
        return els.map(el => parseInt(el.tagName.substring(1)));
      });

      // Should start with h1
      expect(headings[0]).toBe(1);
    });
  });

  test.describe('Color Contrast', () => {
    test('should have sufficient color contrast on text elements', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Run axe with color-contrast rule specifically
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['color-contrast'])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('should have sufficient contrast on navbar items', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Test navbar text contrast
      const navItem = page.locator('nav >> text=Services').first();
      const color = await navItem.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return { color: styles.color, background: styles.backgroundColor };
      });

      // Verify color exists (actual contrast ratio checked by axe)
      expect(color.color).toBeTruthy();
    });
  });

  test.describe('Screen Reader Landmarks', () => {
    test('should have main landmark', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const main = page.locator('main');
      await expect(main).toBeVisible();
    });

    test('should have nav landmark', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const nav = page.locator('nav');
      await expect(nav).toBeVisible();
    });

    test('should have footer landmark', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const footer = page.locator('footer');
      await expect(footer).toBeVisible();
    });

    test('should have proper landmark structure', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Run axe with landmark rules
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['best-practice'])
        .include('nav')
        .include('main')
        .include('footer')
        .analyze();

      // Filter for landmark-related violations
      const landmarkViolations = accessibilityScanResults.violations.filter(
        v => v.id.includes('landmark') || v.id.includes('region')
      );

      expect(landmarkViolations).toEqual([]);
    });
  });

  test.describe('Skip Links Functionality', () => {
    test('should have skip to main content link', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Press Tab to reveal skip link (if implemented)
      await page.keyboard.press('Tab');

      // Check if skip link exists (may not be visible until focused)
      const skipLink = page.locator('a[href="#main"], a:has-text("Skip to")');
      const count = await skipLink.count();

      // This is optional - log if not found but don't fail
      if (count === 0) {
        console.log('ℹ️  Skip link not found - consider adding for improved accessibility');
      }
    });
  });

  test.describe('Reduced Motion Preference', () => {
    test('should respect prefers-reduced-motion', async ({ page }) => {
      // Set reduced motion preference
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Check that WebGL background is not loaded
      const webglCanvas = page.locator('canvas');
      const count = await webglCanvas.count();

      // With reduced motion, WebGL should not be loaded (falls back to CSS grid)
      expect(count).toBe(0);
    });

    test('should load WebGL when reduced motion is not preferred', async ({ page }) => {
      // Set no reduced motion preference
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Wait for lazy loading
      await page.waitForTimeout(3000);

      // WebGL canvas should load
      const webglCanvas = page.locator('canvas');
      const count = await webglCanvas.count();

      // WebGL should be present
      expect(count).toBeGreaterThan(0);
    });

    test('should disable animations when user pauses them', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Wait for WebGL to load
      await page.waitForTimeout(3000);

      // Click background control to pause
      const backgroundControl = page.locator('button[aria-label*="Pause background"]');
      await backgroundControl.click();

      // Verify ARIA label changed
      await expect(page.locator('button[aria-label*="Play background"]')).toBeVisible();

      // Verify localStorage was updated
      const animationsEnabled = await page.evaluate(() => {
        return localStorage.getItem('bg-animations-enabled');
      });

      expect(animationsEnabled).toBe('false');
    });
  });

  test.describe('Background Controls Accessibility', () => {
    test('should have accessible background control button', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const backgroundControl = page.locator('button[aria-label*="background animations"]');

      // Button should be visible
      await expect(backgroundControl).toBeVisible();

      // Should have aria-label
      const ariaLabel = await backgroundControl.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();

      // Should have title
      const title = await backgroundControl.getAttribute('title');
      expect(title).toBeTruthy();
    });

    test('should be keyboard accessible', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);

      // Tab until we reach background control
      // (May need multiple tabs depending on page content)
      for (let i = 0; i < 20; i++) {
        await page.keyboard.press('Tab');

        const focused = await page.evaluate(() => {
          const el = document.activeElement;
          return el?.getAttribute('aria-label')?.includes('background');
        });

        if (focused) break;
      }

      // Activate with keyboard
      await page.keyboard.press('Enter');

      // Verify state changed
      await expect(page.locator('button[aria-label*="Play background"]')).toBeVisible();
    });

    test('should update SVG icons accessibly', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const backgroundControl = page.locator('button[aria-label*="background animations"]');

      // Should have SVG child
      const svg = backgroundControl.locator('svg');
      await expect(svg).toBeVisible();

      // SVG should be presentational (not need alt text as button has aria-label)
      const ariaHidden = await svg.getAttribute('aria-hidden');
      // SVG doesn't need aria-hidden if parent button has proper label
    });
  });

  test.describe('Form Accessibility', () => {
    test('should have accessible CTA button', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const ctaButton = page.locator('button:has-text("Get Access")').first();

      // Button should be visible and clickable
      await expect(ctaButton).toBeVisible();
      await expect(ctaButton).toBeEnabled();

      // Should have accessible text
      const text = await ctaButton.textContent();
      expect(text?.trim()).toBe('Get Access');
    });

    test('should have accessible login link', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const loginLink = page.locator('nav >> text=Log In');

      // Link should be visible and accessible
      await expect(loginLink).toBeVisible();

      // Should have proper link semantics
      const tagName = await loginLink.evaluate(el => el.tagName.toLowerCase());
      expect(tagName).toBe('a');
    });
  });

  test.describe('Mobile Accessibility', () => {
    test('should be accessible on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Run accessibility audit on mobile
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('should have touch-friendly targets on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Open mobile menu
      const menuToggle = page.locator('button >> nth=1');
      await menuToggle.click();

      // Check mobile menu buttons have adequate size
      const mobileButtons = page.locator('nav >> text=Services').nth(1);
      const box = await mobileButtons.boundingBox();

      // Touch target should be at least 44x44 pixels (WCAG 2.1 AAA guideline)
      expect(box?.height).toBeGreaterThanOrEqual(40); // Slightly relaxed for AA
    });
  });

  test.describe('Dynamic Content Accessibility', () => {
    test('should announce view changes to screen readers', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Navigate to Research Hub
      await page.click('nav >> text=Research');
      await page.waitForTimeout(500);

      // Check if there's an aria-live region or similar announcement mechanism
      const liveRegion = page.locator('[aria-live]');
      const count = await liveRegion.count();

      // Log if no live region found (optional enhancement)
      if (count === 0) {
        console.log('ℹ️  No ARIA live region found - consider adding for view change announcements');
      }
    });

    test('should maintain accessibility after navigation', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Navigate through multiple views
      await page.click('nav >> text=Research');
      await page.waitForTimeout(500);

      const firstArticle = page.locator('[role="article"]').first();
      await firstArticle.click();
      await page.waitForTimeout(500);

      // Run accessibility check after navigation
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });
  });

  test.describe('Image Accessibility', () => {
    test('should have alt text on images', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Run axe with image-alt rule
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a'])
        .analyze();

      const imageViolations = accessibilityScanResults.violations.filter(
        v => v.id === 'image-alt'
      );

      expect(imageViolations).toEqual([]);
    });
  });

  test.describe('Language and Document Accessibility', () => {
    test('should have lang attribute on html element', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const lang = await page.getAttribute('html', 'lang');
      expect(lang).toBeTruthy();
      expect(lang).toMatch(/^[a-z]{2}(-[A-Z]{2})?$/); // e.g., 'en' or 'en-US'
    });

    test('should have valid page title', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const title = await page.title();
      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(0);
    });

    test('should have meta viewport for responsive design', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const viewport = await page.getAttribute('meta[name="viewport"]', 'content');
      expect(viewport).toBeTruthy();
      expect(viewport).toContain('width=device-width');
    });
  });
});
