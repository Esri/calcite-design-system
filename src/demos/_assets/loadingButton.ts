// example for adding and removing loading state from button
function loadingButton(el: HTMLElement, duration: number): void {
  el.setAttribute("loading", "true");
  setTimeout(() => el.setAttribute("loading", "false"), duration);
}
