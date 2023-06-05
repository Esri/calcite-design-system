Renders a pick list with a sticky filter and checkboxes for multiple selection of items.

```html
<calcite-pick-list multiple filter-enabled>
  <calcite-pick-list-item label="Chocolate" value="chocolate">
    <calcite-action slot="actions-end" icon="ellipsis-circle"></calcite-action>
  </calcite-pick-list-item>
  <calcite-pick-list-item label="Vanilla" description="Oldie but goodie" value="vanilla">
    <calcite-action slot="actions-end" icon="ellipsis-circle"></calcite-action>
  </calcite-pick-list-item>
  <calcite-pick-list-item label="Strawberry" description="no metadata on this one" value="strawberry">
    <calcite-action slot="actions-end" icon="ellipsis-circle"></calcite-action>
  </calcite-pick-list-item>
</calcite-pick-list>
```
