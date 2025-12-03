# MCP Integration Guide

This guide covers the Model Context Protocol (MCP) integrations used in the Autonomous Vertical Farming Digital Twin system.

## Overview

MCP enables Claude to interact directly with external tools like Blender and Unreal Engine. We use two primary MCP integrations:

1. **Blender-MCP** (ahujasid) - For 3D asset creation
2. **Flopperam Unreal-MCP** - For UE5 scene assembly and simulation

## Blender-MCP Setup

### Installation

```bash
# Clone the repository
git clone https://github.com/ahujasid/blender-mcp.git

# Install dependencies
cd blender-mcp
pip install -r requirements.txt

# Configure Blender addon
# Copy the addon folder to Blender's addons directory
```

### Configuration

Add to your Claude MCP config (`~/.config/claude/mcp.json`):

```json
{
  "servers": {
    "blender": {
      "command": "python",
      "args": ["/path/to/blender-mcp/server.py"],
      "env": {
        "BLENDER_PATH": "/path/to/blender"
      }
    }
  }
}
```

### Capabilities

| Capability | Description | Example |
|------------|-------------|---------|
| Execute Python | Run arbitrary Blender Python | `bpy.ops.mesh.primitive_cube_add()` |
| Natural Language | Create objects from descriptions | "Create a steel shelf 48x24 inches" |
| Rodin Integration | AI mesh generation | "Generate vertical tower from image" |
| PolyHaven | Fetch HDRIs, textures, models | "Apply water material from PolyHaven" |
| Sketchfab | Search and import models | "Import LED grow light fixture" |

### Example Commands

#### Parametric Modeling
```
Create a unistrut steel rack with the following specifications:
- 48 inches wide, 24 inches deep, 72 inches tall
- 5 shelves at 14 inch vertical spacing
- 1-5/8 inch channel profile
- Origin at bottom center
- Apply brushed steel material
```

#### Rodin AI Generation
```
Use Rodin to generate a vertical hydroponic tower:
- 5 feet tall, 6 inch diameter
- 36 planting sites in spiral pattern
- White PVC plastic material
- Visible drainage channels
Output as OBJ with PBR materials
```

#### Asset Library
```
From PolyHaven, fetch:
- Water material with caustics
- Greenhouse HDRI for lighting reference

From Sketchfab, search and import:
- "hydroponic grow light LED bar"
- Select result with highest polygon count under 50k
```

### Export Workflow

```python
# Standard export settings for UE5 compatibility
bpy.ops.export_scene.fbx(
    filepath="/path/to/exports/asset_name_v1.fbx",
    use_selection=True,
    apply_scale_options='FBX_SCALE_ALL',
    axis_forward='-Z',
    axis_up='Y',
    use_mesh_modifiers=True,
    mesh_smooth_type='FACE',
    use_tspace=True,
    embed_textures=False,
    path_mode='COPY'
)
```

## Flopperam Unreal-MCP Setup

### Installation

```bash
# Clone the Flopperam plugin
git clone https://github.com/flopperam/unreal-mcp.git

# Copy to UE5 Plugins folder
cp -r unreal-mcp/Plugin /path/to/UE5/Engine/Plugins/Marketplace/

# Enable in UE5 Editor: Edit > Plugins > Search "MCP"
```

### Configuration

Add to Claude MCP config:

```json
{
  "servers": {
    "unreal": {
      "command": "python",
      "args": ["/path/to/unreal-mcp/server.py"],
      "env": {
        "UE_PROJECT": "/path/to/project.uproject"
      }
    }
  }
}
```

### Capabilities

| Capability | Description | Example |
|------------|-------------|---------|
| Actor Placement | Position actors in world | Place asset at (0, 0, 100) |
| Blueprint Creation | Generate Blueprint logic | Create water flow simulation |
| Material Creation | Build UE5 materials | Water with caustics and refraction |
| Scene Organization | Manage World Outliner | Create folder hierarchy |
| Cesium Integration | Configure geolocation | Set lat/long for solar sim |

