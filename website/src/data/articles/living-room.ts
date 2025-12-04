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
      content: 'The Living Room'
    },
    {
      type: 'subheader',
      content: 'A Solarpunk Guide to Growing Your Home: How to Fill Your Space with Light, Life, and Living Art at Any Budget'
    },
    {
      type: 'quote',
      content: '"This is an incredible achievement for synthetic biology. Light Bio is bringing us leaps and bounds closer to our solarpunk dream of living in Avatar\'s Pandora." - Jason Kelly, CEO of Ginkgo Bioworks, on the world\'s first commercially available bioluminescent plant'
    },
    {
      type: 'text',
      content: 'Close your eyes. Imagine walking into your home after a long day. The walls exhale oxygen. Soft green light pulses gently from plants that glow in the dark. Your feet sink into grass-real, living grass-softer than any carpet you\'ve ever touched. The air smells like a forest after rain.'
    },
    {
      type: 'text',
      content: 'This isn\'t science fiction. Every element I just described exists today, and most of it costs less than a nice dinner out.'
    },
    {
      type: 'text',
      content: 'This is the solarpunk future. And you can start building it this weekend.'
    },
    {
      type: 'header',
      content: '🧭 The Knowledge Architecture'
    },
    {
      type: 'text',
      content: 'This document is organized as a journey from **understanding** (why living spaces matter) to **building** (exactly how to create them at any budget).'
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
      content: 'Part I: The Science of Why Your Brain Craves Green'
    },
    {
      type: 'subheader',
      content: '1.1 The Biophilia Hypothesis'
    },
    {
      type: 'text',
      content: 'In 1984, biologist Edward O. Wilson proposed something that feels obvious once you hear it: **humans have an innate need to connect with other living things**. He called this *biophilia*-literally, "love of life."'
    },
    {
      type: 'text',
      content: 'This isn\'t poetry. It\'s evolutionary biology. For 99.9% of human history, we lived immersed in nature. Our brains evolved to find calm in green spaces, to feel alert at the sound of running water, to relax when surrounded by living things. The concrete boxes we now call "home" and "office" are-from an evolutionary perspective-a bizarre aberration that our nervous systems never adapted to handle.'
    },
    {
      type: 'code',
      language: 'diagram',
      content: `THE EVOLUTIONARY TIMELINE
═══════════════════════════════════════════════════════════════════════════

    HUMAN EVOLUTION: ~300,000 years

    ████████████████████████████████████████████████████████████████████│
    │                                                                    │
    │  Living in nature: ~299,800 years                                 │
    │  (99.93% of human history)                                        │
    │                                                                    │
    ████████████████████████████████████████████████████████████████████│█
                                                                         │
                                                                         │ Living indoors
                                                                         │ ~200 years
                                                                         │ (0.07%)

    YOUR NERVOUS SYSTEM WAS DESIGNED FOR THIS:

         🌲 🌲 🌲 🌲 🌲                    NOT THIS:
              🦌
         🌿 〰️💧〰️ 🌿                      ┌────────────────┐
           🐟  🐟                          │ ┌──┐    ┌──┐   │
         🌱 🌱 🌱 🌱 🌱                     │ │  │    │  │   │
                                          │ └──┘    └──┘   │
    Open sky, flowing water,              │     [====]     │
    green everywhere, sounds              │                │
    of life                               └────────────────┘

                                          Fluorescent lights,
                                          still air, beige walls,
                                          silence or HVAC hum`
    },
    {
      type: 'text',
      content: 'The consequences of this mismatch are measurable. People in offices without plants or windows report higher stress, more sick days, and lower job satisfaction. Hospital patients in rooms facing a brick wall require more pain medication and stay longer than those with views of trees. Students in classrooms with natural light score 20% higher on tests.'
    },
    {
      type: 'text',
      content: '**Your environment isn\'t just where you live. It\'s shaping how you think, how you feel, and how well you heal.**'
    },
    {
      type: 'subheader',
      content: '1.2 The Research: What Plants Actually Do For You'
    },
    {
      type: 'text',
      content: 'Let\'s get specific. What does the science say about bringing nature indoors?'
    },
    {
      type: 'subheader',
      content: 'Mental Health and Productivity'
    },
    {
      type: 'text',
      content: 'A 2024 systematic review published in the Journal of Intelligent Buildings analyzed 74 peer-reviewed studies on biophilic design in workplaces. The findings were consistent and striking:'
    },
    {
      type: 'code',
      language: 'diagram',
      content: `BIOPHILIC DESIGN RESEARCH FINDINGS (2024)
═══════════════════════════════════════════════════════════════════════════

    PRODUCTIVITY IMPROVEMENTS
    ─────────────────────────

    Indoor plants present:           +15% productivity
    Natural light present:           +15% productivity
    Combined effect:                 Up to +25% productivity

    STRESS REDUCTION
    ─────────────────

    Nature views during breaks:      Significant stress recovery
    Plants at desk:                  Lower cortisol levels
    Green walls in office:           25% reduction in reported stress

    COGNITIVE FUNCTION
    ──────────────────

    Working memory:                  ↑ Improved
    Attention span:                  ↑ Improved
    Creative thinking:               ↑ Improved
    Problem-solving:                 ↑ Improved

    PHYSICAL HEALTH
    ───────────────

    Sick days:                       6% reduction with natural light
    Headaches:                       Reduced in plant-filled spaces
    Eye strain:                      Reduced with view of greenery

    SATISFACTION
    ────────────

    Workplace satisfaction:          Significantly higher
    Willingness to stay:             Higher retention rates

    Source: "Investigating restorative effects of biophilic design
             in workplaces" - Journal of Intelligent Buildings, 2024`
    },
    {
      type: 'subheader',
      content: 'Healthcare Settings'
    },
    {
      type: 'text',
      content: 'In hospitals, the effects are even more dramatic. A 2024 systematic review in Frontiers of the Built Environment analyzed studies from 2010-2023 and found that biophilic hospital design:'
    },
    {
      type: 'text',
      content: '- **Reduces hospitalization time** (patients heal faster)\n- **Lowers patient mortality**\n- **Decreases pain levels** (less pain medication needed)\n- **Reduces stress for healthcare providers**\n- **Alleviates anxiety** for patients, families, and staff\n- **Supports faster recovery**'
    },
    {
      type: 'text',
      content: 'The landmark study that started this research was conducted in 1984 by Roger Ulrich. He found that post-surgical patients with views of trees from their hospital window recovered faster, required less pain medication, and had fewer complications than patients whose windows faced a brick wall.'
    },
    {
      type: 'subheader',
      content: 'Air Quality: The NASA Study (And Its Nuances)'
    },
    {
      type: 'text',
      content: 'In 1989, NASA conducted a famous study on plants and air quality, looking for ways to purify air in sealed spacecraft. Their findings suggested that certain common houseplants could remove volatile organic compounds (VOCs) like formaldehyde, benzene, and trichloroethylene from the air.'
    },
    {
      type: 'text',
      content: '**Important nuance**: Later research has shown that while plants *can* remove VOCs, you\'d need 10-1000 plants per square meter to match what normal ventilation does. Plants alone won\'t purify your air.'
    },
    {
      type: 'text',
      content: '**But here\'s what plants *do* effectively provide**:'
    },
    {
      type: 'code',
      language: 'diagram',
      content: `WHAT PLANTS ACTUALLY DO FOR YOUR AIR
═══════════════════════════════════════════════════════════════════════════

    WHAT THEY DO WELL:
    ──────────────────

    ✓ Increase humidity (great for dry indoor air)
    ✓ Produce oxygen during daylight
    ✓ Add beneficial microbes to your indoor microbiome
    ✓ Provide psychological benefits that FEEL like cleaner air
    ✓ Create visual breaks that rest your eyes

    WHAT THEY DON'T DO WELL:
    ────────────────────────

    ✗ Purify large volumes of air in a typical home
    ✗ Replace proper ventilation
    ✗ Remove all toxins from your environment

    THE HONEST CONCLUSION:
    ──────────────────────

    Plants improve your indoor environment primarily through
    psychological and humidity benefits, not air filtration.

    But those psychological benefits are REAL and MEASURABLE.
    A space that FEELS fresh and alive IS healthier to be in,
    even if the mechanism isn\'t chemical filtration.`
    },
    {
      type: 'text',
      content: 'The NASA study remains valuable because it identified which plants are most effective at VOC absorption in sealed environments-relevant if you\'re designing a space station, submarine, or very tightly sealed modern building. Here are the champions:'
    },
    {
      type: 'code',
      language: 'diagram',
      content: `NASA'S TOP AIR-PURIFYING PLANTS (1989 Study)
═══════════════════════════════════════════════════════════════════════════

    REMOVED ALL 5 VOCs TESTED (Benzene, Formaldehyde,
    Trichloroethylene, Xylene, Ammonia):

    🌿 Parlour Palm (Chamaedorea elegans)
    🌿 Peace Lily (Spathiphyllum)
    🌿 Florist\'s Chrysanthemum
    🌿 Lady Palm (Rhapis excelsa)

    REMOVED 4 OF 5 VOCs:

    🌿 English Ivy (Hedera helix)
    🌿 Dracaena 'Janet Craig'
    🌿 Dracaena 'Warneckii'
    🌿 Boston Fern
    🌿 Areca Palm

    BEST FOR FORMALDEHYDE:

    🌿 Philodendron (multiple species)
    🌿 Aloe Vera
    🌿 Spider Plant
    🌿 Golden Pothos

    EASIEST TO CARE FOR (from this list):

    🌿 Snake Plant (Sansevieria) - Nearly unkillable
    🌿 Golden Pothos - Thrives on neglect
    🌿 Spider Plant - Propagates itself`
    },
    {
      type: 'header',
      content: 'Part II: The Building Blocks of Living Design'
    },
    {
      type: 'text',
      content: 'Now we get to the fun part: **what can you actually build?** Let\'s explore each element of living design, from simple houseplants to bioluminescent night lights.'
    },
    {
      type: 'subheader',
      content: '2.1 Air-Purifying Plants (The Foundation)'
    },
    {
      type: 'text',
      content: 'Every living space should start here. Plants are the most accessible entry point into biophilic design, and even one or two can shift the feeling of a room.'
    },
    {
      type: 'code',
      language: 'diagram',
      content: `BEGINNER'S PLANT SELECTION GUIDE
═══════════════════════════════════════════════════════════════════════════

    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                      │
    │   QUESTION 1: How much light do you have?                           │
    │                                                                      │
    │   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐            │
    │   │  LOW LIGHT  │    │ MEDIUM LIGHT│    │ BRIGHT LIGHT│            │
    │   │             │    │             │    │             │            │
    │   │ No direct   │    │ Some direct │    │ 4+ hours    │            │
    │   │ sunlight    │    │ sun, or     │    │ direct sun  │            │
    │   │ North-facing│    │ bright      │    │ South/West  │            │
    │   │ windows     │    │ indirect    │    │ windows     │            │
    │   │             │    │             │    │             │            │
    │   │ Snake Plant │    │ Pothos      │    │ Aloe Vera   │            │
    │   │ ZZ Plant    │    │ Peace Lily  │    │ Jade Plant  │            │
    │   │ Cast Iron   │    │ Spider Plant│    │ Succulents  │            │
    │   │ Pothos      │    │ Dracaena    │    │ Herbs       │            │
    │   │ Peace Lily  │    │ Ferns       │    │ Citrus      │            │
    │   └─────────────┘    └─────────────┘    └─────────────┘            │
    │                                                                      │
    │   QUESTION 2: How often will you remember to water?                 │
    │                                                                      │
    │   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐            │
    │   │   RARELY    │    │   WEEKLY    │    │   OFTEN     │            │
    │   │  (Monthly)  │    │             │    │ (2-3x/week) │            │
    │   │             │    │             │    │             │            │
    │   │ Snake Plant │    │ Pothos      │    │ Ferns       │            │
    │   │ ZZ Plant    │    │ Spider Plant│    │ Peace Lily  │            │
    │   │ Succulents  │    │ Dracaena    │    │ Calathea    │            │
    │   │ Cacti       │    │ Philodendron│    │ Herbs       │            │
    │   │ Aloe        │    │ Rubber Plant│    │ Boston Fern │            │
    │   └─────────────┘    └─────────────┘    └─────────────┘            │
    │                                                                      │
    │   QUESTION 3: Do you have pets?                                     │
    │                                                                      │
    │   ┌──────────────────────────────────────────────────────────────┐ │
    │   │  PET-SAFE PLANTS:                                             │ │
    │   │  Spider Plant, Boston Fern, Areca Palm, Prayer Plant,        │ │
    │   │  Peperomia, African Violet, Polka Dot Plant, Parlour Palm    │ │
    │   │                                                               │ │
    │   │  TOXIC TO PETS (avoid if curious pets):                       │ │
    │   │  Pothos, Peace Lily, Philodendron, Dracaena, Aloe, ZZ Plant │ │
    │   └──────────────────────────────────────────────────────────────┘ │
    │                                                                      │
    └─────────────────────────────────────────────────────────────────────┘`
    },
    {
      type: 'subheader',
      content: 'The Starter Pack: 5 Plants for Under $50'
    },
    {
      type: 'text',
      content: 'If you\'re just beginning, here\'s exactly what to buy:'
    },
    {
      type: 'code',
      language: 'diagram',
      content: `THE ABSOLUTE BEGINNER'S STARTER PACK
═══════════════════════════════════════════════════════════════════════════

    TOTAL COST: $30-50

    1. SNAKE PLANT (Sansevieria) - $8-15
       ─────────────────────────────────
       • Tolerates: Low light, irregular watering, neglect
       • Water: Every 2-4 weeks (seriously, less is more)
       • Benefit: Releases oxygen at NIGHT (most plants do daytime)
       • Perfect for: Bedroom, dark corners, forgetful people

    2. POTHOS (Epipremnum aureum) - $5-12
       ─────────────────────────────────
       • Tolerates: Low to bright indirect light
       • Water: When top inch of soil is dry (weekly-ish)
       • Benefit: Trails beautifully, easy to propagate
       • Perfect for: Shelves, hanging baskets, offices
       • Note: Toxic to pets if eaten

    3. SPIDER PLANT (Chlorophytum comosum) - $5-10
       ─────────────────────────────────
       • Tolerates: Wide range of conditions
       • Water: Weekly, likes some humidity
       • Benefit: Makes baby plants you can share
       • Perfect for: Hanging, pet households, beginners
       • Bonus: NASA\'s #1 for formaldehyde removal

    4. PEACE LILY (Spathiphyllum) - $10-20
       ─────────────────────────────────
       • Tolerates: Low light (flowers more in medium light)
       • Water: When leaves start to droop (it tells you!)
       • Benefit: Beautiful white flowers, very forgiving
       • Perfect for: Living rooms, bathrooms (likes humidity)
       • Note: Toxic to pets

    5. RUBBER PLANT (Ficus elastica) - $10-20
       ─────────────────────────────────
       • Tolerates: Medium to bright indirect light
       • Water: When top 2 inches of soil are dry
       • Benefit: Dramatic large leaves, structural presence
       • Perfect for: Statement piece, corners, offices

    WHERE TO BUY:
    • IKEA (cheapest, decent quality)
    • Home Depot / Lowes
    • Local nurseries (best advice, healthiest plants)
    • Facebook Marketplace (often free cuttings!)`
    },
    {
      type: 'subheader',
      content: '2.2 Living Walls: Art That Breathes'
    },
    {
      type: 'text',
      content: 'Once you have a few plants, the next level is **vertical gardens**-living walls that turn blank surfaces into ecosystems.'
    },
    {
      type: 'subheader',
      content: 'Understanding Your Options'
    },
    {
      type: 'code',
      language: 'diagram',
      content: `LIVING WALL OPTIONS COMPARISON
═══════════════════════════════════════════════════════════════════════════

TYPE               COST        MAINTENANCE    BENEFITS           BEST FOR
────────────────────────────────────────────────────────────────────────────

PRESERVED MOSS     $50-500     None           No water needed    Low-effort
WALL ART           (DIY)       (dust only)    Lasts 8-10 years   renters
                                              Zero light needed
                                              Acoustic benefits

LIVE MOSS WALL     $75-300     Low            Air purifying      Humid spaces
                   (DIY)       (mist 2x/wk)   Truly alive        bathrooms
                                              Soft texture

MODULAR PLANT      $100-400    Medium         Full plants        Dedicated
WALL SYSTEMS       (per panel) (weekly)       Maximum impact     gardeners
                                              Flowers possible

DIY POCKET         $50-150     Medium         Customizable       Budget-
PLANTERS                       (weekly)       Affordable         conscious
                                              Easy to change

FULL HYDROPONIC    $300-1000+  High           Maximum growth     Serious
LIVING WALL                    (daily checks) Food production    hobbyists
                                              Year-round green`
    },
    {
      type: 'subheader',
      content: 'DIY Preserved Moss Wall Art (Weekend Project, $50-150)'
    },
    {
      type: 'text',
      content: 'This is the easiest entry into living walls. Preserved moss is real moss that\'s been treated with glycerin-it looks and feels natural but requires zero maintenance.'
    },
    {
      type: 'code',
      language: 'diagram',
      content: `DIY PRESERVED MOSS WALL ART
═══════════════════════════════════════════════════════════════════════════

MATERIALS NEEDED:
─────────────────

    • Picture frame or shadow box (any size)        $10-30
    • Preserved moss (multiple types for texture)   $20-50
      - Sheet moss (flat, carpet-like)
      - Reindeer moss (fluffy, comes in colors)
      - Mood moss (rounded, clumpy)
    • Plywood or foam board backing               $5-10
    • Hot glue gun + glue sticks                  $10
    • Optional: dried flowers, twigs, stones      $0-20

    TOTAL: $45-120 depending on size

BUILD INSTRUCTIONS:
───────────────────

    STEP 1: DESIGN YOUR COMPOSITION (15 min)
    ────────────────────────────────────────

    Before gluing, arrange your moss on the backing.

    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                      │
    │  DESIGN PRINCIPLES:                                                 │
    │                                                                      │
    │  • Vary texture: Mix flat sheet moss with fluffy reindeer moss     │
    │  • Create depth: Layer different types                              │
    │  • Add focal points: A single dried flower or interesting twig     │
    │  • Consider shape: Organic flowing shapes feel more natural        │
    │                                                                      │
    │  EXAMPLE LAYOUTS:                                                   │
    │                                                                      │
    │  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐         │
    │  │▒▒▒▒░░░▒▒▒▒▒ │    │   ▒▒▒▒▒▒▒    │    │▓▓▓░░░▒▒▒▒▒▒│         │
    │  │▒▒░░░░░░░▒▒▒ │    │ ▒▒▒▒▓▓▓▒▒▒▒  │    │▓▓░░░░░▒▒▒▒▒│         │
    │  │░░░░░▓▓░░░░░ │    │▒▒▒▓▓▓▓▓▓▒▒▒▒ │    │░░░░░░░░▒▒▒▒│         │
    │  │░░░░▓▓▓▓░░░░ │    │▒▒▓▓▓▓▓▓▓▓▒▒▒ │    │░░░▓▓░░░░▒▒▒│         │
    │  │▒▒░░░░░░░▒▒▒ │    │ ▒▒▒▒▓▓▓▒▒▒▒  │    │▒▒░░░░░░░▒▒▒│         │
    │  │▒▒▒▒░░░▒▒▒▒▒ │    │   ▒▒▒▒▒▒▒    │    │▒▒▒▒░░░▒▒▒▒▒│         │
    │  └──────────────┘    └──────────────┘    └──────────────┘         │
    │    "Rolling Hills"    "Focal Center"      "Diagonal Flow"         │
    │                                                                      │
    │  ░ = Sheet moss  ▒ = Reindeer moss  ▓ = Mood moss or accent       │
    │                                                                      │
    └─────────────────────────────────────────────────────────────────────┘

    STEP 2: PREPARE THE BACKING (10 min)
    ─────────────────────────────────────

    • Cut backing to fit inside frame
    • Paint edges dark green or brown (optional but cleaner look)
    • Ensure backing is secure in frame

    STEP 3: GLUE YOUR MOSS (30-60 min)
    ──────────────────────────────────

    • Work in sections, applying hot glue to small areas
    • Press moss firmly into glue
    • Build up layers for depth
    • Fill gaps with small pieces
    • Let cool completely before hanging

    STEP 4: ADD ACCENTS (optional, 15 min)
    ──────────────────────────────────────

    • Dried flowers, seed pods, or small stones
    • A single branch or twig
    • Small air plants (these ARE alive and need misting)

    CARE: Dust occasionally. Keep out of direct sunlight.
          Mist with water if moss seems dry (every few months).`
    },
    {
      type: 'subheader',
      content: '2.3 Indoor Grass: The Softest Floor You\'ve Ever Touched'
    },
    {
      type: 'text',
      content: 'Here\'s where we start getting into truly transformative living design. Imagine a section of your home with real, living grass-softer than any carpet, connected to the earth, a tiny meadow inside your space.'
    },
    {
      type: 'code',
      language: 'diagram',
      content: `THE INDOOR GRASS CONCEPT
═══════════════════════════════════════════════════════════════════════════

    WHY GRASS INDOORS?
    ──────────────────

    • Softer than carpet (grass + soil has natural cushioning)
    • No chemicals (unlike synthetic carpet off-gassing VOCs)
    • Grounding effect (literally connecting to earth)
    • The sensory experience of walking barefoot in nature
    • Humidity regulation (grass transpires moisture)
    • Visual calm (a patch of green in your space)

    THE CHALLENGES:
    ───────────────

    • Light requirements (grass needs significant light)
    • Water management (can\'t let it flood your floor)
    • Maintenance (needs mowing/trimming)
    • Dirt and mess potential

    THE SOLUTION: HYDROPONIC GRASS SYSTEMS
    ──────────────────────────────────────

    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                      │
    │  Instead of soil, we grow grass in a contained hydroponic system:   │
    │                                                                      │
    │                    ~~~GRASS BLADES~~~                               │
    │                    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                               │
    │      ROOTS →       ░░░░░░░░░░░░░░░░░  ← HYDROTON (clay balls)      │
    │                    ╔═══════════════╗                                │
    │      WATER →       ║ ~~~~~~~~~~~ ║  ← Shallow reservoir            │
    │                    ╚═══════════════╝                                │
    │                    ┌───────────────┐                                │
    │                    │  WATERPROOF   │  ← Contained tray              │
    │                    │    LINER      │                                │
    │                    └───────────────┘                                │
    │                                                                      │
    │  BENEFITS:                                                          │
    │  • No soil = no dirt tracking                                       │
    │  • No soil = no insects                                             │
    │  • Contained water = no floor damage                                │
    │  • Hydroton drains perfectly = healthy roots                        │
    │  • Easy to maintain nutrient levels                                 │
    │                                                                      │
    └─────────────────────────────────────────────────────────────────────┘`
    },
    {
      type: 'subheader',
      content: '2.4 Bioluminescent Plants: Living Night Lights'
    },
    {
      type: 'text',
      content: 'Now we arrive at the most magical element of living design: **plants that glow in the dark**.'
    },
    {
      type: 'text',
      content: 'In April 2024, Light Bio began shipping the world\'s first commercially available bioluminescent plant-the Firefly Petunia. This isn\'t a gimmick or a blacklight trick. These plants emit actual light through bioluminescence, the same process fireflies and glowing mushrooms use.'
    },
    {
      type: 'code',
      language: 'diagram',
      content: `THE FIREFLY PETUNIA
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
      content: 'Part III: Complete Builds at Every Budget'
    },
    {
      type: 'text',
      content: 'Now let\'s put it all together. Here are complete room transformations at three budget levels.'
    },
    {
      type: 'subheader',
      content: '3.1 Tier 1: First Steps ($25-100)'
    },
    {
      type: 'text',
      content: '**Goal**: Add meaningful biophilic elements to any room without major commitment.'
    },
    {
      type: 'code',
      language: 'diagram',
      content: `TIER 1 BUILD: THE GREEN CORNER
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
      content: '3.2 Tier 2: Room Transformation ($100-300)'
    },
    {
      type: 'text',
      content: '**Goal**: Transform a room into a noticeably biophilic space.'
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
      content: '3.3 Tier 3: Full Ecosystem ($300-1000)'
    },
    {
      type: 'text',
      content: '**Goal**: Transform a room into an immersive biophilic environment with multiple living systems.'
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
      content: '2.5 The Vision: Bioluminescent Grass That Glows When You Walk'
    },
    {
      type: 'text',
      content: 'Here\'s where we push into the near-future-the intersection of what exists today and what\'s coming tomorrow.'
    },
    {
      type: 'text',
      content: 'Imagine: You walk across your living room floor at night. With each step, the grass beneath your feet pulses with soft blue-green light, then fades. Like walking through shallow bioluminescent waters, but on land. Inside your home.'
    },
    {
      type: 'code',
      language: 'diagram',
      content: `THE RESPONSIVE BIOLUMINESCENT FLOOR
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
      content: 'Part IV: The Solarpunk Mindset'
    },
    {
      type: 'text',
      content: 'Building living spaces isn\'t just about the physical elements. It\'s about shifting how we think about our relationship to nature and to our built environment.'
    },
    {
      type: 'subheader',
      content: '4.1 The Philosophy'
    },
    {
      type: 'code',
      language: 'diagram',
      content: `THE SOLARPUNK VISION
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
      content: '4.2 Start Where You Are'
    },
    {
      type: 'code',
      language: 'diagram',
      content: `YOUR NEXT STEPS
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
      content: 'Conclusion: Growing Home'
    },
    {
      type: 'text',
      content: 'We started with a vision: walking into a home filled with light, life, and living things. Walls that exhale oxygen. Plants that glow in the dark. Grass softer than any carpet.'
    },
    {
      type: 'text',
      content: 'And now you know: **this isn\'t science fiction. It\'s DIY.**'
    },
    {
      type: 'text',
      content: 'Every element we discussed is available today, at price points from $5 to $500. The bioluminescent petunias are real-you can order them online for $29. The hydroponic grass systems are proven. The moss walls are straightforward weekend projects.'
    },
    {
      type: 'text',
      content: 'The solarpunk future doesn\'t require waiting for someone else to build it. It requires you, this weekend, with a trip to the nursery and a willingness to let your space become alive.'
    },
    {
      type: 'code',
      language: 'diagram',
      content: `THE LIVING ROOM
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
      content: 'Appendix: Quick Reference'
    },
    {
      type: 'subheader',
      content: 'Plant Care Cheat Sheet'
    },
    {
      type: 'code',
      language: 'diagram',
      content: `LIGHT REQUIREMENTS:
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
      content: 'Budget Quick Reference'
    },
    {
      type: 'code',
      language: 'diagram',
      content: `$25-50:   3-5 small plants + basic care supplies
$50-100:  Room accent (plants + moss art)
$100-200: Room transformation (multiple plants + DIY project)
$200-500: Full living system (vertical garden OR grass patch)
$500+:    Multi-system ecosystem`
    },
    {
      type: 'subheader',
      content: 'Where to Buy'
    },
    {
      type: 'code',
      language: 'diagram',
      content: `PLANTS:
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
      content: '*This document is a living guide. As you grow, update it with your discoveries.*'
    },
    {
      type: 'text',
      content: '*ECE Solutions LLC - Growing the Future, One Living Space at a Time*'
    },
    {
      type: 'text',
      content: '**Companion pieces**: \n- [The Home-Grown Revolution](/home-grown-revolution-blog) - Building NASA-inspired farming systems at home\n- [The Limitless Protocol](/the-limitless-protocol-blog) - Optimizing your biology for peak performance\n- [The Limitless Kitchen](/limitless-kitchen-blog) - Autonomous systems for preparing what you grow'
    }
  ]
};
