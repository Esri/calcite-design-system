When tab-nav is the only parent, tab-title can inherit its `scale` and `position` from tab-nav:

```html
<calcite-tab-nav scale="l" position="bottom">
  <calcite-tab-title>Layers</calcite-tab-title>
  <calcite-tab-title>Maps</calcite-tab-title>
  <calcite-tab-title selected>Data</calcite-tab-title>
</calcite-tab-nav>
```
