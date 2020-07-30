#### Basic

Renders a basic flow with a couple `calcite-flow-item`s.

```html
<calcite-flow>
  <calcite-flow-item heading="one, two, three, four">
    <!-- image -->
  </calcite-flow-item>
  <calcite-flow-item heading="tell me that you love me more">
    <!-- image -->
  </calcite-flow-item>
</calcite-flow>
```

#### Menu-actions and footer-actions

Renders a flow with menu-actions and footer-actions in the form of buttons.

```html
<calcite-flow>
  <calcite-flow-item heading="What are the most popular commute alternatives?">
    <button slot="menu-actions">Reset</button>
    <button slot="menu-actions">Rename</button>
    <button slot="footer-actions">Save</button>
    <button slot="footer-actions">Cancel</button>
  </calcite-flow-item>
</calcite-flow>
```
