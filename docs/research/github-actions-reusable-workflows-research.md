# GitHub Actions: Reusable Workflows & Composite Actions Research

## Executive Summary

This research document analyzes GitHub Actions reusable workflows and composite actions architecture, providing comprehensive guidance on when to use each pattern, complete working examples, organizational best practices, and common pitfalls with solutions.

---

## 1. When to Use Composite Actions vs Reusable Workflows

### Decision Matrix

| Aspect | Composite Actions | Reusable Workflows |
|--------|------------------|-------------------|
| **Scope** | Bundle multiple **steps** into single step | Reuse entire **workflows** with multiple jobs |
| **Call Location** | Called as a **step** within a job | Called as entire **job** (not within steps) |
| **Multiple Jobs** | ❌ No - flat list of steps only | ✅ Yes - can contain multiple jobs |
| **Runner Specification** | Uses caller's runner | Can specify different runners per job |
| **Secrets** | ❌ No - must pass as inputs | ✅ Yes - native secrets support |
| **Nesting** | Up to 10 levels deep | Cannot nest (single level) |
| **Input Types** | Strings only (no type validation) | String, number, boolean (typed) |
| **Debugging** | Shows as single step in output | Each step shown separately |
| **Environment Variables** | Can set via GITHUB_ENV | Cannot pass env vars to caller |
| **GITHUB_TOKEN** | Must pass explicitly | Implicitly available |

### Usage Recommendations

**Use Composite Actions when:**
- Creating reusable sets of steps within a single job
- Need to chain/nest actions (up to 10 levels)
- Working with generic, isolated functionality
- Want to bundle related steps (e.g., setup + build + test)
- All steps can run on same runner type

**Use Reusable Workflows when:**
- Standardizing entire CI/CD pipelines across projects
- Need multiple jobs with different runners
- Require secrets handling
- Want separate job visibility in GitHub UI
- Need to enforce organization-wide standards

**Example Decision Flow:**
```
Need to reuse automation?
├─ Single runner, bundled steps? → Composite Action
├─ Multiple jobs/runners needed? → Reusable Workflow
├─ Need secrets access? → Reusable Workflow
└─ Generic utility steps? → Composite Action
```

---

## 2. Complete Reusable Workflow Examples

### 2.1 Basic Reusable Workflow

**File:** `.github/workflows/reusable-build-test.yml`

```yaml
name: Reusable Build and Test

on:
  workflow_call:
    inputs:
      node-version:
        description: 'Node.js version to use'
        required: true
        type: string
      environment:
        description: 'Deployment environment'
        required: false
        type: string
        default: 'development'
      run-tests:
        description: 'Whether to run tests'
        required: false
        type: boolean
        default: true
    secrets:
      NPM_TOKEN:
        description: 'NPM authentication token'
        required: true
      DEPLOY_KEY:
        description: 'Deployment SSH key'
        required: false
    outputs:
      build-status:
        description: 'Build success or failure'
        value: ${{ jobs.build.outputs.status }}
      test-coverage:
        description: 'Test coverage percentage'
        value: ${{ jobs.test.outputs.coverage }}

jobs:
  build:
    runs-on: ubuntu-latest
    outputs:
      status: ${{ steps.build-step.outputs.status }}
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ inputs.node-version }}
          cache: 'npm'

      - name: Configure NPM
        run: |
          echo "//registry.npmjs.org/:_authToken=${{ secrets.NPM_TOKEN }}" > .npmrc

      - name: Install dependencies
        run: npm ci

      - name: Build
        id: build-step
        run: |
          npm run build
          echo "status=success" >> $GITHUB_OUTPUT

      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: build-${{ inputs.environment }}
          path: dist/
          retention-days: 7

  test:
    runs-on: ubuntu-latest
    needs: build
    if: ${{ inputs.run-tests }}
    outputs:
      coverage: ${{ steps.coverage.outputs.percentage }}
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ inputs.node-version }}

      - name: Download build artifacts
        uses: actions/download-artifact@v4
        with:
          name: build-${{ inputs.environment }}
          path: dist/

      - name: Run tests
        run: npm test

      - name: Calculate coverage
        id: coverage
        run: |
          COVERAGE=$(npm run coverage:report | grep -oP '\d+(?=%)')
          echo "percentage=$COVERAGE" >> $GITHUB_OUTPUT
```

### 2.2 Calling the Reusable Workflow

**File:** `.github/workflows/ci.yml`

```yaml
name: CI Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  # Call from same repository
  build-and-test:
    uses: ./.github/workflows/reusable-build-test.yml
    with:
      node-version: '20.x'
      environment: 'staging'
      run-tests: true
    secrets:
      NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
      DEPLOY_KEY: ${{ secrets.STAGING_DEPLOY_KEY }}

  # Call from different repository
  external-workflow:
    uses: myorg/workflows/.github/workflows/security-scan.yml@v1.2.3
    with:
      severity-threshold: 'high'
    secrets: inherit  # Pass all secrets automatically

  # Use outputs from reusable workflow
  deploy:
    needs: build-and-test
    runs-on: ubuntu-latest
    if: ${{ needs.build-and-test.outputs.build-status == 'success' }}
    steps:
      - name: Deploy to staging
        run: |
          echo "Deploying build with ${{ needs.build-and-test.outputs.test-coverage }}% coverage"
          # Deployment logic here
```

