It also allows consumers to set a `status` attribute for child `calcite-input` and `calcite-input-message` components to use to set their own properties.

```html
<calcite-label status="invalid">
  Invalid input
  <calcite-input type="search" placeholder="Filter your files" value="adfo2h2"></calcite-input>
  <calcite-input-message active icon> Something doesn't look right </calcite-input-message>
</calcite-label>
```
