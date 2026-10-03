import { Typography, Container, Box } from '@mui/material';
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
import TechnologyLogo, { hasTechnologyLogo } from '../components/common/TechnologyLogo';
import { skillCategories } from '../data/skills';

const categoryIcons = { Frontend: WebIcon, Backend: DnsIcon, Database: StorageIcon, 'API / Integration': SyncAltIcon, Authentication: LockIcon, 'Forms / Validation': FactCheckIcon, 'Data / Analytics': AnalyticsIcon, 'Development Tools': BuildIcon, 'Version Control': ForkRightIcon };
const coreTools = ['JavaScript', 'React', 'Node.js', 'MySQL', 'Python', 'Git'];

export default function SkillsSection() {
  return (
    <Box sx={{ bgcolor: 'background.paper', borderTop: 1, borderBottom: 1, borderColor: 'divider' }}>
      <Container maxWidth="lg" className="section-shell" id="skills" component="section">
        <SectionHeading eyebrow="Toolkit" title="The tools behind the work." subtitle="Technologies I use in personal projects and coursework." />
        <div className="core-tools" aria-label="Core technologies">{coreTools.map((tool) => <span key={tool} className="core-tool"><TechnologyLogo name={tool} size={26} />{tool}</span>)}</div>
        <div className="skills-grid">
          {skillCategories.map((category) => {
            const Icon = categoryIcons[category.title] || BuildIcon;
            return (
              <div className="skill-category" key={category.title}>
                <Typography component="h3" variant="subtitle1" className="skill-heading"><Icon aria-hidden="true" />{category.title}</Typography>
                <div className="skill-terms">{category.skills.map((skill) => <span className="skill-term" key={skill}>{hasTechnologyLogo(skill) && <TechnologyLogo name={skill} size={16} />}<span>{skill}</span></span>)}</div>
              </div>
            );
          })}
        </div>
      </Container>
    </Box>
  );
}
