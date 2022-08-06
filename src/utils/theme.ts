/**
 * Emits when the theme is dynamically toggled between light and dark on <body>.
 * This file is imported in Stencil's `globalScript` config option.
 *
 * @see {@link https://stenciljs.com/docs/config#globalscript Stencil's globalScript property}
 */
export default function (): void {
  const themeChangeDarkEvent = new CustomEvent("calciteThemeChange", { bubbles: true, detail: { theme: "dark" } });
  const themeChangeLightEvent = new CustomEvent("calciteThemeChange", { bubbles: true, detail: { theme: "light" } });

  // emits event when changing OS theme preferences
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) =>
      document.body.dispatchEvent(event.matches ? themeChangeDarkEvent : themeChangeLightEvent)
    );

  // emits event when toggling between theme classes
  new MutationObserver(() => {
    document.body.dispatchEvent(
      document.body.classList.contains("calcite-theme-dark") ||
        (document.body.classList.contains("calcite-theme-auto") &&
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
        ? themeChangeDarkEvent
        : themeChangeLightEvent
    );
  }).observe(document.body, {
    attributes: true,
    attributeFilter: ["class"]
  });
}
