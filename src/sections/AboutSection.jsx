import { Typography, Container, Box, Grid, Paper } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import GroupsIcon from '@mui/icons-material/Groups';
import SectionHeading from '../components/common/SectionHeading';

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
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }} id="about" component="section">
      <SectionHeading
        eyebrow="About"
        title="About Me"
        subtitle="Student background, hands-on areas and internship goal"
      />
      <Box sx={{ maxWidth: 760, mb: 4 }}>
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
      </Box>

      <Grid container spacing={2}>
        {highlights.map((item) => (
          <Grid item xs={12} sm={4} key={item.title}>
            <Paper
              variant="outlined"
              sx={{
                p: 2.5,
                height: '100%',
                borderRadius: 3,
                transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                '&:hover': { boxShadow: 4, transform: 'translateY(-3px)' },
              }}
            >
              <Box
                sx={{
                  mb: 1.5,
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #dbeafe, #cffafe)',
                }}
              >
                {item.icon}
              </Box>
              <Typography variant="subtitle1" gutterBottom>
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.text}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
