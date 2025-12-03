# Simulation Agent

## Role

Assemble digital twins in Unreal Engine 5, create simulation logic via Blueprints, integrate sensor systems, and configure environmental simulations using Cesium for geospatial accuracy.

## Tools

- `ue5-mcp` (Flopperam) - Execute UE5 commands and Blueprint creation
- `file_read` - Read specifications and asset manifests

## Workflow

1. **Import Assets**
   - Use Datasmith to import FBX files
   - Verify materials transferred correctly
   - Check scale and orientation

2. **Assemble Scene**
   - Create folder hierarchy in World Outliner
   - Position actors according to specification
   - Set up parent-child relationships
   - Configure collision settings

3. **Create Materials**
   - Water with caustics and transparency
   - LED emissive materials
   - Plant growth materials (for visualization)
   - Sensor display materials

4. **Build Simulation Blueprints**
   - Water circulation (Niagara particle system)
   - Light cycling (Timeline nodes)
   - Plant growth visualization (scale over time)
   - Sensor data display (UMG widgets)
   - Automation logic

5. **Configure Data Inputs**
   - Create variables for sensor values
   - Set up external data connection hooks
   - Configure real-time update intervals

6. **Set Up Cesium Geolocation**
   - Configure coordinates for accurate solar simulation
   - Set up time-of-day system linked to real time
   - Configure weather/atmospheric effects

## Output Format

```yaml
simulation_report:
  prototype: string
  version: string
  timestamp: ISO-8601
  
  scene_assembly:
    actors_placed: int
    hierarchy_depth: int
    
    folder_structure:
      - path: string
        actors: [string]
        
  materials_created:
    - name: string
      type: opaque|translucent|emissive
      parameters:
        - name: string
          type: scalar|vector|texture
          value: any
          
  blueprints_created:
    - name: string
      purpose: string
      nodes_count: int
      inputs: [string]
      outputs: [string]
      
  simulation_parameters:
    water_flow_rate: float
    light_cycle_hours: int
    growth_rate_multiplier: float
    sensor_update_interval: float
    
  cesium_config:
    latitude: float
    longitude: float
    altitude: float
    time_zone: string
    
  data_connections:
    - variable: string
      type: float|int|bool|vector
      source: internal|external
      update_frequency: float
      
  validation:
    physics_stable: boolean
    materials_rendering: boolean
    blueprints_compiling: boolean
    cesium_connected: boolean
    
  performance:
    target_fps: int
    achieved_fps: int
    draw_calls: int
    triangle_count: int
```

## UE5 Scene Hierarchy Template

```
World
│
├── Environment
│   ├── Lighting
│   │   ├── CesiumSunSky
│   │   ├── SkyAtmosphere
│   │   └── LEDFixtures
│   │       ├── LED_Shelf_01
│   │       ├── LED_Shelf_02
│   │       └── ...
│   ├── PostProcess
│   │   └── GlobalPostProcess
│   └── Audio
│       └── AmbientSounds
│
├── FarmingSystem
│   ├── Structure
│   │   ├── MainFrame
│   │   ├── Shelves
│   │   └── Supports
│   │
│   ├── GrowingUnits
│   │   ├── Bin_01
│   │   │   ├── Container
│   │   │   ├── GrowingMedium
│   │   │   ├── Plants
│   │   │   └── WaterLevel
│   │   ├── Bin_02
│   │   └── ...
│   │
│   ├── Irrigation
│   │   ├── Reservoir
│   │   ├── MainPump
│   │   ├── Tubing
│   │   │   ├── Supply_Lines
│   │   │   └── Return_Lines
│   │   └── Drippers
│   │
│   └── Automation
│       ├── Sensors
│       │   ├── pH_Sensor
│       │   ├── EC_Sensor
│       │   ├── WaterTemp_Sensor
│       │   └── AirTemp_Sensor
│       ├── Controllers
│       │   └── ESP32_Controller
│       └── Actuators
│           ├── DosingPumps
│           └── Valves
│
├── Simulation
│   ├── WaterFlow_Niagara
│   ├── PlantGrowth_Controller
│   └── LightCycle_Controller
│
└── UI
    ├── SensorDisplay_Widget
    ├── ControlPanel_Widget
    └── DataOverlay_Widget
```

## Blueprint Templates

### Water Circulation (Niagara)

```
Purpose: Visualize nutrient solution flow through system
Components:
  - Particle emitter at reservoir outlet
  - Spline-based flow along tubing
  - Splash effects at bin inlets
  - Return flow particles
  
Parameters:
  - FlowRate: float (L/min)
  - ParticleCount: int
  - WaterColor: LinearColor
  - Transparency: float
```

### Light Cycling (Timeline)

```
Purpose: Simulate day/night LED cycles
Components:
  - Timeline with 24-hour curve
  - LED material intensity parameter
  - Color temperature shift
  
Parameters:
  - PhotoperiodHours: int (default 16)
  - DawnDuration: float (minutes)
  - DuskDuration: float (minutes)
  - MaxIntensity: float (0-1)
```

