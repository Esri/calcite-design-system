```html
<calcite-list>
  <calcite-list-item
    label="Dog"
    description="(Canis familiaris) A carnivorous mammal closely related to the gray wolf that has been domesticated as a pet."
  >
    <calcite-action icon="drag" label="drag" scale="s" slot="actions-start"></calcite-action>
    <calcite-icon scale="l" icon="layer" slot="content-start"></calcite-icon>
    <calcite-avatar scale="l" slot="content-start" thumbnail="https://placedog.net/300/300"></calcite-avatar>
    <calcite-icon scale="s" icon="check" slot="content-end" style="color: var(--calcite-ui-success)"></calcite-icon>
    <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
    <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
  </calcite-list-item>
  <calcite-list-item
    label="Cat"
    description="(Felis catus) A carnivorous mammal that has long been domesticated as a pet and for catching rats and mice."
  >
    <calcite-action icon="drag" label="drag" scale="s" slot="actions-start"></calcite-action>
    <calcite-icon scale="l" icon="layer" slot="content-start"></calcite-icon>
    <calcite-avatar scale="l" slot="content-start" thumbnail="https://placekitten.com/g/300/300"></calcite-avatar>
    <calcite-icon scale="s" icon="check" slot="content-end" style="color: var(--calcite-ui-success)"></calcite-icon>
    <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
    <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
  </calcite-list-item>
  <calcite-list-item
    label="Asteroid"
    description="(Ursidae of the order Carnivora) large and heavy animals that have thick hair and sharp claws."
  >
    <calcite-action icon="drag" label="drag" scale="s" slot="actions-start"></calcite-action>
    <calcite-icon scale="l" icon="layer" slot="content-start"></calcite-icon>
    <calcite-avatar scale="l" slot="content-start" thumbnail="https://placebear.com/g/400/400"></calcite-avatar>
    <calcite-icon
      scale="s"
      icon="exclamation-mark-triangle"
      slot="content-end"
      style="color: var(--calcite-ui-danger)"
    ></calcite-icon>
    <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
    <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
  </calcite-list-item>
</calcite-list>
```
