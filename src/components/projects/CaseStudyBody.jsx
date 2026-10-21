import ModelComparison from '../charts/ModelComparison';
import TechTagList from '../common/TechTags';
import { Block, Field } from './CaseParts';

export default function CaseStudyBody({ project, title, has }) {
  const p = project;
  return (
    <>
      {has('overview') && (
        <Block id="overview" title="Overview">
          {p.summary && <p className="lead">{p.summary}</p>}
          {p.problem && <Field label="Problem">{p.problem}</Field>}
          {p.solution && <Field label="Solution">{p.solution}</Field>}
        </Block>
      )}

      {has('contribution') && (
        <Block id="contribution" title="My contribution">
          <p>{p.myContribution}</p>
        </Block>
      )}

      {has('data') && (
        <Block id="data" title="Data">
          {p.dataset && <Field label="Dataset">{p.dataset}</Field>}
          {p.dataPreparation && <Field label="Preparation">{p.dataPreparation}</Field>}
        </Block>
      )}

      {has('models') && (
        <Block id="models" title="Models">
          {p.models && <p>{p.models}</p>}
          {p.modelComparison && <ModelComparison data={p.modelComparison} />}
        </Block>
      )}

      {has('results') && (
        <Block id="results" title="Results">
          <p>{p.results}</p>
        </Block>
      )}

      {has('features') && (
        <Block id="features" title="Features">
          <ul className="check-list">
            {p.features.map((f) => <li key={f}>{f}</li>)}
          </ul>
        </Block>
      )}

      {has('architecture') && (
        <Block id="architecture" title="Architecture & stack">
          {p.architecture?.length > 0 && (
            <ol className="pipeline" aria-label="Architecture layers">
              {p.architecture.map((a) => <li key={a}>{a}</li>)}
            </ol>
          )}
          <TechTagList items={p.technologies} label={`${title} technologies`} />
        </Block>
      )}

      {has('screenshots') && (
        <Block id="screenshots" title="Screenshots">
          <div className="shot-grid">
            {p.screenshots.map((s) => (
              <figure key={s.src} className="shot">
                <a href={s.src} target="_blank" rel="noopener">
                  <img src={s.src} alt={s.alt} loading="lazy" decoding="async" />
                  <span className="sr-only"> (open full size in new tab)</span>
                </a>
                {s.caption && <figcaption>{s.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </Block>
      )}

      {has('reflection') && (
        <Block id="reflection" title="Challenges & learnings">
          {p.challenges && <Field label="Challenges">{p.challenges}</Field>}
          {p.learnings && <Field label="What I learned">{p.learnings}</Field>}
        </Block>
      )}
    </>
  );
}
