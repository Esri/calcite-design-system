Add `calcite-match-height` to a wrapping element to ensure proper height, scrolling, and sticky behavior (header, footer, fab). Note that multiple levels of nesting is not supported.

```html
<calcite-shell-panel>
  <calcite-action-bar slot="action-bar">
    <calcite-action text="Add" icon="plus"></calcite-action>
    <calcite-action text="Save" icon="save"></calcite-action>
    <calcite-action text="Layers" icon="layers"></calcite-action>
  </calcite-action-bar>
  <your-custom-element class="calcite-match-height">
    <calcite-panel> ... </calcite-panel>
  </your-custom-element>
</calcite-shell-panel>
```
