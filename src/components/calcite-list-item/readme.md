# calcite-list-item

A general purpose list that enables users to construct list items that conform to Calcite styling.

If you are looking for a list that handles more advanced usage like selection, see the documentation for 'calcite-pick-list' or 'calcite-value-list'.

<!-- Auto Generated Below -->

## Properties

| Property         | Attribute         | Description                                                                   | Type      | Default     |
| ---------------- | ----------------- | ----------------------------------------------------------------------------- | --------- | ----------- |
| `description`    | `description`     | An optional description for this item. This will appear below the label text. | `string`  | `undefined` |
| `disabled`       | `disabled`        | When true, disabled prevents interaction.                                     | `boolean` | `false`     |
| `label`          | `label`           |                                                                               | `string`  | `undefined` |
| `nonInteractive` | `non-interactive` | When true, prevents the content of the list item from user interaction.       | `boolean` | `false`     |

## Slots

| Slot              | Description                                                                                  |
| ----------------- | -------------------------------------------------------------------------------------------- |
|                   | A slot for adding `calcite-list-item` and `calcite-list-item-group` elements.                |
| `"actions-end"`   | A slot for adding actionable `calcite-action` elements after the content of the list item.   |
| `"actions-start"` | A slot for adding actionable `calcite-action` elements before the content of the list item.  |
| `"content-end"`   | A slot for adding non-actionable elements after the label and description of the list item.  |
| `"content-start"` | A slot for adding non-actionable elements before the label and description of the list item. |

---

_Built with [StencilJS](https://stenciljs.com/)_