### 2.3 Advanced: Matrix Strategy in Reusable Workflow

**File:** `.github/workflows/reusable-multi-platform.yml`

```yaml
name: Multi-Platform Build

on:
  workflow_call:
    inputs:
      platforms:
        description: 'JSON array of platforms to build for'
        required: true
        type: string  # '["ubuntu-latest", "windows-latest", "macos-latest"]'
      node-versions:
        description: 'JSON array of Node versions'
        required: true
        type: string  # '["18.x", "20.x", "22.x"]'
    secrets:
      BUILD_TOKEN:
        required: true

jobs:
  build-matrix:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: ${{ fromJSON(inputs.platforms) }}
        node-version: ${{ fromJSON(inputs.node-versions) }}
      fail-fast: false
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}

      - name: Build on ${{ matrix.os }}
        run: npm run build
        env:
          BUILD_TOKEN: ${{ secrets.BUILD_TOKEN }}

      - name: Upload platform-specific build
        uses: actions/upload-artifact@v4
        with:
          name: build-${{ matrix.os }}-node${{ matrix.node-version }}
          path: dist/
```

**Caller:**

```yaml
jobs:
  cross-platform:
    uses: ./.github/workflows/reusable-multi-platform.yml
    with:
      platforms: '["ubuntu-latest", "windows-latest", "macos-latest"]'
      node-versions: '["18.x", "20.x"]'
    secrets:
      BUILD_TOKEN: ${{ secrets.BUILD_TOKEN }}
```

---

## 3. Complete Composite Action Examples

### 3.1 Basic Composite Action

**File:** `.github/actions/npm-setup/action.yml`

```yaml
name: 'NPM Setup and Cache'
description: 'Setup Node.js, cache dependencies, and install packages'

inputs:
  node-version:
    description: 'Node.js version to use'
    required: true
    default: '20.x'
  cache-path:
    description: 'Path to cache'
    required: false
    default: 'node_modules'
  install-command:
    description: 'Command to install dependencies'
    required: false
    default: 'npm ci'

outputs:
  cache-hit:
    description: 'Whether cache was hit'
    value: ${{ steps.cache-deps.outputs.cache-hit }}
  node-version-actual:
    description: 'Actual Node.js version installed'
    value: ${{ steps.setup-node.outputs.node-version }}

runs:
  using: "composite"
  steps:
    - name: Setup Node.js
      id: setup-node
      uses: actions/setup-node@v4
      with:
        node-version: ${{ inputs.node-version }}
        cache: 'npm'

    - name: Cache dependencies
      id: cache-deps
      uses: actions/cache@v4
      with:
        path: ${{ inputs.cache-path }}
        key: ${{ runner.os }}-npm-${{ hashFiles('**/package-lock.json') }}
        restore-keys: |
          ${{ runner.os }}-npm-

    - name: Install dependencies
      if: steps.cache-deps.outputs.cache-hit != 'true'
      shell: bash
      run: ${{ inputs.install-command }}

    - name: Log setup completion
      shell: bash
      run: |
        echo "✅ Node.js ${{ steps.setup-node.outputs.node-version }} setup complete"
        echo "📦 Cache hit: ${{ steps.cache-deps.outputs.cache-hit }}"
```

**Usage:**

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup NPM environment
        uses: ./.github/actions/npm-setup
        with:
          node-version: '20.x'
          install-command: 'npm ci --legacy-peer-deps'

      - name: Build project
        run: npm run build
```

### 3.2 Advanced: Multi-Step Composite Action with Conditionals

**File:** `.github/actions/docker-build-push/action.yml`

```yaml
name: 'Docker Build and Push'
description: 'Build Docker image, scan for vulnerabilities, and push to registry'

inputs:
  image-name:
    description: 'Docker image name'
    required: true
  registry:
    description: 'Container registry URL'
    required: true
    default: 'ghcr.io'
  dockerfile:
    description: 'Path to Dockerfile'
    required: false
    default: './Dockerfile'
  build-args:
    description: 'Build arguments (multiline)'
    required: false
    default: ''
  push:
    description: 'Whether to push image to registry'
    required: false
    default: 'true'
  scan-vulnerabilities:
    description: 'Whether to scan for vulnerabilities'
    required: false
    default: 'true'
  # Note: Secrets must be passed as inputs in composite actions
  registry-username:
    description: 'Registry username'
    required: true
  registry-password:
    description: 'Registry password'
    required: true

outputs:
  image-tag:
    description: 'Full image tag that was built'
    value: ${{ steps.meta.outputs.tags }}
  image-digest:
    description: 'Image digest SHA'
    value: ${{ steps.build.outputs.digest }}
  vulnerability-count:
    description: 'Number of vulnerabilities found'
    value: ${{ steps.scan.outputs.vuln-count }}

