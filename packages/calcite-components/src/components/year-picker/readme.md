# calcite-year-picker

<!-- Auto Generated Below -->

## Properties

| Property                 | Attribute                    | Description                                                                                                                 | Type                            | Default     |
| ------------------------ | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | ----------- |
| `disableYearsOutOfRange` | `disable-years-out-of-range` | When `true`, disables year's before the earliest allowed year in end year and after the latest year in start year of range. | `boolean`                       | `false`     |
| `disabled`               | `disabled`                   | When `true`, disables the component                                                                                         | `boolean`                       | `undefined` |
| `max`                    | `max`                        | Specifies the latest allowed year (`"yyyy"`).                                                                               | `number`                        | `2100`      |
| `min`                    | `min`                        | Specifies the earliest allowed year (`"yyyy"`).                                                                             | `number`                        | `1900`      |
| `numberingSystem`        | `numbering-system`           | Specifies the Unicode numeral system used by the component for localization.                                                | `"arab" \| "arabext" \| "latn"` | `undefined` |
| `range`                  | `range`                      | When `true`, activates the component's range mode to allow a start and end year.                                            | `boolean`                       | `undefined` |
| `value`                  | `value`                      | Specifies the selected year as a string (`"yyyy"`), or an array of strings for `range` values (`["yyyy", "yyyy"]`).         | `number \| number[]`            | `undefined` |

## Events

| Event                     | Description                               | Type                |
| ------------------------- | ----------------------------------------- | ------------------- |
| `calciteYearPickerChange` | Emits whenever the component is selected. | `CustomEvent<void>` |

## Methods

### `nextYear() => Promise<void>`

#### Returns

Type: `Promise<void>`

### `prevYear() => Promise<void>`

#### Returns

Type: `Promise<void>`

## Dependencies

### Used by

- [calcite-date-picker-month-header](../date-picker-month-header)
- [calcite-month-picker](../month-picker)

### Depends on

- [calcite-select](../select)
- [calcite-option](../option)

---
