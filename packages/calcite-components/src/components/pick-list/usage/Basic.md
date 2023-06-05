Renders a basic pick list with radio buttons on the left and actions on the right side.

```html
<calcite-pick-list>
  <calcite-pick-list-item label="T. Rex" description="Arm strength impaired" value="trex">
    <calcite-action slot="actions-end" icon="circle"></calcite-action>
  </calcite-pick-list-item>
  <calcite-pick-list-item label="Triceratops" description="3 horn" value="triceratops" selected>
    <calcite-action slot="actions-end" icon="circle"></calcite-action>
  </calcite-pick-list-item>
  <calcite-pick-list-item label="Velociraptor" description="Swift seizer" value="velociraptor">
    <calcite-action slot="actions-end" icon="circle"></calcite-action>
  </calcite-pick-list-item>
</calcite-pick-list>
```
