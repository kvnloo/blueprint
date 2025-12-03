# Setup Guide

Complete installation and configuration guide for the Autonomous Vertical Farming Digital Twin system.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Software Installation](#software-installation)
- [MCP Configuration](#mcp-configuration)
- [Project Setup](#project-setup)
- [Verification](#verification)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Hardware Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| CPU | 8 cores | 16+ cores |
| RAM | 32 GB | 64 GB |
| GPU | RTX 3070 (8GB VRAM) | RTX 3080Ti+ (12GB+ VRAM) |
| Storage | 500 GB SSD | 1 TB NVMe |
| OS | Windows 10/11, Ubuntu 22.04+ | Ubuntu 24.04 |

### Software Prerequisites

- **Unreal Engine 5.3+** - Epic Games Launcher
- **Blender 4.0+** - blender.org
- **Python 3.11+** - python.org
- **Node.js 18+** - nodejs.org
- **Git** - git-scm.com
- **Claude API access** - anthropic.com

### Accounts Required

- [ ] Epic Games account (UE5)
- [ ] Anthropic account (Claude API)
- [ ] GitHub account (version control)
- [ ] Hyper3D account (Rodin API) - Optional

---

## Software Installation

### 1. Unreal Engine 5

```bash
# Install Epic Games Launcher
# Download from: unrealengine.com

# In Epic Games Launcher:
# 1. Go to Unreal Engine tab
# 2. Click "+" to add version
# 3. Select UE 5.3 or later
# 4. Install with these options:
#    - Editor symbols for debugging
#    - Starter Content
#    - Templates and Feature Packs
```

### 2. Cesium for Unreal

```bash
# In UE5 Editor:
# 1. Edit > Plugins
# 2. Search "Cesium for Unreal"
# 3. Enable plugin
# 4. Restart editor

# Or install from Marketplace:
# unrealengine.com/marketplace/cesium-for-unreal
```

### 3. Blender

```bash
# Ubuntu
sudo snap install blender --classic

# Or download from blender.org
wget https://download.blender.org/release/Blender4.0/blender-4.0.0-linux-x64.tar.xz
tar -xf blender-4.0.0-linux-x64.tar.xz
sudo mv blender-4.0.0-linux-x64 /opt/blender

# Add to PATH
echo 'export PATH="/opt/blender:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

### 4. Python Environment

```bash
# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install anthropic httpx pyyaml requests
pip install numpy pandas matplotlib  # For data analysis
pip install influxdb-client          # For time-series data
```

### 5. Node.js

```bash
# Using nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18

# Verify
node --version  # Should show v18.x.x
npm --version
```

---

## MCP Configuration

### Blender-MCP Setup

```bash
# Clone Blender-MCP
git clone https://github.com/ahujasid/blender-mcp.git
cd blender-mcp

# Install dependencies
pip install -r requirements.txt

# Configure Blender addon
# 1. Open Blender
# 2. Edit > Preferences > Add-ons
# 3. Install from file: blender-mcp/addon/blender_mcp.zip
# 4. Enable "Blender MCP"

# Start MCP server
python server.py --port 8765
```

### Blender-MCP Configuration File

Create `~/.config/blender-mcp/config.yaml`:

```yaml
server:
  host: "localhost"
  port: 8765

blender:
  path: "/opt/blender/blender"
  startup_file: null

integrations:
  rodin:
    enabled: true
    api_key: "${RODIN_API_KEY}"
  
  polyhaven:
    enabled: true
    cache_dir: "~/.cache/polyhaven"
  
  sketchfab:
    enabled: true
    api_key: "${SKETCHFAB_API_KEY}"

defaults:
  export_format: "fbx"
  scale: 0.01  # Blender to UE5 scale
  apply_transforms: true
```

### Flopperam UE5-MCP Setup

```bash
# Clone Flopperam
git clone https://github.com/flopperam/unreal-mcp.git
cd unreal-mcp

# Build the UE5 plugin
# Follow instructions in unreal-mcp/README.md

# Copy plugin to UE5 project
cp -r Plugins/UnrealMCP /path/to/your/project/Plugins/

# Enable in UE5
# Edit > Plugins > Search "Unreal MCP" > Enable
# Restart editor
```

### Flopperam Configuration

Create `Config/UnrealMCP.ini` in your UE5 project:

```ini
[UnrealMCP]
ServerPort=8766
EnableBlueprintGeneration=true
EnableActorSpawning=true
EnableMaterialCreation=true
LogLevel=Verbose

[Security]
AllowedClasses=StaticMeshActor,PointLight,SpotLight,Blueprint
MaxActorsPerRequest=100

[Defaults]
DefaultMaterial=/Game/Materials/M_Default
DefaultBlueprint=/Game/Blueprints/BP_Default
```

### Claude API Configuration

Set environment variables:

```bash
# Add to ~/.bashrc or ~/.zshrc
export ANTHROPIC_API_KEY="sk-ant-..."
export RODIN_API_KEY="your-rodin-key"
export SKETCHFAB_API_KEY="your-sketchfab-key"

source ~/.bashrc
```

---

## Project Setup

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/autonomous-vertical-farming.git
cd autonomous-vertical-farming
```

### 2. Create Directory Structure

```bash
# Run setup script
chmod +x scripts/setup.sh
./scripts/setup.sh

# Or manually:
mkdir -p knowledge/{prompts/{base,research,components},research/{papers,summaries}}
mkdir -p specs/{templates,prototypes,comparisons}
mkdir -p assets/{blender/{components,exports},unreal/{project,blueprints}}
mkdir -p data/{pricing,plants,iterations}
mkdir -p agents workflows scripts
```

### 3. Initialize UE5 Project

```bash
# Create new UE5 project
# 1. Open UE5 Editor
# 2. Games > Blank
# 3. Name: "VerticalFarmingTwin"
# 4. Location: autonomous-vertical-farming/assets/unreal/

# Enable required plugins:
# - Cesium for Unreal
# - Unreal MCP (after copying plugin)
# - Niagara
# - Water (for fluid simulation)
```

### 4. Configure Cesium

```cpp
// In your UE5 project, create CesiumGeoreference
// Set coordinates for your location

// Example: Chicago area
Latitude: 41.8781
Longitude: -87.6298
Height: 180.0  // meters above sea level
```

### 5. Initialize Data Files

```bash
# Create iteration history
echo '{"initialized": true, "date": "'$(date -Iseconds)'"}' > data/iterations/history.jsonl

# Create empty comparison file
echo '{"prototypes": [], "last_updated": null}' > specs/comparisons/prototype-comparison.json

# Create pricing templates
cat > data/pricing/materials.json << 'EOF'
{
  "pvc_pipe_4in": {"unit": "ft", "sources": {}},
  "unistrut": {"unit": "ft", "sources": {}},
  "led_strip": {"unit": "ft", "sources": {}}
}
EOF
```

---

## Verification

### Test Blender-MCP

```bash
# Start Blender-MCP server
cd blender-mcp
python server.py &

# Test connection
curl http://localhost:8765/health

# Expected: {"status": "ok", "blender_connected": true}
```

### Test UE5-MCP

```bash
# With UE5 project open:
# 1. Window > Unreal MCP > Start Server

# Test connection
curl http://localhost:8766/health

# Expected: {"status": "ok", "editor_connected": true}
```

### Test Claude API

```python
# test_claude.py
from anthropic import Anthropic

client = Anthropic()
message = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=100,
    messages=[{"role": "user", "content": "Say 'vertical farming test successful'"}]
)
print(message.content[0].text)
```

### Full Integration Test

```bash
# Run integration test script
python scripts/integration_test.py

# Should output:
# ✓ Blender-MCP connection
# ✓ UE5-MCP connection
# ✓ Claude API connection
# ✓ File system access
# ✓ All systems operational
```

---

## Troubleshooting

### Blender-MCP Issues

**Problem**: Blender not connecting
```bash
# Check if Blender is running
pgrep -x blender

# Check addon is enabled
blender --python-expr "import bpy; print(bpy.context.preferences.addons.get('blender_mcp'))"

# Restart with debug
python server.py --debug --port 8765
```

**Problem**: Rodin API errors
```bash
# Verify API key
curl -H "Authorization: Bearer $RODIN_API_KEY" \
     https://api.hyper3d.ai/v1/status

# Check quota
curl -H "Authorization: Bearer $RODIN_API_KEY" \
     https://api.hyper3d.ai/v1/quota
```

### UE5-MCP Issues

**Problem**: Plugin not loading
```
# Check plugin is in correct location
ls -la /path/to/project/Plugins/UnrealMCP/

# Rebuild project
# In UE5: File > Refresh Visual Studio Project
# Build from VS or command line
```

**Problem**: Server not starting
```
# Check port availability
netstat -tulpn | grep 8766

# Kill existing process
kill $(lsof -t -i:8766)

# Restart from UE5
```

### Claude API Issues

**Problem**: Rate limiting
```python
# Implement exponential backoff
import time
from anthropic import RateLimitError

def call_claude_with_retry(prompt, max_retries=3):
    for attempt in range(max_retries):
        try:
            return client.messages.create(...)
        except RateLimitError:
            wait = 2 ** attempt
            print(f"Rate limited, waiting {wait}s...")
            time.sleep(wait)
    raise Exception("Max retries exceeded")
```

### Performance Issues

**Problem**: UE5 running slowly
```
# Reduce quality settings for development
# Project Settings > Engine > Rendering
# - Set Scalability to Medium
# - Disable Ray Tracing
# - Reduce Shadow Quality

# For simulation only (no visual):
# Use -game -benchmark command line
```

**Problem**: Blender out of memory
```bash
# Check available memory
free -h

# Increase swap
sudo fallocate -l 16G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Reduce viewport complexity in Blender
# View > Viewport Render > Material Preview (not Rendered)
```

---

## Next Steps

After setup is complete:

1. **Read the documentation**:
   - [Architecture](ARCHITECTURE.md)
   - [Agents](AGENTS.md)
   - [Workflows](WORKFLOWS.md)

2. **Create your first prototype**:
   - Follow [New Prototype Workflow](WORKFLOWS.md#new-prototype-workflow)

3. **Join the community**:
   - GitHub Discussions
   - Discord server (coming soon)

---

## Support

- **GitHub Issues**: For bugs and feature requests
- **Documentation**: This docs folder
- **Community**: r/verticalfarming, r/hydro
