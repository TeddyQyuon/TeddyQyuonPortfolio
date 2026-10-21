// Runs before first paint. Dark is the default; a saved choice wins.
(function () {
  var theme = 'dark';
  try {
    var saved = localStorage.getItem('tq-theme');
    if (saved === 'light' || saved === 'dark') theme = saved;
  } catch (e) {
    // Storage can be blocked (private mode, sandboxed frames). Keep default.
  }
  document.documentElement.setAttribute('data-theme', theme);
  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#0b1120' : '#f5f7fb');
})();
