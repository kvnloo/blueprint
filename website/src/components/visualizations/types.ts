// ============================================================================
// VISUALIZATION TYPES & INTERFACES
// ============================================================================

export interface VisProps {
  data: any;
  className?: string;
}

export interface FloorPlanRoom {
  id: string;
  name: string;
  subtitle?: string;
  description?: string;
  icon?: string;
  color?: string;
  position?: { x: number; y: number };
  connections?: string[];
}

export interface FloorPlanData {
  title: string;
  rooms: FloorPlanRoom[];
  layout?: 'grid' | 'radial' | 'flow';
}

export interface HierarchyNode {
  id: string;
  label: string;
  description?: string;
  children?: HierarchyNode[];
  icon?: string;
  color?: string;
  metrics?: { label: string; value: string }[];
}

export interface ProcessStep {
  id: string;
  label: string;
  description?: string;
  duration?: string;
  icon?: string;
  substeps?: string[];
}

export interface MetricCard {
  label: string;
  value: string | number;
  unit?: string;
  change?: number;
  icon?: string;
  color?: string;
}

export interface ComparisonItem {
  category: string;
  items: { label: string; value: string | number; highlight?: boolean }[];
}

export interface ChecklistItem {
  id: string;
  label?: string;
  name?: string;
  description?: string;
  icon?: string;
}

export interface KnowledgeCard {
  title: string;
  content: string;
  icon?: string;
  tags?: string[];
}

export interface RadialItem {
  label: string;
  value: number;
  color?: string;
}
