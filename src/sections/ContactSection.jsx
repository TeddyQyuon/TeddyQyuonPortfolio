import { SectionHeader } from '../components/common/Dashboard';
import Icon from '../components/common/Icon';
import { personalInfo } from '../data/personalInfo';
import resumePreview from '../assets/images/resume-preview.webp';

const channels = [
  { icon: 'mail', label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
  { icon: 'linkedin', label: 'LinkedIn', value: 'in/waiyanhponelat', href: personalInfo.linkedinUrl, external: true },
  { icon: 'github', label: 'GitHub', value: 'TeddyQyuon', href: personalInfo.githubUrl, external: true },
  { icon: 'whatsapp', label: 'WhatsApp', value: 'Message on WhatsApp', href: personalInfo.whatsappUrl, external: true },
];

export default function ContactSection() {
  return (
    <section className="section" aria-labelledby="contact-title" id="contact">
      <SectionHeader index="05" eyebrow="Contact" title="Résumé & contact" id="contact-title" />
      <div className="contact-grid">
        <div className="panel resume-panel">
          <img src={resumePreview} alt="First page of the résumé" loading="lazy" width="180" height="254" />
          <div>
            <h3 className="panel-title">Résumé</h3>
            <p className="muted">One-page PDF with current projects, skills and the internship window.</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href={personalInfo.resumePath} target="_blank" rel="noopener">
                <Icon name="file" size={16} />
                Open PDF
              </a>
              <a className="btn" href={personalInfo.resumePath} download>
                <Icon name="download" size={16} />
                Download
              </a>
            </div>
          </div>
        </div>

        <div className="panel">
          <h3 className="panel-title">Get in touch</h3>
          <p className="muted">{personalInfo.internshipObjective}</p>
          <ul className="channel-list">
            {channels.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <span className={`channel-icon channel-icon-${c.icon}`}><Icon name={c.icon} /></span>
                  <span className="channel-text">
                    <span className="panel-label">{c.label}</span>
                    <span className="channel-value">{c.value}</span>
                  </span>
                  <Icon name={c.external ? 'external' : 'arrowRight'} size={16} />
                  {c.external && <span className="sr-only">(opens in new tab)</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
