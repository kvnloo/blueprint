# DIY Priority Modifier

## Purpose

This modifier adjusts the base prompt to strongly prioritize DIY and budget solutions over commercial alternatives.

## Priority Hierarchy

### Level 1: Build from Raw Materials (Highest Priority)
**Cost Savings: 60-90%**

- Steel: Unistrut channel, angle iron, threaded rod
- PVC: Pipes, fittings, sheet stock
- Wood: Dimensional lumber, plywood (moisture treated)
- 3D Printed: Custom brackets, housings, adapters
- Recycled: Pallet wood, reclaimed materials

**When to use:**
- Structural components with simple geometry
- Custom-fit parts not available commercially
- Learning new fabrication skills is acceptable
- Time is more available than money

### Level 2: Repurpose Consumer Goods
**Cost Savings: 40-70%**

- IKEA hacks: LACK tables, KALLAX shelves, TERTIAL lamps
- Storage containers: Food-grade buckets, storage bins
- Kitchen items: Colanders, storage containers
- Hardware store: Rain gutters, fence posts

**When to use:**
- Need quick assembly
- Want proven durability
- Acceptable aesthetics matter
- Standard sizes work for design

### Level 3: Open Source Hardware
**Cost Savings: 30-60%**

- Documented DIY projects with community validation
- GitHub repositories with build guides
- Instructables with multiple successful builds
- Thingiverse designs with positive reviews

**When to use:**
- Want community support
- Need proven designs
- Reducing design time is priority
- Learning from others' mistakes

### Level 4: Budget Commercial
**Cost Savings: 10-30% vs premium**

- Amazon Basics and generic brands
- AliExpress direct from manufacturers
- Harbor Freight tools
- Local hardware store generics

**When to use:**
- DIY not practical (electronics, pumps)
- Time savings worth the cost
- Warranty/return policy needed
- Reliability requirements moderate

### Level 5: Premium Commercial (Last Resort)
**Use only when:**

- Reliability is absolutely critical (main water pump)
- No viable DIY alternative exists
- Certification required (electrical safety)
- Failure would cause significant damage
- Professional installation required

## Component-Specific Guidance

### Structure & Frame

| Component | Best Approach | Reasoning |
|-----------|---------------|-----------|
| Main frame | Level 1 (Unistrut) | Easy to work with, adjustable |
| Shelving | Level 2 (IKEA/wire shelves) | Strong, cheap, available |
| Mounting brackets | Level 1 (3D printed) | Custom fit, pennies each |
| Water containment | Level 2 (Storage bins) | Food-grade, leak-proof |

### Growing System

| Component | Best Approach | Reasoning |
|-----------|---------------|-----------|
| Growing containers | Level 2 (Food buckets) | Free from restaurants |
| Net pots | Level 4 (AliExpress bulk) | Cheap enough, tedious to print |
| Growing medium | Level 4 (Bulk LECA) | DIY alternatives inferior |
| Rafts/panels | Level 1 (Foam board) | Easy to cut, cheap |

### Lighting

| Component | Best Approach | Reasoning |
|-----------|---------------|-----------|
| LED strips | Level 3/4 (Samsung strips) | DIY assembly, commercial strips |
| Drivers | Level 4 (Meanwell) | Safety critical, worth the cost |
| Fixtures/housing | Level 1 (Aluminum channel) | Easy, good heat dissipation |
| Timers | Level 4 (Smart plugs) | $5-10, very reliable |

### Automation & Sensors

| Component | Best Approach | Reasoning |
|-----------|---------------|-----------|
| Controller | Level 4 (ESP32) | $5, can't DIY cheaper |
| pH sensor | Level 1+4 (DIY circuit + probe) | ADS1115 ADC + generic probe |
| EC sensor | Level 1+4 (DIY) | Resistance measurement circuit |
| Water level | Level 1 (Float switch) | $2, simple, reliable |
| Temp sensors | Level 4 (DS18B20) | $1 each, waterproof |

### Plumbing

| Component | Best Approach | Reasoning |
|-----------|---------------|-----------|
| Reservoir | Level 2 (Food bucket) | Free-$10, perfect size |
| Main pump | Level 4/5 (Quality pump) | Failure = dead plants |
| Tubing | Level 4 (Vinyl/silicone) | Cheap, food-safe options |
| Fittings | Level 4 (Bulk pack) | Not worth 3D printing |
| Air pump | Level 4 (Aquarium pump) | Reliable, cheap |

## Cost Comparison Template

For each component, evaluate:

```yaml
component: "pH Sensor Module"

commercial:
  product: "Atlas Scientific pH Kit"
  price: 79.99
  pros: ["Accurate", "Calibrated", "Support"]
  cons: ["Expensive", "Proprietary"]

diy_alternative:
  materials:
    - item: "ADS1115 ADC module"
      price: 3.50
    - item: "Generic pH probe"
      price: 8.00
    - item: "BNC connector"
      price: 1.50
    - item: "3D printed housing"
      price: 0.50
  total_materials: 13.50
  labor_hours: 2
  labor_value: 50.00  # at $25/hr
  total_real_cost: 63.50

  pros: ["75% material savings", "Repairable", "Learnable"]
  cons: ["Requires calibration", "Less accurate", "Build time"]

recommendation: "DIY"
reasoning: "75% savings on materials, acceptable accuracy for hobby use,
           educational value, parts easily replaceable"
```

## Red Flags for Premium Components

Consider premium/commercial when:
- Failure causes water damage (main circulation pump)
- Electrical safety concerns (mains voltage handling)
- Food safety requirements (food-contact materials)
- Regulatory compliance needed
- Warranty critical for peace of mind
- DIY would take >10x longer than commercial equivalent

## Success Stories

Document successful DIY implementations:

```yaml
success_stories:
  - component: "5-gallon bucket DWC"
    cost_vs_commercial: "$8 vs $45"
    savings_pct: 82%
    reliability: "Excellent after 2 years"
    source: "r/hydro community"

  - component: "IKEA LACK grow light stand"
    cost_vs_commercial: "$15 vs $80"
    savings_pct: 81%
    reliability: "Good, needs reinforcement for heavy lights"
    source: "r/SpaceBuckets"

  - component: "ESP32 nutrient doser"
    cost_vs_commercial: "$25 vs $200"
    savings_pct: 87%
    reliability: "Good with proper calibration"
    source: "Instructables"
```
