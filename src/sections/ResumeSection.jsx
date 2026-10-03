import { Typography, Container, Stack, Button, Box } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import SectionHeading from '../components/common/SectionHeading';
import { personalInfo } from '../data/personalInfo';

export default function ResumeSection() {
  return (
    <Container maxWidth="lg" className="section-shell" id="resume" component="section">
      <SectionHeading eyebrow="Résumé" title="A closer look at my background." />
      <div className="resume-surface">
        <DescriptionOutlinedIcon sx={{ fontSize: 40, color: 'text.secondary', flexShrink: 0 }} />
        <Box sx={{ minWidth: 0, flexGrow: 1 }}>
          <Typography variant="h6" gutterBottom>Wai Yan Hpone Lat · Résumé</Typography>
          <Typography color="text.secondary" variant="body2" sx={{ mb: 2.5 }}>My education, technical skills and project experience in one PDF.</Typography>
          <Stack direction="row" spacing={1.5} useFlexGap sx={{ flexWrap: 'wrap' }}>
            <Button href={personalInfo.resumePath} target="_blank" rel="noopener noreferrer" variant="contained" startIcon={<VisibilityOutlinedIcon />}>View résumé</Button>
            <Button href={personalInfo.resumePath} download variant="outlined" startIcon={<DownloadOutlinedIcon />}>Download PDF</Button>
          </Stack>
        </Box>
      </div>
    </Container>
  );
}
