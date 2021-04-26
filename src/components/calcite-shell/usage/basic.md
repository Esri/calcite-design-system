#### Basic

Renders a basic shell with a header and a footer.

```html
<calcite-shell>
  <div slot="header">
    <header>
      <h2>Shell Header: My App</h2>
    </header>
  </div>
  <p>Shell Content</p>
  <!-- insert map or fillable content here -->
  <footer slot="footer">Footer</footer>
</calcite-shell>
```

#### With panels

Renders a shell with a header and panels on the left and right sides of the app.

```html
<calcite-shell>
  <calcite-shell-panel slot="primary-panel" position="start">
    Leading panel! (on the left side, since this is a LTR app)
  </calcite-shell-panel>
  <calcite-shell-panel slot="contextual-panel" position="end"> Trailing panel! (right side) </calcite-shell-panel>
  <calcite-shell-center-row slot="center-row" position="end" height-scale="m">
    Center Row! (center bottom)
  </calcite-shell-center-row>
  <div slot="header">
    <header>
      <h2>Shell Header: My App</h2>
    </header>
  </div>
  <p>Shell Content</p>
  <!-- insert map or fillable content here -->
</calcite-shell>
```

#### Panel with action bar

Renders a single panel with actions in an action bar.

```html
<calcite-shell>
  <calcite-shell-panel slot="primary-panel" position="start">
    <img src="https://via.placeholder.com/300x200" alt="placeholder" />
    <calcite-action-bar slot="action-bar">
      <calcite-action text="Add" active icon="plus"></calcite-action>
      <calcite-action text="Save" disabled icon="save"></calcite-action>
      <calcite-action text="Layers" icon="layers"></calcite-action>
    </calcite-action-bar>
  </calcite-shell-panel>
</calcite-shell>
```
