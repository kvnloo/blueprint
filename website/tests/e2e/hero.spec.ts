import { test, expect } from '@playwright/test';

test.describe('Hero Component', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to home page before each test - increase timeout for slow dev server
    await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    // Wait for hero section to be visible
    await page.locator('section').first().waitFor({ state: 'visible', timeout: 10000 });
  });

  test('should render hero section on home page', async ({ page }) => {
    // Verify hero section exists
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();

    // Verify section has correct spacing classes
    const classList = await heroSection.getAttribute('class');
    expect(classList).toContain('pt-32');
    expect(classList).toContain('pb-20');
  });

  test('should display correct headline text', async ({ page }) => {
    // Check main heading exists in hero section
    const heroSection = page.locator('section').first();
    const heading = heroSection.locator('h1');
    await expect(heading).toBeVisible();

    // Verify headline contains all parts
    await expect(heading).toContainText('Farm');
    await expect(heading).toContainText('to');
    await expect(heading).toContainText('Table,');
    await expect(heading).toContainText('Automated.');
  });

  test('should display subtitle text', async ({ page }) => {
    // Scope to hero section to avoid multiple matches
    const heroSection = page.locator('section').first();
    const subtitle = heroSection.locator('p.text-lg.text-gray-400');
    await expect(subtitle).toBeVisible();
    await expect(subtitle).toContainText('robot chef trained in simulation');
    await expect(subtitle).toContainText('Blueprint health data');
    await expect(subtitle).toContainText('fully autonomous');
  });

  test('should render CTA button correctly', async ({ page }) => {
    // Find CTA button
    const ctaButton = page.locator('button.button-custom');
    await expect(ctaButton).toBeVisible();

    // Verify button text
    await expect(ctaButton).toContainText('See How It Works');

    // Verify ChefHat icon is present
    const chefHatIcon = ctaButton.locator('svg').first();
    await expect(chefHatIcon).toBeVisible();

    // Verify ArrowRight icon is present
    const arrowIcon = ctaButton.locator('svg').last();
    await expect(arrowIcon).toBeVisible();
  });

  test('should have clickable CTA button', async ({ page }) => {
    const ctaButton = page.locator('button.button-custom');

    // Verify button is enabled
    await expect(ctaButton).toBeEnabled();

    // Verify button can be clicked (doesn't throw)
    await ctaButton.click();
  });

  test('should display all C(RAID) steps correctly', async ({ page }) => {
    // Define expected C(RAID) steps - component shows only second word of full titles
    const expectedSteps = [
      { letter: 'R', title: 'Research', desc: 'Autonomous discovery' },
      { letter: 'A', title: 'Analysis', desc: 'Pattern recognition' },
      { letter: 'I', title: 'Integration', desc: 'Knowledge merging' },
      { letter: 'D', title: 'Deployment', desc: 'Ship to production' }
    ];

    // Scope to hero section to avoid multiple matches
    const heroSection = page.locator('section').first();
    const craidContainer = heroSection.locator('.grid.grid-cols-2.sm\\:grid-cols-4');
    await expect(craidContainer).toBeVisible();

    // Check each step exists with visible text within hero section
    for (const step of expectedSteps) {
      // Each step should be visible in the hero section
      await expect(heroSection.getByText(step.desc)).toBeVisible();
    }
  });

  test('should display visual card with robot chef image', async ({ page }) => {
    // Find main card
    const mainCard = page.locator('div.bg-\\[\\#0A0A0A\\].rounded-2xl').first();
    await expect(mainCard).toBeVisible();

    // Verify image exists
    const robotImage = page.locator('img[alt="Robot Chef Kitchen"]');
    await expect(robotImage).toBeVisible();

    // Verify image src contains the correct photo ID
    const src = await robotImage.getAttribute('src');
    expect(src).toContain('unsplash.com');
    expect(src).toContain('photo-1556909114-f6e7ad7d3136');

    // Verify image loaded (check for naturalWidth > 0)
    await expect(robotImage).toHaveJSProperty('complete', true);
  });

  test('should display meal prep status overlay', async ({ page }) => {
    // Check for meal prep status UI
    const mealStatus = page.locator('text=MEAL PREP STATUS');
    await expect(mealStatus).toBeVisible();

    const cookingProgress = page.locator('text=COOKING: 94.2%');
    await expect(cookingProgress).toBeVisible();

    // Check for live feed badge
    const liveFeed = page.locator('text=LIVE FEED');
    await expect(liveFeed).toBeVisible();
  });

  test('should display testimonial floating card', async ({ page }) => {
    // Find testimonial card
    const testimonialCard = page.locator('.glass-card');
    await expect(testimonialCard).toBeVisible();

    // Verify testimonial text - check for the full quote
    await expect(testimonialCard).toContainText('My robot chef knows my bloodwork better than I do');
    await expect(testimonialCard).toContainText('Blueprint User');
    await expect(testimonialCard).toContainText('Early Adopter');
  });

  test('should display background glow effect', async ({ page }) => {
    // Check for background glow element
    const glowEffect = page.locator('div.bg-amber-500\\/20.blur-\\[100px\\]');
    await expect(glowEffect).toBeVisible();
  });

  test('should complete animations without error', async ({ page }) => {
    // Set up console error tracking before page load
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Wait for page to fully load
    await page.waitForLoadState('networkidle');

    // Wait for animations to complete (framer-motion transitions)
    await page.waitForTimeout(2000);

    // Trigger page interaction to ensure animations run
    await page.mouse.move(500, 500);

    // Check all animated elements are visible in hero section
    const heroSection = page.locator('section').first();
    const animatedHeading = heroSection.locator('h1');
    await expect(animatedHeading).toBeVisible();

    // Verify animated heading has proper opacity (should be fully visible after animations)
    const opacity = await animatedHeading.evaluate(el => window.getComputedStyle(el).opacity);
    expect(parseFloat(opacity)).toBeGreaterThan(0.9);

    // Verify no critical console errors occurred
    expect(consoleErrors.length).toBe(0);
  });

  test('should display badge with pulsing indicator', async ({ page }) => {
    const badge = page.locator('text=AUTONOMOUS HEALTH SYSTEM').locator('..');
    await expect(badge).toBeVisible();

    // Check for pulsing dot
    const pulsingDot = badge.locator('.animate-pulse');
    await expect(pulsingDot).toBeVisible();
  });

  test('should display open source protocol indicator', async ({ page }) => {
    const protocolText = page.locator('text=Open source protocol');
    await expect(protocolText).toBeVisible();

    // Check for checkmark
    const checkmark = page.locator('text=✓').first();
    await expect(checkmark).toBeVisible();
  });

  test('should display nutritional information', async ({ page }) => {
    // Check for macro stats
    await expect(page.locator('text=Protein: 42g')).toBeVisible();
    await expect(page.locator('text=Carbs: 28g')).toBeVisible();
    await expect(page.locator('text=Fats: 18g')).toBeVisible();

    // Check for progress bar
    const progressBar = page.locator('.h-1.bg-gray-800');
    await expect(progressBar).toBeVisible();
  });

  test('should display window controls on visual card', async ({ page }) => {
    // Check for window control dots (red, yellow, green)
    const redDot = page.locator('.bg-red-500\\/50').first();
    const yellowDot = page.locator('.bg-yellow-500\\/50').first();
    const greenDot = page.locator('.bg-green-500\\/50').first();

    await expect(redDot).toBeVisible();
    await expect(yellowDot).toBeVisible();
    await expect(greenDot).toBeVisible();

    // Check for version text
    const versionText = page.locator('text=robot_chef_v1.0');
    await expect(versionText).toBeVisible();
  });
});

