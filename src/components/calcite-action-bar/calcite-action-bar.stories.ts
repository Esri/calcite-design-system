import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { withA11y } from "@storybook/addon-a11y";
import { Attributes, createComponentHTML as create, darkBackground, parseReadme } from "../../../.storybook/utils";
import readme from "./readme.md";
import { ATTRIBUTES } from "../../../.storybook/resources";
import dedent from "dedent";
const { dir, position, theme } = ATTRIBUTES;
import { TEXT } from "./resources";

export default {
  title: "app components|calcite-action-bar",
  decorators: [withKnobs, withA11y],
  parameters: {
    backgrounds: darkBackground,
    notes: parseReadme(readme)
  }
};

const createAttributes: () => Attributes = () => [
  {
    name: "expand",
    value: boolean("expand", true)
  },
  {
    name: "expanded",
    value: boolean("expanded", false)
  },
  {
    name: "dir",
    value: select("dir", dir.values, dir.defaultValue)
  },
  {
    name: "intl-expand",
    value: text("intlExpand", TEXT.expand)
  },
  {
    name: "intl-collapse",
    value: text("intlCollapse", TEXT.collapse)
  },
  {
    name: "position",
    value: select("position", position.values, position.defaultValue)
  },
  {
    name: "theme",
    value: select("theme", theme.values, theme.defaultValue)
  }
];

export const basic = (): string =>
  create(
    "calcite-action-bar",
    createAttributes(),
    dedent`
    <calcite-action-group>
      <calcite-action text="Add" label="Add Item" icon="plus"></calcite-action>
      <calcite-action text="Save" label="Save Item" icon="save"></calcite-action>
    </calcite-action-group>
    <calcite-action-group>
      <calcite-action text="Layers" label="View Layers" icon="layers"></calcite-action>
    </calcite-action-group>
  `
  );

export const withTooltip = (): DocumentFragment => {
  const action = document.createElement("calcite-action");
  action.text = "Add";
  action.icon = "plus";

  const tooltip = document.createElement("calcite-tooltip");
  tooltip.innerText = "Expand";

  const actionBar = document.createElement("calcite-action-bar");
  actionBar.tooltipExpand = tooltip;

  actionBar.append(action);

  const fragment = document.createDocumentFragment();

  fragment.append(actionBar);
  fragment.append(tooltip);

  return fragment;
};
