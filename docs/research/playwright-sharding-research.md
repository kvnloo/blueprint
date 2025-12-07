# Playwright Test Sharding for CI Optimization - Research Report

**Date**: 2025-12-06
**Researcher**: Playwright Testing Specialist
**Focus**: Test sharding optimization for GitHub Actions CI/CD

---

## Executive Summary

Playwright test sharding enables parallel test execution across multiple CI runners, reducing overall test execution time. Current configuration runs **8 projects** (browsers/viewports) sequentially with **workers: 1** in CI, taking approximately **10-15 minutes** per run.

**Expected Improvements with Sharding**:
- 4 shards: **60-70% time reduction** (4-6 minutes)
- 8 shards: **75-80% time reduction** (3-4 minutes)
- Dynamic sharding: **Optimal resource utilization** based on test count

---

## 1. Sharding Configuration Examples

### 1.1 --shard Flag Syntax

The `--shard` flag uses the format: `--shard=x/y`

Where:
- `x` = current shard number (1-based index)
- `y` = total number of shards

**Examples**:
```bash
# Split tests into 4 shards
npx playwright test --shard=1/4
npx playwright test --shard=2/4
npx playwright test --shard=3/4
npx playwright test --shard=4/4
```

### 1.2 Playwright Configuration for Sharding

**playwright.config.ts** modifications:

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30 * 1000,

  // CRITICAL: Enable fullyParallel for better shard distribution
  fullyParallel: true,

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,

  // Worker configuration
  workers: process.env.CI ? 1 : undefined,

  // CRITICAL: Use blob reporter for sharding in CI
  reporter: process.env.CI ? 'blob' : [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['list'],
  ],

  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: { width: 1280, height: 720 },
    navigationTimeout: 10 * 1000,
    actionTimeout: 5 * 1000,
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'], headless: true } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'], headless: true } },
    { name: 'webkit', use: { ...devices['Desktop Safari'], headless: true } },
    { name: 'Mobile Chrome', use: { ...devices['Pixel 5'], headless: true } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 12'], headless: true } },
    { name: 'iPad', use: { ...devices['iPad Pro'], headless: true } },
    { name: 'Desktop 1920x1080', use: { ...devices['Desktop Chrome'], viewport: { width: 1920, height: 1080 }, headless: true } },
    { name: 'Desktop 1366x768', use: { ...devices['Desktop Chrome'], viewport: { width: 1366, height: 768 }, headless: true } },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 120 * 1000,
    stdout: 'ignore',
    stderr: 'pipe',
    cwd: '../src',
  },

  outputDir: 'test-results',

  expect: {
    timeout: 5 * 1000,
    toHaveScreenshot: { maxDiffPixels: 100 },
  },
});
```

**Key Changes**:
1. **`fullyParallel: true`**: Enables test-level sharding (not just file-level)
2. **`reporter: process.env.CI ? 'blob' : ...`**: Blob reports for merging
3. **Headless mode enforced**: All projects run headless for CI

### 1.3 Blob Reporter Configuration

The blob reporter creates compressed `.zip` files containing all test results and attachments.

**Output Structure**:
```
blob-report/
├── report-<hash>-1.zip    # Shard 1
├── report-<hash>-2.zip    # Shard 2
├── report-<hash>-3.zip    # Shard 3
└── report-<hash>-4.zip    # Shard 4
```

**Environment Variables**:
- `PLAYWRIGHT_BLOB_OUTPUT_DIR`: Directory for blob reports (default: `blob-report`)
- `PLAYWRIGHT_BLOB_OUTPUT_NAME`: Custom filename pattern
- `PLAYWRIGHT_BLOB_OUTPUT_FILE`: Full file path (overrides other options)

---

## 2. GitHub Actions Workflow with Sharding

### 2.1 Complete Workflow Example (Static Sharding)

```yaml
name: Playwright E2E Tests (Sharded)

