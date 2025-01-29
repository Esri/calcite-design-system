# calcite-inline-editable

For comprehensive guidance on using and implementing `calcite-inline-editable`, refer to the [documentation page](https://developers.arcgis.com/calcite-design-system/components/inline-editable/).

<!-- Auto Generated Below -->

## Properties

| Property           | Attribute           | Description                                                                                                                                                  | Type                     | Default     |
| ------------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ | ----------- |
| `afterConfirm`     | --                  | Specifies a callback to be executed prior to disabling editing via the controls. When provided, the component's loading state will be handled automatically. | `() => Promise<void>`    | `undefined` |
| `controls`         | `controls`          | When `true` and `editingEnabled` is `true`, displays save and cancel controls on the component.                                                              | `boolean`                | `false`     |
| `disabled`         | `disabled`          | When `true`, interaction is prevented and the component is displayed with lower opacity.                                                                     | `boolean`                | `false`     |
| `editingEnabled`   | `editing-enabled`   | When `true`, inline editing is enabled on the component.                                                                                                     | `boolean`                | `false`     |
| `loading`          | `loading`           | When `true`, a busy indicator is displayed.                                                                                                                  | `boolean`                | `false`     |
| `messageOverrides` | `message-overrides` | Use this property to override individual strings used by the component.                                                                                      | `InlineEditableMessages` | `undefined` |
| `scale`            | `scale`             | Specifies the size of the component. Defaults to the scale of the wrapped `calcite-input` or the scale of the closest wrapping component with a set scale.   | `"l" \| "m" \| "s"`      | `undefined` |

## Events

| Event                              | Description                                                    | Type                |
| ---------------------------------- | -------------------------------------------------------------- | ------------------- |
| `calciteInlineEditableEditCancel`  | Emits when the component's "cancel editing" button is pressed. | `CustomEvent<void>` |
| `calciteInlineEditableEditConfirm` | Emits when the component's "confirm edits" button is pressed.  | `CustomEvent<void>` |

## Methods

### `setFocus() => Promise<void>`

Sets focus on the component.

#### Returns

Type: `Promise<void>`

## Slots

| Slot | Description                          |
| ---- | ------------------------------------ |
|      | A slot for adding a `calcite-input`. |

## Dependencies

### Depends on

- [calcite-button](../button)

### Graph

```mermaid
graph TD;
  calcite-inline-editable --> calcite-button
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  style calcite-inline-editable fill:#f9f,stroke:#333,stroke-width:4px
```

---
