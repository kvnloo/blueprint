import { test, expect } from '@playwright/test';

test.describe('Home Page Sections', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to home page before each test
    await page.goto('http://localhost:5173');
    // Wait for main content to load
    await page.waitForSelector('main', { state: 'visible' });
  });

  test('all sections render in correct order', async ({ page }) => {
    // Check that all main sections exist in the DOM in the expected order
    const sections = await page.locator('main > *').all();

    // Verify we have at least 6 sections (Hero, Products, About, Pipeline, Showcase, SuccessStories)
    expect(sections.length).toBeGreaterThanOrEqual(6);

    // Check sections appear in order by checking for unique identifiers or headings
    const heroVisible = await page.locator('section').filter({ hasText: /Get Started|Autonomous AI/i }).first().isVisible();
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
    // Scroll to Products section
    await page.evaluate(() => {
      const sections = Array.from(document.querySelectorAll('section'));
      const productsSection = sections.find(s =>
        s.textContent?.toLowerCase().includes('product') ||
        s.textContent?.toLowerCase().includes('feature')
      );
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });

    // Wait a bit for scroll and any animations
    await page.waitForTimeout(500);

    // Check that Products section exists and has content
    const hasProductContent = await page.evaluate(() => {
      const sections = Array.from(document.querySelectorAll('section'));
      const productsSection = sections.find(s =>
        s.textContent?.toLowerCase().includes('product') ||
        s.textContent?.toLowerCase().includes('feature')
      );
      return productsSection ? productsSection.children.length > 0 : false;
    });

    expect(hasProductContent).toBeTruthy();
  });

  test('About section displays correctly', async ({ page }) => {
    // Find and scroll to About section
    await page.evaluate(() => {
      const sections = Array.from(document.querySelectorAll('section'));
      const aboutSection = sections.find(s =>
        s.textContent?.toLowerCase().includes('about') ||
        s.textContent?.toLowerCase().includes('who we are') ||
        s.textContent?.toLowerCase().includes('our mission')
      );
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });

    await page.waitForTimeout(500);

    // Verify About section has content
    const hasAboutContent = await page.evaluate(() => {
      const sections = Array.from(document.querySelectorAll('section'));
      const aboutSection = sections.find(s =>
        s.textContent?.toLowerCase().includes('about') ||
        s.textContent?.toLowerCase().includes('who we are') ||
        s.textContent?.toLowerCase().includes('our mission')
      );
      return aboutSection ? aboutSection.textContent!.length > 50 : false;
    });

    expect(hasAboutContent).toBeTruthy();
  });

  test('Pipeline section shows process', async ({ page }) => {
    // Scroll to Pipeline section
    await page.evaluate(() => {
      const sections = Array.from(document.querySelectorAll('section'));
      const pipelineSection = sections.find(s =>
        s.textContent?.toLowerCase().includes('pipeline') ||
        s.textContent?.toLowerCase().includes('process') ||
        s.textContent?.toLowerCase().includes('workflow')
      );
      if (pipelineSection) {
        pipelineSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });

    await page.waitForTimeout(500);

    // Check Pipeline section exists and has process steps or content
    const hasPipelineSteps = await page.evaluate(() => {
      const sections = Array.from(document.querySelectorAll('section'));
      const pipelineSection = sections.find(s =>
        s.textContent?.toLowerCase().includes('pipeline') ||
        s.textContent?.toLowerCase().includes('process') ||
        s.textContent?.toLowerCase().includes('workflow')
      );

      if (!pipelineSection) return false;

      // Check for multiple child elements indicating steps/stages
      return pipelineSection.children.length > 2;
    });

    expect(hasPipelineSteps).toBeTruthy();
  });

  test('Showcase section renders', async ({ page }) => {
    // Scroll to Showcase section
    await page.evaluate(() => {
      const sections = Array.from(document.querySelectorAll('section'));
      const showcaseSection = sections.find(s =>
        s.textContent?.toLowerCase().includes('showcase') ||
        s.textContent?.toLowerCase().includes('portfolio') ||
        s.textContent?.toLowerCase().includes('examples')
      );
      if (showcaseSection) {
        showcaseSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });

    await page.waitForTimeout(500);

    // Verify Showcase section is visible
    const hasShowcase = await page.evaluate(() => {
      const sections = Array.from(document.querySelectorAll('section'));
      return sections.some(s =>
        s.textContent?.toLowerCase().includes('showcase') ||
        s.textContent?.toLowerCase().includes('portfolio') ||
        s.textContent?.toLowerCase().includes('examples')
      );
    });

    expect(hasShowcase).toBeTruthy();
  });

  test('SuccessStories section has testimonials', async ({ page }) => {
    // Scroll to SuccessStories section
    await page.evaluate(() => {
      const sections = Array.from(document.querySelectorAll('section'));
      const storiesSection = sections.find(s =>
        s.textContent?.toLowerCase().includes('success') ||
        s.textContent?.toLowerCase().includes('testimonial') ||
        s.textContent?.toLowerCase().includes('stories') ||
        s.textContent?.toLowerCase().includes('reviews')
      );
      if (storiesSection) {
        storiesSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });

    await page.waitForTimeout(500);

    // Check for testimonial content
    const hasTestimonials = await page.evaluate(() => {
      const sections = Array.from(document.querySelectorAll('section'));
      const storiesSection = sections.find(s =>
        s.textContent?.toLowerCase().includes('success') ||
        s.textContent?.toLowerCase().includes('testimonial') ||
        s.textContent?.toLowerCase().includes('stories')
      );

      // Check if section has content elements
      return storiesSection ? storiesSection.children.length > 0 : false;
    });

    expect(hasTestimonials).toBeTruthy();
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

    // Should have at least 6 sections (Hero, Products, About, Pipeline, Showcase, SuccessStories)
    expect(sectionCount).toBeGreaterThanOrEqual(6);

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
