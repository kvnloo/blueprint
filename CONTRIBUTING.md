# Contributing to Autonomous Vertical Farming

Thank you for your interest in contributing! This document provides guidelines for contributing to the Autonomous Vertical Farming Digital Twin project.

## Table of Contents

1. [Ways to Contribute](#ways-to-contribute)
2. [Getting Started](#getting-started)
3. [Contribution Workflow](#contribution-workflow)
4. [Adding New Prototypes](#adding-new-prototypes)
5. [Extending Agents](#extending-agents)
6. [Contributing Research](#contributing-research)
7. [Code Style](#code-style)
8. [Commit Messages](#commit-messages)

---

## Ways to Contribute

- **New Prototype Designs**: Add new vertical farming system designs
- **Agent Improvements**: Enhance existing agents or add new capabilities
- **Research Contributions**: Share findings from academic papers or DIY experiments
- **Cost Data**: Update pricing information for components
- **Documentation**: Improve guides, fix typos, add examples
- **Bug Reports**: Report issues with existing designs or agents
- **Feature Requests**: Suggest new features or optimizations

---

## Getting Started

### Prerequisites

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/autonomous-vertical-farming.git
   cd autonomous-vertical-farming
   ```
3. Set up the development environment:
   - Blender 4.0+ with Blender-MCP
   - Unreal Engine 5.3+ with Cesium
   - Claude Code or Claude Flow access

### Branch Naming

Use descriptive branch names:
- `prototype/vertical-tower-v2` - New prototype designs
- `agent/research-agent-youtube` - Agent improvements
- `research/nasa-veggie-2024` - Research additions
- `docs/workflow-guide-update` - Documentation changes
- `fix/cost-optimizer-api` - Bug fixes

---

## Contribution Workflow

1. **Create a branch** from `main`:
   ```bash
   git checkout -b prototype/your-new-design
   ```

2. **Make your changes** following the guidelines below

3. **Test your changes**:
   - Run agents locally to verify functionality
   - Test Blender/UE5 workflows if applicable
   - Validate JSON/YAML syntax

4. **Commit your changes** with descriptive messages

5. **Push to your fork**:
   ```bash
   git push origin prototype/your-new-design
   ```

6. **Open a Pull Request** with a clear description

---

## Adding New Prototypes

### Step 1: Create Specification

Create a new directory in `specs/prototypes/`:

```
specs/prototypes/your-prototype-v1/
├── spec.md              # Main specification document
├── bom.json             # Bill of materials
├── automation.json      # Automation scoring
└── assets/              # Reference images, sketches
```

### Step 2: Use the Template

Copy from `specs/templates/prototype-spec-template.md` and fill in:

```markdown
# [Prototype Name] Specification

## Metadata
- **Version**: 0.1
- **Created**: YYYY-MM-DD
- **Status**: Draft | In Progress | Complete
- **Iteration**: 1

## Summary
[One paragraph description]

## Design Goals
### Primary
- Goal 1
- Goal 2

### Secondary
- Goal 3

## Prompt Stack Used
```yaml
base:
  - autonomous-farming.md
  - cost-optimization.md
modifiers:
  - diy-priority.md
research:
  - hydroponics-basics.md
components:
  - lighting.md
  - sensors.md
```

## Physical Specifications
[Dimensions, materials, etc.]

## Bill of Materials
[Link to bom.json]

## Automation Specification
[Link to automation.json]

## Performance Projections
[Yield estimates, economics, labor requirements]

## Digital Twin Requirements
[Blender assets, UE5 scene requirements, simulation parameters]
```

### Step 3: Create BOM JSON

```json
{
  "prototype": "your-prototype-v1",
  "version": "0.1",
  "last_updated": "2025-11-29",
  "categories": {
    "structure": [
      {
        "item": "Steel unistrut channel",
        "quantity": 48,
        "unit": "feet",
        "unit_cost": 3.50,
        "total_cost": 168.00,
        "source": "Home Depot",
        "diy_alternative": {
          "item": "Reclaimed pallet wood",
          "unit_cost": 0.50,
          "total_cost": 24.00,
          "notes": "Requires treatment for moisture resistance"
        }
      }
    ],
    "electrical": [],
    "plumbing": [],
    "sensors": [],
    "automation": []
  },
  "totals": {
    "commercial": 0,
    "diy": 0,
    "labor_hours": 0
  }
}
```

### Step 4: Create Automation JSON

```json
{
  "prototype": "your-prototype-v1",
  "version": "0.1",
  "automation_levels": {
    "lighting": {
      "level": 4,
      "max": 4,
      "method": "Timer + light sensor feedback",
      "weight": 0.15
    },
    "nutrient_delivery": {
      "level": 3,
      "max": 4,
      "method": "Scheduled dosing pump",
      "weight": 0.20
    },
    "ph_control": {
      "level": 2,
      "max": 4,
      "method": "Manual adjustment with alerts",
      "weight": 0.20
    },
    "watering": {
      "level": 4,
      "max": 4,
      "method": "Continuous flow system",
      "weight": 0.15
    },
    "climate_control": {
      "level": 1,
      "max": 4,
      "method": "Passive ventilation",
      "weight": 0.15
    },
    "monitoring": {
      "level": 3,
      "max": 4,
      "method": "Dashboard with mobile alerts",
      "weight": 0.15
    }
  },
  "overall_score": 0,
  "control_system": {
    "platform": "ESP32 + ESPHome",
    "connectivity": "WiFi",
    "dashboard": "Home Assistant"
  }
}
```

---

## Extending Agents

### Agent Definition Format

Agents are defined in `agents/` using Markdown:

```markdown
# [Agent Name]

## Role
[One sentence description]

## Tools
- tool_1
- tool_2
- tool_3

## Workflow
1. Step 1
2. Step 2
3. Step 3

## Output Format
```yaml
output:
  field_1: type
  field_2: type
```

## Example
[Example input/output]
```

### Adding New Capabilities

1. Identify the agent to extend
2. Add new tools if needed (requires MCP integration)
3. Update the workflow steps
4. Add examples demonstrating new capability
5. Test with sample inputs

### Creating New Agents

Follow the pattern of existing agents:

1. Create `agents/your-agent.md`
2. Define role, tools, workflow, output format
3. Add to orchestration in `workflows/`
4. Document integration points with other agents

---

## Contributing Research

### Research Format

Add research summaries to `knowledge/research/summaries/`:

```yaml
# research-summary.yaml
topic: "LED Spectrum Optimization for Leafy Greens"
date_reviewed: 2025-11-29
source:
  title: "Paper Title"
  authors: ["Author 1", "Author 2"]
  publication: "Journal Name"
  year: 2024
  url: "https://..."
  credibility: 0.9  # 0.0-1.0

key_findings:
  - finding: "Red:Blue ratio of 4:1 optimal for lettuce"
    confidence: high
    applicable_to: ["lettuce", "spinach", "arugula"]
  - finding: "Far-red supplementation increases biomass 15%"
    confidence: medium
    applicable_to: ["all leafy greens"]

specifications_extracted:
  - parameter: "ppfd_optimal"
    value: 200
    unit: "μmol/m²/s"
    crop: "lettuce"
  - parameter: "photoperiod"
    value: 16
    unit: "hours"
    crop: "lettuce"

recommendations:
  - "Update lighting.md component spec with new PPFD values"
  - "Consider far-red LED addition to grow-tower prototype"

tags:
  - lighting
  - lettuce
  - spectrum
  - leds
```

### Credibility Ratings

| Source Type | Typical Rating |
|-------------|----------------|
| Peer-reviewed journal | 0.9-1.0 |
| University extension | 0.8-0.9 |
| NASA/government research | 0.9-1.0 |
| Industry white papers | 0.6-0.8 |
| YouTube DIY channels | 0.4-0.6 |
| Reddit/forums | 0.3-0.5 |
| Personal experiments | 0.2-0.4 |

---

## Code Style

### Markdown

- Use ATX-style headers (`#`, `##`, etc.)
- One sentence per line for easier diffs
- Use fenced code blocks with language identifiers
- Tables should be aligned

### JSON

- 2-space indentation
- Keys in snake_case
- Include comments via `_comment` fields if needed
- Validate with `jq` before committing

### YAML

- 2-space indentation
- Use quotes for strings with special characters
- Keep lines under 100 characters

### Python (for automation scripts)

- Follow PEP 8
- Use type hints
- Document functions with docstrings
- Use `black` for formatting

---

## Commit Messages

### Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples

```
feat(prototype): add NFT rail system v0.1

- Initial specification document
- BOM with DIY alternatives
- Automation scoring (45/100)

Closes #12
```

```
docs(agents): improve research agent workflow

- Add YouTube scanning capability
- Document credibility rating system
- Add example output format
```

```
fix(cost-optimizer): correct Amazon API rate limiting

Handle 429 responses with exponential backoff.
Previous behavior caused missed price updates.
```

---

## Questions?

- Open an issue for general questions
- Tag maintainers for urgent matters
- Join discussions in the project's GitHub Discussions

Thank you for contributing! 🌱
