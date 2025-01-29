# calcite-table

For comprehensive guidance on using and implementing `calcite-table`, refer to the [documentation page](https://developers.arcgis.com/calcite-design-system/components/table/).

<!-- Auto Generated Below -->

## Properties

| Property               | Attribute           | Description                                                                                                                                                                                                                                                                                                                | Type                               | Default         |
| ---------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | --------------- |
| `bordered`             | `bordered`          | When `true`, displays borders in the component.                                                                                                                                                                                                                                                                            | `boolean`                          | `false`         |
| `caption` *(required)* | `caption`           | Specifies an accessible title for the component.                                                                                                                                                                                                                                                                           | `string`                           | `undefined`     |
| `groupSeparator`       | `group-separator`   | When `true`, number values are displayed with a group separator corresponding to the language and country format.                                                                                                                                                                                                          | `boolean`                          | `false`         |
| `interactionMode`      | `interaction-mode`  | When `"interactive"`, allows focus and keyboard navigation of `table-header`s and `table-cell`s. When `"static"`, prevents focus and keyboard navigation of `table-header`s and `table-cell`s when assistive technologies are not active. Selection affordances and slotted content within `table-cell`s remain focusable. | `"interactive" \| "static"`        | `"interactive"` |
| `layout`               | `layout`            | Specifies the layout of the component.                                                                                                                                                                                                                                                                                     | `"auto" \| "fixed"`                | `"auto"`        |
| `messageOverrides`     | `message-overrides` | Use this property to override individual strings used by the component.                                                                                                                                                                                                                                                    | `TableMessages`                    | `undefined`     |
| `numbered`             | `numbered`          | When `true`, displays the position of the row in numeric form.                                                                                                                                                                                                                                                             | `boolean`                          | `false`         |
| `numberingSystem`      | `numbering-system`  | Specifies the Unicode numeral system used by the component for localization.                                                                                                                                                                                                                                               | `"arab" \| "arabext" \| "latn"`    | `undefined`     |
| `pageSize`             | `page-size`         | Specifies the page size of the component. When `true`, renders `calcite-pagination`.                                                                                                                                                                                                                                       | `number`                           | `0`             |
| `scale`                | `scale`             | Specifies the size of the component.                                                                                                                                                                                                                                                                                       | `"l" \| "m" \| "s"`                | `"m"`           |
| `selectedItems`        | --                  | Specifies the component's selected items.                                                                                                                                                                                                                                                                                  | `HTMLCalciteTableRowElement[]`     | `[]`            |
| `selectionDisplay`     | `selection-display` | Specifies the display of the selection interface when `selection-mode` is not `"none"`. When `"none"`, content slotted the `selection-actions` slot will not be displayed.                                                                                                                                                 | `"none" \| "top"`                  | `"top"`         |
| `selectionMode`        | `selection-mode`    | Specifies the selection mode of the component, where: `"multiple"` allows any number of selections, `"single"` allows only one selection, and `"none"` does not allow any selections.                                                                                                                                      | `"multiple" \| "none" \| "single"` | `"none"`        |
| `striped`              | `striped`           | When `true`, displays striped styling in the component.                                                                                                                                                                                                                                                                    | `boolean`                          | `false`         |
| `zebra`                | `zebra`             | <span style="color:red">**[DEPRECATED]**</span> Use the `striped` property instead.<br/><br/>When `true`, displays striped styling in the component.                                                                                                                                                                       | `boolean`                          | `false`         |

## Events

| Event                    | Description                                        | Type                |
| ------------------------ | -------------------------------------------------- | ------------------- |
| `calciteTablePageChange` | Emits when the component's page selection changes. | `CustomEvent<void>` |
| `calciteTableSelect`     | Emits when the component's selected rows change.   | `CustomEvent<void>` |

## Slots

| Slot                  | Description                                                                                                                                   |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
|                       | A slot for adding `calcite-table-row` elements containing `calcite-table-cell` and/or `calcite-table-header` elements.                        |
| `"selection-actions"` | A slot for adding `calcite-actions` or other elements to display when `selectionMode` is not `"none"` and `selectionDisplay` is not `"none"`. |
| `"table-footer"`      | A slot for adding `calcite-table-row` elements containing `calcite-table-cell` and/or `calcite-table-header` elements.                        |
| `"table-header"`      | A slot for adding `calcite-table-row` elements containing `calcite-table-header` elements.                                                    |

## Dependencies

### Depends on

- [calcite-chip](../chip)
- [calcite-button](../button)
- [calcite-pagination](../pagination)

### Graph

```mermaid
graph TD;
  calcite-table --> calcite-chip
  calcite-table --> calcite-button
  calcite-table --> calcite-pagination
  calcite-chip --> calcite-icon
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  calcite-pagination --> calcite-icon
  style calcite-table fill:#f9f,stroke:#333,stroke-width:4px
```

---
