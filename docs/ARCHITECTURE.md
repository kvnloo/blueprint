# System Architecture

This document provides a detailed breakdown of the five-layer architecture powering the Autonomous Vertical Farming Digital Twin system.

## Table of Contents

- [Overview](#overview)
- [Layer 1: Knowledge Layer](#layer-1-knowledge-layer)
- [Layer 2: Specification Layer](#layer-2-specification-layer)
- [Layer 3: Claude Flow Orchestration](#layer-3-claude-flow-orchestration)
- [Layer 4: Execution Layer](#layer-4-execution-layer)
- [Layer 5: Evaluation Layer](#layer-5-evaluation-layer)
- [Data Flow](#data-flow)
- [Platform Decisions](#platform-decisions)

---

## Overview

The system is designed around a **single source of truth** principle: each prototype has ONE spec document containing everything. All changes are version-controlled, and agents operate as stateless workers drawing from shared knowledge.

### Key Organizational Principles

1. **Single Source of Truth**: Each prototype has ONE spec document
2. **Version Everything**: Git tracks all changes, JSONL logs all iterations
3. **Separation of Concerns**:
   - Knowledge layer (prompts, research) → reusable across prototypes
   - Spec layer (per prototype) → specific designs
   - Execution layer (agents) → stateless workers
   - Data layer (pricing, metrics) → shared reference
4. **Clear Agent Boundaries**: Each agent has specific job and specific tools
5. **Structured Outputs**: JSON/YAML for data, Markdown for docs
6. **Comparison Built-In**: Evaluator agent always knows about ALL prototypes

---

## Layer 1: Knowledge Layer

The foundation of the system - reusable knowledge that feeds all prototypes.

### Components

```
knowledge/
├── prompts/
│   ├── base/                    # Core mission and constraints
│   │   ├── autonomous-farming.md
│   │   ├── cost-optimization.md
│   │   ├── diy-priority.md
│   │   └── blueprint-nutrition.md
│   ├── research/                # Domain knowledge
│   │   ├── nasa-veggie.md
│   │   ├── mit-open-ag.md
│   │   └── hydroponics-basics.md
│   └── components/              # Technical specifications
│       ├── lighting.md
│       ├── nutrients.md
│       ├── sensors.md
│       └── automation.md
└── research/
    ├── papers/                  # Academic papers (PDF/text)
    ├── summaries/               # Agent-generated summaries
    └── index.json               # Searchable index
```

### Prompt Stack Assembly

When generating a new prototype spec, prompts are assembled in order:

```yaml
prompt_stack:
  - base/autonomous-farming.md      # Mission & constraints
  - base/diy-priority.md            # Cost hierarchy
  - base/blueprint-nutrition.md     # Crop priorities
  - research/hydroponics-basics.md  # Domain knowledge
  - components/sensors.md           # Technical specs
  - components/lighting.md
```

---

## Layer 2: Specification Layer

Individual prototype designs, each containing complete information for building.

### Spec Document Structure

```yaml
# specs/prototypes/grow-tower-v1/spec.md

metadata:
  name: "Vertical Grow Tower v1"
  version: "0.3"
  created: "2025-11-15"
  last_modified: "2025-11-28"
  status: "active"
  iteration: 3

summary: |
  5-foot vertical tower with 36 planting sites in spiral pattern.
  NFT-style nutrient delivery with reservoir-based automation.

design_goals:
  primary:
    - Maximize planting density per square foot
    - Achieve 90%+ automation score
  secondary:
    - Modular design for easy scaling
    - DIY-friendly construction

physical_specifications:
  dimensions:
    height: "60 inches"
    diameter: "8 inches"
    footprint: "1 sq ft"
  structure: "PVC pipe with 3D-printed plant cups"
  growing_method: "NFT (Nutrient Film Technique)"
  planting_sites: 36

bill_of_materials:
  structure:
    - item: "4-inch PVC pipe (5ft)"
      quantity: 1
      cost_diy: "$15"
      cost_commercial: "$45"
      source: "Home Depot"
    - item: "3D printed plant cups"
      quantity: 36
      cost_diy: "$8 (filament)"
      cost_commercial: "$36"
  # ... continued

automation_specification:
  automation_level:
    lighting: 4        # Fully automated with scheduling
    nutrient_mixing: 3 # Semi-automated, manual refill
    ph_control: 4      # Automated dosing
    watering: 4        # Continuous NFT flow
    climate: 2         # Manual adjustment
    monitoring: 4      # Full sensor suite with alerts
  overall_score: 85

performance_projections:
  yield_estimates:
    lettuce: "2 lbs/week"
    kale: "1.5 lbs/week"
    herbs: "0.5 lbs/week"
  economics:
    setup_cost: "$380"
    monthly_operating: "$25"
    annual_yield_value: "$1,200"
    payback_period: "4 months"
    roi: "215%"

digital_twin_specification:
  blender_assets:
    - "grow-tower_frame_v3.fbx"
    - "grow-tower_cups_v3.fbx"
    - "grow-tower_reservoir_v3.fbx"
  ue5_scene:
    - actors: ["BP_GrowTower", "BP_WaterSystem", "BP_LEDArray"]
    - blueprints: ["BP_NutrientCycle", "BP_LightSchedule"]
  simulation_parameters:
    light_hours_per_day: 16
    nutrient_ppm: 1200
    ph_target: 6.0
    water_temp_c: 20

iteration_history:
  - version: "0.1"
    date: "2025-11-15"
    changes: ["Initial design"]
    metrics: { cost: 450, automation: 45 }
  - version: "0.2"
    date: "2025-11-20"
    changes: ["Switched to ESP32", "Added pH automation"]
    metrics: { cost: 380, automation: 65 }
  - version: "0.3"
    date: "2025-11-28"
    changes: ["Optimized cup design", "Reduced PVC waste"]
    metrics: { cost: 380, automation: 85 }
```

---

## Layer 3: Claude Flow Orchestration

Multi-agent task management following Product → Project → Feature → Task hierarchy.

### Hierarchy Example

```
Product: Autonomous Vertical Farming System
├── Project: Grow Tower Prototype
│   ├── Feature: Structural Design
│   │   ├── Task: Generate tower mesh (Blender-MCP)
│   │   ├── Task: Create plant cup model (Rodin)
│   │   └── Task: UV unwrap all components
│   ├── Feature: Nutrient System
│   │   ├── Task: Design reservoir (Blender-MCP)
│   │   ├── Task: Create pump assembly
│   │   └── Task: Model tubing layout
│   └── Feature: Automation
│       ├── Task: Specify sensor suite
│       ├── Task: Design control logic
│       └── Task: Create Blueprint in UE5
├── Project: Industrial Rack System
│   └── ...
└── Project: NFT Rail System
    └── ...
```

### Agent Pipeline

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Research   │───▶│     Cost     │───▶│    Design    │───▶│  Simulation  │
│    Agent     │    │  Optimizer   │    │    Agent     │    │    Agent     │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
       │                   │                   │                   │
       ▼                   ▼                   ▼                   ▼
   web_search         web_search          blender-mcp          ue5-mcp
   web_fetch          file_read/write        rodin           file_read
   file_read                              polyhaven
                                          sketchfab
```

---

## Layer 4: Execution Layer

The tools and integrations that actually create artifacts.

### Blender + Blender-MCP

**Purpose**: Create parametric 3D meshes for farming components

**Capabilities**:
- Arbitrary Python code execution in Blender
- Rodin/Hyper3D integration (4B parameter model) for AI mesh generation
- PolyHaven asset library (HDRIs, textures, 3D models)
- Sketchfab model import

**Example Commands**:
```
Claude → Blender-MCP: "Generate industrial steel rack with 5 shelves, 
                       unistrut construction, 4ft x 2ft footprint"

Claude → Rodin: "Generate floating raft hydroponic panel with 
                2-inch net pot holes in grid pattern"

Claude → PolyHaven: "Apply water material to bin interior"
```

### UE5 + Flopperam MCP

**Purpose**: Assemble scenes, create simulation logic, run digital twins

**Capabilities**:
- Full access to Unreal's actor, component, and Blueprint systems
- Native C++ plugin for minimal latency
- World-building from single prompts
- Physics simulation tools

**Example Commands**:
```
Claude → Flopperam: "Arrange steel rack with 5 hydroponic bins, 
                    LED fixtures 18 inches above each shelf"

Claude → Flopperam: "Create Blueprint for water circulation simulation, 
                    nutrient flow from reservoir to bins with return"
```

### Transfer Workflow

| What Transfers | Blender → UE5 |
|---------------|---------------|
| Geometry | ✅ |
| UVs | ✅ |
| Basic PBR materials | ✅ |
| Bone rigs | ✅ |
| Complex shader nodes | ❌ |
| Procedural textures | ❌ |

**Best Practice**: UV unwrap all geometry in Blender, bake procedural textures to images, export FBX, recreate complex materials in UE5.

---

## Layer 5: Evaluation Layer

Continuous comparison and scoring of all prototypes.

### Metrics Framework

#### Automation Score (0-100)

| Subsystem | Weight | Scoring |
|-----------|--------|---------|
| Lighting | 15% | 0=manual, 4=full automation |
| Nutrients | 20% | 0=manual mixing, 4=auto-dosing |
| pH Control | 20% | 0=manual, 4=closed-loop |
| Watering | 15% | 0=manual, 4=continuous |
| Climate | 15% | 0=ambient, 4=HVAC controlled |
| Monitoring | 15% | 0=none, 4=full sensors+alerts |

```
automation_score = Σ(subsystem_score × weight) × 25
```

#### Cost Efficiency Score

```python
cost_efficiency = 100 - (cost_per_lb_produced / baseline_cost_per_lb) * 100
```

#### Complexity Score (lower is better)

```python
complexity = (setup_hours * 2) + (monthly_maintenance_hours * 10) + (skill_level * 5)
```

#### Overall Prototype Score

```python
overall = (automation * 0.3) + (cost_efficiency * 0.3) + 
          ((100 - complexity) * 0.2) + (yield_percentile * 0.2)
```

### Comparison Dashboard

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    PROTOTYPE COMPARISON DASHBOARD                        │
├─────────────────┬─────────────────┬─────────────────┬───────────────────┤
│   Grow Tower    │   Rack System   │    NFT Rails    │     METRICS       │
├─────────────────┼─────────────────┼─────────────────┼───────────────────┤
│ Cost: $380      │ Cost: $450      │ Cost: $320      │ ← Lowest: NFT     │
│ Auto: 85        │ Auto: 75        │ Auto: 70        │ ← Highest: Tower  │
│ ROI: 215%       │ ROI: 180%       │ ROI: 240%       │ ← Fastest: NFT    │
│ Labor: 2hr/mo   │ Labor: 3hr/mo   │ Labor: 2.5hr/mo │ ← Lowest: Tower   │
├─────────────────┴─────────────────┴─────────────────┴───────────────────┤
│ RECOMMENDATION: Grow Tower for highest automation, NFT Rails for ROI    │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow

### Iteration Tracking (history.jsonl)

Each line is a complete iteration record:

```json
{"timestamp": "2025-11-15T10:00:00Z", "prototype": "grow-tower", "version": "0.1", "type": "initial", "changes": ["Initial design based on research"], "metrics": {"cost": 450, "automation_score": 45, "complexity": 60}, "agent": "design-agent"}
{"timestamp": "2025-11-20T14:30:00Z", "prototype": "grow-tower", "version": "0.2", "type": "optimization", "changes": ["Switched Arduino to ESP32", "Added automated pH dosing"], "metrics": {"cost": 380, "automation_score": 65, "complexity": 55}, "agent": "cost-optimizer"}
{"timestamp": "2025-11-28T09:15:00Z", "prototype": "grow-tower", "version": "0.3", "type": "research_update", "changes": ["New cup design from research", "Reduced PVC waste 20%"], "metrics": {"cost": 380, "automation_score": 85, "complexity": 50}, "agent": "research-agent"}
```

---

## Platform Decisions

### Why UE5 + Cesium (Not Alternatives)

| Platform | Verdict | Reason |
|----------|---------|--------|
| **UE5 + Cesium** | ✅ Selected | Best balance of rendering, physics, extensibility |
| NVIDIA Omniverse | ❌ | Requires RTX GPU, higher cost, overkill for this scale |
| Unity | ⚠️ Alternative | Viable, but less sophisticated rendering |
| Cities: Skylines | ❌ | Poor modding docs, arcade economics, no agriculture |
| OpenSimulator | ❌ | Dated graphics, limited physics |

### Why Blender-MCP + Flopperam (Not One Tool)

**Blender-MCP** excels at:
- Complex mesh creation (5/5)
- Procedural modeling with Geometry Nodes (5/5)
- UV unwrapping (5/5)
- AI mesh generation via Rodin (unique)

**Flopperam UE5-MCP** excels at:
- Scene assembly (5/5)
- Blueprint creation (5/5)
- Real-time simulation (5/5)
- External data integration (5/5)

**Verdict**: Use both in sequence. Blender for creating, UE5 for assembling and simulating.

---

## Next Steps

- [Agent Definitions](AGENTS.md) - Detailed agent specifications
- [Workflows](WORKFLOWS.md) - Step-by-step procedures
- [Prompt Templates](PROMPTS.md) - Reusable prompt structures
