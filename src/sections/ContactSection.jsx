import { useState } from 'react';
import {
  Typography,
  Container,
  Paper,
  Button,
  Grid,
  Box,
  Stack,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import SectionHeading from '../components/common/SectionHeading';
import { personalInfo } from '../data/personalInfo';

// Copies text to the clipboard, falling back to a temporary textarea when the
// async Clipboard API is unavailable (older browsers or denied permission).
async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const area = document.createElement('textarea');
  area.value = text;
  area.setAttribute('readonly', '');
  area.style.position = 'fixed';
  area.style.top = '-1000px';
  area.style.opacity = '0';
  document.body.appendChild(area);
  area.select();
  document.execCommand('copy');
  document.body.removeChild(area);
}

// No backend, no form — simple reliable contact links plus one-tap copy.
export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  const handleCopy = async () => {
    try {
      await copyText(personalInfo.email);
      setCopied(true);
    } catch {
      setCopyFailed(true);
    }
  };

  return (
    <Box className="contact-band" sx={{ bgcolor: 'background.paper', borderTop: 1, borderColor: 'divider' }}>
      <Container maxWidth="lg" className="portfolio-section contact-section" sx={{ py: { xs: 6, md: 8 } }} id="contact" component="section">
        <SectionHeading
          eyebrow="Contact"
          title="Contact"
          subtitle="Looking for a 1-year technology internship — the fastest way to reach me is by email"
        />
        <Paper className="contact-card" variant="outlined">
          <Grid container spacing={{ xs: 3, md: 5 }}>
            <Grid item xs={12} md={7}>
              <Typography className="contact-card-eyebrow" variant="overline">Let’s connect</Typography>
              <Typography paragraph color="text.secondary" sx={{ maxWidth: 640, mt: 1 }}>
                If you have an internship opportunity in Software Engineering,
                Full-Stack Development, Data/Analytics or a related technical role —
                or would like to see more of my work — get in touch.
              </Typography>
              <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mb: 2 }}>
                <Typography className="contact-email" variant="h6" sx={{ fontWeight: 700, overflowWrap: 'anywhere' }}>
                  {personalInfo.email}
                </Typography>
                <Tooltip title={copied ? 'Copied' : 'Copy email address'}>
                  <IconButton
                    onClick={handleCopy}
                    size="small"
                    color={copied ? 'success' : 'primary'}
                    aria-label="Copy email address to clipboard"
                  >
                    {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
                  </IconButton>
                </Tooltip>
              </Stack>
              <Button
                component="a"
                href={`mailto:${personalInfo.email}`}
                variant="contained"
                startIcon={<EmailIcon />}
              >
                Email Me
              </Button>
            </Grid>
            <Grid item xs={12} md={5}>
              <Stack className="contact-links" spacing={1.5}>
                <Button
                  component="a"
                  href={personalInfo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  startIcon={<GitHubIcon />}
                  fullWidth
                  className="contact-link"
                >
                  GitHub
                </Button>
                <Button
                  component="a"
                  href={personalInfo.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  startIcon={<LinkedInIcon />}
                  fullWidth
                  className="contact-link"
                >
                  LinkedIn
                </Button>
                <Button
                  component="a"
                  href={personalInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  startIcon={<WhatsAppIcon />}
                  fullWidth
                  className="contact-link"
                >
                  WhatsApp
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
        <Snackbar
          open={copied}
          autoHideDuration={2500}
          onClose={() => setCopied(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity="success" variant="filled" onClose={() => setCopied(false)}>
            Email address copied
          </Alert>
        </Snackbar>
        <Snackbar
          open={copyFailed}
          autoHideDuration={4000}
          onClose={() => setCopyFailed(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity="warning" variant="filled" onClose={() => setCopyFailed(false)}>
            Could not copy automatically — the address is shown above.
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
