# calcite-date

The `calcite-date` component allows for selecting a date via a calendar or text input. It supports multiple locales, languages, right to left, and is fully keyboard accessible.

You can set a min and max range, as well as an initial value with ISO 8601 formatted strings:

```html
<calcite-date value="2020-03-27" min="2020-02-01" max="2021-01-01" />
```

Date also supports passing in a proxy input to make event handling and binding easier for frameworks like React:

```html
<calcite-date>
  <input type="date" />
</calcite-date>
```

<!-- Auto Generated Below -->

## Properties

| Property          | Attribute           | Description                                                 | Type                | Default                                      |
| ----------------- | ------------------- | ----------------------------------------------------------- | ------------------- | -------------------------------------------- |
| `active`          | `active`            | Expand or collapse when calendar does not have input        | `boolean`           | `false`                                      |
| `intlNextMonth`   | `intl-next-month`   | Localized string for "next month" (used for aria label)     | `string`            | `TEXT.nextMonth`                             |
| `intlPrevMonth`   | `intl-prev-month`   | Localized string for "previous month" (used for aria label) | `string`            | `TEXT.prevMonth`                             |
| `locale`          | `locale`            | BCP 47 language tag for desired language and country format | `string`            | `document.documentElement.lang \|\| "en-US"` |
| `max`             | `max`               | Latest allowed date ("yyyy-mm-dd")                          | `string`            | `undefined`                                  |
| `min`             | `min`               | Earliest allowed date ("yyyy-mm-dd")                        | `string`            | `undefined`                                  |
| `noCalendarInput` | `no-calendar-input` | Show only calendar popup                                    | `boolean`           | `false`                                      |
| `scale`           | `scale`             | specify the scale of the date picker                        | `"l" \| "m" \| "s"` | `"m"`                                        |
| `value`           | `value`             | Selected date                                               | `string`            | `undefined`                                  |
| `valueAsDate`     | --                  | Selected date as full date object                           | `Date`              | `undefined`                                  |

## Events

| Event               | Description                                               | Type                |
| ------------------- | --------------------------------------------------------- | ------------------- |
| `calciteDateChange` | Trigger calcite date change when a user changes the date. | `CustomEvent<Date>` |

## Dependencies

### Depends on

- [calcite-input](../calcite-input)
- [calcite-date-month-header](../calcite-date-month-header)
- [calcite-date-month](../calcite-date-month)

### Graph

```mermaid
graph TD;
  calcite-date --> calcite-input
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
