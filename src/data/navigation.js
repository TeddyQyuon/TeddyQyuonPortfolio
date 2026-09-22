// Single source of truth for in-page section navigation.
// The Navbar, the mobile drawer and the Footer all read from here so the
// section list can never drift out of sync between them.

export const sectionLinks = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Education', id: 'education' },
  { label: 'Resume', id: 'resume' },
  { label: 'Contact', id: 'contact' },
];

// Module-level so the array identity stays stable for the scroll-spy effect.
export const sectionIds = sectionLinks.map((link) => link.id);

// Height of the sticky AppBar plus breathing room. Keep in sync with the
// `scroll-margin-top` value in index.css.
export const NAV_OFFSET = 76;

// Smooth-scrolls to a section, compensating for the sticky navbar.
// Returns false when the section is not on the current page.
export function scrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) return false;

  const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top, behavior: 'smooth' });
  return true;
}
