import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { Checkbox } from "./checkbox";

const { scale, status } = ATTRIBUTES;

type CheckboxStoryArgs = Pick<Checkbox, "checked" | "disabled" | "indeterminate" | "scale" | "status" | "label">;

export default {
  title: "Components/Controls/Checkbox",
  args: {
    checked: true,
    disabled: false,
    indeterminate: false,
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

export const Simple = (args: CheckboxStoryArgs): string => html`
  <calcite-label layout="inline">
    <calcite-checkbox
      ${boolean("checked", args.checked)}
      ${boolean("disabled", args.disabled)}
      ${boolean("indeterminate", args.indeterminate)}
      scale="${args.scale}"
      status="${args.status}"
    ></calcite-checkbox>
    ${args.label}
  </calcite-label>
`;

export const Disabled = (): string => html`<calcite-checkbox checked disabled></calcite-checkbox>`;

export const DarkModeRTL = (): string => html`
  <calcite-label dir="rtl" layout="inline" class="calcite-mode-dark">
    <calcite-checkbox checked scale="m"></calcite-checkbox>
    Checkbox
  </calcite-label>
`;

DarkModeRTL.parameters = { themes: modesDarkDefault };
