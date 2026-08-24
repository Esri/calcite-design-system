import { isTag } from "../resources";

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
export const isNavigationLogo = isTag("calcite-navigation-logo");
