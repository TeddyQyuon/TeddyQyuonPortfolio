import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '../components/common/Dashboard';
import GpaTrendChart from '../components/charts/GpaTrendChart';
import { currentGpa, recentHighlights, semesterResults } from '../data/academicResults';
import { educationJourney } from '../data/education';

const gradeTone = (g) => (g.startsWith('A') ? 'live' : g.startsWith('B') ? 'info' : 'neutral');
const shortLabel = (s) => s.label.replace('Year ', 'Y').replace(' Semester ', 'S');

export default function AcademicsSection() {
  const [active, setActive] = useState(semesterResults[semesterResults.length - 1].id);
  const semester = semesterResults.find((s) => s.id === active);
  const points = semesterResults.map((s) => ({ label: shortLabel(s), value: Number(s.gpa) }));

  return (
    <section className="section" aria-labelledby="academics-title" id="academics">
      <SectionHeader index="04" eyebrow="Academics" title="Education & results" id="academics-title" />

      <div className="academics-grid">
        <div className="panel gpa-panel">
          <p className="panel-label">Current GPA · Nanyang Polytechnic</p>
          <p className="gpa-value mono">
            {currentGpa}
            <span className="kpi-unit">/ 4.0</span>
          </p>
          <p className="muted small">Official GPA from the NYP result statement. Semester values are calculated from module grades.</p>
          <GpaTrendChart points={points} />
          <h3 className="panel-title">Recent A grades</h3>
          <ul className="highlight-list">
            {recentHighlights.map((h) => (
              <li key={h.module}>
                <span className="badge badge-live mono">{h.grade}</span>
                <span>
                  {h.href ? <Link to={h.href}>{h.module}</Link> : h.module}
                  <span className="muted small block">{h.evidence}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="panel">
          <div className="panel-head">
            <h3 className="panel-title">Module results</h3>
            <div className="segmented" role="group" aria-label="Choose semester">
              {semesterResults.map((s) => (
                <button key={s.id} type="button" aria-pressed={active === s.id} onClick={() => setActive(s.id)}>
                  {shortLabel(s)}
                </button>
              ))}
            </div>
          </div>
          <div className="table-wrap">
            <table className="data-table">
              <caption className="sr-only">{`${semester.label} (${semester.academicYear}) module grades`}</caption>
              <thead>
                <tr>
                  <th scope="col">Module</th>
                  <th scope="col" className="num">Credits</th>
                  <th scope="col" className="num">Grade</th>
                </tr>
              </thead>
              <tbody>
                {semester.modules.map((m) => (
                  <tr key={m.name}>
                    <th scope="row">{m.name}</th>
                    <td className="num mono">{m.credits}</td>
                    <td className="num">
                      <span className={`badge badge-${gradeTone(m.grade)} mono`}>{m.grade}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th scope="row">{`Semester GPA · ${semester.academicYear}`}</th>
                  <td />
                  <td className="num mono strong">{semester.gpa}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      <div className="panel timeline-panel">
        <h3 className="panel-title">Education timeline</h3>
        <ol className="timeline">
          {[...educationJourney].reverse().map((e) => (
            <li key={e.id}>
              <span className="mono timeline-period">{e.period}</span>
              <div>
                <h4>{e.institution}</h4>
                <p className="muted small">{e.location}</p>
                <p className="strong">{e.qualification}</p>
                <p>{e.summary}</p>
                {e.marks && (
                  <ul className="mark-list" aria-label="Subject marks">
                    {e.marks.map((m) => (
                      <li key={m.subject} className={m.result === 'Distinction' ? 'is-distinction' : undefined}>
                        <span>{m.subject}</span>
                        <span className="mono">{m.mark}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
