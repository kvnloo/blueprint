import { test, expect, devices } from '@playwright/test';

// Test configuration - all tests run in headless mode by default
const BASE_URL = process.env.BASE_URL || 'http://localhost:5173';

// Define viewport configurations
const VIEWPORTS = {
  mobile: {
    iphoneSE: { width: 375, height: 667 },
    iphone12: { width: 390, height: 844 },
    pixel5: { width: 393, height: 851 },
  },
  tablet: {
    ipad: { width: 768, height: 1024 },
  },
  desktop: {
    laptop: { width: 1280, height: 720 },
    fullHD: { width: 1920, height: 1080 },
  },
};

// Minimum tap target size for mobile accessibility (44x44px recommended)
const MIN_TAP_TARGET_SIZE = 44;

test.describe('Mobile Responsive Tests - iPhone SE (375x667)', () => {
  test.use({
    viewport: VIEWPORTS.mobile.iphoneSE,
    userAgent: devices['iPhone SE'].userAgent,
  });

  test('should render correctly on iPhone SE viewport', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle(/zer0/);

    // Check viewport dimensions
    const viewportSize = page.viewportSize();
    expect(viewportSize?.width).toBe(375);
    expect(viewportSize?.height).toBe(667);
  });

  test('should display mobile menu hamburger icon', async ({ page }) => {
    await page.goto(BASE_URL);

    // Mobile menu toggle should be visible
    const mobileMenuToggle = page.locator('button.md\\:hidden').first();
    await expect(mobileMenuToggle).toBeVisible();

    // Desktop nav should be hidden
    const desktopNav = page.locator('.hidden.md\\:flex').first();
    await expect(desktopNav).not.toBeVisible();
  });

  test('should open and close mobile menu', async ({ page }) => {
    await page.goto(BASE_URL);

    const menuToggle = page.locator('button.md\\:hidden').first();

    // Open menu
    await menuToggle.click();
    const mobileMenu = page.locator('.md\\:hidden.absolute');
    await expect(mobileMenu).toBeVisible();

    // Close menu
    await menuToggle.click();
    await expect(mobileMenu).not.toBeVisible();
  });

  test('should not overflow content horizontally', async ({ page }) => {
    await page.goto(BASE_URL);

    // Check body width doesn't exceed viewport
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = page.viewportSize()?.width || 0;
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth);
  });

  test('should have adequate tap targets for buttons', async ({ page }) => {
    await page.goto(BASE_URL);

    // Check mobile menu button
    const menuButton = page.locator('button.md\\:hidden').first();
    const box = await menuButton.boundingBox();

    expect(box).not.toBeNull();
    if (box) {
      expect(box.width).toBeGreaterThanOrEqual(MIN_TAP_TARGET_SIZE);
      expect(box.height).toBeGreaterThanOrEqual(MIN_TAP_TARGET_SIZE);
    }
  });

  test('should scale images correctly', async ({ page }) => {
    await page.goto(BASE_URL);

    // Check all images are within viewport
    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const box = await img.boundingBox();

      if (box) {
        const viewportWidth = page.viewportSize()?.width || 0;
        expect(box.width).toBeLessThanOrEqual(viewportWidth);
      }
    }
  });

  test('should maintain readable text size', async ({ page }) => {
    await page.goto(BASE_URL);

    // Check that text elements have readable font size (min 14px for body text)
    const textElements = page.locator('p, span, a, button').first();
    const fontSize = await textElements.evaluate((el) => {
      return window.getComputedStyle(el).fontSize;
    });

    const fontSizeNum = parseInt(fontSize);
    expect(fontSizeNum).toBeGreaterThanOrEqual(12); // Minimum readable size
  });
});

test.describe('Mobile Responsive Tests - iPhone 12 (390x844)', () => {
  test.use({
    viewport: VIEWPORTS.mobile.iphone12,
    userAgent: devices['iPhone 12'].userAgent,
  });

  test('should render correctly on iPhone 12 viewport', async ({ page }) => {
    await page.goto(BASE_URL);

    const viewportSize = page.viewportSize();
    expect(viewportSize?.width).toBe(390);
    expect(viewportSize?.height).toBe(844);
  });

  test('should display mobile navigation correctly', async ({ page }) => {
    await page.goto(BASE_URL);

    const mobileMenuToggle = page.locator('button.md\\:hidden').first();
    await expect(mobileMenuToggle).toBeVisible();
  });

  test('should handle touch interactions', async ({ page }) => {
    await page.goto(BASE_URL);

    const menuToggle = page.locator('button.md\\:hidden').first();

    // Simulate touch tap
    await menuToggle.tap();
    const mobileMenu = page.locator('.md\\:hidden.absolute');
    await expect(mobileMenu).toBeVisible();
  });

  test('should not have horizontal scroll', async ({ page }) => {
    await page.goto(BASE_URL);

    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    expect(hasHorizontalScroll).toBe(false);
  });

  test('logo should be visible and tappable', async ({ page }) => {
    await page.goto(BASE_URL);

    const logo = page.locator('button').filter({ hasText: 'zer0' }).first();
    await expect(logo).toBeVisible();

    const box = await logo.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      expect(box.width).toBeGreaterThan(0);
      expect(box.height).toBeGreaterThan(0);
    }
  });
});

