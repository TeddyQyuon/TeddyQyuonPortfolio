import { useParams, Link as RouterLink } from 'react-router-dom';
import { Button, Container } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
import TechnologyChip from '../components/common/TechnologyChip';
import ProjectGallery from '../components/projects/ProjectGallery';
import { projects } from '../data/projects';
import './ProjectDetailPage.css';

function CaseSection({ id, title, children }) {
  return (
    <section className="case-section" aria-labelledby={id}>
      <h2 id={id}>{title}</h2>
      {children}
    </section>
  );
}

function ProjectLinks({ links, compact = false }) {
  if (!links.length) return null;

  if (compact) {
    return (
      <p className="case-project-links">
        <strong>Project links:</strong>{' '}
        {links.map((link, index) => (
          <span key={link.key}>
            {index > 0 && <span aria-hidden="true"> · </span>}
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              {link.shortLabel}
            </a>
          </span>
        ))}
      </p>
    );
  }

  return (
    <div className="case-actions" aria-label="Project links">
      {links.map((link) => (
        <Button
          key={link.key}
          component="a"
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          variant={link.key === 'demo' ? 'contained' : 'outlined'}
        >
          {link.label}
        </Button>
      ))}
    </div>
  );
}

function ModelComparison({ comparison }) {
  if (!comparison?.rows?.length) return null;

  return (
    <CaseSection id="model-comparison" title="Model comparison">
      <p className="case-model-note">
        {comparison.metric} · {comparison.secondaryMetric} · {comparison.validationRows} validation rows
      </p>
      <div className="case-model-scroll">
        <table className="case-model-table">
          <caption className="case-visually-hidden">
            Models compared on validation average squared error and root mean squared error. Lower values are better.
          </caption>
          <thead className="case-visually-hidden">
            <tr><th scope="col">Model</th><th scope="col">Validation ASE</th><th scope="col">RMSE</th></tr>
          </thead>
          <tbody>
            {comparison.rows.map((row) => (
              <tr key={row.model} className={row.champion ? 'case-model-champion' : undefined}>
                <th scope="row">{row.model}</th>
                <td>ASE {row.ase.toFixed(4)}</td>
                <td>RMSE {row.rmse.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CaseSection>
  );
}

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <Container maxWidth="md" className="portfolio-section project-detail case-study case-missing">
        <h1>Project not found</h1>
        <p>The project you are looking for does not exist.</p>
        <Button component={RouterLink} to="/" variant="contained">Back to Home</Button>
      </Container>
    );
  }

  const projectLinks = [
    project.demoUrl && { key: 'demo', href: project.demoUrl, label: 'Live Demo', shortLabel: 'Live demo' },
    project.apiUrl && { key: 'api', href: project.apiUrl, label: 'API', shortLabel: 'API' },
    project.repositoryUrl && { key: 'repo', href: project.repositoryUrl, label: 'Repository', shortLabel: 'Repository' },
    project.reportUrl && { key: 'report', href: project.reportUrl, label: 'Project report (PDF)', shortLabel: 'Project report' },
  ].filter(Boolean);
  const hasFigures = Boolean(project.screenshots?.length);
  const architecture = project.architecture?.join(' → ');

  return (
    <Container maxWidth="lg" className="portfolio-section project-detail case-study">
      <header className={`case-intro${projectLinks.length ? '' : ' case-intro-no-links'}`}>
        <RouterLink className="case-back" to="/">
          <ArrowBackIcon aria-hidden="true" fontSize="small" /> Back to Home
        </RouterLink>
        <h1>{project.name}</h1>
        <div className="case-meta">
          <span className="case-category">{project.category}</span>
          <span className="case-role">{project.type} · {project.role}</span>
        </div>
        <p className="case-summary">{project.summary}</p>
        <ProjectLinks links={projectLinks} />
      </header>

      <div className="case-content-grid">
        <div className="case-lead">
          {hasFigures ? (
            <ProjectGallery screenshots={project.screenshots} mode="lead" />
          ) : architecture ? (
            <div className="case-architecture-callout">
              <span>Architecture from project description</span>
              <p>{architecture}</p>
            </div>
          ) : null}
        </div>

        <aside className="case-aside" aria-label="Project at a glance">
          <h2>At a glance</h2>
          <dl>
            <div><dt>My role</dt><dd>{project.role || project.type}</dd></div>
            <div><dt>Category</dt><dd>{project.category}</dd></div>
            <div><dt>Project type</dt><dd>{project.type}</dd></div>
            <div><dt>Technologies</dt><dd>{project.technologies.length} listed</dd></div>
          </dl>
        </aside>

        <article className="case-article">
          <CaseSection id="problem" title="Problem"><p>{project.problem}</p></CaseSection>
          <CaseSection id="solution" title="Solution"><p>{project.solution}</p></CaseSection>
          {project.dataset && <CaseSection id="dataset" title="Dataset"><p>{project.dataset}</p></CaseSection>}
          {project.dataPreparation && <CaseSection id="data-preparation" title="Data preparation"><p>{project.dataPreparation}</p></CaseSection>}
          {project.models && <CaseSection id="models" title="Models"><p>{project.models}</p></CaseSection>}
          {project.results && <CaseSection id="results" title="Results"><p>{project.results}</p></CaseSection>}
          <CaseSection id="technologies" title="Technologies">
            <div className="case-technologies">
              {project.technologies.map((tech) => (
                <TechnologyChip className="case-tech-chip" key={tech} label={tech} variant="outlined" />
              ))}
            </div>
          </CaseSection>
          <CaseSection id="features" title="Key features">
            <ul className="case-feature-list">
              {project.features.map((feature) => (
                <li key={feature}><span className="case-feature-check"><CheckIcon aria-hidden="true" /></span>{feature}</li>
              ))}
            </ul>
          </CaseSection>
          <CaseSection id="contribution" title="My contribution"><p>{project.myContribution}</p></CaseSection>
          {architecture && <CaseSection id="architecture" title="Architecture"><p>{architecture}</p></CaseSection>}
          <CaseSection id="challenges" title="Challenges"><p>{project.challenges}</p></CaseSection>
          <CaseSection id="learnings" title="What I learned"><p>{project.learnings}</p></CaseSection>
          <ModelComparison comparison={project.modelComparison} />
          {hasFigures && (
            <CaseSection id="project-figures" title="Project figures">
              <ProjectGallery screenshots={project.screenshots} mode="list" />
            </CaseSection>
          )}
          <ProjectLinks links={projectLinks} compact />
        </article>
      </div>
    </Container>
  );
}
