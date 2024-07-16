# calcite-accordion

For comprehensive guidance on using and implementing `calcite-accordion`, refer to the [documentation page](https://developers.arcgis.com/calcite-design-system/components/accordion/).

<!-- Auto Generated Below -->

## Properties

| Property        | Attribute        | Description                                                                                                                                                                                                      | Type                                         | Default      |
| --------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | ------------ |
| `appearance`    | `appearance`     | Specifies the appearance of the component.                                                                                                                                                                       | `"solid" \| "transparent"`                   | `"solid"`    |
| `iconPosition`  | `icon-position`  | Specifies the placement of the icon in the header.                                                                                                                                                               | `"end" \| "start"`                           | `"end"`      |
| `iconType`      | `icon-type`      | Specifies the type of the icon in the header.                                                                                                                                                                    | `"caret" \| "chevron" \| "plus-minus"`       | `"chevron"`  |
| `scale`         | `scale`          | Specifies the size of the component.                                                                                                                                                                             | `"l" \| "m" \| "s"`                          | `"m"`        |
| `selectionMode` | `selection-mode` | Specifies the selection mode of the component, where: `"multiple"` allows any number of selections, `"single"` allows only one selection, and `"single-persist"` allows one selection and prevents de-selection. | `"multiple" \| "single" \| "single-persist"` | `"multiple"` |

## Slots

| Slot | Description                                                                                                               |
| ---- | ------------------------------------------------------------------------------------------------------------------------- |
|      | A slot for adding `calcite-accordion-item`s. `calcite-accordion` cannot be nested, however `calcite-accordion-item`s can. |

---

*Built with [StencilJS](https://stenciljs.com/)*