runs:
  using: "composite"
  steps:
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v3

    - name: Log in to registry
      uses: docker/login-action@v3
      with:
        registry: ${{ inputs.registry }}
        username: ${{ inputs.registry-username }}
        password: ${{ inputs.registry-password }}

    - name: Extract metadata
      id: meta
      uses: docker/metadata-action@v5
      with:
        images: ${{ inputs.registry }}/${{ inputs.image-name }}
        tags: |
          type=ref,event=branch
          type=ref,event=pr
          type=semver,pattern={{version}}
          type=semver,pattern={{major}}.{{minor}}
          type=sha,prefix={{branch}}-

    - name: Build Docker image
      id: build
      uses: docker/build-push-action@v5
      with:
        context: .
        file: ${{ inputs.dockerfile }}
        push: ${{ inputs.push }}
        tags: ${{ steps.meta.outputs.tags }}
        labels: ${{ steps.meta.outputs.labels }}
        build-args: ${{ inputs.build-args }}
        cache-from: type=gha
        cache-to: type=gha,mode=max

    - name: Scan for vulnerabilities
      id: scan
      if: ${{ inputs.scan-vulnerabilities == 'true' }}
      shell: bash
      run: |
        # Using Trivy for vulnerability scanning
        docker run --rm \
          -v /var/run/docker.sock:/var/run/docker.sock \
          aquasec/trivy:latest image \
          --severity HIGH,CRITICAL \
          --format json \
          --output trivy-report.json \
          ${{ steps.meta.outputs.tags }}

        VULN_COUNT=$(jq '[.Results[].Vulnerabilities // [] | length] | add' trivy-report.json)
        echo "vuln-count=$VULN_COUNT" >> $GITHUB_OUTPUT
        echo "Found $VULN_COUNT vulnerabilities"

    - name: Upload vulnerability report
      if: ${{ inputs.scan-vulnerabilities == 'true' }}
      uses: actions/upload-artifact@v4
      with:
        name: trivy-vulnerability-report
        path: trivy-report.json

    - name: Summary
      shell: bash
      run: |
        echo "### Docker Build Summary" >> $GITHUB_STEP_SUMMARY
        echo "- **Image:** ${{ steps.meta.outputs.tags }}" >> $GITHUB_STEP_SUMMARY
        echo "- **Digest:** ${{ steps.build.outputs.digest }}" >> $GITHUB_STEP_SUMMARY
        if [ "${{ inputs.scan-vulnerabilities }}" == "true" ]; then
          echo "- **Vulnerabilities:** ${{ steps.scan.outputs.vuln-count }}" >> $GITHUB_STEP_SUMMARY
        fi
```

**Usage:**

```yaml
jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Build and push Docker image
        id: docker
        uses: ./.github/actions/docker-build-push
        with:
          image-name: myapp
          registry: ghcr.io
          build-args: |
            BUILD_VERSION=${{ github.sha }}
            BUILD_DATE=${{ github.event.head_commit.timestamp }}
          push: 'true'
          scan-vulnerabilities: 'true'
          registry-username: ${{ github.actor }}
          registry-password: ${{ secrets.GITHUB_TOKEN }}

      - name: Check vulnerability threshold
        if: steps.docker.outputs.vulnerability-count > 10
        run: |
          echo "⚠️ Too many vulnerabilities found: ${{ steps.docker.outputs.vulnerability-count }}"
          exit 1
```

### 3.3 Composite Action with Script Execution

**File:** `.github/actions/semantic-release/action.yml`

```yaml
name: 'Semantic Release'
description: 'Automated versioning and changelog generation'

inputs:
  github-token:
    description: 'GitHub token for creating releases'
    required: true
  npm-token:
    description: 'NPM token for publishing'
    required: false
  dry-run:
    description: 'Run in dry-run mode'
    required: false
    default: 'false'
  branches:
    description: 'Branches to release from (JSON)'
    required: false
    default: '["main"]'

outputs:
  new-release-published:
    description: 'Whether a new release was published'
    value: ${{ steps.semantic.outputs.new-release-published }}
  new-release-version:
    description: 'Version of the new release'
    value: ${{ steps.semantic.outputs.new-release-version }}
  new-release-notes:
    description: 'Release notes for the new release'
    value: ${{ steps.semantic.outputs.new-release-notes }}

runs:
  using: "composite"
  steps:
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20.x'

    - name: Install semantic-release
      shell: bash
      run: |
        npm install -g \
          semantic-release@latest \
          @semantic-release/git \
          @semantic-release/github \
          @semantic-release/npm \
          @semantic-release/changelog

    - name: Create semantic-release config
      shell: bash
      run: |
        cat > .releaserc.json << 'EOF'
        {
          "branches": ${{ inputs.branches }},
          "plugins": [
            "@semantic-release/commit-analyzer",
            "@semantic-release/release-notes-generator",
            "@semantic-release/changelog",
            "@semantic-release/npm",
            "@semantic-release/github",
            [
              "@semantic-release/git",
              {
                "assets": ["package.json", "CHANGELOG.md"],
                "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
              }
            ]
          ]
        }
        EOF

    - name: Run semantic-release
      id: semantic
      shell: bash
      env:
        GITHUB_TOKEN: ${{ inputs.github-token }}
        NPM_TOKEN: ${{ inputs.npm-token }}
      run: |
        if [ "${{ inputs.dry-run }}" == "true" ]; then
          npx semantic-release --dry-run
        else
          npx semantic-release
        fi

        # Capture outputs (semantic-release sets these env vars)
        echo "new-release-published=${NEW_RELEASE_PUBLISHED:-false}" >> $GITHUB_OUTPUT
        echo "new-release-version=${NEW_RELEASE_VERSION:-}" >> $GITHUB_OUTPUT
        echo "new-release-notes=${NEW_RELEASE_NOTES:-}" >> $GITHUB_OUTPUT

    - name: Post-release summary
      if: steps.semantic.outputs.new-release-published == 'true'
      shell: bash
      run: |
        echo "### 🚀 New Release Published" >> $GITHUB_STEP_SUMMARY
        echo "**Version:** ${{ steps.semantic.outputs.new-release-version }}" >> $GITHUB_STEP_SUMMARY
        echo "" >> $GITHUB_STEP_SUMMARY
        echo "**Release Notes:**" >> $GITHUB_STEP_SUMMARY
        echo "${{ steps.semantic.outputs.new-release-notes }}" >> $GITHUB_STEP_SUMMARY
