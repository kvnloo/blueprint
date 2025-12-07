# GitHub Actions Build Optimization Implementation Plan

## Objective

Create a detailed, phased implementation plan for optimizing GitHub Actions CI/CD pipelines based on research findings. The plan should be immediately actionable, with specific file changes and testing strategies for each phase.

## Context

### Research Input
@.prompts/001-build-optimization-research/build-optimization-research.md

### Current Workflow Files
@.github/workflows/playwright-tests.yml
@.github/workflows/build-deploy.yml
@website/tests/playwright.config.ts

### Project Context
- **Framework**: Vite-based website with 14 Playwright E2E test files
- **Current pain**: 30+ minute test runs, frequent CI failures
- **Target**: Sub-10 minute test runs with maintained coverage
- **User expertise**: Jenkins/Terraform background, new to GitHub Actions

## Planning Requirements

### Plan Scope

<required_phases>
**Phase 1: Quick Wins (Day 1-2)**
- Immediate optimizations requiring minimal risk
- Focus on caching and parallelization basics
- Should show measurable improvement within hours

**Phase 2: Parallelization (Day 3-5)**
- Matrix strategies for browser parallelization
- Test sharding implementation
- Workflow restructuring for parallel jobs

**Phase 3: Smart Testing (Week 2)**
- Path-based test filtering
- Branch-specific strategies
- PR vs merge optimization

**Phase 4: Advanced Optimizations (Week 3+)**
- Larger runners evaluation
- Pre-built container images
- Long-term architecture improvements
</required_phases>

<per_phase_requirements>
For each phase, provide:
1. **Objective**: What this phase achieves
2. **Prerequisites**: What must be in place first
3. **Changes**: Specific file modifications with diffs
4. **Testing strategy**: How to validate the changes work
5. **Rollback plan**: How to revert if issues arise
6. **Expected impact**: Quantified time savings
7. **Risk assessment**: What could go wrong
</per_phase_requirements>

### Implementation Detail Level

<detail_requirements>
- Full YAML configurations, not pseudocode
- Line-by-line explanations for complex configs
- Before/after comparisons for modified files
- Git commands for the worktree workflow
- Verification commands to test each change
</detail_requirements>

### Worktree Integration

<worktree_requirements>
Plan should include:
1. Commands to create `enhancement/builds` worktree
2. Branch strategy for testing changes
3. PR workflow for merging optimizations
4. How to test CI changes without affecting main
</worktree_requirements>

## Output Specification

### Output Location
`.prompts/002-build-optimization-plan/build-optimization-plan.md`

### Required Structure

