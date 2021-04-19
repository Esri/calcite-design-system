# calcite-filter

<!-- Auto Generated Below -->

## Properties

| Property      | Attribute     | Description                                                                                                                                                             | Type       | Default     |
| ------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ----------- |
| `data`        | --            | The input data. The filter uses this as the starting point, and returns items that contain the string entered in the input, using a partial match and recursive search. | `object[]` | `undefined` |
| `disabled`    | `disabled`    | When true, disabled prevents interaction. This state shows items with lower opacity/grayed.                                                                             | `boolean`  | `false`     |
| `intlClear`   | `intl-clear`  | A text label that will appear on the clear button.                                                                                                                      | `string`   | `undefined` |
| `intlLabel`   | `intl-label`  | A text label that will appear next to the input field.                                                                                                                  | `string`   | `undefined` |
| `placeholder` | `placeholder` | Placeholder text for the input element's placeholder attribute                                                                                                          | `string`   | `undefined` |

## Events

| Event                 | Description                                    | Type               |
| --------------------- | ---------------------------------------------- | ------------------ |
| `calciteFilterChange` | This event fires when the filter text changes. | `CustomEvent<any>` |

## Methods

### `setFocus() => Promise<void>`

Focuses the filter input.

#### Returns

Type: `Promise<void>`

## Dependencies

### Used by

- [calcite-pick-list](../calcite-pick-list)
- [calcite-value-list](../calcite-value-list)

### Depends on

- [calcite-scrim](../calcite-scrim)
- [calcite-icon](../calcite-icon)

### Graph

```mermaid
graph TD;
  calcite-filter --> calcite-scrim
  calcite-filter --> calcite-icon
  calcite-scrim --> calcite-loader
  calcite-pick-list --> calcite-filter
  calcite-value-list --> calcite-filter
  style calcite-filter fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
