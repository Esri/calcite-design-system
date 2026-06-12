import { boolean } from "../../../.storybook/utils";
import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { Progress } from "./progress";

const { determinateType } = ATTRIBUTES;

type ProgressStoryArgs = Pick<Progress, "reversed" | "text" | "type" | "value">;

export default {
  title: "Components/Progress",
  args: {
    reversed: false,
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
  <calcite-progress
    ${boolean("reversed", args.reversed)}
    type="${args.type}"
    value="${args.value}"
    text="${args.text}"
  ></calcite-progress>
`;

export const darkModeRTL = (): string => html`
  <calcite-progress
    class="calcite-mode-dark"
    type="determinate"
    value="20"
    text="% Complete (optional text)"
  ></calcite-progress>
`;

darkModeRTL.parameters = { themes: modesDarkDefault };
