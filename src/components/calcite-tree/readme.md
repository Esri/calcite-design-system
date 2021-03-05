# calcite-tree

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

---

_Built with [StencilJS](https://stenciljs.com/)_
