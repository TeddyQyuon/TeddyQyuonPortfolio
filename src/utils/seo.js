// Single source of truth for canonical URLs and page metadata.
// Kept free of browser APIs so the static SEO generator can load it through Vite.
export const SITE_URL = 'https://teddy-qyuon-portfolio.vercel.app';
export const SITE_NAME = 'Wai Yan Hpone Lat';
export const DEFAULT_TITLE = 'Wai Yan Hpone Lat | Applied AI & Analytics Portfolio';
export const DEFAULT_DESCRIPTION =
  'Portfolio of Wai Yan Hpone Lat — Applied AI & Analytics student at Nanyang Polytechnic seeking a 1-year technology internship. Full-Stack: React, Node.js, Express, MySQL. Data: KNIME, SAS Viya, Python.';
export const OG_IMAGE_URL = `${SITE_URL}/og-image.png`;
export const OG_IMAGE_ALT =
  'Wai Yan Hpone Lat — Applied AI & Analytics student at Nanyang Polytechnic';
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
  return `${project.displayName || project.name} | ${SITE_NAME}`;
}

export function projectDescription(project) {
  return project.seoDescription || truncateText(project.cardSummary || project.summary);
}

export function projectMeta(project) {
  return {
    title: projectPageTitle(project),
    description: projectDescription(project),
    path: `/projects/${project.slug}`,
    image: OG_IMAGE_URL,
    imageAlt: `${project.displayName || project.name} — ${project.category} case study`,
    type: 'article',
  };
}
