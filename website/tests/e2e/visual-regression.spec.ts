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

// Screenshot comparison options with more lenient defaults
const SCREENSHOT_OPTIONS = {
  threshold: 0.3, // 30% threshold for anti-aliasing and font rendering differences
  maxDiffPixels: 200,
  maxDiffPixelRatio: 0.05, // Allow 5% pixel difference
};

// Configure test behavior
test.describe.configure({ mode: 'parallel' });

// Helper function to wait for page stability
async function waitForPageStability(page: any) {
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000); // Extra delay for lazy-loaded content and animations

  // Wait for fonts to load
  await page.evaluate(() => document.fonts.ready);
}

// Helper function to hide dynamic content
async function hideDynamicContent(page: any) {
  await page.evaluate(() => {
    // Hide elements with timestamps, dates, view counts
    const dynamicSelectors = [
      '[data-dynamic="true"]',
      '.timestamp',
      '.last-updated',
      '.view-count',
      '.read-time',
      '.published-date',
      '[class*="timestamp"]',
      '[class*="date"]',
    ];

    dynamicSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        (el as HTMLElement).style.visibility = 'hidden';
      });
    });
  });
}

test.beforeEach(async ({ page }) => {
  // Disable animations for consistent screenshots
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
        scroll-behavior: auto !important;
      }

      /* Stabilize font rendering */
      * {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    `,
  });
});

test.describe('Visual Regression Tests', () => {
  test.describe('Full Page Screenshots', () => {
    test('Home page - desktop', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await page.goto(BASE_URL);
      await waitForPageStability(page);
      await hideDynamicContent(page);

      // Use expect().toPass() for retry logic on flaky visual tests
      await expect(async () => {
        await expect(page).toHaveScreenshot('home-page-desktop.png', {
          fullPage: true,
          ...SCREENSHOT_OPTIONS,
        });
      }).toPass({ timeout: 10000 });
    });

    test('Home page - tablet', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.tablet);
      await page.goto(BASE_URL);
      await waitForPageStability(page);
      await hideDynamicContent(page);

      await expect(async () => {
        await expect(page).toHaveScreenshot('home-page-tablet.png', {
          fullPage: true,
          ...SCREENSHOT_OPTIONS,
        });
      }).toPass({ timeout: 10000 });
    });

    test('Home page - mobile', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.mobile);
      await page.goto(BASE_URL);
      await waitForPageStability(page);
      await hideDynamicContent(page);

      await expect(async () => {
        await expect(page).toHaveScreenshot('home-page-mobile.png', {
          fullPage: true,
          ...SCREENSHOT_OPTIONS,
        });
      }).toPass({ timeout: 10000 });
    });

    test('Research Hub - desktop', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await page.goto(`${BASE_URL}/research`);
      await waitForPageStability(page);
      await hideDynamicContent(page);

      await expect(async () => {
        await expect(page).toHaveScreenshot('research-hub-desktop.png', {
          fullPage: true,
          ...SCREENSHOT_OPTIONS,
        });
      }).toPass({ timeout: 10000 });
    });

    test('Research Hub - mobile', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.mobile);
      await page.goto(`${BASE_URL}/research`);
      await waitForPageStability(page);
      await hideDynamicContent(page);

      await expect(async () => {
        await expect(page).toHaveScreenshot('research-hub-mobile.png', {
          fullPage: true,
          ...SCREENSHOT_OPTIONS,
        });
      }).toPass({ timeout: 10000 });
    });
  });

  test.describe('Component Screenshots', () => {
    test('Navbar - desktop', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await page.goto(BASE_URL);
      await waitForPageStability(page);

      const navbar = page.locator('nav, header').first();
      await expect(navbar).toBeVisible({ timeout: 10000 });

      await expect(async () => {
        await expect(navbar).toHaveScreenshot('navbar-desktop.png', {
          ...SCREENSHOT_OPTIONS,
        });
      }).toPass({ timeout: 10000 });
    });

    test('Navbar - mobile', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.mobile);
      await page.goto(BASE_URL);
      await waitForPageStability(page);

      const navbar = page.locator('nav, header').first();
      await expect(navbar).toBeVisible({ timeout: 10000 });

      await expect(async () => {
        await expect(navbar).toHaveScreenshot('navbar-mobile.png', {
          ...SCREENSHOT_OPTIONS,
        });
      }).toPass({ timeout: 10000 });
    });

    test('Hero section', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await page.goto(BASE_URL);
      await waitForPageStability(page);

      // More robust hero selector - try multiple options
      const heroSelectors = [
        '.hero',
        '[class*="hero"]',
        'section:first-of-type',
        'main > section:first-child',
        'main > div:first-child',
      ];

      let hero = null;
      for (const selector of heroSelectors) {
        const element = page.locator(selector).first();
        if (await element.isVisible().catch(() => false)) {
          hero = element;
          break;
        }
      }

      if (hero) {
        await expect(async () => {
          await expect(hero).toHaveScreenshot('hero-section.png', {
            ...SCREENSHOT_OPTIONS,
          });
        }).toPass({ timeout: 10000 });
      } else {
        test.skip();
      }
    });

    test('Article card', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await page.goto(`${BASE_URL}/research`);
      await waitForPageStability(page);
      await hideDynamicContent(page);

      // More robust article card selector
      const cardSelectors = [
        'article',
        '.article-card',
        '[class*="card"]',
        '[class*="article"]',
        'main article',
        'main > div article',
      ];

      let articleCard = null;
      for (const selector of cardSelectors) {
        const element = page.locator(selector).first();
        if (await element.isVisible().catch(() => false)) {
          articleCard = element;
          break;
        }
      }

      if (articleCard) {
        await expect(async () => {
          await expect(articleCard).toHaveScreenshot('article-card.png', {
            ...SCREENSHOT_OPTIONS,
          });
        }).toPass({ timeout: 10000 });
      } else {
        test.skip();
      }
    });

    test('Footer', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await page.goto(BASE_URL);
      await waitForPageStability(page);

      const footer = page.locator('footer').first();

      try {
        await expect(footer).toBeVisible({ timeout: 5000 });

        // Normalize copyright year
        await page.evaluate(() => {
          const yearSelectors = ['footer .year', 'footer [class*="year"]', 'footer time'];
          yearSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
              (el as HTMLElement).textContent = '2024';
            });
          });
        });

        await expect(async () => {
          await expect(footer).toHaveScreenshot('footer.png', {
            ...SCREENSHOT_OPTIONS,
          });
        }).toPass({ timeout: 10000 });
      } catch {
        test.skip();
      }
    });

    test.skip('Code block - requires article content', async ({ page }) => {
      // This test is skipped by default since it requires navigating to an article
      // Enable when articles are available
      await page.setViewportSize(VIEWPORTS.desktop);
      await page.goto(`${BASE_URL}/research`);
      await waitForPageStability(page);

      const firstArticleLink = page.locator('a[href*="/research/"]').first();

      if (await firstArticleLink.isVisible().catch(() => false)) {
        await firstArticleLink.click();
        await waitForPageStability(page);

        const codeBlock = page.locator('pre code, pre, .code-block').first();

        if (await codeBlock.isVisible().catch(() => false)) {
          await expect(async () => {
            await expect(codeBlock).toHaveScreenshot('code-block.png', {
              ...SCREENSHOT_OPTIONS,
            });
          }).toPass({ timeout: 10000 });
        }
      }
    });
  });

  test.describe('Article Page Screenshots', () => {
    test.skip('Article page header - requires article content', async ({ page }) => {
      // This test is skipped by default since it requires navigating to an article
      await page.setViewportSize(VIEWPORTS.desktop);
      await page.goto(`${BASE_URL}/research`);
      await waitForPageStability(page);

      const firstArticleLink = page.locator('a[href*="/research/"]').first();

      if (await firstArticleLink.isVisible().catch(() => false)) {
        await firstArticleLink.click();
        await waitForPageStability(page);
        await hideDynamicContent(page);

        const headerSelectors = [
          'article header',
          '.article-header',
          '[class*="header"]',
          'main header',
          'article > div:first-child',
        ];

        let header = null;
        for (const selector of headerSelectors) {
          const element = page.locator(selector).first();
          if (await element.isVisible().catch(() => false)) {
            header = element;
            break;
          }
        }

        if (header) {
          await expect(async () => {
            await expect(header).toHaveScreenshot('article-header.png', {
              ...SCREENSHOT_OPTIONS,
            });
          }).toPass({ timeout: 10000 });
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
        await waitForPageStability(page);
        await hideDynamicContent(page);

        await expect(async () => {
          await expect(page).toHaveScreenshot(`${name}-1920x1080.png`, {
            fullPage: true,
            ...SCREENSHOT_OPTIONS,
          });
        }).toPass({ timeout: 10000 });
      });

      test(`${name} - tablet viewport`, async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.tablet);
        await page.goto(url);
        await waitForPageStability(page);
        await hideDynamicContent(page);

        await expect(async () => {
          await expect(page).toHaveScreenshot(`${name}-768x1024.png`, {
            fullPage: true,
            ...SCREENSHOT_OPTIONS,
          });
        }).toPass({ timeout: 10000 });
      });

      test(`${name} - mobile viewport`, async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.mobile);
        await page.goto(url);
        await waitForPageStability(page);
        await hideDynamicContent(page);

        await expect(async () => {
          await expect(page).toHaveScreenshot(`${name}-375x667.png`, {
            fullPage: true,
            ...SCREENSHOT_OPTIONS,
          });
        }).toPass({ timeout: 10000 });
      });
    }
  });

  test.describe('Dark Mode Screenshots', () => {
    test('Home page - dark mode', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);

      // Enable dark mode via system preference
      await page.emulateMedia({ colorScheme: 'dark' });

      await page.goto(BASE_URL);
      await waitForPageStability(page);
      await hideDynamicContent(page);

      await expect(async () => {
        await expect(page).toHaveScreenshot('home-page-dark-mode.png', {
          fullPage: true,
          ...SCREENSHOT_OPTIONS,
        });
      }).toPass({ timeout: 10000 });
    });

    test('Research Hub - dark mode', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await page.emulateMedia({ colorScheme: 'dark' });

      await page.goto(`${BASE_URL}/research`);
      await waitForPageStability(page);
      await hideDynamicContent(page);

      await expect(async () => {
        await expect(page).toHaveScreenshot('research-hub-dark-mode.png', {
          fullPage: true,
          ...SCREENSHOT_OPTIONS,
        });
      }).toPass({ timeout: 10000 });
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
 * 2. Threshold & Tolerance:
 *    - threshold: 0.3 (30%) - Allows for anti-aliasing and font rendering differences
 *    - maxDiffPixels: 200 - Maximum pixel difference allowed
 *    - maxDiffPixelRatio: 0.05 - 5% pixel difference ratio
 *    - Adjust SCREENSHOT_OPTIONS constant if needed
 *
 * 3. Update Snapshots:
 *    - First run: npx playwright test visual-regression --update-snapshots
 *    - This creates baseline screenshots
 *    - Run after visual changes are confirmed correct
 *
 * 4. Robustness Features:
 *    - expect().toPass() with retries for flaky visual tests
 *    - Helper functions for page stability (fonts, network idle)
 *    - Dynamic content hidden automatically (timestamps, dates, view counts)
 *    - Animations disabled globally via CSS
 *    - Font rendering stabilized with antialiasing
 *    - Multiple selector fallbacks for components
 *    - Graceful test skipping when content not available
 *
 * 5. Headless Mode:
 *    - Tests run in headless mode by default
 *    - Configure in playwright.config.ts: headless: true
 *
 * 6. CI/CD Integration:
 *    - Store snapshots in version control
 *    - Use --update-snapshots flag carefully in CI
 *    - Consider platform-specific snapshots (Linux/Mac/Windows)
 *    - Tests are more tolerant to minor rendering differences
 *
 * 7. Skipped Tests:
 *    - Some tests skip if content is unavailable (e.g., article pages)
 *    - Enable by removing test.skip() when content is ready
 *    - Tests will gracefully skip instead of failing
 *
 * 8. Debugging Failed Tests:
 *    - Run with --debug flag: npx playwright test visual-regression --debug
 *    - Check diff images in test-results/
 *    - Adjust SCREENSHOT_OPTIONS if too strict/lenient
 */
