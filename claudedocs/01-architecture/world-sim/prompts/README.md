# World Sim Prompts

Reusable prompts for the autonomous vertical farming digital twin system.

## Structure

```
prompts/
├── base/                    # Core system prompts
│   ├── autonomous-farming.md   # Mission and constraints
│   ├── cost-optimization.md    # Cost optimization modifier
│   └── diy-priority.md         # DIY priority hierarchy
└── components/              # Component specifications
    └── sensors.md              # Sensor specifications
```

## Usage

Prompts are combined into "prompt stacks" for specific tasks:

```yaml
prompt_stack:
  base:
    - autonomous-farming.md
  modifiers:
    - cost-optimization.md
    - diy-priority.md
  components:
    - sensors.md
```

## Contents

### Base Prompts
- **autonomous-farming.md** - Core mission, constraints, priority crops, key metrics
- **cost-optimization.md** - TCO analysis, value engineering, budget templates
- **diy-priority.md** - DIY vs commercial decision hierarchy

### Component Specifications
- **sensors.md** - pH, EC, temperature, humidity, water level sensors

---
[← Back to World Sim](../README.md)
