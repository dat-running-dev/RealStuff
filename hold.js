/*
  Previews for the chair tiles.
    - Mouse and keyboard: CSS shows the preview on hover and on focus.
    - Touch: there is no hover, so holding a tile for a moment shows it. A quick
      tap still follows the link. (This file is only an extra for touch.)
    - Escape closes a preview that is showing, without moving the pointer or the
      keyboard focus (WCAG 1.4.13, content on hover or focus).
    - In accessibility mode previews are always shown as plain text, so the hold
      gesture and the long-press menu block are both switched off there.
*/
(function () {
  var HOLD_MS = 450;
  var root = document.documentElement;
  var touchOnly = window.matchMedia && window.matchMedia('(hover: none)').matches;

  function accessibilityModeOn() {
    return root.getAttribute('data-a11y') === 'on';
  }

  var items = document.querySelectorAll('.grid li, .timeline li');

  items.forEach(function (item) {
    var link = item.querySelector('a.tile');
    if (!link) return;

    var timer = null;
    var held = false;

    function stop() {
      if (timer) { clearTimeout(timer); timer = null; }
    }

    link.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'touch' || accessibilityModeOn()) return;
      held = false;
      stop();
      timer = setTimeout(function () {
        held = true;
        item.classList.add('is-held');
      }, HOLD_MS);
    });

    ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (name) {
      link.addEventListener(name, function (e) {
        if (e.pointerType !== 'touch') return;
        stop();
        setTimeout(function () { item.classList.remove('is-held'); }, 120);
      });
    });

    /* After a hold, do not also follow the link. */
    link.addEventListener('click', function (e) {
      if (held) {
        e.preventDefault();
        held = false;
      }
    });

    /* Stop the phone's own long-press menu from covering the preview. */
    link.addEventListener('contextmenu', function (e) {
      if (touchOnly && !accessibilityModeOn()) e.preventDefault();
    });

    /* A preview closed with Escape stays closed until the pointer or the focus leaves. */
    function reopen() { item.classList.remove('peek-off'); }
    item.addEventListener('mouseleave', reopen);
    item.addEventListener('focusout', function (e) {
      if (!item.contains(e.relatedTarget)) reopen();
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.grid li, .timeline li').forEach(function (item) {
      if (item.matches(':hover, :focus-within, .is-held')) {
        item.classList.add('peek-off');
      }
    });
  });
})();
