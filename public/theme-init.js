// Immediately executes before body paint to prevent Flash of Unstyled Content (FOUC).
(function () {
  try {
    var stored = localStorage.getItem('portfolio_theme_mode');
    var theme = stored;
    if (!theme) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', theme === 'dark' ? '#090d16' : '#ffffff');
  } catch (e) {
    // Fail-safe in restrictive sandboxes
  }
})();
