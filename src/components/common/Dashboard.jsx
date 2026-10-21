import CountUp from './CountUp';

export function Badge({ label, tone = 'neutral' }) {
  return <span className={`badge badge-${tone}`}>{label}</span>;
}

export function KpiCard({ label, value, unit, hint, tone }) {
  return (
    <div className={`kpi ${tone ? `kpi-${tone}` : ''}`.trim()}>
      <span className="kpi-label">{label}</span>
      <span className="kpi-value">
        <CountUp value={value} />
        {unit && <span className="kpi-unit">{unit}</span>}
      </span>
      {hint && <span className="kpi-hint">{hint}</span>}
    </div>
  );
}

export function SectionHeader({ index, eyebrow, title, id, children }) {
  return (
    <header className="section-header">
      <p className="eyebrow">
        <span className="mono">{index}</span> {eyebrow}
      </p>
      <div className="section-header-row">
        <h2 id={id}>{title}</h2>
        {children}
      </div>
    </header>
  );
}
