# Performance Testing Guide

Comprehensive Playwright performance testing suite with 12 automated tests covering Web Vitals, bundle size, lazy loading, navigation, and memory leak detection.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Install Playwright browsers
npx playwright install chromium

# 3. Start dev server (in separate terminal)
cd website/src && npm run dev

# 4. Run performance tests
npm test
```

## What Gets Tested

✅ **Core Web Vitals**
- First Contentful Paint (FCP) < 1.8s
- Largest Contentful Paint (LCP) < 2.5s
- Cumulative Layout Shift (CLS) < 0.1
- Time to Interactive (TTI) < 3.5s

✅ **Performance Metrics**
- Total page load < 3s
- JavaScript bundle < 500KB
- Navigation transitions < 1s
- Smooth scroll performance (>50 FPS)

✅ **Optimization Verification**
- Image lazy loading
- WebGL Suspense lazy loading
- Resource loading analysis
- Memory leak detection (5 nav cycles < 10MB)

## Test Architecture

### Chrome DevTools Protocol (CDP)
Uses CDP for precise measurements:
- Memory heap tracking
- Layout/recalc style counts
- Script execution timing
- Network waterfall analysis

### PerformanceObserver API
Browser-native Web Vitals:
- paint timing events
- largest-contentful-paint
- layout-shift tracking

### Resource Analysis
Network monitoring:
- Request/response timing
- Resource size by type
- Failed request detection

## Running Tests

### All tests (headless default)
```bash
npm test
```

### Specific test
```bash
npx playwright test -g "Page load time"
npx playwright test -g "WebGL background"
npx playwright test -g "Memory leak"
```

### Different browsers
```bash
npm run test:chromium  # Chrome/Edge
npm run test:firefox   # Firefox
npm run test:webkit    # Safari
```

### Debug mode
```bash
npm run test:headed    # Run with visible browser
npm run test:ui        # Interactive UI mode
npm run test:debug     # Step-through debugging
```

### View results
```bash
npm run test:report    # HTML report
```

## Performance Thresholds

| Test | Metric | Threshold | Description |
|------|--------|-----------|-------------|
| 1 | Page Load | < 3000ms | Full page load time |
| 2 | FCP | < 1800ms | First content visible |
| 3 | LCP | < 2500ms | Main content visible |
| 4 | TTI | < 3500ms | Page interactive |
| 5 | Bundle Size | < 500KB | Total JavaScript |
| 6 | Lazy Images | > 0 | Images use loading="lazy" |
| 7 | WebGL Lazy | ✓ | Suspense fallback works |
| 8 | Navigation | < 1000ms | View transitions |
| 9 | Scroll FPS | > 50 | Smooth scrolling |
| 10 | Memory Leak | < 10MB | After 5 nav cycles |
| 11 | CLS | < 0.1 | Layout stability |
| 12 | Resources | 0 failed | All resources load |

## Files Created

```
feature-blog/
├── playwright.config.ts              # Playwright configuration
├── package.json                      # Test scripts
├── TESTING.md                        # This file
└── website/tests/
    ├── README.md                     # Detailed documentation
    └── e2e/
        └── performance.spec.ts       # 12 performance tests
```

## Test Details

### 1. Page Load Time
Measures total time from navigation to networkidle state.

### 2. First Contentful Paint (FCP)
Uses PerformanceObserver to detect when first content paints.

### 3. Largest Contentful Paint (LCP)
Tracks largest content element render time.

### 4. Time to Interactive (TTI)
Measures when page becomes fully interactive (domContentLoadedEventEnd).

### 5. JavaScript Bundle Size
Monitors Network.responseReceived via CDP to sum all JS bytes.

### 6. Image Lazy Loading
Verifies `<img loading="lazy">` attributes and off-screen behavior.

### 7. WebGL Background Lazy Loading
Tests React Suspense fallback (BackgroundGrid) and eventual WebGL load.

### 8. Navigation Performance
Measures view transition time (home ↔ research ↔ article).

### 9. Scroll Performance
Monitors layout count and recalc style during smooth scroll.

### 10. Memory Leak Detection
Runs 5 navigation cycles and compares heap size delta.

### 11. Cumulative Layout Shift
Tracks layout-shift events for visual stability score.

### 12. Resource Loading
Analyzes all HTTP requests by type, size, and success rate.

## CI/CD Integration

Tests are optimized for CI:
```yaml
# .github/workflows/performance.yml
- name: Install Playwright
  run: npx playwright install --with-deps chromium

- name: Run tests
  run: npm test

- name: Upload report
  uses: actions/upload-artifact@v3
  with:
    name: playwright-report
    path: playwright-report/
```

## Debugging Failed Tests

### Test timeout
```bash
# Increase timeout in test
await page.goto('http://localhost:3000', { timeout: 10000 });
```

### Memory metrics unavailable
Check Chrome launch flags in `playwright.config.ts`:
```typescript
launchOptions: {
  args: ['--enable-precise-memory-info', '--js-flags=--expose-gc']
}
```

### WebGL not loading
Test should pass with fallback. Check:
- Browser GPU support
- `prefersReducedMotion` setting
- localStorage `bg-animations-enabled` flag

### High bundle size
Analyze build output:
```bash
cd website/src
npm run build
# Check dist/ folder sizes
```

## Example Output

```
Running 12 tests in chromium (headless)

  ✓ 1. Page load time should be under 3 seconds (2847ms)
  ✓ 2. First Contentful Paint (FCP) timing (1623ms)
  ✓ 3. Largest Contentful Paint (LCP) timing (2341ms)
  ✓ 4. Time to Interactive (TTI) (3124ms)
  ✓ 5. JavaScript bundle size check (412KB)
  ✓ 6. Image lazy loading verification (8 images)
  ✓ 7. WebGL background lazy loading with Suspense (✓)
  ✓ 8. Navigation performance between views (876ms)
  ✓ 9. Article scroll performance (52 FPS)
  ✓ 10. Memory leak detection (6.2MB increase)
  ✓ 11. Cumulative Layout Shift (0.034)
  ✓ 12. Resource loading performance (0 failed)

  12 passed (45s)
```

## Troubleshooting

**Dev server not running?**
```bash
cd website/src && npm run dev
# Should run on http://localhost:3000
```

**Playwright not installed?**
```bash
npm install -D @playwright/test
npx playwright install chromium
```

**Port 3000 already in use?**
Update `playwright.config.ts`:
```typescript
webServer: {
  url: 'http://localhost:3001',  // Change port
}
```

## Additional Resources

- [Playwright Docs](https://playwright.dev)
- [Web Vitals](https://web.dev/vitals/)
- [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/)
- [PerformanceObserver API](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver)

## Notes

- All tests run in **headless mode** by default
- Memory test requires Chrome with `--expose-gc` flag (configured)
- WebGL test passes with either WebGL or CSS fallback
- Thresholds can be adjusted in `performance.spec.ts`
- Results may vary by system performance

---

**Created**: 2025-12-04
**Test Count**: 12 comprehensive performance tests
**Coverage**: Web Vitals, Bundle Size, Lazy Loading, Navigation, Memory Leaks
