import { Typography, Container, Box } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import GroupsIcon from '@mui/icons-material/Groups';
import SectionHeading from '../components/common/SectionHeading';

const highlights = [
  { icon: CodeIcon, title: 'Full-stack development', text: 'React interfaces, Python and Node.js APIs, SQL databases and payment integrations.' },
  { icon: AnalyticsIcon, title: 'Data preparation & modelling', text: 'KNIME workflows, SAS Viya model comparison and Python data tools.' },
  { icon: GroupsIcon, title: 'Working with a team', text: 'Shared codebases, approval workflows, audit history and integration.' },
];

export default function AboutSection() {
  return (
    <Box sx={{ bgcolor: 'background.paper', borderTop: 1, borderColor: 'divider' }}>
      <Container maxWidth="lg" className="section-shell" id="about" component="section">
        <div className="about-grid">
          <SectionHeading eyebrow="About me" title="Curious about how things work." />
          <div>
            <Typography paragraph color="text.secondary">I am a Year 2 student in the Diploma in Applied AI &amp; Analytics at Nanyang Polytechnic. I enjoy building practical software systems and understanding the whole application, from the user interface to the database.</Typography>
            <Typography paragraph color="text.secondary">My coursework covers React, Node.js, Express, REST APIs, MySQL and Sequelize, including JWT authentication and Formik/Yup validation. I have applied these skills in team projects with approvals, audit trails and notifications, and in independent projects such as Playlist Port and MeterWise.</Typography>
            <Typography paragraph color="text.secondary">My personal projects also use FastAPI and Django, PostgreSQL, Stripe-hosted checkout and recommendation pipelines. I develop with AI assistance and check the resulting behaviour through tests, code review and deployed workflows.</Typography>
            <Typography color="text.secondary">I am seeking a 1-year technology internship in 2027 in Software Engineering, Full-Stack Development, Data / Analytics or a related technical role.</Typography>
          </div>
        </div>
        <div className="about-highlights">{highlights.map(({ icon: Icon, title, text }) => <div className="about-highlight" key={title}><Icon aria-hidden="true" /><div><Typography variant="subtitle1" component="h3" gutterBottom>{title}</Typography><Typography variant="body2" color="text.secondary">{text}</Typography></div></div>)}</div>
      </Container>
    </Box>
  );
}
