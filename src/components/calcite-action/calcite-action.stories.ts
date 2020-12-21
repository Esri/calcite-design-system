import { boolean, select, text } from "@storybook/addon-knobs";
import { AttributeMap, createComponentHTML as create, darkBackground } from "../../../.storybook/utils";
import readme from "./readme.md";
import { ATTRIBUTES } from "../../../.storybook/resources";
const { appearance, dir, scale, theme } = ATTRIBUTES;

export default {
  title: "App Components/Action",
  parameters: {
    backgrounds: darkBackground,
    notes: readme
  }
};

const createAttributeMap = (): AttributeMap => ({
  appearance: () => select("appearance", appearance.values, appearance.defaultValue),
  active: () => boolean("active", false),
  dir: () => select("dir", dir.values, dir.defaultValue),
  disabled: () => boolean("disabled", false),
  icon: () => text("icon", "beaker"),
  indicator: () => boolean("indicator", false),
  label: () => text("label", "Label"),
  loading: () => boolean("loading", false),
  scale: () => select("scale", scale.values, scale.defaultValue),
  text: () => text("text", "Text"),
  "text-enabled": () => boolean("textEnabled", false),
  theme: () => select("theme", theme.values, theme.defaultValue)
});

export const basic = (): string => create("calcite-action", createAttributeMap());
