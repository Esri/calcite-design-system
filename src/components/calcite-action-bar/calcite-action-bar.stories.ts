import { boolean, select, text } from "@storybook/addon-knobs";
import { AttributeMap, createComponentHTML as create, darkBackground } from "../../../.storybook/utils";
import readme from "./readme.md";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { html } from "../../tests/utils";
const { dir, position, theme } = ATTRIBUTES;
import { TEXT } from "./resources";

export default {
  title: "App Components/Action Bar",
  parameters: {
    backgrounds: darkBackground,
    notes: readme
  }
};

const createAttributeMap = (): AttributeMap => ({
  expand: () => boolean("expand", true),
  expanded: () => boolean("expanded", false),
  dir: () => select("dir", dir.values, dir.defaultValue),
  "intl-expand": () => text("intlExpand", TEXT.expand),
  "intl-collapse": () => text("intlCollapse", TEXT.collapse),
  position: () => select("position", position.values, position.defaultValue),
  theme: () => select("theme", theme.values, theme.defaultValue)
});

export const basic = (): string =>
  create(
    "calcite-action-bar",
    createAttributeMap(),
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

  const actionBar = document.createElement("calcite-action-bar");
  actionBar.tooltipExpand = tooltip;

  actionBar.append(action);

  const fragment = document.createDocumentFragment();

  fragment.append(actionBar);
  fragment.append(tooltip);

  return fragment;
};
