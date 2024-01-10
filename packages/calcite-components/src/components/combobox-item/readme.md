# calcite-combobox-item

<!-- Auto Generated Below -->

## Properties

| Property                 | Attribute         | Description                                                                                  | Type                     | Default     |
| ------------------------ | ----------------- | -------------------------------------------------------------------------------------------- | ------------------------ | ----------- |
| `active`                 | `active`          | When `true`, the component is active.                                                        | `boolean`                | `false`     |
| `ancestors`              | --                | Specifies the parent and grandparent items, which are set on `calcite-combobox`.             | `ComboboxChildElement[]` | `undefined` |
| `disabled`               | `disabled`        | When `true`, interaction is prevented and the component is displayed with lower opacity.     | `boolean`                | `false`     |
| `filterDisabled`         | `filter-disabled` | When `true`, omits the component from the `calcite-combobox` filtered search results.        | `boolean`                | `undefined` |
| `guid`                   | `guid`            | The `id` attribute of the component. When omitted, a globally unique identifier is used.     | `string`                 | `guid()`    |
| `icon`                   | `icon`            | Specifies an icon to display.                                                                | `string`                 | `undefined` |
| `iconFlipRtl`            | `icon-flip-rtl`   | When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). | `boolean`                | `false`     |
| `selected`               | `selected`        | When `true`, the component is selected.                                                      | `boolean`                | `false`     |
| `textLabel` *(required)* | `text-label`      | The component's text.                                                                        | `string`                 | `undefined` |
| `value` *(required)*     | `value`           | The component's value.                                                                       | `any`                    | `undefined` |

## Events

| Event                       | Description                                             | Type                |
| --------------------------- | ------------------------------------------------------- | ------------------- |
| `calciteComboboxItemChange` | Emits whenever the component is selected or unselected. | `CustomEvent<void>` |

## Slots

| Slot | Description                                        |
| ---- | -------------------------------------------------- |
|      | A slot for adding nested `calcite-combobox-item`s. |

## Dependencies

### Used by

- [calcite-input-time-zone](../input-time-zone)

### Depends on

- [calcite-icon](../icon)

### Graph

```mermaid
graph TD;
  calcite-combobox-item --> calcite-icon
  calcite-input-time-zone --> calcite-combobox-item
  style calcite-combobox-item fill:#f9f,stroke:#333,stroke-width:4px
```

---

*Built with [StencilJS](https://stenciljs.com/)*
