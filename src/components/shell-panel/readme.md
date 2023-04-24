# calcite-shell-panel

The `calcite-shell-panel` is a child component of `calcite-shell` used as a container to display other components like `calcite-block` and `calcite-flow`.

<!-- Auto Generated Below -->

## Usage

### Basic

Renders a basic shell panel with text content.

```html
<calcite-shell-panel>
  <p>Primary Content</p>
</calcite-shell-panel>
```

### With-action-bar

Renders a panel with an action bar.

```html
<calcite-shell-panel>
  <calcite-action-bar slot="action-bar">
    <calcite-action text="Add" icon="plus"></calcite-action>
    <calcite-action text="Save" icon="save"></calcite-action>
    <calcite-action text="Layers" icon="layers"></calcite-action>
  </calcite-action-bar>
</calcite-shell-panel>
```

### With-custom-element

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

### With-flow

```html
<calcite-shell-panel>
  <calcite-action-bar slot="action-bar">
    <calcite-action text="Add" icon="plus"></calcite-action>
    <calcite-action text="Save" icon="save"></calcite-action>
    <calcite-action text="Layers" icon="layers"></calcite-action>
  </calcite-action-bar>
  <calcite-flow>
    <calcite-flow-item> ... </calcite-flow-item>
    <calcite-flow-item> ... </calcite-flow-item>
  </calcite-flow>
</calcite-shell-panel>
```

### With-panel

```html
<calcite-shell-panel>
  <calcite-action-bar slot="action-bar">
    <calcite-action text="Add" icon="plus"></calcite-action>
    <calcite-action text="Save" icon="save"></calcite-action>
    <calcite-action text="Layers" icon="layers"></calcite-action>
  </calcite-action-bar>
  <calcite-panel> ... </calcite-panel>
</calcite-shell-panel>
```

## Properties

| Property              | Attribute               | Description                                                                                                | Type                | Default       |
| --------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------- | ------------- |
| `collapsed`           | `collapsed`             | When `true`, hides the component's content area.                                                           | `boolean`           | `false`       |
| `detached`            | `detached`              | When `true`, the content area displays like a floating panel.                                              | `boolean`           | `false`       |
| `detachedHeightScale` | `detached-height-scale` | When `detached`, specifies the maximum height of the component.                                            | `"l" \| "m" \| "s"` | `"l"`         |
| `intlResize`          | `intl-resize`           | Accessible name for the resize separator.                                                                  | `string`            | `TEXT.resize` |
| `position`            | `position`              | Specifies the component's position. Will be flipped when the element direction is right-to-left (`"rtl"`). | `"end" \| "start"`  | `undefined`   |
| `resizable`           | `resizable`             | When `true` and not `detached`, the component's content area is resizable.                                 | `boolean`           | `false`       |
| `widthScale`          | `width-scale`           | Specifies the width of the component's content area.                                                       | `"l" \| "m" \| "s"` | `"m"`         |

## Slots

| Slot           | Description                                                |
| -------------- | ---------------------------------------------------------- |
|                | A slot for adding content to the component.                |
| `"action-bar"` | A slot for adding a `calcite-action-bar` to the component. |

---

_Built with [StencilJS](https://stenciljs.com/)_
