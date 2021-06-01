# calcite-chip

<!-- Auto Generated Below -->

## Properties

| Property             | Attribute       | Description                                                        | Type                                               | Default      |
| -------------------- | --------------- | ------------------------------------------------------------------ | -------------------------------------------------- | ------------ |
| `appearance`         | `appearance`    | specify the appearance style of the button, defaults to solid.     | `"clear" \| "solid"`                               | `"solid"`    |
| `color`              | `color`         | specify the color of the button, defaults to blue                  | `"blue" \| "green" \| "grey" \| "red" \| "yellow"` | `"grey"`     |
| `dismissLabel`       | `dismiss-label` | Aria label for the "x" button                                      | `string`                                           | `TEXT.close` |
| `dismissible`        | `dismissible`   | Optionally show a button the user can click to dismiss the chip    | `boolean`                                          | `false`      |
| `icon`               | `icon`          | optionally pass an icon to display - accepts Calcite UI icon names | `string`                                           | `undefined`  |
| `iconFlipRtl`        | `icon-flip-rtl` | flip the icon in rtl                                               | `boolean`                                          | `undefined`  |
| `scale`              | `scale`         | specify the scale of the chip, defaults to m                       | `"l" \| "m" \| "s"`                                | `"m"`        |
| `value` _(required)_ | `value`         |                                                                    | `any`                                              | `undefined`  |

## Events

| Event                | Description                                | Type               |
| -------------------- | ------------------------------------------ | ------------------ |
| `calciteChipDismiss` | Emitted when the dismiss button is clicked | `CustomEvent<any>` |

## Methods

### `setFocus() => Promise<void>`

#### Returns

Type: `Promise<void>`

## Dependencies

### Used by

- [calcite-combobox](../calcite-combobox)
- [calcite-rating](../calcite-rating)

### Depends on

- [calcite-icon](../calcite-icon)

### Graph

```mermaid
graph TD;
  calcite-chip --> calcite-icon
  calcite-combobox --> calcite-chip
  calcite-rating --> calcite-chip
  style calcite-chip fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
