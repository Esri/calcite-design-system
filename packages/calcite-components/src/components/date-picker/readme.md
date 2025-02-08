# calcite-date-picker

For comprehensive guidance on using and implementing `calcite-date-picker`, refer to the [documentation page](https://developers.arcgis.com/calcite-design-system/components/date-picker/).

<!-- Auto Generated Below -->

## Properties

| Property                     | Attribute                      | Description                                                                                                                                                                  | Type                            | Default        |
| ---------------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | -------------- |
| `activeDate`                 | --                             | Specifies the component's active date.                                                                                                                                       | `Date`                          | `undefined`    |
| `activeRange`                | `active-range`                 | When `range` is true, specifies the active `range`. Where `"start"` specifies the starting range date and `"end"` the ending range date.                                     | `"end" \| "start"`              | `undefined`    |
| `headingLevel`               | `heading-level`                | Specifies the heading level of the component's `heading` for proper document structure, without affecting visual styling.                                                    | `1 \| 2 \| 3 \| 4 \| 5 \| 6`    | `undefined`    |
| `layout`                     | `layout`                       | Defines the layout of the component.                                                                                                                                         | `"horizontal" \| "vertical"`    | `"horizontal"` |
| `max`                        | `max`                          | Specifies the latest allowed date (`"yyyy-mm-dd"`).                                                                                                                          | `string`                        | `undefined`    |
| `maxAsDate`                  | --                             | Specifies the latest allowed date as a full date object (`new Date("yyyy-mm-dd")`).                                                                                          | `Date`                          | `undefined`    |
| `messageOverrides`           | `message-overrides`            | Use this property to override individual strings used by the component.                                                                                                      | `DatePickerMessages`            | `undefined`    |
| `min`                        | `min`                          | Specifies the earliest allowed date (`"yyyy-mm-dd"`).                                                                                                                        | `string`                        | `undefined`    |
| `minAsDate`                  | --                             | Specifies the earliest allowed date as a full date object (`new Date("yyyy-mm-dd")`).                                                                                        | `Date`                          | `undefined`    |
| `monthStyle`                 | `month-style`                  | Specifies the monthStyle used by the component.                                                                                                                              | `"abbreviated" \| "wide"`       | `"wide"`       |
| `numberingSystem`            | `numbering-system`             | Specifies the Unicode numeral system used by the component for localization. This property cannot be dynamically changed.                                                    | `"arab" \| "arabext" \| "latn"` | `undefined`    |
| `proximitySelectionDisabled` | `proximity-selection-disabled` | When `true`, disables the default behavior on the third click of narrowing or extending the range and instead starts a new range.                                            | `boolean`                       | `false`        |
| `range`                      | `range`                        | When `true`, activates the component's range mode to allow a start and end date.                                                                                             | `boolean`                       | `false`        |
| `scale`                      | `scale`                        | Specifies the size of the component.                                                                                                                                         | `"l" \| "m" \| "s"`             | `"m"`          |
| `value`                      | `value`                        | Specifies the selected date as a string (`"yyyy-mm-dd"`), or an array of strings for `range` values (`["yyyy-mm-dd", "yyyy-mm-dd"]`).                                        | `string \| string[]`            | `undefined`    |
| `valueAsDate`                | --                             | Specifies the selected date as a full date object (`new Date("yyyy-mm-dd")`), or an array containing full date objects (`[new Date("yyyy-mm-dd"), new Date("yyyy-mm-dd")]`). | `Date \| Date[]`                | `undefined`    |

## Events

| Event                          | Description                                                                                                           | Type                |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `calciteDatePickerChange`      | Fires when a user changes the component's date. For `range` events, use `calciteDatePickerRangeChange`.               | `CustomEvent<void>` |
| `calciteDatePickerRangeChange` | Fires when a user changes the component's date `range`. For components without `range` use `calciteDatePickerChange`. | `CustomEvent<void>` |

## Methods

### `setFocus() => Promise<void>`

Sets focus on the component's first focusable element.

#### Returns

Type: `Promise<void>`

## Dependencies

### Used by

- [calcite-input-date-picker](../input-date-picker)

### Depends on

- [calcite-date-picker-month](../date-picker-month)

### Graph

```mermaid
graph TD;
  calcite-date-picker --> calcite-date-picker-month
  calcite-date-picker-month --> calcite-date-picker-day
  calcite-date-picker-month --> calcite-date-picker-month-header
  calcite-date-picker-month-header --> calcite-select
  calcite-date-picker-month-header --> calcite-option
  calcite-date-picker-month-header --> calcite-action
  calcite-select --> calcite-icon
  calcite-select --> calcite-input-message
  calcite-input-message --> calcite-icon
  calcite-action --> calcite-loader
  calcite-action --> calcite-icon
  calcite-input-date-picker --> calcite-date-picker
  style calcite-date-picker fill:#f9f,stroke:#333,stroke-width:4px
```

---

*Built with [StencilJS](https://stenciljs.com/)*
