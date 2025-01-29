# calcite-filter

For comprehensive guidance on using and implementing `calcite-filter`, refer to the [documentation page](https://developers.arcgis.com/calcite-design-system/components/filter/).

<!-- Auto Generated Below -->

## Properties

| Property           | Attribute           | Description                                                                                                                                                                                                                                 | Type                | Default     |
| ------------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ----------- |
| `disabled`         | `disabled`          | When `true`, interaction is prevented and the component is displayed with lower opacity.                                                                                                                                                    | `boolean`           | `false`     |
| `filterProps`      | --                  | Specifies the properties to match against when filtering. This will only apply when `value` is an object. If not set, all properties will be matched.                                                                                       | `string[]`          | `undefined` |
| `filteredItems`    | --                  | The component's resulting items after filtering.                                                                                                                                                                                            | `object[]`          | `[]`        |
| `items`            | --                  | Defines the items to filter. The component uses the values as the starting point, and returns items that contain the string entered in the input, using a partial match and recursive search. This property is needed to conduct filtering. | `object[]`          | `[]`        |
| `messageOverrides` | `message-overrides` | Use this property to override individual strings used by the component.                                                                                                                                                                     | `FilterMessages`    | `undefined` |
| `placeholder`      | `placeholder`       | Specifies placeholder text for the input element.                                                                                                                                                                                           | `string`            | `undefined` |
| `scale`            | `scale`             | Specifies the size of the component.                                                                                                                                                                                                        | `"l" \| "m" \| "s"` | `"m"`       |
| `value`            | `value`             | The component's value.                                                                                                                                                                                                                      | `string`            | `""`        |

## Events

| Event                 | Description                         | Type                |
| --------------------- | ----------------------------------- | ------------------- |
| `calciteFilterChange` | Fires when the filter text changes. | `CustomEvent<void>` |

## Methods

### `filter(value?: string) => Promise<void>`

Performs a filter on the component.

This method can be useful because filtering is delayed and asynchronous.

#### Parameters

| Name    | Type     | Description              |
| ------- | -------- | ------------------------ |
| `value` | `string` | - The filter text value. |

#### Returns

Type: `Promise<void>`

### `setFocus() => Promise<void>`

Sets focus on the component.

#### Returns

Type: `Promise<void>`

## Dependencies

### Used by

- [calcite-list](../list)
- [calcite-pick-list](../pick-list)
- [calcite-value-list](../value-list)

### Depends on

- [calcite-input](../input)

### Graph

```mermaid
graph TD;
  calcite-filter --> calcite-input
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  calcite-input --> calcite-input-message
  calcite-input-message --> calcite-icon
  calcite-list --> calcite-filter
  calcite-pick-list --> calcite-filter
  calcite-value-list --> calcite-filter
  style calcite-filter fill:#f9f,stroke:#333,stroke-width:4px
```

---
