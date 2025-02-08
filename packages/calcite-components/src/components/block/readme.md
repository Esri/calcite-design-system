# calcite-block

For comprehensive guidance on using and implementing `calcite-block`, refer to the [documentation page](https://developers.arcgis.com/calcite-design-system/components/block/).

<!-- Auto Generated Below -->

## Properties

| Property               | Attribute             | Description                                                                                                                                                                                                                                                                                                                                                                 | Type                                                                                                                                                                                                                                                                                                              | Default                   |
| ---------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `collapsible`          | `collapsible`         | When `true`, the component is collapsible.                                                                                                                                                                                                                                                                                                                                  | `boolean`                                                                                                                                                                                                                                                                                                         | `false`                   |
| `description`          | `description`         | A description for the component, which displays below the heading.                                                                                                                                                                                                                                                                                                          | `string`                                                                                                                                                                                                                                                                                                          | `undefined`               |
| `disabled`             | `disabled`            | When `true`, interaction is prevented and the component is displayed with lower opacity.                                                                                                                                                                                                                                                                                    | `boolean`                                                                                                                                                                                                                                                                                                         | `false`                   |
| `dragHandle`           | `drag-handle`         | When `true`, displays a drag handle in the header.                                                                                                                                                                                                                                                                                                                          | `boolean`                                                                                                                                                                                                                                                                                                         | `false`                   |
| `heading` *(required)* | `heading`             | The component header text.                                                                                                                                                                                                                                                                                                                                                  | `string`                                                                                                                                                                                                                                                                                                          | `undefined`               |
| `headingLevel`         | `heading-level`       | Specifies the heading level of the component's `heading` for proper document structure, without affecting visual styling.                                                                                                                                                                                                                                                   | `1 \| 2 \| 3 \| 4 \| 5 \| 6`                                                                                                                                                                                                                                                                                      | `undefined`               |
| `iconEnd`              | `icon-end`            | Specifies an icon to display at the end of the component.                                                                                                                                                                                                                                                                                                                   | `string`                                                                                                                                                                                                                                                                                                          | `undefined`               |
| `iconFlipRtl`          | `icon-flip-rtl`       | Displays the `iconStart` and/or `iconEnd` as flipped when the element direction is right-to-left (`"rtl"`).                                                                                                                                                                                                                                                                 | `"both" \| "end" \| "start"`                                                                                                                                                                                                                                                                                      | `undefined`               |
| `iconStart`            | `icon-start`          | Specifies an icon to display at the start of the component.                                                                                                                                                                                                                                                                                                                 | `string`                                                                                                                                                                                                                                                                                                          | `undefined`               |
| `loading`              | `loading`             | When `true`, a busy indicator is displayed.                                                                                                                                                                                                                                                                                                                                 | `boolean`                                                                                                                                                                                                                                                                                                         | `false`                   |
| `menuFlipPlacements`   | --                    | Specifies the component's fallback menu `placement` when it's initial or specified `placement` has insufficient space available.                                                                                                                                                                                                                                            | `FlipPlacement[]`                                                                                                                                                                                                                                                                                                 | `undefined`               |
| `menuPlacement`        | `menu-placement`      | Determines where the action menu will be positioned.                                                                                                                                                                                                                                                                                                                        | `"auto" \| "top" \| "bottom" \| "right" \| "left" \| "top-start" \| "top-end" \| "bottom-start" \| "bottom-end" \| "right-start" \| "right-end" \| "left-start" \| "left-end" \| "leading" \| "trailing" \| "auto-start" \| "auto-end" \| "leading-start" \| "leading-end" \| "trailing-end" \| "trailing-start"` | `defaultEndMenuPlacement` |
| `messageOverrides`     | `message-overrides`   | Use this property to override individual strings used by the component.                                                                                                                                                                                                                                                                                                     | `BlockMessages`                                                                                                                                                                                                                                                                                                   | `undefined`               |
| `open`                 | `open`                | When `true`, expands the component and its contents.                                                                                                                                                                                                                                                                                                                        | `boolean`                                                                                                                                                                                                                                                                                                         | `false`                   |
| `overlayPositioning`   | `overlay-positioning` | Determines the type of positioning to use for the overlaid content. Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout. `"fixed"` should be used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`. | `"absolute" \| "fixed"`                                                                                                                                                                                                                                                                                           | `"absolute"`              |
| `status`               | `status`              | <span style="color:red">**[DEPRECATED]**</span> Use `icon-start` instead.<br/><br/>Displays a status-related indicator icon.                                                                                                                                                                                                                                                | `"idle" \| "invalid" \| "valid"`                                                                                                                                                                                                                                                                                  | `undefined`               |

## Events

| Event                     | Description                                                                                                                                                                                                                                     | Type                |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `calciteBlockBeforeClose` | Fires when the component is requested to be closed and before the closing transition begins.                                                                                                                                                    | `CustomEvent<void>` |
| `calciteBlockBeforeOpen`  | Fires when the component is added to the DOM but not rendered, and before the opening transition begins.                                                                                                                                        | `CustomEvent<void>` |
| `calciteBlockClose`       | Fires when the component is closed and animation is complete.                                                                                                                                                                                   | `CustomEvent<void>` |
| `calciteBlockOpen`        | Fires when the component is open and animation is complete.                                                                                                                                                                                     | `CustomEvent<void>` |
| `calciteBlockToggle`      | <span style="color:red">**[DEPRECATED]**</span> Use `openClose` events such as `calciteBlockOpen`, `calciteBlockClose`, `calciteBlockBeforeOpen`, and `calciteBlockBeforeClose` instead.<br/><br/>Fires when the component's header is clicked. | `CustomEvent<void>` |

## Methods

### `setFocus() => Promise<void>`

Sets focus on the component's first tabbable element.

#### Returns

Type: `Promise<void>`

## Slots

| Slot                    | Description                                                                                                                               |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
|                         | A slot for adding custom content.                                                                                                         |
| `"actions-end"`         | A slot for adding actionable `calcite-action` elements after the content of the component. It is recommended to use two or fewer actions. |
| `"content-start"`       | A slot for adding non-actionable elements before content of the component.                                                                |
| `"control"`             | [Deprecated] A slot for adding a single HTML input element in a header. Use `actions-end` instead.                                        |
| `"header-menu-actions"` | A slot for adding an overflow menu with `calcite-action`s inside a dropdown menu.                                                         |
| `"icon"`                | [Deprecated] A slot for adding a leading header icon with `calcite-icon`. Use `icon-start` instead.                                       |

## CSS Custom Properties

| Name                      | Description                                        |
| ------------------------- | -------------------------------------------------- |
| `--calcite-block-padding` | Specifies the padding of the block `default` slot. |

## Dependencies

### Depends on

- [calcite-scrim](../scrim)
- [calcite-loader](../loader)
- [calcite-icon](../icon)
- [calcite-handle](../handle)
- [calcite-action-menu](../action-menu)

### Graph

```mermaid
graph TD;
  calcite-block --> calcite-scrim
  calcite-block --> calcite-loader
  calcite-block --> calcite-icon
  calcite-block --> calcite-handle
  calcite-block --> calcite-action-menu
  calcite-scrim --> calcite-loader
  calcite-handle --> calcite-icon
  calcite-action-menu --> calcite-action
  calcite-action-menu --> calcite-popover
  calcite-action --> calcite-loader
  calcite-action --> calcite-icon
  calcite-popover --> calcite-action
  calcite-popover --> calcite-icon
  style calcite-block fill:#f9f,stroke:#333,stroke-width:4px
```

---

*Built with [StencilJS](https://stenciljs.com/)*
