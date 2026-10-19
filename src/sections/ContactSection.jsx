import { useState } from 'react';
import {
  Typography,
  Container,
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
  // execCommand reports whether the copy actually happened. Ignoring that
  // result would show a "copied" confirmation for a copy that silently failed,
  // so a rejected fallback is surfaced as a failure instead.
  const copied = document.execCommand('copy');
  document.body.removeChild(area);
  if (!copied) throw new Error('Clipboard fallback could not copy the text');
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
      <Container maxWidth="lg" className="section-shell" id="contact" component="section">
        <SectionHeading
          index="07"
          eyebrow="Contact"
          title="Let's build something useful."
          subtitle="Open to 1-year technology internships in 2027."
        />
        <Box className="contact-surface">
          <Typography paragraph color="text.secondary" sx={{ maxWidth: 680, mb: 2.5 }}>
            If you have an internship opportunity in Software Engineering,
            Full-Stack Development, Data/Analytics or a related technical role —
            or would like to see more of my work — get in touch.
          </Typography>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 2,
              py: 0.75,
              mb: 3,
              maxWidth: '100%',
              borderRadius: 2.5,
              bgcolor: 'background.paper',
              border: 1,
              borderColor: 'divider',
            }}
          >
            <EmailIcon fontSize="small" sx={{ color: 'primary.main', flexShrink: 0 }} />
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
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                component="a"
                href={`mailto:${personalInfo.email}?subject=${encodeURIComponent(`Internship opportunity — ${personalInfo.name}`)}`}
                variant="contained"
                startIcon={<EmailIcon />}
                fullWidth
              >
                Email Me
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
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
            <Grid item xs={12} sm={6} md={3}>
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
            <Grid item xs={12} sm={6} md={3}>
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
        </Box>
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
