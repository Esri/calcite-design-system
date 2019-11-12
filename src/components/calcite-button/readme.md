# calcite-button



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                                               | Type                                          | Default     |
| -------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | ----------- |
| `appearance`   | `appearance`    | specify the appearance style of the button, defaults to solid. Specifying "inline" will render the component as an anchor | `"clear" \| "inline" \| "outline" \| "solid"` | `"solid"`   |
| `childEl`      | `child-el`      | keep track of the rendered child type -                                                                                   | `"a" \| "button" \| "span"`                   | `"button"`  |
| `color`        | `color`         | specify the color of the button, defaults to blue                                                                         | `"blue" \| "dark" \| "light" \| "red"`        | `"blue"`    |
| `disabled`     | `disabled`      | is the button disabled                                                                                                    | `boolean`                                     | `undefined` |
| `hasText`      | `has-text`      | hastext prop for spacing icon when text is present in slot                                                                | `boolean`                                     | `false`     |
| `href`         | `href`          | optionally pass a href - used to determine if the component should render as a button or an anchor                        | `string`                                      | `undefined` |
| `icon`         | `icon`          | optionally pass icon path data - pass only raw path data from calcite ui helper                                           | `string`                                      | `undefined` |
| `iconPosition` | `icon-position` | optionally used with icon, select where to position the icon                                                              | `"end" \| "start"`                            | `"start"`   |
| `loading`      | `loading`       | optionally add a calcite-loader component to the button, disabling interaction.                                           | `boolean`                                     | `false`     |
| `scale`        | `scale`         | specify the scale of the button, defaults to m                                                                            | `"l" \| "m" \| "s" \| "xl" \| "xs"`           | `"m"`       |
| `theme`        | `theme`         | Select theme (light or dark)                                                                                              | `"dark" \| "light"`                           | `"light"`   |
| `width`        | `width`         | specify the width of the button, defaults to auto                                                                         | `"auto" \| "full" \| "half"`                  | `"auto"`    |


## Dependencies

### Depends on

- [calcite-loader](../calcite-loader)

### Graph
```mermaid
graph TD;
  calcite-button --> calcite-loader
  style calcite-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
