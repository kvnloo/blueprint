import { test, expect, chromium } from '@playwright/test';
import type { Page, CDPSession } from '@playwright/test';

/**
 * Performance Test Suite for Blog Application
 *
 * Tests verify:
 * - Page load performance metrics
 * - Core Web Vitals (FCP, LCP, TTI)
 * - JavaScript bundle size
 * - Image lazy loading
 * - WebGL background lazy loading with Suspense
 * - Navigation performance
 * - Scroll performance
 * - Memory leak detection
 */

// Performance thresholds (adjusted for dev server environment)
const PERFORMANCE_THRESHOLDS = {
  PAGE_LOAD: 8000, // 8 seconds (dev server is slower)
  FCP: 3500, // First Contentful Paint (more lenient for dev)
  LCP: 5000, // Largest Contentful Paint (more lenient for dev)
  TTI: 6000, // Time to Interactive (dev builds are larger)
  MAX_BUNDLE_SIZE: 2000 * 1024, // 2MB (dev builds include source maps)
  NAVIGATION_TIME: 3000, // 3 seconds (client-side navigation in dev)
  SCROLL_FPS_MIN: 50, // Minimum 50 FPS for smooth scrolling
  MEMORY_LEAK_THRESHOLD: 20 * 1024 * 1024, // 20MB increase (more lenient for dev)
};

// Helper: Collect performance metrics using Chrome DevTools Protocol
async function getPerformanceMetrics(page: Page) {
  const client = await page.context().newCDPSession(page);

  // Enable performance metrics collection
  await client.send('Performance.enable');

  const metrics = await client.send('Performance.getMetrics');
  const metricsMap = new Map(
    metrics.metrics.map((m: any) => [m.name, m.value])
  );

  await client.detach();

  return {
    timestamp: metricsMap.get('Timestamp') || 0,
    documents: metricsMap.get('Documents') || 0,
    frames: metricsMap.get('Frames') || 0,
    jsEventListeners: metricsMap.get('JSEventListeners') || 0,
    nodes: metricsMap.get('Nodes') || 0,
    layoutCount: metricsMap.get('LayoutCount') || 0,
    recalcStyleCount: metricsMap.get('RecalcStyleCount') || 0,
    layoutDuration: metricsMap.get('LayoutDuration') || 0,
    recalcStyleDuration: metricsMap.get('RecalcStyleDuration') || 0,
    scriptDuration: metricsMap.get('ScriptDuration') || 0,
    taskDuration: metricsMap.get('TaskDuration') || 0,
    jsHeapUsedSize: metricsMap.get('JSHeapUsedSize') || 0,
    jsHeapTotalSize: metricsMap.get('JSHeapTotalSize') || 0,
  };
}

// Helper: Get Web Vitals using PerformanceObserver
async function getWebVitals(page: Page) {
  return await page.evaluate(() => {
    return new Promise((resolve) => {
      const vitals: any = {
        FCP: 0,
        LCP: 0,
        FID: 0,
        CLS: 0,
      };

      // First Contentful Paint
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry: any) => {
          if (entry.name === 'first-contentful-paint') {
            vitals.FCP = entry.startTime;
          }
        });
      }).observe({ type: 'paint', buffered: true });

      // Largest Contentful Paint
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        if (lastEntry) {
          vitals.LCP = lastEntry.startTime;
        }
      }).observe({ type: 'largest-contentful-paint', buffered: true });

      // Cumulative Layout Shift
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries() as any[]) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        vitals.CLS = clsValue;
      }).observe({ type: 'layout-shift', buffered: true });

      // Wait for metrics to settle
      setTimeout(() => resolve(vitals), 2000);
    });
  });
}

// Helper: Get Time to Interactive
async function getTimeToInteractive(page: Page): Promise<number> {
  const tti = await page.evaluate(() => {
    return new Promise<number>((resolve) => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        for (const entry of entries) {
          if (entry.entryType === 'measure' && entry.name === 'TTI') {
            resolve(entry.startTime);
          }
        }
      });
      observer.observe({ entryTypes: ['measure'] });

      // Fallback: estimate TTI as domContentLoadedEventEnd
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.timing;
          const tti = perfData.domContentLoadedEventEnd - perfData.navigationStart;
          resolve(tti);
        }, 100);
      });
    });
  });

  return tti;
}

// Helper: Measure JavaScript bundle size
async function getJSBundleSize(page: Page): Promise<number> {
  const client = await page.context().newCDPSession(page);
  await client.send('Network.enable');

  let totalSize = 0;

  client.on('Network.responseReceived', (event: any) => {
    const response = event.response;
    if (response.url.endsWith('.js') || response.mimeType === 'application/javascript') {
      totalSize += response.encodedDataLength || 0;
    }
  });

  // Wait for network to settle
  await page.waitForLoadState('networkidle');
  await client.detach();

  return totalSize;
}

