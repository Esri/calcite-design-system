# calcite-radio-button

<!-- Auto Generated Below -->

## Properties

| Property             | Attribute  | Description                                                                                                                                      | Type                                | Default     |
| -------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------- | ----------- |
| `checked`            | `checked`  | True if the radio button is initially checked, defaults to false                                                                                 | `boolean`                           | `false`     |
| `disabled`           | `disabled` | Is the radio button disabled                                                                                                                     | `boolean`                           | `false`     |
| `focused`            | `focused`  | Is the radio button focused                                                                                                                      | `boolean`                           | `false`     |
| `name`               | `name`     | The name of the radio button, required and must be unique to other radio button group instances. Name is passed down from the radio button group | `string`                            | `undefined` |
| `scale`              | `scale`    | specify the scale of the radio button, defaults to m, passed down from radio button group                                                        | `"l" \| "m" \| "s" \| "xl" \| "xs"` | `"m"`       |
| `theme`              | `theme`    | specify the theme of the radio button, defaults to light, passed down from radio button group                                                    | `"dark" \| "light"`                 | `"light"`   |
| `value` _(required)_ | `value`    | The value of the radio button, required                                                                                                          | `string`                            | `undefined` |

## Events

| Event                     | Description                          | Type               |
| ------------------------- | ------------------------------------ | ------------------ |
| `calciteRadioButtonBlur`  | Fired when a radio button is blurred | `CustomEvent<any>` |
| `calciteRadioButtonClick` | Fired when a radio button is clicked | `CustomEvent<any>` |
| `calciteRadioButtonFocus` | Fired when a radio button is focused | `CustomEvent<any>` |

---

_Built with [StencilJS](https://stenciljs.com/)_
