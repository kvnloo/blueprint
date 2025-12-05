import { test, expect } from '@playwright/test';

test.describe('Home Page Sections', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to home page before each test
    await page.goto('http://localhost:3000');
    // Wait for main content to load
    await page.waitForSelector('main', { state: 'visible' });
  });

  test('all sections render in correct order', async ({ page }) => {
    // Check that all main sections exist in the DOM in the expected order
    const sections = await page.locator('main section').all();

    // Verify we have exactly 6 sections (Hero, Products, About, Pipeline, Showcase, SuccessStories)
    expect(sections.length).toBe(6);

    // Check Hero section is visible with expected text
    const heroVisible = await page.locator('section').first().isVisible();
    expect(heroVisible).toBeTruthy();
  });

  test('Hero section renders correctly', async ({ page }) => {
    // Check Hero section is visible
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();

    // Check for typical Hero content elements
    // This might include a heading, description, and CTA button
    const hasHeading = await heroSection.locator('h1, h2').count() > 0;
    expect(hasHeading).toBeTruthy();
  });

  test('Products section has content', async ({ page }) => {
    // Find Products section by ID
    const productsSection = page.locator('section#products');

    // Scroll to Products section
    await productsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Check section is visible
    await expect(productsSection).toBeVisible();

    // Check for the three product cards
    const productCards = productsSection.locator('.grid > div');
    expect(await productCards.count()).toBe(3);

    // Verify expected product names
    await expect(productsSection.getByText('Blueprint Protocol')).toBeVisible();
    await expect(productsSection.getByText('World Simulation')).toBeVisible();
    await expect(productsSection.getByText('Evolve')).toBeVisible();
  });

  test('About section displays correctly', async ({ page }) => {
    // Find About section (3rd section)
    const sections = await page.locator('main section').all();
    const aboutSection = sections[2]; // About is the 3rd section (index 2)

    // Scroll to About section
    await aboutSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Check for specific About content
    await expect(page.getByText('Building the')).toBeVisible();
    await expect(page.getByText('Blueprint Protocol')).toBeVisible();

    // Check for the animated counters
    await expect(page.getByText('Active Tracks')).toBeVisible();
    await expect(page.getByText('Health Modules')).toBeVisible();

    // Check for technology stack
    await expect(page.getByText('Built with leading technology')).toBeVisible();
  });

  test('Pipeline section shows process', async ({ page }) => {
    // Find Pipeline section by ID
    const pipelineSection = page.locator('section#pipeline');

    // Scroll to Pipeline section
    await pipelineSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Check section is visible
    await expect(pipelineSection).toBeVisible();

    // Check for RAID phases (Research, Analysis, Integration, Deployment)
    await expect(pipelineSection.getByText('Research')).toBeVisible();
    await expect(pipelineSection.getByText('Analysis')).toBeVisible();
    await expect(pipelineSection.getByText('Integration')).toBeVisible();
    await expect(pipelineSection.getByText('Deployment')).toBeVisible();

    // Check for "Beyond Traditional CI/CD" heading
    await expect(pipelineSection.getByText('Beyond Traditional')).toBeVisible();

    // Check for Integration Points diagram
    await expect(pipelineSection.getByText('Integration Points')).toBeVisible();
  });

  test('Showcase section renders', async ({ page }) => {
    // Find Showcase section (5th section)
    const sections = await page.locator('main section').all();
    const showcaseSection = sections[4]; // Showcase is the 5th section (index 4)

    // Scroll to Showcase section
    await showcaseSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Check for main heading
    await expect(page.getByText('Monitor & Control')).toBeVisible();
    await expect(page.getByText('from anywhere.')).toBeVisible();

    // Check for stats
    await expect(page.getByText('Industries Served')).toBeVisible();
    await expect(page.getByText('Data Points')).toBeVisible();
    await expect(page.getByText('Efficiency Gains')).toBeVisible();
    await expect(page.getByText('Autonomous')).toBeVisible();
  });

  test('SuccessStories section has testimonials', async ({ page }) => {
    // Find SuccessStories section (6th section)
    const sections = await page.locator('main section').all();
    const storiesSection = sections[5]; // SuccessStories is the 6th section (index 5)

    // Scroll to SuccessStories section
    await storiesSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Check for main heading
    await expect(page.getByText('Success Stories')).toBeVisible();
    await expect(page.getByText('CASE STUDIES')).toBeVisible();

    // Check for story categories
    await expect(page.getByText('RESEARCH')).toBeVisible();
    await expect(page.getByText('VERTICAL FARMING')).toBeVisible();
    await expect(page.getByText('HYDROPONICS')).toBeVisible();
    await expect(page.getByText('GREENHOUSE')).toBeVisible();

    // Check for at least one client name
    await expect(page.getByText('AgriTech Labs')).toBeVisible();
  });

  test('Footer has expected links', async ({ page }) => {
    // Scroll to footer
    await page.evaluate(() => {
      const footer = document.querySelector('footer');
      if (footer) {
        footer.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    });

    await page.waitForTimeout(500);

    // Check footer exists
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Check footer has links (common footer pattern)
    const footerLinks = await footer.locator('a').count();
    expect(footerLinks).toBeGreaterThan(0);
  });

  test('scroll behavior between sections works', async ({ page }) => {
    // Get initial scroll position (should be at top)
    const initialScroll = await page.evaluate(() => window.scrollY);
    expect(initialScroll).toBeLessThan(100);

    // Scroll to middle section (About)
    await page.evaluate(() => {
      const sections = Array.from(document.querySelectorAll('section'));
      if (sections.length >= 3) {
        sections[2].scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });

    await page.waitForTimeout(800); // Wait for smooth scroll

    // Verify we scrolled down
    const middleScroll = await page.evaluate(() => window.scrollY);
    expect(middleScroll).toBeGreaterThan(initialScroll);

    // Scroll to bottom (Footer)
    await page.evaluate(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });

    await page.waitForTimeout(800);

    // Verify we scrolled further
    const bottomScroll = await page.evaluate(() => window.scrollY);
    expect(bottomScroll).toBeGreaterThan(middleScroll);
  });

  test('section visibility on scroll', async ({ page }) => {
    // Check initial visibility - Hero should be visible
    const heroVisible = await page.locator('section').first().isVisible();
    expect(heroVisible).toBeTruthy();

    // Scroll to a middle section
    await page.evaluate(() => {
      const sections = Array.from(document.querySelectorAll('section'));
      if (sections.length >= 4) {
        sections[3].scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });

    await page.waitForTimeout(800);

    // Check that we can see sections in viewport
    const visibleSections = await page.evaluate(() => {
      const sections = Array.from(document.querySelectorAll('section'));
      const viewportHeight = window.innerHeight;

      return sections.filter(section => {
        const rect = section.getBoundingClientRect();
        return (
          rect.top < viewportHeight &&
          rect.bottom > 0
        );
      }).length;
    });

    // Should have at least one section visible
    expect(visibleSections).toBeGreaterThan(0);
  });

  test('all sections are present in home view', async ({ page }) => {
    // Verify all expected sections can be found
    const sectionCount = await page.locator('main section').count();

    // Should have exactly 6 sections (Hero, Products, About, Pipeline, Showcase, SuccessStories)
    expect(sectionCount).toBe(6);

    // Verify specific sections exist
    await expect(page.locator('section#products')).toBeAttached();
    await expect(page.locator('section#pipeline')).toBeAttached();

    // Verify Footer exists
    await expect(page.locator('footer')).toBeVisible();
  });

  test('navigation to sections maintains scroll position', async ({ page }) => {
    // Scroll to middle of page
    await page.evaluate(() => {
      window.scrollTo({ top: 1000, behavior: 'instant' });
    });

    await page.waitForTimeout(300);

    const scrollPos = await page.evaluate(() => window.scrollY);
    expect(scrollPos).toBeGreaterThan(900);

    // Verify sections are still accessible
    const sections = await page.locator('main section').all();
    expect(sections.length).toBeGreaterThan(0);
  });
});
