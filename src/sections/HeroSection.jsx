import { Link } from 'react-router-dom';
import Icon from '../components/common/Icon';
import { Badge, KpiCard } from '../components/common/Dashboard';
import { personalInfo } from '../data/personalInfo';
import { currentGpa } from '../data/academicResults';
import { liveDemoCount, projectCount, publicRepoCount } from '../lib/projectStats';
import profilePhoto from '../assets/images/profile/profile.jpg';

export default function HeroSection() {
  const [start, end] = personalInfo.internshipWindow.split(' – ');
  const study = personalInfo.currentStudy.split(' — ')[0];

  return (
    <section className="hero section" aria-labelledby="hero-title" id="overview">
      <div className="hero-main">
        <p className="eyebrow"><span className="mono">01</span> Overview</p>
        <p className="status-pill">
          <span className="status-dot" aria-hidden="true" />
          Open to a 1-year internship · {start.replace(/^\d+ /, '')} start
        </p>
        <h1 id="hero-title">{personalInfo.name}</h1>
        <p className="hero-role">{personalInfo.role}</p>
        <p className="hero-intro">{personalInfo.intro}</p>
        <p className="muted">{personalInfo.internshipObjective}</p>

        <div className="hero-actions">
          <Link className="btn btn-primary" to={{ hash: '#projects' }}>
            View projects
            <Icon name="arrowRight" size={16} />
          </Link>
          <a className="btn" href={personalInfo.resumePath} target="_blank" rel="noopener">
            <Icon name="file" size={16} />
            Résumé (PDF)
          </a>
          <Link className="btn btn-ghost" to={{ hash: '#contact' }}>
            <Icon name="mail" size={16} />
            Contact
          </Link>
        </div>

        <ul className="hero-meta">
          <li><Icon name="pin" size={16} /> {personalInfo.location}</li>
          <li><Icon name="cap" size={16} /> {study}</li>
          <li><Icon name="calendar" size={16} /> {personalInfo.currentStudy.split(' — ')[1]}</li>
        </ul>
      </div>

      <aside className="hero-side" aria-label="At a glance">
        <div className="panel profile-panel">
          <img className="profile-photo" src={profilePhoto} alt={`Portrait of ${personalInfo.name}`} width="128" height="128" />
          <div>
            <p className="panel-label">Internship window</p>
            <p className="mono profile-window">{start} → {end}</p>
            <Badge label={personalInfo.internshipDuration} tone="info" />
          </div>
        </div>
        <div className="kpi-grid">
          <KpiCard label="Projects" value={String(projectCount)} hint="Personal + coursework" />
          <KpiCard label="Live demos" value={String(liveDemoCount)} hint="Deployed on Vercel" tone="live" />
          <KpiCard label="Current GPA" value={currentGpa} unit="/4" hint="Nanyang Polytechnic" />
          <KpiCard label="Public repos" value={String(publicRepoCount)} hint="Linked from case studies" />
        </div>
      </aside>
    </section>
  );
}
