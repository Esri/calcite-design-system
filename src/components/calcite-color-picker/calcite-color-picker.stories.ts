import { boolean, select, text } from "@storybook/addon-knobs";
import { Attributes, createComponentHTML as create, darkBackground } from "../../../.storybook/utils";
import colorReadme from "./readme.md";
import { ATTRIBUTES } from "../../../.storybook/resources";

export default {
  title: "Components/Controls/ColorPicker",

  parameters: {
    notes: colorReadme
  }
};

const createColorAttributes: () => Attributes = () => {
  const { dir, scale } = ATTRIBUTES;

  return [
    {
      name: "dir",
      value: select("dir", dir.values, dir.defaultValue)
    },
    {
      name: "hide-channels",
      value: boolean("hide-channels", false)
    },
    {
      name: "hide-hex",
      value: boolean("hide-hex", false)
    },
    {
      name: "hide-saved",
      value: boolean("hide-saved", false)
    },
    {
      name: "scale",
      value: select("scale", scale.values, scale.defaultValue)
    }
  ];
};

export const Simple = (): string =>
  create("calcite-color-picker", [
    ...createColorAttributes(),
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
