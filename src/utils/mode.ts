import { autoMode, darkMode } from "./resources";

/**
 * Emits when the theme is dynamically toggled between light and dark on <body> or in OS preferences.
 */
export function initModeChangeEvent(): void {
  const { classList } = document.body;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const getTheme = (): string =>
    classList.contains(darkMode) || (classList.contains(autoMode) && prefersDark) ? "dark" : "light";

  const emitModeChange = (theme: string) =>
    document.body.dispatchEvent(new CustomEvent("calciteModeChange", { bubbles: true, detail: { theme } }));

  const modeChangeHandler = (newTheme: string): void => {
    currentTheme !== newTheme && emitModeChange(newTheme);
    currentTheme = newTheme;
  };

  let currentTheme = getTheme();

  // emits event on page load
  emitModeChange(currentTheme);

  // emits event when changing OS theme preferences
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => modeChangeHandler(event.matches ? "dark" : "light"));

  // emits event when toggling between theme classes on <body>
  new MutationObserver(() => modeChangeHandler(getTheme())).observe(document.body, {
    attributes: true,
    attributeFilter: ["class"]
  });
}
