# calcite-date



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute           | Description                                                 | Type             | Default            |
| ----------------- | ------------------- | ----------------------------------------------------------- | ---------------- | ------------------ |
| `locale`          | `locale`            | BCP 47 language tag for desired language and country format | `string`         | `"en-US"`          |
| `max`             | `max`               | Latest allowed date ("yyyy-mm-dd")                          | `string`         | `""`               |
| `min`             | `min`               | Earliest allowed date ("yyyy-mm-dd")                        | `string`         | `""`               |
| `nextMonthLabel`  | `next-month-label`  | Localized string for "next month"                           | `string`         | `"next month"`     |
| `noCalendarInput` | `no-calendar-input` | Show only calendar popup                                    | `boolean`        | `false`            |
| `prevMonthLabel`  | `prev-month-label`  | Localized string for "previous month"                       | `string`         | `"previous month"` |
| `showCalendar`    | `show-calendar`     | Expand or collapse when calendar does not have input        | `boolean`        | `false`            |
| `startOfWeek`     | `start-of-week`     | Start of week offset. 0 for Sunday, 1 for Monday, etc...    | `number`         | `0`                |
| `value`           | `value`             | Selected date                                               | `Date or string` | `undefined`        |


## Events

| Event               | Description                                               | Type               |
| ------------------- | --------------------------------------------------------- | ------------------ |
| `calciteDateChange` | Trigger calcite date change when a user changes the date. | `CustomEvent<any>` |


## Dependencies

### Depends on

- [calcite-icon](../calcite-icon)
- [calcite-date-month-header](../calcite-date-month-header)
- [calcite-date-month](../calcite-date-month)

### Graph
```mermaid
graph TD;
  calcite-date-picker --> calcite-icon
  calcite-date-picker --> calcite-date-month-header
  calcite-date-picker --> calcite-date-month
  calcite-date-month-header --> calcite-icon
  calcite-date-month --> calcite-date-day
  style calcite-date-picker fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
