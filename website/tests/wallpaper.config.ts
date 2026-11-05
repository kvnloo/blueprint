import { defineConfig, devices } from '@playwright/test';

// Focused wallpaper regression matrix: desktop, portrait phone and full HD.
// Keep one browser active at a time, including on developer machines.
export default defineConfig({
  testDir: './e2e',
  testMatch: /living-wallpaper(?:-robustness)?\.spec\.ts/,
  workers: 1,
  fullyParallel: false,
  retries: 0,
  reporter: [['list']],
  outputDir: '../../.wallpaper-shots/test-results',
  use: {
    baseURL: 'http://127.0.0.1:3017',
    headless: true,
    screenshot: 'only-on-failure',
    launchOptions: {
      ...(process.env.WALLPAPER_BROWSER ? { executablePath: process.env.WALLPAPER_BROWSER } : {}),
    },
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'phone', use: { ...devices['Pixel 5'] } },
    { name: 'full-hd', use: { ...devices['Desktop Chrome'], viewport: { width: 1920, height: 1080 } } },
  ],
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 3017 --strictPort',
    cwd: '../src',
    url: 'http://127.0.0.1:3017',
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
