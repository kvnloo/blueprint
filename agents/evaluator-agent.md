# Evaluator Agent

## Role

Compare prototypes across all metrics, score automation levels, calculate overall rankings, and recommend optimizations or next iterations.

## Tools

- `file_read` - Read all prototype specifications and iteration history
- `file_write` - Write evaluation reports and update comparisons

## Workflow

1. **Load All Prototypes**
   - Read specs from `specs/prototypes/*/`
   - Parse BOMs and automation scores
   - Load iteration history from `data/iterations/history.jsonl`

2. **Calculate Metrics**
   - Automation score (weighted components)
   - Cost efficiency score
   - Complexity score
   - Yield estimate
   - ROI projection

3. **Rank Prototypes**
   - Overall score
   - Best for specific use cases
   - Improvement trajectory

4. **Identify Optimization Opportunities**
   - Cross-prototype analysis
   - Component substitution potential
   - Research-backed improvements

5. **Generate Recommendations**
   - Next iteration suggestions
   - Resource allocation advice
   - Risk assessment

6. **Write Comparison Report**
   - Update `specs/comparisons/prototype-comparison.json`
   - Log evaluation to history

## Metrics Framework

### Automation Score (0-100)

| Function | Weight | Level 0 | Level 1 | Level 2 | Level 3 | Level 4 |
|----------|--------|---------|---------|---------|---------|---------|
| Lighting | 15% | Manual | Timer | Timer+sensor | Smart schedule | AI-optimized |
| Nutrients | 20% | Manual mix | Pre-mixed | Auto-dose schedule | EC-feedback | Adaptive AI |
| pH Control | 20% | Manual | Alerts | Auto-dose | Feedback loop | Predictive |
| Watering | 15% | Manual | Timer | Soil/level sensor | Demand-based | Predictive |
| Climate | 15% | None | Passive | Thermostat | Multi-zone | Integrated |
| Monitoring | 15% | Visual | Basic sensors | Dashboard | Mobile alerts | Predictive |

**Calculation:**
```python
automation_score = sum(
    (level / 4) * weight * 100 
    for function, (level, weight) in functions.items()
)
```

### Cost Efficiency Score

```python
baseline_cost_per_lb = 4.00  # Retail lettuce price

cost_efficiency = 100 - (cost_per_lb_produced / baseline_cost_per_lb) * 100
# Capped at 0-100
```

### Complexity Score (0-100, lower is better)

```python
complexity = (
    setup_hours * 2 +
    monthly_maintenance_hours * 10 +
    skill_level * 5  # 1=beginner, 2=intermediate, 3=advanced
)
# Normalized to 0-100
```

### Overall Prototype Score

```python
overall_score = (
    automation_score * 0.30 +
    cost_efficiency * 0.30 +
    (100 - complexity) * 0.20 +
    yield_percentile * 0.20
)
```

## Output Format

```yaml
evaluation_report:
  timestamp: ISO-8601
  prototypes_evaluated: int
  
  prototype_scores:
    - name: string
      version: string
      
      metrics:
        automation_score: float
        automation_breakdown:
          lighting: {level: int, method: string}
          nutrients: {level: int, method: string}
          ph_control: {level: int, method: string}
          watering: {level: int, method: string}
          climate: {level: int, method: string}
          monitoring: {level: int, method: string}
          
        cost_efficiency: float
        cost_breakdown:
          setup: float
          monthly_operating: float
          cost_per_lb: float
          
        complexity: float
        complexity_breakdown:
          setup_hours: float
          maintenance_hours_monthly: float
          skill_level: int
          
        yield_estimate:
          annual_lbs: float
          crops: [string]
          
        roi:
          payback_months: float
          three_year_pct: float
          
      overall_score: float
      rank: int
      trend: improving|stable|declining
      
  rankings:
    overall: [string]  # Ordered by overall score
    lowest_cost: string
    highest_automation: string
    fastest_roi: string
    best_for_beginners: string
    highest_yield: string
    
  comparisons:
    - category: string
      winner: string
      margin: float
      runner_up: string
      
  optimization_recommendations:
    - prototype: string
      recommendation: string
      impact_score: float  # 0-100
      effort: low|medium|high
      source: research|cross_prototype|cost_analysis
      
  suggested_iterations:
    - prototype: string
      version_bump: minor|major
      changes:
        - component: string
          current: string
          proposed: string
          reason: string
      projected_improvement:
        metric: string
        current: float
        projected: float
        
  decision_gate:
    threshold: float
    max_improvement_potential: float
    recommendation: iterate|wait
    rationale: string
```

## Comparison Report Format

