# The Capability Trap
## Why the AI That Beats You at Chess Isn't Actually Smart

*A zer0 Research Document — December 2025*

---

```
THE UNCOMFORTABLE QUESTION
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
    │  Deep Blue wasn't intelligent.                                     │
    │  It was capable.                                                   │
    │                                                                     │
    │  There's a difference.                                             │
    │                                                                     │
    │  And understanding that difference changes how you build           │
    │  systems that actually work.                                       │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘
    
    
    This isn't a philosophical distinction.
    It's an engineering choice.
    
    And the most successful AI systems in the world
    are making the same choice Deep Blue made:
    
    They're optimizing for capability.
    Not intelligence.
    
    This document explains why.
```

---

# Part I: The Tradeoff Nobody Talks About

## 1.1 Intelligence vs. Capability: A Definition

Let's be precise about what these words mean:

```
THE DISTINCTION
═══════════════════════════════════════════════════════════════════════════

    INTELLIGENCE
    ────────────
    
    The ability to:
    ├── Understand underlying principles
    ├── Transfer knowledge to new domains
    ├── Reason about novel situations
    ├── Explain WHY something works
    └── Generalize from limited examples
    
    Characteristics:
    ├── Portable across contexts
    ├── Requires fewer training examples
    ├── Enables creativity and invention
    └── Often slower and more resource-intensive
    
    
    CAPABILITY
    ──────────
    
    The ability to:
    ├── Perform specific tasks reliably
    ├── Achieve measurable outcomes
    ├── Execute complex procedures
    ├── Deliver results within constraints
    └── Scale to thousands of instances
    
    Characteristics:
    ├── Context-dependent (doesn't transfer automatically)
    ├── Requires more training data or examples
    ├── Efficient within narrow domains
    └── Often faster and more resource-efficient
    
    
    THE KEY INSIGHT:
    ────────────────
    
    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                     │
    │  You can be highly capable without being intelligent.              │
    │                                                                     │
    │  A calculator is incredibly capable at arithmetic.                 │
    │  It has zero understanding of what numbers are.                    │
    │                                                                     │
    │  A GPS is incredibly capable at navigation.                        │
    │  It has zero understanding of what "going somewhere" means.        │
    │                                                                     │
    │  Most AI systems work this way.                                    │
    │  And that's not a bug. It's a feature.                            │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘
```

The assumption most people make is that capability comes from intelligence—that to do things well, you must first understand them deeply. This assumption feels intuitively correct. It's also empirically false for many of the most impressive AI systems ever built.

## 1.2 Why This Matters Now

We're in an era where AI systems are becoming dramatically more capable. They can write code, generate images, have conversations, play games at superhuman levels, and control robots. It's tempting to interpret this as progress toward "artificial general intelligence"—toward systems that are genuinely smart.

But when you look closely at how these systems are actually designed, a different pattern emerges:

```
THE PATTERN
═══════════════════════════════════════════════════════════════════════════

    WHAT IT LOOKS LIKE FROM OUTSIDE:
    ─────────────────────────────────
    
    "This AI beat the world champion at [X]!"
    "This AI can generate [X] better than most humans!"
    "This AI learned to [X] in just [Y] hours!"
    
    
    WHAT'S ACTUALLY HAPPENING:
    ──────────────────────────
    
    Massive compute → Thousands of trials → Statistical selection
    
    The system doesn't UNDERSTAND what it's doing.
    It has found patterns that produce results.
    
    
    WHY THIS MATTERS:
    ─────────────────
    
    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                     │
    │  If you're trying to BUILD AI systems:                             │
    │  └── You need to decide which tradeoff to make                     │
    │                                                                     │
    │  If you're trying to USE AI systems:                               │
    │  └── You need to understand what they can and can't do             │
    │                                                                     │
    │  If you're trying to COMPETE with AI systems:                      │
    │  └── You need to know where capability ends and intelligence       │
    │      begins—because that's where humans still have an edge         │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘
```

Three recent AI systems illuminate this tradeoff with unusual clarity. Each one made a deliberate choice about how to balance capability and intelligence. Understanding those choices reveals the engineering principles that make autonomous systems actually work.

---

# Part II: Three Frameworks, Three Strategies

## 2.1 Eureka: Pure Capability

In 2024, NVIDIA Research published Eureka—a system that generates reward functions for robotic reinforcement learning. Here's what makes it fascinating: Eureka achieved an 83% win rate against human experts at designing reward functions. It enabled the first-ever simulated robot to perform rapid pen spinning—a task that had defeated previous systems.

