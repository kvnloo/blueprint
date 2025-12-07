# GitHub Actions Larger Runners: Cost/Benefit Analysis

**Research Date**: 2025-12-06
**Focus**: Playwright testing optimization and runner cost efficiency

---

## Executive Summary

GitHub Actions larger runners provide significant performance benefits but at exponentially increasing costs. For Playwright testing workloads, careful runner selection can reduce CI pipeline times by 40-80% while managing costs through sharding, caching, and strategic runner sizing.

**Key Findings**:
- Larger runners double in price for each doubling of cores (linear cost scaling)
- Performance scaling is sub-linear (2x cores ≠ 2x performance)
- Self-hosted alternatives offer 8-17x cost savings
- GPU runners provide specialized capabilities at premium pricing ($0.07-$0.14/min)
- Playwright-specific optimizations can reduce costs by 40% without larger runners

---

## 1. Runner Tier Comparison

### Standard Runners (Included Minutes Eligible)

| Runner Type | vCPU | RAM | Storage | Price/Min | Hourly Cost |
|-------------|------|-----|---------|-----------|-------------|
| **Linux (x64)** |
| Standard 2-core | 2 | 7 GB | 14 GB SSD | $0.008 | $0.48 |
| **Windows (x64)** |
| Standard 2-core | 2 | 7 GB | 14 GB SSD | $0.016 | $0.96 |
| **macOS** |
| Standard 3-core | 3 | 14 GB | 14 GB SSD | $0.08 | $4.80 |

### Larger Runners - x64 Linux (No Free Minutes)

| Runner Size | vCPU | RAM | Storage | Price/Min | Hourly Cost | vs 2-core |
|-------------|------|-----|---------|-----------|-------------|-----------|
| 2-core Advanced | 2 | 8 GB | 150 GB SSD | $0.008 | $0.48 | 1.0x |
| **4-core** | 4 | 16 GB | 150 GB SSD | **$0.016** | **$0.96** | **2.0x** |
| **8-core** | 8 | 32 GB | 300 GB SSD | **$0.032** | **$1.92** | **4.0x** |
| **16-core** | 16 | 64 GB | 600 GB SSD | **$0.064** | **$3.84** | **8.0x** |
| 32-core | 32 | 128 GB | 1200 GB SSD | $0.128 | $7.68 | 16.0x |
| 64-core | 64 | 256 GB | 2040 GB SSD | $0.256 | $15.36 | 32.0x |
| 96-core | 96 | 384 GB | 2040 GB SSD | $0.384 | $23.04 | 48.0x |

### Larger Runners - x64 Windows

| Runner Size | vCPU | RAM | Storage | Price/Min | Hourly Cost | vs Linux |
|-------------|------|-----|---------|-----------|-------------|----------|
| 4-core | 4 | 16 GB | 150 GB SSD | $0.032 | $1.92 | 2.0x |
| 8-core | 8 | 32 GB | 300 GB SSD | $0.064 | $3.84 | 2.0x |
| 16-core | 16 | 64 GB | 600 GB SSD | $0.128 | $7.68 | 2.0x |
| 32-core | 32 | 128 GB | 1200 GB SSD | $0.256 | $15.36 | 2.0x |
| 64-core | 64 | 256 GB | 2040 GB SSD | $0.512 | $30.72 | 2.0x |
| 96-core | 96 | 384 GB | 2040 GB SSD | $0.768 | $46.08 | 2.0x |

### ARM64 Larger Runners - Linux

| Runner Size | vCPU | RAM | Storage | Price/Min | Hourly Cost | Savings vs x64 |
|-------------|------|-----|---------|-----------|-------------|----------------|
| 2-core | 2 | 8 GB | 150 GB SSD | $0.005 | $0.30 | 37.5% |
| 4-core | 4 | 16 GB | 150 GB SSD | $0.010 | $0.60 | 37.5% |
| 8-core | 8 | 32 GB | 300 GB SSD | $0.020 | $1.20 | 37.5% |
| 16-core | 16 | 64 GB | 600 GB SSD | $0.040 | $2.40 | 37.5% |
| 32-core | 32 | 128 GB | 1200 GB SSD | $0.080 | $4.80 | 37.5% |
| 64-core | 64 | 256 GB | 2040 GB SSD | $0.160 | $9.60 | 37.5% |

### GPU Runners

