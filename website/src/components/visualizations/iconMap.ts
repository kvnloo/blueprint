import React from 'react';
import {
  Zap, Brain, Leaf, Home,
  Target, Layers, GitBranch, ArrowRight, Check, Clock,
  Lightbulb, BookOpen, Dumbbell, Heart, Star, Trophy,
  Flame, Droplets, Sun, Moon, Wind, Sparkles
} from 'lucide-react';

export const iconMap: Record<string, React.ElementType> = {
  zap: Zap,
  brain: Brain,
  leaf: Leaf,
  home: Home,
  target: Target,
  layers: Layers,
  branch: GitBranch,
  arrow: ArrowRight,
  check: Check,
  clock: Clock,
  lightbulb: Lightbulb,
  book: BookOpen,
  dumbbell: Dumbbell,
  heart: Heart,
  star: Star,
  trophy: Trophy,
  flame: Flame,
  droplets: Droplets,
  sun: Sun,
  moon: Moon,
  wind: Wind,
  sparkles: Sparkles
};

export const getIcon = (name?: string): React.ElementType => {
  if (!name) return Sparkles;
  return iconMap[name.toLowerCase()] || Sparkles;
};
