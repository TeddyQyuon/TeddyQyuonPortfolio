import { createTheme } from '@mui/material/styles';

// A restrained palette shared by the homepage and case studies.
const theme = createTheme({
  custom: {
    gradients: {
      hero: 'linear-gradient(#161c28, #161c28)',
      brand: 'linear-gradient(#245be1, #245be1)',
      avatarRing: 'linear-gradient(#e6eaf0, #e6eaf0)',
      iconTile: 'linear-gradient(#eef2f7, #eef2f7)',
      category: {}, categoryFallback: 'linear-gradient(#161c28, #161c28)',
    },
    surfaces: { navy: '#161c28', navyBorder: '#323b4d', slateBorder: '#465267', tile: '#f7f8fa' },
    onDark: { strong: '#ffffff', body: '#e5e9f1', muted: '#ccd4e1', subtle: '#acb9ce', faint: '#acb9ce', accent: '#b7ccff', accentSoft: '#b7ccff' },
    onPrimary: { soft: '#e5e9f1' }, chip: { bg: '#f7f8fa', border: '#dce2e9' },
  },
  palette: {
    mode: 'light',
    primary: { main: '#202733', dark: '#131923', light: '#eef1f5', contrastText: '#ffffff' },
    secondary: { main: '#245be1' }, success: { main: '#13704d' },
    background: { default: '#f7f8fa', paper: '#ffffff' },
    text: { primary: '#202733', secondary: '#596477' }, divider: '#dfe4eb',
  },
  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: { fontWeight: 700, letterSpacing: '-0.055em', lineHeight: 1.06 },
    h2: { fontWeight: 650, letterSpacing: '-0.045em', lineHeight: 1.16 },
    h3: { fontWeight: 650, letterSpacing: '-0.035em', lineHeight: 1.25 },
    h4: { fontWeight: 650, letterSpacing: '-0.035em', lineHeight: 1.25 },
    h5: { fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.3 },
    h6: { fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.4 },
    subtitle1: { fontWeight: 600, lineHeight: 1.5 }, subtitle2: { fontWeight: 600, lineHeight: 1.5 },
    body1: { fontSize: '1rem', lineHeight: 1.75 }, body2: { fontSize: '0.9375rem', lineHeight: 1.65 },
    overline: { fontWeight: 600, letterSpacing: '0.12em' },
  },
  shape: { borderRadius: 6 },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600, borderRadius: 7, minHeight: 44, padding: '9px 16px' },
        outlined: { borderColor: '#cfd6e0' }, sizeSmall: { fontSize: '0.875rem', padding: '7px 12px' },
      },
    },
    MuiCard: { styleOverrides: { root: { borderRadius: 12, border: '1px solid #dfe4eb', boxShadow: 'none' } } },
    MuiPaper: { styleOverrides: { outlined: { borderColor: '#dfe4eb' }, rounded: { borderRadius: 12 } } },
    MuiChip: { styleOverrides: { root: { fontWeight: 500, borderRadius: 5, maxWidth: '100%' }, label: { whiteSpace: 'normal', overflowWrap: 'anywhere' }, sizeSmall: { height: 'auto', minHeight: 28 } } },
    MuiContainer: { styleOverrides: { root: { '@media (min-width: 1200px)': { paddingLeft: 32, paddingRight: 32 } } } },
    MuiAppBar: { styleOverrides: { root: { backgroundColor: 'rgba(255,255,255,0.96)' } } },
    MuiAccordion: { styleOverrides: { root: { boxShadow: 'none' } } },
  },
});

export default theme;
