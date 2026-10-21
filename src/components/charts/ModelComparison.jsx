import BarList from './BarList';

// Renders the structured modelComparison block from projects.js.
export default function ModelComparison({ data }) {
  const items = data.rows.map((r) => ({ label: r.model, value: r.ase, row: r }));
  return (
    <figure className="model-comparison">
      <BarList
        items={items}
        label={`${data.metric} by model, ${data.lowerIsBetter ? 'lower is better' : 'higher is better'}`}
        format={(v) => v.toFixed(1)}
        highlight={(i) => i.row.champion}
      />
      <figcaption>
        {data.metric} on the same {data.validationRows}-row validation set.{' '}
        {data.lowerIsBetter ? 'Lower is better.' : 'Higher is better.'}
      </figcaption>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th scope="col">Model</th>
              <th scope="col" className="num">ASE</th>
              <th scope="col" className="num">{data.secondaryMetric}</th>
              <th scope="col">Note</th>
            </tr>
          </thead>
          <tbody>
            {data.rows.map((r) => (
              <tr key={r.model}>
                <th scope="row">{r.model}</th>
                <td className="num mono">{r.ase.toFixed(4)}</td>
                <td className="num mono">{r.rmse.toFixed(2)}</td>
                <td>{r.champion ? <span className="badge badge-live">Champion</span> : r.note || ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