```markdown
# Build Optimization Implementation Plan

<metadata>
<topic>github-actions-optimization-plan</topic>
<phases count="4">Quick Wins, Parallelization, Smart Testing, Advanced</phases>
<total_estimated_savings>X minutes per run</total_estimated_savings>
<confidence level="high|medium|low">Plan feasibility confidence</confidence>
</metadata>

## Executive Summary
[Overview of the plan, expected outcomes, timeline]

## Worktree Setup

### Initial Setup Commands
```bash
# Create enhancement/builds worktree
[Commands]
```

### Branch Strategy
[How changes will be tested and merged]

---

## Phase 1: Quick Wins

<phase_metadata>
<duration>1-2 days</duration>
<risk>low</risk>
<expected_savings>X minutes</expected_savings>
</phase_metadata>

### Objective
[What this phase achieves]

### Prerequisites
- [Prereq 1]
- [Prereq 2]

### Change 1.1: [Name]

**File**: `.github/workflows/playwright-tests.yml`

**Current**:
```yaml
[Current configuration]
```

**Updated**:
```yaml
[New configuration with inline comments]
```

**Why**: [Explanation of the change]

**Verification**:
```bash
[Commands to verify this works]
```

### Change 1.2: [Name]
[Same structure]

### Phase 1 Testing Strategy
1. [Step 1]
2. [Step 2]
3. [Step 3]

### Phase 1 Rollback Plan
```bash
[Rollback commands]
```

### Phase 1 Success Criteria
- [ ] [Measurable criterion 1]
- [ ] [Measurable criterion 2]

---

## Phase 2: Parallelization
[Same structure as Phase 1]

---

## Phase 3: Smart Testing
[Same structure as Phase 1]

---

## Phase 4: Advanced Optimizations
[Same structure as Phase 1]

---

## Implementation Checklist

<checklist>
### Pre-Implementation
- [ ] Create enhancement/builds worktree
- [ ] Review current workflow run times (baseline)
- [ ] Ensure gh CLI is authenticated

### Phase 1
- [ ] Change 1.1: [Name]
- [ ] Change 1.2: [Name]
- [ ] Verify Phase 1 improvements
- [ ] Create PR for Phase 1

### Phase 2
- [ ] Change 2.1: [Name]
- [ ] Change 2.2: [Name]
- [ ] Verify Phase 2 improvements
- [ ] Create PR for Phase 2

### Phase 3
- [ ] [Changes]

### Phase 4
- [ ] [Changes]

### Post-Implementation
- [ ] Document new CI architecture
- [ ] Update team on new patterns
- [ ] Monitor for 1 week for stability
</checklist>

## Risk Assessment

<risks>
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| [Risk 1] | Low/Med/High | Low/Med/High | [Mitigation] |
</risks>

## Cost Analysis

<costs>
| Item | Monthly Cost | Notes |
|------|--------------|-------|
| [Current state] | $X | Baseline |
| [After optimization] | $Y | Expected |
| [If using larger runners] | $Z | Optional |
</costs>

<dependencies>
- [Dependency 1]: [Why needed]
- [Dependency 2]: [Why needed]
</dependencies>

<assumptions>
- [Assumption 1]: [Rationale]
- [Assumption 2]: [Rationale]
</assumptions>

<open_questions>
- [Question 1]: [Context]
- [Question 2]: [Context]
</open_questions>
```

### SUMMARY.md Requirement

Create `.prompts/002-build-optimization-plan/SUMMARY.md` with:

```markdown
# Build Optimization Plan Summary

**[Substantive one-liner: e.g., "4-phase plan to reduce CI from 30min to <10min via sharding, caching, and smart test selection"]**

**Version**: v1
**Completed**: [timestamp]
**Based on**: 001-build-optimization-research

## Key Phases
1. **Quick Wins** (Day 1-2): [Summary] → [Expected savings]
2. **Parallelization** (Day 3-5): [Summary] → [Expected savings]
3. **Smart Testing** (Week 2): [Summary] → [Expected savings]
4. **Advanced** (Week 3+): [Summary] → [Expected savings]

## Immediate Actions
1. [First action to take]
2. [Second action to take]
3. [Third action to take]

## Decisions Needed
- [Decision requiring user input]

## Blockers
- [Any external impediments, or "None"]

## Next Step
[Specific command or action to begin Phase 1]
```

## Success Criteria

<success_criteria>
1. All 4 phases fully detailed with specific file changes
2. Complete YAML configurations (not pseudocode)
3. Worktree setup and branch strategy documented
4. Testing and rollback plans for each phase
5. Quantified expected savings per phase
6. Risk assessment with mitigations
7. Cost analysis if larger runners recommended
8. Implementation checklist that can be followed step-by-step
9. SUMMARY.md with substantive one-liner
</success_criteria>

## Execution Notes

<agent_instructions>
1. **Reference research findings** - Build plan directly from research output
2. **Be implementation-ready** - User should be able to copy-paste configurations
3. **Include verification steps** - Every change needs a way to confirm it works
4. **Consider the user's background** - Explain GitHub Actions concepts clearly
5. **Prioritize safety** - Quick wins first, risky changes later
6. **Provide rollback paths** - Every change should be reversible
7. **Calculate cumulative savings** - Show running total of time saved
</agent_instructions>
