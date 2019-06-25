# calcite-loader

The calcite-loader component is a simple, indeterminate loading indicator. Simply pass in your text and use the `is-active` attribute to toggle visibility.

```html
<calcite-loader text="Fetching data..." is-active></calcite-loader>
```

## TODO

- tests
- verify designs and api

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute   | Description                                                        | Type                               | Default           |
| ---------- | ----------- | ------------------------------------------------------------------ | ---------------------------------- | ----------------- |
| `inline`   | `inline`    | Inline loaders are smaller and will appear to the left of the text | `boolean`                          | `false`           |
| `isActive` | `is-active` | Show the loader                                                    | `boolean`                          | `false`           |
| `text`     | `text`      | Text which should appear under the loading indicator (optional)    | `string`                           | `""`              |
| `type`     | `type`      | Use indeterminate if finding actual progress value is impossible   | `"determinate" \| "indeterminate"` | `"indeterminate"` |
| `value`    | `value`     | Percent complete of 100, only valid for determinate indicators     | `number`                           | `0`               |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
