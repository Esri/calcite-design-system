# my-component

<!-- Auto Generated Below -->

## Properties

| Property | Attribute | Description                                          | Type                | Default     |
| -------- | --------- | ---------------------------------------------------- | ------------------- | ----------- |
| `active` | `active`  | Used to display whether the swatch is active or not. | `boolean`           | `false`     |
| `color`  | `color`   | The color value.                                     | `string`            | `undefined` |
| `scale`  | `scale`   | The component scale.                                 | `"l" \| "m" \| "s"` | `"m"`       |
| `theme`  | `theme`   | The component's theme.                               | `"dark" \| "light"` | `"light"`   |

## Dependencies

### Used by

- [calcite-color-picker](../calcite-color-picker)
- [calcite-color-picker-hex-input](src/components/calcite-color-picker-hex-input)

### Graph

```mermaid
graph TD;
  calcite-color-picker --> calcite-color-picker-swatch
  calcite-color-picker-hex-input --> calcite-color-picker-swatch
  style calcite-color-picker-swatch fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
