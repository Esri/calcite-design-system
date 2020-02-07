# calcite-popover

<!-- Auto Generated Below -->


## Usage

### AddClickHandle

```html
<calcite-popover reference-element="popover-button" add-click-handle
  >Hello! I am some popover content!</calcite-popover
>

<calcite-button
  id="popover-button"
  icon="M15.707 20h-1.414l-7.5-7.5 7.5-7.5h1.414l-7.5 7.5z"
  >Clickable popover</calcite-button
>
```



## Properties

| Property                        | Attribute            | Description                                                                                | Type                                                                                                                                                                                                                                                                                                              | Default     |
| ------------------------------- | -------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `addClickHandle`                | `add-click-handle`   | Adds a click handler to the referenceElement to toggle open the Popover.                   | `boolean`                                                                                                                                                                                                                                                                                                         | `false`     |
| `boundariesElement`             | `boundaries-element` | HTMLElement Used to position this component within the a boundary.                         | `HTMLElement \| string`                                                                                                                                                                                                                                                                                           | `undefined` |
| `closeButton`                   | `close-button`       | Display a close button within the Popover.                                                 | `boolean`                                                                                                                                                                                                                                                                                                         | `false`     |
| `disableFlip`                   | `disable-flip`       | Prevents flipping the popover's placement when it starts to overlap its reference element. | `boolean`                                                                                                                                                                                                                                                                                                         | `false`     |
| `disablePointer`                | `disable-pointer`    | Removes the caret pointer.                                                                 | `boolean`                                                                                                                                                                                                                                                                                                         | `false`     |
| `flipPlacements`                | --                   | Defines the available placements that can be used when a flip occurs.                      | `Position[]`                                                                                                                                                                                                                                                                                                      | `undefined` |
| `flowInner`                     | `flow-inner`         | Makes the popover flow toward the inner of the reference element.                          | `boolean`                                                                                                                                                                                                                                                                                                         | `false`     |
| `open`                          | `open`               | Display and position the component.                                                        | `boolean`                                                                                                                                                                                                                                                                                                         | `false`     |
| `placement`                     | `placement`          | Determines where the component will be positioned relative to the referenceElement.        | `"top" \| "right" \| "bottom" \| "left" \| "auto-start" \| "auto" \| "auto-end" \| "top-start" \| "top-end" \| "right-start" \| "right-end" \| "bottom-end" \| "bottom-start" \| "left-end" \| "left-start" \| "leading-start" \| "leading" \| "leading-end" \| "trailing-end" \| "trailing" \| "trailing-start"` | `"auto"`    |
| `referenceElement` _(required)_ | `reference-element`  | Reference HTMLElement used to position this component according to the placement property. | `HTMLElement \| string`                                                                                                                                                                                                                                                                                           | `undefined` |
| `textClose`                     | `text-close`         | Text for close button.                                                                     | `string`                                                                                                                                                                                                                                                                                                          | `"Close"`   |
| `theme`                         | `theme`              | Select theme (light or dark)                                                               | `"dark" \| "light"`                                                                                                                                                                                                                                                                                               | `"light"`   |
| `xOffset`                       | `x-offset`           | Offset the position of the popover in the horizontal direction.                            | `number`                                                                                                                                                                                                                                                                                                          | `0`         |
| `yOffset`                       | `y-offset`           | Offset the position of the popover in the vertical direction.                              | `number`                                                                                                                                                                                                                                                                                                          | `0`         |


## Events

| Event                 | Description                      | Type               |
| --------------------- | -------------------------------- | ------------------ |
| `calcitePopoverClose` | Fired when the popover is closed | `CustomEvent<any>` |
| `calcitePopoverOpen`  | Fired when the popover is opened | `CustomEvent<any>` |


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
