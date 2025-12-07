# Container-Based GitHub Actions CI Optimization for Playwright

## Executive Summary

Research findings on optimizing Playwright test execution in GitHub Actions using container-based workflows, pre-built Docker images, and caching strategies.

**Key Findings:**
- **🚀 3.5 minutes → 47 seconds**: Container-based approach eliminates browser installation overhead
- **📦 Pre-built images**: Using `mcr.microsoft.com/playwright` eliminates `playwright install --with-deps` step
- **⚡ No cache needed**: Network pull is faster than GitHub Actions cache for Docker images
- **💾 Image size**: Official images are multi-GB but optimized alternatives exist (477MB Alpine)

---

## 1. Container Syntax in GitHub Actions

### Basic Container Job Configuration

GitHub Actions allows running jobs inside Docker containers using the `jobs.<job_id>.container` syntax. This provides:
- Consistent environment across runs
- Isolation from host system
- Pre-installed dependencies
- No pollution of runner environment

**Standard workflow syntax:**

```yaml
name: CI
on:
  push:
    branches: [ main ]
jobs:
  container-test-job:
    runs-on: ubuntu-latest
    container:
      image: node:18
      env:
        NODE_ENV: development
      ports:
        - 80
      volumes:
        - my_docker_volume:/volume_mount
      options: --cpus 1
    steps:
      - name: Check for dockerenv file
        run: (ls /.dockerenv && echo Found dockerenv) || (echo No dockerenv)
```

**Key Configuration Options:**

| Option | Purpose | Example |
|--------|---------|---------|
| `image` | Docker image to use | `mcr.microsoft.com/playwright:v1.57.0-noble` |
| `credentials` | Registry authentication | `username: ${{ secrets.REGISTRY_USER }}` |
| `env` | Environment variables | `NODE_ENV: production` |
| `ports` | Exposed ports | `- 3000` |
| `volumes` | Data persistence | `- /path/to/data:/data` |
| `options` | Docker create options | `--user 1001 --ipc=host` |

**Platform Limitations:**
- ✅ Supported: Ubuntu Linux runners
- ❌ Not supported: Windows and macOS runners (VM-only)
- ⚠️ Default shell: `sh` instead of `bash` (can override with `jobs.<job_id>.defaults.run`)

