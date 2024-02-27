When using the `default`, `inline` or `inline-space-between` layout option with [browsers that do not support the CSS `gap` property when used with flexbox](https://caniuse.com/flexbox-gap), you will need to use the `--calcite-label-margin-bottom` CSS variable and apply spacing manually to the label by wrapping it in a styled span like so:

```html
<calcite-label layout="inline" style="--calcite-label-margin-bottom:0;">
  <span style="margin-right: 0.75rem">Text leading inline</span>
  <calcite-checkbox></calcite-checkbox>
</calcite-label>
```
