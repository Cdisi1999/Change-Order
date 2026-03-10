import { calculateRowTotal, formatCurrency } from '@/lib/calculations';
import { CostType, PricingRow } from '@/lib/types';

interface PricingTableProps {
  title: string;
  type: CostType;
  rows: PricingRow[];
  onAddRow: (type: CostType) => void;
  onRemoveRow: (type: CostType, rowId: string) => void;
  onUpdateRow: (type: CostType, rowId: string, field: keyof PricingRow, value: string | number) => void;
}

export default function PricingTable({
  title,
  type,
  rows,
  onAddRow,
  onRemoveRow,
  onUpdateRow
}: PricingTableProps) {
  return (
    <section className="card">
      <div className="row between center">
        <h2>{title}</h2>
        <button type="button" className="secondary" onClick={() => onAddRow(type)}>
          + Add Row
        </button>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Qty</th>
              <th>Unit</th>
              <th>Unit Cost</th>
              <th>Row Total</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>
                  <input
                    value={row.description}
                    placeholder="Enter description"
                    onChange={(event) => onUpdateRow(type, row.id, 'description', event.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={row.quantity}
                    onChange={(event) =>
                      onUpdateRow(type, row.id, 'quantity', Number(event.target.value || 0))
                    }
                  />
                </td>
                <td>
                  <input
                    value={row.unit}
                    placeholder="hr, ea, lot..."
                    onChange={(event) => onUpdateRow(type, row.id, 'unit', event.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={row.unitCost}
                    onChange={(event) =>
                      onUpdateRow(type, row.id, 'unitCost', Number(event.target.value || 0))
                    }
                  />
                </td>
                <td>{formatCurrency(calculateRowTotal(row))}</td>
                <td>
                  <button type="button" className="danger" onClick={() => onRemoveRow(type, row.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="empty-cell">
                  No rows yet. Click “Add Row” to begin.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}
