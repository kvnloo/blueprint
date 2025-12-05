import { Article } from '../researchData';

export const livingRoom: Article = {
  id: 'living-room',
  title: 'The Living Room',
  category: 'biophilic',
  track: 'World Sim',
  type: 'Deep Dive',
  readTime: '30 min',
  wordCount: 7489,
  description: 'A Solarpunk Guide to Growing Your Home: How to Fill Your Space with Light, Life, and Living Art at Any Budget',
  content: [
    {
      type: 'header',
      text: 'The Living Room'
    },
    {
      type: 'subheader',
      text: 'A Solarpunk Guide to Growing Your Home: How to Fill Your Space with Light, Life, and Living Art at Any Budget'
    },
    {
      type: 'quote',
      text: '"This is an incredible achievement for synthetic biology. Light Bio is bringing us leaps and bounds closer to our solarpunk dream of living in Avatar\'s Pandora." - Jason Kelly, CEO of Ginkgo Bioworks, on the world\'s first commercially available bioluminescent plant'
    },
    {
      type: 'text',
      text: 'Close your eyes. Imagine walking into your home after a long day. The walls exhale oxygen. Soft green light pulses gently from plants that glow in the dark. Your feet sink into grass-real, living grass-softer than any carpet you\'ve ever touched. The air smells like a forest after rain.'
    },
    {
      type: 'text',
      text: 'This isn\'t science fiction. Every element I just described exists today, and most of it costs less than a nice dinner out.'
    },
    {
      type: 'text',
      text: 'This is the solarpunk future. And you can start building it this weekend.'
    },
    {
      type: 'header',
      text: '🧭 The Knowledge Architecture'
    },
    {
      type: 'text',
      text: 'This document is organized as a journey from **understanding** (why living spaces matter) to **building** (exactly how to create them at any budget).'
    },
    {
      type: 'diagram',
      diagramType: 'hierarchy',
      data: {
        title: 'THE LIVING ROOM: Knowledge Architecture',
        subtitle: 'From Understanding to Building',
        nodes: [
          {
            id: 'science',
            name: 'PART I: THE SCIENCE',
            subtitle: 'Why Your Brain Craves Green',
            description: 'Evolutionary biology, research, and measurable benefits',
            icon: 'brain',
            children: [
              {
                id: 'biophilia',
                name: 'Biophilia Hypothesis',
                subtitle: 'Your DNA wants nature',
                description: '300,000 years of evolution in natural environments',
                icon: 'leaf'
              },
              {
                id: 'air',
                name: 'Air Quality Research',
                subtitle: 'What plants actually do',
                description: 'NASA studies and modern research findings',
                icon: 'wind'
              },
              {
                id: 'psych',
                name: 'Psychological Benefits',
                subtitle: '15% more productive',
                description: 'Stress reduction, cognitive improvements',
                icon: 'brain'
              }
            ]
          },
          {
            id: 'elements',
            name: 'PART II: THE ELEMENTS',
            subtitle: 'Building Blocks of Living Design',
            description: 'Practical components at every budget',
            icon: 'layers',
            children: [
              {
                id: 'plants',
                name: 'Air-Purifying Plants',
                subtitle: '$5-50',
                description: 'The NASA study: foundation for any living space',
                icon: 'leaf'
              },
              {
                id: 'walls',
                name: 'Living Walls',
                subtitle: '$20-500',
                description: 'Moss & vertical gardens: art that breathes',
                icon: 'layers'
              },
              {
                id: 'grass',
                name: 'Indoor Grass',
                subtitle: '$50-300',
                description: 'The softest floor you\'ve ever touched',
                icon: 'sparkles'
              },
              {
                id: 'glow',
                name: 'Glowing Plants',
                subtitle: '$29+',
                description: 'Bioluminescent night lights',
                icon: 'sparkles'
              },
              {
                id: 'light',
                name: 'Light and Water',
                subtitle: '$0-100',
                description: 'Natural rhythms and calming elements',
                icon: 'sun'
              }
            ]
          },
          {
            id: 'builds',
            name: 'PART III: THE BUILDS',
            subtitle: 'Complete Projects at Every Budget',
            description: 'From starter pack to full ecosystem',
            icon: 'home',
            children: [
              {
                id: 'tier1',
                name: 'TIER 1',
                subtitle: '$25-100',
                description: 'First steps into living design',
                icon: 'leaf'
              },
              {
                id: 'tier2',
                name: 'TIER 2',
                subtitle: '$100-300',
                description: 'Room transformation',
                icon: 'home'
              },
              {
                id: 'tier3',
                name: 'TIER 3',
                subtitle: '$300-1000',
                description: 'Full ecosystem integration',
                icon: 'sparkles'
              }
            ]
          }
        ]
      }
    },
    {
      type: 'header',
      text: 'Part I: The Science of Why Your Brain Craves Green'
    },
    {
      type: 'subheader',
      text: '1.1 The Biophilia Hypothesis'
    },
    {
      type: 'text',
      text: 'In 1984, biologist Edward O. Wilson proposed something that feels obvious once you hear it: **humans have an innate need to connect with other living things**. He called this *biophilia*-literally, "love of life."'
    },
    {
      type: 'text',
      text: 'This isn\'t poetry. It\'s evolutionary biology. For 99.9% of human history, we lived immersed in nature. Our brains evolved to find calm in green spaces, to feel alert at the sound of running water, to relax when surrounded by living things. The concrete boxes we now call "home" and "office" are-from an evolutionary perspective-a bizarre aberration that our nervous systems never adapted to handle.'
    },
    {
      type: 'diagram',
      diagramType: 'comparison',
      data: {
        title: 'THE EVOLUTIONARY TIMELINE',
        subtitle: 'Human Evolution: ~300,000 years',
        headers: ['Living Environment', 'Duration', 'Percentage of History'],
        rows: [
          {
            category: 'In Nature',
            items: [
              { value: '~299,800 years' },
              { value: '99.93%', highlight: true }
            ]
          },
          {
            category: 'Indoors',
            items: [
              { value: '~200 years' },
              { value: '0.07%' }
            ]
          }
        ],
        notes: [
          'Your nervous system was designed for: Open sky, flowing water, green everywhere, sounds of life',
          'Not designed for: Fluorescent lights, still air, beige walls, silence or HVAC hum'
        ]
      }
    },
    {
      type: 'text',
      text: 'The consequences of this mismatch are measurable. People in offices without plants or windows report higher stress, more sick days, and lower job satisfaction. Hospital patients in rooms facing a brick wall require more pain medication and stay longer than those with views of trees. Students in classrooms with natural light score 20% higher on tests.'
    },
    {
      type: 'text',
      text: '**Your environment isn\'t just where you live. It\'s shaping how you think, how you feel, and how well you heal.**'
    },
    {
      type: 'subheader',
      text: '1.2 The Research: What Plants Actually Do For You'
    },
    {
      type: 'text',
      text: 'Let\'s get specific. What does the science say about bringing nature indoors?'
    },
    {
      type: 'subheader',
      text: 'Mental Health and Productivity'
    },
    {
      type: 'text',
      text: 'A 2024 systematic review published in the Journal of Intelligent Buildings analyzed 74 peer-reviewed studies on biophilic design in workplaces. The findings were consistent and striking:'
    },
    {
      type: 'diagram',
      diagramType: 'metrics',
      data: {
        title: 'BIOPHILIC DESIGN RESEARCH FINDINGS (2024)',
        subtitle: 'Journal of Intelligent Buildings - 74 peer-reviewed studies',
        metrics: [
          {
            label: 'Productivity with Plants',
            value: '+15%',
            icon: 'zap',
            change: 15,
            description: 'Indoor plants present'
          },
          {
            label: 'Productivity with Light',
            value: '+15%',
            icon: 'sun',
            change: 15,
            description: 'Natural light present'
          },
          {
            label: 'Combined Effect',
            value: '+25%',
            icon: 'trending-up',
            change: 25,
            description: 'Plants and natural light together'
          },
          {
            label: 'Stress Reduction',
            value: '-25%',
            icon: 'heart',
            change: -25,
            description: 'Green walls in office spaces'
          },
          {
            label: 'Sick Days',
            value: '-6%',
            icon: 'shield',
            change: -6,
            description: 'With natural light access'
          },
          {
            label: 'Cognitive Function',
            value: 'Improved',
            icon: 'brain',
            description: 'Working memory, attention, creativity, problem-solving'
          },
          {
            label: 'Workplace Satisfaction',
            value: 'Higher',
            icon: 'smile',
            description: 'Significantly increased retention rates'
          }
        ]
      }
    },
    {
      type: 'subheader',
      text: 'Healthcare Settings'
    },
    {
      type: 'text',
      text: 'In hospitals, the effects are even more dramatic. A 2024 systematic review in Frontiers of the Built Environment analyzed studies from 2010-2023 and found that biophilic hospital design:'
    },
    {
      type: 'text',
      text: '- **Reduces hospitalization time** (patients heal faster)\n- **Lowers patient mortality**\n- **Decreases pain levels** (less pain medication needed)\n- **Reduces stress for healthcare providers**\n- **Alleviates anxiety** for patients, families, and staff\n- **Supports faster recovery**'
    },
    {
      type: 'text',
      text: 'The landmark study that started this research was conducted in 1984 by Roger Ulrich. He found that post-surgical patients with views of trees from their hospital window recovered faster, required less pain medication, and had fewer complications than patients whose windows faced a brick wall.'
    },
    {
      type: 'subheader',
      text: 'Air Quality: The NASA Study (And Its Nuances)'
    },
    {
      type: 'text',
      text: 'In 1989, NASA conducted a famous study on plants and air quality, looking for ways to purify air in sealed spacecraft. Their findings suggested that certain common houseplants could remove volatile organic compounds (VOCs) like formaldehyde, benzene, and trichloroethylene from the air.'
    },
    {
      type: 'text',
      text: '**Important nuance**: Later research has shown that while plants *can* remove VOCs, you\'d need 10-1000 plants per square meter to match what normal ventilation does. Plants alone won\'t purify your air.'
    },
    {
      type: 'text',
      text: '**But here\'s what plants *do* effectively provide**:'
    },
    {
      type: 'diagram',
      diagramType: 'cards',
      data: {
        title: 'WHAT PLANTS ACTUALLY DO FOR YOUR AIR',
        subtitle: 'The honest assessment based on modern research',
        cards: [
          {
            title: 'What They Do Well',
            icon: 'check-circle',
            items: [
              'Increase humidity (great for dry indoor air)',
              'Produce oxygen during daylight',
              'Add beneficial microbes to your indoor microbiome',
              'Provide psychological benefits that FEEL like cleaner air',
              'Create visual breaks that rest your eyes'
            ],
            highlight: true
          },
          {
            title: 'What They Don\'t Do Well',
            icon: 'x-circle',
            items: [
              'Purify large volumes of air in a typical home',
              'Replace proper ventilation',
              'Remove all toxins from your environment'
            ]
          },
          {
            title: 'The Honest Conclusion',
            icon: 'info',
            description: 'Plants improve your indoor environment primarily through psychological and humidity benefits, not air filtration. But those psychological benefits are REAL and MEASURABLE. A space that FEELS fresh and alive IS healthier to be in, even if the mechanism isn\'t chemical filtration.',
            highlight: true
          }
        ]
      }
    },
    {
      type: 'text',
      text: 'The NASA study remains valuable because it identified which plants are most effective at VOC absorption in sealed environments-relevant if you\'re designing a space station, submarine, or very tightly sealed modern building. Here are the champions:'
    },
    {
      type: 'diagram',
      diagramType: 'checklist',
      data: {
        title: 'NASA\'S TOP AIR-PURIFYING PLANTS (1989 Study)',
        subtitle: 'Most effective at VOC absorption in sealed environments',
        sections: [
          {
            title: 'Champions: Removed All 5 VOCs',
            description: 'Benzene, Formaldehyde, Trichloroethylene, Xylene, Ammonia',
            items: [
              { label: 'Parlour Palm (Chamaedorea elegans)', icon: 'leaf' },
              { label: 'Peace Lily (Spathiphyllum)', icon: 'leaf' },
              { label: 'Florist\'s Chrysanthemum', icon: 'leaf' },
              { label: 'Lady Palm (Rhapis excelsa)', icon: 'leaf' }
            ]
          },
          {
            title: 'Excellent: Removed 4 of 5 VOCs',
            items: [
              { label: 'English Ivy (Hedera helix)', icon: 'leaf' },
              { label: 'Dracaena \'Janet Craig\'', icon: 'leaf' },
              { label: 'Dracaena \'Warneckii\'', icon: 'leaf' },
              { label: 'Boston Fern', icon: 'leaf' },
              { label: 'Areca Palm', icon: 'leaf' }
            ]
          },
          {
            title: 'Best for Formaldehyde',
            items: [
              { label: 'Philodendron (multiple species)', icon: 'leaf' },
              { label: 'Aloe Vera', icon: 'leaf' },
              { label: 'Spider Plant', icon: 'leaf' },
              { label: 'Golden Pothos', icon: 'leaf' }
            ]
          },
          {
            title: 'Easiest to Care For',
            highlight: true,
            items: [
              { label: 'Snake Plant (Sansevieria)', icon: 'star', description: 'Nearly unkillable' },
              { label: 'Golden Pothos', icon: 'star', description: 'Thrives on neglect' },
              { label: 'Spider Plant', icon: 'star', description: 'Propagates itself' }
            ]
          }
        ]
      }
    },
    {
      type: 'header',
      text: 'Part II: The Building Blocks of Living Design'
    },
    {
      type: 'text',
      text: 'Now we get to the fun part: **what can you actually build?** Let\'s explore each element of living design, from simple houseplants to bioluminescent night lights.'
    },
    {
      type: 'subheader',
      text: '2.1 Air-Purifying Plants (The Foundation)'
    },
    {
      type: 'text',
      text: 'Every living space should start here. Plants are the most accessible entry point into biophilic design, and even one or two can shift the feeling of a room.'
    },
    {
      type: 'diagram',
      diagramType: 'process',
      data: {
        title: 'BEGINNER\'S PLANT SELECTION GUIDE',
        subtitle: 'Answer these questions to find your perfect plant match',
        steps: [
          {
            title: 'Question 1: How much light do you have?',
            icon: 'sun',
            branches: [
              {
                title: 'Low Light',
                description: 'No direct sunlight, North-facing windows',
                icon: 'cloud',
                items: ['Snake Plant', 'ZZ Plant', 'Cast Iron Plant', 'Pothos', 'Peace Lily']
              },
              {
                title: 'Medium Light',
                description: 'Some direct sun, or bright indirect light',
                icon: 'cloud-sun',
                items: ['Pothos', 'Peace Lily', 'Spider Plant', 'Dracaena', 'Ferns']
              },
              {
                title: 'Bright Light',
                description: '4+ hours direct sun, South/West windows',
                icon: 'sun',
                items: ['Aloe Vera', 'Jade Plant', 'Succulents', 'Herbs', 'Citrus']
              }
            ]
          },
          {
            title: 'Question 2: How often will you remember to water?',
            icon: 'droplet',
            branches: [
              {
                title: 'Rarely (Monthly)',
                description: 'Low-maintenance watering schedule',
                icon: 'clock',
                items: ['Snake Plant', 'ZZ Plant', 'Succulents', 'Cacti', 'Aloe']
              },
              {
                title: 'Weekly',
                description: 'Moderate watering needs',
                icon: 'calendar',
                items: ['Pothos', 'Spider Plant', 'Dracaena', 'Philodendron', 'Rubber Plant']
              },
              {
                title: 'Often (2-3x/week)',
                description: 'High water needs',
                icon: 'droplets',
                items: ['Ferns', 'Peace Lily', 'Calathea', 'Herbs', 'Boston Fern']
              }
            ]
          },
          {
            title: 'Question 3: Do you have pets?',
            icon: 'heart',
            branches: [
              {
                title: 'Pet-Safe Plants',
                description: 'Non-toxic options for homes with curious pets',
                icon: 'check-circle',
                items: ['Spider Plant', 'Boston Fern', 'Areca Palm', 'Prayer Plant', 'Peperomia', 'African Violet', 'Polka Dot Plant', 'Parlour Palm'],
                highlight: true
              },
              {
                title: 'Toxic to Pets',
                description: 'Avoid if you have curious cats or dogs',
                icon: 'alert-triangle',
                items: ['Pothos', 'Peace Lily', 'Philodendron', 'Dracaena', 'Aloe', 'ZZ Plant']
              }
            ]
          }
        ]
      }
    },
    {
      type: 'subheader',
      text: 'The Starter Pack: 5 Plants for Under $50'
    },
    {
      type: 'text',
      text: 'If you\'re just beginning, here\'s exactly what to buy:'
    },
    {
      type: 'diagram',
      diagramType: 'cards',
      data: {
        title: 'The Absolute Beginner\'s Starter Pack',
        subtitle: 'Total Cost: $30-50',
        description: '5 nearly-impossible-to-kill plants perfect for absolute beginners',
        cards: [
          {
            title: 'Snake Plant',
            subtitle: 'Sansevieria • $8-15',
            icon: 'leaf',
            details: [
              { label: 'Tolerates', value: 'Low light, irregular watering, neglect' },
              { label: 'Water', value: 'Every 2-4 weeks (less is more!)' },
              { label: 'Benefit', value: 'Releases oxygen at NIGHT' },
              { label: 'Perfect for', value: 'Bedroom, dark corners, forgetful people' }
            ]
          },
          {
            title: 'Pothos',
            subtitle: 'Epipremnum aureum • $5-12',
            icon: 'leaf',
            details: [
              { label: 'Tolerates', value: 'Low to bright indirect light' },
              { label: 'Water', value: 'When top inch of soil is dry (weekly-ish)' },
              { label: 'Benefit', value: 'Trails beautifully, easy to propagate' },
              { label: 'Perfect for', value: 'Shelves, hanging baskets, offices' },
              { label: 'Note', value: 'Toxic to pets if eaten' }
            ]
          },
          {
            title: 'Spider Plant',
            subtitle: 'Chlorophytum comosum • $5-10',
            icon: 'leaf',
            details: [
              { label: 'Tolerates', value: 'Wide range of conditions' },
              { label: 'Water', value: 'Weekly, likes some humidity' },
              { label: 'Benefit', value: 'Makes baby plants you can share' },
              { label: 'Perfect for', value: 'Hanging, pet households, beginners' },
              { label: 'Bonus', value: 'NASA\'s #1 for formaldehyde removal' }
            ]
          },
          {
            title: 'Peace Lily',
            subtitle: 'Spathiphyllum • $10-20',
            icon: 'leaf',
            details: [
              { label: 'Tolerates', value: 'Low light (flowers more in medium light)' },
              { label: 'Water', value: 'When leaves start to droop (it tells you!)' },
              { label: 'Benefit', value: 'Beautiful white flowers, very forgiving' },
              { label: 'Perfect for', value: 'Living rooms, bathrooms (likes humidity)' },
              { label: 'Note', value: 'Toxic to pets' }
            ]
          },
          {
            title: 'Rubber Plant',
            subtitle: 'Ficus elastica • $10-20',
            icon: 'leaf',
            details: [
              { label: 'Tolerates', value: 'Medium to bright indirect light' },
              { label: 'Water', value: 'When top 2 inches of soil are dry' },
              { label: 'Benefit', value: 'Dramatic large leaves, structural presence' },
              { label: 'Perfect for', value: 'Statement piece, corners, offices' }
            ]
          }
        ],
        footer: {
          title: 'Where to Buy',
          items: [
            'IKEA (cheapest, decent quality)',
            'Home Depot / Lowes',
            'Local nurseries (best advice, healthiest plants)',
            'Facebook Marketplace (often free cuttings!)'
          ]
        }
      }
    },
    {
      type: 'subheader',
      text: '2.2 Living Walls: Art That Breathes'
    },
    {
      type: 'text',
      text: 'Once you have a few plants, the next level is **vertical gardens**-living walls that turn blank surfaces into ecosystems.'
    },
    {
      type: 'subheader',
      text: 'Understanding Your Options'
    },
    {
      type: 'diagram',
      diagramType: 'comparison',
      data: {
        title: 'Living Wall Options Comparison',
        description: 'Compare different vertical garden approaches by cost, maintenance, benefits, and ideal use cases',
        categories: ['Type', 'Cost', 'Maintenance', 'Benefits', 'Best For'],
        items: [
          {
            name: 'Preserved Moss Wall Art',
            values: [
              'Preserved Moss',
              '$50-500 (DIY)',
              'None (dust only)',
              'No water needed • Lasts 8-10 years • Zero light needed • Acoustic benefits',
              'Low-effort renters'
            ]
          },
          {
            name: 'Live Moss Wall',
            values: [
              'Live Moss',
              '$75-300 (DIY)',
              'Low (mist 2x/week)',
              'Air purifying • Truly alive • Soft texture',
              'Humid spaces, bathrooms'
            ]
          },
          {
            name: 'Modular Plant Wall Systems',
            values: [
              'Full Plant System',
              '$100-400 per panel',
              'Medium (weekly)',
              'Full plants • Maximum impact • Flowers possible',
              'Dedicated gardeners'
            ]
          },
          {
            name: 'DIY Pocket Planters',
            values: [
              'Pocket System',
              '$50-150',
              'Medium (weekly)',
              'Customizable • Affordable • Easy to change',
              'Budget-conscious'
            ]
          },
          {
            name: 'Full Hydroponic Living Wall',
            values: [
              'Hydroponic System',
              '$300-1000+',
              'High (daily checks)',
              'Maximum growth • Food production • Year-round green',
              'Serious hobbyists'
            ]
          }
        ]
      }
    },
    {
      type: 'subheader',
      text: 'DIY Preserved Moss Wall Art (Weekend Project, $50-150)'
    },
    {
      type: 'text',
      text: 'This is the easiest entry into living walls. Preserved moss is real moss that\'s been treated with glycerin-it looks and feels natural but requires zero maintenance.'
    },
    {
      type: 'diagram',
      diagramType: 'process',
      data: {
        title: 'DIY Preserved Moss Wall Art',
        subtitle: 'Weekend Project: $50-150 • 2-3 hours',
        description: 'Create a low-maintenance living art piece that lasts 8-10 years with zero watering',
        materials: {
          title: 'Materials Needed (Total: $45-120)',
          items: [
            { name: 'Picture frame or shadow box', cost: '$10-30' },
            { name: 'Preserved moss (multiple types)', cost: '$20-50', details: 'Sheet moss (flat), Reindeer moss (fluffy), Mood moss (clumpy)' },
            { name: 'Plywood or foam board backing', cost: '$5-10' },
            { name: 'Hot glue gun + glue sticks', cost: '$10' },
            { name: 'Optional: dried flowers, twigs, stones', cost: '$0-20' }
          ]
        },
        steps: [
          {
            number: 1,
            title: 'Design Your Composition',
            duration: '15 min',
            description: 'Before gluing, arrange your moss on the backing',
            instructions: [
              'Vary texture: Mix flat sheet moss with fluffy reindeer moss',
              'Create depth: Layer different types',
              'Add focal points: A single dried flower or interesting twig',
              'Consider shape: Organic flowing shapes feel more natural'
            ],
            examples: [
              { name: 'Rolling Hills', style: 'Horizontal waves of different moss types' },
              { name: 'Focal Center', style: 'Accent moss clustered in middle' },
              { name: 'Diagonal Flow', style: 'Natural cascade across frame' }
            ]
          },
          {
            number: 2,
            title: 'Prepare the Backing',
            duration: '10 min',
            description: 'Set up your base for moss attachment',
            instructions: [
              'Cut backing to fit inside frame',
              'Paint edges dark green or brown (optional but cleaner look)',
              'Ensure backing is secure in frame'
            ]
          },
          {
            number: 3,
            title: 'Glue Your Moss',
            duration: '30-60 min',
            description: 'Attach moss in layers for natural depth',
            instructions: [
              'Work in sections, applying hot glue to small areas',
              'Press moss firmly into glue',
              'Build up layers for depth',
              'Fill gaps with small pieces',
              'Let cool completely before hanging'
            ]
          },
          {
            number: 4,
            title: 'Add Accents (Optional)',
            duration: '15 min',
            description: 'Enhance with natural decorative elements',
            instructions: [
              'Add dried flowers, seed pods, or small stones',
              'Include a single branch or twig',
              'Place small air plants (these ARE alive and need misting)'
            ]
          }
        ],
        care: [
          'Dust occasionally with soft brush',
          'Keep out of direct sunlight',
          'Mist lightly with water if moss seems dry (every few months)',
          'No watering or maintenance required',
          'Lasts 8-10 years'
        ]
      }
    },
    {
      type: 'subheader',
      text: '2.3 Indoor Grass: The Softest Floor You\'ve Ever Touched'
    },
    {
      type: 'text',
      text: 'Here\'s where we start getting into truly transformative living design. Imagine a section of your home with real, living grass-softer than any carpet, connected to the earth, a tiny meadow inside your space.'
    },
    {
      type: 'diagram',
      diagramType: 'hierarchy',
      data: {
        title: 'The Indoor Grass Concept',
        subtitle: 'Real living grass softer than any carpet',
        description: 'Transform a section of your home with walkable grass using hydroponic systems',
        sections: [
          {
            title: 'Why Grass Indoors?',
            icon: 'leaf',
            items: [
              'Softer than carpet (natural cushioning)',
              'No chemicals (unlike synthetic carpet VOCs)',
              'Grounding effect (connecting to earth)',
              'Sensory experience of walking barefoot in nature',
              'Humidity regulation (grass transpires moisture)',
              'Visual calm (living green in your space)'
            ]
          },
          {
            title: 'The Challenges',
            icon: 'alert-triangle',
            items: [
              'Light requirements (grass needs significant light)',
              'Water management (can\'t flood your floor)',
              'Maintenance (needs mowing/trimming)',
              'Dirt and mess potential'
            ]
          },
          {
            title: 'The Solution: Hydroponic System',
            icon: 'sparkles',
            description: 'Grow grass without soil in a contained system',
            layers: [
              { name: 'Grass Blades', description: 'Living, soft, walkable surface' },
              { name: 'Root Zone', description: 'Roots grow through Hydroton (clay balls)' },
              { name: 'Water Reservoir', description: 'Shallow nutrient water layer' },
              { name: 'Waterproof Liner', description: 'Contained tray prevents floor damage' }
            ]
          },
          {
            title: 'System Benefits',
            icon: 'check-circle',
            items: [
              'No soil = no dirt tracking',
              'No soil = no insects',
              'Contained water = no floor damage',
              'Hydroton drains perfectly = healthy roots',
              'Easy to maintain nutrient levels',
              'Clean, modern biophilic design'
            ]
          }
        ]
      }
    },
    {
      type: 'subheader',
      text: '2.4 Bioluminescent Plants: Living Night Lights'
    },
    {
      type: 'text',
      text: 'Now we arrive at the most magical element of living design: **plants that glow in the dark**.'
    },
    {
      type: 'text',
      text: 'In April 2024, Light Bio began shipping the world\'s first commercially available bioluminescent plant-the Firefly Petunia. This isn\'t a gimmick or a blacklight trick. These plants emit actual light through bioluminescence, the same process fireflies and glowing mushrooms use.'
    },
    {
      type: 'code',
      language: 'diagram',
      code: `THE FIREFLY PETUNIA
═══════════════════════════════════════════════════════════════════════════

    WHAT IT IS:
    ───────────

    A genetically engineered petunia that continuously emits
    soft green light from its leaves and flowers.

    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                      │
    │                      DAYTIME                    NIGHTTIME           │
    │                                                                      │
    │                        🌸                         ✨🌸✨              │
    │                       🌿🌸🌿                      ✨🌿✨🌸✨🌿✨          │
    │                      🌿🌿🌿🌿                    ✨🌿✨🌿✨🌿✨🌿✨        │
    │                        ┃                           ┃                │
    │                                                                      │
    │                   White flowers              Soft green glow        │
    │                   Green leaves              (visible in darkness)   │
    │                                                                      │
    └─────────────────────────────────────────────────────────────────────┘

    HOW IT WORKS:
    ─────────────

    Scientists inserted genes from bioluminescent mushrooms
    (Neonothopanus nambi) into the petunia\'s DNA.

    The mushroom genes produce enzymes that:
    1. Convert caffeic acid (already in plants) into luciferin
    2. Luciferin reacts with oxygen to produce light
    3. The byproduct is recycled back to caffeic acid
    4. The cycle repeats continuously

    This means:
    • The glow is SELF-SUSTAINING
    • No special food needed
    • No special light needed
    • Brightest in new growth and flower buds
    • Visible to naked eye in dark room

    THE BRIGHTNESS:
    ───────────────

    • Visible in complete darkness after ~10 min eye adjustment
    • Like a very soft nightlight
    • Brightest parts are flower buds and new growth
    • Research ongoing to make them 10-100x brighter

    WHERE TO BUY:
    ─────────────

    • light.bio (official source)
    • Starting at $29
    • Ships to 48 US states
    • Currently petunias only; more species coming

    CARE:
    ─────

    Just like a regular petunia:
    • Bright indirect light
    • Water when top inch of soil is dry
    • Standard potting soil
    • Annual plant (lives one growing season)`
    },
    {
      type: 'header',
      text: 'Part III: Complete Builds at Every Budget'
    },
    {
      type: 'text',
      text: 'Now let\'s put it all together. Here are complete room transformations at three budget levels.'
    },
    {
      type: 'subheader',
      text: '3.1 Tier 1: First Steps ($25-100)'
    },
    {
      type: 'text',
      text: '**Goal**: Add meaningful biophilic elements to any room without major commitment.'
    },
    {
      type: 'code',
      language: 'diagram',
      code: `TIER 1 BUILD: THE GREEN CORNER
═══════════════════════════════════════════════════════════════════════════

    BUDGET: $50-100
    TIME: 2-3 hours
    SKILL: Absolute beginner

    SHOPPING LIST:
    ──────────────

    • Snake plant (large)                                   $15
    • Pothos (in hanging planter or on shelf)              $12
    • Small preserved moss frame (8x10")                    $25
      (Buy pre-made or DIY with $15 materials)
    • River rocks or pebbles (1 lb bag)                     $5
    • Small tray for beneath plants                         $5

    TOTAL: ~$62

    ARRANGEMENT:
    ────────────

         ┌───────────────────────────────────────────────────────────┐
         │                                                           │
         │     ╔════════════╗                                        │
         │     ║  MOSS ART  ║        ~~~~~                          │
         │     ║            ║       🌿~~~~🌿  ← Pothos on shelf      │
         │     ╚════════════╝      ~~~~🌿~~~~                        │
         │                                                           │
         │                          ╔═══════╗                        │
         │              🌿          ║ BOOKS ║                        │
         │             🌿🌿🌿       ║       ║                        │
         │            🌿🌿🌿🌿      ╚═══════╝                        │
         │           ╔═══════╗                                       │
         │           ║       ║  ← Snake plant                        │
         │         ∴∴║∴∴∴∴∴∴∴║∴∴  ← River rocks on tray             │
         │           ╚═══════╝                                       │
         │                                                           │
         │           FLOOR                                           │
         └───────────────────────────────────────────────────────────┘

    IMPACT:
    ───────

    • Adds three types of greenery (vertical, trailing, art)
    • Creates visual interest at multiple heights
    • Snake plant purifies air overnight
    • Pothos trails can grow to fill empty space
    • Moss art adds nature without maintenance
    • River rocks add natural texture`
    },
    {
      type: 'subheader',
      text: '3.2 Tier 2: Room Transformation ($100-300)'
    },
    {
      type: 'text',
      text: '**Goal**: Transform a room into a noticeably biophilic space.'
    },
    {
      type: 'diagram',
      diagramType: 'floorplan',
      data: {
        title: 'TIER 2: The Biophilic Living Room',
        subtitle: 'Room Transformation ($200-300)',
        description: 'Transform a room into a noticeably biophilic space with plants at multiple heights, natural materials, and living art',
        rooms: [
          {
            id: 'window',
            name: 'Natural Light Zone',
            subtitle: 'Sun Exposure',
            description: 'Large window provides natural light for plants. Trailing pothos on high shelf creates green canopy effect.',
            icon: 'sun'
          },
          {
            id: 'moss-art',
            name: 'Living Wall Art',
            subtitle: '24" x 36" Moss Frame',
            description: 'Large DIY moss wall art as focal point. Creates visual interest and brings nature indoors without maintenance.',
            icon: 'layers'
          },
          {
            id: 'floor-plant',
            name: 'Statement Floor Plant',
            subtitle: 'Fiddle Leaf Fig / Rubber Plant',
            description: 'Large structural plant on wood stand. Adds vertical green presence and fills corner space beautifully.',
            icon: 'leaf'
          },
          {
            id: 'seating',
            name: 'Main Seating Area',
            subtitle: 'Sofa & Coffee Table',
            description: 'Central gathering space surrounded by greenery. Coffee table features succulent garden and optional water fountain.',
            icon: 'home'
          },
          {
            id: 'reading',
            name: 'Plant-Flanked Reading Nook',
            subtitle: 'Chair Between Plants',
            description: 'Cozy reading area with medium plants in woven baskets on both sides. Creates intimate green sanctuary.',
            icon: 'book'
          }
        ],
        details: [
          {
            title: 'SHOPPING LIST ($295)',
            items: [
              'Large floor plant: $40',
              'Medium plants x2: $30',
              'Trailing plant: $15',
              'Small succulents x3-5: $20',
              'DIY moss wall art materials: $60',
              'Frame for moss art: $25',
              'Natural wood plant stands (2): $40',
              'Woven baskets (3): $25',
              'River rocks and stones: $10',
              'Small tabletop fountain (optional): $30'
            ]
          },
          {
            title: 'DESIGN PRINCIPLES',
            items: [
              'Plants at multiple heights (floor, table, shelf, hanging)',
              'Natural materials (wood, woven baskets, stones)',
              'Large focal point (moss wall art)',
              'Water element (fountain adds sound and humidity)',
              'Clustering (grouping plants creates impact)',
              'Natural textures throughout'
            ]
          },
          {
            title: 'BUILD SPECS',
            items: [
              'Time: 1 weekend',
              'Skill: Comfortable with basic DIY',
              'Maintenance: Medium (weekly watering)',
              'Impact: Noticeable room transformation'
            ]
          }
        ]
      }
    },
    {
      type: 'subheader',
      text: '3.3 Tier 3: Full Ecosystem ($300-1000)'
    },
    {
      type: 'text',
      text: '**Goal**: Transform a room into an immersive biophilic environment with multiple living systems.'
    },
    {
      type: 'diagram',
      diagramType: 'floorplan',
      data: {
        title: 'TIER 3: The Ecosystem Room',
        subtitle: 'Full Biophilic Environment ($500-1000)',
        description: 'An immersive biophilic environment with multiple living systems: moss walls, hydroponic grass, bioluminescent plants, and complete climate control',
        rooms: [
          {
            id: 'moss-wall',
            name: 'Living Moss Wall',
            subtitle: '2\' x 3\' Live Moss System',
            description: 'Large living moss wall constantly releasing humidity. Soft green texture creates forest-like atmosphere. Requires misting 2x per week.',
            icon: 'layers'
          },
          {
            id: 'trailing',
            name: 'Hanging Green Canopy',
            subtitle: 'Trailing Plants',
            description: 'Multiple trailing plants create overhead green canopy. Pothos, string of pearls cascade from high shelves.',
            icon: 'leaf'
          },
          {
            id: 'firefly',
            name: 'Bioluminescent Plants',
            subtitle: 'Firefly Petunias',
            description: 'Three bioluminescent plants that glow soft green at night. Creates ethereal forest glade atmosphere in darkness.',
            icon: 'sparkles'
          },
          {
            id: 'grass',
            name: 'Living Grass Patch',
            subtitle: '2\' x 4\' Hydroponic System',
            description: 'Real, walkable grass using hydroponic system. No soil, no bugs, just soft living surface. LED grow lights maintain health.',
            icon: 'sparkles'
          },
          {
            id: 'meditation',
            name: 'Meditation Space',
            subtitle: 'Cushion on Grass',
            description: 'Meditation cushion placed directly on grass. Surrounded by greenery creates immersive natural sanctuary.',
            icon: 'heart'
          },
          {
            id: 'floor-plants',
            name: 'Air-Purifying Plant Clusters',
            subtitle: '5-8 Plants',
            description: 'Strategic plant placement on driftwood and stone bases. Creates layered forest floor effect with multiple heights.',
            icon: 'leaf'
          }
        ],
        details: [
          {
            title: 'LIVING SYSTEMS ($920)',
            items: [
              'Hydroponic grass patch (2\'x4\'): $150',
              'Large live moss wall (2\'x3\'): $150',
              'Firefly Petunia plants x3: $90',
              'Air-purifying plants (5-8): $80',
              'LED grow light for grass: $80',
              'Warm LED strip lighting: $30',
              'Small humidifier: $40',
              'Air circulation fan: $20',
              'Natural wood shelving: $80',
              'Natural stone / driftwood: $50',
              'Woven natural fiber rug: $100',
              'Natural ceramic planters: $50'
            ]
          },
          {
            title: 'THE EXPERIENCE',
            items: [
              'DAYTIME: Living moss exhales humidity, grass floor beneath your feet, air smells alive',
              'NIGHTTIME: Bioluminescent petunias glow soft green, walk barefoot on grass in ethereal light',
              'IMMERSION: Multiple sensory elements create complete biophilic environment',
              'WELLBEING: Measurable improvements in stress, air quality, and connection to nature'
            ]
          },
          {
            title: 'BUILD SPECS',
            items: [
              'Time: 2-3 weekends',
              'Skill: Comfortable with moderate DIY',
              'Maintenance: Medium-high (daily checks, weekly care)',
              'Impact: Full sensory biophilic immersion'
            ]
          }
        ]
      }
    },
    {
      type: 'subheader',
      text: '2.5 The Vision: Bioluminescent Grass That Glows When You Walk'
    },
    {
      type: 'text',
      text: 'Here\'s where we push into the near-future-the intersection of what exists today and what\'s coming tomorrow.'
    },
    {
      type: 'text',
      text: 'Imagine: You walk across your living room floor at night. With each step, the grass beneath your feet pulses with soft blue-green light, then fades. Like walking through shallow bioluminescent waters, but on land. Inside your home.'
    },
    {
      type: 'code',
      language: 'diagram',
      code: `THE RESPONSIVE BIOLUMINESCENT FLOOR
═══════════════════════════════════════════════════════════════════════════

    THE VISION:
    ───────────

    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                      │
    │    STEP 1: You step onto the grass                                  │
    │                                                                      │
    │         🦶                                                          │
    │        ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░    │
    │                                                                      │
    │    STEP 2: Pressure triggers bioluminescent response                │
    │                                                                      │
    │         🦶                                                          │
    │        ░░░░✨✨✨░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░    │
    │                                                                      │
    │    STEP 3: Light ripples outward, then fades                        │
    │                                                                      │
    │         🦶                                                          │
    │        ░░✨░░░✨░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░    │
    │             ↘ ↓ ↙                                                   │
    │                                                                      │
    │    STEP 4: You continue walking, leaving a glowing trail            │
    │                                                                      │
    │                               🦶                                    │
    │        ░░░░░░✨░░░░░░░✨✨✨░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░    │
    │              ↑               ↑                                      │
    │           fading         brightest                                  │
    │                                                                      │
    └─────────────────────────────────────────────────────────────────────┘

    WHY THIS ISN'T SCIENCE FICTION:
    ────────────────────────────────

    All the pieces exist TODAY:

    1. BIOLUMINESCENT PLANTS: ✓ Available now (Firefly Petunia)
       Scientists have already created plants that glow continuously

    2. TOUCH-RESPONSIVE PLANTS: ✓ Exist in nature
       Mimosa pudica (sensitive plant) responds to touch
       Venus flytraps detect and respond to pressure

    3. MECHANICALLY-TRIGGERED BIOLUMINESCENCE: ✓ Exists in nature
       Dinoflagellates in ocean water glow when disturbed
       This is why waves glow at night in bioluminescent bays

    4. GENETIC ENGINEERING OF COMBINED TRAITS: ✓ Active research
       Light Bio is already working on brighter, better plants
       Combining touch-response with bioluminescence is the next step`
    },
    {
      type: 'header',
      text: 'Part IV: The Solarpunk Mindset'
    },
    {
      type: 'text',
      text: 'Building living spaces isn\'t just about the physical elements. It\'s about shifting how we think about our relationship to nature and to our built environment.'
    },
    {
      type: 'subheader',
      text: '4.1 The Philosophy'
    },
    {
      type: 'code',
      language: 'diagram',
      code: `THE SOLARPUNK VISION
═══════════════════════════════════════════════════════════════════════════

    WHAT SOLARPUNK IS:
    ──────────────────

    A vision of the future where:

    • Technology and nature work together, not against each other
    • Design serves life-human, plant, animal, and ecosystem
    • Beauty and function are inseparable
    • Everyone has access to nature, not just the wealthy
    • We build with biology, not just against entropy
    • The goal is flourishing, not just sustainability

    WHAT IT'S NOT:
    ──────────────

    • Primitive living or rejecting technology
    • Only for rich people who can afford fancy homes
    • Impractical idealism disconnected from reality
    • Just aesthetic-it\'s functional design

    THE KEY INSIGHT:
    ────────────────

    Every space you inhabit can be more alive.

    • A $5 pothos on your desk is solarpunk
    • A moss frame in your bathroom is solarpunk
    • A window herb garden is solarpunk
    • Growing food in a tiny apartment is solarpunk

    The question isn\'t "can I afford to do this?"
    The question is "what can I grow TODAY with what I have?"`
    },
    {
      type: 'subheader',
      text: '4.2 Start Where You Are'
    },
    {
      type: 'code',
      language: 'diagram',
      code: `YOUR NEXT STEPS
═══════════════════════════════════════════════════════════════════════════

    THIS WEEK ($5-20):
    ──────────────────

    □ Buy one plant. Any plant. Something that makes you smile.
    □ Put it where you\'ll see it every day.
    □ Notice how it changes the feeling of that space.

    THIS MONTH ($20-50):
    ────────────────────

    □ Add 2-3 more plants at different heights
    □ Create one "green corner" with intentional arrangement
    □ Try propagating cuttings (free plants!)
    □ Consider one piece of moss art

    THIS QUARTER ($50-200):
    ───────────────────────

    □ Build a DIY moss wall or vertical planter
    □ Create a dedicated plant care routine
    □ Try one Firefly Petunia ($29)
    □ Experiment with one hydroponic system

    THIS YEAR ($200-1000):
    ──────────────────────

    □ Transform one room into a biophilic space
    □ Build an indoor grass patch
    □ Create a full ecosystem with multiple living systems
    □ Share what you\'ve learned with others

    REMEMBER:
    ─────────

    • Every living thing you add improves your space
    • Imperfect and alive beats perfect and sterile
    • Start small, learn, iterate
    • The goal is connection, not perfection`
    },
    {
      type: 'header',
      text: 'Conclusion: Growing Home'
    },
    {
      type: 'text',
      text: 'We started with a vision: walking into a home filled with light, life, and living things. Walls that exhale oxygen. Plants that glow in the dark. Grass softer than any carpet.'
    },
    {
      type: 'text',
      text: 'And now you know: **this isn\'t science fiction. It\'s DIY.**'
    },
    {
      type: 'text',
      text: 'Every element we discussed is available today, at price points from $5 to $500. The bioluminescent petunias are real-you can order them online for $29. The hydroponic grass systems are proven. The moss walls are straightforward weekend projects.'
    },
    {
      type: 'text',
      text: 'The solarpunk future doesn\'t require waiting for someone else to build it. It requires you, this weekend, with a trip to the nursery and a willingness to let your space become alive.'
    },
    {
      type: 'code',
      language: 'diagram',
      code: `THE LIVING ROOM
Final Thought
═══════════════════════════════════════════════════════════════════════════

    Your home is not just a container.

    It\'s an ecosystem waiting to happen.

    Every wall is a potential garden.
    Every corner is a potential forest.
    Every night could glow with living light.

    The only question is:

    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                      │
    │                What will you grow first?                            │
    │                                                                      │
    └─────────────────────────────────────────────────────────────────────┘`
    },
    {
      type: 'header',
      text: 'Appendix: Quick Reference'
    },
    {
      type: 'subheader',
      text: 'Plant Care Cheat Sheet'
    },
    {
      type: 'code',
      language: 'diagram',
      code: `LIGHT REQUIREMENTS:
• Low: Snake plant, ZZ plant, pothos, peace lily
• Medium: Spider plant, dracaena, philodendron, ferns
• High: Succulents, herbs, aloe, most flowering plants

WATERING FREQUENCY:
• Rarely (monthly): Snake plant, ZZ plant, succulents
• Weekly: Most tropical plants, pothos, peace lily
• Often (2-3x/week): Ferns, calathea, herbs

PET-SAFE OPTIONS:
Spider plant, Boston fern, areca palm, prayer plant,
peperomia, African violet, parlour palm`
    },
    {
      type: 'subheader',
      text: 'Budget Quick Reference'
    },
    {
      type: 'code',
      language: 'diagram',
      code: `$25-50:   3-5 small plants + basic care supplies
$50-100:  Room accent (plants + moss art)
$100-200: Room transformation (multiple plants + DIY project)
$200-500: Full living system (vertical garden OR grass patch)
$500+:    Multi-system ecosystem`
    },
    {
      type: 'subheader',
      text: 'Where to Buy'
    },
    {
      type: 'code',
      language: 'diagram',
      code: `PLANTS:
• IKEA (budget)
• Home Depot / Lowes (selection)
• Local nurseries (quality + advice)
• Facebook Marketplace (deals)

BIOLUMINESCENT PLANTS:
• light.bio (Firefly Petunias)

MOSS + SUPPLIES:
• Amazon (preserved moss, supplies)
• Etsy (live moss, artisan pieces)
• Local nurseries (live moss)

HYDROPONIC SUPPLIES:
• Amazon (most items)
• HTG Supply (specialized)
• Hydrobuilder.com (professional)`
    },
    {
      type: 'text',
      text: '*This document is a living guide. As you grow, update it with your discoveries.*'
    },
    {
      type: 'text',
      text: '*ECE Solutions LLC - Growing the Future, One Living Space at a Time*'
    },
    {
      type: 'text',
      text: '**Companion pieces**: \n- [The Home-Grown Revolution](/home-grown-revolution-blog) - Building NASA-inspired farming systems at home\n- [The Limitless Protocol](/the-limitless-protocol-blog) - Optimizing your biology for peak performance\n- [The Limitless Kitchen](/limitless-kitchen-blog) - Autonomous systems for preparing what you grow'
    }
  ]
};
