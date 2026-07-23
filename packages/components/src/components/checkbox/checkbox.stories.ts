import { boolean, modesDarkDefault, optionalAttribute } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { Checkbox } from "./checkbox";

const { scale, status } = ATTRIBUTES;

type CheckboxStoryArgs = Pick<
  Checkbox,
  "checked" | "disabled" | "indeterminate" | "label" | "labelText" | "required" | "scale" | "status"
>;

export default {
  title: "Components/Controls/Checkbox",
  args: {
    checked: true,
    disabled: false,
    indeterminate: false,
    labelText: "Checkbox label text",
    required: false,
    scale: scale.defaultValue,
    status: status.defaultValue,
    label: "Checkbox",
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

export const simple = (args: CheckboxStoryArgs): string => html`
  <calcite-checkbox
    ${boolean("checked", args.checked)}
    ${boolean("disabled", args.disabled)}
    ${boolean("indeterminate", args.indeterminate)}
    ${optionalAttribute("label-text", args.labelText)}
    ${boolean("required", args.required)}
    scale="${args.scale}"
    status="${args.status}"
  ></calcite-checkbox>
`;

export const disabled = (): string => html`<calcite-checkbox checked disabled></calcite-checkbox>`;

export const darkModeRTL = (): string => html`
  <calcite-label dir="rtl" layout="inline" class="calcite-mode-dark">
    <calcite-checkbox checked scale="m"></calcite-checkbox>
    Checkbox
  </calcite-label>
`;

darkModeRTL.parameters = { themes: modesDarkDefault };
