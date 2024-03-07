# calcite-shell

The `calcite-shell` component is used for application layout management. It is a container for the view as well as other calcite components like `calcite-shell-panel` and `calcite-tip-manager`.

**Note:** `calcite-shell` supports tablet as the smallest screen size.

<!-- Auto Generated Below -->

## Usage

### Advanced

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
      <img slot="thumbnail" src="https://placebear.com/400/200" alt="" />
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

### Basic

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

### With-panel-and-action-bar

Renders a single panel with actions in an action bar.

```html
<calcite-shell>
  <calcite-shell-panel slot="panel-start" position="start">
    <img src="https://via.placeholder.com/300x200" alt="placeholder" />
    <calcite-action-bar slot="action-bar">
      <calcite-action text="Add" active icon="plus"></calcite-action>
      <calcite-action text="Save" disabled icon="save"></calcite-action>
      <calcite-action text="Layers" icon="layers"></calcite-action>
    </calcite-action-bar>
  </calcite-shell-panel>
</calcite-shell>
```

### With-panels

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
    <img src="https://placebear.com/1000/700" alt="" />
  </calcite-shell-center-row>
  <p>Shell Content</p>
  <!-- insert map or fillable content here -->
</calcite-shell>
```

## Properties

| Property        | Attribute        | Description                                                     | Type      | Default |
| --------------- | ---------------- | --------------------------------------------------------------- | --------- | ------- |
| `contentBehind` | `content-behind` | Positions the center content behind any `calcite-shell-panel`s. | `boolean` | `false` |

## Slots

| Slot             | Description                                                                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
|                  | A slot for adding custom content. This content will appear between any leading and trailing panels added to the component, such as a map.  |
| `"alerts"`       | A slot for adding `calcite-alert` components. When placed in this slot, the alert position will be constrained to the extent of the shell. |
| `"center-row"`   | [Deprecated] Use the `"panel-bottom"` slot instead. A slot for adding the bottom `calcite-shell-center-row`.                               |
| `"footer"`       | A slot for adding footer content. This content will be positioned at the bottom of the component.                                          |
| `"header"`       | A slot for adding header content. This content will be positioned at the top of the component.                                             |
| `"modals"`       | A slot for adding `calcite-modal` components. When placed in this slot, the modal position will be constrained to the extent of the shell. |
| `"panel-bottom"` | A slot for adding the bottom `calcite-shell-center-row`.                                                                                   |
| `"panel-end"`    | A slot for adding the ending `calcite-shell-panel`.                                                                                        |
| `"panel-start"`  | A slot for adding the starting `calcite-shell-panel`.                                                                                      |
| `"panel-top"`    | A slot for adding the top `calcite-shell-center-row`.                                                                                      |
| `"sheets"`       | A slot for adding `calcite-sheet` components. When placed in this slot, the sheet position will be constrained to the extent of the shell. |

## CSS Custom Properties

| Name                               | Description                                                                                                                                           |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--calcite-shell-background-color` | The background color of the component.                                                                                                                |
| `--calcite-shell-border-color`     | The border color of the component.                                                                                                                    |
| `--calcite-shell-tip-spacing`      | [Deprecated] Set spacing on the `calcite-tip-manager` instead. The left and right spacing of the `calcite-tip-manager` when slotted in the component. |

---

*Built with [StencilJS](https://stenciljs.com/)*
