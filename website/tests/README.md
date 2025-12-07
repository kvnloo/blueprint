# Playwright Testing Documentation

## Overview

This directory contains comprehensive Playwright end-to-end tests for the website. All tests run in **HEADLESS MODE** as configured in `playwright.config.ts`.

## Setup

1. **Install dependencies:**
   ```bash
   cd ../src
   npm install
   ```

2. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

## Running Tests

### All Tests (Headless)
```bash
npm test
```

### Specific Browser
```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### Mobile Tests
```bash
npm run test:mobile
```

### Debug Mode (Headed)
```bash
npm run test:debug
```

### UI Mode (Interactive)
```bash
npm run test:ui
```

### View Test Report
```bash
npm run test:report
```

## Test Configuration

### Browser Support
- ✅ Chromium (Desktop & Mobile)
- ✅ Firefox (Desktop)
- ✅ WebKit/Safari (Desktop & Mobile)

### Viewports Tested
- Desktop: 1920x1080, 1366x768, 1280x720
- Mobile: Pixel 5, iPhone 12
- Tablet: iPad Pro

### Features
- **Headless Mode**: All tests run headless by default
- **Parallel Execution**: Tests run in parallel for speed
- **Auto-retry**: Failed tests retry 2x in CI
- **Screenshots**: Captured on test failure
- **Videos**: Recorded on test failure
- **Traces**: Collected on first retry

## Writing Tests

Create test files in `e2e/` directory:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test('should do something', async ({ page }) => {
    await page.goto('/');
    // Your test code
  });
});
```

## Best Practices

1. **Use data-testid attributes** for reliable selectors
2. **Wait for network idle** before assertions
3. **Keep tests independent** - no shared state
4. **Group related tests** with describe blocks
5. **Use meaningful test names** that describe behavior

## CI/CD Integration

Tests are configured for CI environments:
- Retries: 2 attempts on failure
- Workers: Sequential execution (1 worker)
- forbidOnly: Prevents `.only` in CI

## Reports

Three report formats are generated:
1. **HTML Report**: Interactive visual report (`playwright-report/`)
2. **JSON Report**: Machine-readable results (`test-results/results.json`)
3. **List Reporter**: Console output during test run

## Troubleshooting

### Tests failing locally but passing in CI?
- Check viewport sizes
- Verify local dev server is running on port 5173
- Clear Playwright cache: `npx playwright install --force`

### Browser installation issues?
```bash
npx playwright install-deps
npx playwright install
```

### Debug a specific test?
```bash
npx playwright test --debug path/to/test.spec.ts
```

## Directory Structure

```
tests/
├── playwright.config.ts    # Main configuration
├── e2e/                    # Test files
│   ├── example.spec.ts
│   └── *.spec.ts
├── test-results/           # Test artifacts (gitignored)
├── playwright-report/      # HTML reports (gitignored)
└── README.md              # This file
```

## Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [API Reference](https://playwright.dev/docs/api/class-test)
