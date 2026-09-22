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
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import DescriptionIcon from '@mui/icons-material/Description';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ProjectGallery from '../components/projects/ProjectGallery';
import { projects } from '../data/projects';

// Case-study page for a single project, found by slug.
// Invalid slug renders a Not Found state.
// Optional fields (dataset, dataPreparation, models, results) render only when present.
export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

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

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Button
        component={RouterLink}
        to="/"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Back to Home
      </Button>

      <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', rowGap: 1 }}>
        <Chip label={project.category || project.type} size="small" color="primary" />
        <Chip label={project.type} size="small" variant="outlined" />
      </Stack>
      <Typography variant="h2" component="h1" gutterBottom sx={{ fontSize: { xs: '2rem', md: '2.75rem' } }}>
        {project.name}
      </Typography>
      <Typography variant="h6" color="text.secondary" paragraph sx={{ maxWidth: 760, fontWeight: 400 }}>
        {project.summary}
      </Typography>

      <Stack direction="row" spacing={1.5} useFlexGap sx={{ mb: 4, flexWrap: 'wrap' }}>
        {project.repositoryUrl && (
          <Button
            component="a"
            href={project.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            startIcon={<GitHubIcon />}
          >
            View Repository
          </Button>
        )}
        {project.demoUrl && (
          <Button
            component="a"
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            endIcon={<LaunchIcon />}
          >
            Live Demo
          </Button>
        )}
        {project.apiUrl && (
          <Button
            component="a"
            href={project.apiUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            endIcon={<LaunchIcon />}
          >
            API
          </Button>
        )}
        {project.reportUrl && (
          <Button
            component="a"
            href={project.reportUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            endIcon={<DescriptionIcon />}
          >
            View Report
          </Button>
        )}
      </Stack>

      <ProjectGallery screenshots={project.screenshots} />

      <Box sx={{ mt: 5, maxWidth: 800 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Problem
        </Typography>
        <Typography paragraph color="text.secondary">{project.problem}</Typography>

        <Typography variant="h5" component="h2" gutterBottom>
          Solution
        </Typography>
        <Typography paragraph color="text.secondary">{project.solution}</Typography>

        {project.dataset && (
          <>
            <Typography variant="h5" component="h2" gutterBottom>
              Dataset
            </Typography>
            <Typography paragraph color="text.secondary">{project.dataset}</Typography>
          </>
        )}

        {project.dataPreparation && (
          <>
            <Typography variant="h5" component="h2" gutterBottom>
              Data preparation
            </Typography>
            <Typography paragraph color="text.secondary">{project.dataPreparation}</Typography>
          </>
        )}

        {project.models && (
          <>
            <Typography variant="h5" component="h2" gutterBottom>
              Models
            </Typography>
            <Typography paragraph color="text.secondary">{project.models}</Typography>
          </>
        )}

        {project.results && (
          <>
            <Typography variant="h5" component="h2" gutterBottom>
              Results
            </Typography>
            <Typography paragraph color="text.secondary">{project.results}</Typography>
          </>
        )}

        <Typography variant="h5" component="h2" gutterBottom>
          Technologies
        </Typography>
        <Stack direction="row" spacing={0.5} useFlexGap sx={{ mb: 4, flexWrap: 'wrap', rowGap: 1 }}>
          {project.technologies.map((tech) => (
            <Chip key={tech} label={tech} variant="outlined" />
          ))}
        </Stack>

        <Typography variant="h5" component="h2" gutterBottom>
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
          sx={{ p: 3, mb: 4, bgcolor: 'primary.light', borderColor: 'primary.main' }}
        >
          <Typography variant="h5" component="h2" gutterBottom>
            My contribution
          </Typography>
          <Typography paragraph sx={{ mb: 0 }}>{project.myContribution}</Typography>
        </Paper>

        {project.architecture && project.architecture.length > 0 && (
          <>
            <Typography variant="h5" component="h2" gutterBottom>
              Architecture
            </Typography>
            <Paper variant="outlined" sx={{ p: 2.5, mb: 4, bgcolor: '#0f172a', color: '#e2e8f0' }}>
              {project.architecture.map((layer, index) => (
                <Box key={layer}>
                  <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                    {layer}
                  </Typography>
                  {index < project.architecture.length - 1 && (
                    <Typography
                      variant="body2"
                      sx={{ fontFamily: 'monospace', pl: 2, color: '#94a3b8' }}
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

        <Typography variant="h5" component="h2" gutterBottom>
          Challenges
        </Typography>
        <Typography paragraph color="text.secondary">{project.challenges}</Typography>

        <Typography variant="h5" component="h2" gutterBottom>
          What I learned
        </Typography>
        <Typography paragraph color="text.secondary">{project.learnings}</Typography>
      </Box>
    </Container>
  );
}
