import type { Navigation } from "./navigation";

export const CSS = {
  container: "container",
  containerContent: "container-content",
  hasProgress: "progress-bar",
  hide: "hide",
  primary: "primary",
  secondary: "secondary",
  tertiary: "tertiary",
};

export const SLOTS = {
  logo: "logo",
  user: "user",
  progress: "progress",
  navigationAction: "navigation-action",
  contentStart: "content-start",
  contentEnd: "content-end",
  contentCenter: "content-center",
  navSecondary: "navigation-secondary",
  navTertiary: "navigation-tertiary",
};

export const ICONS = {
  hamburger: "hamburger",
} as const;

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isNavigation(el: Element | null | EventTarget): el is Navigation["el"] {
  return (el as Element | null)?.tagName === "CALCITE-NAVIGATION";
}
