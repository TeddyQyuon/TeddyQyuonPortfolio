import {
  Typography,
  Container,
  Stack,
  Button,
  Box,
  Grid,
  Chip,
  Paper,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DescriptionIcon from '@mui/icons-material/Description';
import EmailIcon from '@mui/icons-material/Email';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { personalInfo } from '../data/personalInfo';
// To use your photo (Image 1): save it as
// src/assets/images/profile/profile.jpg (overwrite the placeholder).
import profilePhoto from '../assets/images/profile/profile.jpg';
import nypLogo from '../assets/images/nyp_logo.png';

// Recruiter-first hero: name, study, areas, internship goal, CTAs.
// Dark navy gradient + glow = cool but professional. Two-column desktop.
export default function HeroSection() {
  return (
    <Box
      component="section"
      sx={(theme) => ({
        position: 'relative',
        overflow: 'hidden',
        color: theme.palette.common.white,
        background: theme.custom.gradients.hero,
      })}
    >
      {/* soft glows, pure CSS */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          width: 480,
          height: 480,
          top: -160,
          right: -120,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.35) 0, transparent 65%)',
        }}
      />
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          width: 420,
          height: 420,
          bottom: -180,
          left: -120,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.35) 0, transparent 65%)',
        }}
      />
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 }, position: 'relative' }}>
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
          <Grid item xs={12} md={7}>
            <Chip
              label="Open to 1-year technology internship · 2027"
              size="small"
              sx={(theme) => ({
                mb: 2,
                fontWeight: 700,
                bgcolor: 'rgba(255,255,255,0.12)',
                color: theme.custom.onDark.accentSoft,
                border: '1px solid rgba(167,243,208,0.4)',
              })}
            />
            <Typography
              variant="overline"
              component="p"
              sx={(theme) => ({ color: theme.custom.onDark.accent })}
            >
              {personalInfo.role}
            </Typography>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: '2.4rem', sm: '3rem', md: '3.4rem' },
                mb: 2,
                color: 'common.white',
              }}
            >
              {personalInfo.name}
            </Typography>
            <Typography
              variant="h6"
              component="p"
              sx={(theme) => ({
                maxWidth: 640,
                mb: 2,
                fontWeight: 400,
                lineHeight: 1.6,
                color: theme.custom.onDark.body,
              })}
            >
              {personalInfo.intro}
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              sx={{ flexWrap: 'wrap', mb: 3 }}
            >
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  pl: 1,
                  pr: 1.5,
                  py: 0.5,
                  borderRadius: 999,
                  border: '1px solid rgba(255,255,255,0.25)',
                  bgcolor: 'background.paper',
                }}
              >
                <Box
                  component="img"
                  src={nypLogo}
                  alt="Nanyang Polytechnic logo"
                  sx={{ height: 22, width: 'auto', display: 'block' }}
                />
                <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                  Nanyang Polytechnic · Year 2
                </Typography>
              </Box>
              <Chip
                icon={<LocationOnIcon fontSize="small" />}
                label={personalInfo.location}
                size="small"
                sx={(theme) => ({
                  bgcolor: 'rgba(255,255,255,0.1)',
                  color: theme.custom.onDark.body,
                  border: '1px solid rgba(255,255,255,0.2)',
                })}
              />
            </Stack>

            <Stack direction="row" spacing={1.5} useFlexGap sx={{ flexWrap: 'wrap', mb: 2 }}>
              <Button
                href="#projects"
                variant="contained"
                size="large"
                endIcon={<ArrowDownwardIcon />}
                sx={(theme) => ({
                  bgcolor: 'common.white',
                  color: theme.palette.primary.dark,
                  '&:hover': { bgcolor: theme.palette.primary.light },
                })}
              >
                View Projects
              </Button>
              <Button
                component="a"
                href={personalInfo.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                size="large"
                startIcon={<DescriptionIcon />}
                sx={{
                  color: 'common.white',
                  borderColor: 'rgba(255,255,255,0.5)',
                  '&:hover': { borderColor: 'common.white' },
                }}
              >
                View Resume
              </Button>
              <Button
                component="a"
                href="#contact"
                variant="text"
                size="large"
                startIcon={<EmailIcon />}
                sx={{ color: 'common.white' }}
              >
                Contact Me
              </Button>
            </Stack>

            <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
              <Button
                component="a"
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                color="inherit"
                startIcon={<GitHubIcon fontSize="small" />}
                sx={(theme) => ({ color: theme.custom.onDark.body })}
              >
                GitHub
              </Button>
              <Button
                component="a"
                href={personalInfo.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                color="inherit"
                startIcon={<LinkedInIcon fontSize="small" />}
                sx={(theme) => ({ color: theme.custom.onDark.body })}
              >
                LinkedIn
              </Button>
            </Stack>
          </Grid>

          <Grid item xs={12} md={5}>
            <Box sx={{ position: 'relative', maxWidth: 360, mx: { xs: 'auto', md: 0 }, ml: { md: 'auto' } }}>
              <Box
                aria-hidden="true"
                sx={(theme) => ({
                  position: 'absolute',
                  inset: 0,
                  transform: 'translate(14px, 14px)',
                  borderRadius: 5,
                  background: theme.custom.gradients.avatarRing,
                  opacity: 0.6,
                })}
              />
              <Paper
                elevation={6}
                sx={{ position: 'relative', p: 1.5, borderRadius: 5, bgcolor: 'background.paper' }}
              >
                <Box
                  component="img"
                  src={profilePhoto}
                  alt={`Portrait of ${personalInfo.name}`}
                  // Intrinsic size lets the browser reserve space before decode
                  // (avoids layout shift) and marks this as the LCP image.
                  // The matching `height: auto` in sx is REQUIRED: without it the
                  // height attribute wins over aspect-ratio and the image renders
                  // at its full intrinsic height instead of the 4/5 crop.
                  width={964}
                  height={1280}
                  fetchpriority="high"
                  decoding="async"
                  sx={(theme) => ({
                    width: '100%',
                    height: 'auto',
                    aspectRatio: '4 / 5',
                    objectFit: 'cover',
                    objectPosition: '50% 20%',
                    borderRadius: 3.5,
                    display: 'block',
                    bgcolor: theme.palette.divider,
                  })}
                />
                <Box sx={{ px: 1.5, pt: 1.5, pb: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {personalInfo.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Applied AI &amp; Analytics · Seeking 2027 internship
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Chip
                      label="Available for internship"
                      color="primary"
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>
                </Box>
              </Paper>
            </Box>
            <Typography
              variant="caption"
              sx={(theme) => ({
                display: 'block',
                textAlign: { xs: 'center', md: 'right' },
                mt: 1.5,
                maxWidth: 360,
                ml: { md: 'auto' },
                color: theme.custom.onDark.muted,
              })}
            >
              {personalInfo.currentStudy}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