```

---

## 4. Organizational Patterns for Workflow Repos

### 4.1 Monorepo Pattern

**Directory Structure:**
```
.github/
├── workflows/
│   ├── reusable-ci.yml
│   ├── reusable-cd.yml
│   ├── reusable-security.yml
│   └── reusable-docs.yml
├── actions/
│   ├── npm-setup/
│   │   └── action.yml
│   ├── docker-build/
│   │   └── action.yml
│   ├── slack-notify/
│   │   └── action.yml
│   └── terraform-deploy/
│       └── action.yml
└── templates/
    ├── ci-template.yml
    └── cd-template.yml
```

**Pros:**
- Single source of truth
- Easy to test changes together
- Simplified versioning
- Quick local iteration

**Cons:**
- Tighter coupling between components
- Harder to manage permissions
- All-or-nothing versioning

**Example `reusable-ci.yml` referencing local action:**

```yaml
name: Reusable CI

on:
  workflow_call:
    inputs:
      node-version:
        required: true
        type: string

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      # Reference local composite action
      - name: Setup NPM
        uses: ./.github/actions/npm-setup
        with:
          node-version: ${{ inputs.node-version }}

      - name: Run tests
        run: npm test
```

### 4.2 Separate Repository Pattern

**Organization Structure:**
```
org/workflows-repo/
├── .github/workflows/
│   ├── ci.yml
│   ├── cd.yml
│   └── security.yml

org/actions-repo/
├── npm-setup/action.yml
├── docker-build/action.yml
└── slack-notify/action.yml

org/project-a/
├── .github/workflows/
│   └── pipeline.yml  # References workflows-repo and actions-repo
```

**Project Pipeline (org/project-a):**

```yaml
name: Project Pipeline

on: [push, pull_request]

jobs:
  ci:
    uses: org/workflows-repo/.github/workflows/ci.yml@v2
    with:
      node-version: '20.x'
    secrets: inherit

  notify:
    needs: ci
    runs-on: ubuntu-latest
    steps:
      - uses: org/actions-repo/slack-notify@v1
        with:
          status: ${{ needs.ci.result }}
          webhook-url: ${{ secrets.SLACK_WEBHOOK }}
```

**Pros:**
- Clear ownership boundaries
- Independent versioning
- Better access control
- Can have different release cycles

**Cons:**
- Harder to test cross-repo changes
- More complex dependency management
- Requires careful version pinning

### 4.3 Hybrid Pattern (Recommended)

**Structure:**
```
org/shared-workflows/
├── .github/workflows/
│   ├── ci-standard.yml        # v1, v2 tags
│   ├── cd-standard.yml
│   └── security-scan.yml
├── actions/
│   ├── common/                # Shared across all
│   │   ├── setup/action.yml
│   │   └── notify/action.yml
└── README.md

org/frontend-workflows/
├── .github/workflows/
│   ├── react-ci.yml
│   └── next-deploy.yml
└── actions/
    └── ui-specific/action.yml

org/backend-workflows/
├── .github/workflows/
│   ├── api-ci.yml
│   └── db-migrations.yml
└── actions/
    └── api-specific/action.yml
```

**Benefits:**
- Domain-specific organization
- Shared common patterns
- Flexible versioning
- Balanced coupling

**Example Usage:**

```yaml
# In a frontend project
jobs:
  ci:
    uses: org/frontend-workflows/.github/workflows/react-ci.yml@v2
    secrets: inherit

  common-setup:
    runs-on: ubuntu-latest
    steps:
      - uses: org/shared-workflows/actions/common/setup@v1
```

### 4.4 Versioning Strategy

**Semantic Versioning for Workflows:**

```yaml
# Development - use branch for testing
uses: org/workflows/.github/workflows/ci.yml@develop

# Production - use tags
uses: org/workflows/.github/workflows/ci.yml@v1        # Major version
uses: org/workflows/.github/workflows/ci.yml@v1.2      # Minor version
uses: org/workflows/.github/workflows/ci.yml@v1.2.3    # Patch version

