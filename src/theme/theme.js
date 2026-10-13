import { createTheme } from '@mui/material/styles';
import { getThemeOptions } from './themeTokens';

// Baseline default theme (light).
const theme = createTheme(getThemeOptions('light'));

export default theme;
