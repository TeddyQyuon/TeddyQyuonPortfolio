import { Typography, Container, Paper, Box, Chip, Stack, Grid } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SectionHeading from '../components/common/SectionHeading';
import { educationJourney } from '../data/education';

// Chronological education journey: Matriculation → MTU → NYP.
// MTU programme wording is user-provided, interruption wording is factual/neutral.
export default function EducationSection() {
  return (
    <Box sx={{ bgcolor: 'background.paper', borderTop: 1, borderBottom: 1, borderColor: 'divider' }}>
      <Container maxWidth="lg" className="section-shell" id="education" component="section">
        <SectionHeading
          index="04"
          eyebrow="Education"
          title="My education journey."
          subtitle="From Myanmar to Singapore — continuing my path in technology."
        />
        <Stack spacing={3}>
          {educationJourney.map((stage, index) => (
            <Box key={stage.id} sx={{ display: 'flex', gap: { xs: 1.5, sm: 2.5 } }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flexShrink: 0,
                }}
              >
                <Box
                  sx={{
                    width: { xs: 36, sm: 42 },
                    height: { xs: 36, sm: 42 },
                    borderRadius: 2.5,
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.9375rem',
                    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.12)',
                  }}
                >
                  {index + 1}
                </Box>
                {index < educationJourney.length - 1 && (
                  <Box sx={{ width: 2, flexGrow: 1, bgcolor: 'divider', my: 1, minHeight: 24 }} />
                )}
              </Box>

              <Paper
                variant="outlined"
                sx={{
                  p: { xs: 2.25, sm: 3, md: 3.5 },
                  flexGrow: 1,
                  minWidth: 0,
                  bgcolor: 'background.default',
                  '&:hover': { borderColor: 'text.secondary' },
                }}
              >
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="space-between"
                  alignItems={{ xs: 'flex-start', sm: 'center' }}
                  spacing={1}
                  sx={{ mb: 1 }}
                >
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>
                    {stage.institution}
                  </Typography>
                  <Chip
                    label={stage.period}
                    size="small"
                    color="primary"
                    sx={{ fontWeight: 600, borderRadius: 999 }}
                  />
                </Stack>
                <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontWeight: 500 }}>
                  {stage.location}
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 1, mb: 0.5, fontWeight: 650, color: 'text.primary' }}>
                  {stage.qualification}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: stage.marks || stage.coursework ? 2 : 0 }}>
                  {stage.summary}
                </Typography>

                {stage.marks && (
                  <Box sx={{ mt: 2 }}>
                    <Grid container spacing={1.5}>
                      {stage.marks.map((m) => (
                        <Grid item xs={12} sm={6} md={4} key={m.subject}>
                          <Box
                            sx={(theme) => ({
                              border: 1,
                              borderColor: 'divider',
                              borderRadius: 2.5,
                              p: 1.5,
                              bgcolor: theme.palette.background.paper,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: 1.5,
                            })}
                          >
                            <Box>
                              <Typography variant="subtitle2" sx={{ fontWeight: 650 }}>{m.subject}</Typography>
                              <Chip
                                label={m.result}
                                size="small"
                                color={m.result === 'Distinction' ? 'primary' : 'default'}
                                variant={m.result === 'Distinction' ? 'filled' : 'outlined'}
                                sx={{ mt: 0.5, height: 22, fontSize: '0.72rem', fontWeight: 600 }}
                              />
                            </Box>
                            <Typography variant="h5" component="span" sx={{ fontWeight: 750, fontVariantNumeric: 'tabular-nums' }}>
                              {m.mark}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}

                {stage.coursework && (
                  <Box sx={{ mt: 1.5, pt: 1.5, borderTop: 1, borderColor: 'divider' }}>
                    <Grid container spacing={1.25}>
                      {stage.coursework.map((item) => (
                        <Grid item xs={12} md={6} key={item}>
                          <Box sx={{ display: 'flex', gap: 1.25, alignItems: 'flex-start' }}>
                            <CheckCircleIcon color="secondary" fontSize="small" sx={{ mt: 0.3, flexShrink: 0 }} />
                            <Typography variant="body2" color="text.secondary">
                              {item}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
              </Paper>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
