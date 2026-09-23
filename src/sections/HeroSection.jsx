import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { personalInfo } from '../data/personalInfo';
import profilePhoto from '../assets/images/profile/profile.jpg';
import nypLogo from '../assets/images/nyp_logo.png';

export default function HeroSection() {
  return (
    <Box component="section" className="portfolio-hero">
      <Container maxWidth="lg" className="hero-container">
        <Grid container columnSpacing={{ md: 7 }} className="hero-main-grid">
          <Grid item xs={12} md={7} className="hero-copy">
            <Chip
              className="hero-status"
              size="small"
              label={(
                <>
                  <span className="hero-status-desktop">Open to 1-year technology internship · 2027</span>
                  <span className="hero-status-mobile">Open to 1-year internship · 2027</span>
                </>
              )}
            />
            <Typography className="hero-title" variant="overline" component="p">
              {personalInfo.role}
            </Typography>
            <Typography className="hero-name" variant="h1" component="h1">
              {personalInfo.name}
            </Typography>
            <Typography className="hero-intro" variant="h6" component="p">
              {personalInfo.intro}
            </Typography>

            <Stack className="hero-affiliation" direction="row" spacing={2} alignItems="center">
              <Box className="hero-school">
                <Box component="img" src={nypLogo} alt="Nanyang Polytechnic logo" />
                <Typography variant="body2">Nanyang Polytechnic · Year 2</Typography>
              </Box>
              <Typography variant="body2" className="hero-location">
                {personalInfo.location}
              </Typography>
            </Stack>

            <Stack className="hero-actions" direction="row" spacing={1} useFlexGap>
              <Button href="#projects" variant="contained">View Projects</Button>
              <Button
                component="a"
                href={personalInfo.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
              >
                View Resume
              </Button>
              <Button href="#contact" variant="outlined" className="hero-contact-desktop">
                Contact Me
              </Button>
            </Stack>

            <Stack className="hero-social" direction="row" spacing={2} alignItems="center">
              <Button href="#contact" className="hero-contact-mobile">Contact Me</Button>
              <Button
                component="a"
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<GitHubIcon fontSize="small" />}
              >
                GitHub
              </Button>
              <Button
                component="a"
                href={personalInfo.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<LinkedInIcon fontSize="small" />}
              >
                LinkedIn
              </Button>
            </Stack>
          </Grid>

          <Grid item xs={12} md={5} className="hero-profile-column">
            <Paper className="hero-profile-card" elevation={0}>
              <Box
                component="img"
                src={profilePhoto}
                alt={`Portrait of ${personalInfo.name}`}
                fetchPriority="high"
                decoding="async"
                className="hero-profile-photo"
              />
              <Box className="hero-profile-details">
                <Typography variant="h6" component="p">{personalInfo.name}</Typography>
                <Typography variant="body2">
                  Applied AI &amp; Analytics · Seeking 2027 internship
                </Typography>
                <Chip className="hero-availability" label="Available for internship" size="small" />
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Box className="hero-study">
          <Typography className="hero-study-label" variant="overline" component="p">
            Current study
          </Typography>
          <Typography variant="body1" component="p">
            {personalInfo.currentStudy}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
