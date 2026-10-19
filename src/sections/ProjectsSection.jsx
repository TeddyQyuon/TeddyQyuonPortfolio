import { useState } from 'react';
import { Container, Box, Chip, Stack, Typography, Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SectionHeading from '../components/common/SectionHeading';
import ProjectCard from '../components/projects/ProjectCard';
import { projects } from '../data/projects';

const FILTERS = [
  { id: 'all', label: 'All Projects' },
  { id: 'react-fullstack', label: 'React & Full-Stack' },
  { id: 'python-ml', label: 'Python / ML & Analytics' },
  { id: 'stripe-ecommerce', label: 'Stripe & E-Commerce' },
  { id: 'school', label: 'Coursework' },
];

function matchesFilter(project, filterId) {
  if (filterId === 'all') return true;
  const techLower = (project.technologies || []).map((t) => t.toLowerCase());
  const categoryLower = (project.category || '').toLowerCase();
  const summaryLower = (project.summary || '').toLowerCase();

  if (filterId === 'react-fullstack') {
    return techLower.some((t) =>
      t.includes('react') || t.includes('node') || t.includes('express') || t.includes('vite')
    );
  }
  if (filterId === 'python-ml') {
    return (
      techLower.some((t) =>
        t.includes('python') || t.includes('fastapi') || t.includes('django') ||
        t.includes('scikit') || t.includes('mlflow') || t.includes('knime')
      ) ||
      categoryLower.includes('analytics') || categoryLower.includes('ai')
    );
  }
  if (filterId === 'stripe-ecommerce') {
    return (
      techLower.some((t) => t.includes('stripe')) ||
      summaryLower.includes('marketplace') ||
      summaryLower.includes('retailer') ||
      summaryLower.includes('e-commerce')
    );
  }
  if (filterId === 'school') {
    return project.projectGroup === 'school';
  }
  return true;
}

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = projects.filter((p) => matchesFilter(p, activeFilter));
  const personalProjects = filteredProjects.filter((p) => p.projectGroup === 'personal');
  const schoolProjects = filteredProjects.filter((p) => p.projectGroup === 'school');

  const activeFilterObj = FILTERS.find((f) => f.id === activeFilter) || FILTERS[0];

  return (
    <Container maxWidth="lg" className="section-shell" id="projects" component="section">
      <SectionHeading
        index="01"
        eyebrow="Selected work"
        title="Projects I've built."
        subtitle="From independent web applications to full-stack and analytics coursework."
      />

      {/* Interactive Project Filter Pills */}
      <Box sx={{ mb: 4.5 }}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{
            flexWrap: 'wrap',
            gap: 1,
            rowGap: 1,
            p: { xs: 1.25, sm: 1.5 },
            borderRadius: 3,
            bgcolor: 'background.paper',
            border: 1,
            borderColor: 'divider',
            boxShadow: '0 1px 2px rgba(15, 23, 42, 0.03)',
          }}
          role="toolbar"
          aria-label="Filter projects by discipline and technology"
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, px: 1, mr: 0.5, color: 'text.secondary' }}>
            <FilterListIcon sx={{ fontSize: 18, color: 'secondary.main' }} />
            <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Filter
            </Typography>
          </Box>
          {FILTERS.map((filter) => {
            const count = projects.filter((p) => matchesFilter(p, filter.id)).length;
            const isSelected = activeFilter === filter.id;
            return (
              <Chip
                key={filter.id}
                label={`${filter.label} (${count})`}
                onClick={() => setActiveFilter(filter.id)}
                color={isSelected ? 'primary' : 'default'}
                variant={isSelected ? 'filled' : 'outlined'}
                sx={{
                  fontWeight: isSelected ? 650 : 500,
                  fontSize: '0.8125rem',
                  height: 34,
                  borderRadius: 2,
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                  '&:hover': {
                    bgcolor: isSelected ? 'primary.dark' : 'action.hover',
                    transform: 'translateY(-1px)',
                  },
                }}
                aria-pressed={isSelected}
              />
            );
          })}
        </Stack>

        {/* Filter Feedback Banner when filter is active */}
        {activeFilter !== 'all' && (
          <Box
            sx={{
              mt: 2,
              p: 1.25,
              px: 2,
              borderRadius: 2,
              bgcolor: 'action.hover',
              border: 1,
              borderColor: 'divider',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 1,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Showing <strong>{filteredProjects.length}</strong> {filteredProjects.length === 1 ? 'project' : 'projects'} matching <strong>{activeFilterObj.label}</strong>
            </Typography>
            <Button
              size="small"
              onClick={() => setActiveFilter('all')}
              startIcon={<RestartAltIcon sx={{ fontSize: 16 }} />}
              sx={{ textTransform: 'none', fontWeight: 600 }}
            >
              Reset filter
            </Button>
          </Box>
        )}
      </Box>

      {/* Friendly empty state so a zero-result filter never looks broken. */}
      {filteredProjects.length === 0 && (
        <Box
          sx={{
            p: 4,
            mb: 5,
            textAlign: 'center',
            border: 1,
            borderColor: 'divider',
            borderRadius: 2,
            bgcolor: 'action.hover',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            No projects match this filter yet.
          </Typography>
          <Button
            size="small"
            onClick={() => setActiveFilter('all')}
            sx={{ mt: 1.5, fontWeight: 600, textTransform: 'none' }}
          >
            Show all projects
          </Button>
        </Box>
      )}

      {/* Personal projects */}
      {personalProjects.length > 0 && (
        <Box component="section" aria-labelledby="personal-projects-title" sx={{ mb: schoolProjects.length > 0 ? 5 : 0 }}>
          <div className="project-group-heading">
            <h3 id="personal-projects-title">Personal projects</h3>
            <span className="project-group-count">{personalProjects.length} {personalProjects.length === 1 ? 'project' : 'projects'}</span>
          </div>
          <div className="personal-projects">
            {personalProjects.map((project, index) => (
              <ProjectCard project={project} number={index + 1} key={project.id} />
            ))}
          </div>
        </Box>
      )}

      {/* School projects */}
      {schoolProjects.length > 0 && (
        <Box component="section" aria-labelledby="school-projects-title">
          <div className="project-group-heading">
            <h3 id="school-projects-title">School projects</h3>
            <span className="project-group-count">Nanyang Polytechnic · {schoolProjects.length} {schoolProjects.length === 1 ? 'project' : 'projects'}</span>
          </div>
          <div className="school-projects">
            {schoolProjects.map((project, index) => (
              <ProjectCard
                project={project}
                number={personalProjects.length + index + 1}
                key={project.id}
              />
            ))}
          </div>
        </Box>
      )}
    </Container>
  );
}
