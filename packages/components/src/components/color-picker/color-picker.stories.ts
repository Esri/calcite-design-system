import { boolean, createBreakpointStories, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { ColorPicker } from "./color-picker";

const { scale } = ATTRIBUTES;

type ColorPickerStoryArgs = Pick<
  ColorPicker,
  "channelsDisabled" | "hexDisabled" | "savedDisabled" | "fieldDisabled" | "scale" | "clearable" | "value"
>;

export default {
  title: "Components/Controls/ColorPicker",
  args: {
    channelsDisabled: false,
    hexDisabled: false,
    savedDisabled: false,
    fieldDisabled: false,
    scale: scale.defaultValue,
    clearable: false,
    value: "#b33f33",
  },
  argTypes: {
    scale: {
      options: scale.values,
      control: { type: "select" },
    },
  },
};

export const simple = (args: ColorPickerStoryArgs): string => html`
  <calcite-color-picker
    ${boolean("channels-disabled", args.channelsDisabled)}
    ${boolean("hex-disabled", args.hexDisabled)}
    ${boolean("saved-disabled", args.savedDisabled)}
    scale="${args.scale}"
    ${boolean("clearable", args.clearable)}
    value="${args.value}"
    ${boolean("field-disabled", args.fieldDisabled)}
  ></calcite-color-picker>
`;

export const alphaChannelAllScales = (): string => html`
  <calcite-color-picker scale="s" alpha-channel value="#b33f3333"></calcite-color-picker>
  <calcite-color-picker scale="m" alpha-channel value="#b33f3333"></calcite-color-picker>
  <calcite-color-picker scale="l" alpha-channel value="#b33f3333"></calcite-color-picker>
`;

export const disabled_TestOnly = (): string => html`<calcite-color-picker disabled></calcite-color-picker>`;

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-color-picker scale="m" dir="rtl" class="calcite-mode-dark" value="#b33f33"></calcite-color-picker>
`;

darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };

export const thumbsOnEdgeDoNotOverflowContainer_TestOnly = (): string =>
  html`<div style="overflow: auto; width: 274px;">
    <calcite-color-picker value="#04006e"></calcite-color-picker>
  </div>`;

export const ArabicLocale_TestOnly = (): string => html`<calcite-color-picker lang="ar"></calcite-color-picker>`;

export const NorwegianLocale_TestOnly = (): string => html`<calcite-color-picker lang="no"></calcite-color-picker>`;

export const SpanishLocale_TestOnly = (): string => html`<calcite-color-picker lang="es"></calcite-color-picker>`;

export const JapaneseLocale_TestOnly = (): string => html`<calcite-color-picker lang="ja"></calcite-color-picker>`;

export const RussianLocale_TestOnly = (): string => html`<calcite-color-picker lang="ru"></calcite-color-picker>`;

export const ThaiLocale_TestOnly = (): string => html`<calcite-color-picker lang="th"></calcite-color-picker>`;

export const Focus_TestOnly = (): string =>
  html`<calcite-color-picker value="#97a7b0"></calcite-color-picker>
    <script>
      (async () => {
        await customElements.whenDefined("calcite-color-picker");
        const colorPicker = await document.querySelector("calcite-color-picker").componentOnReady();
        await colorPicker.setFocus();
      })();
    </script>`;

Focus_TestOnly.parameters = {
  chromatic: { delay: 2000 },
};

export const responsive = (): string =>
  createBreakpointStories(html`
    <style>
      .breakpoint-story-container {
        flex-wrap: wrap;
        gap: 10px;
      }
      .breakpoint-story-container > * {
        // we avoid full width to stay within Chromatic’s screenshot size limit
        width: 25%;
      }
    </style>
    <calcite-color-picker scale="{scale}"></calcite-color-picker>
    <calcite-color-picker alpha-channel scale="{scale}"></calcite-color-picker>
  `);
