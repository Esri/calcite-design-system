import { theme } from "./decorators/theme";
import { bodyDirReset } from "./decorators/body-dir-reset";
import type { Preview } from "@storybook/web-components-vite";
import { within as withinShadow } from "shadow-dom-testing-library";

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

const preview: Preview = {
  beforeEach({ canvasElement, canvas }) {
    Object.assign(canvas, { ...withinShadow(canvasElement) });
  },
};

export type ShadowQueries = ReturnType<typeof withinShadow>;
declare module "storybook/internal/csf" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Canvas extends ShadowQueries {}
}

export default preview;
