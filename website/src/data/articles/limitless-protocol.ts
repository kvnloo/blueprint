import { Article } from '../researchData';

export const limitlessProtocol: Article = {
  id: 'limitless-protocol',
  title: 'The Limitless Protocol',
  category: 'performance',
  track: 'Blueprint',
  type: 'Deep Dive',
  readTime: '45 min',
  wordCount: 11742,
  description: 'What if everything we know about cognitive enhancement, flow states, accelerated learning, and biological optimization pointed to a single unified framework? This document synthesizes research from neuroscience, exercise physiology, military training programs, and peak performance experts into an actionable system for becoming the best version of yourself.',
  content: [
    {
      type: 'header',
      text: 'The Limitless Protocol'
    },
    {
      type: 'subheader',
      text: 'A Scientific Framework for Unlocking Peak Human Performance'
    },
    {
      type: 'quote',
      text: '"The real limitless pill isn\'t a pill at all. It\'s a system."'
    },
    {
      type: 'text',
      text: 'What if everything we know about cognitive enhancement, flow states, accelerated learning, and biological optimization pointed to a single unified framework? This document synthesizes research from neuroscience, exercise physiology, military training programs, and peak performance experts into an actionable system for becoming the best version of yourself.'
    },
    {
      type: 'subheader',
      text: '🧭 The Map: How This Document Is Organized'
    },
    {
      type: 'text',
      text: 'This document uses a **spatial metaphor** to help you remember complex information: imagine a **Training Facility** with different rooms, each dedicated to a different aspect of performance optimization. As you read, mentally walk through these spaces.'
    },
    {
      type: 'diagram',
      diagramType: 'floorplan',
      data: {
        title: 'THE LIMITLESS TRAINING FACILITY',
        subtitle: 'Navigate through different aspects of performance optimization',
        rooms: [
          {
            id: 'entry',
            name: 'Entry Hall',
            subtitle: 'The Foundation',
            description: 'The foundation of all performance: Sleep, Recovery, Exercise, and Diet. Every performance enhancement starts here.',
            icon: 'home',
            topics: ['Sleep', 'Recovery', 'Exercise', 'Diet']
          },
          {
            id: 'learning',
            name: 'Learning Lab',
            subtitle: 'Master the Art of Learning',
            description: 'Discover how to learn faster and retain more through metalearning, ultralearning principles, advanced memory systems, and deliberate practice techniques.',
            icon: 'book',
            topics: ['Metalearning', 'Ultralearning', 'Memory systems', 'Deliberate practice']
          },
          {
            id: 'flow',
            name: 'Flow Chamber',
            subtitle: 'Peak Performance States',
            description: 'Enter flow states consistently through neurochemistry optimization, challenge-skill balance, and proven flow triggers. Achieve 500% productivity boosts.',
            icon: 'zap',
            topics: ['Flow triggers', 'Neurochemistry', 'Challenge-skill balance', '500% productivity']
          },
          {
            id: 'habits',
            name: 'Habit Forge',
            subtitle: 'Build Lasting Systems',
            description: 'Transform behaviors through atomic habits, identity-based change, strategic environment design, and automated behavior loops.',
            icon: 'target',
            topics: ['Atomic habits', 'Identity change', 'Environment design', 'Behavior loops']
          },
          {
            id: 'enhancement',
            name: 'Enhancement Arsenal',
            subtitle: 'Advanced Protocols',
            description: 'Access cutting-edge technologies: DARPA research, neurofeedback training, vision optimization, tDCS, strobe training, NSDR protocols, and thermal stress adaptation.',
            icon: 'sparkles',
            topics: ['DARPA', 'Neurofeedback', 'Vision', 'tDCS', 'Strobe', 'NSDR', 'Cold/Heat']
          },
          {
            id: 'integration',
            name: 'Integration Center',
            subtitle: 'Systems Thinking',
            description: 'Learn how all systems interconnect through systems thinking, feedback loops, personalized optimization, and comprehensive measurement protocols.',
            icon: 'layers',
            topics: ['Systems Thinking', 'Feedback Loops', 'Personalization', 'Measurement']
          }
        ]
      }
    },
    {
      type: 'subheader',
      text: 'How to Use This Document'
    },
    {
      type: 'text',
      text: '**🧠 Active Encoding**: Look for ❓ markers-these are reflection questions designed to strengthen memory\n\n**🔗 Connection Points**: Look for [LINK → Section] markers showing how concepts connect across domains\n\n**📊 Evidence Levels**: Each intervention is tagged with evidence strength:\n- ★★★★★ = Multiple meta-analyses, large RCTs\n- ★★★★☆ = Good RCTs, consistent findings\n- ★★★☆☆ = Moderate evidence, some RCTs\n- ★★☆☆☆ = Limited evidence, observational\n- ★☆☆☆☆ = Emerging/preliminary\n\n**🏃 Action Items**: Each section ends with "Start Here" - the single most important action you can take'
    },
    {
      type: 'header',
      text: 'PART I: THE FOUNDATION'
    },
    {
      type: 'text',
      text: '*[ANCHOR: Entry Hall of the Training Facility]*\n\nBefore we can enhance performance, we must establish the biological substrate that makes enhancement possible. Think of this as the foundation of a building-no amount of optimization matters if the foundation is cracked.'
    },
    {
      type: 'subheader',
      text: '1.1 The Hierarchy of Human Performance'
    },
    {
      type: 'diagram',
      diagramType: 'hierarchy',
      data: {
        title: 'THE PERFORMANCE PYRAMID',
        subtitle: 'Each level enables the one above it',
        description: 'You cannot sustain flow states without skills. You cannot build skills without consistent habits. You cannot maintain habits without energy. You cannot have energy without sleep.',
        levels: [
          {
            id: 'sleep',
            name: 'Sleep',
            level: 1,
            subtitle: 'The Foundation',
            description: 'Non-negotiable base. Compromising this undermines everything above.',
            icon: 'moon',
            color: 'blue',
            importance: 'critical'
          },
          {
            id: 'energy',
            name: 'Energy & Recovery',
            level: 2,
            subtitle: 'Physical Substrate',
            description: 'Exercise, nutrition, stress management. Enables everything above.',
            icon: 'heart',
            color: 'green',
            importance: 'critical',
            dependencies: ['sleep']
          },
          {
            id: 'habits',
            name: 'Habits & Systems',
            level: 3,
            subtitle: 'Behavior Systems',
            description: 'What you do daily. The automation layer for sustainable performance.',
            icon: 'target',
            color: 'purple',
            importance: 'high',
            dependencies: ['energy']
          },
          {
            id: 'skills',
            name: 'Skill Learning',
            level: 4,
            subtitle: 'Skill Development',
            description: 'Deliberate practice and continuous improvement.',
            icon: 'brain',
            color: 'orange',
            importance: 'high',
            dependencies: ['habits']
          },
          {
            id: 'flow',
            name: 'Flow States',
            level: 5,
            subtitle: 'Peak States',
            description: '4-10 hours/week max. The pinnacle of human performance.',
            icon: 'zap',
            color: 'yellow',
            importance: 'medium',
            dependencies: ['skills']
          }
        ]
      }
    },
    {
      type: 'text',
      text: '**❓ Active Encoding Question**: *Which level do you currently struggle with most? That\'s where to start-not the top.*'
    },
    {
      type: 'subheader',
      text: '1.2 Sleep: The Non-Negotiable Foundation'
    },
    {
      type: 'text',
      text: 'Every single peak performance expert agrees: sleep is non-negotiable. Here\'s why:'
    },
    {
      type: 'diagram',
      diagramType: 'process',
      data: {
        title: 'WHAT HAPPENS DURING SLEEP',
        subtitle: 'The critical stages of sleep and their functions',
        steps: [
          {
            id: 'light',
            name: 'Light Sleep',
            timeframe: 'Hour 1-2',
            subtitle: 'N1, N2 Stages',
            description: 'The initial transition into sleep',
            icon: 'moon',
            details: [
              'Muscle relaxation',
              'Heart rate decrease',
              'Preparation for deeper stages'
            ]
          },
          {
            id: 'deep',
            name: 'Deep Sleep',
            timeframe: 'Hour 2-4',
            subtitle: 'N3 - Slow Wave Sleep',
            description: 'Physical recovery and memory consolidation',
            icon: 'heart',
            details: [
              'Growth hormone release (↑800%) - Physical recovery',
              'Tissue repair',
              'Immune system restoration',
              'Declarative memory consolidation - Learning what you studied',
              'Glymphatic clearance (brain cleanup) - Clears amyloid-beta'
            ],
            importance: 'critical'
          },
          {
            id: 'rem',
            name: 'REM Cycles',
            timeframe: 'Hour 4-8',
            subtitle: 'Increase toward morning',
            description: 'Cognitive processing and creativity',
            icon: 'brain',
            details: [
              'Procedural memory consolidation - Motor skills, "how to"',
              'Emotional processing',
              'Creative problem-solving integration',
              'Pattern recognition enhancement',
              'Dream-based insight generation'
            ],
            importance: 'critical'
          }
        ],
        insight: {
          title: 'THE CRITICAL INSIGHT',
          description: 'Short sleep sacrifices REM disproportionately. 6 hours of sleep ≠ 75% of 8 hours. You lose ~50% of your REM cycles, which are concentrated in the final 2-3 hours.',
          impacts: [
            'Procedural learning (motor skills, habits)',
            'Emotional regulation',
            'Creative problem-solving',
            'Next-day cognitive performance (up to 40% impairment)'
          ]
        }
      }
    },
    {
      type: 'subheader',
      text: 'The Sleep Optimization Protocol ★★★★★'
    },
    {
      type: 'text',
      text: '| Factor | Recommendation | Evidence |\n|--------|----------------|----------|\n| Duration | 7.5-9 hours (5-6 complete cycles) | Multiple meta-analyses |\n| Consistency | Same wake time ±30 min, 7 days/week | Circadian research |\n| Temperature | 65-68°F (18-20°C) bedroom | Thermoregulation studies |\n| Light | No blue light 2h before bed; morning sunlight within 30 min of waking | Melatonin/cortisol research |\n| Timing | Finish eating 3+ hours before sleep | Glucose/insulin studies |\n| Caffeine | None after 2 PM (or 10+ hours before bed) | Half-life research |\n| Alcohol | Minimal; fragments REM sleep | Sleep architecture studies |'
    },
    {
      type: 'subheader',
      text: 'Bryan Johnson\'s Sleep Protocol'
    },
    {
      type: 'diagram',
      diagramType: 'cards',
      data: {
        title: "BRYAN JOHNSON'S SLEEP PROTOCOL",
        cards: [
          {
            title: "Target Metrics",
            icon: "target",
            content: "Sleep duration: 8+ hours\\nSleep efficiency: >95%\\nDeep sleep: >1.5 hours\\nREM sleep: >1.5 hours\\nHRV during sleep: ↑ trend\\nResting heart rate: ↓ trend",
            tags: ["metrics", "tracking"]
          },
          {
            title: "Daily Protocol",
            icon: "moon",
            content: "Fixed 8:30 PM bedtime\\nTemp-controlled environment\\nBlue light blocking after sunset\\nNo food after 11 AM\\nMorning light within minutes",
            tags: ["protocol", "consistency"]
          },
          {
            title: "Tracking Tools",
            icon: "heart",
            content: "Oura Ring for sleep stages\\nWHOOP for recovery\\nObjective data over feelings",
            tags: ["tools", "data"]
          },
          {
            title: "Key Insight",
            icon: "brain",
            content: 'Johnson treats sleep as a competitive sport with objective metrics, not a vague "I feel rested" assessment.',
            tags: ["philosophy", "mindset"]
          }
        ]
      }
    },
    {
      type: 'text',
      text: '[LINK → Part IV: Integration - How sleep connects to every other system]\n\n**🏃 Start Here**: Get a sleep tracker (Oura, WHOOP, or even Apple Watch) and establish your baseline. You cannot improve what you don\'t measure.'
    },
    {
      type: 'subheader',
      text: '1.3 Exercise: The Master Regulator'
    },
    {
      type: 'text',
      text: 'Exercise is the single most evidence-backed intervention for cognitive enhancement. It outperforms every nootropic.'
    },
    {
      type: 'diagram',
      diagramType: 'comparison',
      data: {
        title: 'EXERCISE → BRAIN EFFECTS',
        subtitle: 'Immediate vs long-term cognitive benefits',
        categories: [
          {
            name: 'IMMEDIATE EFFECTS',
            subtitle: 'During & 0-2 hours after',
            icon: 'zap',
            color: 'yellow',
            items: [
              {
                name: 'Norepinephrine ↑',
                description: 'Alertness, attention',
                impact: 'high'
              },
              {
                name: 'Dopamine ↑',
                description: 'Motivation, learning signals',
                impact: 'high'
              },
              {
                name: 'Serotonin ↑',
                description: 'Mood, anxiety reduction',
                impact: 'medium'
              },
              {
                name: 'Endorphins ↑',
                description: 'Pain modulation, euphoria',
                impact: 'medium'
              },
              {
                name: 'Cerebral blood flow ↑',
                description: 'Oxygen/glucose delivery to brain',
                impact: 'high'
              }
            ],
            netEffect: '20-30% boost in cognitive performance for 2-4 hours'
          },
          {
            name: 'CHRONIC EFFECTS',
            subtitle: 'Weeks to months of consistent exercise',
            icon: 'brain',
            color: 'purple',
            items: [
              {
                name: 'BDNF ↑↑',
                description: '"Miracle-Gro for the brain" - Promotes neurogenesis, synaptogenesis',
                impact: 'critical'
              },
              {
                name: 'Hippocampal volume ↑',
                description: '1-2% per year (vs. 1% loss without) - Improves memory encoding',
                impact: 'critical'
              },
              {
                name: 'Prefrontal cortex ↑',
                description: 'Enhanced executive function, better working memory',
                impact: 'high'
              },
              {
                name: 'White matter integrity ↑',
                description: 'Faster information processing, better inter-regional communication',
                impact: 'high'
              },
              {
                name: 'Inflammation ↓',
                description: 'Reduced CRP, IL-6, lower neuroinflammation',
                impact: 'medium'
              },
              {
                name: 'Insulin sensitivity ↑',
                description: 'Better glucose regulation in brain, reduced Alzheimer\'s risk',
                impact: 'high'
              }
            ],
            netEffect: 'Structural brain changes that compound over years'
          }
        ]
      }
    },
    {
      type: 'subheader',
      text: 'The Optimal Protocol (Rhonda Patrick / Peter Attia Synthesis)'
    },
    {
      type: 'diagram',
      diagramType: 'cards',
      data: {
        title: 'WEEKLY EXERCISE PRESCRIPTION',
        subtitle: 'For Cognitive Optimization',
        cards: [
          {
            title: "Zone 2 Cardio",
            subtitle: "Aerobic Base",
            icon: "heart",
            content: "What: ~60-70% max HR\\n(can talk, can't sing)\\n\\nHow much: 150-200+ min/week\\n(3-5 sessions × 30-60 min)\\n\\nWhy: Maximizes mitochondrial density, BDNF, cardiovascular base\\n\\nEvidence: ★★★★★",
            tags: ["critical", "foundation"],
            quote: 'Rhonda Patrick: "Zone 2 is the single most important exercise modality for longevity and brain health."'
          },
          {
            title: "High-Intensity Intervals",
            subtitle: "VO2 Max Training",
            icon: "flame",
            content: "What: 80-95% max HR\\n(30 sec - 4 min repeated)\\n\\nHow much: 1-2 sessions/week\\n(20-30 min total)\\n\\nWhy: Maximum BDNF release, VO2max improvement, growth hormone\\n\\nEvidence: ★★★★★",
            tags: ["intensity", "BDNF"],
            protocol: "Norwegian 4×4:\\n• 10 min warmup\\n• 4 min at 90-95% max HR\\n• 3 min active recovery\\n• Repeat 4 times\\n• 5 min cooldown"
          },
          {
            title: "Resistance Training",
            subtitle: "Strength & Muscle",
            icon: "dumbbell",
            content: "What: Compound movements\\n(progressive overload)\\n\\nHow much: 2-4 sessions/week\\n(45-60 min)\\n\\nWhy: Muscle preservation, insulin sensitivity, IGF-1 release, hormones\\n\\nEvidence: ★★★★☆",
            tags: ["strength", "neuroprotection"],
            movements: "Squat, deadlift, bench press, row, overhead press"
          },
          {
            title: "Timing Strategy",
            subtitle: "Cognitive Enhancement",
            icon: "clock",
            content: "For learning:\\nExercise 1-2 hours BEFORE studying\\n(elevates catecholamines)\\n\\nFor consolidation:\\nLight exercise AFTER learning\\n(enhances hippocampus)\\n\\nAvoid intense exercise late evening\\n(disrupts sleep)",
            tags: ["timing", "optimization"]
          }
        ]
      }
    },
    {
      type: 'text',
      text: '[LINK → Part II.1: Exercise primes the brain for flow states]\n\n**🏃 Start Here**: Add 30 minutes of Zone 2 cardio before your most important cognitive work of the day.'
    },
    {
      type: 'subheader',
      text: '1.4 Nutrition: Fueling the Brain'
    },
    {
      type: 'text',
      text: 'The brain represents 2% of body weight but consumes 20-25% of total energy. It\'s extraordinarily sensitive to what you feed it.'
    },
    {
      type: 'diagram',
      diagramType: 'metrics',
      data: {
        title: 'GLUCOSE STABILITY',
        subtitle: 'Nutritional Framework for Cognitive Optimization',
        metrics: [
          {
            id: 'problem',
            label: 'The Problem',
            value: 'Glucose Spikes → Crashes',
            change: 'negative',
            icon: 'droplets',
            description: 'Post-meal spikes lead to brain fog, mood swings, sugar cravings',
            details: [
              'Glucose spike after refined carbs',
              'Energy crash 2-3 hours later',
              'Cognitive impairment',
              'Craving for sugar/caffeine',
              'Cycle repeats'
            ]
          },
          {
            id: 'solution1',
            label: 'Meal Composition',
            value: 'Protein + Fat + Fiber',
            change: 'positive',
            icon: 'leaf',
            description: 'Every meal should include all three macros',
            details: [
              'Slows glucose absorption',
              'Extends satiety',
              'Prevents spikes/crashes',
              'Stable energy for 3-5 hours'
            ]
          },
          {
            id: 'solution2',
            label: 'Carb Timing',
            value: 'Evening > Daytime',
            change: 'positive',
            icon: 'moon',
            description: 'Time carbs strategically for better sleep and daytime energy',
            details: [
              'Carbs in evening → better sleep',
              'Low-carb daytime → stable focus',
              'Avoid refined carbs anytime',
              'Match to activity level'
            ]
          },
          {
            id: 'tool',
            label: 'Tracking Tool',
            value: 'Continuous Glucose Monitor',
            change: 'neutral',
            icon: 'target',
            description: 'Personalized data for YOUR glucose response',
            details: [
              'Real-time glucose tracking',
              'Identify personal triggers',
              'Optimize meal composition',
              'Track response to exercise'
            ]
          }
        ]
      }
    },
    {
      type: 'text',
      text: '[LINK → Part IV: Integration - How nutrition affects flow state access]\n\n**🏃 Start Here**: Track your glucose response for 2 weeks with a CGM (Levels, Dexcom) to identify YOUR personal food triggers for energy crashes.'
    },
    {
      type: 'header',
      text: 'PART II: THE LEARNING LAB'
    },
    {
      type: 'text',
      text: '*[ANCHOR: First major room in the Training Facility]*\n\nWith the foundation established, we can now optimize how we acquire skills and knowledge. This is where metalearning and deliberate practice live.'
    },
    {
      type: 'subheader',
      text: '2.1 Metalearning: Learning How to Learn'
    },
    {
      type: 'text',
      text: 'Justin Sung, a physician turned learning expert, developed a framework based on cognitive science research. His core insight: **most people learn inefficiently because they mistake recognition for recall.**'
    },
    {
      type: 'diagram',
      diagramType: 'process',
      data: {
        title: 'THE ENCODING SPECTRUM',
        subtitle: 'From shallow to deep encoding (Justin Sung)',
        description: 'Shallow encoding: Low effort, fast forgetting. Deep encoding: High effort, lasting memory.',
        steps: [
          {
            id: 'passive',
            name: 'Passive Input',
            level: 1,
            subtitle: '"I read the chapter"',
            description: 'Retention after 1 week: ~5%',
            icon: 'book',
            effectiveness: 5,
            effort: 'low'
          },
          {
            id: 'highlighting',
            name: 'Highlighting/Underlining',
            level: 2,
            subtitle: '"I marked the important parts"',
            description: 'Retention after 1 week: ~10%. Creates illusion of learning without actual encoding.',
            icon: 'lightbulb',
            effectiveness: 10,
            effort: 'low'
          },
          {
            id: 'summarization',
            name: 'Summarization',
            level: 3,
            subtitle: '"I wrote it in my own words"',
            description: 'Retention after 1 week: ~20%',
            icon: 'layers',
            effectiveness: 20,
            effort: 'medium'
          },
          {
            id: 'questioning',
            name: 'Active Questioning',
            level: 4,
            subtitle: '"I asked questions about the material"',
            description: 'Retention after 1 week: ~35%',
            icon: 'target',
            effectiveness: 35,
            effort: 'medium'
          },
          {
            id: 'connections',
            name: 'Connection-Making',
            level: 5,
            subtitle: '"I linked it to what I already know"',
            description: 'Retention after 1 week: ~50%',
            icon: 'branch',
            effectiveness: 50,
            effort: 'high'
          },
          {
            id: 'teaching',
            name: 'Teaching/Elaboration',
            level: 6,
            subtitle: '"I explained it to someone else"',
            description: 'Retention after 1 week: ~70%',
            icon: 'brain',
            effectiveness: 70,
            effort: 'high'
          },
          {
            id: 'retrieval',
            name: 'Retrieval Practice + Spacing',
            level: 7,
            subtitle: '"I tested myself repeatedly over time"',
            description: 'Retention after 1 week: ~85%+',
            icon: 'trophy',
            effectiveness: 85,
            effort: 'high',
            importance: 'critical'
          }
        ]
      }
    },
    {
      type: 'header',
      text: 'PART III: THE FLOW CHAMBER'
    },
    {
      type: 'text',
      text: '*[ANCHOR: Second major room in the Training Facility]*\n\nFlow states represent peak human performance-the state where challenge and skill align perfectly, time dilates, and output multiplies.'
    },
    {
      type: 'subheader',
      text: '3.1 The Neuroscience of Flow'
    },
    {
      type: 'diagram',
      diagramType: 'process',
      data: {
        title: 'THE FLOW STATE NEUROCHEMICAL CASCADE',
        subtitle: 'Three phases of peak performance',
        steps: [
          {
            id: 'struggle',
            name: 'Struggle Phase',
            timeframe: 'Minutes to hours',
            subtitle: 'BEFORE FLOW',
            description: 'Loading information into implicit processing',
            icon: 'flame',
            details: [
              'Brain State: High beta waves',
              'Stress, effortful attention',
              'Experience: Frustration, difficulty',
              'Mental effort required',
              'System is preparing for flow'
            ],
            importance: 'critical',
            color: 'red'
          },
          {
            id: 'flow',
            name: 'Release Phase',
            timeframe: 'Variable duration',
            subtitle: 'DURING FLOW',
            description: 'The flow cocktail - most potent natural neurochemical stack',
            icon: 'zap',
            details: [
              'Brain: Prefrontal cortex DEACTIVATES',
              '→ Inner critic goes offline',
              '→ Time distorts',
              '→ Self-consciousness disappears',
              '',
              'Neurochemical Cocktail:',
              '• Norepinephrine ↑↑ → Arousal, attention, pattern recognition',
              '• Dopamine ↑↑ → Reward, motivation, learning',
              '• Anandamide ↑↑ → Lateral thinking, anxiety reduction',
              '• Endorphins ↑↑ → Pain blocking, euphoria',
              '• Serotonin ↑ → Wellbeing (post-flow)',
              '',
              'Brainwaves: Beta → Alpha → Theta',
              'Performance boost: 400-500% (McKinsey)'
            ],
            importance: 'critical',
            color: 'yellow'
          },
          {
            id: 'recovery',
            name: 'Recovery Phase',
            timeframe: '48-72 hours',
            subtitle: 'AFTER FLOW',
            description: 'Neurochemical systems need recovery time',
            icon: 'heart',
            details: [
              'Brain State: Returning to baseline',
              'Experience: Satisfaction, fatigue',
              'Enhanced creativity (48-72 hrs)',
              '',
              'CRITICAL:',
              'Cannot force another flow state immediately',
              'Recovery time is essential',
              'Trying to force flow = diminishing returns'
            ],
            importance: 'high',
            color: 'blue'
          }
        ],
        insight: {
          title: 'THE CRITICAL INSIGHT',
          description: 'Flow is not a switch - it\'s a cycle. You cannot maintain flow indefinitely. Respect the recovery phase.',
          impacts: [
            'Struggle phase is necessary (not a failure)',
            'Flow requires neurochemical depletion',
            'Recovery enables next flow cycle',
            'Attempting 8+ hours/day of flow = burnout'
          ]
        }
      }
    },
    {
      type: 'subheader',
      text: '3.2 The 4% Rule for Optimal Challenge'
    },
    {
      type: 'diagram',
      diagramType: 'radial',
      data: {
        title: 'THE 4% RULE FOR OPTIMAL CHALLENGE',
        subtitle: 'Challenge level relative to skill',
        centerLabel: 'FLOW ZONE',
        zones: [
          {
            name: 'BOREDOM',
            value: -20,
            description: 'Checked out',
            icon: '😴',
            color: 'gray'
          },
          {
            name: 'COMFORT',
            value: -10,
            description: 'Auto-pilot',
            icon: '😐',
            color: 'blue'
          },
          {
            name: 'FLOW ZONE',
            value: 4,
            description: 'Peak performance',
            icon: '🔥',
            color: 'green',
            highlight: true
          },
          {
            name: 'STRETCH',
            value: 10,
            description: 'High growth',
            icon: '😤',
            color: 'yellow'
          },
          {
            name: 'ANXIETY',
            value: 20,
            description: 'Overwhelmed',
            icon: '😰',
            color: 'red'
          }
        ],
        guidance: [
          'Assess current skill level honestly',
          'Choose task difficulty ~4% beyond current ability',
          'Adjust in real-time: If bored → increase difficulty',
          'If anxious → decrease difficulty',
          'If in flow → maintain current level'
        ]
      }
    },
    {
      type: 'header',
      text: 'PART IV: THE HABIT FORGE'
    },
    {
      type: 'text',
      text: '*[ANCHOR: Third major room in the Training Facility]*\n\nHabits are the automation layer that makes peak performance sustainable. Without habits, every day requires willpower-a depleting resource.'
    },
    {
      type: 'subheader',
      text: '4.1 The Neuroscience of Habit Formation'
    },
    {
      type: 'diagram',
      diagramType: 'process',
      data: {
        title: 'THE HABIT LOOP',
        subtitle: 'Basal Ganglia Circuit',
        cyclic: true,
        steps: [
          {
            id: 'trigger',
            label: 'TRIGGER/CUE',
            icon: 'target',
            description: 'Environmental or internal signal',
            details: [
              '• Location',
              '• Time',
              '• Emotional state',
              '• Other people',
              '• Preceding action'
            ]
          },
          {
            id: 'craving',
            label: 'CRAVING',
            icon: 'zap',
            description: 'Anticipation of reward',
            details: [
              'Dopamine release on CUE',
              '(not reward-anticipation!)'
            ]
          },
          {
            id: 'response',
            label: 'RESPONSE',
            icon: 'brain',
            description: 'The actual habit behavior',
            details: [
              'Requires less and less',
              'conscious effort over time'
            ]
          },
          {
            id: 'reward',
            label: 'REWARD',
            icon: 'award',
            description: 'Satisfies the craving',
            details: [
              'Teaches brain to remember',
              'and repeat the loop'
            ]
          }
        ],
        insight: {
          title: 'KEY INSIGHT (Wendy Wood\'s Research)',
          points: [
            '~43% of daily behaviors are habitual',
            'Performed automatically while thinking about something else',
            'The brain WANTS to automate behaviors to save cognitive resources',
            'Use this tendency deliberately'
          ]
        }
      }
    },
    {
      type: 'header',
      text: 'PART V: THE ENHANCEMENT ARSENAL'
    },
    {
      type: 'text',
      text: '*[ANCHOR: The high-tech wing of the Training Facility]*\n\nThis section covers advanced interventions: technologies, protocols, and techniques that can accelerate performance beyond baseline.'
    },
    {
      type: 'subheader',
      text: '5.1 DARPA\'s Accelerated Learning Research'
    },
    {
      type: 'text',
      text: 'The Defense Advanced Research Projects Agency has invested hundreds of millions in human performance enhancement.'
    },
    {
      type: 'diagram',
      diagramType: 'cards',
      data: {
        title: 'DARPA COGNITIVE ENHANCEMENT PROGRAMS',
        subtitle: 'Targeted Neuroplasticity Training (TNT) - 2016-2020',
        cards: [
          {
            id: 'mechanism',
            title: 'Mechanism',
            icon: 'brain',
            content: [
              'Peripheral nerve stimulation during learning',
              'Electrical stimulation of vagus/trigeminal nerves',
              'Increases plasticity-enhancing neurochemicals:',
              '• Acetylcholine',
              '• Dopamine',
              '• Serotonin',
              '• Norepinephrine',
              'Applied during training tasks'
            ]
          },
          {
            id: 'results',
            title: 'Results',
            icon: 'zap',
            highlight: true,
            content: [
              '490% improvement in skill acquisition',
              '(marksmanship study)',
              'Accelerated language learning',
              'Enhanced intelligence analysis training'
            ]
          },
          {
            id: 'status',
            title: 'Status & Research',
            icon: 'target',
            content: [
              'Technology being developed for field deployment',
              '',
              'Research institutions:',
              '• Arizona State University',
              '• Johns Hopkins',
              '• Wright State University',
              '• University of Florida',
              '• University of Texas-Dallas'
            ]
          }
        ]
      }
    },
    {
      type: 'subheader',
      text: '5.4 NSDR (Non-Sleep Deep Rest)'
    },
    {
      type: 'text',
      text: 'Andrew Huberman popularized NSDR-a state that provides some benefits of sleep without sleeping.\n\n**🏃 Start Here**: Try a 10-minute NSDR session (search "Huberman NSDR" on YouTube) after your next learning session or in early afternoon instead of reaching for coffee.'
    },
    {
      type: 'subheader',
      text: '5.5 Heat and Cold Exposure'
    },
    {
      type: 'text',
      text: 'Thermal stress triggers powerful adaptive responses.'
    },
    {
      type: 'diagram',
      diagramType: 'cards',
      data: {
        title: 'DELIBERATE COLD EXPOSURE',
        subtitle: 'EVIDENCE: ★★★★☆ (for specific outcomes)',
        cards: [
          {
            id: 'immediate',
            title: 'Immediate Effects',
            icon: 'zap',
            highlight: true,
            content: [
              'Norepinephrine ↑↑ (200-500%)',
              '→ Alertness, focus',
              '',
              'Dopamine ↑↑ (200-250%)',
              '→ Mood, motivation (lasts hours)',
              '',
              'Cortisol ↑',
              '→ Brief spike, then enhanced recovery'
            ]
          },
          {
            id: 'chronic',
            title: 'Chronic Adaptations',
            icon: 'flame',
            content: [
              'Brown fat activation',
              '(metabolic boost)',
              '',
              'Improved immune function',
              '(controversial)',
              '',
              'Enhanced stress resilience',
              '',
              'Better mood regulation'
            ]
          },
          {
            id: 'protocol',
            title: 'Protocol (Evidence-Based)',
            icon: 'droplets',
            content: [
              'Target: 11 min/week total',
              '(Huberman synthesis)',
              '',
              'Methods:',
              '• Cold shower: 30-60 sec end',
              '• Cold plunge: 1-3 min at 50-59°F',
              '• Cold immersion: 1-5 min',
              '',
              'Guidelines:',
              '• Uncomfortably cold but safe',
              '• End on cold (no immediate warmup)',
              '• Best timing: Morning',
              '• Not after strength training'
            ]
          }
        ]
      }
    },
    {
      type: 'header',
      text: 'PART VI: THE INTEGRATION CENTER'
    },
    {
      type: 'text',
      text: '*[ANCHOR: The control room where everything comes together]*\n\nThe most powerful insight: these systems are not separate. They interact, amplify each other, and create emergent effects.'
    },
    {
      type: 'subheader',
      text: '6.1 Systems Thinking: The Performance Meta-Model'
    },
    {
      type: 'diagram',
      diagramType: 'hierarchy',
      data: {
        title: 'THE INTERCONNECTED PERFORMANCE SYSTEM',
        subtitle: 'Everything connects and amplifies',
        root: {
          id: 'sleep',
          label: 'SLEEP',
          icon: 'moon',
          description: 'Foundation of all systems'
        },
        nodes: [
          {
            id: 'exercise',
            label: 'EXERCISE',
            icon: 'dumbbell',
            parentId: 'sleep',
            bidirectional: ['nutrition', 'stress']
          },
          {
            id: 'nutrition',
            label: 'NUTRITION',
            icon: 'flame',
            parentId: 'sleep',
            bidirectional: ['exercise', 'stress']
          },
          {
            id: 'stress',
            label: 'STRESS',
            icon: 'wind',
            parentId: 'sleep',
            bidirectional: ['exercise', 'nutrition']
          },
          {
            id: 'cognitive',
            label: 'COGNITIVE CAPACITY',
            icon: 'brain',
            parentId: 'exercise',
            description: 'Working memory • Executive function • Processing speed'
          },
          {
            id: 'learning',
            label: 'LEARNING',
            icon: 'book',
            parentId: 'cognitive',
            bidirectional: ['flow', 'habits']
          },
          {
            id: 'flow',
            label: 'FLOW STATES',
            icon: 'zap',
            parentId: 'cognitive',
            bidirectional: ['learning', 'habits']
          },
          {
            id: 'habits',
            label: 'HABITS',
            icon: 'target',
            parentId: 'cognitive',
            bidirectional: ['learning', 'flow']
          },
          {
            id: 'performance',
            label: 'PERFORMANCE OUTCOMES',
            icon: 'award',
            parentId: 'learning'
          }
        ],
        feedbackLoops: [
          {
            type: 'positive',
            title: 'Virtuous Cycle',
            description: 'Good sleep → More energy → Better workouts → Easier sleep → Better mood → Better food choices → Improved cognition → More flow → Higher motivation → Maintained habits → REPEATS'
          },
          {
            type: 'negative',
            title: 'Vicious Cycle',
            description: 'Poor sleep → Low energy → Skip workout → Worse sleep → Low mood → Poor food choices → Impaired cognition → Can\'t focus → Less motivation → Broken habits → REPEATS'
          }
        ],
        leveragePoints: [
          {
            rank: 1,
            label: 'Sleep',
            icon: 'moon',
            reason: 'Affects every other system. Fixing sleep improves everything.'
          },
          {
            rank: 2,
            label: 'Exercise',
            icon: 'dumbbell',
            reason: 'Directly improves cognition, mood, sleep, and stress resilience.'
          },
          {
            rank: 3,
            label: 'Morning routine',
            icon: 'sunrise',
            reason: 'First domino of the day. Win the morning, win the day.'
          }
        ]
      }
    },
    {
      type: 'subheader',
      text: '6.3 The Compound Effect'
    },
    {
      type: 'diagram',
      diagramType: 'metrics',
      data: {
        title: 'THE COMPOUND EFFECT OF OPTIMIZED SYSTEMS',
        subtitle: 'Multiplicative, not additive gains',
        metrics: [
          {
            label: 'Sleep',
            value: '+10%',
            icon: 'moon',
            category: 'individual'
          },
          {
            label: 'Exercise',
            value: '+10%',
            icon: 'dumbbell',
            category: 'individual'
          },
          {
            label: 'Nutrition',
            value: '+10%',
            icon: 'flame',
            category: 'individual'
          },
          {
            label: 'Flow',
            value: '+15%',
            icon: 'zap',
            category: 'individual'
          },
          {
            label: 'Learning',
            value: '+20%',
            icon: 'book',
            category: 'individual'
          },
          {
            label: 'Year 1 Total',
            value: '84%',
            icon: 'award',
            highlight: true,
            description: '1.1 × 1.1 × 1.1 × 1.15 × 1.2 = 1.84',
            note: 'NOT: 10+10+10+15+20 = 65%'
          },
          {
            label: 'Year 2',
            value: '239%',
            icon: 'trending-up',
            category: 'compound'
          },
          {
            label: 'Year 3',
            value: '500%+',
            icon: 'rocket',
            category: 'compound',
            highlight: true
          }
        ],
        insights: {
          uncomfortable: [
            'There is no shortcut',
            'The "limitless pill" is daily systems executed over years',
            'Most people fail not from lack of knowledge but lack of patience',
            'The gap between you and peak performers is consistency, not secrets'
          ],
          hopeful: [
            'Small changes compound enormously',
            'You don\'t need to be extreme-you need to be consistent',
            'The process itself becomes rewarding',
            'Results come faster than you expect if you stay the course'
          ]
        }
      }
    },
    {
      type: 'header',
      text: 'CONCLUSION: The Limitless Protocol Summary'
    },
    {
      type: 'diagram',
      diagramType: 'checklist',
      data: {
        title: 'THE LIMITLESS PROTOCOL - ONE PAGE SUMMARY',
        subtitle: 'Build your performance stack tier by tier',
        tiers: [
          {
            id: 'tier1',
            name: 'TIER 1: NON-NEGOTIABLE FOUNDATION',
            subtitle: 'Start here',
            importance: 'critical',
            items: [
              {
                id: 'sleep',
                name: 'Sleep',
                description: '7.5-9 hours, consistent timing, optimized environment',
                icon: 'moon',
                category: 'foundation'
              },
              {
                id: 'exercise',
                name: 'Exercise',
                description: 'Zone 2 (150+ min/week) + HIIT (1-2×/week) + Strength',
                icon: 'dumbbell',
                category: 'foundation'
              },
              {
                id: 'nutrition',
                name: 'Nutrition',
                description: 'Whole foods, stable glucose, adequate protein, key nutrients (omega-3, choline, magnesium, D3)',
                icon: 'flame',
                category: 'foundation'
              },
              {
                id: 'stress',
                name: 'Stress Management',
                description: 'Daily meditation (10+ min), breathwork, recovery blocks',
                icon: 'wind',
                category: 'foundation'
              }
            ]
          },
          {
            id: 'tier2',
            name: 'TIER 2: COGNITIVE OPTIMIZATION',
            subtitle: 'Add when Tier 1 is solid',
            importance: 'high',
            items: [
              {
                id: 'learning',
                name: 'Learning',
                description: 'Ultralearning principles, spaced repetition, deliberate practice, retrieval > review',
                icon: 'book',
                category: 'cognitive'
              },
              {
                id: 'flow',
                name: 'Flow',
                description: '90-min blocks, challenge-skill balance, trigger stacking, recovery between sessions, max 4-5 hrs/day',
                icon: 'zap',
                category: 'cognitive'
              },
              {
                id: 'habits',
                name: 'Habits',
                description: 'Atomic habits framework, identity-based change, environment design, habit stacking',
                icon: 'target',
                category: 'cognitive'
              }
            ]
          },
          {
            id: 'tier3',
            name: 'TIER 3: ENHANCEMENT PROTOCOLS',
            subtitle: 'Add when Tier 2 is solid',
            importance: 'medium',
            items: [
              {
                id: 'cold',
                name: 'Cold Exposure',
                description: '11 min/week total, morning timing, end on cold',
                icon: 'droplets',
                category: 'enhancement'
              },
              {
                id: 'heat',
                name: 'Heat Exposure',
                description: 'Sauna 3-4×/week, 15-20 min at 176-212°F',
                icon: 'flame',
                category: 'enhancement'
              },
              {
                id: 'nsdr',
                name: 'NSDR',
                description: '10-20 min after learning or early afternoon',
                icon: 'moon',
                category: 'enhancement'
              },
              {
                id: 'neurofeedback',
                name: 'Neurofeedback',
                description: '20-40 sessions, protocol-specific',
                icon: 'brain',
                category: 'enhancement'
              },
              {
                id: 'vision',
                name: 'Vision Training',
                description: 'Sport-specific training, quiet eye practice',
                icon: 'target',
                category: 'enhancement'
              }
            ]
          }
        ],
        action: {
          title: 'THE SINGLE MOST IMPORTANT THING',
          steps: [
            'PICK ONE THING FROM TIER 1',
            'DO IT EVERY DAY FOR 30 DAYS',
            'THEN ADD ONE MORE',
            'REPEAT FOR THE REST OF YOUR LIFE'
          ],
          summary: "That's it. That's the protocol."
        }
      }
    },
    {
      type: 'subheader',
      text: 'Appendix: Key Resources'
    },
    {
      type: 'text',
      text: '### Books\n- **Ultralearning** - Scott Young\n- **Atomic Habits** - James Clear\n- **Peak** - Anders Ericsson\n- **Stealing Fire** - Steven Kotler\n- **The Art of Learning** - Josh Waitzkin\n- **Outlive** - Peter Attia\n- **Why We Sleep** - Matthew Walker\n- **The Art of Impossible** - Steven Kotler\n- **Flow** - Mihaly Csikszentmihalyi\n\n### Researchers/Experts to Follow\n- Steven Kotler (Flow Research Collective)\n- Dr. Rhonda Patrick (FoundMyFitness)\n- Dr. Andrew Huberman (Huberman Lab podcast)\n- Dr. Justin Sung (iCanStudy)\n- Dr. Peter Attia (The Drive podcast)\n- Bryan Johnson (Blueprint protocol)\n\n### Tools\n- **Sleep/Biometrics**: Oura Ring, WHOOP, Eight Sleep, Apple Watch\n- **HRV**: Elite HRV, HRV4Training\n- **Meditation**: Reveri app (NSDR), Muse headband, Waking Up, Headspace\n- **Learning**: Anki, Readwise, Roam\n- **Focus**: Forest, Freedom, Cold Turkey\n- **Metabolism**: CGM (continuous glucose monitoring)\n- **Visual Training**: Senaptec Strobe glasses'
    },
    {
      type: 'text',
      text: '*This document synthesizes research from neuroscience, exercise physiology, cognitive psychology, and elite performance. It is not medical advice. Consult healthcare professionals before making significant changes to diet, exercise, or supplementation.*\n\n*zer0 LLC - Making the Limitless Pill a Reality*'
    },
    {
      type: 'quote',
      text: '**❓ Final Active Encoding Question**: What is the SINGLE change you will implement tomorrow morning? Write it down. Now.'
    }
  ]
};
