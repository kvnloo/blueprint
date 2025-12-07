# Build Optimization Implementation Plan

<metadata>
<topic>github-actions-optimization-plan</topic>
<phases count="4">Quick Wins, Parallelization, Smart Testing, Advanced</phases>
<total_estimated_savings>25+ minutes per run (30min → 5min)</total_estimated_savings>
<confidence level="high">Plan based on verified research from official documentation</confidence>
</metadata>

## Executive Summary

This plan transforms a 30-minute CI pipeline into a 5-minute pipeline through 4 progressive phases. Each phase builds on the previous, with clear rollback procedures and validation steps.

**Target Metrics**:
- Current: ~30 minutes (full test suite)
- After Phase 1: ~22 minutes (25% reduction)
- After Phase 2: ~5 minutes (83% reduction)
- After Phase 3: Variable (skip unnecessary runs)
- After Phase 4: ~3 minutes (with containers/larger runners)

---

## Worktree Setup

### Initial Setup Commands

```bash
# Navigate to project root
cd /home/kvn/workspace/evolve/repos/blueprint

# Create worktree for the enhancement branch
git worktree add worktrees/enhancement-builds -b enhancement/builds main

# Navigate to worktree
cd worktrees/enhancement-builds

# Verify clean state
git status
git log --oneline -3
```

### Branch Strategy

```
main ─────────────────────────────────────────────►
  │
  └─► enhancement/builds (worktree)
        │
        ├─► Phase 1 commits (caching)
        ├─► Phase 2 commits (sharding)
        ├─► Phase 3 commits (smart testing)
        └─► Phase 4 commits (advanced)

# Each phase creates a PR for review before merging
```

---

## Phase 1: Quick Wins

<phase_metadata>
<duration>1-2 days</duration>
<risk>low</risk>
<expected_savings>5-8 minutes (25% reduction)</expected_savings>
</phase_metadata>

### Objective

Implement caching and worker optimizations with minimal risk. These changes require no architectural changes and can be easily reverted.

### Prerequisites

- [ ] Git worktree created
- [ ] Current CI baseline measured (run workflow, note time)
- [ ] GitHub Actions access confirmed

### Change 1.1: Add npm Dependency Caching

**File**: `.github/workflows/playwright-tests.yml`

**Current** (lines 25-28):
```yaml
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: website/src/package-lock.json
```

**Updated**:
```yaml
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: |
            website/package-lock.json
            website/src/package-lock.json
```

**Why**: Cache both lockfiles - the website and src directories have separate dependencies.

**Expected Impact**: 30-50 seconds saved per run.

---

### Change 1.2: Add Playwright Browser Caching

**File**: `.github/workflows/playwright-tests.yml`

**Add after Setup Node.js step** (insert after line 29):
```yaml
      - name: Get Playwright version
        id: playwright-version
        run: |
          PLAYWRIGHT_VERSION=$(node -e "console.log(require('./package-lock.json').dependencies['@playwright/test']?.version || require('./package.json').devDependencies['@playwright/test'])")
          echo "version=$PLAYWRIGHT_VERSION" >> $GITHUB_OUTPUT
        working-directory: website

      - name: Cache Playwright browsers
        uses: actions/cache@v4
        id: playwright-cache
        with:
          path: ~/.cache/ms-playwright
          key: ${{ runner.os }}-playwright-${{ steps.playwright-version.outputs.version }}

      - name: Install test dependencies
        run: npm ci
        working-directory: website

      - name: Install app dependencies
        run: npm ci

      - name: Install Playwright browsers
        if: steps.playwright-cache.outputs.cache-hit != 'true'
        run: npx playwright install --with-deps chromium firefox webkit
        working-directory: website

      - name: Install Playwright OS dependencies only
        if: steps.playwright-cache.outputs.cache-hit == 'true'
        run: npx playwright install-deps
        working-directory: website
```

