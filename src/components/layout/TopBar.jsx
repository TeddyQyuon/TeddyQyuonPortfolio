import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../common/Icon';
import profilePhoto from '../../assets/images/profile/header-portrait.webp';
import ThemeToggle from '../common/ThemeToggle';
import { sectionLinks } from '../../config/site';
import { personalInfo } from '../../data/personalInfo';
import { projects } from '../../data/projects';
import useActiveSection from '../../hooks/useActiveSection';

const menuMotion = typeof CSSStartingStyleRule !== 'undefined' && CSS.supports('transition-behavior', 'allow-discrete');

export default function TopBar() {
  const [open, setOpen] = useState(false);
  const [touched, setTouched] = useState(false);
  const toggleRef = useRef(null);
  const location = useLocation();
  const caseMatch = /^\/projects\/([^/]+)$/.exec(location.pathname);
  const isCaseStudy = caseMatch && projects.some((project) => project.slug === caseMatch[1]);
  const active = useActiveSection(sectionLinks.map((section) => section.id), { enabled: location.pathname === '/' });
  const currentSection = isCaseStudy ? 'projects' : active;

  // Close the mobile menu after any navigation.
  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="topbar">
      <div className="topbar-inner container">
        <Link to="/" className="brand" aria-label="Wai Yan Hpone Lat, home">
          <img className="brand-mark" src={profilePhoto} alt="" width="48" height="48" />
          <span className="brand-text">
            <span className="brand-name">Wai Yan Hpone Lat</span>
            <span className="brand-path mono">~/portfolio</span>
          </span>
        </Link>

        <nav id="primary-nav" className={`nav ${open ? 'is-open' : ''}`} data-motion={menuMotion ? 'menu' : undefined} aria-label="Primary">
          <ul>
            {sectionLinks.map((s) => (
              <li key={s.id}>
                <Link to={{ pathname: '/', hash: `#${s.id}` }} aria-current={currentSection === s.id ? 'true' : undefined}>{s.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="topbar-actions">
          <a className="btn btn-small btn-primary hide-sm" href={personalInfo.resumePath} target="_blank" rel="noopener">
            <Icon name="file" size={16} />
            Résumé
          </a>
          <ThemeToggle />
          <button
            type="button"
            className="icon-button menu-toggle"
            ref={toggleRef}
            data-touched={touched || undefined}
            aria-expanded={open}
            aria-controls="primary-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => { setTouched(true); setOpen((v) => !v); }}
          >
            <Icon key={open ? 'close' : 'menu'} name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
      {isCaseStudy && <span className="read-progress" aria-hidden="true" />}
    </header>
  );
}
