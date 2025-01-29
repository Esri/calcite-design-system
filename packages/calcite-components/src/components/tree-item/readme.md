# calcite-tree-item

For comprehensive guidance on using and implementing `calcite-tree-item`, refer to the [documentation page](https://developers.arcgis.com/calcite-design-system/components/tree-item/).

<!-- Auto Generated Below -->

## Properties

| Property      | Attribute       | Description                                                                                  | Type                         | Default     |
| ------------- | --------------- | -------------------------------------------------------------------------------------------- | ---------------------------- | ----------- |
| `disabled`    | `disabled`      | When `true`, interaction is prevented and the component is displayed with lower opacity.     | `boolean`                    | `false`     |
| `expanded`    | `expanded`      | When `true`, the component is expanded.                                                      | `boolean`                    | `false`     |
| `iconFlipRtl` | `icon-flip-rtl` | When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). | `"both" \| "end" \| "start"` | `undefined` |
| `iconStart`   | `icon-start`    | Specifies an icon to display at the start of the component.                                  | `string`                     | `undefined` |
| `label`       | `label`         | Accessible name for the component.                                                           | `string`                     | `undefined` |
| `selected`    | `selected`      | When `true`, the component is selected.                                                      | `boolean`                    | `false`     |

## Slots

| Slot            | Description                                                                                           |
| --------------- | ----------------------------------------------------------------------------------------------------- |
|                 | A slot for adding text.                                                                               |
| `"actions-end"` | A slot for adding actions to the end of the component. It is recommended to use two or fewer actions. |
| `"children"`    | A slot for adding nested `calcite-tree` elements.                                                     |

## Dependencies

### Depends on

- [calcite-icon](../icon)

### Graph

```mermaid
graph TD;
  calcite-tree-item --> calcite-icon
  style calcite-tree-item fill:#f9f,stroke:#333,stroke-width:4px
```

---
