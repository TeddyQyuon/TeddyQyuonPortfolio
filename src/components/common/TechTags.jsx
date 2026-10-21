import TechnologyLogo from './TechnologyLogo';

export function TechTag({ name }) {
  return (
    <li className="tech-tag">
      <TechnologyLogo name={name} size={14} />
      <span>{name}</span>
    </li>
  );
}

export default function TechTagList({ items, label = 'Technologies' }) {
  return (
    <ul className="tech-tags" aria-label={label}>
      {items.map((t) => (
        <TechTag key={t} name={t} />
      ))}
    </ul>
  );
}
