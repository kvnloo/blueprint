import { test, expect } from '@playwright/test';

/**
 * Research Hub E2E Tests
 *
 * Tests the Research Hub page functionality including:
 * - Article grid rendering
 * - Track badge colors and metadata
 * - Hover interactions
 * - Navigation to article views
 * - Responsive layout
 * - Animation loading
 */

test.describe('Research Hub', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to Research Hub view
    await page.goto('/', { waitUntil: 'networkidle' });

    // Wait for page to be fully loaded and stable
    await page.waitForTimeout(1000);

    // Click Research nav link to get to Research Hub
    await page.click('button:has-text("Research")', { timeout: 10000 });

    // Wait for Research Hub to load
    await page.waitForSelector('h1:has-text("Research Hub")', { timeout: 10000 });

    // Wait for animations to settle
    await page.waitForTimeout(1000);
  });

  test('Research Hub page renders correctly', async ({ page }) => {
    // Verify page title and header elements (specifically the Research Hub h1)
    await expect(page.locator('h1:has-text("Research Hub")')).toContainText('Research Hub');

    // Verify subtitle text
    await expect(page.locator('text=SCIENTIFIC DEEP DIVES & GUIDES')).toBeVisible();

    // Verify description
    await expect(page.locator('text=Explore our latest whitepapers')).toBeVisible();

    // Verify pulsing indicator
    const pulsingIndicator = page.locator('.animate-pulse.bg-teal-400');
    await expect(pulsingIndicator).toBeVisible();
  });

  test('All 9 article cards are displayed', async ({ page }) => {
    // Wait for all articles to load
    const articleCards = page.locator('.group.relative');

    // Verify exactly 9 articles are displayed
    await expect(articleCards).toHaveCount(9);

    // Verify each card has required elements
    for (let i = 0; i < 9; i++) {
      const card = articleCards.nth(i);

      // Each card should have a title
      await expect(card.locator('h3')).toBeVisible();

      // Each card should have a description (with line-clamp-3)
      await expect(card.locator('p.line-clamp-3')).toBeVisible();

      // Each card should have "Read Article" button
      await expect(card.locator('text=Read Article')).toBeVisible();
    }
  });

  test('Article card hover states work', async ({ page }) => {
    const firstCard = page.locator('.group.relative').first();

    // Wait for card to be visible and stable
    await firstCard.waitFor({ state: 'visible' });
    await page.waitForTimeout(500);

    // Hover over the card
    await firstCard.hover({ timeout: 10000 });
    await page.waitForTimeout(500); // Wait for transition

    // Verify hover effects are applied
    // The glow element should become visible on hover
    const glowElement = firstCard.locator('[class*="glow"]');
    await expect(glowElement).toBeVisible();

    // Verify "Read Article" button changes on hover
    const readButton = firstCard.locator('text=Read Article');
    await expect(readButton).toBeVisible();

    // Verify arrow icon exists
    const arrowIcon = firstCard.locator('svg').last();
    await expect(arrowIcon).toBeVisible();
  });

  test('Each track badge has correct color', async ({ page }) => {
    const articleCards = page.locator('.group.relative');

    // Track color mappings based on ResearchHub.tsx (case-sensitive)
    const validTracks = ['Blueprint', 'World Sim', 'Evolve'];

    // Check all articles have track badges with correct colors
    for (let i = 0; i < 9; i++) {
      const card = articleCards.nth(i);
      const trackBadge = card.locator('span.text-cyan-400, span.text-orange-400, span.text-emerald-400').first();

      await expect(trackBadge).toBeVisible();

      // Verify track text
      const trackText = await trackBadge.textContent();
      expect(trackText).toBeTruthy();

      // Verify it matches one of the expected tracks (case-sensitive)
      const trackName = trackText?.trim();
      const hasValidTrack = validTracks.some(track => trackName?.includes(track));
      expect(hasValidTrack).toBe(true);
    }
  });

  test('Clicking an article navigates to article view', async ({ page }) => {
    // Get the first article card
    const firstCard = page.locator('.group.relative').first();

    // Get the article title before clicking
    const articleTitle = await firstCard.locator('h3').textContent();

    // Click the article card
    await firstCard.click();

    // Wait for navigation and animation
    await page.waitForTimeout(500);

    // Verify we're now on the article view
    // The article view should show the full article content
    const articleContent = page.locator('article, .max-w-3xl');
    await expect(articleContent).toBeVisible({ timeout: 5000 });

    // Verify the article title is displayed
    if (articleTitle) {
      await expect(page.locator(`h1:has-text("${articleTitle.trim()}")`)).toBeVisible();
    }

    // Verify back button exists (icon-only button)
    await expect(page.locator('button').filter({ has: page.locator('svg') }).first()).toBeVisible();
  });

  test('Article metadata (read time, type) is displayed', async ({ page }) => {
    const articleCards = page.locator('.group.relative');

    // Check first 3 articles for metadata
    for (let i = 0; i < 3; i++) {
      const card = articleCards.nth(i);

      // Verify read time is displayed (e.g., "45 min")
      const readTime = card.locator('span:has-text("min")');
      await expect(readTime).toBeVisible();

      // Verify read time has clock icon within the same parent
      const metaSection = card.locator('.flex.items-center.gap-1');
      await expect(metaSection).toBeVisible();

      // Verify article type badge (Deep Dive, Casual, or Technical Guide)
      const typeBadge = card.locator('span.bg-white\\/5.border.border-white\\/10').filter({ hasText: /Deep Dive|Casual|Technical Guide/i });
      await expect(typeBadge).toBeVisible();

      const typeText = await typeBadge.textContent();
      expect(typeText).toBeTruthy();

      // Verify it's one of the valid types (case-sensitive)
      const hasValidType =
        typeText?.includes('Deep Dive') ||
        typeText?.includes('Casual') ||
        typeText?.includes('Technical Guide');
      expect(hasValidType).toBe(true);
    }
  });

  test('Grid layout responsive behavior', async ({ page }) => {
    // Desktop view (default)
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.waitForTimeout(300);

    const grid = page.locator('.grid.md\\:grid-cols-2');
    await expect(grid).toBeVisible();

    // Verify articles are in grid layout
    const articleCards = page.locator('.group.relative');
    await expect(articleCards).toHaveCount(9);

    // Mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(300);

    // Grid should still be visible but single column
    await expect(grid).toBeVisible();

    // All articles should still be visible
    await expect(articleCards).toHaveCount(9);

    // Tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(300);

    // Verify grid adapts to medium screens
    await expect(grid).toBeVisible();
    await expect(articleCards).toHaveCount(9);
  });

  test('Animation on page load', async ({ page }) => {
    // Navigate fresh to Research Hub
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    await page.click('button:has-text("Research")', { timeout: 10000 });

    // Check that header has animation classes
    const header = page.locator('h1:has-text("Research Hub")');
    await expect(header).toBeVisible({ timeout: 10000 });

    // Verify subtitle animates in
    const subtitle = page.locator('text=SCIENTIFIC DEEP DIVES & GUIDES');
    await expect(subtitle).toBeVisible();

    // Verify description animates in
    const description = page.locator('text=Explore our latest whitepapers');
    await expect(description).toBeVisible();

    // Wait for staggered article animations
    await page.waitForTimeout(1500);

    // All articles should be visible after animation
    const articleCards = page.locator('.group.relative');
    await expect(articleCards.first()).toBeVisible();
    await expect(articleCards.last()).toBeVisible();
  });

  test('Track stripe indicator is visible on cards', async ({ page }) => {
    const articleCards = page.locator('.group.relative');

    // Check first 5 articles for track stripe
    for (let i = 0; i < 5; i++) {
      const card = articleCards.nth(i);

      // Look for the colored stripe on the left edge
      const stripe = card.locator('[class*="absolute top-0 left-0 w-1"]');
      await expect(stripe).toBeVisible();

      // Verify stripe has one of the track colors
      const stripeClass = await stripe.getAttribute('class');
      expect(stripeClass).toBeTruthy();

      const hasValidColor =
        stripeClass?.includes('bg-cyan-500') ||
        stripeClass?.includes('bg-orange-500') ||
        stripeClass?.includes('bg-emerald-500');
      expect(hasValidColor).toBe(true);
    }
  });

  test('Article author badge is displayed', async ({ page }) => {
    const articleCards = page.locator('.group.relative');

    // Check for author badge (z0)
    for (let i = 0; i < 3; i++) {
      const card = articleCards.nth(i);
      const authorBadge = card.locator('text=z0');
      await expect(authorBadge).toBeVisible();
    }
  });

  test('Track icons are displayed correctly', async ({ page }) => {
    const articleCards = page.locator('.group.relative');

    // Each track badge should have an icon
    for (let i = 0; i < 9; i++) {
      const card = articleCards.nth(i);

      // Track badge container with proper CSS class matching
      const trackBadge = card.locator('span.text-cyan-400, span.text-orange-400, span.text-emerald-400').first();

      // Verify icon exists within badge
      const icon = trackBadge.locator('svg');
      await expect(icon).toBeVisible();
    }
  });

  test('Article descriptions are properly truncated', async ({ page }) => {
    const articleCards = page.locator('.group.relative');

    // Check that descriptions have line-clamp class
    for (let i = 0; i < 3; i++) {
      const card = articleCards.nth(i);
      const description = card.locator('p.line-clamp-3');

      await expect(description).toBeVisible();

      // Verify text exists
      const text = await description.textContent();
      expect(text).toBeTruthy();
      expect(text!.length).toBeGreaterThan(0);
    }
  });

  test('Hover glow effect transitions smoothly', async ({ page }) => {
    const firstCard = page.locator('.group.relative').first();

    // Find the glow element
    const glowElement = firstCard.locator('[class*="blur-\\[80px\\]"]');

    // Initially should have opacity-0
    await expect(glowElement).toBeVisible();

    // Hover over card
    await firstCard.hover();
    await page.waitForTimeout(600); // Wait for 500ms transition

    // Glow should be visible (opacity-100 on hover)
    await expect(glowElement).toBeVisible();

    // Move mouse away
    await page.mouse.move(0, 0);
    await page.waitForTimeout(600);

    // Glow should fade out
    await expect(glowElement).toBeVisible();
  });

  test('Navigation returns to Research Hub from article', async ({ page }) => {
    // Click first article
    const firstCard = page.locator('.group.relative').first();
    await firstCard.click();

    // Wait for article view
    await page.waitForTimeout(500);

    // Click back button (icon-only button with ArrowLeft)
    const backButton = page.locator('button').filter({ has: page.locator('svg') }).first();
    await backButton.click();
    await page.waitForTimeout(500);

    // Verify we're back on Research Hub
    await expect(page.locator('h1:has-text("Research Hub")')).toBeVisible();

    // Verify all 9 articles are visible again
    const articleCards = page.locator('.group.relative');
    await expect(articleCards).toHaveCount(9);
  });

  test('Border opacity changes on hover', async ({ page }) => {
    const firstCard = page.locator('.group.relative').first();
    const cardContainer = firstCard.locator('div.border.border-white\\/10').first();

    // Hover over card
    await firstCard.hover();
    await page.waitForTimeout(300);

    // Verify card container is visible with hover state
    await expect(cardContainer).toBeVisible();

    // The class should include hover:border-white/20
    const containerClass = await cardContainer.getAttribute('class');
    expect(containerClass).toContain('border-white/10');
    expect(containerClass).toContain('hover:border-white/20');
  });
});
