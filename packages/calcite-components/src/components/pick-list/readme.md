# calcite-pick-list

For comprehensive guidance on using and implementing `calcite-pick-list`, refer to the [documentation page](https://developers.arcgis.com/calcite-design-system/components/pick-list/).

<!-- Auto Generated Below -->

> **[DEPRECATED]** Use the `calcite-list` component instead.

## Properties

| Property                | Attribute                 | Description                                                                                                                                                                                                                                                           | Type                                                                                          | Default     |
| ----------------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ----------- |
| `disabled`              | `disabled`                | When `true`, interaction is prevented and the component is displayed with lower opacity.                                                                                                                                                                              | `boolean`                                                                                     | `false`     |
| `filterEnabled`         | `filter-enabled`          | When `true`, an input appears at the top of the list that can be used by end users to filter items in the list.                                                                                                                                                       | `boolean`                                                                                     | `false`     |
| `filterPlaceholder`     | `filter-placeholder`      | Placeholder text for the filter input field.                                                                                                                                                                                                                          | `string`                                                                                      | `undefined` |
| `filterText`            | `filter-text`             | Text for the filter input field.                                                                                                                                                                                                                                      | `string`                                                                                      | `undefined` |
| `filteredData`          | --                        | The component's filtered data.                                                                                                                                                                                                                                        | `{ label: string; description: string; metadata: Record<string, unknown>; value: string; }[]` | `[]`        |
| `filteredItems`         | --                        | The component's filtered items.                                                                                                                                                                                                                                       | `HTMLCalcitePickListItemElement[]`                                                            | `[]`        |
| `headingLevel`          | `heading-level`           | Specifies the heading level of the component's `heading` for proper document structure, without affecting visual styling.                                                                                                                                             | `1 \| 2 \| 3 \| 4 \| 5 \| 6`                                                                  | `undefined` |
| `loading`               | `loading`                 | When `true`, a busy indicator is displayed.                                                                                                                                                                                                                           | `boolean`                                                                                     | `false`     |
| `multiple`              | `multiple`                | Similar to standard radio buttons and checkboxes. When `true`, a user can select multiple `calcite-pick-list-item`s at a time. When `false`, only a single `calcite-pick-list-item` can be selected at a time, and a new selection will deselect previous selections. | `boolean`                                                                                     | `false`     |
| `selectionFollowsFocus` | `selection-follows-focus` | When `true` and single selection is enabled, the selection changes when navigating `calcite-pick-list-item`s via keyboard.                                                                                                                                            | `boolean`                                                                                     | `false`     |

## Events

| Event               | Description                                                             | Type                                                       |
| ------------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------- |
| `calciteListChange` | Emits when any of the `calcite-pick-list-item` selections have changed. | `CustomEvent<Map<string, HTMLCalcitePickListItemElement>>` |
| `calciteListFilter` | Emits when a filter has changed.                                        | `CustomEvent<void>`                                        |

## Methods

### `getSelectedItems() => Promise<Map<string, HTMLCalcitePickListItemElement>>`

Returns the component's selected `calcite-pick-list-item`s.

#### Returns

Type: `Promise<Map<string, HTMLCalcitePickListItemElement>>`

### `setFocus(focusId?: ListFocusId) => Promise<void>`

Sets focus on the component's first focusable element.

#### Parameters

| Name      | Type       | Description |
| --------- | ---------- | ----------- |
| `focusId` | `"filter"` |             |

#### Returns

Type: `Promise<void>`

## Slots

| Slot             | Description                                                                                                               |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------- |
|                  | A slot for adding `calcite-pick-list-item` or `calcite-pick-list-group` elements. Items are displayed as a vertical list. |
| `"menu-actions"` | A slot for adding a button and menu combination for performing actions, such as sorting.                                  |

## Dependencies

### Depends on

- [calcite-filter](../filter)
- [calcite-scrim](../scrim)

### Graph

```mermaid
graph TD;
  calcite-pick-list --> calcite-filter
  calcite-pick-list --> calcite-scrim
  calcite-filter --> calcite-input
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  calcite-input --> calcite-input-message
  calcite-input-message --> calcite-icon
  calcite-scrim --> calcite-loader
  style calcite-pick-list fill:#f9f,stroke:#333,stroke-width:4px
```

---

*Built with [StencilJS](https://stenciljs.com/)*
