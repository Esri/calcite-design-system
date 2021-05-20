## Status Property

It also allows consumers to set a `status` attribute for child `calcite-input` and `calcite-input-message` components to use to set their own properties.

```html
<calcite-label status="invalid">
  Invalid input
  <calcite-input type="search" placeholder="Filter your files" value="adfo2h2"></calcite-input>
  <calcite-input-message active icon> Something doesn't look right </calcite-input-message>
</calcite-label>
```

## Caveat when using with browsers that don't support flex gap

When using the `default`, `inline` or `inline-space-between` layout option with [browsers that do not support the CSS `gap` property when used with flexbox](https://caniuse.com/flexbox-gap), you will need to use the `disable-spacing` attribute and apply spacing manually to the label by wrapping it in a styled span like so:

```html
<calcite-label layout="inline" disable-spacing>
  <span style="margin-right: 0.75rem">Text leading inline</span>
  <calcite-checkbox></calcite-checkbox>
</calcite-label>
```
