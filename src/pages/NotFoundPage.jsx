import { Container, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <Container maxWidth="md" className="portfolio-section not-found-page" sx={{ py: 10, textAlign: 'center' }}>
      <Typography variant="h2" component="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" color="text.secondary" paragraph>
        The page you are looking for does not exist.
      </Typography>
      <Button component={RouterLink} to="/" variant="contained">
        Back to Home
      </Button>
    </Container>
  );
}