And Eureka has absolutely no understanding of reward function design.

```
EUREKA: THE CAPABILITY-FIRST PHILOSOPHY
═══════════════════════════════════════════════════════════════════════════

    WHAT EUREKA DOES:
    ─────────────────
    
    Input: Environment code (robot physics, task description)
    Output: Executable Python reward functions
    Method: Evolutionary search across thousands of candidates
    
    
    HOW IT WORKS:
    ─────────────
    
    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                     │
    │  GENERATION PHASE                                                  │
    │  ────────────────                                                  │
    │  LLM generates 16 candidate reward functions per iteration         │
    │  No understanding required—just syntactically valid Python         │
    │                                                                     │
    │  EVALUATION PHASE                                                  │
    │  ────────────────                                                  │
    │  GPU-accelerated simulation tests all candidates in parallel       │
    │  Isaac Gym runs thousands of trials per candidate                  │
    │  Pure empirical measurement—does it work or not?                   │
    │                                                                     │
    │  SELECTION PHASE                                                   │
    │  ───────────────                                                   │
    │  Best performers survive to next iteration                         │
    │  5 iterations × 16 candidates = 80 reward functions explored       │
    │  Winner selected purely on measured performance                    │
    │                                                                     │
    │  REFLECTION PHASE                                                  │
    │  ────────────────                                                  │
    │  System generates feedback about what worked                       │
    │  This isn't "understanding"—it's pattern recognition               │
    │  Used to bias next generation's starting points                    │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘
    
    
    THE CRITICAL INSIGHT:
    ─────────────────────
    
    Eureka doesn't know WHY a reward function works.
    It only knows THAT it works.
    
    The generated rewards are often counterintuitive—
    a human expert would never have designed them that way.
    But they achieve better results than human-designed rewards.
    
    
    WHAT EUREKA TRADES AWAY:
    ────────────────────────
    
    ├── Interpretability (you can't easily explain the rewards)
    ├── Transferability (rewards don't transfer to new tasks)
    ├── Theoretical foundation (no principled reason it should work)
    └── Elegance (solutions are sometimes ugly but effective)
    
    
    WHAT EUREKA GAINS:
    ──────────────────
    
    ├── 83% win rate against human experts
    ├── 52% average improvement over human-designed rewards
    ├── First-ever successful rapid pen spinning
    └── No need for reward engineering expertise
```

This is a pure capability play. Eureka doesn't understand reward functions. It doesn't need to. It has outsourced understanding entirely, replacing it with brute-force empirical search backed by GPU compute.

The philosophical implication is almost unsettling: expertise can be bypassed entirely if you have enough compute and a good selection mechanism.

## 2.2 Voyager: Capability + Hybrid Intelligence

In 2023, researchers from NVIDIA, Caltech, UT Austin, and Stanford released Voyager—an agent that plays Minecraft and learns new skills over time. Voyager became the first LLM-powered agent to reach diamond-tier tools in Minecraft, achieving 15.3x improvement over baselines.

But Voyager's architecture is different from Eureka's. It's a hybrid—trading some pure capability for something that looks more like intelligence.

```
VOYAGER: THE HYBRID STRATEGY
═══════════════════════════════════════════════════════════════════════════

    WHAT MAKES VOYAGER DIFFERENT:
    ─────────────────────────────
    
    Voyager doesn't just generate and test.
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
    │  This isn't "intelligence" in the human sense—                     │
    │  but it's more than pure capability.                               │
    │  It's adaptive self-direction.                                     │
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
    │  This creates COMPOUND LEARNING—                                   │
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
    │  When a skill fails, Voyager doesn't just retry.                   │
    │  It analyzes WHY it failed:                                        │
    │                                                                     │
    │  ├── Environment state (what happened in the game?)                │
    │  ├── Execution errors (did the code crash?)                        │
    │  └── Self-verification (did we achieve the goal?)                  │
    │                                                                     │
    │  This is closer to reasoning—but still limited.                    │
    │  It's diagnosis, not deep understanding.                           │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘
    
    
    THE INTELLIGENCE SOURCE:
    ────────────────────────
    
    Here's the subtle part: Voyager's "intelligence" comes from GPT-4.
    
    GPT-4 already knows Minecraft—game mechanics, crafting recipes,
    community strategies, everything from its training data.
    
    Voyager doesn't LEARN Minecraft from scratch.
    It uses GPT-4's knowledge as "documentation" it can read.
    
    The skill library then converts that knowledge into
    EXECUTABLE CAPABILITY that persists and compounds.
    
    
    WHAT THIS REVEALS:
    ──────────────────
    
    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                     │
    │  You can trade between intelligence and capability.                │
    │                                                                     │
    │  Voyager imports intelligence (GPT-4's knowledge)                  │
    │  and exports capability (executable skill library)                 │
    │                                                                     │
    │  The system itself isn't smart.                                    │
    │  But it's connected to something that is.                          │
    │  And it builds on that connection systematically.                  │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘
```

