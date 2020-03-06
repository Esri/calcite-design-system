# calcite-tree

`<calcite-tree>` can be used as a sidebar navigation tree with optional lines and different selection modes.

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

| Property        | Attribute        | Description                                                                                                                                                                 | Type                                                                                                                   | Default                    |
| --------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `lines`         | `lines`          | Be sure to add a jsdoc comment describing your propery for the generated readme file. If your property should be hidden from documentation, you can use the `@internal` tag | `boolean`                                                                                                              | `false`                    |
| `root`          | `root`           |                                                                                                                                                                             | `boolean`                                                                                                              | `true`                     |
| `selectionMode` | `selection-mode` |                                                                                                                                                                             | `TreeSelectionMode.Children \| TreeSelectionMode.Multi \| TreeSelectionMode.MultiChildren \| TreeSelectionMode.Single` | `TreeSelectionMode.Single` |
| `size`          | `size`           |                                                                                                                                                                             | `"m" \| "s"`                                                                                                           | `"m"`                      |
| `theme`         | `theme`          |                                                                                                                                                                             | `"dark" \| "light"`                                                                                                    | `undefined`                |


## Events

| Event               | Description | Type                            |
| ------------------- | ----------- | ------------------------------- |
| `calciteTreeSelect` |             | `CustomEvent<TreeSelectDetail>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
