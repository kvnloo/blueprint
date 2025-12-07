# Build Optimization Plan Summary

**4-phase plan to reduce CI from 30min to 5min: caching (Phase 1) → sharding (Phase 2) → smart filtering (Phase 3) → containers (Phase 4)**

**Version**: v1
**Completed**: 2024-12-07
**Based on**: 001-build-optimization-research

## Key Phases

| Phase | Timeline | Changes | Expected Savings |
|-------|----------|---------|------------------|
| **1. Quick Wins** | Day 1-2 | npm caching, browser caching, workers 1→2 | 25% (30→22 min) |
| **2. Parallelization** | Day 3-5 | 4-way sharding, browser matrix, 12 parallel jobs | 83% (30→5 min) |
| **3. Smart Testing** | Week 2 | dorny/paths-filter, skip docs-only PRs | 20-50% fewer runs |
| **4. Advanced** | Week 3+ | Container images, larger runners (optional) | Additional 30% |

## Immediate Actions

1. **Create worktree**:
   ```bash
   git worktree add worktrees/enhancement-builds -b enhancement/builds main
   cd worktrees/enhancement-builds
   ```

2. **Apply Phase 1 changes** (caching + workers):
   - Update `.github/workflows/playwright-tests.yml`
   - Update `website/tests/playwright.config.ts`

3. **Test and measure**:
   ```bash
   gh workflow run playwright-tests.yml --ref enhancement/builds
   gh run watch
   ```

## Decisions Needed

1. **Reduce browser projects?** - Currently 8 configs, recommend 3-5
2. **Container vs caching?** - Containers simpler, caching more flexible
3. **Larger runners?** - 2x cost for 1.67x speed (GitHub Team/Enterprise required)

## Blockers

- None - all optimizations use standard GitHub Actions features

## Next Step

```bash
# Begin Phase 1 implementation
cd /home/kvn/workspace/evolve/repos/blueprint
git worktree add worktrees/enhancement-builds -b enhancement/builds main
cd worktrees/enhancement-builds
# Then apply the workflow changes from build-optimization-plan.md
```
