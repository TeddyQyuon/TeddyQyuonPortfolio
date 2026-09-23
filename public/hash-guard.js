// Runs synchronously in <head>, before the document body is parsed.
//
// A shared or reloaded homepage link may carry a section hash (e.g. /#about).
// The browser performs its own fragment scroll as soon as it parses the target
// element, which would drop a visitor part-way down the page. Dropping the hash
// here — before that element exists — means the homepage always opens on the
// hero. In-page navigation still works normally once the app is running.
//
// Kept as an external file (not inline) so it satisfies the site's
// `script-src 'self'` Content Security Policy.
if (window.location.pathname === '/' && window.location.hash) {
  window.history.replaceState(null, '', window.location.pathname);
}
