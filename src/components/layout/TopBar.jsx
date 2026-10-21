import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../common/Icon';
import ThemeToggle from '../common/ThemeToggle';
import { sectionLinks } from '../../config/site';
import { personalInfo } from '../../data/personalInfo';

export default function TopBar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close the mobile menu after any navigation.
  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="topbar">
      <div className="topbar-inner container">
        <Link to="/" className="brand" aria-label="Wai Yan Hpone Lat, home">
          <span className="brand-mark" aria-hidden="true">WY</span>
          <span className="brand-text">
            <span className="brand-name">Wai Yan Hpone Lat</span>
            <span className="brand-path mono">~/portfolio</span>
          </span>
        </Link>

        <nav id="primary-nav" className={`nav ${open ? 'is-open' : ''}`} aria-label="Primary">
          <ul>
            {sectionLinks.map((s) => (
              <li key={s.id}>
                <Link to={{ pathname: '/', hash: `#${s.id}` }}>{s.label}</Link>
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
            aria-expanded={open}
            aria-controls="primary-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
    </header>
  );
}
