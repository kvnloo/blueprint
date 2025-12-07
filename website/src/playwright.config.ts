import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration for Mobile Responsive Testing
 * All tests run in headless mode by default
 */
export default defineConfig({
  testDir: './tests/e2e',

  // Maximum time one test can run
  timeout: 30 * 1000,

  // Test execution settings
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // Reporter configuration
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['list'],
  ],

  // Shared settings for all projects
  use: {
    // Base URL for tests
    baseURL: process.env.BASE_URL || 'http://localhost:5173',

    // Collect trace on failure
    trace: 'on-first-retry',

    // Screenshot on failure
    screenshot: 'only-on-failure',

    // Video on failure
    video: 'retain-on-failure',

    // CRITICAL: Run in headless mode
    headless: true,

    // Viewport will be set per test
    viewport: null,
  },

  // Project configurations for different devices
  projects: [
    // Mobile devices
    {
      name: 'Mobile Chrome - iPhone SE',
      use: {
        ...devices['iPhone SE'],
        headless: true,
      },
    },
    {
      name: 'Mobile Chrome - iPhone 12',
      use: {
        ...devices['iPhone 12'],
        headless: true,
      },
    },
    {
      name: 'Mobile Chrome - Pixel 5',
      use: {
        ...devices['Pixel 5'],
        headless: true,
      },
    },

    // Tablet devices
    {
      name: 'Tablet - iPad',
      use: {
        ...devices['iPad (gen 7)'],
        headless: true,
      },
    },

    // Desktop browsers
    {
      name: 'Desktop Chrome',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
        headless: true,
      },
    },
    {
      name: 'Desktop Chrome - Full HD',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
        headless: true,
      },
    },

    // Mobile Safari
    {
      name: 'Mobile Safari - iPhone 12',
      use: {
        ...devices['iPhone 12'],
        headless: true,
      },
    },
  ],

  // Web server configuration - start dev server before tests
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