Voyager represents a middle path. It's not pure brute-force like Eureka, but it's not genuinely intelligent either. It's clever architecture: use intelligence where it's available (GPT-4's pre-trained knowledge), and convert it into durable capability (the skill library).

The skill library is the key innovation. It prevents catastrophic forgetting—Voyager doesn't lose capabilities over time. And it enables compositional learning—complex skills emerge from combining simple ones.

## 2.3 AlphaEvolve: Evolutionary Intelligence

In May 2025, Google DeepMind released AlphaEvolve—a system that uses evolutionary algorithms to discover novel solutions to hard mathematical and computational problems. AlphaEvolve discovered a new algorithm for 4×4 complex matrix multiplication using only 48 multiplications—the first improvement to Strassen's 1969 algorithm in 56 years.

AlphaEvolve's approach is different from both Eureka and Voyager:

```
ALPHAEVOLVE: EVOLUTION AS OPTIMIZATION
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
    │  Not just "best" solutions—diverse good solutions                  │
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
    
    It finds solutions humans have never found—
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
    │  We may end up using algorithms we can't explain,                  │
    │  discovered by systems that don't understand them,                 │
    │  verified only by empirical testing.                               │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘
```

---

# Part III: The Skill Library Architecture

## 3.1 Why Skills Matter More Than Intelligence

Across all three systems, a pattern emerges: the ability to accumulate and compose skills is more valuable than raw intelligence for getting things done.

```
THE SKILL LIBRARY PATTERN
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
                             / \
        Skill 1 ─────────── ○   ○ ─────────── Skill 2
                           / \ / \
                          ○   ○   ○
                         /   / \   \
                        ○   ○   ○   ○
                       1   2   3   4
    
        Base skills = 4
        Composite skills = 2^4 - 1 = 15 potential combinations
        Capability grows EXPONENTIALLY with linear skill addition
    
    
    THIS IS WHY VOYAGER WORKS:
    ──────────────────────────
    
    mineDiamond() isn't learned from scratch.
    It composes: mineIron() + craftIronPickaxe() + findDiamondOre()
    
    Each base skill was learned once.
    Complex behaviors emerge from composition.
    
    96.5% retrieval accuracy means the right skills are found.
    Composition means capability grows faster than learning time.
```

## 3.2 The Skill Library as External Memory

One of the most important design patterns in these systems is treating the skill library as a form of external memory—a persistent store that survives beyond any single task or session.

```
SKILL LIBRARY ARCHITECTURE
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
    The library evolves toward higher-value skills.
```

## 3.3 The Curriculum Problem

A skill library is only as good as the skills in it. But how do you decide what skills to learn? This is the curriculum problem—and it's where the three systems diverge most sharply.

```
THREE APPROACHES TO CURRICULUM
═══════════════════════════════════════════════════════════════════════════

    EUREKA: NO CURRICULUM
    ─────────────────────
    
    Eureka doesn't learn progressively.
    Each problem is solved independently.
    No skill accumulation across tasks.
    
    Advantage: No curriculum design needed
    Disadvantage: Can't build on previous work
    
    
    VOYAGER: AUTOMATIC CURRICULUM
    ─────────────────────────────
    
    Voyager generates its own learning objectives:
    
    1. Assess current skill library
    2. Identify highest mastered complexity level
    3. Generate task ONE level harder OR filling a gap
    4. Ensure task has clear success criteria
    5. Attempt task
    6. If success: add skill, increase complexity
       If failure: analyze, refine, or drop back
    
    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                     │
    │  TARGET SUCCESS RATE: 60-80%                                       │
    │                                                                     │
    │  Too easy (>80% success): Not learning, increase difficulty        │
    │  Too hard (<60% success): Frustrated, decrease difficulty          │
    │  Sweet spot: Challenging but achievable                            │
    │                                                                     │
    │  This matches research on human learning:                          │
    │  The "zone of proximal development"                                │
    │  Tasks just beyond current ability, but reachable with effort      │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘
    
    
    ALPHAEVOLVE: EVOLUTIONARY CURRICULUM
    ────────────────────────────────────
    
    AlphaEvolve uses diversity as implicit curriculum:
    
    MAP-Elites maintains population across multiple dimensions
    Selection biases toward underexplored regions
    "Curriculum" emerges from evolutionary pressure
    
    No explicit skill progression
    Instead: parallel exploration of solution space
    
    
    THE TRADEOFF:
    ─────────────
    
    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                     │
    │  AUTOMATIC CURRICULUM (Voyager)                                    │
    │  ├── Pro: Progressive skill building                               │
    │  ├── Pro: Compound learning effects                                │
    │  ├── Con: Requires well-defined difficulty metrics                 │
    │  └── Con: May miss valuable skills outside progression             │
    │                                                                     │
    │  EVOLUTIONARY CURRICULUM (AlphaEvolve)                             │
    │  ├── Pro: Discovers unexpected solutions                           │
    │  ├── Pro: No difficulty metrics needed                             │
    │  ├── Con: Requires massive compute                                 │
    │  └── Con: No skill transfer between problems                       │
    │                                                                     │
    │  NO CURRICULUM (Eureka)                                            │
    │  ├── Pro: Simplest to implement                                    │
    │  ├── Pro: Each problem solved optimally                            │
    │  ├── Con: Reinvents wheel for each task                            │
    │  └── Con: No compound learning                                     │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘
```

---

# Part IV: The Design Space

## 4.1 Choosing Your Tradeoff

If you're building autonomous systems, you face the same choice these frameworks faced. Here's how to think about it:

```
THE DECISION FRAMEWORK
═══════════════════════════════════════════════════════════════════════════

    QUESTION 1: Can you automatically evaluate success?
    ───────────────────────────────────────────────────
    
    YES → Capability-first approaches are viable
          (Eureka, AlphaEvolve patterns)
    
    NO  → You need human-in-the-loop or proxy metrics
          Pure evolutionary approaches won't work
    
    
    QUESTION 2: Do tasks share structure?
    ─────────────────────────────────────
    
    YES → Skill library architecture makes sense
          (Voyager pattern)
          Investment in skills pays off over time
    
    NO  → Each task is independent
          (Eureka pattern)
          Skill accumulation has no value
    
    
    QUESTION 3: How much compute do you have?
    ─────────────────────────────────────────
    
    MASSIVE (GPU clusters, days of runtime)
    → Evolutionary approaches viable
      (AlphaEvolve pattern)
    
    LIMITED (single machine, real-time)
    → Need efficient skill retrieval
      (Voyager pattern)
    → Or pre-trained capability
      (Eureka pattern with smaller search)
    
    
    QUESTION 4: Do you need to explain results?
    ────────────────────────────────────────────
    
    YES → Capability-first approaches are problematic
          Generated solutions may be uninterpretable
    
    NO  → Pure capability is fine
          Results justify themselves
    
    
    THE MATRIX:
    ───────────
    
    ┌─────────────────┬──────────────┬───────────────┬─────────────────┐
    │                 │ Auto-eval    │ Shared        │ Compute         │
    │ APPROACH        │ possible?    │ structure?    │ available?      │
    ├─────────────────┼──────────────┼───────────────┼─────────────────┤
    │ Eureka-style    │ Required     │ Not needed    │ Moderate        │
    │ (pure search)   │              │               │                 │
    ├─────────────────┼──────────────┼───────────────┼─────────────────┤
    │ Voyager-style   │ Helpful      │ Required      │ Low-Moderate    │
    │ (skill library) │              │               │                 │
    ├─────────────────┼──────────────┼───────────────┼─────────────────┤
    │ AlphaEvolve     │ Required     │ Per-problem   │ Massive         │
    │ (evolutionary)  │              │               │                 │
    └─────────────────┴──────────────┴───────────────┴─────────────────┘
```

## 4.2 The Hybrid Architecture

In practice, the most effective systems combine elements from all three approaches:

```
THE HYBRID PATTERN
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
       - Full search for breakthrough problems
```

---

# Part V: What This Means for Humans

## 5.1 The Uncomfortable Parallel

Here's the part that might be personally relevant: the capability-vs-intelligence tradeoff applies to humans too.

```
THE HUMAN PARALLEL
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
    
    "I'll learn by doing and pick up theory as needed."
    
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
    │  Voyager doesn't understand Minecraft deeply.                      │
    │  It has a library of things it can DO in Minecraft.                │
    │                                                                     │
    │  Each skill was learned through attempt → feedback → refinement.   │
    │  Complex capabilities emerged from composing simple skills.        │
    │                                                                     │
    │  The intelligence (GPT-4's knowledge) was used to GUIDE            │
    │  skill acquisition—not to replace it.                              │
    │                                                                     │
    │  This is remarkably similar to how expertise develops in humans:   │
    │                                                                     │
    │  Expert performance = accumulated skills + strategic knowledge     │
    │                                                                     │
    │  Not: deep understanding → automatic performance                   │
    │  But: practiced skills + understanding of when to use them         │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘
```

## 5.2 The Skill Library for Humans

What would it look like to apply the Voyager pattern to human learning?

```
HUMAN SKILL LIBRARY ARCHITECTURE
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
    
    If you're succeeding >80% of the time: You're not learning.
    If you're succeeding <60% of the time: You're frustrated.
    
    Optimal learning happens at the edge of current capability.
    Voyager calibrates to this automatically.
    You can too—by choosing tasks that feel challenging but achievable.
```

---

# Part VI: The Bigger Picture

## 6.1 Why This Matters for What We Build

The capability-intelligence tradeoff isn't just academic. It shapes how we design every autonomous system:

```
DESIGN PRINCIPLES FROM THE TRADEOFF
═══════════════════════════════════════════════════════════════════════════

    PRINCIPLE 1: CAPABILITY COMPOUNDS, INTELLIGENCE DOESN'T
    ───────────────────────────────────────────────────────
    
    A skill library grows more valuable over time.
    Raw intelligence is always starting from scratch.
    
    Implication: Invest in skill accumulation infrastructure.
    Every successful execution should leave an artifact.
    
    
    PRINCIPLE 2: EVALUATION IS THE BOTTLENECK
    ─────────────────────────────────────────
    
    Eureka and AlphaEvolve only work because they can
    automatically evaluate success.
    
    Implication: Before building capability systems,
    build evaluation systems. If you can't measure success,
    you can't iterate toward it.
    
    
    PRINCIPLE 3: COMPOSITION BEATS CREATION
    ───────────────────────────────────────
    
    Voyager's power comes from composing existing skills,
    not from creating new ones from scratch.
    
    Implication: Design skills to be composable.
    Clear inputs, outputs, and interfaces.
    
    
    PRINCIPLE 4: INTELLIGENCE IS FOR ORCHESTRATION
    ───────────────────────────────────────────────
    
    The "smart" part of these systems is the orchestrator—
    deciding what to try, when to compose, when to search.
    
    The "capable" part is the skill library and evaluation.
    
    Implication: Use intelligence where it matters most
    (high-level decisions), and capability where it matters
    most (reliable execution).
    
    
    PRINCIPLE 5: THE TRADEOFF IS A CHOICE
    ─────────────────────────────────────
    
    You don't have to pick one extreme.
    Hybrid architectures combine both.
    
    Implication: Map your problem space.
    Some tasks need intelligence (novel situations).
    Some tasks need capability (routine operations).
    Build systems that allocate appropriately.
```

## 6.2 The Question Behind the Question

The real question isn't "capability or intelligence?"

The real question is: "What are you trying to accomplish?"

```
THE FINAL FRAMEWORK
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
    └─────────────────────────────────────────────────────────────────────┘
```

---

# Conclusion: The Capability Trap

The "capability trap" isn't that capability is bad. It's that capability is seductive.

Systems that demonstrate impressive capability *look* intelligent. They beat world champions. They generate beautiful images. They write functional code. It's natural to assume something smart is happening under the hood.

But often, something different is happening: massive search, statistical selection, skill composition, evolutionary refinement. The results are real. The "intelligence" is an illusion.

This isn't a criticism. It's an insight. Understanding the distinction helps you:

Build systems that actually work (optimize for the right thing).
Use AI systems effectively (know their limits).
Develop your own skills (capability-first, intelligence-guided).

The AI that beats you at chess isn't smart.

It's capable.

And now you know the difference.

---

*Capability gets things done.*

*Intelligence knows why.*

*The best systems combine both.*

*—zer0 Research, December 2025*
