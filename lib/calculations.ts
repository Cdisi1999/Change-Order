import { PricingRow, Totals } from '@/lib/types';

export const calculateRowTotal = (row: PricingRow): number => row.quantity * row.unitCost;

export const calculateSubtotal = (rows: PricingRow[]): number =>
  rows.reduce((sum, row) => sum + calculateRowTotal(row), 0);

export const calculateTotals = (
  laborRows: PricingRow[],
  materialRows: PricingRow[],
  equipmentRows: PricingRow[],
  markupPercent: number,
  contingencyPercent: number
): Totals => {
  const laborSubtotal = calculateSubtotal(laborRows);
  const materialSubtotal = calculateSubtotal(materialRows);
  const equipmentSubtotal = calculateSubtotal(equipmentRows);

  const directCostSubtotal = laborSubtotal + materialSubtotal + equipmentSubtotal;
  const markupAmount = directCostSubtotal * (markupPercent / 100);
  const contingencyAmount = directCostSubtotal * (contingencyPercent / 100);
  const finalRomTotal = directCostSubtotal + markupAmount + contingencyAmount;

  return {
    laborSubtotal,
    materialSubtotal,
    equipmentSubtotal,
    directCostSubtotal,
    markupAmount,
    contingencyAmount,
    finalRomTotal
  };
};

export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2
  }).format(value || 0);
