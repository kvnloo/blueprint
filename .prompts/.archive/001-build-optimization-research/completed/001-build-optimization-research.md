# GitHub Actions Build Optimization Research

## Objective

Conduct comprehensive research on optimizing GitHub Actions CI/CD pipelines, with specific focus on Playwright test execution optimization. The goal is to reduce build times from the current 30+ minute ceiling to under 10 minutes while maintaining test coverage and reliability.

## Context

### Current State Analysis
<current_workflows>
**Playwright Tests Workflow** (playwright-tests.yml):
- Triggers: push to main, dev, feature/*, fix/* branches + PRs to main/dev
- Full test job: 30-minute timeout, runs all 3 browsers (chromium, firefox, webkit)
- Smoke test job: 10-minute timeout, chromium only, runs on PRs
- Installs all 3 browser binaries every run
- Workers: 1 in CI (sequential execution despite `fullyParallel: true`)
- 8 browser configurations tested (3 desktop + 2 mobile + 1 tablet + 2 desktop resolutions)

**Build Deploy Workflow** (build-deploy.yml):
- Triggers: push to main and dev
- Builds both branches sequentially
- No caching for node_modules
- Uses `npm install` instead of `npm ci`

**Test Suite Scope** (14 spec files):
- accessibility.spec.ts, navigation.spec.ts, home-sections.spec.ts
- performance.spec.ts, visual-regression.spec.ts, mobile-responsive.spec.ts
- component-interactions.spec.ts, hero.spec.ts, research-hub.spec.ts
- user-journeys.spec.ts, visualization-components.spec.ts
- article-view.spec.ts, conversion-integrity.spec.ts, example.spec.ts
</current_workflows>

<pain_points>
1. Playwright browser installation takes 2-3 minutes per run
2. Running 8 browser configurations sequentially with `workers: 1`
3. No test sharding across parallel jobs
4. Duplicate dependency installation across workflow jobs
5. No build caching between workflow runs
6. All tests run on every push, no smart test selection
7. No branch-specific test strategies
</pain_points>

<user_background>
- Experienced with Jenkins and Terraform
- Limited GitHub Actions experience
- Looking for expert DevOps guidance
</user_background>

## Research Requirements

### Primary Research Areas

<research_area id="1" priority="critical">
**GitHub Actions Parallelization & Matrix Strategies**
- Matrix strategy configuration for browser parallelization
- Job parallelization patterns (sharding vs matrix)
- Optimal worker count for different runner sizes
- Self-hosted vs GitHub-hosted runner trade-offs
- Larger runner tiers and their cost/benefit analysis
</research_area>

<research_area id="2" priority="critical">
**Playwright-Specific Optimizations**
- Browser caching strategies (actions/cache, playwright caching)
- Test sharding configuration (--shard flag usage)
- Optimal parallelization settings for CI
- Browser binary caching across workflow runs
- Project-based test organization for selective execution
</research_area>

<research_area id="3" priority="high">
**Dependency & Build Caching**
- npm cache configuration in GitHub Actions
- Next.js / Vite build caching strategies
- Docker layer caching for complex setups
- Artifact caching between jobs
- Cache key strategies and invalidation patterns
</research_area>

<research_area id="4" priority="high">
**Smart Test Selection**
- Path-based test filtering (`paths` trigger configuration)
- Changed-file-based test selection
- Test impact analysis tools
- Branch-specific test strategies (PR vs main vs dev)
- Skip conditions and required checks configuration
</research_area>

<research_area id="5" priority="medium">
**Workflow Architecture Patterns**
- Reusable workflow design
- Composite actions for common steps
- Job dependency optimization
- Concurrent workflow limits and queue management
- Required status checks optimization
</research_area>

<research_area id="6" priority="medium">
**Advanced Optimization Techniques**
- GitHub Actions larger runners (4-core, 8-core, GPU)
- Turborepo/Nx for monorepo optimization
- Container-based workflows for faster setup
- Pre-built Docker images with browsers installed
- Merge queues for main branch protection
</research_area>

### Verification Requirements

<verification_checklist>
For each major recommendation, verify:
- [ ] Official GitHub Actions documentation confirms approach
- [ ] Playwright official docs support the optimization
- [ ] Real-world benchmarks or case studies exist
- [ ] Cost implications are documented (runner costs, storage)
- [ ] Compatibility with current Node.js 20 / Vite stack confirmed
</verification_checklist>

### Sources to Consult

<required_sources>
1. GitHub Actions official documentation (docs.github.com)
2. Playwright CI documentation (playwright.dev/docs/ci)
3. GitHub Actions marketplace for relevant actions
4. GitHub Engineering blog for best practices
5. Microsoft DevBlogs (Playwright team posts)
</required_sources>

<optional_sources>
- CircleCI/GitLab CI comparison articles (for pattern ideas)
- DevOps community case studies (dev.to, medium engineering blogs)
- GitHub Community discussions
- Playwright GitHub issues for CI-related discussions
</optional_sources>

## Output Specification

### Output Location
`.prompts/001-build-optimization-research/build-optimization-research.md`

### Required Structure

```markdown
# Build Optimization Research Findings

<metadata>
<topic>github-actions-playwright-optimization</topic>
<confidence level="high|medium|low">Overall confidence in findings</confidence>
<research_depth>exhaustive|comprehensive|focused</research_depth>
<sources_consulted count="N">List of sources with URLs</sources_consulted>
</metadata>

## Executive Summary
[2-3 paragraph synthesis of key findings and recommended approach]

## Research Findings by Area

### 1. Parallelization & Matrix Strategies
<finding id="1.1" confidence="high|medium|low" verified="true|false">
**Finding Title**
- What: [Description]
- Evidence: [Source with URL]
- Implementation: [How to implement]
- Impact: [Expected time savings]
</finding>
[Repeat for each finding]

### 2. Playwright-Specific Optimizations
[Same structure]

### 3. Dependency & Build Caching
[Same structure]

### 4. Smart Test Selection
[Same structure]

### 5. Workflow Architecture Patterns
[Same structure]

### 6. Advanced Optimization Techniques
[Same structure]

## Comparative Analysis

<optimization_matrix>
| Optimization | Time Savings | Implementation Effort | Cost Impact | Risk Level |
|--------------|--------------|----------------------|-------------|------------|
| [Name] | [Estimate] | Low/Medium/High | [$/savings] | Low/Med/High |
</optimization_matrix>

## Recommended Implementation Order

<recommendations priority="immediate">
1. [Optimization] - Expected impact: X minutes saved
2. [Optimization] - Expected impact: X minutes saved
</recommendations>

<recommendations priority="short_term">
[Week 2-3 implementations]
</recommendations>

<recommendations priority="long_term">
[Month 2+ considerations]
</recommendations>

## Quality Report

<verification_status>
### Verified Claims
- [Claim 1] - Source: [URL]
- [Claim 2] - Source: [URL]

### Assumed/Inferred Claims
- [Claim 1] - Reasoning: [Why assumed]

### Uncertain Areas
- [Area] - Why: [Explanation]
</verification_status>

<assumptions>
- [Assumption 1]: [Context and rationale]
- [Assumption 2]: [Context and rationale]
</assumptions>

<dependencies>
- [Dependency 1]: [Why needed for implementation]
- [Dependency 2]: [Why needed for implementation]
</dependencies>

<open_questions>
- [Question 1]: [Why it matters]
- [Question 2]: [Why it matters]
</open_questions>

## Appendix: Code Examples

### Example 1: Optimized Playwright Workflow
```yaml
[Complete workflow example]
```

### Example 2: Matrix Strategy Configuration
```yaml
[Matrix configuration example]
```

### Example 3: Caching Configuration
```yaml
[Caching example]
```
```

### SUMMARY.md Requirement

Create `.prompts/001-build-optimization-research/SUMMARY.md` with:

```markdown
# Build Optimization Research Summary

**[Substantive one-liner describing the key finding/recommendation]**

**Version**: v1
**Completed**: [timestamp]

## Key Findings
- [Actionable finding 1 with expected impact]
- [Actionable finding 2 with expected impact]
- [Actionable finding 3 with expected impact]
- [Additional findings...]

## Quick Wins (Immediate Implementation)
- [Optimization 1]: [Expected time savings]
- [Optimization 2]: [Expected time savings]

## Decisions Needed
- [Decision 1 requiring user input]
- [Decision 2 requiring user input]

## Blockers
- [Any external impediments]

## Next Step
[Concrete action to take after research]
```

## Success Criteria

<success_criteria>
1. All 6 research areas addressed with verified findings
2. At least 3 findings per area with confidence levels
3. Optimization matrix comparing all options
4. Prioritized implementation roadmap
5. Complete code examples for top 3 recommendations
6. SUMMARY.md with substantive one-liner (not generic)
7. All critical priority findings verified against official docs
8. Cost implications documented for paid features
</success_criteria>

## Execution Notes

<agent_instructions>
1. **Use web search extensively** - GitHub Actions and Playwright docs are the authoritative sources
2. **Verify claims** - Check official documentation before including recommendations
3. **Be specific** - Include actual configuration examples, not just concepts
4. **Calculate impacts** - Provide estimated time savings based on current pain points
5. **Consider cost** - GitHub Actions billing for larger runners is per-minute
6. **Write streaming** - Write findings to output file progressively to preserve work
7. **Cross-reference** - Note where multiple sources confirm a finding
</agent_instructions>
