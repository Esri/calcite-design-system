# calcite-chip

<!-- Auto Generated Below -->

## Properties

| Property             | Attribute     | Description                                                        | Type                                | Default     |
| -------------------- | ------------- | ------------------------------------------------------------------ | ----------------------------------- | ----------- |
| `dismissible`        | `dismissible` | Optionally show a button the user can click to dismiss the chip    | `boolean`                           | `false`     |
| `icon`               | `icon`        | optionally pass an icon to display - accepts Calcite UI icon names | `string`                            | `undefined` |
| `scale`              | `scale`       | specify the scale of the chip, defaults to m                       | `"l" \| "m" \| "s" \| "xl" \| "xs"` | `"m"`       |
| `theme`              | `theme`       | Select theme (light or dark)                                       | `"dark" \| "light"`                 | `undefined` |
| `value` _(required)_ | `value`       |                                                                    | `string`                            | `undefined` |

## Events

| Event                | Description                                | Type               |
| -------------------- | ------------------------------------------ | ------------------ |
| `calciteChipDismiss` | Emitted when the dismiss button is clicked | `CustomEvent<any>` |

## Dependencies

### Used by

- [calcite-combobox](../calcite-combobox)

### Depends on

- [calcite-icon](../calcite-icon)

### Graph

```mermaid
graph TD;
  calcite-chip --> calcite-icon
  calcite-combobox --> calcite-chip
  style calcite-chip fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
