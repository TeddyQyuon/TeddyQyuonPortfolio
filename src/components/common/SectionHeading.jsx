import { Typography, Box } from '@mui/material';

// Shared, compact heading hierarchy for all portfolio sections.
export default function SectionHeading({ title, subtitle, eyebrow }) {
  return (
    <Box className="section-heading" sx={{ mb: { xs: 3.5, md: 5 }, maxWidth: 760 }}>
      {eyebrow && (
        <Box
          className="section-eyebrow"
          component="span"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            mb: 1,
            color: 'primary.main',
            fontSize: '0.72rem',
            fontWeight: 800,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          {eyebrow}
        </Box>
      )}
      <Typography className="section-title" variant="h4" component="h2" sx={{ mb: 0.75 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography className="section-subtitle" variant="body1" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
