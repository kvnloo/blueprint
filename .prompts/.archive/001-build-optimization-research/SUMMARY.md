# Build Optimization Research Summary

**4-way test sharding + browser matrix + caching can reduce 30-min CI to under 5 minutes with zero additional cost**

**Version**: v1
**Completed**: 2024-12-07
**Research Agents**: 10 parallel agents

## Key Findings

- **Test Sharding (80% reduction)**: Split tests across 4 parallel jobs using `--shard=x/y` - near-linear speedup
- **Browser Matrix (3x speedup)**: Run chromium/firefox/webkit in parallel instead of sequential
- **Container-based (70% faster)**: Use `mcr.microsoft.com/playwright` Docker images with pre-installed browsers
- **Browser Caching (40-90s saved)**: Cache `~/.cache/ms-playwright` with version-based keys
- **npm Caching (50s saved)**: Use `actions/setup-node` with `cache: 'npm'`
- **Workers: 2 not 1**: GitHub runners have 2 cores - double the worker count
- **fullyParallel: true**: Better test distribution across shards

## Quick Wins (Immediate Implementation)

| Optimization | Expected Savings | Effort |
|--------------|------------------|--------|
| npm + browser caching | 90-140 seconds | 15 min |
| Change workers 1→2 | 30-40% faster tests | 2 min |
| Install single browser per job | 60 seconds | 5 min |

## High-Impact Changes (Phase 2)

| Optimization | Expected Savings | Effort |
|--------------|------------------|--------|
| 4-way test sharding | 75-80% reduction | 1 hour |
| 3-browser matrix | 66% reduction | 30 min |
| Blob reporter + merge | Enables sharding | 30 min |

## Decisions Needed

1. **Container vs Caching?** - Docker images faster but less flexible
2. **Shard count?** - 4 recommended for 14 test files
3. **Larger runners?** - 4-core is 2x cost but 1.67x faster (worth it for PR blocking)
4. **Keep mobile/tablet projects?** - Currently 8 browser configs, could reduce

## Blockers

- None - all optimizations use standard GitHub Actions features

## Next Step

Create phased implementation plan (002-build-optimization-plan) with:
1. Phase 1: Quick wins (caching, workers)
2. Phase 2: Parallelization (sharding, matrix)
3. Phase 3: Smart testing (path filters)
4. Phase 4: Advanced (containers, larger runners)
