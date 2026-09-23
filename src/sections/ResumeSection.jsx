import { Typography, Container, Paper, Stack, Button, Box } from '@mui/material';
import SectionHeading from '../components/common/SectionHeading';
import { personalInfo } from '../data/personalInfo';
import resumePreview from '../assets/images/resume-preview.webp';
import './mockupContent.css';

export default function ResumeSection() {
  return (
    <Container maxWidth="lg" className="portfolio-section mockup-content-section resume-section" id="resume" component="section">
      <SectionHeading
        eyebrow="Resume"
        title="Resume"
        subtitle="One document for viewing and download — education, skills and project work"
      />
      <Paper className="resume-card" variant="outlined">
        <Box className="resume-preview">
          <Box
            component="img"
            src={resumePreview}
            alt="Preview of Wai Yan Hpone Lat's resume"
            loading="lazy"
            decoding="async"
          />
        </Box>
        <Box className="resume-card-copy">
          <Typography variant="h3" component="h3" className="resume-file-name">
            Wai_Yan_Hpone_Lat_Resume.pdf
          </Typography>
          <Typography className="resume-description">
            My résumé summarises my education, technical skills and verified
            project work. It is the same file whether you view it in the
            browser or download it.
          </Typography>
          <Stack direction="row" spacing={1.5} useFlexGap className="resume-actions">
            <Button
              component="a"
              href={personalInfo.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
            >
              View Resume
            </Button>
            <Button
              component="a"
              href={personalInfo.resumePath}
              download
              variant="outlined"
            >
              Download Resume
            </Button>
          </Stack>
          <Typography className="resume-path">{personalInfo.resumePath}</Typography>
        </Box>
      </Paper>
    </Container>
  );
}
