# calcite-shell-panel

The `calcite-shell-panel` is a child component of `calcite-shell` used as a container to display other components like `calcite-block` and `calcite-flow`.

<!-- Auto Generated Below -->

## Usage

### Basic

#### Basic

Renders a basic shell panel with text content.

```html
<calcite-shell-panel>
  <p>Primary Content</p>
</calcite-shell-panel>
```

#### With action bar

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

## Properties

| Property              | Attribute               | Description                                                          | Type                | Default     |
| --------------------- | ----------------------- | -------------------------------------------------------------------- | ------------------- | ----------- |
| `collapsed`           | `collapsed`             | Hide the content panel.                                              | `boolean`           | `false`     |
| `detached`            | `detached`              | This property makes the content area appear like a "floating" panel. | `boolean`           | `false`     |
| `detachedHeightScale` | `detached-height-scale` | Specifies the maxiumum height of the contents when detached.         | `"l" \| "m" \| "s"` | `"l"`       |
| `position`            | `position`              | Arranges the component depending on the elements 'dir' property.     | `"end" \| "start"`  | `undefined` |
| `widthScale`          | `width-scale`           | This sets width of the content area.                                 | `"l" \| "m" \| "s"` | `"m"`       |

## Events

| Event                     | Description                             | Type               |
| ------------------------- | --------------------------------------- | ------------------ |
| `calciteShellPanelToggle` | Emitted when collapse has been toggled. | `CustomEvent<any>` |

## Slots

| Slot           | Description                                            |
| -------------- | ------------------------------------------------------ |
|                | A slot for adding content to the shell panel.          |
| `"action-bar"` | A slot for adding a `calcite-action-bar` to the panel. |

## Utility class

| Class                  | Description                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------------- |
| `calcite-match-height` | Provides correct height and scrolling behavior for non-Calcite elements in the generic slot. |

---

_Built with [StencilJS](https://stenciljs.com/)_
