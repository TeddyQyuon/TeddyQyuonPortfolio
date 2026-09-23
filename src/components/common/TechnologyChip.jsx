import { Chip } from '@mui/material';
import TechnologyLogo, { hasTechnologyLogo } from './TechnologyLogo';

export default function TechnologyChip({ label, size = 'small', ...props }) {
  return (
    <Chip
      label={label}
      size={size}
      icon={hasTechnologyLogo(label) ? <TechnologyLogo name={label} size={16} /> : undefined}
      {...props}
    />
  );
}
