// Horizontal bar list rendered with CSS widths. Values are always printed,
// so the chart reads correctly without colour or a screen.
export default function BarList({ items, label, max, format = (v) => v, highlight }) {
  const top = max ?? Math.max(...items.map((i) => i.value));
  return (
    <ul className="bar-list" aria-label={label}>
      {items.map((item) => {
        const pct = Math.max(2, Math.round((item.value / top) * 100));
        const isHighlight = highlight?.(item);
        return (
          <li key={item.label} className={isHighlight ? 'is-highlight' : undefined}>
            <span className="bar-label">{item.label}</span>
            <span className="bar-track" aria-hidden="true">
              <span className="bar-fill" style={{ width: `${pct}%` }} />
            </span>
            <span className="bar-value mono">{format(item.value)}</span>
          </li>
        );
      })}
    </ul>
  );
}
