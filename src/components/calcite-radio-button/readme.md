# calcite-radio-button

<!-- Auto Generated Below -->

## Properties

| Property             | Attribute  | Description                                                                                                                                    | Type                | Default     |
| -------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ----------- |
| `checked`            | `checked`  | The checked state of the radio button.                                                                                                         | `boolean`           | `false`     |
| `disabled`           | `disabled` | The disabled state of the radio button.                                                                                                        | `boolean`           | `false`     |
| `focused`            | `focused`  | The focused state of the radio button.                                                                                                         | `boolean`           | `false`     |
| `name` _(required)_  | `name`     | The name of the radio button. <code>name</code> is passed as a property automatically from <code><calcite-radio-button-group></code>.          | `string`            | `undefined` |
| `required`           | `required` | Requires that a value is selected for the radio button group before the parent form will submit.                                               | `boolean`           | `false`     |
| `scale`              | `scale`    | The scale (size) of the radio button. <code>scale</code> is passed as a property automatically from <code><calcite-radio-button-group></code>. | `"l" \| "m" \| "s"` | `"m"`       |
| `theme`              | `theme`    | The color theme of the radio button, <code>theme</code> is passed as a property automatically from <code><calcite-radio-button-group></code>.  | `"dark" \| "light"` | `"light"`   |
| `value` _(required)_ | `value`    | The value of the radio button.                                                                                                                 | `string`            | `undefined` |

## Events

| Event                     | Description                           | Type               |
| ------------------------- | ------------------------------------- | ------------------ |
| `calciteRadioButtonBlur`  | Fired when a radio button is blurred. | `CustomEvent<any>` |
| `calciteRadioButtonClick` | Fired when a radio button is clicked. | `CustomEvent<any>` |
| `calciteRadioButtonFocus` | Fired when a radio button is focused. | `CustomEvent<any>` |

## Dependencies

### Depends on

- [calcite-label](../calcite-label)

### Graph

```mermaid
graph TD;
  calcite-radio-button --> calcite-label
  style calcite-radio-button fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
