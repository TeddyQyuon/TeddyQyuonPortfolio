import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_NAME, SITE_URL } from '../config/site.js';

export { DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_NAME, SITE_URL };
export const OG_IMAGE_URL = `${SITE_URL}/og-image.png`;
export const OG_IMAGE_ALT = 'Wai Yan Hpone Lat, Applied AI & Analytics portfolio';
export const DEFAULT_ROBOTS = 'index, follow';

export function absoluteUrl(pathname = '/') {
  return new URL(pathname, SITE_URL).toString();
}

export function truncateText(text, maxLength = 155) {
  const value = String(text ?? '').replace(/\s+/g, ' ').trim();
  if (value.length <= maxLength) return value;
  const shortened = value.slice(0, maxLength - 1);
  const lastSpace = shortened.lastIndexOf(' ');
  return `${shortened.slice(0, lastSpace > 0 ? lastSpace : shortened.length).trimEnd()}…`;
}

export function projectPageTitle(project) {
  return `${project.displayName || project.name.split(' — ')[0]} | ${SITE_NAME}`;
}

export function projectDescription(project) {
  return project.seoDescription || project.cardSummary || truncateText(project.summary);
}

export function projectMeta(project) {
  return {
    title: project.displayName || project.name.split(' — ')[0],
    description: projectDescription(project),
    path: `/projects/${project.slug}`,
    imageAlt: `${project.displayName || project.name.split(' — ')[0]} — ${project.category} case study`,
    type: 'article',
  };
}

// Shared by the existing client hook and the static HTML generator.
export function documentMeta({ title, description, path = '/', image = OG_IMAGE_URL, imageAlt = OG_IMAGE_ALT, type = 'website', noindex = false } = {}) {
  return {
    title: title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE,
    description: description || DEFAULT_DESCRIPTION,
    canonical: absoluteUrl(path),
    image,
    imageAlt,
    type,
    siteName: SITE_NAME,
    robots: noindex ? 'noindex, follow' : DEFAULT_ROBOTS,
    noindex,
  };
}
