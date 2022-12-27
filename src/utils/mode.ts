import { autoMode, darkMode } from "./resources";

/**
 * Emits when the mode is dynamically toggled between light and dark on <body> or in OS preferences.
 */
export function initModeChangeEvent(): void {
  const { classList } = document.body;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const getTheme = (): string =>
    classList.contains(darkMode) || (classList.contains(autoMode) && prefersDark) ? "dark" : "light";

  const emitModeChange = (mode: string) =>
    document.body.dispatchEvent(new CustomEvent("calciteModeChange", { bubbles: true, detail: { mode } }));

  const modeChangeHandler = (newMode: string): void => {
    currentTheme !== newMode && emitModeChange(newMode);
    currentTheme = newMode;
  };

  let currentTheme = getTheme();

  // emits event on page load
  emitModeChange(currentTheme);

  // emits event when changing OS mode preferences
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => modeChangeHandler(event.matches ? "dark" : "light"));

  // emits event when toggling between mode classes on <body>
  new MutationObserver(() => modeChangeHandler(getTheme())).observe(document.body, {
    attributes: true,
    attributeFilter: ["class"]
  });
}
