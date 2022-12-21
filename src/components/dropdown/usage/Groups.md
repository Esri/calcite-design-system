You can combine groups in a single dropdown, with varying selection modes:

```html
<calcite-dropdown>
  <calcite-button slot="trigger">Open Dropdown</calcite-button>
  <calcite-dropdown-group group-title="Select one">
    <calcite-dropdown-item>Apple</calcite-dropdown-item>
    <calcite-dropdown-item selected>Orange</calcite-dropdown-item>
    <calcite-dropdown-item>Grape</calcite-dropdown-item>
  </calcite-dropdown-group>
  <calcite-dropdown-group group-title="Select multi" selection-mode="multi">
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
