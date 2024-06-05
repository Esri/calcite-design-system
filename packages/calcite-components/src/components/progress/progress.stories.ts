import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
const { determinateType } = ATTRIBUTES;

interface ProgressArgs {
  type: string;
  value: number;
  text: string;
}

export default {
  title: "Components/Progress",
  args: {
    type: determinateType.defaultValue,
    value: 0.8,
    text: "",
  },
  argTypes: {
    type: {
      options: determinateType.values,
      control: { type: "select" },
    },
    value: {
      control: { type: "range", min: 0, max: 1, step: 0.01 },
    },
  },
};

export const simple = (args: ProgressArgs): string => html`
  <calcite-progress type="${args.type}" value="${args.value}" text="${args.text}"></calcite-progress>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-progress
    class="calcite-mode-dark"
    type="determinate"
    value="0.2"
    text="% Complete (optional text)"
  ></calcite-progress>
`;

darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };
