import { Article } from '../researchData';

export const capabilityTrap: Article = {
  id: 'capability-trap',
  title: 'The Capability Trap',
  category: 'ai-philosophy',
  track: 'Evolve',
  type: 'Deep Dive',
  readTime: '18 min',
  wordCount: 4421,
  description: 'Deep Blue beat Garry Kasparov in 1997. Could it play checkers? No. Did it understand what a "game" was? No. Deep Blue wasn\'t intelligent. It was capable. There\'s a difference-and understanding that difference changes how you build systems that actually work.',
  content: [
    {
      type: 'header',
      text: 'The Capability Trap'
    },
    {
      type: 'subheader',
      text: 'Why the AI That Beats You at Chess Isn\'t Actually Smart'
    },
    {
      type: 'text',
      text: 'A zer0 Research Document - December 2025'
    },
    {
      type: 'code',
      language: 'diagram',
      code: `THE UNCOMFORTABLE QUESTION
═══════════════════════════════════════════════════════════════════════════

    Deep Blue beat Garry Kasparov in 1997.

    Could Deep Blue play checkers?

    No.

    Could it have a conversation about chess?

    No.

    Did it understand what a "game" was?

    No.


    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                     │
    │  Deep Blue wasn\'t intelligent.                                     │
    │  It was capable.                                                   │
    │                                                                     │
    │  There\'s a difference.                                             │
    │                                                                     │
    │  And understanding that difference changes how you build           │
    │  systems that actually work.                                       │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘


    This isn\'t a philosophical distinction.
    It\'s an engineering choice.

    And the most successful AI systems in the world
    are making the same choice Deep Blue made:

    They\'re optimizing for capability.
    Not intelligence.

    This document explains why.`
    },
    {
      type: 'header',
      text: 'Part I: The Tradeoff Nobody Talks About'
    },
    {
      type: 'subheader',
      text: '1.1 Intelligence vs. Capability: A Definition'
    },
    {
      type: 'text',
      text: 'Let\'s be precise about what these words mean:'
    },
    {
      type: 'diagram',
      diagramType: 'comparison',
      data: {
        title: 'The Distinction: Intelligence vs Capability',
        leftColumn: {
          title: 'Intelligence',
          icon: 'brain',
          items: [
            {
              category: 'Core Abilities',
              items: [
                'Understand underlying principles',
                'Transfer knowledge to new domains',
                'Reason about novel situations',
                'Explain WHY something works',
                'Generalize from limited examples'
              ]
            },
            {
              category: 'Characteristics',
              items: [
                'Portable across contexts',
                'Requires fewer training examples',
                'Enables creativity and invention',
                'Often slower and more resource-intensive'
              ]
            }
          ]
        },
        rightColumn: {
          title: 'Capability',
          icon: 'zap',
          items: [
            {
              category: 'Core Abilities',
              items: [
                'Perform specific tasks reliably',
                'Achieve measurable outcomes',
                'Execute complex procedures',
                'Deliver results within constraints',
                'Scale to thousands of instances'
              ]
            },
            {
              category: 'Characteristics',
              items: [
                'Context-dependent (doesn\'t transfer)',
                'Requires more training data',
                'Efficient within narrow domains',
                'Often faster and more resource-efficient'
              ]
            }
          ]
        },
        insight: {
          title: 'Key Insight',
          text: 'You can be highly capable without being intelligent. A calculator is incredibly capable at arithmetic but has zero understanding of what numbers are. A GPS is incredibly capable at navigation but has zero understanding of what "going somewhere" means. Most AI systems work this way. And that\'s not a bug. It\'s a feature.'
        }
      }
    },
    {
      type: 'text',
      text: 'The assumption most people make is that capability comes from intelligence-that to do things well, you must first understand them deeply. This assumption feels intuitively correct. It\'s also empirically false for many of the most impressive AI systems ever built.'
    },
    {
      type: 'subheader',
      text: '1.2 Why This Matters Now'
    },
    {
      type: 'text',
      text: 'We\'re in an era where AI systems are becoming dramatically more capable. They can write code, generate images, have conversations, play games at superhuman levels, and control robots. It\'s tempting to interpret this as progress toward "artificial general intelligence"-toward systems that are genuinely smart.'
    },
    {
      type: 'text',
      text: 'But when you look closely at how these systems are actually designed, a different pattern emerges:'
    },
    {
      type: 'code',
      language: 'diagram',
      code: `THE PATTERN
═══════════════════════════════════════════════════════════════════════════

    WHAT IT LOOKS LIKE FROM OUTSIDE:
    ─────────────────────────────────

    "This AI beat the world champion at [X]!"
    "This AI can generate [X] better than most humans!"
    "This AI learned to [X] in just [Y] hours!"


    WHAT'S ACTUALLY HAPPENING:
    ──────────────────────────

    Massive compute → Thousands of trials → Statistical selection

    The system doesn\'t UNDERSTAND what it\'s doing.
    It has found patterns that produce results.


    WHY THIS MATTERS:
    ─────────────────

    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                     │
    │  If you\'re trying to BUILD AI systems:                             │
    │  └── You need to decide which tradeoff to make                     │
    │                                                                     │
    │  If you\'re trying to USE AI systems:                               │
    │  └── You need to understand what they can and can\'t do             │
    │                                                                     │
    │  If you\'re trying to COMPETE with AI systems:                      │
    │  └── You need to know where capability ends and intelligence       │
    │      begins-because that\'s where humans still have an edge         │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘`
    },
    {
      type: 'text',
      text: 'Three recent AI systems illuminate this tradeoff with unusual clarity. Each one made a deliberate choice about how to balance capability and intelligence. Understanding those choices reveals the engineering principles that make autonomous systems actually work.'
    },
    {
      type: 'header',
      text: 'Part II: Three Frameworks, Three Strategies'
    },
    {
      type: 'subheader',
      text: '2.1 Eureka: Pure Capability'
    },
    {
      type: 'text',
      text: 'In 2024, NVIDIA Research published Eureka-a system that generates reward functions for robotic reinforcement learning. Here\'s what makes it fascinating: Eureka achieved an 83% win rate against human experts at designing reward functions. It enabled the first-ever simulated robot to perform rapid pen spinning-a task that had defeated previous systems.'
    },
    {
      type: 'text',
      text: 'And Eureka has absolutely no understanding of reward function design.'
    },
    {
      type: 'diagram',
      diagramType: 'process',
      data: {
        title: 'Eureka: The Capability-First Philosophy',
        description: 'Input: Environment code (robot physics, task description) → Output: Executable Python reward functions → Method: Evolutionary search',
        steps: [
          {
            title: 'Generation Phase',
            icon: 'sparkles',
            description: 'LLM generates 16 candidate reward functions per iteration. No understanding required—just syntactically valid Python.',
            metrics: ['16 candidates per iteration']
          },
          {
            title: 'Evaluation Phase',
            icon: 'zap',
            description: 'GPU-accelerated simulation tests all candidates in parallel. Isaac Gym runs thousands of trials per candidate. Pure empirical measurement—does it work or not?',
            metrics: ['Thousands of trials per candidate', 'Parallel GPU execution']
          },
          {
            title: 'Selection Phase',
            icon: 'target',
            description: 'Best performers survive to next iteration. Winner selected purely on measured performance.',
            metrics: ['5 iterations × 16 candidates = 80 functions explored']
          },
          {
            title: 'Reflection Phase',
            icon: 'brain',
            description: 'System generates feedback about what worked. This isn\'t "understanding"—it\'s pattern recognition. Used to bias next generation\'s starting points.',
            metrics: []
          }
        ],
        insight: {
          title: 'Critical Insight',
          text: 'Eureka doesn\'t know WHY a reward function works. It only knows THAT it works. The generated rewards are often counterintuitive—a human expert would never have designed them that way. But they achieve better results than human-designed rewards.'
        },
        tradeoffs: {
          gains: [
            '83% win rate against human experts',
            '52% average improvement over human-designed rewards',
            'First-ever successful rapid pen spinning',
            'No need for reward engineering expertise'
          ],
          losses: [
            'Interpretability (can\'t easily explain the rewards)',
            'Transferability (rewards don\'t transfer to new tasks)',
            'Theoretical foundation (no principled reason it should work)',
            'Elegance (solutions are sometimes ugly but effective)'
          ]
        }
      }
    },
    {
      type: 'text',
      text: 'This is a pure capability play. Eureka doesn\'t understand reward functions. It doesn\'t need to. It has outsourced understanding entirely, replacing it with brute-force empirical search backed by GPU compute.'
    },
    {
      type: 'text',
      text: 'The philosophical implication is almost unsettling: expertise can be bypassed entirely if you have enough compute and a good selection mechanism.'
    },
    {
      type: 'subheader',
      text: '2.2 Voyager: Capability + Hybrid Intelligence'
    },
    {
      type: 'text',
      text: 'In 2023, researchers from NVIDIA, Caltech, UT Austin, and Stanford released Voyager-an agent that plays Minecraft and learns new skills over time. Voyager became the first LLM-powered agent to reach diamond-tier tools in Minecraft, achieving 15.3x improvement over baselines.'
    },
    {
      type: 'text',
      text: 'But Voyager\'s architecture is different from Eureka\'s. It\'s a hybrid-trading some pure capability for something that looks more like intelligence.'
    },
    {
      type: 'code',
      language: 'diagram',
      code: `VOYAGER: THE HYBRID STRATEGY
═══════════════════════════════════════════════════════════════════════════

    WHAT MAKES VOYAGER DIFFERENT:
    ─────────────────────────────

    Voyager doesn\'t just generate and test.
    It ACCUMULATES SKILLS over time.

    And it uses documentation as a form of knowledge transfer.


    THE THREE COMPONENTS:
    ─────────────────────

    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                     │
    │  COMPONENT 1: AUTOMATIC CURRICULUM                                 │
    │  ─────────────────────────────────                                 │
    │                                                                     │
    │  Instead of random exploration, Voyager generates its own          │
    │  learning objectives: progressively harder challenges              │
    │  calibrated to current skill level.                                │
    │                                                                     │
    │  This isn\'t "intelligence" in the human sense-                     │
    │  but it\'s more than pure capability.                               │
    │  It\'s adaptive self-direction.                                     │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘

    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                     │
    │  COMPONENT 2: SKILL LIBRARY                                        │
    │  ───────────────────────────                                       │
    │                                                                     │
    │  Every successful behavior becomes a reusable skill.               │
    │  Skills are stored as executable code with semantic labels.        │
    │  New tasks retrieve and compose existing skills.                   │
    │                                                                     │
    │  Example skill chain:                                              │
    │  mineDiamond() = mineIron() + craftIronPickaxe() + findDiamondOre()│
    │                                                                     │
    │  This creates COMPOUND LEARNING-                                   │
    │  new capabilities build on previous ones.                          │
    │                                                                     │
    │  96.5% retrieval accuracy for finding relevant skills              │
    │  3.3x more item discovery than baselines                           │
    │  2.3x longer exploration distances                                 │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘

    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                     │
    │  COMPONENT 3: ITERATIVE PROMPTING WITH THREE FEEDBACK TYPES        │
    │  ───────────────────────────────────────────────────────────       │
    │                                                                     │
    │  When a skill fails, Voyager doesn\'t just retry.                   │
    │  It analyzes WHY it failed:                                        │
    │                                                                     │
    │  ├── Environment state (what happened in the game?)                │
    │  ├── Execution errors (did the code crash?)                        │
    │  └── Self-verification (did we achieve the goal?)                  │
    │                                                                     │
    │  This is closer to reasoning-but still limited.                    │
    │  It\'s diagnosis, not deep understanding.                           │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘


    THE INTELLIGENCE SOURCE:
    ────────────────────────

    Here\'s the subtle part: Voyager\'s "intelligence" comes from GPT-4.

    GPT-4 already knows Minecraft-game mechanics, crafting recipes,
    community strategies, everything from its training data.

    Voyager doesn\'t LEARN Minecraft from scratch.
    It uses GPT-4\'s knowledge as "documentation" it can read.

    The skill library then converts that knowledge into
    EXECUTABLE CAPABILITY that persists and compounds.


    WHAT THIS REVEALS:
    ──────────────────

    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                     │
    │  You can trade between intelligence and capability.                │
    │                                                                     │
    │  Voyager imports intelligence (GPT-4\'s knowledge)                  │
    │  and exports capability (executable skill library)                 │
    │                                                                     │
    │  The system itself isn\'t smart.                                    │
    │  But it\'s connected to something that is.                          │
    │  And it builds on that connection systematically.                  │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘`
    },
    {
      type: 'text',
      text: 'Voyager represents a middle path. It\'s not pure brute-force like Eureka, but it\'s not genuinely intelligent either. It\'s clever architecture: use intelligence where it\'s available (GPT-4\'s pre-trained knowledge), and convert it into durable capability (the skill library).'
    },
    {
      type: 'text',
      text: 'The skill library is the key innovation. It prevents catastrophic forgetting-Voyager doesn\'t lose capabilities over time. And it enables compositional learning-complex skills emerge from combining simple ones.'
    },
    {
      type: 'subheader',
      text: '2.3 AlphaEvolve: Evolutionary Intelligence'
    },
    {
      type: 'text',
      text: 'In May 2025, Google DeepMind released AlphaEvolve-a system that uses evolutionary algorithms to discover novel solutions to hard mathematical and computational problems. AlphaEvolve discovered a new algorithm for 4×4 complex matrix multiplication using only 48 multiplications-the first improvement to Strassen\'s 1969 algorithm in 56 years.'
    },
    {
      type: 'text',
      text: 'AlphaEvolve\'s approach is different from both Eureka and Voyager:'
    },
    {
      type: 'code',
      language: 'diagram',
      code: `ALPHAEVOLVE: EVOLUTION AS OPTIMIZATION
═══════════════════════════════════════════════════════════════════════════

    WHAT ALPHAEVOLVE DOES:
    ──────────────────────

    Finds novel solutions to problems with clear evaluation criteria.

    Results:
    ├── 48-multiplication algorithm for 4×4 complex matrices
    │   (first improvement since 1969)
    ├── 0.7% recovery of Google data center compute resources
    ├── 23% Gemini kernel speedup (reducing total training time by 1%)
    └── Matched or improved state-of-the-art on 75% of 50 math problems


    HOW IT WORKS:
    ─────────────

    NOT hierarchical task decomposition (as the name might suggest)
    INSTEAD: evolutionary iterative refinement

    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                     │
    │  STAGE 1: PROBLEM DEFINITION                                       │
    │  ───────────────────────────                                       │
    │  Define the problem with marked "evolution blocks"                 │
    │  These are code sections that will be modified                     │
    │                                                                     │
    │  STAGE 2: DATABASE INITIALIZATION                                  │
    │  ────────────────────────────────                                  │
    │  Use MAP-Elites algorithm to maintain diverse population           │
    │  Not just "best" solutions-diverse good solutions                  │
    │                                                                     │
    │  STAGE 3: PROMPT SAMPLING                                          │
    │  ─────────────────────────                                         │
    │  Select parent programs for improvement                            │
    │  Bias toward high-performing but underexplored regions             │
    │                                                                     │
    │  STAGE 4: LLM ENSEMBLE GENERATION                                  │
    │  ────────────────────────────────                                  │
    │  Gemini 2.0 Flash for breadth (many variations)                    │
    │  Gemini Pro for depth (careful improvements)                       │
    │  Generate mutated versions of parent programs                      │
    │                                                                     │
    │  STAGE 5: AUTOMATED EVALUATION                                     │
    │  ─────────────────────────────                                     │
    │  Correctness verification (does it produce right answer?)          │
    │  Performance profiling (how fast/efficient is it?)                 │
    │  Must have automated objective evaluation                          │
    │                                                                     │
    │  STAGE 6: SELECTION WITH DIVERSITY                                 │
    │  ──────────────────────────────                                    │
    │  Keep solutions that are good AND different                        │
    │  Prevents convergence to local optima                              │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘


    THE KEY DIFFERENCE:
    ───────────────────

    AlphaEvolve operates over DAYS to WEEKS.
    Thousands of evaluations.
    1000x greater sample efficiency than naive LLM sampling.

    It finds solutions humans have never found-
    but only for problems where:
    ├── You can automatically evaluate correctness
    ├── You can automatically measure performance
    └── You can wait days for results


    WHAT IT REVEALS ABOUT INTELLIGENCE:
    ────────────────────────────────────

    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                     │
    │  AlphaEvolve discovers breakthrough algorithms.                    │
    │  It does NOT understand why they work.                             │
    │                                                                     │
    │  The 48-multiplication matrix algorithm is correct.                │
    │  AlphaEvolve cannot explain its mathematical significance.         │
    │                                                                     │
    │  This is capability without understanding.                         │
    │  Discovery without comprehension.                                  │
    │                                                                     │
    │  The implications are strange:                                     │
    │  We may end up using algorithms we can\'t explain,                  │
    │  discovered by systems that don\'t understand them,                 │
    │  verified only by empirical testing.                               │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘`
    },
    {
      type: 'header',
      text: 'Part III: The Skill Library Architecture'
    },
    {
      type: 'subheader',
      text: '3.1 Why Skills Matter More Than Intelligence'
    },
    {
      type: 'text',
      text: 'Across all three systems, a pattern emerges: the ability to accumulate and compose skills is more valuable than raw intelligence for getting things done.'
    },
    {
      type: 'code',
      language: 'diagram',
      code: `THE SKILL LIBRARY PATTERN
═══════════════════════════════════════════════════════════════════════════

    WHAT A SKILL IS:
    ────────────────

    A skill is a unit of executable capability with:

    ├── Clear trigger conditions (when to use it)
    ├── Defined inputs and outputs
    ├── Success criteria (how to verify it worked)
    ├── Failure modes (what can go wrong)
    └── Composition potential (how it combines with other skills)


    WHY SKILLS COMPOUND:
    ────────────────────

    Linear learning: Each new thing is independent

        Skill 1    Skill 2    Skill 3    Skill 4
           ○          ○          ○          ○

        Capability = 4 skills


    Compositional learning: Skills combine into new capabilities

                         Skill 5 (= 1 + 2)
                              ○
                             / \\
        Skill 1 ─────────── ○   ○ ─────────── Skill 2
                           / \\ / \\
                          ○   ○   ○
                         /   / \\   \\
                        ○   ○   ○   ○
                       1   2   3   4

        Base skills = 4
        Composite skills = 2^4 - 1 = 15 potential combinations
        Capability grows EXPONENTIALLY with linear skill addition


    THIS IS WHY VOYAGER WORKS:
    ──────────────────────────

    mineDiamond() isn\'t learned from scratch.
    It composes: mineIron() + craftIronPickaxe() + findDiamondOre()

    Each base skill was learned once.
    Complex behaviors emerge from composition.

    96.5% retrieval accuracy means the right skills are found.
    Composition means capability grows faster than learning time.`
    },
    {
      type: 'subheader',
      text: '3.2 The Skill Library as External Memory'
    },
    {
      type: 'text',
      text: 'One of the most important design patterns in these systems is treating the skill library as a form of external memory-a persistent store that survives beyond any single task or session.'
    },
    {
      type: 'code',
      language: 'diagram',
      code: `SKILL LIBRARY ARCHITECTURE
═══════════════════════════════════════════════════════════════════════════

    STORAGE FORMAT:
    ───────────────

    Each skill is stored with rich metadata:

    {
      "name": "mine_iron_ore",
      "description": "Locate and mine iron ore deposits",

      "prerequisites": [
        "craft_stone_pickaxe",
        "navigate_underground"
      ],

      "implementation": "// executable code...",

      "success_criteria": "inventory contains iron_ore >= 1",

      "failure_modes": [
        "pickaxe breaks mid-mining",
        "fall damage in caves",
        "mob encounters"
      ],

      "complexity_level": 4,

      "composition_potential": [
        "smelt_iron_ore",
        "craft_iron_tools",
        "build_iron_golem"
      ],

      "success_count": 47,
      "failure_count": 3,
      "success_rate": 0.94,

      "last_used": "2025-12-03T14:22:00Z",
      "last_improved": "2025-11-28T09:15:00Z"
    }


    RETRIEVAL MECHANISM:
    ────────────────────

    When facing a new task:

    1. SEMANTIC SEARCH
       ─────────────────
       Embed the task description
       Find skills with similar embeddings

    2. PREREQUISITE CHECK
       ───────────────────
       For each candidate skill, verify prerequisites are met
       If not, recursively retrieve prerequisites

    3. COMPOSITION PLANNING
       ─────────────────────
       If no single skill matches, attempt composition
       "mine_diamond" = compose(mine_iron, craft_iron_pickaxe, find_diamond)

    4. GAP IDENTIFICATION
       ───────────────────
       If composition still fails, identify missing skill
       Add to learning curriculum


    EVOLUTIONARY PRESSURE:
    ──────────────────────

    Skills that consistently fail get pruned.
    Skills that consistently succeed get promoted.
    Skills that are never used decay in priority.

    This creates natural optimization:
    The library evolves toward higher-value skills.`
    },
    {
      type: 'subheader',
      text: '3.3 The Curriculum Problem'
    },
    {
      type: 'text',
      text: 'A skill library is only as good as the skills in it. But how do you decide what skills to learn? This is the curriculum problem-and it\'s where the three systems diverge most sharply.'
    },
    {
      type: 'diagram',
      diagramType: 'cards',
      data: {
        title: 'Three Approaches to Curriculum',
        cards: [
          {
            title: 'Eureka: No Curriculum',
            icon: 'zap',
            description: 'Eureka doesn\'t learn progressively. Each problem is solved independently. No skill accumulation across tasks.',
            details: [
              { label: 'Advantage', value: 'No curriculum design needed', type: 'pro' },
              { label: 'Advantage', value: 'Each problem solved optimally', type: 'pro' },
              { label: 'Disadvantage', value: 'Can\'t build on previous work', type: 'con' },
              { label: 'Disadvantage', value: 'Reinvents wheel for each task', type: 'con' }
            ]
          },
          {
            title: 'Voyager: Automatic Curriculum',
            icon: 'target',
            highlight: true,
            description: 'Voyager generates its own learning objectives with progressive difficulty calibration.',
            details: [
              { label: 'Target Success Rate', value: '60-80% (Zone of Proximal Development)', type: 'metric' },
              { label: 'Pro', value: 'Progressive skill building', type: 'pro' },
              { label: 'Pro', value: 'Compound learning effects', type: 'pro' },
              { label: 'Con', value: 'Requires well-defined difficulty metrics', type: 'con' },
              { label: 'Con', value: 'May miss valuable skills outside progression', type: 'con' }
            ],
            process: [
              'Assess current skill library',
              'Identify highest mastered complexity level',
              'Generate task ONE level harder OR filling a gap',
              'Ensure task has clear success criteria',
              'Attempt task',
              'If success: add skill, increase complexity',
              'If failure: analyze, refine, or drop back'
            ]
          },
          {
            title: 'AlphaEvolve: Evolutionary Curriculum',
            icon: 'branch',
            description: 'AlphaEvolve uses diversity as implicit curriculum through parallel exploration of solution space.',
            details: [
              { label: 'Mechanism', value: 'MAP-Elites maintains population across multiple dimensions', type: 'info' },
              { label: 'Pro', value: 'Discovers unexpected solutions', type: 'pro' },
              { label: 'Pro', value: 'No difficulty metrics needed', type: 'pro' },
              { label: 'Con', value: 'Requires massive compute', type: 'con' },
              { label: 'Con', value: 'No skill transfer between problems', type: 'con' }
            ]
          }
        ]
      }
    },
    {
      type: 'header',
      text: 'Part IV: The Design Space'
    },
    {
      type: 'subheader',
      text: '4.1 Choosing Your Tradeoff'
    },
    {
      type: 'text',
      text: 'If you\'re building autonomous systems, you face the same choice these frameworks faced. Here\'s how to think about it:'
    },
    {
      type: 'diagram',
      diagramType: 'matrix',
      data: {
        title: 'The Decision Framework: Choosing Your Tradeoff',
        questions: [
          {
            question: 'Can you automatically evaluate success?',
            options: [
              { condition: 'YES', recommendation: 'Capability-first approaches are viable (Eureka, AlphaEvolve patterns)' },
              { condition: 'NO', recommendation: 'You need human-in-the-loop or proxy metrics. Pure evolutionary approaches won\'t work' }
            ]
          },
          {
            question: 'Do tasks share structure?',
            options: [
              { condition: 'YES', recommendation: 'Skill library architecture makes sense (Voyager pattern). Investment in skills pays off over time' },
              { condition: 'NO', recommendation: 'Each task is independent (Eureka pattern). Skill accumulation has no value' }
            ]
          },
          {
            question: 'How much compute do you have?',
            options: [
              { condition: 'MASSIVE', recommendation: 'Evolutionary approaches viable (AlphaEvolve pattern)' },
              { condition: 'LIMITED', recommendation: 'Need efficient skill retrieval (Voyager) or pre-trained capability (Eureka with smaller search)' }
            ]
          },
          {
            question: 'Do you need to explain results?',
            options: [
              { condition: 'YES', recommendation: 'Capability-first approaches are problematic. Generated solutions may be uninterpretable' },
              { condition: 'NO', recommendation: 'Pure capability is fine. Results justify themselves' }
            ]
          }
        ],
        matrix: {
          headers: ['Approach', 'Auto-eval possible?', 'Shared structure?', 'Compute available?'],
          rows: [
            {
              approach: 'Eureka-style (pure search)',
              autoEval: 'Required',
              sharedStructure: 'Not needed',
              compute: 'Moderate'
            },
            {
              approach: 'Voyager-style (skill library)',
              autoEval: 'Helpful',
              sharedStructure: 'Required',
              compute: 'Low-Moderate',
              highlight: true
            },
            {
              approach: 'AlphaEvolve (evolutionary)',
              autoEval: 'Required',
              sharedStructure: 'Per-problem',
              compute: 'Massive'
            }
          ]
        }
      }
    },
    {
      type: 'subheader',
      text: '4.2 The Hybrid Architecture'
    },
    {
      type: 'text',
      text: 'In practice, the most effective systems combine elements from all three approaches:'
    },
    {
      type: 'code',
      language: 'diagram',
      code: `THE HYBRID PATTERN
═══════════════════════════════════════════════════════════════════════════

    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                     │
    │                    ORCHESTRATOR LAYER                              │
    │                    ─────────────────                               │
    │         (Uses pre-trained LLM intelligence)                        │
    │                                                                     │
    │    ┌──────────────────────────────────────────────────────────┐    │
    │    │                                                          │    │
    │    │  • Task decomposition                                    │    │
    │    │  • Skill selection                                       │    │
    │    │  • Failure diagnosis                                     │    │
    │    │  • Curriculum generation                                 │    │
    │    │                                                          │    │
    │    └──────────────────────────────────────────────────────────┘    │
    │                            │                                       │
    │              ┌─────────────┼─────────────┐                         │
    │              ▼             ▼             ▼                         │
    │    ┌──────────────┐ ┌──────────────┐ ┌──────────────┐              │
    │    │              │ │              │ │              │              │
    │    │ SKILL        │ │ EVOLUTIONARY │ │ SEARCH       │              │
    │    │ LIBRARY      │ │ REFINEMENT   │ │ MECHANISM    │              │
    │    │              │ │              │ │              │              │
    │    │ (Voyager)    │ │ (AlphaEvolve)│ │ (Eureka)     │              │
    │    │              │ │              │ │              │              │
    │    └──────────────┘ └──────────────┘ └──────────────┘              │
    │           │                │                │                      │
    │           └────────────────┼────────────────┘                      │
    │                            ▼                                       │
    │                    ┌──────────────┐                                │
    │                    │              │                                │
    │                    │  EXECUTION   │                                │
    │                    │  ENVIRONMENT │                                │
    │                    │              │                                │
    │                    │  (Real world │                                │
    │                    │   or sim)    │                                │
    │                    │              │                                │
    │                    └──────────────┘                                │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘


    HOW THE LAYERS INTERACT:
    ────────────────────────

    1. New task arrives at orchestrator

    2. Orchestrator checks skill library:
       - If matching skill exists: execute directly
       - If composable from existing skills: compose and execute
       - If gap identified: send to evolutionary refinement

    3. Evolutionary refinement generates candidates:
       - Uses search mechanism to explore variations
       - Tests candidates in execution environment
       - Promotes successful patterns to skill library

    4. Skill library grows over time:
       - New skills added from successful evolutionary runs
       - Underperforming skills pruned
       - Compound skills emerge from composition

    5. Orchestrator learns which approach works for which task type:
       - Direct skill retrieval for routine tasks
       - Evolutionary refinement for novel challenges
       - Full search for breakthrough problems`
    },
    {
      type: 'header',
      text: 'Part V: What This Means for Humans'
    },
    {
      type: 'subheader',
      text: '5.1 The Uncomfortable Parallel'
    },
    {
      type: 'text',
      text: 'Here\'s the part that might be personally relevant: the capability-vs-intelligence tradeoff applies to humans too.'
    },
    {
      type: 'code',
      language: 'diagram',
      code: `THE HUMAN PARALLEL
═══════════════════════════════════════════════════════════════════════════

    CONSIDER TWO APPROACHES TO LEARNING:
    ────────────────────────────────────

    APPROACH A: INTELLIGENCE-FIRST
    ──────────────────────────────

    "I need to deeply understand the theory before I can do anything."

    ├── Study fundamentals exhaustively
    ├── Build complete mental model
    ├── Understand WHY before HOW
    └── Only then attempt practice

    Feels rigorous.
    Often leads to paralysis.


    APPROACH B: CAPABILITY-FIRST
    ────────────────────────────

    "I\'ll learn by doing and pick up theory as needed."

    ├── Start with simplest executable task
    ├── Build skill through repetition
    ├── Add theory when current skills plateau
    └── Compound skills into complex capabilities

    Feels messy.
    Often produces faster results.


    THE VOYAGER LESSON FOR HUMANS:
    ──────────────────────────────

    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                     │
    │  Voyager doesn\'t understand Minecraft deeply.                      │
    │  It has a library of things it can DO in Minecraft.                │
    │                                                                     │
    │  Each skill was learned through attempt → feedback → refinement.   │
    │  Complex capabilities emerged from composing simple skills.        │
    │                                                                     │
    │  The intelligence (GPT-4\'s knowledge) was used to GUIDE            │
    │  skill acquisition-not to replace it.                              │
    │                                                                     │
    │  This is remarkably similar to how expertise develops in humans:   │
    │                                                                     │
    │  Expert performance = accumulated skills + strategic knowledge     │
    │                                                                     │
    │  Not: deep understanding → automatic performance                   │
    │  But: practiced skills + understanding of when to use them         │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘`
    },
    {
      type: 'subheader',
      text: '5.2 The Skill Library for Humans'
    },
    {
      type: 'text',
      text: 'What would it look like to apply the Voyager pattern to human learning?'
    },
    {
      type: 'code',
      language: 'diagram',
      code: `HUMAN SKILL LIBRARY ARCHITECTURE
═══════════════════════════════════════════════════════════════════════════

    INSTEAD OF:
    ───────────

    "I learned Python" (vague capability claim)


    BUILD:
    ──────

    SKILL: parse_json_file
    ─────────────────────
    Prerequisites: file_io, json_module
    Success criteria: Data extracted without errors
    Complexity: 2/10
    Composition: Used in web_scraping, api_integration, data_pipeline

    SKILL: web_scraping
    ───────────────────
    Prerequisites: parse_json_file, http_requests, html_parsing
    Success criteria: Target data retrieved from live website
    Complexity: 5/10
    Composition: Used in market_research, price_monitoring

    SKILL: build_rest_api
    ─────────────────────
    Prerequisites: http_protocol, json_handling, routing, authentication
    Success criteria: API responds correctly to test suite
    Complexity: 6/10
    Composition: Used in web_app, mobile_backend, microservice


    THE CURRICULUM EMERGES:
    ───────────────────────

    Level 1-2: file_io, variables, loops, json_module
    Level 3-4: http_requests, html_parsing, parse_json_file
    Level 5-6: web_scraping, build_rest_api
    Level 7-8: Full web application, data pipeline

    Each level composes previous skills.
    Complex capabilities emerge from practiced basics.


    THE 60-80% RULE:
    ────────────────

    If you\'re succeeding >80% of the time: You\'re not learning.
    If you\'re succeeding <60% of the time: You\'re frustrated.

    Optimal learning happens at the edge of current capability.
    Voyager calibrates to this automatically.
    You can too-by choosing tasks that feel challenging but achievable.`
    },
    {
      type: 'header',
      text: 'Part VI: The Bigger Picture'
    },
    {
      type: 'subheader',
      text: '6.1 Why This Matters for What We Build'
    },
    {
      type: 'text',
      text: 'The capability-intelligence tradeoff isn\'t just academic. It shapes how we design every autonomous system:'
    },
    {
      type: 'diagram',
      diagramType: 'cards',
      data: {
        title: 'Design Principles from the Tradeoff',
        cards: [
          {
            title: 'Principle 1: Capability Compounds, Intelligence Doesn\'t',
            icon: 'layers',
            description: 'A skill library grows more valuable over time. Raw intelligence is always starting from scratch.',
            details: [
              { label: 'Implication', value: 'Invest in skill accumulation infrastructure. Every successful execution should leave an artifact.', type: 'info' }
            ]
          },
          {
            title: 'Principle 2: Evaluation is the Bottleneck',
            icon: 'target',
            description: 'Eureka and AlphaEvolve only work because they can automatically evaluate success.',
            details: [
              { label: 'Implication', value: 'Before building capability systems, build evaluation systems. If you can\'t measure success, you can\'t iterate toward it.', type: 'info' }
            ]
          },
          {
            title: 'Principle 3: Composition Beats Creation',
            icon: 'branch',
            description: 'Voyager\'s power comes from composing existing skills, not from creating new ones from scratch.',
            details: [
              { label: 'Implication', value: 'Design skills to be composable. Clear inputs, outputs, and interfaces.', type: 'info' }
            ]
          },
          {
            title: 'Principle 4: Intelligence is for Orchestration',
            icon: 'brain',
            description: 'The "smart" part of these systems is the orchestrator—deciding what to try, when to compose, when to search. The "capable" part is the skill library and evaluation.',
            details: [
              { label: 'Implication', value: 'Use intelligence where it matters most (high-level decisions), and capability where it matters most (reliable execution).', type: 'info' }
            ]
          },
          {
            title: 'Principle 5: The Tradeoff is a Choice',
            icon: 'sparkles',
            highlight: true,
            description: 'You don\'t have to pick one extreme. Hybrid architectures combine both.',
            details: [
              { label: 'Implication', value: 'Map your problem space. Some tasks need intelligence (novel situations). Some tasks need capability (routine operations). Build systems that allocate appropriately.', type: 'info' }
            ]
          }
        ]
      }
    },
    {
      type: 'subheader',
      text: '6.2 The Question Behind the Question'
    },
    {
      type: 'text',
      text: 'The real question isn\'t "capability or intelligence?"'
    },
    {
      type: 'text',
      text: 'The real question is: "What are you trying to accomplish?"'
    },
    {
      type: 'code',
      language: 'diagram',
      code: `THE FINAL FRAMEWORK
═══════════════════════════════════════════════════════════════════════════

    IF YOUR GOAL IS:                   OPTIMIZE FOR:
    ─────────────────                  ─────────────

    Reliable execution of              CAPABILITY
    known task types                   (Skill library, strong evaluation)

    Handling novel situations          INTELLIGENCE
    with no precedent                  (Reasoning, transfer, explanation)

    Continuous improvement             HYBRID
    over time                          (Capability accumulation guided
                                        by intelligent orchestration)

    Breakthrough discoveries           EVOLUTIONARY
    in well-defined spaces             (Massive search with auto-eval)


    THE SYSTEMS WE BUILD:
    ─────────────────────

    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                     │
    │  Digital twins of autonomous facilities need:                      │
    │                                                                     │
    │  ├── CAPABILITY for routine operations                             │
    │  │   (monitoring, control, optimization)                           │
    │  │                                                                 │
    │  ├── INTELLIGENCE for novel problems                               │
    │  │   (diagnosis, adaptation, planning)                             │
    │  │                                                                 │
    │  └── EVOLUTION for continuous improvement                          │
    │      (discovering better configurations over time)                 │
    │                                                                     │
    │  The same hybrid architecture.                                     │
    │  Applied to real-world systems.                                    │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘`
    },
    {
      type: 'header',
      text: 'Conclusion: The Capability Trap'
    },
    {
      type: 'text',
      text: 'The "capability trap" isn\'t that capability is bad. It\'s that capability is seductive.'
    },
    {
      type: 'text',
      text: 'Systems that demonstrate impressive capability *look* intelligent. They beat world champions. They generate beautiful images. They write functional code. It\'s natural to assume something smart is happening under the hood.'
    },
    {
      type: 'text',
      text: 'But often, something different is happening: massive search, statistical selection, skill composition, evolutionary refinement. The results are real. The "intelligence" is an illusion.'
    },
    {
      type: 'text',
      text: 'This isn\'t a criticism. It\'s an insight. Understanding the distinction helps you:'
    },
    {
      type: 'text',
      text: 'Build systems that actually work (optimize for the right thing).\nUse AI systems effectively (know their limits).\nDevelop your own skills (capability-first, intelligence-guided).'
    },
    {
      type: 'text',
      text: 'The AI that beats you at chess isn\'t smart.'
    },
    {
      type: 'text',
      text: 'It\'s capable.'
    },
    {
      type: 'text',
      text: 'And now you know the difference.'
    },
    {
      type: 'quote',
      text: 'Capability gets things done.\n\nIntelligence knows why.\n\nThe best systems combine both.\n\n-zer0 Research, December 2025'
    }
  ]
};
