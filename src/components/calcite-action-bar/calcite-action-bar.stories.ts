import { boolean, select, text } from "@storybook/addon-knobs";
import { Attributes, createComponentHTML as create, darkBackground } from "../../../.storybook/utils";
import readme from "./readme.md";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { html } from "../../tests/utils";
const { dir, position, theme } = ATTRIBUTES;
import { TEXT } from "./resources";

export default {
  title: "Components/Action Bar",
  parameters: {
    backgrounds: darkBackground,
    notes: readme
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
    html`
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
  tooltip.slot = "expand-tooltip";

  const actionBar = document.createElement("calcite-action-bar");
  actionBar.append(tooltip);
  actionBar.append(action);

  const fragment = document.createDocumentFragment();

  fragment.append(actionBar);

  return fragment;
};
