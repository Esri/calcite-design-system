# calcite-list-item

A general purpose list that enables users to construct list items that conform to Calcite styling.

If you are looking for a list that handles more advanced usage like selection, see the documentation for 'calcite-pick-list' or 'calcite-value-list'.

<!-- Auto Generated Below -->

## Properties

| Property         | Attribute         | Description                                                                            | Type      | Default     |
| ---------------- | ----------------- | -------------------------------------------------------------------------------------- | --------- | ----------- |
| `description`    | `description`     | A description for the component. Displays below the label text.                        | `string`  | `undefined` |
| `disabled`       | `disabled`        | When true, interaction is prevented and the component is displayed with lower opacity. | `boolean` | `false`     |
| `label`          | `label`           | The label text of the component. Displays above the description text.                  | `string`  | `undefined` |
| `nonInteractive` | `non-interactive` | When true, prevents the content of the component from user interaction.                | `boolean` | `false`     |

## Methods

### `setFocus() => Promise<void>`

Sets focus on the component.

#### Returns

Type: `Promise<void>`

## Slots

| Slot              | Description                                                                                  |
| ----------------- | -------------------------------------------------------------------------------------------- |
|                   | A slot for adding `calcite-list-item` and `calcite-list-item-group` elements.                |
| `"actions-end"`   | A slot for adding actionable `calcite-action` elements after the content of the component.   |
| `"actions-start"` | A slot for adding actionable `calcite-action` elements before the content of the component.  |
| `"content-end"`   | A slot for adding non-actionable elements after the label and description of the component.  |
| `"content-start"` | A slot for adding non-actionable elements before the label and description of the component. |

---

_Built with [StencilJS](https://stenciljs.com/)_
