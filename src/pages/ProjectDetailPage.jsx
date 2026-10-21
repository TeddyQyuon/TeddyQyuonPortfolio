import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Chip,
  Stack,
  Button,
  Paper,
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import DescriptionIcon from '@mui/icons-material/Description';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import CategoryIcon from '@mui/icons-material/Category';
import ProjectGallery from '../components/projects/ProjectGallery';
import ModelComparison from '../components/projects/ModelComparison';
import TechnologyChip from '../components/common/TechnologyChip';
import ArchitectureFlow from '../components/projects/ArchitectureFlow';
import { projects } from '../data/projects';
import usePageMetadata from '../hooks/usePageMetadata';
import {
  OG_IMAGE_ALT,
  OG_IMAGE_URL,
  SITE_NAME,
  projectDescription,
  projectPageTitle,
} from '../utils/seo';

// Case-study page for a single project, found by slug.
// Invalid slug renders a Not Found state.
// Optional fields (dataset, dataPreparation, models, results) render only when present.
export default function ProjectDetailPage() {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];

  usePageMetadata({
    title: project ? projectPageTitle(project) : `Project Not Found | ${SITE_NAME}`,
    description: project
      ? projectDescription(project)
      : 'The requested project case study could not be found. Browse the portfolio projects instead.',
    path: project ? `/projects/${project.slug}` : `/projects/${slug ?? ''}`,
    image: OG_IMAGE_URL,
    imageAlt: project
      ? `${project.displayName || project.name} — ${project.category} case study`
      : OG_IMAGE_ALT,
    type: project ? 'article' : 'website',
    noindex: !project,
  });

  if (!project) {
    return (
      <Container maxWidth="md" sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Project not found
        </Typography>
        <Typography color="text.secondary" paragraph>
          The project you are looking for does not exist.
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button component={RouterLink} to="/" variant="contained">
            Back to Home
          </Button>
          <Button component={RouterLink} to="/#projects" variant="outlined">
            Browse all projects
          </Button>
        </Box>
      </Container>
    );
  }

  const prevProject = index > 0 ? projects[index - 1] : null;
  const nextProject = index < projects.length - 1 ? projects[index + 1] : null;

  const externalLinks = [
    project.repositoryUrl && {
      key: 'repo',
      href: project.repositoryUrl,
      label: 'Repository',
      icon: <GitHubIcon fontSize="small" />,
    },
    project.demoUrl && {
      key: 'demo',
      href: project.demoUrl,
      label: project.demoLabel || 'Live demo',
      icon: <LaunchIcon fontSize="small" />,
    },
    project.apiUrl && {
      key: 'api',
      href: project.apiUrl,
      label: 'REST API',
      icon: <LaunchIcon fontSize="small" />,
    },
    project.reportUrl && {
      key: 'report',
      href: project.reportUrl,
      label: 'Project report (PDF)',
      icon: <DescriptionIcon fontSize="small" />,
    },
  ].filter(Boolean);

  const isTeam = Boolean(project.role && /team/i.test(project.role));

  // Only advertise sections this project actually has content for.
  const toc = [
    { id: 'problem', label: 'Problem' },
    { id: 'solution', label: 'Solution' },
    (project.dataset || project.dataPreparation) && { id: 'data', label: 'Data' },
    project.models && { id: 'models', label: 'Models' },
    project.results && { id: 'results', label: 'Results' },
    { id: 'technologies', label: 'Technologies' },
    { id: 'features', label: 'Key features' },
    { id: 'contribution', label: 'My contribution' },
    project.architecture?.length && { id: 'architecture', label: 'Architecture' },
    { id: 'challenges', label: 'Challenges' },
    { id: 'learnings', label: 'What I learned' },
  ].filter(Boolean);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      {/* Sticky Quick-Return Bar */}
      <Box
        sx={{
          position: 'sticky',
          top: { xs: 58, md: 68 },
          zIndex: 100,
          py: 1,
          px: { xs: 1.5, sm: 2 },
          mb: 3.5,
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? 'rgba(9, 13, 22, 0.88)' : 'rgba(247, 248, 250, 0.88)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: 1,
          borderColor: 'divider',
          borderRadius: 2.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1.5,
          boxShadow: (theme) =>
            theme.palette.mode === 'dark'
              ? '0 4px 16px rgba(0, 0, 0, 0.35)'
              : '0 4px 14px rgba(15, 23, 42, 0.05)',
        }}
      >
        <Button
          component={RouterLink}
          to="/#projects"
          startIcon={<ArrowBackIcon />}
          size="small"
          sx={{ fontWeight: 600 }}
        >
          Back to Projects
        </Button>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            display: { xs: 'none', sm: 'block' },
            fontWeight: 600,
            maxWidth: 380,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {project.displayName || project.name}
        </Typography>
      </Box>

      {/* Case-study header */}
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" spacing={1} alignItems="center" useFlexGap sx={{ mb: 1.5, flexWrap: 'wrap' }}>
          <Chip label={project.category} size="small" color="primary" />
          <Chip label={project.type} size="small" variant="outlined" />
        </Stack>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{ fontSize: { xs: '1.95rem', sm: '2.35rem', md: '2.75rem' }, letterSpacing: '-0.03em' }}
        >
          {project.name}
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          paragraph
          sx={{ maxWidth: 780, fontWeight: 400, lineHeight: 1.65, mb: 3 }}
        >
          {project.summary}
        </Typography>

        <Stack direction="row" spacing={1.5} useFlexGap sx={{ flexWrap: 'wrap' }}>
          {externalLinks.map((link) => (
            <Button
              key={link.key}
              component="a"
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              variant={link.key === 'repo' ? 'contained' : 'outlined'}
              startIcon={link.icon}
            >
              {link.label}
            </Button>
          ))}
        </Stack>
        {project.demoAccessNote && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2, maxWidth: 760 }}>
            {project.demoAccessNote}
          </Typography>
        )}
      </Box>

      <Grid container spacing={{ xs: 3, md: 4 }}>
        {/* Main case-study content */}
        <Grid item xs={12} md={8} sx={{ order: { xs: 2, md: 1 } }}>
          <ProjectGallery screenshots={project.screenshots} />

          <Box sx={{ mt: project.screenshots?.length ? 4 : 0 }}>
            <Paper
              variant="outlined"
              id="problem"
              sx={{
                p: { xs: 2.5, sm: 3 },
                mb: 3,
                borderLeft: 4,
                borderLeftColor: 'warning.main',
                borderRadius: 2.5,
                scrollMarginTop: '140px',
              }}
            >
              <Typography variant="h6" component="h2" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
                The Challenge
              </Typography>
              <Typography paragraph color="text.secondary" sx={{ mb: 0, lineHeight: 1.7 }}>
                {project.problem}
              </Typography>
            </Paper>

            <Paper
              variant="outlined"
              id="solution"
              sx={{
                p: { xs: 2.5, sm: 3 },
                mb: 4,
                borderLeft: 4,
                borderLeftColor: 'primary.main',
                borderRadius: 2.5,
                scrollMarginTop: '140px',
              }}
            >
              <Typography variant="h6" component="h2" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
                The Solution
              </Typography>
              <Typography paragraph color="text.secondary" sx={{ mb: 0, lineHeight: 1.7 }}>
                {project.solution}
              </Typography>
            </Paper>

            {(project.dataset || project.dataPreparation) && (
              <Box sx={{ mb: 3, scrollMarginTop: '140px' }} id="data">
                <Typography variant="h5" component="h2" gutterBottom>
                  Data
                </Typography>
                {project.dataset && (
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 700 }}>
                      Dataset
                    </Typography>
                    <Typography paragraph color="text.secondary">
                      {project.dataset}
                    </Typography>
                  </>
                )}
                {project.dataPreparation && (
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 700 }}>
                      Preparation
                    </Typography>
                    <Typography paragraph color="text.secondary">
                      {project.dataPreparation}
                    </Typography>
                  </>
                )}
              </Box>
            )}

            {project.models && (
              <Box sx={{ mb: 3, scrollMarginTop: '140px' }} id="models">
                <Typography variant="h5" component="h2" gutterBottom>
                  Models
                </Typography>
                <Typography paragraph color="text.secondary">
                  {project.models}
                </Typography>
              </Box>
            )}

            {project.results && (
              <Paper
                variant="outlined"
                id="results"
                sx={{
                  p: { xs: 2.5, sm: 3 },
                  mb: 4,
                  borderLeft: 4,
                  borderLeftColor: 'success.main',
                  borderRadius: 2.5,
                  scrollMarginTop: '140px',
                }}
              >
                <Typography variant="h6" component="h2" sx={{ fontWeight: 700, mb: 1.5, color: 'text.primary' }}>
                  The Outcome &amp; Impact
                </Typography>
                {/* A structured comparison renders as a table; otherwise fall
                    back to the prose summary. */}
                {project.modelComparison ? (
                  <ModelComparison comparison={project.modelComparison} />
                ) : (
                  <Typography paragraph color="text.secondary" sx={{ mb: 0, lineHeight: 1.7 }}>
                    {project.results}
                  </Typography>
                )}
              </Paper>
            )}

            <Box id="technologies" sx={{ scrollMarginTop: '140px' }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Technologies
              </Typography>
              <Stack
                direction="row"
                spacing={0.75}
                useFlexGap
                sx={{ mb: 4, flexWrap: 'wrap', rowGap: 1 }}
              >
                {project.technologies.map((tech) => (
                  <TechnologyChip key={tech} label={tech} variant="outlined" />
                ))}
              </Stack>
            </Box>

            <Box id="features" sx={{ scrollMarginTop: '140px' }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Key features
              </Typography>
              <Box component="ul" sx={{ pl: 2.5, mb: 4, color: 'text.secondary' }}>
                {project.features.map((feature) => (
                  <Typography component="li" key={feature} paragraph sx={{ mb: 1.25, lineHeight: 1.7 }}>
                    {feature}
                  </Typography>
                ))}
              </Box>
            </Box>

            <Paper
              variant="outlined"
              id="contribution"
              sx={{
                p: { xs: 2.5, sm: 3 },
                mb: 4,
                bgcolor: 'primary.light',
                borderColor: 'primary.main',
                borderLeft: 4,
                borderLeftColor: 'primary.main',
                borderRadius: 2.5,
                scrollMarginTop: '140px',
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                {isTeam ? <GroupsIcon color="primary" /> : <PersonIcon color="primary" />}
                <Typography variant="h5" component="h2">
                  My contribution
                </Typography>
              </Stack>
              <Typography paragraph sx={{ mb: 0, lineHeight: 1.7 }}>
                {project.myContribution}
              </Typography>
            </Paper>

            {project.architecture && project.architecture.length > 0 && (
              <Box id="architecture" sx={{ scrollMarginTop: '140px' }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Architecture
                </Typography>
                <ArchitectureFlow architecture={project.architecture} />
              </Box>
            )}

            <Divider sx={{ my: 4 }} />

            <Box id="challenges" sx={{ mb: 3.5, scrollMarginTop: '140px' }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Challenges
              </Typography>
              <Typography paragraph color="text.secondary" sx={{ lineHeight: 1.7 }}>
                {project.challenges}
              </Typography>
            </Box>

            <Box id="learnings" sx={{ scrollMarginTop: '140px' }}>
              <Typography variant="h5" component="h2" gutterBottom>
                What I learned
              </Typography>
              <Typography paragraph color="text.secondary" sx={{ lineHeight: 1.7 }}>
                {project.learnings}
              </Typography>
            </Box>
          </Box>

          {/* Prev / next project navigation */}
          {(prevProject || nextProject) && (
            <>
              <Divider sx={{ my: 4 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  {prevProject && (
                    <Paper
                      component={RouterLink}
                      to={`/projects/${prevProject.slug}`}
                      variant="outlined"
                      sx={{
                        display: 'block',
                        textDecoration: 'none',
                        color: 'inherit',
                        p: 2.5,
                        height: '100%',
                        borderRadius: 2.5,
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: 4,
                          borderColor: 'primary.main',
                        },
                      }}
                    >
                      <Stack direction="row" spacing={0.75} alignItems="center" sx={{ mb: 0.75, color: 'primary.main' }}>
                        <ArrowBackIcon fontSize="small" />
                        <Typography variant="caption" sx={{ fontWeight: 700 }}>
                          Previous project
                        </Typography>
                      </Stack>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.35, mb: 0.25 }}>
                        {prevProject.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {prevProject.category}
                      </Typography>
                    </Paper>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  {nextProject && (
                    <Paper
                      component={RouterLink}
                      to={`/projects/${nextProject.slug}`}
                      variant="outlined"
                      sx={{
                        display: 'block',
                        textDecoration: 'none',
                        color: 'inherit',
                        p: 2.5,
                        height: '100%',
                        textAlign: { xs: 'left', sm: 'right' },
                        borderRadius: 2.5,
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: 4,
                          borderColor: 'primary.main',
                        },
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={0.75}
                        alignItems="center"
                        justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
                        sx={{ mb: 0.75, color: 'primary.main' }}
                      >
                        <Typography variant="caption" sx={{ fontWeight: 700 }}>
                          Next project
                        </Typography>
                        <ArrowForwardIcon fontSize="small" />
                      </Stack>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.35, mb: 0.25 }}>
                        {nextProject.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {nextProject.category}
                      </Typography>
                    </Paper>
                  )}
                </Grid>
              </Grid>
            </>
          )}
        </Grid>

        {/* At-a-glance sidebar */}
        <Grid item xs={12} md={4} sx={{ order: { xs: 1, md: 2 } }}>
          <Box sx={{ position: { md: 'sticky' }, top: { md: 132 } }}>
            <Paper variant="outlined" sx={{ p: 2.5, mb: 2.5, borderRadius: 2.5 }}>
              <Typography
                variant="overline"
                color="primary"
                sx={{ display: 'block', mb: 1.5, fontWeight: 700, letterSpacing: '0.08em' }}
              >
                At a glance
              </Typography>

              <Stack spacing={1.75} divider={<Divider flexItem />}>
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.25 }}>
                    My role
                  </Typography>
                  <Stack direction="row" spacing={0.75} alignItems="center">
                    {isTeam ? (
                      <GroupsIcon fontSize="small" color="primary" />
                    ) : (
                      <PersonIcon fontSize="small" color="primary" />
                    )}
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {project.role || project.type}
                    </Typography>
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.25 }}>
                    Category
                  </Typography>
                  <Stack direction="row" spacing={0.75} alignItems="center">
                    <CategoryIcon fontSize="small" color="primary" />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {project.category}
                    </Typography>
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.25 }}>
                    Project type
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {project.type}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.25 }}>
                    Technologies
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {project.technologies.length} listed
                  </Typography>
                </Box>
              </Stack>

              {externalLinks.length > 0 && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                    {externalLinks.map((link) => (
                      <Button
                        key={link.key}
                        component="a"
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="small"
                        variant="outlined"
                        startIcon={link.icon}
                        aria-label={`${link.label} — ${project.name}`}
                      >
                        {link.label}
                      </Button>
                    ))}
                  </Stack>
                </>
              )}
            </Paper>

            <Paper
              variant="outlined"
              sx={{ p: 1.75, borderRadius: 2.5, display: { xs: 'none', md: 'block' } }}
            >
              <Typography
                variant="overline"
                color="text.secondary"
                sx={{ display: 'block', px: 1, pt: 0.5, pb: 0.5, fontWeight: 700, letterSpacing: '0.08em' }}
              >
                On this page
              </Typography>
              <List dense disablePadding>
                {toc.map((item) => (
                  <ListItem key={item.id} disablePadding>
                    <ListItemButton
                      component="a"
                      href={`#${item.id}`}
                      sx={{
                        borderRadius: 1.5,
                        py: 0.6,
                        px: 1.25,
                        '&:hover': { color: 'primary.main' },
                      }}
                    >
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{ variant: 'body2', sx: { fontWeight: 500 } }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
