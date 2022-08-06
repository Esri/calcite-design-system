import { autoTheme, darkTheme } from "./resources";

/**
 * Emits when the theme is dynamically toggled between light and dark on <body>.
 * This file is imported in Stencil's `globalScript` config option.
 *
 * @see {@link https://stenciljs.com/docs/config#globalscript Stencil's globalScript property}
 */
export default function (): void {
  const { classList } = document.body;
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  const getCurrentTheme = (): string =>
    classList.contains(darkTheme) || (classList.contains(autoTheme) && prefersDark) ? "dark" : "light";

  const emitThemeChange = (newTheme: string): void => {
    if (currentTheme !== newTheme) {
      document.body.dispatchEvent(
        new CustomEvent("calciteThemeChange", { bubbles: true, detail: { theme: newTheme } })
      );
    }
    currentTheme = newTheme;
  };

  let currentTheme = getCurrentTheme();

  // emits event on page load
  document.body.dispatchEvent(
    new CustomEvent("calciteThemeChange", { bubbles: true, detail: { theme: currentTheme } })
  );

  // emits event when changing OS theme preferences
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => emitThemeChange(event.matches ? "dark" : "light"));

  // emits event when toggling between theme classes on <body>
  new MutationObserver(() => emitThemeChange(getCurrentTheme())).observe(document.body, {
    attributes: true,
    attributeFilter: ["class"]
  });
}
