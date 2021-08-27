Using a wrapping `calcite-label` component lets consumers set the status attribute once and have it propagate to child `calcite-input` and `calcite-input-message` elements

```html
<calcite-label status="invalid">
  Invalid input
  <calcite-input placeholder="Filter your files" value="adfo2h2"></calcite-input>
  <calcite-input-message active icon> Something doesn't look right </calcite-input-message>
</calcite-label>
```
