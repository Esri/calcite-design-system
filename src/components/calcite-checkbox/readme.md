# calcite-checkbox

<!-- Auto Generated Below -->

## Properties

| Property        | Attribute       | Description                                                                                                                                   | Type                | Default     |
| --------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ----------- |
| `checked`       | `checked`       | The checked state of the checkbox.                                                                                                            | `boolean`           | `false`     |
| `disabled`      | `disabled`      | True if the checkbox is disabled                                                                                                              | `boolean`           | `false`     |
| `guid`          | `guid`          | The id attribute of the checkbox. When omitted, a globally unique identifier is used.                                                         | `string`            | `undefined` |
| `hovered`       | `hovered`       | The hovered state of the checkbox.                                                                                                            | `boolean`           | `false`     |
| `indeterminate` | `indeterminate` | True if the checkbox is initially indeterminate, which is independent from its checked state https://css-tricks.com/indeterminate-checkboxes/ | `boolean`           | `false`     |
| `name`          | `name`          | The name of the checkbox input                                                                                                                | `string`            | `""`        |
| `scale`         | `scale`         | specify the scale of the checkbox, defaults to m                                                                                              | `"l" \| "m" \| "s"` | `"m"`       |
| `theme`         | `theme`         | Determines what theme to use                                                                                                                  | `"dark" \| "light"` | `undefined` |
| `value`         | `value`         | The value of the checkbox input                                                                                                               | `string`            | `undefined` |

## Events

| Event                   | Description                                      | Type               |
| ----------------------- | ------------------------------------------------ | ------------------ |
| `calciteCheckboxChange` | Emitted when the checkbox checked status changes | `CustomEvent<any>` |

## Methods

### `setFocus() => Promise<void>`

#### Returns

Type: `Promise<void>`

## Dependencies

### Used by

- [calcite-card](../calcite-card)
- [calcite-tree-item](../calcite-tree-item)

### Depends on

- [calcite-label](../calcite-label)

### Graph

```mermaid
graph TD;
  calcite-checkbox --> calcite-label
  calcite-card --> calcite-checkbox
  calcite-tree-item --> calcite-checkbox
  style calcite-checkbox fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
