When tab-nav is the only parent, tab-title can inherit its `scale` and `position` from tab-nav:

```html
<calcite-tab-nav scale="l" position="below">
  <calcite-tab-title>Layers</calcite-tab-title>
  <calcite-tab-title>Maps</calcite-tab-title>
  <calcite-tab-title active>Data</calcite-tab-title>
</calcite-tab-nav>
```
