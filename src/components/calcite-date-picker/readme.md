# calcite-date-picker

The `calcite-date-picker` component allows for selecting a date via a calendar or text input. It supports multiple locales, languages, right to left, and is fully keyboard accessible.

You can set a min and max range, as well as an initial value with ISO 8601 formatted strings:

```html
<calcite-date-picker value="2020-03-27" min="2020-02-01" max="2021-01-01" />
```

You can also add range property to activate date range mode. In this mode, you can specify start and end instead of the single value property.

```html
<calcite-date-picker range start="2020-03-15" end="2020-03-27" min="2020-02-01" max="2021-01-01" />
```

<!-- Auto Generated Below -->

## Properties

| Property                     | Attribute                      | Description                                                                                                           | Type                | Default                                      |
| ---------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------- | ------------------- | -------------------------------------------- |
| `activeRange`                | `active-range`                 | Active range                                                                                                          | `"end" \| "start"`  | `"start"`                                    |
| `end`                        | `end`                          | Selected end date                                                                                                     | `string`            | `undefined`                                  |
| `endAsDate`                  | --                             | Selected end date as full date object                                                                                 | `Date`              | `undefined`                                  |
| `intlNextMonth`              | `intl-next-month`              | Localized string for "next month" (used for aria label)                                                               | `string`            | `TEXT.nextMonth`                             |
| `intlPrevMonth`              | `intl-prev-month`              | Localized string for "previous month" (used for aria label)                                                           | `string`            | `TEXT.prevMonth`                             |
| `locale`                     | `locale`                       | BCP 47 language tag for desired language and country format                                                           | `string`            | `document.documentElement.lang \|\| "en-US"` |
| `max`                        | `max`                          | Latest allowed date ("yyyy-mm-dd")                                                                                    | `string`            | `undefined`                                  |
| `min`                        | `min`                          | Earliest allowed date ("yyyy-mm-dd")                                                                                  | `string`            | `undefined`                                  |
| `proximitySelectionDisabled` | `proximity-selection-disabled` | Disables the default behaviour on the third click of narrowing or extending the range and instead starts a new range. | `boolean`           | `false`                                      |
| `range`                      | `range`                        | Range mode activation                                                                                                 | `boolean`           | `false`                                      |
| `scale`                      | `scale`                        | specify the scale of the date picker                                                                                  | `"l" \| "m" \| "s"` | `"m"`                                        |
| `start`                      | `start`                        | Selected start date                                                                                                   | `string`            | `undefined`                                  |
| `startAsDate`                | --                             | Selected start date as full date object                                                                               | `Date`              | `undefined`                                  |
| `value`                      | `value`                        | Selected date                                                                                                         | `string`            | `undefined`                                  |
| `valueAsDate`                | --                             | Selected date as full date object                                                                                     | `Date`              | `undefined`                                  |

## Events

| Event                          | Description                                                     | Type                           |
| ------------------------------ | --------------------------------------------------------------- | ------------------------------ |
| `calciteDatePickerChange`      | Trigger calcite date change when a user changes the date.       | `CustomEvent<Date>`            |
| `calciteDatePickerRangeChange` | Trigger calcite date change when a user changes the date range. | `CustomEvent<DateRangeChange>` |

## Dependencies

### Used by

- [calcite-input-date-picker](../calcite-input-date-picker)

### Depends on

- [calcite-date-picker-month-header](../calcite-date-picker-month-header)
- [calcite-date-picker-month](../calcite-date-picker-month)

### Graph

```mermaid
graph TD;
  calcite-date-picker --> calcite-date-picker-month-header
  calcite-date-picker --> calcite-date-picker-month
  calcite-date-picker-month-header --> calcite-icon
  calcite-date-picker-month --> calcite-date-picker-day
  calcite-input-date-picker --> calcite-date-picker
  style calcite-date-picker fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
