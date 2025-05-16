import { Preview } from "@storybook/html";
import { themeDecorator } from "./utils";

const preview: Preview = {
  decorators: [themeDecorator],
  parameters: {
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
      delay: 250,
      // https://www.chromatic.com/docs/threshold
      diffThreshold: Number(process.env.CHROMATIC_DIFF_THRESHOLD) || 0.15,
    },
  },
};

export default preview;
