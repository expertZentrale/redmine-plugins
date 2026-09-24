/* Colour scheme switch: Auto -> Light -> Dark -> Auto.
 *
 * Auto is the default and is stored as no value at all, so a visitor who
 * never touches the switch keeps following their OS. The saved choice is
 * applied before first paint by the inline script in the layout's <head>;
 * this file only wires up the button.
 *
 * Storage can be missing or throw (private windows, blocked site data), so
 * every access is guarded; the switch then still works for the current page.
 */
(function () {
  'use strict';

  var KEY = 'theme';
  var ORDER = ['auto', 'light', 'dark'];
  var root = document.documentElement;
  var button = document.getElementById('theme-toggle');
  if (!button) return;

  function current() {
    var t = root.getAttribute('data-theme');
    return t === 'light' || t === 'dark' ? t : 'auto';
  }

  function render(mode) {
    var label = button.getAttribute('data-label') + ': ' +
      button.getAttribute('data-' + mode);
    button.setAttribute('aria-label', label);
    button.setAttribute('title', label);
  }

  button.addEventListener('click', function () {
    var next = ORDER[(ORDER.indexOf(current()) + 1) % ORDER.length];
    if (next === 'auto') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', next);
    try {
      if (next === 'auto') localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, next);
    } catch (e) { /* not persisted; still applies to this page */ }
    render(next);
  });

  render(current());
})();
