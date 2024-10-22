# calcite-sortable-list

<!-- Auto Generated Below -->

## Properties

| Property         | Attribute         | Description                                                                                                          | Type                                   | Default            |
| ---------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ------------------ |
| `canPull`        | --                | When provided, the method will be called to determine whether the element can move from the list.                    | `(detail: DragDetail) => boolean`      | `undefined`        |
| `canPut`         | --                | When provided, the method will be called to determine whether the element can be added from another list.            | `(detail: DragDetail) => boolean`      | `undefined`        |
| `disabled`       | `disabled`        | When true, disabled prevents interaction. This state shows items with lower opacity/grayed.                          | `boolean`                              | `false`            |
| `dragSelector`   | `drag-selector`   | Specifies which items inside the element should be draggable.                                                        | `string`                               | `undefined`        |
| `group`          | `group`           | The list's group identifier. To drag elements from one list into another, both lists must have the same group value. | `string`                               | `undefined`        |
| `handleSelector` | `handle-selector` | The selector for the handle elements.                                                                                | `string`                               | `"calcite-handle"` |
| `layout`         | `layout`          | Indicates the horizontal or vertical orientation of the component.                                                   | `"grid" \| "horizontal" \| "vertical"` | `"vertical"`       |
| `loading`        | `loading`         | When true, content is waiting to be loaded. This state shows a busy indicator.                                       | `boolean`                              | `false`            |

## Events

| Event                    | Description                                     | Type                |
| ------------------------ | ----------------------------------------------- | ------------------- |
| `calciteListOrderChange` | Emitted when the order of the list has changed. | `CustomEvent<void>` |

## Slots

| Slot | Description                       |
| ---- | --------------------------------- |
|      | A slot for adding sortable items. |

---

_Built with [StencilJS](https://stenciljs.com/)_
