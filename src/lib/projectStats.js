import { projects } from '../data/projects';
import { projectMetrics } from '../data/projectMetrics';

export const projectTitle = (p) => p.displayName || p.name.split(' — ')[0];
export const projectSubtitle = (p) => p.cardSubtitle || p.category;
export const projectMetricsFor = (slug) => projectMetrics[slug] || [];

// Status badges derived from the data, so a badge can never claim a demo or
// public repository that does not exist.
export function projectBadges(p) {
  const badges = [];
  if (p.demoUrl) badges.push({ label: 'Live', tone: 'live' });
  if (p.projectGroup === 'school') badges.push({ label: 'Coursework', tone: 'neutral' });
  if (/team/i.test(p.type)) badges.push({ label: 'Team', tone: 'neutral' });
  if (p.repositoryUrl) badges.push({ label: 'Source public', tone: 'info' });
  else if (p.projectGroup === 'personal') badges.push({ label: 'Private source', tone: 'warn' });
  if (p.reportUrl) badges.push({ label: 'Report', tone: 'info' });
  return badges;
}

export const projectCount = projects.length;
export const liveDemoCount = projects.filter((p) => p.demoUrl).length;
export const publicRepoCount = projects.filter((p) => p.repositoryUrl).length;

// How many projects use each technology, highest first.
export function technologyFrequency(limit = 12) {
  const counts = new Map();
  for (const p of projects) {
    for (const t of new Set(p.technologies)) counts.set(t, (counts.get(t) || 0) + 1);
  }
  return [...counts.entries()]
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value || a.label.localeCompare(b.label))
    .slice(0, limit);
}

export function neighbours(slug) {
  const i = projects.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? projects[i - 1] : null,
    next: i >= 0 && i < projects.length - 1 ? projects[i + 1] : null,
  };
}
