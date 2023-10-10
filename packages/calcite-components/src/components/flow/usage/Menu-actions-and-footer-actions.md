Renders a flow with `"header-actions-start"`, `"header-actions-end"`, `"header-menu-actions"`, `"fab"`, and `"footer"` slots.

```html
<calcite-shell>
  <calcite-shell-panel slot="panel-start" width-scale="l">
    <calcite-flow>
      <calcite-flow-item heading="Map Options">
        <calcite-action icon="question" text="Information" slot="header-actions-start"></calcite-action>
        <calcite-action icon="save" text="Save" slot="header-actions-end"></calcite-action>
        <calcite-action icon="reset" text-enabled text="Reset" slot="header-menu-actions"></calcite-action>
        <calcite-action icon="pencil" text-enabled text="Rename" slot="header-menu-actions"> </calcite-action>
        <calcite-fab slot="fab"></calcite-fab>
        <calcite-button width="half" slot="footer" appearance="outline">Cancel</calcite-button>
        <calcite-button width="half" slot="footer">Next</calcite-button>
      </calcite-flow-item>
    </calcite-flow>
  </calcite-shell-panel>
  <calcite-panel heading="Map"></calcite-panel>
</calcite-shell>
```