test.describe('Hero Component - Responsive Layout', () => {
  test('should display correctly on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForLoadState('networkidle');

    // Verify hero section is visible
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();

    // Verify headline is visible and readable in hero section
    const heading = heroSection.locator('h1');
    await expect(heading).toBeVisible();

    // Verify CTA button is accessible in hero section
    const ctaButton = heroSection.locator('button.button-custom');
    await expect(ctaButton).toBeVisible();

    // Verify C(RAID) steps adapt to mobile (should show 2 columns)
    const craidContainer = heroSection.locator('.grid.grid-cols-2.sm\\:grid-cols-4');
    await expect(craidContainer).toBeVisible();
  });

  test('should display correctly on tablet viewport', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForLoadState('networkidle');

    // Verify layout
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();

    // Check main content is visible in hero section
    const heading = heroSection.locator('h1');
    await expect(heading).toBeVisible();

    const visualCard = heroSection.locator('img[alt="Robot Chef Kitchen"]');
    await expect(visualCard).toBeVisible();
  });

  test('should display correctly on desktop viewport', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForLoadState('networkidle');

    // Verify two-column layout on desktop (lg:grid-cols-2)
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();

    // Both columns should be visible in hero section
    const heading = heroSection.locator('h1');
    const visualCard = heroSection.locator('img[alt="Robot Chef Kitchen"]');

    await expect(heading).toBeVisible();
    await expect(visualCard).toBeVisible();

    // Verify C(RAID) steps show all 4 columns in hero section
    const craidSteps = heroSection.locator('.grid-cols-2.sm\\:grid-cols-4 > div');
    await expect(craidSteps).toHaveCount(4);
  });

  test('should handle viewport resize gracefully', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForLoadState('networkidle');

    // Start with desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    const heroHeading = page.locator('section').first().locator('h1');
    await expect(heroHeading).toBeVisible();

    // Resize to tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(heroHeading).toBeVisible();

    // Resize to mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(heroHeading).toBeVisible();

    // Verify no layout breaks
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();
  });
});

test.describe('Hero Component - Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to home page before each accessibility test
    await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.locator('section').first().waitFor({ state: 'visible', timeout: 10000 });
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    // Verify h1 exists and is the main heading in hero section
    const heroSection = page.locator('section').first();
    const h1 = heroSection.locator('h1');
    await expect(h1).toBeVisible();

    // Verify only one h1 in hero section
    const heroH1Count = await heroSection.locator('h1').count();
    expect(heroH1Count).toBe(1);
  });

  test('should have accessible button', async ({ page }) => {
    const ctaButton = page.locator('button.button-custom');
    await expect(ctaButton).toBeVisible();

    // Button should be keyboard accessible - wait for button to be ready
    await ctaButton.waitFor({ state: 'visible', timeout: 10000 });
    await ctaButton.scrollIntoViewIfNeeded();

    // Use click instead of focus as buttons may not always be focusable
    await expect(ctaButton).toBeEnabled();

    // Verify button can receive focus programmatically
    const canFocus = await ctaButton.evaluate((el) => {
      el.focus();
      return document.activeElement === el;
    });
    expect(canFocus).toBeTruthy();
  });

  test('should have descriptive image alt text', async ({ page }) => {
    const robotImage = page.locator('img[alt="Robot Chef Kitchen"]');
    await expect(robotImage).toBeVisible();

    // Verify alt text is descriptive
    const altText = await robotImage.getAttribute('alt');
    expect(altText).toBeTruthy();
    expect(altText?.length).toBeGreaterThan(5);
  });
});
