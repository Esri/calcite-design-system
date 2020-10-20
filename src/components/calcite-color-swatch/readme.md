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

 - [calcite-color](../calcite-color)
 - [calcite-color-hex-input](../calcite-color-hex-input)

### Graph
```mermaid
graph TD;
  calcite-color --> calcite-color-swatch
  calcite-color-hex-input --> calcite-color-swatch
  style calcite-color-swatch fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
