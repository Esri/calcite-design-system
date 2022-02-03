`<calcite-tree>` can be used as a sidebar navigation tree with optional lines and different selection modes.

```html
<calcite-tree>
  <calcite-tree-item>
    <a href="#">Child 1</a>
    <calcite-tree slot="children">
      <calcite-tree-item>
        <a href="#">Grandchild 1</a>
      </calcite-tree-item>
      <calcite-tree-item>
        <a href="#">Grandchild 2</a>
      </calcite-tree-item>
    </calcite-tree>
  </calcite-tree-item>
</calcite-tree>
```