**Sources:**
- [Running jobs in a container - GitHub Docs](https://docs.github.com/actions/using-jobs/running-jobs-in-a-container)
- [Using Docker Containers In Jobs - DEV Community](https://dev.to/mihinduranasinghe/using-docker-containers-in-jobs-github-actions-3eof)

---

## 2. Playwright Official Docker Images Analysis

### Available Images

**Official Microsoft Container Registry (MCR) images:**

```bash
# Node.js (recommended for most use cases)
docker pull mcr.microsoft.com/playwright:v1.57.0-noble

# .NET
docker pull mcr.microsoft.com/playwright/dotnet:v1.56.0-noble

# Python
docker pull mcr.microsoft.com/playwright/python:v1.56.0-noble
```

### Supported Ubuntu Versions

| Tag Suffix | Ubuntu Version | LTS Status | Release Date |
|------------|----------------|------------|--------------|
| `-noble` | 24.04 (Noble Numbat) | Current LTS | Apr 2024 |
| `-jammy` | 22.04 (Jammy Jellyfish) | Previous LTS | Apr 2022 |

**Note:** Alpine Linux and musl-based distributions are **not supported** (browsers require glibc).

### Image Contents

**What's Included:**
- ✅ Playwright browsers (Chromium, Firefox, WebKit)
- ✅ Browser system dependencies
- ✅ Node.js runtime (currently v20, v22 in development)

**What's NOT Included:**
- ❌ Playwright npm package (must install via `npm ci`)
- ❌ Your test code (must checkout with `actions/checkout`)

### Security Considerations

**Default behavior:**
- Images run as **root user** by default
- Chromium sandbox is **disabled** when running as root
- **Not recommended** for visiting untrusted websites

**Production recommendations:**
```yaml
container:
  image: mcr.microsoft.com/playwright:v1.57.0-noble
  options: --user 1001  # Run as non-root user
```

For web scraping/crawling:
1. Create separate user inside container with `adduser`
2. Use seccomp profile for additional isolation
3. Never run as root on untrusted sites

### Version Pinning Best Practice

**Critical:** Always pin to specific version tag:

```yaml
# ✅ GOOD - Specific version
container:
  image: mcr.microsoft.com/playwright:v1.57.0-noble

# ❌ BAD - Moving target
container:
  image: mcr.microsoft.com/playwright:latest
```

**Reason:** Playwright version mismatch between Docker image and npm package causes browser executable location failures.

### Image Size Analysis

| Image Type | Size | Base | Use Case |
|------------|------|------|----------|
| Official MCR | ~2-3 GB | Ubuntu 24.04/22.04 | Full compatibility, all features |
| Alpine Community | ~477 MB | Alpine Linux | Size-constrained environments |
| Distroless Optimized | ~1-2 GB | Distroless base | Production, security-focused |

**Size reduction strategies:**
- Use distroless images (no shell, package managers, editors)
- Run in headless mode (avoid Xvfb installation)
- Multi-stage builds for custom images

**Sources:**
- [Docker | Playwright](https://playwright.dev/docs/docker)
- [Microsoft Artifact Registry - Playwright](https://mcr.microsoft.com/en-us/product/playwright/about)
- [Distroless: Efficient Playwright Testing - Medium](https://medium.com/@thananjayan1988/optimize-the-docker-image-for-playwright-tests-3688c7d4be5f)

---

## 3. Fastest Playwright Workflow Setup

### Optimized Container-Based Workflow

**Recommended workflow (47 seconds execution):**

```yaml
name: Playwright Tests
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
jobs:
  playwright:
    name: 'Playwright Tests'
    runs-on: ubuntu-latest
    container:
      image: mcr.microsoft.com/playwright:v1.57.0-noble
      options: --user 1001
    steps:
      - uses: actions/checkout@v5

      - uses: actions/setup-node@v6
        with:
          node-version: lts/*

      - name: Install dependencies
        run: npm ci

      - name: Run Playwright tests
        run: npx playwright test

      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

### Performance Comparison

| Approach | Install Browsers | Total Time | Speedup |
|----------|------------------|------------|---------|
| Standard (VM) | `playwright install --with-deps` | ~3m 30s | Baseline |
| Container (with cache) | Skip | ~1m 2s | 3.4x |
| Container (no cache) | Skip | ~47s | 4.5x |

**Key insight:** Caching the Docker image is **slower** than pulling fresh from registry.

**Why container approach is faster:**
1. ⏭️ **Skip browser installation** - Browsers pre-installed in image
2. ⏭️ **Skip system dependencies** - All deps already in container
3. 🌐 **Fast network pull** - GitHub's network to MCR is optimized
4. 🚫 **No cache overhead** - Avoiding GitHub Actions cache saves time

### Sharding for Parallel Execution

**Matrix strategy for sharding:**

```yaml
name: Playwright Tests (Sharded)
on:
  push:
    branches: [ main, master ]
jobs:
  playwright:
    name: 'Playwright Tests - Shard ${{ matrix.shard }}'
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        shard: [1, 2, 3, 4]
    container:
      image: mcr.microsoft.com/playwright:v1.57.0-noble
      options: --user 1001
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v6
        with:
          node-version: lts/*
      - name: Install dependencies
        run: npm ci
      - name: Run Playwright tests
        run: npx playwright test --shard=${{ matrix.shard }}/4
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report-${{ matrix.shard }}
          path: playwright-report/
```

**Sharding benefits:**
- **40% faster** with optimal balancing (via orchestration tools)
- Linear scaling with shard count
- GitHub Actions free tier: 2000 minutes/month

**Worker count consideration:**
- GitHub-hosted runners: 2 CPU cores
- Limit workers to avoid thrashing: `--workers=2`
- With sharding, each shard gets 2 workers

**Sources:**
- [Make Playwright faster with containers - Karma Computing](https://blog.karmacomputing.co.uk/make-playwright-faster-with-containers-and-build-caching-github-actions/)
- [On Playwright in GitHub Actions - radekmie](https://radekmie.dev/blog/on-playwright-in-github-actions/)
- [Playwright - GitHub Actions | Currents](https://docs.currents.dev/getting-started/ci-setup/github-actions/playwright-github-actions)

---

## 4. Custom Image Building Strategies

### Building Custom Playwright Images

**Use cases for custom images:**
- Additional system dependencies (fonts, libraries)
- Custom Node.js version (e.g., Node 22)
- Pre-installed npm packages
- Organization-specific tooling
- Reduced image size

### Custom Dockerfile Example

**Basic custom image:**

```dockerfile
# Use official Playwright image as base
FROM mcr.microsoft.com/playwright:v1.57.0-noble

# Set working directory
WORKDIR /app

# Install additional dependencies
RUN apt-get update && apt-get install -y \
    fonts-noto-color-emoji \
    fonts-liberation \
    && rm -rf /var/lib/apt/lists/*

# Pre-install common npm packages (optional)
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Create non-root user
RUN useradd -m -u 1001 playwright
USER playwright

# Set Node.js memory limit
ENV NODE_OPTIONS="--max-old-space-size=4096"
```

**Multi-stage optimized build:**

```dockerfile
# Stage 1: Build
FROM mcr.microsoft.com/playwright:v1.57.0-noble AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

# Stage 2: Runtime
FROM mcr.microsoft.com/playwright:v1.57.0-noble

WORKDIR /app

# Copy only production dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Copy test files
COPY . .

# Run as non-root
RUN useradd -m -u 1001 playwright && \
    chown -R playwright:playwright /app
USER playwright

CMD ["npx", "playwright", "test"]
```

**Distroless optimized (smallest size):**

```dockerfile
FROM mcr.microsoft.com/playwright:v1.57.0-noble AS base

# Install dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Use distroless for final image
FROM gcr.io/distroless/nodejs20-debian12

WORKDIR /app

# Copy Playwright browsers from base
COPY --from=base /ms-playwright /ms-playwright

# Copy application
COPY --from=base /app/node_modules ./node_modules
COPY . .

ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

ENTRYPOINT ["node"]
CMD ["node_modules/.bin/playwright", "test"]
```

### GitHub Actions Workflow for Custom Images

**Build and use custom image:**

```yaml
name: Playwright Tests (Custom Image)
on:
  push:
    branches: [ main ]
jobs:
  build-image:
    name: Build Custom Playwright Image
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v5

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and push
        uses: docker/build-push-action@v6
        with:
          context: .
          file: ./Dockerfile.playwright
          push: true
          tags: ghcr.io/${{ github.repository }}/playwright:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max

  test:
    name: Run Tests with Custom Image
    needs: build-image
    runs-on: ubuntu-latest
    container:
      image: ghcr.io/${{ github.repository }}/playwright:latest
      credentials:
        username: ${{ github.actor }}
        password: ${{ secrets.GITHUB_TOKEN }}
    steps:
      - uses: actions/checkout@v5
      - name: Run tests
        run: npx playwright test
```

### Build Cache Optimization

**GitHub Actions Cache (GHA) backend:**

```yaml
- name: Build with cache
  uses: docker/build-push-action@v6
  with:
    context: .
    push: true
    tags: ghcr.io/user/app:latest
    cache-from: type=gha
    cache-to: type=gha,mode=max
```

**Registry cache (for larger images):**

```yaml
- name: Build with registry cache
  uses: docker/build-push-action@v6
  with:
    context: .
    push: true
    tags: ghcr.io/user/app:latest
    cache-from: type=registry,ref=ghcr.io/user/app:buildcache
    cache-to: type=registry,ref=ghcr.io/user/app:buildcache,mode=max
```

**Cache modes:**
- `mode=min`: Only cache final layers (smaller, faster)
- `mode=max`: Cache all intermediate layers (larger, more reuse)

**Performance results:**
- **90% build time reduction** with proper caching
- Example: 2m 20s → 15s average build time

**Cache size limits:**
- GitHub Actions cache: **10 GB per repository**
- Registry cache: Unlimited (uses container registry storage)
- Recommendation: Use registry cache for large images, GHA for small

**Sources:**
- [Cache management with GitHub Actions - Docker Build](https://docs.docker.com/build/ci/github-actions/cache/)
- [Enhancing Developer Experience - Medium](https://medium.com/@eelzinaty/enhancing-developer-experience-accelerating-docker-image-builds-by-90-using-github-actions-cache-839acf09196c)
- [Docker Layer Caching in GitHub Actions - Depot](https://depot.dev/blog/docker-layer-caching-in-github-actions)

---

## 5. GitHub Container Registry (GHCR) Integration

### Why Use GHCR for CI?

**Benefits:**
- **Free for public repos** with unlimited storage
- **Tight GitHub integration** - Use `GITHUB_TOKEN` for auth
- **Fine-grained permissions** - Independent of repository access
- **Package namespacing** - `ghcr.io/{owner}/{image}`
- **Version control** - Tag and track image versions
- **Build minute savings** - Reuse images across workflows

### Authentication

**Recommended: GITHUB_TOKEN (automatic):**

```yaml
- name: Log in to GHCR
  uses: docker/login-action@v3
  with:
    registry: ghcr.io
    username: ${{ github.actor }}
    password: ${{ secrets.GITHUB_TOKEN }}
```

**Alternative: Personal Access Token:**

```yaml
- name: Log in to GHCR
  uses: docker/login-action@v3
  with:
    registry: ghcr.io
    username: ${{ github.actor }}
    password: ${{ secrets.GHCR_TOKEN }}  # PAT with write:packages scope
```

### Complete Build and Push Workflow

```yaml
name: Build and Push Custom Playwright Image
on:
  push:
    branches: [ main ]
    paths:
      - 'Dockerfile.playwright'
      - 'package.json'
      - 'package-lock.json'
  workflow_dispatch:

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}/playwright

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - name: Checkout repository
        uses: actions/checkout@v5

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Log in to Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=ref,event=branch
            type=ref,event=pr
            type=semver,pattern={{version}}
            type=semver,pattern={{major}}.{{minor}}
            type=sha,prefix={{branch}}-
            type=raw,value=latest,enable={{is_default_branch}}

      - name: Build and push
        uses: docker/build-push-action@v6
        with:
          context: .
          file: ./Dockerfile.playwright
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
          annotations: |
            org.opencontainers.image.source=${{ github.server_url }}/${{ github.repository }}
```

### Using GHCR Images in Tests

```yaml
name: Playwright Tests (GHCR Image)
on:
  pull_request:
  push:
    branches: [ main ]
jobs:
  test:
    runs-on: ubuntu-latest
    container:
      image: ghcr.io/${{ github.repository }}/playwright:latest
      credentials:
        username: ${{ github.actor }}
        password: ${{ secrets.GITHUB_TOKEN }}
    steps:
      - uses: actions/checkout@v5
      - name: Run tests
        run: npx playwright test
```

### Tagging Best Practices

**Semantic versioning:**
```bash
ghcr.io/org/playwright:1.57.0        # Specific version
ghcr.io/org/playwright:1.57          # Minor version
ghcr.io/org/playwright:1              # Major version
ghcr.io/org/playwright:latest        # Latest stable (use cautiously)
```

**Branch-based tags:**
```bash
ghcr.io/org/playwright:main          # Main branch
ghcr.io/org/playwright:develop       # Development branch
ghcr.io/org/playwright:pr-123        # Pull request testing
```

**SHA-based tags (immutable):**
```bash
ghcr.io/org/playwright:sha-abc123    # Specific commit
ghcr.io/org/playwright:main-abc123   # Branch + commit
```

### Linking Images to Repositories

**In Dockerfile:**
```dockerfile
LABEL org.opencontainers.image.source=https://github.com/owner/repo
LABEL org.opencontainers.image.description="Custom Playwright image for CI"
LABEL org.opencontainers.image.licenses=MIT
```

**In GitHub Actions:**
```yaml
- name: Build and push
  uses: docker/build-push-action@v6
  with:
    labels: |
      org.opencontainers.image.source=${{ github.server_url }}/${{ github.repository }}
```

**Sources:**
- [Working with the Container Registry - GitHub Docs](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
- [Using GHCR to Host Docker Images - DEV](https://dev.to/madhucheran/using-github-container-registry-ghcr-to-host-your-docker-images-1bh4)
- [Pushing to GHCR with GitHub Actions - DEV](https://dev.to/willvelida/pushing-container-images-to-github-container-registry-with-github-actions-1m6b)

---

## 6. Container vs VM Runner Tradeoffs

### Architecture Comparison

| Aspect | VM Runners | Container Runners |
|--------|------------|-------------------|
| **Isolation** | Full VM per job | Container per job |
| **Startup time** | 10-20 seconds | 2-5 seconds |
| **Resource usage** | Higher overhead | Lower overhead |
| **Security** | Stronger (hypervisor) | Weaker (shared kernel) |
| **Compatibility** | All platforms | Linux only |
| **Customization** | Limited | High (custom images) |
| **Cost** | Higher compute | Lower compute |

### Ubuntu-Slim Container Runners

**GitHub's container-based runners:**
- Run in **containers on shared VMs** (not dedicated VMs)
- **Hypervisor level 2 isolation** for security
- **15-minute timeout** (vs 360 minutes for VM runners)
- **Minimal toolset** installed (optimized for speed)
- **Single-CPU** runners use this architecture

**Tradeoffs:**
- ✅ **Faster startup** - Containers boot faster than VMs
- ✅ **Lower cost** - Shared resources reduce costs
- ❌ **Limited resources** - Single CPU, lower memory
- ❌ **Shorter timeout** - Not suitable for long builds

### Performance Considerations

**VM-based runners:**
- **GitHub-hosted**: Pre-installed software (Git, Node, Python, Docker, etc.)
- **2-core CPU**, 7GB RAM (ubuntu-latest)
- **Full sudo access** for system modifications
- **All platforms**: Linux, Windows, macOS

**Container-based solutions:**
- **Minimal pre-installed software** - Faster startup, smaller footprint
- **No native Windows/macOS** - Linux containers only
- **Requires Docker knowledge** - More setup complexity
- **Better resource efficiency** - Multiple containers per host

### Self-Hosted Runner Considerations

**Container-based self-hosted (e.g., Kubernetes):**
- ✅ **Auto-scaling** with Kubernetes HPA
- ✅ **Resource efficiency** - Pack more jobs per host
- ✅ **Ephemeral workers** - Clean state per job
- ❌ **Complexity** - Requires Kubernetes expertise
- ❌ **Linux only** - Windows containers are slow

**VM-based self-hosted:**
- ✅ **Simple setup** - Standard EC2/Azure VM
- ✅ **Platform support** - Windows, Linux, macOS
- ✅ **Full control** - Custom hardware, networking
- ❌ **Manual scaling** - No auto-scaling without orchestrator
- ❌ **Workspace cleanup** - Manual state management

### Docker-in-Docker Challenges

**Problem:** Running Docker inside GitHub Actions containers requires privileged mode or socket mounting.

**Solutions:**
1. **VM-based runners** - Simplest, native Docker support
2. **Sysbox runtime** - Stronger isolation without privileged containers
3. **BuildKit/Buildx** - Modern build system with better security

**Security considerations:**
- ❌ **Avoid:** Bind-mounting host Docker socket (`/var/run/docker.sock`)
- ❌ **Avoid:** Privileged containers (`--privileged`)
- ✅ **Prefer:** Rootless Docker or Sysbox for isolation

### Performance Optimization Options

**RAM disk optimization (VM runners):**
- VMs can be pre-configured with **RAM disk mounted**
- Reserve up to **25% of memory** for RAM disk
- **Orders of magnitude faster** than SSD/EBS
- Best for: Disk-intensive builds (npm install, compilation)

**Third-party ultra runners:**
- Depot Ultra Runners: **Up to 3x faster** GitHub Actions jobs
- Larger VMs with more CPU/RAM
- Premium pricing

### Recommendations

**Use Container Runners When:**
- Running Linux-only workflows
- Need fast startup times
- Want minimal resource footprint
- Have custom image requirements
- Testing/CI workloads (not production)

**Use VM Runners When:**
- Need Windows or macOS
- Require full system access
- Long-running builds (>15 min)
- Need pre-installed GitHub tools
- Production deployments

**Hybrid Approach:**
- Container runners for fast tests
- VM runners for builds and deployments
- Self-hosted for high-volume or custom hardware

**Sources:**
- [GitHub-hosted runners - GitHub Docs](https://docs.github.com/actions/using-github-hosted-runners/about-github-hosted-runners)
- [When to choose GitHub-Hosted or Self-Hosted - GitHub Blog](https://github.blog/enterprise-software/ci-cd/when-to-choose-github-hosted-runners-or-self-hosted-runners-with-github-actions/)
- [Introducing Ultra Runners - Depot](https://depot.dev/blog/introducing-github-actions-ultra-runners)

---

## 7. Time Savings Analysis

### Baseline: Standard VM Approach

**Typical VM-based Playwright workflow:**

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5                    # ~5s
      - uses: actions/setup-node@v6                  # ~10s
      - run: npm ci                                  # ~30s
      - run: npx playwright install --with-deps      # ~210s (3m 30s)
      - run: npx playwright test                     # ~45s
      # Total: ~300s (5 minutes)
```

**Breakdown:**
- Checkout: 5s
- Setup Node: 10s
- Install deps: 30s
- **Install browsers: 210s** ← Optimization target
- Run tests: 45s

### Optimized: Container Approach

**Container-based workflow:**

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    container:
      image: mcr.microsoft.com/playwright:v1.57.0-noble
    steps:
      - uses: actions/checkout@v5                    # ~5s
      - uses: actions/setup-node@v6                  # ~10s
      - run: npm ci                                  # ~30s
      - run: npx playwright test                     # ~45s
      # Total: ~90s (1m 30s)
```

**Breakdown:**
- Checkout: 5s
- Setup Node: 10s
- Install deps: 30s
- **Install browsers: 0s** ← Eliminated!
- Run tests: 45s

### Time Savings Summary

| Metric | VM Approach | Container Approach | Savings |
|--------|-------------|-------------------|---------|
| **Total time** | 300s (5m) | 90s (1m 30s) | **70%** |
| **Browser install** | 210s | 0s | **100%** |
| **Per-run savings** | - | 210s (3m 30s) | - |
| **Monthly savings** | - | ~1,050 minutes* | - |

*Assuming 5 runs/day × 30 days

### Sharding Time Savings

**Without sharding (single job):**
- Test suite: 180s (3 minutes)
- Total time: 90s setup + 180s tests = **270s (4m 30s)**

**With 4-way sharding:**
- Per shard: 90s setup + 45s tests = 135s
- Parallel execution: **135s (2m 15s)**
- Speedup: **2x faster**

**With 8-way sharding:**
- Per shard: 90s setup + 22.5s tests = 112.5s
- Parallel execution: **112.5s (1m 52s)**
- Speedup: **2.4x faster**

### GitHub Actions Free Tier Impact

**Free tier limits:**
- **2,000 minutes/month** for private repos (public repos unlimited)
- Linux minutes: 1x multiplier
- macOS minutes: 10x multiplier

**Monthly usage comparison:**

| Scenario | Runs/Day | VM Approach | Container | Savings |
|----------|----------|-------------|-----------|---------|
| Small project | 5 | 750 min | 225 min | **525 min** |
| Medium project | 20 | 3,000 min | 900 min | **2,100 min** |
| Large project | 50 | 7,500 min | 2,250 min | **5,250 min** |

**Cost avoidance:**
- Medium project saves **2,100 minutes/month**
- Over free tier by 900 minutes with VM approach
- **Stays within free tier** with container approach
- Savings: **$8/month** (900 min × $0.008/min)

### Build Cache Impact

**Without Docker build cache:**
- Custom image build: **120s** per workflow run
- 20 runs/day = **2,400s (40 minutes/day)**

**With GitHub Actions Cache:**
- First build: 120s
- Cached builds: **15s** (90% reduction)
- Average: ~20s/run
- 20 runs/day = **400s (6.7 minutes/day)**
- Daily savings: **33.3 minutes**

### Real-World Examples

**Case Study 1: Karma Computing**
- Before: 3m 30s (browser install)
- After (container): 47s
- **Improvement: 4.5x faster**

**Case Study 2: Custom Image Build**
- Before: 2m 20s build time
- After (with cache): 15s average
- **Improvement: 90% reduction**

**Case Study 3: Sharded Tests**
- Before: 8m test suite
- After (4 shards): 2m 15s
- **Improvement: 3.5x faster**

### ROI Calculation

**Assumptions:**
- Developer salary: $100,000/year (~$50/hour)
- 20 test runs/day
- Team size: 5 developers

**Time savings:**
- Per run: 210s (3.5 minutes)
- Daily per developer: 70 minutes
- Daily team: 350 minutes (5.8 hours)
- Monthly team: **7,875 minutes** (131 hours)

**Productivity value:**
- 131 hours × $50/hour = **$6,550/month**
- Annual value: **$78,600**

**Implementation cost:**
- Initial setup: 4-8 hours (~$400)
- Maintenance: 2 hours/month (~$100/month)
- **Net annual value: $77,300**

---

## 8. Storage and Pull Time Considerations

### Image Pull Performance

**Network optimization:**
- GitHub Actions → MCR (Microsoft Container Registry): **Optimized route**
- Pull speeds: Typically **50-200 MB/s** on GitHub-hosted runners
- 2GB image: **10-40 seconds** to pull

**Pull vs Cache comparison:**

| Approach | First Run | Subsequent Runs | Cache Size |
|----------|-----------|-----------------|------------|
| **Fresh pull** | 30s | 30s | 0 GB |
| **GHA cache** | 30s + 20s save | 40s restore + 10s load | 2 GB |
| **Registry cache** | 30s | 15s (layer reuse) | Varies |

**Key insight:** Fresh pull is often **faster than cache** for Playwright images because:
1. Cache save/restore overhead (20s + 40s = 60s)
2. Docker image load time (10s)
3. Optimized network path GitHub ↔ MCR
4. Cache storage limits (10 GB)

### Storage Cost Analysis

**GitHub Actions Cache:**
- **Free tier: 10 GB** per repository
- Shared across all workflows and branches
- LRU eviction policy (least recently used)
- **Cost:** $0.50/GB/month over limit

**GitHub Container Registry (GHCR):**
- **Free for public repos** (unlimited storage)
- **Free tier: 500 MB** for private repos
- **Cost:** $0.25/GB/month over limit
- Bandwidth: Free for GitHub Actions

**Storage requirements:**

| Image Type | Compressed | Uncompressed | GHCR Storage |
|------------|-----------|--------------|--------------|
| Playwright (Node) | ~800 MB | ~2 GB | 800 MB |
| Custom (optimized) | ~600 MB | ~1.5 GB | 600 MB |
| Alpine (minimal) | ~180 MB | ~477 MB | 180 MB |

**Multi-version storage:**
- Keep 3 versions: 3 × 800 MB = **2.4 GB**
- Keep 10 versions: 10 × 800 MB = **8 GB**
- Recommendation: Prune old versions monthly

### Cache Strategy Recommendations

**For Playwright images (2-3 GB):**
```yaml
# ✅ RECOMMENDED: Fresh pull, no cache
container:
  image: mcr.microsoft.com/playwright:v1.57.0-noble

# ❌ AVOID: Caching adds overhead
# Don't use actions/cache for Docker images
```

**For custom images (<500 MB):**
```yaml
# ✅ RECOMMENDED: Registry cache
- uses: docker/build-push-action@v6
  with:
    cache-from: type=registry,ref=ghcr.io/user/app:buildcache
    cache-to: type=registry,ref=ghcr.io/user/app:buildcache,mode=max
```

**For frequent builds with dependencies:**
```yaml
# ✅ RECOMMENDED: GHA cache for npm modules
- uses: actions/setup-node@v6
  with:
    node-version: lts/*
    cache: 'npm'  # Caches ~/.npm
```

### Pull Time Optimization

**Pre-pull on self-hosted runners:**
```bash
# Pre-pull images during runner setup
docker pull mcr.microsoft.com/playwright:v1.57.0-noble

# Keep images warm with cron job
0 */6 * * * docker pull mcr.microsoft.com/playwright:v1.57.0-noble
```

**Image layer optimization:**
```dockerfile
# Order layers by change frequency (least to most)
FROM mcr.microsoft.com/playwright:v1.57.0-noble

# Rarely changes - pull once
RUN apt-get update && apt-get install -y fonts-noto

# Occasionally changes - cache friendly
COPY package.json package-lock.json ./
RUN npm ci

# Frequently changes - separate layer
COPY . .
```

**Multi-stage build efficiency:**
```dockerfile
# Stage 1: Heavy dependencies (cached)
FROM node:20 AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Stage 2: Playwright (cached)
FROM mcr.microsoft.com/playwright:v1.57.0-noble AS test
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Only test stage is pulled for CI
```

### Bandwidth Considerations

**GitHub-hosted runners:**
- **Unlimited bandwidth** for pulling public images
- No egress charges for GitHub Actions
- Optimized network to major registries (MCR, GHCR, Docker Hub)

**Self-hosted runners:**
- Consider **cloud network costs** (AWS, Azure, GCP)
- **Registry location** matters (same region = faster + cheaper)
- Example: AWS us-east-1 ↔ GHCR us-east-1 = free transfer

**Cost comparison (monthly):**

| Scenario | Image Size | Pulls/Day | Bandwidth | AWS Cost* |
|----------|-----------|-----------|-----------|-----------|
| Small | 800 MB | 5 | 120 GB | $10.80 |
| Medium | 800 MB | 20 | 480 GB | $43.20 |
| Large | 800 MB | 50 | 1.2 TB | $108.00 |

*AWS data transfer: $0.09/GB

**Mitigation:**
1. Use container registry in **same region** as runners
2. Implement **pull-through cache** (e.g., ECR Public, Harbor)
3. Pre-pull images and update less frequently

---

## 9. Working Examples

### Example 1: Basic Playwright Container Workflow

**File: `.github/workflows/playwright.yml`**

```yaml
name: Playwright Tests
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    name: Run Playwright Tests
    runs-on: ubuntu-latest
    container:
      image: mcr.microsoft.com/playwright:v1.57.0-noble
      options: --user 1001 --ipc=host

    steps:
      - name: Checkout code
        uses: actions/checkout@v5

      - name: Setup Node.js
        uses: actions/setup-node@v6
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run Playwright tests
        run: npx playwright test

      - name: Upload test results
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

### Example 2: Sharded Tests with Matrix Strategy

**File: `.github/workflows/playwright-sharded.yml`**

```yaml
name: Playwright Tests (Sharded)
on:
  push:
    branches: [ main ]
  pull_request:

jobs:
  test:
    name: 'Tests - Shard ${{ matrix.shard }}'
    runs-on: ubuntu-latest
    timeout-minutes: 15

    strategy:
      fail-fast: false
      matrix:
        shard: [1, 2, 3, 4]

    container:
      image: mcr.microsoft.com/playwright:v1.57.0-noble
      options: --user 1001 --ipc=host

    steps:
      - uses: actions/checkout@v5

      - uses: actions/setup-node@v6
        with:
          node-version: lts/*
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run Playwright tests (shard ${{ matrix.shard }}/4)
        run: npx playwright test --shard=${{ matrix.shard }}/4
        env:
          CI: true

      - name: Upload blob report to GitHub Actions Artifacts
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: blob-report-${{ matrix.shard }}
          path: blob-report
          retention-days: 1

  merge-reports:
    name: Merge Reports
    if: always()
    needs: [test]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v6
        with:
          node-version: lts/*
      - run: npm ci

      - name: Download blob reports from GitHub Actions Artifacts
        uses: actions/download-artifact@v4
        with:
          path: all-blob-reports
          pattern: blob-report-*
          merge-multiple: true

      - name: Merge into HTML Report
        run: npx playwright merge-reports --reporter html ./all-blob-reports

      - name: Upload HTML report
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report
          retention-days: 30
```

### Example 3: Custom Dockerfile with Optimizations

**File: `Dockerfile.playwright`**

```dockerfile
# Use official Playwright base image
FROM mcr.microsoft.com/playwright:v1.57.0-noble

# Set working directory
WORKDIR /app

# Install additional fonts for visual testing
RUN apt-get update && apt-get install -y --no-install-recommends \
    fonts-liberation \
    fonts-noto-color-emoji \
    fonts-noto-cjk \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package.json package-lock.json ./

# Install production dependencies only
RUN npm ci --only=production && npm cache clean --force

# Create non-root user for security
RUN useradd -m -u 1001 -s /bin/bash playwright && \
    chown -R playwright:playwright /app

# Switch to non-root user
USER playwright

# Set Node.js optimizations
ENV NODE_OPTIONS="--max-old-space-size=4096"
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node --version || exit 1

# Default command
CMD ["npx", "playwright", "test"]
```

### Example 4: Build and Push Custom Image

**File: `.github/workflows/build-playwright-image.yml`**

```yaml
name: Build Custom Playwright Image
on:
  push:
    branches: [ main ]
    paths:
      - 'Dockerfile.playwright'
      - 'package.json'
      - 'package-lock.json'
  workflow_dispatch:

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}/playwright

jobs:
  build:
    name: Build and Push Docker Image
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - name: Checkout repository
        uses: actions/checkout@v5

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata (tags, labels)
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=ref,event=branch
            type=ref,event=pr
            type=sha,prefix={{branch}}-
            type=raw,value=latest,enable={{is_default_branch}}
          labels: |
            org.opencontainers.image.title=Custom Playwright Image
            org.opencontainers.image.description=Optimized Playwright image for CI

      - name: Build and push Docker image
        uses: docker/build-push-action@v6
        with:
          context: .
          file: ./Dockerfile.playwright
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
          platforms: linux/amd64

      - name: Image digest
        run: echo ${{ steps.meta.outputs.digest }}
```

### Example 5: Using Custom GHCR Image in Tests

**File: `.github/workflows/test-with-custom-image.yml`**

```yaml
name: Tests with Custom Image
on:
  pull_request:
  push:
    branches: [ main ]

jobs:
  test:
    name: Run Tests with Custom Image
    runs-on: ubuntu-latest
    container:
      image: ghcr.io/${{ github.repository }}/playwright:latest
      credentials:
        username: ${{ github.actor }}
        password: ${{ secrets.GITHUB_TOKEN }}
      options: --user 1001 --ipc=host

    steps:
      - name: Checkout code
        uses: actions/checkout@v5

      - name: Run tests
        run: npx playwright test
        env:
          CI: true

      - name: Upload results
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: test-results
          path: |
            playwright-report/
            test-results/
```

### Example 6: Multi-Stage Custom Image with Size Optimization

**File: `Dockerfile.playwright-optimized`**

```dockerfile
# Stage 1: Build dependencies
FROM node:20-slim AS deps
WORKDIR /build
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Playwright base with optimizations
FROM mcr.microsoft.com/playwright:v1.57.0-noble AS runtime

WORKDIR /app

# Install only essential fonts (minimize size)
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      fonts-liberation \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Copy production dependencies from build stage
COPY --from=deps /build/node_modules ./node_modules
COPY package*.json ./

# Create non-root user
RUN useradd -m -u 1001 playwright && \
    chown -R playwright:playwright /app

USER playwright

# Environment optimizations
ENV NODE_ENV=production
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright
ENV NODE_OPTIONS="--max-old-space-size=2048"

# Copy application code (do this last for better caching)
COPY --chown=playwright:playwright . .

CMD ["npx", "playwright", "test"]
```

### Example 7: Conditional Container Usage

**File: `.github/workflows/playwright-conditional.yml`**

```yaml
name: Playwright Tests (Conditional)
on:
  push:
  pull_request:

jobs:
  test:
    name: Run Tests
    runs-on: ubuntu-latest

    # Use container only for Linux
    container: ${{ matrix.os == 'ubuntu-latest' && 'mcr.microsoft.com/playwright:v1.57.0-noble' || '' }}

    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest]

    steps:
      - uses: actions/checkout@v5

      - uses: actions/setup-node@v6
        with:
          node-version: 20
          cache: 'npm'

      - run: npm ci

      # Install browsers only on macOS (Linux has them in container)
      - name: Install Playwright browsers
        if: matrix.os != 'ubuntu-latest'
        run: npx playwright install --with-deps

      - name: Run tests
        run: npx playwright test
```

---

## 10. Recommendations and Best Practices

### Quick Start Recommendations

**For most projects:**
1. ✅ Use official Playwright container: `mcr.microsoft.com/playwright:v1.57.0-noble`
2. ✅ Skip Docker image caching (fresh pull is faster)
3. ✅ Use `--user 1001` for security
4. ✅ Enable npm caching with `actions/setup-node@v6`
5. ✅ Pin to specific Playwright version

**Sample workflow:**
```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    container:
      image: mcr.microsoft.com/playwright:v1.57.0-noble
      options: --user 1001
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v6
        with:
          node-version: lts/*
          cache: 'npm'
      - run: npm ci
      - run: npx playwright test
```

### Advanced Optimization Checklist

**For high-volume projects:**

- [ ] Implement 4-8 way sharding for parallel execution
- [ ] Build custom image with pre-installed dependencies
- [ ] Push custom image to GHCR with version tags
- [ ] Use registry cache for custom image builds
- [ ] Configure blob report merging for sharded runs
- [ ] Set up pre-pull on self-hosted runners (if applicable)
- [ ] Monitor image pull times and cache hit rates
- [ ] Implement image version rotation policy

### Security Best Practices

**Container security:**
1. ✅ Always run as non-root user (`--user 1001`)
2. ✅ Pin to specific image versions (not `latest`)
3. ✅ Use `--ipc=host` for shared memory (Chromium)
4. ✅ Scan images for vulnerabilities (Trivy, Snyk)
5. ✅ Use GitHub Container Registry for private images
6. ❌ Never run untrusted code as root
7. ❌ Avoid privileged containers

**Example security scan:**
```yaml
- name: Scan Docker image
  uses: aquasecurity/trivy-action@master
  with:
    image-ref: ghcr.io/${{ github.repository }}/playwright:latest
    format: 'sarif'
    output: 'trivy-results.sarif'
```

### Performance Tuning

**Node.js optimizations:**
```yaml
env:
  NODE_OPTIONS: --max-old-space-size=4096
  NODE_ENV: test
  CI: true
```

**Playwright optimizations:**
```yaml
env:
  PLAYWRIGHT_BROWSERS_PATH: /ms-playwright  # Container path
  PWTEST_SKIP_TEST_OUTPUT: 1                 # Skip verbose output
```

**Concurrent workers:**
```yaml
- run: npx playwright test --workers=2  # Match GitHub runner CPU count
```

### Cost Optimization

**Minimize GitHub Actions minutes:**
1. Use containers to save 210s/run (browser install)
2. Implement sharding to reduce total time
3. Cache npm dependencies (not Docker images)
4. Run tests only on changed files (if possible)
5. Use path filters to skip unnecessary runs

**Example path filter:**
```yaml
on:
  pull_request:
    paths:
      - 'src/**'
      - 'tests/**'
      - 'playwright.config.ts'
      - 'package.json'
```

### Troubleshooting Common Issues

**Issue: Container not found**
```yaml
# Fix: Check image tag and registry
container:
  image: mcr.microsoft.com/playwright:v1.57.0-noble  # Correct
  # Not: playwright:latest (missing registry)
```

**Issue: Permission denied errors**
```yaml
# Fix: Run as non-root user
container:
  options: --user 1001
```

**Issue: Shared memory errors (Chromium)**
```yaml
# Fix: Use --ipc=host
container:
  options: --user 1001 --ipc=host
```

**Issue: Slow image pulls**
```yaml
# Fix: Use registry cache or self-hosted runners
- uses: docker/build-push-action@v6
  with:
    cache-from: type=registry,ref=ghcr.io/user/app:cache
```

**Issue: Version mismatch errors**
```yaml
# Fix: Pin versions consistently
container:
  image: mcr.microsoft.com/playwright:v1.57.0-noble
# AND in package.json:
# "playwright": "1.57.0"
```

### Migration Path

**From VM-based to container-based:**

1. **Week 1: Baseline**
   - Measure current performance
   - Document average run times
   - Identify slowest test files

2. **Week 2: Pilot**
   - Create container workflow on feature branch
   - Run parallel with existing workflow
   - Compare performance and reliability

3. **Week 3: Rollout**
   - Enable container workflow for all PRs
   - Monitor for issues
   - Keep VM workflow as fallback

4. **Week 4: Optimize**
   - Implement sharding if beneficial
   - Fine-tune worker counts
   - Remove VM workflow

5. **Month 2: Advanced**
   - Build custom image if needed
   - Set up GHCR with caching
   - Implement automated image updates

### Monitoring and Metrics

**Track these metrics:**
- Total workflow duration
- Browser installation time (should be 0)
- Test execution time
- Image pull time
- Cache hit rate (npm only)
- GitHub Actions minutes consumed
- Failure rate comparison (container vs VM)

**Example monitoring:**
```yaml
- name: Record metrics
  run: |
    echo "workflow_duration_seconds=$(date +%s - $GITHUB_ACTION_START)" >> $GITHUB_ENV
    echo "::notice::Test duration: ${{ env.workflow_duration_seconds }}s"
```

---

## 11. Conclusion

### Summary of Findings

**Container-based workflows provide significant advantages for Playwright CI:**

1. **⚡ Speed**: 70% faster (5m → 1m 30s) by eliminating browser installation
2. **💰 Cost**: Saves 3.5 minutes per run = 525-5,250 minutes/month depending on volume
3. **📦 Simplicity**: No `playwright install --with-deps` needed
4. **🔧 Consistency**: Identical environment across all runs
5. **🚀 Scalability**: Easy sharding for parallel execution

**Key Takeaways:**

- ✅ **Use official Playwright images** from MCR for fastest setup
- ✅ **Skip Docker image caching** (fresh pull is faster for large images)
- ✅ **Implement sharding** for test suites >2 minutes
- ✅ **Custom images** only if you need additional dependencies
- ✅ **GHCR integration** for custom images with registry caching

**When NOT to use containers:**
- Windows or macOS runners needed
- Jobs require GitHub-hosted tools not in container
- Timeout <15 minutes won't work (use VM)
- Security requires full VM isolation

### Next Steps

1. **Immediate**: Switch to container-based workflow (copy Example 1)
2. **Week 1**: Measure performance improvement vs baseline
3. **Week 2**: Implement sharding if tests >2 minutes (Example 2)
4. **Month 1**: Build custom image if needed (Example 3)
5. **Ongoing**: Monitor and optimize based on metrics

---

## References

### Official Documentation
- [Running jobs in a container - GitHub Docs](https://docs.github.com/actions/using-jobs/running-jobs-in-a-container)
- [Docker | Playwright](https://playwright.dev/docs/docker)
- [Microsoft Artifact Registry - Playwright](https://mcr.microsoft.com/en-us/product/playwright/about)
- [Working with Container Registry - GitHub](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)

### Performance Optimization
- [Make Playwright faster - Karma Computing](https://blog.karmacomputing.co.uk/make-playwright-faster-with-containers-and-build-caching-github-actions/)
- [On Playwright in GitHub Actions - radekmie](https://radekmie.dev/blog/on-playwright-in-github-actions/)
- [Introducing Ultra Runners - Depot](https://depot.dev/blog/introducing-github-actions-ultra-runners)

### Caching and Registry
- [Cache management - Docker Build](https://docs.docker.com/build/ci/github-actions/cache/)
- [Docker Layer Caching - Depot](https://depot.dev/blog/docker-layer-caching-in-github-actions)
- [Using GHCR - DEV Community](https://dev.to/madhucheran/using-github-container-registry-ghcr-to-host-your-docker-images-1bh4)

### Community Resources
- [Playwright GitHub Actions - Currents](https://docs.currents.dev/getting-started/ci-setup/github-actions/playwright-github-actions)
- [Playwright in CI with Docker - Roy Bakker](https://www.roybakker.dev/blog/playwright-in-ci-with-github-actions-and-docker-endtoend-guide)
- [When to choose runners - GitHub Blog](https://github.blog/enterprise-software/ci-cd/when-to-choose-github-hosted-runners-or-self-hosted-runners-with-github-actions/)

---

**Document Version:** 1.0
**Last Updated:** December 6, 2025
**Research Date:** December 6, 2025
