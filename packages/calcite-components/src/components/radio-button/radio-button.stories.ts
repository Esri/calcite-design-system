import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { RadioButton } from "./radio-button";

const { scale } = ATTRIBUTES;

interface RadioButtonStoryArgs extends Pick<RadioButton, "checked" | "disabled" | "focused" | "scale" | "label"> {
  hidden: boolean;
}

export default {
  title: "Components/Controls/Radio/Radio Button",
  args: {
    checked: false,
    disabled: false,
    hidden: false,
    focused: false,
    scale: scale.defaultValue,
    label: "Radio Button",
  },
  argTypes: {
    scale: {
      options: scale.values,
      control: { type: "select" },
    },
  },
};

export const simple = (args: RadioButtonStoryArgs): string => html`
  <calcite-label layout="inline">
    <calcite-radio-button
      ${boolean("checked", args.checked)}
      ${boolean("disabled", args.disabled)}
      ${boolean("hidden", args.hidden)}
      ${boolean("focused", args.focused)}
      name="simple"
      scale="${args.scale}"
      value="value"
    ></calcite-radio-button>
    ${args.label}
  </calcite-label>
`;

export const internalLabel = (): string =>
  html`<calcite-radio-button scale="m" label-text="Label text"></calcite-radio-button>`;

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-label layout="inline" class="calcite-mode-dark" dir="rtl">
    <calcite-radio-button name="dark" scale="m" value="value"> </calcite-radio-button>
    Radio Button
  </calcite-label>
`;

darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };

export const disabled_TestOnly = (): string => html`<calcite-radio-button checked disabled></calcite-radio-button>`;
