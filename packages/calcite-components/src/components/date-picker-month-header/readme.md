# calcite-date-month-header

<!-- Auto Generated Below -->

## Properties

| Property       | Attribute       | Description                                                                           | Type                         | Default     |
| -------------- | --------------- | ------------------------------------------------------------------------------------- | ---------------------------- | ----------- |
| `activeDate`   | --              | The focused date is indicated and will become the selected date if the user proceeds. | `Date`                       | `undefined` |
| `headingLevel` | `heading-level` | Specifies the number at which section headings should start.                          | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | `undefined` |
| `localeData`   | --              | CLDR locale data for translated calendar info.                                        | `DateLocaleData`             | `undefined` |
| `max`          | --              | Specifies the latest allowed date (`"yyyy-mm-dd"`).                                   | `Date`                       | `undefined` |
| `min`          | --              | Specifies the earliest allowed date (`"yyyy-mm-dd"`).                                 | `Date`                       | `undefined` |
| `monthStyle`   | `month-style`   | Specifies the monthStyle used by the component.                                       | `"abbreviated" \| "wide"`    | `undefined` |
| `scale`        | `scale`         | Specifies the size of the component.                                                  | `"l" \| "m" \| "s"`          | `undefined` |
| `selectedDate` | --              | Already selected date.                                                                | `Date`                       | `undefined` |

## Dependencies

### Used by

- [calcite-date-picker-month](../date-picker-month)

### Depends on

- [calcite-select](../select)
- [calcite-option](../option)
- [calcite-action](../action)

### Graph

```mermaid
graph TD;
  calcite-date-picker-month-header --> calcite-select
  calcite-date-picker-month-header --> calcite-option
  calcite-date-picker-month-header --> calcite-action
  calcite-select --> calcite-icon
  calcite-select --> calcite-input-message
  calcite-input-message --> calcite-icon
  calcite-action --> calcite-loader
  calcite-action --> calcite-icon
  calcite-date-picker-month --> calcite-date-picker-month-header
  style calcite-date-picker-month-header fill:#f9f,stroke:#333,stroke-width:4px
```

---

*Built with [StencilJS](https://stenciljs.com/)*
