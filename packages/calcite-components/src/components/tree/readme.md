# calcite-tree

For comprehensive guidance on using and implementing `calcite-tree`, refer to the [documentation page](https://developers.arcgis.com/calcite-design-system/components/tree/).

<!-- Auto Generated Below -->

## Properties

| Property        | Attribute        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Type                                                                                                   | Default    |
| --------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ---------- |
| `lines`         | `lines`          | When `true`, displays indentation guide lines.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | `boolean`                                                                                              | `false`    |
| `scale`         | `scale`          | Specifies the size of the component.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `"l" \| "m" \| "s"`                                                                                    | `"m"`      |
| `selectedItems` | --               | Specifies the component's selected items.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `HTMLCalciteTreeItemElement[]`                                                                         | `[]`       |
| `selectionMode` | `selection-mode` | Specifies the selection mode of the component, where: `"ancestors"` displays with a checkbox and allows any number of selections from corresponding parent and child selections, `"children"` allows any number of selections from one parent from corresponding parent and child selections, `"multichildren"` allows any number of selections from corresponding parent and child selections, `"multiple"` allows any number of selections, `"none"` allows no selections, `"single"` allows one selection, and `"single-persist"` allows and requires one selection. | `"ancestors" \| "children" \| "multichildren" \| "multiple" \| "none" \| "single" \| "single-persist"` | `"single"` |

## Events

| Event               | Description                                                 | Type                |
| ------------------- | ----------------------------------------------------------- | ------------------- |
| `calciteTreeSelect` | Fires when the user selects/deselects `calcite-tree-items`. | `CustomEvent<void>` |

## Slots

| Slot | Description                              |
| ---- | ---------------------------------------- |
|      | A slot for `calcite-tree-item` elements. |

---

*Built with [StencilJS](https://stenciljs.com/)*
