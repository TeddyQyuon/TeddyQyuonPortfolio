import { useLocation } from 'react-router-dom';
import { Box, Container, Grid, Link, Typography } from '@mui/material';
import { personalInfo } from '../../data/personalInfo';
import { sectionLinks } from '../../data/navigation';
import useSectionLink from '../../hooks/useSectionLink';

export default function Footer() {
  const { pathname } = useLocation();
  const handleSectionLink = useSectionLink();
  const dark = pathname === '/';

  return (
    <Box component="footer" className={`portfolio-footer ${dark ? 'portfolio-footer--dark' : 'portfolio-footer--light'}`}>
      <Container maxWidth="lg" className="portfolio-footer-main">
        <Grid container columnSpacing={5} rowSpacing={3}>
          <Grid item xs={12} md={5}>
            <Typography className="portfolio-footer-name" component="p">
              {personalInfo.name}
            </Typography>
            <Typography className="portfolio-footer-description" component="p">
              Year 2 Applied AI &amp; Analytics student at Nanyang Polytechnic,
              seeking a 1-year technology internship in software, full-stack and
              data/analytics roles.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography className="portfolio-footer-label" component="p">Navigate</Typography>
            <Box className="portfolio-footer-links">
              {sectionLinks.map((link) => (
                <Link
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(event) => handleSectionLink(event, link.id)}
                  underline="hover"
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography className="portfolio-footer-label" component="p">Contact</Typography>
            <Link className="portfolio-footer-email" href={`mailto:${personalInfo.email}`} underline="hover">
              {personalInfo.email}
            </Link>
            <Typography className="portfolio-footer-location" component="p">
              Singapore · Open to 1-year internship (2027)
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Box className="portfolio-footer-bottom">
        <Container maxWidth="lg">
          <Typography component="span">© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</Typography>
          <Typography component="span">Built with React, Vite, MUI and React Router.</Typography>
        </Container>
      </Box>
    </Box>
  );
}