# Specific commit (for critical fixes)
uses: org/workflows/.github/workflows/ci.yml@abc123def
```

**Version Management Best Practices:**

1. **Major versions (v1, v2):** Breaking changes
   - Change input/output contracts
   - Remove deprecated features
   - Require caller updates

2. **Minor versions (v1.1, v1.2):** New features
   - Add optional inputs
   - Add new outputs
   - Backward compatible

3. **Patch versions (v1.1.1):** Bug fixes
   - Fix bugs
   - Security patches
   - No feature changes

**Automated Version Tagging:**

```yaml
# .github/workflows/release.yml
name: Release Workflow

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Update major version tag
        run: |
          git config user.name github-actions
          git config user.email github-actions@github.com

          # Extract version
          VERSION=${GITHUB_REF#refs/tags/v}
          MAJOR=$(echo $VERSION | cut -d. -f1)
          MINOR=$(echo $VERSION | cut -d. -f1,2)

          # Update major version tag (v1)
          git tag -fa "v$MAJOR" -m "Update v$MAJOR to $VERSION"
          git push origin "v$MAJOR" --force

          # Update minor version tag (v1.2)
          git tag -fa "v$MINOR" -m "Update v$MINOR to $VERSION"
          git push origin "v$MINOR" --force
```

---

## 5. Common Pitfalls and Solutions

### 5.1 Local Action References in Reusable Workflows

**Problem:**
```yaml
# ❌ This FAILS when called from another repo
name: Reusable Workflow
on:
  workflow_call:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: ./.github/actions/local-action  # ERROR: Can't find action
```

**Why it fails:** When calling a reusable workflow, the repository isn't cloned to disk. The `./.github/actions/local-action` path refers to the CALLER's repo, not the reusable workflow's repo.

**Solutions:**

**Option 1: Hardcode branch in reusable workflow**
```yaml
steps:
  - uses: myorg/workflow-repo/.github/actions/local-action@main
```

**Option 2: Dynamic checkout and reference**
```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout workflow repo
        uses: actions/checkout@v4
        with:
          repository: myorg/workflow-repo
          path: .workflow-repo

      - name: Use local action
        uses: ./.workflow-repo/.github/actions/local-action
```

**Option 3: Publish actions separately**
```yaml
# Use published action instead of local reference
steps:
  - uses: myorg/local-action@v1  # Published as separate repo
```

### 5.2 Secrets Not Passing Through Nested Workflows

**Problem:**
```yaml
# Workflow A calls B, B calls C
# Secrets don't automatically flow A → B → C
```

**Solution:**
```yaml
# Workflow A (caller)
jobs:
  call-b:
    uses: org/workflows/.github/workflows/B.yml@v1
    secrets: inherit  # Pass secrets to B

# Workflow B (middle)
on:
  workflow_call:
    secrets:
      DB_PASSWORD:
        required: true

jobs:
  call-c:
    uses: org/workflows/.github/workflows/C.yml@v1
    secrets:
      DB_PASSWORD: ${{ secrets.DB_PASSWORD }}  # Explicitly pass to C
```

### 5.3 Environment Variables Not Propagating

**Problem:**
```yaml
# ❌ Env vars set in caller don't reach called workflow
env:
  BUILD_ENV: production

jobs:
  deploy:
    uses: ./.github/workflows/deploy.yml@v1
    # BUILD_ENV not available in deploy.yml
```

**Solution:**
```yaml
# Pass as inputs instead of env vars
jobs:
  deploy:
    uses: ./.github/workflows/deploy.yml@v1
    with:
      build-environment: production  # Use inputs
```

### 5.4 GITHUB_TOKEN Permissions

**Problem:**
```yaml
# Caller workflow has write permissions
# Called workflow needs write, but gets read-only
```

**Solution:**
```yaml
# Called workflow must specify permissions
on:
  workflow_call:

permissions:
  contents: write  # Explicitly request permissions
  packages: write

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - name: Publish package
        run: npm publish
```

**Limitation:** Permissions can only be same or MORE restrictive in nested workflows. If parent has `read`, child cannot have `write`.

### 5.5 YAML Syntax Errors

**Common Issues:**

**Indentation errors:**
```yaml
# ❌ Wrong indentation
jobs:
  build:
    runs-on: ubuntu-latest
     steps:  # Too much indentation
      - uses: actions/checkout@v4

# ✅ Correct
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
```

**Tabs vs Spaces:**
```yaml
# ❌ Mixed tabs and spaces (invisible in some editors)
# Use consistent spaces (2 or 4)
```

**Illegal characters:**
```yaml
# ❌ Unescaped special characters
name: Build & Test  # Should be: "Build & Test"

# ✅ Properly quoted
name: "Build & Test"
```

**Solution:** Use YAML linter
```bash
npm install -g yaml-lint
yaml-lint .github/workflows/*.yml
```

### 5.6 Matrix Job Limits

**Problem:**
```yaml
# ❌ Too many matrix combinations
strategy:
  matrix:
    os: [ubuntu, windows, macos]
    node: [14, 16, 18, 20]
    arch: [x64, arm64]
    # 3 × 4 × 2 = 24 jobs (approaching limits)
```

**Solution:**
```yaml
# ✅ Split into focused matrices
strategy:
  matrix:
    include:
      - os: ubuntu-latest
        node: '20.x'
      - os: windows-latest
        node: '20.x'
      - os: macos-latest
        node: '20.x'
      # Only test latest Node on all platforms
```

### 5.7 Composite Action Input Type Issues

**Problem:**
```yaml
# ❌ Composite actions don't support typed inputs
inputs:
  enabled:
    type: boolean  # This is ignored! Always a string
```

**Solution:**
```yaml
# ✅ Handle as strings and convert
runs:
  using: "composite"
  steps:
    - name: Check if enabled
      if: ${{ inputs.enabled == 'true' }}  # String comparison
      shell: bash
      run: echo "Feature enabled"
```

### 5.8 Artifact Upload/Download Between Workflows

**Problem:**
```yaml
# ❌ Artifacts from called workflow not accessible to caller
```

**Solution:**
```yaml
# Called workflow uploads artifact
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: npm run build
      - uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/

# Caller workflow downloads in separate job
jobs:
  call-build:
    uses: ./.github/workflows/build.yml@v1

  deploy:
    needs: call-build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v4
        with:
          name: dist
          path: dist/
```

### 5.9 Path Filters with Pull Requests

**Problem:**
```yaml
# ❌ Path filters only on push don't work for PRs
on:
  push:
    paths:
      - 'src/**'
```

**Solution:**
```yaml
# ✅ Include pull_request event
on:
  push:
    paths:
      - 'src/**'
  pull_request:
    paths:
      - 'src/**'
```

### 5.10 Debugging Failed Workflows

**Best Practices:**

**Enable debug logging:**
```bash
# Set repository secrets
ACTIONS_STEP_DEBUG: true
ACTIONS_RUNNER_DEBUG: true
```

**Add verbose output:**
```yaml
steps:
  - name: Debug context
    run: |
      echo "Event: ${{ github.event_name }}"
      echo "Ref: ${{ github.ref }}"
      echo "SHA: ${{ github.sha }}"
      echo "Actor: ${{ github.actor }}"
```

**Use tmate for interactive debugging:**
```yaml
- name: Setup tmate session
  if: ${{ failure() }}
  uses: mxschmitt/action-tmate@v3
  timeout-minutes: 30
```

---

## 6. Advanced Patterns and Best Practices

### 6.1 Dynamic Workflow Selection

**Problem:** Need to call different workflows based on conditions.

**Solution:**
```yaml
jobs:
  determine-workflow:
    runs-on: ubuntu-latest
    outputs:
      workflow: ${{ steps.select.outputs.workflow }}
    steps:
      - id: select
        run: |
          if [[ "${{ github.event_name }}" == "push" ]]; then
            echo "workflow=ci" >> $GITHUB_OUTPUT
          else
            echo "workflow=pr-check" >> $GITHUB_OUTPUT
          fi

  run-ci:
    needs: determine-workflow
    if: needs.determine-workflow.outputs.workflow == 'ci'
    uses: ./.github/workflows/ci.yml@v1

  run-pr-check:
    needs: determine-workflow
    if: needs.determine-workflow.outputs.workflow == 'pr-check'
    uses: ./.github/workflows/pr-check.yml@v1
```

### 6.2 Monorepo Path-Based Workflows

**Pattern:**
```yaml
name: Monorepo CI

on:
  pull_request:
    paths:
      - 'packages/**'

jobs:
  detect-changes:
    runs-on: ubuntu-latest
    outputs:
      frontend: ${{ steps.filter.outputs.frontend }}
      backend: ${{ steps.filter.outputs.backend }}
    steps:
      - uses: actions/checkout@v4
      - uses: dorny/paths-filter@v3
        id: filter
        with:
          filters: |
            frontend:
              - 'packages/frontend/**'
            backend:
              - 'packages/backend/**'

  frontend-ci:
    needs: detect-changes
    if: needs.detect-changes.outputs.frontend == 'true'
    uses: ./.github/workflows/frontend-ci.yml@v1

  backend-ci:
    needs: detect-changes
    if: needs.detect-changes.outputs.backend == 'true'
    uses: ./.github/workflows/backend-ci.yml@v1
```

### 6.3 Caching Strategies

**Composite action with smart caching:**
```yaml
name: 'Smart NPM Cache'
description: 'Cache with automatic fallback'

runs:
  using: "composite"
  steps:
    - name: Get cache key
      id: cache-key
      shell: bash
      run: |
        HASH=$(md5sum package-lock.json | awk '{print $1}')
        echo "hash=$HASH" >> $GITHUB_OUTPUT
        echo "date=$(date +%Y-%m-%d)" >> $GITHUB_OUTPUT

    - name: Restore cache
      uses: actions/cache/restore@v4
      id: cache
      with:
        path: node_modules
        key: npm-${{ runner.os }}-${{ steps.cache-key.outputs.hash }}
        restore-keys: |
          npm-${{ runner.os }}-${{ steps.cache-key.outputs.date }}
          npm-${{ runner.os }}-

    - name: Install if cache miss
      if: steps.cache.outputs.cache-hit != 'true'
      shell: bash
      run: npm ci

    - name: Save cache
      if: steps.cache.outputs.cache-hit != 'true'
      uses: actions/cache/save@v4
      with:
        path: node_modules
        key: npm-${{ runner.os }}-${{ steps.cache-key.outputs.hash }}
```

### 6.4 Error Handling and Retries

**Composite action with retry logic:**
```yaml
name: 'HTTP Request with Retry'

inputs:
  url:
    required: true
  max-attempts:
    default: '3'

runs:
  using: "composite"
  steps:
    - name: Make request with retry
      shell: bash
      run: |
        ATTEMPTS=0
        MAX_ATTEMPTS=${{ inputs.max-attempts }}

        while [ $ATTEMPTS -lt $MAX_ATTEMPTS ]; do
          if curl -f "${{ inputs.url }}"; then
            echo "Success on attempt $((ATTEMPTS + 1))"
            exit 0
          fi

          ATTEMPTS=$((ATTEMPTS + 1))
          if [ $ATTEMPTS -lt $MAX_ATTEMPTS ]; then
            WAIT=$((ATTEMPTS * 5))
            echo "Attempt $ATTEMPTS failed, waiting ${WAIT}s..."
            sleep $WAIT
          fi
        done

        echo "Failed after $MAX_ATTEMPTS attempts"
        exit 1
```

### 6.5 Multi-Cloud Deployment Pattern

**Reusable workflow:**
```yaml
name: Multi-Cloud Deploy

on:
  workflow_call:
    inputs:
      environment:
        required: true
        type: string
      clouds:
        description: 'JSON array of cloud providers'
        required: true
        type: string  # '["aws", "azure", "gcp"]'
    secrets:
      AWS_CREDENTIALS:
        required: false
      AZURE_CREDENTIALS:
        required: false
      GCP_CREDENTIALS:
        required: false

jobs:
  deploy-aws:
    if: contains(fromJSON(inputs.clouds), 'aws')
    runs-on: ubuntu-latest
    environment: ${{ inputs.environment }}
    steps:
      - uses: actions/checkout@v4
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_CREDENTIALS }}
      - run: ./scripts/deploy-aws.sh

  deploy-azure:
    if: contains(fromJSON(inputs.clouds), 'azure')
    runs-on: ubuntu-latest
    environment: ${{ inputs.environment }}
    steps:
      - uses: actions/checkout@v4
      - uses: azure/login@v2
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}
      - run: ./scripts/deploy-azure.sh

  deploy-gcp:
    if: contains(fromJSON(inputs.clouds), 'gcp')
    runs-on: ubuntu-latest
    environment: ${{ inputs.environment }}
    steps:
      - uses: actions/checkout@v4
      - uses: google-github-actions/auth@v2
        with:
          credentials_json: ${{ secrets.GCP_CREDENTIALS }}
      - run: ./scripts/deploy-gcp.sh
```

**Usage:**
```yaml
jobs:
  deploy-production:
    uses: ./.github/workflows/multi-cloud-deploy.yml@v1
    with:
      environment: production
      clouds: '["aws", "azure"]'
    secrets:
      AWS_CREDENTIALS: ${{ secrets.AWS_PROD_KEY }}
      AZURE_CREDENTIALS: ${{ secrets.AZURE_PROD_CREDS }}
```

---

## 7. Testing and Validation

### 7.1 Local Testing with Act

**Install Act:**
```bash
# macOS
brew install act

# Linux
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash
```

**Test workflows locally:**
```bash
# Test a specific workflow
act -W .github/workflows/ci.yml

# Test with secrets
act -s GITHUB_TOKEN=your-token

# Test specific event
act pull_request

# Test with custom event payload
act -e event.json
```

### 7.2 Workflow Validation in CI

```yaml
name: Validate Workflows

on:
  pull_request:
    paths:
      - '.github/workflows/**'
      - '.github/actions/**'

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Validate YAML syntax
        run: |
          npm install -g yaml-lint
          yaml-lint .github/workflows/*.yml
          yaml-lint .github/actions/**/action.yml

      - name: Validate with actionlint
        uses: reviewdog/action-actionlint@v1
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}

      - name: Check for secrets exposure
        run: |
          if grep -r "ghp_\|gho_\|ghu_\|ghs_\|ghr_" .github/; then
            echo "❌ Potential secret found in workflows!"
            exit 1
          fi
