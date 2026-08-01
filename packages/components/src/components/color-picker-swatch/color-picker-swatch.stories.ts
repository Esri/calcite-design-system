import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { ColorPickerSwatch } from "./color-picker-swatch";

const { scale } = ATTRIBUTES;

type ColorPickerSwatchStoryArgs = Pick<ColorPickerSwatch, "active" | "color" | "scale">;

export default {
  title: "Components/Controls/ColorPicker/support/ColorPickerSwatch",
  args: {
    active: true,
    color: "#b33f33",
    scale: scale.defaultValue,
  },
  argTypes: {
    scale: {
      options: scale.values,
      control: { type: "select" },
    },
  },
};

export const simple = (args: ColorPickerSwatchStoryArgs): string => html`
  <calcite-color-picker-swatch
    ${boolean("active", args.active)}
    color="${args.color}"
    scale="${args.scale}"
  ></calcite-color-picker-swatch>
`;

export const active = (): string =>
  html`<calcite-color-picker-swatch active color="#c00f33"></calcite-color-picker-swatch>`;

export const emptyActive = (): string => html`<calcite-color-picker-swatch active></calcite-color-picker-swatch>`;

export const withAlpha = (): string =>
  html`<calcite-color-picker-swatch alpha-channel color="rgba(255, 0, 255, 0.5)"></calcite-color-picker-swatch>`;

export const withAlphaActive = (): string =>
  html`<calcite-color-picker-swatch active alpha-channel color="rgba(255, 0, 255, 0.5)"></calcite-color-picker-swatch>`;

export const darkModeRTL = (): string =>
  html`<calcite-color-picker-swatch value="#c00f33"></calcite-color-picker-swatch>`;
darkModeRTL.parameters = { themes: modesDarkDefault };
