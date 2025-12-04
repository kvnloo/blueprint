import { Article } from '../researchData';

export const homeGrownRevolution: Article = {
  id: 'home-grown-revolution',
  title: 'The Home-Grown Revolution',
  category: 'agriculture',
  track: 'World Sim',
  type: 'Deep Dive',
  readTime: '30 min',
  wordCount: 7531,
  description: 'What if the freshest, most nutritious salad you\'ve ever tasted was growing three feet from where you\'re sitting right now? Learn how to replicate NASA\'s space agriculture research for less than the cost of a nice dinner out.',
  content: [
    {
      type: 'quote',
      text: 'The future belongs to those who understand that doing more with less is compassionate, prosperous, and enduring.',
      author: 'Paul Hawken'
    },
    {
      type: 'text',
      text: 'What if the freshest, most nutritious salad you\'ve ever tasted was growing three feet from where you\'re sitting right now? What if you could replicate the same technologies NASA uses to grow food on the International Space Station-for less than the cost of a nice dinner out?'
    },
    {
      type: 'text',
      text: 'This isn\'t about becoming a farmer. It\'s about solving a puzzle: how do we take billion-dollar space agriculture research and distill it into something anyone can build on a Saturday afternoon?'
    },
    {
      type: 'header',
      text: 'The Knowledge Architecture'
    },
    {
      type: 'text',
      text: 'This document follows a problem-solving journey. We start with why (the nutrition gap most people don\'t know exists), move to how (the science NASA pioneered), and end with what (exact builds at three budget levels).'
    },
    {
      type: 'code',
      language: 'diagram',
      code: `THE HOME-GROWN REVOLUTION
Knowledge Map
═══════════════════════════════════════════════════════════════════════════

                         ┌────────────────────────────────────────┐
                         │  PART I: THE PROBLEM                   │
                         │  Why Store-Bought Isn\'t What You Think │
                         └────────────────────┬───────────────────┘
                                              │
              ┌───────────────────────────────┼───────────────────────────────┐
              │                               │                               │
              ▼                               ▼                               ▼
    ┌─────────────────┐            ┌─────────────────┐            ┌─────────────────┐
    │  The Nutrient   │            │  The Time       │            │  The Taste      │
    │  Degradation    │            │  Problem        │            │  You\'re         │
    │  Curve          │            │                 │            │  Missing        │
    │                 │            │  Farm → Store   │            │                 │
    │  Vitamins lost  │            │  = 5-14 days    │            │  Peak ripeness  │
    │  every hour     │            │  on average     │            │  never shipped  │
    └─────────────────┘            └─────────────────┘            └─────────────────┘
                                              │
                         ┌────────────────────┴───────────────────┐
                         │  PART II: THE SCIENCE                  │
                         │  What NASA Figured Out                 │
                         └────────────────────┬───────────────────┘
                                              │
              ┌───────────────────────────────┼───────────────────────────────┐
              │                               │                               │
              ▼                               ▼                               ▼
    ┌─────────────────┐            ┌─────────────────┐            ┌─────────────────┐
    │  LED Spectrum   │            │  Water &        │            │  Environment    │
    │  Optimization   │            │  Nutrient       │            │  Control        │
    │                 │            │  Delivery       │            │                 │
    │  Red + Blue +   │            │  NFT, DWC,      │            │  Temp, humidity │
    │  Far-Red        │            │  Aeroponics     │            │  CO₂, airflow   │
    └─────────────────┘            └─────────────────┘            └─────────────────┘
                                              │
                         ┌────────────────────┴───────────────────┐
                         │  PART III: THE BUILDS                  │
                         │  Three Budget Tiers                    │
                         └────────────────────┬───────────────────┘
                                              │
              ┌───────────────────────────────┼───────────────────────────────┐
              │                               │                               │
              ▼                               ▼                               ▼
    ┌─────────────────┐            ┌─────────────────┐            ┌─────────────────┐
    │  TIER 1: $50-   │            │  TIER 2: $150-  │            │  TIER 3: $400-  │
    │  $100           │            │  $300           │            │  $800           │
    │                 │            │                 │            │                 │
    │  Kratky method  │            │  Tower garden   │            │  Full CEA       │
    │  Basic LED      │            │  Quality LED    │            │  Automated      │
    │  Manual care    │            │  Semi-auto      │            │  Sensors        │
    └─────────────────┘            └─────────────────┘            └─────────────────┘
                                              │
                         ┌────────────────────┴───────────────────┐
                         │  PART IV: OPTIMIZATION                 │
                         │  Continuous Improvement Loop           │
                         └────────────────────────────────────────┘`
    },
    {
      type: 'header',
      text: 'Part I: The Problem You Didn\'t Know You Had'
    },
    {
      type: 'subheader',
      text: '1.1 The Nutrient Degradation Curve'
    },
    {
      type: 'text',
      text: 'Here\'s something that will change how you look at your refrigerator: produce starts dying the moment it\'s harvested. Not metaphorically-biochemically. Every hour after harvest, vitamins degrade, antioxidants oxidize, and the complex orchestra of phytonutrients that makes plants healthy starts going silent.'
    },
    {
      type: 'diagram',
      diagramType: 'timeline',
      data: {
        title: 'Vitamin C Degradation Timeline',
        description: 'Nutrient loss from harvest to consumption (refrigerated storage at 4°C)',
        events: [
          {
            date: 'Day 0',
            title: 'Harvest',
            description: '100% vitamin C content - Peak nutrition',
            icon: 'leaf',
            status: 'success'
          },
          {
            date: 'Day 1-2',
            title: 'Store Transit',
            description: '90% remaining - Transport to distribution center',
            icon: 'droplets',
            status: 'success'
          },
          {
            date: 'Day 3-4',
            title: 'Distribution',
            description: '70% remaining - Warehouse to store shelf',
            icon: 'home',
            status: 'warning'
          },
          {
            date: 'Day 5-6',
            title: 'Your Fridge',
            description: '40% remaining - Waiting to be eaten',
            icon: 'clock',
            status: 'warning'
          },
          {
            date: 'Day 7',
            title: 'Your Plate',
            description: '23% remaining (77% lost) - What you actually consume',
            icon: 'target',
            status: 'danger'
          }
        ],
        footer: 'Data: Green beans at 4°C lose 77% vitamin C in 7 days | Broccoli at 20°C loses 56% in 7 days | Spinach loses ~50% folate in 8 days'
      }
    },
    {
      type: 'text',
      text: 'The numbers are stark. Research from the University of California, Davis shows that vitamin C losses in vegetables stored at refrigerator temperatures for just one week range from 15% in green peas to a staggering 77% in green beans. Temperature matters enormously-broccoli stored at 20°C (room temperature) loses 56% of its vitamin C in a week, while the same broccoli at 0°C loses almost nothing.'
    },
    {
      type: 'text',
      text: 'But here\'s the catch: you\'re not getting produce at Day 0. The supply chain looks like this:'
    },
    {
      type: 'code',
      language: 'diagram',
      code: `THE JOURNEY FROM FARM TO YOUR FORK
═══════════════════════════════════════════════════════════════════════════

                              TOTAL: 5-21 DAYS
         ◄────────────────────────────────────────────────────────►

    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
    │          │    │          │    │          │    │          │    │          │
    │  HARVEST │───►│ TRANSIT  │───►│ DISTRIB. │───►│  STORE   │───►│   YOU    │
    │          │    │          │    │  CENTER  │    │  SHELF   │    │          │
    │  Day 0   │    │ 1-5 days │    │ 1-3 days │    │ 1-3 days │    │ 1-7 days │
    │          │    │          │    │          │    │          │    │          │
    └──────────┘    └──────────┘    └──────────┘    └──────────┘    └──────────┘

    INTERNATIONAL PRODUCE (Southern hemisphere, winter imports):

    ┌──────────┐    ┌──────────────────────┐    ┌──────────────────────────────┐
    │          │    │                      │    │                              │
    │  HARVEST │───►│   SHIP (2-4 weeks)   │───►│   Same distribution chain   │
    │          │    │   or AIR (1-3 days)  │    │                              │
    │          │    │                      │    │                              │
    └──────────┘    └──────────────────────┘    └──────────────────────────────┘

    By the time you eat that "fresh" salad, it might be 2-3 weeks old.`
    },
    {
      type: 'text',
      text: 'The Produce for Better Health Foundation notes that fruits and vegetables continue to respire after harvest, breaking down stored organic materials including carbohydrates, proteins, and fats. This leads to degradation of texture, flavor, and critically-nutrients. The research is clear: food grown locally and consumed quickly is demonstrably more nutritious than food that travels long distances.'
    },
    {
      type: 'subheader',
      text: '1.2 The Taste Dimension'
    },
    {
      type: 'text',
      text: 'But nutrition isn\'t the only casualty. Flavor compounds are even more volatile than vitamins.'
    },
    {
      type: 'text',
      text: 'The tomatoes you buy at the supermarket are picked green-weeks before they\'re ripe-because ripe tomatoes don\'t survive shipping. They\'re then treated with ethylene gas to trigger color change. The result? A tomato that looks red but never developed the complex sugars, acids, and volatile aromatics that make a vine-ripened tomato taste like summer.'
    },
    {
      type: 'code',
      language: 'diagram',
      code: `THE RIPENESS-SHIPPING TRADEOFF
═══════════════════════════════════════════════════════════════════════════

                        FLAVOR/NUTRITION
                              ▲
                              │
                    PERFECT   │               ★ VINE-RIPENED
                              │              ╱   (Home-grown)
                              │             ╱
                              │            ╱
                              │           ╱
                              │          ╱
                              │         ╱
                              │        ╱    ← This gap is what
                              │       ╱       you\'re missing
                              │      ╱
                              │     ╱
                              │    ╱
                    POOR      │   ★ COMMERCIALLY PICKED
                              │   (Harvested green, gassed)
                              │
                              └─────────────────────────────────────► TIME
                                      │                         │
                                   PICKED                    RIPE
                                   (Commercial)          (When you\'d pick it
                                                          from your garden)

    WHAT'S LOST:
    ────────────
    • Complex sugars (develop in final ripening)
    • Volatile aromatics (responsible for "fresh" smell)
    • Peak vitamin content (many vitamins increase during ripening)
    • Optimal texture (cell walls soften naturally vs. artificially)`
    },
    {
      type: 'text',
      text: 'There\'s a reason your grandmother\'s garden tomatoes tasted better than anything you can buy. It wasn\'t just nostalgia-it was biochemistry.'
    },
    {
      type: 'subheader',
      text: '1.3 The Solution Space'
    },
    {
      type: 'text',
      text: 'This isn\'t just a problem to understand-it\'s a puzzle to solve. And the solution has three components:'
    },
    {
      type: 'code',
      language: 'diagram',
      code: `THE HOME-GROWING ADVANTAGE
═══════════════════════════════════════════════════════════════════════════

    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                      │
    │   1. ZERO TRANSIT TIME                                              │
    │      ─────────────────                                              │
    │      Harvest at 6 PM. Eat at 6:01 PM.                               │
    │      Nutrient degradation: Effectively zero.                        │
    │                                                                      │
    │   2. PEAK RIPENESS HARVEST                                          │
    │      ─────────────────────                                          │
    │      Pick when the plant says it\'s ready, not when a shipping       │
    │      schedule demands it.                                           │
    │      Flavor and nutrition: Maximum possible.                        │
    │                                                                      │
    │   3. VARIETY SELECTION                                              │
    │      ─────────────────                                              │
    │      Commercial growers optimize for shipping durability.           │
    │      You can optimize for taste and nutrition.                      │
    │      Heirloom varieties, unusual cultivars, whatever you want.      │
    │                                                                      │
    └─────────────────────────────────────────────────────────────────────┘

    THE QUESTION ISN'T "SHOULD I GROW MY OWN?"

    THE QUESTION IS "HOW CAN I DO IT MOST EFFECTIVELY?"`
    },
    {
      type: 'text',
      text: 'This is where the puzzle gets interesting. Because the same space agencies that put humans in orbit have spent decades solving this exact problem-how to grow maximum nutrition in minimum space with maximum efficiency.'
    },
    {
      type: 'header',
      text: 'Part II: What NASA Figured Out'
    },
    {
      type: 'subheader',
      text: '2.1 The Space Agriculture Challenge'
    },
    {
      type: 'text',
      text: 'NASA\'s challenge is the ultimate constraint satisfaction problem: grow food for astronauts using the least possible mass, power, water, and crew time-while maximizing nutrition, safety, and yield. Every gram matters when it costs $10,000 to launch into orbit.'
    },
    {
      type: 'text',
      text: 'The result? Some of the most sophisticated and efficient plant-growing technology ever developed.'
    },
    {
      type: 'diagram',
      diagramType: 'floorplan',
      data: {
        title: 'NASA\'s Space Crop Production Systems',
        rooms: [
          {
            name: 'VEGGIE System',
            description: 'Collapsible garden (2014-Present)',
            width: 100,
            height: 80,
            x: 0,
            y: 0,
            icon: 'leaf',
            features: [
              { name: 'LED Array', description: 'Red, blue, green spectrum', icon: 'lightbulb' },
              { name: 'Plant Pillows', description: '6 plants per unit', icon: 'leaf' },
              { name: 'Wicking System', description: 'Passive water delivery', icon: 'droplets' },
              { name: 'Substrate', description: 'Arcillite clay + fertilizer', icon: 'layers' }
            ],
            metrics: [
              { label: 'Size', value: 'Carry-on', icon: 'home' },
              { label: 'Power', value: 'Low LED', icon: 'zap' },
              { label: 'Crew Time', value: 'Minimal', icon: 'clock' }
            ]
          },
          {
            name: 'Advanced Plant Habitat (APH)',
            description: 'Fully automated chamber (2017-Present)',
            width: 100,
            height: 120,
            x: 0,
            y: 90,
            icon: 'layers',
            features: [
              { name: 'Multi-Spectrum LEDs', description: 'Up to 1000 μmol intensity', icon: 'sun' },
              { name: '180+ Sensors', description: 'Real-time monitoring', icon: 'target' },
              { name: 'PHARMER Control', description: 'Data every 5 seconds', icon: 'brain' },
              { name: 'Remote Command', description: 'Controlled from Earth', icon: 'zap' }
            ],
            metrics: [
              { label: 'Temp Zones', value: 'Air+Root', icon: 'sun' },
              { label: 'Humidity', value: 'Chamber+Root', icon: 'droplets' },
              { label: 'Telemetry', value: 'Real-time', icon: 'target' }
            ],
            crops: ['Arabidopsis', 'Dwarf wheat', 'Radishes', 'Lettuce', 'Hatch Chile peppers']
          }
        ]
      }
    },
    {
      type: 'text',
      text: 'NASA\'s research produced several key insights that we can apply directly to home growing.'
    },
    {
      type: 'subheader',
      text: '2.2 LED Spectrum Science'
    },
    {
      type: 'text',
      text: 'One of NASA\'s most significant contributions was proving that LEDs could replace sunlight for plant growth-and in fact, could be optimized beyond what sunlight offers.'
    },
    {
      type: 'code',
      language: 'diagram',
      code: `THE SPECTRUM OF PLANT LIGHT
═══════════════════════════════════════════════════════════════════════════

WHAT PLANTS ACTUALLY USE (Photosynthetically Active Radiation):

    UV     BLUE      GREEN      YELLOW    RED       FAR-RED    INFRARED
    │      │         │          │         │         │          │
    ▼      ▼         ▼          ▼         ▼         ▼          ▼

         ┌───────────────────────────────────────────────────────────┐
         │                                                           │
         │              CHLOROPHYLL A ABSORPTION                     │
    100% │        ┌──┐                              ┌────┐          │
         │       ┌┘  └┐                            ┌┘    └┐         │
     80% │      ┌┘    │                           ┌┘      └┐        │
         │     ┌┘     └┐                         ┌┘        └┐       │
     60% │    ┌┘       │                        ┌┘          │       │
         │   ┌┘        └┐                      ┌┘           └┐      │
     40% │  ┌┘          └┐                    ┌┘             └┐     │
         │ ┌┘            └┐                  ┌┘               │     │
     20% │┌┘              └──────────────────┘                └┐    │
         │                                                      └───│
         └───────────────────────────────────────────────────────────┘
           400    450    500    550    600    650    700    750  nm
                  │                           │           │
                  ▼                           ▼           ▼
              BLUE PEAK                   RED PEAK    FAR-RED
              (430-450nm)                 (640-680nm) (700-750nm)`
    },
    {
      type: 'text',
      text: 'Research from 2024 at controlled-environment vertical farms showed that supplementing white LEDs with deep red (660nm) and far-red (730nm) dramatically improved yields. In lettuce, the high-PPFD treatment with supplemental red increased fresh weight by 76%. In basil, the same treatment increased fresh weight by 79%.'
    },
    {
      type: 'subheader',
      text: '2.3 Water and Nutrient Delivery Systems'
    },
    {
      type: 'text',
      text: 'NASA tested multiple hydroponic approaches. The Kratky method is essentially what NASA would design if they had no power budget at all. It\'s dead simple: a passive deep water culture system with no pumps, no timers, and no moving parts.'
    },
    {
      type: 'diagram',
      diagramType: 'process',
      data: {
        title: 'The Kratky Method Setup',
        description: 'Passive hydroponic system with no pumps or timers',
        steps: [
          {
            number: 1,
            title: 'Prepare Container',
            description: 'Use any food-safe, opaque container (5-gallon bucket ideal)',
            icon: 'home',
            details: ['Light-proof to prevent algae', 'Food-grade materials only', 'Sturdy lid required']
          },
          {
            number: 2,
            title: 'Cut Lid Holes',
            description: 'Create holes sized for net cups',
            icon: 'target',
            details: ['2-3 inch net cup size', 'Space evenly on lid', 'Use styrofoam, plastic, or wood lid']
          },
          {
            number: 3,
            title: 'Add Nutrient Solution',
            description: 'Fill container with nutrient-rich water',
            icon: 'droplets',
            details: ['Start with high water level', 'pH 5.5-6.5 optimal', 'Masterblend formula works well']
          },
          {
            number: 4,
            title: 'Insert Net Cups',
            description: 'Place plants in net cups with growing medium',
            icon: 'leaf',
            details: ['Use hydroton clay pebbles', 'Roots touch solution initially', 'Support seedlings in rockwool']
          },
          {
            number: 5,
            title: 'Air Gap Forms Naturally',
            description: 'As plants drink, water level drops creating air space',
            icon: 'wind',
            details: ['Roots follow water down', 'Air gap provides oxygen', 'Upper roots stay dry for aeration']
          },
          {
            number: 6,
            title: 'Maintain & Harvest',
            description: 'Monitor until harvest, no refilling needed',
            icon: 'check',
            details: ['No pumps required', 'No electricity needed', 'Harvest at peak ripeness']
          }
        ]
      }
    },
    {
      type: 'header',
      text: 'Part III: The Builds'
    },
    {
      type: 'text',
      text: 'Now we get to the fun part: actually building these systems. I\'ll walk through three tiers, from ultra-minimal to fully automated.'
    },
    {
      type: 'subheader',
      text: '3.1 Tier 1: The $50-100 Starter System'
    },
    {
      type: 'text',
      text: 'This is what I\'d recommend for someone who\'s never grown anything hydroponically. It\'s forgiving, cheap, and teaches you the fundamentals before you invest more.'
    },
    {
      type: 'diagram',
      diagramType: 'metrics',
      data: {
        title: 'Tier 1 Budget Breakdown',
        description: 'Kratky Windowsill Garden - Complete starter system',
        metrics: [
          { label: 'Containers', value: '15', unit: '$', icon: 'home', subtitle: '5-gal buckets (x3)' },
          { label: 'Net Cups', value: '8', unit: '$', icon: 'target', subtitle: '25-pack, 3 inch' },
          { label: 'Clay Pebbles', value: '12', unit: '$', icon: 'layers', subtitle: '2L hydroton' },
          { label: 'Rockwool', value: '8', unit: '$', icon: 'leaf', subtitle: '50 starter cubes' },
          { label: 'Nutrients', value: '25', unit: '$', icon: 'droplets', subtitle: 'Masterblend kit' },
          { label: 'pH Testing', value: '22', unit: '$', icon: 'target', subtitle: 'Meter + Up/Down' },
          { label: 'Basic Light', value: '10', unit: '$', icon: 'lightbulb', subtitle: 'LED desk lamp' },
          { label: 'Total (Basic)', value: '100', unit: '$', icon: 'star', subtitle: 'Complete system' }
        ]
      }
    },
    {
      type: 'diagram',
      diagramType: 'checklist',
      data: {
        title: 'Tier 1 Shopping Checklist',
        description: 'Everything you need for your first hydroponic garden',
        items: [
          {
            text: 'Containers (x3)',
            details: '5-gallon buckets with lids (Home Depot $15) OR 2-gallon containers (Dollar store $9)',
            icon: 'home'
          },
          {
            text: 'Net cups (25-pack)',
            details: '3 inch diameter, Amazon $8',
            icon: 'target'
          },
          {
            text: 'Hydroton clay pebbles',
            details: '2L bag, Amazon $12',
            icon: 'layers'
          },
          {
            text: 'Rockwool starter cubes',
            details: '50-pack, Amazon $8',
            icon: 'leaf'
          },
          {
            text: 'Masterblend 4-18-38',
            details: '1 lb bag, Amazon $10',
            icon: 'droplets'
          },
          {
            text: 'Calcium Nitrate',
            details: '1 lb bag, Amazon $10',
            icon: 'droplets'
          },
          {
            text: 'Epsom Salt',
            details: '2 lb, any store $5',
            icon: 'droplets'
          },
          {
            text: 'pH meter (basic)',
            details: 'Digital meter, Amazon $12',
            icon: 'target'
          },
          {
            text: 'pH Up/Down kit',
            details: 'Solution bottles, Amazon $10',
            icon: 'target'
          },
          {
            text: 'Light source',
            details: 'Option A: Sunny window + LED bulb ($5-15) | Option B: Spider Farmer SF300 ($30-40)',
            icon: 'lightbulb'
          }
        ]
      }
    },
    {
      type: 'subheader',
      text: '3.2 Tier 2: The $150-300 Tower Garden'
    },
    {
      type: 'text',
      text: 'This is where things get interesting. Commercial tower gardens (like the Tower Garden brand) cost $500-1,000+. We\'re going to build essentially the same thing for a fraction of the price.'
    },
    {
      type: 'text',
      text: 'What you get: 20-28 plant sites in ~2 square feet, automated watering (pump + timer), 10x space efficiency vs. soil gardening, and year-round production with LED lighting.'
    },
    {
      type: 'diagram',
      diagramType: 'floorplan',
      data: {
        title: 'Tower Garden System (Tier 2)',
        description: 'Vertical aeroponic tower with 20-28 plant sites',
        rooms: [
          {
            name: 'Reservoir Base',
            description: '5-gallon nutrient solution tank',
            width: 60,
            height: 40,
            x: 0,
            y: 160,
            icon: 'droplets',
            features: [
              { name: 'Water Pump', description: 'Circulates nutrient solution', icon: 'zap' },
              { name: 'Lid System', description: 'Supports tower structure', icon: 'layers' },
              { name: 'Reservoir', description: '5-gallon capacity', icon: 'droplets' }
            ]
          },
          {
            name: 'Vertical Tower',
            description: 'Stacked growing sections (5-6 ft tall)',
            width: 60,
            height: 120,
            x: 0,
            y: 40,
            icon: 'leaf',
            features: [
              { name: 'Plant Sites', description: '20-28 net cup holders at 45° angle', icon: 'leaf' },
              { name: 'Water Distribution', description: 'Solution cascades down tower', icon: 'droplets' },
              { name: 'Aeroponic Zone', description: 'Roots misted with nutrients', icon: 'wind' }
            ],
            metrics: [
              { label: 'Height', value: '5-6 ft', icon: 'arrow' },
              { label: 'Capacity', value: '20-28 plants', icon: 'leaf' },
              { label: 'Footprint', value: '~2 sq ft', icon: 'home' }
            ]
          },
          {
            name: 'Distribution Cap',
            description: 'Top water distribution system',
            width: 60,
            height: 30,
            x: 0,
            y: 10,
            icon: 'target',
            features: [
              { name: 'Spray Nozzles', description: 'Disperses solution evenly', icon: 'droplets' },
              { name: 'Flow Control', description: 'Regulates water distribution', icon: 'zap' }
            ]
          }
        ]
      }
    },
    {
      type: 'subheader',
      text: '3.3 Tier 3: The $400-800 Full CEA System'
    },
    {
      type: 'text',
      text: 'This is what we build when we want NASA-level control in a home setting. It\'s not just hydroponics-it\'s a complete Controlled Environment Agriculture system with environment control, automated nutrient dosing, real-time monitoring, data logging, and year-round production of any crop.'
    },
    {
      type: 'code',
      language: 'diagram',
      code: `NFT SYSTEM BUILD - CONCEPT
═══════════════════════════════════════════════════════════════════════════

    A thin film of nutrient solution flows continuously over the roots.
    This provides maximum oxygenation and nutrient availability.

    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                      │
    │   INLET (from pump)                                                 │
    │   ▼                                                                 │
    │   ┌─────────────────────────────────────────────────────────────┐   │
    │   │  ○     ○     ○     ○     ○     ○     ○     ○     ○     ○   │   │
    │   │ ┌─┐   ┌─┐   ┌─┐   ┌─┐   ┌─┐   ┌─┐   ┌─┐   ┌─┐   ┌─┐   ┌─┐ │   │
    │   │ │█│   │█│   │█│   │█│   │█│   │█│   │█│   │█│   │█│   │█│ │   │
    │   │ │█│   │█│   │█│   │█│   │█│   │█│   │█│   │█│   │█│   │█│ │   │
    │   │ └┬┘   └┬┘   └┬┘   └┬┘   └┬┘   └┬┘   └┬┘   └┬┘   └┬┘   └┬┘ │   │
    │   │  │     │     │     │     │     │     │     │     │     │  │   │
    │   │ ~│~~~~~│~~~~~│~~~~~│~~~~~│~~~~~│~~~~~│~~~~~│~~~~~│~~~~~│~ │   │
    │   │  │ROOTS│     │     │     │     │     │     │     │     │  │   │
    │   └──┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴──┘   │
    │                                                             ▼      │
    │                                                         DRAIN      │
    │                                                         (to res.)  │
    │                                                                     │
    │   Channel slope: 1-2% (1-2" drop per 6 feet)                       │
    │   Solution depth: 2-3mm (a thin film, not flooding)                │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘`
    },
    {
      type: 'header',
      text: 'Part IV: Optimization - The Continuous Improvement Loop'
    },
    {
      type: 'text',
      text: 'The build is just the beginning. The real magic happens when you start measuring, learning, and iterating.'
    },
    {
      type: 'diagram',
      diagramType: 'process',
      data: {
        title: 'The Optimization Loop',
        description: 'Systems thinking approach: YIELD = f(Light, Water, Nutrients, Environment, Time, Genetics)',
        steps: [
          {
            number: 1,
            title: 'Measure',
            description: 'Document current system state and baseline performance',
            icon: 'target',
            details: ['Record current yields', 'Document all settings', 'Establish baseline metrics']
          },
          {
            number: 2,
            title: 'Hypothesize',
            description: 'Form testable prediction about one variable',
            icon: 'brain',
            details: ['Example: "Increasing light 20% will boost yield"', 'Focus on single variable', 'Predict specific outcome']
          },
          {
            number: 3,
            title: 'Test',
            description: 'Make ONE change while keeping all other variables constant',
            icon: 'zap',
            details: ['Change only one parameter', 'Hold all others constant', 'Run complete growth cycle']
          },
          {
            number: 4,
            title: 'Observe',
            description: 'Track results throughout full growth cycle',
            icon: 'check',
            details: ['Monitor daily/weekly', 'Record quantitative data', 'Note qualitative changes']
          },
          {
            number: 5,
            title: 'Learn',
            description: 'Analyze results: Did the change work? Why or why not?',
            icon: 'book',
            details: ['Compare to baseline', 'Identify side effects', 'Understand mechanisms']
          },
          {
            number: 6,
            title: 'Implement or Revert',
            description: 'If successful, make permanent. If not, return to baseline.',
            icon: 'arrow',
            details: ['Keep what works', 'Discard what fails', 'Repeat cycle with next variable']
          }
        ]
      }
    },
    {
      type: 'header',
      text: 'Conclusion: The Limitless Garden'
    },
    {
      type: 'text',
      text: 'We started with a simple observation: the produce you buy isn\'t as nutritious or flavorful as it could be. We traced this to the fundamental constraints of the commercial food system-the trade-offs between shipping durability and peak ripeness, between shelf life and nutritional content.'
    },
    {
      type: 'text',
      text: 'Then we looked at how NASA solved this problem for the most extreme environment imaginable: growing food in space. Their constraints forced innovation that we can now apply at home.'
    },
    {
      type: 'text',
      text: 'The result? You can grow produce that\'s demonstrably more nutritious, more flavorful, and more sustainable than anything you can buy-using technology that ranges from $50 mason jar setups to $800 automated systems.'
    },
    {
      type: 'code',
      language: 'diagram',
      code: `THE HOME-GROWING VALUE PROPOSITION
═══════════════════════════════════════════════════════════════════════════

                         STORE-BOUGHT              HOME-GROWN
                         ───────────               ──────────

    Nutrient content     50-85% of peak            100% (harvested at peak)

    Flavor               Optimized for shipping    Optimized for eating

    Time from harvest    5-21 days                 5 seconds (literally)

    Variety selection    ~15 standard cultivars    Hundreds of heirloom
                                                   and specialty varieties

    Control over inputs  None                      Complete

    Annual cost*         $500-1000+ for            $50-200 in nutrients
                         equivalent fresh produce  and electricity

    Environmental        Transport, refrigeration, Minimal (closed-loop
    footprint            packaging, waste          water, LED efficiency)

    Satisfaction         Low (transaction)         High (creation)

    * For equivalent quantity and quality of leafy greens and herbs`
    },
    {
      type: 'text',
      text: 'The technology exists. The research is proven. The only question is: do you want to solve this puzzle?'
    },
    {
      type: 'text',
      text: 'Start with Tier 1. Grow some lettuce. Taste the difference. Then decide if you want to go further.'
    },
    {
      type: 'subheader',
      text: 'Appendix A: Quick Reference Cards'
    },
    {
      type: 'code',
      language: 'text',
      code: `MASTERBLEND FORMULA (Per gallon)
────────────────────────────────
Masterblend 4-18-38:  2.0 grams
Calcium Nitrate:      2.0 grams
Epsom Salt:           1.0 grams

Mix in order listed. Check pH (5.5-6.5).
Cost: ~$0.05/gallon

LIGHT HEIGHT ABOVE CANOPY
─────────────────────────
Seedlings:     24-30"
Vegetative:    18-24"
Flowering:     12-18"

If leaves bleach or curl up: Raise light
If plants stretch: Lower light

SEED TO HARVEST (Hydroponics)
─────────────────────────────
Microgreens:    7-14 days
Lettuce:        28-35 days
Basil:          21-28 days
Spinach:        35-42 days
Kale:           45-60 days
Tomatoes:       60-80 days (from transplant)
Peppers:        70-90 days (from transplant)`
    },
    {
      type: 'subheader',
      text: 'Companion pieces'
    },
    {
      type: 'text',
      text: '• The Limitless Kitchen - How autonomous robotics can prepare your home-grown produce\n• The Limitless Protocol - Optimizing your performance to match your optimized nutrition'
    }
  ]
};