```

### 7.3 Integration Testing Pattern

```yaml
name: Test Reusable Workflows

on:
  pull_request:
    paths:
      - '.github/workflows/reusable-*.yml'

jobs:
  test-ci-workflow:
    uses: ./.github/workflows/reusable-ci.yml@${{ github.head_ref }}
    with:
      node-version: '20.x'
      run-tests: false  # Skip actual tests, just validate workflow runs
    secrets: inherit

  test-deploy-workflow:
    uses: ./.github/workflows/reusable-deploy.yml@${{ github.head_ref }}
    with:
      environment: staging
      dry-run: true  # Don't actually deploy
    secrets: inherit

  verify-results:
    needs: [test-ci-workflow, test-deploy-workflow]
    runs-on: ubuntu-latest
    steps:
      - name: Verify all workflows succeeded
        run: echo "✅ All reusable workflows validated"
```

---

## 8. Security Best Practices

### 8.1 Secrets Management

**Never log secrets:**
```yaml
# ❌ Bad - secrets could leak
- run: echo "Token: ${{ secrets.API_TOKEN }}"

# ✅ Good - use secrets safely
- run: |
    echo "::add-mask::${{ secrets.API_TOKEN }}"
    curl -H "Authorization: Bearer ${{ secrets.API_TOKEN }}" ...
