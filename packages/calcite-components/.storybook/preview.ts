import { themeDecorator } from "./utils";

declare global {
  interface Window {}
}

export const decorators = [themeDecorator];

export const parameters = {
  a11y: {
    element: "#root",
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
