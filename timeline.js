/*
  Timeline helpers. Without this file the timeline still works: it is a plain
  list you can scroll and tab through. This adds:
    - drag the timeline sideways with the mouse (touch already scrolls it, and
      the keyboard has the arrow keys and tabbing through the chairs)
    - a keyboard stop on the scroll area only when it really scrolls sideways
*/
(function () {
  var scroller = document.querySelector('.scroller');
  if (!scroller) return;

  function canScroll() {
    return scroller.scrollWidth > scroller.clientWidth + 1;
  }

  function update() {
    var scrolls = canScroll();
    if (scrolls) {
      scroller.setAttribute('tabindex', '0');
    } else {
      scroller.removeAttribute('tabindex');
    }
    scroller.classList.toggle('can-drag', scrolls);
  }

  /* ----- drag with the mouse ----- */

  var THRESHOLD = 5;      /* pixels the mouse must move before it counts as a drag */
  var pressed = false;
  var dragging = false;
  var startX = 0;
  var startScroll = 0;
  var lastDragEnd = 0;

  scroller.addEventListener('pointerdown', function (e) {
    if (e.pointerType !== 'mouse' || e.button !== 0 || !canScroll()) return;
    pressed = true;
    dragging = false;
    startX = e.clientX;
    startScroll = scroller.scrollLeft;
  });

  window.addEventListener('pointermove', function (e) {
    if (!pressed) return;
    var dx = e.clientX - startX;
    if (!dragging && Math.abs(dx) > THRESHOLD) {
      dragging = true;
      scroller.classList.add('is-dragging');
    }
    if (dragging) {
      scroller.scrollLeft = startScroll - dx;
    }
  });

  function finish() {
    if (!pressed) return;
    pressed = false;
    if (dragging) lastDragEnd = Date.now();
    dragging = false;
    scroller.classList.remove('is-dragging');
  }
  window.addEventListener('pointerup', finish);
  window.addEventListener('pointercancel', finish);

  /* A drag that ends over a chair must not also open it. */
  scroller.addEventListener('click', function (e) {
    if (Date.now() - lastDragEnd < 150) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);

  /* Stop the browser's own link-dragging from taking over. */
  scroller.addEventListener('dragstart', function (e) { e.preventDefault(); });

  update();
  window.addEventListener('resize', update);
  window.addEventListener('load', update);
  window.addEventListener('a11y-change', update);
})();
