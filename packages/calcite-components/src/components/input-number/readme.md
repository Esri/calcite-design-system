# calcite-input-number

<!-- Auto Generated Below -->

## Usage

### Basic

```html
<calcite-input-number placeholder="Offset distance" step="0.25" suffix-text="miles"></calcite-input-number>
```

### Integer

Restrict the component to integer numbers only with `integer`, which will disable exponential notation.

```html
<calcite-label layout="inline">
  Birds observed
  <calcite-input-number placeholder="Number of birds" step="1" min="0" integer></calcite-input-number>
</calcite-label>
```

## Properties

| Property            | Attribute            | Description                                                                                                                                                                | Type                                   | Default      |
| ------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ------------ |
| `alignment`         | `alignment`          | Specifies the text alignment of the component's value.                                                                                                                     | `"end" \| "start"`                     | `"start"`    |
| `autocomplete`      | `autocomplete`       | Specifies the type of content to autocomplete, for use in forms. Read the native attribute's documentation on MDN for more info.                                           | `string`                               | `undefined`  |
| `autofocus`         | `autofocus`          | When `true`, the component is focused on page load. Only one element can contain `autofocus`. If multiple elements have `autofocus`, the first element will receive focus. | `boolean`                              | `false`      |
| `clearable`         | `clearable`          | When `true`, a clear button is displayed when the component has a value.                                                                                                   | `boolean`                              | `false`      |
| `disabled`          | `disabled`           | When `true`, interaction is prevented and the component is displayed with lower opacity.                                                                                   | `boolean`                              | `false`      |
| `enterKeyHint`      | `enter-key-hint`     | Specifies the action label or icon for the Enter key on virtual keyboards. Read the native attribute's documentation on MDN for more info.                                 | `string`                               | `undefined`  |
| `form`              | `form`               | The ID of the form that will be associated with the component. When not set, the component will be associated with its ancestor form element, if any.                      | `string`                               | `undefined`  |
| `groupSeparator`    | `group-separator`    | When `true`, number values are displayed with a group separator corresponding to the language and country format.                                                          | `boolean`                              | `false`      |
| `hidden`            | `hidden`             | When `true`, the component will not be visible.                                                                                                                            | `boolean`                              | `false`      |
| `icon`              | `icon`               | Specifies an icon to display.                                                                                                                                              | `boolean \| string`                    | `undefined`  |
| `iconFlipRtl`       | `icon-flip-rtl`      | When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`).                                                                               | `boolean`                              | `false`      |
| `inputMode`         | `input-mode`         | Specifies the type of content to help devices display an appropriate virtual keyboard. Read the native attribute's documentation on MDN for more info.                     | `string`                               | `"decimal"`  |
| `integer`           | `integer`            | When `true`, restricts the component to integer numbers only and disables exponential notation.                                                                            | `boolean`                              | `false`      |
| `label`             | `label`              | Accessible name for the component's button or hyperlink.                                                                                                                   | `string`                               | `undefined`  |
| `loading`           | `loading`            | When `true`, the component is in the loading state and `calcite-progress` is displayed.                                                                                    | `boolean`                              | `false`      |
| `max`               | `max`                | Specifies the maximum value.                                                                                                                                               | `number`                               | `undefined`  |
| `maxLength`         | `max-length`         | Specifies the maximum length of text for the component's value.                                                                                                            | `number`                               | `undefined`  |
| `messageOverrides`  | `message-overrides`  | Use this property to override individual strings used by the component.                                                                                                    | `InputNumberMessages`                  | `undefined`  |
| `min`               | `min`                | Specifies the minimum value.                                                                                                                                               | `number`                               | `undefined`  |
| `minLength`         | `min-length`         | Specifies the minimum length of text for the component's value.                                                                                                            | `number`                               | `undefined`  |
| `name`              | `name`               | Specifies the name of the component. Required to pass the component's `value` on form submission.                                                                          | `string`                               | `undefined`  |
| `numberButtonType`  | `number-button-type` | Specifies the placement of the buttons.                                                                                                                                    | `"horizontal" \| "none" \| "vertical"` | `"vertical"` |
| `numberingSystem`   | `numbering-system`   | Specifies the Unicode numeral system used by the component for localization.                                                                                               | `"arab" \| "arabext" \| "latn"`        | `undefined`  |
| `placeholder`       | `placeholder`        | Specifies placeholder text for the component.                                                                                                                              | `string`                               | `undefined`  |
| `prefixText`        | `prefix-text`        | Adds text to the start of the component.                                                                                                                                   | `string`                               | `undefined`  |
| `readOnly`          | `read-only`          | When `true`, the component's value can be read, but cannot be modified.                                                                                                    | `boolean`                              | `false`      |
| `required`          | `required`           | When `true`, the component must have a value in order for the form to submit.                                                                                              | `boolean`                              | `false`      |
| `scale`             | `scale`              | Specifies the size of the component.                                                                                                                                       | `"l" \| "m" \| "s"`                    | `"m"`        |
| `status`            | `status`             | Specifies the status of the input field, which determines message and icons.                                                                                               | `"idle" \| "invalid" \| "valid"`       | `"idle"`     |
| `step`              | `step`               | Specifies the granularity that the component's value must adhere to.                                                                                                       | `"any" \| number`                      | `undefined`  |
| `suffixText`        | `suffix-text`        | Adds text to the end of the component.                                                                                                                                     | `string`                               | `undefined`  |
| `validationIcon`    | `validation-icon`    | Specifies the validation icon to display under the component.                                                                                                              | `boolean \| string`                    | `undefined`  |
| `validationMessage` | `validation-message` | Specifies the validation message to display under the component.                                                                                                           | `string`                               | `undefined`  |
| `value`             | `value`              | The component's value.                                                                                                                                                     | `string`                               | `""`         |

## Events

| Event                      | Description                                         | Type                |
| -------------------------- | --------------------------------------------------- | ------------------- |
| `calciteInputNumberChange` | Fires each time a new value is typed and committed. | `CustomEvent<void>` |
| `calciteInputNumberInput`  | Fires each time a new value is typed.               | `CustomEvent<void>` |

## Methods

### `selectText() => Promise<void>`

Selects the text of the component's `value`.

#### Returns

Type: `Promise<void>`

### `setFocus() => Promise<void>`

Sets focus on the component.

#### Returns

Type: `Promise<void>`

## Slots

| Slot       | Description                                            |
| ---------- | ------------------------------------------------------ |
| `"action"` | A slot for positioning a button next to the component. |

## Dependencies

### Used by

- [calcite-color-picker](../color-picker)
- [calcite-color-picker-hex-input](../color-picker-hex-input)

### Depends on

- [calcite-progress](../progress)
- [calcite-icon](../icon)
- [calcite-input-message](../input-message)

### Graph

```mermaid
graph TD;
  calcite-input-number --> calcite-progress
  calcite-input-number --> calcite-icon
  calcite-input-number --> calcite-input-message
  calcite-input-message --> calcite-icon
  calcite-color-picker --> calcite-input-number
  calcite-color-picker-hex-input --> calcite-input-number
  style calcite-input-number fill:#f9f,stroke:#333,stroke-width:4px
```

---

*Built with [StencilJS](https://stenciljs.com/)*
