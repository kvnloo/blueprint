import { Article } from '../researchData';

export const architectureIntelligence: Article = {
  id: 'architecture-intelligence',
  title: 'The Architecture of Intelligence',
  category: 'ai',
  track: 'Evolve',
  type: 'Deep Dive',
  readTime: '35 min',
  wordCount: 8765,
  description: 'You want to build something that builds itself. Not just code generation-that\'s 2023. Not just agentic workflows-that\'s 2024. You want a system that understands your vision from any input, decomposes it into executable specifications, orchestrates tools to build it, learns from every attempt, and runs continuously without you. This document traces the path from today\'s tools to that future.',
  content: [
    {
      type: 'header',
      text: 'The Architecture of Intelligence'
    },
    {
      type: 'subheader',
      text: 'A Deep Dive into LLM-Based Development, Tool Orchestration, and the Path to Autonomous Systems'
    },
    {
      type: 'text',
      text: '*A zer0 Research Document - December 2025*'
    },
    {
      type: 'diagram',
      diagramType: 'cards',
      data: {
        title: 'THE PUZZLE - What We Want to Build',
        subtitle: 'Not just code generation (2023) or agentic workflows (2024). A system that builds itself.',
        cards: [
          {
            title: 'Understand Vision',
            icon: 'brain',
            content: 'From any input modality',
            details: 'Voice, sketch, screenshot, architecture diagram, or just vibes',
            tags: ['input']
          },
          {
            title: 'Decompose Specs',
            icon: 'layers',
            content: 'Break down into executable units',
            details: 'products → projects → features → tasks → subtasks',
            tags: ['planning']
          },
          {
            title: 'Orchestrate Tools',
            icon: 'zap',
            content: 'Coordinate diverse tooling',
            details: '[Blender](https://blender.org), [Unity](https://unity.com), code, documents, research',
            tags: ['execution']
          },
          {
            title: 'Learn & Improve',
            icon: 'sparkles',
            content: 'Continuous self-improvement',
            details: 'Skill library, automatic curriculum, pattern recognition',
            tags: ['learning']
          },
          {
            title: 'Run Continuously',
            icon: 'clock',
            content: 'Autonomous operation',
            details: 'Overnight research, parallel development, unattended execution',
            tags: ['autonomous']
          }
        ],
        footer: 'This document traces the path from today\'s tools to that future. Each section is a milestone. Together, they form the EVOLVE framework.'
      }
    },
    {
      type: 'header',
      text: 'Part I: The Intelligence Stack'
    },
    {
      type: 'subheader',
      text: '1.1 The Fundamental Constraint'
    },
    {
      type: 'text',
      text: 'Before we build anything, we need to understand the playing field.'
    },
    {
      type: 'diagram',
      diagramType: 'metrics',
      data: {
        title: 'THE COMPUTE REALITY',
        subtitle: 'Why you can\'t run Claude Sonnet 4.5 or GPT-5.1 locally',
        sections: [
          {
            title: 'The Closed-Source Problem',
            metrics: [
              { label: 'Parameters', value: '100B+', description: 'Hundreds of billions' },
              { label: 'Distribution', value: 'Multi-GPU', description: 'Requires GPU clusters' },
              { label: 'Access', value: 'API Only', description: 'Proprietary inference' },
              { label: 'Training Cost', value: '$M', description: 'Millions to train' }
            ]
          },
          {
            title: 'Your Hardware: RTX 3080Ti',
            metrics: [
              { label: 'VRAM', value: '12GB', description: 'GPU memory capacity' },
              { label: 'Comfortable', value: '7-14B', description: 'Model size range' },
              { label: 'With Q4', value: '34B', description: 'Quantized models' },
              { label: '70B+ Models', value: '❌', description: 'Unusable with extreme quantization' }
            ]
          },
          {
            title: 'Your Hardware: RTX 2080 Super',
            metrics: [
              { label: 'VRAM', value: '8GB', description: 'GPU memory capacity' },
              { label: 'Comfortable', value: '7B', description: 'Model size range' },
              { label: 'Use Case', value: 'Embeddings', description: 'Parallel processing' },
              { label: 'Routing', value: 'Small Models', description: 'Task coordination' }
            ]
          },
          {
            title: 'Combined Capabilities',
            metrics: [
              { label: 'Total VRAM', value: '20GB', description: 'Across both GPUs' },
              { label: 'Local Intelligence', value: 'Limited', description: 'Cannot match API models' },
              { label: 'Solution', value: 'Architecture', description: 'Not more hardware' },
              { label: 'Strategy', value: 'Hybrid', description: 'Local + API coordination' }
            ]
          }
        ]
      }
    },
    {
      type: 'text',
      text: 'This constraint shapes everything. We can\'t brute-force our way to intelligence with consumer hardware. Instead, we need to be strategic about:\n\n1. **What runs locally** (fast, cheap, private)\n2. **What runs via API** (intelligent, expensive, rate-limited)\n3. **How they communicate** (the orchestration layer)'
    },
    {
      type: 'subheader',
      text: '1.2 The Model Distillation Breakthrough'
    },
    {
      type: 'text',
      text: 'Here\'s where the landscape shifted in 2024-2025. Researchers discovered that you can transfer the "intelligence" of massive models into much smaller ones through knowledge distillation.'
    },
    {
      type: 'diagram',
      diagramType: 'hierarchy',
      data: {
        title: 'KNOWLEDGE DISTILLATION: THE CORE CONCEPT',
        subtitle: 'How small models learn from large teachers',
        nodes: [
          {
            id: 'teacher',
            label: 'TEACHER MODEL',
            description: '405B parameters',
            details: [
              '[Claude](https://anthropic.com), [GPT-4](https://openai.com), [DeepSeek R1](https://deepseek.com)',
              '"The Expert"',
              'Learns from billions of tokens',
              'Massive computational requirements'
            ],
            level: 0,
            icon: 'brain'
          },
          {
            id: 'transfer',
            label: 'Knowledge Transfer',
            description: 'Behavioral Learning',
            details: [
              'Soft targets (probability distributions)',
              'Reasoning traces (chain of thought)',
              'Behavioral patterns (how it thinks)',
              'Mistakes and uncertainties',
              'Decision-making patterns'
            ],
            level: 1,
            icon: 'arrow-down'
          },
          {
            id: 'student',
            label: 'STUDENT MODEL',
            description: '8B parameters',
            details: [
              '[Llama Nemotron Nano](https://nvidia.com/en-us/ai)',
              '"The Apprentice"',
              'Learns from teacher behavior',
              'Runs on single GPU'
            ],
            level: 2,
            icon: 'cpu'
          }
        ],
        comparison: {
          title: 'Traditional vs Distillation',
          items: [
            {
              approach: 'Traditional Training',
              flow: 'Raw Data → Model → Predictions',
              cost: 'Expensive, slow, requires scale',
              learning: 'Hard labels from data'
            },
            {
              approach: 'Knowledge Distillation',
              flow: 'Teacher Behavior → Student → Efficient Inference',
              cost: 'Faster, cheaper, single GPU',
              learning: 'Soft targets from expert'
            }
          ]
        },
        insight: 'The student doesn\'t learn from data. The student learns from the TEACHER\'S BEHAVIOR.'
      }
    },
    {
      type: 'text',
      text: 'This breakthrough has led to models that dramatically outperform their size class. The most striking example in 2025 is NVIDIA\'s [Llama Nemotron](https://nvidia.com/en-us/ai) family.'
    },
    {
      type: 'subheader',
      text: 'The Llama Nemotron Family: A Case Study'
    },
    {
      type: 'diagram',
      diagramType: 'cards',
      data: {
        title: 'NVIDIA LLAMA NEMOTRON: DISTILLATION IN ACTION',
        subtitle: 'The model family that proves size isn\'t everything',
        cards: [
          {
            title: 'NANO (8B)',
            icon: 'cpu',
            content: 'Consumer GPU powerhouse',
            details: 'Derived from: Llama 3.1 8B',
            tags: ['8B', 'local', '128K context'],
            stats: [
              { label: 'Training', value: 'SFT + RL (REINFORCE, RPO)' },
              { label: 'Hardware', value: 'Single RTX GPU' },
              { label: 'Reasoning', value: 'Toggle on/off' },
              { label: 'Benchmark', value: 'Beats larger models' }
            ]
          },
          {
            title: 'SUPER (49B)',
            icon: 'server',
            content: 'Data center efficiency',
            details: 'Distilled from: Llama 3.3 70B',
            tags: ['49B', 'single-gpu', 'throughput'],
            stats: [
              { label: 'Target', value: 'Data center deployment' },
              { label: 'Balance', value: 'Accuracy + throughput' },
              { label: 'Hardware', value: 'Single GPU node' }
            ]
          },
          {
            title: 'ULTRA (253B)',
            icon: 'zap',
            content: 'Enterprise scale',
            details: 'Distilled from: Llama 3.1 405B',
            tags: ['253B', 'distributed', 'sota'],
            stats: [
              { label: 'Achievement', value: 'Beats [DeepSeek-R1](https://deepseek.com)' },
              { label: 'Hardware', value: 'Single 8xH100 node' },
              { label: 'Throughput', value: 'Higher than 405B' }
            ]
          }
        ]
      }
    },
    {
      type: 'diagram',
      diagramType: 'process',
      data: {
        title: 'THE TRAINING PIPELINE',
        subtitle: 'How Nemotron models are created',
        steps: [
          {
            id: 'nas',
            label: 'Neural Architecture Search',
            icon: 'search',
            description: 'Stage 1: NAS',
            details: ['Optimize inference efficiency', 'Starting from base Llama', 'Architecture optimization']
          },
          {
            id: 'cpt',
            label: 'Continued Pre-Training',
            icon: 'database',
            description: 'Stage 2: CPT',
            details: ['Knowledge distillation', '65B-88B tokens', 'Teacher: Nemotron-4-340B-Instruct']
          },
          {
            id: 'sft',
            label: 'Supervised Fine-Tuning',
            icon: 'book',
            description: 'Stage 3: SFT',
            details: ['Math, Code, Reasoning, Tool Calling', '"Detailed thinking on/off" toggle', 'Domain specialization']
          },
          {
            id: 'rl',
            label: 'Reinforcement Learning',
            icon: 'target',
            description: 'Stage 4: RL',
            details: ['REINFORCE (RLOO) algorithm', 'Online Reward-aware Preference Optimization (RPO)', 'Behavioral refinement']
          },
          {
            id: 'alignment',
            label: 'Alignment',
            icon: 'check',
            description: 'Stage 5: Final Alignment',
            details: ['Chat optimization', 'Instruction-following', 'Safety and helpfulness']
          }
        ]
      }
    },
    {
      type: 'text',
      text: 'The [Llama Nemotron Nano 8B](https://nvidia.com/en-us/ai) is particularly relevant because it fits on your 3080Ti and excels at exactly what autonomous systems need: **tool calling, reasoning, and RAG**.'
    },
    {
      type: 'subheader',
      text: 'Benchmark Reality: Small Models Can Win'
    },
    {
      type: 'diagram',
      diagramType: 'cards',
      data: {
        title: 'BENCHMARK COMPARISON: SIZE VS. CAPABILITY',
        subtitle: 'BFCL (Berkeley Function Calling Leaderboard) - The gold standard for tool use',
        cards: [
          {
            title: 'Simple',
            icon: 'target',
            content: 'One query, one tool',
            details: 'Basic function calling',
            tags: ['basic']
          },
          {
            title: 'Multiple',
            icon: 'layers',
            content: '2-4 options, pick best',
            details: 'Tool selection',
            tags: ['selection']
          },
          {
            title: 'Parallel',
            icon: 'zap',
            content: 'Multiple simultaneous',
            details: 'Concurrent tool calls',
            tags: ['concurrent']
          },
          {
            title: 'Irrelevance',
            icon: 'x',
            content: 'Know when NOT to act',
            details: 'Avoid hallucinated tools',
            tags: ['judgment']
          },
          {
            title: 'Multi-Turn',
            icon: 'repeat',
            content: 'Maintain context',
            details: 'Sequential operations',
            tags: ['context']
          },
          {
            title: 'Composite',
            icon: 'grid',
            content: 'All of the above',
            details: 'Complete evaluation',
            tags: ['comprehensive']
          }
        ],
        results: {
          title: 'The Surprising Results',
          winner: 'Nemotron Nano 8B',
          outperforms: [
            'GPT-4V on text recognition and spotting',
            'Gemini on specialized document benchmarks',
            'Many 70B+ models on tool orchestration'
          ],
          reasons: [
            {
              title: 'Specialized Training',
              description: 'Focused on tool calling, not general chat',
              icon: 'target'
            },
            {
              title: 'Better Architecture',
              description: 'NAS-optimized for inference efficiency',
              icon: 'cpu'
            },
            {
              title: 'Quality Over Quantity',
              description: 'Trained on curated synthetic data from 340B teacher',
              icon: 'sparkles'
            },
            {
              title: 'Toggle-able Reasoning',
              description: '"Detailed thinking on" for complex tasks, "off" for fast responses',
              icon: 'toggle-right'
            }
          ]
        }
      }
    },
    {
      type: 'text',
      text: 'This is the first piece of the puzzle: **you don\'t need the biggest model; you need the right model for each task.**'
    },
    {
      type: 'header',
      text: 'Part II: The Orchestration Frameworks'
    },
    {
      type: 'subheader',
      text: '2.1 Claude Code: The Foundation'
    },
    {
      type: 'text',
      text: 'Claude Code is the terminal-based interface to Claude\'s capabilities. It\'s the starting point, but not the end point.'
    },
    {
      type: 'diagram',
      diagramType: 'comparison',
      data: {
        title: 'CLAUDE CODE: CAPABILITIES AND LIMITATIONS',
        subtitle: 'Understanding what comes out of the box vs what needs to be built',
        items: [
          {
            category: 'Native Capabilities',
            type: 'positive',
            features: [
              { label: 'File Operations', description: 'Read and write files in your repository', icon: 'file' },
              { label: 'Bash Commands', description: 'Execute terminal commands', icon: 'terminal' },
              { label: 'MCP Servers', description: 'Use external tools via protocol', icon: 'plug' },
              { label: 'Context', description: 'Maintain context across a session', icon: 'brain' },
              { label: 'Multi-file Editing', description: 'Edit multiple files with undo', icon: 'edit' },
              { label: 'Git Operations', description: 'Version control integration', icon: 'git-branch' }
            ]
          },
          {
            category: 'Missing Capabilities',
            type: 'negative',
            features: [
              { label: 'Deep Research', description: 'Web browsing, multi-source synthesis', icon: 'search' },
              { label: 'Parallel Agents', description: 'Spawn and coordinate multiple agents', icon: 'users' },
              { label: 'Overnight Operation', description: 'Run without human interaction', icon: 'moon' },
              { label: 'Project Hierarchies', description: 'Manage complex project structures', icon: 'folder-tree' },
              { label: 'Skill Accumulation', description: 'Self-improve through learning', icon: 'trending-up' },
              { label: 'Model Switching', description: 'Cost optimization across models', icon: 'shuffle' }
            ]
          }
        ],
        insight: {
          title: 'THE GAP',
          text: 'Claude Code is a powerful TOOL. We need a powerful SYSTEM. That\'s where the extension frameworks come in.'
        }
      }
    },
    {
      type: 'subheader',
      text: '2.2 Milestone 1: SuperClaude'
    },
    {
      type: 'text',
      text: 'SuperClaude was one of the first comprehensive attempts to extend Claude Code\'s capabilities.'
    },
    {
      type: 'diagram',
      diagramType: 'cards',
      data: {
        title: 'SUPERCLAUDE: RESEARCH AND MULTI-AGENT EXTENSION',
        subtitle: 'One of the first comprehensive attempts to extend Claude Code',
        cards: [
          {
            title: 'Deep Research Mode',
            icon: 'search',
            content: 'Multi-source web research',
            details: 'NOT native to Claude Code - key addition',
            tags: ['research'],
            features: [
              'Web search across multiple sources',
              'Multi-pass synthesis',
              'Citation and source tracking'
            ]
          },
          {
            title: 'Project Management',
            icon: 'folder-tree',
            content: 'Task and documentation management',
            details: 'Living documentation as code',
            tags: ['pm'],
            features: [
              'Task decomposition templates',
              'Progress tracking',
              'Documentation generation'
            ]
          },
          {
            title: 'Sub-Agent Orchestration',
            icon: 'users',
            content: 'Parallel agent coordination',
            details: 'Early exploration of swarm patterns',
            tags: ['agents'],
            features: [
              'Spawn specialized agents',
              'Coordinate parallel work',
              'Result aggregation'
            ]
          },
          {
            title: 'Context Management',
            icon: 'brain',
            content: 'Advanced session handling',
            details: 'Knowledge base integration',
            tags: ['context'],
            features: [
              'Summary compression',
              'Priority-based loading',
              'Long session support'
            ]
          }
        ],
        architecture: {
          title: 'Architecture Pattern',
          layers: [
            {
              name: 'SuperClaude Layer',
              components: ['Research Agent', 'Project Manager', 'Context Engine'],
              role: 'Extension capabilities'
            },
            {
              name: 'Orchestrator',
              components: ['Coordination', 'Task Routing'],
              role: 'Central coordination'
            },
            {
              name: 'Claude Code',
              components: ['Base capabilities'],
              role: 'Foundation'
            }
          ]
        },
        insight: 'The research capability gap was real and important. Claude Code alone couldn\'t do what we needed for continuous learning.'
      }
    },
    {
      type: 'subheader',
      text: '2.3 Milestone 2: CCPM (Claude Code Project Manager)'
    },
    {
      type: 'text',
      text: 'CCPM introduced rigorous spec-driven development to Claude Code.'
    },
    {
      type: 'code',
      language: 'diagram',
      code: `CCPM: SPEC-DRIVEN DEVELOPMENT
═══════════════════════════════════════════════════════════════════════════

    THE CORE PHILOSOPHY:
    ────────────────────

    Before you write code, you write specifications.
    Before you write specifications, you write requirements.
    Before you write requirements, you understand the problem.

    CCPM enforces this discipline through a strict workflow:


    THE CCPM WORKFLOW:
    ──────────────────`
    },
    {
      type: 'diagram',
      diagramType: 'process',
      data: {
        title: 'CCPM Spec-Driven Workflow',
        steps: [
          {
            id: 'init',
            label: '/pm:init',
            icon: 'target',
            description: 'Initialize project structure',
            details: ['Setup project directories', 'Configure tooling', 'Define workflows']
          },
          {
            id: 'prd',
            label: 'PRD',
            icon: 'book',
            description: 'Product Requirements Document',
            details: [
              'Problem statement',
              'User personas',
              'Success metrics',
              'Constraints and assumptions'
            ]
          },
          {
            id: 'epic',
            label: 'Epic',
            icon: 'layers',
            description: 'Feature grouping and scope',
            details: [
              'Feature grouping',
              'Scope definition',
              'Dependencies mapping'
            ]
          },
          {
            id: 'task',
            label: 'Task',
            icon: 'check',
            description: 'Implementation planning',
            details: [
              'Specific implementation steps',
              'Acceptance criteria',
              'Estimated effort'
            ]
          },
          {
            id: 'implementation',
            label: 'Implementation',
            icon: 'zap',
            description: 'Code execution',
            details: ['Build features', 'Run tests', 'Deploy changes']
          }
        ]
      }
    },
    {
      type: 'code',
      language: 'diagram',
      code: `

    THE DOCUMENT HIERARCHY (What We Built On):
    ──────────────────────────────────────────

    This structure became the foundation for our development management:`
    },
    {
      type: 'diagram',
      diagramType: 'hierarchy',
      data: {
        title: 'Development Management Hierarchy',
        root: {
          id: 'product',
          label: 'Product',
          icon: 'star',
          children: [
            {
              id: 'projects',
              label: 'Projects',
              icon: 'layers',
              children: [
                {
                  id: 'milestones',
                  label: 'Milestones',
                  icon: 'target',
                  children: [
                    {
                      id: 'features',
                      label: 'Features',
                      icon: 'sparkles',
                      children: [
                        {
                          id: 'stories',
                          label: 'User Stories',
                          icon: 'book',
                          children: [
                            {
                              id: 'tasks',
                              label: 'Tasks',
                              icon: 'check',
                              children: [
                                {
                                  id: 'subtasks',
                                  label: 'Subtasks',
                                  icon: 'arrow',
                                  children: [
                                    {
                                      id: 'defects',
                                      label: 'Defects',
                                      icon: 'flame'
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      }
    },
    {
      type: 'code',
      language: 'diagram',
      code: `
    Plus continuous cross-cutting concerns:

    ┌────────────────────────────────────────────────────────────────────┐
    │  CONTINUOUS RESEARCH                                               │
    │  ├── State-of-the-art monitoring                                  │
    │  ├── Best practices evolution                                     │
    │  └── Technology scouting                                          │
    └────────────────────────────────────────────────────────────────────┘`
    },
    {
      type: 'subheader',
      text: '2.4 Milestone 3: Claude Flow + SPARC Framework'
    },
    {
      type: 'text',
      text: 'Claude Flow brought enterprise-grade orchestration with the SPARC methodology.'
    },
    {
      type: 'code',
      language: 'diagram',
      code: `CLAUDE FLOW: AGENT ORCHESTRATION PLATFORM
═══════════════════════════════════════════════════════════════════════════

    ARCHITECTURE:
    ─────────────`
    },
    {
      type: 'diagram',
      diagramType: 'stack',
      data: {
        title: 'Claude Flow 2.0 Architecture',
        layers: [
          {
            id: 'swarm',
            label: 'Swarm Controller',
            icon: 'brain',
            description: 'Orchestration and coordination layer',
            items: [
              'Spawn multiple agents',
              'Coordinate parallel workflows',
              'Voting/consensus mechanisms',
              'Resource allocation'
            ]
          },
          {
            id: 'agents',
            label: 'Agent Layer',
            icon: 'zap',
            description: 'Specialized AI agents for different tasks',
            items: [
              'Research Agent - Investigation and analysis',
              'Code Agent - Implementation and development',
              'Test Agent - Quality assurance and validation',
              'Additional specialized agents'
            ]
          },
          {
            id: 'memory',
            label: 'Memory Store',
            icon: 'layers',
            description: 'Shared knowledge and reasoning bank',
            items: [
              'ReasoningBank for pattern storage',
              'Cross-agent knowledge sharing',
              'Context persistence',
              'Learning accumulation'
            ]
          },
          {
            id: 'mcp',
            label: 'MCP Integration',
            icon: 'branch',
            description: 'Tool and external service connectivity',
            items: [
              'Automated server configuration',
              'Permission management',
              'Tool discovery and routing',
              'External service orchestration'
            ]
          }
        ]
      }
    },
    {
      type: 'code',
      language: 'diagram',
      code: `


    THE SPARC FRAMEWORK (Built Into Claude Flow):
    ──────────────────────────────────────────────

    SPARC = Specification, Pseudocode, Architecture, Refinement, Completion`
    },
    {
      type: 'diagram',
      diagramType: 'process',
      data: {
        title: 'SPARC Development Framework',
        steps: [
          {
            id: 'specification',
            label: 'Specification',
            icon: 'book',
            description: 'Define WHAT before HOW',
            details: [
              'Unambiguous success criteria',
              'Edge cases and constraints',
              'Clear problem definition'
            ]
          },
          {
            id: 'pseudocode',
            label: 'Pseudocode',
            icon: 'lightbulb',
            description: 'Algorithm design before implementation',
            details: [
              'Logic validation',
              'Complexity analysis',
              'Step-by-step breakdown'
            ]
          },
          {
            id: 'architecture',
            label: 'Architecture',
            icon: 'layers',
            description: 'System design and structure',
            details: [
              'Component relationships',
              'Data flow patterns',
              'Technology choices'
            ]
          },
          {
            id: 'refinement',
            label: 'Refinement',
            icon: 'target',
            description: 'Iterative improvement',
            details: [
              'Performance optimization',
              'Error handling',
              'Code quality enhancement'
            ]
          },
          {
            id: 'completion',
            label: 'Completion',
            icon: 'check',
            description: 'Final implementation',
            details: [
              'Full implementation',
              'Comprehensive testing',
              'Complete documentation'
            ]
          }
        ]
      }
    },
    {
      type: 'diagram',
      diagramType: 'cards',
      data: {
        title: 'KEY INNOVATIONS',
        cards: [
          {
            title: 'Custom Commands',
            icon: 'book',
            content: 'Markdown-based command definitions with lifecycle hooks and skill builder for reusable patterns',
            tags: ['commands', 'extensibility']
          },
          {
            title: 'Discovery Mode',
            icon: 'target',
            content: 'Explores capabilities autonomously, maps available tools and resources, self-documents for future sessions',
            tags: ['autonomous', 'learning']
          },
          {
            title: 'Worktree Integration',
            icon: 'branch',
            content: 'Git worktrees for parallel development with branch-per-agent patterns and conflict resolution strategies',
            tags: ['git', 'parallelism']
          }
        ]
      }
    },
    {
      type: 'subheader',
      text: '2.5 Milestone 4: Claude Squad'
    },
    {
      type: 'text',
      text: 'Claude Squad enabled true parallel development through git worktrees.'
    },
    {
      type: 'text',
      text: '**The Problem:** One Claude Code instance = one context = one task at a time. But real development is parallel: Feature A needs research, Feature B needs implementation, Bug C needs investigation, documentation needs updating.'
    },
    {
      type: 'text',
      text: '**The Solution:** Git worktrees + multiple Claude Code instances = parallelism.'
    },
    {
      type: 'diagram',
      diagramType: 'floorplan',
      data: {
        title: 'Claude Squad: Parallel Development Architecture',
        areas: [
          {
            id: 'main',
            label: 'Main Repository',
            icon: 'layers',
            color: 'primary',
            x: 10,
            y: 10,
            width: 80,
            height: 12,
            details: [
              'Shared .git/ directory',
              'All worktrees reference this'
            ]
          },
          {
            id: 'worktree1',
            label: 'Worktree 1: feature-a/',
            icon: 'branch',
            color: 'accent',
            x: 10,
            y: 25,
            width: 24,
            height: 28,
            details: [
              'Claude Code Instance 1',
              'Working on: Research for new API',
              'Branch: feature/new-api'
            ]
          },
          {
            id: 'worktree2',
            label: 'Worktree 2: feature-b/',
            icon: 'branch',
            color: 'accent',
            x: 38,
            y: 25,
            width: 24,
            height: 28,
            details: [
              'Claude Code Instance 2',
              'Working on: UI implementation',
              'Branch: feature/ui-redesign'
            ]
          },
          {
            id: 'worktree3',
            label: 'Worktree 3: bugfix-c/',
            icon: 'branch',
            color: 'accent',
            x: 66,
            y: 25,
            width: 24,
            height: 28,
            details: [
              'Claude Code Instance 3',
              'Working on: Critical bug investigation',
              'Branch: fix/memory-leak'
            ]
          },
          {
            id: 'coordination',
            label: 'Coordination Layer',
            icon: 'brain',
            color: 'secondary',
            x: 10,
            y: 58,
            width: 80,
            height: 18,
            details: [
              '.coordination/status.json',
              'Agent assignments',
              'Progress tracking',
              'Dependency mapping'
            ]
          }
        ],
        connections: [
          { from: 'main', to: 'worktree1', label: 'shares .git/' },
          { from: 'main', to: 'worktree2', label: 'shares .git/' },
          { from: 'main', to: 'worktree3', label: 'shares .git/' },
          { from: 'worktree1', to: 'coordination', label: 'reports to' },
          { from: 'worktree2', to: 'coordination', label: 'reports to' },
          { from: 'worktree3', to: 'coordination', label: 'reports to' }
        ]
      }
    },
    {
      type: 'code',
      language: 'bash',
      code: `# Claude Squad Commands
claude-squad spawn --branch feature-a --agent researcher
claude-squad spawn --branch feature-b --agent implementer
claude-squad status
claude-squad merge --from feature-a --to main`
    },
    {
      type: 'text',
      text: '**Hardware Reality Check:** On a 3080Ti, you can run 2-3 parallel Claude API sessions (network-bound, not GPU) OR 1 local model instance (GPU-bound). For true parallelism with local models, you\'d need multiple GPUs or use API models for orchestration + local for specific tasks.'
    },
    {
      type: 'header',
      text: 'Part III: The Tool Calling Revolution'
    },
    {
      type: 'subheader',
      text: '3.1 MCP: Model Context Protocol'
    },
    {
      type: 'text',
      text: 'MCP is the bridge between LLMs and external tools. It\'s what makes autonomous development possible.'
    },
    {
      type: 'code',
      language: 'diagram',
      code: `MCP: THE UNIVERSAL TOOL INTERFACE
═══════════════════════════════════════════════════════════════════════════

    THE CONCEPT:
    ────────────

    MCP creates a standard protocol for LLMs to interact with ANY software.

    Before MCP:
    ┌─────────────────────────────────────────────────────────────────────┐
    │  Each tool needed custom integration                               │
    │  Different APIs, different formats, different auth                 │
    │  Fragile, hard to maintain, limited scalability                    │
    └─────────────────────────────────────────────────────────────────────┘

    With MCP:
    ┌─────────────────────────────────────────────────────────────────────┐
    │  One protocol, any tool                                            │
    │  Standardized function definitions                                 │
    │  Automatic discovery and capability mapping                        │
    └─────────────────────────────────────────────────────────────────────┘


    ARCHITECTURE:
    ─────────────`
    },
    {
      type: 'diagram',
      diagramType: 'hierarchy',
      data: {
        title: 'MCP Universal Tool Interface',
        root: {
          id: 'llm',
          label: 'Claude (or any LLM)',
          icon: 'brain',
          children: [
            {
              id: 'protocol',
              label: 'MCP Protocol (JSON-RPC)',
              icon: 'branch',
              children: [
                {
                  id: 'client',
                  label: 'MCP Client',
                  icon: 'layers',
                  children: [
                    {
                      id: 'servers',
                      label: 'MCP Servers',
                      icon: 'zap',
                      children: [
                        {
                          id: 'blender',
                          label: '[Blender](https://blender.org) MCP',
                          icon: 'sparkles',
                          children: [
                            {
                              id: 'blender-app',
                              label: '[Blender](https://blender.org) (3D app)',
                              icon: 'target'
                            }
                          ]
                        },
                        {
                          id: 'unity',
                          label: '[Unity](https://unity.com) MCP',
                          icon: 'sparkles',
                          children: [
                            {
                              id: 'unity-app',
                              label: '[Unity](https://unity.com) Editor',
                              icon: 'target'
                            }
                          ]
                        },
                        {
                          id: 'linear',
                          label: '[Linear](https://linear.app) MCP',
                          icon: 'sparkles',
                          children: [
                            {
                              id: 'linear-api',
                              label: '[Linear](https://linear.app) API',
                              icon: 'target'
                            }
                          ]
                        },
                        {
                          id: 'figma',
                          label: 'Figma MCP',
                          icon: 'sparkles',
                          children: [
                            {
                              id: 'figma-api',
                              label: 'Figma API',
                              icon: 'target'
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      }
    },
    {
      type: 'code',
      language: 'diagram',
      code: `


    CONFIGURATION (claude_desktop_config.json):
    ───────────────────────────────────────────

    {
      "mcpServers": {
        "blender": {
          "command": "uvx",
          "args": ["blender-mcp"]
        },
        "unity": {
          "command": "node",
          "args": ["unity-mcp-server.js"]
        },
        "linear": {
          "command": "npx",
          "args": ["linear-mcp"]
        }
      }
    }`
    },
    {
      type: 'subheader',
      text: '3.2 The 3D Development Stack'
    },
    {
      type: 'text',
      text: 'For digital twin development, 3D tools are essential. Here\'s how they integrate.'
    },
    {
      type: 'code',
      language: 'diagram',
      code: `3D DEVELOPMENT MCP STACK
═══════════════════════════════════════════════════════════════════════════

    BLENDER MCP:
    ────────────

    Capabilities:
    ✓ Create objects ("add a cube at origin")
    ✓ Modify geometry ("subdivide the mesh")
    ✓ Apply materials ("make it metallic blue")
    ✓ Set up lighting ("add three-point lighting")
    ✓ Render scenes ("render at 1920x1080")
    ✓ Export formats ("export as GLTF")

    Installation:
    1. Download blender-mcp addon
    2. Install in Blender: Edit > Preferences > Add-ons
    3. Configure Claude Desktop config
    4. Start both applications


    UNITY MCP:
    ──────────

    Capabilities:
    ✓ Create GameObjects
    ✓ Configure components
    ✓ Write C# scripts (Roslyn validation)
    ✓ Manage shaders
    ✓ Control editor operations
    ✓ Run play mode tests

    Use Case: Digital twin simulation, game prototyping


    THE WORKFLOW:
    ─────────────

    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                     │
    │  STEP 1: SPEC-DRIVEN DESIGN                                        │
    │  ├── Define what you\'re building in SPARC format                   │
    │  ├── Include dimensions, materials, behaviors                      │
    │  └── Reference images or sketches if available                     │
    │                                                                     │
    │  STEP 2: ASSET GENERATION                                          │
    │  ├── Use Blender MCP for 3D modeling                               │
    │  ├── Generate textures (AI or procedural)                          │
    │  └── Export in appropriate format                                  │
    │                                                                     │
    │  STEP 3: SCENE ASSEMBLY                                            │
    │  ├── Import assets into Unity via MCP                              │
    │  ├── Set up physics, lighting, cameras                             │
    │  └── Configure interactions and behaviors                          │
    │                                                                     │
    │  STEP 4: SIMULATION                                                │
    │  ├── Run digital twin simulation                                   │
    │  ├── Collect performance data                                      │
    │  └── Iterate based on results                                      │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘


    EXAMPLE: GREENHOUSE DIGITAL TWIN
    ─────────────────────────────────

    SPECIFICATION:
    "Design a 30x50 foot greenhouse with automated irrigation,
    LED grow lights, and climate control. Model airflow patterns
    and light distribution for optimizing lettuce growth."

    BLENDER MCP COMMANDS:
    → Create greenhouse structure (steel frame, polycarbonate panels)
    → Add grow tables at specified heights
    → Model irrigation pipes and emitters
    → Place LED fixtures with correct beam angles
    → Set up ventilation fans and louvers

    UNITY MCP COMMANDS:
    → Import greenhouse model
    → Add airflow simulation (particle system or CFD)
    → Configure light simulation (raytracing or baked)
    → Create climate control scripts
    → Set up sensor data visualization

    OUTPUT:
    → Interactive 3D model
    → Simulation of environmental conditions
    → Optimization recommendations
    → Export for presentation or further development`
    },
    {
      type: 'subheader',
      text: '3.3 Benchmark: The BFCL Standard'
    },
    {
      type: 'text',
      text: 'How do we know if a model is good at tool calling? The Berkeley Function Calling Leaderboard.'
    },
    {
      type: 'code',
      language: 'diagram',
      code: `BFCL: UNDERSTANDING TOOL CALLING EVALUATION
═══════════════════════════════════════════════════════════════════════════

    WHY THIS MATTERS:
    ─────────────────

    If your autonomous system can\'t reliably call tools,
    it\'s just a chatbot with delusions of grandeur.

    BFCL tests EXACTLY what we need:


    TEST CATEGORIES:
    ────────────────

    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                     │
    │  SIMPLE (Single function, single query)                            │
    │  ─────────────────────────────────────                             │
    │  "What\'s the weather in San Francisco?"                            │
    │  → get_weather(location="San Francisco")                           │
    │                                                                     │
    │  Most models: 95%+ accuracy                                        │
    │  This is the easy part.                                            │
    │                                                                     │
    ├─────────────────────────────────────────────────────────────────────┤
    │                                                                     │
    │  MULTIPLE (2-4 functions, pick the right one)                      │
    │  ──────────────────────────────────────────                        │
    │  "Book a flight to NYC"                                            │
    │  Options: get_weather(), book_flight(), get_stock_price()          │
    │  → book_flight(destination="NYC")                                  │
    │                                                                     │
    │  Requires: Understanding function signatures and relevance         │
    │                                                                     │
    ├─────────────────────────────────────────────────────────────────────┤
    │                                                                     │
    │  PARALLEL (Multiple simultaneous calls)                            │
    │  ───────────────────────────────────────                           │
    │  "What\'s the weather in NYC and LA?"                               │
    │  → [get_weather("NYC"), get_weather("LA")]                         │
    │                                                                     │
    │  Requires: Recognizing parallel structure, batching correctly      │
    │                                                                     │
    ├─────────────────────────────────────────────────────────────────────┤
    │                                                                     │
    │  IRRELEVANCE DETECTION (Know when NOT to act)                      │
    │  ─────────────────────────────────────────                         │
    │  "Tell me a joke" with only get_weather() available                │
    │  → NO function call (refuse appropriately)                         │
    │                                                                     │
    │  CRITICAL for autonomous systems: Avoiding hallucinated actions    │
    │                                                                     │
    ├─────────────────────────────────────────────────────────────────────┤
    │                                                                     │
    │  MULTI-TURN (Maintain context across conversation)                 │
    │  ─────────────────────────────────────────                         │
    │  Turn 1: "Search for hotels in Paris"                              │
    │  Turn 2: "Now book the cheapest one"                               │
    │  → Requires: Memory of previous search results                     │
    │                                                                     │
    │  WHERE MOST MODELS FAIL: Long-horizon reasoning                    │
    │                                                                     │
    ├─────────────────────────────────────────────────────────────────────┤
    │                                                                     │
    │  COMPOSITE (Everything at once)                                    │
    │  ──────────────────────────────                                    │
    │  Complex scenarios combining all the above                         │
    │  Rare in real life but critical for robustness                     │
    │                                                                     │
    │  "The gauntlet" - only ~60-70% accuracy for top models            │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘


    EVALUATION METHOD: AST MATCHING
    ────────────────────────────────

    Instead of executing functions (expensive, unreliable),
    BFCL uses Abstract Syntax Tree matching:

    EXPECTED: get_weather(location="San Francisco", units="fahrenheit")
    ACTUAL:   get_weather(location="San Francisco", units="fahrenheit")

    AST comparison checks structural equivalence,
    allowing for different orderings of keyword arguments.


    WHAT THIS MEANS FOR YOUR SYSTEM:
    ─────────────────────────────────

    1. Choose models with high BFCL scores for orchestration
    2. Test irrelevance detection especially (avoid rogue actions)
    3. Multi-turn is the hardest-design for context preservation
    4. Smaller specialized models (like Nemotron Nano) can excel here`
    },
    {
      type: 'header',
      text: 'Part IV: The Operating System Question'
    },
    {
      type: 'subheader',
      text: '4.1 OS Comparison for LLM Development'
    },
    {
      type: 'text',
      text: 'Your choice of operating system affects everything from GPU drivers to development workflow.'
    },
    {
      type: 'code',
      language: 'diagram',
      code: `OPERATING SYSTEM COMPARISON FOR LLM DEVELOPMENT
═══════════════════════════════════════════════════════════════════════════

    THE CANDIDATES:
    ───────────────

    ┌─────────────────────────────────────────────────────────────────────┐
    │  UBUNTU (22.04/24.04 LTS)                                          │
    ├─────────────────────────────────────────────────────────────────────┤
    │                                                                     │
    │  PROS:                                                             │
    │  ├── Best NVIDIA driver support (official packages)                │
    │  ├── Most tutorials and documentation assume Ubuntu                │
    │  ├── Docker and container ecosystem "just works"                   │
    │  ├── CUDA toolkit installation is straightforward                  │
    │  ├── Most AI libraries test on Ubuntu first                        │
    │  └── Stable, predictable, boring (in a good way)                   │
    │                                                                     │
    │  CONS:                                                             │
    │  ├── Package versions can be outdated                              │
    │  ├── System updates can break GPU drivers                          │
    │  ├── Less reproducible than declarative systems                    │
    │  └── Dependency hell is real                                       │
    │                                                                     │
    │  VERDICT: Best for "I just want it to work"                        │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘

    ┌─────────────────────────────────────────────────────────────────────┐
    │  NIXOS                                                             │
    ├─────────────────────────────────────────────────────────────────────┤
    │                                                                     │
    │  PROS:                                                             │
    │  ├── Fully declarative configuration                               │
    │  ├── Reproducible environments (configuration.nix is truth)        │
    │  ├── Atomic upgrades and rollbacks                                 │
    │  ├── Multiple versions of same package coexist                     │
    │  ├── Development shells with flakes                                │
    │  └── System state as code (version control your OS)                │
    │                                                                     │
    │  CONS:                                                             │
    │  ├── Steep learning curve                                          │
    │  ├── NVIDIA drivers require unfree configuration                   │
    │  ├── Some AI tools need custom packaging                           │
    │  ├── Community smaller than Ubuntu                                 │
    │  └── "Works on my machine" becomes "works in my flake"             │
    │                                                                     │
    │  VERDICT: Best for "I want reproducibility and control"            │
    │                                                                     │
    │  YOUR EXPERIENCE:                                                  │
    │  └── Successfully installed on PC with 10900K + 3080Ti             │
    │  └── Required nomodeset boot parameter initially                   │
    │  └── Secure Boot with Lanzaboote for dual-boot with Windows        │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘

    ┌─────────────────────────────────────────────────────────────────────┐
    │  CACHYOS                                                           │
    ├─────────────────────────────────────────────────────────────────────┤
    │                                                                     │
    │  PROS:                                                             │
    │  ├── Arch-based with performance optimizations                     │
    │  ├── BORE/EEVDF scheduler (better responsiveness)                  │
    │  ├── Rolling release (latest packages)                             │
    │  ├── AUR access for any package                                    │
    │  └── Faster desktop feel                                           │
    │                                                                     │
    │  CONS:                                                             │
    │  ├── LLM inference doesn\'t benefit from scheduler                  │
    │  ├── Rolling release can break things                              │
    │  ├── Less tested for production workloads                          │
    │  └── Main gains are desktop responsiveness, not LLM speed          │
    │                                                                     │
    │  VERDICT: Great desktop, no LLM-specific advantages                │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘

    ┌─────────────────────────────────────────────────────────────────────┐
    │  MACOS (M4)                                                        │
    ├─────────────────────────────────────────────────────────────────────┤
    │                                                                     │
    │  PROS:                                                             │
    │  ├── Unified memory (no VRAM limit, uses system RAM)               │
    │  ├── Metal acceleration for some frameworks                        │
    │  ├── Excellent for development (not inference)                     │
    │  ├── Low power consumption                                         │
    │  └── Great for orchestration layer (runs Claude Code)              │
    │                                                                     │
    │  CONS:                                                             │
    │  ├── No CUDA (many LLM tools are CUDA-first)                       │
    │  ├── MPS (Metal) support inconsistent                              │
    │  ├── Slower inference than equivalent NVIDIA                       │
    │  └── Can\'t run most local models efficiently                       │
    │                                                                     │
    │  VERDICT: Great for orchestration, poor for local inference        │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘


    THE RECOMMENDATION FOR YOUR SETUP:
    ───────────────────────────────────

    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                     │
    │  WORKSTATION (10900K + 3080Ti):                                    │
    │  └── NixOS or Ubuntu for reproducibility and CUDA support          │
    │  └── Run local models (Nemotron Nano, Qwen-Coder)                  │
    │  └── Heavy inference workloads                                     │
    │                                                                     │
    │  SECONDARY (10900KF + 2080 Super):                                 │
    │  └── Same OS as workstation for consistency                        │
    │  └── Parallel processing, embeddings, smaller models               │
    │                                                                     │
    │  LAPTOP (M4 Mac):                                                  │
    │  └── Orchestration, development, API calls                         │
    │  └── Claude Code, documentation, project management                │
    │                                                                     │
    │  CLOUD (AWS/GCP):                                                  │
    │  └── Large model inference when needed                             │
    │  └── Burst capacity for parallel experiments                       │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘`
    },
    {
      type: 'subheader',
      text: '4.2 The On-Prem Limitation'
    },
    {
      type: 'text',
      text: 'The fundamental constraint of on-premises LLM hosting.'
    },
    {
      type: 'code',
      language: 'diagram',
      code: `THE ON-PREM REALITY
═══════════════════════════════════════════════════════════════════════════

    WHAT YOU CAN HOST:
    ──────────────────

    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                     │
    │  OPEN-WEIGHT MODELS (download and run)                             │
    │                                                                     │
    │  7B CLASS (runs great on 12GB VRAM):                               │
    │  ├── Llama Nemotron Nano 8B (best for tool calling)                │
    │  ├── Qwen2.5-Coder 7B (excellent for code)                         │
    │  ├── DeepSeek-Coder 6.7B (strong coding)                           │
    │  └── Mistral 7B (good general purpose)                             │
    │                                                                     │
    │  14B CLASS (needs quantization on 12GB):                           │
    │  ├── Qwen2.5-Coder 14B Q4 (sweet spot for code)                    │
    │  ├── DeepSeek Coder V2 14B                                         │
    │  └── CodeLlama 13B                                                 │
    │                                                                     │
    │  34B CLASS (aggressive quantization, slower):                      │
    │  ├── CodeLlama 34B Q3/Q4                                           │
    │  ├── DeepSeek Coder 33B Q4                                         │
    │  └── Dolphin-Llama 34B (unrestricted)                              │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘


    WHAT YOU CANNOT HOST:
    ─────────────────────

    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                     │
    │  CLOSED-SOURCE MODELS (API only, no weights available)             │
    │                                                                     │
    │  ├── Claude Opus 4.5                                               │
    │  ├── Claude Sonnet 4.5                                             │
    │  ├── GPT-4, GPT-4o, GPT-5.1                                        │
    │  ├── Gemini Ultra, Gemini 2.0                                      │
    │  └── Any model where weights aren\'t released                       │
    │                                                                     │
    │  WHY NOT:                                                          │
    │  ├── Legal: weights are proprietary                                │
    │  ├── Technical: 200B+ parameters need cluster compute              │
    │  └── Economic: training cost is in the billions                    │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘


    THE COST-EFFECTIVE CLUSTER QUESTION:
    ─────────────────────────────────────

    "Can I build a cluster to match Claude Opus?"

    HARDWARE REQUIREMENTS FOR 405B MODEL:
    ├── 8x H100 80GB ($250k-300k per GPU = $2M+)
    ├── NVLink interconnect
    ├── High-speed networking
    ├── Power and cooling infrastructure
    └── Total: $2.5M+ just for inference

    ALTERNATIVE: Used/older hardware
    ├── 3 generations old (V100) = still $2k-5k each
    ├── A100 40GB = $15k-20k each
    ├── Still can\'t run 405B without 8+ A100s ($150k+)
    └── And performance is 3-5x slower than H100

    REALITY CHECK:
    ├── API costs for Claude Opus: ~$15/1M input tokens
    ├── 1 million tokens of research: $15
    ├── To spend $2M on API calls: ~133 BILLION tokens
    └── That\'s more tokens than most projects will ever use

    CONCLUSION:
    ├── Use APIs for frontier intelligence
    ├── Use local models for specific, repetitive tasks
    ├── Use distilled models for specialized capabilities
    └── The hybrid approach wins`
    },
    {
      type: 'header',
      text: 'Part V: The Learning Systems'
    },
    {
      type: 'subheader',
      text: '5.1 Voyager: Lifelong Learning in Minecraft'
    },
    {
      type: 'text',
      text: 'The Voyager paper established the paradigm for autonomous skill acquisition.'
    },
    {
      type: 'code',
      language: 'diagram',
      code: `VOYAGER: THE SKILL LIBRARY PARADIGM
═══════════════════════════════════════════════════════════════════════════

    THE ACHIEVEMENT:
    ────────────────

    Voyager was the first LLM-powered agent to reach diamond-tier tools
    in Minecraft autonomously-a 15.3x improvement over baselines.


    THE THREE COMPONENTS:
    ─────────────────────

    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                     │
    │  1. AUTOMATIC CURRICULUM                                           │
    │  ────────────────────────                                          │
    │                                                                     │
    │  Instead of pre-defined tasks, Voyager generates its own goals:    │
    │                                                                     │
    │      Current state → "What should I do next?" → New challenge     │
    │                                                                     │
    │  The curriculum emerges from:                                      │
    │  ├── Current inventory and skills                                  │
    │  ├── Nearby resources and opportunities                            │
    │  ├── Gap analysis vs. ultimate goals                               │
    │  └── Progressive difficulty (not random)                           │
    │                                                                     │
    │  KEY INSIGHT: The system never gets stuck because it always        │
    │  generates achievable next steps based on current capabilities.    │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘

    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                     │
    │  2. SKILL LIBRARY                                                  │
    │  ────────────────                                                  │
    │                                                                     │
    │  Every successful behavior is stored as executable code:           │
    │                                                                     │
    │      async function mineDiamond(bot) {                             │
    │        await equipItem(bot, "iron_pickaxe");                       │
    │        await navigateToY(bot, 12);                                 │
    │        await mineBlock(bot, "diamond_ore");                        │
    │      }                                                             │
    │                                                                     │
    │  Skills are indexed by:                                            │
    │  ├── Semantic embedding (what it does)                             │
    │  ├── Prerequisites (what skills it needs)                          │
    │  ├── Success rate (how reliable it is)                             │
    │  └── Complexity (how many sub-skills it uses)                      │
    │                                                                     │
    │  RETRIEVAL: 96.5% top-5 accuracy using embeddings                  │
    │                                                                     │
    │  KEY INSIGHT: Skills are COMPOSITIONAL. Complex behaviors          │
    │  emerge from combining simpler skills.                             │
    │                                                                     │
    │      mineDiamond() = equipItem() + navigateToY() + mineBlock()    │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘

    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                     │
    │  3. ITERATIVE PROMPTING WITH FEEDBACK                              │
    │  ────────────────────────────────────                              │
    │                                                                     │
    │  Three types of feedback guide refinement:                         │
    │                                                                     │
    │  ├── ENVIRONMENT STATE                                             │
    │  │   └── "You have 3 iron ingots, 1 diamond, low health"          │
    │  │                                                                 │
    │  ├── EXECUTION ERRORS                                              │
    │  │   └── "Error: cannot craft iron_pickaxe, missing stick"        │
    │  │                                                                 │
    │  └── SELF-VERIFICATION                                             │
    │      └── "Task 'get diamond' complete? Yes/No + reasoning"        │
    │                                                                     │
    │  KEY INSIGHT: The agent doesn\'t just try once. It iterates        │
    │  until success or determines the task is impossible.              │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘


    RESULTS:
    ────────

    ├── 15.3x more unique items discovered than baselines
    ├── 3.3x more items than next best method
    ├── 2.3x longer exploration distances
    ├── Zero catastrophic forgetting (skills persist)
    └── Compositional generalization (novel combinations work)`
    },
    {
      type: 'subheader',
      text: '5.2 Eureka: Reward Function Evolution'
    },
    {
      type: 'text',
      text: 'Eureka showed how to evolve capabilities without understanding them.'
    },
    {
      type: 'code',
      language: 'diagram',
      code: `EUREKA: CAPABILITY WITHOUT COMPREHENSION
═══════════════════════════════════════════════════════════════════════════

    THE PROBLEM:
    ────────────

    Teaching robots new skills requires reward functions.
    Writing reward functions requires expertise.
    What if we could generate them automatically?


    THE APPROACH:
    ─────────────

    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                     │
    │  ENVIRONMENT AS CONTEXT                                            │
    │  ──────────────────────                                            │
    │                                                                     │
    │  Feed raw environment code to the LLM:                             │
    │                                                                     │
    │      class RobotArm:                                               │
    │          def __init__(self):                                       │
    │              self.joint_angles = [0, 0, 0, 0, 0, 0]               │
    │              self.gripper_state = "open"                           │
    │              self.target_position = [0.5, 0.3, 0.2]               │
    │          ...                                                       │
    │                                                                     │
    │  The LLM infers:                                                   │
    │  ├── What variables exist                                          │
    │  ├── What actions are possible                                     │
    │  ├── What success might look like                                  │
    │  └── How to measure progress                                       │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘

    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                     │
    │  EVOLUTIONARY GENERATION                                           │
    │  ───────────────────────                                           │
    │                                                                     │
    │  Per iteration:                                                    │
    │  1. Generate 16 candidate reward functions                         │
    │  2. Train RL agent on each (parallel, GPU-accelerated)            │
    │  3. Evaluate performance                                           │
    │  4. Select top performers                                          │
    │  5. Mutate/refine for next generation                              │
    │                                                                     │
    │  ITERATION 1:                                                      │
    │      [R1] [R2] [R3] ... [R16]  → Evaluate → Top 4 survive         │
    │                                                                     │
    │  ITERATION 2:                                                      │
    │      [R1'] [R1''] [R2'] ...   → Evaluate → Top 4 survive          │
    │                                                                     │
    │  ... 5 iterations total ...                                        │
    │                                                                     │
    │  KEY: No human reward engineering required.                        │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘

    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                     │
    │  REWARD REFLECTION                                                 │
    │  ─────────────────                                                 │
    │                                                                     │
    │  After each generation, the LLM analyzes failures:                 │
    │                                                                     │
    │      "Reward function R3 led to the robot spinning in place.      │
    │       Analysis: The rotation bonus dominated the position error.   │
    │       Suggestion: Reduce rotation weight, add position priority."  │
    │                                                                     │
    │  This feedback improves the next generation\'s prompts.             │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘


    RESULTS:
    ────────

    ├── 83% win rate against human-written rewards
    ├── 52% average improvement over expert baselines
    ├── First simulated rapid pen spinning (human-level dexterity)
    └── Works without domain expertise


    THE PHILOSOPHICAL TRADEOFF:
    ───────────────────────────

    Eureka achieves capability WITHOUT understanding.

    ├── The generated rewards may be counterintuitive
    ├── Hard to transfer between tasks
    ├── Not explainable

    BUT: It works. And it democratizes expert-level capabilities.`
    },
    {
      type: 'subheader',
      text: '5.3 Applying These Patterns to Development'
    },
    {
      type: 'text',
      text: 'How do we use Voyager and Eureka patterns for software and 3D development?'
    },
    {
      type: 'code',
      language: 'diagram',
      code: `SKILL LIBRARY FOR DEVELOPMENT
═══════════════════════════════════════════════════════════════════════════

    THE CONCEPT:
    ────────────

    Every successful development action becomes a retrievable skill.


    SKILL TYPES:
    ────────────

    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                     │
    │  CODE SKILLS                                                       │
    │  ───────────                                                       │
    │                                                                     │
    │  {                                                                 │
    │    "name": "create_react_component_with_tailwind",                │
    │    "description": "Create a React component with Tailwind CSS",   │
    │    "prerequisites": ["react_basics", "tailwind_setup"],           │
    │    "template": "...",                                             │
    │    "success_rate": 0.94,                                          │
    │    "embedding": [0.12, -0.34, ...],                               │
    │    "examples": [...]                                              │
    │  }                                                                 │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘

    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                     │
    │  3D MODELING SKILLS (Blender MCP)                                  │
    │  ─────────────────────────────────                                 │
    │                                                                     │
    │  {                                                                 │
    │    "name": "create_modular_greenhouse_panel",                     │
    │    "tool": "blender_mcp",                                         │
    │    "commands": [                                                  │
    │      "create_plane(2, 1)",                                        │
    │      "extrude(0.05)",                                             │
    │      "add_material('polycarbonate')",                             │
    │      "add_frame('aluminum_profile')"                              │
    │    ],                                                             │
    │    "parameters": {                                                │
    │      "width": "adjustable",                                       │
    │      "height": "adjustable",                                      │
    │      "frame_thickness": 0.025                                     │
    │    },                                                             │
    │    "success_rate": 0.89                                           │
    │  }                                                                 │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘

    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                     │
    │  RESEARCH SKILLS                                                   │
    │  ───────────────                                                   │
    │                                                                     │
    │  {                                                                 │
    │    "name": "literature_review_synthesis",                         │
    │    "description": "Find and synthesize academic papers on topic", │
    │    "workflow": [                                                  │
    │      "search_arxiv(query)",                                       │
    │      "filter_by_date(last_2_years)",                              │
    │      "extract_key_findings()",                                    │
    │      "identify_consensus_and_gaps()",                             │
    │      "generate_summary()"                                         │
    │    ],                                                             │
    │    "success_criteria": "produces coherent synthesis with refs"    │
    │  }                                                                 │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘


    AUTOMATIC CURRICULUM FOR DEVELOPMENT:
    ─────────────────────────────────────

    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                     │
    │  PROGRESSION EXAMPLE: 3D Asset Generation                          │
    │                                                                     │
    │  LEVEL 1: Primitives                                               │
    │  ├── Create cube                                                   │
    │  ├── Create sphere                                                 │
    │  ├── Apply solid color material                                    │
    │  └── UNLOCK: Basic shapes skill                                    │
    │                                                                     │
    │  LEVEL 2: Modifications                                            │
    │  ├── Subdivide mesh                                                │
    │  ├── Extrude faces                                                 │
    │  ├── Boolean operations                                            │
    │  └── UNLOCK: Mesh editing skill                                    │
    │                                                                     │
    │  LEVEL 3: Materials                                                │
    │  ├── PBR material setup                                            │
    │  ├── Texture mapping                                               │
    │  ├── Procedural textures                                           │
    │  └── UNLOCK: Material creation skill                               │
    │                                                                     │
    │  LEVEL 4: Composition                                              │
    │  ├── Multi-object scenes                                           │
    │  ├── Lighting setups                                               │
    │  ├── Camera positioning                                            │
    │  └── UNLOCK: Scene composition skill                               │
    │                                                                     │
    │  LEVEL 5: Complex Assets                                           │
    │  ├── Greenhouse structure                                          │
    │  ├── Irrigation system                                             │
    │  ├── Plant models                                                  │
    │  └── UNLOCK: Domain-specific modeling skill                        │
    │                                                                     │
    │  The curriculum EMERGES from skill dependencies,                   │
    │  not pre-defined ordering.                                         │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘`
    },
    {
      type: 'header',
      text: 'Part VI: The EVOLVE Framework'
    },
    {
      type: 'subheader',
      text: '6.1 Synthesis: Putting It All Together'
    },
    {
      type: 'text',
      text: 'Every milestone we\'ve covered solves a piece of the puzzle. EVOLVE combines them.'
    },
    {
      type: 'code',
      language: 'diagram',
      code: `THE EVOLVE FRAMEWORK: FINAL ARCHITECTURE
═══════════════════════════════════════════════════════════════════════════

    EVOLVE = Evolutionary Learning, Orchestration, Validation, and Execution

    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                     │
    │                         INPUT LAYER                                 │
    │  ───────────────────────────────────────────────────────────────   │
    │                                                                     │
    │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
    │  │  Voice   │ │ Sketch   │ │Screenshot│ │   Text   │ │ Diagram  │ │
    │  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ │
    │       │            │            │            │            │        │
    │       └────────────┴────────────┴────────────┴────────────┘        │
    │                                   │                                 │
    │                          ┌────────▼────────┐                       │
    │                          │ VISION ENCODER  │                       │
    │                          │ (Nemotron Nano  │                       │
    │                          │  VL or similar) │                       │
    │                          └────────┬────────┘                       │
    │                                   │                                 │
    └───────────────────────────────────┼─────────────────────────────────┘
                                        │
    ┌───────────────────────────────────▼─────────────────────────────────┐
    │                                                                     │
    │                    SPECIFICATION LAYER                              │
    │  ───────────────────────────────────────────────────────────────   │
    │                                                                     │
    │  ┌───────────────────────────────────────────────────────────────┐ │
    │  │                    SPARC PROCESSOR                            │ │
    │  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ │ │
    │  │  │  Spec   │→│ Pseudo  │→│  Arch   │→│ Refine  │→│Complete │ │ │
    │  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘ │ │
    │  └───────────────────────────────────────────────────────────────┘ │
    │                                   │                                 │
    │  ┌───────────────────────────────────────────────────────────────┐ │
    │  │                 PROJECT HIERARCHY (CCPM)                      │ │
    │  │                                                               │ │
    │  │  PRODUCT                                                      │ │
    │  │    └── PROJECT                                                │ │
    │  │          └── MILESTONE                                        │ │
    │  │                └── FEATURE                                    │ │
    │  │                      └── USER STORY                           │ │
    │  │                            └── TASK                           │ │
    │  │                                  └── SUBTASK                  │ │
    │  │                                                               │ │
    │  └───────────────────────────────────────────────────────────────┘ │
    │                                                                     │
    └───────────────────────────────────┬─────────────────────────────────┘
                                        │
    ┌───────────────────────────────────▼─────────────────────────────────┐
    │                                                                     │
    │                    ORCHESTRATION LAYER                              │
    │  ───────────────────────────────────────────────────────────────   │
    │                                                                     │
    │  ┌─────────────────────────────────────────────────────────────┐   │
    │  │                 CLAUDE FLOW SWARM                            │   │
    │  │                                                              │   │
    │  │   ORCHESTRATOR (Opus/Sonnet via API)                        │   │
    │  │         │                                                    │   │
    │  │   ┌─────┴─────────────────────────────────────────────┐     │   │
    │  │   │                                                   │     │   │
    │  │   ▼                    ▼                    ▼         │     │   │
    │  │  ┌──────────┐   ┌──────────┐   ┌──────────┐          │     │   │
    │  │  │ RESEARCH │   │  BUILD   │   │   TEST   │  ...     │     │   │
    │  │  │  AGENT   │   │  AGENT   │   │  AGENT   │          │     │   │
    │  │  │(Sonnet)  │   │(Local 8B)│   │(Local 8B)│          │     │   │
    │  │  └────┬─────┘   └────┬─────┘   └────┬─────┘          │     │   │
    │  │       │              │              │                 │     │   │
    │  └───────┼──────────────┼──────────────┼─────────────────┘     │   │
    │          │              │              │                        │   │
    │  ┌───────▼──────────────▼──────────────▼────────────────────┐  │   │
    │  │                   SKILL LIBRARY                          │  │   │
    │  │  (Voyager-style, indexed by embedding, success rate)     │  │   │
    │  └──────────────────────────────────────────────────────────┘  │   │
    │                                                                 │   │
    └─────────────────────────────────────────────────────────────────────┘
                                        │
    ┌───────────────────────────────────▼─────────────────────────────────┐
    │                                                                     │
    │                      EXECUTION LAYER                                │
    │  ───────────────────────────────────────────────────────────────   │
    │                                                                     │
    │  ┌─────────────────────────────────────────────────────────────┐   │
    │  │                    MCP TOOL NETWORK                          │   │
    │  │                                                              │   │
    │  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │   │
    │  │  │ BLENDER  │ │  UNITY   │ │  LINEAR  │ │   GIT    │       │   │
    │  │  │   MCP    │ │   MCP    │ │   MCP    │ │   MCP    │  ...  │   │
    │  │  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘       │   │
    │  │       │            │            │            │              │   │
    │  │  ┌────▼────┐  ┌────▼────┐  ┌────▼────┐  ┌────▼────┐       │   │
    │  │  │Blender  │  │ Unity   │  │ Linear  │  │  Git    │       │   │
    │  │  │ 3D App  │  │ Editor  │  │  API    │  │  Repo   │       │   │
    │  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘       │   │
    │  │                                                              │   │
    │  └──────────────────────────────────────────────────────────────┘   │
    │                                                                     │
    └───────────────────────────────────┬─────────────────────────────────┘
                                        │
    ┌───────────────────────────────────▼─────────────────────────────────┐
    │                                                                     │
    │                      LEARNING LAYER                                 │
    │  ───────────────────────────────────────────────────────────────   │
    │                                                                     │
    │  ┌─────────────────────────────────────────────────────────────┐   │
    │  │              AUTOMATIC CURRICULUM (Voyager-style)            │   │
    │  │                                                              │   │
    │  │  Current Skills + Available Tasks → Next Challenge           │   │
    │  │                                                              │   │
    │  │  Progressive difficulty based on success rates              │   │
    │  └──────────────────────────────────────────────────────────────┘   │
    │                                                                     │
    │  ┌─────────────────────────────────────────────────────────────┐   │
    │  │              REWARD REFLECTION (Eureka-style)                │   │
    │  │                                                              │   │
    │  │  Failed Attempt → Analysis → Improved Strategy               │   │
    │  │                                                              │   │
    │  │  Self-verification with multiple feedback types             │   │
    │  └──────────────────────────────────────────────────────────────┘   │
    │                                                                     │
    │  ┌─────────────────────────────────────────────────────────────┐   │
    │  │              CONTINUOUS RESEARCH                             │   │
    │  │                                                              │   │
    │  │  Background process for:                                    │   │
    │  │  ├── SOTA monitoring                                        │   │
    │  │  ├── Best practices evolution                               │   │
    │  │  ├── Technology scouting                                    │   │
    │  │  └── Knowledge base updates                                 │   │
    │  └──────────────────────────────────────────────────────────────┘   │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘`
    },
    {
      type: 'subheader',
      text: '6.2 The Model Allocation Strategy'
    },
    {
      type: 'text',
      text: 'Which model runs where, and why?'
    },
    {
      type: 'code',
      language: 'diagram',
      code: `MODEL ALLOCATION IN EVOLVE
═══════════════════════════════════════════════════════════════════════════

    THE PRINCIPLE:
    ──────────────

    Use the MINIMUM intelligence required for each task.
    Save expensive API calls for tasks that need them.


    TASK-TO-MODEL MAPPING:
    ──────────────────────

    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                     │
    │  TIER 1: FRONTIER INTELLIGENCE (API Models)                        │
    │  ─────────────────────────────────────────────                     │
    │                                                                     │
    │  USE: Claude Opus 4.5, Sonnet 4.5, GPT-4o                          │
    │                                                                     │
    │  FOR:                                                              │
    │  ├── High-level orchestration and planning                         │
    │  ├── Complex multi-step reasoning                                  │
    │  ├── Novel problem solving (no existing skill)                     │
    │  ├── Architecture decisions                                        │
    │  ├── Synthesis of research across domains                          │
    │  └── Final review and validation                                   │
    │                                                                     │
    │  COST: $15-75 / 1M tokens                                          │
    │  LATENCY: 2-10 seconds per response                                │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘

    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                     │
    │  TIER 2: SPECIALIZED LOCAL (8B-14B Distilled Models)               │
    │  ────────────────────────────────────────────────────              │
    │                                                                     │
    │  USE: Nemotron Nano 8B, Qwen2.5-Coder 14B, DeepSeek Coder          │
    │                                                                     │
    │  FOR:                                                              │
    │  ├── Tool calling and MCP orchestration                            │
    │  ├── Code generation from specs                                    │
    │  ├── Test generation                                               │
    │  ├── Documentation writing                                         │
    │  ├── Routine refactoring                                           │
    │  └── Skill library retrieval and execution                         │
    │                                                                     │
    │  COST: Electricity + GPU time (~$0.01 / 1M tokens)                 │
    │  LATENCY: 50-200ms per response (local)                            │
    │                                                                     │
    │  HARDWARE: Runs on your 3080Ti (12GB VRAM)                         │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘

    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                     │
    │  TIER 3: UTILITY MODELS (Embeddings, Classification)               │
    │  ──────────────────────────────────────────────                    │
    │                                                                     │
    │  USE: Sentence transformers, small classifiers                     │
    │                                                                     │
    │  FOR:                                                              │
    │  ├── Skill library indexing (embedding generation)                 │
    │  ├── Routing decisions (which agent handles this?)                 │
    │  ├── Relevance detection (should we act?)                          │
    │  ├── Success verification (is the task done?)                      │
    │  └── Context prioritization (what\'s important?)                    │
    │                                                                     │
    │  COST: Negligible                                                  │
    │  LATENCY: <10ms                                                    │
    │                                                                     │
    │  HARDWARE: Runs on 2080 Super or CPU                               │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘


    EXAMPLE TASK FLOW:
    ──────────────────

    USER: "Design a greenhouse monitoring system"

    1. INPUT PROCESSING (Tier 3)
       └── Classify intent, extract entities
       └── Route to appropriate agent

    2. HIGH-LEVEL PLANNING (Tier 1 - API)
       └── Claude Opus breaks down into:
           ├── Sensor selection research
           ├── Data pipeline architecture
           ├── Dashboard UI design
           └── 3D visualization component

    3. RESEARCH PHASE (Tier 1 - API)
       └── Sonnet searches for best practices
       └── Synthesizes findings into spec

    4. IMPLEMENTATION (Tier 2 - Local)
       └── Nemotron Nano calls Blender MCP for 3D model
       └── Qwen-Coder generates Python data pipeline
       └── Local model writes tests

    5. INTEGRATION (Tier 2 - Local)
       └── Assemble components
       └── Run tests
       └── Fix issues using skill library

    6. REVIEW (Tier 1 - API)
       └── Opus reviews final output
       └── Suggests improvements
       └── Updates skill library with new skills

    COST BREAKDOWN:
    ├── Tier 1 calls: ~5,000 tokens = $0.08
    ├── Tier 2 calls: ~50,000 tokens = $0.50 (local compute)
    ├── Tier 3 calls: ~10,000 embeddings = negligible
    └── TOTAL: ~$0.60 for entire feature`
    },
    {
      type: 'subheader',
      text: '6.3 The Autonomous Operation Mode'
    },
    {
      type: 'text',
      text: 'How does EVOLVE run overnight without supervision?'
    },
    {
      type: 'code',
      language: 'diagram',
      code: `AUTONOMOUS OPERATION MODE
═══════════════════════════════════════════════════════════════════════════

    THE GOAL:
    ─────────

    Run for hours/days without human intervention.
    Research, plan, but don\'t execute risky actions.


    SAFETY CONSTRAINTS:
    ───────────────────

    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                     │
    │  PLAN MODE (overnight research)                                    │
    │  ─────────────────────────────                                     │
    │                                                                     │
    │  CAN DO:                                                           │
    │  ├── Web research and synthesis                                    │
    │  ├── Internal document analysis                                    │
    │  ├── Specification writing                                         │
    │  ├── Architecture planning                                         │
    │  ├── Code drafting (not execution)                                 │
    │  ├── Test case generation                                          │
    │  └── Skill library updates (non-destructive)                       │
    │                                                                     │
    │  CANNOT DO:                                                        │
    │  ├── Execute code                                                  │
    │  ├── Modify production files                                       │
    │  ├── Make external API calls (except research)                     │
    │  ├── Git push to main                                              │
    │  ├── Deploy anything                                               │
    │  └── Spend money                                                   │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘


    CONTINUOUS RESEARCH LOOP:
    ─────────────────────────

    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                     │
    │  while True:                                                       │
    │      │                                                             │
    │      ├── 1. CHECK RESEARCH QUEUE                                   │
    │      │      └── Priority-ordered list of topics                    │
    │      │                                                             │
    │      ├── 2. SELECT NEXT TOPIC                                      │
    │      │      └── Based on priority and estimated value              │
    │      │                                                             │
    │      ├── 3. SPAWN RESEARCH AGENT                                   │
    │      │      └── Web search, document analysis, synthesis           │
    │      │                                                             │
    │      ├── 4. GENERATE FINDINGS                                      │
    │      │      └── Structured output with citations                   │
    │      │                                                             │
    │      ├── 5. UPDATE KNOWLEDGE BASE                                  │
    │      │      └── Store in indexed format                            │
    │      │                                                             │
    │      ├── 6. IDENTIFY NEW QUESTIONS                                 │
    │      │      └── Add to research queue                              │
    │      │                                                             │
    │      ├── 7. UPDATE SKILL LIBRARY                                   │
    │      │      └── New patterns, best practices                       │
    │      │                                                             │
    │      ├── 8. LOG PROGRESS                                           │
    │      │      └── For human review in morning                        │
    │      │                                                             │
    │      └── 9. SLEEP(interval)                                        │
    │             └── Rate limiting, cost management                     │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘


    RECOVERY MECHANISMS:
    ────────────────────

    ├── Checkpoint every 10 minutes
    ├── State persistence to disk
    ├── Graceful degradation on errors
    ├── Automatic retry with backoff
    └── Alert on critical failures (email/Slack)


    MORNING HANDOFF:
    ────────────────

    When you wake up:

    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                     │
    │  EVOLVE OVERNIGHT SUMMARY                                          │
    │  ═════════════════════════                                         │
    │                                                                     │
    │  RESEARCH COMPLETED:                                               │
    │  ├── 12 topics investigated                                        │
    │  ├── 47 sources analyzed                                           │
    │  └── 8 new skills identified                                       │
    │                                                                     │
    │  KEY FINDINGS:                                                     │
    │  ├── [Summary of most important discoveries]                       │
    │  └── [Actionable recommendations]                                  │
    │                                                                     │
    │  PLANNED ACTIONS (awaiting approval):                              │
    │  ├── Create greenhouse sensor integration module                   │
    │  ├── Refactor data pipeline for real-time                          │
    │  └── Add new 3D assets for irrigation system                       │
    │                                                                     │
    │  SKILL LIBRARY UPDATES:                                            │
    │  ├── 3 new skills added                                            │
    │  └── 2 skills improved (higher success rate)                       │
    │                                                                     │
    │  [APPROVE] [REVIEW DETAILS] [MODIFY] [REJECT]                      │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘`
    },
    {
      type: 'header',
      text: 'Part VII: The Path Forward'
    },
    {
      type: 'subheader',
      text: '7.1 Current Limitations'
    },
    {
      type: 'text',
      text: 'What doesn\'t work yet, and why it matters.'
    },
    {
      type: 'code',
      language: 'diagram',
      code: `HONEST ASSESSMENT: WHAT'S STILL HARD
═══════════════════════════════════════════════════════════════════════════

    LIMITATION 1: LONG-HORIZON COHERENCE
    ─────────────────────────────────────

    Current LLMs struggle with:
    ├── Multi-day projects with evolving context
    ├── Decisions that depend on outcomes 50+ steps ago
    ├── Maintaining architectural consistency across sessions

    MITIGATION:
    ├── Strong specification documents (source of truth)
    ├── Skill library as persistent knowledge
    ├── Human checkpoints at critical junctures


    LIMITATION 2: CREATIVE 3D GENERATION
    ────────────────────────────────────

    Current state:
    ├── Can create basic geometry via MCP
    ├── Can apply materials and textures
    ├── CANNOT generate novel, aesthetically pleasing designs
    ├── CANNOT match human artist quality

    MITIGATION:
    ├── Use reference images and style guides
    ├── Leverage procedural generation where possible
    ├── Human review for aesthetic decisions
    ├── Build up skill library of validated patterns


    LIMITATION 3: COST AT SCALE
    ───────────────────────────

    Running Opus for everything is expensive:
    ├── 1M tokens input: $15
    ├── Complex project: could be millions of tokens
    ├── Continuous overnight operation: adds up

    MITIGATION:
    ├── Aggressive tiering (use local when possible)
    ├── Caching and deduplication
    ├── Skill library reduces redundant reasoning
    ├── Budget caps and alerts


    LIMITATION 4: TOOL RELIABILITY
    ──────────────────────────────

    MCP servers can:
    ├── Crash
    ├── Return unexpected errors
    ├── Have rate limits
    ├── Change APIs

    MITIGATION:
    ├── Robust error handling in orchestrator
    ├── Retry with exponential backoff
    ├── Fallback strategies
    ├── Monitoring and alerting


    LIMITATION 5: EVALUATION
    ────────────────────────

    How do we know if output is GOOD?
    ├── Code: tests, linting, type checking
    ├── 3D: ??? (geometric validation only goes so far)
    ├── Research: ??? (accuracy is hard to verify)
    ├── Architecture: ??? (quality is subjective)

    MITIGATION:
    ├── Human-in-the-loop for critical decisions
    ├── Multiple evaluation methods
    ├── Track success rates over time
    ├── Learn from failures (Eureka-style reflection)`
    },
    {
      type: 'subheader',
      text: '7.2 The 12-Month Roadmap'
    },
    {
      type: 'text',
      text: 'Where EVOLVE is heading.'
    },
    {
      type: 'code',
      language: 'diagram',
      code: `EVOLVE DEVELOPMENT ROADMAP
═══════════════════════════════════════════════════════════════════════════

    QUARTER 1: FOUNDATION
    ─────────────────────

    MONTH 1-2:
    ├── Set up core infrastructure
    │   ├── Claude Flow installation and configuration
    │   ├── MCP server network (Blender, Unity, Linear, Git)
    │   ├── Local model deployment (Nemotron Nano on 3080Ti)
    │   └── Skill library database (vector DB + metadata)
    │
    ├── Implement SPARC processor
    │   └── Spec → Pseudocode → Architecture → Refinement → Completion
    │
    └── Build CCPM integration
        └── Product → Project → Milestone → Feature → Task hierarchy

    MONTH 3:
    ├── First autonomous overnight run
    │   └── Research mode only, extensive logging
    │
    ├── Skill library v1
    │   ├── 50 basic coding skills
    │   ├── 20 Blender MCP skills
    │   └── 10 research skills
    │
    └── Human review dashboard
        └── Morning summary, approval workflow


    QUARTER 2: CAPABILITY BUILDING
    ──────────────────────────────

    MONTH 4-5:
    ├── Voyager-style automatic curriculum
    │   └── Progressive skill building based on success rates
    │
    ├── Eureka-style reward reflection
    │   └── Analyze failures, improve strategies
    │
    └── Multi-agent coordination
        └── Claude Squad integration for parallel development

    MONTH 6:
    ├── First complete digital twin project
    │   └── Greenhouse from spec to simulation
    │
    ├── Skill library v2
    │   ├── 200+ skills across domains
    │   └── Compositional skill building
    │
    └── Cost optimization
        └── Tiering analysis, reduce API spend by 50%


    QUARTER 3: AUTONOMY
    ───────────────────

    MONTH 7-8:
    ├── Extended autonomous operation
    │   └── Multi-day runs with checkpoint recovery
    │
    ├── Self-improvement metrics
    │   └── Track skill acquisition rate, success rates
    │
    └── Integration with external benchmarks
        └── BFCL, SWE-bench for validation

    MONTH 9:
    ├── Production deployment
    │   └── First client project using EVOLVE
    │
    ├── Documentation and training
    │   └── How to use EVOLVE for new domains
    │
    └── Open source release (if appropriate)
        └── Core framework, skill library starter


    QUARTER 4: SCALE
    ────────────────

    MONTH 10-12:
    ├── Multi-project orchestration
    │   └── Run multiple EVOLVE instances
    │
    ├── Cross-project learning
    │   └── Skills transfer between domains
    │
    ├── Advanced 3D capabilities
    │   └── Procedural generation, physics simulation
    │
    └── Enterprise features
        └── Team collaboration, access control, audit logs`
    },
    {
      type: 'subheader',
      text: '7.3 The Solarpunk Vision'
    },
    {
      type: 'text',
      text: 'Why we\'re building this.'
    },
    {
      type: 'code',
      language: 'diagram',
      code: `THE END GOAL: DEMOCRATIZED ENGINEERING
═══════════════════════════════════════════════════════════════════════════

    TODAY:
    ──────

    Engineering expertise is concentrated.
    ├── CAD software requires years of training
    ├── Simulation tools are expensive and complex
    ├── Professional design is out of reach for most
    └── Innovation is limited by who can afford experts


    TOMORROW (with EVOLVE):
    ───────────────────────

    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                     │
    │  USER: "I want to build a small greenhouse in my backyard.        │
    │         It should fit a 10x12 foot space, handle our Minnesota    │
    │         winters, and let me grow tomatoes year-round."             │
    │                                                                     │
    │  EVOLVE:                                                           │
    │  ├── Generates structural design meeting local codes               │
    │  ├── Simulates heating requirements for Minnesota climate          │
    │  ├── Designs LED grow light layout optimized for tomatoes          │
    │  ├── Creates irrigation system with water recycling                │
    │  ├── Produces full 3D model for visualization                      │
    │  ├── Generates parts list with local suppliers                     │
    │  ├── Creates step-by-step assembly instructions                    │
    │  └── Estimates costs and timeline                                  │
    │                                                                     │
    │  OUTPUT:                                                           │
    │  ├── Interactive 3D model you can explore                          │
    │  ├── PDF construction documents                                    │
    │  ├── Shopping list with links                                      │
    │  └── Video assembly guide                                          │
    │                                                                     │
    │  COST: A few dollars in compute                                    │
    │  TIME: A few hours (mostly overnight)                              │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘


    THE MULTIPLIER EFFECT:
    ──────────────────────

    When engineering becomes accessible:

    ├── More people can solve their own problems
    ├── Local solutions for local conditions
    ├── Innovation happens everywhere, not just tech hubs
    ├── DIY becomes DI-with-AI
    └── The solarpunk future gets closer


    THIS IS WHY WE BUILD:
    ─────────────────────

    Not to replace human creativity.
    To amplify it.

    Not to automate jobs.
    To democratize capabilities.

    Not to build for the sake of building.
    To enable a future where everyone can engineer
    solutions for their lives, their communities,
    their corner of the world.

    That\'s the vision.
    EVOLVE is the path.`
    },
    {
      type: 'header',
      text: 'Appendix A: Quick Reference'
    },
    {
      type: 'subheader',
      text: 'A.1 Framework Comparison'
    },
    {
      type: 'code',
      language: 'diagram',
      code: `FRAMEWORK COMPARISON TABLE
═══════════════════════════════════════════════════════════════════════════

    ┌──────────────┬─────────────────┬─────────────────┬────────────────┐
    │  FRAMEWORK   │  PRIMARY USE    │  KEY FEATURE    │  INTEGRATION   │
    ├──────────────┼─────────────────┼─────────────────┼────────────────┤
    │ SuperClaude  │ Research +      │ Deep research   │ Standalone or  │
    │              │ multi-agent     │ mode            │ with Claude    │
    ├──────────────┼─────────────────┼─────────────────┼────────────────┤
    │ CCPM         │ Project         │ PRD → Epic →    │ Claude Code    │
    │              │ management      │ Task workflow   │ extension      │
    ├──────────────┼─────────────────┼─────────────────┼────────────────┤
    │ Claude Flow  │ Orchestration   │ SPARC + Swarm   │ MCP-native     │
    │              │                 │ + Memory        │                │
    ├──────────────┼─────────────────┼─────────────────┼────────────────┤
    │ Claude Squad │ Parallel dev    │ Git worktrees   │ Claude Code    │
    │              │                 │                 │ instances      │
    ├──────────────┼─────────────────┼─────────────────┼────────────────┤
    │ EVOLVE       │ Full autonomous │ All of above +  │ Everything     │
    │              │ development     │ skill library   │                │
    └──────────────┴─────────────────┴─────────────────┴────────────────┘`
    },
    {
      type: 'subheader',
      text: 'A.2 Model Selection Guide'
    },
    {
      type: 'code',
      language: 'diagram',
      code: `MODEL SELECTION QUICK GUIDE
═══════════════════════════════════════════════════════════════════════════

    TASK: Complex reasoning, novel problems, architecture
    MODEL: [Claude](https://anthropic.com) Opus 4.5 (API)

    TASK: Research synthesis, code review, planning
    MODEL: [Claude](https://anthropic.com) Sonnet 4.5 (API)

    TASK: Tool calling, MCP orchestration, routine code
    MODEL: [Llama Nemotron Nano](https://nvidia.com/en-us/ai) 8B (local, 3080Ti)

    TASK: Code generation from spec, refactoring
    MODEL: [Qwen2.5-Coder](https://qwenlm.github.io) 14B Q4 (local, 3080Ti)

    TASK: Embeddings, routing, classification
    MODEL: Sentence transformers (local, CPU or 2080)

    TASK: Document understanding with images
    MODEL: [Nemotron Nano VL](https://nvidia.com/en-us/ai) 8B (local, 3080Ti)`
    },
    {
      type: 'subheader',
      text: 'A.3 MCP Server Checklist'
    },
    {
      type: 'code',
      language: 'diagram',
      code: `MCP SERVER SETUP CHECKLIST
═══════════════════════════════════════════════════════════════════════════

    BLENDER MCP (https://blender.org):
    □ Download blender-mcp addon
    □ Install in [Blender](https://blender.org) (Edit > Preferences > Add-ons)
    □ Enable addon
    □ Add to claude_desktop_config.json
    □ Restart Claude Desktop
    □ Test: "Create a red cube at origin"

    UNITY MCP (https://unity.com):
    □ Install [Unity](https://unity.com) MCP Package
    □ Configure Python MCP server
    □ Add to claude_desktop_config.json
    □ Open [Unity](https://unity.com) project
    □ Restart Claude Desktop
    □ Test: "Create empty GameObject named Test"

    LINEAR MCP (https://linear.app):
    □ Get [Linear](https://linear.app) API key
    □ Install linear-mcp package
    □ Add to claude_desktop_config.json
    □ Test: "List my [Linear](https://linear.app) issues"

    GIT MCP:
    □ Already built into Claude Code
    □ Ensure repository is initialized
    □ Test: "Show git status"`
    },
    {
      type: 'text',
      text: '---'
    },
    {
      type: 'text',
      text: '*This document represents the synthesis of months of research, experimentation, and development. It\'s a living document-as the technology evolves, so will this guide.*'
    },
    {
      type: 'text',
      text: '*-zer0 Research Team, December 2025*'
    }
  ]
};
