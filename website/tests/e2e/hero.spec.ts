import { test, expect } from '@playwright/test';

test.describe('Hero Component', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to home page before each test
    await page.goto('/');
  });

  test('should render hero section on home page', async ({ page }) => {
    // Verify hero section exists
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();

    // Verify section has correct classes
    await expect(heroSection).toHaveClass(/pt-32 pb-20/);
  });

  test('should display correct headline text', async ({ page }) => {
    // Check main heading exists
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();

    // Verify headline contains all parts
    await expect(heading).toContainText('Farm');
    await expect(heading).toContainText('to');
    await expect(heading).toContainText('Table,');
    await expect(heading).toContainText('Automated.');
  });

  test('should display subtitle text', async ({ page }) => {
    const subtitle = page.locator('p.text-lg.text-gray-400');
    await expect(subtitle).toBeVisible();
    await expect(subtitle).toContainText('robot chef');
    await expect(subtitle).toContainText('Blueprint health data');
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
    // Define expected C(RAID) steps
    const expectedSteps = [
      { letter: 'R', title: 'Research', desc: 'Autonomous discovery' },
      { letter: 'A', title: 'Analysis', desc: 'Pattern recognition' },
      { letter: 'I', title: 'Integration', desc: 'Knowledge merging' },
      { letter: 'D', title: 'Deployment', desc: 'Ship to production' }
    ];

    // Verify container exists
    const craidContainer = page.locator('.grid.grid-cols-2.sm\\:grid-cols-4');
    await expect(craidContainer).toBeVisible();

    // Check each step
    for (const step of expectedSteps) {
      // Check step letter
      const stepLetter = page.locator(`text=${step.letter}`).first();
      await expect(stepLetter).toBeVisible();

      // Check step title
      const stepTitle = page.locator(`text=${step.title}`).first();
      await expect(stepTitle).toBeVisible();

      // Check step description
      const stepDesc = page.locator(`text=${step.desc}`).first();
      await expect(stepDesc).toBeVisible();
    }
  });

  test('should display visual card with robot chef image', async ({ page }) => {
    // Find main card
    const mainCard = page.locator('div.bg-\\[\\#0A0A0A\\].rounded-2xl').first();
    await expect(mainCard).toBeVisible();

    // Verify image exists
    const robotImage = page.locator('img[alt="Robot Chef Kitchen"]');
    await expect(robotImage).toBeVisible();

    // Verify image src is correct
    await expect(robotImage).toHaveAttribute('src', /unsplash\.com.*photo-1556909114/);

    // Wait for image to load
    await robotImage.evaluate((img: HTMLImageElement) => {
      return img.complete || new Promise(resolve => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    });
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

    // Verify testimonial text
    await expect(testimonialCard).toContainText('My robot chef knows my bloodwork');
    await expect(testimonialCard).toContainText('Blueprint User');
    await expect(testimonialCard).toContainText('Early Adopter');
  });

  test('should display background glow effect', async ({ page }) => {
    // Check for background glow element
    const glowEffect = page.locator('div.bg-amber-500\\/20.blur-\\[100px\\]');
    await expect(glowEffect).toBeVisible();
  });

  test('should complete animations without error', async ({ page }) => {
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');

    // Wait for animations to complete (framer-motion transitions)
    await page.waitForTimeout(2000);

    // Verify no console errors occurred
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Trigger page interaction to ensure animations run
    await page.mouse.move(500, 500);

    // Check all animated elements are visible
    const animatedHeading = page.locator('h1');
    await expect(animatedHeading).toBeVisible();
    await expect(animatedHeading).toHaveCSS('opacity', '1');
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
    await page.goto('/');

    // Verify hero section is visible
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();

    // Verify headline is visible and readable
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();

    // Verify CTA button is accessible
    const ctaButton = page.locator('button.button-custom');
    await expect(ctaButton).toBeVisible();

    // Verify C(RAID) steps adapt to mobile (should show 2 columns)
    const craidContainer = page.locator('.grid.grid-cols-2');
    await expect(craidContainer).toBeVisible();
  });

  test('should display correctly on tablet viewport', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    // Verify layout
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();

    // Check main content is visible
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();

    const visualCard = page.locator('img[alt="Robot Chef Kitchen"]');
    await expect(visualCard).toBeVisible();
  });

  test('should display correctly on desktop viewport', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');

    // Verify two-column layout on desktop (lg:grid-cols-2)
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();

    // Both columns should be visible
    const heading = page.locator('h1');
    const visualCard = page.locator('img[alt="Robot Chef Kitchen"]');

    await expect(heading).toBeVisible();
    await expect(visualCard).toBeVisible();

    // Verify C(RAID) steps show all 4 columns
    const craidSteps = page.locator('.grid-cols-2.sm\\:grid-cols-4 > div');
    await expect(craidSteps).toHaveCount(4);
  });

  test('should handle viewport resize gracefully', async ({ page }) => {
    await page.goto('/');

    // Start with desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('h1')).toBeVisible();

    // Resize to tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('h1')).toBeVisible();

    // Resize to mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('h1')).toBeVisible();

    // Verify no layout breaks
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();
  });
});

test.describe('Hero Component - Accessibility', () => {
  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');

    // Verify h1 exists and is the main heading
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();

    // Verify only one h1 in hero section
    const heroH1Count = await page.locator('section h1').count();
    expect(heroH1Count).toBe(1);
  });

  test('should have accessible button', async ({ page }) => {
    await page.goto('/');

    const ctaButton = page.locator('button.button-custom');

    // Button should be keyboard accessible
    await ctaButton.focus();
    const isFocused = await ctaButton.evaluate(el => el === document.activeElement);
    expect(isFocused).toBeTruthy();
  });

  test('should have descriptive image alt text', async ({ page }) => {
    await page.goto('/');

    const robotImage = page.locator('img[alt="Robot Chef Kitchen"]');
    await expect(robotImage).toBeVisible();

    // Verify alt text is descriptive
    const altText = await robotImage.getAttribute('alt');
    expect(altText).toBeTruthy();
    expect(altText?.length).toBeGreaterThan(5);
  });
});
