# calcite-checkbox

calcite-checkbox is used to toggle a value on or off. You can optionally pass in a checkbox. This is useful when using a framework like React to get around their synthetic event handling:

```html
<calcite-checkbox>
  <input
    name="myCheckbox"
    type="checkbox"
    onChange="{this.handleInputChange}"
  />
</calcite-checkbox>
```

If you don't pass in an input, calcite-checkbox will act as the source of truth:

```html
<label>
  <calcite-checkbox switched="true"></calcite-checkbox> Switch is on
</label>
```

<!-- Auto Generated Below -->

## Properties

| Property   | Attribute  | Description                                                               | Type              | Default  |
| ---------- | ---------- | ------------------------------------------------------------------------- | ----------------- | -------- |
| `color`    | `color`    | Color of the switch. Use red to denote destructive settings/actions.      | `"blue" \| "red"` | `"blue"` |
| `name`     | `name`     | Name of the form control (useful for specifying input/label relationship) | `string`          | `""`     |
| `switched` | `switched` | True if the control should be switched on                                 | `boolean`         | `false`  |
| `value`    | `value`    | Value of the form control                                                 | `string`          | `""`     |

## Events

| Event                 | Description | Type               |
| --------------------- | ----------- | ------------------ |
| `calciteSwitchChange` |             | `CustomEvent<any>` |

---

_Built with [StencilJS](https://stenciljs.com/)_
