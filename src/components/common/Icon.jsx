import gmail from '../../assets/images/social/gmail.png';
import whatsapp from '../../assets/images/social/whatsapp.svg';
import githubBlack from '../../assets/images/social/github-black.svg';
import githubWhite from '../../assets/images/social/github-white.svg';
import linkedin from '../../assets/images/social/linkedin.png';
// Inline SVG icons (no icon library). Interface icons use a consistent stroke
// set; social marks use the official brand glyphs so they stay recognisable.
const strokeIcons = {
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowLeft: <path d="M19 12H5M11 6l-6 6 6 6" />,
  external: <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />,
  download: <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />,
  file: <><path d="M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7z" /><path d="M14 3v4h4M9 13h6M9 17h6" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  moon: <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  pin: <><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
  cap: <><path d="m2 9 10-5 10 5-10 5z" /><path d="M6 11v5c3 2 9 2 12 0v-5" /></>,
};

export default function Icon({ name, size = 18, className = '' }) {
  if (name === 'mail') {
    return <img className={`icon social-brand-icon ${className}`.trim()} src={gmail} alt="" width={size} height={size} aria-hidden="true" />;
  }
  if (name === 'github') {
    return <span className={`icon brand-icon-pair ${className}`.trim()} style={{ width: size, height: size }} aria-hidden="true">
      <img className="brand-on-light" src={githubBlack} alt="" width={size} height={size} />
      <img className="brand-on-dark" src={githubWhite} alt="" width={size} height={size} />
    </span>;
  }
  if (name === 'linkedin') {
    return <img className={`icon social-brand-icon ${className}`.trim()} src={linkedin} alt="" width={size} height={size} aria-hidden="true" />;
  }
  if (name === 'whatsapp') {
    return <img className={`icon social-brand-icon ${className}`.trim()} src={whatsapp} alt="" width={size} height={size} aria-hidden="true" />;
  }

  return (
    <svg
      className={`icon icon-${name} ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {strokeIcons[name]}
    </svg>
  );
}
