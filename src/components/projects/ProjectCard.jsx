import { Link as RouterLink } from 'react-router-dom';
import { Card } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TechnologyLogo from '../common/TechnologyLogo';
import './ProjectCard.css';

function secondaryLinks(project) {
  return [
    project.repositoryUrl && { key: 'repo', href: project.repositoryUrl, label: 'GitHub' },
    project.demoUrl && { key: 'demo', href: project.demoUrl, label: 'Live Demo' },
    project.apiUrl && { key: 'api', href: project.apiUrl, label: 'API' },
    project.reportUrl && { key: 'report', href: project.reportUrl, label: 'Report PDF' },
  ].filter(Boolean);
}

export default function ProjectCard({ project }) {
  const screenshot = project.screenshots?.[0];
  const links = secondaryLinks(project);
  const architecture = project.architecture?.slice(0, 3).join(' → ');

  return (
    <Card component="article" className="portfolio-project-card project-card">
      {screenshot ? (
        <div className={`project-card-visual${project.slug === 'gym-calories-predictive-analysis' ? ' project-card-visual--chart' : ''}`}>
          <img
            src={screenshot.src}
            alt={screenshot.alt}
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : (
        <div className="project-card-editorial">
          <span className="project-card-editorial-category">{project.category}</span>
          <strong className="project-card-editorial-title">{project.name}</strong>
          {architecture && <span className="project-card-editorial-architecture">{architecture}</span>}
        </div>
      )}

      <div className="project-card-content">
        <p className="project-card-role">{project.role || project.type}</p>
        <h3 className="project-card-title">{project.name}</h3>
        <p className="project-card-summary">{project.summary}</p>

        {project.myContribution && (
          <div className="project-card-contribution">
            <h4>My contribution</h4>
            <p>{project.myContribution}</p>
          </div>
        )}

        {project.technologies?.length > 0 && (
          <ul className="project-card-technologies" aria-label={`${project.name} technologies`}>
            {project.technologies.map((technology) => (
              <li key={technology}>
                <TechnologyLogo
                  name={technology}
                  size={18}
                  className={technology === 'Express.js' ? 'project-card-logo-light' : ''}
                />
                <span>{technology}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="project-card-footer">
        <RouterLink
          to={`/projects/${project.slug}`}
          className="project-card-case-study"
          aria-label={`View case study: ${project.name}`}
        >
          View Case Study <ArrowForwardIcon aria-hidden="true" fontSize="inherit" />
        </RouterLink>

        {links.length > 0 && (
          <div className="project-card-secondary-links">
            {links.map((link) => (
              <a
                key={link.key}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.label}: ${project.name}`}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
