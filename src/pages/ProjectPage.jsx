import { Link, useParams } from 'react-router-dom';
import { Badge, KpiCard } from '../components/common/Dashboard';
import Icon from '../components/common/Icon';
import { caseSections, ExternalButton } from '../components/projects/CaseParts';
import CaseStudyBody from '../components/projects/CaseStudyBody';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { projects } from '../data/projects';
import {
  neighbours,
  projectBadges,
  projectMetricsFor,
  projectSubtitle,
  projectTitle,
} from '../lib/projectStats';
import NotFoundPage from './NotFoundPage';

export default function ProjectPage() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  useDocumentMeta(
    project
      ? { title: projectTitle(project), description: project.cardSummary, path: `/projects/${slug}` }
      : { title: 'Page not found' },
  );

  if (!project) return <NotFoundPage />;

  const title = projectTitle(project);
  const metrics = projectMetricsFor(project.slug);
  const toc = caseSections.filter((s) => s.has(project));
  const has = (id) => toc.some((s) => s.id === id);
  const { prev, next } = neighbours(project.slug);

  return (
    <div className="container project-page">
      <nav aria-label="Breadcrumb" className="breadcrumb mono">
        <ol>
          <li><Link to="/">overview</Link></li>
          <li><Link to={{ pathname: '/', hash: '#projects' }}>projects</Link></li>
          <li aria-current="page">{project.slug}</li>
        </ol>
      </nav>

      <header className="panel project-hero">
        <div className="badges">
          {projectBadges(project).map((b) => <Badge key={b.label} {...b} />)}
        </div>
        <h1>{title}</h1>
        <p className="hero-role">{projectSubtitle(project)}</p>
        <dl className="project-facts">
          <div><dt>Type</dt><dd>{project.type}</dd></div>
          <div><dt>Role</dt><dd>{project.role}</dd></div>
          <div><dt>Category</dt><dd>{project.category}</dd></div>
        </dl>
        <div className="hero-actions">
          {project.demoUrl && (
            <ExternalButton href={project.demoUrl} icon="external" primary>
              {project.demoLabel || 'Live demo'}
            </ExternalButton>
          )}
          {project.apiUrl && <ExternalButton href={project.apiUrl} icon="external">API</ExternalButton>}
          {project.repositoryUrl && <ExternalButton href={project.repositoryUrl} icon="github">Source code</ExternalButton>}
          {project.reportUrl && <ExternalButton href={project.reportUrl} icon="file">Project report (PDF)</ExternalButton>}
        </div>
      </header>

      {metrics.length > 0 && (
        <div className="kpi-grid kpi-grid-wide" role="group" aria-label="Key figures">
          {metrics.map((m) => <KpiCard key={m.label} {...m} />)}
        </div>
      )}

      {project.demoAccessNote && (
        <aside className="callout" aria-label="Demo notes">
          <p className="panel-label">Demo notes</p>
          <p>{project.demoAccessNote}</p>
        </aside>
      )}

      <div className="case-layout">
        <nav className="case-toc" aria-label="On this page">
          <p className="panel-label">On this page</p>
          <ol>
            {toc.map((s) => (
              <li key={s.id}><Link to={{ hash: `#${s.id}` }}>{s.label}</Link></li>
            ))}
          </ol>
        </nav>

        <div className="case-content">
          <CaseStudyBody project={project} title={title} has={has} />

          <nav className="pager" aria-label="More projects">
            {prev ? (
              <Link to={`/projects/${prev.slug}`} className="panel pager-link">
                <span className="panel-label"><Icon name="arrowLeft" size={14} /> Previous</span>
                <span className="strong">{projectTitle(prev)}</span>
              </Link>
            ) : <span />}
            {next && (
              <Link to={`/projects/${next.slug}`} className="panel pager-link pager-next">
                <span className="panel-label">Next <Icon name="arrowRight" size={14} /></span>
                <span className="strong">{projectTitle(next)}</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
