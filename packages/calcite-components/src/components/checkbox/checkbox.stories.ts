import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
const { scale, status } = ATTRIBUTES;

interface Args {
  scale: string;
  status: string;
  label: string;
}

export default {
  title: "Components/Controls/Checkbox",
  args: {
    label: "Checkbox",
    scale: scale.defaultValue,
    status: status.defaultValue,
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

export const simple = (args: Args): string => html`
  <calcite-label layout="inline">
    <calcite-checkbox checked scale="${args.scale}" status="${args.status}"></calcite-checkbox>
    ${args.label}
  </calcite-label>
`;

export const disabled_TestOnly = (): string => html`<calcite-checkbox checked disabled></calcite-checkbox>`;

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-label dir="rtl" layout="inline" class="calcite-mode-dark">
    <calcite-checkbox checked scale="m"></calcite-checkbox>
    Checkbox
  </calcite-label>
`;

darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };
