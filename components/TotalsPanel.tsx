import { formatCurrency } from '@/lib/calculations';
import { Totals } from '@/lib/types';

interface TotalsPanelProps {
  totals: Totals;
  markupPercent: number;
  contingencyPercent: number;
  onMarkupChange: (value: number) => void;
  onContingencyChange: (value: number) => void;
}

export default function TotalsPanel({
  totals,
  markupPercent,
  contingencyPercent,
  onMarkupChange,
  onContingencyChange
}: TotalsPanelProps) {
  return (
    <section className="card">
      <h2>Totals</h2>

      <div className="grid two-col">
        <label className="field">
          <span>Markup (%)</span>
          <input
            type="number"
            min="0"
            step="0.1"
            value={markupPercent}
            onChange={(event) => onMarkupChange(Number(event.target.value || 0))}
          />
        </label>

        <label className="field">
          <span>Contingency (%)</span>
          <input
            type="number"
            min="0"
            step="0.1"
            value={contingencyPercent}
            onChange={(event) => onContingencyChange(Number(event.target.value || 0))}
          />
        </label>
      </div>

      <ul className="totals-list">
        <li><span>Labor Subtotal</span><strong>{formatCurrency(totals.laborSubtotal)}</strong></li>
        <li><span>Material Subtotal</span><strong>{formatCurrency(totals.materialSubtotal)}</strong></li>
        <li><span>Equipment Subtotal</span><strong>{formatCurrency(totals.equipmentSubtotal)}</strong></li>
        <li><span>Direct Cost Subtotal</span><strong>{formatCurrency(totals.directCostSubtotal)}</strong></li>
        <li><span>Markup Amount</span><strong>{formatCurrency(totals.markupAmount)}</strong></li>
        <li><span>Contingency Amount</span><strong>{formatCurrency(totals.contingencyAmount)}</strong></li>
        <li className="grand-total"><span>Final ROM Total</span><strong>{formatCurrency(totals.finalRomTotal)}</strong></li>
      </ul>
    </section>
  );
}
