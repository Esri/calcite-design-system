# calcite-progress

The `calcite-progress` component is used to show progress on some async task to the user. Wrap your content in the progress element to add an animated progress indicator above it:

```html
<calcite-progress type="indeterminate">
  <h1>Hello World!</h1>
</calcite-progress>
```

## TODO

- tests
- verify designs and api

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                      | Type                               | Default         |
| ---------- | ---------- | ---------------------------------------------------------------- | ---------------------------------- | --------------- |
| `reversed` | `reversed` | Fill bar in the opposite direction                               | `boolean`                          | `false`         |
| `text`     | `text`     | Text label for the progress indicator                            | `string`                           | `null`          |
| `theme`    | `theme`    | Select theme (light or dark)                                     | `"dark" \| "light"`                | `"light"`       |
| `type`     | `type`     | Use indeterminate if finding actual progress value is impossible | `"determinate" \| "indeterminate"` | `"determinate"` |
| `value`    | `value`    | Percent complete of 100                                          | `number`                           | `0`             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
