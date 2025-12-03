# System Architecture

This document provides a comprehensive technical overview of the Autonomous Vertical Farming Digital Twin system architecture.

## Table of Contents

1. [Overview](#overview)
2. [Five-Layer Architecture](#five-layer-architecture)
3. [Platform Selection Rationale](#platform-selection-rationale)
4. [MCP Integration Architecture](#mcp-integration-architecture)
5. [Data Flow](#data-flow)
6. [Agent Communication](#agent-communication)
7. [Digital Twin Pipeline](#digital-twin-pipeline)

---

## Overview

The system is designed around a **five-layer architecture** that separates concerns between knowledge management, specification generation, orchestration, execution, and evaluation. This separation enables:

- **Modularity**: Each layer can be updated independently
- **Scalability**: New prototypes can be added without changing core infrastructure
- **Traceability**: Every decision and iteration is logged and versioned
- **Automation**: Self-optimizing loops run continuously with minimal human intervention

---

## Five-Layer Architecture

### Layer 1: Knowledge Layer

The knowledge layer serves as the system's long-term memory, storing reusable prompts, research findings, and component specifications.

```
knowledge/
├── prompts/
│   ├── base/                 # Core mission and constraints
│   ├── research/             # Domain-specific knowledge
│   └── components/           # Technical specifications
└── research/
    ├── papers/               # Academic sources
    ├── summaries/            # AI-generated digests
    └── index.json            # Searchable index
```

**Key Characteristics:**
- Version controlled via Git
- Searchable via vector embeddings (optional)
- Updated by Research Agent
- Read by all other agents

### Layer 2: Specification Layer

The specification layer generates concrete prototype designs by combining knowledge layer elements with specific constraints.

```
┌─────────────────────────────────────────────────────────────────┐
│                    SPEC DOCUMENT GENERATOR                      │
│                                                                 │
│   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐       │
│   │  Base Prompt │ + │   Research   │ + │  Components  │       │
│   └──────────────┘   └──────────────┘   └──────────────┘       │
│                              │                                  │
│                              ▼                                  │
│                    ┌──────────────────┐                        │
│                    │   Constraints    │                        │
│                    │  (Budget, Space, │                        │
│                    │   Automation)    │                        │
│                    └──────────────────┘                        │
│                              │                                  │
│                              ▼                                  │
│                    ┌──────────────────┐                        │
│                    │  PROTOTYPE SPEC  │                        │
│                    └──────────────────┘                        │
└─────────────────────────────────────────────────────────────────┘
```

**Specification Document Contents:**
- Metadata (version, dates, status)
- Design goals (primary/secondary)
- Prompt stack used
- Physical specifications
- Bill of Materials (BOM)
- Automation specification
- Performance projections
- Digital twin requirements
- Research references
- Iteration history

### Layer 3: Claude Flow Orchestration

The orchestration layer coordinates all agent activities using a hierarchical task structure.

```
Product: Autonomous Vertical Farming System
│
├── Project: Grow Tower Prototype
│   ├── Feature: Structural Design
│   │   ├── Task: Generate tower mesh (Blender-MCP)
│   │   ├── Task: Create mounting brackets
│   │   └── Task: Export FBX
│   ├── Feature: Irrigation System
│   │   ├── Task: Design nutrient reservoir
│   │   └── Task: Create pump mounting
│   └── Feature: Automation
│       ├── Task: Sensor placement design
│       └── Task: Controller housing
│
├── Project: Industrial Rack System
│   └── ...
│
└── Project: NFT Rail System
    └── ...
```

**Orchestration Patterns:**
- Sequential: Research → Design → Simulation → Evaluation
- Parallel: Multiple prototypes designed simultaneously
- Iterative: Feedback loops for optimization

### Layer 4: Execution Layer

The execution layer contains the actual tools that perform work:

| Tool | Integration | Capabilities |
|------|-------------|--------------|
| **Blender-MCP** | MCP Protocol | Parametric modeling, procedural generation, UV unwrapping |
| **Rodin (via Blender-MCP)** | API | Text/image to 3D mesh with PBR materials |
| **PolyHaven (via Blender-MCP)** | API | HDRIs, textures, 3D models |
| **Sketchfab (via Blender-MCP)** | API | Pre-made 3D assets |
| **UE5-MCP (Flopperam)** | MCP Protocol | Scene assembly, Blueprint creation, physics simulation |
| **Cesium for Unreal** | Plugin | Geospatial data, accurate solar angles |
| **Web Search** | API | Research, price checking |
| **Cost APIs** | REST | Real-time material pricing |

### Layer 5: Evaluation Layer

The evaluation layer compares prototypes and generates recommendations.

```
┌─────────────────────────────────────────────────────────────────┐
│                 PROTOTYPE COMPARISON DASHBOARD                  │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │ Grow Tower  │  │ Rack System │  │  NFT Rails  │            │
│  │ v0.3        │  │ v0.2        │  │ v0.1        │            │
│  ├─────────────┤  ├─────────────┤  ├─────────────┤            │
│  │ Cost: $395  │  │ Cost: $520  │  │ Cost: $280  │            │
│  │ Auto: 65    │  │ Auto: 72    │  │ Auto: 45    │            │
│  │ ROI: 156%   │  │ ROI: 134%   │  │ ROI: 189%   │            │
│  │ Labor: 0.5h │  │ Labor: 0.8h │  │ Labor: 1.2h │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  RECOMMENDATIONS                                         │   │
│  │  • Best for lowest cost: NFT Rails                       │   │
│  │  • Best for automation: Rack System                      │   │
│  │  • Best ROI: NFT Rails                                   │   │
│  │  • Best for beginners: Grow Tower                        │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Platform Selection Rationale

### Why UE5 + Cesium?

After evaluating six platforms, UE5 + Cesium was selected as the optimal solution:

| Platform | Visualization | Physics | Data Integration | Agriculture Ready | Cost |
|----------|---------------|---------|------------------|-------------------|------|
| **UE5 + Cesium** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Free <$1M |
| NVIDIA Omniverse | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | $4,500/GPU/yr |
| Unity | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Free <$100k |
| CesiumJS | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ | Free |
| Cities: Skylines | ⭐⭐⭐ | ⭐⭐ | ⭐ | ⭐ | $30 |
| OpenSimulator | ⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐⭐ | Free |

**Key UE5 Advantages:**
- **Lumen**: Real-time global illumination for accurate lighting simulation
- **Nanite**: Virtualized geometry for unlimited detail
- **Chaos Physics**: Production-grade physics simulation
- **Blueprint System**: Visual scripting for automation logic
- **Cesium Integration**: Real-world coordinates and accurate solar simulation

### Blender vs UE5 Workflow

The professional standard workflow: **Blender for creation → UE5 for simulation**

| Capability | Blender | UE5 | Winner |
|------------|---------|-----|--------|
| Complex mesh creation | ⭐⭐⭐⭐⭐ | ⭐⭐ | Blender |
| Procedural modeling | ⭐⭐⭐⭐⭐ | ⭐⭐ | Blender |
| UV unwrapping | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | Blender |
| Sculpting | ⭐⭐⭐⭐⭐ | ⭐ | Blender |
| Real-time rendering | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | UE5 |
| Physics simulation | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | UE5 |
| Scene assembly | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | UE5 |
| External data integration | ⭐⭐ | ⭐⭐⭐⭐⭐ | UE5 |

---

## MCP Integration Architecture

### Blender-MCP (ahujasid)

**Capabilities:**
- Arbitrary Python code execution in Blender
- Natural language 3D modeling commands
- Rodin/Hyper3D integration (4 billion parameter model)
- PolyHaven asset access (HDRIs, textures, models)
- Sketchfab integration

**Example Commands:**
```
"Create a steel rack with 5 shelves, unistrut construction, 4ft x 2ft footprint"
"Generate floating raft hydroponic panel with 2-inch net pot holes in grid pattern"
"Apply water material to bin interior from PolyHaven"
```

### Flopperam Unreal-MCP

**Capabilities:**
- Native C++ plugin (minimal latency)
- Full Unreal actor/component/Blueprint access
- Advanced world-building from prompts
- Physics simulation tools
- Pre-built high-level scene assembly tools

**Example Commands:**
```
"Arrange steel rack with 5 hydroponic bins, LED fixtures 18 inches above each shelf"
"Create Blueprint for water circulation simulation with nutrient flow"
"Add geolocation for sunlight simulation at coordinates 40.7128° N, 74.0060° W"
```

### Integration Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLAUDE FLOW                             │
└─────────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              │                               │
              ▼                               ▼
┌─────────────────────────┐     ┌─────────────────────────┐
│      BLENDER-MCP        │     │     FLOPPERAM MCP       │
│                         │     │                         │
│  • Mesh Generation      │     │  • Scene Assembly       │
│  • Rodin AI Models      │     │  • Blueprint Creation   │
│  • PolyHaven Assets     │     │  • Physics Setup        │
│  • UV Unwrapping        │     │  • Cesium Integration   │
│  • FBX Export           │     │  • Simulation Logic     │
│                         │     │                         │
└─────────────────────────┘     └─────────────────────────┘
              │                               │
              │         ┌─────────┐           │
              └────────►│   FBX   │───────────┘
                        │  Files  │
                        └─────────┘
```

---

## Data Flow

### Asset Pipeline

```
1. DESIGN AGENT receives task
   │
   ▼
2. Blender-MCP creates parametric mesh
   OR Rodin generates from text/image
   │
   ▼
3. UV unwrap in Blender
   │
   ▼
4. Apply basic PBR materials (albedo, roughness, metallic, normal)
   │
   ▼
5. Export FBX to assets/blender/exports/
   │
   ▼
6. UE5 imports via Datasmith
   │
   ▼
7. Flopperam MCP assembles scene
   │
   ▼
8. Create UE5 materials (water caustics, LED emissive, etc.)
   │
   ▼
9. Build simulation Blueprints
   │
   ▼
10. Configure Cesium geolocation
```

### Optimization Pipeline

```
1. TRIGGER (weekly/manual/event)
   │
   ▼
2. Research Agent scans sources
   │
   ├── Reddit (r/hydro, r/aerogarden)
   ├── Academic papers
   ├── YouTube DIY channels
   └── Maker forums
   │
   ▼
3. Cost Optimizer updates pricing
   │
   ├── Amazon API
   ├── AliExpress scraping
   ├── Home Depot API
   └── Specialized suppliers
   │
   ▼
4. Evaluator compares prototypes
   │
   ▼
5. Decision Gate
   │
   ├── improvement_potential > 20? → Generate new version
   └── improvement_potential ≤ 20? → Log and wait
```

---

## Agent Communication

### Message Format

Agents communicate via structured YAML messages:

```yaml
message:
  from: research-agent
  to: cost-optimizer
  type: research_update
  timestamp: 2025-11-29T10:30:00Z
  payload:
    topic: "ESP32 pH sensor module"
    sources:
      - url: "https://reddit.com/r/hydro/..."
        credibility: 0.7
      - url: "https://instructables.com/..."
        credibility: 0.8
    findings:
      - component: "pH sensor module"
        current_price: 50.00
        discovered_alternative:
          name: "DIY ADS1115 + probe kit"
          price: 15.00
          savings_pct: 70
    recommendation:
      action: "update_bom"
      prototype: "grow-tower"
      priority: "high"
```

### Event Bus

```
┌─────────────────────────────────────────────────────────────────┐
│                         EVENT BUS                               │
├─────────────────────────────────────────────────────────────────┤
│  Events:                                                        │
│  • research.new_finding                                         │
│  • pricing.update                                               │
│  • prototype.version_created                                    │
│  • simulation.completed                                         │
│  • evaluation.threshold_exceeded                                │
│                                                                 │
│  Subscribers:                                                   │
│  • Research Agent → pricing.update                              │
│  • Cost Optimizer → research.new_finding                        │
│  • Design Agent → evaluation.threshold_exceeded                 │
│  • Simulation Agent → prototype.version_created                 │
│  • Evaluator Agent → simulation.completed                       │
└─────────────────────────────────────────────────────────────────┘
```

---

## Digital Twin Pipeline

### Three-Phase Workflow

#### Phase 1: Asset Creation (Blender + Blender-MCP)

**Components to Create:**
- Industrial steel rack (5 shelves)
- Plastic growing bins
- Floating raft panels
- Clay pellet grow media
- LED fixture assemblies
- Nutrient reservoir
- Pumps and tubing
- Vertical grow towers

**Workflow:**
1. Claude → Blender-MCP: Create parametric structure
2. Claude → Rodin: Generate organic/complex parts
3. Claude → PolyHaven: Source textures and materials
4. Export FBX with UVs preserved

#### Phase 2: Scene Assembly (UE5 + Flopperam MCP)

**Workflow:**
1. Import FBX assets via Datasmith
2. Claude → Flopperam: Position actors and create hierarchy
3. Claude → Flopperam: Create simulation Blueprints
4. Claude → Cesium: Add geolocation for solar simulation
5. Configure physics and interactions

**UE5 Scene Hierarchy:**
```
World
├── Environment
│   ├── Lighting
│   │   ├── SunLight (Cesium-driven)
│   │   └── LEDFixtures[]
│   └── Atmosphere
├── FarmingSystem
│   ├── Structure
│   │   └── SteelRack
│   ├── GrowingUnits
│   │   ├── Bin_01
│   │   ├── Bin_02
│   │   └── ...
│   ├── Irrigation
│   │   ├── Reservoir
│   │   ├── Pumps[]
│   │   └── Tubing[]
│   └── Automation
│       ├── Sensors[]
│       └── Controllers[]
└── UI
    └── DataDisplays[]
```

#### Phase 3: Optimization Loop (Claude Flow Orchestration)

**Continuous Cycle:**
1. Research Agent scans for innovations
2. Cost Optimizer updates pricing
3. Evaluator scores current state
4. Decision gate determines if update needed
5. Design Agent updates assets
6. Simulation Agent updates scene
7. Results logged to history.jsonl

---

## Appendix: Transfer Compatibility

### What Transfers from Blender to UE5

| Asset Type | Transfers | Notes |
|------------|-----------|-------|
| Geometry | ✅ | Clean topology recommended |
| UVs | ✅ | Must be unwrapped in Blender |
| Basic PBR | ✅ | Albedo, roughness, metallic, normal |
| Bone rigs | ✅ | For animated components |
| Complex shaders | ❌ | Recreate in UE5 material editor |
| ColorRamp nodes | ❌ | Bake to texture |
| Procedural textures | ❌ | Bake to texture |

### Best Practice Workflow

1. Create clean topology in Blender
2. UV unwrap all geometry in Blender
3. Bake procedural textures to images
4. Export FBX with "Apply Modifiers" enabled
5. Import to UE5 via Datasmith
6. Recreate complex materials in UE5 material editor