### Example Commands

#### Scene Assembly
```
Create the following folder structure in World Outliner:
- FarmingSystem
  - Structure
  - GrowingUnits
  - Irrigation
  - Automation

Import asset "grow-tower_frame_v1.fbx" and place at origin.
Parent all growing bins to the frame actor.
```

#### Blueprint Creation
```
Create a new Blueprint "BP_WaterCirculation" with:
- Niagara particle system component
- Float variable "FlowRate" (default 4.0)
- Custom event "StartFlow" that activates particles
- Custom event "StopFlow" that deactivates particles
- Timeline for particle color fade
```

#### Material Setup
```
Create material "M_NutrientWater" with:
- Translucent blend mode
- Base color: (0.2, 0.6, 0.3)
- Opacity: 0.7
- Refraction: 1.33
- Subsurface color for depth effect
```

#### Cesium Configuration
```
Configure CesiumGeoreference:
- Latitude: 40.7128
- Longitude: -74.0060
- Height: 10 meters

Enable CesiumSunSky with:
- Real-time sun position
- Time zone: America/New_York
- Enable atmospheric scattering
```

## Integration Workflow

### Asset Pipeline

```
1. DESIGN AGENT → Blender-MCP
   │
   ├── Create parametric geometry
   ├── Generate AI meshes via Rodin
   ├── Fetch materials from PolyHaven
   ├── UV unwrap all geometry
   └── Export FBX
   │
   ▼
2. FBX Files (assets/blender/exports/)
   │
   ▼
3. SIMULATION AGENT → Flopperam MCP
   │
   ├── Import via Datasmith
   ├── Organize scene hierarchy
   ├── Create UE5 materials
   ├── Build simulation Blueprints
   └── Configure Cesium geolocation
   │
   ▼
4. Digital Twin (UE5 Project)
```

### Error Handling

#### Blender-MCP Errors

| Error | Cause | Solution |
|-------|-------|----------|
| Connection refused | Server not running | Start blender-mcp server |
| Blender not found | Wrong path | Update BLENDER_PATH env |
| Rodin timeout | API slow/down | Retry or use fallback |
| Memory error | Model too complex | Reduce polygon count |

#### Flopperam Errors

| Error | Cause | Solution |
|-------|-------|----------|
| Project not loaded | UE5 not running | Launch UE5 with project |
| Actor not found | Wrong name/path | Verify actor exists |
| Blueprint compile fail | Invalid nodes | Review generated code |
| Cesium not configured | Plugin missing | Install Cesium plugin |

## Best Practices

### Blender-MCP

1. **Use descriptive prompts** - More detail = better results
2. **Specify units explicitly** - "48 inches" not "48"
3. **Request basic PBR only** - Complex shaders don't transfer
4. **Verify dimensions** - Check against specification
5. **Clean topology** - Request quads, avoid n-gons

### Flopperam MCP

1. **Import before assembling** - Assets must exist in project
2. **Use folders** - Organize World Outliner early
3. **Name consistently** - Follow naming conventions
4. **Test Blueprints** - Compile after generation
5. **Profile performance** - Check FPS after assembly

## Troubleshooting

### Connection Issues

```bash
# Test Blender-MCP connection
curl -X POST http://localhost:8080/health

# Test Flopperam connection
curl -X POST http://localhost:8081/health

# Check logs
tail -f ~/.config/claude/mcp.log
```

### Performance Issues

```python
# Blender: Check polygon count
print(sum(len(obj.data.polygons) for obj in bpy.data.objects if obj.type == 'MESH'))

# UE5: Check draw calls via console
stat scenerendering
```

### Common Fixes

1. **Restart MCP servers** after configuration changes
2. **Clear Blender cache** if assets appear corrupted
3. **Rebuild UE5 shaders** if materials look wrong
4. **Update plugins** if API calls fail
