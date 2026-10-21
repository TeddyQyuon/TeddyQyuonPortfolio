import { useState } from 'react';
import { SectionHeader } from '../components/common/Dashboard';
import ProjectPanel from '../components/projects/ProjectPanel';
import { projects } from '../data/projects';

const filters = [
  { id: 'all', label: 'All' },
  { id: 'personal', label: 'Personal' },
  { id: 'school', label: 'Coursework' },
];

export default function ProjectsSection() {
  const [filter, setFilter] = useState('all');
  const visible = projects.filter((p) => filter === 'all' || p.projectGroup === filter);

  return (
    <section className="section" aria-labelledby="projects-title" id="projects">
      <SectionHeader index="02" eyebrow="Projects" title="Shipped work" id="projects-title">
        <div className="segmented" role="group" aria-label="Filter projects">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
              <span className="mono count">
                {f.id === 'all' ? projects.length : projects.filter((p) => p.projectGroup === f.id).length}
              </span>
            </button>
          ))}
        </div>
      </SectionHeader>
      <p className="section-lede">
        Personal projects are AI-assisted and built end to end by me. Coursework is labelled, and team
        projects list only my own contribution.
      </p>
      <p className="sr-only" aria-live="polite">{`Showing ${visible.length} projects`}</p>
      <div className="project-grid">
        {visible.map((p) => (
          <ProjectPanel key={p.slug} project={p} index={projects.indexOf(p)} />
        ))}
      </div>
    </section>
  );
}
