import { boolean, select, text } from "@storybook/addon-knobs";
import { AttributeMap, createComponentHTML as create, darkBackground } from "../../../.storybook/utils";
import readme from "./readme.md";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { html } from "../../tests/utils";
const { dir, position, theme } = ATTRIBUTES;
import { TEXT } from "./resources";

export default {
  title: "App Components/Action Pad",
  parameters: {
    backgrounds: darkBackground,
    notes: readme
  }
};

const createAttributeMap = (): AttributeMap => ({
  dir: () => select("dir", dir.values, dir.defaultValue),
  expand: () => boolean("expand", true),
  expanded: () => boolean("expanded", false),
  position: () => select("position", position.values, position.defaultValue),
  "intl-expand": () => text("intlExpand", TEXT.expand),
  "intl-collapse": () => text("intlCollapse", TEXT.collapse),
  theme: () => select("theme", theme.values, theme.defaultValue)
});

export const basic = (): string =>
  create(
    "calcite-action-pad",
    createAttributeMap(),
    html`
      <calcite-action-group>
        <calcite-action text="Undo" label="Undo Action" icon="undo"></calcite-action>
        <calcite-action text="Redo" label="Redo Action" icon="redo"></calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Delete" label="Delete Item" icon="trash"></calcite-action>
      </calcite-action-group>
    `
  );

export const withTooltip = (): DocumentFragment => {
  const action = document.createElement("calcite-action");
  action.text = "Add";
  action.icon = "plus";

  const tooltip = document.createElement("calcite-tooltip");
  tooltip.innerText = "Expand";

  const actionPad = document.createElement("calcite-action-pad");
  actionPad.tooltipExpand = tooltip;

  actionPad.append(action);

  const fragment = document.createDocumentFragment();

  fragment.append(actionPad);
  fragment.append(tooltip);

  return fragment;
};
