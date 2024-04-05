import { boolean, select, text } from "../../../.storybook/fake-knobs";
import {
  Attribute,
  filterComponentAttributes,
  Attributes,
  createComponentHTML as create,
  modesDarkDefault,
} from "../../../.storybook/utils";

import { ATTRIBUTES } from "../../../.storybook/resources";
import { html } from "../../../support/formatting";

export default {
  title: "Components/Controls/ColorPicker",
};

const createColorAttributes: (options?: { exceptions: string[] }) => Attributes = (
  { exceptions } = { exceptions: [] },
) => {
  const { scale } = ATTRIBUTES;

  return filterComponentAttributes(
    [
      {
        name: "channels-disabled",
        commit(): Attribute {
          this.value = boolean("channels-disabled", false, "", "prop");
          delete this.build;
          return this;
        },
      },
      {
        name: "hex-disabled",
        commit(): Attribute {
          this.value = boolean("hex-disabled", false, "", "prop");
          delete this.build;
          return this;
        },
      },
      {
        name: "saved-disabled",
        commit(): Attribute {
          this.value = boolean("saved-disabled", false, "", "prop");
          delete this.build;
          return this;
        },
      },
      {
        name: "scale",
        commit(): Attribute {
          this.value = select("scale", scale.values, scale.defaultValue);
          delete this.build;
          return this;
        },
      },
    ],
    exceptions,
  );
};

export const simple = (): string =>
  create("calcite-color-picker", [
    {
      name: "clearable",
      value: boolean("clearable", false),
    },
    ...createColorAttributes(),
    {
      name: "value",
      value: text("value", "#b33f33"),
    },
  ]);

export const alphaChannel = (): string =>
  create("calcite-color-picker", [
    ...createColorAttributes(),
    { name: "alpha-channel", value: true },
    { name: "value", value: text("value", "#b33f3333") },
  ]);

export const disabled_TestOnly = (): string => html`<calcite-color-picker disabled></calcite-color-picker>`;

export const darkModeRTL_TestOnly = (): string =>
  create("calcite-color-picker", [
    ...createColorAttributes({ exceptions: ["dir"] }).concat({ name: "dir", value: "rtl" }),
    { name: "class", value: "calcite-mode-dark" },
    {
      name: "value",
      value: text("value", "#b33f33"),
    },
  ]);

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
