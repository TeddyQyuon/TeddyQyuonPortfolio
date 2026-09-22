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
    <Box sx={{ bgcolor: 'background.paper', borderTop: 1, borderColor: 'divider' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }} id="contact" component="section">
        <SectionHeading
          eyebrow="Contact"
          title="Contact"
          subtitle="Looking for a 1-year technology internship — the fastest way to reach me is by email"
        />
        <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 4 }, maxWidth: 780 }}>
          <Typography paragraph color="text.secondary" sx={{ maxWidth: 640 }}>
            If you have an internship opportunity in Software Engineering,
            Full-Stack Development, Data/Analytics or a related technical role —
            or would like to see more of my work — get in touch.
          </Typography>
          <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 600, wordBreak: 'break-all' }}>
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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <Button
                component="a"
                href={`mailto:${personalInfo.email}`}
                variant="contained"
                startIcon={<EmailIcon />}
                fullWidth
              >
                Email Me
              </Button>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                component="a"
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                startIcon={<GitHubIcon />}
                fullWidth
              >
                GitHub
              </Button>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                component="a"
                href={personalInfo.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                startIcon={<LinkedInIcon />}
                fullWidth
              >
                LinkedIn
              </Button>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                component="a"
                href={personalInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                startIcon={<WhatsAppIcon />}
                fullWidth
              >
                WhatsApp
              </Button>
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
