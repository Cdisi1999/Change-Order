import { formatCurrency } from '@/lib/calculations';
import { PricingBuckets, ProjectInfo, Totals } from '@/lib/types';

interface PreviewPaneProps {
  projectInfo: ProjectInfo;
  pricing: PricingBuckets;
  totals: Totals;
  markupPercent: number;
  contingencyPercent: number;
}

export default function PreviewPane({
  projectInfo,
  pricing,
  totals,
  markupPercent,
  contingencyPercent
}: PreviewPaneProps) {
  const pricingRows = [
    { label: 'Labor', value: totals.laborSubtotal },
    { label: 'Material', value: totals.materialSubtotal },
    { label: 'Equipment', value: totals.equipmentSubtotal }
  ];

  const fullSubject = projectInfo.subjectTitle || 'Change Order Pricing Package';

  return (
    <section className="card print-area">
      <h2>Output Preview</h2>

      <article className="preview-block">
        <h3>1) Pricing Sheet Preview</h3>
        <p><strong>Project:</strong> {projectInfo.projectName || '—'}</p>
        <p><strong>Client:</strong> {projectInfo.clientName || '—'}</p>
        <p><strong>Change Order #:</strong> {projectInfo.changeOrderNumber || '—'}</p>
        <p><strong>Date:</strong> {projectInfo.date || '—'}</p>
        <p><strong>Subject:</strong> {fullSubject}</p>

        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {pricingRows.map((row) => (
              <tr key={row.label}>
                <td>{row.label}</td>
                <td>{formatCurrency(row.value)}</td>
              </tr>
            ))}
            <tr><td>Direct Cost Subtotal</td><td>{formatCurrency(totals.directCostSubtotal)}</td></tr>
            <tr><td>Markup ({markupPercent}%)</td><td>{formatCurrency(totals.markupAmount)}</td></tr>
            <tr><td>Contingency ({contingencyPercent}%)</td><td>{formatCurrency(totals.contingencyAmount)}</td></tr>
            <tr className="grand-total"><td>Final ROM Total</td><td>{formatCurrency(totals.finalRomTotal)}</td></tr>
          </tbody>
        </table>
      </article>

      <article className="preview-block">
        <h3>2) Cover Letter Draft</h3>
        <p>Dear {projectInfo.clientName || 'Client'},</p>
        <p>
          Please find this rough-order-of-magnitude (ROM) pricing package for{' '}
          <strong>{fullSubject}</strong> on the <strong>{projectInfo.projectName || 'referenced project'}</strong>.
          This budget-level estimate is based on currently available information and is intended
          for planning purposes.
        </p>
        <p><strong>Scope Description:</strong> {projectInfo.scopeDescription || 'No scope provided yet.'}</p>
        <p><strong>Exclusions:</strong> {projectInfo.exclusions || 'No exclusions listed.'}</p>
        <p><strong>Assumptions:</strong> {projectInfo.assumptions || 'No assumptions listed.'}</p>
        <p>
          The estimated ROM total for this change order is <strong>{formatCurrency(totals.finalRomTotal)}</strong>.
          We appreciate the opportunity to support this work and can refine this estimate as additional
          detail becomes available.
        </p>
        <p>Sincerely,<br />Your Project Team</p>
      </article>

      <article className="preview-block">
        <h3>3) Printable Summary Page</h3>
        <ul>
          <li>Total labor items: {pricing.labor.length}</li>
          <li>Total material items: {pricing.material.length}</li>
          <li>Total equipment items: {pricing.equipment.length}</li>
          <li>Direct costs: {formatCurrency(totals.directCostSubtotal)}</li>
          <li>Final ROM total: {formatCurrency(totals.finalRomTotal)}</li>
        </ul>
      </article>
    </section>
  );
}
