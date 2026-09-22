import {
  Typography,
  Container,
  Paper,
  Button,
  Grid,
  Box,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SectionHeading from '../components/common/SectionHeading';
import { personalInfo } from '../data/personalInfo';

// No backend, no form — simple reliable contact links.
export default function ContactSection() {
  return (
    <Box sx={{ bgcolor: 'background.paper', borderTop: 1, borderColor: 'divider' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }} id="contact" component="section">
        <SectionHeading
          eyebrow="Contact"
          title="Contact"
          subtitle="Looking for a 1-year technology internship — the fastest way to reach me is by email"
        />
        <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 4 }, maxWidth: 780 }}>
          <Typography paragraph color="text.secondary" sx={{ maxWidth: 640 }}>
            If you have an internship opportunity in Software Engineering,
            Full-Stack Development, Data/Analytics or a related technical role —
            or would like to see more of my work — get in touch.
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 600, mb: 2 }}>
            {personalInfo.email}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Button
                component="a"
                href={`mailto:${personalInfo.email}`}
                variant="contained"
                startIcon={<EmailIcon />}
                fullWidth
              >
                Email Me
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                component="a"
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                startIcon={<GitHubIcon />}
                fullWidth
              >
                GitHub
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                component="a"
                href={personalInfo.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                startIcon={<LinkedInIcon />}
                fullWidth
              >
                LinkedIn
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
