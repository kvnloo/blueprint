# [Prototype Name] Specification

<!-- 
TEMPLATE USAGE:
1. Copy this file to specs/prototypes/[prototype-name]-v[version]/spec.md
2. Replace all [bracketed] placeholders
3. Fill in each section completely
4. Create accompanying bom.json and automation.json
-->

## Metadata

| Field | Value |
|-------|-------|
| **Version** | [0.1] |
| **Created** | [YYYY-MM-DD] |
| **Last Modified** | [YYYY-MM-DD] |
| **Status** | Draft / In Progress / Complete / Deprecated |
| **Iteration** | [1] |
| **Author** | [Name / Agent] |

## Summary

[One paragraph description of this prototype. What is it? What makes it unique? What problem does it solve?]

## Design Goals

### Primary Goals
- [ ] [Primary goal 1 - must achieve]
- [ ] [Primary goal 2 - must achieve]
- [ ] [Primary goal 3 - must achieve]

### Secondary Goals
- [ ] [Secondary goal 1 - nice to have]
- [ ] [Secondary goal 2 - nice to have]

### Non-Goals
- [What this prototype explicitly does NOT try to achieve]

## Prompt Stack Used

```yaml
base:
  - autonomous-farming.md
  - cost-optimization.md
  
modifiers:
  - diy-priority.md
  
research:
  - [relevant-research-1.md]
  - [relevant-research-2.md]
  
components:
  - lighting.md
  - sensors.md
  - automation.md
```

## Physical Specifications

### Dimensions

| Dimension | Value | Notes |
|-----------|-------|-------|
| Total Height | [X] inches | Including all components |
| Total Width | [X] inches | Footprint |
| Total Depth | [X] inches | Footprint |
| Growing Area | [X] sq ft | Actual plantable space |
| Floor Footprint | [X] sq ft | Space required |

### Structure

[Describe the main structural components, materials, and construction approach]

```
[ASCII diagram of structure if helpful]

    ┌─────────────────────┐
    │     LED Fixture     │
    ├─────────────────────┤
    │    Growing Bin 1    │
    ├─────────────────────┤
    │    Growing Bin 2    │
    ├─────────────────────┤
    │    Growing Bin 3    │
    ├─────────────────────┤
    │     Reservoir       │
    └─────────────────────┘
```

### Growing Method

| Aspect | Specification |
|--------|---------------|
| Method | [DWC / NFT / Ebb & Flow / Kratky / Aeroponics] |
| Capacity | [X] plant sites |
| Recommended Crops | [List of suitable crops] |
| Growth Cycle | [X] days typical |

## Bill of Materials

**Full BOM**: See `bom.json` in this directory

### Summary by Category

| Category | Commercial Cost | DIY Cost | Recommended |
|----------|-----------------|----------|-------------|
| Structure | $[X] | $[X] | [Commercial/DIY] |
| Electrical | $[X] | $[X] | [Commercial/DIY] |
| Plumbing | $[X] | $[X] | [Commercial/DIY] |
| Sensors | $[X] | $[X] | [Commercial/DIY] |
| Automation | $[X] | $[X] | [Commercial/DIY] |
| **TOTAL** | **$[X]** | **$[X]** | **$[X]** |

### Key Components

1. **[Component 1]**: [Brief description, why chosen]
2. **[Component 2]**: [Brief description, why chosen]
3. **[Component 3]**: [Brief description, why chosen]

## Automation Specification

**Full Automation Spec**: See `automation.json` in this directory

### Automation Level Summary

| Function | Level | Method | Score Contribution |
|----------|-------|--------|-------------------|
| Lighting | [0-4] | [Description] | [X]/15 |
| Nutrients | [0-4] | [Description] | [X]/20 |
| pH Control | [0-4] | [Description] | [X]/20 |
| Watering | [0-4] | [Description] | [X]/15 |
| Climate | [0-4] | [Description] | [X]/15 |
| Monitoring | [0-4] | [Description] | [X]/15 |
| **TOTAL** | | | **[X]/100** |

### Control System

