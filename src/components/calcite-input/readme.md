# calcite-input

<!-- Auto Generated Below -->

## Properties

| Property           | Attribute            | Description                                                                                                                                                                                                                                  | Type                                                                                                                                                                                   | Default      |
| ------------------ | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `alignment`        | `alignment`          | specify the alignment of the value of the input                                                                                                                                                                                              | `"end" \| "start"`                                                                                                                                                                     | `"start"`    |
| `autofocus`        | `autofocus`          | should the input autofocus                                                                                                                                                                                                                   | `boolean`                                                                                                                                                                              | `false`      |
| `clearable`        | `clearable`          | optionally display a clear button that displays when field has a value shows by default for search, time, date will not display for type="textarea"                                                                                          | `boolean`                                                                                                                                                                              | `undefined`  |
| `disabled`         | `disabled`           | is the input disabled                                                                                                                                                                                                                        | `boolean`                                                                                                                                                                              | `undefined`  |
| `icon`             | `icon`               | when used as a boolean set to true, show a default recommended icon for certain input types (tel, password, email, date, time, search). You can also pass a calcite-ui-icon name to this prop to display a requested icon for any input type | `boolean \| string`                                                                                                                                                                    | `undefined`  |
| `iconFlipRtl`      | `icon-flip-rtl`      | flip the icon in rtl                                                                                                                                                                                                                         | `boolean`                                                                                                                                                                              | `undefined`  |
| `loading`          | `loading`            | specify if the input is in loading state                                                                                                                                                                                                     | `boolean`                                                                                                                                                                              | `false`      |
| `max`              | `max`                | input max                                                                                                                                                                                                                                    | `number`                                                                                                                                                                               | `undefined`  |
| `min`              | `min`                | input min                                                                                                                                                                                                                                    | `number`                                                                                                                                                                               | `undefined`  |
| `numberButtonType` | `number-button-type` | specify the placement of the number buttons                                                                                                                                                                                                  | `"horizontal" \| "none" \| "vertical"`                                                                                                                                                 | `"vertical"` |
| `placeholder`      | `placeholder`        | explicitly whitelist placeholder attribute                                                                                                                                                                                                   | `string`                                                                                                                                                                               | `undefined`  |
| `prefixText`       | `prefix-text`        | optionally add prefix                                                                                                                                                                                                                        | `string`                                                                                                                                                                               | `undefined`  |
| `required`         | `required`           | is the input required                                                                                                                                                                                                                        | `boolean`                                                                                                                                                                              | `false`      |
| `scale`            | `scale`              | specify the scale of the input, defaults to m                                                                                                                                                                                                | `"l" \| "m" \| "s"`                                                                                                                                                                    | `"m"`        |
| `status`           | `status`             | specify the status of the input field, determines message and icons                                                                                                                                                                          | `"idle" \| "invalid" \| "valid"`                                                                                                                                                       | `"idle"`     |
| `step`             | `step`               | input step                                                                                                                                                                                                                                   | `"any" \| number`                                                                                                                                                                      | `undefined`  |
| `suffixText`       | `suffix-text`        | optionally add suffix \*                                                                                                                                                                                                                     | `string`                                                                                                                                                                               | `undefined`  |
| `theme`            | `theme`              | specify the alignment of dropdown, defaults to left                                                                                                                                                                                          | `"dark" \| "light"`                                                                                                                                                                    | `undefined`  |
| `type`             | `type`               | specify the input type                                                                                                                                                                                                                       | `"color" \| "date" \| "datetime-local" \| "email" \| "file" \| "image" \| "month" \| "number" \| "password" \| "search" \| "tel" \| "text" \| "textarea" \| "time" \| "url" \| "week"` | `"text"`     |
| `value`            | `value`              | input value                                                                                                                                                                                                                                  | `string`                                                                                                                                                                               | `""`         |

## Events

| Event               | Description | Type               |
| ------------------- | ----------- | ------------------ |
| `calciteInputBlur`  |             | `CustomEvent<any>` |
| `calciteInputFocus` |             | `CustomEvent<any>` |
| `calciteInputInput` |             | `CustomEvent<any>` |

## Methods

### `setFocus() => Promise<void>`

focus the rendered child element

#### Returns

Type: `Promise<void>`

## Dependencies

### Used by

- [calcite-color-picker](../calcite-color-picker)
- [calcite-color-picker-hex-input](src/components/calcite-color-picker-hex-input)
- [calcite-input-date-picker](../calcite-input-date-picker)

### Depends on

- [calcite-progress](../calcite-progress)
- [calcite-icon](../calcite-icon)

### Graph

```mermaid
graph TD;
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  calcite-color-picker --> calcite-input
  calcite-color-picker-hex-input --> calcite-input
  calcite-input-date-picker --> calcite-input
  style calcite-input fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
