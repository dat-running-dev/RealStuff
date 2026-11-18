/*
  Accessibility mode switch.
  Loaded in the <head> so the saved choice is applied before the page paints
  (no flash of the normal design). The mode is a data-a11y="on" attribute on
  <html>; styles.css does the rest. The choice is saved on this device.
  If the person has not chosen, it starts on when the system asks for more
  contrast.
*/
(function () {
  var KEY = 'chairGuideA11y';
  var root = document.documentElement;

  function read() {
    try { return window.localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function write(value) {
    try { window.localStorage.setItem(KEY, value); } catch (e) { /* storage blocked: the choice just won't be remembered */ }
  }

  var saved = read();
  var on = saved === 'on' ||
    (saved === null && window.matchMedia && window.matchMedia('(prefers-contrast: more)').matches);

  function apply() {
    if (on) { root.setAttribute('data-a11y', 'on'); }
    else { root.removeAttribute('data-a11y'); }
  }
  apply();

  document.addEventListener('DOMContentLoaded', function () {
    var button = document.querySelector('.a11y-toggle');
    if (!button) return;
    var state = button.querySelector('.state');

    function sync() {
      button.setAttribute('aria-pressed', on ? 'true' : 'false');
      if (state) { state.textContent = on ? 'on' : 'off'; }
    }

    button.hidden = false;
    document.querySelectorAll('.a11y-note').forEach(function (note) { note.hidden = false; });
    sync();

    button.addEventListener('click', function () {
      on = !on;
      apply();
      write(on ? 'on' : 'off');
      sync();
      window.dispatchEvent(new Event('a11y-change'));
    });
  });
})();
