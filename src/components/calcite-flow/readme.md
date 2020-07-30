# calcite-flow

The `calcite-flow` component is a series of panels that provides a user with a workflow (eg. editing experience), by which the user can switch from panel to panel of `calcite-flow-item`s.

<!-- Auto Generated Below -->


## Usage

### Basic

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



## Properties

| Property | Attribute | Description                               | Type                | Default     |
| -------- | --------- | ----------------------------------------- | ------------------- | ----------- |
| `theme`  | `theme`   | Used to set the component's color scheme. | `"dark" \| "light"` | `undefined` |


## Methods

### `back() => Promise<HTMLCalciteFlowItemElement>`

Removes the currently active `calcite-flow-item`.

#### Returns

Type: `Promise<HTMLCalciteFlowItemElement>`




## Slots

| Slot | Description                                         |
| ---- | --------------------------------------------------- |
|      | A slot for adding `calcite-flow-item`s to the flow. |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
