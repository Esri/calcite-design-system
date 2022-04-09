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
        name: "channels-disabled",
        commit(): Attribute {
          this.value = boolean("channels-disabled", false);
          delete this.build;
          return this;
        }
      },
      {
        name: "hex-disabled",
        commit(): Attribute {
          this.value = boolean("hex-disabled", false);
          delete this.build;
          return this;
        }
      },
      {
        name: "saved-disabled",
        commit(): Attribute {
          this.value = boolean("saved-disabled", false);
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

export const AlphaSupport = (): string =>
  create("calcite-color-picker", [
    ...createColorAttributes(),
    { name: "alpha-enabled", value: true },
    { name: "hide-opacity", value: boolean("hex-disabled", false) },
    { name: "value", value: text("value", "#b33f3333") }
  ]);

export const disabled = (): string => html`<calcite-color-picker disabled></calcite-color-picker>`;