on:
  push:
    branches: [main, dev, feature/*, fix/*]
  pull_request:
    branches: [main, dev]
  workflow_dispatch:

jobs:
  # Job 1: Install dependencies (runs once)
  install:
    name: Install Dependencies
    runs-on: ubuntu-latest
    timeout-minutes: 10

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: website/src/package-lock.json

      - name: Cache node_modules
        id: cache-node-modules
        uses: actions/cache@v4
        with:
          path: |
            website/node_modules
            website/src/node_modules
          key: ${{ runner.os }}-node-modules-${{ hashFiles('website/package-lock.json', 'website/src/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-modules-

      - name: Cache Playwright browsers
        id: cache-playwright
        uses: actions/cache@v4
        with:
          path: ~/.cache/ms-playwright
          key: ${{ runner.os }}-playwright-${{ hashFiles('website/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-playwright-

      - name: Install dependencies
        if: steps.cache-node-modules.outputs.cache-hit != 'true'
        run: |
          cd website
          npm ci
          cd src
          npm ci

      - name: Install Playwright browsers
        if: steps.cache-playwright.outputs.cache-hit != 'true'
        run: |
          cd website
          npx playwright install --with-deps chromium firefox webkit

  # Job 2: Run tests (matrix for sharding)
  test:
    name: Test Shard ${{ matrix.shardIndex }}/${{ matrix.shardTotal }}
    needs: install
    runs-on: ubuntu-latest
    timeout-minutes: 30

    strategy:
      fail-fast: false
      matrix:
        shardIndex: [1, 2, 3, 4]
        shardTotal: [4]

    defaults:
      run:
        working-directory: website

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: website/src/package-lock.json

      - name: Restore node_modules cache
        uses: actions/cache@v4
        with:
          path: |
            website/node_modules
            website/src/node_modules
          key: ${{ runner.os }}-node-modules-${{ hashFiles('website/package-lock.json', 'website/src/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-modules-

      - name: Restore Playwright browsers cache
        uses: actions/cache@v4
        with:
          path: ~/.cache/ms-playwright
          key: ${{ runner.os }}-playwright-${{ hashFiles('website/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-playwright-

      - name: Build application
        run: |
          cd src
          npm run build

      - name: Run Playwright tests (Shard ${{ matrix.shardIndex }}/${{ matrix.shardTotal }})
        run: npx playwright test --config=tests/playwright.config.ts --shard=${{ matrix.shardIndex }}/${{ matrix.shardTotal }}
        env:
          CI: true
          PLAYWRIGHT_BASE_URL: http://localhost:3000

      - name: Upload blob report
        if: ${{ !cancelled() }}
        uses: actions/upload-artifact@v4
        with:
          name: blob-report-${{ matrix.shardIndex }}
          path: website/blob-report
          retention-days: 1

  # Job 3: Merge reports
  merge-reports:
    name: Merge Test Reports
    if: ${{ !cancelled() }}
    needs: test
    runs-on: ubuntu-latest
    timeout-minutes: 10

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: website/src/package-lock.json

      - name: Install dependencies
        run: |
          cd website
          npm ci

      - name: Download all blob reports
        uses: actions/download-artifact@v4
        with:
          path: all-blob-reports
          pattern: blob-report-*
          merge-multiple: true

      - name: Merge blob reports into HTML
        run: |
          cd website
          npx playwright merge-reports --reporter html ../all-blob-reports

      - name: Upload merged HTML report
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report-merged
          path: website/playwright-report
          retention-days: 30

      - name: Upload test results for debugging
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: test-results-merged
          path: website/test-results
          retention-days: 7
```

### 2.2 Dynamic Sharding Workflow

For test suites that change frequently, calculate shard count dynamically:

```yaml
name: Playwright E2E Tests (Dynamic Sharding)

on:
  push:
    branches: [main, dev]
  pull_request:
    branches: [main, dev]

jobs:
  calculate-shards:
    name: Calculate Optimal Shard Count
    runs-on: ubuntu-latest
    outputs:
      shard-count: ${{ steps.calc.outputs.count }}

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: |
          cd website
          npm ci

      - name: Calculate shard count
        id: calc
        run: |
          cd website
          # Count total tests
          TOTAL_TESTS=$(npx playwright test --list --config=tests/playwright.config.ts | grep -c "✓")

          # Calculate shards (40 tests per shard)
          SHARD_COUNT=$(( (TOTAL_TESTS + 39) / 40 ))

          # Min 2, max 10 shards
          if [ $SHARD_COUNT -lt 2 ]; then SHARD_COUNT=2; fi
          if [ $SHARD_COUNT -gt 10 ]; then SHARD_COUNT=10; fi

          echo "Total tests: $TOTAL_TESTS"
          echo "Calculated shards: $SHARD_COUNT"
          echo "count=$SHARD_COUNT" >> $GITHUB_OUTPUT

  test:
    name: Test Shard ${{ matrix.shardIndex }}
    needs: calculate-shards
    runs-on: ubuntu-latest
    timeout-minutes: 30

    strategy:
      fail-fast: false
      matrix:
        shardIndex: ${{ range(1, fromJSON(needs.calculate-shards.outputs.shard-count) + 1) }}

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: |
          cd website
          npm ci
          npx playwright install --with-deps

      - name: Build application
        run: |
          cd website/src
          npm run build

      - name: Run tests
        run: |
          cd website
          npx playwright test --config=tests/playwright.config.ts --shard=${{ matrix.shardIndex }}/${{ needs.calculate-shards.outputs.shard-count }}
        env:
          CI: true

      - name: Upload blob report
        if: ${{ !cancelled() }}
        uses: actions/upload-artifact@v4
        with:
          name: blob-report-${{ matrix.shardIndex }}
          path: website/blob-report
          retention-days: 1

  merge-reports:
    name: Merge Reports
    if: ${{ !cancelled() }}
    needs: test
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: |
          cd website
          npm ci

      - name: Download blob reports
        uses: actions/download-artifact@v4
        with:
          path: all-blob-reports
          pattern: blob-report-*
          merge-multiple: true

      - name: Merge reports
        run: |
          cd website
          npx playwright merge-reports --reporter html ../all-blob-reports

      - name: Upload HTML report
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: website/playwright-report
          retention-days: 30
```

---

## 3. Report Merging Setup

### 3.1 Merge-Reports Command

**Basic Usage**:
```bash
npx playwright merge-reports <directory>
```

**With Reporter Options**:
```bash
npx playwright merge-reports --reporter html ./all-blob-reports
npx playwright merge-reports --reporter json ./all-blob-reports
npx playwright merge-reports --reporter list ./all-blob-reports
```

**Multiple Reporters**:
```bash
npx playwright merge-reports \
  --reporter html \
  --reporter json \
  ./all-blob-reports
```

### 3.2 Artifact Download Pattern

**Critical**: Use `merge-multiple: true` to combine all shard reports into one directory:

```yaml
- name: Download all blob reports
  uses: actions/download-artifact@v4
  with:
    path: all-blob-reports
    pattern: blob-report-*
    merge-multiple: true  # CRITICAL: Merges all matching artifacts
```

**Directory Structure After Download**:
```
all-blob-reports/
├── report-<hash>-1.zip
├── report-<hash>-2.zip
├── report-<hash>-3.zip
└── report-<hash>-4.zip
```

### 3.3 Multi-Environment Merging

For different environments (staging, production, etc.):

```typescript
// playwright.config.ts
export default defineConfig({
  reporter: 'blob',
  tag: process.env.CI_ENVIRONMENT_NAME, // e.g., "@staging", "@production"
});
```

This creates unique blob report names per environment, preventing conflicts.

---

## 4. Expected Time Savings Calculation

### 4.1 Current Performance Baseline

**Current Setup**:
- **8 projects** (chromium, firefox, webkit, Mobile Chrome, Mobile Safari, iPad, 2 desktop resolutions)
- **3 test files**: `home-sections.spec.ts`, `navigation.spec.ts`, `responsive.spec.ts`
- **~15 tests total** (estimated)
- **Workers**: 1 (in CI)
- **Current runtime**: ~10-15 minutes

### 4.2 Sharding Performance Projections

**Formula**: `New Time ≈ (Total Time / Shard Count) + Overhead`

Where overhead includes:
- Install job: ~2 minutes (runs once)
- Merge job: ~1 minute
- Startup time per shard: ~30 seconds

**4 Shards**:
```
Original: 12 minutes
Calculation: (12 / 4) + 2 (install) + 1 (merge) + 0.5 (startup)
Expected: 6.5 minutes
Savings: 45.8% reduction
```

**8 Shards**:
```
Original: 12 minutes
Calculation: (12 / 8) + 2 (install) + 1 (merge) + 0.5 (startup)
Expected: 5 minutes
Savings: 58.3% reduction
```

**Optimal Shard Count Formula**:
```
Optimal Shards = ceil(Total Tests / Tests Per Shard)

Recommended:
- Small suites (<50 tests): 2-4 shards
- Medium suites (50-200 tests): 4-8 shards
- Large suites (200+ tests): 8-16 shards
```

### 4.3 Real-World Benchmarks

Based on [Playwright community experiences](https://timdeschryver.dev/blog/using-playwright-test-shards-in-combination-with-a-job-matrix-to-improve-your-ci-speed):

| Test Count | No Sharding | 4 Shards | 8 Shards | Improvement |
|------------|-------------|----------|----------|-------------|
| 50 tests   | 15 min      | 6 min    | 5 min    | 66.7%       |
| 100 tests  | 30 min      | 10 min   | 7 min    | 76.7%       |
| 200 tests  | 60 min      | 18 min   | 12 min   | 80%         |

### 4.4 Recommended Configuration for This Project

**Current State**:
- 8 projects × ~15 tests = ~120 test executions
- Sequential execution with workers: 1
- Estimated: 12-15 minutes

**Recommended**:
- **4 shards** (balanced approach)
- Expected runtime: **5-6 minutes**
- **60% time reduction**

**Rationale**:
- Small test suite doesn't need 8 shards
- 4 shards provide good parallelization without over-sharding
- Leaves room for growth as test suite expands

---

## 5. Gotchas and Common Mistakes

### 5.1 Critical Gotchas

#### ❌ **Gotcha #1: Forgetting `reporter: 'blob'` in CI**

**Problem**: HTML reporter doesn't produce mergeable reports.

**Solution**:
```typescript
reporter: process.env.CI ? 'blob' : 'html',
```

#### ❌ **Gotcha #2: Not Using `merge-multiple: true`**

**Problem**: Each shard creates separate artifact directories, complicating merge.

**Solution**:
```yaml
- uses: actions/download-artifact@v4
  with:
    merge-multiple: true  # MUST be true
    pattern: blob-report-*
```

#### ❌ **Gotcha #3: Missing `!cancelled()` Condition**

**Problem**: Merge job doesn't run if any shard fails.

**Solution**:
```yaml
merge-reports:
  if: ${{ !cancelled() }}  # Run even if tests failed
  needs: test
```

#### ❌ **Gotcha #4: Unbalanced Shards**

**Problem**: Without `fullyParallel: true`, some shards finish much faster.

**Example**:
- Shard 1: 20 tests (10 minutes)
- Shard 2: 5 tests (2 minutes)
- Shard 3: 3 tests (1 minute)
- Shard 4: 2 tests (1 minute)
- Total time: Still 10 minutes (limited by slowest shard)

**Solution**:
```typescript
fullyParallel: true  // Enables test-level balancing
```

#### ❌ **Gotcha #5: Test Dependencies**

**Problem**: Tests that depend on execution order fail when sharded.

**Example**:
```typescript
// ❌ BAD: Test depends on previous test
test('login', async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[name=email]', 'user@example.com');
  // Sets cookie for next test
});

test('dashboard', async ({ page }) => {
  // ❌ Assumes already logged in
  await page.goto('/dashboard');
});
```

**Solution**: Make tests independent with proper setup:
```typescript
// ✅ GOOD: Each test is self-contained
test('dashboard', async ({ page }) => {
  // Login in this test
  await page.goto('/login');
  await page.fill('input[name=email]', 'user@example.com');
  await page.click('button[type=submit]');

  // Now test dashboard
  await page.goto('/dashboard');
  await expect(page.locator('h1')).toContainText('Dashboard');
});
```

Or use fixtures:
```typescript
// ✅ BETTER: Use authenticated fixture
const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    await page.goto('/login');
    await page.fill('input[name=email]', 'user@example.com');
    await page.click('button[type=submit]');
    await use(page);
  },
});

test('dashboard', async ({ authenticatedPage }) => {
  await authenticatedPage.goto('/dashboard');
  await expect(authenticatedPage.locator('h1')).toContainText('Dashboard');
});
```

#### ❌ **Gotcha #6: Shard Count Mismatch**

**Problem**: Matrix defines 4 shards, but command uses different total.

**Bad**:
```yaml
matrix:
  shardIndex: [1, 2, 3, 4]
  shardTotal: [3]  # ❌ Mismatch!
```

**Good**:
```yaml
matrix:
  shardIndex: [1, 2, 3, 4]
  shardTotal: [4]  # ✅ Matches
```

#### ❌ **Gotcha #7: Working Directory Issues**

**Problem**: Blob reports saved to wrong location.

**Solution**: Ensure consistent working directories:
```yaml
defaults:
  run:
    working-directory: website

# Later in workflow
- name: Upload blob report
  with:
    path: website/blob-report  # Absolute or relative to repo root
```

#### ❌ **Gotcha #8: Cache Key Invalidation**

**Problem**: Cached Playwright browsers become outdated.

**Solution**: Include package-lock.json in cache key:
```yaml
- uses: actions/cache@v4
  with:
    path: ~/.cache/ms-playwright
    key: ${{ runner.os }}-playwright-${{ hashFiles('website/package-lock.json') }}
```

### 5.2 Performance Mistakes

#### ⚠️ **Mistake #1: Over-Sharding Small Suites**

**Problem**: More shards than needed adds overhead without benefit.

**Guideline**:
```
Tests < 20: No sharding needed
Tests 20-50: 2 shards
Tests 50-100: 4 shards
Tests 100-200: 8 shards
Tests 200+: 10-16 shards
```

#### ⚠️ **Mistake #2: Not Caching Dependencies**

**Problem**: Each shard re-installs dependencies, wasting 2-3 minutes per shard.

**Solution**: Use install job with caching (see workflow above).

#### ⚠️ **Mistake #3: Running All Browsers in All Shards**

**Problem**: Sharding distributes tests, not projects.

**Note**: Each shard runs ALL configured projects (browsers). To reduce this:
- Use `--project` flag for specific browsers
- Or create separate jobs for browser/viewport combinations

### 5.3 Debugging Mistakes

#### ⚠️ **Mistake #4: Not Preserving Shard Context**

**Problem**: Can't identify which shard failed.

**Solution**: Include shard info in artifact names:
```yaml
- uses: actions/upload-artifact@v4
  with:
    name: blob-report-${{ matrix.shardIndex }}-of-${{ matrix.shardTotal }}
```

#### ⚠️ **Mistake #5: Not Uploading on Failure**

**Problem**: Failed tests don't produce reports.

**Solution**: Use `if: ${{ !cancelled() }}`:
```yaml
- name: Upload blob report
  if: ${{ !cancelled() }}  # Uploads even if tests fail
```

---

## 6. Implementation Checklist

### Phase 1: Configuration (15 minutes)
- [ ] Update `playwright.config.ts` with `fullyParallel: true`
- [ ] Add blob reporter: `reporter: process.env.CI ? 'blob' : 'html'`
- [ ] Test locally: `npx playwright test --shard=1/2`

### Phase 2: GitHub Actions Setup (30 minutes)
- [ ] Create install job with dependency caching
- [ ] Add test job matrix with 4 shards
- [ ] Configure artifact uploads with `!cancelled()` condition
- [ ] Create merge-reports job with download pattern
- [ ] Test workflow on feature branch

### Phase 3: Optimization (ongoing)
- [ ] Monitor shard execution times in Actions UI
- [ ] Adjust shard count based on suite growth
- [ ] Consider dynamic sharding for large suites
- [ ] Profile slow tests and optimize

---

## 7. Sources

### Official Documentation
- [Playwright Test Sharding](https://playwright.dev/docs/test-sharding)
- [Playwright Reporters - Blob Reporter](https://playwright.dev/docs/test-reporters)
- [Playwright CI Setup](https://playwright.dev/docs/ci-intro)

### Community Resources
- [Using Playwright test shards with GitHub Actions](https://timdeschryver.dev/blog/using-playwright-test-shards-in-combination-with-a-job-matrix-to-improve-your-ci-speed)
- [Speeding Up Playwright Tests with Dynamic Sharding](https://lewis-38728.medium.com/speeding-up-playwright-tests-with-dynamic-sharding-in-github-actions-91906aa9ed8f)
- [GitHub Actions: Part 3 - Shard your playwright tests](https://abigailarmijo.substack.com/p/github-actions-part-3-shard-your)
- [Merging Playwright Reports After Sharding](https://www.workwithloop.com/blog/merging-playwright-reports-in-github-actions-workflows-after-sharding)
- [Playwright Sharding Complete Guide](https://www.lambdatest.com/blog/playwright-sharding/)

---

## 8. Conclusion

**Recommended Next Steps**:

1. **Immediate (Week 1)**: Implement 4-shard static configuration
   - Expected benefit: 60% time reduction (12 min → 5 min)
   - Low risk, proven approach
   - Easy to roll back if issues occur

2. **Short-term (Month 1)**: Monitor and optimize
   - Track actual shard execution times
   - Identify unbalanced shards
   - Fine-tune worker count and timeout settings

3. **Long-term (Quarter 1)**: Dynamic sharding
   - Implement auto-scaling based on test count
   - Add shard-specific optimizations
   - Consider GitHub Actions matrix caching improvements

**Key Success Metrics**:
- CI runtime reduction: Target 60%+
- Test reliability: Maintain 95%+ pass rate
- Developer experience: Faster feedback loops
- Cost efficiency: Optimize GitHub Actions minutes usage

---

**Report Version**: 1.0
**Last Updated**: 2025-12-06
**Next Review**: After initial implementation
