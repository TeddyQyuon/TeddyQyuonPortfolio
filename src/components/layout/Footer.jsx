import { Link } from 'react-router-dom';
import Icon from '../common/Icon';
import { sectionLinks } from '../../config/site';
import { personalInfo } from '../../data/personalInfo';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="mono footer-meta">
          © {new Date().getFullYear()} {personalInfo.name} · {personalInfo.location}
        </p>
        <nav aria-label="Footer">
          <ul className="footer-links">
            {sectionLinks.map((s) => (
              <li key={s.id}>
                <Link to={{ pathname: '/', hash: `#${s.id}` }}>{s.label}</Link>
              </li>
            ))}
            <li>
              <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer">
                <Icon name="github" size={15} />
                GitHub
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            </li>
            <li>
              <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer">
                <Icon name="linkedin" size={15} />
                LinkedIn
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
