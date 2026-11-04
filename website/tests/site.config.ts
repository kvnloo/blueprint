import { defineConfig, devices } from '@playwright/test';

// Company-site suite (routes, navigation, filters, honesty rules) plus the article
// and visualization specs, on desktop and phone. The article specs expect port 3000.
// One browser at a time, like the wallpaper matrix.
export default defineConfig({
  testDir: './e2e',
  testMatch: /(site|article-view|visualization-components)\.spec\.ts/,
  workers: 1,
  fullyParallel: false,
  retries: 0,
  reporter: [['list']],
  outputDir: '../../.site-shots/test-results',
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:3000/',
    headless: true,
    screenshot: 'only-on-failure',
    launchOptions: {
      ...(process.env.WALLPAPER_BROWSER ? { executablePath: process.env.WALLPAPER_BROWSER } : {}),
    },
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'phone', use: { ...devices['Pixel 5'] } },
  ],
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: 'npm run dev -- --host 127.0.0.1 --port 3000 --strictPort',
        cwd: '../src',
        url: 'http://127.0.0.1:3000',
        reuseExistingServer: false,
        timeout: 120_000,
      },
});
