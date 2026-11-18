/*
  Touch-and-hold preview. On phones there is no hover, so holding a tile for a
  moment shows its preview. A quick tap still follows the link. Mouse and
  keyboard users get the preview from CSS (hover and focus), so this file is
  only an extra for touch.
*/
(function () {
  var HOLD_MS = 450;
  var touchOnly = window.matchMedia && window.matchMedia('(hover: none)').matches;

  document.querySelectorAll('.grid li').forEach(function (item) {
    var link = item.querySelector('a.tile');
    if (!link) return;

    var timer = null;
    var held = false;

    function stop() {
      if (timer) { clearTimeout(timer); timer = null; }
    }

    link.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'touch') return;
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
      if (touchOnly) e.preventDefault();
    });
  });
})();
