# Blueprint Repository Organization Plan

## Company & Product Hierarchy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              zer0 (COMPANY)                                  │
│                     "Building Autonomous Futures"                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                         ┌─────────────────────┐                             │
│                         │   BLUEPRINT SYSTEM   │ ← THIS REPO                │
│                         │  "Solarpunk Automation"│                           │
│                         └──────────┬──────────┘                             │
│                                    │                                         │
│              ┌─────────────────────┼─────────────────────┐                  │
│              │                     │                     │                  │
│              ▼                     ▼                     ▼                  │
│   ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐          │
│   │     EVOLVE      │   │  AIO HEALTH     │   │  WORLD SIM      │          │
│   │    FRAMEWORK    │   │   TRACKER       │   │   PIPELINE      │          │
│   │  (separate repo)│   │ (separate repo) │   │ (docs in this   │          │
│   │                 │   │                 │   │      repo)      │          │
│   └─────────────────┘   └─────────────────┘   └─────────────────┘          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Repository Responsibilities

### This Repo (blueprint/) Contains:
| Content | Purpose |
|---------|---------|
| **Website** | zer0/Blueprint marketing site |
| **Brand** | Colors, fonts, visual identity |
| **System docs** | How Blueprint connects products |
| **World Sim docs** | Digital twin/robotics pipeline vision |
| **Integration specs** | How products work together |
| **CR/CA/CI/CD** | Methodology documentation |

### External Repos (Referenced, Not Duplicated):
| Repo | Content |
|------|---------|
| `evolve/` | Framework source code & docs |
| `health-tracker/` | App source code & docs (future) |

---

## Proposed Directory Structure

```
blueprint/
│
├── README.md                      # Blueprint system overview
├── BRAND.md                       # zer0 brand guidelines
├── whiteboard-architecture-summary.md  # Vision (keep at root)
│
├── website/                       # Marketing website
│   ├── src/
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   ├── index.html
│   │   └── components/
│   │       ├── Hero.tsx
│   │       ├── About.tsx
│   │       ├── Products.tsx       # NEW: Product showcase
│   │       ├── Pipeline.tsx       # NEW: CR/CA/CI/CD viz
│   │       ├── Showcase.tsx
│   │       ├── Footer.tsx
│   │       ├── Navbar.tsx
│   │       └── BackgroundGrid.tsx
│   ├── public/
│   ├── package.json
│   └── README.md
│
├── docs/                          # System documentation
│   ├── system/
│   │   ├── overview.md            # What is Blueprint?
│   │   ├── cr-ca-ci-cd.md         # Methodology deep-dive
│   │   └── integration.md         # How products connect
│   │
│   ├── world-sim/                 # World Simulation Pipeline
│   │   ├── ARCHITECTURE.md        # Current detailed architecture
│   │   ├── PLATFORM_COMPARISON.md
│   │   ├── MCP_INTEGRATION.md
│   │   ├── AGENTS.md
│   │   └── WORKFLOWS.md
│   │
│   └── website/                   # Website-specific docs
│       ├── LUMINA-REFERENCE.md
│       ├── GEMINI-CLONE-PROMPT.md
│       └── COPYWRITING_GUIDELINES.md
│
├── specs/                         # Specifications
│   ├── SOLARPUNK-COLOR-PALETTE.md
│   ├── IMPLEMENTATION-PLAN.md
│   ├── PROJECT-ORGANIZATION.md    # This file
│   └── templates/
│       └── prototype-spec-template.md
│
├── world-sim/                     # World Sim assets (non-docs)
│   ├── agents/                    # Agent definitions
│   ├── knowledge/                 # Knowledge base
│   │   └── prompts/
│   └── workflows/                 # Workflow definitions
│
├── research/                      # CR/CA outputs
│   ├── papers/
│   ├── summaries/
│   └── index.json
│
└── design/                        # Design assets & inspiration
    ├── inspiration/               # From capture/
    └── assets/                    # Logos, images, etc.
```

---

## File Migration Map

| Current Location | New Location | Action |
|------------------|--------------|--------|
| `gemini-attempt/*` | `website/src/` | Move |
| `capture/*` | `design/inspiration/` | Move |
| `ARCHITECTURE.md` | `docs/world-sim/ARCHITECTURE.md` | Move |
| `README.md` | Rewrite | Update |
| `agents/*` | `world-sim/agents/` | Move |
| `knowledge/*` | `world-sim/knowledge/` | Move |
| `workflows/*` | `world-sim/workflows/` | Move |
| `docs/ARCHITECTURE.md` | `docs/world-sim/` | Merge/Move |
| `docs/PLATFORM_COMPARISON.md` | `docs/world-sim/` | Move |
| `docs/MCP_INTEGRATION.md` | `docs/world-sim/` | Move |
| `docs/AGENTS.md` | `docs/world-sim/` | Move |
| `docs/WORKFLOWS.md` | `docs/world-sim/` | Move |
| `docs/SETUP.md` | `docs/system/setup.md` | Move |
| `docs/PROMPTS.md` | `world-sim/knowledge/` | Move |
| `docs/LUMINA-REFERENCE.md` | `docs/website/` | Move |
| `docs/GEMINI-*.md` | `docs/website/` | Move |
| `docs/COPYWRITING_GUIDELINES.md` | `docs/website/` | Move |
| `docs/hero-section-design.md` | `docs/website/` | Move |
| `docs/*website*.md` | `docs/website/` | Move |
| `tools/*` | `website/tools/` | Move |
| `specs/*` | `specs/` | Keep |
| `whiteboard-*.md` | Root | Keep |

