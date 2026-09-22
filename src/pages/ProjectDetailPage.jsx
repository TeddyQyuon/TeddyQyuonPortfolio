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
  IconButton,
  Tooltip,
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
import { projects } from '../data/projects';

// Case-study page for a single project, found by slug.
// Invalid slug renders a Not Found state.
// Optional fields (dataset, dataPreparation, models, results) render only when present.
export default function ProjectDetailPage() {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];

  if (!project) {
    return (
      <Container maxWidth="md" sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Project not found
        </Typography>
        <Typography color="text.secondary" paragraph>
          The project you are looking for does not exist.
        </Typography>
        <Button component={RouterLink} to="/" variant="contained">
          Back to Home
        </Button>
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
      label: 'Live Demo',
      icon: <LaunchIcon fontSize="small" />,
    },
    project.apiUrl && {
      key: 'api',
      href: project.apiUrl,
      label: 'API',
      icon: <LaunchIcon fontSize="small" />,
    },
    project.reportUrl && {
      key: 'report',
      href: project.reportUrl,
      label: 'Report',
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
      <Button component={RouterLink} to="/" startIcon={<ArrowBackIcon />} sx={{ mb: 3 }}>
        Back to Home
      </Button>

      <Typography variant="h2" component="h1" gutterBottom sx={{ fontSize: { xs: '2rem', md: '2.75rem' } }}>
        {project.name}
      </Typography>
      <Typography
        variant="h6"
        color="text.secondary"
        paragraph
        sx={{ maxWidth: 760, fontWeight: 400 }}
      >
        {project.summary}
      </Typography>

      <Stack direction="row" spacing={1.5} useFlexGap sx={{ mb: 4, flexWrap: 'wrap' }}>
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

      <Grid container spacing={{ xs: 3, md: 4 }}>
        {/* Main case-study content */}
        <Grid item xs={12} md={8} sx={{ order: { xs: 2, md: 1 } }}>
          <ProjectGallery screenshots={project.screenshots} />

          <Box sx={{ mt: project.screenshots?.length ? 4 : 0 }}>
            <Typography variant="h5" component="h2" id="problem" gutterBottom>
              Problem
            </Typography>
            <Typography paragraph color="text.secondary">
              {project.problem}
            </Typography>

            <Typography variant="h5" component="h2" id="solution" gutterBottom>
              Solution
            </Typography>
            <Typography paragraph color="text.secondary">
              {project.solution}
            </Typography>

            {(project.dataset || project.dataPreparation) && (
              <>
                <Typography variant="h5" component="h2" id="data" gutterBottom>
                  Data
                </Typography>
                {project.dataset && (
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Dataset
                    </Typography>
                    <Typography paragraph color="text.secondary">
                      {project.dataset}
                    </Typography>
                  </>
                )}
                {project.dataPreparation && (
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Preparation
                    </Typography>
                    <Typography paragraph color="text.secondary">
                      {project.dataPreparation}
                    </Typography>
                  </>
                )}
              </>
            )}

            {project.models && (
              <>
                <Typography variant="h5" component="h2" id="models" gutterBottom>
                  Models
                </Typography>
                <Typography paragraph color="text.secondary">
                  {project.models}
                </Typography>
              </>
            )}

            {project.results && (
              <>
                <Typography variant="h5" component="h2" id="results" gutterBottom>
                  Results
                </Typography>
                {/* A structured comparison renders as a table; otherwise fall
                    back to the prose summary. */}
                {project.modelComparison ? (
                  <ModelComparison comparison={project.modelComparison} />
                ) : (
                  <Typography paragraph color="text.secondary">
                    {project.results}
                  </Typography>
                )}
              </>
            )}

            <Typography variant="h5" component="h2" id="technologies" gutterBottom>
              Technologies
            </Typography>
            <Stack
              direction="row"
              spacing={0.5}
              useFlexGap
              sx={{ mb: 4, flexWrap: 'wrap', rowGap: 1 }}
            >
              {project.technologies.map((tech) => (
                <Chip key={tech} label={tech} variant="outlined" />
              ))}
            </Stack>

            <Typography variant="h5" component="h2" id="features" gutterBottom>
              Key features
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 4, color: 'text.secondary' }}>
              {project.features.map((feature) => (
                <Typography component="li" key={feature} paragraph sx={{ mb: 1 }}>
                  {feature}
                </Typography>
              ))}
            </Box>

            <Paper
              variant="outlined"
              id="contribution"
              sx={{ p: 3, mb: 4, bgcolor: 'primary.light', borderColor: 'primary.main' }}
            >
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                {isTeam ? <GroupsIcon color="primary" /> : <PersonIcon color="primary" />}
                <Typography variant="h5" component="h2">
                  My contribution
                </Typography>
              </Stack>
              <Typography paragraph sx={{ mb: 0 }}>
                {project.myContribution}
              </Typography>
            </Paper>

            {project.architecture && project.architecture.length > 0 && (
              <>
                <Typography variant="h5" component="h2" id="architecture" gutterBottom>
                  Architecture
                </Typography>
                <Paper
                  variant="outlined"
                  sx={(theme) => ({
                    p: 2.5,
                    mb: 4,
                    bgcolor: theme.custom.surfaces.navy,
                    color: theme.custom.onDark.body,
                  })}
                >
                  {project.architecture.map((layer, layerIndex) => (
                    <Box key={layer}>
                      <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                        {layer}
                      </Typography>
                      {layerIndex < project.architecture.length - 1 && (
                        <Typography
                          variant="body2"
                          sx={(theme) => ({
                            fontFamily: 'monospace',
                            pl: 2,
                            color: theme.custom.onDark.subtle,
                          })}
                        >
                          ↓
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Paper>
              </>
            )}

            <Divider sx={{ my: 4 }} />

            <Typography variant="h5" component="h2" id="challenges" gutterBottom>
              Challenges
            </Typography>
            <Typography paragraph color="text.secondary">
              {project.challenges}
            </Typography>

            <Typography variant="h5" component="h2" id="learnings" gutterBottom>
              What I learned
            </Typography>
            <Typography paragraph color="text.secondary">
              {project.learnings}
            </Typography>
          </Box>

          {/* Prev / next project navigation */}
          {(prevProject || nextProject) && (
            <>
              <Divider sx={{ my: 4 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  {prevProject && (
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 2,
                        height: '100%',
                        transition: 'box-shadow 0.2s ease',
                        '&:hover': { boxShadow: 4 },
                      }}
                    >
                      <Button
                        component={RouterLink}
                        to={`/projects/${prevProject.slug}`}
                        startIcon={<ArrowBackIcon />}
                        size="small"
                        sx={{ mb: 0.5 }}
                      >
                        Previous project
                      </Button>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
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
                      variant="outlined"
                      sx={{
                        p: 2,
                        height: '100%',
                        textAlign: 'right',
                        transition: 'box-shadow 0.2s ease',
                        '&:hover': { boxShadow: 4 },
                      }}
                    >
                      <Button
                        component={RouterLink}
                        to={`/projects/${nextProject.slug}`}
                        endIcon={<ArrowForwardIcon />}
                        size="small"
                        sx={{ mb: 0.5 }}
                      >
                        Next project
                      </Button>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
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
          <Box sx={{ position: { md: 'sticky' }, top: { md: 96 } }}>
            <Paper variant="outlined" sx={{ p: 2.5, mb: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 700 }}>
                At a glance
              </Typography>

              <Stack spacing={1.5}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    My role
                  </Typography>
                  <Stack direction="row" spacing={0.75} alignItems="center">
                    {isTeam ? (
                      <GroupsIcon fontSize="small" color="action" />
                    ) : (
                      <PersonIcon fontSize="small" color="action" />
                    )}
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {project.role || project.type}
                    </Typography>
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Category
                  </Typography>
                  <Stack direction="row" spacing={0.75} alignItems="center">
                    <CategoryIcon fontSize="small" color="action" />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {project.category}
                    </Typography>
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Project type
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {project.type}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary">
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
                  <Stack direction="row" spacing={0.5}>
                    {externalLinks.map((link) => (
                      <Tooltip key={link.key} title={link.label}>
                        <IconButton
                          component="a"
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          size="small"
                          aria-label={`${link.label} — ${project.name}`}
                          sx={{ border: 1, borderColor: 'divider' }}
                        >
                          {link.icon}
                        </IconButton>
                      </Tooltip>
                    ))}
                  </Stack>
                </>
              )}
            </Paper>

            <Paper
              variant="outlined"
              sx={{ p: 1.5, display: { xs: 'none', md: 'block' } }}
            >
              <Typography variant="subtitle2" sx={{ px: 1, pt: 1, fontWeight: 700 }}>
                On this page
              </Typography>
              <List dense disablePadding>
                {toc.map((item) => (
                  <ListItem key={item.id} disablePadding>
                    <ListItemButton
                      component="a"
                      href={`#${item.id}`}
                      sx={{ borderRadius: 1.5, py: 0.5 }}
                    >
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{ variant: 'body2' }}
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
