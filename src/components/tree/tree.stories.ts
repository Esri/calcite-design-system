import { select } from "@storybook/addon-knobs";
import { boolean, storyFilters } from "../../../.storybook/helpers";
import { themesDarkDefault } from "../../../.storybook/utils";
import readme from "./readme.md";
import treeItemReadme from "../tree-item/readme.md";
import { html } from "../../../support/formatting";

const treeItems = `
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

const slottedDropdown = `
<calcite-dropdown slot="actions-end">
  <calcite-action slot='dropdown-trigger' icon='ellipsis'></calcite-action>
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

export const actionsEndSlottedDropdown = (): string => html`<calcite-tree
  ${boolean("lines", false)}
  selection-mode="${select("selection-mode", selectionModes, "none")}"
>
  <calcite-tree-item>
    <a>Child 1</a>
    ${slottedDropdown}
  </calcite-tree-item>
  <calcite-tree-item>
    <a>Child 2</a>
    <calcite-tree slot="children">
      <calcite-tree-item>
        <a>Grandchild 1</a>
        ${slottedDropdown}
      </calcite-tree-item>
      <calcite-tree-item>
        <a>Grandchild 2</a>
        <calcite-tree slot="children">
          <calcite-tree-item>
            <a>Great-Grandchild 1</a>
            ${slottedDropdown}
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
  </calcite-tree-item>
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
