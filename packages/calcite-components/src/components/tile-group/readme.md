# calcite-tile-group

For comprehensive guidance on using and implementing `calcite-tile-group`, refer to the [documentation page](https://developers.arcgis.com/calcite-design-system/components/tile-group/).

<!-- Auto Generated Below -->

## Properties

| Property              | Attribute              | Description                                                                                                                                                                                                                                                     | Type                                                   | Default        |
| --------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | -------------- |
| `alignment`           | `alignment`            | Specifies the alignment of each `calcite-tile`'s content.                                                                                                                                                                                                       | `"center" \| "start"`                                  | `"start"`      |
| `disabled`            | `disabled`             | When `true`, interaction is prevented and the component is displayed with lower opacity.                                                                                                                                                                        | `boolean`                                              | `false`        |
| `label` *(required)*  | `label`                | Accessible name for the component.                                                                                                                                                                                                                              | `string`                                               | `undefined`    |
| `layout`              | `layout`               | Defines the layout of the component. Use `"horizontal"` for rows, and `"vertical"` for a single column.                                                                                                                                                         | `"horizontal" \| "vertical"`                           | `"horizontal"` |
| `scale`               | `scale`                | Specifies the size of the component.                                                                                                                                                                                                                            | `"l" \| "m" \| "s"`                                    | `"m"`          |
| `selectedItems`       | --                     | Specifies the component's selected items.                                                                                                                                                                                                                       | `HTMLCalciteTileElement[]`                             | `[]`           |
| `selectionAppearance` | `selection-appearance` | Specifies the selection appearance, where: - `"icon"` (displays a checkmark or dot), or - `"border"` (displays a border).                                                                                                                                       | `"border" \| "icon"`                                   | `"icon"`       |
| `selectionMode`       | `selection-mode`       | Specifies the selection mode, where: - `"multiple"` (allows any number of selected items), - `"single"` (allows only one selected item), - `"single-persist"` (allows only one selected item and prevents de-selection), - `"none"` (allows no selected items). | `"multiple" \| "none" \| "single" \| "single-persist"` | `"none"`       |

## Events

| Event                    | Description                                   | Type                |
| ------------------------ | --------------------------------------------- | ------------------- |
| `calciteTileGroupSelect` | Fires when the component's selection changes. | `CustomEvent<void>` |

## Slots

| Slot | Description                                |
| ---- | ------------------------------------------ |
|      | A slot for adding `calcite-tile` elements. |

---

*Built with [StencilJS](https://stenciljs.com/)*