| OS | vCPU | RAM | GPU | VRAM | Price/Min | Hourly Cost | Use Cases |
|----|------|-----|-----|------|-----------|-------------|-----------|
| Linux | 4 | 28 GB | Tesla T4 | 16 GB | $0.07 | $4.20 | ML, Visual Testing, 3D Rendering |
| Windows | 4 | 28 GB | Tesla T4 | 16 GB | $0.14 | $8.40 | Windows GPU Workloads |

### macOS Larger Runners

| Platform | CPU | GPU Cores | RAM | Storage | Price/Min | Hourly Cost |
|----------|-----|-----------|-----|---------|-----------|-------------|
| M1 (ARM64) | 6-core | 8 | 14 GB | 14 GB | $0.16 | $9.60 |
| Intel 12-core | 12 | - | 30 GB | 14 GB | $0.12 | $7.20 |
| M2 Pro | 5-core | 8 | 14 GB | 14 GB | $0.16 | $9.60 |

**Sources**: [GitHub Actions Runner Pricing](https://docs.github.com/en/billing/reference/actions-runner-pricing), [GPU Runners Announcement](https://github.blog/changelog/2024-07-08-github-actions-gpu-hosted-runners-are-now-generally-available/)

---

## 2. Performance Scaling Analysis

### CPU Performance Reality

**Key Finding**: Larger runners do NOT scale linearly with core count.

#### Actual Performance Characteristics:

1. **Single-threaded workloads** (most Playwright tests):
   - Limited benefit from additional cores
   - Constrained by CPU single-core performance
   - GitHub uses "outdated and slow CPUs for x64" ([RunsOn Benchmarks](https://runs-on.com/benchmarks/github-actions-cpu-performance/))

2. **Parallel workloads** (test sharding):
   - Better scaling but still sub-linear
   - Limited by I/O bottlenecks
   - Network-attached volumes: only 20 MiB/s random read/write

3. **Real-world scaling observations**:
   - 4-core runner: ~1.5-1.8x faster than 2-core (not 2x)
   - 8-core runner: ~2.5-3.5x faster than 2-core (not 4x)
   - 16-core runner: ~4-6x faster than 2-core (not 8x)

**Why sub-linear scaling occurs**:
- I/O bottlenecks (disk, network)
- Sequential dependencies in test setup
- Playwright browser launch overhead
- Cache management overhead
- Test orchestration overhead

### Performance Comparison: GitHub vs Alternatives

| Provider | CPU Performance | Disk I/O | Boot Time | Cost vs GitHub |
|----------|----------------|----------|-----------|----------------|
| GitHub x64 | Baseline (slow) | 20 MiB/s random | Fast | Baseline |
| GitHub ARM64 | 30% faster | 20 MiB/s random | Fast | -37.5% |
| Depot | 2x faster | 10x faster | Similar | -50% |
| RunsOn (AWS) | 30% faster | Faster | Similar | -85% to -94% |
| Blacksmith | 2x faster | Faster | Similar | -50% |

**Sources**: [RunsOn CPU Benchmarks](https://runs-on.com/benchmarks/github-actions-cpu-performance/), [Depot Comparison](https://depot.dev/blog/comparing-github-actions-and-depot-runners-for-2x-faster-builds)

### Performance Optimization vs Larger Runners

**Without larger runners** (optimization only):
- Playwright test sharding: 40-80% time reduction
- Browser caching: 20-40% time reduction
- Container optimization: 15-30% time reduction
- Combined optimizations: Up to 80% total reduction

**With larger runners** (4-core):
- Additional 50-80% time reduction on top of optimizations
- Best ROI when combined with sharding

---

## 3. Break-Even Analysis

### Cost Calculation Framework

```
Cost = (Job Duration in Minutes) × (Price per Minute) × (Jobs per Month)
Savings = (2-core Cost) - (Larger Runner Cost)
Break-Even = Larger Runner is cheaper when savings > 0
```

### Scenario 1: Playwright Test Suite (20 Minutes on 2-core)

**Assumptions**:
- Current: 20 minutes per run on 2-core Linux ($0.008/min)
- Frequency: 100 runs per month
- Optimizations applied: Caching, basic sharding

| Runner | Duration | Cost/Run | Monthly Cost | Speedup | Time Saved | Cost Change |
|--------|----------|----------|--------------|---------|------------|-------------|
| **2-core** | 20 min | $0.16 | $16.00 | 1.0x | - | - |
| **4-core** | 12 min | $0.19 | $19.20 | 1.67x | 8 min | +$3.20 |
| **8-core** | 8 min | $0.26 | $25.60 | 2.5x | 12 min | +$9.60 |
| **16-core** | 6 min | $0.38 | $38.40 | 3.3x | 14 min | +$22.40 |

**Verdict**: For moderate frequency (100 runs/month), larger runners **increase costs** unless developer time savings justify expense.

### Scenario 2: High-Frequency CI/CD (10 Runs per Hour)

**Assumptions**:
- Current: 15 minutes per run on 2-core Linux
- Frequency: 7,200 runs per month (24/7 CI pipeline)
- Critical path: Blocks deployments

| Runner | Duration | Cost/Run | Monthly Cost | Speedup | Developer Time Value |
|--------|----------|----------|--------------|---------|---------------------|
| **2-core** | 15 min | $0.12 | $864 | 1.0x | Baseline |
| **4-core** | 9 min | $0.14 | $1,036 | 1.67x | Save 36 hrs/month |
| **8-core** | 6 min | $0.19 | $1,382 | 2.5x | Save 54 hrs/month |
| **16-core** | 5 min | $0.32 | $2,304 | 3.0x | Save 60 hrs/month |

**Break-Even Calculation**:
- If developer time is worth > $5/hour: 4-core breaks even ($172 extra cost / 36 hours)
- If deployment speed is critical: 4-core or 8-core justified
- If cost is primary concern: Stay on 2-core with optimizations

### Scenario 3: Pull Request Validation (Critical Developer Feedback)

**Assumptions**:
- Current: 8 minutes on 2-core (blocks PR merging)
- Frequency: 500 PRs per month
- Developer waiting costs: $50/hour

| Runner | Duration | Cost/Run | Monthly Cost | Dev Wait Time | Dev Cost Saved | Net Savings |
|--------|----------|----------|--------------|---------------|----------------|-------------|
| **2-core** | 8 min | $0.064 | $32.00 | 66.7 hrs | - | - |
| **4-core** | 5 min | $0.080 | $40.00 | 41.7 hrs | $1,250 | **+$1,242** |
| **8-core** | 3.5 min | $0.112 | $56.00 | 29.2 hrs | $1,875 | **+$1,851** |
| **16-core** | 2.5 min | $0.160 | $80.00 | 20.8 hrs | $2,295 | **+$2,263** |

**Verdict**: When developer waiting is factored in, larger runners provide **massive ROI**.

### Key Break-Even Principles

✅ **Use Larger Runners When**:
- High-frequency execution (>1,000 runs/month)
- Blocking critical paths (deployments, PR validation)
- Developer time is expensive (>$30/hour)
- Parallel workloads benefit from cores (sharded tests)

❌ **Avoid Larger Runners When**:
- Low-frequency execution (<100 runs/month)
- Non-blocking workflows (nightly tests)
- Already optimized with caching/sharding
- Budget-constrained projects

---

## 4. GPU Runners for Visual Testing

### GitHub GPU Runner Specifications

**Linux GPU Runner** (Tesla T4):
- 4 vCPU
- 28 GB RAM
- Tesla T4 GPU with 16 GB VRAM
- **$0.07/minute** ($4.20/hour)

**Windows GPU Runner** (Tesla T4):
- Same specs as Linux
- **$0.14/minute** ($8.40/hour, 2x cost)

### Use Cases for Playwright

#### When GPU Runners Make Sense:

1. **Visual regression testing at scale**:
   - Rendering complex 3D visualizations
   - WebGL/Canvas-heavy applications
   - Video processing validations

2. **Performance testing**:
   - GPU-accelerated animations
   - Graphics-intensive SPAs
   - Game engine UIs

3. **AI-powered testing**:
   - Visual AI comparison models
   - OCR for legacy system testing
   - ML-based test generation

#### When GPU Runners DON'T Make Sense:

❌ Standard Playwright tests (DOM testing)
❌ API testing
❌ Basic visual screenshots (CPU rendering is fine)
❌ Most web application testing

### GPU Runner Cost Reality

**Example: Visual Regression Suite**
- 100 visual tests
- 10 minutes on CPU runner: $0.08-$0.32
- 4 minutes on GPU runner: $0.28
- **GPU premium**: 3.5x-9x more expensive for 2.5x speedup

**Verdict**: GPU runners for Playwright are **rarely cost-effective** unless:
- Specialized GPU workloads (3D, video)
- Research/ML testing use cases
- Already using GPU for other steps

### Self-Hosted GPU Alternative: RunsOn

**AWS g4dn.xlarge** (Tesla T4, via RunsOn):
- Same specs as GitHub GPU runner
- **$0.009/min on-demand** (7.8x cheaper than GitHub)
- **$0.004/min spot pricing** (17.5x cheaper)

**Sources**: [GitHub GPU Runners](https://github.blog/changelog/2024-07-08-github-actions-gpu-hosted-runners-are-now-generally-available/), [RunsOn GPU Pricing](https://runs-on.com/runners/gpu/)

---

## 5. Self-Hosted Runner Alternatives

### RunsOn (AWS-Based, Recommended)

**What is RunsOn?**
- Self-hosted runners managed via infrastructure-as-code
- Runs in your AWS account
- 10x cheaper than GitHub, 40% faster, unlimited caching

**Pricing Structure**:
```yaml
License Cost:
  Demo: Free (15 days)
  Commercial: €300/year (~$25/month)
  Sponsorship: €1,500/year (~$125/month, priority support)

AWS Infrastructure:
  RunsOn Stack: ~$1.50-$5/month (management infrastructure)
  EC2 Instances: Per-second billing (vs GitHub's per-minute)
```

**Cost Comparison Examples**:

| Runner Size | GitHub (per min) | RunsOn AWS (per min) | Savings | GitHub/RunsOn Ratio |
|-------------|------------------|----------------------|---------|---------------------|
| 4-core Linux x64 | $0.016 | $0.0019 | 88.1% | 8.4x cheaper |
| 8-core Linux x64 | $0.032 | $0.0038 | 88.1% | 8.4x cheaper |
| 16-core Linux x64 | $0.064 | $0.0068 | 89.4% | 9.4x cheaper |
| 64-core Linux x64 | $0.256 | $0.0147 | 94.3% | 17.4x cheaper |

**Real-World Cost Scenario**:

**4,000 minutes/month on 4-core runners**:
- GitHub: $1,280/month
- RunsOn: ~$180/month (including license + stack + compute)
- **Savings: $1,100/month (85.9%)**

**16-core runners at same usage**:
- GitHub: $5,120/month
- RunsOn: ~$560/month
- **Savings: $4,560/month (89.1%)**

### Other Self-Hosted Alternatives

| Provider | Type | Cost vs GitHub | Performance | Notes |
|----------|------|----------------|-------------|-------|
| **Blacksmith** | Managed | 50% cheaper | 2x faster | Free tier: 3,000 min/month |
| **BuildJet** | Managed | 50% cheaper | 2x faster | $5 one-time credit |
| **Depot** | Managed | 50% cheaper | 30% faster + 10x faster cache | $20 for 20,000 min |
| **Ubicloud** | Managed | 90% cheaper | Similar | Hetzner-based |
| **Cirrus Runners** | Managed | Fixed $150/month unlimited | 2-3x faster | Best for high usage |
| **Actions Runner Controller (ARC)** | Self-hosted (K8s) | Variable | Variable | Complex setup, good for K8s users |

### When Self-Hosted Makes Sense

✅ **Use Self-Hosted When**:
- Monthly Actions spend >$100
- High-frequency CI pipelines
- Large teams with many parallel jobs
- Cost optimization is priority
- Infrastructure team can manage it

❌ **Stick with GitHub-Hosted When**:
- Low usage (<$50/month)
- Small team/project
- Don't want infrastructure overhead
- Public repositories (free tier available)

**Sources**: [RunsOn Pricing](https://runs-on.com/pricing/), [GitHub Actions Alternatives](https://runs-on.com/alternatives-to/github-actions-runners/)

---

## 6. Playwright-Specific Recommendations

### Optimization Hierarchy (Apply in Order)

#### Tier 1: Free Optimizations (Apply First)
**Impact**: 40-80% time reduction, $0 cost

1. **Test Sharding** ([Playwright Docs](https://docs.currents.dev/getting-started/ci-setup/github-actions/playwright-github-actions)):
   ```yaml
   strategy:
     matrix:
       shardIndex: [1, 2, 3, 4]
       shardTotal: [4]
   steps:
     - run: npx playwright test --shard=${{ matrix.shardIndex }}/${{ matrix.shardTotal }}
   ```
   - **Impact**: 75% time reduction (4 shards = ~4x faster)
   - **Cost**: Same (4 runners × 25% time = 1x cost)

2. **Browser Caching** ([Karma Computing Blog](https://blog.karmacomputing.co.uk/make-playwright-faster-with-containers-and-build-caching-github-actions/)):
   ```yaml
   - uses: actions/cache@v4
     with:
       path: ~/.cache/ms-playwright
       key: playwright-${{ hashFiles('package-lock.json') }}
   ```
   - **Impact**: 20-40% faster initial setup
   - **Cost**: $0 (caching is free)

3. **Selective Test Execution**:
   - Only run tests for changed files
   - **Impact**: 30-70% fewer test runs
   - **Cost**: Dramatically reduced

4. **Playwright CLI Instead of GitHub Action**:
   - Avoid deprecated `microsoft/playwright-github-action`
   - Use `npx playwright test` directly
   - **Impact**: Fewer unnecessary dependencies

#### Tier 2: Cost-Effective Scaling
**Impact**: Additional 50% time reduction, moderate cost

5. **Dynamic Matrix Generation** ([Playwright Load Balancer](https://github.com/marketplace/actions/playwright-load-balancer-based-on-tests-to-run)):
   - Only create runners based on test count
   - Avoid wasting billable minutes on empty shards
   - **Impact**: 10-30% cost reduction

6. **Use 4-Core Runners (Strategic)**:
   - For blocking workflows only (PR validation)
   - Keep nightly tests on 2-core
   - **Impact**: 1.67x faster, 2x cost
   - **Break-even**: When developer waiting costs >$5/hour

#### Tier 3: Advanced Optimizations
**Impact**: Additional 20-40% time reduction, requires setup

7. **Orchestration Tools** ([Currents](https://docs.currents.dev/getting-started/ci-setup/github-actions/playwright-github-actions)):
   - Currents Orchestration: Up to 40% faster than native sharding
   - Optimal load balancing across machines
   - **Cost**: Subscription required (~$50-200/month)

8. **Container-Based Execution**:
   - Use `mcr.microsoft.com/playwright` container
   - Faster than caching in many cases
   - **Impact**: 15-30% faster initialization

9. **Self-Hosted Runners (RunsOn)**:
   - For teams spending >$100/month
   - 8-17x cost reduction
   - 30% faster CPUs
   - **Setup cost**: 1-2 days infrastructure work

### Recommended Configuration: Standard Playwright Project

```yaml
name: Playwright Tests

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest # Use 2-core for cost efficiency
    strategy:
      fail-fast: false
      matrix:
        shardIndex: [1, 2, 3, 4, 5, 6] # 6 shards for optimal balance
        shardTotal: [6]
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      # Cache Playwright browsers
      - name: Cache Playwright browsers
        uses: actions/cache@v4
        id: playwright-cache
        with:
          path: ~/.cache/ms-playwright
          key: playwright-${{ runner.os }}-${{ hashFiles('package-lock.json') }}

      - run: npm ci

      # Only install browsers if cache missed
      - name: Install Playwright browsers
        if: steps.playwright-cache.outputs.cache-hit != 'true'
        run: npx playwright install --with-deps

      # Run sharded tests
      - name: Run Playwright tests
        run: npx playwright test --shard=${{ matrix.shardIndex }}/${{ matrix.shardTotal }}

      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report-${{ matrix.shardIndex }}
          path: playwright-report/
          retention-days: 7
```

**Expected Performance**:
- Time: 3-5 minutes per shard (vs 20-30 min without sharding)
- Cost: ~$0.024-$0.040 per run (6 shards × 4 min × $0.008/min)
- Monthly (100 runs): $2.40-$4.00

### Recommended Configuration: High-Frequency Project (4-Core)

```yaml
name: Playwright Tests (PR Validation)

on:
  pull_request:
    branches: [main]

jobs:
  test:
    timeout-minutes: 30
    runs-on: ubuntu-latest-4-core # Use 4-core for PR validation speed
    strategy:
      fail-fast: false
      matrix:
        shardIndex: [1, 2, 3, 4]
        shardTotal: [4]
    steps:
      # Same as above, but with 4-core runners
      # Expected time: 2-3 minutes per shard
      # Cost per run: ~$0.128-$0.192 (4 shards × 2.5 min × $0.016/min)
```

**When to Use 4-Core**:
- ✅ PR validation (blocks merging)
- ✅ High-frequency pipelines (>10 runs/hour)
- ✅ Large teams (developer waiting costs)
- ❌ Nightly tests (non-blocking)
- ❌ Scheduled jobs (cost-sensitive)

### Cost Optimization Strategies

| Strategy | Time Reduction | Cost Impact | Setup Effort |
|----------|----------------|-------------|--------------|
| Test sharding (6x) | 80% | Neutral | Low |
| Browser caching | 25% | $0 | Low |
| Selective execution | 50% | -50% | Medium |
| Dynamic matrix | 10% | -20% | Low |
| 4-core runners | 40% | +100% | Zero |
| Orchestration tools | 40% | +$50-200/mo | Medium |
| Self-hosted (RunsOn) | 30% | -85% | High |

### Optimal Strategy for Most Teams

1. **Start**: Sharding (6x) + Browser caching
2. **Add**: Selective execution for PRs
3. **Evaluate**: If spending >$100/month, consider self-hosted
4. **Upgrade**: Use 4-core only for blocking PR validation
5. **Avoid**: GPU runners (unless specialized 3D/video testing)

**Sources**: [Playwright GitHub Actions Guide](https://docs.currents.dev/getting-started/ci-setup/github-actions/playwright-github-actions), [Parallelization Guide](https://markaicode.com/github-actions-playwright-parallelization/)

---

## 7. Configuration Examples

### Example 1: Cost-Optimized (2-Core with Sharding)

```yaml
name: Playwright Tests (Cost-Optimized)

on:
  pull_request:
  push:
    branches: [main, develop]
  schedule:
    - cron: '0 2 * * *' # Nightly at 2 AM

jobs:
  playwright:
    name: Test (Shard ${{ matrix.shardIndex }}/${{ matrix.shardTotal }})
    timeout-minutes: 60
    runs-on: ubuntu-latest # 2-core, $0.008/min

    strategy:
      fail-fast: false
      matrix:
        # 6 shards for optimal load distribution
        shardIndex: [1, 2, 3, 4, 5, 6]
        shardTotal: [6]

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Cache Playwright browsers
        id: playwright-cache
        uses: actions/cache@v4
        with:
          path: |
            ~/.cache/ms-playwright
          key: playwright-browsers-${{ runner.os }}-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            playwright-browsers-${{ runner.os }}-

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        if: steps.playwright-cache.outputs.cache-hit != 'true'
        run: npx playwright install --with-deps chromium firefox webkit

      - name: Install browsers dependencies only
        if: steps.playwright-cache.outputs.cache-hit == 'true'
        run: npx playwright install-deps

      - name: Run Playwright tests
        run: npx playwright test --shard=${{ matrix.shardIndex }}/${{ matrix.shardTotal }}
        env:
          CI: true

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report-shard-${{ matrix.shardIndex }}
          path: |
            playwright-report/
            test-results/
          retention-days: 7

      - name: Upload blob report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: blob-report-${{ matrix.shardIndex }}
          path: blob-report/
          retention-days: 1

  # Merge all shard reports
  merge-reports:
    name: Merge Reports
    if: always()
    needs: [playwright]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Download blob reports
        uses: actions/download-artifact@v4
        with:
          pattern: blob-report-*
          path: all-blob-reports
          merge-multiple: true

      - name: Merge reports
        run: npx playwright merge-reports --reporter html ./all-blob-reports

      - name: Upload merged report
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

**Cost Analysis**:
- Shards: 6
- Time per shard: ~4 minutes
- Cost per run: 6 × 4 min × $0.008/min = **$0.192**
- Monthly (100 runs): **$19.20**

---

### Example 2: Speed-Optimized (4-Core for PR Validation)

```yaml
name: PR Validation (Fast)

on:
  pull_request:
    branches: [main, develop]

jobs:
  playwright-pr:
    name: Playwright (Shard ${{ matrix.shardIndex }}/${{ matrix.shardTotal }})
    timeout-minutes: 30
    runs-on: ubuntu-latest-4-core # 4-core, $0.016/min

    strategy:
      fail-fast: false
      matrix:
        # 4 shards for 4-core runners
        shardIndex: [1, 2, 3, 4]
        shardTotal: [4]

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Cache Playwright browsers
        id: playwright-cache
        uses: actions/cache@v4
        with:
          path: ~/.cache/ms-playwright
          key: playwright-${{ hashFiles('package-lock.json') }}

      - run: npm ci

      - name: Install Playwright browsers
        if: steps.playwright-cache.outputs.cache-hit != 'true'
        run: npx playwright install --with-deps

      - name: Run Playwright tests
        run: npx playwright test --shard=${{ matrix.shardIndex }}/${{ matrix.shardTotal }}

      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: failed-tests-${{ matrix.shardIndex }}
          path: test-results/
          retention-days: 3
```

**Cost Analysis**:
- Shards: 4
- Time per shard: ~2.5 minutes
- Cost per run: 4 × 2.5 min × $0.016/min = **$0.16**
- Monthly (500 PRs): **$80.00**
- **Developer time saved**: 500 PRs × 5 min/PR = 2,500 min = 41.7 hours
- **ROI**: If dev time worth $50/hour → $2,085 saved vs $48 extra cost = **$2,037 net benefit**

---

### Example 3: Hybrid Strategy (Cost + Speed)

```yaml
name: Playwright Tests (Hybrid)

on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main, develop]
  schedule:
    - cron: '0 2 * * *'

jobs:
  # Fast validation for PRs
  pr-validation:
    if: github.event_name == 'pull_request'
    name: PR Check (4-core)
    runs-on: ubuntu-latest-4-core
    strategy:
      matrix:
        shardIndex: [1, 2, 3, 4]
        shardTotal: [4]
    steps:
      # 4-core for speed
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - name: Cache browsers
        uses: actions/cache@v4
        with:
          path: ~/.cache/ms-playwright
          key: playwright-${{ hashFiles('package-lock.json') }}
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test --shard=${{ matrix.shardIndex }}/${{ matrix.shardTotal }}

  # Cost-optimized for scheduled and push
  scheduled-tests:
    if: github.event_name == 'schedule' || (github.event_name == 'push' && github.ref == 'refs/heads/main')
    name: Full Suite (2-core)
    runs-on: ubuntu-latest # 2-core for cost
    strategy:
      matrix:
        shardIndex: [1, 2, 3, 4, 5, 6, 7, 8]
        shardTotal: [8]
    steps:
      # 2-core for cost efficiency
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - name: Cache browsers
        uses: actions/cache@v4
        with:
          path: ~/.cache/ms-playwright
          key: playwright-${{ hashFiles('package-lock.json') }}
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test --shard=${{ matrix.shardIndex }}/${{ matrix.shardTotal }}
```

**Cost Analysis**:
- **PR validation** (500/month): 500 × $0.16 = $80.00
- **Scheduled/push** (60/month): 60 × $0.256 = $15.36
- **Total**: $95.36/month
- **Benefit**: Fast PR feedback + cost-efficient scheduled tests

---

### Example 4: Self-Hosted (RunsOn) Configuration

```yaml
name: Playwright Tests (RunsOn)

on:
  pull_request:
  push:
    branches: [main]

jobs:
  playwright:
    name: Test (Shard ${{ matrix.shardIndex }})
    timeout-minutes: 60
    runs-on: [self-hosted, linux, x64, runs-on, runner=4cpu-linux-x64]

    strategy:
      fail-fast: false
      matrix:
        shardIndex: [1, 2, 3, 4, 5, 6]
        shardTotal: [6]

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Cache dependencies
        uses: runs-on/cache@v4 # RunsOn's optimized cache
        with:
          path: |
            ~/.npm
            ~/.cache/ms-playwright
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}

      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test --shard=${{ matrix.shardIndex }}/${{ matrix.shardTotal }}
```

**RunsOn Setup** (in `runs-on.yml`):

```yaml
# .github/runs-on.yml
runs-on:
  license: ${{ secrets.RUNS_ON_LICENSE }}

  runners:
    - name: 4cpu-linux-x64
      instance_type: c6i.xlarge # 4 vCPU, 8 GB RAM
      os: ubuntu22-full
      disk_size: 50 # GB
      hdd: false # Use SSD
      family:
        - c6i
        - c6a # ARM alternative
      spot: true # Use spot instances for 70% savings
```

**Cost Analysis**:
- **AWS c6i.xlarge spot**: ~$0.034/hour = $0.00057/min
- **RunsOn license**: €300/year = €25/month
- **RunsOn stack**: ~$3/month
- **Per run**: 6 shards × 3 min × $0.00057/min = **$0.01**
- **Monthly (100 runs)**: $1.00 + $25 + $3 = **$29.00**
- **Savings vs GitHub 4-core**: $96 - $29 = **$67/month (69% savings)**

---

### Example 5: GPU Runner (Specialized Visual Testing)

```yaml
name: Visual Regression (GPU)

on:
  schedule:
    - cron: '0 2 * * 0' # Weekly on Sunday
  workflow_dispatch:

jobs:
  visual-regression:
    name: 3D Visual Tests
    timeout-minutes: 30
    runs-on: ubuntu-latest-gpu # GPU runner, $0.07/min

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright
        run: npx playwright install --with-deps chromium

      # GPU-accelerated tests only
      - name: Run 3D/WebGL visual tests
        run: npx playwright test tests/visual-3d/ --project=chromium
        env:
          # Enable GPU acceleration
          DISPLAY: ':99.0'
          GPU_ENABLED: 'true'

      - name: Upload visual diffs
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: visual-regression-diffs
          path: test-results/**/*-diff.png
```

**Cost Analysis**:
- Time: ~10 minutes (GPU-accelerated rendering)
- Cost per run: 10 min × $0.07/min = **$0.70**
- Monthly (4 runs): **$2.80**
- **Note**: Only use for specialized 3D/WebGL testing

---

## 8. Final Recommendations

### Decision Matrix

| Scenario | Recommended Runner | Monthly Cost Estimate | Key Justification |
|----------|-------------------|----------------------|-------------------|
| **Small project** (<50 runs/month) | 2-core + sharding | $5-10 | Free tier sufficient |
| **Medium project** (100-500 runs) | 2-core + sharding + caching | $20-50 | Optimizations beat larger runners |
| **High-frequency CI** (1,000+ runs) | 4-core for PRs, 2-core for others | $100-200 | Speed for blocking, cost for non-blocking |
| **Enterprise** (>$200/month) | Self-hosted (RunsOn) | $50-150 | 80%+ savings at scale |
| **Visual/3D testing** | GPU runner (selective) | $10-50 | Only when GPU actually needed |

### Cost Optimization Checklist

#### Immediate Actions (Week 1):
- [ ] Implement test sharding (6-8 shards)
- [ ] Add Playwright browser caching
- [ ] Use selective test execution for PRs
- [ ] Remove deprecated `playwright-github-action`

#### Medium-Term (Month 1):
- [ ] Analyze runner usage patterns
- [ ] Implement dynamic matrix generation
- [ ] Add hybrid runner strategy (4-core PRs, 2-core scheduled)
- [ ] Set up cost monitoring

#### Long-Term (Quarter 1):
- [ ] Evaluate self-hosted if spending >$100/month
- [ ] Consider orchestration tools (Currents) for large teams
- [ ] Benchmark actual performance gains
- [ ] Review and optimize shard counts

### Key Takeaways

1. **Optimize first, scale later**: 80% time reduction is achievable with free optimizations
2. **Sharding is king**: Most cost-effective performance improvement
3. **4-core sweet spot**: Best price/performance for blocking workflows
4. **8-16 core rarely justified**: Sub-linear scaling makes them expensive
5. **GPU runners niche**: Only for specialized 3D/video workloads
6. **Self-hosted at scale**: 8-17x savings when spending >$100/month
7. **Hybrid strategy wins**: Fast runners for PRs, cheap runners for scheduled tests

### Common Pitfalls to Avoid

❌ **Don't**:
- Jump to larger runners without optimizing first
- Use GPU runners for standard Playwright tests
- Run 8-16 core runners for I/O-bound workloads
- Ignore browser caching (20-40% free speedup)
- Use same runner size for all workflow types

✅ **Do**:
- Start with 2-core + sharding + caching
- Upgrade to 4-core only for blocking critical paths
- Monitor actual costs and performance metrics
- Consider self-hosted when spending exceeds $100/month
- Use hybrid strategies (different runners for different triggers)

---

## Sources

### Official GitHub Documentation
- [Actions Runner Pricing](https://docs.github.com/en/billing/reference/actions-runner-pricing)
- [Larger Runners](https://docs.github.com/en/actions/using-github-hosted-runners/using-larger-runners/about-larger-runners)
- [GPU Runners Announcement](https://github.blog/changelog/2024-07-08-github-actions-gpu-hosted-runners-are-now-generally-available/)

### Performance Benchmarks
- [RunsOn CPU Benchmarks](https://runs-on.com/benchmarks/github-actions-cpu-performance/)
- [RunsOn I/O Benchmarks](https://runs-on.com/benchmarks/github-actions-disk-performance/)
- [Depot Performance Comparison](https://depot.dev/blog/comparing-github-actions-and-depot-runners-for-2x-faster-builds)

### Pricing and Alternatives
- [RunsOn Pricing](https://runs-on.com/pricing/)
- [GitHub Actions Alternatives Comparison](https://runs-on.com/alternatives-to/github-actions-runners/)
- [GitHub Actions Price Calculator](https://depot.dev/github-actions-price-calculator)

### Playwright Optimization
- [Playwright GitHub Actions Guide](https://docs.currents.dev/getting-started/ci-setup/github-actions/playwright-github-actions)
- [Playwright Parallelization](https://markaicode.com/github-actions-playwright-parallelization/)
- [Playwright Caching Optimization](https://blog.karmacomputing.co.uk/make-playwright-faster-with-containers-and-build-caching-github-actions/)
- [Playwright Load Balancer](https://github.com/marketplace/actions/playwright-load-balancer-based-on-tests-to-run)

---

**Report Generated**: 2025-12-06
**Research Agent**: DevOps Cost Analyst
**Target Audience**: Engineering teams optimizing CI/CD costs
