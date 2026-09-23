import { Typography, Container, Box, Grid, Paper, Stack } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import GroupsIcon from '@mui/icons-material/Groups';
import SectionHeading from '../components/common/SectionHeading';
import profilePhoto from '../assets/images/profile/profile.jpg';
import { personalInfo } from '../data/personalInfo';

const highlights = [
  {
    icon: <CodeIcon color="primary" />,
    title: 'Full-Stack academic projects',
    text: 'React frontend, Express REST APIs and MySQL with Sequelize — connecting UI, API and database.',
  },
  {
    icon: <AnalyticsIcon color="primary" />,
    title: 'Data preparation & modelling',
    text: 'Data wrangling with KNIME and predictive modelling with SAS Viya, plus Python data tools.',
  },
  {
    icon: <GroupsIcon color="primary" />,
    title: 'Team & internship ready',
    text: 'Experience working in a team codebase with workflows, audit history and review processes.',
  },
];

// Concise student-appropriate background. No employment claims.
export default function AboutSection() {
  return (
    <Container maxWidth="lg" className="portfolio-section about-section" sx={{ py: { xs: 6, md: 8 } }} id="about" component="section">
      <SectionHeading
        eyebrow="About"
        title="About Me"
        subtitle="Student background, hands-on areas and internship goal"
      />
      <Grid container spacing={{ xs: 2.5, md: 3 }} className="about-layout">
        <Grid item xs={12} md={7}>
          <Paper className="about-copy" variant="outlined">
            <Typography paragraph>
              I am a Year 2 student in the Diploma in Applied AI &amp; Analytics at
              Nanyang Polytechnic. I enjoy building practical software systems and
              learning how complete web applications work — from the user interface
              down to the database.
            </Typography>
            <Typography paragraph>
              Through coursework I have learned Full-Stack Development with React,
              Node.js and Express, REST APIs, and MySQL with Sequelize, including
              authentication with JWT and input validation with Formik and Yup. I
              have applied this in academic team projects with approval workflows,
              audit history and notifications.
            </Typography>
            <Typography paragraph sx={{ mb: 0 }}>
              I am applying for a 1-year technology internship in 2027 in Software
              Engineering, Full-Stack Development or related technical roles.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box className="about-sidebar">
            <Paper className="about-photo-frame" variant="outlined">
              <Box
                component="img"
                src={profilePhoto}
                alt={`Portrait of ${personalInfo.name}`}
                loading="lazy"
                decoding="async"
              />
            </Paper>
            <Stack spacing={1.5} className="about-highlight-list">
              {highlights.map((item) => (
                <Paper className="about-highlight" variant="outlined" key={item.title}>
                  <Box className="about-highlight-icon" aria-hidden="true">{item.icon}</Box>
                  <Box>
                    <Typography variant="subtitle2">{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{item.text}</Typography>
                  </Box>
                </Paper>
              ))}
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
