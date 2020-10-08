import { storiesOf } from "@storybook/html";
import { select } from "@storybook/addon-knobs";
import { boolean } from "../../../.storybook/helpers";
import { darkBackground } from "../../../.storybook/utils";
import readme from "./readme.md";

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

storiesOf("Components/Tree", module)
  .addParameters({ notes: readme })
  .add(
    "Simple",
    (): string => `
    <calcite-tree
      ${boolean("lines", false)}
      selection-mode="${select("selection-mode", ["single", "multi", "children", "multi-children"], "single")}"
      size="${select("size", ["s", "m"], "m")}"
    >
      ${treeItems}
    </calcite-tree>
  `
  )
  .add(
    "Dark mode",
    (): string => `
    <calcite-tree
      theme="dark"
      ${boolean("lines", false)}
      selection-mode="${select("selection-mode", ["single", "multi", "children", "multi-children"], "single")}"
      size="${select("size", ["s", "m"], "m")}"
    >
      ${treeItems}
    </calcite-tree>
  `,
    { backgrounds: darkBackground }
  );
