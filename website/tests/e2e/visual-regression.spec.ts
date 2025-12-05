import { test, expect } from '@playwright/test';

/**
 * Visual Regression Test Suite
 *
 * Tests visual consistency across the website by capturing and comparing screenshots.
 * Run with: npx playwright test visual-regression
 * Update snapshots: npx playwright test visual-regression --update-snapshots
 */

// Configuration
const SCREENSHOT_DIR = 'tests/screenshots';
const BASE_URL = process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:3000';

// Viewport sizes for responsive testing
const VIEWPORTS = {
  desktop: { width: 1920, height: 1080 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 375, height: 667 },
};

// Configure test behavior
test.describe.configure({ mode: 'parallel' });

test.beforeEach(async ({ page }) => {
  // Disable animations for consistent screenshots
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
      }
    `,
  });
});

test.describe('Visual Regression Tests', () => {
  test.describe('Full Page Screenshots', () => {
    test('Home page - desktop', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await page.goto(BASE_URL);

      // Wait for content to load
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500); // Brief delay for any lazy-loaded content

      // Hide dynamic elements (dates, times, etc.)
      await page.evaluate(() => {
        // Hide elements with timestamps or dates
        document.querySelectorAll('[data-dynamic="true"], .timestamp, .last-updated').forEach(el => {
          (el as HTMLElement).style.visibility = 'hidden';
        });
      });

      await expect(page).toHaveScreenshot('home-page-desktop.png', {
        fullPage: true,
        threshold: 0.2, // 20% threshold for minor differences
        maxDiffPixels: 100,
      });
    });

    test('Home page - tablet', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.tablet);
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);

      await expect(page).toHaveScreenshot('home-page-tablet.png', {
        fullPage: true,
        threshold: 0.2,
        maxDiffPixels: 100,
      });
    });

    test('Home page - mobile', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.mobile);
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);

      await expect(page).toHaveScreenshot('home-page-mobile.png', {
        fullPage: true,
        threshold: 0.2,
        maxDiffPixels: 100,
      });
    });

    test('Research Hub - desktop', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await page.goto(`${BASE_URL}/research`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);

      // Hide dynamic content
      await page.evaluate(() => {
        document.querySelectorAll('[data-dynamic="true"], .timestamp, .last-updated, .view-count').forEach(el => {
          (el as HTMLElement).style.visibility = 'hidden';
        });
      });

      await expect(page).toHaveScreenshot('research-hub-desktop.png', {
        fullPage: true,
        threshold: 0.2,
        maxDiffPixels: 100,
      });
    });

    test('Research Hub - mobile', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.mobile);
      await page.goto(`${BASE_URL}/research`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);

      await expect(page).toHaveScreenshot('research-hub-mobile.png', {
        fullPage: true,
        threshold: 0.2,
        maxDiffPixels: 100,
      });
    });
  });

  test.describe('Component Screenshots', () => {
    test('Navbar - desktop', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');

      const navbar = page.locator('nav, header').first();
      await expect(navbar).toBeVisible();

      await expect(navbar).toHaveScreenshot('navbar-desktop.png', {
        threshold: 0.2,
        maxDiffPixels: 50,
      });
    });

    test('Navbar - mobile', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.mobile);
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');

      const navbar = page.locator('nav, header').first();
      await expect(navbar).toBeVisible();

      await expect(navbar).toHaveScreenshot('navbar-mobile.png', {
        threshold: 0.2,
        maxDiffPixels: 50,
      });
    });

    test('Hero section', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');

      // Target hero section by common selectors
      const hero = page.locator('.hero, [class*="hero"], section').first();
      await expect(hero).toBeVisible();

      await expect(hero).toHaveScreenshot('hero-section.png', {
        threshold: 0.2,
        maxDiffPixels: 100,
      });
    });

    test('Article card', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await page.goto(`${BASE_URL}/research`);
      await page.waitForLoadState('networkidle');

      // Find first article card
      const articleCard = page.locator('article, .article-card, [class*="card"]').first();
      await expect(articleCard).toBeVisible();

      // Hide dynamic elements within card
      await page.evaluate(() => {
        document.querySelectorAll('.timestamp, .view-count, .read-time').forEach(el => {
          (el as HTMLElement).style.visibility = 'hidden';
        });
      });

      await expect(articleCard).toHaveScreenshot('article-card.png', {
        threshold: 0.2,
        maxDiffPixels: 50,
      });
    });

    test('Footer', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');

      const footer = page.locator('footer').first();
      await expect(footer).toBeVisible();

      // Hide dynamic copyright year
      await page.evaluate(() => {
        document.querySelectorAll('footer .year, footer [class*="year"]').forEach(el => {
          (el as HTMLElement).textContent = '2024';
        });
      });

      await expect(footer).toHaveScreenshot('footer.png', {
        threshold: 0.2,
        maxDiffPixels: 50,
      });
    });

    test('Code block', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await page.goto(`${BASE_URL}/research`);
      await page.waitForLoadState('networkidle');

      // Navigate to first article if available
      const firstArticleLink = page.locator('a[href*="/research/"]').first();
      if (await firstArticleLink.isVisible()) {
        await firstArticleLink.click();
        await page.waitForLoadState('networkidle');

        // Find code block
        const codeBlock = page.locator('pre, code, .code-block, [class*="code"]').first();
        if (await codeBlock.isVisible()) {
          await expect(codeBlock).toHaveScreenshot('code-block.png', {
            threshold: 0.2,
            maxDiffPixels: 50,
          });
        }
      }
    });
  });

  test.describe('Article Page Screenshots', () => {
    test('Article page header', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await page.goto(`${BASE_URL}/research`);
      await page.waitForLoadState('networkidle');

      // Navigate to first article
      const firstArticleLink = page.locator('a[href*="/research/"]').first();
      if (await firstArticleLink.isVisible()) {
        await firstArticleLink.click();
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(500);

        // Hide dynamic metadata
        await page.evaluate(() => {
          document.querySelectorAll('.timestamp, .published-date, .last-updated, .read-time').forEach(el => {
            (el as HTMLElement).style.visibility = 'hidden';
          });
        });

        // Capture header section
        const header = page.locator('article header, .article-header, [class*="header"]').first();
        if (await header.isVisible()) {
          await expect(header).toHaveScreenshot('article-header.png', {
            threshold: 0.2,
            maxDiffPixels: 100,
          });
        }
      }
    });
  });

  test.describe('Responsive Design Screenshots', () => {
    const pages = [
      { name: 'home', url: BASE_URL },
      { name: 'research', url: `${BASE_URL}/research` },
    ];

    for (const { name, url } of pages) {
      test(`${name} - desktop viewport`, async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.desktop);
        await page.goto(url);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(500);

        await expect(page).toHaveScreenshot(`${name}-1920x1080.png`, {
          fullPage: true,
          threshold: 0.2,
          maxDiffPixels: 100,
        });
      });

      test(`${name} - tablet viewport`, async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.tablet);
        await page.goto(url);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(500);

        await expect(page).toHaveScreenshot(`${name}-768x1024.png`, {
          fullPage: true,
          threshold: 0.2,
          maxDiffPixels: 100,
        });
      });

      test(`${name} - mobile viewport`, async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.mobile);
        await page.goto(url);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(500);

        await expect(page).toHaveScreenshot(`${name}-375x667.png`, {
          fullPage: true,
          threshold: 0.2,
          maxDiffPixels: 100,
        });
      });
    }
  });

  test.describe('Dark Mode Screenshots', () => {
    test('Home page - dark mode', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);

      // Enable dark mode via system preference
      await page.emulateMedia({ colorScheme: 'dark' });

      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);

      await expect(page).toHaveScreenshot('home-page-dark-mode.png', {
        fullPage: true,
        threshold: 0.2,
        maxDiffPixels: 100,
      });
    });

    test('Research Hub - dark mode', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await page.emulateMedia({ colorScheme: 'dark' });

      await page.goto(`${BASE_URL}/research`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);

      await expect(page).toHaveScreenshot('research-hub-dark-mode.png', {
        fullPage: true,
        threshold: 0.2,
        maxDiffPixels: 100,
      });
    });
  });
});

/**
 * Configuration Notes:
 *
 * 1. Screenshot Directory:
 *    - Snapshots stored in: tests/e2e/visual-regression.spec.ts-snapshots/
 *    - Configurable via playwright.config.ts
 *
 * 2. Threshold:
 *    - 0.2 (20%) allows for minor anti-aliasing differences
 *    - Adjust per test if needed
 *
 * 3. Update Snapshots:
 *    - First run: npx playwright test visual-regression --update-snapshots
 *    - This creates baseline screenshots
 *
 * 4. Ignored Dynamic Content:
 *    - Timestamps, dates, view counts hidden via CSS visibility
 *    - Animations disabled globally
 *    - Copyright years normalized
 *
 * 5. Headless Mode:
 *    - Tests run in headless mode by default
 *    - Configure in playwright.config.ts: headless: true
 *
 * 6. CI/CD Integration:
 *    - Store snapshots in version control
 *    - Use --update-snapshots flag carefully
 *    - Consider platform-specific snapshots (Linux/Mac/Windows)
 */
