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
    <Container maxWidth="lg" className="section-shell" id="academic-progress" component="section">
      <SectionHeading
        index="05"
        eyebrow="Academic progress"
        title="Academic Progress"
        subtitle="Semester results with full module transparency — projects remain the main evidence"
      />

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {semesterResults.map((sem) => (
          <Grid item xs={12} sm={6} md={3} key={sem.id}>
            <Paper
              variant="outlined"
              sx={{
                p: 2.75,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'background.paper',
                boxShadow: '0 2px 10px rgba(15, 23, 42, 0.03)',
              }}
            >
              <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
                {sem.label}
              </Typography>
              <Typography variant="h3" component="p" sx={{ my: 0.75, fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>
                {sem.gpa}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
                {sem.academicYear} · {sem.gpaNote}
              </Typography>
              <Button
                size="small"
                variant="outlined"
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
                sx={{ alignSelf: 'flex-start', mt: 'auto' }}
              >
                {expanded === sem.id ? 'Hide modules' : 'View modules'}
              </Button>
              <Collapse in={expanded === sem.id}>
                <Box sx={{ mt: 2, pt: 1.5, borderTop: 1, borderColor: 'divider', display: 'flex', flexDirection: 'column', gap: 1 }}>
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
                      <Typography variant="body2" color="text.secondary" sx={{ flex: 1, minWidth: 0, fontSize: '0.84rem' }}>
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
                          fontWeight: 700,
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
            sx={(theme) => ({
              p: 2.75,
              height: '100%',
              background:
                theme.palette.mode === 'dark'
                  ? 'linear-gradient(145deg, #2563eb 0%, #4f46e5 100%)'
                  : 'linear-gradient(145deg, #0f172a 0%, #1e3a8a 100%)',
              color: '#ffffff',
              boxShadow: '0 10px 28px rgba(15, 23, 42, 0.16)',
            })}
          >
            <Typography variant="subtitle2" sx={{ color: 'rgba(255, 255, 255, 0.82)', fontWeight: 600 }}>
              Current GPA
            </Typography>
            <Typography variant="h3" component="p" sx={{ my: 0.75, fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>
              {currentGpa}
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.78)', display: 'block' }}>
              Official figure shown on NYP result statement
            </Typography>
            <GpaTrendSparkline />
          </Paper>
        </Grid>
      </Grid>

      <Paper
        variant="outlined"
        sx={{
          p: { xs: 2.5, md: 3.5 },
          bgcolor: 'background.paper',
          boxShadow: '0 2px 12px rgba(15, 23, 42, 0.03)',
        }}
      >
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
          <EmojiEventsIcon color="secondary" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Recent academic highlights</Typography>
        </Box>
        <Grid container spacing={2}>
          {recentHighlights.map((h) => (
            <Grid item xs={12} sm={4} key={h.module}>
              <Box
                sx={{
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 2.5,
                  p: 2,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  bgcolor: 'background.default',
                  transition: 'border-color 0.2s ease, transform 0.2s ease',
                  '&:hover': { borderColor: 'text.secondary', transform: 'translateY(-2px)' },
                }}
              >
                <Chip label={`Grade: ${h.grade}`} size="small" color="primary" sx={{ mb: 1.25, alignSelf: 'flex-start', fontWeight: 700 }} />
                <Typography variant="subtitle2" sx={{ mb: 0.75, fontWeight: 700 }}>{h.module}</Typography>
                {h.href ? (
                  <Link component={RouterLink} to={h.href} variant="body2" sx={{ mt: 'auto', fontWeight: 600, color: 'secondary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
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
            p: 2.25,
            borderRadius: 2.5,
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <LightbulbOutlinedIcon color="secondary" sx={{ fontSize: 24 }} />
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
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
