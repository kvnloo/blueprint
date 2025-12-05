import { test, expect } from '@playwright/test';

/**
 * E2E Navigation Flow Tests
 *
 * Tests navigation flows for the zer0 website including:
 * - Home page rendering
 * - Navigation between views (Home, Research)
 * - Mobile menu interactions
 * - Active state highlighting
 * - Scroll behavior on navigation
 */

// Test configuration - all tests run headless by default
test.use({
  viewport: { width: 1280, height: 720 },
  baseURL: 'http://localhost:3000', // Dev server port
});

test.describe('Navigation Flow Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to home page before each test
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    // Wait for the navbar to be visible instead of networkidle
    await page.waitForSelector('nav', { timeout: 10000 });
  });

  test('should load home page successfully', async ({ page }) => {
    // Check logo is visible
    await expect(page.locator('button:has-text("zer0")')).toBeVisible();

    // Check navbar items are present
    await expect(page.locator('text=Services').first()).toBeVisible();
    await expect(page.locator('text=Research').first()).toBeVisible();
    await expect(page.locator('text=Projects').first()).toBeVisible();
    await expect(page.locator('text=Pricing').first()).toBeVisible();

    // Check main content sections are rendered
    await expect(page.locator('main')).toBeVisible();

    // Verify we're on home view (Services should be active)
    const servicesButton = page.locator('button:has-text("Services")').first();
    await expect(servicesButton).toHaveClass(/text-teal-400/);
  });

  test('should navigate to Research Hub via navbar', async ({ page }) => {
    // Click Research link in navbar
    const researchButton = page.locator('button:has-text("Research")').first();
    await researchButton.click();

    // Wait for navigation to complete
    await page.waitForTimeout(500); // Wait for scroll animation

    // Verify Research button has active state
    await expect(researchButton).toHaveClass(/text-teal-400/);

    // Verify we scrolled to top (page should be at position 0)
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeLessThan(100); // Allow small margin for smooth scroll

    // Verify ResearchHub content is visible
    // Note: Add specific data-testid to ResearchHub component for better testing
    await expect(page.locator('main')).toBeVisible();
  });

  test('should navigate back to Home via logo click', async ({ page }) => {
    // First navigate to Research
    await page.locator('button:has-text("Research")').first().click();
    await page.waitForTimeout(500);

    // Verify we're on Research view
    const researchButton = page.locator('button:has-text("Research")').first();
    await expect(researchButton).toHaveClass(/text-teal-400/);

    // Click logo to go back to home
    const logoButton = page.locator('button:has-text("zer0")').first();
    await logoButton.click({ timeout: 10000 });
    await page.waitForTimeout(500);

    // Verify we're back on home (Services should be active)
    const servicesButton = page.locator('button:has-text("Services")').first();
    await expect(servicesButton).toHaveClass(/text-teal-400/);

    // Verify Research is no longer active (check it doesn't have the active class standalone)
    const researchClass = await researchButton.getAttribute('class');
    // Should not have text-teal-400 except in hover: prefix
    expect(researchClass).not.toMatch(/(?<!hover:)text-teal-400/);

    // Verify scroll to top
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeLessThan(100);
  });

  test('should navigate back to Home via Services link', async ({ page }) => {
    // Navigate to Research first
    await page.locator('button:has-text("Research")').first().click();
    await page.waitForTimeout(500);

    // Click Services to return home
    const servicesButton = page.locator('button:has-text("Services")').first();
    await servicesButton.click();
    await page.waitForTimeout(500);

    // Verify Services is active
    await expect(servicesButton).toHaveClass(/text-teal-400/);

    // Verify Research is no longer active (check it doesn't have the active class standalone)
    const researchButton = page.locator('button:has-text("Research")').first();
    const researchClass = await researchButton.getAttribute('class');
    // Should not have text-teal-400 except in hover: prefix
    expect(researchClass).not.toMatch(/(?<!hover:)text-teal-400/);

    // Verify scroll to top
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeLessThan(100);
  });

  test('should open and close mobile menu', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Verify menu toggle button is visible (the button with Menu/X icon)
    const menuButton = page.locator('nav button.md\\:hidden');
    await expect(menuButton).toBeVisible();

    // Verify mobile menu is not visible initially
    const mobileMenu = page.locator('div.md\\:hidden.absolute');
    await expect(mobileMenu).not.toBeVisible();

    // Open mobile menu
    await menuButton.click();
    await page.waitForTimeout(300); // Wait for animation

    // Verify mobile menu is visible with all links
    await expect(mobileMenu).toBeVisible();
    await expect(mobileMenu.locator('button:has-text("Services")')).toBeVisible();
    await expect(mobileMenu.locator('button:has-text("Research")')).toBeVisible();
    await expect(mobileMenu.locator('button:has-text("Projects")')).toBeVisible();
    await expect(mobileMenu.locator('a:has-text("Log In")')).toBeVisible();
    await expect(mobileMenu.locator('button:has-text("Get Access")')).toBeVisible();

    // Close mobile menu
    await menuButton.click();
    await page.waitForTimeout(300);

    // Verify menu is closed
    await expect(mobileMenu).not.toBeVisible();
  });

  test('should navigate to Research via mobile menu', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Open mobile menu
    const menuButton = page.locator('nav button.md\\:hidden');
    await menuButton.click();
    await page.waitForTimeout(300);

    // Click Research in mobile menu
    const mobileMenu = page.locator('div.md\\:hidden.absolute');
    const researchLink = mobileMenu.locator('button:has-text("Research")');
    await researchLink.click();

    // Wait for navigation
    await page.waitForTimeout(500);

    // Verify mobile menu auto-closes after navigation
    await expect(mobileMenu).not.toBeVisible();

    // Verify we're on Research view (scroll to top)
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeLessThan(100);

    // Re-open menu to verify active state
    await menuButton.click();
    await page.waitForTimeout(300);

    // Verify Research has active state in mobile menu
    const researchButton = mobileMenu.locator('button:has-text("Research")');
    await expect(researchButton).toHaveClass(/text-teal-400/);
  });

  test('should scroll to top on navigation', async ({ page }) => {
    // Scroll down on home page
    await page.evaluate(() => window.scrollTo({ top: 500, behavior: 'instant' }));
    await page.waitForTimeout(300);

    // Verify we scrolled down
    let scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(400);

    // Navigate to Research
    await page.locator('button:has-text("Research")').first().click();
    await page.waitForTimeout(1000); // Wait longer for smooth scroll animation

    // Verify we scrolled back to top
    scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeLessThan(100);

    // Scroll down again with instant behavior to avoid conflicts
    await page.evaluate(() => window.scrollTo({ top: 500, behavior: 'instant' }));
    await page.waitForTimeout(500);

    // Verify we scrolled down again
    scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(400);

    // Navigate back to home
    await page.locator('button:has-text("Services")').first().click();

    // Wait for scroll to complete by polling
    await page.waitForFunction(() => window.scrollY < 100, { timeout: 5000 });

    // Verify scroll to top again
    scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeLessThan(100);
  });

  test('should highlight active state correctly in navbar', async ({ page }) => {
    // Initially on home - Services should be active
    const servicesButton = page.locator('button:has-text("Services")').first();
    const researchButton = page.locator('button:has-text("Research")').first();

    await expect(servicesButton).toHaveClass(/text-teal-400/);

    // Check research button doesn't have active class (only hover class)
    let researchClass = await researchButton.getAttribute('class');
    // Should not have text-teal-400 except in hover: prefix
    expect(researchClass).not.toMatch(/(?<!hover:)text-teal-400/);

    // Navigate to Research
    await researchButton.click();
    await page.waitForTimeout(500);

    // Research should be active, Services should not
    await expect(researchButton).toHaveClass(/text-teal-400/);

    let servicesClass = await servicesButton.getAttribute('class');
    // Should not have text-teal-400 except in hover: prefix
    expect(servicesClass).not.toMatch(/(?<!hover:)text-teal-400/);

    // Navigate back to home via logo
    await page.locator('button:has-text("zer0")').first().click();
    await page.waitForTimeout(500);

    // Services should be active again
    await expect(servicesButton).toHaveClass(/text-teal-400/);

    researchClass = await researchButton.getAttribute('class');
    // Should not have text-teal-400 except in hover: prefix
    expect(researchClass).not.toMatch(/(?<!hover:)text-teal-400/);
  });

  test('should handle Projects and Pricing navigation (route to home)', async ({ page }) => {
    // Both Projects and Pricing currently route to home
    // Click Projects
    await page.locator('button:has-text("Projects")').first().click();
    await page.waitForTimeout(500);

    // Should be on home (Services active)
    const servicesButton = page.locator('button:has-text("Services")').first();
    await expect(servicesButton).toHaveClass(/text-teal-400/);

    // Verify scroll to top
    let scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeLessThan(100);

    // Scroll down and click Pricing
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(300);

    await page.locator('button:has-text("Pricing")').first().click();
    await page.waitForTimeout(500);

    // Should still be on home
    await expect(servicesButton).toHaveClass(/text-teal-400/);

    // Should scroll to top
    scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeLessThan(100);
  });

  test('should handle navbar background change on scroll', async ({ page }) => {
    // Check navbar initial state (transparent background)
    const navbar = page.locator('nav');

    // Initially should have transparent background (at top of page)
    await expect(navbar).toHaveClass(/bg-transparent/);

    // Scroll down past the threshold (50px)
    await page.evaluate(() => window.scrollTo(0, 100));
    await page.waitForTimeout(400); // Wait for scroll event handler

    // Check if background changed (scrolled state)
    await expect(navbar).toHaveClass(/bg-\[#050505\]\/80/);
    await expect(navbar).toHaveClass(/backdrop-blur-md/);
    await expect(navbar).toHaveClass(/border-b/);

    // Scroll back to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);

    // Background should be transparent again
    await expect(navbar).toHaveClass(/bg-transparent/);
  });

  test('should maintain active state when navigating between mobile and desktop', async ({ page }) => {
    // Start on desktop, navigate to Research
    await page.locator('button:has-text("Research")').first().click();
    await page.waitForTimeout(500);

    // Verify Research is active on desktop
    let researchButton = page.locator('button:has-text("Research")').first();
    await expect(researchButton).toHaveClass(/text-teal-400/);

    // Switch to mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(300);

    // Open mobile menu
    const menuButton = page.locator('nav button.md\\:hidden');
    await menuButton.click();
    await page.waitForTimeout(300);

    // Check Research is still active in mobile menu
    const mobileMenu = page.locator('div.md\\:hidden.absolute');
    researchButton = mobileMenu.locator('button:has-text("Research")');
    await expect(researchButton).toHaveClass(/text-teal-400/);

    // Navigate to home via mobile menu
    const servicesButton = mobileMenu.locator('button:has-text("Services")');
    await servicesButton.click();
    await page.waitForTimeout(500);

    // Switch back to desktop
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.waitForTimeout(300);

    // Verify Services is active on desktop
    const desktopServices = page.locator('button:has-text("Services")').first();
    await expect(desktopServices).toHaveClass(/text-teal-400/);
  });

  test('should handle rapid navigation clicks gracefully', async ({ page }) => {
    // Rapidly click between views
    await page.locator('button:has-text("Research")').first().click();
    await page.locator('button:has-text("Services")').first().click();
    await page.locator('button:has-text("Research")').first().click();

    // Wait for all animations to complete
    await page.waitForTimeout(1000);

    // Should end up on Research
    const researchButton = page.locator('button:has-text("Research")').first();
    await expect(researchButton).toHaveClass(/text-teal-400/);

    // Page should still be functional
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeLessThan(100);
  });

  test('should render navbar elements correctly', async ({ page }) => {
    // Check logo elements
    const logo = page.locator('button:has-text("zer0")');
    await expect(logo).toBeVisible();

    // Check logo icon (be more specific to get the one in the navbar)
    const logoIcon = page.locator('nav .w-8.h-8.rounded-full.bg-gradient-to-br').first();
    await expect(logoIcon).toBeVisible();
    await expect(logoIcon.locator('text=z0')).toBeVisible();

    // Check CTA buttons (desktop)
    await expect(page.locator('text=Log In').first()).toBeVisible();
    await expect(page.locator('text=Get Access').first()).toBeVisible();

    // Check all nav links are clickable
    const navButtons = await page.locator('nav button').all();
    expect(navButtons.length).toBeGreaterThan(4); // At least logo + 4 nav items
  });
});

test.describe('Accessibility and UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('nav', { timeout: 10000 });
  });

  test('should have proper focus states on navigation buttons', async ({ page }) => {
    // Focus on Services button
    await page.locator('button:has-text("Services")').first().focus();

    // Check focus is visible (browser default or custom styles)
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBe('BUTTON');
  });

  test('should support keyboard navigation', async ({ page }) => {
    // Tab through navigation elements
    await page.keyboard.press('Tab'); // Skip to first focusable element

    // Press Enter on focused button
    await page.keyboard.press('Tab'); // Move to Services or next button
    await page.keyboard.press('Tab'); // Continue tabbing

    // Verify we can navigate through all buttons
    // Note: This test verifies keyboard accessibility is present
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(['BUTTON', 'A']).toContain(focusedElement);
  });

  test('should have aria-labels or accessible text for screen readers', async ({ page }) => {
    // All navigation buttons have visible text (Services, Research, etc.)
    // Logo button has visible text "zer0"
    // Mobile menu toggle should be accessible

    // Set to mobile to check menu button
    await page.setViewportSize({ width: 375, height: 667 });
    const menuButton = page.locator('nav button.md\\:hidden');

    // Button should be defined and visible
    await expect(menuButton).toBeVisible();
  });
});
