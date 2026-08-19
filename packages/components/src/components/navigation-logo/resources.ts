import type { NavigationLogo } from "./navigation-logo";

export const CSS = {
  container: "container",
  containerLink: "container--link",
  textContainer: "text-container",
  heading: "heading",
  description: "description",
  image: "image",
  standalone: "standalone",
  icon: "icon",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isNavigationLogo(el: Element | null | EventTarget): el is NavigationLogo["el"] {
  return (el as Element | null)?.tagName === "CALCITE-NAVIGATION-LOGO";
}
