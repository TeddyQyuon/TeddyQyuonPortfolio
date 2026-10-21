import { Container, Typography, Button, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import usePageMetadata from '../hooks/usePageMetadata';
import { OG_IMAGE_ALT, OG_IMAGE_URL, SITE_NAME } from '../utils/seo';

export default function NotFoundPage() {
  usePageMetadata({
    title: `Page Not Found | ${SITE_NAME}`,
    description: 'The page you are looking for does not exist or has moved. Browse the portfolio homepage or project case studies instead.',
    path: '/404',
    image: OG_IMAGE_URL,
    imageAlt: OG_IMAGE_ALT,
    noindex: true,
  });

  return (
    <Container maxWidth="md" sx={{ py: 12, textAlign: 'center' }}>
      <Typography
        variant="overline"
        sx={{ display: 'block', color: 'secondary.main', fontWeight: 700, letterSpacing: '0.14em' }}
      >
        Error 404
      </Typography>
      <Typography variant="h2" component="h1" gutterBottom sx={{ mt: 1 }}>
        This page took a wrong turn.
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: 460, mx: 'auto' }}>
        The page you are looking for does not exist or has moved. Everything you
        came for is still one click away.
      </Typography>
      <Stack
        direction="row"
        spacing={1.5}
        justifyContent="center"
        sx={{ flexWrap: 'wrap', rowGap: 1.5 }}
      >
        <Button component={RouterLink} to="/" variant="contained">
          Back to Home
        </Button>
        <Button
          component={RouterLink}
          to="/#projects"
          variant="outlined"
          endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
        >
          Browse projects
        </Button>
      </Stack>
    </Container>
  );
}