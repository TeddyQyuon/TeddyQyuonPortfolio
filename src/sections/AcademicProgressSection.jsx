import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SectionHeading from '../components/common/SectionHeading';
import GpaTrendSparkline from '../components/common/GpaTrendSparkline';
import { semesterResults, currentGpa, recentHighlights } from '../data/academicResults';

// Compact academic progress: semester cards keep GPA less dominant than projects.
// Semester GPAs are calculated; current GPA is the official NYP figure.
export default function AcademicProgressSection() {
  const [expanded, setExpanded] = useState(null);

  const toggle = (id) => setExpanded((prev) => (prev === id ? null : id));

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }} id="academic-progress" component="section">
      <SectionHeading
        eyebrow="Academic progress"
        title="Academic Progress"
        subtitle="Semester results with full module transparency — projects remain the main evidence"
      />

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {semesterResults.map((sem) => (
          <Grid item xs={12} sm={6} md={3} key={sem.id}>
            <Paper variant="outlined" sx={{ p: 2.5, height: '100%' }}>
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
                      transform: expanded === sem.id ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s',
                    }}
                  />
                }
                aria-expanded={expanded === sem.id}
              >
                {expanded === sem.id ? 'Hide modules' : 'View modules'}
              </Button>
              <Collapse in={expanded === sem.id}>
                <Box sx={{ mt: 1.5, display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                  {sem.modules.map((m) => (
                    <Box
                      key={m.name}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 1.5,
                      }}
                    >
                      <Typography variant="body2" color="text.secondary" sx={{ flex: 1, minWidth: 0 }}>
                        {m.name} ({m.credits} credits)
                      </Typography>
                      <Chip
                        label={m.grade}
                        size="small"
                        variant="outlined"
                        sx={{
                          flexShrink: 0,
                          minWidth: 38,
                          height: 24,
                          fontWeight: 600,
                          fontSize: '0.75rem',
                          '& .MuiChip-label': {
                            px: 1,
                            whiteSpace: 'nowrap',
                          },
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </Collapse>
            </Paper>
          </Grid>
        ))}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2.5,
              height: '100%',
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
            }}
          >
            <Typography variant="subtitle2" sx={(theme) => ({ color: theme.custom.onPrimary.soft })}>
              Current GPA
            </Typography>
            <Typography variant="h4" component="p" sx={{ my: 0.5 }}>
              {currentGpa}
            </Typography>
            <Typography variant="caption" sx={(theme) => ({ color: theme.custom.onPrimary.soft })}>
              Official figure shown on NYP result statement
            </Typography>
            <GpaTrendSparkline />
          </Paper>
        </Grid>
      </Grid>

      <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 3 }, maxWidth: 860 }}>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1.5 }}>
          <EmojiEventsIcon color="primary" />
          <Typography variant="subtitle1">Recent academic highlights</Typography>
        </Box>
        <Grid container spacing={1.5}>
          {recentHighlights.map((h) => (
            <Grid item xs={12} sm={4} key={h.module}>
              <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 2, p: 1.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Chip label={h.grade} size="small" color="primary" sx={{ mb: 1, alignSelf: 'flex-start' }} />
                <Typography variant="subtitle2" sx={{ mb: 0.5 }}>{h.module}</Typography>
                {h.href ? (
                  <Link component={RouterLink} to={h.href} variant="body2" sx={{ mt: 'auto', fontWeight: 500 }}>
                    {h.evidence} →
                  </Link>
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 'auto' }}>
                    {h.evidence}
                  </Typography>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Contextual CTA connecting predictive analytics coursework to real project */}
        <Box
          sx={{
            mt: 2.5,
            p: 2,
            borderRadius: 2,
            bgcolor: 'action.hover',
            border: 1,
            borderColor: 'divider',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 1.5,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
            <LightbulbOutlinedIcon color="primary" sx={{ fontSize: 22 }} />
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Applying Predictive Analytics to Business
              </Typography>
              <Typography variant="body2" color="text.secondary">
                See how predictive models and revenue forecasting are implemented in production.
              </Typography>
            </Box>
          </Box>
          <Button
            component={RouterLink}
            to="/projects/scenthaus-intelligence"
            size="small"
            variant="outlined"
            endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
            sx={{ fontWeight: 600 }}
          >
            Check out SCENTHAUS ML
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
