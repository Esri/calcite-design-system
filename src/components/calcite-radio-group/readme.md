# calcite-radio-group



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute | Description                                     | Type                               | Default     |
| -------------- | --------- | ----------------------------------------------- | ---------------------------------- | ----------- |
| `name`         | `name`    | The group's name. Gets submitted with the form. | `string`                           | `undefined` |
| `scale`        | `scale`   | The scale of the button                         | `"l" or "m" or "s"`                | `"m"`       |
| `selectedItem` | --        | The group's selected item.                      | `HTMLCalciteRadioGroupItemElement` | `undefined` |
| `theme`        | `theme`   | The component's theme.                          | `"dark" or "light"`                | `undefined` |


## Events

| Event                     | Description | Type               |
| ------------------------- | ----------- | ------------------ |
| `calciteRadioGroupChange` |             | `CustomEvent<any>` |


## Methods

### `setFocus() => Promise<void>`

Focuses the selected item. If there is no selection, it focuses the first item.

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
