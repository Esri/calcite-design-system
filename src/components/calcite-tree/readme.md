# calcite-tree

Any further explanation or examples for your component can be written here above the auto-generated line. The content below the line should not be edited as it is generated from the component tsx file.

```html
<calcite-tree>
  <calcite-tree-item>
    <a href="#">Child 1</a>
    <calcite-tree slot="children">
      <calcite-tree-item>
        <a href="#">Grandchild 1</a>
      <calcite-tree-item>
      <calcite-tree-item>
        <a href="#">Grandchild 2</a>
      <calcite-tree-item>
    <calcite-tree>
  <calcite-tree-item>
</calcite-tree>
```

<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                                                                                                                                                                 | Type                                                                                                                                             | Default                  |
| --------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ |
| `lines`         | `lines`          | Be sure to add a jsdoc comment describing your propery for the generated readme file. If your property should be hidden from documentation, you can use the `@internal` tag | `boolean`                                                                                                                                        | `false`                  |
| `root`          | `root`           |                                                                                                                                                                             | `boolean`                                                                                                                                        | `true`                   |
| `selectionMode` | `selection-mode` |                                                                                                                                                                             | `TreeSelectionMode.Children \| TreeSelectionMode.Multi \| TreeSelectionMode.MultiChildren \| TreeSelectionMode.None \| TreeSelectionMode.Single` | `TreeSelectionMode.None` |
| `theme`         | `theme`          |                                                                                                                                                                             | `"dark" \| "light"`                                                                                                                              | `"light"`                |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
