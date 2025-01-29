# calcite-flow-item

For comprehensive guidance on using and implementing `calcite-flow-item`, refer to the [documentation page](https://developers.arcgis.com/calcite-design-system/components/flow-item/).

<!-- Auto Generated Below -->

## Properties

| Property             | Attribute             | Description                                                                                                                                                                                                                                                                                                                                                                 | Type                         | Default      |
| -------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------ |
| `beforeBack`         | --                    | When provided, the method will be called before it is removed from its parent `calcite-flow`.                                                                                                                                                                                                                                                                               | `() => Promise<void>`        | `undefined`  |
| `beforeClose`        | --                    | Passes a function to run before the component closes.                                                                                                                                                                                                                                                                                                                       | `() => Promise<void>`        | `undefined`  |
| `closable`           | `closable`            | When `true`, displays a close button in the trailing side of the component's header.                                                                                                                                                                                                                                                                                        | `boolean`                    | `false`      |
| `closed`             | `closed`              | When `true`, the component will be hidden.                                                                                                                                                                                                                                                                                                                                  | `boolean`                    | `false`      |
| `collapsed`          | `collapsed`           | When `true`, hides the component's content area.                                                                                                                                                                                                                                                                                                                            | `boolean`                    | `false`      |
| `collapsible`        | `collapsible`         | When `true`, the component is collapsible.                                                                                                                                                                                                                                                                                                                                  | `boolean`                    | `false`      |
| `description`        | `description`         | A description for the component.                                                                                                                                                                                                                                                                                                                                            | `string`                     | `undefined`  |
| `disabled`           | `disabled`            | When `true`, interaction is prevented and the component is displayed with lower opacity.                                                                                                                                                                                                                                                                                    | `boolean`                    | `false`      |
| `heading`            | `heading`             | The component header text.                                                                                                                                                                                                                                                                                                                                                  | `string`                     | `undefined`  |
| `headingLevel`       | `heading-level`       | Specifies the heading level of the component's `heading` for proper document structure, without affecting visual styling.                                                                                                                                                                                                                                                   | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | `undefined`  |
| `loading`            | `loading`             | When `true`, a busy indicator is displayed.                                                                                                                                                                                                                                                                                                                                 | `boolean`                    | `false`      |
| `menuOpen`           | `menu-open`           | When `true`, the action menu items in the `header-menu-actions` slot are open.                                                                                                                                                                                                                                                                                              | `boolean`                    | `false`      |
| `messageOverrides`   | `message-overrides`   | Use this property to override individual strings used by the component.                                                                                                                                                                                                                                                                                                     | `FlowItemMessages`           | `undefined`  |
| `overlayPositioning` | `overlay-positioning` | Determines the type of positioning to use for the overlaid content. Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout. `"fixed"` should be used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`. | `"absolute" \| "fixed"`      | `"absolute"` |
| `scale`              | `scale`               | Specifies the size of the component.                                                                                                                                                                                                                                                                                                                                        | `"l" \| "m" \| "s"`          | `"m"`        |

## Events

| Event                   | Description                                | Type                |
| ----------------------- | ------------------------------------------ | ------------------- |
| `calciteFlowItemBack`   | Fires when the back button is clicked.     | `CustomEvent<void>` |
| `calciteFlowItemClose`  | Fires when the close button is clicked.    | `CustomEvent<void>` |
| `calciteFlowItemScroll` | Fires when the content is scrolled.        | `CustomEvent<void>` |
| `calciteFlowItemToggle` | Fires when the collapse button is clicked. | `CustomEvent<void>` |

## Methods

### `scrollContentTo(options?: ScrollToOptions) => Promise<void>`

Scrolls the component's content to a specified set of coordinates.

#### Parameters

| Name      | Type              | Description                                  |
| --------- | ----------------- | -------------------------------------------- |
| `options` | `ScrollToOptions` | - allows specific coordinates to be defined. |

#### Returns

Type: `Promise<void>`

- promise that resolves once the content is scrolled to.

### `setFocus() => Promise<void>`

Sets focus on the component.

#### Returns

Type: `Promise<void>`

promise.

## Slots

| Slot                     | Description                                                                                                                       |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
|                          | A slot for adding custom content.                                                                                                 |
| `"action-bar"`           | A slot for adding a `calcite-action-bar` to the component.                                                                        |
| `"alerts"`               | A slot for adding `calcite-alert`s to the component.                                                                              |
| `"content-bottom"`       | A slot for adding content below the unnamed (default) slot and above the footer slot (if populated)                               |
| `"content-top"`          | A slot for adding content above the unnamed (default) slot and below the action-bar slot (if populated).                          |
| `"fab"`                  | A slot for adding a `calcite-fab` (floating action button) to perform an action.                                                  |
| `"footer"`               | A slot for adding custom content to the component's footer. Should not be used with the `"footer-start"` or `"footer-end"` slots. |
| `"footer-actions"`       | [Deprecated] Use the `"footer"` slot instead. A slot for adding `calcite-button`s to the component's footer.                      |
| `"footer-end"`           | A slot for adding a trailing footer custom content. Should not be used with the `"footer"` slot.                                  |
| `"footer-start"`         | A slot for adding a leading footer custom content. Should not be used with the `"footer"` slot.                                   |
| `"header-actions-end"`   | A slot for adding `calcite-action`s or content to the end side of the component's header.                                         |
| `"header-actions-start"` | A slot for adding `calcite-action`s or content to the start side of the component's header.                                       |
| `"header-content"`       | A slot for adding custom content to the component's header.                                                                       |
| `"header-menu-actions"`  | A slot for adding an overflow menu with `calcite-action`s inside a `calcite-dropdown`.                                            |

## CSS Custom Properties

| Name                                          | Description                                        |
| --------------------------------------------- | -------------------------------------------------- |
| `--calcite-flow-item-footer-padding`          | Specifies the padding of the component's footer.   |
| `--calcite-flow-item-header-border-block-end` | Specifies the component header's block end border. |

## Dependencies

### Depends on

- [calcite-action](../action)
- [calcite-panel](../panel)

### Graph

```mermaid
graph TD;
  calcite-flow-item --> calcite-action
  calcite-flow-item --> calcite-panel
  calcite-action --> calcite-loader
  calcite-action --> calcite-icon
  calcite-panel --> calcite-action
  calcite-panel --> calcite-action-menu
  calcite-panel --> calcite-scrim
  calcite-action-menu --> calcite-action
  calcite-action-menu --> calcite-popover
  calcite-popover --> calcite-action
  calcite-popover --> calcite-icon
  calcite-scrim --> calcite-loader
  style calcite-flow-item fill:#f9f,stroke:#333,stroke-width:4px
```

---
