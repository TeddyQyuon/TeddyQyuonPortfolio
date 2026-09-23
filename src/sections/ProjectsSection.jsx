import { Container, Grid, Box } from '@mui/material';
import SectionHeading from '../components/common/SectionHeading';
import ProjectCard from '../components/projects/ProjectCard';
import { projects } from '../data/projects';

export default function ProjectsSection() {
  return (
    <Box className="projects-band" sx={{ bgcolor: 'background.default' }}>
      <Container maxWidth="lg" className="portfolio-section projects-section" sx={{ py: { xs: 6, md: 8 } }} id="projects" component="section">
        <SectionHeading
          eyebrow="Projects"
          title="Featured Projects"
          subtitle="Real project work — team projects clearly show my personal contribution. Open a case study for full detail."
        />
        <Grid container spacing={3}>
          {projects.map((project) => (
            <Grid item xs={12} md={6} key={project.id}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
