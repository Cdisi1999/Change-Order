export type CostType = 'labor' | 'material' | 'equipment';

export interface ProjectInfo {
  projectName: string;
  clientName: string;
  changeOrderNumber: string;
  date: string;
  subjectTitle: string;
  scopeDescription: string;
  exclusions: string;
  assumptions: string;
}

export interface PricingRow {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unitCost: number;
}

export interface PricingBuckets {
  labor: PricingRow[];
  material: PricingRow[];
  equipment: PricingRow[];
}

export interface Totals {
  laborSubtotal: number;
  materialSubtotal: number;
  equipmentSubtotal: number;
  directCostSubtotal: number;
  markupAmount: number;
  contingencyAmount: number;
  finalRomTotal: number;
}
