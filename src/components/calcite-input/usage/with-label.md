Using a wrapping `calcite-label` component lets consumers set the status attribute once and have it propagate to child `calcite-input`

```html
<calcite-label status="invalid">
  Invalid input
  <calcite-input type="search" placeholder="Filter your files" value="adfo2h2"></calcite-input>
</calcite-label>
```
