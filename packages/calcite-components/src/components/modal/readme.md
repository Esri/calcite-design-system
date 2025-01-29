# calcite-modal

For comprehensive guidance on using and implementing `calcite-modal`, refer to the [documentation page](https://developers.arcgis.com/calcite-design-system/components/modal/).

<style>
  html {
      overflow:auto !important;
  }
</style>
<!-- Auto Generated Below -->

> **[DEPRECATED]** Use the `calcite-dialog` component instead.

## Properties

| Property               | Attribute                | Description                                                                                                                | Type                                                      | Default     |
| ---------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | ----------- |
| `beforeClose`          | --                       | Passes a function to run before the component closes.                                                                      | `(el: HTMLCalciteModalElement) => Promise<void>`          | `undefined` |
| `closeButtonDisabled`  | `close-button-disabled`  | When `true`, disables the component's close button.                                                                        | `boolean`                                                 | `false`     |
| `docked`               | `docked`                 | When `true`, prevents the component from expanding to the entire screen on mobile devices.                                 | `boolean`                                                 | `undefined` |
| `escapeDisabled`       | `escape-disabled`        | When `true`, disables the default close on escape behavior.                                                                | `boolean`                                                 | `false`     |
| `focusTrapDisabled`    | `focus-trap-disabled`    | When `true`, prevents focus trapping.                                                                                      | `boolean`                                                 | `false`     |
| `fullscreen`           | `fullscreen`             | Sets the component to always be fullscreen. Overrides `widthScale` and `--calcite-modal-width` / `--calcite-modal-height`. | `boolean`                                                 | `undefined` |
| `kind`                 | `kind`                   | Specifies the kind of the component, which will apply to top border.                                                       | `"brand" \| "danger" \| "info" \| "success" \| "warning"` | `undefined` |
| `messageOverrides`     | `message-overrides`      | Use this property to override individual strings used by the component.                                                    | `ModalMessages`                                           | `undefined` |
| `open`                 | `open`                   | When `true`, displays and positions the component.                                                                         | `boolean`                                                 | `false`     |
| `outsideCloseDisabled` | `outside-close-disabled` | When `true`, disables the closing of the component when clicked outside.                                                   | `boolean`                                                 | `false`     |
| `scale`                | `scale`                  | Specifies the size of the component.                                                                                       | `"l" \| "m" \| "s"`                                       | `"m"`       |
| `widthScale`           | `width-scale`            | Specifies the width of the component.                                                                                      | `"l" \| "m" \| "s"`                                       | `"m"`       |

## Events

| Event                     | Description                                                                                              | Type                |
| ------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------- |
| `calciteModalBeforeClose` | Fires when the component is requested to be closed and before the closing transition begins.             | `CustomEvent<void>` |
| `calciteModalBeforeOpen`  | Fires when the component is added to the DOM but not rendered, and before the opening transition begins. | `CustomEvent<void>` |
| `calciteModalClose`       | Fires when the component is closed and animation is complete.                                            | `CustomEvent<void>` |
| `calciteModalOpen`        | Fires when the component is open and animation is complete.                                              | `CustomEvent<void>` |

## Methods

### `scrollContent(top?: number, left?: number) => Promise<void>`

Sets the scroll top of the component's content.

#### Parameters

| Name   | Type     | Description |
| ------ | -------- | ----------- |
| `top`  | `number` |             |
| `left` | `number` |             |

#### Returns

Type: `Promise<void>`

### `setFocus() => Promise<void>`

Sets focus on the component's "close" button (the first focusable item).

#### Returns

Type: `Promise<void>`

### `updateFocusTrapElements() => Promise<void>`

Updates the element(s) that are used within the focus-trap of the component.

#### Returns

Type: `Promise<void>`

## Slots

| Slot               | Description                                                                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `"back"`           | A slot for adding a back button.                                                                                                             |
| `"content"`        | A slot for adding the component's content.                                                                                                   |
| `"content-bottom"` | A slot for adding content to the component's sticky footer, where content remains at the bottom of the component when scrolling up and down. |
| `"content-top"`    | A slot for adding content to the component's sticky header, where content remains at the top of the component when scrolling up and down.    |
| `"header"`         | A slot for adding header text.                                                                                                               |
| `"primary"`        | A slot for adding a primary button.                                                                                                          |
| `"secondary"`      | A slot for adding a secondary button.                                                                                                        |

## CSS Custom Properties

| Name                                 | Description                                                                                                                                                        |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--calcite-modal-content-background` | Specifies the background color of content placed in the component's `"content"` slot.                                                                              |
| `--calcite-modal-content-padding`    | Specifies the padding of the component's `"content"` slot.                                                                                                         |
| `--calcite-modal-height`             | Specifies the height of the component, using `px`, `em`, `rem`, `vh`, or `%`. Will never exceed the height of the viewport. Will not apply if `fullscreen` if set. |
| `--calcite-modal-scrim-background`   | Specifies the background color of the component's scrim.                                                                                                           |
| `--calcite-modal-width`              | Specifies the width of the component, using `px`, `em`, `rem`, `vw`, or `%`. Will never exceed the width of the viewport. Will not apply if `fullscreen` if set.   |

## Dependencies

### Depends on

- [calcite-scrim](../scrim)
- [calcite-icon](../icon)

### Graph

```mermaid
graph TD;
  calcite-modal --> calcite-scrim
  calcite-modal --> calcite-icon
  calcite-scrim --> calcite-loader
  style calcite-modal fill:#f9f,stroke:#333,stroke-width:4px
```

---
