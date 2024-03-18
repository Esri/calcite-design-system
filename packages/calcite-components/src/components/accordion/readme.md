# calcite-accordion

For details on the `calcite-accordion` component, visit Calcites [documentation page](https://developers.arcgis.com/calcite-design-system/components/accordion/).

<!-- Auto Generated Below -->

## Usage

### Basic

```html
<calcite-accordion>
  <calcite-accordion-item heading="Accordion Item">Accordion Section Content </calcite-accordion-item>
  <calcite-accordion-item heading="Accordion Item 2" expanded>Accordion Section Content </calcite-accordion-item>
  <calcite-accordion-item heading="Accordion Item 3">Accordion Section Content </calcite-accordion-item>
</calcite-accordion>
```

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
