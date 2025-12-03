# Agent Definitions

This document defines the five specialized agents that power the autonomous vertical farming system. Each agent has a specific role, tool access, and output format.

## Table of Contents

- [Overview](#overview)
- [Research Agent](#research-agent)
- [Cost Optimizer Agent](#cost-optimizer-agent)
- [Design Agent](#design-agent)
- [Simulation Agent](#simulation-agent)
- [Evaluator Agent](#evaluator-agent)
- [Agent Interaction Patterns](#agent-interaction-patterns)

---

## Overview

### Design Principles

1. **Single Responsibility**: Each agent does one thing well
2. **Stateless Operation**: Agents don't maintain state between runs
3. **Structured I/O**: All inputs/outputs use defined schemas
4. **Tool Isolation**: Each agent has access only to tools it needs
5. **Audit Trail**: All actions logged to history.jsonl

### Agent Summary

| Agent | Role | Primary Tools | Output |
|-------|------|---------------|--------|
| Research | Find & synthesize information | web_search, web_fetch | YAML summaries |
| Cost Optimizer | Minimize costs, maximize ROI | web_search, file_read/write | Price matrices, BOMs |
| Design | Create 3D assets | blender-mcp, rodin | FBX files |
| Simulation | Build digital twins | ue5-mcp, file_read | UE5 scenes, Blueprints |
| Evaluator | Score & compare prototypes | file_read, file_write | Comparison reports |

---

## Research Agent

### Role
Find and synthesize vertical farming, hydroponics, automation, and cost optimization information from authoritative and community sources.

### Tools
- `web_search` - Search the web for information
- `web_fetch` - Retrieve full page content
- `file_read` - Read existing knowledge base

### Workflow

```
1. SEARCH AUTHORITATIVE SOURCES FIRST
   - NASA technical reports
   - University extension guides
   - Peer-reviewed papers
   - Government agricultural databases

2. THEN SEARCH COMMUNITY SOURCES
   - Reddit (r/hydro, r/aerogarden, r/verticalfarming)
   - YouTube tutorials
   - Maker forums (Instructables, Hackaday)
   - Discord communities

3. SYNTHESIZE INTO STRUCTURED SUMMARY
   - Extract actionable specifications
   - Note credibility of sources
   - Identify consensus vs. debate

4. SAVE TO KNOWLEDGE BASE
   - Store in knowledge/research/summaries/
   - Update index.json
```

### Output Format

```yaml
# research_summary.yaml
topic: "ESP32 pH Sensor Integration"
date: "2025-11-28"
query: "ESP32 pH sensor hydroponics automation"

sources:
  - url: "https://randomnerdtutorials.com/esp32-ph-sensor/"
    credibility: "high"
    type: "tutorial"
    key_findings:
      - "Use analog pH sensor with ADS1115 ADC for accuracy"
      - "Calibrate with pH 4.0 and 7.0 buffers"
      - "Temperature compensation improves accuracy by 15%"
  
  - url: "https://reddit.com/r/hydro/comments/..."
    credibility: "medium"
    type: "community"
    key_findings:
      - "Atlas Scientific sensors most reliable but expensive"
      - "Cheap sensors drift after 3-6 months"

specifications_extracted:
  - component: "pH Sensor"
    diy_option: "Generic analog sensor + ADS1115"
    diy_cost: "$15"
    commercial_option: "Atlas Scientific EZO"
    commercial_cost: "$150"
    accuracy: "±0.1 pH"
    calibration_frequency: "monthly"

recommendations:
  - "Start with cheap sensor, upgrade if drift is problematic"
  - "Always use ADS1115 ADC, not ESP32 native ADC"
  - "Implement rolling average for noise reduction"

confidence_level: "high"
needs_further_research: false
```

### Search Patterns

```bash
# DIY innovations
"hydroponics DIY site:reddit.com last week"
"vertical farming automation new"

# Technical solutions  
"ESP32 hydroponics controller"
"cheap pH sensor accurate"

# Academic research
"controlled environment agriculture optimization site:edu"
"hydroponic nutrient film technique efficiency"
```

---

## Cost Optimizer Agent

### Role
Find lowest-cost solutions for every component, calculate ROI, and identify cost reduction opportunities across all prototypes.

### Tools
- `web_search` - Search for pricing
- `web_fetch` - Retrieve product pages
- `file_read` - Read BOMs and specs
- `file_write` - Update pricing data

### Workflow

```
1. READ CURRENT BOM
   Load specs/prototypes/*/spec.md

2. FOR EACH COMPONENT, SEARCH:
   - Amazon (convenience baseline)
   - AliExpress (budget option)
   - Home Depot / Lowes (local pickup)
   - Specialized suppliers (quality option)
   - Thingiverse / Instructables (DIY alternative)

3. BUILD COST COMPARISON MATRIX
   For each item: DIY cost, budget cost, quality cost

4. CALCULATE TOTALS
   - Setup cost (one-time)
   - Monthly operating cost
   - Annual maintenance cost

5. CALCULATE ROI
   - Project annual yield by crop
   - Compare to retail prices
   - Factor in labor time value

6. IDENTIFY OPTIMIZATION OPPORTUNITIES
   - Components with high DIY savings potential
   - Bulk purchase opportunities
   - Seasonal price variations
```

### ROI Calculation

```python
def calculate_roi(prototype_spec):
    # Setup costs
    setup_cost = sum(item['cost'] for item in spec['bom'])
    
    # Annual operating
    monthly_electricity = spec['power_watts'] * 24 * 30 * electricity_rate
    monthly_nutrients = spec['nutrient_consumption'] * nutrient_cost
    monthly_operating = monthly_electricity + monthly_nutrients
    annual_operating = monthly_operating * 12
    
    # Annual yield value
    annual_yield_value = 0
    for crop in spec['crops']:
        weekly_yield = crop['yield_lbs_per_week']
        market_price = crop['market_price_per_lb']
        annual_yield_value += weekly_yield * 52 * market_price
    
    # ROI calculation
    first_year_profit = annual_yield_value - annual_operating - setup_cost
    ongoing_annual_profit = annual_yield_value - annual_operating
    
    payback_months = setup_cost / (ongoing_annual_profit / 12)
    roi_percentage = (ongoing_annual_profit / setup_cost) * 100
    
    return {
        'setup_cost': setup_cost,
        'annual_operating': annual_operating,
        'annual_yield_value': annual_yield_value,
        'payback_months': payback_months,
        'roi_percentage': roi_percentage
    }
```

### Output Format

```yaml
# cost_optimization_report.yaml
prototype: "grow-tower-v1"
analysis_date: "2025-11-28"

bom_analysis:
  - item: "4-inch PVC pipe (5ft)"
    current_cost: "$18"
    alternatives:
      - source: "Home Depot"
        cost: "$15"
        notes: "In-store pickup saves shipping"
      - source: "Habitat ReStore"
        cost: "$5"
        notes: "Used, requires cleaning"
    recommendation: "Home Depot for new, ReStore if available"
    potential_savings: "$3-13"

  - item: "Water pump"
    current_cost: "$25"
    alternatives:
      - source: "AliExpress"
        cost: "$8"
        notes: "3-week shipping, variable quality"
      - source: "Amazon"
        cost: "$18"
        notes: "Prime shipping, good reviews"
    recommendation: "Amazon for reliability"
    potential_savings: "$7"

cost_summary:
  current_total: "$450"
  optimized_total: "$380"
  potential_savings: "$70"
  savings_percentage: "15.5%"

roi_analysis:
  setup_cost: "$380"
  monthly_operating: "$25"
  annual_yield_value: "$1,200"
  payback_period: "4 months"
  first_year_roi: "215%"
  
labor_analysis:
  setup_hours: 8
  monthly_maintenance_hours: 2
  hourly_rate_assumed: "$25"
  labor_adjusted_roi: "165%"
```

---

## Design Agent

### Role
Create 3D assets using Blender-MCP, Rodin AI, and asset libraries. Output production-ready FBX files for UE5 import.

### Tools
- `blender-mcp` - Execute Python in Blender, create meshes
- `rodin` - AI mesh generation from text/images
- `polyhaven` - Asset library (HDRIs, textures, models)
- `sketchfab` - 3D model library
- `file_read` - Read specifications

### Component Generation Methods

| Component Type | Method | Reason |
|---------------|--------|--------|
| Steel/aluminum structures | Blender procedural | Parametric, editable |
| Plastic containers | Rodin AI | Organic shapes with details |
| Plants (visualization) | PolyHaven/Sketchfab | Pre-made, high quality |
| Electronic components | Sketchfab | Accurate representations |
| Custom organic shapes | Rodin AI | Complex geometry |

### Workflow

```
1. READ SPECIFICATION
   Load prototype spec, extract physical requirements

2. CREATE COMPONENT LIST
   Break design into individual meshes

3. FOR EACH COMPONENT:
   a. Determine best creation method
   b. Generate mesh with appropriate tool
   c. Apply basic PBR materials
   d. UV unwrap if procedural
   e. Verify dimensions match spec

4. QUALITY CHECKLIST
   □ Dimensions match specification
   □ Origin point logically placed
   □ UVs properly unwrapped
   □ Materials use basic PBR (albedo, roughness, metallic, normal)
   □ Poly count reasonable for real-time
   □ Naming follows convention

5. EXPORT
   Export as FBX to assets/blender/exports/
   Naming: {{prototype}}_{{component}}_v{{version}}.fbx
```

### Example Commands

```python
# Steel rack via Blender procedural
"""
Create unistrut steel rack:
- Dimensions: 48x24x72 inches
- 5 shelves at 14 inch spacing
- 1-5/8 inch channel profile
- Include cross-bracing
- Origin at bottom center
"""

# Plastic bin via Rodin
"""
Use Rodin to generate plastic storage bin:
- Dimensions: 20x15x6 inches
- Include drainage holes in bottom
- Slight taper for stacking
- Matte plastic material
"""

# Floating raft via Blender Geometry Nodes
"""
Create 2 inch thick foam raft:
- Dimensions: 18x12 inches
- 2 inch net pot holes in 4x6 grid pattern
- Beveled edges
- White foam material
"""

# LED fixture from Sketchfab
"""
Search Sketchfab for 'LED grow light bar fixture'
Import best match to scene
Scale to 24 inch length
"""
```

### Naming Convention

```
{prototype}_{component}_v{version}.fbx

Examples:
- grow-tower_frame_v1.fbx
- grow-tower_plant-cups_v1.fbx
- industrial-rack_shelf_v2.fbx
- nft-rails_channel_v1.fbx
```

---

## Simulation Agent

### Role
Assemble digital twins in UE5 using Flopperam MCP. Create simulation logic via Blueprints, integrate sensor/automation systems.

### Tools
- `ue5-mcp` (Flopperam) - Scene assembly, Blueprint creation
- `file_read` - Read specifications and asset manifests

### Workflow

```
1. IMPORT BLENDER ASSETS
   Use Datasmith for FBX import to UE5

2. ASSEMBLE SCENE HIERARCHY
   /Content/VerticalFarming/
   ├── Prototypes/
   │   └── GrowTower/
   │       ├── Meshes/
   │       ├── Materials/
   │       ├── Blueprints/
   │       └── Maps/

3. CREATE MATERIALS
   - Water with caustics (Niagara)
   - LED emissive materials
   - Plant growth materials (animated)
   - Metal/plastic PBR

4. BUILD SIMULATION BLUEPRINTS
   - Water circulation (Niagara particle system)
   - Light cycling (Timeline-based)
   - Plant growth (Scale over time)
   - Sensor data display (UMG widgets)

5. SET UP DATA INPUTS
   - Blueprint variables for sensor values
   - External data connection hooks
   - Real-time update capability

6. CONFIGURE CESIUM
   - Set geolocation coordinates
   - Enable accurate solar angles
   - Configure time-of-day simulation
```

### Blueprint Templates

```cpp
// BP_NutrientCycle
// Water flow simulation using Niagara

Event BeginPlay:
    Initialize Niagara System
    Set Flow Rate = Spec.FlowRateLPM
    Set Particle Color = NutrientColor

Event Tick:
    Update Particle Position based on pipe geometry
    Check for blockages (collision detection)
    Update UI with flow status

// BP_LightSchedule  
// Automated lighting based on DLI requirements

Variables:
    - DLI_Target (float): 17.0  // mol/m²/day for lettuce
    - PPFD (float): 400        // µmol/m²/s
    - HoursOn (float): 16

Event BeginPlay:
    Calculate required hours: DLI_Target / (PPFD * 0.0036)
    Set Timeline duration

Timeline OnUpdate:
    Lerp LED intensity 0 → 1 over 30 minutes (sunrise)
    
Timeline OnFinished:
    Lerp LED intensity 1 → 0 over 30 minutes (sunset)
```

### Scene Hierarchy Template

```
World
├── Lighting
│   ├── DirectionalLight (Sun - Cesium controlled)
│   └── SkyAtmosphere
├── Environment
│   ├── CesiumGeoreference
│   └── Floor
└── Prototypes
    └── GrowTower_Instance
        ├── SM_Frame
        ├── SM_PlantCups (Instanced)
        ├── SM_Reservoir
        ├── BP_WaterSystem
        │   ├── NiagaraComponent
        │   └── CollisionVolumes
        ├── BP_LEDArray
        │   ├── SpotLights (Instanced)
        │   └── EmissiveMeshes
        └── BP_SensorDisplay
            └── WidgetComponent
```

---

## Evaluator Agent

### Role
Compare prototypes across all metrics, score automation levels, identify optimization opportunities, recommend next iterations.

### Tools
- `file_read` - Read all prototype specs
- `file_write` - Write comparison reports

### Metrics Framework

#### Automation Score Calculation

```python
def calculate_automation_score(spec):
    weights = {
        'lighting': 0.15,
        'nutrients': 0.20,
        'ph_control': 0.20,
        'watering': 0.15,
        'climate': 0.15,
        'monitoring': 0.15
    }
    
    # Each subsystem scored 0-4
    # 0 = fully manual
    # 1 = timer-based
    # 2 = sensor-triggered
    # 3 = feedback loop
    # 4 = fully autonomous with self-correction
    
    weighted_sum = sum(
        spec['automation'][subsystem] * weight 
        for subsystem, weight in weights.items()
    )
    
    # Scale to 0-100
    return weighted_sum * 25
```

#### Overall Score

```python
def calculate_overall_score(spec, all_specs):
    automation = calculate_automation_score(spec)
    cost_efficiency = calculate_cost_efficiency(spec)
    complexity = calculate_complexity(spec)
    yield_percentile = calculate_yield_percentile(spec, all_specs)
    
    return (
        automation * 0.30 +
        cost_efficiency * 0.30 +
        (100 - complexity) * 0.20 +
        yield_percentile * 0.20
    )
```

### Output Format

```yaml
# comparison_report.yaml
report_date: "2025-11-28"
prototypes_analyzed: 3

summary_table:
  - prototype: "grow-tower-v3"
    cost: "$380"
    automation_score: 85
    complexity_score: 50
    roi: "215%"
    overall_score: 78
    
  - prototype: "industrial-rack-v2"
    cost: "$450"
    automation_score: 75
    complexity_score: 55
    roi: "180%"
    overall_score: 68
    
  - prototype: "nft-rails-v1"
    cost: "$320"
    automation_score: 70
    complexity_score: 45
    roi: "240%"
    overall_score: 72

analysis:
  best_for_lowest_cost: "nft-rails-v1"
  best_for_highest_automation: "grow-tower-v3"
  best_for_fastest_roi: "nft-rails-v1"
  best_for_beginners: "nft-rails-v1"
  best_overall: "grow-tower-v3"

optimization_recommendations:
  - prototype: "grow-tower-v3"
    opportunity: "Climate automation upgrade"
    current_score: 2
    potential_score: 4
    estimated_cost: "$50"
    impact: "+5 overall score"
    
  - prototype: "industrial-rack-v2"
    opportunity: "Switch to ESP32 from Arduino"
    current_score: 3
    potential_score: 4
    estimated_cost: "$0"
    impact: "+3 overall score, -$20 cost"

suggested_next_iterations:
  - prototype: "grow-tower"
    version: "v4"
    focus: "Add climate automation (temperature/humidity control)"
    expected_improvement: "+5 automation score"
    
  - prototype: "nft-rails"
    version: "v2"
    focus: "Upgrade monitoring to full sensor suite"
    expected_improvement: "+10 automation score"
```

---

## Agent Interaction Patterns

### Sequential Pipeline

```
Research Agent
    │
    ▼ (research findings)
Cost Optimizer
    │
    ▼ (optimized BOM)
Design Agent
    │
    ▼ (3D assets)
Simulation Agent
    │
    ▼ (digital twin)
Evaluator Agent
    │
    ▼ (comparison report)
[Human Review] → Approve iteration
```

### Triggered Updates

```
Research Agent detects new paper
    │
    ▼ (triggers)
Evaluator Agent assesses impact
    │
    ├─ impact < threshold → Log only
    │
    └─ impact ≥ threshold → Trigger full pipeline
```

### Cross-Agent Communication

Agents communicate via:
1. **Spec documents** - Single source of truth
2. **history.jsonl** - Append-only log
3. **comparison reports** - Evaluator summaries

Agents do NOT:
- Call each other directly
- Maintain shared state
- Make decisions outside their scope

---

## Next Steps

- [Workflows](WORKFLOWS.md) - Step-by-step procedures
- [Prompt Templates](PROMPTS.md) - Reusable prompt structures
