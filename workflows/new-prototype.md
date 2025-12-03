# New Prototype Workflow

This workflow guides the creation of a new vertical farming prototype from concept to digital twin.

## Overview

```
Day 1: Concept & Research
    │
    ▼
Day 2-3: Specification Development
    │
    ▼
Day 4-5: BOM & Cost Optimization
    │
    ▼
Day 6-7: Asset Creation (Blender)
    │
    ▼
Day 8-9: Scene Assembly (UE5)
    │
    ▼
Day 10: Evaluation & Documentation
```

## Step 1: Concept Definition

### Inputs Required
- Problem statement: What specific need does this prototype address?
- Target constraints: Budget, space, automation level
- Crop focus: Which plants are prioritized?

### Process
1. **Define the concept** in 2-3 sentences
2. **Identify differentiators** from existing prototypes
3. **Set measurable goals** for key metrics

### Output
```yaml
concept:
  name: "[Prototype Name]"
  summary: "[2-3 sentence description]"
  differentiators:
    - "[What makes this unique]"
  target_metrics:
    setup_cost: "$X"
    automation_score: "X/100"
    yield_per_sqft: "X lbs/year"
```

## Step 2: Research Phase

### Agent: Research Agent

### Process
1. **Scan knowledge base** for relevant existing research
2. **Search for new research** if gaps identified
3. **Compile findings** relevant to this concept

### Commands
```yaml
task:
  type: research_scan
  topics:
    - "[Growing method]"
    - "[Target crops]"
    - "[Specific technologies]"
  depth: standard
```

### Output
- Research summary in `knowledge/research/summaries/`
- Updated `knowledge/research/index.json`

## Step 3: Specification Development

### Process
1. **Copy template** from `specs/templates/prototype-spec-template.md`
2. **Create prototype directory**: `specs/prototypes/[name]-v1/`
3. **Fill in all sections** of the specification
4. **Define prompt stack** used

### Files to Create
```
specs/prototypes/[name]-v1/
├── spec.md           # Main specification (from template)
├── bom.json          # Bill of materials
├── automation.json   # Automation scoring
└── assets/           # Reference images, sketches
```

### Checklist
- [ ] Physical dimensions defined
- [ ] Growing method specified
- [ ] Capacity calculated
- [ ] All sections of spec.md completed

## Step 4: Bill of Materials

### Agent: Cost Optimizer

### Process
1. **List all components** by category
2. **Research pricing** from multiple sources
3. **Identify DIY alternatives** for each
4. **Calculate totals** and ROI projections

### Commands
```yaml
task:
  type: build_bom
  prototype: "[name]-v1"
  components:
    structure: ["frame", "shelves", "mounting"]
    electrical: ["lights", "wiring", "timers"]
    plumbing: ["reservoir", "pump", "tubing"]
    sensors: ["pH", "EC", "temp", "level"]
    automation: ["controller", "relays", "dosing"]
```

### Output
- Complete `bom.json` with pricing
- Cost comparison analysis
- ROI projection

## Step 5: Asset Creation

### Agent: Design Agent

### Process
1. **Review physical specifications** from spec.md
2. **Determine generation method** for each component
3. **Create assets** in Blender using Blender-MCP
4. **Export FBX** to `assets/blender/exports/`

### Commands
```yaml
task:
  type: create_assets
  prototype: "[name]-v1"
  components:
    - name: "main_frame"
      method: "blender_procedural"
      specs:
        dimensions: [48, 24, 72]
        unit: "inches"
        material: "steel"
    - name: "growing_container"
      method: "rodin"
      specs:
        description: "20L rectangular bin with drainage"
        material: "plastic"
```

### Quality Checklist
- [ ] Dimensions match specification
- [ ] UVs properly unwrapped
- [ ] Basic PBR materials applied
- [ ] Origin points at logical locations
- [ ] Naming convention followed
- [ ] FBX exported with "Apply Modifiers"

## Step 6: Scene Assembly

### Agent: Simulation Agent

### Process
1. **Import assets** to UE5 via Datasmith
2. **Create scene hierarchy** per template
3. **Position actors** according to spec
4. **Create materials** for water, LEDs, etc.
5. **Build Blueprints** for simulation
6. **Configure Cesium** for geolocation

### Commands
```yaml
task:
  type: assemble_scene
  prototype: "[name]-v1"
  assets_manifest: "assets/blender/exports/[name]-v1-manifest.json"
  location:
    latitude: 40.7128
    longitude: -74.0060
  simulations:
    - water_flow
    - light_cycling
    - plant_growth
```

### Validation Checklist
- [ ] All assets imported correctly
- [ ] Scene hierarchy organized
- [ ] Materials rendering properly
- [ ] Blueprints compiling
- [ ] Physics stable
- [ ] Cesium connected
- [ ] Target FPS achieved (>60)

## Step 7: Evaluation

### Agent: Evaluator Agent

### Process
1. **Calculate all metrics** for new prototype
2. **Compare to existing prototypes**
3. **Generate rankings** and recommendations
4. **Update comparison dashboard**

### Commands
```yaml
task:
  type: evaluate_prototype
  prototype: "[name]-v1"
  compare_to: "all"
  generate_recommendations: true
```

### Outputs
- Updated `specs/comparisons/prototype-comparison.json`
- New entry in `data/iterations/history.jsonl`
- Recommendations for next iteration

## Step 8: Documentation

### Process
1. **Review and complete** spec.md
2. **Add to README** if significant
3. **Update any affected prompts** in knowledge base
4. **Commit to Git** with descriptive message

### Git Commit
```bash
git add specs/prototypes/[name]-v1/
git add assets/blender/exports/[name]*
git add data/iterations/history.jsonl
git commit -m "feat(prototype): add [name] v0.1

- [Summary of design]
- Setup cost: $X
- Automation score: X/100
- Target yield: X lbs/year

Closes #XX"
```

## Timeline Summary

| Day | Activity | Agent(s) |
|-----|----------|----------|
| 1 | Concept definition, research | Human, Research |
| 2-3 | Specification writing | Human |
| 4-5 | BOM development, cost optimization | Cost Optimizer |
| 6-7 | Asset creation in Blender | Design |
| 8-9 | Scene assembly in UE5 | Simulation |
| 10 | Evaluation, documentation | Evaluator, Human |

## Expedited Timeline (3 Days)

For simpler prototypes or iterations:

| Day | Activity |
|-----|----------|
| 1 | Concept + Spec + BOM |
| 2 | Asset creation + Scene assembly |
| 3 | Evaluation + Documentation |

## Common Issues

### Asset Import Problems
- **Issue**: FBX imports with wrong scale
- **Solution**: Ensure Blender export uses same units as UE5 (cm)

### Material Transfer Failures
- **Issue**: Complex Blender materials don't appear in UE5
- **Solution**: Use only basic PBR in Blender, recreate complex materials in UE5

### Blueprint Compilation Errors
- **Issue**: Blueprint won't compile after MCP generation
- **Solution**: Review generated code for missing variable declarations

### Performance Issues
- **Issue**: Scene runs below 60 FPS
- **Solution**: Reduce particle counts, enable LODs, check draw call count
