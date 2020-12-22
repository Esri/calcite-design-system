import { boolean, select, text } from "@storybook/addon-knobs";
import { createComponentHTML as create, darkBackground, AttributeMap } from "../../../.storybook/utils";
import colorReadme from "./readme.md";
import swatchReadme from "../calcite-color-swatch/readme.md";
import hexInputReadme from "../calcite-color-hex-input/readme.md";
import { ATTRIBUTES } from "../../../.storybook/resources";

export default {
  title: "Components/Color",

  parameters: {
    notes: [colorReadme, hexInputReadme, swatchReadme]
  }
};

const createAttributeMap = (): AttributeMap => {
  const { dir, scale } = ATTRIBUTES;

  return {
    dir: () => select("dir", dir.values, dir.defaultValue),
    "hide-channels": () => boolean("hide-channels", false),
    "hide-hex": () => boolean("hide-hex", false),
    "hide-saved": () => boolean("hide-saved", false),
    scale: () => select("scale", scale.values, scale.defaultValue)
  };
};

const createValueOverride = (): AttributeMap => ({
  value: () => text("value", "#b33f33")
});

export const Simple = (): string =>
  create("calcite-color", { map: createAttributeMap(), overrides: createValueOverride() });

export const DarkMode = (): string =>
  create("calcite-color", {
    map: createAttributeMap(),
    overrides: {
      theme: () => "dark",
      ...createValueOverride()
    }
  });

DarkMode.story = {
  parameters: { backgrounds: darkBackground }
};

export const AllowingEmpty = (): string =>
  create("calcite-color", {
    map: createAttributeMap(),
    overrides: {
      "allow-empty": () => true,
      value: () => text("value", "")
    }
  });
