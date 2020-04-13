# calcite-progress

The `calcite-progress` component is used to show progress on some async task to the user.

```html
<calcite-progress type="indeterminate"></calcite-progress>
```

## TODO

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                      | Type                               | Default         |
| ---------- | ---------- | ---------------------------------------------------------------- | ---------------------------------- | --------------- |
| `reversed` | `reversed` | Fill bar in the opposite direction                               | `boolean`                          | `false`         |
| `text`     | `text`     | Text label for the progress indicator                            | `string`                           | `null`          |
| `theme`    | `theme`    | Select theme (light or dark)                                     | `"dark" \| "light"`                | `undefined`     |
| `type`     | `type`     | Use indeterminate if finding actual progress value is impossible | `"determinate" \| "indeterminate"` | `"determinate"` |
| `value`    | `value`    | Percent complete of 100                                          | `number`                           | `0`             |


## Dependencies

### Used by

 - [calcite-input](../calcite-input)

### Graph
```mermaid
graph TD;
  calcite-input --> calcite-progress
  style calcite-progress fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
