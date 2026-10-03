import { Typography, Container, Box, Grid, Stack, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { personalInfo } from '../../data/personalInfo';
import { sectionLinks } from '../../data/navigation';
import useSectionLink from '../../hooks/useSectionLink';

export default function Footer() {
  const { surfaces, onDark } = useTheme().custom;
  const handleSectionLink = useSectionLink();
  return (
    <Box component="footer" sx={{ bgcolor: surfaces.navy, color: 'common.white' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>{personalInfo.name}</Typography>
            <Typography variant="body2" sx={{ color: onDark.muted, maxWidth: 410 }}>Year 2 Applied AI &amp; Analytics student at Nanyang Polytechnic, seeking a 1-year technology internship in software, full-stack and data/analytics roles.</Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <IconButton component="a" href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" sx={{ color: onDark.muted }}><GitHubIcon /></IconButton>
              <IconButton component="a" href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" sx={{ color: onDark.muted }}><LinkedInIcon /></IconButton>
              <IconButton component="a" href={`mailto:${personalInfo.email}`} aria-label="Send an email" sx={{ color: onDark.muted }}><EmailOutlinedIcon /></IconButton>
            </Stack>
          </Grid>
          <Grid item xs={5} md={2}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Explore</Typography>
            <nav aria-label="Footer navigation">{sectionLinks.map((link) => <a className="footer-link" href={`/#${link.id}`} key={link.id} onClick={(event) => handleSectionLink(event, link.id)}>{link.label}</a>)}</nav>
          </Grid>
          <Grid item xs={7} md={4}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Get in touch</Typography>
            <Typography variant="body2" sx={{ color: onDark.muted, overflowWrap: 'anywhere', mb: 1 }}>{personalInfo.email}</Typography>
            <Typography variant="body2" sx={{ color: onDark.subtle }}>Singapore · 2027 internship</Typography>
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1.5, mt: 5, pt: 3, borderTop: 1, borderColor: surfaces.navyBorder }}>
          <Typography variant="caption" sx={{ color: onDark.subtle }}>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</Typography>
          <Typography variant="caption" sx={{ color: onDark.subtle }}>Built with React, Vite, MUI and React Router.</Typography>
        </Box>
      </Container>
    </Box>
  );
}
