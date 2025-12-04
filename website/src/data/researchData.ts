
export interface ArticleSection {
  type: 'text' | 'header' | 'subheader' | 'quote' | 'diagram' | 'code';
  value?: string;
  text?: string;      // Alias for value (from agent conversions)
  content?: string;   // Alias for value (from agent conversions)
  code?: string;      // Code content (for code blocks)
  author?: string;    // Quote attribution
  source?: string;    // Quote source reference
  diagramType?:
    // Legacy types (from gemini-site)
    | 'timeline' | 'barchart' | 'stack' | 'comparison' | 'pyramid'
    // New enhanced types
    | 'floorplan'   // Interactive room/facility layouts
    | 'hierarchy'   // Expandable tree structures
    | 'process'     // Step-by-step process flows
    | 'metrics'     // Dashboard-style metric cards
    | 'matrix'      // Comparison matrices/tables
    | 'radial'      // Circular progress charts
    | 'checklist'   // Interactive checklists
    | 'cards'       // Knowledge card grids
    | 'ascii';      // Animated ASCII art preservation
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

// Import all 8 complete articles from individual files
import { limitlessProtocol } from './articles/limitless-protocol';
import { atlasRoadmap } from './articles/atlas-roadmap';
import { architectureIntelligence } from './articles/architecture-intelligence';
import { limitlessKitchen } from './articles/limitless-kitchen';
import { homeGrownRevolution } from './articles/home-grown-revolution';
import { livingRoom } from './articles/living-room';
import { secondBrain } from './articles/second-brain';
import { capabilityTrap } from './articles/capability-trap';

// Export all articles as a combined array
// Total: ~62,938 words across 8 comprehensive research papers
export const researchData: Article[] = [
  limitlessProtocol,      // 11,742 words - Peak Human Performance Framework
  atlasRoadmap,           // 10,667 words - Autonomous Cooking/Garden System
  architectureIntelligence, // 8,765 words - LLM Development Framework
  limitlessKitchen,       // 7,641 words - Autonomous Robot Cooking
  homeGrownRevolution,    // 7,531 words - NASA Space Farming Techniques
  livingRoom,             // 7,489 words - Biophilic Design Guide
  secondBrain,            // 4,682 words - Gut-Brain Connection
  capabilityTrap,         // 4,421 words - AI Capability vs Intelligence
];