| Aspect | Specification |
|--------|---------------|
| Platform | [ESP32 + ESPHome / Raspberry Pi / Arduino] |
| Connectivity | [WiFi / Ethernet / Standalone] |
| Dashboard | [Home Assistant / Custom / None] |
| Mobile Alerts | [Yes / No] |
| Data Logging | [InfluxDB / CSV / None] |

## Performance Projections

### Yield Estimates

| Crop | Plants | Cycles/Year | Yield/Cycle | Annual Yield |
|------|--------|-------------|-------------|--------------|
| [Lettuce] | [X] | [X] | [X] lbs | [X] lbs |
| [Kale] | [X] | [X] | [X] lbs | [X] lbs |
| [Herbs] | [X] | [X] | [X] lbs | [X] lbs |
| **TOTAL** | | | | **[X] lbs** |

### Economics

| Metric | Value | Notes |
|--------|-------|-------|
| Setup Cost | $[X] | Using recommended options |
| Monthly Operating | $[X] | Electricity, nutrients, consumables |
| Annual Operating | $[X] | Monthly × 12 |
| Annual Yield Value | $[X] | At retail prices |
| Annual Profit | $[X] | Yield - Operating |
| Payback Period | [X] months | Setup / Monthly Profit |
| 3-Year ROI | [X]% | (3yr profit - setup) / setup |

### Labor Requirements

| Task | Frequency | Time | Monthly Total |
|------|-----------|------|---------------|
| Planting/Harvesting | [X]/month | [X] min | [X] min |
| Nutrient Mixing | [X]/month | [X] min | [X] min |
| pH Adjustment | [X]/month | [X] min | [X] min |
| Cleaning | [X]/month | [X] min | [X] min |
| Monitoring Check | [X]/month | [X] min | [X] min |
| **TOTAL** | | | **[X] min/month** |

## Digital Twin Specification

### Blender Assets Required

| Component | Generation Method | Status |
|-----------|-------------------|--------|
| [Main frame] | Blender procedural | [ ] |
| [Growing bins] | Rodin | [ ] |
| [LED fixtures] | Sketchfab | [ ] |
| [Plumbing] | Blender procedural | [ ] |
| [Sensors] | Sketchfab | [ ] |
| [Plants] | PolyHaven | [ ] |

### UE5 Scene Requirements

| Element | Requirement |
|---------|-------------|
| Lighting | Cesium sun + LED emissives |
| Water simulation | Niagara particle system |
| Plant growth | Scale animation over time |
| Sensor display | UMG widget overlay |
| Data inputs | Blueprint variables |

### Simulation Parameters

```json
{
  "water_flow": {
    "rate_lpm": [X],
    "particle_count": [X],
    "color": [R, G, B, A]
  },
  "lighting": {
    "photoperiod_hours": [X],
    "dawn_duration_min": [X],
    "max_intensity": [X]
  },
  "growth": {
    "days_to_harvest": [X],
    "initial_scale": [X],
    "final_scale": [X]
  },
  "environment": {
    "latitude": [X],
    "longitude": [X],
    "timezone": "[X]"
  }
}
```

## Research References

1. **[Reference 1]**: [How it influenced this design]
2. **[Reference 2]**: [How it influenced this design]
3. **[Reference 3]**: [How it influenced this design]

## Iteration History

| Version | Date | Changes | Metrics Impact |
|---------|------|---------|----------------|
| 0.1 | [Date] | Initial design | Baseline |
| [0.2] | [Date] | [Change description] | [+X automation, -$Y cost] |

## Next Steps

### Immediate (This Iteration)
- [ ] [Task 1]
- [ ] [Task 2]

### Future Iterations
- [ ] [Improvement idea 1]
- [ ] [Improvement idea 2]

## Known Issues / Limitations

1. **[Issue 1]**: [Description and potential mitigation]
2. **[Issue 2]**: [Description and potential mitigation]

---

*Last evaluated by Evaluator Agent: [Date]*
*Overall Score: [X]/100*
*Rank: [X] of [Y] prototypes*