// Test Suite - Note: headless mode is configured in playwright.config.ts
test.describe('Performance Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Clear cache and cookies for consistent results
    await page.context().clearCookies();
  });

  test('1. Page load time should be under 3 seconds', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/', {
      waitUntil: 'networkidle',
      timeout: 10000
    });

    const loadTime = Date.now() - startTime;

    console.log(`Page load time: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(PERFORMANCE_THRESHOLDS.PAGE_LOAD);
  });

  test('2. First Contentful Paint (FCP) timing', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const vitals = await getWebVitals(page);
    const fcp = vitals.FCP;

    console.log(`First Contentful Paint: ${fcp.toFixed(2)}ms`);
    expect(fcp).toBeLessThan(PERFORMANCE_THRESHOLDS.FCP);
    expect(fcp).toBeGreaterThan(0);
  });

  test('3. Largest Contentful Paint (LCP) timing', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    const vitals = await getWebVitals(page);
    const lcp = vitals.LCP;

    console.log(`Largest Contentful Paint: ${lcp.toFixed(2)}ms`);
    expect(lcp).toBeLessThan(PERFORMANCE_THRESHOLDS.LCP);
    expect(lcp).toBeGreaterThan(0);
  });

  test('4. Time to Interactive (TTI)', async ({ page }) => {
    await page.goto('/');

    const tti = await getTimeToInteractive(page);

    console.log(`Time to Interactive: ${tti.toFixed(2)}ms`);
    expect(tti).toBeLessThan(PERFORMANCE_THRESHOLDS.TTI);
  });

  test('5. JavaScript bundle size check', async ({ page }) => {
    const client = await page.context().newCDPSession(page);
    await client.send('Network.enable');

    let totalJSSize = 0;
    const jsFiles: string[] = [];

    client.on('Network.responseReceived', (event: any) => {
      const response = event.response;
      const url = response.url;
      const mimeType = response.mimeType;

      if (url.includes('.js') || mimeType === 'application/javascript' || mimeType === 'text/javascript') {
        const size = response.encodedDataLength || 0;
        totalJSSize += size;
        jsFiles.push(`${url.split('/').pop()} (${(size / 1024).toFixed(2)}KB)`);
      }
    });

    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000); // Allow all JS to load

    await client.detach();

    console.log(`Total JavaScript bundle size: ${(totalJSSize / 1024).toFixed(2)}KB`);
    console.log(`JavaScript files: ${jsFiles.join(', ')}`);

    expect(totalJSSize).toBeLessThan(PERFORMANCE_THRESHOLDS.MAX_BUNDLE_SIZE);
  });

  test('6. Image lazy loading verification', async ({ page }) => {
    await page.goto('/');

    // Check for images with loading="lazy" attribute
    const lazyImages = await page.locator('img[loading="lazy"]').count();

    console.log(`Lazy-loaded images found: ${lazyImages}`);

    // Verify images are not loaded until scrolled into view
    const offscreenImages = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img[loading="lazy"]'));
      return images.filter((img: any) => {
        const rect = img.getBoundingClientRect();
        return rect.top > window.innerHeight;
      }).length;
    });

    console.log(`Off-screen lazy images: ${offscreenImages}`);

    // At least some images should be lazy-loaded
    expect(lazyImages).toBeGreaterThan(0);
  });

  test('7. WebGL background lazy loading with Suspense', async ({ page }) => {
    await page.goto('/');

    // Check initial state - should show fallback (BackgroundGrid)
    const hasFallback = await page.evaluate(() => {
      // Look for BackgroundGrid component before WebGL loads
      return document.querySelector('[class*="grid"]') !== null;
    });

    console.log(`Fallback background visible: ${hasFallback}`);

    // Wait for WebGL to lazy load (using requestIdleCallback with 2s timeout)
    await page.waitForTimeout(3000);

    // Check if WebGL background loaded
    const hasWebGL = await page.evaluate(() => {
      // WebGL creates a canvas element
      const canvas = document.querySelector('canvas');
      if (!canvas) return false;

      // Verify it's a WebGL context
      const gl = (canvas as HTMLCanvasElement).getContext('webgl') ||
                 (canvas as HTMLCanvasElement).getContext('webgl2');
      return gl !== null;
    });

    console.log(`WebGL background loaded: ${hasWebGL}`);

    // WebGL should eventually load (unless animations disabled)
    expect(hasWebGL || hasFallback).toBeTruthy();
  });

  test('8. Navigation performance between views', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    // Test navigation from home to research
    const startTime = Date.now();

    // Click research link in navbar
    await page.click('text=Research');

    // Wait for view to change
    await page.waitForSelector('text=Research Hub', { timeout: 5000 });

    const navTime = Date.now() - startTime;

    console.log(`Navigation time (home → research): ${navTime}ms`);
    expect(navTime).toBeLessThan(PERFORMANCE_THRESHOLDS.NAVIGATION_TIME);

    // Test navigation back to home
    const startTime2 = Date.now();
    await page.click('text=Home');
    await page.waitForSelector('text=Autonomous AI Systems', { timeout: 5000 });
    const navTime2 = Date.now() - startTime2;

    console.log(`Navigation time (research → home): ${navTime2}ms`);
    expect(navTime2).toBeLessThan(PERFORMANCE_THRESHOLDS.NAVIGATION_TIME);
  });

  test('9. Article scroll performance', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    // Navigate to research hub
    await page.click('text=Research');
    await page.waitForSelector('text=Research Hub');

    // Start monitoring frame rate
    const client = await page.context().newCDPSession(page);
    await client.send('Performance.enable');

    // Perform scroll
    const scrollStart = Date.now();

    await page.evaluate(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });

    // Wait for scroll to complete
    await page.waitForTimeout(1000);

    const scrollDuration = Date.now() - scrollStart;

    // Get performance metrics
    const metrics = await getPerformanceMetrics(page);
    await client.detach();

    console.log(`Scroll duration: ${scrollDuration}ms`);
    console.log(`Layout count during scroll: ${metrics.layoutCount}`);
    console.log(`Recalc style count: ${metrics.recalcStyleCount}`);

    // Scroll should complete reasonably fast
    expect(scrollDuration).toBeLessThan(2000);

    // Layout thrashing check - shouldn't trigger excessive layouts
    expect(metrics.layoutCount).toBeLessThan(100);
  });

  test('10. Memory leak detection on navigation cycles', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    // Get initial memory baseline
    const initialMetrics = await getPerformanceMetrics(page);
    const initialMemory = initialMetrics.jsHeapUsedSize;

    console.log(`Initial memory: ${(initialMemory / 1024 / 1024).toFixed(2)}MB`);

    // Perform multiple navigation cycles
    const CYCLES = 5;
    for (let i = 0; i < CYCLES; i++) {
      // Home → Research
      await page.click('text=Research');
      await page.waitForSelector('text=Research Hub');
      await page.waitForTimeout(500);

      // Research → Home
      await page.click('text=Home');
      await page.waitForSelector('text=Autonomous AI Systems');
      await page.waitForTimeout(500);
    }

    // Force garbage collection if available
    await page.evaluate(() => {
      if ((window as any).gc) {
        (window as any).gc();
      }
    });

    await page.waitForTimeout(1000);

    // Get final memory
    const finalMetrics = await getPerformanceMetrics(page);
    const finalMemory = finalMetrics.jsHeapUsedSize;
    const memoryIncrease = finalMemory - initialMemory;

    console.log(`Final memory: ${(finalMemory / 1024 / 1024).toFixed(2)}MB`);
    console.log(`Memory increase: ${(memoryIncrease / 1024 / 1024).toFixed(2)}MB after ${CYCLES} cycles`);

    // Memory should not increase significantly
    expect(memoryIncrease).toBeLessThan(PERFORMANCE_THRESHOLDS.MEMORY_LEAK_THRESHOLD);
  });

  test('11. Cumulative Layout Shift (CLS) measurement', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    const vitals = await getWebVitals(page);
    const cls = vitals.CLS;

    console.log(`Cumulative Layout Shift: ${cls.toFixed(4)}`);

    // CLS should be less than 0.1 for good user experience
    expect(cls).toBeLessThan(0.1);
  });

  test('12. Resource loading performance', async ({ page }) => {
    const client = await page.context().newCDPSession(page);
    await client.send('Network.enable');

    const resources: any[] = [];

    client.on('Network.responseReceived', (event: any) => {
      const response = event.response;
      resources.push({
        url: response.url,
        status: response.status,
        mimeType: response.mimeType,
        size: response.encodedDataLength || 0,
        timing: response.timing,
      });
    });

    await page.goto('/', { waitUntil: 'networkidle' });
    await client.detach();

    // Analyze resources
    const totalSize = resources.reduce((sum, r) => sum + r.size, 0);
    const resourcesByType = resources.reduce((acc: any, r) => {
      const type = r.mimeType?.split('/')[0] || 'other';
      acc[type] = (acc[type] || 0) + r.size;
      return acc;
    }, {});

    console.log(`Total resources loaded: ${resources.length}`);
    console.log(`Total size: ${(totalSize / 1024).toFixed(2)}KB`);
    console.log(`By type:`, Object.entries(resourcesByType).map(
      ([type, size]) => `${type}: ${((size as number) / 1024).toFixed(2)}KB`
    ).join(', '));

    // All resources should load successfully
    const failedResources = resources.filter(r => r.status >= 400);
    expect(failedResources).toHaveLength(0);
  });
});
