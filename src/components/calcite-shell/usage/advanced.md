#### Advanced

Renders a shell with leading and trailing floating panels, action bar/pad, block, flow, tip manager, footer.

```html
<calcite-shell>
  <calcite-shell-panel slot="primary-panel" position="start" detached>
    <calcite-action-bar slot="action-bar" theme="dark">
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"></calcite-action>
        <calcite-action text="Save" disabled icon="save"></calcite-action>
        <calcite-action text="Layers" active indicator icon="layers"></calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"></calcite-action>
        <calcite-action text="Layers" indicator icon="layers"></calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
    <calcite-block collapsible  heading="Primary Content" summary="This is the primary.">
      <calcite-block-content>
        <calcite-action text="Puppies" text-enabled indicator icon="plus"></calcite-action>
        <calcite-action text="Kittens" text-enabled icon="save"></calcite-action>
        <calcite-action text="Birds?" text-enabled icon="banana"></calcite-action>
      </calcite-block-content>
    </calcite-block>
    <calcite-block collapsible  heading="Additional Block" summary="Baby shark doo doo doo doo.">
      <calcite-block-content>
          <p>Cool thing.</p>
      </calcite-block-content>
    </calcite-block>
  </calcite-shell-panel>

   <calcite-shell-panel slot="contextual-panel" position="end" detached height-scale="l">
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Add" active icon="plus"></calcite-action>
          <calcite-action text="Save" disabled icon="save"></calcite-action>
          <calcite-action text="Layers" icon="layers"></calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action text="Add" icon="plus"></calcite-action>
          <calcite-action text="Save" disabled icon="save"></calcite-action>
          <calcite-action text="Layers" icon="layers"></calcite-action>
        </calcite-action-group>
        <calcite-action slot="bottom-actions" text="Tips" icon="lightbulb"></calcite-action>
      </calcite-action-bar>
      <calcite-flow>
        <calcite-panel heading="Layer settings">
          <calcite-block collapsible open heading="Contextual Content" summary="Select goodness">
            <calcite-value-list multiple filter-enabled>
              <calcite-value-list-item label="2018 Population Density (Esri)" description="{POPDENS_CY}" value="POPDENS_CY">
                <calcite-action slot="actions-end" icon="camera-flash-on"></calcite-action>
              </calcite-value-list-item>
              <calcite-value-list-item label="2018 Population Density [Updated]" description="{POPDENS_CY}" value="POPDENS_CY2">
                <calcite-action slot="actions-end" icon="banana"></calcite-action>
              </calcite-value-list-item>
              <calcite-value-list-item label="2018 Total Households (Esri)" description="{TOTHH_CY}" value="TOTHH_CY">
                <calcite-action slot="actions-end" icon="person2"></calcite-action>
              </calcite-value-list-item>
            </calcite-value-list>
          </calcite-block>
        </calcite-panel>
      </calcite-flow>
  </calcite-shell-panel>
  <calcite-tip-manager slot="center-row">
    <calcite-tip heading="The Red Rocks and Blue Water" thumbnail="https://placeimg.com/1000/600" text-thumbnail="This is an image of nature.">
    <calcite-tip heading="The Long Trees" thumbnail="https://placeimg.com/1000/600" text-thumbnail="This is an image of trees.">
  </calcite-tip-manager>
  <footer slot="footer">Footer</footer>
</calcite-shell>
```
