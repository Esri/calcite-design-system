Renders a panel with a fab (floating action button).

```html
<calcite-panel heading="User layers">
  <calcite-list>
    <calcite-list-item-group heading="Outdoor recreation">
      <calcite-list-item label="Waterfalls" description="Vertical drops from a river." value="waterfalls">
        <calcite-action slot="actions-end" icon="layer" text="Waterfalls layer"></calcite-action>
      </calcite-list-item>
      <calcite-list-item label="Rivers" description="Large naturally flowing watercourses." value="rivers">
        <calcite-action slot="actions-end" icon="layer" text="Rivers layer"></calcite-action>
      </calcite-list-item>
    </calcite-list-item-group>
  </calcite-list>
  <calcite-fab slot="fab" text="Add another" text-enabled></calcite-fab>
</calcite-panel>
```
