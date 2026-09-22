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
      sx={{
        position: 'relative',
        overflow: 'hidden',
        color: '#fff',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #0e7490 100%)',
      }}
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
              sx={{
                mb: 2,
                fontWeight: 700,
                bgcolor: 'rgba(255,255,255,0.12)',
                color: '#a7f3d0',
                border: '1px solid rgba(167,243,208,0.4)',
              }}
            />
            <Typography variant="overline" component="p" sx={{ color: '#93c5fd' }}>
              {personalInfo.role}
            </Typography>
            <Typography
              variant="h1"
              component="h1"
              sx={{ fontSize: { xs: '2.4rem', sm: '3rem', md: '3.4rem' }, mb: 2, color: '#fff' }}
            >
              {personalInfo.name}
            </Typography>
            <Typography
              variant="h6"
              component="p"
              sx={{ maxWidth: 640, mb: 2, fontWeight: 400, lineHeight: 1.6, color: '#e2e8f0' }}
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
                  bgcolor: '#ffffff',
                }}
              >
                <Box
                  component="img"
                  src={nypLogo}
                  alt="Nanyang Polytechnic logo"
                  sx={{ height: 22, width: 'auto', display: 'block' }}
                />
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#0f172a' }}>
                  Nanyang Polytechnic · Year 2
                </Typography>
              </Box>
              <Chip
                icon={<LocationOnIcon fontSize="small" />}
                label={personalInfo.location}
                size="small"
                sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: '#e2e8f0', border: '1px solid rgba(255,255,255,0.2)' }}
              />
            </Stack>

            <Stack direction="row" spacing={1.5} useFlexGap sx={{ flexWrap: 'wrap', mb: 2 }}>
              <Button
                href="#projects"
                variant="contained"
                size="large"
                endIcon={<ArrowDownwardIcon />}
                sx={{ bgcolor: '#fff', color: '#1e3a8a', '&:hover': { bgcolor: '#e0e7ff' } }}
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
                sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.5)', '&:hover': { borderColor: '#fff' } }}
              >
                View Resume
              </Button>
              <Button
                component="a"
                href="#contact"
                variant="text"
                size="large"
                startIcon={<EmailIcon />}
                sx={{ color: '#fff' }}
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
                sx={{ color: '#e2e8f0' }}
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
                sx={{ color: '#e2e8f0' }}
              >
                LinkedIn
              </Button>
            </Stack>
          </Grid>

          <Grid item xs={12} md={5}>
            <Box sx={{ position: 'relative', maxWidth: 360, mx: { xs: 'auto', md: 0 }, ml: { md: 'auto' } }}>
              <Box
                aria-hidden="true"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  transform: 'translate(14px, 14px)',
                  borderRadius: 5,
                  background: 'linear-gradient(135deg, #22d3ee, #3b82f6)',
                  opacity: 0.6,
                }}
              />
              <Paper
                elevation={6}
                sx={{ position: 'relative', p: 1.5, borderRadius: 5, bgcolor: '#fff' }}
              >
                <Box
                  component="img"
                  src={profilePhoto}
                  alt={`Portrait of ${personalInfo.name}`}
                  sx={{
                    width: '100%',
                    aspectRatio: '4 / 5',
                    objectFit: 'cover',
                    objectPosition: '50% 20%',
                    borderRadius: 3.5,
                    display: 'block',
                    bgcolor: '#e2e8f0',
                  }}
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
              sx={{ display: 'block', textAlign: { xs: 'center', md: 'right' }, mt: 1.5, maxWidth: 360, ml: { md: 'auto' }, color: '#cbd5e1' }}
            >
              {personalInfo.currentStudy}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