```

**Minimize secret scope:**
```yaml
# Use environment-level secrets
jobs:
  deploy:
    environment: production  # Secrets scoped to production environment
    steps:
      - run: ./deploy.sh
        env:
          DEPLOY_KEY: ${{ secrets.PROD_DEPLOY_KEY }}
```

### 8.2 Dependency Pinning

**Pin action versions:**
```yaml
# ❌ Bad - vulnerable to supply chain attacks
- uses: actions/checkout@main

# ✅ Better - pin to major version
- uses: actions/checkout@v4

# ✅ Best - pin to commit SHA
- uses: actions/checkout@b4ffde65f46336ab88eb53be808477a3936bae11  # v4.1.1
```

### 8.3 Pull Request Security

**Prevent fork PRs from accessing secrets:**
```yaml
name: CI

on:
  pull_request:

jobs:
  test:
    # Don't run on forks with secrets
    if: github.event.pull_request.head.repo.full_name == github.repository
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm test
        env:
          API_KEY: ${{ secrets.API_KEY }}

  test-fork:
    # Separate job for forks without secrets
    if: github.event.pull_request.head.repo.full_name != github.repository
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm test
        # No secrets available
```

---

## 9. Performance Optimization

### 9.1 Artifact Management

**Optimize artifact size:**
```yaml
steps:
  - name: Build
    run: npm run build

  - name: Compress artifacts
    run: tar -czf dist.tar.gz dist/

  - uses: actions/upload-artifact@v4
    with:
      name: build
      path: dist.tar.gz
      retention-days: 7  # Don't keep forever
      compression-level: 6  # Balance size vs speed
