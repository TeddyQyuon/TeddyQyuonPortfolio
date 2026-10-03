import { Link } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CodeIcon from '@mui/icons-material/Code';
import TechnologyLogo, { hasTechnologyLogo } from '../common/TechnologyLogo';

export default function ProjectCard({ project, number }) {
  const cover = project.screenshots?.[0] || project.coverImage;
  const personal = project.projectGroup === 'personal';
  const route = `/projects/${project.slug}`;
  const technologies = project.cardTechnologies || project.technologies || [];
  return (
    <article className={`project-card project-card-${personal ? 'personal' : 'school'}`} data-project={project.slug} aria-labelledby={`project-${project.id}`}>
      <Link to={route} className="project-cover-link" aria-label={`View ${project.name} case study`}>
        {cover ? <img className="project-cover" src={cover.src} alt={cover.alt} loading="lazy" width="1348" height="926" /> : <div className="project-cover-fallback"><CodeIcon aria-hidden="true" sx={{ fontSize: 48 }} /></div>}
      </Link>
      <div className="project-body">
        <div className="project-meta"><span>{personal ? 'Personal project' : project.id === 1 ? 'School · team project' : 'School · individual project'}</span><span>{String(number).padStart(2, '0')}</span></div>
        <Typography variant="h5" component="h4" id={`project-${project.id}`} className="project-title"><Link to={route}>{project.displayName || project.name}</Link></Typography>
        {project.cardSubtitle && <Typography className="project-subtitle">{project.cardSubtitle}</Typography>}
        <Typography className="project-summary" variant="body2">{project.cardSummary || project.summary}</Typography>
        {project.cardContribution && <Typography className="project-contribution"><strong>My work: </strong>{project.cardContribution}</Typography>}
        <div className="project-tech" aria-label="Technologies used">
          {technologies.map((tech) => <span className="project-tech-item" key={tech}>{hasTechnologyLogo(tech) && <TechnologyLogo name={tech} size={16} />}{tech}</span>)}
        </div>
        <div className="project-actions">
          <Button component={Link} to={route} variant="contained" size="small" aria-label={`Case study — ${project.name}`}>Case study</Button>
          {project.demoUrl && <Button component="a" href={project.demoUrl} target="_blank" rel="noopener noreferrer" variant="outlined" size="small" startIcon={<LaunchIcon sx={{ fontSize: 16 }} />} aria-label={`Live demo — ${project.name}`}>Live demo</Button>}
          {project.reportUrl && <Button component="a" href={project.reportUrl} target="_blank" rel="noopener noreferrer" variant="outlined" size="small" startIcon={<DescriptionOutlinedIcon sx={{ fontSize: 16 }} />} aria-label={`Project report — ${project.name}`}>Report</Button>}
          {project.repositoryUrl && <a className="quiet-link" href={project.repositoryUrl} target="_blank" rel="noopener noreferrer" aria-label={`GitHub repository — ${project.name}`}><GitHubIcon sx={{ fontSize: 17 }} />GitHub</a>}
          {project.apiUrl && <a className="quiet-link" href={project.apiUrl} target="_blank" rel="noopener noreferrer" aria-label={`REST API — ${project.name}`}>API</a>}
        </div>
        {project.cardNote && <Typography className="project-note">{project.cardNote}</Typography>}
      </div>
    </article>
  );
}
