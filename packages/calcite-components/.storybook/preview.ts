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
    disableSnapshot: true,
  },
  viewport: {
    viewports: {
      small: { name: "Small", styles: { width: "640px", height: "800px" } },
      large: { name: "Large", styles: { width: "1024px", height: "1000px" } },
    },
  },
  paddings: {
    values: [
      { name: "Small", value: "16px" },
      { name: "Medium", value: "32px" },
      { name: "Large", value: "64px" },
    ],
    default: "Large",
  },
};
