Using a wrapping `calcite-label` component lets consumers set the status attribute once and have it propagate to child elements

```html
<calcite-label status="invalid">
  Invalid input
  <calcite-input type="search" placeholder="Filter your files" value="adfo2h2"></calcite-input>
  <calcite-input-message active icon> Something doesn't look right </calcite-input-message>
</calcite-label>
```
