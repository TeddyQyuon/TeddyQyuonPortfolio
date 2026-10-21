import Icon from '../common/Icon';

// Each case-study section renders only when its field exists in projects.js.
export const caseSections = [
  { id: 'overview', label: 'Overview', has: (p) => p.summary || p.problem || p.solution },
  { id: 'contribution', label: 'My contribution', has: (p) => p.myContribution },
  { id: 'data', label: 'Data', has: (p) => p.dataset || p.dataPreparation },
  { id: 'models', label: 'Models', has: (p) => p.models || p.modelComparison },
  { id: 'results', label: 'Results', has: (p) => p.results },
  { id: 'features', label: 'Features', has: (p) => p.features?.length },
  { id: 'architecture', label: 'Architecture', has: (p) => p.architecture?.length || p.technologies?.length },
  { id: 'screenshots', label: 'Screenshots', has: (p) => p.screenshots?.length },
  { id: 'reflection', label: 'Challenges & learnings', has: (p) => p.challenges || p.learnings },
];

export function Block({ id, title, children }) {
  return (
    <section className="panel case-block" id={id} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="panel-title">{title}</h2>
      {children}
    </section>
  );
}

export function Field({ label, children }) {
  return (
    <div className="field">
      <h3 className="panel-label">{label}</h3>
      <p>{children}</p>
    </div>
  );
}

export function ExternalButton({ href, icon, children, primary }) {
  return (
    <a className={`btn ${primary ? 'btn-primary' : ''}`.trim()} href={href} target="_blank" rel="noopener noreferrer">
      <Icon name={icon} size={16} />
      {children}
      <span className="sr-only"> (opens in new tab)</span>
    </a>
  );
}
