import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";

interface ColorPickerSwatchArgs {
  active: boolean;
  color: string;
}

export default {
  title: "Components/Controls/ColorPicker/support/ColorPickerSwatch",
  args: {
    active: true,
    color: "#b33f33",
  },
};

export const simple = (args: ColorPickerSwatchArgs): string => html`
  <calcite-color-picker-swatch ${boolean("active", args.active)} color="${args.color}"></calcite-color-picker-swatch>
`;

export const active_TestOnly = (): string =>
  html`<calcite-color-picker-swatch active color="#c00f33"></calcite-color-picker-swatch>`;

export const emptyActive_TestOnly = (): string =>
  html`<calcite-color-picker-swatch active></calcite-color-picker-swatch>`;

export const withAlpha_TestOnly = (): string =>
  html`<calcite-color-picker-swatch alpha-channel color="rgba(255, 0, 255, 0.5)"></calcite-color-picker-swatch>`;

export const withAlphaActive_TestOnly = (): string =>
  html`<calcite-color-picker-swatch active alpha-channel color="rgba(255, 0, 255, 0.5)"></calcite-color-picker-swatch>`;

export const darkModeRTL_TestOnly = (): string =>
  html`<calcite-color-picker-swatch value="#c00f33"></calcite-color-picker-swatch>`;
darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };
