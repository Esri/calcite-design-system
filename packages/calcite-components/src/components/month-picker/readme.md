# calcite-month-picker

<!-- Auto Generated Below -->

## Properties

| Property            | Attribute            | Description                                                              | Type     | Default     |
| ------------------- | -------------------- | ------------------------------------------------------------------------ | -------- | ----------- |
| `activeDate`        | --                   | Focused date with indicator (will become selected date if user proceeds) | `Date`   | `undefined` |
| `activeMonthIndex`  | `active-month-index` |                                                                          | `number` | `undefined` |
| `max`               | --                   | Specifies the latest allowed date (`"yyyy-mm-dd"`).                      | `Date`   | `undefined` |
| `min`               | --                   | Specifies the earliest allowed date (`"yyyy-mm-dd"`).                    | `Date`   | `undefined` |
| `selectedMonthYear` | --                   | Already selected date.                                                   | `Date`   | `undefined` |

## Events

| Event                      | Description                               | Type                |
| -------------------------- | ----------------------------------------- | ------------------- |
| `calciteMonthPickerChange` | Emits whenever the component is selected. | `CustomEvent<void>` |

## Dependencies

### Depends on

- [calcite-year-picker](../year-picker)
- [calcite-action](../action)
- [calcite-month-picker-item](../month-picker-item)

---
