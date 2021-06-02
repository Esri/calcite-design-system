import { boolean, select, text } from "@storybook/addon-knobs";
import {
  Attribute,
  handleComponentAttributes,
  Attributes,
  createComponentHTML as create,
  darkBackground
} from "../../../.storybook/utils";
import colorReadme from "./readme.md";
import { ATTRIBUTES } from "../../../.storybook/resources";

export default {
  title: "Components/Controls/ColorPicker",

  parameters: {
    notes: colorReadme
  }
};

const createColorAttributes: (options?: { exceptions: string[] }) => Attributes = (
  { exceptions } = { exceptions: [] }
) => {
  const { dir, scale } = ATTRIBUTES;

  return handleComponentAttributes(
    [
      {
        name: "dir",
        commit(): Attribute {
          this.value = select("dir", dir.values, dir.defaultValue);
          delete this.build;
          return this;
        }
      },
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
    { name: "theme", value: "dark" },
    {
      name: "value",
      value: text("value", "#b33f33")
    }
  ]);

DarkMode.story = {
  parameters: { backgrounds: darkBackground }
};

export const AllowingEmpty = (): string =>
  create("calcite-color-picker", [
    ...createColorAttributes(),
    { name: "allow-empty", value: true },
    { name: "value", value: text("value", "") }
  ]);
