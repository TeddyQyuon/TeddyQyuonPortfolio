import { Typography, Container, Paper, Box } from '@mui/material';
import SectionHeading from '../components/common/SectionHeading';
import { educationJourney } from '../data/education';
import './mockupContent.css';

export default function EducationSection() {
  return (
    <Box className="education-band">
      <Container maxWidth="lg" className="portfolio-section mockup-content-section education-section" id="education" component="section">
        <SectionHeading
          eyebrow="Education"
          title="Education Journey"
          subtitle="Chronological academic background — from Myanmar to Singapore"
        />
        <Box className="education-timeline">
          {educationJourney.map((stage, index) => (
            <Paper variant="outlined" className={`education-card education-card--${index + 1}`} key={stage.id}>
              <Box className="education-stage-number" aria-label={`Stage ${index + 1}`}>{index + 1}</Box>
              <Box className="education-stage-content">
                <Typography className="education-period">{stage.period}</Typography>
                <Typography variant="h3" component="h3" className="education-institution">
                  {stage.institution}
                </Typography>
                <Typography className="education-location">{stage.location}</Typography>
                <Typography className="education-qualification">{stage.qualification}</Typography>
                <Typography className="education-summary">{stage.summary}</Typography>

                {stage.marks && (
                  <Box className="education-results">
                    <Typography className="education-detail-heading">Subject results</Typography>
                    <Box component="ul" className="education-marks-grid">
                      {stage.marks.map((mark) => (
                        <Box component="li" className="education-mark" key={mark.subject}>
                          <Typography component="span" className="education-mark-subject">{mark.subject}</Typography>
                          <Typography component="span" className="education-mark-value">
                            {mark.mark} · {mark.result}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}

                {stage.coursework && (
                  <Box className="education-coursework">
                    <Typography className="education-detail-heading">Relevant coursework</Typography>
                    <Box component="ul">
                      {stage.coursework.map((item) => (
                        <Box component="li" key={item}>{item}</Box>
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
