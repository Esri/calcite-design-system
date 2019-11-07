# calcite-tooltip

<!-- Auto Generated Below -->


## Usage

### Basic

```html
<calcite-tooltip placement="auto" reference-element="tooltip-button"
  >This is the message of the tooltip</calcite-tooltip
>
<p>
  Lorem <a id="tooltip-button" href="#">ipsum</a> dolor sit amet, consectetur
  adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
  aliqua.
</p>
```



## Properties

| Property                        | Attribute           | Description                                                                         | Type                                                                                                                                                                                                                                                                                                              | Default     |
| ------------------------------- | ------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `open`                          | `open`              | Display and position the component.                                                 | `boolean`                                                                                                                                                                                                                                                                                                         | `false`     |
| `placement`                     | `placement`         | Determines where the component will be positioned relative to the referenceElement. | `"auto-start" \| "auto" \| "auto-end" \| "top-start" \| "top" \| "top-end" \| "right-start" \| "right" \| "right-end" \| "bottom-end" \| "bottom" \| "bottom-start" \| "left-end" \| "left" \| "left-start" \| "leading-start" \| "leading" \| "leading-end" \| "trailing-end" \| "trailing" \| "trailing-start"` | `"auto"`    |
| `referenceElement` _(required)_ | `reference-element` | Reference HTMLElement used to position this component.                              | `HTMLElement \| string`                                                                                                                                                                                                                                                                                           | `undefined` |
| `theme`                         | `theme`             | Select theme (light or dark)                                                        | `"dark" \| "light"`                                                                                                                                                                                                                                                                                               | `"light"`   |


## Methods

### `reposition() => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
