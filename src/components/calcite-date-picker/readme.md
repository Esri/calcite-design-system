# calcite-date



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute           | Description                                                                                  | Type      | Default                                                                 |
| ----------------- | ------------------- | -------------------------------------------------------------------------------------------- | --------- | ----------------------------------------------------------------------- |
| `locale`          | `locale`            | pass the locale in which user wants to show the date.                                        | `string`  | `"en-GB"`                                                               |
| `max`             | `max`               | Value of the form control                                                                    | `string`  | `""`                                                                    |
| `min`             | `min`               | Name of the form control (useful for specifying input/label relationship)                    | `string`  | `""`                                                                    |
| `nextMonthLabel`  | `next-month-label`  | Localized string for next month.                                                             | `string`  | `""`                                                                    |
| `noCalendarInput` | `no-calendar-input` | Show no input for only calendar popup                                                        | `boolean` | `false`                                                                 |
| `placeholder`     | `placeholder`       | Localized string for place holder to the date picker input.                                  | `string`  | `"mm/dd/yyyy"`                                                          |
| `prevMonthLabel`  | `prev-month-label`  | Localized string for previous month.                                                         | `string`  | `""`                                                                    |
| `showCalendar`    | `show-calendar`     | Expand or collapse when calendar does not have input.                                        | `boolean` | `false`                                                                 |
| `startOfWeek`     | `start-of-week`     | Sun by default 0: Sunday 1: Monday 2: Tuesday 3: Wednesday 4: Thursday 5: Friday 6: Saturday | `number`  | `0`                                                                     |
| `value`           | `value`             | Value of the form control                                                                    | `string`  | `""`                                                                    |
| `valueAsDate`     | --                  | Input as Date                                                                                | `Date`    | `!isNaN(Date.parse(this.value)) ? this.generateDate(this.value) : null` |


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
