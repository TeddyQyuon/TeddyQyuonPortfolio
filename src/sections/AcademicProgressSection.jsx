import { Typography, Container, Paper, Box, Link } from '@mui/material';
import SectionHeading from '../components/common/SectionHeading';
import { semesterResults, currentGpa, recentHighlights } from '../data/academicResults';
import './mockupContent.css';

export default function AcademicProgressSection() {
  return (
    <Container maxWidth="lg" className="portfolio-section mockup-content-section academic-section" id="academic-progress" component="section">
      <SectionHeading
        eyebrow="Academic progress"
        title="Academic Progress"
        subtitle="Semester results with full module transparency — projects remain the main evidence"
      />

      <Paper className="academic-overview" variant="outlined">
        <Box className="academic-current-gpa">
          <Typography className="academic-overview-label">Current GPA</Typography>
          <Typography component="p" className="academic-overview-value">{currentGpa}</Typography>
        </Box>
        <Typography className="academic-overview-note">
          Official figure shown on NYP result statement
        </Typography>
        <Typography className="academic-gpa-trend">
          {semesterResults.map((semester) => semester.gpa).join('  →  ')}
        </Typography>
      </Paper>

      <Box className="academic-semester-grid">
        {semesterResults.map((semester) => (
          <Paper variant="outlined" className="academic-semester" key={semester.id}>
            <Typography className="academic-semester-year">{semester.academicYear}</Typography>
            <Typography variant="h3" component="h3" className="academic-semester-title">
              {semester.label}
            </Typography>
            <Typography component="p" className="academic-semester-gpa">{semester.gpa}</Typography>
            <Typography className="academic-semester-note">{semester.gpaNote}</Typography>
            <Box component="ul" className="academic-module-list">
              {semester.modules.map((module) => (
                <Box component="li" className="academic-module" key={module.name}>
                  <Box className="academic-module-copy">
                    <Typography className="academic-module-name">{module.name}</Typography>
                    <Typography className="academic-module-credits">Credits: {module.credits}</Typography>
                  </Box>
                  <Typography className="academic-module-grade" aria-label={`Grade ${module.grade}`}>
                    {module.grade}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        ))}
      </Box>

      <Typography variant="h3" component="h3" className="academic-highlights-title">
        Recent academic highlights
      </Typography>
      <Box className="academic-highlights-grid">
        {recentHighlights.map((highlight) => (
          <Paper variant="outlined" className="academic-highlight-card" key={highlight.module}>
            <Typography className="academic-highlight-grade" aria-label={`Grade ${highlight.grade}`}>
              {highlight.grade}
            </Typography>
            <Typography variant="h4" component="h4" className="academic-highlight-module">
              {highlight.module}
            </Typography>
            <Link href={highlight.href} underline="hover" className="academic-highlight-link">
              {highlight.evidence} →
            </Link>
          </Paper>
        ))}
      </Box>
    </Container>
  );
}
