# calcite-time-picker

<!-- Auto Generated Below -->

## Properties

| Property           | Attribute            | Description                                                                  | Type                                                                                                                                                                                                                                    | Default             |
| ------------------ | -------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `intlHour`         | `intl-hour`          | Accessible name for the component's hour input.                              | `string`                                                                                                                                                                                                                                | `TEXT.hour`         |
| `intlHourDown`     | `intl-hour-down`     | Accessible name for the component's hour down button.                        | `string`                                                                                                                                                                                                                                | `TEXT.hourDown`     |
| `intlHourUp`       | `intl-hour-up`       | Accessible name for the component's hour up button.                          | `string`                                                                                                                                                                                                                                | `TEXT.hourUp`       |
| `intlMeridiem`     | `intl-meridiem`      | Accessible name for the component's meridiem (AM/PM) input.                  | `string`                                                                                                                                                                                                                                | `TEXT.meridiem`     |
| `intlMeridiemDown` | `intl-meridiem-down` | Accessible name for the component's meridiem (AM/PM) down button.            | `string`                                                                                                                                                                                                                                | `TEXT.meridiemDown` |
| `intlMeridiemUp`   | `intl-meridiem-up`   | Accessible name for the component's meridiem (AM/PM) up button.              | `string`                                                                                                                                                                                                                                | `TEXT.meridiemUp`   |
| `intlMinute`       | `intl-minute`        | Accessible name for the component's minute input.                            | `string`                                                                                                                                                                                                                                | `TEXT.minute`       |
| `intlMinuteDown`   | `intl-minute-down`   | Accessible name for the component's minute down button.                      | `string`                                                                                                                                                                                                                                | `TEXT.minuteDown`   |
| `intlMinuteUp`     | `intl-minute-up`     | Accessible name for the component's minute up button.                        | `string`                                                                                                                                                                                                                                | `TEXT.minuteUp`     |
| `intlSecond`       | `intl-second`        | Accessible name for the component's second input.                            | `string`                                                                                                                                                                                                                                | `TEXT.second`       |
| `intlSecondDown`   | `intl-second-down`   | Accessible name for the component's second down button.                      | `string`                                                                                                                                                                                                                                | `TEXT.secondDown`   |
| `intlSecondUp`     | `intl-second-up`     | Accessible name for the component's second up button.                        | `string`                                                                                                                                                                                                                                | `TEXT.secondUp`     |
| `numberingSystem`  | `numbering-system`   | Specifies the Unicode numeral system used by the component for localization. | `"arab" \| "arabext" \| "bali" \| "beng" \| "deva" \| "fullwide" \| "gujr" \| "guru" \| "hanidec" \| "khmr" \| "knda" \| "laoo" \| "latn" \| "limb" \| "mlym" \| "mong" \| "mymr" \| "orya" \| "tamldec" \| "telu" \| "thai" \| "tibt"` | `undefined`         |
| `scale`            | `scale`              | Specifies the size of the component.                                         | `"l" \| "m" \| "s"`                                                                                                                                                                                                                     | `"m"`               |
| `step`             | `step`               | Specifies the granularity the `value` must adhere to (in seconds).           | `number`                                                                                                                                                                                                                                | `60`                |
| `value`            | `value`              | The component's value in UTC (always 24-hour format).                        | `string`                                                                                                                                                                                                                                | `null`              |

## Methods

### `setFocus(target: TimePart) => Promise<void>`

Sets focus on the component.

#### Returns

Type: `Promise<void>`

## Dependencies

### Used by

- [calcite-input-time-picker](../input-time-picker)

### Depends on

- [calcite-icon](../icon)

### Graph

```mermaid
graph TD;
  calcite-time-picker --> calcite-icon
  calcite-input-time-picker --> calcite-time-picker
  style calcite-time-picker fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
