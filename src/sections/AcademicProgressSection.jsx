import { useState } from 'react';
import {
  Typography,
  Container,
  Paper,
  Grid,
  Box,
  Chip,
  Link,
  Collapse,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SectionHeading from '../components/common/SectionHeading';
import { semesterResults, currentGpa, recentHighlights } from '../data/academicResults';

// Compact academic progress: semester cards keep GPA less dominant than projects.
// Semester GPAs are calculated; current GPA is the official NYP figure.
export default function AcademicProgressSection() {
  const [expanded, setExpanded] = useState(() => semesterResults.map((semester) => semester.id));

  const toggle = (id) => setExpanded((previous) => previous.includes(id)
    ? previous.filter((semesterId) => semesterId !== id)
    : [...previous, id]);

  return (
    <Container maxWidth="lg" className="portfolio-section academic-section" sx={{ py: { xs: 6, md: 8 } }} id="academic-progress" component="section">
      <SectionHeading
        eyebrow="Academic progress"
        title="Academic Progress"
        subtitle="Semester results with full module transparency — projects remain the main evidence"
      />

      <Paper className="academic-overview" variant="outlined">
        <Typography variant="subtitle2">Current official GPA</Typography>
        <Typography variant="h3" component="p" sx={{ fontWeight: 800, my: 0.5 }}>
          {currentGpa}
        </Typography>
        <Typography variant="body2">Official figure shown on NYP result statement</Typography>
        <Typography variant="body2" sx={{ mt: 1.5 }}>Semester progress: 3.00 → 2.80 → 3.70</Typography>
      </Paper>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {semesterResults.map((sem) => (
          <Grid item xs={12} md={4} key={sem.id}>
            <Paper variant="outlined" className="academic-semester">
              <Typography variant="subtitle2" color="text.secondary">
                {sem.label}
              </Typography>
              <Typography variant="h4" component="p" sx={{ my: 0.5 }}>
                {sem.gpa}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                {sem.academicYear} · {sem.gpaNote}
              </Typography>
              <Button
                size="small"
                onClick={() => toggle(sem.id)}
                endIcon={
                  <ExpandMoreIcon
                    sx={{
                      transform: expanded.includes(sem.id) ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s',
                    }}
                  />
                }
                aria-expanded={expanded.includes(sem.id)}
              >
                {expanded.includes(sem.id) ? 'Hide modules' : 'View modules'}
              </Button>
              <Collapse in={expanded.includes(sem.id)}>
                <Box sx={{ mt: 1.5, display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                  {sem.modules.map((m) => (
                    <Box
                      key={m.name}
                      sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        {m.name} ({m.credits} credits)
                      </Typography>
                      <Chip label={m.grade} size="small" variant="outlined" />
                    </Box>
                  ))}
                </Box>
              </Collapse>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Paper variant="outlined" className="academic-highlights">
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1.5 }}>
          <EmojiEventsIcon color="primary" />
          <Typography variant="subtitle1">Recent academic highlights</Typography>
        </Box>
        <Grid container spacing={1.5}>
          {recentHighlights.map((h) => (
            <Grid item xs={12} sm={4} key={h.module}>
              <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 2, p: 1.5 }}>
                <Chip label={h.grade} size="small" color="primary" sx={{ mb: 1 }} />
                <Typography variant="subtitle2">{h.module}</Typography>
                <Link href={h.href} variant="body2">
                  {h.evidence}
                </Link>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
}
