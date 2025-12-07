import { test, expect } from '@playwright/test';

/**
 * Example Playwright Test Suite
 *
 * This demonstrates basic Playwright testing patterns.
 * All tests run in HEADLESS MODE as configured in playwright.config.ts
 */

test.describe('Homepage Tests', () => {
  test('should load the homepage successfully', async ({ page }) => {
    await page.goto('/');

    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Verify the page loaded
    expect(page.url()).toContain('localhost:5173');
  });

  test('should have a title', async ({ page }) => {
    await page.goto('/');

    // Check that the page has a title
    const title = await page.title();
    expect(title).toBeTruthy();
  });

  test('should render main content', async ({ page }) => {
    await page.goto('/');

    // Wait for React to render
    await page.waitForLoadState('networkidle');

    // Check that the root element exists
    const root = page.locator('#root');
    await expect(root).toBeVisible();
  });
});

test.describe('Responsive Design Tests', () => {
  test('should be responsive on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Verify content is visible on mobile
    const root = page.locator('#root');
    await expect(root).toBeVisible();
  });

  test('should be responsive on tablet viewport', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    // Verify content is visible on tablet
    const root = page.locator('#root');
    await expect(root).toBeVisible();
  });
});

test.describe('Accessibility Tests', () => {
  test('should have proper HTML structure', async ({ page }) => {
    await page.goto('/');

    // Check for essential HTML elements
    const html = page.locator('html');
    await expect(html).toBeVisible();

    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});

test.describe('Performance Tests', () => {
  test('should load within acceptable time', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const loadTime = Date.now() - startTime;

    // Assert page loads within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });
});
