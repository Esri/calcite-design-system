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

export default {
  title: "Components/Controls/ColorPicker",

  parameters: {
    notes: colorReadme
  }
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

export const Simple = (): string =>
  create("calcite-color-picker", [
    ...createColorAttributes(),
    {
      name: "value",
      value: text("value", "#b33f33")
    }
  ]);

export const RTL = (): string =>
  create("calcite-color-picker", [
    ...createColorAttributes({ exceptions: ["dir"] }).concat({ name: "dir", value: "rtl" }),
    {
      name: "value",
      value: text("value", "#b33f33")
    }
  ]);

export const DarkMode = (): string =>
  create("calcite-color-picker", [
    ...createColorAttributes(),
    { name: "class", value: "calcite-theme-dark" },
    {
      name: "value",
      value: text("value", "#b33f33")
    }
  ]);

DarkMode.parameters = { themes: themesDarkDefault };

export const AllowingEmpty = (): string =>
  create("calcite-color-picker", [
    ...createColorAttributes(),
    { name: "allow-empty", value: true },
    { name: "value", value: text("value", "") }
  ]);

export const disabled = (): string => html`<calcite-color-picker disabled></calcite-color-picker>`;

export const thumbsOnEdgeDoNotOverflowContainer = (): string => html`<div style="overflow: auto; width: 274px;">
  <calcite-color-picker value="#04006e"></calcite-color-picker>
</div>`;

export const thumbsOnEdgeDoNotSnapToFrontOfContainer = (): string => html`<div style="overflow: auto; width: 272px;">
  <calcite-color-picker value="#824142"></calcite-color-picker>
</div>`;
