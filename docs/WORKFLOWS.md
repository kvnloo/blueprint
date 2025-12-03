# Workflows

Step-by-step procedures for common operations in the autonomous vertical farming system.

## Table of Contents

- [New Prototype Workflow](#new-prototype-workflow)
- [Optimize Existing Prototype](#optimize-existing-prototype)
- [Compare Prototypes](#compare-prototypes)
- [Asset Creation Workflow](#asset-creation-workflow)
- [Self-Optimizing Loop](#self-optimizing-loop)

---

## New Prototype Workflow

Create a new farming prototype from concept to digital twin.

### Prerequisites
- Knowledge base populated with prompts and research
- Blender + Blender-MCP configured
- UE5 + Flopperam MCP configured
- Claude Flow access

### Steps

```
┌────────────────────────────────────────────────────────────────┐
│ STEP 1: CONCEPT DEFINITION                                     │
│ Duration: 1-2 hours                                            │
├────────────────────────────────────────────────────────────────┤
│ □ Define primary design goals                                  │
│ □ Identify target crops                                        │
│ □ Set budget constraints                                       │
│ □ Determine automation level target                            │
│ □ Choose growing method (NFT, DWC, aeroponics, etc.)          │
└────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌────────────────────────────────────────────────────────────────┐
│ STEP 2: RESEARCH PHASE                                         │
│ Duration: 2-4 hours | Agent: Research Agent                    │
├────────────────────────────────────────────────────────────────┤
│ □ Search for similar existing designs                          │
│ □ Find component specifications                                │
│ □ Identify best practices for chosen growing method            │
│ □ Compile sensor/automation requirements                       │
│ □ Document findings in knowledge/research/summaries/           │
└────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌────────────────────────────────────────────────────────────────┐
│ STEP 3: SPECIFICATION GENERATION                               │
│ Duration: 1-2 hours | Agent: Spec Generator                    │
├────────────────────────────────────────────────────────────────┤
│ □ Assemble prompt stack (base + research + components)         │
│ □ Generate initial specification document                      │
│ □ Review and adjust physical specifications                    │
│ □ Create initial BOM                                           │
│ □ Save to specs/prototypes/{name}-v1/spec.md                  │
└────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌────────────────────────────────────────────────────────────────┐
│ STEP 4: COST OPTIMIZATION                                      │
│ Duration: 2-3 hours | Agent: Cost Optimizer                    │
├────────────────────────────────────────────────────────────────┤
│ □ Search all BOM items across suppliers                        │
│ □ Find DIY alternatives                                        │
│ □ Calculate total costs                                        │
│ □ Compute ROI projections                                      │
│ □ Update spec with optimized BOM                               │
└────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌────────────────────────────────────────────────────────────────┐
│ STEP 5: ASSET CREATION                                         │
│ Duration: 4-8 hours | Agent: Design Agent                      │
├────────────────────────────────────────────────────────────────┤
│ □ Create component list from spec                              │
│ □ Generate each mesh (Blender/Rodin)                          │
│ □ Apply materials and UV unwrap                                │
│ □ Run quality checklist                                        │
│ □ Export FBX to assets/blender/exports/                       │
└────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌────────────────────────────────────────────────────────────────┐
│ STEP 6: DIGITAL TWIN ASSEMBLY                                  │
│ Duration: 4-6 hours | Agent: Simulation Agent                  │
├────────────────────────────────────────────────────────────────┤
│ □ Import FBX assets to UE5                                     │
│ □ Create scene hierarchy                                       │
│ □ Build materials (water, LED, plants)                         │
│ □ Create simulation Blueprints                                 │
│ □ Configure Cesium geolocation                                 │
│ □ Test simulation runs                                         │
└────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌────────────────────────────────────────────────────────────────┐
│ STEP 7: EVALUATION                                             │
│ Duration: 1 hour | Agent: Evaluator Agent                      │
├────────────────────────────────────────────────────────────────┤
│ □ Calculate automation score                                   │
│ □ Compare to existing prototypes                               │
│ □ Generate comparison report                                   │
│ □ Identify optimization opportunities                          │
│ □ Log iteration to history.jsonl                              │
└────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌────────────────────────────────────────────────────────────────┐
│ STEP 8: COMMIT & DOCUMENT                                      │
│ Duration: 30 minutes                                           │
├────────────────────────────────────────────────────────────────┤
│ □ Git commit all changes                                       │
│ □ Update README if needed                                      │
│ □ Tag version                                                  │
│ □ Archive any superseded prototypes                            │
└────────────────────────────────────────────────────────────────┘
```

### Time Estimate
**Total: 15-26 hours** for first prototype (faster with practice)

---

## Optimize Existing Prototype

Improve an existing prototype based on new research or cost data.

### Trigger Conditions
- New research paper discovered
- Price drop detected (>10% on key component)
- Performance issue identified
- User feedback received

### Steps

```bash
# 1. Identify optimization opportunity
cat specs/prototypes/grow-tower-v3/spec.md

# 2. Run Research Agent for targeted search
# Example: "ESP32 cheaper alternative" or "pH sensor accuracy improvement"

# 3. Update specification
# Edit specs/prototypes/grow-tower-v3/spec.md
# Increment version number

# 4. If physical changes required:
#    → Run Design Agent to update assets
#    → Run Simulation Agent to update digital twin

# 5. Run Evaluator Agent
# Compare new version against previous

# 6. Log iteration
echo '{"timestamp": "...", "prototype": "grow-tower", "version": "0.4", ...}' >> data/iterations/history.jsonl

# 7. Commit
git add .
git commit -m "grow-tower v0.4: Optimized pH sensor selection"
```

### Decision Thresholds

| Metric | Threshold | Action |
|--------|-----------|--------|
| Cost reduction | >10% | Update BOM |
| Automation improvement | >5 points | Update spec + digital twin |
| New research finding | High impact | Full re-evaluation |
| Bug/issue fix | Any | Immediate update |

---

## Compare Prototypes

Generate a comprehensive comparison of all active prototypes.

### When to Run
- After any prototype update
- Weekly scheduled run
- Before making build decisions

### Procedure

```python
# compare_prototypes.py

import json
import yaml
from pathlib import Path

def load_all_prototypes():
    """Load all active prototype specifications."""
    prototypes = []
    specs_dir = Path("specs/prototypes")
    
    for proto_dir in specs_dir.iterdir():
        if proto_dir.is_dir():
            spec_file = proto_dir / "spec.md"
            if spec_file.exists():
                # Parse YAML frontmatter from markdown
                spec = parse_spec(spec_file)
                if spec.get('status') == 'active':
                    prototypes.append(spec)
    
    return prototypes

def generate_comparison(prototypes):
    """Generate comparison report."""
    report = {
        'report_date': datetime.now().isoformat(),
        'prototypes_analyzed': len(prototypes),
        'summary_table': [],
        'analysis': {},
        'recommendations': []
    }
    
    for proto in prototypes:
        auto_score = calculate_automation_score(proto)
        complexity = calculate_complexity(proto)
        
        report['summary_table'].append({
            'prototype': proto['metadata']['name'],
            'cost': proto['economics']['setup_cost'],
            'automation_score': auto_score,
            'complexity_score': complexity,
            'roi': proto['economics']['roi'],
            'overall_score': calculate_overall(proto, prototypes)
        })
    
    # Sort and analyze
    by_cost = sorted(report['summary_table'], key=lambda x: x['cost'])
    by_auto = sorted(report['summary_table'], key=lambda x: x['automation_score'], reverse=True)
    by_roi = sorted(report['summary_table'], key=lambda x: x['roi'], reverse=True)
    
    report['analysis'] = {
        'best_for_lowest_cost': by_cost[0]['prototype'],
        'best_for_highest_automation': by_auto[0]['prototype'],
        'best_for_fastest_roi': by_roi[0]['prototype'],
        'best_overall': sorted(report['summary_table'], 
                               key=lambda x: x['overall_score'], 
                               reverse=True)[0]['prototype']
    }
    
    return report

# Save to specs/comparisons/
```

### Output Location
`specs/comparisons/prototype-comparison.json`

---

## Asset Creation Workflow

Detailed workflow for creating 3D assets from specification to UE5-ready FBX.

### Phase 1: Blender Asset Creation

```
┌─────────────────────────────────────────────────────────────────┐
│ COMPONENT: Steel Rack Frame                                     │
│ Method: Blender Procedural                                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Claude → Blender-MCP:                                          │
│ "Create unistrut steel rack:                                   │
│  - 48x24x72 inches                                             │
│  - 5 shelves at 14 inch spacing                                │
│  - 1-5/8 inch channel profile                                  │
│  - Cross-bracing on sides                                      │
│  - Origin at bottom center                                     │
│  - Apply metallic gray material"                               │
│                                                                 │
│ Blender-MCP executes Python:                                   │
│ → Creates parametric mesh                                      │
│ → Applies modifiers (array, mirror)                           │
│ → Sets material to Principled BSDF                             │
│ → UV unwraps                                                   │
│                                                                 │
│ Output: rack_frame_v1.blend                                    │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ COMPONENT: Hydroponic Bin                                       │
│ Method: Rodin AI                                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Claude → Rodin (via Blender-MCP):                              │
│ "Generate plastic storage bin:                                 │
│  - 20x15x6 inches                                              │
│  - Drainage holes in bottom (8 holes, 1/4 inch)               │
│  - Slight taper for stacking                                   │
│  - Reinforced rim                                              │
│  - Matte black plastic material"                               │
│                                                                 │
│ Rodin generates:                                               │
│ → Quad mesh with proper topology                               │
│ → PBR materials (albedo, roughness, normal)                   │
│ → Production-ready geometry                                    │
│                                                                 │
│ Output: hydro_bin_v1.fbx                                       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ COMPONENT: Plant Visualization                                  │
│ Method: Asset Library                                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Claude → PolyHaven/Sketchfab (via Blender-MCP):               │
│ "Find lettuce plant model, ~6 inches tall"                     │
│                                                                 │
│ Import and adapt:                                              │
│ → Scale to correct size                                        │
│ → Simplify if poly count too high                             │
│ → Adjust materials for UE5 compatibility                      │
│                                                                 │
│ Output: lettuce_plant_v1.fbx                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Phase 2: Export for UE5

```bash
# Quality Checklist
□ All meshes have clean topology (no n-gons)
□ UV maps present and non-overlapping
□ Materials use only basic PBR channels
□ Scale is correct (1 unit = 1 cm in UE5)
□ Origin points are logically placed
□ Naming follows convention

# Export Settings (Blender)
- Format: FBX
- Scale: 1.0
- Apply Modifiers: Yes
- Forward: -Y Forward
- Up: Z Up
- Apply Transform: Yes
- Mesh: UVs, Normals, Materials

# Export command
bpy.ops.export_scene.fbx(
    filepath="assets/blender/exports/grow-tower_frame_v1.fbx",
    use_selection=True,
    apply_scale_options='FBX_SCALE_ALL',
    bake_space_transform=True
)
```

### Phase 3: UE5 Import & Assembly

```
┌─────────────────────────────────────────────────────────────────┐
│ STEP 1: IMPORT                                                  │
├─────────────────────────────────────────────────────────────────┤
│ Use Datasmith for best results:                                │
│ → File > Import into Level > Datasmith > FBX                  │
│ → Maintains material assignments                               │
│ → Handles scale correctly                                      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 2: MATERIAL RECREATION                                     │
├─────────────────────────────────────────────────────────────────┤
│ Create UE5 materials for:                                      │
│ → Water (translucent, caustics, Niagara integration)          │
│ → LED emissive (controllable intensity)                       │
│ → Plants (subsurface scattering for leaves)                   │
│ → Metal (standard PBR)                                         │
│ → Plastic (standard PBR)                                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 3: SCENE ASSEMBLY (via Flopperam MCP)                     │
├─────────────────────────────────────────────────────────────────┤
│ Claude → Flopperam:                                            │
│ "Assemble grow tower scene:                                    │
│  - Place rack frame at origin                                  │
│  - Add 5 hydroponic bins on shelves                           │
│  - Position LED fixtures 18 inches above each bin             │
│  - Add reservoir at base                                       │
│  - Connect with tubing mesh                                    │
│  - Create scene hierarchy:                                     │
│    /GrowTower/Frame, /GrowTower/Bins, /GrowTower/Lights"      │
└─────────────────────────────────────────────────────────────────┘
```

---

## Self-Optimizing Loop

The continuous improvement cycle that runs automatically.

### Trigger Configuration

```yaml
# config/optimization-triggers.yaml

scheduled:
  - cron: "0 9 * * 0"  # Every Sunday 9 AM
    action: "full_optimization_cycle"
    
  - cron: "0 6 * * *"  # Daily 6 AM
    action: "price_check"

event_driven:
  - trigger: "new_paper_detected"
    source: "research_agent"
    action: "evaluate_impact"
    
  - trigger: "price_drop"
    threshold: "15%"
    action: "update_bom"

manual:
  - command: "optimize"
    args: ["--prototype", "all"]
```

### Loop Execution

```python
# optimization_loop.py

async def run_optimization_cycle():
    """Execute full optimization cycle."""
    
    # 1. Research scan
    research_findings = await research_agent.scan([
        "hydroponics DIY site:reddit.com last week",
        "vertical farming automation new",
        "ESP32 hydroponics controller",
        "cheap pH sensor accurate"
    ])
    
    # 2. Price check
    price_changes = await cost_optimizer.check_all_boms()
    
    # 3. Evaluate impact
    impact_report = await evaluator.assess_findings(
        research=research_findings,
        prices=price_changes
    )
    
    # 4. Decision gate
    if impact_report.impact_score > 20 or price_changes.savings_pct > 15:
        
        # 5. Generate new versions
        for recommendation in impact_report.recommendations:
            if recommendation.approved:
                await design_agent.update(recommendation.prototype)
                await simulation_agent.rebuild(recommendation.prototype)
        
        # 6. Re-evaluate
        comparison = await evaluator.compare_all()
        
        # 7. Log and commit
        log_iteration(comparison)
        git_commit(f"Optimization cycle: {impact_report.summary}")
    
    else:
        log_iteration({
            'action': 'no_changes',
            'reason': 'Below improvement threshold',
            'findings': len(research_findings)
        })
```

### Thresholds

| Metric | Threshold | Action |
|--------|-----------|--------|
| `impact_score` | >20 | Generate new prototype version |
| `savings_pct` | >15% | Update BOM immediately |
| `automation_improvement` | >5 points | Update digital twin |
| `new_component_discovered` | High relevance | Add to component library |

---

## Next Steps

- [Prompt Templates](PROMPTS.md) - Reusable prompt structures
- [Setup Guide](SETUP.md) - Installation and configuration
