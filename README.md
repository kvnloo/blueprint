# Autonomous Vertical Farming Digital Twin

[![Platform](https://img.shields.io/badge/Platform-UE5%20%2B%20Cesium-blue)](https://www.unrealengine.com/)
[![Modeling](https://img.shields.io/badge/Modeling-Blender%20%2B%20MCP-orange)](https://www.blender.org/)
[![AI](https://img.shields.io/badge/AI-Claude%20Flow-purple)](https://www.anthropic.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

A self-optimizing digital twin system for controlled environment agriculture (CEA), combining real-time 3D simulation with autonomous AI agents for continuous design iteration and cost optimization.

## 🌱 Vision

Build cost-effective, highly automated vertical farming systems optimized for nutritional density, requiring **less than 1 hour/week** of human intervention. The system continuously researches, designs, simulates, and improves hydroponic prototypes through AI-driven iteration.

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         KNOWLEDGE LAYER                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │
│  │   Prompts    │  │   Research   │  │  Components  │               │
│  │  (GitHub)    │  │ (Vector DB)  │  │   (Assets)   │               │
│  └──────────────┘  └──────────────┘  └──────────────┘               │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      SPECIFICATION LAYER                             │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  Spec Generator: Base Prompt + Research + Components + Constraints│
│  └────────────────────────────────────────────────────────────────┘ │
│        │                    │                    │                   │
│        ▼                    ▼                    ▼                   │
│  ┌───────────┐       ┌───────────┐       ┌───────────┐              │
│  │Grow Tower │       │Rack System│       │ NFT Rails │              │
│  │   Spec    │       │   Spec    │       │   Spec    │              │
│  └───────────┘       └───────────┘       └───────────┘              │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   CLAUDE FLOW ORCHESTRATION                          │
│  Product → Project → Feature → Task                                  │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │ Research Agent → Cost Optimizer → Design Agent → Simulation Agent││
│  └─────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        EXECUTION LAYER                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │
│  │ Blender-MCP  │  │   UE5-MCP    │  │  Web Search  │               │
│  │ (Mesh Gen)   │  │(Scene Build) │  │  (Research)  │               │
│  └──────────────┘  └──────────────┘  └──────────────┘               │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       EVALUATION LAYER                               │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │              Prototype Comparison Dashboard                     │ │
│  │   Cost Breakdown | Automation Score | ROI | Build Complexity   │ │
│  └────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

## 🛠️ Tech Stack

### Platform Selection

| Platform | Why We Chose It |
|----------|-----------------|
| **Unreal Engine 5** | Real-time rendering (Lumen), physics simulation (Chaos), Blueprint visual scripting, Nanite LOD |
| **Cesium for Unreal** | Geospatial positioning for accurate solar simulation |
| **Blender** | Parametric mesh creation, Geometry Nodes, UV unwrapping |
| **Blender-MCP** | AI-driven 3D modeling via Claude, Rodin integration, PolyHaven/Sketchfab asset access |
| **Flopperam UE5-MCP** | Scene assembly, Blueprint creation, native C++ performance |

### MCP Integrations

| Tool | Stars | Strengths |
|------|-------|-----------|
| **Blender-MCP** | ~13,000 | Rodin AI mesh generation (4B params), PolyHaven assets, arbitrary Python execution |
| **Flopperam UE5-MCP** | ~2,000 | Full actor/component access, world-building from prompts, physics simulation tools |

### AI Orchestration

- **Claude Flow**: Multi-agent task orchestration
- **Hyper3D Rodin Gen 1.5**: Text/image to production-ready 3D mesh with PBR materials

## 📁 Repository Structure

```
autonomous-vertical-farming/
├── README.md
├── docs/
│   ├── ARCHITECTURE.md          # Detailed system architecture
│   ├── AGENTS.md                # Agent definitions and workflows
│   ├── WORKFLOWS.md             # Step-by-step workflows
│   ├── PROMPTS.md               # Prompt template documentation
│   └── SETUP.md                 # Getting started guide
├── knowledge/
│   ├── prompts/
│   │   ├── base/
│   │   │   ├── autonomous-farming.md
│   │   │   ├── cost-optimization.md
│   │   │   └── diy-priority.md
│   │   ├── research/
│   │   │   ├── nasa-veggie.md
│   │   │   └── hydroponics-basics.md
│   │   └── components/
│   │       ├── lighting.md
│   │       ├── nutrients.md
│   │       └── sensors.md
│   └── research/
│       ├── papers/
│       ├── summaries/
│       └── index.json
├── specs/
│   ├── templates/
│   │   └── prototype-spec-template.md
│   ├── prototypes/
│   │   ├── grow-tower-v1/
│   │   ├── industrial-rack-v1/
│   │   └── nft-rail-v1/
│   └── comparisons/
│       └── prototype-comparison.json
├── assets/
│   ├── blender/
│   │   ├── components/
│   │   └── exports/
│   └── unreal/
│       ├── project/
│       └── blueprints/
├── data/
│   ├── pricing/
│   │   ├── materials.json
│   │   ├── sensors.json
│   │   └── labor-rates.json
│   ├── plants/
│   │   ├── lettuce.json
│   │   └── kale.json
│   └── iterations/
│       └── history.jsonl
├── agents/
│   ├── research-agent.md
│   ├── cost-optimizer.md
│   ├── design-agent.md
│   ├── simulation-agent.md
│   └── evaluator-agent.md
└── workflows/
    ├── new-prototype.md
    ├── optimize-existing.md
    └── compare-prototypes.md
```

## 🚀 Quick Start

### Prerequisites

- Unreal Engine 5.3+
- Blender 4.0+
- Python 3.11+
- Node.js 18+
- Claude API access

### Phase 1: Repository Setup (Day 1)

```bash
# Clone and initialize
git clone https://github.com/yourusername/autonomous-vertical-farming.git
cd autonomous-vertical-farming

# Create directory structure
mkdir -p knowledge/{prompts/{base,research,components},research/{papers,summaries}}
mkdir -p specs/{templates,prototypes,comparisons}
mkdir -p assets/{blender/{components,exports},unreal/{project,blueprints}}
mkdir -p data/{pricing,plants,iterations}
mkdir -p agents workflows

# Initialize git
git init
echo "# Iteration History" > data/iterations/history.jsonl
```

### Phase 2: Knowledge Base (Days 2-3)

1. Write base prompts in `knowledge/prompts/base/`
2. Run Research Agent to populate component specs
3. Run Cost Optimizer to find initial pricing

### Phase 3: Asset Creation (Days 4-7)

1. Design Agent creates Blender assets via MCP
2. Export FBX with UVs to `assets/blender/exports/`
3. Simulation Agent assembles scene in UE5
4. Configure Cesium for geolocation

### Phase 4: Optimization Loop (Week 2+)

1. Enable scheduled research scans
2. Configure price monitoring
3. Set up automatic iteration proposals
4. Review and approve updates

## 📊 Key Metrics

| Metric | Formula | Target |
|--------|---------|--------|
| **Automation Score** | Weighted average of subsystem automation (0-100) | >80 |
| **Cost Efficiency** | 100 - (cost_per_lb / baseline) × 100 | >60 |
| **Complexity Score** | (setup_hrs × 2) + (monthly_maint × 10) + (skill × 5) | <40 |
| **Overall Score** | auto×0.3 + cost×0.3 + (100-complex)×0.2 + yield×0.2 | >70 |

## 🌿 Priority Crops

Optimized for Blue Zone / Blueprint nutrition:

1. **Leafy Greens**: Kale, spinach, arugula
2. **Cruciferous**: Broccoli sprouts, microgreens
3. **Herbs**: Basil, cilantro, mint
4. **Fruiting** (advanced): Cherry tomatoes, peppers

## 🔄 Self-Optimizing Loop

```
┌─────────────────────────────────────────────────────────────────┐
│  TRIGGER: Scheduled (weekly) | Manual | Event (new research)   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  RESEARCH AGENT: Scan DIY innovations, price drops, papers     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  COST OPTIMIZER: Update BOMs, identify savings opportunities   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  EVALUATOR: Score prototypes, compare to previous iteration    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  DECISION GATE: improvement_potential > threshold?             │
│  YES → Generate new version    NO → Log and wait               │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  DESIGN AGENT: Update Blender assets if needed                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  SIMULATION AGENT: Update UE5 scene, run simulation            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  LOG & COMMIT: Record to history.jsonl, git commit             │
└─────────────────────────────────────────────────────────────────┘
```

## 📚 Documentation

- [Architecture Deep Dive](docs/ARCHITECTURE.md)
- [Agent Definitions](docs/AGENTS.md)
- [Workflow Guide](docs/WORKFLOWS.md)
- [Prompt Templates](docs/PROMPTS.md)
- [Setup Instructions](docs/SETUP.md)

## 🔬 Research Sources

- NASA VEGGIE / Advanced Plant Habitat
- MIT OpenAg (archived)
- University extension guides
- r/hydro and r/aerogarden communities

## 📄 License

MIT License - See [LICENSE](LICENSE) for details.

## 🤝 Contributing

This is a solo scientist-founder project by zer0 LLC, but contributions are welcome! Please read the documentation thoroughly before submitting PRs.

---

*Building autonomous futures, one iteration at a time.*
