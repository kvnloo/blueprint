# Prompt Templates

Reusable prompt structures for the autonomous vertical farming system. These templates are designed for use with Claude and can be assembled into prompt stacks for specific tasks.

## Table of Contents

- [Base Prompts](#base-prompts)
- [Component Prompts](#component-prompts)
- [Agent System Prompts](#agent-system-prompts)
- [Prompt Stack Assembly](#prompt-stack-assembly)

---

## Base Prompts

### autonomous-farming.md

The core mission and constraints for all farming-related tasks.

```markdown
# Autonomous Vertical Farming - Base Prompt

## Mission
Design cost-effective, highly automated vertical farming systems optimized for 
Blue Zone/Blueprint nutrition.

## Core Constraints
1. **Automation Target**: <1 hour/week human intervention
2. **Cost Priority**: Minimize cost, DIY preferred over commercial
3. **Nutrition Focus**: Optimize nutritional density per square foot
4. **Environment**: Indoor/controlled environment
5. **Scalability**: Design must be modular and scalable

## Priority Crops (in order)
1. **Leafy Greens**: Kale, spinach, arugula, lettuce
2. **Cruciferous**: Broccoli sprouts, microgreens
3. **Herbs**: Basil, cilantro, parsley, mint
4. **Fruiting** (advanced): Cherry tomatoes, peppers

## Key Metrics to Optimize
- Cost per pound of produce
- Yield per square foot per year
- Automation score (0-100)
- Setup complexity (hours)
- Maintenance frequency
- Energy consumption (kWh/lb)

## Research Sources to Prioritize
1. NASA VEGGIE / Advanced Plant Habitat programs
2. MIT OpenAg (archived research)
3. University extension guides (state agriculture departments)
4. Community: r/hydro, r/aerogarden, r/verticalfarming
5. Academic papers on controlled environment agriculture
```

### diy-priority.md

Hierarchy for component selection prioritizing DIY solutions.

```markdown
# DIY Priority Hierarchy

When selecting components or solutions, follow this hierarchy:

## Priority Order

### 1. Build from Raw Materials (Highest Priority)
- Steel, aluminum, PVC from hardware stores
- 3D printed components (design files shared)
- Laser-cut acrylic/wood
- **Why**: Lowest cost, highest customization, full control

### 2. Repurpose Consumer Goods
- IKEA hacks (shelving, containers)
- Food-grade storage containers
- Aquarium equipment
- **Why**: Medium cost, faster assembly, proven durability

### 3. Open Source Hardware
- Documented DIY projects (Instructables, Hackaday)
- GitHub hardware repos
- Community-validated designs
- **Why**: Community-tested, known issues documented

### 4. Budget Commercial
- Amazon basics / AliExpress
- Generic sensors and components
- Budget grow lights
- **Why**: Use when DIY isn't practical or cost-effective

### 5. Premium Commercial (Lowest Priority)
- Brand-name agricultural equipment
- Professional-grade sensors
- Commercial automation systems
- **Why**: Only when reliability is absolutely critical

## Decision Framework
For each component, ask:
1. Can I build this from raw materials for <50% of commercial cost?
2. Is there a proven DIY alternative with good documentation?
3. What's the failure cost if this component breaks?
4. How much time am I willing to invest in building vs. buying?
```

### blueprint-nutrition.md

Crop selection based on nutritional optimization.

```markdown
# Blueprint Nutrition Optimization

## Goal
Maximize nutrient density per square foot, aligned with longevity research 
and Blue Zone dietary patterns.

## Tier 1: Daily Consumption Crops

### Leafy Greens (50% of growing space)
| Crop | Key Nutrients | Days to Harvest | Yield/sqft/year |
|------|--------------|-----------------|-----------------|
| Kale | Vitamin K, A, C, sulforaphane | 55-75 | 4-6 lbs |
| Spinach | Iron, folate, magnesium | 40-50 | 5-7 lbs |
| Arugula | Nitrates, vitamin K | 30-40 | 6-8 lbs |
| Swiss Chard | Vitamin K, magnesium | 50-60 | 4-5 lbs |

### Cruciferous/Sprouts (20% of space)
| Crop | Key Nutrients | Days to Harvest | Yield/sqft/year |
|------|--------------|-----------------|-----------------|
| Broccoli sprouts | Sulforaphane (highest) | 5-7 | N/A (continuous) |
| Microgreens mix | Concentrated nutrients | 10-14 | High turnover |

## Tier 2: Flavor & Variety

### Herbs (15% of space)
| Crop | Benefits | Days to Harvest |
|------|----------|-----------------|
| Basil | Anti-inflammatory | 30-45 |
| Cilantro | Heavy metal chelation | 45-70 |
| Parsley | Vitamin K, C | 70-90 |
| Mint | Digestive support | 60-90 |

## Tier 3: Advanced (Optional)

### Fruiting (15% of space, if space allows)
- Cherry tomatoes (lycopene)
- Peppers (vitamin C)
- Strawberries (antioxidants)

**Note**: Fruiting crops require more space, light, and care. 
Start with Tier 1 and expand.
```

---

## Component Prompts

### sensors.md

Technical specifications for sensor selection.

```markdown
# Sensor Specifications

## Required Sensors (Minimum Viable)

### pH Sensor
- **Accuracy**: ±0.1 pH
- **Range**: 0-14 pH
- **DIY Option**: Generic analog sensor + ADS1115 ADC ($15)
- **Commercial Option**: Atlas Scientific EZO ($150)
- **Calibration**: Monthly with pH 4.0 and 7.0 buffers
- **Integration**: I2C or analog to ESP32

### EC/TDS Sensor
- **Accuracy**: ±5%
- **Range**: 0-5000 µS/cm
- **DIY Option**: DFRobot analog EC sensor ($10)
- **Commercial Option**: Atlas Scientific K1.0 ($200)
- **Note**: Temperature compensation required for accuracy

### Water Temperature
- **Accuracy**: ±0.5°C
- **DIY Option**: DS18B20 waterproof ($3)
- **Commercial Option**: RTD probe ($20)
- **Integration**: OneWire protocol

### Air Temperature/Humidity
- **Accuracy**: ±2% RH, ±0.5°C
- **DIY Option**: DHT22 ($5)
- **Commercial Option**: BME280 ($15, includes pressure)
- **Integration**: I2C or digital

### Water Level
- **Type**: Binary (high/low) or continuous
- **DIY Option**: Float switch ($2) or ultrasonic HC-SR04 ($3)
- **Commercial Option**: Capacitive level sensor ($15)

## Optional Sensors (High Value)

### PAR Light Sensor
- **DIY Option**: TSL2591 + conversion ($30)
- **Commercial Option**: Apogee SQ-520 ($200)
- **Value**: High - enables DLI optimization

### CO2 Sensor
- **DIY Option**: MH-Z19B NDIR ($20)
- **Commercial Option**: Sensirion SCD30 ($50)
- **Value**: Medium - for enclosed environments

### Camera (Plant Health AI)
- **DIY Option**: Raspberry Pi Camera Module ($25)
- **Commercial Option**: Industrial vision camera ($100+)
- **Value**: High - enables disease detection, growth tracking

## Integration Patterns

### ESP32 + ESPHome (Recommended for Home Assistant)
```yaml
sensor:
  - platform: dallas
    address: 0x1234567890ABCDEF
    name: "Water Temperature"
  - platform: adc
    pin: GPIO34
    name: "pH Reading"
    filters:
      - calibrate_linear:
        - 0.0 -> 4.0
        - 3.3 -> 10.0
```

### Raspberry Pi + Python (Standalone)
```python
import board
import adafruit_dht
dht = adafruit_dht.DHT22(board.D4)
temp = dht.temperature
humidity = dht.humidity
```

## Data Logging Requirements
- **Frequency**: 1 reading per 15 minutes minimum
- **Storage**: InfluxDB (recommended) or CSV
- **Retention**: 1 year minimum
- **Alerts**: Email/push when values outside range
```

### lighting.md

LED lighting specifications for hydroponics.

```markdown
# Lighting Specifications

## Key Metrics

### DLI (Daily Light Integral)
Target values by crop:
| Crop | DLI (mol/m²/day) | PPFD @ 16hr | PPFD @ 18hr |
|------|------------------|-------------|-------------|
| Lettuce | 12-17 | 208-295 | 185-262 |
| Kale | 15-20 | 260-347 | 231-308 |
| Basil | 15-20 | 260-347 | 231-308 |
| Tomatoes | 20-30 | 347-521 | 308-463 |

### PPFD (Photosynthetic Photon Flux Density)
- Measured in µmol/m²/s
- Target: 200-400 for leafy greens
- Measure at canopy level

### Light Spectrum
- **Vegetative**: Higher blue (400-500nm)
- **Flowering**: Higher red (600-700nm)
- **Full spectrum**: 3000-5000K white LEDs work well

## DIY Options

### LED Strip Build
- **Components**: Samsung LM301B/H strips, Meanwell driver
- **Cost**: ~$50 for 2x2 ft coverage
- **PPFD**: 300-500 achievable
- **Build time**: 2-4 hours

### Budget Commercial
- **Option**: Spider Farmer SF-1000 (~$100)
- **Coverage**: 2x2 ft
- **PPFD**: 400-600 at 12"

## Mounting Height
| Growth Stage | Height Above Canopy |
|--------------|---------------------|
| Seedling | 24-30 inches |
| Vegetative | 18-24 inches |
| Mature | 12-18 inches |

## Automation Requirements
- **Timer**: Mechanical ($5) or smart ($15)
- **Dimming**: PWM control for gradual sunrise/sunset
- **Scheduling**: 16-18 hours on, 6-8 hours off
```

### nutrients.md

Nutrient solution specifications.

```markdown
# Nutrient Specifications

## Base Nutrient Requirements

### Macronutrients (ppm targets)
| Element | Lettuce | Tomato | Herbs |
|---------|---------|--------|-------|
| Nitrogen (N) | 150-200 | 200-250 | 150-200 |
| Phosphorus (P) | 30-50 | 40-60 | 30-50 |
| Potassium (K) | 200-250 | 300-400 | 200-250 |
| Calcium (Ca) | 150-200 | 200-250 | 150-200 |
| Magnesium (Mg) | 40-60 | 50-75 | 40-60 |
| Sulfur (S) | 50-75 | 75-100 | 50-75 |

### EC Targets
| Growth Stage | EC (mS/cm) |
|--------------|------------|
| Seedling | 0.8-1.2 |
| Vegetative | 1.2-1.8 |
| Mature | 1.5-2.2 |
| Fruiting | 2.0-3.0 |

### pH Targets
- **General**: 5.5-6.5
- **Optimal**: 5.8-6.2
- **Never below**: 5.0
- **Never above**: 7.0

## Nutrient Options

### DIY (Advanced)
- MasterBlend 4-18-38 + Calcium Nitrate + Epsom Salt
- Cost: ~$0.02/gallon
- Requires accurate scale and pH meter

### Pre-Mixed (Recommended for beginners)
- General Hydroponics Flora Series
- Cost: ~$0.10/gallon
- Easy to use, consistent results

## Automation

### pH Control
- **Up solution**: Potassium hydroxide (careful!)
- **Down solution**: Phosphoric acid
- **Dosing**: Peristaltic pump ($15-30)
- **Automation**: ESP32 + relay + pump

### EC/Nutrient Dosing
- **Method**: Concentrated stock solutions
- **Ratio**: 100:1 or 200:1 dilution
- **Automation**: Same as pH (separate pump)

## Water Quality
- **Source**: Tap water okay if <200 ppm TDS
- **RO water**: Needed if TDS >300 ppm
- **Temperature**: 65-75°F (18-24°C)
```

---

## Agent System Prompts

### research-agent-system.md

```markdown
# Research Agent System Prompt

You are a Research Agent specializing in vertical farming, hydroponics, and 
agricultural automation. Your role is to find, validate, and synthesize 
information from authoritative and community sources.

## Behavior Guidelines

1. **Source Hierarchy**
   - Prioritize: NASA, universities, peer-reviewed papers
   - Secondary: Extension guides, industry publications
   - Community: Reddit, YouTube, maker forums (validate claims)

2. **Output Format**
   Always structure findings as YAML with:
   - topic, date, query
   - sources (with credibility rating)
   - specifications_extracted
   - recommendations
   - confidence_level

3. **Validation Rules**
   - Cross-reference claims across multiple sources
   - Note when community advice conflicts with research
   - Flag outdated information (>3 years old for tech)

4. **Search Patterns**
   - Use site-specific searches for quality
   - Include "DIY" and "budget" variants
   - Search for failure modes, not just successes

## Do Not
- Make up specifications
- Recommend products without price research
- Ignore safety concerns
- Trust single sources for critical specs
```

### design-agent-system.md

```markdown
# Design Agent System Prompt

You are a Design Agent specializing in creating 3D assets for vertical 
farming digital twins using Blender-MCP and Rodin AI.

## Behavior Guidelines

1. **Tool Selection**
   - Blender procedural: Structural components, parametric designs
   - Rodin AI: Organic shapes, complex details, consumer products
   - Asset libraries: Plants, electronics, reference models

2. **Quality Standards**
   - All meshes: Clean quad topology, no n-gons
   - All models: Proper UV unwrapping before export
   - All materials: Basic PBR only (albedo, roughness, metallic, normal)
   - Scale: Real-world dimensions, 1 unit = 1 cm

3. **Naming Convention**
   `{prototype}_{component}_v{version}.fbx`
   Example: `grow-tower_frame_v2.fbx`

4. **Origin Points**
   - Structural: Bottom center
   - Containers: Bottom center
   - Plants: Base of stem
   - Electronics: Mounting point

## Export Checklist
□ Dimensions match specification
□ Origin point logically placed
□ UVs properly unwrapped
□ Materials use basic PBR only
□ Poly count reasonable (<100k per component)
□ Naming follows convention
□ No modifiers left unapplied
```

---

## Prompt Stack Assembly

### How to Assemble Prompts

Prompts are assembled in a specific order to build context:

```yaml
# Example: New Grow Tower Design

prompt_stack:
  # 1. Mission and constraints (always first)
  - knowledge/prompts/base/autonomous-farming.md
  
  # 2. Priority modifiers
  - knowledge/prompts/base/diy-priority.md
  - knowledge/prompts/base/blueprint-nutrition.md
  
  # 3. Relevant research
  - knowledge/prompts/research/hydroponics-basics.md
  - knowledge/prompts/research/nft-systems.md
  
  # 4. Component specifications
  - knowledge/prompts/components/sensors.md
  - knowledge/prompts/components/lighting.md
  - knowledge/prompts/components/nutrients.md
  
  # 5. Task-specific instructions
  - "Design a 5-foot vertical grow tower with 36 planting sites..."
```

### Assembly Script

```python
def assemble_prompt_stack(stack_config: list[str], task: str) -> str:
    """Assemble prompts from stack configuration."""
    
    assembled = []
    
    for prompt_path in stack_config:
        with open(prompt_path) as f:
            content = f.read()
            assembled.append(f"# From: {prompt_path}\n\n{content}")
    
    # Add task at the end
    assembled.append(f"# Task\n\n{task}")
    
    return "\n\n---\n\n".join(assembled)

# Usage
stack = [
    "knowledge/prompts/base/autonomous-farming.md",
    "knowledge/prompts/base/diy-priority.md",
    "knowledge/prompts/components/sensors.md"
]

task = """
Design a sensor suite for monitoring a 5-shelf hydroponic rack system.
Requirements:
- pH, EC, and water temperature monitoring
- Air temperature and humidity
- Water level detection
- Budget: <$100 total
- Integration: ESP32 with Home Assistant

Output the component list with costs and wiring diagram description.
"""

full_prompt = assemble_prompt_stack(stack, task)
```

---

## Next Steps

- [Setup Guide](SETUP.md) - Installation and configuration
- [Architecture](ARCHITECTURE.md) - System design details
