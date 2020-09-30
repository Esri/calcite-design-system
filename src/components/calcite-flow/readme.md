# calcite-flow

The `calcite-flow` component is a series of panels that provides a user with a workflow (eg. editing experience), by which the user can switch from panel to panel of `calcite-panel`s.

<!-- Auto Generated Below -->

## Usage

### Basic

#### Basic

Renders a basic flow with a couple `calcite-panel`s.

```html
<calcite-flow>
  <calcite-panel heading="one, two, three, four">
    <!-- image -->
  </calcite-panel>
  <calcite-panel heading="tell me that you love me more">
    <!-- image -->
  </calcite-panel>
</calcite-flow>
```

#### header-menu-actions
Renders a flow with header-menu-actions which appear in a drop-down like menu.

```html
<calcite-flow>
  <calcite-panel heading="What are the most popular commute alternatives?">
    <calcite-action text="Reset" slot="header-menu-actions" text-enabled></calcite-action>
    <calcite-action text="Rename" slot="header-menu-actions" text-enabled></calcite-action>
  </calcite-panel>
</calcite-flow>
```

#### footer-actions
Renders a flow with footer actions.

```html
<calcite-flow>
  <calcite-panel heading="What are the most popular commute alternatives?">
    <calcite-button slot="footer-actions">Save</calcite-button>
    <calcite-button slot="footer-actions">Cancel</calcite-button>
  </calcite-panel>
</calcite-flow>
```

#### footer
Renders a flow with custom footer.

```html
<calcite-flow>
  <calcite-panel heading="What are the most popular commute alternatives?">
    <div class="my-custom-footer" slot="footer">
      I'm a custom footer.
    </div>
  </calcite-panel>
</calcite-flow>
```


## Properties

| Property | Attribute | Description                               | Type                | Default     |
| -------- | --------- | ----------------------------------------- | ------------------- | ----------- |
| `theme`  | `theme`   | Used to set the component's color scheme. | `"dark" \| "light"` | `undefined` |

## Methods

### `back() => Promise<HTMLCalciteFlowItemElement>`

Removes the currently active `calcite-panel`.

#### Returns

Type: `Promise<HTMLCalciteFlowItemElement>`

## Slots

| Slot | Description                                         |
| ---- | --------------------------------------------------- |
|      | A slot for adding `calcite-panel`s to the flow. |

---

_Built with [StencilJS](https://stenciljs.com/)_
