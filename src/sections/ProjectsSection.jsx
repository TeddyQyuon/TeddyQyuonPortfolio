import { Container, Box } from '@mui/material';
import SectionHeading from '../components/common/SectionHeading';
import ProjectCard from '../components/projects/ProjectCard';
import { projects } from '../data/projects';
import HackathonWork from './HackathonWork';

const personalProjects = projects.filter((project) => project.projectGroup === 'personal');
const schoolProjects = projects.filter((project) => project.projectGroup === 'school');

export default function ProjectsSection() {
  return (
    <Container maxWidth="lg" className="section-shell" id="projects" component="section">
      <SectionHeading eyebrow="Selected work" title="Projects I've built." subtitle="From independent web applications to full-stack and analytics coursework." />
      <Box component="section" aria-labelledby="personal-projects-title">
        <div className="project-group-heading"><h3 id="personal-projects-title">Personal projects</h3><span className="project-group-count">{personalProjects.length} projects</span></div>
        <div className="personal-projects">{personalProjects.map((project, index) => <ProjectCard project={project} number={index + 1} key={project.id} />)}</div>
      </Box>
      <HackathonWork />
      <Box component="section" aria-labelledby="school-projects-title">
        <div className="project-group-heading"><h3 id="school-projects-title">School projects</h3><span className="project-group-count">Nanyang Polytechnic · {schoolProjects.length} projects</span></div>
        <div className="school-projects">{schoolProjects.map((project, index) => <ProjectCard project={project} number={personalProjects.length + index + 1} key={project.id} />)}</div>
      </Box>
    </Container>
  );
}
