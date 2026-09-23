import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Container,
  Stack,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DescriptionIcon from '@mui/icons-material/Description';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import { personalInfo } from '../../data/personalInfo';
import { sectionLinks, sectionIds, NAV_OFFSET } from '../../data/navigation';
import useScrollSpy from '../../hooks/useScrollSpy';
import useSectionLink from '../../hooks/useSectionLink';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  // Highlights the section currently in view. Empty on routes without sections.
  const activeId = useScrollSpy(sectionIds, NAV_OFFSET + 24);
  const { pathname } = useLocation();
  const darkSurface = pathname === '/' && (!activeId || activeId === 'projects' || activeId === 'contact');
  const handleSectionLink = useSectionLink();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Section links inside the drawer must also close it after navigating.
  const handleSectionClick = (event, id) => {
    handleSectionLink(event, id);
    handleClose();
  };

  return (
    <AppBar
      className={`portfolio-navbar ${darkSurface ? 'portfolio-navbar--dark' : 'portfolio-navbar--light'}`}
      position="sticky"
      color="default"
      elevation={0}
      sx={{
        top: 0,
        borderBottom: 1,
        borderColor: 'divider',
        backdropFilter: 'blur(12px)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 0.5 }}>
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.25,
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Box
              aria-hidden="true"
              sx={{
                width: 36,
                height: 36,
                borderRadius: 2,
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.85rem',
                letterSpacing: '0.02em',
              }}
            >
              WY
            </Box>
            <Box sx={{ lineHeight: 1.2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {personalInfo.name}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: { xs: 'none', sm: 'block' } }}
              >
                Applied AI &amp; Analytics · NYP
              </Typography>
            </Box>
          </Box>

          {/* Desktop navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, alignItems: 'center' }}>
            {sectionLinks.map((link) => {
              const active = activeId === link.id;
              return (
                <Button
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(event) => handleSectionClick(event, link.id)}
                  color="inherit"
                  aria-current={active ? 'true' : undefined}
                  sx={{
                    position: 'relative',
                    color: active ? 'primary.main' : 'text.secondary',
                    '&:hover': { color: 'text.primary' },
                    // Underline indicator that animates in for the active section.
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      left: 12,
                      right: 12,
                      bottom: 4,
                      height: 2,
                      borderRadius: 1,
                      bgcolor: 'primary.main',
                      transform: active ? 'scaleX(1)' : 'scaleX(0)',
                      transition: 'transform 0.2s ease',
                    },
                  }}
                >
                  {link.label}
                </Button>
              );
            })}
            <Button
              component="a"
              href={personalInfo.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              size="small"
              startIcon={<DescriptionIcon fontSize="small" />}
              sx={{ ml: 1 }}
            >
              Resume
            </Button>
          </Box>

          {/* Mobile navigation */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1 }}>
            <IconButton
              aria-label="Open navigation menu"
              aria-controls="nav-drawer"
              aria-expanded={open}
              onClick={handleOpen}
              size="large"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              id="nav-drawer"
              anchor="right"
              open={open}
              onClose={handleClose}
              // Intentionally NOT keepMounted: a kept-mounted drawer parks its
              // content off-screen but still in layout, which widens the
              // document on narrow viewports and creates a horizontal scroll.
              PaperProps={{ className: 'portfolio-mobile-drawer', sx: { width: '100vw', maxWidth: 420, height: '100dvh', p: 2.5 } }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 1,
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  Menu
                </Typography>
                <IconButton onClick={handleClose} aria-label="Close navigation menu">
                  <CloseIcon />
                </IconButton>
              </Box>
              <Divider />
              <List sx={{ py: 1 }}>
                <ListItemButton
                  component={Link}
                  to="/"
                  onClick={handleClose}
                  sx={{ borderRadius: 2, mb: 0.5 }}
                >
                  <ListItemText primary="Home" primaryTypographyProps={{ fontWeight: 600 }} />
                </ListItemButton>
                {sectionLinks.map((link) => (
                  <ListItemButton
                    key={link.id}
                    href={`#${link.id}`}
                    selected={activeId === link.id}
                    onClick={(event) => handleSectionClick(event, link.id)}
                    sx={{ borderRadius: 2, mb: 0.5 }}
                  >
                    <ListItemText
                      primary={link.label}
                      primaryTypographyProps={{ fontWeight: 600 }}
                    />
                  </ListItemButton>
                ))}
              </List>
              <Divider />
              <Stack spacing={1.5} sx={{ px: 1, pt: 2 }}>
                <Button
                  component="a"
                  href={personalInfo.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="contained"
                  startIcon={<DescriptionIcon />}
                  fullWidth
                >
                  View Resume
                </Button>
                <Stack direction="row" spacing={1} sx={{ justifyContent: 'center' }}>
                  <IconButton
                    component="a"
                    href={personalInfo.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile"
                  >
                    <GitHubIcon />
                  </IconButton>
                  <IconButton
                    component="a"
                    href={personalInfo.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile"
                  >
                    <LinkedInIcon />
                  </IconButton>
                  <IconButton
                    component="a"
                    href={`mailto:${personalInfo.email}`}
                    aria-label="Send an email"
                  >
                    <EmailIcon />
                  </IconButton>
                </Stack>
              </Stack>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
