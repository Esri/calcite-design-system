# calcite-input-time-picker

<!-- Auto Generated Below -->

## Properties

| Property            | Attribute             | Description                                                                                | Type                | Default     |
| ------------------- | --------------------- | ------------------------------------------------------------------------------------------ | ------------------- | ----------- |
| `disabled`          | `disabled`            | The disabled state of the time input                                                       | `boolean`           | `false`     |
| `hourDisplayFormat` | `hour-display-format` | Format of the hour value (12-hour or 24-hour) (this will be replaced by locale eventually) | `"12" \| "24"`      | `"12"`      |
| `name`              | `name`                | The name of the time input                                                                 | `string`            | `undefined` |
| `scale`             | `scale`               | The scale (size) of the time input                                                         | `"l" \| "m" \| "s"` | `"m"`       |
| `step`              | `step`                | number that specifies the granularity that the value must adhere to                        | `number`            | `60`        |
| `theme`             | `theme`               | The color theme of the time-picker                                                         | `"dark" \| "light"` | `undefined` |
| `value`             | `value`               | The selected time                                                                          | `string`            | `undefined` |

## Events

| Event                          | Description                            | Type                  |
| ------------------------------ | -------------------------------------- | --------------------- |
| `calciteInputTimePickerChange` | Fires when the time value has changed. | `CustomEvent<string>` |

## Methods

### `setFocus() => Promise<void>`

#### Returns

Type: `Promise<void>`

## Dependencies

### Depends on

- [calcite-input](../calcite-input)
- [calcite-popover](../calcite-popover)
- [calcite-time-picker](../calcite-time-picker)

### Graph

```mermaid
graph TD;
  calcite-input-time-picker --> calcite-input
  calcite-input-time-picker --> calcite-popover
  calcite-input-time-picker --> calcite-time-picker
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  calcite-popover --> calcite-icon
  calcite-time-picker --> calcite-icon
  style calcite-input-time-picker fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
