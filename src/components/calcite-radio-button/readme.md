# calcite-radio-button

<!-- Auto Generated Below -->


## Properties

| Property             | Attribute  | Description                                                                                                                                   | Type                | Default                                            |
| -------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | -------------------------------------------------- |
| `checked`            | `checked`  | The checked state of the radio button.                                                                                                        | `boolean`           | `false`                                            |
| `disabled`           | `disabled` | The disabled state of the radio button.                                                                                                       | `boolean`           | `false`                                            |
| `focused`            | `focused`  | The focused state of the radio button.                                                                                                        | `boolean`           | `false`                                            |
| `guid`               | `guid`     | The id attribute of the radio button.  When omitted, a globally unique identifier is used.                                                    | `string`            | `this.el.id \|\| `calcite-radio-button-${guid()}`` |
| `hidden`             | `hidden`   | The radio button's hidden status.  When a radio button is hidden it is not focusable or checkable.                                            | `boolean`           | `false`                                            |
| `name` _(required)_  | `name`     | The name of the radio button.  <code>name</code> is passed as a property automatically from <code>calcite-radio-button-group</code>.          | `string`            | `undefined`                                        |
| `required`           | `required` | Requires that a value is selected for the radio button group before the parent form will submit.                                              | `boolean`           | `false`                                            |
| `scale`              | `scale`    | The scale (size) of the radio button.  <code>scale</code> is passed as a property automatically from <code>calcite-radio-button-group</code>. | `"l" \| "m" \| "s"` | `"m"`                                              |
| `theme`              | `theme`    | The color theme of the radio button, <code>theme</code> is passed as a property automatically from <code>calcite-radio-button-group</code>.   | `"dark" \| "light"` | `"light"`                                          |
| `value` _(required)_ | `value`    | The value of the radio button.                                                                                                                | `string`            | `undefined`                                        |


## Events

| Event                      | Description | Type               |
| -------------------------- | ----------- | ------------------ |
| `calciteRadioButtonChange` |             | `CustomEvent<any>` |


## Dependencies

### Depends on

- [calcite-label](../calcite-label)

### Graph
```mermaid
graph TD;
  calcite-radio-button --> calcite-label
  style calcite-radio-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
