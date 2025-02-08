import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { Progress } from "./progress";

const { determinateType } = ATTRIBUTES;

type ProgressStoryArgs = Pick<Progress, "type" | "value" | "text">;

export default {
  title: "Components/Progress",
  args: {
    type: determinateType.defaultValue,
    value: 80,
    text: "",
  },
  argTypes: {
    type: {
      options: determinateType.values,
      control: { type: "select" },
    },
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
  },
};

export const simple = (args: ProgressStoryArgs): string => html`
  <calcite-progress type="${args.type}" value="${args.value}" text="${args.text}"></calcite-progress>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-progress
    class="calcite-mode-dark"
    type="determinate"
    value="20"
    text="% Complete (optional text)"
  ></calcite-progress>
`;

darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };
