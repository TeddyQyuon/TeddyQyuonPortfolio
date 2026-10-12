import { Box, Button } from '@mui/material';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { personalInfo } from '../../data/personalInfo';
import useSectionLink from '../../hooks/useSectionLink';

/**
 * Mobile-only sticky bottom quick-actions bar.
 * Gives recruiters on phones instant access to the two primary CTAs
 * without needing to open the menu drawer.
 */
export default function MobileQuickActions() {
  const handleSectionLink = useSectionLink();

  return (
    <Box
      component="aside"
      aria-label="Mobile quick actions"
      sx={{
        display: { xs: 'flex', md: 'none' },
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        p: 1.5,
        pb: 'calc(env(safe-area-inset-bottom, 0px) + 12px)',
        bgcolor: 'rgba(255, 255, 255, 0.94)',
        backdropFilter: 'blur(12px)',
        borderTop: 1,
        borderColor: 'divider',
        boxShadow: '0 -4px 20px rgba(19, 25, 35, 0.06)',
        zIndex: 1200,
        gap: 1.5,
      }}
    >
      <Button
        component="a"
        href={personalInfo.resumePath}
        target="_blank"
        rel="noopener noreferrer"
        variant="contained"
        size="medium"
        startIcon={<ArticleOutlinedIcon sx={{ fontSize: 18 }} />}
        fullWidth
        sx={{
          fontWeight: 600,
          py: 1,
          borderRadius: 2,
        }}
      >
        View Résumé
      </Button>
      <Button
        component="a"
        href="#contact"
        onClick={(event) => handleSectionLink(event, 'contact')}
        variant="outlined"
        size="medium"
        startIcon={<EmailOutlinedIcon sx={{ fontSize: 18 }} />}
        fullWidth
        sx={{
          fontWeight: 600,
          py: 1,
          borderRadius: 2,
          bgcolor: 'background.paper',
        }}
      >
        Contact
      </Button>
    </Box>
  );
}
