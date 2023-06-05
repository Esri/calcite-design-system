# calcite-text-area

<!-- Auto Generated Below -->

## Usage

### Basic

```html
<calcite-text-area placeholder="Add Notes"></calcite-text-area>
```

### Exceeding-max-length

Renders text-area with

```html
<calcite-text-area placeholder="Add Notes" value="Rocky Mountains National Park" max-length="20"></calcite-text-area>
```

## Properties

| Property           | Attribute          | Description                                                                                                       | Type                                                                                                                                                                                                                                    | Default     |
| ------------------ | ------------------ | ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `autofocus`        | `autofocus`        | When `true`, the component is focused on page load.                                                               | `boolean`                                                                                                                                                                                                                               | `false`     |
| `columns`          | `columns`          | Specifies the number or columns allowed.                                                                          | `number`                                                                                                                                                                                                                                | `undefined` |
| `disabled`         | `disabled`         | When `true`, interaction is prevented and the component is displayed with lower opacity.                          | `boolean`                                                                                                                                                                                                                               | `false`     |
| `groupSeparator`   | `group-separator`  | When `true`, number values are displayed with a group separator corresponding to the language and country format. | `boolean`                                                                                                                                                                                                                               | `false`     |
| `label`            | `label`            | Accessible name for the component.                                                                                | `string`                                                                                                                                                                                                                                | `undefined` |
| `maxLength`        | `max-length`       | Specifies the maximum number of characters allowed.                                                               | `number`                                                                                                                                                                                                                                | `undefined` |
| `messageOverrides` | --                 | Use this property to override individual strings used by the component.                                           | `{ invalid?: string; overLimit?: string; }`                                                                                                                                                                                             | `undefined` |
| `name`             | `name`             | Specifies the name of the component                                                                               | `string`                                                                                                                                                                                                                                | `undefined` |
| `numberingSystem`  | `numbering-system` | Specifies the Unicode numeral system used by the component for localization.                                      | `"arab" \| "arabext" \| "bali" \| "beng" \| "deva" \| "fullwide" \| "gujr" \| "guru" \| "hanidec" \| "khmr" \| "knda" \| "laoo" \| "latn" \| "limb" \| "mlym" \| "mong" \| "mymr" \| "orya" \| "tamldec" \| "telu" \| "thai" \| "tibt"` | `undefined` |
| `placeholder`      | `placeholder`      | Specifies the placeholder text for the component.                                                                 | `string`                                                                                                                                                                                                                                | `undefined` |
| `readonly`         | `readonly`         | When `true`, the component's value can be read, but cannot be modified.                                           | `boolean`                                                                                                                                                                                                                               | `false`     |
| `required`         | `required`         | When `true`, the component must have a value in order for the form to submit.                                     | `boolean`                                                                                                                                                                                                                               | `false`     |
| `resize`           | `resize`           | When `true`, disables horizontally and vertically resizing the component.                                         | `"both" \| "horizontal" \| "none" \| "vertical"`                                                                                                                                                                                        | `"both"`    |
| `rows`             | `rows`             | Specifies the number or rows allowed.                                                                             | `number`                                                                                                                                                                                                                                | `undefined` |
| `scale`            | `scale`            | Specifies the size of the component.                                                                              | `"l" \| "m" \| "s"`                                                                                                                                                                                                                     | `"m"`       |
| `value`            | `value`            | The component's value.                                                                                            | `string`                                                                                                                                                                                                                                | `undefined` |
| `wrap`             | `wrap`             | Specifies the wrapping mechanism for the text.                                                                    | `"hard" \| "soft"`                                                                                                                                                                                                                      | `"soft"`    |

## Events

| Event                   | Description                                           | Type                |
| ----------------------- | ----------------------------------------------------- | ------------------- |
| `calciteTextAreaChange` | Fires each time a new `value` is typed and committed. | `CustomEvent<void>` |
| `calciteTextAreaInput`  | Fires each time a new `value` is typed.               | `CustomEvent<void>` |

## Methods

### `selectText() => Promise<void>`

Selects all text of the component's `value`.

#### Returns

Type: `Promise<void>`

### `setFocus() => Promise<void>`

Sets focus on the component.

#### Returns

Type: `Promise<void>`

## Slots

| Slot             | Description                          |
| ---------------- | ------------------------------------ |
|                  | A slot for adding text.              |
| `"footer-end"`   | A slot for adding a trailing footer. |
| `"footer-start"` | A slot for adding a leading footer.  |

---

_Built with [StencilJS](https://stenciljs.com/)_
