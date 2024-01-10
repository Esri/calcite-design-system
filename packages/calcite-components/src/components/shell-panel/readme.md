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
    <calcite-panel> <img src="https://placebear.com/g/600/600" alt="" /> </calcite-panel>
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
    <calcite-flow-item> <img src="https://placebear.com/g/600/600" alt="" /> </calcite-flow-item>
    <calcite-flow-item> <img src="https://placebear.com/g/500/500" alt="" /> </calcite-flow-item>
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
  <calcite-panel> <img src="https://placebear.com/g/600/600" alt="" /> </calcite-panel>
</calcite-shell-panel>
```

## Properties

| Property              | Attribute               | Description                                                                                                                                                                                                                                                                         | Type                             | Default      |
| --------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ------------ |
| `collapsed`           | `collapsed`             | When `true`, hides the component's content area.                                                                                                                                                                                                                                    | `boolean`                        | `false`      |
| `detached`            | `detached`              | <span style="color:red">**[DEPRECATED]**</span> Use `displayMode` instead.<br/><br/>When `true`, the content area displays like a floating panel.                                                                                                                                   | `boolean`                        | `false`      |
| `detachedHeightScale` | `detached-height-scale` | <span style="color:red">**[DEPRECATED]**</span> Use `heightScale` instead.<br/><br/>When `displayMode` is `float`, specifies the maximum height of the component.                                                                                                                   | `"l" \| "m" \| "s"`              | `undefined`  |
| `displayMode`         | `display-mode`          | Specifies the display mode - `"dock"` (full height, displays adjacent to center content), `"float"` (not full height, content is separated detached from `calcite-action-bar`, displays on top of center content), or `"overlay"` (full height, displays on top of center content). | `"dock" \| "float" \| "overlay"` | `"dock"`     |
| `heightScale`         | `height-scale`          | When `layout` is `horizontal`, specifies the maximum height of the component.                                                                                                                                                                                                       | `"l" \| "m" \| "s"`              | `undefined`  |
| `layout`              | `layout`                | The direction of the component.                                                                                                                                                                                                                                                     | `"horizontal" \| "vertical"`     | `"vertical"` |
| `messageOverrides`    | `message-overrides`     | Use this property to override individual strings used by the component.                                                                                                                                                                                                             | `ShellPanelMessages`             | `undefined`  |
| `position`            | `position`              | Specifies the component's position. Will be flipped when the element direction is right-to-left (`"rtl"`).                                                                                                                                                                          | `"end" \| "start"`               | `"start"`    |
| `resizable`           | `resizable`             | When `true` and `displayMode` is not `float`, the component's content area is resizable.                                                                                                                                                                                            | `boolean`                        | `false`      |
| `widthScale`          | `width-scale`           | When `layout` is `vertical`, specifies the width of the component.                                                                                                                                                                                                                  | `"l" \| "m" \| "s"`              | `"m"`        |

## Slots

| Slot           | Description                                                |
| -------------- | ---------------------------------------------------------- |
|                | A slot for adding custom content.                          |
| `"action-bar"` | A slot for adding a `calcite-action-bar` to the component. |

## CSS Custom Properties

| Name                                        | Description                                                                                                                           |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `--calcite-shell-panel-detached-max-height` | [Deprecated] Use the `heightScale` property instead. When `displayMode` is `float`, specifies the maximum height of the component.    |
| `--calcite-shell-panel-height`              | When `layout` is `horizontal`, or `layout` is `vertical` and `displayMode` is `float`, specifies the height of the component.         |
| `--calcite-shell-panel-max-height`          | When `layout` is `horizontal`, or `layout` is `vertical` and `displayMode` is `float`, specifies the maximum height of the component. |
| `--calcite-shell-panel-max-width`           | Specifies the maximum width of the component.                                                                                         |
| `--calcite-shell-panel-min-height`          | When `layout` is `horizontal`, or `layout` is `vertical` and `displayMode` is `float`, specifies the minimum height of the component. |
| `--calcite-shell-panel-min-width`           | Specifies the minimum width of the component.                                                                                         |
| `--calcite-shell-panel-width`               | Specifies the width of the component.                                                                                                 |
| `--calcite-shell-panel-z-index`             | Specifies the z-index value for the component.                                                                                        |

---

*Built with [StencilJS](https://stenciljs.com/)*
