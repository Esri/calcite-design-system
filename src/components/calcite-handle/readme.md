# calcite-handle

<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description                          | Type     | Default    |
| ----------- | ------------ | ------------------------------------ | -------- | ---------- |
| `textTitle` | `text-title` | Value for the button title attribute | `string` | `"handle"` |


## Events

| Event                | Description                                                                        | Type               |
| -------------------- | ---------------------------------------------------------------------------------- | ------------------ |
| `calciteHandleNudge` | Emmitted when the the handle is activated and the up or down arrow key is pressed. | `CustomEvent<any>` |


## Methods

### `setFocus() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [calcite-block](../calcite-block)

### Depends on

- [calcite-icon](../calcite-icon)

### Graph
```mermaid
graph TD;
  calcite-handle --> calcite-icon
  calcite-block --> calcite-handle
  style calcite-handle fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
