Renders a group of `calcite-action`s contained in a `calcite-action-group`. Actions in a group are visually separated from other groups or actions in the bar.

```html
<calcite-action-bar>
  <calcite-action-group label="Manage item">
    <calcite-action text="Add" icon="plus"></calcite-action>
    <calcite-action text="Save" icon="save"></calcite-action>
  </calcite-action-group>

  <calcite-action-group label="Item types">
    <calcite-action text="Layers" icon="layers"></calcite-action>
    <calcite-action text="Basemaps" icon="layer-basemap"></calcite-action>
  </calcite-action-group>
</calcite-action-bar>
```
