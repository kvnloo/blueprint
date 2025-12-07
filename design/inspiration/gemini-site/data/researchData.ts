
export interface ArticleSection {
  type: 'text' | 'header' | 'subheader' | 'quote' | 'diagram' | 'code';
  value?: string;
  diagramType?: 'timeline' | 'barchart' | 'stack' | 'comparison' | 'pyramid';
  data?: any;
  language?: string;
}

export type ArticleTrack = 'Blueprint' | 'World Sim' | 'Evolve';
export type ArticleType = 'Deep Dive' | 'Casual' | 'Technical Guide';

export interface Article {
  id: string;
  title: string;
  category: string;
  track: ArticleTrack;
  type: ArticleType;
  readTime: string;
  wordCount: number;
  description: string;
  content: ArticleSection[];
}

export const researchData: Article[] = [
  {
    id: 'limitless-protocol',
    title: 'The Limitless Protocol',
    category: 'Human Performance',
    track: 'Blueprint',
    type: 'Deep Dive',
    readTime: '35 min read',
    wordCount: 3800,
    description: 'A Systems Approach to Human Peak Performance: Metalearning, Flow, and Biological Optimization.',
    content: [
      { type: 'quote', value: '"The only impossible journey is the one you never begin." — Tony Robbins' },
      { type: 'text', value: 'What if you could learn any skill in half the time, maintain focus for hours without fatigue, and operate at your cognitive peak every single day? This isn\'t a fictional pill—it\'s a systematic protocol built on cutting-edge neuroscience, validated training methods, and closed-loop biological optimization.' },
      
      { type: 'header', value: 'The Knowledge Architecture' },
      { type: 'text', value: 'This document is designed using principles from metalearning research to maximize your comprehension and long-term retention. We\'re going to teach you how to learn while teaching you the content itself—a recursive optimization.' },
      { type: 'text', value: '🧠 Memory Anchors: Each major section connects to spatial metaphors (kitchen → garden → laboratory) that you can mentally traverse.' },
      { type: 'text', value: '🔗 Concept Bridges: Technical concepts are linked to familiar analogies. When you see [ANCHOR: concept], this is a deliberate connection point.' },
      { type: 'text', value: '📊 Progressive Complexity: We start with the "what" and "why" before diving into the "how." Skip to any section using the navigation map above.' },
      { type: 'text', value: '🎯 Active Encoding Questions: Look for ❓ markers—these are reflection points designed to strengthen neural pathways through active recall' },
      
      { type: 'subheader', value: 'Mental Model: The Four Pillars' },
      { type: 'text', value: 'Before diving in, anchor these four concepts in your mind. Every technique in this document connects back to one or more of these pillars:' },
      
      { 
        type: 'diagram', 
        diagramType: 'stack', 
        data: { 
          layers: [
            { label: 'Pillar 4: Recovery (Consolidation)', type: 'Integration' },
            { label: 'Pillar 3: Flow States (Performance)', type: 'Execution' },
            { label: 'Pillar 2: Encoding (Metalearning)', type: 'Acquisition' },
            { label: 'Pillar 1: Biological Optimization', type: 'Hardware' },
          ] 
        } 
      },
      { type: 'text', value: '"You cannot out-think a broken brain, out-perform a sick body, or out-learn an exhausted mind."' },

      { type: 'header', value: 'Part I: The Science of Accelerated Learning' },
      
      { type: 'subheader', value: '1.1 Metalearning: Learning How to Learn' },
      { type: 'text', value: 'Metalearning is the practice of understanding the learning process itself—and optimizing it. Before you learn anything, you should first understand how to learn that thing most effectively.' },
      { type: 'subheader', value: 'The Justin Sung Framework: Higher-Order Learning' },
      { type: 'text', value: 'Dr. Justin Sung, a learning coach who has trained over 35,000 students across 120 countries, emphasizes a critical insight that most learners miss: encoding quality matters more than retrieval quantity.' },
      { type: 'text', value: 'Most learners focus on Short-Term Memory input (7 +/- 2 items), but the bottleneck is the Encoding process into Long-Term Memory. If encoding is weak, retrieval practice is simply retrieving nothing. If encoding is strong, retrieval practice reinforces solid foundations.' },
      
      { type: 'subheader', value: 'Bloom\'s Taxonomy: The Hierarchy of Learning' },
      { type: 'text', value: 'Not all learning is equal. Bloom\'s Taxonomy shows a hierarchy from lower-order to higher-order thinking. Most students spend 80% of their study time on the bottom two levels (Remember, Understand) through re-reading and highlighting. But the actual learning gains come from the top three levels (Analyze, Evaluate, Create).' },

      { 
        type: 'diagram', 
        diagramType: 'pyramid', 
        data: { 
          levels: [
            { category: 'Top Tier', label: 'Create / Synthesis' },
            { category: 'High Tier', label: 'Evaluate / Judgment' },
            { category: 'Mid Tier', label: 'Analyze / Breakdown' },
            { category: 'Base Tier', label: 'Remember / Recall' },
          ] 
        } 
      },

      { type: 'subheader', value: 'The Scott Young Ultralearning Framework' },
      { type: 'text', value: 'Scott Young, author of *Ultralearning*, studied how world-class performers acquire skills rapidly. He identified nine principles that accelerated learners consistently apply:' },
      { type: 'text', value: '1. METALEARNING: Start by learning how to learn the subject. Interview experts. Understand the landscape.' },
      { type: 'text', value: '2. FOCUS: Sharpen your concentration. Remove distractions. Practice sustained attention before complex learning.' },
      { type: 'text', value: '3. DIRECTNESS: Learn by doing the thing you want to be good at. Don\'t rely on proxies. Want to speak French? SPEAK French.' },
      { type: 'text', value: '4. DRILL: Attack your weakest points relentlessly. Isolate the sub-skill. Overload it.' },
      { type: 'text', value: '5. RETRIEVAL: Test yourself instead of reviewing. Effort of recall strengthens memory.' },
      { type: 'text', value: '6. FEEDBACK: Get signal on what you\'re doing wrong. The faster the feedback, the faster you improve.' },
      { type: 'text', value: '7. RETENTION: Don\'t just learn—make it stick. Spaced repetition. Active recall. Sleep.' },
      { type: 'text', value: '8. INTUITION: Develop deep understanding, not surface knowledge. Ask "why" until you can\'t anymore.' },
      { type: 'text', value: '9. EXPERIMENTATION: Explore beyond your comfort zone. Try new techniques. Abandon what doesn\'t work.' },

      { type: 'subheader', value: 'Practical Application: The Encoding Protocol' },
      { type: 'text', value: 'Here is how to actually implement higher-order encoding during any learning session:' },
      { type: 'text', value: 'PHASE 1: PRIMING (5 minutes)\nBefore touching the material, ask yourself:\n• What do I already know about this topic?\n• What questions do I have going in?\n• How does this connect to things I\'ve learned before?\n• Why does this matter? (Real-world application)' },
      { type: 'text', value: 'PHASE 2: FIRST PASS (Variable)\nEngage with the material, but ACTIVELY:\n• Don\'t highlight—write questions in margins\n• Don\'t re-read—pause and explain to yourself\n• Don\'t passively watch—stop and summarize' },
      { type: 'text', value: 'PHASE 3: ENCODING QUESTIONS (10-15 minutes)\nAfter the material, answer these:\nANALYZE: "How does concept A relate to concept B?"\nEVALUATE: "What\'s the strongest/weakest part of this theory?"\nCREATE: "How would I explain this to a 12-year-old?"' },
      { type: 'text', value: 'PHASE 4: EXTERNALIZATION (10-15 minutes)\nCreate something that forces structure:\n• Mind map showing relationships\n• Teach-back to an imaginary student\n• Write a one-paragraph summary from memory\n• Create 3-5 active recall questions for later' },
      { type: 'text', value: 'PHASE 5: SPACING SETUP (2 minutes)\nSchedule your retrieval practice:\n• Same day: Quick review before sleep\n• Next day: Answer your active recall questions\n• 3 days: Attempt to teach it\n• 7 days: Apply it to a new problem' },

      { type: 'subheader', value: '1.2 Flow States: Peak Mental Performance on Demand' },
      { type: 'text', value: 'Flow is an optimal state of consciousness where you feel and perform your best. Research from the Flow Research Collective, led by Steven Kotler, has identified that flow states can produce:' },
      { type: 'text', value: '• 500% increase in productivity (McKinsey study)\n• 430% increase in creative problem-solving (University of Sydney)\n• 490% increase in skill acquisition (DARPA/Advanced Brain Monitoring)\n• 3 days of heightened creativity after a single flow state (Harvard)' },

      { type: 'text', value: 'During flow, your brain releases a cocktail of performance-enhancing neurochemicals in a specific sequence. Norepinephrine + Dopamine -> Flow State (Dopamine, Anandamide, Endorphins). Result: Time distortion, Effortless action, Ego dissolution.' },

      { type: 'subheader', value: 'The 22 Flow Triggers' },
      { type: 'text', value: 'Research has identified 22 conditions that can induce flow states. They fall into four categories:' },
      { type: 'text', value: 'PSYCHOLOGICAL TRIGGERS (Internal States):\n1. Intensely Focused Attention\n2. Clear Goals\n3. Immediate Feedback\n4. Challenge/Skills Balance' },
      { type: 'text', value: 'ENVIRONMENTAL TRIGGERS (External Conditions):\n5. High Consequences\n6. Rich Environment\n7. Deep Embodiment' },
      { type: 'text', value: 'SOCIAL TRIGGERS (Group Conditions):\n8. Serious Concentration\n9. Shared Clear Goals\n10. Good Communication\n11. Familiarity\n12. Equal Participation\n13. Risk\n14. Sense of Control\n15. Close Listening\n16. Always Say Yes' },
      { type: 'text', value: 'CREATIVE TRIGGERS (Artistic Conditions):\n17. Creativity\n18. Intrinsic Motivation\n19. Curiosity/Passion\n20. Autonomy\n21. Mastery\n22. Purpose' },

      { type: 'subheader', value: 'The Flow Cycle' },
      { type: 'text', value: 'Flow is not a switch—it\'s a cycle with four distinct phases. You cannot skip phases. Many people try to white-knuckle through the struggle directly into flow, but this backfires. You MUST struggle first, then release, THEN flow emerges naturally.' },
      { type: 'code', language: 'text', value: 'THE FLOW CYCLE:\n\n1. STRUGGLE: Load the brain with info. Often frustrating. NORMAL.\n   ↓\n2. RELEASE: Take mind OFF the problem. Go for a walk. Light exercise. Shower.\n   ↓\n3. FLOW: Peak performance zone. Time dilates. Ego dissolves. Action and awareness merge.\n   ↓\n4. RECOVERY: Recharge for next cycle. Sleep, nature, social time.' },

      { type: 'subheader', value: 'The Challenge/Skills Balance (4% Rule)' },
      { type: 'text', value: 'The most important trigger for individual flow is the challenge/skills balance—staying in the "stretch zone" where the task is ~4% beyond your current ability. Too much stretch (>10%) leads to Anxiety and cortisol blocks learning. Too little stretch (<2%) leads to Boredom and no engagement. The Goldilocks zone (3-5%) leads to Flow.' },

      { type: 'subheader', value: '1.3 Biological Optimization' },
      { type: 'text', value: 'You cannot out-think a broken brain. Bryan Johnson\'s Blueprint protocol demonstrates what\'s achievable with systematic biological optimization. While the full protocol costs ~$2M/year, the underlying principles are universally applicable.' },
      { type: 'text', value: 'The Hierarchy of Biological Optimization:\n1. COGNITIVE PEAK PERFORMANCE\n2. Requires: Metabolic Health + Hormonal Balance\n3. Requires: Sleep (7-9 hours) + Nutrition\n4. Requires: Exercise (Zone 2 + Strength)' },
      
      { 
        type: 'diagram', 
        diagramType: 'comparison', 
        data: { 
          rows: [
            { metric: 'Focus', human: 'Blueprint (Precision)', robot: 'Blue Zones (Natural)' },
            { metric: 'Diet', human: 'Measured Macros', robot: 'Plant-Forward' },
            { metric: 'Movement', human: 'Structured Hour', robot: 'Constant Low-Level' },
            { metric: 'Recovery', human: 'HRV Tracking', robot: 'Social Rituals' },
          ] 
        } 
      },

      { type: 'text', value: 'Blue Zones Synthesis:\nOKINAWA: Ikigai (purpose), Hara hachi bu (80% full), Strong social networks.\nSARDINIA: Sheep herding (Zone 2), Strong family bonds, Moderate wine.\nNICOYA: Plan de vida (purpose), Hard water (minerals), Light dinner before dark.\nIKARIA: Mediterranean diet, Daily naps, Walking terrain.\nLOMA LINDA: Sabbath rest (weekly), Vegetarian diet, Tight community.\n\nCommon Thread: Purpose + Movement + Plants + Community + Recovery Rhythms.' },

      { type: 'header', value: 'Part II: The Training Tools' },
      
      { type: 'subheader', value: '2.1 DARPA-Grade Accelerated Learning' },
      { type: 'text', value: 'DARPA\'s Targeted Neuroplasticity Training (TNT) program discovered that peripheral nerve stimulation during learning can boost skill acquisition by up to 490%. By stimulating the Vagus Nerve (tVNS), the brain releases Norepinephrine, Dopamine, and Acetylcholine, enhancing synaptic plasticity for faster encoding.' },
      { type: 'text', value: 'tDCS (Transcranial Direct Current Stimulation) has also shown results. DARPA accelerated learning montages showed doubled learning speeds in sniper training and pattern recognition by modulating cortical excitability (Anode increases firing, Cathode decreases firing).' },
      { type: 'text', value: 'The "Digital Tutor" model showed that intelligent tutoring systems with frequent dialogue, mastery-based progression, and immediate feedback could compress years of Navy IT training into months.' },

      { type: 'subheader', value: '2.2 Visuomotor Training: Strobe Glasses' },
      { type: 'text', value: 'Cutting-edge athletic training now incorporates stroboscopic visual training (SVT) to enhance visuomotor performance. The glasses alternate between transparent and opaque (strobe effect). This forces the brain to extrapolate motion during gaps, enhancing visual processing efficiency, reaction time, and working memory.' },
      
      { type: 'code', language: 'text', value: '6-WEEK STROBE PROTOCOL:\n\nWeek 1: Frequency 15 Hz, Duty cycle 50% (Easy)\nWeek 2: Frequency 13 Hz, Duty cycle 50%\nWeek 3: Frequency 11 Hz, Duty cycle 50%\nWeek 4: Frequency 10 Hz, Duty cycle 50%\nWeek 5: Frequency 9 Hz, Duty cycle 60% (Hard)\nWeek 6: Frequency 9 Hz, Duty cycle 70% (Elite)\n\nDo 20 mins, 3x/week while performing cognitive or motor tasks.' },

      { type: 'subheader', value: '2.3 Recovery and Consolidation: NSDR' },
      { type: 'text', value: 'Learning doesn\'t happen during practice—it happens during rest. Non-Sleep Deep Rest (NSDR), or Yoga Nidra, accelerates neuroplasticity by up to 50% when performed immediately after a learning bout. It restores dopamine in the striatum and activates the parasympathetic nervous system.' },

      { type: 'code', language: 'text', value: '20-MINUTE NSDR PROTOCOL (Yoga Nidra Style):\n\n1. SETUP (2 min): Lie flat on your back (corpse pose). Arms at sides.\n2. INTENTION (1 min): Set a simple intention ("I am focused and calm").\n3. BODY SCAN (8 min): Systematically move attention through body parts. Notice sensation, relax, move on.\n4. BREATH AWARENESS (4 min): Observe natural breath. Count 10 exhales backwards.\n5. VISUALIZATION (3 min): Imagine a peaceful scene. Engage all senses.\n6. RETURN (2 min): Restate intention. Gradually deepen breath. Slowly open eyes.' },

      { type: 'text', value: 'The Neuroplasticity Super Protocol combines intense focus blocks with immediate NSDR sessions to maximize consolidation. 90-minute focus block -> 20-minute NSDR. This captures the neural patterns while they are fresh.' },

      { type: 'header', value: 'Part III: The Integrated Daily Protocol' },
      { type: 'text', value: 'Combining these elements into a cohesive daily system prevents burnout and maximizes output. Here is the integrated "Limitless" schedule based on circadian biology:' },

      { 
        type: 'diagram', 
        diagramType: 'timeline', 
        data: { 
          steps: [
            { label: '06:00', value: 'Wake + Light + Hydrate' },
            { label: '06:30', value: 'Movement (Zone 2)' },
            { label: '08:00', value: 'Focus Block 1 (Primary Skill)' },
            { label: '09:30', value: 'NSDR (20 min Consolidation)' },
            { label: '14:00', value: 'Focus Block 2 (Secondary Skill)' },
            { label: '15:30', value: 'NSDR (Optional)' },
            { label: '22:00', value: 'Sleep (7-9h)' },
          ] 
        } 
      },

      { type: 'text', value: 'Weekends are for recovery. This system is designed for 5 high-intensity days, 1 reduced day, and 1 full rest day. \n\nMeta-Principle: Systems Over Goals. "I want to learn Spanish" is a goal. "I have a daily Spanish practice system" is a system. You don\'t achieve limitless—you BECOME limitless through daily practice.' },
      
      { type: 'subheader', value: 'The Closed-Loop System' },
      { type: 'text', value: 'The ultimate optimization connects input (training, nutrition, sleep) to output (performance, biomarkers) through continuous measurement. Track HRV, Sleep, and Glucose. If HRV is low, switch protocol to recovery. If Sleep is great, tackle the hardest task. Let the data drive the protocol.' },

      { type: 'header', value: 'Conclusion' },
      { type: 'text', value: 'The "Limitless Pill" is not a substance—it is a system. It requires consistent execution, feedback loops, and a refusal to accept "average" as your cognitive baseline.\n\n"We are what we repeatedly do. Excellence, then, is not an act, but a habit." — Will Durant' }
    ]
  },
  {
    id: 'home-grown',
    title: 'The Home-Grown Revolution',
    category: 'AgriTech',
    track: 'World Sim',
    type: 'Deep Dive',
    readTime: '40 min read',
    wordCount: 3600,
    description: 'From NASA\'s Space Farms to Your Kitchen Counter: A Systems Engineering Approach to Growing Perfect Produce at Any Budget.',
    content: [
      { type: 'quote', value: 'The future belongs to those who understand that doing more with less is compassionate, prosperous, and enduring. — Paul Hawken' },
      { type: 'text', value: 'What if the freshest, most nutritious salad you\'ve ever tasted was growing three feet from where you\'re sitting right now? What if you could replicate the same technologies NASA uses to grow food on the International Space Station—for less than the cost of a nice dinner out?\n\nThis isn\'t about becoming a farmer. It\'s about solving a puzzle: how do we take billion-dollar space agriculture research and distill it into something anyone can build on a Saturday afternoon?' },
      
      { type: 'header', value: 'Part I: The Problem You Didn\'t Know You Had' },
      { type: 'subheader', value: 'The Nutrient Degradation Curve' },
      { type: 'text', value: 'Produce starts dying the moment it\'s harvested. Not metaphorically—biochemically. Research from UC Davis shows that vitamin C losses in vegetables stored at refrigerator temperatures for just one week range from 15% in green peas to a staggering 77% in green beans. Broccoli stored at room temperature loses 56% of its vitamin C in a week.' },
      { type: 'text', value: 'But here\'s the catch: you\'re not getting produce at Day 0. The supply chain averages 5-14 days from harvest to store. By the time you eat that "fresh" salad, it might be 2-3 weeks old.' },
      
      { 
        type: 'diagram', 
        diagramType: 'barchart', 
        data: { 
          title: 'Vitamin C Retention (Green Beans @ 4°C)', 
          items: [
            { label: 'Harvest (Hour 0)', value: 100 },
            { label: 'Transport (Day 2)', value: 85 },
            { label: 'Store Shelf (Day 4)', value: 60 },
            { label: 'Your Fridge (Day 7)', value: 23 },
          ] 
        } 
      },

      { type: 'subheader', value: 'The Taste Dimension' },
      { type: 'text', value: 'Flavor compounds are even more volatile than vitamins. The tomatoes you buy at the supermarket are picked green—weeks before they\'re ripe—because ripe tomatoes don\'t survive shipping. They are then treated with ethylene gas to trigger color change. The result? A tomato that looks red but never developed the complex sugars, acids, and volatile aromatics that make a vine-ripened tomato taste like summer.' },
      { type: 'text', value: 'The Solution Space: 1. Zero Transit Time (Harvest at 6 PM, Eat at 6:01 PM). 2. Peak Ripeness Harvest. 3. Variety Selection (Optimize for taste, not shipping durability).' },

      { type: 'header', value: 'Part II: What NASA Figured Out' },
      { type: 'text', value: 'NASA\'s challenge is the ultimate constraint satisfaction problem: grow food for astronauts using the least possible mass, power, water, and crew time—while maximizing nutrition, safety, and yield. Their research produced key insights we can use at home.' },
      
      { type: 'subheader', value: '2.1 LED Spectrum Science' },
      { type: 'text', value: 'NASA proved that LEDs could replace sunlight—and optimize beyond it. Plants primarily use Photosynthetically Active Radiation (PAR). Blue light (400-500nm) drives vegetative growth and compact stems. Red light (620-680nm) is the primary driver of photosynthesis and flowering. Green light (500-600nm) penetrates the canopy.' },
      { type: 'text', value: 'The Far-Red Revolution: Research from 2024 at controlled-environment vertical farms showed that supplementing white LEDs with deep red (660nm) and far-red (730nm) dramatically improved yields. In lettuce, high-PPFD treatment with supplemental red increased fresh weight by 76%. Practical Implication: Adding inexpensive far-red LED strips to your setup can significantly boost yields.' },

      { 
        type: 'diagram', 
        diagramType: 'comparison', 
        data: { 
          rows: [
            { metric: 'Blue Light', human: 'Vegetative Growth', robot: 'Compact Stems' },
            { metric: 'Red Light', human: 'Photosynthesis', robot: 'Flowering' },
            { metric: 'Far-Red', human: 'Leaf Expansion', robot: '+76% Yield' },
          ] 
        } 
      },

      { type: 'subheader', value: '2.2 Water & Nutrient Delivery' },
      { type: 'text', value: 'NASA tested multiple hydroponic approaches. The "Veggie" system uses a passive wicking pillow. The Advanced Plant Habitat uses 180+ sensors. For home use, Kratky (Passive), NFT (Film Technique), and Aeroponics offer the best effort-to-result ratios.' },
      { type: 'text', value: 'Environment Control: NASA discovered CO2 enrichment (1000-1500ppm) can boost growth by 30-40%. Temperature and Humidity (VPD) must be optimized for transpiration.' },

      { type: 'header', value: 'Part III: The Builds' },
      
      { type: 'subheader', value: 'Tier 1: The Kratky Windowsill ($50-100)' },
      { type: 'text', value: 'The Kratky method is essentially what NASA would design if they had no power budget. It is a passive deep water culture technique. No pumps, no electricity (aside from lights). It works by leaving an air gap for roots as the water level drops.' },
      { type: 'text', value: 'Shopping List:\n• 5-gallon bucket with lid ($15)\n• 3" net cups & Hydroton pebbles ($20)\n• Masterblend 4-18-38 Nutrient Kit ($25)\n• Budget Grow Light ($30-40)' },
      { type: 'code', language: 'text', value: 'TIER 1 BUILD GUIDE:\n\n1. Cut 3" holes in bucket lid.\n2. Mix Nutrients (Per Gallon: 2g Masterblend, 2g Calc Nitrate, 1g Epsom Salt).\n3. Fill bucket until water just touches bottom of net cups.\n4. Insert rockwool seedling into net cup with clay pebbles.\n5. Place light 12-18" above.\n6. Wait 4-5 weeks for harvest. Do not refill (unless very thirsty).' },

      { type: 'subheader', value: 'Tier 2: The PVC Tower Garden ($150-300)' },
      { type: 'text', value: 'This vertical aeroponic/hydroponic hybrid gives you 20-28 plant sites in 2 square feet. A submersible pump lifts water to the top, and it rains down inside the post over the roots.' },
      { type: 'text', value: 'Shopping List:\n• 5x5 PVC Fence Post (8ft) ($30)\n• Submersible Pump 400GPH ($20)\n• Digital Timer ($12)\n• 5-Gallon Bucket or Tote ($15)\n• PVC cement, 3" pipe for net cup holders ($30)\n• LED Grow Light Panels ($100)' },
      { type: 'code', language: 'text', value: 'TIER 2 BUILD GUIDE:\n\n1. Cut fence post to 5-6ft.\n2. Cut 3" holes staggered on all 4 sides (every 8-10 inches).\n3. Glue 45-degree PVC elbows or 3" pipe cuts into holes to hold cups.\n4. Mount post to bucket lid.\n5. Connect pump to 1/2" tubing running to top of tower.\n6. Set timer: 15 min ON / 45 min OFF (Daytime).\n7. Result: High-density production for leafy greens and herbs.' },

      { type: 'subheader', value: 'Tier 3: The Home CEA System ($400-800)' },
      { type: 'text', value: 'Controlled Environment Agriculture. This is for NASA-level control. Enclosed environment (tent/cabinet) with automated climate.' },
      { type: 'text', value: 'Components:\n• Grow Tent 4x4 or 5x5 ($100)\n• Inline Fan + Carbon Filter ($80)\n• NFT Channels or DWC System ($100)\n• Full Spectrum LED 240W+ ($150)\n• Sensors: WiFi Temp/Humidity/CO2 ($50)\n• Automation: Smart Plugs or Raspberry Pi Controller ($50)' },
      { type: 'text', value: 'Build Notes: Focus on VPD (Vapor Pressure Deficit). Use an Inkbird controller to manage humidity and temperature. This system allows for year-round production of caloric crops like tomatoes and peppers, not just greens.' },

      { type: 'header', value: 'Part IV: Optimization & Troubleshooting' },
      { type: 'text', value: 'The Optimization Mindset: Think of your grow system as an equation: YIELD = f(Light, Water, Nutrients, Environment, Time, Genetics). Optimize one variable at a time.\n\nTroubleshooting:\n• Yellow lower leaves: Nitrogen deficiency.\n• Yellow leaves, green veins: Iron/Magnesium deficiency.\n• Brown leaf tips: Nutrient burn (EC too high).\n• Leggy plants: Not enough light.\n• Root rot (brown slime): Water too warm, not enough oxygen (add airstone).' },

      { type: 'header', value: 'Conclusion' },
      { type: 'text', value: 'The technology exists. The research is proven. You can grow produce that is demonstrably more nutritious and flavorful than anything you can buy. Start with Tier 1. Grow some lettuce. Taste the difference. Then decide if you want to go further.' }
    ]
  },
  {
    id: 'limitless-kitchen',
    title: 'The Limitless Kitchen',
    category: 'Robotics & Health',
    track: 'World Sim',
    type: 'Deep Dive',
    readTime: '35 min read',
    wordCount: 3200,
    description: 'A Technical Deep-Dive into Autonomous Robot Cooking, Personalized Nutrition, and Closed-Loop Health Optimization.',
    content: [
      { type: 'quote', value: 'The future of health isn\'t a pill. It\'s a system.' },
      { type: 'text', value: 'What if your home could grow the exact vegetables your body needs, cook them to maximize nutrient absorption, and continuously optimize your meals based on real-time biometrics? This isn\'t science fiction—it\'s an engineering challenge we\'re actively solving.' },
      
      { type: 'header', value: 'Part I: The Vision' },
      { type: 'subheader', value: '1.1 The Problem We\'re Solving' },
      { type: 'text', value: 'Consider what it takes to eat optimally in the current state: Manual research (30 min), Grocery shopping (60 min), Cooking (45 min). Total time: ~2-3 hours/day. Error rate: HIGH. Personalization: LOW.' },
      { type: 'text', value: 'Our goal is to make Blueprint-level optimization accessible through automation. Bryan Johnson\'s Blueprint costs $2M/year and requires a full-time team. We aim to replicate this precision using autonomous systems.' },
      
      { type: 'subheader', value: '1.2 The System Architecture' },
      { type: 'text', value: 'Three interconnected systems form the core architecture:\n1. Biometric Sensors (Oura, CGM, Blood) -> AI Health Orchestrator.\n2. Autonomous Garden (Supply) -> Knows what to grow based on deficiencies.\n3. Autonomous Kitchen (Execution) -> Knows how to cook to preserve nutrients.' },
      
      { 
        type: 'diagram', 
        diagramType: 'stack', 
        data: { 
          layers: [
            { label: 'Feedback Loop (Glucose/Sleep Data)', type: 'Analysis' },
            { label: 'AI Health Orchestrator', type: 'Intelligence' },
            { label: 'Autonomous Kitchen (Robotics)', type: 'Execution' },
            { label: 'Autonomous Garden (Hydroponics)', type: 'Supply' },
          ] 
        } 
      },

      { type: 'header', value: 'Part II: The Robot Chef' },
      { type: 'subheader', value: '2.1 The Food Physics Problem' },
      { type: 'text', value: 'Cooking is one of the hardest problems in robotics. It involves "deformable object manipulation", "granular media" (rice), and "phase transitions" (raw to cooked). Unlike factory robots that handle rigid parts, a chef must handle onions that peel, eggs that crack, and sauces that change viscosity.' },
      { type: 'text', value: 'Human capability vs Robot capability:\n• Vision: 576MP vs Good.\n• Proprioception: High vs Good.\n• Tactile: 17,000 mechanoreceptors vs 50 taxels. GAP < 1%.\n• Force Sensing: 0.4mN threshold vs 1-10N. GAP < 0.01%.' },

      { type: 'subheader', value: '2.2 The Simulation Gap' },
      { type: 'text', value: 'Current physics engines (MuJoCo, Isaac Sim) fundamentally cannot simulate food. An onion isn\'t a rigid body; it has layers that slip under pressure. You cannot train a robot to cook in simulation if the simulation doesn\'t behave like reality.' },
      { type: 'text', value: 'Our solution is "Learned Dynamics": we don\'t simulate the physics analytically, we use a Graph Neural Network (GNN) to learn the "residual"—what the analytic engine gets wrong. We combine Analytic Physics with Learned Correction.' },
      
      { type: 'subheader', value: '2.3 Data Collection: The Instrumented Kitchen' },
      { type: 'text', value: 'The bottleneck is data. No existing dataset captures what we need: multi-modal, force-annotated cooking. We are building a kitchen instrumented with 8x 4K cameras (60fps), depth sensors, thermal cameras (FLIR), and instrumented knives with force/torque sensors.' },

      { type: 'code', language: 'python', value: '@dataclass\nclass CookingFrame:\n    """Every frame at 100Hz, we capture:"""\n    timestamp: float\n    rgb_images: List[np.ndarray]     # 8 viewpoints, 4K\n    depth_maps: List[np.ndarray]     # 4 RealSense cameras\n    thermal_image: np.ndarray        # FLIR infrared\n    body_pose: np.ndarray            # 24 joint positions (SMPL)\n    hand_poses: Tuple[np.ndarray]    # Left/right MANO parameters\n    tool_forces: Dict[str, np.ndarray] # Force/Torque data\n    burner_powers: List[float]       # Heat output' },

      { type: 'subheader', value: '2.5 Skill Learning & Morphology Retargeting' },
      { type: 'text', value: 'Human hands (27 DOF) are not Robot grippers (2-6 DOF). We use Morphology Retargeting to map human intent to robot kinematic constraints. We retarget the *contact points* and *forces*, not just the trajectory.' },

      { type: 'code', language: 'python', value: 'class MorphologyRetargeter:\n    """Converts human demonstrations to robot-executable actions."""\n    def retarget(self, human_demo: HumanFrame) -> RobotCommand:\n        # 1. Extract contact intentions\n        contact_points = self.extract_contacts(human_demo.hand_pose, human_demo.object_mesh)\n        \n        # 2. Map to robot-achievable contacts\n        robot_contacts = self.map_contacts(contact_points, self.robot_kinematics)\n        \n        # 3. Solve IK under robot constraints\n        joint_angles = self.inverse_kinematics(robot_contacts, constraints=self.robot_joint_limits)\n        \n        return RobotCommand(joint_angles)' },

      { type: 'text', value: 'We also use Eureka-style reward generation, where an LLM writes the reward function for Reinforcement Learning based on the task description (e.g., "chop onion without crushing").' },

      { type: 'header', value: 'Part III: The Autonomous Garden Integration' },
      { type: 'text', value: 'The garden doesn\'t just grow food; it grows *medicine*. By controlling the light spectrum (UV stress) and nutrients, we can increase the antioxidant content of produce. The "Digital Twin" of the plant predicts growth rates using L-Systems combined with Machine Learning.' },
      
      { type: 'code', language: 'python', value: 'class PlantGrowthPredictor:\n    def predict_growth(self, current_state, environment, hours_ahead):\n        # L-system gives grammar, ML gives parameters\n        params = self.parameter_net(environment)\n        self.l_system.set_parameters(params)\n        # Run L-system forward\n        future_structure = self.l_system.iterate(current_state, steps=hours_ahead // self.step_size)\n        return future_structure' },

      { type: 'header', value: 'Part IV: The Health Optimization Loop' },
      { type: 'text', value: 'This is where everything connects. The Limitless Protocol. We synthesize Blueprint precision with Blue Zone wisdom.\n\nLayer 1: Continuous Monitoring (Oura, CGM, Watch).\nLayer 2: Periodic Testing (Blood panels).\nLayer 3: AI Orchestrator.' },

      { type: 'text', value: 'Closed-Loop Example: You eat a meal. 1 hour later, CGM shows a spike. 4 hours later, energy dips. That night, sleep is disrupted. The system detects this causal chain. Intervention: Next time that meal is scheduled, the Robot Chef adjusts the fiber content or portion size, or the schedule shifts to earlier in the day.' },

      { 
        type: 'diagram', 
        diagramType: 'comparison', 
        data: { 
          rows: [
            { metric: 'Input', human: 'Guesswork', robot: 'Measured Macros' },
            { metric: 'Feedback', human: 'Feeling', robot: 'CGM/Biomarkers' },
            { metric: 'Iteration', human: 'Monthly', robot: 'Daily' },
          ] 
        } 
      },

      { type: 'subheader', value: 'The Personal Digital Twin' },
      { type: 'text', value: 'We simulate YOUR metabolism. "If I eat this meal at this time, what will my glucose response be?" The system learns to predict this over time, allowing for true personalized nutrition beyond generic advice.' },

      { type: 'header', value: 'Conclusion & Roadmap' },
      { type: 'text', value: 'Development Timeline:\n2025: Instrumented kitchen & Data collection.\n2026: Skill learning & Sim-to-Real transfer.\n2027: Multi-user adaptation & Generalization.\n\nThis isn\'t about building a robotic servant. It\'s about closing the loop between what our bodies need and what our environment provides. That is the Limitless Kitchen.' }
    ]
  },
  {
    id: 'living-room',
    title: 'The Living Room',
    category: 'Design & Biology',
    track: 'World Sim',
    type: 'Casual',
    readTime: '28 min read',
    wordCount: 2900,
    description: 'A Solarpunk Guide to Growing Your Home: How to Fill Your Space with Light, Life, and Living Art at Any Budget.',
    content: [
      { type: 'quote', value: '"This is an incredible achievement for synthetic biology. Light Bio is bringing us leaps and bounds closer to our solarpunk dream." — Jason Kelly' },
      { type: 'text', value: 'Close your eyes. Imagine walking into your home after a long day. The walls exhale oxygen. Soft green light pulses gently from plants that glow in the dark. Your feet sink into grass—real, living grass—softer than any carpet you\'ve ever touched. This isn\'t science fiction. Every element described exists today, and most costs less than a nice dinner out.' },
      
      { type: 'header', value: 'Part I: The Science of Biophilia' },
      { type: 'text', value: 'In 1984, biologist Edward O. Wilson proposed the Biophilia Hypothesis: humans have an innate need to connect with other living things. For 99.9% of human history, we lived in nature. Our nervous systems are not adapted to concrete boxes. A 2024 systematic review analyzed 74 studies on biophilic design and found consistent benefits: +15% productivity, reduced stress (lower cortisol), and faster healing rates in hospitals.' },
      
      { 
        type: 'diagram', 
        diagramType: 'barchart', 
        data: { 
          title: 'Impact of Biophilic Design (2024 Review)', 
          items: [
            { label: 'Productivity', value: 115 },
            { label: 'Creativity', value: 125 },
            { label: 'Well-being', value: 115 },
            { label: 'Stress Reduction', value: 125 },
          ] 
        } 
      },

      { type: 'subheader', value: 'NASA & Air Quality' },
      { type: 'text', value: 'The famous 1989 NASA clean air study showed plants remove VOCs like formaldehyde and benzene. Important nuance: While you need many plants to fully purify a home (10-1000 per sq meter) to match HVAC filtration, plants are excellent at regulating humidity, producing oxygen, and adding beneficial microbes to your indoor microbiome. The psychological benefit is the primary driver of health.' },

      { type: 'header', value: 'Part II: The Building Blocks' },
      { type: 'text', value: 'We can build this future today using four key elements:\n1. Air-Purifying Plants\n2. Living Walls\n3. Indoor Grass\n4. Bioluminescence' },

      { type: 'subheader', value: '2.1 Air-Purifying Plants (The Foundation)' },
      { type: 'text', value: 'Start simple. The Snake Plant (Sansevieria) is unique because it releases oxygen at night (CAM photosynthesis). Pothos trails beautifully and cleans VOCs. Spider plants are hard to kill. These are the foundation of any living room.' },

      { type: 'subheader', value: '2.2 Living Walls: Art That Breathes' },
      { type: 'text', value: 'You can build a preserved moss wall (zero maintenance) or a live one. Preserved moss uses glycerin to stay soft and green forever. Live moss needs high humidity—perfect for bathrooms.\n\nDIY Live Moss Wall:\n• Frame with waterproof backing.\n• Hardware cloth/mesh.\n• Sphagnum moss substrate.\n• Mist 2-3x/week.' },

      { type: 'subheader', value: '2.3 Indoor Grass: The Softest Floor' },
      { type: 'text', value: 'Imagine a patch of floor that connects you to the earth. We use a hydroponic tray system. Why? No soil = no dirt tracking, no bugs. Use Hydroton clay pebbles and Fine Fescue grass seed.\n\nBuild:\n• Shallow tray (boot tray).\n• 1.5" layer of Hydroton.\n• Water to bottom of pebbles.\n• Seed heavily.\n• Grow light.\nResult: A surface softer than carpet that regulates humidity.' },

      { type: 'subheader', value: '2.4 Bioluminescence: Living Night Lights' },
      { type: 'text', value: 'In April 2024, Light Bio released the Firefly Petunia. Using genes from bioluminescent mushrooms (Neonothopanus nambi), these plants glow continuously without special food or light. They are living night-lights. The caffeine acid cycle in the plant is converted to luciferin, which reacts with oxygen to produce light. Future tech involves glowing trees for streetlights, but today you can have a glowing garden in your bedroom.' },

      { type: 'header', value: 'Part III: Complete Builds at Every Budget' },
      
      { 
        type: 'diagram', 
        diagramType: 'stack', 
        data: { 
          layers: [
            { label: 'Tier 3: The Ecosystem Room ($1000)', type: 'Full Immersion' },
            { label: 'Tier 2: Room Transformation ($300)', type: 'Living Art' },
            { label: 'Tier 1: The Green Corner ($50)', type: 'Starter' },
          ] 
        } 
      },

      { type: 'subheader', value: 'Tier 1: The Green Corner ($50-100)' },
      { type: 'text', value: 'Shopping List: Snake plant ($15), Pothos in hanging planter ($12), Small preserved moss frame ($25), River rocks ($5). Result: A dedicated corner that changes the room\'s energy and air quality.' },

      { type: 'subheader', value: 'Tier 2: Room Transformation ($200-300)' },
      { type: 'text', value: 'Shopping List: Large Fiddle Leaf Fig or Rubber Plant ($40), DIY Moss Wall Art 24x36" ($60), 3x Firefly Petunias ($90), Wood plant stands ($40). Result: A room that feels alive day and night. The glowing petunias create a magical atmosphere after dark.' },

      { type: 'subheader', value: 'Tier 3: The Ecosystem Room ($500-1000)' },
      { type: 'text', value: 'This is the full Solarpunk vision. A 2x4 foot hydroponic grass patch for lounging. A large live moss wall for humidity. A border of Firefly Petunias for ambient lighting. Air circulation fans and humidifiers.\n\nBuild:\n1. Grass Patch: Hydroponic tray + grow light + Fine Fescue.\n2. Lighting: Warm LEDs hidden in plants + Bioluminescence.\n3. Climate: Automated Humidifier + Fan.\n4. Result: Avatar\'s Pandora in your apartment. A space that actively lowers your heart rate.' },

      { type: 'header', value: 'Part IV: The Future (Responsive Bioluminescence)' },
      { type: 'text', value: 'The vision: You walk across your living room, and the grass glows beneath your feet (piezo-electric or touch-responsive bioluminescence). While geneticists are working on this, we can simulate it today using pressure-sensitive LEDs under the hydroponic grass tray. This bridges the gap between biology and technology.' },

      { type: 'header', value: 'Conclusion' },
      { type: 'text', value: 'The Solarpunk vision is a future where technology and nature work together, not against each other. You don\'t have to wait. You can build it this weekend. Start with one plant. Your home is an ecosystem waiting to happen.' }
    ]
  },
  {
    id: 'programming-on-the-go',
    title: 'Programming on the Go',
    category: 'DevOps & Workflow',
    track: 'Evolve',
    type: 'Technical Guide',
    readTime: '32 min read',
    wordCount: 3100,
    description: 'A complete guide to mobile Claude Code development. Learn how to stay productive with SSH workflows, parallel agent orchestration, and custom dashboards.',
    content: [
      { type: 'text', value: 'As someone who spends a lot of time thinking about autonomous AI agent systems and development workflows, I\'ve been exploring how to stay productive with Claude Code when I\'m away from my main development machines. The question seems simple enough: can I program websites from my phone using my Claude Code subscription? The answer involves a fascinating ecosystem of solutions.' },
      
      { type: 'header', value: 'The Core Challenge' },
      { type: 'text', value: 'The fundamental issue isn\'t just "running Claude Code on mobile." It\'s the complete development loop: writing code, previewing changes, and iterating quickly. Replicating `npm run dev` and localhost on mobile requires solving several interconnected problems.\n\nBut there\'s a deeper challenge: parallelization. On a desktop with multiple monitors, you might have three or four Claude Code instances running simultaneously in different git worktrees. How do you maintain that productivity on a phone screen?' },
      
      { type: 'header', value: 'Official Options: Claude Code on iOS' },
      { type: 'text', value: 'Anthropic has made Claude Code available directly in their iOS app as a research preview. This is the most seamless option if you\'re in the Apple ecosystem. You connect your GitHub repositories, describe what you need, and Claude handles implementation with real-time progress tracking. It uses a sandbox environment. Pros: Easy setup, great for incident response. Cons: No deep debugging, GitHub centric, no Android support yet.' },

      { type: 'header', value: 'Third-Party Solutions: Happy Coder' },
      { type: 'text', value: 'Happy Coder (happy.engineering) is a polished third-party solution. You run their CLI on your dev machine, which wraps Claude Code and encrypts session data before sending it to a relay server. The mobile app receives this data, providing a touch-optimized interface. It allows you to start on mobile and pick up on desktop without losing context.' },
      
      { type: 'code', language: 'bash', value: '# Install the Happy Coder CLI globally\nnpm install -g happy-coder\n\n# Start a Claude Code session\nhappy' },
      
      { type: 'header', value: 'The Power User Approach: SSH + Tailscale' },
      { type: 'text', value: 'This is my preferred setup because it uses mature, well-audited tools. Tailscale creates a secure private network between your devices (mesh VPN based on WireGuard). From your phone, you SSH into your development machine. Since they are on the same "local" network, you can access ports securely without exposing them to the internet.' },
      
      { type: 'subheader', value: 'Setting Up the Host Machine' },
      { type: 'code', language: 'bash', value: '# Ensure SSH is installed\nsudo apt update && sudo apt install openssh-server\n\n# Install Tailscale\ncurl -fsSL https://tailscale.com/install.sh | sh\nsudo tailscale up\n\n# Install tmux for session persistence\nsudo apt install tmux\n\n# Disable password auth for security\nsudo sed -i \'s/PasswordAuthentication yes/PasswordAuthentication no/\' /etc/ssh/sshd_config\nsudo systemctl restart ssh' },
      
      { type: 'subheader', value: 'Solving the Preview Problem' },
      { type: 'text', value: 'Because your phone and dev machine are on the same Tailscale network, you can access localhost ports directly using the Tailscale IP (e.g., 100.64.x.x). If your dev server runs on port 3000, you visit http://100.64.x.x:3000 on your phone browser. No port forwarding needed.' },

      { type: 'header', value: 'Intelligent Session Management with Tmux' },
      { type: 'text', value: 'The real power comes from thoughtful tmux configuration. I use a script to automatically name sessions based on project and branch, enabling instant context switching. Tools like `sesh` or `dmux` can also help.' },
      { type: 'code', language: 'bash', value: '#!/usr/bin/env bash\n# dev - Create or attach to a project session\n\nROOT=$(git rev-parse --show-toplevel 2>/dev/null || pwd)\nPROJECT=$(basename "$ROOT")\nBRANCH=$(git branch --show-current 2>/dev/null || echo "main")\n\nSESSION="${PROJECT}/${BRANCH}"\n\nif ! tmux has-session -t "$SESSION" 2>/dev/null; then\n    # Create session with multiple windows\n    tmux new-session -d -s "$SESSION" -n "claude" -c "$ROOT"\n    tmux new-window -t "$SESSION" -n "server" -c "$ROOT"\n    tmux new-window -t "$SESSION" -n "tests" -c "$ROOT"\n    \n    # Start Claude Code\n    tmux send-keys -t "$SESSION:claude" "claude" C-m\nfi\n\ntmux attach -t "$SESSION"' },

      { type: 'header', value: 'Git Worktrees for Parallel Development' },
      { type: 'text', value: 'The multiplier for mobile workflows is Git Worktrees. Instead of one working copy, worktrees let you check out multiple branches simultaneously in separate directories. Each worktree is fully isolated, meaning you can run multiple Claude Code instances on different features at the same time.' },
      { type: 'code', language: 'bash', value: '# Start from your main repository\ncd ~/projects/simworld/main\n\n# Create worktrees for different branches\ngit worktree add ../feature-physics -b feature-physics\ngit worktree add ../feature-ui -b feature-ui\n\n# Now you have 3 folders with different branches checked out simultaneously.\n# You can run `dev` in each one to spawn a named tmux session.' },

      { type: 'header', value: 'Multi-Agent Observability' },
      { type: 'text', value: 'When running 4+ agents in parallel worktrees, you need a dashboard. The "Claude Code Hooks Multi-Agent Observability" system captures lifecycle events (PreToolUse, PostToolUse) and broadcasts them to a local dashboard.' },
      { type: 'code', language: 'json', value: '{\n  "hooks": {\n    "PreToolUse": [{\n      "matcher": ".*",\n      "hooks": [{\n        "type": "command",\n        "command": "python hooks/send_event.py --type PreToolUse"\n      }]\n    }]\n  }\n}' },

      { type: 'header', value: 'Building a Custom Dashboard' },
      { type: 'text', value: 'If existing tools don\'t fit, you can build a simple React dashboard to monitor your agents via WebSocket. It aggregates events from all active sessions and displays them in a mobile-friendly card layout.' },
      { type: 'code', language: 'javascript', value: '// dashboard-server.js\nconst express = require(\'express\');\nconst WebSocket = require(\'ws\');\nconst app = express();\nconst server = http.createServer(app);\nconst wss = new WebSocket.Server({ server });\n\napp.post(\'/events\', (req, res) => {\n  const event = req.body;\n  // Store and broadcast\n  wss.clients.forEach(c => c.send(JSON.stringify(event)));\n  res.json({status: \'ok\'});\n});' },

      { type: 'subheader', value: 'Mobile-Optimized Frontend' },
      { type: 'text', value: 'The frontend should prioritize density. A card-based layout that shows the last action ("Reading file...", "Running test...") for each agent allows you to monitor 5+ streams at a glance.' },

      { type: 'header', value: 'Conclusion' },
      { type: 'text', value: 'A year ago, mobile coding was a hack. Now, with tools like Tailscale, Happy Coder, and custom dashboards, it\'s a legitimate workflow. The pattern is the phone as a thin client for a powerful host, enabling deep work from anywhere. You don\'t have to choose just one approach; mix and match to fit your needs.' }
    ]
  }
];
