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
  IconButton,
  Tooltip,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import DescriptionIcon from '@mui/icons-material/Description';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import WebIcon from '@mui/icons-material/Web';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import StorageIcon from '@mui/icons-material/Storage';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import TechnologyChip from '../common/TechnologyChip';

// Icon per project category, used for the cover artwork when a project has no
// screenshot. Keeps cards visually distinct without inventing imagery.
const categoryIcons = {
  'Full-Stack': WebIcon,
  'Predictive Analytics': AnalyticsIcon,
  'Data Wrangling': StorageIcon,
};

// Secondary destinations as compact icon buttons, so a card is not dominated
// by a row of up to five text buttons.
function secondaryLinks(project) {
  return [
    project.repositoryUrl && {
      key: 'repo',
      href: project.repositoryUrl,
      label: 'GitHub repository',
      icon: <GitHubIcon fontSize="small" />,
    },
    project.demoUrl && {
      key: 'demo',
      href: project.demoUrl,
      label: 'Live demo',
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
}

// Project card. Defensive rendering:
// - no screenshot → branded category cover, project still reads correctly
// - no repository/demo/report URL → link is not rendered (never fake "#" links)
export default function ProjectCard({ project }) {
  const navigate = useNavigate();
  const screenshot = project.screenshots?.[0];
  const cover = screenshot || project.coverImage;
  const isIllustration = !screenshot && Boolean(project.coverImage);
  const visibleTech = (project.technologies || []).slice(0, 6);
  const hiddenCount = (project.technologies || []).length - visibleTech.length;
  const links = secondaryLinks(project);
  const CategoryIcon = categoryIcons[project.category] || WebIcon;
  const isTeam = Boolean(project.role && /team/i.test(project.role));
  const RoleIcon = isTeam ? GroupsIcon : PersonIcon;

  return (
    <Card
      className="portfolio-project-card"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'box-shadow 0.25s ease, transform 0.25s ease',
        '&:hover': { boxShadow: 6, transform: 'translateY(-4px)' },
      }}
    >
      {/* Cover: real screenshot when available, otherwise branded artwork. */}
      {cover ? (
        <Box className="project-card-cover">
          <CardMedia
            component="img"
            image={cover.src}
            alt={cover.alt}
            loading="lazy"
            // Charts retain their complete labels; conceptual covers fill the
            // frame without implying they are screenshots of the project.
            sx={{
              aspectRatio: '16 / 9',
              objectFit: isIllustration ? 'cover' : 'contain',
              width: '100%',
              bgcolor: 'background.paper',
            }}
          />
          {isIllustration && (
            <Box className="project-cover-note">Illustrative cover</Box>
          )}
        </Box>
      ) : (
        <Box
          sx={(theme) => ({
            aspectRatio: '16 / 9',
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
            background:
              theme.custom.gradients.category[project.category] ||
              theme.custom.gradients.categoryFallback,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          })}
        >
          {/* Subtle sheen so the flat gradient reads with a little depth. */}
          <Box
            aria-hidden="true"
            sx={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(115deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 45%)',
            }}
          />
          <CategoryIcon
            aria-hidden="true"
            sx={{ fontSize: 56, color: 'rgba(255,255,255,0.9)', position: 'relative' }}
          />
          <Typography
            variant="overline"
            sx={{
              position: 'absolute',
              bottom: 12,
              left: 16,
              color: 'rgba(255,255,255,0.92)',
              fontWeight: 700,
              letterSpacing: '0.1em',
            }}
          >
            {project.category}
          </Typography>
        </Box>
      )}

      <CardContent className="project-card-content" sx={{ flexGrow: 1 }}>
        <Stack direction="row" spacing={0.5} sx={{ mb: 1.5, flexWrap: 'wrap', rowGap: 0.5 }}>
          <Chip
            icon={<RoleIcon sx={{ fontSize: 16 }} />}
            label={project.role || project.type}
            size="small"
            color={isTeam ? 'default' : 'primary'}
            variant={isTeam ? 'outlined' : 'filled'}
            sx={{ fontWeight: 600 }}
          />
        </Stack>

        <Typography variant="h5" component="h3" gutterBottom>
          {project.name}
        </Typography>

        {/* Contribution leads the card: it is the strongest differentiator and
            was previously buried below the summary. */}
        <Box
          className="project-contribution"
          sx={(theme) => ({
            bgcolor: theme.palette.primary.light,
            borderLeft: 3,
            borderColor: 'primary.main',
            borderRadius: 1.5,
            p: 1.25,
            mb: 1.5,
          })}
        >
          <Typography
            variant="overline"
            sx={{ color: 'primary.dark', fontWeight: 800, lineHeight: 1.6 }}
          >
            My contribution
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.primary',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {project.myContribution}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          {project.summary}
        </Typography>

        <Stack direction="row" spacing={0.5} useFlexGap sx={{ flexWrap: 'wrap', rowGap: 0.5 }}>
          {visibleTech.map((tech) => (
            <TechnologyChip key={tech} label={tech} size="small" variant="outlined" />
          ))}
          {hiddenCount > 0 && <Chip label={`+${hiddenCount} more`} size="small" />}
        </Stack>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2, gap: 0.5, alignItems: 'center' }}>
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

        {/* Secondary destinations as icon buttons with tooltips + a11y labels. */}
        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
          {links.map((link) => (
            <Tooltip key={link.key} title={link.label}>
              <IconButton
                component="a"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                aria-label={`${link.label} — ${project.name}`}
                sx={{ color: 'text.secondary' }}
              >
                {link.icon}
              </IconButton>
            </Tooltip>
          ))}
        </Box>
      </CardActions>
    </Card>
  );
}
