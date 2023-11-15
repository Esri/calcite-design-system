# calcite-handle

<!-- Auto Generated Below -->

## Properties

| Property           | Attribute     | Description                                                             | Type                                                                                                                                 | Default     |
| ------------------ | ------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `dragHandle`       | `drag-handle` | Value for the button title attribute                                    | `string`                                                                                                                             | `undefined` |
| `messageOverrides` | --            | Use this property to override individual strings used by the component. | `{ dragHandle?: string; dragHandleActive?: string; dragHandleChange?: string; dragHandleCommit?: string; dragHandleIdle?: string; }` | `undefined` |

## Events

| Event                         | Description                                                                   | Type                        |
| ----------------------------- | ----------------------------------------------------------------------------- | --------------------------- |
| `calciteHandleNudge`          | Emitted when the handle is activated and the up or down arrow key is pressed. | `CustomEvent<HandleNudge>`  |
| `calciteInternalHandleChange` | Emitted when the handle is activated or deactivated.                          | `CustomEvent<HandleChange>` |

## Methods

### `setFocus() => Promise<void>`

Sets focus on the component.

#### Returns

Type: `Promise<void>`

## Dependencies

### Used by

- [calcite-block](../block)
- [calcite-list-item](../list-item)

### Depends on

- [calcite-icon](../icon)

### Graph

```mermaid
graph TD;
  calcite-handle --> calcite-icon
  calcite-block --> calcite-handle
  calcite-list-item --> calcite-handle
  style calcite-handle fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
