import { isTag } from "../resources";

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
export const isNavigationUser = isTag("calcite-navigation-user");
