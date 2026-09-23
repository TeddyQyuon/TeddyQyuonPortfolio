import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import GitHubIcon from '@mui/icons-material/GitHub';
import { personalInfo } from '../../data/personalInfo';
import { NAV_OFFSET, sectionIds, sectionLinks } from '../../data/navigation';
import useScrollSpy from '../../hooks/useScrollSpy';
import useSectionLink from '../../hooks/useSectionLink';

function Brand({ onClick }) {
  return (
    <Box component={Link} to="/" onClick={onClick} className="portfolio-brand">
      <Box className="portfolio-brand-mark" aria-hidden="true">WY</Box>
      <Box className="portfolio-brand-copy">
        <Typography component="span" className="portfolio-brand-name">
          {personalInfo.name}
        </Typography>
        <Typography component="span" className="portfolio-brand-tagline">
          Applied AI &amp; Analytics · NYP
        </Typography>
      </Box>
    </Box>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const activeId = useScrollSpy(sectionIds, NAV_OFFSET + 24);
  const { pathname } = useLocation();
  const darkSurface = pathname === '/' && (!activeId || activeId === 'projects' || activeId === 'contact');
  const handleSectionLink = useSectionLink();

  const closeDrawer = () => setOpen(false);
  const selectSection = (event, id) => {
    handleSectionLink(event, id);
    closeDrawer();
  };

  return (
    <AppBar
      className={`portfolio-navbar ${darkSurface ? 'portfolio-navbar--dark' : 'portfolio-navbar--light'}`}
      position="sticky"
      color="default"
      elevation={0}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters className="portfolio-navbar-toolbar">
          <Brand />

          <Box component="nav" aria-label="Primary navigation" className="portfolio-desktop-nav">
            {sectionLinks.map((link) => (
              <Button
                key={link.id}
                href={`#${link.id}`}
                onClick={(event) => selectSection(event, link.id)}
                aria-current={activeId === link.id ? 'location' : undefined}
                className={activeId === link.id ? 'portfolio-nav-active' : undefined}
              >
                {link.label}
              </Button>
            ))}
          </Box>

          <Button
            component="a"
            href={personalInfo.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            className="portfolio-navbar-resume"
          >
            Resume
          </Button>

          <IconButton
            className="portfolio-menu-toggle"
            aria-label="Open navigation menu"
            aria-controls="portfolio-nav-drawer"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer
        id="portfolio-nav-drawer"
        anchor="right"
        open={open}
        onClose={closeDrawer}
        PaperProps={{ className: 'portfolio-mobile-drawer' }}
      >
        <Box className="portfolio-drawer-header">
          <Brand onClick={closeDrawer} />
          <IconButton aria-label="Close navigation menu" onClick={closeDrawer}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography className="portfolio-drawer-label" component="p">Navigate</Typography>
        <List className="portfolio-drawer-list" disablePadding>
          <ListItemButton component={Link} to="/" onClick={closeDrawer}>
            <ListItemText primary="Home" />
          </ListItemButton>
          {sectionLinks.map((link) => (
            <ListItemButton
              key={link.id}
              href={`#${link.id}`}
              selected={activeId === link.id}
              onClick={(event) => selectSection(event, link.id)}
            >
              <ListItemText primary={link.label} />
            </ListItemButton>
          ))}
        </List>
        <Box className="portfolio-drawer-actions">
          <Button
            component="a"
            href={personalInfo.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
          >
            Resume
          </Button>
          <Button
            component="a"
            href={personalInfo.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<GitHubIcon />}
          >
            GitHub
          </Button>
        </Box>
      </Drawer>
    </AppBar>
  );
}
