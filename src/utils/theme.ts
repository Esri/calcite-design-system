import { autoTheme, darkTheme } from "./resources";

/**
 * Emits when the theme is dynamically toggled between light and dark on <body> or in OS preferences.
 */
export function initThemeChangeEvent(): void {
  const { classList } = document.body;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const getTheme = (): string =>
    classList.contains(darkTheme) || (classList.contains(autoTheme) && prefersDark) ? "dark" : "light";

  const emitThemeChange = (theme: string) =>
    document.body.dispatchEvent(new CustomEvent("calciteThemeChange", { bubbles: true, detail: { theme } }));

  const themeChangeHandler = (newTheme: string): void => {
    currentTheme !== newTheme && emitThemeChange(newTheme);
    currentTheme = newTheme;
  };

  let currentTheme = getTheme();

  // emits event on page load
  emitThemeChange(currentTheme);

  // emits event when changing OS theme preferences
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => themeChangeHandler(event.matches ? "dark" : "light"));

  // emits event when toggling between theme classes on <body>
  new MutationObserver(() => themeChangeHandler(getTheme())).observe(document.body, {
    attributes: true,
    attributeFilter: ["class"]
  });
}
