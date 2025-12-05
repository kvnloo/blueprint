import { Article } from '../researchData';

export const learningInterface: Article = {
  id: 'learning-interface',
  title: 'The Learning Interface',
  category: 'education',
  track: 'Evolve',
  type: 'Deep Dive',
  readTime: '45 min',
  wordCount: 8500,
  description: 'A systems architecture for accelerated knowledge acquisition. You have access to more information than any human in history—but you\'re not learning faster. The bottleneck isn\'t information, it\'s the interface between information and your brain. We\'re solving that mismatch.',
  content: [
    {
      type: 'header',
      text: 'The Learning Interface'
    },
    {
      type: 'subheader',
      text: 'A Systems Architecture for Accelerated Knowledge Acquisition'
    },
    {
      type: 'text',
      text: '*A zer0 Research Document — December 2025*'
    },
    // DIAGRAM 1: The Problem Statement
    {
      type: 'diagram',
      diagramType: 'hierarchy',
      data: {
        title: 'THE PROBLEM',
        subtitle: 'Why access to information hasn\'t accelerated learning',
        root: {
          id: 'root',
          name: 'The Bottleneck',
          subtitle: 'The interface between information and your brain',
          children: [
            {
              id: 'pdf',
              name: 'A PDF doesn\'t know',
              icon: 'file-text',
              description: 'Static content lacks awareness',
              details: [
                'What you already understand',
                'Where you\'re confused',
                'How you learn best',
                'When you\'ll forget what you just read',
                'What connections would make this click'
              ]
            },
            {
              id: 'video',
              name: 'A YouTube video can\'t',
              icon: 'play',
              description: 'Passive media lacks adaptivity',
              details: [
                'Pause when your attention drifts',
                'Adjust its pace to your comprehension',
                'Quiz you on what you just watched',
                'Connect its content to your existing knowledge',
                'Schedule itself to return at the optimal moment'
              ]
            }
          ]
        },
        outcome: {
          name: 'Content is static. Learning is dynamic.',
          subtitle: 'That mismatch is the problem we\'re solving.',
          icon: 'target'
        }
      }
    },
    {
      type: 'header',
      text: 'Part I: The Science of Accelerated Learning'
    },
    {
      type: 'subheader',
      text: '1.1 What Actually Works (And What Doesn\'t)'
    },
    {
      type: 'text',
      text: 'Before designing systems, we need to understand the mechanisms. Decades of cognitive science research have converged on a surprisingly small set of principles that actually accelerate learning. Most popular study techniques violate these principles.'
    },
    // DIAGRAM 2: Evidence Hierarchy - Tier 1
    {
      type: 'diagram',
      diagramType: 'cards',
      data: {
        title: 'TIER 1: HIGH EFFECT SIZE (d > 0.7)',
        subtitle: 'Evidence-based techniques that dramatically accelerate learning',
        cards: [
          {
            id: 'active-recall',
            title: 'ACTIVE RECALL',
            effect: 'd = 0.7-1.0',
            description: 'Testing yourself on material vs. re-reading it',
            icon: 'brain',
            details: [
              'Retrieval strengthens memory traces',
              'Identifies gaps you didn\'t know you had',
              'Mimics conditions of actual performance'
            ],
            implementation: 'Don\'t re-read. Close the book. Try to recall. If you can\'t recall it, you haven\'t learned it.'
          },
          {
            id: 'spaced-rep',
            title: 'SPACED REPETITION',
            effect: 'd = 0.8-1.2',
            description: 'Reviewing material at increasing intervals',
            icon: 'clock',
            details: [
              'Reviewing just before you forget maximizes retention',
              'Each successful retrieval extends the memory curve',
              'Less total time spent than massed practice'
            ],
            implementation: 'Optimal intervals: 1 day → 3 days → 1 week → 2 weeks → 1 month'
          },
          {
            id: 'elaboration',
            title: 'ELABORATIVE ENCODING',
            effect: 'd = 0.7-0.9',
            description: 'Connecting new information to existing knowledge',
            icon: 'link',
            details: [
              'Memory is associative, not storage-based',
              'More connections = more retrieval paths',
              'Understanding > memorization for long-term retention'
            ],
            implementation: 'Don\'t memorize isolated facts—connect to what you know using analogies and relationships'
          }
        ]
      }
    },
    // DIAGRAM 3: Forgetting Curve Visualization
    {
      type: 'diagram',
      diagramType: 'timeline',
      data: {
        title: 'THE FORGETTING CURVE',
        subtitle: 'Without spaced repetition, memory decays exponentially',
        steps: [
          { label: 'Day 1', value: '100%', description: 'Initial learning - full retention' },
          { label: 'Day 2', value: '70%', description: 'Rapid initial decay begins' },
          { label: 'Day 7', value: '50%', description: 'Without review, half is lost' },
          { label: 'Day 14', value: '35%', description: 'Continued degradation' },
          { label: 'Day 30', value: '20%', description: 'Only 1/5 remains without intervention' }
        ]
      }
    },
    // DIAGRAM 4: Tier 2 & 3 Comparison
    {
      type: 'diagram',
      diagramType: 'comparison',
      data: {
        title: 'LEARNING TECHNIQUE EFFECTIVENESS',
        subtitle: 'Most people spend 80% of study time on ineffective techniques',
        rows: [
          { aspect: 'Interleaving', left: 'd = 0.4-0.6', right: 'Moderate', status: 'warning' },
          { aspect: 'Generation Effect', left: 'd = 0.5-0.7', right: 'Moderate', status: 'warning' },
          { aspect: 'Dual Coding', left: 'd = 0.4-0.6', right: 'Moderate', status: 'warning' },
          { aspect: 'Re-reading', left: 'd = 0.1-0.2', right: 'Low', status: 'error' },
          { aspect: 'Highlighting', left: 'd = 0.0-0.1', right: 'Negligible', status: 'error' },
          { aspect: 'Passive Summarizing', left: 'd = 0.2-0.3', right: 'Low', status: 'error' }
        ],
        leftHeader: 'Effect Size',
        rightHeader: 'Evidence Level'
      }
    },
    {
      type: 'subheader',
      text: '1.2 The Four Pillars (Synthesizing the Research)'
    },
    {
      type: 'text',
      text: 'Across Justin Sung, Scott Young, Barbara Oakley, and the Flow Research Collective, four principles emerge consistently:'
    },
    // DIAGRAM 5: Four Pillars - Pillar 1
    {
      type: 'diagram',
      diagramType: 'hierarchy',
      data: {
        title: 'PILLAR 1: ENCODING QUALITY',
        subtitle: 'Source: Justin Sung (iCanStudy), cognitive psychology',
        root: {
          id: 'encoding',
          name: 'Encoding Quality',
          subtitle: 'The quality of initial encoding determines everything downstream',
          children: [
            {
              id: 'grinde',
              name: 'The GRINDE Framework',
              icon: 'brain',
              description: 'Six components of high-quality encoding',
              details: [
                'G - Grouping (chunking related information)',
                'R - Relating (connecting to existing knowledge)',
                'I - Images (creating visual representations)',
                'N - Narrative (embedding in stories)',
                'D - Doing (active engagement)',
                'E - Elaborating (explaining and extending)'
              ]
            }
          ]
        }
      }
    },
    // DIAGRAM 6: Four Pillars - Pillar 2
    {
      type: 'diagram',
      diagramType: 'comparison',
      data: {
        title: 'PILLAR 2: DIRECTNESS',
        subtitle: 'Source: Scott Young (Ultralearning) — Learn by doing the thing, not proxies',
        rows: [
          { aspect: 'Programming', left: 'Watch tutorials', right: 'Write programs', status: 'success' },
          { aspect: 'Language', left: 'Study grammar rules', right: 'Have conversations', status: 'success' },
          { aspect: 'Math', left: 'Read textbook', right: 'Solve problems', status: 'success' }
        ],
        leftHeader: 'Anti-pattern ✗',
        rightHeader: 'Pattern ✓'
      }
    },
    {
      type: 'text',
      text: '**The transfer problem**: Skills learned in one context often don\'t transfer to another. The closer your practice is to actual performance, the less transfer is needed.'
    },
    // DIAGRAM 7: Four Pillars - Pillar 3
    {
      type: 'diagram',
      diagramType: 'process',
      data: {
        title: 'PILLAR 3: FEEDBACK LOOPS',
        subtitle: 'Source: Deliberate practice research, Flow Research Collective',
        steps: [
          {
            id: 'slow',
            name: 'Slow Feedback Loop',
            duration: 'Weeks',
            icon: 'clock',
            description: 'Study → Take test → Get grade → Maybe adjust',
            problems: ['Long delay between action and feedback', 'Vague feedback (just a grade)', 'Hard to identify specific issues']
          },
          {
            id: 'fast',
            name: 'Fast Feedback Loop',
            duration: 'Seconds',
            icon: 'zap',
            description: 'Attempt → Immediate feedback → Adjust → Repeat',
            problems: []
          }
        ],
        metrics: [
          { label: 'Immediate', value: 'seconds, not days', status: 'success' },
          { label: 'Specific', value: 'exactly what was wrong', status: 'success' },
          { label: 'Actionable', value: 'how to improve', status: 'success' },
          { label: 'Calibrated', value: 'matches your level', status: 'success' }
        ]
      }
    },
    // DIAGRAM 8: The 85% Rule
    {
      type: 'diagram',
      diagramType: 'metrics',
      data: {
        title: 'THE 85% RULE',
        subtitle: 'Optimal learning occurs at ~85% success rate',
        metrics: [
          {
            label: 'Too Easy (>90%)',
            value: 90,
            unit: '%',
            status: 'warning',
            description: 'Not learning, just performing'
          },
          {
            label: 'Sweet Spot (~85%)',
            value: 85,
            unit: '%',
            status: 'success',
            description: 'Challenging but achievable'
          },
          {
            label: 'Too Hard (<70%)',
            value: 70,
            unit: '%',
            status: 'error',
            description: 'Frustration, no pattern recognition'
          }
        ]
      }
    },
    // DIAGRAM 9: Four Pillars - Pillar 4
    {
      type: 'diagram',
      diagramType: 'cards',
      data: {
        title: 'PILLAR 4: FLOW STATE OPTIMIZATION',
        subtitle: 'Source: Flow Research Collective, Mihaly Csikszentmihalyi',
        cards: [
          {
            id: 'triggers',
            title: 'Flow Triggers',
            icon: 'target',
            details: [
              'Clear goals (know exactly what you\'re trying to do)',
              'Immediate feedback (know if you\'re succeeding)',
              'Challenge-skill balance (not too easy, not too hard)',
              'Deep embodiment (fully engaged, not distracted)',
              'Risk (real consequences for failure)'
            ]
          },
          {
            id: 'neurochemistry',
            title: 'The Neurochemistry',
            icon: 'brain',
            description: 'Flow releases a cocktail of performance-enhancing chemicals',
            details: [
              'Dopamine (focus, motivation)',
              'Norepinephrine (alertness, arousal)',
              'Endorphins (pain tolerance, pleasure)',
              'Anandamide (lateral thinking, creativity)',
              'Serotonin (mood, confidence)'
            ]
          }
        ]
      }
    },
    {
      type: 'quote',
      text: 'Flow states produce 500% increases in productivity and accelerate learning dramatically.'
    },
    {
      type: 'subheader',
      text: '1.3 The Metalearning Layer'
    },
    {
      type: 'text',
      text: 'Before learning any subject, there\'s a meta-skill that accelerates everything else: learning how to learn. Scott Young calls this "metalearning"—the practice of understanding the structure of a domain before diving into its content.'
    },
    // DIAGRAM 10: Metalearning Framework
    {
      type: 'diagram',
      diagramType: 'hierarchy',
      data: {
        title: 'THE METALEARNING FRAMEWORK',
        subtitle: 'Before learning anything, ask these questions',
        root: {
          id: 'meta',
          name: 'Metalearning Questions',
          subtitle: 'The 10% rule: Spend 10% of learning time on metalearning',
          children: [
            {
              id: 'why',
              name: '1. WHY am I learning this?',
              icon: 'target',
              details: [
                'Instrumental (to achieve a goal) or intrinsic (curiosity)?',
                'What will I be able to DO when I\'ve learned it?',
                'How will I know when I\'ve learned it?'
              ]
            },
            {
              id: 'what',
              name: '2. WHAT do I need to learn?',
              icon: 'book',
              details: [
                'Concepts (understanding)',
                'Facts (memorization)',
                'Procedures (how to do things)',
                'Which is most important for this domain?'
              ]
            },
            {
              id: 'how',
              name: '3. HOW will I learn it?',
              icon: 'compass',
              details: [
                'What resources exist?',
                'What techniques work best for this type of material?',
                'Who has learned this successfully, and how did they do it?'
              ]
            }
          ]
        }
      }
    },
    // DIAGRAM 11: Territory Mapping
    {
      type: 'diagram',
      diagramType: 'hierarchy',
      data: {
        title: 'MAPPING THE TERRITORY',
        subtitle: 'Create a visual map of the domain BEFORE diving in',
        root: {
          id: 'ml',
          name: 'MACHINE LEARNING',
          subtitle: 'Example domain map',
          children: [
            {
              id: 'supervised',
              name: 'SUPERVISED LEARNING',
              icon: 'target',
              details: ['Classification', 'Regression']
            },
            {
              id: 'unsupervised',
              name: 'UNSUPERVISED LEARNING',
              icon: 'layers',
              details: ['Clustering', 'Dimensionality Reduction']
            },
            {
              id: 'reinforcement',
              name: 'REINFORCEMENT LEARNING',
              icon: 'play',
              details: ['Policy Learning', 'Value Learning']
            }
          ]
        },
        outcome: {
          name: 'This map tells you',
          subtitle: 'Major subdomains, relationships, where to focus, what to skip',
          icon: 'map'
        }
      }
    },
    {
      type: 'header',
      text: 'Part II: The Interface Problem'
    },
    {
      type: 'subheader',
      text: '2.1 Why Current Content Fails'
    },
    {
      type: 'text',
      text: 'Content today is optimized for creation, not learning. A PDF is optimized for printing. A video is optimized for watching. A blog post is optimized for reading. None of these are optimized for encoding, retention, or transfer.'
    },
    // DIAGRAM 12: The Mismatch
    {
      type: 'diagram',
      diagramType: 'comparison',
      data: {
        title: 'THE MISMATCH',
        subtitle: 'Content optimization vs. learning requirements',
        rows: [
          { aspect: 'Presentation', left: 'Linear presentation', right: 'Non-linear exploration', status: 'error' },
          { aspect: 'Engagement', left: 'Passive consumption', right: 'Active engagement', status: 'error' },
          { aspect: 'Adaptation', left: 'One-size-fits-all', right: 'Personalized adaptation', status: 'error' },
          { aspect: 'Repetition', left: 'Single exposure', right: 'Spaced repetition', status: 'error' },
          { aspect: 'Connection', left: 'Isolated information', right: 'Connected knowledge', status: 'error' },
          { aspect: 'Metrics', left: 'Consumption metrics', right: 'Retention metrics', status: 'error' },
          { aspect: 'Difficulty', left: 'Fixed difficulty', right: 'Adaptive challenge', status: 'error' },
          { aspect: 'Feedback', left: 'No feedback', right: 'Immediate feedback', status: 'error' }
        ],
        leftHeader: 'What Content Provides',
        rightHeader: 'What Learning Requires'
      }
    },
    {
      type: 'quote',
      text: 'People finish courses without learning. People read books without remembering. People watch tutorials without being able to do. The completion rate is not the learning rate.'
    },
    {
      type: 'subheader',
      text: '2.2 The Opportunity: LLMs as Learning Architects'
    },
    {
      type: 'text',
      text: 'Large language models change the equation. For the first time, we can build content interfaces that are truly adaptive.'
    },
    // DIAGRAM 13: What LLMs Enable - Part 1
    {
      type: 'diagram',
      diagramType: 'cards',
      data: {
        title: 'WHAT LLMs ENABLE',
        subtitle: 'Capabilities that transform passive content into active learning',
        cards: [
          {
            id: 'understanding',
            title: '1. CONTENT UNDERSTANDING',
            icon: 'book',
            description: 'LLMs can read and understand any content',
            details: [
              'PDFs, books, academic papers',
              'YouTube transcripts, podcast transcripts',
              'Blog posts, documentation, wikis',
              'Code repositories, technical specs'
            ],
            implementation: 'Content can be TRANSFORMED, not just CONSUMED'
          },
          {
            id: 'generation',
            title: '2. ADAPTIVE GENERATION',
            icon: 'wand',
            description: 'LLMs can generate content calibrated to you',
            details: [
              'Your current knowledge level',
              'Your learning style preferences',
              'Your specific goals',
              'Your misconceptions and gaps'
            ],
            implementation: 'One piece of content → infinite personalized versions'
          },
          {
            id: 'dialogue',
            title: '3. INTERACTIVE DIALOGUE',
            icon: 'message-circle',
            description: 'LLMs can engage in Socratic dialogue',
            details: [
              'Asking questions to test understanding',
              'Providing hints without giving answers',
              'Adjusting explanations based on responses',
              'Simulating expert tutoring at scale'
            ],
            implementation: 'Content becomes a CONVERSATION, not a monologue'
          }
        ]
      }
    },
    // DIAGRAM 14: What LLMs Enable - Part 2
    {
      type: 'diagram',
      diagramType: 'cards',
      data: {
        title: 'WHAT LLMs ENABLE (continued)',
        subtitle: 'Assessment and knowledge graph capabilities',
        cards: [
          {
            id: 'assessment',
            title: '4. AUTOMATED ASSESSMENT',
            icon: 'check-circle',
            description: 'LLMs can generate and evaluate',
            details: [
              'Questions at any difficulty level',
              'Open-ended responses (not just multiple choice)',
              'Explanations of what went wrong',
              'Predictions of what you\'re about to forget'
            ],
            implementation: 'Feedback loops measured in SECONDS, not weeks'
          },
          {
            id: 'graph',
            title: '5. KNOWLEDGE GRAPH CONSTRUCTION',
            icon: 'git-branch',
            description: 'LLMs can map relationships',
            details: [
              'Between concepts within a domain',
              'Between domains you\'re studying',
              'Between new information and what you already know',
              'Between your current level and your goals'
            ],
            implementation: 'Content becomes CONNECTED, not isolated'
          }
        ]
      }
    },
    {
      type: 'header',
      text: 'Part III: The System Architecture'
    },
    {
      type: 'subheader',
      text: '3.1 The Content Transformation Pipeline'
    },
    {
      type: 'text',
      text: 'Any content can be transformed into an optimal learning experience through a systematic pipeline:'
    },
    // DIAGRAM 15: Transformation Pipeline - Stage 1
    {
      type: 'diagram',
      diagramType: 'process',
      data: {
        title: 'THE TRANSFORMATION PIPELINE',
        subtitle: 'Stage 1: EXTRACTION',
        steps: [
          {
            id: 'input',
            name: 'Input Sources',
            icon: 'download',
            description: 'Raw content: PDF, Video, Article, Audio'
          },
          {
            id: 'extract',
            name: 'Text Extraction',
            icon: 'file-text',
            description: 'Structure parsing and content extraction'
          },
          {
            id: 'output',
            name: 'Extracted Elements',
            icon: 'layers',
            description: 'Main concepts, Supporting details, Examples, Hierarchical structure, Metadata'
          }
        ]
      }
    },
    // DIAGRAM 16: Transformation Pipeline - Stage 2
    {
      type: 'diagram',
      diagramType: 'hierarchy',
      data: {
        title: 'STAGE 2: ANALYSIS',
        subtitle: 'LLM analyzes extracted content for learning optimization',
        root: {
          id: 'analysis',
          name: 'Content Analysis',
          subtitle: 'Output: Structured knowledge representation',
          children: [
            {
              id: 'concepts',
              name: 'Core concepts',
              icon: 'brain',
              description: 'What must be understood'
            },
            {
              id: 'prereqs',
              name: 'Prerequisites',
              icon: 'git-branch',
              description: 'What you need to know first'
            },
            {
              id: 'difficulty',
              name: 'Difficulty level',
              icon: 'bar-chart',
              description: 'Beginner/intermediate/advanced'
            },
            {
              id: 'relationships',
              name: 'Concept relationships',
              icon: 'link',
              description: 'Dependency graph'
            },
            {
              id: 'misconceptions',
              name: 'Common misconceptions',
              icon: 'alert-triangle',
              description: 'What people get wrong'
            }
          ]
        }
      }
    },
    // DIAGRAM 17: Transformation Pipeline - Stage 3
    {
      type: 'diagram',
      diagramType: 'hierarchy',
      data: {
        title: 'STAGE 3: PERSONALIZATION',
        subtitle: 'Matching content to learner profile',
        root: {
          id: 'personal',
          name: 'User Profile Inputs',
          children: [
            {
              id: 'level',
              name: 'Current knowledge level',
              icon: 'target',
              description: 'Assessment or self-report'
            },
            {
              id: 'goals',
              name: 'Learning goals',
              icon: 'flag',
              description: 'Why are you learning this?'
            },
            {
              id: 'time',
              name: 'Time available',
              icon: 'clock',
              description: 'Sprint or marathon?'
            },
            {
              id: 'modalities',
              name: 'Preferred modalities',
              icon: 'eye',
              description: 'Visual/verbal/kinesthetic'
            }
          ]
        },
        outcome: {
          name: 'Matching Algorithm',
          subtitle: 'Gaps → Sequence → Calibrate to 85% → Select representations',
          icon: 'cpu'
        }
      }
    },
    // DIAGRAM 18: Transformation Pipeline - Stage 4
    {
      type: 'diagram',
      diagramType: 'cards',
      data: {
        title: 'STAGE 4: GENERATION',
        subtitle: 'Transform content into learning artifacts',
        cards: [
          {
            id: 'explanations',
            title: 'EXPLANATIONS',
            icon: 'book',
            description: 'Multiple versions at different levels',
            details: ['ELI5', 'Intermediate', 'Technical', 'Expert']
          },
          {
            id: 'visuals',
            title: 'VISUAL REPRESENTATIONS',
            icon: 'image',
            description: 'Concept maps, diagrams, timelines',
            details: ['Spatial memory anchors']
          },
          {
            id: 'practice',
            title: 'PRACTICE PROBLEMS',
            icon: 'edit',
            description: 'Graduated difficulty, immediate feedback',
            details: ['Covering all key concepts']
          },
          {
            id: 'flashcards',
            title: 'FLASHCARDS',
            icon: 'layers',
            description: 'Optimized for spaced repetition',
            details: ['Bidirectional (concept ⇄ definition)']
          },
          {
            id: 'connections',
            title: 'CONNECTIONS',
            icon: 'link',
            description: 'Links to prerequisites and related concepts',
            details: ['Analogies to familiar domains']
          },
          {
            id: 'summaries',
            title: 'SUMMARIES',
            icon: 'file-text',
            description: 'Progressive summarization (5 levels)',
            details: ['Key takeaways for different audiences']
          }
        ]
      }
    },
    // DIAGRAM 19: Transformation Pipeline - Stage 5
    {
      type: 'diagram',
      diagramType: 'hierarchy',
      data: {
        title: 'STAGE 5: DELIVERY',
        subtitle: 'Interactive interface that optimizes learning',
        root: {
          id: 'delivery',
          name: 'Delivery Interface',
          subtitle: 'Optimal learning experience',
          children: [
            {
              id: 'sequence',
              name: 'Optimal sequence',
              icon: 'list',
              description: 'Presents content in best order'
            },
            {
              id: 'testing',
              name: 'Understanding tests',
              icon: 'check-square',
              description: 'Tests after each chunk'
            },
            {
              id: 'feedback',
              name: 'Immediate feedback',
              icon: 'message-circle',
              description: 'Specific and actionable'
            },
            {
              id: 'adaptive',
              name: 'Adaptive difficulty',
              icon: 'sliders',
              description: 'Adjusts based on performance'
            },
            {
              id: 'scheduling',
              name: 'Review scheduling',
              icon: 'calendar',
              description: 'Optimal spaced intervals'
            },
            {
              id: 'exploration',
              name: 'Exploration mode',
              icon: 'compass',
              description: 'Non-linear navigation'
            }
          ]
        }
      }
    },
    {
      type: 'subheader',
      text: '3.2 The User Interface Principles'
    },
    {
      type: 'text',
      text: 'The interface isn\'t just about presenting content—it\'s about creating conditions for optimal learning. These are the principles that guide design:'
    },
    // DIAGRAM 20: UI Principles - Active vs Passive
    {
      type: 'diagram',
      diagramType: 'comparison',
      data: {
        title: 'PRINCIPLE 1: ACTIVE OVER PASSIVE',
        subtitle: 'Every interaction should require thought, not just clicks',
        rows: [
          { aspect: 'Continue', left: '"Click to continue"', right: '"Explain in one sentence what you just learned"', status: 'success' },
          { aspect: 'Answers', left: '"Here\'s the answer"', right: '"What do you think? [input] Now here\'s the answer"', status: 'success' },
          { aspect: 'Text', left: 'Long uninterrupted text', right: 'Chunked text with comprehension checks', status: 'success' }
        ],
        leftHeader: '✗ Passive',
        rightHeader: '✓ Active'
      }
    },
    // DIAGRAM 21: UI Principles - Immediate Feedback
    {
      type: 'diagram',
      diagramType: 'process',
      data: {
        title: 'PRINCIPLE 2: IMMEDIATE FEEDBACK',
        subtitle: 'Reduce the latency between attempt and feedback to near-zero',
        steps: [
          {
            id: 'answer',
            name: 'User answers question',
            icon: 'edit',
            duration: '0s'
          },
          {
            id: 'feedback',
            name: 'IMMEDIATE FEEDBACK',
            icon: 'zap',
            duration: '< 1 second',
            description: 'Correct/Incorrect indicator + Explanation of why + Connection to underlying concept + Recommendation for next step'
          }
        ]
      }
    },
    // DIAGRAM 22: UI Principles - Knowledge Map
    {
      type: 'diagram',
      diagramType: 'hierarchy',
      data: {
        title: 'PRINCIPLE 3: VISIBLE PROGRESS',
        subtitle: 'Show the learner where they are in the larger structure',
        root: {
          id: 'map',
          name: 'KNOWLEDGE MAP',
          subtitle: 'Visual representation of learning journey',
          children: [
            {
              id: 'mastered',
              name: '● Mastered Concepts',
              icon: 'check-circle',
              status: 'success',
              description: 'Completed and retained'
            },
            {
              id: 'current',
              name: '◐ Current Focus',
              icon: 'target',
              status: 'warning',
              description: 'YOU ARE HERE'
            },
            {
              id: 'upcoming',
              name: '○ Not Yet Learned',
              icon: 'circle',
              status: 'error',
              description: 'Future concepts'
            }
          ]
        }
      }
    },
    // DIAGRAM 23: Challenge-Skill Balance
    {
      type: 'diagram',
      diagramType: 'process',
      data: {
        title: 'PRINCIPLE 4: CHALLENGE-SKILL BALANCE',
        subtitle: 'Maintain the 85% success sweet spot automatically',
        steps: [
          {
            id: 'easy',
            name: 'If success rate > 90%',
            icon: 'arrow-up',
            description: 'Increase difficulty, introduce new concepts, reduce scaffolding'
          },
          {
            id: 'hard',
            name: 'If success rate < 70%',
            icon: 'arrow-down',
            description: 'Decrease difficulty, provide scaffolding, review prerequisites, offer alternatives'
          }
        ]
      }
    },
    // DIAGRAM 24: Multiple Representations
    {
      type: 'diagram',
      diagramType: 'cards',
      data: {
        title: 'PRINCIPLE 5: MULTIPLE REPRESENTATIONS',
        subtitle: 'Same concept, different formats—let the learner choose',
        cards: [
          {
            id: 'text',
            title: 'TEXT',
            icon: 'file-text',
            description: 'Mathematical description'
          },
          {
            id: 'visual',
            title: 'VISUAL',
            icon: 'image',
            description: 'Diagram of bowl'
          },
          {
            id: 'code',
            title: 'CODE',
            icon: 'code',
            description: 'Python implementation'
          },
          {
            id: 'analogy',
            title: 'ANALOGY',
            icon: 'compass',
            description: 'Ball rolling downhill'
          }
        ]
      }
    },
    {
      type: 'text',
      text: '**Example**: Gradient Descent can be explained as mathematical description, visual diagram, Python code, or analogy of a ball rolling downhill. Same concept, different entry points.'
    },
    // DIAGRAM 25: Explorable Content
    {
      type: 'diagram',
      diagramType: 'hierarchy',
      data: {
        title: 'PRINCIPLE 6: EXPLORABLE, NOT JUST LINEAR',
        subtitle: 'Let learners follow curiosity, not just curriculum',
        root: {
          id: 'topic',
          name: 'NEURAL NETWORKS',
          subtitle: 'Backpropagation uses the chain rule to compute gradients',
          children: [
            {
              id: 'chain',
              name: 'What\'s the chain rule?',
              icon: 'help-circle',
              description: 'Expandable prerequisite'
            },
            {
              id: 'why',
              name: 'Why gradients?',
              icon: 'help-circle',
              description: 'Deeper explanation available'
            },
            {
              id: 'code',
              name: 'Show me code',
              icon: 'code',
              description: 'Practical implementation'
            }
          ]
        },
        outcome: {
          name: 'Every claim has a "prove it" option',
          subtitle: 'Curiosity is rewarded, not punished',
          icon: 'compass'
        }
      }
    },
    {
      type: 'subheader',
      text: '3.3 The Retention System'
    },
    {
      type: 'text',
      text: 'Learning isn\'t complete until the knowledge is retained long-term. The system must include built-in retention mechanisms:'
    },
    // DIAGRAM 26: Spaced Repetition Engine
    {
      type: 'diagram',
      diagramType: 'timeline',
      data: {
        title: 'COMPONENT 1: SPACED REPETITION ENGINE',
        subtitle: 'For every concept learned, schedule future reviews',
        steps: [
          { label: 'Day 0', value: 'Initial Learning', description: 'First exposure and encoding' },
          { label: 'Day 1', value: 'Review 1', description: 'If successful: extend interval' },
          { label: 'Day 3', value: 'Review 2', description: 'Building memory strength' },
          { label: 'Day 7', value: 'Review 3', description: 'Weekly consolidation' },
          { label: 'Day 14', value: 'Review 4', description: 'Bi-weekly reinforcement' },
          { label: 'Day 30', value: 'Review 5', description: 'Monthly check' },
          { label: 'Day 60', value: 'Review 6', description: 'Long-term retention achieved' }
        ]
      }
    },
    // DIAGRAM 27: Interleaving Engine
    {
      type: 'diagram',
      diagramType: 'comparison',
      data: {
        title: 'COMPONENT 2: INTERLEAVING ENGINE',
        subtitle: 'Don\'t review in topic blocks. Mix topics to strengthen discrimination.',
        rows: [
          { aspect: 'Practice Style', left: 'Math → Math → Math → Physics → Physics', right: 'Math → Physics → Math → Physics → Math', status: 'success' }
        ],
        leftHeader: '✗ Blocked Practice',
        rightHeader: '✓ Interleaved Practice'
      }
    },
    {
      type: 'text',
      text: '**Why interleaving works:**\n- Forces retrieval from long-term memory (not working memory)\n- Builds discrimination between similar concepts\n- Mimics real-world conditions (problems don\'t announce their type)'
    },
    // DIAGRAM 28: Forgetting Prediction
    {
      type: 'diagram',
      diagramType: 'hierarchy',
      data: {
        title: 'COMPONENT 3: FORGETTING PREDICTION',
        subtitle: 'Predict what the learner is about to forget',
        root: {
          id: 'memory',
          name: 'Memory Strength Model',
          subtitle: 'Track and predict retention for each concept',
          children: [
            {
              id: 'track',
              name: 'For each concept, track:',
              icon: 'database',
              details: [
                'Last review time',
                'Number of successful retrievals',
                'Number of failed retrievals',
                'Average response time',
                'Confidence rating (self-reported)'
              ]
            },
            {
              id: 'predict',
              name: 'Predict:',
              icon: 'trending-down',
              details: [
                'Current memory strength (0-100%)',
                'Time until 50% forgetting probability',
                'Optimal review time (just before forgetting)'
              ]
            }
          ]
        },
        outcome: {
          name: 'Daily notification',
          subtitle: '"You\'re about to forget 3 concepts. Review now? (5 min)"',
          icon: 'bell'
        }
      }
    },
    // DIAGRAM 29: Elaboration Prompts
    {
      type: 'diagram',
      diagramType: 'comparison',
      data: {
        title: 'COMPONENT 4: ELABORATION PROMPTS',
        subtitle: 'Don\'t just test recall—test understanding and connection',
        rows: [
          { aspect: 'Basic', left: 'What is the definition of gradient descent?', right: 'Recall question', status: 'warning' },
          { aspect: 'Deeper', left: 'How is gradient descent similar to [thing you know]?', right: 'Connection building', status: 'success' },
          { aspect: 'Deeper', left: 'What would happen if the learning rate was too high?', right: 'Consequence reasoning', status: 'success' },
          { aspect: 'Deeper', left: 'When would you NOT use gradient descent?', right: 'Limitation awareness', status: 'success' }
        ],
        leftHeader: 'Question Type',
        rightHeader: 'Purpose'
      }
    },
    {
      type: 'header',
      text: 'Part IV: The Content Types'
    },
    {
      type: 'subheader',
      text: '4.1 Transforming Different Source Materials'
    },
    {
      type: 'text',
      text: 'Different source types require different transformation approaches:'
    },
    // DIAGRAM 30: Source Type Transformations - Part 1
    {
      type: 'diagram',
      diagramType: 'cards',
      data: {
        title: 'SOURCE TYPE TRANSFORMATIONS',
        subtitle: 'Transformation strategies for different content types',
        cards: [
          {
            id: 'pdf',
            title: 'PDF / BOOK',
            icon: 'book',
            description: 'Long-form, designed for sequential reading',
            details: [
              'Extract chapter/section structure → Navigation map',
              'Identify key concepts → Flashcard deck',
              'Generate comprehension questions → Active recall tests',
              'Create concept dependency graph → Learning path',
              'Write multiple explanation levels → Adaptive difficulty'
            ]
          },
          {
            id: 'video',
            title: 'YOUTUBE VIDEO / LECTURE',
            icon: 'play',
            description: 'Linear, pace set by creator',
            details: [
              'Transcribe → Searchable text',
              'Timestamp key concepts → Jump-to navigation',
              'Generate summary at multiple lengths → Progressive disclosure',
              'Insert comprehension checks → Active engagement',
              'Create "watch with questions" mode → Primed attention'
            ]
          }
        ]
      }
    },
    // DIAGRAM 31: Source Type Transformations - Part 2
    {
      type: 'diagram',
      diagramType: 'cards',
      data: {
        title: 'SOURCE TYPE TRANSFORMATIONS (continued)',
        subtitle: 'More content types and their transformation strategies',
        cards: [
          {
            id: 'blog',
            title: 'BLOG POST / ARTICLE',
            icon: 'file-text',
            description: 'Variable quality and depth',
            details: [
              'Identify claims → Fact-check and validate',
              'Map prerequisites → "Read this first" suggestions',
              'Connect to related content → Knowledge graph node',
              'Generate opposing viewpoints → Critical thinking prompts',
              'Extract actionable takeaways → Implementation checklist'
            ]
          },
          {
            id: 'paper',
            title: 'ACADEMIC PAPER',
            icon: 'graduation-cap',
            description: 'Technical jargon, assumes domain expertise',
            details: [
              'Generate plain-language summary → Accessible entry point',
              'Explain methodology in steps → Demystification',
              'Identify key claims and evidence → Claim-evidence map',
              'Compare to related papers → Contextualization',
              'Create technical glossary → Just-in-time definitions'
            ]
          },
          {
            id: 'code',
            title: 'CODE REPOSITORY / DOCUMENTATION',
            icon: 'code',
            description: 'Often assumes context',
            details: [
              'Generate "hello world" → Simplest working example',
              'Create graduated examples → Complexity ladder',
              'Map concepts to code → Bidirectional linking',
              'Generate common mistakes → Error anticipation',
              'Build debugging scenarios → Troubleshooting skills'
            ]
          }
        ]
      }
    },
    {
      type: 'header',
      text: 'Part V: The Vision'
    },
    {
      type: 'subheader',
      text: '5.1 What This Enables'
    },
    {
      type: 'text',
      text: 'When content becomes truly adaptive and learning-optimized, several things become possible that aren\'t possible today:'
    },
    // DIAGRAM 32: Transformed Experience
    {
      type: 'diagram',
      diagramType: 'comparison',
      data: {
        title: 'THE TRANSFORMED LEARNING EXPERIENCE',
        subtitle: 'Content-centric vs. Learner-centric approaches',
        rows: [
          { aspect: 'Flow', left: 'User finds content → Consumes → Forgets', right: 'User defines goal → System builds path → Content adapts', status: 'success' },
          { aspect: 'Measure', left: 'Success = Completion', right: 'Success = Retention & Transfer', status: 'success' },
          { aspect: 'Control', left: 'Content controls experience', right: 'Learner controls experience', status: 'success' }
        ],
        leftHeader: 'TODAY: Content-centric',
        rightHeader: 'TOMORROW: Learner-centric'
      }
    },
    // DIAGRAM 33: What Becomes Possible
    {
      type: 'diagram',
      diagramType: 'cards',
      data: {
        title: 'WHAT BECOMES POSSIBLE',
        subtitle: 'Capabilities enabled by the learning interface',
        cards: [
          {
            id: 'speed',
            title: '1. LEARN ANY SKILL IN HALF THE TIME',
            icon: 'zap',
            description: 'By eliminating wasted effort on ineffective techniques and optimizing every interaction for retention'
          },
          {
            id: 'retain',
            title: '2. NEVER FORGET WHAT YOU\'VE LEARNED',
            icon: 'brain',
            description: 'Through intelligent spaced repetition that schedules review at exactly the right moment'
          },
          {
            id: 'connect',
            title: '3. CONNECT KNOWLEDGE ACROSS DOMAINS',
            icon: 'git-branch',
            description: 'By building explicit links between concepts from different sources and fields'
          },
          {
            id: 'source',
            title: '4. LEARN FROM ANY SOURCE',
            icon: 'download',
            description: 'By transforming passive content into active learning experiences automatically'
          },
          {
            id: 'gaps',
            title: '5. KNOW WHAT YOU DON\'T KNOW',
            icon: 'help-circle',
            description: 'Through continuous assessment that reveals gaps you didn\'t know you had'
          },
          {
            id: 'flow',
            title: '6. LEARN IN FLOW STATE',
            icon: 'target',
            description: 'By maintaining optimal challenge-skill balance and providing triggers that induce flow'
          }
        ]
      }
    },
    {
      type: 'subheader',
      text: '5.2 The Development Roadmap'
    },
    {
      type: 'text',
      text: 'Building this system requires solving problems in a specific order:'
    },
    // Keep remaining roadmap as text since it's structured prose
    {
      type: 'text',
      text: '**PHASE 1: CORE TRANSFORMATION ENGINE**\nBuild the pipeline that transforms any content into learning artifacts:\n- Text extraction from PDFs, videos, web pages\n- Concept extraction and structure parsing\n- Question generation at multiple difficulty levels\n- Flashcard generation optimized for spaced repetition\n\n*Success metric: Can transform any content into interactive experience*'
    },
    {
      type: 'text',
      text: '**PHASE 2: ADAPTIVE LEARNING INTERFACE**\nBuild the UI that delivers transformed content optimally:\n- Active engagement mechanics (not passive scrolling)\n- Immediate feedback on every response\n- Visible progress and knowledge mapping\n- Mobile-first design for learning anywhere\n\n*Success metric: Users learn measurably faster than with raw content*'
    },
    {
      type: 'text',
      text: '**PHASE 3: RETENTION SYSTEM**\nBuild the system that ensures long-term retention:\n- Spaced repetition scheduling (SM-2 or FSRS algorithm)\n- Forgetting prediction and proactive review prompts\n- Interleaving engine for mixed practice\n\n*Success metric: 90%+ retention at 30 days (vs. ~20% baseline)*'
    },
    {
      type: 'text',
      text: '**PHASE 4: PERSONALIZATION ENGINE**\nBuild the system that adapts to each learner:\n- Learning style detection and accommodation\n- Knowledge gap identification and remediation\n- Difficulty calibration (85% success target)\n\n*Success metric: Each user gets a unique, optimized experience*'
    },
    {
      type: 'text',
      text: '**PHASE 5: FLOW STATE OPTIMIZATION**\nBuild the system that induces and maintains flow:\n- Challenge-skill balance automation\n- Distraction elimination features\n- Session design for flow entry\n- Optional biofeedback integration (EEG, HRV)\n\n*Success metric: Users report flow state in learning sessions*'
    },
    {
      type: 'subheader',
      text: '5.3 The Invitation'
    },
    {
      type: 'text',
      text: 'Content is everywhere. Understanding is rare. The gap isn\'t information access—it\'s information transformation.'
    },
    {
      type: 'text',
      text: 'We have libraries of knowledge locked in formats designed for printers, cameras, and servers. We need to unlock them into formats designed for human brains.'
    },
    {
      type: 'text',
      text: 'This is the project: build the interface between human cognition and human knowledge. Make learning as fast as it should be.'
    },
    {
      type: 'quote',
      text: 'What if every piece of content you consumed knew what you already understood, adjusted to your level in real-time, tested your comprehension as you went, connected to everything else you\'ve learned, scheduled itself to return before you forgot, and made learning feel like flow? That\'s not science fiction. That\'s an engineering problem. We\'re solving it.'
    },
    {
      type: 'header',
      text: 'Appendix: Key Frameworks Referenced'
    },
    {
      type: 'subheader',
      text: 'Learning Methodologies'
    },
    {
      type: 'text',
      text: '| Framework | Source | Core Insight |\n|-----------|--------|---------------|\n| Elaborative Encoding | Justin Sung | Quality of initial encoding determines retention |\n| Ultralearning | Scott Young | Directness, drill, feedback, retrieval |\n| Learning How to Learn | Barbara Oakley | Focused/diffuse modes, chunking, spaced repetition |\n| Flow State | Csikszentmihalyi | Challenge-skill balance, clear goals, immediate feedback |\n| Deliberate Practice | Anders Ericsson | Purposeful practice with expert feedback |\n| PARA Method | Tiago Forte | Projects, Areas, Resources, Archives |'
    },
    {
      type: 'subheader',
      text: 'Effect Sizes (Cohen\'s d)'
    },
    {
      type: 'text',
      text: '| Technique | Effect Size | Evidence Level |\n|-----------|-------------|----------------|\n| Active Recall | 0.7-1.0 | Strong |\n| Spaced Repetition | 0.8-1.2 | Strong |\n| Elaboration | 0.7-0.9 | Strong |\n| Interleaving | 0.4-0.6 | Moderate |\n| Re-reading | 0.1-0.2 | Weak |\n| Highlighting | 0.0-0.1 | Negligible |'
    },
    {
      type: 'subheader',
      text: 'Technology Enablers'
    },
    {
      type: 'text',
      text: '| Technology | Application |\n|------------|-------------|\n| LLMs | Content understanding, generation, dialogue |\n| Spaced Repetition Algorithms | Optimal review scheduling (SM-2, FSRS) |\n| Knowledge Graphs | Concept relationship mapping |\n| Adaptive Testing | Difficulty calibration |\n| NLP | Text extraction, summarization, Q&A |'
    },
    {
      type: 'text',
      text: '*The interface between knowledge and understanding is the last mile. We\'re building the road.*'
    },
    {
      type: 'text',
      text: '*—zer0 Research, December 2025*'
    }
  ]
};
