# calcite-list-item-group

For comprehensive guidance on using and implementing `calcite-list-item-group`, refer to the [documentation page](https://developers.arcgis.com/calcite-design-system/components/list-item-group/).

<!-- Auto Generated Below -->

## Properties

| Property   | Attribute  | Description                                                                              | Type      | Default     |
| ---------- | ---------- | ---------------------------------------------------------------------------------------- | --------- | ----------- |
| `disabled` | `disabled` | When `true`, interaction is prevented and the component is displayed with lower opacity. | `boolean` | `false`     |
| `heading`  | `heading`  | The header text for all nested `calcite-list-item` rows.                                 | `string`  | `undefined` |

## Events

| Event                                           | Description                                                                          | Type                     |
| ----------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------ |
| `calciteInternalListItemGroupDefaultSlotChange` | Fires when changes occur in the default slot, notifying parent lists of the changes. | `CustomEvent<DragEvent>` |

## Slots

| Slot | Description                                                                   |
| ---- | ----------------------------------------------------------------------------- |
|      | A slot for adding `calcite-list-item` and `calcite-list-item-group` elements. |

---

*Built with [StencilJS](https://stenciljs.com/)*
