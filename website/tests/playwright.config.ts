import { defineConfig, devices } from '@playwright/test';

/**
 * Comprehensive Playwright Configuration
 *
 * Features:
 * - HEADLESS MODE: All browsers run in headless mode (mandatory)
 * - Multi-browser testing: Chromium, Firefox, WebKit
 * - Responsive testing: Desktop and mobile viewports
 * - Visual regression: Screenshots and videos on failure
 * - Multiple reporters: HTML, JSON, list
 * - Dev server integration: Auto-start Vite on port 5173
 */

export default defineConfig({
  // Test directory
  testDir: './e2e',

  // Maximum time one test can run for
  timeout: 30 * 1000,

  // Test execution settings
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // Reporter configuration - multiple formats for different use cases
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['list'],
  ],

  // Shared settings for all projects
  use: {
    // Base URL for tests
    baseURL: 'http://localhost:3000',

    // Collect trace on first retry of failed test
    trace: 'on-first-retry',

    // Screenshot on failure
    screenshot: 'only-on-failure',

    // Video on failure
    video: 'retain-on-failure',

    // Browser viewport settings
    viewport: { width: 1280, height: 720 },

    // Navigation timeout
    navigationTimeout: 10 * 1000,

    // Action timeout
    actionTimeout: 5 * 1000,
  },

  // Configure projects for major browsers
  projects: [
    // Desktop Browsers - HEADLESS MODE ENABLED
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: true, // MANDATORY: Headless mode
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        headless: true, // MANDATORY: Headless mode
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        headless: true, // MANDATORY: Headless mode
      },
    },

    // Mobile Viewports - HEADLESS MODE ENABLED
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 5'],
        headless: true, // MANDATORY: Headless mode
      },
    },

    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 12'],
        headless: true, // MANDATORY: Headless mode
      },
    },

    // Tablet Viewports - HEADLESS MODE ENABLED
    {
      name: 'iPad',
      use: {
        ...devices['iPad Pro'],
        headless: true, // MANDATORY: Headless mode
      },
    },

    // Additional Desktop Resolutions - HEADLESS MODE ENABLED
    {
      name: 'Desktop 1920x1080',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
        headless: true, // MANDATORY: Headless mode
      },
    },

    {
      name: 'Desktop 1366x768',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1366, height: 768 },
        headless: true, // MANDATORY: Headless mode
      },
    },
  ],

  // Web server configuration - Reuse existing dev server on port 3000
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true, // Use existing server on port 3000
    timeout: 120 * 1000,
    stdout: 'ignore',
    stderr: 'pipe',
    cwd: '../src', // Point to the src directory where vite runs
  },

  // Output folder for test artifacts
  outputDir: 'test-results',

  // Expect options
  expect: {
    // Maximum time expect() should wait for condition
    timeout: 5 * 1000,

    // Visual comparison threshold
    toHaveScreenshot: {
      maxDiffPixels: 100,
    },
  },
});
