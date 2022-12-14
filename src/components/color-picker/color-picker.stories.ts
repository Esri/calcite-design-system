import { boolean, select, text } from "@storybook/addon-knobs";
import {
  Attribute,
  filterComponentAttributes,
  Attributes,
  createComponentHTML as create,
  themesDarkDefault
} from "../../../.storybook/utils";
import colorReadme from "./readme.md";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { html } from "../../../support/formatting";
import { storyFilters } from "../../../.storybook/helpers";

export default {
  title: "Components/Controls/ColorPicker",
  parameters: {
    notes: colorReadme
  },
  ...storyFilters()
};

const createColorAttributes: (options?: { exceptions: string[] }) => Attributes = (
  { exceptions } = { exceptions: [] }
) => {
  const { scale } = ATTRIBUTES;

  return filterComponentAttributes(
    [
      {
        name: "hide-channels",
        commit(): Attribute {
          this.value = boolean("hide-channels", false);
          delete this.build;
          return this;
        }
      },
      {
        name: "hide-hex",
        commit(): Attribute {
          this.value = boolean("hide-hex", false);
          delete this.build;
          return this;
        }
      },
      {
        name: "hide-saved",
        commit(): Attribute {
          this.value = boolean("hide-saved", false);
          delete this.build;
          return this;
        }
      },
      {
        name: "scale",
        commit(): Attribute {
          this.value = select("scale", scale.values, scale.defaultValue);
          delete this.build;
          return this;
        }
      }
    ],
    exceptions
  );
};

export const simple = (): string =>
  create("calcite-color-picker", [
    {
      name: "allow-empty",
      value: boolean("allow-empty", false)
    },
    ...createColorAttributes(),
    {
      name: "value",
      value: text("value", "#b33f33")
    }
  ]);

export const disabled_TestOnly = (): string => html`<calcite-color-picker disabled></calcite-color-picker>`;

export const darkThemeRTL_TestOnly = (): string =>
  create("calcite-color-picker", [
    ...createColorAttributes({ exceptions: ["dir"] }).concat({ name: "dir", value: "rtl" }),
    { name: "class", value: "calcite-theme-dark" },
    {
      name: "value",
      value: text("value", "#b33f33")
    }
  ]);

darkThemeRTL_TestOnly.parameters = { themes: themesDarkDefault };

export const thumbsOnEdgeDoNotOverflowContainer_TestOnly = (): string => html`<div
  style="overflow: auto; width: 274px;"
>
  <calcite-color-picker value="#04006e"></calcite-color-picker>
</div>`;

export const thumbsOnEdgeDoNotSnapToFrontOfContainer_TestOnly = (): string =>
  html`<calcite-color-picker value="#824142"></calcite-color-picker>`;
