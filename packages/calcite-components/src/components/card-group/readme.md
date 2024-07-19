# calcite-card-group

For comprehensive guidance on using and implementing `calcite-card-group`, refer to the [documentation page](https://developers.arcgis.com/calcite-design-system/components/card-group/).

<!-- Auto Generated Below -->

## Properties

| Property             | Attribute        | Description                                                                              | Type                                                   | Default     |
| -------------------- | ---------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------ | ----------- |
| `disabled`           | `disabled`       | When `true`, interaction is prevented and the component is displayed with lower opacity. | `boolean`                                              | `false`     |
| `label` *(required)* | `label`          | Accessible name for the component.                                                       | `string`                                               | `undefined` |
| `selectedItems`      | --               | Specifies the component's selected items.                                                | `HTMLCalciteCardElement[]`                             | `[]`        |
| `selectionMode`      | `selection-mode` | Specifies the selection mode of the component.                                           | `"multiple" \| "none" \| "single" \| "single-persist"` | `"none"`    |

## Events

| Event                    | Description                                                                         | Type                |
| ------------------------ | ----------------------------------------------------------------------------------- | ------------------- |
| `calciteCardGroupSelect` | Emits when the component's selection changes and the `selectionMode` is not `none`. | `CustomEvent<void>` |

## Methods

### `setFocus() => Promise<void>`

Sets focus on the component's first focusable element.

#### Returns

Type: `Promise<void>`

## Slots

| Slot | Description                                    |
| ---- | ---------------------------------------------- |
|      | A slot for adding one or more `calcite-card`s. |

## CSS Custom Properties

| Name                       | Description                                   |
| -------------------------- | --------------------------------------------- |
| `--calcite-card-group-gap` | Specifies the gap between slotted components. |

---

*Built with [StencilJS](https://stenciljs.com/)*
