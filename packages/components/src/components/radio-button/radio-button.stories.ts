import { boolean, modesDarkDefault, optionalAttribute } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { RadioButton } from "./radio-button";

const { scale, status } = ATTRIBUTES;

interface RadioButtonStoryArgs extends Pick<
  RadioButton,
  "checked" | "disabled" | "focused" | "label" | "labelText" | "required" | "scale" | "status" | "validationMessage"
> {
  hidden: boolean;
}

export default {
  title: "Components/Controls/Radio/Radio Button",
  args: {
    checked: false,
    disabled: false,
    hidden: false,
    focused: false,
    labelText: "Label text",
    required: false,
    scale: scale.defaultValue,
    label: "Radio Button",
    status: status.defaultValue,
    validationMessage: "",
  },
  argTypes: {
    scale: {
      options: scale.values,
      control: { type: "select" },
    },
    status: {
      options: status.values,
      control: { type: "select" },
    },
  },
};

export const simple = (args: RadioButtonStoryArgs): string => html`
  <calcite-radio-button
    ${boolean("checked", args.checked)}
    ${boolean("disabled", args.disabled)}
    ${boolean("hidden", args.hidden)}
    ${boolean("focused", args.focused)}
    ${optionalAttribute("label-text", args.labelText)}
    name="simple"
    ${boolean("required", args.required)}
    scale="${args.scale}"
    status="${args.status}"
    validation-message="${args.validationMessage}"
    value="value"
  ></calcite-radio-button>
`;

export const darkModeRTL = (): string => html`
  <calcite-label layout="inline" class="calcite-mode-dark" dir="rtl">
    <calcite-radio-button name="dark" scale="m" value="value"> </calcite-radio-button>
    Radio Button
  </calcite-label>
`;

darkModeRTL.parameters = { themes: modesDarkDefault };

export const disabled = (): string => html`<calcite-radio-button checked disabled></calcite-radio-button>`;
