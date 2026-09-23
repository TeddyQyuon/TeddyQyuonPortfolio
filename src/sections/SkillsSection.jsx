import { Typography, Container, Stack, Paper, Grid, Box } from '@mui/material';
import WebIcon from '@mui/icons-material/Web';
import DnsIcon from '@mui/icons-material/Dns';
import StorageIcon from '@mui/icons-material/Storage';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import LockIcon from '@mui/icons-material/Lock';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import BuildIcon from '@mui/icons-material/Build';
import ForkRightIcon from '@mui/icons-material/ForkRight';
import SectionHeading from '../components/common/SectionHeading';
import SkillChip from '../components/common/SkillChip';
import { skillCategories } from '../data/skills';

const categoryIcons = {
  Frontend: <WebIcon color="primary" fontSize="small" />,
  Backend: <DnsIcon color="primary" fontSize="small" />,
  Database: <StorageIcon color="primary" fontSize="small" />,
  'API / Integration': <SyncAltIcon color="primary" fontSize="small" />,
  Authentication: <LockIcon color="primary" fontSize="small" />,
  'Forms / Validation': <FactCheckIcon color="primary" fontSize="small" />,
  'Data / Analytics': <AnalyticsIcon color="primary" fontSize="small" />,
  'Development Tools': <BuildIcon color="primary" fontSize="small" />,
  'Version Control': <ForkRightIcon color="primary" fontSize="small" />,
};

// Verified skills only, grouped by category. No percentage bars.
export default function SkillsSection() {
  return (
    <Box sx={{ bgcolor: 'background.paper', borderTop: 1, borderBottom: 1, borderColor: 'divider' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }} id="skills" component="section">
        <SectionHeading
          eyebrow="Skills"
          title="Skills"
          subtitle="Technologies I have studied and used in coursework and projects — grouped by area, no inflated percentages"
        />
        <Grid container spacing={2}>
          {skillCategories.map((category) => (
            <Grid item xs={12} sm={6} md={4} key={category.title}>
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
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  {categoryIcons[category.title]}
                  <Typography variant="subtitle1">{category.title}</Typography>
                </Box>
                <Stack direction="row" spacing={0.5} useFlexGap sx={{ flexWrap: 'wrap', rowGap: 0.75 }}>
                  {category.skills.map((skill) => (
                    <SkillChip key={skill} label={skill} />
                  ))}
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
