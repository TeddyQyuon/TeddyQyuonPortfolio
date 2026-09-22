import { Chip } from '@mui/material';

// Reusable skill chip. Renders nothing if there is no label.
export default function SkillChip({ label }) {
  if (!label) return null;
  return (
    <Chip
      label={label}
      size="small"
      sx={{
        bgcolor: '#eff6ff',
        borderColor: '#bfdbfe',
        color: '#1e3a8a',
        fontWeight: 600,
        borderRadius: 999,
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        '&:hover': {
          bgcolor: '#dbeafe',
          borderColor: 'primary.main',
          transform: 'translateY(-1px)',
          boxShadow: '0 2px 8px rgba(29, 78, 216, 0.2)',
        },
      }}
      variant="outlined"
    />
  );
}