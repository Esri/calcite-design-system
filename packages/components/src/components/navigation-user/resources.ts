import type { NavigationUser } from "./navigation-user";

export const CSS = {
  button: "button",
  fullName: "full-name",
  standalone: "standalone",
  textContainer: "text-container",
  username: "username",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isNavigationUser(el: Element | null | EventTarget): el is NavigationUser["el"] {
  return (el as Element | null)?.tagName === "CALCITE-NAVIGATION-USER";
}
