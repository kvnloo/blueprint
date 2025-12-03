# AIO Health Tracker Architecture

Architecture documentation for the Blueprint health tracker system - an open source implementation of Bryan Johnson's Blueprint protocol.

## Overview

The AIO (All-In-One) Health Tracker provides a comprehensive health monitoring platform with four core modules working together as an integrated system.

## Systems-Thinking Design

```
┌─────────────────────────────────────────────────────────────┐
│                   AIO Health Tracker                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐    ┌──────────────┐                       │
│  │    Labs      │    │  Nutrition   │                       │
│  │   Ingestor   │◄──►│   Tracker    │                       │
│  └──────────────┘    └──────────────┘                       │
│         │                   │                                │
│         ▼                   ▼                                │
│  ┌──────────────────────────────────────┐                   │
│  │         Analysis Engine              │                   │
│  │  (Correlations, Insights, Trends)    │                   │
│  └──────────────────────────────────────┘                   │
│         ▲                   ▲                                │
│         │                   │                                │
│  ┌──────────────┐    ┌──────────────┐                       │
│  │   Fitness    │◄──►│    Sleep     │                       │
│  │   Tracker    │    │   Monitor    │                       │
│  └──────────────┘    └──────────────┘                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Core Modules

### Labs Ingestor
- Import bloodwork results
- Parse biomarker data
- Track lab trends over time
- Support multiple lab providers

**Data Types:**
- Blood panels (CBC, CMP, lipids)
- Hormone levels
- Vitamin/mineral levels
- Inflammatory markers

### Nutrition Tracker
- Meal logging and photography
- Macro/micronutrient tracking
- Recipe analysis
- Supplement tracking

**Features:**
- Food database integration
- Barcode scanning
- Custom food entries
- Nutritional goal setting

### Fitness Tracker
- Exercise logging
- Workout tracking
- Activity monitoring
- Performance metrics

**Supported Activities:**
- Strength training
- Cardiovascular exercise
- Mobility/flexibility
- Recovery activities

### Sleep Monitor
- Sleep quality tracking
- Duration monitoring
- HRV integration
- Sleep stage analysis

**Integrations:**
- Wearable devices (Oura, Whoop, Apple Watch)
- Smart mattress data
- Manual logging

## Integration with World Sim

The Health Tracker connects to the World Simulation pipeline:

```
Health Tracker                    World Sim
     │                                │
     ▼                                ▼
Nutrition needs  ──────────►  Seed selection
     │                                │
     └────────────────────────────────┘
                    │
                    ▼
            Autonomous Farm
                    │
                    ▼
              Robot Chef
```

The tracker's nutritional analysis informs the World Sim's vertical farm about which crops to prioritize based on the user's health needs.

## Contents

- `MODULES.md` - Detailed module specifications
- `DATA_MODELS.md` - Data schemas and relationships
- `INTEGRATIONS.md` - External service connections
- `API.md` - API endpoints and interfaces

---
[← Back to Architecture](../README.md)
