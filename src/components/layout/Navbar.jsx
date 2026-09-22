import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DescriptionIcon from '@mui/icons-material/Description';
import { personalInfo } from '../../data/personalInfo';

const sectionLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={0}
      sx={{
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
                color: '#fff',
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
            {sectionLinks.map((link) => (
              <Button
                key={link.href}
                href={link.href}
                color="inherit"
                sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
              >
                {link.label}
              </Button>
            ))}
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
            <Button
              component="a"
              href={personalInfo.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              size="small"
            >
              Resume
            </Button>
            <IconButton
              aria-label="Open navigation menu"
              aria-controls="nav-menu"
              aria-expanded={open}
              onClick={handleOpen}
              size="large"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="nav-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              {sectionLinks.map((link) => (
                <MenuItem
                  key={link.href}
                  component="a"
                  href={link.href}
                  onClick={handleClose}
                >
                  {link.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
