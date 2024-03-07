# calcite-action-menu

<!-- Auto Generated Below -->

## Properties

| Property             | Attribute             | Description                                                                                                                                                                                                                                                                                                                                                                 | Type                                                                                                                                                                                                                                                                                                              | Default      |
| -------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `appearance`         | `appearance`          | Specifies the appearance of the component.                                                                                                                                                                                                                                                                                                                                  | `"solid" \| "transparent"`                                                                                                                                                                                                                                                                                        | `"solid"`    |
| `expanded`           | `expanded`            | When `true`, the component is expanded.                                                                                                                                                                                                                                                                                                                                     | `boolean`                                                                                                                                                                                                                                                                                                         | `false`      |
| `flipPlacements`     | --                    | Defines the available placements that can be used when a flip occurs.                                                                                                                                                                                                                                                                                                       | `Placement[]`                                                                                                                                                                                                                                                                                                     | `undefined`  |
| `label` *(required)* | `label`               | Specifies the text string for the component.                                                                                                                                                                                                                                                                                                                                | `string`                                                                                                                                                                                                                                                                                                          | `undefined`  |
| `open`               | `open`                | When `true`, the component is open.                                                                                                                                                                                                                                                                                                                                         | `boolean`                                                                                                                                                                                                                                                                                                         | `false`      |
| `overlayPositioning` | `overlay-positioning` | Determines the type of positioning to use for the overlaid content. Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout. `"fixed"` should be used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`. | `"absolute" \| "fixed"`                                                                                                                                                                                                                                                                                           | `"absolute"` |
| `placement`          | `placement`           | Determines where the component will be positioned relative to the `referenceElement`.                                                                                                                                                                                                                                                                                       | `"auto" \| "top" \| "right" \| "bottom" \| "left" \| "top-start" \| "top-end" \| "right-start" \| "right-end" \| "bottom-start" \| "bottom-end" \| "left-start" \| "left-end" \| "auto-start" \| "auto-end" \| "leading-start" \| "leading" \| "leading-end" \| "trailing-end" \| "trailing" \| "trailing-start"` | `"auto"`     |
| `scale`              | `scale`               | Specifies the size of the component's trigger `calcite-action`.                                                                                                                                                                                                                                                                                                             | `"l" \| "m" \| "s"`                                                                                                                                                                                                                                                                                               | `undefined`  |

## Events

| Event                   | Description                                | Type                |
| ----------------------- | ------------------------------------------ | ------------------- |
| `calciteActionMenuOpen` | Fires when the `open` property is toggled. | `CustomEvent<void>` |

## Methods

### `setFocus() => Promise<void>`

Sets focus on the component.

#### Returns

Type: `Promise<void>`

## Slots

| Slot        | Description                                                       |
| ----------- | ----------------------------------------------------------------- |
|             | A slot for adding `calcite-action`s.                              |
| `"tooltip"` | A slot for adding an tooltip for the menu.                        |
| `"trigger"` | A slot for adding a `calcite-action` to trigger opening the menu. |

## CSS Custom Properties

| Name                                                   | Description                                                                                           |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| `--calcite-action-menu-action-background-color`        | defines the background color of an action sub-component inside the component.                         |
| `--calcite-action-menu-action-background-color-active` | defines the background color of an action sub-component when active inside the component.             |
| `--calcite-action-menu-action-background-color-hover`  | defines the background color of an action sub-component when hovered or focused inside the component. |
| `--calcite-action-menu-action-indicator-color`         | defines the indicator color of an action sub-component inside the component.                          |
| `--calcite-action-menu-action-indicator-color-active`  | defines the indicator color of an action sub-component when active inside the component.              |
| `--calcite-action-menu-action-indicator-color-hover`   | defines the indicator color of an action sub-component when hovered or focused inside the component.  |
| `--calcite-action-menu-action-text-color`              | defines the text color of an action sub-component inside the component.                               |
| `--calcite-action-menu-action-text-color-active`       | defines the text color of an action sub-component when active inside the component.                   |
| `--calcite-action-menu-action-text-color-hover`        | defines the text color of an action sub-component when hovered or focused inside the component.       |
| `--calcite-action-menu-group-separator-border-color`   | The border color of the sub-component.                                                                |
| `--calcite-action-menu-popover-background-color`       | defines the background color of the sub-component.                                                    |
| `--calcite-action-menu-popover-border-color`           | defines the border color of the sub-component.                                                        |
| `--calcite-action-menu-popover-corner-radius`          | defines the corner radius of the sub-component.                                                       |
| `--calcite-action-menu-popover-shadow`                 | defines the shadow of the component.                                                                  |
| `--calcite-action-menu-popover-text-color`             | defines the text color of the sub-component.                                                          |

## Dependencies

### Used by

- [calcite-action-group](../action-group)
- [calcite-block](../block)
- [calcite-panel](../panel)

### Depends on

- [calcite-action](../action)
- [calcite-popover](../popover)

### Graph

```mermaid
graph TD;
  calcite-action-menu --> calcite-action
  calcite-action-menu --> calcite-popover
  calcite-action --> calcite-loader
  calcite-action --> calcite-icon
  calcite-popover --> calcite-action
  calcite-popover --> calcite-icon
  calcite-action-group --> calcite-action-menu
  calcite-block --> calcite-action-menu
  calcite-panel --> calcite-action-menu
  style calcite-action-menu fill:#f9f,stroke:#333,stroke-width:4px
```

---

*Built with [StencilJS](https://stenciljs.com/)*
