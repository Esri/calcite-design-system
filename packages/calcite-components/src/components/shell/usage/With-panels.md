Renders a shell with a header and panels on the left and right sides of the app.

```html
<calcite-shell>
  <div slot="header">
    <header>
      <h2>Shell Header: My App</h2>
    </header>
  </div>
  <calcite-shell-panel slot="panel-start" position="start">
    <calcite-action-bar slot="action-bar">
      <calcite-action-group label="Manage item">
        <calcite-action text="Add" icon="plus"></calcite-action>
        <calcite-action text="Save" disabled icon="save"></calcite-action>
        <calcite-action text="Layers" active indicator icon="layers"></calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
  </calcite-shell-panel>
  <calcite-shell-panel slot="panel-end" position="end">
    <calcite-action-bar slot="action-bar">
      <calcite-action-group label="Manage item">
        <calcite-action text="Add" active icon="plus"></calcite-action>
        <calcite-action text="Save" disabled icon="save"></calcite-action>
        <calcite-action text="Layers" icon="layers"></calcite-action>
      </calcite-action-group>
      <calcite-action-group label="Item types">
        <calcite-action text="Add" icon="file"></calcite-action>
        <calcite-action text="Save" disabled icon="folder"></calcite-action>
      </calcite-action-group>
      <calcite-action slot="actions-end" text="Tips" icon="lightbulb"></calcite-action>
    </calcite-action-bar>
  </calcite-shell-panel>
  <calcite-shell-center-row slot="center-row" position="end" height-scale="m">
    <img src="https://placebear.com/1000/700" alt="placeholder" />
  </calcite-shell-center-row>
  <p>Shell Content</p>
  <!-- insert map or fillable content here -->
</calcite-shell>
```
