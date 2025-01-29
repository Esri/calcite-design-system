# calcite-chip-group

For comprehensive guidance on using and implementing `calcite-chip-group`, refer to the [documentation page](https://developers.arcgis.com/calcite-design-system/components/chip-group/).

<!-- Auto Generated Below -->

## Properties

| Property             | Attribute        | Description                                                                                                                                                                                                                                              | Type                                                   | Default     |
| -------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ----------- |
| `disabled`           | `disabled`       | When `true`, interaction is prevented and the component is displayed with lower opacity.                                                                                                                                                                 | `boolean`                                              | `false`     |
| `label` *(required)* | `label`          | Accessible name for the component.                                                                                                                                                                                                                       | `string`                                               | `undefined` |
| `scale`              | `scale`          | Specifies the size of the component. Child `calcite-chip`s inherit the component's value.                                                                                                                                                                | `"l" \| "m" \| "s"`                                    | `"m"`       |
| `selectedItems`      | --               | Specifies the component's selected items.                                                                                                                                                                                                                | `HTMLCalciteChipElement[]`                             | `[]`        |
| `selectionMode`      | `selection-mode` | Specifies the selection mode of the component, where: `"multiple"` allows any number of selections, `"single"` allows only one selection, `"single-persist"` allows one selection and prevents de-selection, and `"none"` does not allow any selections. | `"multiple" \| "none" \| "single" \| "single-persist"` | `"none"`    |

## Events

| Event                    | Description                                   | Type                |
| ------------------------ | --------------------------------------------- | ------------------- |
| `calciteChipGroupSelect` | Fires when the component's selection changes. | `CustomEvent<void>` |

## Methods

### `setFocus() => Promise<void>`

Sets focus on the component's first focusable element.

#### Returns

Type: `Promise<void>`

## Slots

| Slot | Description                                    |
| ---- | ---------------------------------------------- |
|      | A slot for adding one or more `calcite-chip`s. |

---
