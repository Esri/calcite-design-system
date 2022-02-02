There is no need to set a theme or scale on the `<calcite-inline-editable>` component, as it inherits these values from the wrapped `<calcite-input>`, or the closest parent component where these props are set.

```html
<calcite-inline-editable>
  <calcite-input value="Entered value" placeholder="My placeholder"></calcite-input>
</calcite-inline-editable>
```
