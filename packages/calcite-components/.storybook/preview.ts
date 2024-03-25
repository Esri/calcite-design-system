import { Theme as Mode } from "storybook-addon-themes/dist/models/Theme";
import { withDirection } from "storybook-rtl-addon";
import { modes } from "./utils";

declare global {
  interface Window {}
}

const modeBodyClassDecorator = (Story: () => any, context: any) => {
  const modes = context.parameters.modes;

  modes?.list?.forEach((mode: Mode) => {
    const isDefault = mode.name === modes.default;
    if (Array.isArray(mode.class)) {
      mode.class.forEach((className) => document.body.classList.toggle(className, isDefault));
    } else {
      mode.class && document.body.classList.toggle(mode.class, isDefault);
    }
  });

  return Story();
};

export const decorators = [withDirection, modeBodyClassDecorator];
export const parameters = {
  a11y: {
    element: "#root",
    config: {},
    options: {},
    manual: false,
  },
  modes,
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
