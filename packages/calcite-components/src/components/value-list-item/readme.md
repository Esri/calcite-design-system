# calcite-value-list-item

`calcite-value-list-item`s are cards contained in a `calcite-value-list`. They each can have a label and description, an icon and can have their label's be editable (inherited from `calcite-value-list`). The developer can disable or preselect each list item and give it a value.

<!-- Auto Generated Below -->

> **[DEPRECATED]** Use the `list` component instead.

## Properties

| Property             | Attribute         | Description                                                                                    | Type                                                        | Default     |
| -------------------- | ----------------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ----------- |
| `description`        | `description`     | A description for the component that displays below the label text.                            | `string`                                                    | `undefined` |
| `disabled`           | `disabled`        | When `true`, interaction is prevented and the component is displayed with lower opacity.       | `boolean`                                                   | `false`     |
| `icon`               | `icon`            | Determines the icon SVG symbol that will be shown. Options are circle, square, grip or null.   | `ICON_TYPES.circle \| ICON_TYPES.grip \| ICON_TYPES.square` | `null`      |
| `iconFlipRtl`        | `icon-flip-rtl`   | When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`).   | `boolean`                                                   | `false`     |
| `label` *(required)* | `label`           | Label and accessible name for the component. Appears next to the icon.                         | `string`                                                    | `undefined` |
| `metadata`           | --                | Provides additional metadata to the component. Primary use is for a filter on the parent list. | `{ [x: string]: unknown; }`                                 | `undefined` |
| `nonInteractive`     | `non-interactive` | When `true`, prevents the content of the component from user interaction.                      | `boolean`                                                   | `false`     |
| `removable`          | `removable`       | When `true`, adds an action to remove the component.                                           | `boolean`                                                   | `false`     |
| `selected`           | `selected`        | When `true`, the component is selected.                                                        | `boolean`                                                   | `false`     |
| `value` *(required)* | `value`           | The component's value.                                                                         | `any`                                                       | `undefined` |

## Events

| Event                   | Description                                         | Type                                                                                                            |
| ----------------------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `calciteListItemChange` | Fires when the component is selected or unselected. | `CustomEvent<{ item: HTMLCalciteValueListItemElement; value: any; selected: boolean; shiftPressed: boolean; }>` |
| `calciteListItemRemove` | Fires when the remove button is pressed.            | `CustomEvent<void>`                                                                                             |

## Methods

### `setFocus() => Promise<void>`

Set focus on the component.

#### Returns

Type: `Promise<void>`

### `toggleSelected(coerce?: boolean) => Promise<void>`

Toggle the selection state. By default this won't trigger an event.
The first argument allows the value to be coerced, rather than swapping values.

#### Returns

Type: `Promise<void>`

## Slots

| Slot              | Description                                                                        |
| ----------------- | ---------------------------------------------------------------------------------- |
| `"actions-end"`   | A slot for adding `calcite-action`s or content to the end side of the component.   |
| `"actions-start"` | A slot for adding `calcite-action`s or content to the start side of the component. |

## Dependencies

### Depends on

- [calcite-icon](../icon)
- [calcite-pick-list-item](../pick-list-item)

### Graph

```mermaid
graph TD;
  calcite-value-list-item --> calcite-icon
  calcite-value-list-item --> calcite-pick-list-item
  calcite-pick-list-item --> calcite-icon
  calcite-pick-list-item --> calcite-action
  calcite-action --> calcite-loader
  calcite-action --> calcite-icon
  style calcite-value-list-item fill:#f9f,stroke:#333,stroke-width:4px
```

---

*Built with [StencilJS](https://stenciljs.com/)*
