import { select } from "@storybook/addon-knobs";
import { boolean } from "../../../.storybook/helpers";
import { darkBackground } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../tests/utils";

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

export default {
  title: "Components/Tree",

  parameters: {
    notes: readme
  }
};

export const Simple = (): string => html`
  <calcite-tree
    ${boolean("lines", false)}
    selection-mode="${select("selection-mode", ["single", "multi", "children", "multi-children"], "single")}"
    size="${select("size", ["s", "m"], "m")}"
    ${boolean("input-enabled", false)}
  >
    ${treeItems}
  </calcite-tree>
`;

export const DarkMode = (): string => html`
  <calcite-tree
    theme="dark"
    ${boolean("lines", false)}
    selection-mode="${select("selection-mode", ["single", "multi", "children", "multi-children"], "single")}"
    size="${select("size", ["s", "m"], "m")}"
    ${boolean("input-enabled", false)}
  >
    ${treeItems}
  </calcite-tree>
`;

DarkMode.story = {
  name: "Dark mode",
  parameters: { backgrounds: darkBackground }
};