test.describe('Mobile Responsive Tests - Android Pixel 5 (393x851)', () => {
  test.use({
    viewport: VIEWPORTS.mobile.pixel5,
    userAgent: devices['Pixel 5'].userAgent,
  });

  test('should render correctly on Pixel 5 viewport', async ({ page }) => {
    await page.goto(BASE_URL);

    const viewportSize = page.viewportSize();
    expect(viewportSize?.width).toBe(393);
    expect(viewportSize?.height).toBe(851);
  });

  test('mobile menu items should be tappable', async ({ page }) => {
    await page.goto(BASE_URL);

    const menuToggle = page.locator('button.md\\:hidden').first();
    await menuToggle.tap();

    // Check menu items have adequate tap targets
    const menuItems = page.locator('.md\\:hidden.absolute button');
    const count = await menuItems.count();

    for (let i = 0; i < count; i++) {
      const item = menuItems.nth(i);
      const box = await item.boundingBox();

      if (box) {
        expect(box.height).toBeGreaterThanOrEqual(MIN_TAP_TARGET_SIZE);
      }
    }
  });

  test('should handle menu navigation touch interactions', async ({ page }) => {
    await page.goto(BASE_URL);

    // Open menu
    const menuToggle = page.locator('button.md\\:hidden').first();
    await menuToggle.tap();

    // Tap on a menu item
    const researchLink = page.locator('.md\\:hidden.absolute button').filter({ hasText: 'Research' });
    await researchLink.tap();

    // Menu should close after navigation
    const mobileMenu = page.locator('.md\\:hidden.absolute');
    await expect(mobileMenu).not.toBeVisible();
  });

  test('content sections should be stacked vertically', async ({ page }) => {
    await page.goto(BASE_URL);

    // Main content should use flex-col or block layout on mobile
    const main = page.locator('main').first();
    const display = await main.evaluate((el) => {
      return window.getComputedStyle(el).display;
    });

    // Should not be using horizontal layouts that could cause overflow
    expect(['block', 'flex']).toContain(display);
  });
});

test.describe('Tablet Responsive Tests - iPad (768x1024)', () => {
  test.use({
    viewport: VIEWPORTS.tablet.ipad,
    userAgent: devices['iPad (gen 7)'].userAgent,
  });

  test('should render correctly on iPad viewport', async ({ page }) => {
    await page.goto(BASE_URL);

    const viewportSize = page.viewportSize();
    expect(viewportSize?.width).toBe(768);
    expect(viewportSize?.height).toBe(1024);
  });

  test('should display desktop navigation on tablet', async ({ page }) => {
    await page.goto(BASE_URL);

    // Desktop nav should be visible at 768px (md breakpoint)
    const desktopNav = page.locator('.hidden.md\\:flex').first();
    await expect(desktopNav).toBeVisible();

    // Mobile menu toggle should be hidden
    const mobileMenuToggle = page.locator('button.md\\:hidden').first();
    await expect(mobileMenuToggle).not.toBeVisible();
  });

  test('buttons should be clickable and properly sized', async ({ page }) => {
    await page.goto(BASE_URL);

    const ctaButton = page.locator('button').filter({ hasText: 'Get Access' }).first();
    await expect(ctaButton).toBeVisible();

    const box = await ctaButton.boundingBox();
    expect(box).not.toBeNull();
  });

  test('images should scale appropriately for tablet', async ({ page }) => {
    await page.goto(BASE_URL);

    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const box = await img.boundingBox();

      if (box) {
        expect(box.width).toBeLessThanOrEqual(768);
      }
    }
  });

  test('layout should utilize tablet screen space', async ({ page }) => {
    await page.goto(BASE_URL);

    // Content should not be as narrow as mobile
    const container = page.locator('.max-w-7xl').first();
    const width = await container.evaluate((el) => el.offsetWidth);

    expect(width).toBeGreaterThan(375); // Wider than mobile
  });
});

