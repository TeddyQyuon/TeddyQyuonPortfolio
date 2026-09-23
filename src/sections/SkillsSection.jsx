import { Typography, Container, Paper, Box } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import SectionHeading from '../components/common/SectionHeading';
import TechnologyLogo, { hasTechnologyLogo } from '../components/common/TechnologyLogo';
import { skillCategories } from '../data/skills';
import './mockupContent.css';

export default function SkillsSection() {
  return (
    <Box className="skills-band">
      <Container maxWidth="lg" className="portfolio-section mockup-content-section skills-section" id="skills" component="section">
        <SectionHeading
          eyebrow="Skills"
          title="Tools & Technologies"
          subtitle="Technologies I have studied and used in coursework and projects — grouped by area, no inflated percentages"
        />
        <Box className="skills-grid">
          {skillCategories.map((category) => (
            <Paper variant="outlined" className="skill-category" key={category.title}>
              <Typography variant="h3" className="skill-category-title">{category.title}</Typography>
              <Box component="ul" className="skill-list">
                {category.skills.map((skill) => {
                  const logoName = skill === 'React Router' ? 'React' : skill;
                  return (
                    <Box component="li" className="skill-list-item" key={skill}>
                      {hasTechnologyLogo(logoName) ? (
                        <TechnologyLogo name={logoName} size={24} />
                      ) : (
                        <CircleIcon className="skill-list-dot" aria-hidden="true" />
                      )}
                      <Typography component="span">{skill}</Typography>
                    </Box>
                  );
                })}
              </Box>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
