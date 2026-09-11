/* Screenshot zoom.
 *
 * Deliberately the same technique as the expert Lightbox plugin this site
 * advertises: a native <dialog>, so Esc, the backdrop, focus trapping and
 * focus return come from the browser rather than from us. No library.
 *
 * Degrades honestly: without <dialog> support the buttons do nothing visible
 * and the inline screenshot is still there at full width.
 */
(function () {
  'use strict';

  var dialog = document.getElementById('shot-zoom');
  if (!dialog || typeof dialog.showModal !== 'function') return;

  var slot = document.getElementById('shot-zoom-slot');
  var cap = document.getElementById('shot-zoom-cap');

  // Created here rather than sitting in the markup with an empty src, which is
  // invalid HTML and fails the build's link check.
  var img = document.createElement('img');
  img.id = 'shot-zoom-img';
  slot.appendChild(img);
  var buttons = Array.prototype.slice.call(document.querySelectorAll('.shot__btn[data-zoom-src]'));
  if (!buttons.length) return;

  var index = -1;

  function show(i) {
    if (i < 0 || i >= buttons.length) return;
    index = i;
    var btn = buttons[i];
    img.src = btn.getAttribute('data-zoom-src');
    img.alt = btn.getAttribute('data-zoom-cap') || '';
    cap.textContent = btn.getAttribute('data-zoom-cap') || '';
  }

  buttons.forEach(function (btn, i) {
    btn.addEventListener('click', function () {
      show(i);
      if (!dialog.open) dialog.showModal();
    });
  });

  // Arrow keys step through every screenshot on the page, in document order.
  dialog.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); show(Math.min(index + 1, buttons.length - 1)); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); show(Math.max(index - 1, 0)); }
  });

  // A click on the backdrop lands on the dialog itself, never on its children.
  dialog.addEventListener('click', function (e) {
    if (e.target === dialog) dialog.close();
  });

  // Drop the large source on close so a long session does not hold every
  // full-resolution screenshot in memory.
  dialog.addEventListener('close', function () {
    img.removeAttribute('src');
    cap.textContent = '';
  });
})();
