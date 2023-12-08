Renders a shell with leading and trailing floating panels, action bar/pad, block, flow, tip manager, footer.

```html
<calcite-shell>
  <calcite-shell-panel slot="panel-start" position="start" display-mode="float">
    <calcite-action-bar slot="action-bar">
      <calcite-action-group label="Manage item">
        <calcite-action text="Add" icon="plus"></calcite-action>
        <calcite-action text="Save" disabled icon="save"></calcite-action>
        <calcite-action text="Layers" active indicator icon="layers"></calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
    <calcite-block collapsible heading="Modes of transportation" summary="This is the primary.">
      <calcite-block-content>
        <calcite-action text="Driving" text-enabled indicator icon="car"></calcite-action>
        <calcite-action text="Biking" text-enabled icon="biking"></calcite-action>
        <calcite-action text="Flying" text-enabled icon="plane"></calcite-action>
      </calcite-block-content>
    </calcite-block>
    <calcite-block collapsible heading="Activities" summary="Additional content.">
      <calcite-block-content>
        <calcite-action text="Running" text-enabled indicator icon="running"></calcite-action>
        <calcite-action text="Painting" text-enabled icon="paintBucket"></calcite-action>
        <calcite-action text="Drone Flying" text-enabled icon="droneFlyingWing"></calcite-action>
      </calcite-block-content>
    </calcite-block>
  </calcite-shell-panel>

  <calcite-shell-panel slot="panel-end" position="end" display-mode="float" height-scale="l">
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
    <calcite-flow>
      <calcite-flow-item heading="Layer settings">
        <calcite-block collapsible open heading="Contextual Content" summary="Select goodness">
          <calcite-value-list multiple filter-enabled>
            <calcite-value-list-item
              label="2018 Population Density (Esri)"
              description="{POPDENS_CY}"
              value="POPDENS_CY"
            >
              <calcite-action slot="actions-end" icon="person"></calcite-action>
            </calcite-value-list-item>
            <calcite-value-list-item
              label="2018 Population Density [Updated]"
              description="{POPDENS_CY}"
              value="POPDENS_CY2"
            >
              <calcite-action slot="actions-end" icon="person2"></calcite-action>
            </calcite-value-list-item>
            <calcite-value-list-item label="2018 Total Households (Esri)" description="{TOTHH_CY}" value="TOTHH_CY">
              <calcite-action slot="actions-end" icon="home"></calcite-action>
            </calcite-value-list-item>
          </calcite-value-list>
        </calcite-block>
      </calcite-flow-item>
    </calcite-flow>
  </calcite-shell-panel>
  <calcite-tip-manager slot="center-row">
    <calcite-tip heading="Be cautious of wildlife">
      <img slot="thumbnail" src="https://placebear.com/400/200" alt="A bear in its natural habitat." />
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat, reiciendis est quisquam dolor deserunt saepe
        corrupti temporibus a totam adipisci accusantium ex non quidem et veritatis asperiores molestias eligendi
        provident magni nostrum, vero, laboriosam cupiditate!
      </p>
    </calcite-tip>
  </calcite-tip-manager>
  <footer slot="footer">
    <calcite-action-bar slot="action-bar" layout="horizontal">
      <calcite-action-group label="Manage item">
        <calcite-action text="Add" active icon="question"></calcite-action>
        <calcite-action text="Settings" icon="gear"></calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
  </footer>
</calcite-shell>
```
