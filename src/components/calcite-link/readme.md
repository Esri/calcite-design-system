# calcite-link

You can programmatically focus a `calcite-link` with the `setFocus()` method:

`<div onclick=document.querySelector('#my-link').setFocus()>Focus!</div>`

<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description                                                                                      | Type                                   | Default     |
| ------------ | ------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------- | ----------- |
| `color`      | `color`       | specify the color of the link, defaults to blue                                                  | `"blue" \| "dark" \| "light" \| "red"` | `"blue"`    |
| `disabled`   | `disabled`    | is the link disabled                                                                             | `boolean`                              | `undefined` |
| `href`       | `href`        | optionally pass a href - used to determine if the component should render as a link or an anchor | `string`                               | `undefined` |
| `iconEnd`    | `icon-end`    | optionally pass an icon to display at the end of a button - accepts calcite ui icon names        | `string`                               | `undefined` |
| `iconStart`  | `icon-start`  | optionally pass an icon to display at the start of a button - accepts calcite ui icon names      | `string`                               | `undefined` |
| `theme`      | `theme`       | Select theme (light or dark)                                                                     | `"dark" \| "light"`                    | `undefined` |
| `userSelect` | `user-select` | Allows the text to be selectable                                                                 | `boolean`                              | `true`      |


## Methods

### `setFocus() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [calcite-tile](../calcite-tile)

### Depends on

- [calcite-icon](../calcite-icon)

### Graph
```mermaid
graph TD;
  calcite-link --> calcite-icon
  calcite-tile --> calcite-link
  style calcite-link fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
