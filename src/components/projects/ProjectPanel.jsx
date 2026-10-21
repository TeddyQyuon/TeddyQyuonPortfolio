import { Link } from 'react-router-dom';
import { Badge } from '../common/Dashboard';
import Icon from '../common/Icon';
import TechTagList from '../common/TechTags';
import {
  projectBadges,
  projectMetricsFor,
  projectSubtitle,
  projectTitle,
} from '../../lib/projectStats';

export default function ProjectPanel({ project, index }) {
  const title = projectTitle(project);
  const cover = project.screenshots?.[0];
  const metrics = projectMetricsFor(project.slug);
  const headingId = `project-${project.slug}`;
  const tech = project.cardTechnologies || project.technologies.slice(0, 6);

  return (
    <article className="panel project-panel" aria-labelledby={headingId}>
      <div className="project-panel-top">
        <span className="mono panel-index">{String(index + 1).padStart(2, '0')}</span>
        <div className="badges">
          {projectBadges(project).map((b) => (
            <Badge key={b.label} {...b} />
          ))}
        </div>
      </div>

      {cover && (
        <Link to={`/projects/${project.slug}`} className="project-thumb" tabIndex={-1} aria-hidden="true">
          <img src={cover.src} alt="" loading="lazy" decoding="async" width="640" height="400" />
        </Link>
      )}

      <div className="project-panel-body">
        <h3 id={headingId}>
          <Link to={`/projects/${project.slug}`}>{title}</Link>
        </h3>
        <p className="project-subtitle">{projectSubtitle(project)}</p>
        <p className="project-summary">{project.cardSummary}</p>

        {metrics.length > 0 && (
          <dl className="metric-row">
            {metrics.map((m) => (
              <div key={m.label}>
                <dt>{m.label}</dt>
                <dd className="mono">
                  {m.value}
                  {m.unit && <span className="kpi-unit">{m.unit}</span>}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <TechTagList items={tech} label={`${title} technologies`} />
      </div>

      <div className="project-panel-footer">
        <Link to={`/projects/${project.slug}`} className="link-strong">
          Case study<span className="sr-only">: {title}</span>
          <Icon name="arrowRight" size={16} />
        </Link>
        {project.demoUrl && (
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="link-muted">
            Demo<span className="sr-only"> of {title} (opens in new tab)</span>
            <Icon name="external" size={14} />
          </a>
        )}
        {project.repositoryUrl && (
          <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer" className="link-muted">
            Code<span className="sr-only"> for {title} (opens in new tab)</span>
            <Icon name="github" size={14} />
          </a>
        )}
      </div>
    </article>
  );
}
