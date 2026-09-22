import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Stack,
  Box,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DescriptionIcon from '@mui/icons-material/Description';

// Project card. Defensive rendering:
// - no screenshot → placeholder block, project still reads correctly
// - no repository/demo/report URL → button is not rendered (never fake "#" links)
export default function ProjectCard({ project }) {
  const navigate = useNavigate();
  const cover = project.screenshots && project.screenshots[0];
  const visibleTech = (project.technologies || []).slice(0, 6);
  const hiddenCount = (project.technologies || []).length - visibleTech.length;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'box-shadow 0.25s ease, transform 0.25s ease',
        '&:hover': { boxShadow: 6, transform: 'translateY(-4px)' },
      }}
    >
      <Box aria-hidden="true" sx={{ height: 4, background: 'linear-gradient(90deg, #1d4ed8, #0891b2)' }} />
      {cover && (
        <CardMedia
          component="img"
          image={cover.src}
          alt={cover.alt}
          sx={{ aspectRatio: '16 / 9', objectFit: 'cover', width: '100%' }}
        />
      )}

      <CardContent sx={{ flexGrow: 1 }}>
        <Stack
          direction="row"
          spacing={0.5}
          sx={{ mb: 1.5, flexWrap: 'wrap', rowGap: 0.5 }}
        >
          <Chip label={project.category || project.type} size="small" color="primary" />
          <Chip label={project.type} size="small" variant="outlined" />
        </Stack>

        <Typography variant="h5" component="h3" gutterBottom>
          {project.name}
        </Typography>

        <Typography variant="body2" color="text.secondary" paragraph>
          {project.summary}
        </Typography>

        <Box
          sx={{
            bgcolor: 'action.hover',
            borderRadius: 2,
            p: 1.5,
            mb: 1,
          }}
        >
          <Typography variant="subtitle2" gutterBottom>
            My contribution
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {project.myContribution}
          </Typography>
        </Box>

        <Stack
          direction="row"
          spacing={0.5}
          useFlexGap
          sx={{ mt: 1.5, flexWrap: 'wrap', rowGap: 0.5 }}
        >
          {visibleTech.map((tech) => (
            <Chip key={tech} label={tech} size="small" variant="outlined" />
          ))}
          {hiddenCount > 0 && (
            <Chip label={`+${hiddenCount} more`} size="small" />
          )}
        </Stack>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2, flexWrap: 'wrap', gap: 0.5 }}>
        <Button
          component="a"
          href={`/projects/${project.slug}`}
          onClick={(event) => {
            event.preventDefault();
            navigate(`/projects/${project.slug}`);
          }}
          size="small"
          variant="contained"
          endIcon={<ArrowForwardIcon />}
        >
          View Case Study
        </Button>
        {project.repositoryUrl && (
          <Button
            component="a"
            href={project.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            startIcon={<GitHubIcon />}
          >
            GitHub
          </Button>
        )}
        {project.demoUrl && (
          <Button
            component="a"
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            size="small"
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
            size="small"
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
            size="small"
            endIcon={<DescriptionIcon />}
          >
            Report
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
