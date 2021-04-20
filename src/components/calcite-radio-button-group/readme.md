# calcite-radio-button-group

<!-- Auto Generated Below -->

## Properties

| Property            | Attribute  | Description                                                                                                                 | Type                                   | Default        |
| ------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | -------------- |
| `disabled`          | `disabled` | The disabled state of the radio button group.                                                                               | `boolean`                              | `false`        |
| `hidden`            | `hidden`   | The radio button group's hidden status. When a radio button group is hidden none of its options are focusable or checkable. | `boolean`                              | `false`        |
| `layout`            | `layout`   | The layout direction of the radio buttons in a group.                                                                       | `"grid" \| "horizontal" \| "vertical"` | `"horizontal"` |
| `name` _(required)_ | `name`     | The name of the radio button group. <code>name</code> must be unique to other radio button group instances.                 | `string`                               | `undefined`    |
| `required`          | `required` | Requires that a value is selected for the radio button group before the parent form will submit.                            | `boolean`                              | `false`        |
| `scale`             | `scale`    | The scale (size) of the radio button group.                                                                                 | `"l" \| "m" \| "s"`                    | `"m"`          |
| `theme`             | `theme`    | The color theme of the radio button group.                                                                                  | `"dark" \| "light"`                    | `undefined`    |

## Events

| Event                           | Description | Type               |
| ------------------------------- | ----------- | ------------------ |
| `calciteRadioButtonGroupChange` |             | `CustomEvent<any>` |

---

_Built with [StencilJS](https://stenciljs.com/)_
