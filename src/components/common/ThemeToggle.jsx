import Icon from './Icon';
import useTheme from '../../hooks/useTheme';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Dark theme"
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="theme-switch"
      onClick={toggle}
    >
      <span className="theme-switch-icon theme-switch-sun" aria-hidden="true">
        <Icon name="sun" size={14} />
      </span>
      <span className="theme-switch-icon theme-switch-moon" aria-hidden="true">
        <Icon name="moon" size={14} />
      </span>
      <span className="theme-switch-thumb" aria-hidden="true" />
    </button>
  );
}