---

## New Files to Create

### 1. README.md (Root)
```markdown
# Blueprint

> Solarpunk automation platform by zer0

Blueprint is the system that connects zer0's autonomous products into
a unified platform for self-care automation.

## Products

| Product | Description | Status |
|---------|-------------|--------|
| [Evolve](https://github.com/zer0/evolve) | End-to-end autonomous development framework | Active |
| [AIO Health Tracker](https://github.com/zer0/health-tracker) | Open source health optimization | Coming Soon |
| World Simulation | Digital twin + robotics pipeline | Research |

## The CR/CA/CI/CD Methodology

Blueprint products are built using our Continuous Research → Analysis →
Integration → Deployment pipeline...

[Read more →](docs/system/cr-ca-ci-cd.md)
```

### 2. BRAND.md
```markdown
# zer0 Brand Guidelines

## Identity
- **Company**: zer0
- **Tagline**: "Building Autonomous Futures"
- **System**: Blueprint
- **Aesthetic**: Solarpunk (nature + sustainable tech)

## Colors
See [SOLARPUNK-COLOR-PALETTE.md](specs/SOLARPUNK-COLOR-PALETTE.md)

## Typography
- **Display**: Space Grotesk (headings)
- **Body**: Inter (text)

## Products
- Evolve (emerald) - Living, organic growth
- Health Tracker (teal) - Nature-tech balance
- World Sim (gold) - Solar energy, illumination
```

### 3. docs/system/overview.md
```markdown
# Blueprint System Overview

Blueprint is zer0's platform for solarpunk automation—connecting
autonomous products that help humans optimize their lives while
respecting natural systems.

## Architecture

[Products] ←→ [Blueprint Hub] ←→ [CR/CA/CI/CD Pipeline]

## Products in the Blueprint Ecosystem

### Evolve Framework
End-to-end autonomous product development...

### AIO Health Tracker
Open source implementation of health optimization protocols...

### World Simulation Pipeline
Digital twin creation for robotics training...
```

---

## Migration Commands

```bash
# Phase 1: Create structure
mkdir -p website/src website/public
mkdir -p docs/{system,world-sim,website}
mkdir -p world-sim/{agents,knowledge/prompts,workflows}
mkdir -p design/{inspiration,assets}
mkdir -p research/{papers,summaries}

# Phase 2: Move website
mv gemini-attempt/* website/src/
mv capture/* design/inspiration/

# Phase 3: Move world-sim content
mv agents/* world-sim/agents/
mv knowledge/* world-sim/knowledge/
mv workflows/* world-sim/workflows/
mv ARCHITECTURE.md docs/world-sim/

# Phase 4: Reorganize docs
mv docs/ARCHITECTURE.md docs/world-sim/
mv docs/PLATFORM_COMPARISON.md docs/world-sim/
mv docs/MCP_INTEGRATION.md docs/world-sim/
mv docs/AGENTS.md docs/world-sim/
mv docs/WORKFLOWS.md docs/world-sim/
mv docs/SETUP.md docs/system/
mv docs/LUMINA-REFERENCE.md docs/website/
mv docs/GEMINI-*.md docs/website/
mv docs/COPYWRITING_GUIDELINES.md docs/website/
mv docs/*design*.md docs/website/
mv docs/*website*.md docs/website/

# Phase 5: Move tools
mv tools/* website/tools/

# Phase 6: Cleanup empty dirs
rmdir gemini-attempt capture agents knowledge workflows docs 2>/dev/null || true
```

---

## Website Content Updates

### Products Section (New Component)
```tsx
// website/src/components/Products.tsx
const products = [
  {
    name: "Evolve",
    tagline: "End-to-end Autonomous Development",
    description: "Framework for building products with AI agents, from research to deployment.",
    color: "emerald",
    status: "active",
    link: "https://github.com/zer0/evolve"
  },
  {
    name: "AIO Health Tracker",
    tagline: "Open Source Health Optimization",
    description: "Labs, nutrition, fitness, and sleep tracking powered by the Blueprint protocol.",
    color: "teal",
    status: "coming-soon",
    link: null
  },
  {
    name: "World Simulation",
    tagline: "Digital Twin Pipeline",
    description: "From Google Maps to robot chef—simulate before you build.",
    color: "gold",
    status: "research",
    link: null
  }
];
```

### Updated Hero Messaging
```
Before: "Build Smarter Systems"
After:  "Blueprint Your Autonomous Future"

Before: "Transform operations with AI-powered autonomous agents..."
After:  "zer0 builds systems that automate self-care—from health
         optimization to autonomous farming—so you can focus on living."
```

---

## Timeline

| Phase | Tasks | Time |
|-------|-------|------|
| **1** | Create directories, move files | 30 min |
| **2** | Create README.md, BRAND.md | 1 hour |
| **3** | Create system docs | 1 hour |
| **4** | Update website components | 2-3 hours |
| **5** | Test & verify links | 30 min |
| **Total** | | **5-6 hours** |

---

## Next Steps

1. **Approve this plan** ✓
2. **Execute migration commands**
3. **Create new content files**
4. **Update website with Products section**
5. **Test everything works**

Ready to proceed?
