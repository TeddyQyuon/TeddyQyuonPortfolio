import { Typography, Container, Box, Link, IconButton, Grid } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import { personalInfo } from '../../data/personalInfo';

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        pt: 6,
        pb: 4,
        mt: 'auto',
        borderTop: 1,
        borderColor: 'divider',
        bgcolor: '#0f172a',
        color: '#cbd5e1',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, mb: 1 }}>
              {personalInfo.name}
            </Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8', maxWidth: 360 }}>
              Year 2 Applied AI &amp; Analytics student at Nanyang Polytechnic,
              seeking a 1-year technology internship in software, full-stack and
              data/analytics roles.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton
                component="a"
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                size="small"
                sx={{ mr: 1, color: '#cbd5e1', border: 1, borderColor: '#334155' }}
              >
                <GitHubIcon fontSize="small" />
              </IconButton>
              <IconButton
                component="a"
                href={personalInfo.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                size="small"
                sx={{ mr: 1, color: '#cbd5e1', border: 1, borderColor: '#334155' }}
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>
              <IconButton
                component="a"
                href={`mailto:${personalInfo.email}`}
                aria-label="Send an email"
                size="small"
                sx={{ color: '#cbd5e1', border: 1, borderColor: '#334155' }}
              >
                <EmailIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={6} md={3}>
            <Typography variant="subtitle2" sx={{ color: '#fff', mb: 1.5 }}>
              Navigate
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  underline="hover"
                  variant="body2"
                  sx={{ color: '#94a3b8', width: 'fit-content' }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid item xs={6} md={4}>
            <Typography variant="subtitle2" sx={{ color: '#fff', mb: 1.5 }}>
              Contact
            </Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8', mb: 1 }}>
              {personalInfo.email}
            </Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8' }}>
              Singapore · Open to 1-year internship (2027)
            </Typography>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between',
            gap: 1,
            mt: 5,
            pt: 3,
            borderTop: 1,
            borderColor: '#1e293b',
          }}
        >
          <Typography variant="body2" sx={{ color: '#64748b' }}>
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b' }}>
            Built with React, Vite, MUI and React Router.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
