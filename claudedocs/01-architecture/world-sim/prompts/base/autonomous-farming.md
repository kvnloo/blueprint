# Autonomous Farming Base Prompt

## Mission

Design cost-effective, highly automated vertical farming systems optimized for Blue Zone / Blueprint nutrition with minimal human intervention.

## Core Constraints

1. **Automation Target**: <1 hour/week human intervention
2. **Cost Priority**: Minimize cost (DIY preferred over commercial)
3. **Nutrition Focus**: Optimize nutritional density per square foot
4. **Environment**: Indoor controlled environment (CEA)
5. **Scalability**: Design for easy replication and scaling

## Priority Crops

### Tier 1: Daily Consumption (Highest Priority)
- **Leafy Greens**: Kale, spinach, arugula, lettuce varieties
- **Cruciferous**: Broccoli sprouts, microgreens
- **Herbs**: Basil, cilantro, parsley, mint

### Tier 2: High Value (Medium Priority)
- **Fruiting**: Cherry tomatoes, peppers
- **Specialty**: Watercress, bok choy

### Tier 3: Experimental (Lower Priority)
- **Root crops**: Radishes (fast cycle)
- **Flowers**: Edible flowers, nasturtium

## Key Metrics

| Metric | Target | Calculation |
|--------|--------|-------------|
| Cost per lb | <$2.00 | Total annual cost / annual yield |
| Yield per sq ft | >50 lbs/year | Annual harvest / growing footprint |
| Automation score | >80/100 | Weighted component automation levels |
| Setup complexity | <20 hours | Total build time |
| Maintenance frequency | <4x/month | Required human interventions |
| Energy consumption | <5 kWh/lb | Annual energy / annual yield |

## Design Principles

### 1. Simplicity First
- Prefer proven, simple solutions over complex novel approaches
- Each additional component must justify its complexity
- Failure modes should be graceful and recoverable

### 2. DIY Priority Hierarchy
1. **Build from raw materials** (steel, PVC, 3D printed) - Lowest cost, highest customization
2. **Repurpose consumer goods** (IKEA hacks, storage containers) - Medium cost, faster assembly
3. **Open source hardware** (documented DIY projects) - Community-validated designs
4. **Budget commercial** (Amazon basics, AliExpress) - When DIY isn't practical
5. **Premium commercial** - Only when reliability is critical and no alternative exists

### 3. Modularity
- Design for component replacement without system redesign
- Standardize interfaces between subsystems
- Enable incremental upgrades

### 4. Data-Driven Optimization
- Include sensors for key parameters
- Log data for analysis and improvement
- Enable remote monitoring

## Research Sources

### Primary (Highest Credibility)
- NASA VEGGIE and Advanced Plant Habitat research
- MIT OpenAg initiative publications
- University extension services (Cornell, UC Davis, etc.)
- Peer-reviewed hydroponics journals

### Secondary (Community Validation)
- r/hydro and r/aerogarden communities
- Instructables hydroponics projects
- YouTube: Jeb Gardener, Khang Starr, Epic Gardening
- Maker forums and Hackaday

## Output Requirements

When designing a prototype, include:

1. **Physical Specifications**: Exact dimensions, materials, quantities
2. **Bill of Materials**: Itemized with sources and pricing
3. **Automation Specification**: Level and method for each function
4. **Assembly Guide**: Step-by-step with estimated time
5. **Operating Parameters**: Light schedule, nutrient EC, pH range, temps
6. **Digital Twin Spec**: Components needed for UE5 simulation
7. **Iteration History**: Changes from previous versions and rationale

## Usage

This prompt should be combined with:
- **Modifiers**: cost-optimization.md, diy-priority.md
- **Research**: Relevant findings from knowledge base
- **Components**: Specific component specifications needed

```yaml
prompt_stack:
  base:
    - autonomous-farming.md
  modifiers:
    - cost-optimization.md
    - diy-priority.md
  research:
    - hydroponics-basics.md
    - nasa-veggie.md
  components:
    - lighting.md
    - sensors.md
    - automation.md
```
