```html
<calcite-list>
  <calcite-list-item
    label="Dog"
    description="Also known as Canis familiaris, a carnivorous mammal closely related to the gray wolf that has been domesticated as a pet."
  >
    <calcite-action icon="information" label="information" scale="s" slot="actions-start"></calcite-action>
    <calcite-icon scale="l" icon="layer" slot="content-start"></calcite-icon>
    <calcite-avatar scale="l" slot="content-start" thumbnail="https://placedog.net/300/300"></calcite-avatar>
    <calcite-icon
      scale="s"
      icon="check"
      slot="content-end"
      style="color: var(--calcite-color-status-success)"
    ></calcite-icon>
    <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
    <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
  </calcite-list-item>
  <calcite-list-item
    label="Cat"
    description="Also known as Felis catus, a carnivorous mammal that has long been domesticated as a pet and for catching rats and mice."
  >
    <calcite-action icon="information" label="information" scale="s" slot="actions-start"></calcite-action>
    <calcite-icon scale="l" icon="layer" slot="content-start"></calcite-icon>
    <calcite-avatar scale="l" slot="content-start" thumbnail="https://placekitten.com/g/300/300"></calcite-avatar>
    <calcite-icon
      scale="s"
      icon="check"
      slot="content-end"
      style="color: var(--calcite-color-status-success)"
    ></calcite-icon>
    <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
    <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
  </calcite-list-item>
  <calcite-list-item label="Bear" description="Carnivorous mammals of the family Ursidae.">
    <calcite-action icon="information" label="information" scale="s" slot="actions-start"></calcite-action>
    <calcite-icon scale="l" icon="layer" slot="content-start"></calcite-icon>
    <calcite-avatar scale="l" slot="content-start" thumbnail="https://placebear.com/g/400/400"></calcite-avatar>
    <calcite-icon
      scale="s"
      icon="exclamation-mark-triangle"
      slot="content-end"
      style="color: var(--calcite-color-status-danger)"
    ></calcite-icon>
    <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
    <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
  </calcite-list-item>
</calcite-list>
```
