// example for adding and removing loading state from button
function loadingButton(el, duration) {
  el.setAttribute("loading", true);
  setTimeout(function() {
    el.setAttribute("loading", false);
  }, duration);
}
