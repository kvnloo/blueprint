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
      type: 'diagram',
      diagramType: 'hierarchy',
      data: {
        title: 'THE HOME-GROWN REVOLUTION - Knowledge Map',
        root: {
          id: 'root',
          label: 'The Home-Grown Revolution',
          icon: 'leaf',
          children: [
            {
              id: 'part1',
              label: 'PART I: THE PROBLEM',
              description: 'Why Store-Bought Isn\'t What You Think',
              icon: 'target',
              children: [
                {
                  id: 'nutrient',
                  label: 'The Nutrient Degradation Curve',
                  description: 'Vitamins lost every hour after harvest',
                  icon: 'droplets'
                },
                {
                  id: 'time',
                  label: 'The Time Problem',
                  description: 'Farm → Store = 5-14 days on average',
                  icon: 'clock'
                },
                {
                  id: 'taste',
                  label: 'The Taste You\'re Missing',
                  description: 'Peak ripeness never shipped',
                  icon: 'leaf'
                }
              ]
            },
            {
              id: 'part2',
              label: 'PART II: THE SCIENCE',
              description: 'What NASA Figured Out',
              icon: 'brain',
              children: [
                {
                  id: 'led',
                  label: 'LED Spectrum Optimization',
                  description: 'Red + Blue + Far-Red',
                  icon: 'sun'
                },
                {
                  id: 'water',
                  label: 'Water & Nutrient Delivery',
                  description: 'NFT, DWC, Aeroponics',
                  icon: 'droplets'
                },
                {
                  id: 'environment',
                  label: 'Environment Control',
                  description: 'Temp, humidity, CO₂, airflow',
                  icon: 'home'
                }
              ]
            },
            {
              id: 'part3',
              label: 'PART III: THE BUILDS',
              description: 'Three Budget Tiers',
              icon: 'layers',
              children: [
                {
                  id: 'tier1',
                  label: 'TIER 1: $50-$100',
                  description: 'Kratky method, Basic LED, Manual care',
                  icon: 'leaf'
                },
                {
                  id: 'tier2',
                  label: 'TIER 2: $150-$300',
                  description: 'Tower garden, Quality LED, Semi-auto',
                  icon: 'layers'
                },
                {
                  id: 'tier3',
                  label: 'TIER 3: $400-$800',
                  description: 'Full CEA, Automated, Sensors',
                  icon: 'sparkles'
                }
              ]
            },
            {
              id: 'part4',
              label: 'PART IV: OPTIMIZATION',
              description: 'Continuous Improvement Loop',
              icon: 'target'
            }
          ]
        }
      }
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
      type: 'diagram',
      diagramType: 'process-flow',
      data: {
        title: 'THE JOURNEY FROM FARM TO YOUR FORK',
        subtitle: 'Total: 5-21 days',
        stages: [
          {
            id: 'harvest',
            label: 'HARVEST',
            description: 'Day 0',
            icon: 'leaf',
            status: 'success'
          },
          {
            id: 'transit',
            label: 'TRANSIT',
            description: '1-5 days',
            icon: 'target',
            status: 'warning'
          },
          {
            id: 'distribution',
            label: 'DISTRIBUTION CENTER',
            description: '1-3 days',
            icon: 'home',
            status: 'warning'
          },
          {
            id: 'store',
            label: 'STORE SHELF',
            description: '1-3 days',
            icon: 'home',
            status: 'warning'
          },
          {
            id: 'you',
            label: 'YOU',
            description: '1-7 days in your fridge',
            icon: 'clock',
            status: 'danger'
          }
        ],
        alternatives: [
          {
            title: 'INTERNATIONAL PRODUCE',
            description: 'Southern hemisphere, winter imports',
            stages: [
              {
                id: 'intl-harvest',
                label: 'HARVEST',
                description: 'Day 0',
                icon: 'leaf',
                status: 'success'
              },
              {
                id: 'intl-ship',
                label: 'SHIP',
                description: '2-4 weeks (ship) or 1-3 days (air)',
                icon: 'target',
                status: 'danger'
              },
              {
                id: 'intl-dist',
                label: 'DISTRIBUTION',
                description: 'Same distribution chain as domestic',
                icon: 'home',
                status: 'danger'
              }
            ]
          }
        ],
        footer: 'By the time you eat that "fresh" salad, it might be 2-3 weeks old.'
      }
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
      type: 'diagram',
      diagramType: 'comparison-matrix',
      data: {
        title: 'THE RIPENESS-SHIPPING TRADEOFF',
        subtitle: 'Commercial vs. Home-Grown Produce',
        items: [
          {
            label: 'Commercial (Harvested Green, Gassed)',
            metrics: [
              { name: 'Flavor/Nutrition', value: 20, max: 100, status: 'danger' },
              { name: 'Time to Harvest', value: 60, max: 100, status: 'warning', description: 'Picked early' },
              { name: 'Complex Sugars', value: 15, max: 100, status: 'danger' },
              { name: 'Volatile Aromatics', value: 10, max: 100, status: 'danger' },
              { name: 'Vitamin Content', value: 25, max: 100, status: 'warning' },
              { name: 'Optimal Texture', value: 30, max: 100, status: 'warning' }
            ],
            icon: 'target',
            description: 'Harvested weeks before ripe for shipping durability'
          },
          {
            label: 'Vine-Ripened (Home-Grown)',
            metrics: [
              { name: 'Flavor/Nutrition', value: 100, max: 100, status: 'success' },
              { name: 'Time to Harvest', value: 100, max: 100, status: 'success', description: 'Peak ripeness' },
              { name: 'Complex Sugars', value: 100, max: 100, status: 'success' },
              { name: 'Volatile Aromatics', value: 100, max: 100, status: 'success' },
              { name: 'Vitamin Content', value: 100, max: 100, status: 'success' },
              { name: 'Optimal Texture', value: 100, max: 100, status: 'success' }
            ],
            icon: 'leaf',
            description: 'Picked when the plant says it\'s ready'
          }
        ],
        callout: {
          text: 'The gap between commercial and home-grown is what you\'re missing',
          type: 'info'
        },
        footer: 'What\'s lost in commercial produce: Complex sugars develop in final ripening • Volatile aromatics responsible for "fresh" smell • Peak vitamin content increases during ripening • Optimal texture from natural cell wall softening'
      }
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
      type: 'diagram',
      diagramType: 'cards',
      data: {
        title: 'THE HOME-GROWING ADVANTAGE',
        cards: [
          {
            id: 'transit',
            title: '1. ZERO TRANSIT TIME',
            description: 'Harvest at 6 PM. Eat at 6:01 PM.',
            metrics: [
              { label: 'Nutrient Degradation', value: 'Effectively Zero', icon: 'droplets', status: 'success' }
            ],
            icon: 'clock',
            status: 'success'
          },
          {
            id: 'ripeness',
            title: '2. PEAK RIPENESS HARVEST',
            description: 'Pick when the plant says it\'s ready, not when a shipping schedule demands it.',
            metrics: [
              { label: 'Flavor', value: 'Maximum', icon: 'leaf', status: 'success' },
              { label: 'Nutrition', value: 'Maximum', icon: 'sparkles', status: 'success' }
            ],
            icon: 'leaf',
            status: 'success'
          },
          {
            id: 'variety',
            title: '3. VARIETY SELECTION',
            description: 'Commercial growers optimize for shipping durability. You can optimize for taste and nutrition.',
            metrics: [
              { label: 'Options', value: 'Unlimited', icon: 'layers', status: 'success' }
            ],
            details: [
              'Heirloom varieties',
              'Unusual cultivars',
              'Whatever you want'
            ],
            icon: 'sparkles',
            status: 'success'
          }
        ],
        callout: {
          text: 'The question isn\'t "SHOULD I GROW MY OWN?" The question is "HOW CAN I DO IT MOST EFFECTIVELY?"',
          type: 'info'
        }
      }
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
      type: 'diagram',
      diagramType: 'spectrum',
      data: {
        title: 'THE SPECTRUM OF PLANT LIGHT',
        subtitle: 'What Plants Actually Use (Photosynthetically Active Radiation)',
        wavelengthRange: { min: 400, max: 750, unit: 'nm' },
        spectrumBands: [
          { label: 'UV', start: 350, end: 400, color: '#8B00FF' },
          { label: 'BLUE', start: 400, end: 500, color: '#0066FF' },
          { label: 'GREEN', start: 500, end: 565, color: '#00FF00' },
          { label: 'YELLOW', start: 565, end: 590, color: '#FFFF00' },
          { label: 'RED', start: 590, end: 700, color: '#FF0000' },
          { label: 'FAR-RED', start: 700, end: 750, color: '#8B0000' },
          { label: 'INFRARED', start: 750, end: 800, color: '#4B0000' }
        ],
        absorptionCurve: {
          label: 'Chlorophyll A Absorption',
          dataPoints: [
            { wavelength: 400, absorption: 20 },
            { wavelength: 420, absorption: 70 },
            { wavelength: 430, absorption: 95 },
            { wavelength: 440, absorption: 100 },
            { wavelength: 450, absorption: 95 },
            { wavelength: 460, absorption: 70 },
            { wavelength: 500, absorption: 30 },
            { wavelength: 550, absorption: 20 },
            { wavelength: 600, absorption: 20 },
            { wavelength: 640, absorption: 40 },
            { wavelength: 660, absorption: 90 },
            { wavelength: 680, absorption: 100 },
            { wavelength: 700, absorption: 80 },
            { wavelength: 730, absorption: 40 },
            { wavelength: 750, absorption: 20 }
          ]
        },
        keyPeaks: [
          {
            label: 'BLUE PEAK',
            wavelength: '430-450nm',
            position: 440,
            description: 'Primary photosynthesis driver',
            icon: 'sun',
            status: 'success'
          },
          {
            label: 'RED PEAK',
            wavelength: '640-680nm',
            position: 660,
            description: 'Maximum absorption for photosynthesis',
            icon: 'droplets',
            status: 'success'
          },
          {
            label: 'FAR-RED',
            wavelength: '700-750nm',
            position: 730,
            description: 'Growth regulation and flowering',
            icon: 'leaf',
            status: 'warning'
          }
        ]
      }
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
      type: 'diagram',
      diagramType: 'comparison',
      data: {
        title: 'THE HOME-GROWING VALUE PROPOSITION',
        description: 'Why home-grown beats store-bought in every metric',
        headers: ['Store-Bought', 'Home-Grown'],
        rows: [
          {
            category: 'Nutrient content',
            items: [
              { value: '50-85% of peak' },
              { value: '100% (harvested at peak)', highlight: true }
            ]
          },
          {
            category: 'Flavor',
            items: [
              { value: 'Optimized for shipping' },
              { value: 'Optimized for eating', highlight: true }
            ]
          },
          {
            category: 'Time from harvest',
            items: [
              { value: '5-21 days' },
              { value: '5 seconds (literally)', highlight: true }
            ]
          },
          {
            category: 'Variety selection',
            items: [
              { value: '~15 standard cultivars' },
              { value: 'Hundreds of heirloom and specialty varieties', highlight: true }
            ]
          },
          {
            category: 'Control over inputs',
            items: [
              { value: 'None' },
              { value: 'Complete', highlight: true }
            ]
          },
          {
            category: 'Annual cost*',
            items: [
              { value: '$500-1000+ for equivalent fresh produce' },
              { value: '$50-200 in nutrients and electricity', highlight: true }
            ]
          },
          {
            category: 'Environmental footprint',
            items: [
              { value: 'Transport, refrigeration, packaging, waste' },
              { value: 'Minimal (closed-loop water, LED efficiency)', highlight: true }
            ]
          },
          {
            category: 'Satisfaction',
            items: [
              { value: 'Low (transaction)' },
              { value: 'High (creation)', highlight: true }
            ]
          }
        ],
        footer: '* For equivalent quantity and quality of leafy greens and herbs'
      }
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
