import { boolean, select, text } from "@storybook/addon-knobs";
import { createComponentHTML as create, darkBackground, AttributeMap } from "../../../.storybook/utils";
import readme from "./readme.md";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { ICONS } from "./resources";
const { appearance, dir, scale, theme } = ATTRIBUTES;

export default {
  title: "Components/FAB",
  parameters: {
    backgrounds: darkBackground,
    notes: readme
  }
};

const createAttributeMap = (): AttributeMap => ({
  appearance: () => select("appearance", appearance.values, appearance.values[2]),
  dir: () => select("dir", dir.values, dir.defaultValue),
  disabled: () => boolean("disabled", false),
  icon: () => text("icon", ICONS.plus),
  label: () => text("label", "Label"),
  loading: () => boolean("loading", false),
  text: () => text("text", "Text"),
  "text-enabled": () => boolean("textEnabled", false),
  scale: () => select("scale", scale.values, scale.defaultValue),
  theme: () => select("theme", theme.values, theme.defaultValue)
});

export const basic = (): string => create("calcite-fab", createAttributeMap());
