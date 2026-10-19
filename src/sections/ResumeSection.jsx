import { Typography, Container, Stack, Button, Box } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import SectionHeading from '../components/common/SectionHeading';
import { personalInfo } from '../data/personalInfo';

export default function ResumeSection() {
  return (
    <Container maxWidth="lg" className="section-shell" id="resume" component="section">
      <SectionHeading index="06" eyebrow="Résumé" title="A closer look at my background." />
      <div className="resume-surface">
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            bgcolor: (theme) =>
              theme.palette.mode === 'dark' ? 'rgba(59, 130, 246, 0.14)' : 'rgba(37, 99, 235, 0.08)',
            border: '1px solid',
            borderColor: (theme) =>
              theme.palette.mode === 'dark' ? 'rgba(59, 130, 246, 0.28)' : 'rgba(37, 99, 235, 0.18)',
          }}
        >
          <DescriptionOutlinedIcon sx={{ fontSize: 28, color: 'primary.main' }} />
        </Box>
        <Box
          sx={{
            minWidth: 0,
            flexGrow: 1,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            justifyContent: 'space-between',
            gap: 2.5,
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
              Wai Yan Hpone Lat · Résumé
            </Typography>
            <Typography color="text.secondary" variant="body2">
              My education, technical skills and project experience in one PDF.
            </Typography>
          </Box>
          <Stack
            direction="row"
            spacing={1.5}
            useFlexGap
            sx={{ flexWrap: 'wrap', flexShrink: 0, width: { xs: '100%', sm: 'auto' } }}
          >
            <Button
              href={personalInfo.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              startIcon={<VisibilityOutlinedIcon />}
              sx={{ flex: { xs: '1 1 auto', sm: '0 0 auto' } }}
            >
              View résumé
            </Button>
            <Button
              href={personalInfo.resumePath}
              download
              variant="outlined"
              startIcon={<DownloadOutlinedIcon />}
              sx={{ flex: { xs: '1 1 auto', sm: '0 0 auto' } }}
            >
              Download PDF
            </Button>
          </Stack>
        </Box>
      </div>
    </Container>
  );
}