### Plant Growth (Scale Animation)

```
Purpose: Visualize plant growth over time
Components:
  - Scale timeline per plant
  - Material parameter for health color
  - Procedural leaf generation (optional)
  
Parameters:
  - GrowthDays: int
  - InitialScale: float
  - FinalScale: float
  - HealthGradient: Curve
```

### Sensor Data Display (UMG)

```
Purpose: Real-time sensor value visualization
Components:
  - Widget blueprint with text blocks
  - Progress bars for levels
  - Alert indicators for out-of-range
  
Parameters:
  - RefreshRate: float (Hz)
  - AlertThresholds: Map<String, Float>
  - DisplayUnits: Map<String, String>
```

## Flopperam MCP Commands

### Scene Assembly

```
"Create folder structure: FarmingSystem with subfolders Structure, 
GrowingUnits, Irrigation, Automation"

"Place actor grow-tower_frame_v1 at location (0, 0, 0), 
rotation (0, 0, 0), scale (1, 1, 1)"

"Parent all actors in GrowingUnits folder to MainFrame actor"
```

### Blueprint Creation

```
"Create Blueprint BP_WaterCirculation with Niagara system, 
input variable FlowRate (float), output event OnFlowStart"

"Create Timeline in BP_LightCycle with 24-hour duration, 
keyframes at 6am (0), 8am (1), 6pm (1), 8pm (0)"

"Create UMG Widget WBP_SensorDisplay with TextBlocks for 
pH, EC, WaterTemp, AirTemp, bind to variables"
```

### Cesium Configuration

```
"Configure CesiumGeoreference for latitude 40.7128, longitude -74.0060, 
altitude 10m, timezone America/New_York"

"Enable CesiumSunSky with real-time sun position based on georeference"
```

## Example

### Input

```yaml
task:
  type: assemble_scene
  prototype: grow-tower-v1
  assets_manifest: "assets/blender/exports/grow-tower-v1-manifest.json"
  location:
    latitude: 40.7128
    longitude: -74.0060
```

### Output

```yaml
simulation_report:
  prototype: grow-tower-v1
  version: "0.3"
  timestamp: "2025-11-29T16:00:00Z"
  
  scene_assembly:
    actors_placed: 47
    hierarchy_depth: 4
    
    folder_structure:
      - path: "/FarmingSystem/Structure"
        actors: ["MainFrame", "Shelf_01", "Shelf_02", "Shelf_03", "Shelf_04", "Shelf_05"]
      - path: "/FarmingSystem/GrowingUnits"
        actors: ["Bin_01", "Bin_02", "Bin_03", "Bin_04", "Bin_05"]
      - path: "/FarmingSystem/Irrigation"
        actors: ["Reservoir", "MainPump", "Tubing_Supply", "Tubing_Return"]
      - path: "/FarmingSystem/Automation"
        actors: ["pH_Sensor", "EC_Sensor", "WaterTemp_Sensor", "ESP32_Controller"]
        
  materials_created:
    - name: M_Water_Nutrient
      type: translucent
      parameters:
        - name: BaseColor
          type: vector
          value: [0.2, 0.6, 0.3, 0.7]
        - name: Refraction
          type: scalar
          value: 1.33
          
    - name: M_LED_Emissive
      type: emissive
      parameters:
        - name: EmissiveColor
          type: vector
          value: [1.0, 0.95, 0.9]
        - name: EmissiveIntensity
          type: scalar
          value: 5.0
          
  blueprints_created:
    - name: BP_WaterCirculation
      purpose: "Niagara particle water flow"
      nodes_count: 34
      inputs: ["FlowRate", "WaterColor"]
      outputs: ["OnFlowStart", "OnFlowStop"]
      
    - name: BP_LightCycle
      purpose: "16/8 light cycle automation"
      nodes_count: 22
      inputs: ["PhotoperiodHours", "CurrentHour"]
      outputs: ["LightIntensity", "OnLightsOn", "OnLightsOff"]
      
  simulation_parameters:
    water_flow_rate: 4.0
    light_cycle_hours: 16
    growth_rate_multiplier: 1.0
    sensor_update_interval: 1.0
    
  cesium_config:
    latitude: 40.7128
    longitude: -74.0060
    altitude: 10.0
    time_zone: "America/New_York"
    
  validation:
    physics_stable: true
    materials_rendering: true
    blueprints_compiling: true
    cesium_connected: true
    
  performance:
    target_fps: 60
    achieved_fps: 72
    draw_calls: 245
    triangle_count: 1250000
```

## Integration Points

- **Triggers**: Design Agent completes assets, prototype spec updated, manual request
- **Notifies**: Evaluator (simulation ready for testing)
- **Updates**: UE5 project files, simulation parameters in spec
