'use client';

import { useMemo, useState } from 'react';
import PreviewPane from '@/components/PreviewPane';
import PricingTable from '@/components/PricingTable';
import ProjectInfoForm from '@/components/ProjectInfoForm';
import TotalsPanel from '@/components/TotalsPanel';
import { calculateTotals } from '@/lib/calculations';
import { CostType, PricingBuckets, PricingRow, ProjectInfo } from '@/lib/types';

const emptyProjectInfo: ProjectInfo = {
  projectName: '',
  clientName: '',
  changeOrderNumber: '',
  date: '',
  subjectTitle: '',
  scopeDescription: '',
  exclusions: '',
  assumptions: ''
};

const makeRow = (): PricingRow => ({
  id: crypto.randomUUID(),
  description: '',
  quantity: 0,
  unit: '',
  unitCost: 0
});

const initialPricing: PricingBuckets = {
  labor: [makeRow()],
  material: [makeRow()],
  equipment: [makeRow()]
};

export default function HomePage() {
  const [projectInfo, setProjectInfo] = useState<ProjectInfo>(emptyProjectInfo);
  const [pricing, setPricing] = useState<PricingBuckets>(initialPricing);
  const [markupPercent, setMarkupPercent] = useState<number>(10);
  const [contingencyPercent, setContingencyPercent] = useState<number>(5);

  const totals = useMemo(
    () =>
      calculateTotals(
        pricing.labor,
        pricing.material,
        pricing.equipment,
        markupPercent,
        contingencyPercent
      ),
    [pricing, markupPercent, contingencyPercent]
  );

  const handleProjectChange = (field: keyof ProjectInfo, value: string) => {
    setProjectInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddRow = (type: CostType) => {
    setPricing((prev) => ({ ...prev, [type]: [...prev[type], makeRow()] }));
  };

  const handleRemoveRow = (type: CostType, rowId: string) => {
    setPricing((prev) => ({
      ...prev,
      [type]: prev[type].filter((row) => row.id !== rowId)
    }));
  };

  const handleUpdateRow = (
    type: CostType,
    rowId: string,
    field: keyof PricingRow,
    value: string | number
  ) => {
    setPricing((prev) => ({
      ...prev,
      [type]: prev[type].map((row) => (row.id === rowId ? { ...row, [field]: value } : row))
    }));
  };

  return (
    <main className="page">
      <header className="page-header card">
        <h1>Change Order ROM Helper</h1>
        <p>
          Build a rough-order-of-magnitude change order package with pricing, totals, and printable output.
        </p>
        <button className="print-button" onClick={() => window.print()}>
          Print / Save as PDF
        </button>
      </header>

      <ProjectInfoForm info={projectInfo} onChange={handleProjectChange} />

      <PricingTable
        title="Labor Pricing"
        type="labor"
        rows={pricing.labor}
        onAddRow={handleAddRow}
        onRemoveRow={handleRemoveRow}
        onUpdateRow={handleUpdateRow}
      />

      <PricingTable
        title="Material Pricing"
        type="material"
        rows={pricing.material}
        onAddRow={handleAddRow}
        onRemoveRow={handleRemoveRow}
        onUpdateRow={handleUpdateRow}
      />

      <PricingTable
        title="Equipment Pricing"
        type="equipment"
        rows={pricing.equipment}
        onAddRow={handleAddRow}
        onRemoveRow={handleRemoveRow}
        onUpdateRow={handleUpdateRow}
      />

      <TotalsPanel
        totals={totals}
        markupPercent={markupPercent}
        contingencyPercent={contingencyPercent}
        onMarkupChange={setMarkupPercent}
        onContingencyChange={setContingencyPercent}
      />

      <PreviewPane
        projectInfo={projectInfo}
        pricing={pricing}
        totals={totals}
        markupPercent={markupPercent}
        contingencyPercent={contingencyPercent}
      />
    </main>
  );
}
