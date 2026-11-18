/*
  Timeline page helpers. Without this file the timeline still works: it is a
  plain list you can scroll and tab through. This adds:
    - Earlier / Later buttons
    - a slim bar under the timeline that you can drag (or click) to move along it
    - a keyboard stop on the scroll area only when it really scrolls sideways
  The bar is a mouse and touch extra. Keyboard and screen reader users have the
  buttons, the arrow keys, and tabbing through the chairs, so the bar is hidden
  from assistive technology.
*/
(function () {
  var scroller = document.querySelector('.scroller');
  var tools = document.querySelector('.timeline-tools');
  var track = document.querySelector('.tl-track');
  var thumb = track && track.querySelector('.tl-thumb');
  if (!scroller || !tools) return;

  /* No smooth scrolling if the system asks for less motion, or in accessibility mode. */
  function reduceMotion() {
    return (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) ||
      document.documentElement.getAttribute('data-a11y') === 'on';
  }

  function maxScroll() {
    return scroller.scrollWidth - scroller.clientWidth;
  }

  function scrollByPage(direction) {
    scroller.scrollBy({
      left: direction * Math.round(scroller.clientWidth * 0.8),
      behavior: reduceMotion() ? 'auto' : 'smooth'
    });
  }

  tools.hidden = false;
  tools.querySelectorAll('.tl-btn').forEach(function (button) {
    button.addEventListener('click', function () {
      scrollByPage(Number(button.getAttribute('data-dir')));
    });
  });

  /* ----- the draggable bar ----- */

  function travel() {
    return track.clientWidth - thumb.offsetWidth;
  }

  function layoutBar() {
    if (!track) return;
    var max = maxScroll();
    track.hidden = false; /* show first so the phone layout's own "display: none" can be detected */
    if (max <= 1 || getComputedStyle(track).display === 'none') {
      track.hidden = true;
      return;
    }
    var ratio = scroller.clientWidth / scroller.scrollWidth;
    var width = Math.max(56, Math.round(track.clientWidth * ratio));
    thumb.style.width = width + 'px';
    var x = Math.round(travel() * (scroller.scrollLeft / max));
    thumb.style.transform = 'translateX(' + x + 'px)';
  }

  function setupDrag() {
    if (!track || !thumb) return;

    var startX = 0;
    var startScroll = 0;
    var dragging = false;

    thumb.addEventListener('pointerdown', function (e) {
      if (e.button !== undefined && e.button !== 0) return;
      e.preventDefault();
      e.stopPropagation();
      dragging = true;
      startX = e.clientX;
      startScroll = scroller.scrollLeft;
      thumb.setPointerCapture(e.pointerId);
      track.classList.add('is-dragging');
    });

    thumb.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var room = travel();
      if (room <= 0) return;
      scroller.scrollLeft = startScroll + (e.clientX - startX) * (maxScroll() / room);
    });

    function stop(e) {
      if (!dragging) return;
      dragging = false;
      track.classList.remove('is-dragging');
      if (thumb.hasPointerCapture && thumb.hasPointerCapture(e.pointerId)) {
        thumb.releasePointerCapture(e.pointerId);
      }
    }
    thumb.addEventListener('pointerup', stop);
    thumb.addEventListener('pointercancel', stop);

    /* Clicking the empty part of the track jumps there. */
    track.addEventListener('pointerdown', function (e) {
      if (e.target !== track) return;
      if (e.button !== undefined && e.button !== 0) return;
      var rect = track.getBoundingClientRect();
      var room = travel();
      if (room <= 0) return;
      var position = (e.clientX - rect.left - thumb.offsetWidth / 2) / room;
      position = Math.min(1, Math.max(0, position));
      scroller.scrollTo({
        left: position * maxScroll(),
        behavior: reduceMotion() ? 'auto' : 'smooth'
      });
    });
  }

  /* ----- keyboard stop only when the area scrolls ----- */

  function update() {
    var scrolls = scroller.scrollWidth > scroller.clientWidth + 1;
    if (scrolls) {
      scroller.setAttribute('tabindex', '0');
    } else {
      scroller.removeAttribute('tabindex');
    }
    layoutBar();
  }

  setupDrag();
  scroller.addEventListener('scroll', layoutBar, { passive: true });
  window.addEventListener('resize', update);
  window.addEventListener('a11y-change', update);
  window.addEventListener('load', update);
  update();
})();
