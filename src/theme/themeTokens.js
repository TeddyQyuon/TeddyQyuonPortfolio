/**
 * Design tokens and options for light and dark modes.
 *
 * Implements the "Linear / Vercel / Shadcn Minimalist" aesthetic:
 * - Deep, rich backgrounds (slate-950 / zinc-950: #090d16).
 * - Subtle 1px borders (rgba(255, 255, 255, 0.08)) without heavy harsh shadows.
 * - Glassmorphism on the AppBar and navigation with backdrop blur.
 * - Accessible contrast ratios exceeding WCAG AA (>14:1 for text).
 */
export function getThemeOptions(mode = 'light') {
  const isDark = mode === 'dark';

  return {
    custom: {
      gradients: {
        hero: isDark
          ? 'radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.10) 0%, rgba(79, 117, 242, 0.06) 35%, transparent 70%), linear-gradient(180deg, #090d16 0%, #0d1322 100%)'
          : 'radial-gradient(circle at 85% 15%, rgba(36, 91, 225, 0.06) 0%, transparent 45%), linear-gradient(115deg, #ffffff 55%, #eff4fc)',
        brand: isDark ? 'linear-gradient(#4f75f2, #4f75f2)' : 'linear-gradient(#245be1, #245be1)',
        avatarRing: isDark ? 'linear-gradient(#1e293b, #1e293b)' : 'linear-gradient(#e6eaf0, #e6eaf0)',
        iconTile: isDark ? 'linear-gradient(#162035, #162035)' : 'linear-gradient(#eef2f7, #eef2f7)',
        category: {},
        categoryFallback: isDark ? 'linear-gradient(#0d1322, #0d1322)' : 'linear-gradient(#161c28, #161c28)',
      },
      surfaces: {
        navy: isDark ? '#0d1322' : '#161c28',
        navyBorder: isDark ? 'rgba(255, 255, 255, 0.08)' : '#323b4d',
        slateBorder: isDark ? 'rgba(255, 255, 255, 0.12)' : '#465267',
        tile: isDark ? '#162035' : '#f7f8fa',
      },
      onDark: {
        strong: '#ffffff',
        body: isDark ? '#f8fafc' : '#e5e9f1',
        muted: isDark ? '#94a3b8' : '#ccd4e1',
        subtle: isDark ? '#64748b' : '#acb9ce',
        faint: isDark ? '#475569' : '#acb9ce',
        accent: isDark ? '#38bdf8' : '#b7ccff',
        accentSoft: isDark ? '#7dd3fc' : '#b7ccff',
      },
      onPrimary: { soft: isDark ? '#e2e8f0' : '#e5e9f1' },
      chip: {
        bg: isDark ? '#162035' : '#f7f8fa',
        border: isDark ? 'rgba(255, 255, 255, 0.10)' : '#dce2e9',
      },
    },
    palette: {
      mode,
      primary: isDark
        ? { main: '#4f75f2', dark: '#3b5bc7', light: 'rgba(79, 117, 242, 0.16)', contrastText: '#ffffff' }
        : { main: '#202733', dark: '#131923', light: '#eef1f5', contrastText: '#ffffff' },
      secondary: { main: isDark ? '#38bdf8' : '#245be1' },
      success: { main: isDark ? '#10b981' : '#13704d' },
      background: {
        default: isDark ? '#090d16' : '#f7f8fa',
        paper: isDark ? '#111726' : '#ffffff',
      },
      text: {
        primary: isDark ? '#f8fafc' : '#202733',
        secondary: isDark ? '#94a3b8' : '#596477',
      },
      divider: isDark ? 'rgba(255, 255, 255, 0.08)' : '#dfe4eb',
      action: {
        hover: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)',
        selected: isDark ? 'rgba(79, 117, 242, 0.18)' : 'rgba(32, 39, 51, 0.08)',
      },
    },
    typography: {
      fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      h1: { fontWeight: 700, letterSpacing: '-0.055em', lineHeight: 1.06 },
      h2: { fontWeight: 650, letterSpacing: '-0.045em', lineHeight: 1.16 },
      h3: { fontWeight: 650, letterSpacing: '-0.035em', lineHeight: 1.25 },
      h4: { fontWeight: 650, letterSpacing: '-0.035em', lineHeight: 1.25 },
      h5: { fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.3 },
      h6: { fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.4 },
      subtitle1: { fontWeight: 600, lineHeight: 1.5 },
      subtitle2: { fontWeight: 600, lineHeight: 1.5 },
      body1: { fontSize: '1rem', lineHeight: 1.75 },
      body2: { fontSize: '0.9375rem', lineHeight: 1.65 },
      overline: { fontWeight: 600, letterSpacing: '0.12em' },
    },
    shape: { borderRadius: 8 },
    components: {
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: { textTransform: 'none', fontWeight: 600, borderRadius: 8, minHeight: 44, padding: '9px 16px' },
          outlined: { borderColor: isDark ? 'rgba(255, 255, 255, 0.14)' : '#cfd6e0' },
          sizeSmall: { fontSize: '0.875rem', padding: '7px 12px' },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 14,
            border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : '#dfe4eb'}`,
            boxShadow: 'none',
            backgroundColor: isDark ? '#111726' : '#ffffff',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
          outlined: { borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#dfe4eb' },
          rounded: { borderRadius: 14 },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 500,
            borderRadius: 6,
            maxWidth: '100%',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.10)' : undefined,
          },
          label: { whiteSpace: 'normal', overflowWrap: 'anywhere' },
          sizeSmall: { height: 'auto', minHeight: 28 },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: { '@media (min-width: 1200px)': { paddingLeft: 32, paddingRight: 32 } },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? 'rgba(9, 13, 22, 0.85)' : 'rgba(255, 255, 255, 0.94)',
            color: isDark ? '#f8fafc' : '#202733',
            backdropFilter: 'blur(12px)',
          },
        },
      },
      MuiAccordion: { styleOverrides: { root: { boxShadow: 'none' } } },
    },
  };
}
