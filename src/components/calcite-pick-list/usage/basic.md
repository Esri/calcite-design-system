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

#### Multi-select & filter-enabled

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

#### Sub groups

Renders groups of pick list items that are visually separated.

```html
<calcite-pick-list>
  <calcite-pick-list-group group-title="numbers">
    <calcite-pick-list-item heading="one" description="fish" value="one" icon="grip">
      <calcite-action slot="actions-end" icon="ellipsis"></calcite-action>
    </calcite-pick-list-item>
    <calcite-pick-list-item heading="two" description="fish" value="two" icon="grip">
      <calcite-action slot="actions-end" icon="ellipsis"></calcite-action>
    </calcite-pick-list-item>
  </calcite-pick-list-group>
  <calcite-pick-list-group group-title="colors">
    <calcite-pick-list-item heading="red" description="fish" value="red" icon="grip">
      <calcite-action slot="actions-end" icon="ellipsis"></calcite-action>
    </calcite-pick-list-item>
    <calcite-pick-list-item heading="blue" description="fish" value="blue" icon="grip">
      <calcite-action slot="actions-end" icon="ellipsis"></calcite-action>
    </calcite-pick-list-item>
  </calcite-pick-list-group>
</calcite-pick-list>
```