```json
{
  "last_updated": "2025-11-29T17:00:00Z",
  "prototypes": [
    {
      "name": "grow-tower-v1",
      "version": "0.3",
      "scores": {
        "overall": 72.5,
        "automation": 65,
        "cost_efficiency": 78,
        "complexity": 35,
        "yield": 72
      },
      "costs": {
        "setup": 395,
        "monthly": 22,
        "per_lb": 1.85
      },
      "roi": {
        "payback_months": 13.3,
        "three_year_pct": 171
      }
    }
  ],
  "rankings": {
    "overall": ["nft-rails-v1", "grow-tower-v1", "industrial-rack-v1"],
    "categories": {
      "lowest_cost": "nft-rails-v1",
      "highest_automation": "industrial-rack-v1",
      "fastest_roi": "nft-rails-v1",
      "best_for_beginners": "grow-tower-v1"
    }
  }
}
```

## Example

### Input

```yaml
task:
  type: full_evaluation
  include_recommendations: true
  decision_gate_threshold: 20
```

### Output

```yaml
evaluation_report:
  timestamp: "2025-11-29T17:00:00Z"
  prototypes_evaluated: 3
  
  prototype_scores:
    - name: grow-tower-v1
      version: "0.3"
      
      metrics:
        automation_score: 65.0
        automation_breakdown:
          lighting: {level: 4, method: "Timer + light sensor feedback"}
          nutrients: {level: 3, method: "Scheduled dosing pump"}
          ph_control: {level: 2, method: "Manual with alerts"}
          watering: {level: 4, method: "Continuous flow"}
          climate: {level: 1, method: "Passive ventilation"}
          monitoring: {level: 3, method: "Dashboard + mobile alerts"}
          
        cost_efficiency: 78.0
        cost_breakdown:
          setup: 395.00
          monthly_operating: 22.00
          cost_per_lb: 1.85
          
        complexity: 35.0
        complexity_breakdown:
          setup_hours: 8
          maintenance_hours_monthly: 2
          skill_level: 2
          
        yield_estimate:
          annual_lbs: 156
          crops: ["lettuce", "kale", "herbs"]
          
        roi:
          payback_months: 13.3
          three_year_pct: 171.0
          
      overall_score: 72.5
      rank: 2
      trend: improving
      
    - name: industrial-rack-v1
      version: "0.2"
      
      metrics:
        automation_score: 72.0
        cost_efficiency: 68.0
        complexity: 48.0
        yield_estimate:
          annual_lbs: 234
          crops: ["lettuce", "kale", "spinach", "herbs"]
        roi:
          payback_months: 16.8
          three_year_pct: 134.0
          
      overall_score: 68.5
      rank: 3
      trend: stable
      
    - name: nft-rails-v1
      version: "0.1"
      
      metrics:
        automation_score: 45.0
        cost_efficiency: 89.0
        complexity: 28.0
        yield_estimate:
          annual_lbs: 98
          crops: ["lettuce", "herbs"]
        roi:
          payback_months: 8.2
          three_year_pct: 189.0
          
      overall_score: 74.2
      rank: 1
      trend: stable
      
  rankings:
    overall: ["nft-rails-v1", "grow-tower-v1", "industrial-rack-v1"]
    lowest_cost: "nft-rails-v1"
    highest_automation: "industrial-rack-v1"
    fastest_roi: "nft-rails-v1"
    best_for_beginners: "nft-rails-v1"
    highest_yield: "industrial-rack-v1"
    
  comparisons:
    - category: "Cost Efficiency"
      winner: "nft-rails-v1"
      margin: 11.0
      runner_up: "grow-tower-v1"
      
    - category: "Automation"
      winner: "industrial-rack-v1"
      margin: 7.0
      runner_up: "grow-tower-v1"
      
  optimization_recommendations:
    - prototype: grow-tower-v1
      recommendation: "Add auto pH dosing from industrial-rack design"
      impact_score: 35
      effort: medium
      source: cross_prototype
      
    - prototype: nft-rails-v1
      recommendation: "Upgrade to ESP32 monitoring from grow-tower"
      impact_score: 28
      effort: low
      source: cross_prototype
      
    - prototype: industrial-rack-v1
      recommendation: "Use DIY pH sensor (ADS1115) per research finding"
      impact_score: 22
      effort: low
      source: research
      
  suggested_iterations:
    - prototype: grow-tower-v1
      version_bump: minor
      changes:
        - component: "pH control"
          current: "Manual with alerts"
          proposed: "Auto-dose peristaltic pump"
          reason: "Automation score +15 points potential"
      projected_improvement:
        metric: automation_score
        current: 65.0
        projected: 80.0
        
  decision_gate:
    threshold: 20.0
    max_improvement_potential: 35.0
    recommendation: iterate
    rationale: "grow-tower-v1 has 35-point improvement potential via pH automation, exceeds 20-point threshold"
```

## Integration Points

- **Triggers**: Simulation complete, weekly schedule, cost update, manual request
- **Notifies**: Design Agent (if iteration recommended), all agents (comparison update)
- **Updates**: specs/comparisons/, data/iterations/history.jsonl
