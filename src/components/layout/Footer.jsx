import { Typography, Container, Box, Link, IconButton, Grid } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import { personalInfo } from '../../data/personalInfo';
import { sectionLinks } from '../../data/navigation';
import useSectionLink from '../../hooks/useSectionLink';

export default function Footer() {
  const handleSectionLink = useSectionLink();

  return (
    <Box
      component="footer"
      className="portfolio-footer"
      sx={(theme) => ({
        pt: 6,
        pb: 4,
        mt: 'auto',
        borderTop: 1,
        borderColor: 'divider',
        bgcolor: theme.custom.surfaces.navy,
        color: theme.custom.onDark.muted,
      })}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Typography variant="h6" sx={{ color: 'common.white', fontWeight: 700, mb: 1 }}>
              {personalInfo.name}
            </Typography>
            <Typography
              variant="body2"
              sx={(theme) => ({ color: theme.custom.onDark.subtle, maxWidth: 360 })}
            >
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
                sx={(theme) => ({
                  mr: 1,
                  color: theme.custom.onDark.muted,
                  border: 1,
                  borderColor: theme.custom.surfaces.slateBorder,
                })}
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
                sx={(theme) => ({
                  mr: 1,
                  color: theme.custom.onDark.muted,
                  border: 1,
                  borderColor: theme.custom.surfaces.slateBorder,
                })}
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>
              <IconButton
                component="a"
                href={`mailto:${personalInfo.email}`}
                aria-label="Send an email"
                size="small"
                sx={(theme) => ({
                  color: theme.custom.onDark.muted,
                  border: 1,
                  borderColor: theme.custom.surfaces.slateBorder,
                })}
              >
                <EmailIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" sx={{ color: 'common.white', mb: 1.5 }}>
              Navigate
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
              {sectionLinks.map((link) => (
                <Link
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(event) => handleSectionLink(event, link.id)}
                  underline="hover"
                  variant="body2"
                  sx={(theme) => ({ color: theme.custom.onDark.subtle, width: 'fit-content' })}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle2" sx={{ color: 'common.white', mb: 1.5 }}>
              Contact
            </Typography>
            <Typography
              variant="body2"
              sx={(theme) => ({ color: theme.custom.onDark.subtle, mb: 1 })}
            >
              {personalInfo.email}
            </Typography>
            <Typography
              variant="body2"
              sx={(theme) => ({ color: theme.custom.onDark.subtle })}
            >
              Singapore · Open to 1-year internship (2027)
            </Typography>
          </Grid>
        </Grid>

        <Box
          sx={(theme) => ({
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between',
            gap: 1,
            mt: 5,
            pt: 3,
            borderTop: 1,
            borderColor: theme.custom.surfaces.navyBorder,
          })}
        >
          <Typography
            variant="body2"
            sx={(theme) => ({ color: theme.custom.onDark.faint })}
          >
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </Typography>
          <Typography
            variant="body2"
            sx={(theme) => ({ color: theme.custom.onDark.faint })}
          >
            Built with React, Vite, MUI and React Router.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