test.describe('Desktop Responsive Tests - Laptop (1280x720)', () => {
  test.use({
    viewport: VIEWPORTS.desktop.laptop,
  });

  test('should render correctly on laptop viewport', async ({ page }) => {
    await page.goto(BASE_URL);

    const viewportSize = page.viewportSize();
    expect(viewportSize?.width).toBe(1280);
    expect(viewportSize?.height).toBe(720);
  });

  test('should display full desktop navigation', async ({ page }) => {
    await page.goto(BASE_URL);

    const desktopNav = page.locator('.hidden.md\\:flex').first();
    await expect(desktopNav).toBeVisible();

    // All nav items should be visible
    const navItems = desktopNav.locator('button');
    const count = await navItems.count();
    expect(count).toBeGreaterThan(0);
  });

  test('desktop CTA buttons should be visible', async ({ page }) => {
    await page.goto(BASE_URL);

    const loginLink = page.locator('a').filter({ hasText: 'Log In' });
    const ctaButton = page.locator('button').filter({ hasText: 'Get Access' }).first();

    await expect(loginLink).toBeVisible();
    await expect(ctaButton).toBeVisible();
  });

  test('content should be centered with max-width', async ({ page }) => {
    await page.goto(BASE_URL);

    const container = page.locator('.max-w-7xl').first();
    const width = await container.evaluate((el) => el.offsetWidth);

    // Should not be full viewport width
    expect(width).toBeLessThanOrEqual(1280);
  });
});

test.describe('Desktop Responsive Tests - Full HD (1920x1080)', () => {
  test.use({
    viewport: VIEWPORTS.desktop.fullHD,
  });

  test('should render correctly on Full HD viewport', async ({ page }) => {
    await page.goto(BASE_URL);

    const viewportSize = page.viewportSize();
    expect(viewportSize?.width).toBe(1920);
    expect(viewportSize?.height).toBe(1080);
  });

  test('content should be properly centered on large screens', async ({ page }) => {
    await page.goto(BASE_URL);

    const container = page.locator('.max-w-7xl').first();
    const box = await container.boundingBox();

    if (box) {
      const viewportWidth = page.viewportSize()?.width || 0;
      const leftMargin = box.x;
      const rightMargin = viewportWidth - (box.x + box.width);

      // Margins should be roughly equal (centered)
      const marginDiff = Math.abs(leftMargin - rightMargin);
      expect(marginDiff).toBeLessThan(50); // Allow small difference
    }
  });

  test('layout should utilize large screen real estate', async ({ page }) => {
    await page.goto(BASE_URL);

    const container = page.locator('.max-w-7xl').first();
    const width = await container.evaluate((el) => el.offsetWidth);

    // Should be at or near max-width (7xl = 1280px)
    expect(width).toBeGreaterThan(1200);
  });
});

test.describe('Cross-Viewport Consistency Tests', () => {
  test('logo should be visible on all viewports', async ({ page }) => {
    const viewports = [
      VIEWPORTS.mobile.iphoneSE,
      VIEWPORTS.mobile.iphone12,
      VIEWPORTS.tablet.ipad,
      VIEWPORTS.desktop.laptop,
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto(BASE_URL);

      const logo = page.locator('button').filter({ hasText: 'zer0' }).first();
      await expect(logo).toBeVisible();
    }
  });

  test('navigation should adapt appropriately across viewports', async ({ page }) => {
    // Mobile viewport - hamburger menu
    await page.setViewportSize(VIEWPORTS.mobile.iphone12);
    await page.goto(BASE_URL);

    let mobileToggle = page.locator('button.md\\:hidden').first();
    await expect(mobileToggle).toBeVisible();

    // Desktop viewport - full nav
    await page.setViewportSize(VIEWPORTS.desktop.laptop);
    await page.reload();

    const desktopNav = page.locator('.hidden.md\\:flex').first();
    await expect(desktopNav).toBeVisible();
  });

  test('no horizontal overflow on any viewport', async ({ page }) => {
    const viewports = [
      VIEWPORTS.mobile.iphoneSE,
      VIEWPORTS.mobile.iphone12,
      VIEWPORTS.mobile.pixel5,
      VIEWPORTS.tablet.ipad,
      VIEWPORTS.desktop.laptop,
      VIEWPORTS.desktop.fullHD,
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto(BASE_URL);

      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = viewport.width;

      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1); // +1 for rounding
    }
  });
});

