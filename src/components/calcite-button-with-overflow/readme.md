# calcite-button-with-overflow



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                                                                                              | Type                                   | Default     |
| --------------- | ---------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------- | ----------- |
| `color`         | `color`          | specify the color of the control, defaults to blue                                                       | `"blue" \| "dark" \| "light" \| "red"` | `"blue"`    |
| `disabled`      | `disabled`       | is the control disabled                                                                                  | `boolean`                              | `undefined` |
| `loading`       | `loading`        | optionally add a calcite-loader component to the control, disabling interaction. with the primary button | `boolean`                              | `false`     |
| `overflowLabel` | `overflow-label` | aria label for overflow button                                                                           | `string`                               | `undefined` |
| `primaryText`   | `primary-text`   | text for primary action button                                                                           | `string`                               | `undefined` |
| `scale`         | `scale`          | specify the scale of the control, defaults to m                                                          | `"l" \| "m" \| "s" \| "xl" \| "xs"`    | `"xs"`      |
| `theme`         | `theme`          | Select theme (light or dark)                                                                             | `"dark" \| "light"`                    | `"light"`   |


## Events

| Event                  | Description                                    | Type               |
| ---------------------- | ---------------------------------------------- | ------------------ |
| `primaryButtonClicked` | Fired when the modal begins the open animation | `CustomEvent<any>` |


## Dependencies

### Depends on

- [calcite-button](../calcite-button)
- [calcite-dropdown](../calcite-dropdown)

### Graph
```mermaid
graph TD;
  calcite-button-with-overflow --> calcite-button
  calcite-button-with-overflow --> calcite-dropdown
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  style calcite-button-with-overflow fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
