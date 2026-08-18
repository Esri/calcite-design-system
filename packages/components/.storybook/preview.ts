import { theme } from "./decorators/theme";
import { bodyDirReset } from "./decorators/body-dir-reset";

export const decorators = [bodyDirReset, theme];

export const parameters = {
  a11y: {
    context: "#storybook-root",
    config: {},
    options: {},
    manual: false,
  },
  layout: "centered",
  options: {
    storySort: {
      order: ["Overview", "Components", "App Components"],
    },
  },
  chromatic: {
    // https://www.chromatic.com/docs/threshold
    diffThreshold: Number(process.env.CHROMATIC_DIFF_THRESHOLD) || 0.15,
  },
};
