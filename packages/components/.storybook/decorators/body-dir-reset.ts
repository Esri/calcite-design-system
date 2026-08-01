import type { Decorator } from "@storybook/html";

/**
 * Ensures that the `dir` attribute on the body is always reset between stories.
 * Some stories may set it to "rtl" for testing purposes.
 */
export const bodyDirReset: Decorator = (story) => {
  document.body.removeAttribute("dir");
  return story();
};
