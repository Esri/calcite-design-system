# calcite-tree-item

`<calcite-tree-item>` is used to represent a single item in a `<calcite-tree>`.

<!-- Auto Generated Below -->

## Properties

| Property   | Attribute  | Description                              | Type      | Default |
| ---------- | ---------- | ---------------------------------------- | --------- | ------- |
| `expanded` | `expanded` | True if the item is in an expanded state | `boolean` | `false` |
| `selected` | `selected` | Is the item currently selected           | `boolean` | `false` |

## Dependencies

### Depends on

- [calcite-icon](../calcite-icon)
- [calcite-checkbox](../calcite-checkbox)

### Graph

```mermaid
graph TD;
  calcite-tree-item --> calcite-icon
  calcite-tree-item --> calcite-checkbox
  calcite-checkbox --> calcite-label
  style calcite-tree-item fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
