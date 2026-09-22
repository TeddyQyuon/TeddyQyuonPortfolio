import { Button } from '@mui/material';

// External link that opens safely in a new tab.
// Renders nothing when the URL is missing (defensive rendering).
export default function ExternalLinkButton({ href, children, startIcon }) {
  if (!href) return null;
  return (
    <Button
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      variant="outlined"
      startIcon={startIcon}
    >
      {children}
    </Button>
  );
}