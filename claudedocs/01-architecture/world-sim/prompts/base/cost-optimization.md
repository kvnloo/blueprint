# Cost Optimization Modifier

## Purpose

This modifier emphasizes cost optimization across all design decisions, ensuring maximum value without sacrificing core functionality.

## Optimization Principles

### 1. Total Cost of Ownership (TCO)

Don't just minimize upfront cost. Consider:

```
TCO = Setup Cost + (Monthly Operating × Months) + Maintenance + Replacement
```

| Factor | Weight | Notes |
|--------|--------|-------|
| Setup cost | 30% | One-time investment |
| Monthly operating | 40% | Ongoing electricity, nutrients |
| Maintenance | 15% | Time and materials for upkeep |
| Replacement | 15% | Expected component failures |

### 2. Value Engineering

For each component, ask:
1. Is this component necessary?
2. Can a cheaper alternative perform adequately?
3. What's the cost of failure?
4. Can we consolidate multiple functions?

### 3. Bulk Buying Thresholds

| Component | Single | Bulk Qty | Bulk Price | Savings |
|-----------|--------|----------|------------|---------|
| Net pots (2") | $0.25 | 100+ | $0.08 | 68% |
| Clay pebbles | $15/10L | 50L+ | $8/10L | 47% |
| LED strips | $12/m | 10m+ | $7/m | 42% |
| pH probe | $15 | 5+ | $10 | 33% |

## Cost Categories

### Structure (Target: <$100)

**High Value Options:**
- Unistrut from salvage: $0-20
- PVC pipe frame: $30-50
- Wire shelving (used): $20-40
- 2x4 lumber frame: $40-60

**Avoid:**
- Aluminum extrusion (80/20): $200+
- Pre-built grow racks: $150-300

### Lighting (Target: <$100)

**High Value Options:**
- Samsung LM301H strips (DIY): $60-80
- Shop light conversion: $30-50
- Used grow lights (eBay): $40-80

**Avoid:**
- "Blurple" Amazon lights: Poor efficiency
- Name brand fixtures: 2-3x markup

### Automation (Target: <$50)

**High Value Options:**
- ESP32 + sensors: $25-35
- Smart plugs for timers: $10-15
- DIY pH dosing: $15-25

**Avoid:**
- Commercial controllers: $100-300
- Proprietary sensor systems: Lock-in

### Growing System (Target: <$50)

**High Value Options:**
- 5-gallon buckets (restaurant surplus): $0-5
- Storage bins: $10-20
- DIY NFT channels (fence posts): $20-30

**Avoid:**
- Purpose-built hydro systems: 3-5x markup

## ROI Optimization

### Quick Wins (Payback <6 months)

1. **Switch to DIY nutrients**: $50/year savings
2. **LED timer optimization**: $30/year electricity savings
3. **Bulk seed buying**: $20/year savings
4. **Rainwater collection**: $15/year savings

### Medium-Term (Payback 6-12 months)

1. **Solar panel addition**: Eliminates electricity cost
2. **Automated dosing**: Reduces labor, improves yields
3. **Insulation upgrade**: Reduces climate control cost

### Long-Term (Payback >12 months)

1. **Premium sensors**: Better optimization, fewer losses
2. **Backup systems**: Prevents catastrophic failures
3. **Expansion capacity**: Lower per-unit costs

## Pricing Research Protocol

### Step 1: Baseline (Amazon)
Search Amazon for the component. This is your reference price.

### Step 2: Budget Alternatives
- AliExpress (2-4 week shipping)
- eBay (used/refurbished)
- Facebook Marketplace
- Craigslist

### Step 3: DIY Assessment
- Thingiverse (3D printable)
- Instructables (build guides)
- Reddit communities

### Step 4: Bulk/Wholesale
- McMaster-Carr (industrial)
- Grainger
- Direct from manufacturer

### Price Tracking

```yaml
price_check:
  component: "ADS1115 ADC Module"
  date: "2025-11-29"

  sources:
    - name: "Amazon"
      price: 8.99
      shipping: 0
      delivery_days: 2

    - name: "AliExpress"
      price: 2.50
      shipping: 0
      delivery_days: 21

    - name: "eBay"
      price: 5.99
      shipping: 3.00
      delivery_days: 5

  recommendation: "AliExpress"
  notes: "Order 3 weeks ahead, buy 2 for spares"
```

## Budget Templates

### Minimal Viable System ($200)

| Category | Budget | Key Choices |
|----------|--------|-------------|
| Structure | $30 | Wire shelving (used) |
| Lighting | $50 | Shop light conversion |
| Growing | $20 | 5-gallon bucket DWC |
| Automation | $15 | Timer only |
| Plumbing | $25 | Air pump, air stones |
| Nutrients | $30 | General Hydroponics trio |
| Misc | $30 | pH kit, net pots, medium |

### Balanced System ($400)

| Category | Budget | Key Choices |
|----------|--------|-------------|
| Structure | $60 | PVC or unistrut frame |
| Lighting | $100 | DIY LED strips |
| Growing | $50 | Multi-bin system |
| Automation | $60 | ESP32 + basic sensors |
| Plumbing | $50 | Pump, reservoir, tubing |
| Nutrients | $50 | Quality nutrients |
| Misc | $30 | Consumables |

### Full-Featured System ($800)

| Category | Budget | Key Choices |
|----------|--------|-------------|
| Structure | $100 | Steel frame, proper mounting |
| Lighting | $200 | High-efficiency LEDs, dimmers |
| Growing | $100 | Multi-tier, high capacity |
| Automation | $150 | Full sensor suite, auto-dosing |
| Plumbing | $100 | Redundant pumps, quality fittings |
| Nutrients | $100 | Premium nutrients, supplements |
| Misc | $50 | Backup components |

## Cost Reduction Checklist

Before finalizing any BOM:

- [ ] Can any component be eliminated entirely?
- [ ] Is there a cheaper material that works?
- [ ] Can we buy used/refurbished?
- [ ] Is there a DIY alternative?
- [ ] Are we buying in optimal quantities?
- [ ] Have we checked AliExpress pricing?
- [ ] Can we repurpose household items?
- [ ] Is the "premium" version worth it?
- [ ] What's the failure cost if we go cheap?
- [ ] Can we phase the purchase over time?
