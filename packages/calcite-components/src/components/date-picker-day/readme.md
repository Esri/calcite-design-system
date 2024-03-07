# calcite-date-day

<!-- Auto Generated Below -->

## Properties

| Property           | Attribute        | Description                                                                              | Type                | Default     |
| ------------------ | ---------------- | ---------------------------------------------------------------------------------------- | ------------------- | ----------- |
| `active`           | `active`         | When `true`, the component is active.                                                    | `boolean`           | `false`     |
| `currentMonth`     | `current-month`  | Date is in the current month.                                                            | `boolean`           | `false`     |
| `day` *(required)* | `day`            | Day of the month to be shown.                                                            | `number`            | `undefined` |
| `disabled`         | `disabled`       | When `true`, interaction is prevented and the component is displayed with lower opacity. | `boolean`           | `false`     |
| `endOfRange`       | `end-of-range`   | Date is the end of date range.                                                           | `boolean`           | `false`     |
| `highlighted`      | `highlighted`    | Date is currently highlighted as part of the range,                                      | `boolean`           | `false`     |
| `range`            | `range`          | When `true`, activates the component's range mode to allow a start and end date.         | `boolean`           | `false`     |
| `rangeHover`       | `range-hover`    | Date is being hovered and within the set range.                                          | `boolean`           | `false`     |
| `scale`            | `scale`          | Specifies the size of the component.                                                     | `"l" \| "m" \| "s"` | `undefined` |
| `selected`         | `selected`       | When `true`, the component is selected.                                                  | `boolean`           | `false`     |
| `startOfRange`     | `start-of-range` | Date is the start of date range.                                                         | `boolean`           | `false`     |
| `value`            | --               | The component's value.                                                                   | `Date`              | `undefined` |

## Events

| Event              | Description                  | Type                |
| ------------------ | ---------------------------- | ------------------- |
| `calciteDaySelect` | Fires when user selects day. | `CustomEvent<void>` |

## CSS Custom Properties

| Name                                            | Description                                                |
| ----------------------------------------------- | ---------------------------------------------------------- |
| `--calcite-day-background-color`                | Specifies the background color of component.               |
| `--calcite-day-background-color-hover`          | Specifies the background color of component when hovered.  |
| `--calcite-day-background-color-selected`       | Specifies the background color of component when selected. |
| `--calcite-day-corner-radius`                   | Specifies the border radius of component.                  |
| `--calcite-day-font-size`                       | Specifies the font size of component.                      |
| `--calcite-day-range-background-color-hovered`  | Specifies the background color of day range when hovered.  |
| `--calcite-day-range-background-color-selected` | Specifies the background color of day range when selected. |
| `--calcite-day-text-color`                      | Specifies the text color of component.                     |
| `--calcite-day-text-color-hover`                | Specifies the text color of component when hovered.        |
| `--calcite-day-text-color-selected`             | Specifies the text color of component when selected.       |

## Dependencies

### Used by

- [calcite-date-picker-month](../date-picker-month)

### Graph

```mermaid
graph TD;
  calcite-date-picker-month --> calcite-date-picker-day
  style calcite-date-picker-day fill:#f9f,stroke:#333,stroke-width:4px
```

---

*Built with [StencilJS](https://stenciljs.com/)*
