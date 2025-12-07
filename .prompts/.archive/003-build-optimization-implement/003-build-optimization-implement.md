# GitHub Actions Build Optimization Implementation

## Objective

Execute Phase 1 (Quick Wins) of the build optimization plan. Create the enhancement/builds worktree, implement caching and basic parallelization improvements, verify they work, and create a PR for review.

## Context

### Plan Reference
@.prompts/002-build-optimization-plan/build-optimization-plan.md

### Current Files to Modify
@.github/workflows/playwright-tests.yml
@.github/workflows/build-deploy.yml
@website/tests/playwright.config.ts

### Worktree Configuration
- **Branch name**: `enhancement/builds`
- **Worktree path**: `worktrees/enhancement-builds`
- **Base branch**: `main`

## Implementation Requirements

### Pre-Implementation Setup

<setup_steps>
1. Create git worktree for enhancement/builds branch
2. Navigate to worktree directory
3. Verify clean working state
4. Create baseline measurement of current CI times
</setup_steps>

### Phase 1 Implementation Checklist

Based on the plan, implement these specific changes:

<implementation_checklist>
**Caching Improvements**:
- [ ] Add npm dependency caching with proper cache keys
- [ ] Add Playwright browser caching
- [ ] Configure cache restoration and save steps

**Parallelization Quick Wins**:
- [ ] Increase worker count from 1 to optimal for runner size
- [ ] Configure fullyParallel properly for CI
- [ ] Optimize browser project configuration

**Workflow Optimizations**:
- [ ] Use `npm ci` instead of `npm install` consistently
- [ ] Add workflow concurrency controls
- [ ] Optimize checkout with sparse checkout if applicable

**Build Caching**:
- [ ] Add Vite/Next.js build cache
- [ ] Configure proper cache keys for build artifacts
</implementation_checklist>

### Change Verification

<verification_requirements>
After each change:
1. Validate YAML syntax: `yamllint` or online validator
2. Run workflow with `workflow_dispatch` trigger
3. Compare run time against baseline
4. Check for any new failures
5. Document the measured improvement
</verification_requirements>

### PR Creation

<pr_requirements>
Create PR with:
- **Title**: "perf(ci): Phase 1 build optimization - caching and parallelization"
- **Body**: Include baseline vs. new times, changes made, verification results
- **Labels**: `ci`, `performance`, `enhancement`
- **Base branch**: `main`
</pr_requirements>

## Output Specification

### Files to Create/Modify

1. **Worktree setup** (in worktrees/enhancement-builds):
   - Modified `.github/workflows/playwright-tests.yml`
   - Modified `.github/workflows/build-deploy.yml`
   - Possibly modified `website/tests/playwright.config.ts`

2. **Documentation**:
   - Implementation log with before/after metrics

### SUMMARY.md Requirement

Create `.prompts/003-build-optimization-implement/SUMMARY.md` with:

```markdown
# Phase 1 Implementation Summary

**[Substantive one-liner: e.g., "Implemented npm caching, browser caching, and 4x parallelization - baseline 28min → target <15min"]**

**Version**: v1
**Completed**: [timestamp]
**Based on**: 002-build-optimization-plan

## Files Modified
- `.github/workflows/playwright-tests.yml`: [Changes summary]
- `.github/workflows/build-deploy.yml`: [Changes summary]
- [Other files if modified]

## Metrics
- **Baseline time**: [X minutes]
- **Post-optimization**: [Y minutes]
- **Improvement**: [Z% faster]

## Changes Implemented
1. [Change 1]: [Impact]
2. [Change 2]: [Impact]
3. [Change 3]: [Impact]

## Verification Results
- [ ] YAML syntax valid
- [ ] Workflow runs successfully
- [ ] Tests still pass
- [ ] Time improvement measured

## PR Status
- **PR Number**: #[N]
- **PR URL**: [URL]
- **Status**: [Draft/Ready for Review]

## Decisions Needed
- [Any decisions requiring user approval]

## Blockers
- [Any issues encountered, or "None"]

## Next Step
[Proceed to Phase 2 / Merge PR / Address feedback]
```

## Success Criteria

<success_criteria>
1. Enhancement/builds worktree created and working
2. All Phase 1 changes from plan implemented
3. YAML files validate without errors
4. At least one workflow run completed successfully
5. Measurable improvement in run time documented
6. PR created with proper description
7. SUMMARY.md with metrics and verification results
</success_criteria>

## Execution Notes

<agent_instructions>
1. **Follow the plan exactly** - Implement what was planned, don't improvise
2. **Test incrementally** - Verify each change before moving to next
3. **Document everything** - Record baseline times, changes, results
4. **Create atomic commits** - One logical change per commit
5. **Handle failures gracefully** - If something doesn't work, document why and continue with what does
6. **Use worktree isolation** - All changes in worktree, don't affect main working directory
</agent_instructions>

<git_workflow>
```bash
# Create worktree
git worktree add worktrees/enhancement-builds -b enhancement/builds main

# Navigate to worktree
cd worktrees/enhancement-builds

# Make changes
# ... implementation ...

# Commit changes
git add .github/workflows/
git commit -m "perf(ci): add npm and playwright browser caching"

git add website/tests/playwright.config.ts
git commit -m "perf(ci): optimize playwright parallelization for CI"

# Push and create PR
git push -u origin enhancement/builds
gh pr create --title "perf(ci): Phase 1 build optimization" --body-file pr-description.md
```
</git_workflow>
