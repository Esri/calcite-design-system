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

export const simple = (args: CheckboxStoryArgs): string => html`
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

export const internalLabel = (): string =>
  html`<calcite-checkbox name="m-unchecked" scale="m" label-text="Label text" required></calcite-checkbox>`;

export const disabled_TestOnly = (): string => html`<calcite-checkbox checked disabled></calcite-checkbox>`;

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-label dir="rtl" layout="inline" class="calcite-mode-dark">
    <calcite-checkbox checked scale="m"></calcite-checkbox>
    Checkbox
  </calcite-label>
`;

darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };
