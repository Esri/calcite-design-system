# calcite-sortable-list

<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description                                                                                 | Type      | Default            |
| ---------------- | ----------------- | ------------------------------------------------------------------------------------------- | --------- | ------------------ |
| `disabled`       | `disabled`        | When true, disabled prevents interaction. This state shows items with lower opacity/grayed. | `boolean` | `false`            |
| `handleSelector` | `handle-selector` | The class on the handle elements.                                                           | `string`  | `"calcite-handle"` |
| `loading`        | `loading`         | When true, content is waiting to be loaded. This state shows a busy indicator.              | `boolean` | `false`            |


## Events

| Event                    | Description                                      | Type               |
| ------------------------ | ------------------------------------------------ | ------------------ |
| `calciteListOrderChange` | Emmitted when the order of the list has changed. | `CustomEvent<any>` |


## Slots

| Slot | Description                      |
| ---- | -------------------------------- |
|      | A slot for adding sortable items |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
