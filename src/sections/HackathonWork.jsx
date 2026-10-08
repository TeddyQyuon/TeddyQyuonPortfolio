import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import TechnologyLogo from '../components/common/TechnologyLogo';

export default function HackathonWork() {
  return (
    <aside className="hackathon-work" aria-labelledby="hackathon-title">
      <div className="hackathon-icon"><ShieldOutlinedIcon aria-hidden="true" /></div>
      <div>
        <p className="section-eyebrow">HackIT 2026 · Four-member team</p>
        <h3 id="hackathon-title">ScamDar — community scam awareness</h3>
        <p>A working local prototype for checking suspicious messages, explaining risk signals, and sharing community scam reports. It includes voting, comments, trends, WhatsApp sharing and a trusted-contact flow.</p>
        <p><strong>My contribution:</strong> Built the working prototype for the team’s mentorship session with AI assistance. The team is continuing to refine the concept.</p>
        <div className="hackathon-tools">{['React', 'FastAPI', 'Python', 'SQLite'].map((name) => <span key={name}><TechnologyLogo name={name} size={18} />{name}</span>)}<span className="prototype-label">Local prototype · In progress</span></div>
      </div>
    </aside>
  );
}
