import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { Loader } from "./loader";
const { determinateType, scale } = ATTRIBUTES;

type LoaderStoryArgs = Pick<Loader, "type" | "scale" | "value">;

export default {
  title: "Components/Loader",
  args: {
    type: determinateType.values[1],
    scale: scale.defaultValue,
    value: 0,
  },
  argTypes: {
    type: {
      options: determinateType.values,
      control: { type: "select" },
    },
    scale: {
      options: scale.values,
      control: { type: "select" },
    },
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
  },
};

export const simple_TestOnly = (args: LoaderStoryArgs): string => html`
  <calcite-loader type="${args.type}" scale="${args.scale}" value="${args.value}" />
`;

export const inline_TestOnly = (): string => html`
  <div style="display: inline-flex;align-items: center;justify-content: center;width: 100%;">
  <calcite-loader
    scale="m"
    inline
  /></calcite-loader><span style="margin:0 10px">Next to some text</span>
  </div>
`;

export const determinate = (): string => html`
  <h1>determinate</h1>
  <calcite-loader type="determinate" value="50" /></calcite-loader>
  <h1>determinate-value</h1>
  <calcite-loader type="determinate-value" value="50" /></calcite-loader>
`;

export const customTheme_TestOnly = (): string => html`
  <calcite-loader
    type="indeterminate"
    scale="m"
    value="0"
    style="
    --calcite-color-brand: #50ba5f;
    --calcite-color-brand-hover: #1a6324;
    --calcite-color-brand-press: #338033;"
  />
`;
