# calcite-action-pad

For comprehensive guidance on using and implementing `calcite-action-pad`, refer to the [documentation page](https://developers.arcgis.com/calcite-design-system/components/action-pad/).

<!-- Auto Generated Below -->

## Properties

| Property               | Attribute                 | Description                                                                                                                                                                                                                                                                                                                                                                 | Type                                   | Default      |
| ---------------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ------------ |
| `actionsEndGroupLabel` | `actions-end-group-label` | Specifies the accessible label for the last `calcite-action-group`.                                                                                                                                                                                                                                                                                                         | `string`                               | `undefined`  |
| `expandDisabled`       | `expand-disabled`         | When `true`, the expand-toggling behavior is disabled.                                                                                                                                                                                                                                                                                                                      | `boolean`                              | `false`      |
| `expanded`             | `expanded`                | When `true`, the component is expanded.                                                                                                                                                                                                                                                                                                                                     | `boolean`                              | `false`      |
| `layout`               | `layout`                  | Indicates the layout of the component.                                                                                                                                                                                                                                                                                                                                      | `"grid" \| "horizontal" \| "vertical"` | `"vertical"` |
| `messageOverrides`     | `message-overrides`       | Use this property to override individual strings used by the component.                                                                                                                                                                                                                                                                                                     | `ActionPadMessages`                    | `undefined`  |
| `overlayPositioning`   | `overlay-positioning`     | Determines the type of positioning to use for the overlaid content. Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout. `"fixed"` should be used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`. | `"absolute" \| "fixed"`                | `"absolute"` |
| `position`             | `position`                | Arranges the component depending on the element's `dir` property.                                                                                                                                                                                                                                                                                                           | `"end" \| "start"`                     | `undefined`  |
| `scale`                | `scale`                   | Specifies the size of the expand `calcite-action`.                                                                                                                                                                                                                                                                                                                          | `"l" \| "m" \| "s"`                    | `undefined`  |

## Events

| Event                    | Description                                    | Type                |
| ------------------------ | ---------------------------------------------- | ------------------- |
| `calciteActionPadToggle` | Fires when the `expanded` property is toggled. | `CustomEvent<void>` |

## Methods

### `setFocus() => Promise<void>`

Sets focus on the component's first focusable element.

#### Returns

Type: `Promise<void>`

## Slots

| Slot               | Description                                                |
| ------------------ | ---------------------------------------------------------- |
|                    | A slot for adding `calcite-action`s to the component.      |
| `"expand-tooltip"` | A slot to set the `calcite-tooltip` for the expand toggle. |

## CSS Custom Properties

| Name                                      | Description                                                                             |
| ----------------------------------------- | --------------------------------------------------------------------------------------- |
| `--calcite-action-pad-corner-radius`      | Specifies the component's border radius.                                                |
| `--calcite-action-pad-expanded-max-width` | When `layout` is `"vertical"`, specifies the component's maximum width when `expanded`. |
| `--calcite-action-pad-items-space`        | Specifies the component's space between slotted components.                             |

## Dependencies

### Depends on

- [calcite-action-group](../action-group)
- [calcite-action](../action)

### Graph

```mermaid
graph TD;
  calcite-action-pad --> calcite-action-group
  calcite-action-pad --> calcite-action
  calcite-action-group --> calcite-action-menu
  calcite-action-group --> calcite-action
  calcite-action-menu --> calcite-action
  calcite-action-menu --> calcite-popover
  calcite-action --> calcite-loader
  calcite-action --> calcite-icon
  calcite-popover --> calcite-action
  calcite-popover --> calcite-icon
  style calcite-action-pad fill:#f9f,stroke:#333,stroke-width:4px
```

---

*Built with [StencilJS](https://stenciljs.com/)*
