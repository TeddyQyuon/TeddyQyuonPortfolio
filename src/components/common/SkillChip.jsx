import TechnologyChip from './TechnologyChip';

// Reusable skill chip. Renders nothing if there is no label.
export default function SkillChip({ label }) {
  if (!label) return null;
  return (
    <TechnologyChip
      label={label}
      size="small"
      className="skill-chip"
      sx={(theme) => ({
        bgcolor: theme.custom.chip.bg,
        borderColor: theme.custom.chip.border,
        color: theme.palette.primary.dark,
        fontWeight: 600,
        borderRadius: 999,
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        '&:hover': {
          bgcolor: theme.palette.primary.light,
          borderColor: theme.palette.primary.main,
          transform: 'translateY(-1px)',
          boxShadow: `0 2px 8px ${theme.palette.primary.main}33`,
        },
      })}
      variant="outlined"
    />
  );
}
