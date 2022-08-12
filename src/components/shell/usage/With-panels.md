Renders a shell with a header and panels on the left and right sides of the app.

```html
<calcite-shell>
  <calcite-shell-panel slot="panel-start" position="start">
    Leading panel! (on the left side, since this is a LTR app)
  </calcite-shell-panel>
  <calcite-shell-panel slot="panel-end" position="end"> Trailing panel! (right side) </calcite-shell-panel>
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
