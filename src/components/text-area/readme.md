# calcite-textarea

<!-- Auto Generated Below -->

## Properties

| Property                   | Attribute                    | Description                                                             | Type                                                                                                                                                                                                                                    | Default     |
| -------------------------- | ---------------------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `autofocus`                | `autofocus`                  | When `true`, focuses the `textarea` element on page render.             | `boolean`                                                                                                                                                                                                                               | `undefined` |
| `cols`                     | `cols`                       | Specifies number or columns allowed.                                    | `number`                                                                                                                                                                                                                                | `undefined` |
| `disabled`                 | `disabled`                   | When `true`, disables the component.                                    | `boolean`                                                                                                                                                                                                                               | `undefined` |
| `footer`                   | `footer`                     | When `true` , footer will be added to the component.                    | `boolean`                                                                                                                                                                                                                               | `false`     |
| `form`                     | `form`                       | The id of the form `textarea` is associated with.                       | `string`                                                                                                                                                                                                                                | `undefined` |
| `hidden`                   | `hidden`                     | When `true`, the component will not be visible.                         | `boolean`                                                                                                                                                                                                                               | `false`     |
| `horizontalResizeDisabled` | `horizontal-resize-disabled` | When `true`, disables resizing textarea horizontally.                   | `boolean`                                                                                                                                                                                                                               | `undefined` |
| `invalid`                  | `invalid`                    | When true, the `textarea` will be marked as invalid.                    | `boolean`                                                                                                                                                                                                                               | `false`     |
| `label`                    | `label`                      | The label of the component                                              | `string`                                                                                                                                                                                                                                | `undefined` |
| `maxlength`                | `maxlength`                  | Specifies maximum number of characters allowed.                         | `number`                                                                                                                                                                                                                                | `undefined` |
| `name`                     | `name`                       | Specifies name of the component                                         | `string`                                                                                                                                                                                                                                | `undefined` |
| `numberingSystem`          | `numbering-system`           |                                                                         | `"arab" \| "arabext" \| "bali" \| "beng" \| "deva" \| "fullwide" \| "gujr" \| "guru" \| "hanidec" \| "khmr" \| "knda" \| "laoo" \| "latn" \| "limb" \| "mlym" \| "mong" \| "mymr" \| "orya" \| "tamldec" \| "telu" \| "thai" \| "tibt"` | `undefined` |
| `placeholder`              | `placeholder`                | Specifies the placeholder text for the input.                           | `string`                                                                                                                                                                                                                                | `undefined` |
| `readonly`                 | `readonly`                   | Whne `true`, the component's value can be read, but cannot be modified. | `boolean`                                                                                                                                                                                                                               | `undefined` |
| `required`                 | `required`                   | When `true`, marks this component as required in form.                  | `boolean`                                                                                                                                                                                                                               | `undefined` |
| `resizeDisabled`           | `resize-disabled`            | When `true`, disables the resizing handle.                              | `boolean`                                                                                                                                                                                                                               | `undefined` |
| `rows`                     | `rows`                       | Specifies number or rows allowed.                                       | `number`                                                                                                                                                                                                                                | `undefined` |
| `scale`                    | `scale`                      | Specifies the size of `textarea` component.                             | `"l" \| "m" \| "s"`                                                                                                                                                                                                                     | `"m"`       |
| `value`                    | `value`                      | The component's value.                                                  | `string`                                                                                                                                                                                                                                | `undefined` |
| `verticalResizeDisabled`   | `vertical-resize-disabled`   | When `true`, disables resizing textarea vertically.                     | `boolean`                                                                                                                                                                                                                               | `undefined` |
| `wrap`                     | `wrap`                       | Specifies wrapping mechanism for the text.                              | `"hard" \| "soft"`                                                                                                                                                                                                                      | `"soft"`    |

## Events

| Event                   | Description | Type                |
| ----------------------- | ----------- | ------------------- |
| `calciteTextareaChange` |             | `CustomEvent<void>` |
| `calciteTextareaInput`  |             | `CustomEvent<void>` |

## Methods

### `selectText() => Promise<void>`

Selects all text of the component's `value`.

#### Returns

Type: `Promise<void>`

### `setFocus() => Promise<void>`

Set's focus on the `textarea`.

#### Returns

Type: `Promise<void>`

---

_Built with [StencilJS](https://stenciljs.com/)_
