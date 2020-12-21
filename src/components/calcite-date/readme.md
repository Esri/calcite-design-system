# calcite-date

The `calcite-date` component allows for selecting a date via a calendar or text input. It supports multiple locales, languages, right to left, and is fully keyboard accessible.

You can set a min and max range, as well as an initial value with ISO 8601 formatted strings:

```html
<calcite-date value="2020-03-27" min="2020-02-01" max="2021-01-01" />
```

You can also add range property to activate date range mode. In this mode, you can specify start and end instead of the single value property.

```html
<calcite-date range start="2020-03-15" end="2020-03-27" min="2020-02-01" max="2021-01-01" />
```

<!-- Auto Generated Below -->

## Properties

| Property             | Attribute             | Description                                                 | Type                         | Default                                      |
| -------------------- | --------------------- | ----------------------------------------------------------- | ---------------------------- | -------------------------------------------- |
| `active`             | `active`              | Expand or collapse when calendar does not have input        | `boolean`                    | `false`                                      |
| `end`                | `end`                 | Selected end date                                           | `string`                     | `undefined`                                  |
| `endAsDate`          | --                    | Selected end date as full date object                       | `Date`                       | `undefined`                                  |
| `intlNextMonth`      | `intl-next-month`     | Localized string for "next month" (used for aria label)     | `string`                     | `TEXT.nextMonth`                             |
| `intlPrevMonth`      | `intl-prev-month`     | Localized string for "previous month" (used for aria label) | `string`                     | `TEXT.prevMonth`                             |
| `layout`             | `layout`              | Layout                                                      | `"horizontal" \| "vertical"` | `"horizontal"`                               |
| `locale`             | `locale`              | BCP 47 language tag for desired language and country format | `string`                     | `document.documentElement.lang \|\| "en-US"` |
| `max`                | `max`                 | Latest allowed date ("yyyy-mm-dd")                          | `string`                     | `undefined`                                  |
| `min`                | `min`                 | Earliest allowed date ("yyyy-mm-dd")                        | `string`                     | `undefined`                                  |
| `noCalendarInput`    | `no-calendar-input`   | Show only calendar popup                                    | `boolean`                    | `false`                                      |
| `proximitySelection` | `proximity-selection` |                                                             | `boolean`                    | `true`                                       |
| `range`              | `range`               | Range mode activation                                       | `boolean`                    | `false`                                      |
| `scale`              | `scale`               | specify the scale of the date picker                        | `"l" \| "m" \| "s"`          | `"m"`                                        |
| `start`              | `start`               | Selected start date                                         | `string`                     | `undefined`                                  |
| `startAsDate`        | --                    | Selected start date as full date object                     | `Date`                       | `undefined`                                  |
| `value`              | `value`               | Selected date                                               | `string`                     | `undefined`                                  |
| `valueAsDate`        | --                    | Selected date as full date object                           | `Date`                       | `undefined`                                  |

## Events

| Event                    | Description                                                     | Type                           |
| ------------------------ | --------------------------------------------------------------- | ------------------------------ |
| `calciteDateChange`      | Trigger calcite date change when a user changes the date.       | `CustomEvent<Date>`            |
| `calciteDateRangeChange` | Trigger calcite date change when a user changes the date range. | `CustomEvent<DateRangeChange>` |

## Methods

### `reposition() => Promise<void>`

#### Returns

Type: `Promise<void>`

## Dependencies

### Depends on

- [calcite-input](../calcite-input)
- [calcite-icon](../calcite-icon)
- [calcite-date-month-header](../calcite-date-month-header)
- [calcite-date-month](../calcite-date-month)

### Graph

```mermaid
graph TD;
  calcite-date --> calcite-input
  calcite-date --> calcite-icon
  calcite-date --> calcite-date-month-header
  calcite-date --> calcite-date-month
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  calcite-date-month-header --> calcite-icon
  calcite-date-month --> calcite-date-day
  style calcite-date fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
