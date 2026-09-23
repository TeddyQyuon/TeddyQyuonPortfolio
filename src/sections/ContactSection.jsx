import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import SectionHeading from '../components/common/SectionHeading';
import { personalInfo } from '../data/personalInfo';

async function copyText(value) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const input = document.createElement('textarea');
  input.value = value;
  input.setAttribute('readonly', '');
  input.style.position = 'fixed';
  input.style.top = '-1000px';
  document.body.appendChild(input);
  input.select();
  const copied = document.execCommand('copy');
  document.body.removeChild(input);
  if (!copied) throw new Error('Clipboard copy was unsuccessful');
}

export default function ContactSection() {
  const [copyState, setCopyState] = useState(null);
  const contactMethods = [
    { label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { label: 'GitHub', value: personalInfo.githubUrl, href: personalInfo.githubUrl },
    { label: 'LinkedIn', value: personalInfo.linkedinUrl, href: personalInfo.linkedinUrl },
    { label: 'WhatsApp', value: personalInfo.whatsappUrl, href: personalInfo.whatsappUrl },
  ];

  const handleCopy = async () => {
    try {
      await copyText(personalInfo.email);
      setCopyState('success');
    } catch {
      setCopyState('error');
    }
  };

  return (
    <Box className="contact-band">
      <Container maxWidth="lg" className="portfolio-section contact-section" id="contact" component="section">
        <SectionHeading
          eyebrow="Get in touch"
          title="Contact"
          subtitle="Looking for a 1-year technology internship — the fastest way to reach me is by email"
        />
        <Paper className="contact-card" variant="outlined">
          <Grid container columnSpacing={{ md: 5 }} rowSpacing={5}>
            <Grid item xs={12} md={7} className="contact-main">
              <Typography className="contact-card-eyebrow" component="p">Let’s connect</Typography>
              <Typography className="contact-intro" component="p">
                If you have an internship opportunity in Software Engineering,
                Full-Stack Development, Data/Analytics or a related technical role —
                or would like to see more of my work — get in touch.
              </Typography>
              <Typography className="contact-email" component="p">
                {personalInfo.email}
              </Typography>
              <Stack className="contact-actions" direction="row" spacing={2} useFlexGap>
                <Button component="a" href={`mailto:${personalInfo.email}`} variant="contained">
                  Email Me
                </Button>
                <Button onClick={handleCopy} variant="outlined">
                  Copy email address
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={5} className="contact-methods">
              {contactMethods.map((method) => (
                <Box key={method.label} className="contact-method">
                  <Typography component="h3">{method.label}</Typography>
                  <Box
                    component="a"
                    href={method.href}
                    target={method.label === 'Email' ? undefined : '_blank'}
                    rel={method.label === 'Email' ? undefined : 'noopener noreferrer'}
                  >
                    {method.value}
                  </Box>
                </Box>
              ))}
            </Grid>
          </Grid>
        </Paper>
        <Snackbar
          open={copyState !== null}
          autoHideDuration={3000}
          onClose={() => setCopyState(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity={copyState === 'success' ? 'success' : 'warning'} variant="filled" onClose={() => setCopyState(null)}>
            {copyState === 'success' ? 'Email address copied' : 'Could not copy automatically — the address is shown above.'}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
