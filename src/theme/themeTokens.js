/**
 * Design tokens — clean, professional, modern (Linear / Vercel / Stripe inspired).
 * Deep slate #090d16 / #111726 dark, airy #f7f8fa / #ffffff light — contracts preserved.
 * Hairline 1px borders, glass AppBar blur(16px), Inter tight tracking, soft elevations.
 * Contract: dark bg.default #090d16, paper #111726, text #f8fafc/#94a3b8.
 * Upgraded 2026-10: tighter editorial type, 18px card radius, subtler shadows, refined motion.
 */
export function getThemeOptions(mode = 'light') {
  const isDark = mode === 'dark';

  return {
    custom: {
      gradients: {
        hero: isDark
          ? 'radial-gradient(ellipse 900px 440px at 50% -10%, rgba(79,117,242,0.16), transparent 62%), radial-gradient(ellipse 720px 360px at 85% 12%, rgba(56,189,248,0.10), transparent 55%), linear-gradient(180deg, #090d16 0%, #0d1424 55%, #090d16 100%)'
          : 'radial-gradient(ellipse 840px 400px at 82% 8%, rgba(36,91,225,0.07), transparent 60%), linear-gradient(115deg, #ffffff 50%, #f1f5fe 100%)',
        brand: isDark ? 'linear-gradient(135deg, #4f75f2, #38bdf8)' : 'linear-gradient(135deg, #245be1, #4f75f2)',
        avatarRing: isDark ? 'linear-gradient(#1e293b, #1e293b)' : 'linear-gradient(#e2e8f0, #e2e8f0)',
        iconTile: isDark ? 'linear-gradient(#162035, #162035)' : 'linear-gradient(#f1f5f9, #f1f5f9)',
        category: {},
        categoryFallback: isDark ? 'linear-gradient(#0d1322, #0d1322)' : 'linear-gradient(#161c28, #161c28)',
      },
      surfaces: {
        navy: isDark ? '#0d1322' : '#0f172a',
        navyBorder: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.12)',
        slateBorder: isDark ? 'rgba(255, 255, 255, 0.12)' : '#334155',
        tile: isDark ? '#162035' : '#f8fafc',
      },
      onDark: {
        strong: '#ffffff',
        body: isDark ? '#f8fafc' : '#e2e8f0',
        muted: isDark ? '#94a3b8' : '#cbd5e1',
        subtle: isDark ? '#64748b' : '#94a3b8',
        faint: isDark ? '#475569' : '#94a3b8',
        accent: isDark ? '#38bdf8' : '#93c5fd',
        accentSoft: isDark ? '#7dd3fc' : '#bfdbfe',
      },
      onPrimary: { soft: isDark ? '#e2e8f0' : '#e2e8f0' },
      chip: {
        bg: isDark ? '#162035' : '#ffffff',
        border: isDark ? 'rgba(255, 255, 255, 0.10)' : '#e2e8f0',
      },
    },
    palette: {
      mode,
      primary: isDark
        ? { main: '#4f75f2', dark: '#3b5bc7', light: 'rgba(79, 117, 242, 0.16)', contrastText: '#ffffff' }
        : { main: '#0f172a', dark: '#020617', light: '#eef2ff', contrastText: '#ffffff' },
      secondary: { main: isDark ? '#38bdf8' : '#245be1' },
      success: { main: isDark ? '#10b981' : '#059669' },
      background: {
        default: isDark ? '#090d16' : '#f7f8fa',
        paper: isDark ? '#111726' : '#ffffff',
      },
      text: {
        primary: isDark ? '#f8fafc' : '#0f172a',
        secondary: isDark ? '#94a3b8' : '#475569',
      },
      divider: isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0',
      action: {
        hover: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(15, 23, 42, 0.04)',
        selected: isDark ? 'rgba(79, 117, 242, 0.16)' : 'rgba(36, 91, 225, 0.08)',
      },
    },
    typography: {
      fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      h1: { fontWeight: 800, letterSpacing: '-0.055em', lineHeight: 1.02 },
      h2: { fontWeight: 750, letterSpacing: '-0.042em', lineHeight: 1.12 },
      h3: { fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.2 },
      h4: { fontWeight: 700, letterSpacing: '-0.028em', lineHeight: 1.24 },
      h5: { fontWeight: 650, letterSpacing: '-0.02em', lineHeight: 1.32 },
      h6: { fontWeight: 650, letterSpacing: '-0.015em', lineHeight: 1.4 },
      subtitle1: { fontWeight: 600, lineHeight: 1.5, letterSpacing: '-0.01em' },
      subtitle2: { fontWeight: 600, lineHeight: 1.5, letterSpacing: '-0.008em' },
      body1: { fontSize: '1rem', lineHeight: 1.72 },
      body2: { fontSize: '0.9375rem', lineHeight: 1.66 },
      overline: { fontWeight: 700, letterSpacing: '0.12em', fontSize: '0.72rem' },
      button: { fontWeight: 600, letterSpacing: '-0.01em' },
    },
    shape: { borderRadius: 12 },
    components: {
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 10,
            minHeight: 44,
            padding: '9px 18px',
            letterSpacing: '-0.01em',
            fontSize: '0.9375rem',
            transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
          },
          contained: {
            boxShadow: isDark
              ? '0 1px 2px rgba(0,0,0,0.4), 0 4px 14px rgba(79,117,242,0.22)'
              : '0 1px 2px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.08)',
            '&:hover': {
              transform: 'translateY(-1px)',
              boxShadow: isDark
                ? '0 6px 20px rgba(79,117,242,0.32)'
                : '0 6px 18px rgba(15,23,42,0.14)',
            },
          },
          outlined: {
            borderColor: isDark ? 'rgba(255, 255, 255, 0.14)' : '#cbd5e1',
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : '#ffffff',
            '&:hover': {
              borderColor: isDark ? 'rgba(255, 255, 255, 0.24)' : '#94a3b8',
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.06)' : '#f8fafc',
              transform: 'translateY(-1px)',
            },
          },
          sizeSmall: {
            fontSize: '0.8125rem',
            padding: '7px 14px',
            minHeight: 38,
            borderRadius: 9,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0'}`,
            boxShadow: isDark
              ? '0 1px 0 rgba(255,255,255,0.04) inset, 0 8px 24px rgba(0,0,0,0.32)'
              : '0 1px 3px rgba(15,23,42,0.03), 0 8px 24px rgba(15,23,42,0.04)',
            backgroundColor: isDark ? '#111726' : '#ffffff',
            transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s cubic-bezier(0.16,1,0.3,1), border-color 0.2s ease',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: 'none', transition: 'border-color 0.2s ease, box-shadow 0.2s ease' },
          outlined: { borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0' },
          rounded: { borderRadius: 16 },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 500,
            borderRadius: 8,
            maxWidth: '100%',
            height: 28,
            fontSize: '0.8125rem',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.10)' : '#e2e8f0',
            transition: 'all 0.18s cubic-bezier(0.16,1,0.3,1)',
          },
          colorDefault: {
            backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : '#f8fafc',
          },
          filledPrimary: {
            backgroundColor: isDark ? '#3b82f6' : '#0f172a',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: isDark ? '#2563eb' : '#1e293b',
            },
          },
          label: { whiteSpace: 'normal', overflowWrap: 'anywhere', paddingLeft: 10, paddingRight: 10 },
          sizeSmall: { height: 'auto', minHeight: 28 },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            '@media (min-width: 600px)': { paddingLeft: 24, paddingRight: 24 },
            '@media (min-width: 1200px)': { paddingLeft: 32, paddingRight: 32 },
            '@media (min-width: 1400px)': { maxWidth: 1240 },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? 'rgba(9, 13, 22, 0.82)' : 'rgba(255, 255, 255, 0.88)',
            color: isDark ? '#f8fafc' : '#0f172a',
            backdropFilter: 'blur(16px) saturate(180%)',
            WebkitBackdropFilter: 'blur(16px) saturate(180%)',
            borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.08)'}`,
            boxShadow: 'none',
            transition: 'background-color 0.22s ease, border-color 0.22s ease',
          },
        },
      },
      MuiAccordion: { styleOverrides: { root: { boxShadow: 'none', borderRadius: 12 } } },
    },
  };
}
