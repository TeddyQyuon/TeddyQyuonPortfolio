import { SectionHeader } from '../components/common/Dashboard';
import BarList from '../components/charts/BarList';
import TechTagList from '../components/common/TechTags';
import { skillCategories } from '../data/skills';
import { projectCount, technologyFrequency } from '../lib/projectStats';

export default function StackSection() {
  const usage = technologyFrequency(12);

  return (
    <section className="section" aria-labelledby="stack-title" id="stack">
      <SectionHeader index="03" eyebrow="Stack" title="Tools & skills" id="stack-title" />
      <div className="stack-grid">
        <div className="panel">
          <h3 className="panel-title">Technology usage</h3>
          <p className="muted small">Number of projects (out of {projectCount}) that use each technology.</p>
          <BarList items={usage} max={projectCount} label="Projects per technology" />
        </div>
        <div className="panel skills-panel">
          <h3 className="panel-title">Skills by area</h3>
          <p className="muted small">Each skill comes from coursework or a project on this page.</p>
          <div className="skill-groups">
            {skillCategories.map((c) => (
              <div key={c.title} className="skill-group">
                <h4 className="mono">{c.title}</h4>
                <TechTagList items={c.skills} label={`${c.title} skills`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
