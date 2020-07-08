# calcite-value-list-item

`calcite-value-list-item`s are cards contained in a `calcite-value-list`. They each can have a label and description, an icon and can have their label's be editable (inherited from `calcite-value-list`). The developer can disable or preselect each list item and give it a value.

<!-- Auto Generated Below -->

## Properties

| Property                 | Attribute          | Description                                                                                       | Type                                                        | Default     |
| ------------------------ | ------------------ | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ----------- |
| `disabled`               | `disabled`         | When true, the item cannot be clicked and is visually muted                                       | `boolean`                                                   | `false`     |
| `icon`                   | `icon`             | Determines the icon SVG symbol that will be shown. Options are circle, square, grid or null.      | `ICON_TYPES.circle \| ICON_TYPES.grip \| ICON_TYPES.square` | `null`      |
| `metadata`               | --                 | Used to provide additional metadata to an item, primarily used when the parent list has a filter. | `object`                                                    | `undefined` |
| `removable`              | `removable`        | Set this to true to display a remove action that removes the item from the list.                  | `boolean`                                                   | `false`     |
| `selected`               | `selected`         | Set this to true to pre-select an item. Toggles when an item is checked/unchecked.                | `boolean`                                                   | `false`     |
| `textDescription`        | `text-description` | An optional description for this item. Will appear below the label text.                          | `string`                                                    | `undefined` |
| `textLabel` _(required)_ | `text-label`       | The main label for this item. Appears next to the icon.                                           | `string`                                                    | `undefined` |
| `value` _(required)_     | `value`            | A unique value used to identify this item - similar to the value attribute on an <input>.         | `string`                                                    | `undefined` |

## Methods

### `setFocus() => Promise<void>`

#### Returns

Type: `Promise<void>`

### `toggleSelected(coerce?: boolean) => Promise<void>`

#### Returns

Type: `Promise<void>`

## Slots

| Slot                 | Description                                                                                               |
| -------------------- | --------------------------------------------------------------------------------------------------------- |
| `"secondary-action"` | A slot intended for adding a `calcite-action` or `calcite-button`. This is placed at the end of the item. |

## Dependencies

### Depends on

- [calcite-pick-list-item](../calcite-pick-list-item)

### Graph

```mermaid
graph TD;
  calcite-value-list-item --> calcite-pick-list-item
  calcite-pick-list-item --> calcite-action
  style calcite-value-list-item fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
