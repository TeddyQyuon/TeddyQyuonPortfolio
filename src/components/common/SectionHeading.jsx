import { Typography, Box } from '@mui/material';

export default function SectionHeading({ title, subtitle, eyebrow, index }) {
  return (
    <Box className="section-heading">
      {eyebrow && (
        <span className="section-eyebrow">
          {index && <span className="section-index" aria-hidden="true">{index}</span>}
          {eyebrow}
        </span>
      )}
      <Typography variant="h4" component="h2" className="section-title">{title}</Typography>
      {subtitle && <Typography className="section-description">{subtitle}</Typography>}
    </Box>
  );
}
