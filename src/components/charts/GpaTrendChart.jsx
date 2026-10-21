// Small SVG line chart for semester GPA. The data is also published in the
// adjacent results table, so the SVG is described rather than duplicated.
export default function GpaTrendChart({ points, max = 4 }) {
  const w = 320;
  const h = 150;
  const pad = { top: 18, right: 18, bottom: 28, left: 30 };
  const innerW = w - pad.left - pad.right;
  const innerH = h - pad.top - pad.bottom;
  const x = (i) => pad.left + (points.length === 1 ? innerW / 2 : (i / (points.length - 1)) * innerW);
  const y = (v) => pad.top + innerH - (v / max) * innerH;
  const line = points.map((p, i) => `${i ? 'L' : 'M'}${x(i)},${y(p.value)}`).join(' ');
  const area = `${line} L${x(points.length - 1)},${pad.top + innerH} L${x(0)},${pad.top + innerH} Z`;
  const summary = points.map((p) => `${p.label} ${p.value.toFixed(2)}`).join(', ');

  return (
    <svg className="gpa-chart" viewBox={`0 0 ${w} ${h}`} role="img" aria-labelledby="gpa-chart-title gpa-chart-desc">
      <title id="gpa-chart-title">Semester GPA trend</title>
      <desc id="gpa-chart-desc">{`GPA out of ${max}: ${summary}.`}</desc>
      {[0, 1, 2, 3, 4].map((v) => (
        <g key={v}>
          <line className="grid" x1={pad.left} x2={w - pad.right} y1={y(v)} y2={y(v)} />
          <text className="axis" x={pad.left - 8} y={y(v) + 3} textAnchor="end">{v}</text>
        </g>
      ))}
      <path className="area" d={area} />
      <path className="line" d={line} />
      {points.map((p, i) => (
        <g key={p.label}>
          <circle className="dot" cx={x(i)} cy={y(p.value)} r="4" />
          <text className="value" x={x(i)} y={y(p.value) - 10} textAnchor="middle">{p.value.toFixed(2)}</text>
          <text className="axis" x={x(i)} y={h - 8} textAnchor="middle">{p.label}</text>
        </g>
      ))}
    </svg>
  );
}
