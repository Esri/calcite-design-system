import { select } from "@storybook/addon-knobs";
import { iconNames, boolean, storyFilters } from "../../../.storybook/helpers";
import { themesDarkDefault } from "../../../.storybook/utils";
import readme from "./readme.md";
import treeItemReadme from "../tree-item/readme.md";
import { html } from "../../../support/formatting";

const treeItems = html`
  <calcite-tree-item>
    <a>Child 1</a>
  </calcite-tree-item>
  <calcite-tree-item>
    <a>Child 2</a>
    <calcite-tree slot="children">
      <calcite-tree-item>
        <a>Grandchild 1</a>
      </calcite-tree-item>
      <calcite-tree-item>
        <a>Grandchild 2</a>
        <calcite-tree slot="children">
          <calcite-tree-item>
            <a>Great-Grandchild 1</a>
          </calcite-tree-item>
          <calcite-tree-item>
            <a>Great-Grandchild 2</a>
          </calcite-tree-item>
        </calcite-tree>
      </calcite-tree-item>
    </calcite-tree>
  </calcite-tree-item>
  <calcite-tree-item>
    <a>Child 3</a>
    <calcite-tree slot="children">
      <calcite-tree-item>
        <a>Grandchild 1</a>
      </calcite-tree-item>
      <calcite-tree-item>
        <a>Grandchild 2</a>
      </calcite-tree-item>
    </calcite-tree>
  </calcite-tree-item>
`;

const slottedDropdown = html`
  <calcite-dropdown slot="actions-end">
    <calcite-action slot="trigger" icon="ellipsis"></calcite-action>
    <calcite-dropdown-group group-title="Settings" selection-mode="multi">
      <calcite-dropdown-item>Group elements</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Display mode" selection-mode="single">
      <calcite-dropdown-item selected>Row</calcite-dropdown-item>
      <calcite-dropdown-item>Column</calcite-dropdown-item>
      <calcite-dropdown-item>Tabs</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
`;

const treeItemsWithSlottedDropdownsAndIconStart = html` <calcite-tree-item
    icon-start="${select("icon-start", iconNames, "palette")}"
  >
    <a>Child 1</a>
    ${slottedDropdown} ${slottedDropdown}
  </calcite-tree-item>
  <calcite-tree-item>
    <a>Child 2</a>
    <calcite-tree slot="children">
      <calcite-tree-item>
        <a>Grandchild 1</a>
        ${slottedDropdown} ${slottedDropdown}
      </calcite-tree-item>
      <calcite-tree-item>
        <a>Grandchild 2</a>
        <calcite-tree slot="children">
          <calcite-tree-item icon-start="${select("icon-start", iconNames, "palette")}">
            <a>Great-Grandchild 1</a>
            ${slottedDropdown}
          </calcite-tree-item>
          <calcite-tree-item>
            <a>Great-Grandchild 2</a>
            ${slottedDropdown} ${slottedDropdown}
          </calcite-tree-item>
        </calcite-tree>
      </calcite-tree-item>
    </calcite-tree>
  </calcite-tree-item>
  <calcite-tree-item icon-start="${select("icon-start", iconNames, "palette")}">
    <a>Child 3</a>
    ${slottedDropdown}
    <calcite-tree slot="children">
      <calcite-tree-item>
        <a>Grandchild 1</a>
      </calcite-tree-item>
      <calcite-tree-item>
        <a>Grandchild 2</a>
        ${slottedDropdown}
      </calcite-tree-item>
    </calcite-tree>
  </calcite-tree-item>`;

export default {
  title: "Components/Tree",
  parameters: {
    notes: [readme, treeItemReadme]
  },
  ...storyFilters()
};

const selectionModes = ["single", "multi", "children", "multichildren", "ancestors", "none", "multiple"];

export const simple = (): string => html`
  <calcite-tree
    ${boolean("lines", false)}
    selection-mode="${select("selection-mode", selectionModes, "single")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
  >
    ${treeItems}
  </calcite-tree>
`;

export const iconStart_TestOnly = (): string => html` <calcite-tree icon-start="palette" scale="l">
  ${treeItems}
</calcite-tree>`;

export const actionsEndDropdownsAndIconStart_TestOnly = (): string => html` <calcite-tree style="width: 350px">
  ${treeItemsWithSlottedDropdownsAndIconStart}
</calcite-tree>`;

export const actionsEndDropdownsAndIconStart = (): string => html` <calcite-tree style="width: 350px">
  ${treeItemsWithSlottedDropdownsAndIconStart}
</calcite-tree>`;

export const darkThemeRTL_TestOnly = (): string => html`
  <calcite-tree
    class="calcite-theme-dark"
    dir="rtl"
    ${boolean("lines", false)}
    selection-mode="${select("selection-mode", selectionModes, "single")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
  >
    ${treeItems}
  </calcite-tree>
`;
darkThemeRTL_TestOnly.parameters = { themes: themesDarkDefault };
