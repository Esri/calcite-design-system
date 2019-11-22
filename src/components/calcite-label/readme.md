# calcite-label
Functions as a wrapper component for `calcite-input` and `calcite-input-message`. It can also be used with native `input` elements (this probably needs some testing) with the `for=` attribute.

It allows consumers to set a `status` attribute that child `calcite-input` and `calcite-input-message` components to use to set their own properties.
```
<calcite-label status=“invalid”>
    My great label
    <calcite-input placeholder=“Enter your information”></calcite-input>
    <calcite-input-message active>That's not going to work out. <calcite-button appearance="inline" href="">Learn more</calcite-button></calcite-input-message>
</calcite-label>
```

### Attributes
#### Custom attributes

`status` = [`idle`, `valid`, `invalid`] - defaults to `idle` - Allows setting a status that affects styling of input. This will propagate to any child `calcite-input` or `calcite-input-message` components.




<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                                     | Type                             | Default     |
| -------- | --------- | ------------------------------------------------------------------------------- | -------------------------------- | ----------- |
| `icon`   | `icon`    | optionally pass icon path data - pass only raw path data from calcite ui helper | `string`                         | `undefined` |
| `status` | `status`  | specify the status of the input field, determines message and icons             | `"idle" \| "invalid" \| "valid"` | `"idle"`    |
| `theme`  | `theme`   | specify the alignment of dropdown, defaults to left                            | `"dark" \| "light"`              | `"light"`   |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
