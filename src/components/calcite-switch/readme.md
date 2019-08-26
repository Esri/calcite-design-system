# calcite-switch

calcite-switch is used to toggle a value on or off. You can optionally pass in a checkbox. This is useful when using a framework like React to get around their synthetic event handling:

```jsx
<calcite-switch>
  <input name="myCheckbox" type="checkbox" onChange={this.handleInputChange} />
</calcite-switch>
```

If you don't pass in an input, calcite-switch will act as the source of truth:

```html
<label> <calcite-switch switched="true"></calcite-switch> Switch is on </label>
```

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                        | Type                | Default   |
| ---------- | ---------- | ---------------------------------- | ------------------- | --------- |
| `color`    | `color`    | What color the switch should be    | `"blue" \| "red"`   | `"blue"`  |
| `name`     | `name`     | The name of the checkbox input     | `string`            | `""`      |
| `scale`    | `scale`    | The scale of the button            | `"l" \| "m" \| "s"` | `"m"`     |
| `switched` | `switched` | True if the switch is initially on | `boolean`           | `false`   |
| `theme`    | `theme`    | The component's theme.             | `"dark" \| "light"` | `"light"` |
| `value`    | `value`    | The value of the checkbox input    | `string`            | `""`      |


## Events

| Event                 | Description | Type               |
| --------------------- | ----------- | ------------------ |
| `calciteSwitchChange` |             | `CustomEvent<any>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