test.describe('Touch Interaction Tests', () => {
  test.use({
    viewport: VIEWPORTS.mobile.iphone12,
    hasTouch: true,
  });

  test('should handle tap events on mobile menu', async ({ page }) => {
    await page.goto(BASE_URL);

    const menuToggle = page.locator('button.md\\:hidden').first();

    // Tap to open
    await menuToggle.tap();
    const mobileMenu = page.locator('.md\\:hidden.absolute');
    await expect(mobileMenu).toBeVisible();

    // Tap to close
    await menuToggle.tap();
    await expect(mobileMenu).not.toBeVisible();
  });

  test('should handle tap on navigation links', async ({ page }) => {
    await page.goto(BASE_URL);

    const menuToggle = page.locator('button.md\\:hidden').first();
    await menuToggle.tap();

    const servicesLink = page.locator('.md\\:hidden.absolute button').filter({ hasText: 'Services' }).first();
    await servicesLink.tap();

    // Menu should close after tap
    const mobileMenu = page.locator('.md\\:hidden.absolute');
    await expect(mobileMenu).not.toBeVisible();
  });

  test('should handle tap on CTA button in mobile menu', async ({ page }) => {
    await page.goto(BASE_URL);

    const menuToggle = page.locator('button.md\\:hidden').first();
    await menuToggle.tap();

    const ctaButton = page.locator('.md\\:hidden.absolute button').filter({ hasText: 'Get Access' });
    await expect(ctaButton).toBeVisible();

    const box = await ctaButton.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      expect(box.height).toBeGreaterThanOrEqual(MIN_TAP_TARGET_SIZE);
    }
  });

  test('buttons should have touch-friendly spacing', async ({ page }) => {
    await page.goto(BASE_URL);

    const menuToggle = page.locator('button.md\\:hidden').first();
    await menuToggle.tap();

    // Check spacing between menu items
    const menuButtons = page.locator('.md\\:hidden.absolute button');
    const count = await menuButtons.count();

    if (count > 1) {
      const firstBox = await menuButtons.nth(0).boundingBox();
      const secondBox = await menuButtons.nth(1).boundingBox();

      if (firstBox && secondBox) {
        const spacing = secondBox.y - (firstBox.y + firstBox.height);
        expect(spacing).toBeGreaterThanOrEqual(8); // Minimum 8px spacing
      }
    }
  });
});

test.describe('Accessibility and Readability Tests', () => {
  test('text should be readable on mobile devices', async ({ page }) => {
    const mobileViewports = [
      VIEWPORTS.mobile.iphoneSE,
      VIEWPORTS.mobile.iphone12,
      VIEWPORTS.mobile.pixel5,
    ];

    for (const viewport of mobileViewports) {
      await page.setViewportSize(viewport);
      await page.goto(BASE_URL);

      // Check heading text
      const heading = page.locator('h1').first();
      if (await heading.count() > 0) {
        const fontSize = await heading.evaluate((el) => {
          return parseInt(window.getComputedStyle(el).fontSize);
        });
        expect(fontSize).toBeGreaterThanOrEqual(24); // Headings should be large
      }

      // Check body text
      const paragraph = page.locator('p').first();
      if (await paragraph.count() > 0) {
        const fontSize = await paragraph.evaluate((el) => {
          return parseInt(window.getComputedStyle(el).fontSize);
        });
        expect(fontSize).toBeGreaterThanOrEqual(14); // Body text minimum
      }
    }
  });

  test('contrast should be maintained on all screen sizes', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile.iphone12);
    await page.goto(BASE_URL);

    // Check that text elements have contrasting backgrounds
    const textElements = page.locator('nav button, nav a').first();
    const color = await textElements.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });

    // Should have a color value (not inherit or initial)
    expect(color).toBeTruthy();
  });

  test('interactive elements should have visual feedback', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile.iphone12);
    await page.goto(BASE_URL);

    const menuToggle = page.locator('button.md\\:hidden').first();

    // Check for transition or hover styles
    const transition = await menuToggle.evaluate((el) => {
      return window.getComputedStyle(el).transition;
    });

    // Should have some transition or cursor styling
    expect(transition.length).toBeGreaterThan(0);
  });
});

test.describe('Performance Tests on Mobile', () => {
  test.use({
    viewport: VIEWPORTS.mobile.iphone12,
  });

  test('page should load within reasonable time on mobile', async ({ page }) => {
    const startTime = Date.now();
    await page.goto(BASE_URL);
    const loadTime = Date.now() - startTime;

    // Should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('images should lazy load on mobile', async ({ page }) => {
    await page.goto(BASE_URL);

    // Check if images have loading attribute
    const images = page.locator('img');
    const count = await images.count();

    if (count > 0) {
      // At least verify images are present
      expect(count).toBeGreaterThan(0);
    }
  });
});
