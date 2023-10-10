Every `calcite-dropdown-item` must have a parent `calcite-dropdown-group`.

```html
<calcite-dropdown>
  <calcite-button slot="trigger">Choose a fruit</calcite-button>
  <calcite-dropdown-group>
    <calcite-dropdown-item>Apple</calcite-dropdown-item>
    <calcite-dropdown-item selected>Orange</calcite-dropdown-item>
    <calcite-dropdown-item>Banana</calcite-dropdown-item>
  </calcite-dropdown-group>
</calcite-dropdown>
```
