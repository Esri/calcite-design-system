# calcite-date



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute          | Description                                                                                  | Type     | Default   |
| ---------------- | ------------------ | -------------------------------------------------------------------------------------------- | -------- | --------- |
| `locale`         | `locale`           |                                                                                              | `string` | `"en-US"` |
| `max`            | `max`              | Value of the form control                                                                    | `string` | `""`      |
| `min`            | `min`              | Name of the form control (useful for specifying input/label relationship)                    | `string` | `""`      |
| `nextMonthLabel` | `next-month-label` |                                                                                              | `string` | `""`      |
| `prevMonthLabel` | `prev-month-label` |                                                                                              | `string` | `""`      |
| `startOfWeek`    | `start-of-week`    | Sun by default 0: Sunday 1: Monday 2: Tuesday 3: Wednesday 4: Thursday 5: Friday 6: Saturday | `number` | `0`       |
| `value`          | `value`            | Value of the form control                                                                    | `string` | `""`      |


## Events

| Event               | Description | Type               |
| ------------------- | ----------- | ------------------ |
| `calciteDateChange` |             | `CustomEvent<any>` |


## Dependencies

### Depends on

- [calcite-date-month-header](components/calcite-date-month-header)
- [calcite-date-month](components/calcite-date-month)

### Graph
```mermaid
graph TD;
  calcite-date-picker --> calcite-date-month-header
  calcite-date-picker --> calcite-date-month
  calcite-date-month --> calcite-date-day
  style calcite-date-picker fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
