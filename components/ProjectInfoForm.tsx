import { ProjectInfo } from '@/lib/types';

interface ProjectInfoFormProps {
  info: ProjectInfo;
  onChange: (field: keyof ProjectInfo, value: string) => void;
}

const fields: Array<{ key: keyof ProjectInfo; label: string; type?: string }> = [
  { key: 'projectName', label: 'Project Name' },
  { key: 'clientName', label: 'Client Name' },
  { key: 'changeOrderNumber', label: 'Change Order Number' },
  { key: 'date', label: 'Date', type: 'date' },
  { key: 'subjectTitle', label: 'Subject / Title' }
];

export default function ProjectInfoForm({ info, onChange }: ProjectInfoFormProps) {
  return (
    <section className="card">
      <h2>Project Information</h2>

      <div className="grid two-col">
        {fields.map((field) => (
          <label key={field.key} className="field">
            <span>{field.label}</span>
            <input
              type={field.type ?? 'text'}
              value={info[field.key]}
              onChange={(event) => onChange(field.key, event.target.value)}
            />
          </label>
        ))}
      </div>

      <label className="field">
        <span>Scope Description</span>
        <textarea
          rows={4}
          value={info.scopeDescription}
          onChange={(event) => onChange('scopeDescription', event.target.value)}
        />
      </label>

      <div className="grid two-col">
        <label className="field">
          <span>Exclusions</span>
          <textarea
            rows={4}
            value={info.exclusions}
            onChange={(event) => onChange('exclusions', event.target.value)}
          />
        </label>

        <label className="field">
          <span>Assumptions</span>
          <textarea
            rows={4}
            value={info.assumptions}
            onChange={(event) => onChange('assumptions', event.target.value)}
          />
        </label>
      </div>
    </section>
  );
}
