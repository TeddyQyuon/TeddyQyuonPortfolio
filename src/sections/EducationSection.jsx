import { Typography, Container, Paper, Box, Chip, Stack, Grid } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SectionHeading from '../components/common/SectionHeading';
import { educationJourney } from '../data/education';

// Chronological education journey: Matriculation → MTU → NYP.
// MTU programme wording is user-provided, interruption wording is factual/neutral.
export default function EducationSection() {
  return (
    <Box sx={{ bgcolor: 'background.paper', borderTop: 1, borderBottom: 1, borderColor: 'divider' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }} id="education" component="section">
        <SectionHeading
          eyebrow="Education"
          title="Education Journey"
          subtitle="Chronological academic background — from Myanmar to Singapore"
        />
        <Stack spacing={2.5} sx={{ maxWidth: 820 }}>
          {educationJourney.map((stage, index) => (
            <Box key={stage.id} sx={{ display: 'flex', gap: 2 }}>
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
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                  }}
                >
                  {index + 1}
                </Box>
                {index < educationJourney.length - 1 && (
                  <Box sx={{ width: 2, flexGrow: 1, bgcolor: 'divider', my: 1, minHeight: 24 }} />
                )}
              </Box>

              <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 3 }, flexGrow: 1 }}>
                <Chip label={stage.period} size="small" color="primary" sx={{ mb: 1 }} />
                <Typography variant="h6" component="h3">
                  {stage.institution}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {stage.location}
                </Typography>
                <Typography variant="subtitle2" sx={{ mt: 1 }}>
                  {stage.qualification}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {stage.summary}
                </Typography>

                {stage.marks && (
                  <Box sx={{ mt: 2 }}>
                    <Grid container spacing={1}>
                      {stage.marks.map((m) => (
                        <Grid item xs={6} sm={4} key={m.subject}>
                          <Box
                            sx={(theme) => ({
                              border: 1,
                              borderColor: 'divider',
                              borderRadius: 2,
                              p: 1.25,
                              bgcolor: theme.custom.surfaces.tile,
                            })}
                          >
                            <Typography variant="subtitle2">{m.subject}</Typography>
                            <Typography variant="h6">{m.mark}</Typography>
                            <Chip
                              label={m.result}
                              size="small"
                              color={m.result === 'Distinction' ? 'primary' : 'default'}
                              variant={m.result === 'Distinction' ? 'filled' : 'outlined'}
                            />
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}

                {stage.coursework && (
                  <Box sx={{ mt: 1 }}>
                    {stage.coursework.map((item) => (
                      <Box key={item} sx={{ display: 'flex', gap: 1.25, alignItems: 'flex-start', mt: 1 }}>
                        <CheckCircleIcon color="primary" fontSize="small" sx={{ mt: 0.3 }} />
                        <Typography variant="body2" color="text.secondary">
                          {item}
                        </Typography>
                      </Box>
                    ))}
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
