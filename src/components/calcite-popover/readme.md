# calcite-popover

<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description                                                                                                                                                                                                        | Type                         | Default        |
| ------------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------- | -------------- |
| `addClickHandle`   | `add-click-handle`  | Adds a click handler to the referenceElement to toggle open the Popover.                                                                                                                                           | `boolean`                    | `false`        |
| `closeButton`      | `close-button`      | Display a close button within the Popover.                                                                                                                                                                         | `boolean`                    | `false`        |
| `open`             | `open`              | Display and position the component.                                                                                                                                                                                | `boolean`                    | `false`        |
| `placement`        | `placement`         | Determines where the component will be positioned relative to the referenceElement. horizontal: Positioned to the left or right of the referenceElement. vertical: Positioned above or below the referenceElement. | `"horizontal" \| "vertical"` | `"horizontal"` |
| `referenceElement` | `reference-element` | Reference HTMLElement used to position this component according to the placement property.                                                                                                                         | `HTMLElement \| string`      | `undefined`    |
| `xOffset`          | `x-offset`          | Offset the position of the popover in the horizontal direction.                                                                                                                                                    | `number`                     | `0`            |
| `yOffset`          | `y-offset`          | Offset the position of the popover in the vertical direction.                                                                                                                                                      | `number`                     | `0`            |


## Methods

### `reposition() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `toggle() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Slots

| Slot      | Description                                                                     |
| --------- | ------------------------------------------------------------------------------- |
| `"image"` | A slot for adding an image. The image will appear above the other slot content. |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
