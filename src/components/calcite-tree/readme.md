# calcite-tree

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

<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                                                                  | Type                                                                                                                   | Default                    |
| --------------- | ---------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `lines`         | `lines`          | Display indentation guide lines                                              | `boolean`                                                                                                              | `false`                    |
| `scale`         | `scale`          | Specify the scale of the tree, defaults to m                                 | `"m" \| "s"`                                                                                                           | `"m"`                      |
| `selectionMode` | `selection-mode` | Customize how tree selection works (single, multi, children, multi-children) | `TreeSelectionMode.Children \| TreeSelectionMode.Multi \| TreeSelectionMode.MultiChildren \| TreeSelectionMode.Single` | `TreeSelectionMode.Single` |
| `theme`         | `theme`          | Select theme (light or dark)                                                 | `"dark" \| "light"`                                                                                                    | `undefined`                |


## Events

| Event               | Description | Type                            |
| ------------------- | ----------- | ------------------------------- |
| `calciteTreeSelect` |             | `CustomEvent<TreeSelectDetail>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
