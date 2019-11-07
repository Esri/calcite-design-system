import { storiesOf } from '@storybook/html';
import { withKnobs, select, boolean } from '@storybook/addon-knobs'
import { darkBackground, parseReadme } from '../../../.storybook/helpers';
import readme from './readme.md';
const notes = parseReadme(readme);
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
`

storiesOf('Tree', module)
  .addDecorator(withKnobs)
  .add('Simple', () => `
    <calcite-tree
      lines="${boolean("lines", false)}"
      selection-mode="${select("selection-mode", ["single", "multi", "children", "multi-children"], "single")}"
      size="${select("size", ["s", "m"], "m")}"
    >
      ${treeItems}
    </calcite-tree>
  `, { notes })
  .add('Dark mode', () => `
    <calcite-tree
      theme="dark"
      lines="${boolean("lines", false)}"
      selection-mode="${select("selection-mode", ["single", "multi", "children", "multi-children"], "single")}"
      size="${select("size", ["s", "m"], "m")}"
    >
      ${treeItems}
    </calcite-tree>
  `, { notes, backgrounds: darkBackground });
