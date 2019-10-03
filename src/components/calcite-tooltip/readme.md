# calcite-popover

<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description                                                                                                                                                                                                                                                                                                                        | Type                                                                                                                                                                                                         | Default     |
| ------------------ | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `image`            | `image`             | Image source URL used to display an image above the text.                                                                                                                                                                                                                                                                          | `string`                                                                                                                                                                                                     | `undefined` |
| `imageLabel`       | `image-label`       | Image label.                                                                                                                                                                                                                                                                                                                       | `string`                                                                                                                                                                                                     | `undefined` |
| `interaction`      | `interaction`       | Defines the way the user will interact with the tooltip. 'click' - Displays the tooltip on first click and hides on second click. Also provides the user with a close button within the tooltip. 'hover' - Displays the tooltip on mousover and hides on mouseout and displays the tooltip on focus and hides the tooltip on blur. | `"click" \| "hover"`                                                                                                                                                                                         | `"hover"`   |
| `open`             | `open`              | Display and position the component.                                                                                                                                                                                                                                                                                                | `boolean`                                                                                                                                                                                                    | `false`     |
| `placement`        | `placement`         | Determines where the component will be positioned relative to the referenceElement.                                                                                                                                                                                                                                                | `"auto" \| "auto-end" \| "auto-start" \| "bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start"` | `"auto"`    |
| `referenceElement` | `reference-element` | Reference HTMLElement used to position this component.                                                                                                                                                                                                                                                                             | `HTMLElement \| string`                                                                                                                                                                                      | `undefined` |
| `text`             | `text`              | Tooltip text value to display.                                                                                                                                                                                                                                                                                                     | `string`                                                                                                                                                                                                     | `undefined` |
| `theme`            | `theme`             | Select theme (light or dark)                                                                                                                                                                                                                                                                                                       | `"dark" \| "light"`                                                                                                                                                                                          | `"light"`   |


## Methods

### `reposition() => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
