#### Basic

Renders a basic shell panel with text content.

```html
<calcite-shell-panel>
  <p>Primary Content</p>
</calcite-shell-panel>
```

#### With action bar

Renders a panel with an action bar.

```html
<calcite-shell-panel>
  <calcite-action-bar slot="action-bar">
    <calcite-action text="Add" icon="plus"></calcite-action>
    <calcite-action text="Save" icon="save"></calcite-action>
    <calcite-action text="Layers" icon="layers"></calcite-action>
  </calcite-action-bar>
</calcite-shell-panel>
```
