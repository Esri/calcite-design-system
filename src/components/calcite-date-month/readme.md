# calcite-date-month



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute | Description                                            | Type     | Default      |
| -------------- | --------- | ------------------------------------------------------ | -------- | ------------ |
| `activeDate`   | --        | Date currently active.                                 | `Date`   | `new Date()` |
| `locale`       | `locale`  | User's language and region as BCP 47 formatted string. | `string` | `"en-US"`    |
| `max`          | --        | Maximum date of the calendar above which is disabled.  | `Date`   | `undefined`  |
| `min`          | --        | Minimum date of the calendar below which is disabled.  | `Date`   | `undefined`  |
| `selectedDate` | --        | Already selected date.                                 | `Date`   | `undefined`  |


## Events

| Event                     | Description                               | Type               |
| ------------------------- | ----------------------------------------- | ------------------ |
| `calciteActiveDateChange` | Active date for the user keyboard access. | `CustomEvent<any>` |
| `calciteDateSelect`       | Event emitted when user selects the date. | `CustomEvent<any>` |


## Dependencies

### Used by

 - [calcite-date](../calcite-date)

### Depends on

- [calcite-date-day](../calcite-date-day)

### Graph
```mermaid
graph TD;
  calcite-date-month --> calcite-date-day
  calcite-date --> calcite-date-month
  style calcite-date-month fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
