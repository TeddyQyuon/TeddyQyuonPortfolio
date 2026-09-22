import { createTheme } from '@mui/material/styles';

// Professional + modern design system.
// Deep navy + vivid blue + cyan accent. Cool but recruiter-safe:
// no neon, no heavy glass, just gradient hero + clean cards.

// Tokens that MUI's palette does not model: gradients, the dark navy surface
// family, and text colours used on top of those dark surfaces.
// Kept here so components never hardcode a colour value.
const tokens = {
  gradients: {
    // Hero background and the dark case-study accents.
    hero: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #0e7490 100%)',
    // Brand rule used under headings and on top of cards.
    brand: 'linear-gradient(90deg, #1d4ed8, #0891b2)',
    // Ring behind the portrait.
    avatarRing: 'linear-gradient(135deg, #22d3ee, #3b82f6)',
    // Soft tile behind feature icons.
    iconTile: 'linear-gradient(135deg, #dbeafe, #cffafe)',
    // Per-category cover treatments. Used for the project card artwork when a
    // project has no screenshot, so every card still reads as designed.
    category: {
      'Full-Stack': 'linear-gradient(135deg, #1d4ed8 0%, #0891b2 100%)',
      'Predictive Analytics': 'linear-gradient(135deg, #0e7490 0%, #059669 100%)',
      'Data Wrangling': 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)',
    },
    // Fallback for a category that has no dedicated treatment yet.
    categoryFallback: 'linear-gradient(135deg, #334155 0%, #1d4ed8 100%)',
  },
  surfaces: {
    navy: '#0f172a',
    navyBorder: '#1e293b',
    slateBorder: '#334155',
    tile: '#f8fafc',
  },
  // Text and borders drawn on top of the navy surfaces.
  onDark: {
    strong: '#ffffff',
    body: '#e2e8f0',
    muted: '#cbd5e1',
    subtle: '#94a3b8',
    faint: '#64748b',
    accent: '#93c5fd',
    accentSoft: '#a7f3d0',
  },
  // Supporting text on top of primary.main fills.
  onPrimary: {
    soft: '#dbeafe',
  },
  chip: {
    bg: '#eff6ff',
    border: '#bfdbfe',
  },
};

const theme = createTheme({
  custom: tokens,
  palette: {
    mode: 'light',
    primary: {
      main: '#1d4ed8', // vivid professional blue
      dark: '#1e3a8a',
      light: '#dbeafe',
    },
    secondary: {
      main: '#0891b2', // cyan accent for gradients/icons
    },
    success: {
      main: '#059669',
    },
    background: {
      default: '#f1f5f9', // cooler slate page background
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a', // slate-900 — strong readable headings
      secondary: '#475569', // slate-600 — body/supporting text
    },
    divider: '#e2e8f0',
  },
  typography: {
    fontFamily:
      'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1 },
    h2: { fontWeight: 700, letterSpacing: '-0.015em', lineHeight: 1.2 },
    h3: { fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.3 },
    h4: { fontWeight: 700, lineHeight: 1.35 },
    h5: { fontWeight: 600, lineHeight: 1.4 },
    h6: { fontWeight: 600, lineHeight: 1.4 },
    subtitle1: { fontWeight: 500, lineHeight: 1.5 },
    subtitle2: { fontWeight: 600, lineHeight: 1.5 },
    body1: { lineHeight: 1.7 },
    body2: { lineHeight: 1.65 },
    overline: { fontWeight: 700, letterSpacing: '0.08em' },
  },
  shape: {
    borderRadius: 14,
  },
  shadows: [
    'none',
    '0 1px 2px rgba(15, 23, 42, 0.06)',
    '0 1px 3px rgba(15, 23, 42, 0.08), 0 1px 2px rgba(15, 23, 42, 0.06)',
    '0 4px 6px rgba(15, 23, 42, 0.07), 0 2px 4px rgba(15, 23, 42, 0.06)',
    '0 10px 15px rgba(15, 23, 42, 0.08), 0 4px 6px rgba(15, 23, 42, 0.05)',
    '0 20px 25px rgba(15, 23, 42, 0.08), 0 8px 10px rgba(15, 23, 42, 0.05)',
    '0 20px 25px rgba(15, 23, 42, 0.08), 0 8px 10px rgba(15, 23, 42, 0.05)',
    '0 20px 25px rgba(15, 23, 42, 0.08), 0 8px 10px rgba(15, 23, 42, 0.05)',
    '0 20px 25px rgba(15, 23, 42, 0.08), 0 8px 10px rgba(15, 23, 42, 0.05)',
    '0 20px 25px rgba(15, 23, 42, 0.08), 0 8px 10px rgba(15, 23, 42, 0.05)',
    '0 20px 25px rgba(15, 23, 42, 0.08), 0 8px 10px rgba(15, 23, 42, 0.05)',
    '0 20px 25px rgba(15, 23, 42, 0.08), 0 8px 10px rgba(15, 23, 42, 0.05)',
    '0 20px 25px rgba(15, 23, 42, 0.08), 0 8px 10px rgba(15, 23, 42, 0.05)',
    '0 20px 25px rgba(15, 23, 42, 0.08), 0 8px 10px rgba(15, 23, 42, 0.05)',
    '0 20px 25px rgba(15, 23, 42, 0.08), 0 8px 10px rgba(15, 23, 42, 0.05)',
    '0 20px 25px rgba(15, 23, 42, 0.08), 0 8px 10px rgba(15, 23, 42, 0.05)',
    '0 20px 25px rgba(15, 23, 42, 0.08), 0 8px 10px rgba(15, 23, 42, 0.05)',
    '0 20px 25px rgba(15, 23, 42, 0.08), 0 8px 10px rgba(15, 23, 42, 0.05)',
    '0 20px 25px rgba(15, 23, 42, 0.08), 0 8px 10px rgba(15, 23, 42, 0.05)',
    '0 20px 25px rgba(15, 23, 42, 0.08), 0 8px 10px rgba(15, 23, 42, 0.05)',
    '0 20px 25px rgba(15, 23, 42, 0.08), 0 8px 10px rgba(15, 23, 42, 0.05)',
    '0 20px 25px rgba(15, 23, 42, 0.08), 0 8px 10px rgba(15, 23, 42, 0.05)',
    '0 20px 25px rgba(15, 23, 42, 0.08), 0 8px 10px rgba(15, 23, 42, 0.05)',
    '0 20px 25px rgba(15, 23, 42, 0.08), 0 8px 10px rgba(15, 23, 42, 0.05)',
    '0 20px 25px rgba(15, 23, 42, 0.08), 0 8px 10px rgba(15, 23, 42, 0.05)',
    '0 20px 25px rgba(15, 23, 42, 0.08), 0 8px 10px rgba(15, 23, 42, 0.05)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 700,
          borderRadius: 10,
        },
        contained: {
          boxShadow: '0 4px 14px rgba(29, 78, 216, 0.35)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          border: '1px solid #e2e8f0',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        outlined: {
          borderColor: '#e2e8f0',
        },
        rounded: {
          borderRadius: 16,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
        },
      },
    },
  },
});

export default theme;