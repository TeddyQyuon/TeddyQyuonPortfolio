import { Typography, Box } from '@mui/material';

// Consistent heading + supporting line for each homepage section.
// Pill eyebrow + gradient underline = modern but professional.
export default function SectionHeading({ title, subtitle, eyebrow }) {
  return (
    <Box sx={{ mb: { xs: 3.5, md: 5 }, maxWidth: 720 }}>
      {eyebrow && (
        <Box
          component="span"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            mb: 1.5,
            px: 1.5,
            py: 0.5,
            borderRadius: 999,
            bgcolor: 'primary.light',
            color: 'primary.dark',
            fontSize: '0.72rem',
            fontWeight: 800,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          <Box
            aria-hidden="true"
            sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'primary.main' }}
          />
          {eyebrow}
        </Box>
      )}
      <Typography variant="h4" component="h2" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Box
        aria-hidden="true"
        sx={(theme) => ({
          width: 56,
          height: 4,
          borderRadius: 2,
          background: theme.custom.gradients.brand,
          mb: subtitle ? 1.5 : 0,
        })}
      />
      {subtitle && (
        <Typography variant="body1" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}