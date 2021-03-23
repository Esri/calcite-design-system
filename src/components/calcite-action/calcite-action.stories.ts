import { boolean, select, text } from "@storybook/addon-knobs";
import { Attributes, createComponentHTML as create, darkBackground } from "../../../.storybook/utils";
import readme from "./readme.md";
import { ATTRIBUTES } from "../../../.storybook/resources";
const { appearance, dir, scale, theme } = ATTRIBUTES;

export default {
  title: "Components/Buttons/Action",
  parameters: {
    backgrounds: darkBackground,
    notes: readme
  }
};

const createAttributes: () => Attributes = () => [
  {
    name: "appearance",
    value: select("appearance", appearance.values, appearance.defaultValue)
  },
  {
    name: "active",
    value: boolean("active", false)
  },
  {
    name: "dir",
    value: select("dir", dir.values, dir.defaultValue)
  },
  {
    name: "disabled",
    value: boolean("disabled", false)
  },
  {
    name: "icon",
    value: text("icon", "beaker")
  },
  {
    name: "indicator",
    value: boolean("indicator", false)
  },
  {
    name: "label",
    value: text("label", "Label")
  },
  {
    name: "loading",
    value: boolean("loading", false)
  },
  {
    name: "scale",
    value: select("scale", scale.values, scale.defaultValue)
  },
  {
    name: "text",
    value: text("text", "Text")
  },
  {
    name: "text-enabled",
    value: boolean("textEnabled", false)
  },
  {
    name: "theme",
    value: select("theme", theme.values, theme.defaultValue)
  }
];

export const basic = (): string => create("calcite-action", createAttributes());
