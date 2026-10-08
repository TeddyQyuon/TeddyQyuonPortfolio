import { Typography, Container, Button, Box } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { personalInfo } from '../data/personalInfo';
import useSectionLink from '../hooks/useSectionLink';
import profilePhoto from '../assets/images/profile/profile.jpg';
import TechnologyLogo from '../components/common/TechnologyLogo';

export default function HeroSection() {
  const handleSectionLink = useSectionLink();
  return (
    <Box component="section" className="hero" aria-label="Introduction">
      <Container maxWidth="lg">
        <div className="hero-content">
          <div>
            <p className="hero-kicker">Software &amp; data · Singapore</p>
            <div className="availability"><span aria-hidden="true" />Open to a 1-year technology internship · 2027</div>
            <Typography component="h1" variant="h1" className="hero-name"><span>Wai Yan</span>{' '}<span>Hpone Lat</span></Typography>
            <Typography className="hero-lead">Full-stack development. Applied AI &amp; analytics.</Typography>
            <Typography className="hero-intro">{personalInfo.intro}</Typography>
            <div className="hero-actions">
              <Button href="#projects" onClick={(event) => handleSectionLink(event, 'projects')} variant="contained">Explore my work</Button>
              <Button href={personalInfo.resumePath} target="_blank" rel="noopener noreferrer" variant="outlined">View résumé</Button>
            </div>
            <div className="hero-socials">
              <a className="quiet-link" href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer"><GitHubIcon sx={{ fontSize: 17 }} />GitHub</a>
              <a className="quiet-link" href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer"><LinkedInIcon sx={{ fontSize: 17 }} />LinkedIn</a>
              <a className="quiet-link" href="#contact" onClick={(event) => handleSectionLink(event, 'contact')}><EmailOutlinedIcon sx={{ fontSize: 18 }} />Contact</a>
            </div>
            <div className="hero-toolkit" aria-label="Featured technologies">{['React', 'Python', 'Node.js', 'PostgreSQL'].map((name) => <span key={name}><TechnologyLogo name={name} size={20} />{name}</span>)}</div>
          </div>
          <figure className="hero-photo">
            <img src={profilePhoto} alt="Portrait of Wai Yan Hpone Lat" width="270" height="318" fetchPriority="high" />
            <figcaption><strong>Wai Yan Hpone Lat · Teddy</strong>Applied AI &amp; Analytics student</figcaption>
          </figure>
        </div>
        <div className="hero-facts">
          <div className="hero-fact"><span className="hero-fact-label">Focus</span><p className="hero-fact-value">Web applications &amp; data analytics</p></div>
          <div className="hero-fact"><span className="hero-fact-label">Education</span><p className="hero-fact-value">Nanyang Polytechnic · Year 2<br />Diploma in Applied AI &amp; Analytics</p></div>
          <div className="hero-fact"><span className="hero-fact-label">Next step</span><p className="hero-fact-value">{personalInfo.internshipWindow}<br />{personalInfo.internshipDuration} · Expected graduation May 2028</p></div>
        </div>
      </Container>
    </Box>
  );
}
