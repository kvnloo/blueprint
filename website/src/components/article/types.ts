// Shared types for article components

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export interface CodeBlockProps {
  language?: string;
  code: string;
  title?: string;
}

export interface TrackColors {
  [key: string]: string;
}

export const trackColors: TrackColors = {
  'Blueprint': 'text-cyan-400 border-cyan-500/30 bg-cyan-950/30',
  'World Sim': 'text-orange-400 border-orange-500/30 bg-orange-950/30',
  'Evolve': 'text-emerald-400 border-emerald-500/30 bg-emerald-950/30',
};
