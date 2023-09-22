You can combine groups in a single Dropdown, with different `selectionMode`s:

```html
<calcite-dropdown>
  <calcite-button slot="trigger">Add to cart</calcite-button>
  <calcite-dropdown-group group-title="Select one fruit">
    <calcite-dropdown-item>Apple</calcite-dropdown-item>
    <calcite-dropdown-item selected>Orange</calcite-dropdown-item>
    <calcite-dropdown-item>Banana</calcite-dropdown-item>
  </calcite-dropdown-group>
  <calcite-dropdown-group group-title="Select multiple vegetables" selection-mode="multiple">
    <calcite-dropdown-item>Asparagus</calcite-dropdown-item>
    <calcite-dropdown-item selected>Potato</calcite-dropdown-item>
    <calcite-dropdown-item>Yam</calcite-dropdown-item>
  </calcite-dropdown-group>
  <calcite-dropdown-group group-title="Select none (useful for actions)" selection-mode="none">
    <calcite-dropdown-item>Plant beans</calcite-dropdown-item>
    <calcite-dropdown-item selected>Add peas</calcite-dropdown-item>
  </calcite-dropdown-group>
</calcite-dropdown>
```
