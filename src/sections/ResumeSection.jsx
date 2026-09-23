import {
  Typography,
  Container,
  Paper,
  Stack,
  Button,
  Box,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import DescriptionIcon from '@mui/icons-material/Description';
import SectionHeading from '../components/common/SectionHeading';
import { personalInfo } from '../data/personalInfo';

// View and download use the same static PDF from /public/resume.
export default function ResumeSection() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }} id="resume" component="section">
      <SectionHeading
        eyebrow="Resume"
        title="Resume"
        subtitle="One document for viewing and download — education, skills and project work"
      />
      <Paper
        variant="outlined"
        sx={{
          p: { xs: 2.5, md: 4 },
          maxWidth: 780,
          display: 'flex',
          gap: 2.5,
          alignItems: { xs: 'flex-start', sm: 'center' },
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: 2,
            bgcolor: 'primary.light',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <DescriptionIcon color="primary" fontSize="large" />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" gutterBottom>
            Wai_Yan_Hpone_Lat_Resume.pdf
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            My résumé summarises my education, technical skills and verified
            project work. It is the same file whether you view it in the
            browser or download it.
          </Typography>
          <Stack direction="row" spacing={1.5} useFlexGap sx={{ flexWrap: 'wrap' }}>
            <Button
              component="a"
              href={personalInfo.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              startIcon={<VisibilityIcon />}
            >
              View Resume
            </Button>
            <Button
              component="a"
              href={personalInfo.resumePath}
              download
              variant="outlined"
              startIcon={<DownloadIcon />}
            >
              Download Resume
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}