```

### 9.2 Concurrent Job Optimization

```yaml
jobs:
  # These run in parallel automatically
  lint:
    runs-on: ubuntu-latest
    steps:
      - run: npm run lint

  test-unit:
    runs-on: ubuntu-latest
    steps:
      - run: npm run test:unit

  test-e2e:
    runs-on: ubuntu-latest
    steps:
      - run: npm run test:e2e

  # This waits for all above
  deploy:
    needs: [lint, test-unit, test-e2e]
    runs-on: ubuntu-latest
    steps:
      - run: ./deploy.sh
```

### 9.3 Cache Everything

**Multi-level caching:**
```yaml
steps:
  # 1. Cache node_modules
  - uses: actions/cache@v4
    with:
      path: node_modules
      key: npm-${{ hashFiles('package-lock.json') }}

  # 2. Cache build output
  - uses: actions/cache@v4
    with:
      path: dist/
      key: build-${{ github.sha }}

  # 3. Cache Docker layers
  - uses: docker/build-push-action@v5
    with:
      cache-from: type=gha
      cache-to: type=gha,mode=max
```

---

## Summary and Quick Reference

### Decision Tree

```
Need to reuse automation?
│
├─ Multiple jobs needed?
│  ├─ Yes → Use Reusable Workflow
│  └─ No → Continue below
│
├─ Different runners needed?
│  ├─ Yes → Use Reusable Workflow
│  └─ No → Continue below
│
├─ Need secrets access?
│  ├─ Yes → Use Reusable Workflow
│  └─ No → Use Composite Action
│
└─ Single runner, bundled steps?
   └─ Yes → Use Composite Action
```

### Key Takeaways

1. **Reusable Workflows** = Full workflows with jobs, secrets, different runners
2. **Composite Actions** = Bundled steps, single runner, no secrets
3. **Always version** your workflows and actions (v1, v1.2, v1.2.3)
4. **Use `secrets: inherit`** for simpler secret passing
5. **Pin dependencies** to commit SHAs for security
6. **Test locally** with Act before pushing
7. **Cache aggressively** for faster builds
8. **Organize** by domain (monorepo vs separate repos)
9. **Document** inputs, outputs, and usage examples
10. **Monitor** workflow performance and optimize

---

## Sources

- [GitHub Docs - Reuse Workflows](https://docs.github.com/en/actions/how-tos/reuse-automations/reuse-workflows)
- [GitHub Docs - Creating Composite Actions](https://docs.github.com/actions/creating-actions/creating-a-composite-action)
- [GitHub Resources - Create Reusable Workflows](https://resources.github.com/learn/pathways/automation/intermediate/create-reusable-workflows-in-github-actions/)
- [GitHub Blog - Using Reusable Workflows](https://github.blog/developer-skills/github/using-reusable-workflows-github-actions/)
- [DevToolHub - Reusable Workflows and Composite Actions](https://devtoolhub.com/github-actions-reusable-workflows-composite-actions/)
- [DEV Community - Composite Actions vs Reusable Workflows](https://dev.to/n3wt0n/composite-actions-vs-reusable-workflows-what-is-the-difference-github-actions-11kd)
- [GitHub Changelog - Simplify Secrets with Reusable Workflows](https://github.blog/changelog/2022-05-03-github-actions-simplify-using-secrets-with-reusable-workflows/)
- [Earthly Blog - Understanding Composite Actions](https://earthly.dev/blog/composite-actions-github/)
- [Graphite Guides - Monorepo with GitHub Actions](https://graphite.com/guides/monorepo-with-github-actions)
- [LogRocket - Monorepo CI/CD Pipelines](https://blog.logrocket.com/creating-separate-monorepo-ci-cd-pipelines-github-actions/)
- [Incredibuild - Best Practices for Reusable Workflows](https://www.incredibuild.com/blog/best-practices-to-create-reusable-workflows-on-github-actions)
- [Moldstud - Common Pitfalls in GitHub Actions](https://moldstud.com/articles/p-avoid-these-common-pitfalls-in-github-actions-key-tips-for-success)

---

**Document Version:** 1.0
**Last Updated:** 2025-12-06
**Research Completed By:** GitHub Actions Architecture Specialist