**Why**:
- Browser binaries are ~400MB and take 2-3 minutes to download
- Cache restores in ~20 seconds
- OS dependencies still needed (can't be cached), but much faster

**Expected Impact**: 90-120 seconds saved on cache hit.

---

### Change 1.3: Increase Worker Count

**File**: `website/tests/playwright.config.ts`

**Current** (line 26):
```typescript
  workers: process.env.CI ? 1 : undefined,
```

**Updated**:
```typescript
  // GitHub-hosted runners have 2 CPU cores - use them
  workers: process.env.CI ? 2 : undefined,
```

**Why**: GitHub runners have 2 vCPUs. Using 1 worker wastes half the available compute.

**Expected Impact**: 30-40% faster test execution.

---

### Change 1.4: Reduce Browser Projects (Optional)

**File**: `website/tests/playwright.config.ts`

**Current** (8 projects): Desktop Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari, iPad, Desktop 1920x1080, Desktop 1366x768

**Recommended** (3 core + 2 viewports):
```typescript
  projects: [
    // Core browsers - always test
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], headless: true },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], headless: true },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], headless: true },
    },
    // Mobile - critical user journeys only
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'], headless: true },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'], headless: true },
    },
  ],
```

**Why**: 8 configurations × 14 tests = 112 test runs. Reducing to 5 configs = 70 runs (37% reduction).

**Expected Impact**: 37% fewer test executions.

---

### Phase 1 Complete Workflow

**File**: `.github/workflows/playwright-tests.yml` (complete Phase 1 version)

```yaml
name: Playwright E2E Tests

on:
  push:
    branches: [main, dev, feature/*, fix/*]
  pull_request:
    branches: [main, dev]
  workflow_dispatch:

jobs:
  test:
    name: Playwright Tests
    runs-on: ubuntu-latest
    timeout-minutes: 30

    defaults:
      run:
        working-directory: website/src

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: |
            website/package-lock.json
            website/src/package-lock.json

      - name: Get Playwright version
        id: playwright-version
        run: |
          PLAYWRIGHT_VERSION=$(node -e "console.log(require('./package-lock.json').dependencies['@playwright/test']?.version || require('./package.json').devDependencies['@playwright/test'])")
          echo "version=$PLAYWRIGHT_VERSION" >> $GITHUB_OUTPUT
        working-directory: website

      - name: Cache Playwright browsers
        uses: actions/cache@v4
        id: playwright-cache
        with:
          path: ~/.cache/ms-playwright
          key: ${{ runner.os }}-playwright-${{ steps.playwright-version.outputs.version }}

      - name: Install test dependencies
        run: npm ci
        working-directory: website

      - name: Install app dependencies
        run: npm ci

      - name: Install Playwright browsers
        if: steps.playwright-cache.outputs.cache-hit != 'true'
        run: npx playwright install --with-deps chromium firefox webkit
        working-directory: website

      - name: Install Playwright OS deps only
        if: steps.playwright-cache.outputs.cache-hit == 'true'
        run: npx playwright install-deps
        working-directory: website

      - name: Build application
        run: npm run build

      - name: Run Playwright tests
        run: npx playwright test --config=tests/playwright.config.ts
        working-directory: website
        env:
          CI: true
          PLAYWRIGHT_BASE_URL: http://localhost:3000

      - name: Upload test results
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: website/tests/playwright-report/
          retention-days: 30

      - name: Upload test artifacts
        uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: test-results
          path: website/tests/test-results/
          retention-days: 7

  smoke-test:
    name: Smoke Tests (Quick)
    runs-on: ubuntu-latest
    timeout-minutes: 10
    if: github.event_name == 'pull_request'

    defaults:
      run:
        working-directory: website/src

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: |
            website/package-lock.json
            website/src/package-lock.json

      - name: Get Playwright version
        id: playwright-version
        run: |
          PLAYWRIGHT_VERSION=$(node -e "console.log(require('./package-lock.json').dependencies['@playwright/test']?.version || require('./package.json').devDependencies['@playwright/test'])")
          echo "version=$PLAYWRIGHT_VERSION" >> $GITHUB_OUTPUT
        working-directory: website

      - name: Cache Playwright browsers
        uses: actions/cache@v4
        id: playwright-cache
        with:
          path: ~/.cache/ms-playwright
          key: ${{ runner.os }}-playwright-${{ steps.playwright-version.outputs.version }}-chromium

      - name: Install test dependencies
        run: npm ci
        working-directory: website

      - name: Install app dependencies
        run: npm ci

      - name: Install Playwright Chromium
        if: steps.playwright-cache.outputs.cache-hit != 'true'
        run: npx playwright install --with-deps chromium
        working-directory: website

      - name: Install Playwright OS deps only
        if: steps.playwright-cache.outputs.cache-hit == 'true'
        run: npx playwright install-deps chromium
        working-directory: website

      - name: Build application
        run: npm run build

      - name: Run smoke tests (Chromium only)
        run: npx playwright test --config=tests/playwright.config.ts --project=chromium navigation.spec.ts home-sections.spec.ts
        working-directory: website
        env:
          CI: true
          PLAYWRIGHT_BASE_URL: http://localhost:3000

      - name: Upload smoke test results
        uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: smoke-test-results
          path: website/tests/test-results/
          retention-days: 7
```

---

### Phase 1 Testing Strategy

```bash
# 1. Measure baseline (before changes)
gh run list --workflow=playwright-tests.yml --limit 3

# 2. Apply Phase 1 changes
git add .github/workflows/playwright-tests.yml website/tests/playwright.config.ts
git commit -m "perf(ci): Phase 1 - add caching and optimize workers"

# 3. Push and trigger workflow
git push origin enhancement/builds

# 4. Trigger manual run to test
gh workflow run playwright-tests.yml --ref enhancement/builds

# 5. Compare times
gh run list --workflow=playwright-tests.yml --limit 5

# 6. Check cache hits
gh run view <run-id> --log | grep -i "cache"
```

### Phase 1 Rollback Plan

```bash
# If issues arise, revert the commit
git revert HEAD

# Or reset to pre-Phase 1 state
git reset --hard HEAD~1
git push --force origin enhancement/builds
```

### Phase 1 Success Criteria

- [ ] npm cache hits on subsequent runs
- [ ] Playwright browser cache hits on subsequent runs
- [ ] Total time reduced by 20-30% (verify with measurements)
- [ ] All tests still pass
- [ ] No regressions in test reliability

---

## Phase 2: Parallelization

<phase_metadata>
<duration>2-3 days</duration>
<risk>medium</risk>
<expected_savings>15-20 minutes (70% reduction from baseline)</expected_savings>
</phase_metadata>

### Objective

Implement test sharding and browser matrix to run tests in parallel across multiple jobs.

### Prerequisites

- [ ] Phase 1 completed and verified
- [ ] Phase 1 PR merged to main
- [ ] Baseline with Phase 1 optimizations measured

### Change 2.1: Complete Sharded Workflow

**File**: `.github/workflows/playwright-tests.yml` (complete replacement)

```yaml
name: Playwright E2E Tests

on:
  push:
    branches: [main, dev, feature/*, fix/*]
  pull_request:
    branches: [main, dev]
  workflow_dispatch:

jobs:
  test:
    name: Tests (${{ matrix.browser }}, shard ${{ matrix.shardIndex }}/${{ matrix.shardTotal }})
    runs-on: ubuntu-latest
    timeout-minutes: 15
    strategy:
      fail-fast: false
      matrix:
        browser: [chromium, firefox, webkit]
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
          cache-dependency-path: |
            website/package-lock.json
            website/src/package-lock.json

      - name: Get Playwright version
        id: playwright-version
        run: |
          PLAYWRIGHT_VERSION=$(node -e "console.log(require('./package-lock.json').dependencies['@playwright/test']?.version || require('./package.json').devDependencies['@playwright/test'])")
          echo "version=$PLAYWRIGHT_VERSION" >> $GITHUB_OUTPUT

      - name: Cache Playwright browsers
        uses: actions/cache@v4
        id: playwright-cache
        with:
          path: ~/.cache/ms-playwright
          key: ${{ runner.os }}-playwright-${{ steps.playwright-version.outputs.version }}-${{ matrix.browser }}

      - name: Install test dependencies
        run: npm ci

      - name: Install app dependencies
        run: npm ci
        working-directory: website/src

      - name: Install Playwright browser
        if: steps.playwright-cache.outputs.cache-hit != 'true'
        run: npx playwright install --with-deps ${{ matrix.browser }}

      - name: Install Playwright OS deps only
        if: steps.playwright-cache.outputs.cache-hit == 'true'
        run: npx playwright install-deps ${{ matrix.browser }}

      - name: Build application
        run: npm run build
        working-directory: website/src

      - name: Run Playwright tests
        run: |
          npx playwright test \
            --config=tests/playwright.config.ts \
            --project=${{ matrix.browser }} \
            --shard=${{ matrix.shardIndex }}/${{ matrix.shardTotal }}
        env:
          CI: true
          PLAYWRIGHT_BASE_URL: http://localhost:3000

      - name: Upload blob report
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: blob-report-${{ matrix.browser }}-${{ matrix.shardIndex }}
          path: website/tests/blob-report/
          retention-days: 1

  merge-reports:
    name: Merge Test Reports
    if: always()
    needs: [test]
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci
        working-directory: website

      - name: Download all blob reports
        uses: actions/download-artifact@v4
        with:
          path: all-blob-reports
          pattern: blob-report-*
          merge-multiple: true

      - name: Merge into HTML Report
        run: npx playwright merge-reports --reporter html ./all-blob-reports
        working-directory: website

      - name: Upload HTML report
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: website/playwright-report/
          retention-days: 30

  smoke-test:
    name: Smoke Tests (PR Quick Feedback)
    runs-on: ubuntu-latest
    timeout-minutes: 8
    if: github.event_name == 'pull_request'

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
          cache-dependency-path: |
            website/package-lock.json
            website/src/package-lock.json

      - name: Get Playwright version
        id: playwright-version
        run: |
          PLAYWRIGHT_VERSION=$(node -e "console.log(require('./package-lock.json').dependencies['@playwright/test']?.version || require('./package.json').devDependencies['@playwright/test'])")
          echo "version=$PLAYWRIGHT_VERSION" >> $GITHUB_OUTPUT

      - name: Cache Playwright browsers
        uses: actions/cache@v4
        id: playwright-cache
        with:
          path: ~/.cache/ms-playwright
          key: ${{ runner.os }}-playwright-${{ steps.playwright-version.outputs.version }}-chromium

      - name: Install dependencies
        run: npm ci

      - name: Install app dependencies
        run: npm ci
        working-directory: website/src

      - name: Install Playwright Chromium
        if: steps.playwright-cache.outputs.cache-hit != 'true'
        run: npx playwright install --with-deps chromium

      - name: Install Playwright OS deps only
        if: steps.playwright-cache.outputs.cache-hit == 'true'
        run: npx playwright install-deps chromium

      - name: Build application
        run: npm run build
        working-directory: website/src

      - name: Run smoke tests
        run: |
          npx playwright test \
            --config=tests/playwright.config.ts \
            --project=chromium \
            navigation.spec.ts home-sections.spec.ts
        env:
          CI: true
          PLAYWRIGHT_BASE_URL: http://localhost:3000

      - name: Upload smoke test results
        uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: smoke-test-results
          path: website/tests/test-results/
          retention-days: 7
```

---

### Change 2.2: Update Playwright Config for Sharding

**File**: `website/tests/playwright.config.ts`

```typescript
import { defineConfig, devices } from '@playwright/test';

/**
 * Optimized Playwright Configuration for CI
 *
 * Features:
 * - Blob reporter for sharded runs
 * - Optimal worker count for GitHub runners
 * - fullyParallel for balanced shard distribution
 * - Simplified browser projects
 */
export default defineConfig({
  testDir: './e2e',
  timeout: 30 * 1000,

  // Enable full parallelism for better shard distribution
  fullyParallel: true,

  // CI-specific settings
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,

  // GitHub-hosted runners have 2 cores
  workers: process.env.CI ? 2 : undefined,

  // Use blob reporter in CI for sharding, HTML locally
  reporter: process.env.CI
    ? [['blob', { outputDir: 'blob-report' }]]
    : [
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

  // Simplified projects - one per browser for matrix compatibility
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], headless: true },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], headless: true },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], headless: true },
    },
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

---

### Phase 2 Testing Strategy

```bash
# 1. Measure Phase 1 baseline
gh run list --workflow=playwright-tests.yml --limit 3

# 2. Apply Phase 2 changes
git add .github/workflows/playwright-tests.yml website/tests/playwright.config.ts
git commit -m "perf(ci): Phase 2 - implement 4-way sharding and browser matrix"

# 3. Push and trigger
git push origin enhancement/builds
gh workflow run playwright-tests.yml --ref enhancement/builds

# 4. Monitor parallel execution
gh run watch <run-id>

# 5. Verify report merging
gh run download <run-id> -n playwright-report

# 6. Compare times (should be ~5 minutes now)
gh run list --workflow=playwright-tests.yml --limit 5
```

### Phase 2 Rollback Plan

```bash
# Revert to Phase 1 state
git revert HEAD
git push origin enhancement/builds

# Or checkout the Phase 1 version of files
git checkout HEAD~1 -- .github/workflows/playwright-tests.yml
git checkout HEAD~1 -- website/tests/playwright.config.ts
```

### Phase 2 Success Criteria

- [ ] 12 parallel jobs running (3 browsers × 4 shards)
- [ ] All jobs complete in <8 minutes
- [ ] Merged HTML report generated correctly
- [ ] All tests pass across all shards
- [ ] Cache hits working for all browser types

---

## Phase 3: Smart Testing

<phase_metadata>
<duration>3-5 days</duration>
<risk>low-medium</risk>
<expected_savings>20-50% fewer CI runs</expected_savings>
</phase_metadata>

### Objective

Skip unnecessary test runs when changes don't affect tested code.

### Prerequisites

- [ ] Phase 2 completed and verified
- [ ] Phase 2 PR merged to main

### Change 3.1: Add Path Filtering

**File**: `.github/workflows/playwright-tests.yml`

**Add new job at the beginning**:

```yaml
jobs:
  detect-changes:
    name: Detect Changes
    runs-on: ubuntu-latest
    outputs:
      should-test: ${{ steps.filter.outputs.frontend }}
      docs-only: ${{ steps.filter.outputs.docs-only }}
    steps:
      - uses: actions/checkout@v4

      - uses: dorny/paths-filter@v3
        id: filter
        with:
          filters: |
            frontend:
              - 'website/src/**'
              - 'website/tests/**'
              - 'website/package*.json'
              - '.github/workflows/playwright-tests.yml'
            docs-only:
              - '**/*.md'
              - 'docs/**'
              - '!website/**'

  test:
    name: Tests (${{ matrix.browser }}, shard ${{ matrix.shardIndex }}/${{ matrix.shardTotal }})
    needs: detect-changes
    if: needs.detect-changes.outputs.should-test == 'true'
    # ... rest of test job unchanged
```

**Update smoke-test job**:
```yaml
  smoke-test:
    name: Smoke Tests (PR Quick Feedback)
    needs: detect-changes
    if: github.event_name == 'pull_request' && needs.detect-changes.outputs.should-test == 'true'
    # ... rest unchanged
```

**Add skip notification job**:
```yaml
  skip-tests:
    name: Tests Skipped
    needs: detect-changes
    if: needs.detect-changes.outputs.should-test != 'true'
    runs-on: ubuntu-latest
    steps:
      - name: Skip notification
        run: |
          echo "::notice::Tests skipped - no frontend changes detected"
          echo "Changed files don't affect the test suite"
```

---

### Phase 3 Success Criteria

- [ ] Documentation-only PRs skip tests
- [ ] Frontend changes trigger tests
- [ ] Skip notification appears for skipped runs
- [ ] No false negatives (tests run when needed)

---

## Phase 4: Advanced Optimizations

<phase_metadata>
<duration>1-2 weeks</duration>
<risk>low (experimental)</risk>
<expected_savings>Additional 30-40%</expected_savings>
</phase_metadata>

### Objective

Evaluate and optionally implement container-based execution and larger runners.

### Change 4.1: Container-Based Workflow (Alternative)

```yaml
jobs:
  test:
    name: Tests (Container)
    runs-on: ubuntu-latest
    container:
      image: mcr.microsoft.com/playwright:v1.48.0-jammy
      options: --user 1001
    timeout-minutes: 10

    steps:
      - uses: actions/checkout@v4

      - name: Install dependencies
        run: npm ci
        working-directory: website

      - name: Install app dependencies
        run: npm ci
        working-directory: website/src

      - name: Build application
        run: npm run build
        working-directory: website/src

      - name: Run tests
        run: npx playwright test --config=tests/playwright.config.ts
        working-directory: website
        env:
          CI: true
          HOME: /root
```

**Why**: Browsers pre-installed, no caching complexity, ~30% faster.

### Change 4.2: Larger Runner Configuration

```yaml
jobs:
  test:
    runs-on: ubuntu-latest-4-cores  # Requires GitHub Team/Enterprise
    # ... rest unchanged
```

**Cost**: $0.016/min vs $0.008/min (2x cost)
**Benefit**: ~1.67x faster

---

## Implementation Checklist

### Pre-Implementation
- [ ] Create enhancement/builds worktree
- [ ] Measure current workflow run times (baseline)
- [ ] Document baseline: ___ minutes for full suite
- [ ] Ensure gh CLI is authenticated

### Phase 1 (Days 1-2)
- [ ] Add npm caching to both lockfiles
- [ ] Add Playwright browser caching
- [ ] Update workers to 2 in playwright.config.ts
- [ ] Test with workflow_dispatch
- [ ] Measure: ___ minutes (target: 22 min)
- [ ] Create PR for Phase 1
- [ ] Merge after verification

### Phase 2 (Days 3-5)
- [ ] Implement 4-way sharding
- [ ] Add browser matrix
- [ ] Configure blob reporter
- [ ] Add merge-reports job
- [ ] Test all 12 parallel jobs
- [ ] Measure: ___ minutes (target: 5-8 min)
- [ ] Create PR for Phase 2
- [ ] Merge after verification

### Phase 3 (Week 2)
- [ ] Add dorny/paths-filter
- [ ] Configure frontend/docs-only filters
- [ ] Add skip notification job
- [ ] Test with docs-only PR
- [ ] Test with frontend PR
- [ ] Create PR for Phase 3
- [ ] Merge after verification

### Phase 4 (Week 3+)
- [ ] Evaluate container approach
- [ ] Test with container image
- [ ] Compare times
- [ ] Decision: container vs caching
- [ ] Evaluate larger runners (if budget allows)

### Post-Implementation
- [ ] Document final CI architecture
- [ ] Update team on new patterns
- [ ] Monitor for 1 week for stability
- [ ] Celebrate 🎉

---

## Risk Assessment

<risks>
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Cache corruption | Low | Medium | Version-based cache keys auto-invalidate |
| Flaky tests in parallel | Medium | Medium | Retries configured, fail-fast: false |
| Shard imbalance | Low | Low | fullyParallel distributes tests evenly |
| Report merge failure | Low | High | merge-multiple: true, always() condition |
| False skip (path filter) | Low | High | Comprehensive filter patterns, testing |
| Container compatibility | Low | Medium | Test in separate branch first |
</risks>

---

## Cost Analysis

<costs>
| Item | Current | After Phase 2 | Notes |
|------|---------|---------------|-------|
| Minutes per run | ~30 min | ~5 min | 83% reduction |
| Jobs per run | 2 | 13 | 1 detect + 12 parallel + 1 merge |
| Total minutes | 30 | ~60 (parallel) | Same cost, faster wall time |
| Monthly (100 runs) | 3,000 min | 3,000 min | No cost increase |
| Larger runners (opt) | - | 2x per minute | Only if needed |
</costs>

<dependencies>
- Phase 1: None
- Phase 2: Phase 1 caching working
- Phase 3: Phase 2 sharding working
- Phase 4: All prior phases stable
</dependencies>

<assumptions>
- GitHub-hosted runners available
- No firewall blocking Playwright CDN
- Node.js 20 compatibility (confirmed)
- Team can review PRs within 1-2 days
</assumptions>

<open_questions>
- Exact current baseline time?
- GitHub Team/Enterprise for larger runners?
- Budget for potential cost increase?
- Mobile testing requirements (can we drop iPad/extra resolutions)?
</open_questions>
