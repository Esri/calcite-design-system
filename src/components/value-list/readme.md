# calcite-value-list

`calcite-value-list` is housed in a panel and contains `calcite-value-list-item`s. The value list has options for drag and drop, label editing, and single or multi-select of items which can be done through shift+click.

<!-- Auto Generated Below -->

## Usage

### Basic

Renders a value list with multiple items able to be selected and a filter.

```html
<calcite-value-list multiple filter-enabled>
  <calcite-value-list-item label="Dogs" description="Man's best friend" value="dogs">
    <calcite-action slot="actions-end" icon="plus"></calcite-action>
  </calcite-value-list-item>
  <calcite-value-list-item label="Cats" description="Independent and fluffy" value="cats">
    <calcite-action slot="actions-end" icon="plus"></calcite-action>
  </calcite-value-list-item>
  <calcite-value-list-item
    label="Fish. But not just any fish, a tiger fish caught live in the Atlantic Ocean while on vacation."
    description="Easy to care for."
    value="fish"
  >
    <calcite-action slot="actions-end" icon="plus"></calcite-action>
  </calcite-value-list-item>
</calcite-value-list>
```

### Drag-and-drop

Renders a value list with drag and drop capability between the items.

```html
<calcite-value-list drag-enabled>
  <calcite-value-list-item label="Rent" description="Mortgage + housing costs" value="rent"> </calcite-value-list-item>
  <calcite-value-list-item label="Food" description="its what you eat." value="food"> </calcite-value-list-item>
  <calcite-value-list-item label="Utilities" value="utilities"> </calcite-value-list-item>
  <calcite-value-list-item label="Entertainment" description="Toys and leisure" value="entertainment">
  </calcite-value-list-item>
</calcite-value-list>
```

### Label-editing-and-single-select

Renders a value list with label editing and single select.

```html
<calcite-value-list label-editing-enabled>
  <calcite-value-list-item
    label="2018 Generation Alpha Population (Born 2017 or Later) [updated 2019-09-18]"
    description="GENALPHACY"
    value="GENALPHACY"
  >
  </calcite-value-list-item>
  <calcite-value-list-item
    label="2010-2018 Households: Annual Growth Rate (Esri)"
    description="HHGRW10CY-2019-09-18.001ZZYLKJ"
    value="HHGRW10CY"
  >
  </calcite-value-list-item>
  <calcite-value-list-item
    label="2010-2018 Households: Annual Growth Rate (Esri)"
    description="HHGRW10CY-2019-09-18.001ZZYYZLKJ"
    value="HHGRW10CY2"
  >
  </calcite-value-list-item>
</calcite-value-list>
```

## Properties

| Property                | Attribute                 | Description                                                                                                                                                                                                                                             | Type      | Default     |
| ----------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `disabled`              | `disabled`                | When true, prevents user interaction. This state shows list items grayed out and with lower opacity.                                                                                                                                                    | `boolean` | `false`     |
| `dragEnabled`           | `drag-enabled`            | When true, list items are sortable via a draggable button.                                                                                                                                                                                              | `boolean` | `false`     |
| `filterEnabled`         | `filter-enabled`          | When true, an input appears at the top of the list that can be used by end users to filter list items.                                                                                                                                                  | `boolean` | `false`     |
| `filterPlaceholder`     | `filter-placeholder`      | Placeholder text for the filter's input field.                                                                                                                                                                                                          | `string`  | `undefined` |
| `group`                 | `group`                   | The list's group identifier. To drag elements from one list into another, both lists must have the same group value.                                                                                                                                    | `string`  | `undefined` |
| `loading`               | `loading`                 | When true, content is waiting to be loaded. This state shows a busy indicator.                                                                                                                                                                          | `boolean` | `false`     |
| `multiple`              | `multiple`                | Similar to standard radio buttons and checkboxes. When true, a user can select multiple list items at a time. When false, only a single list item can be selected at a time, and selecting a new list item will deselect any other selected list items. | `boolean` | `false`     |
| `selectionFollowsFocus` | `selection-follows-focus` | When true and single-selection is enabled, the selection changes when navigating list items via the keyboard.                                                                                                                                           | `boolean` | `false`     |

## Events

| Event                    | Description                                              | Type                                                        |
| ------------------------ | -------------------------------------------------------- | ----------------------------------------------------------- |
| `calciteListChange`      | Emits when any of the list item selections have changed. | `CustomEvent<Map<string, HTMLCalciteValueListItemElement>>` |
| `calciteListOrderChange` | Emits when the order of the list has changed.            | `CustomEvent<any[]>`                                        |

## Methods

### `getSelectedItems() => Promise<Map<string, HTMLCalciteValueListItemElement>>`

Returns the currently selected items

#### Returns

Type: `Promise<Map<string, HTMLCalciteValueListItemElement>>`

### `setFocus(focusId?: ListFocusId) => Promise<void>`

Sets focus on the component.

#### Returns

Type: `Promise<void>`

## Slots

| Slot             | Description                                                                                        |
| ---------------- | -------------------------------------------------------------------------------------------------- |
|                  | A slot for adding `calcite-value-list-item` elements. List items are displayed as a vertical list. |
| `"menu-actions"` | A slot for adding a button and menu combination for performing actions, such as sorting.           |

## Dependencies

### Depends on

- [calcite-filter](../filter)
- [calcite-scrim](../scrim)

### Graph

```mermaid
graph TD;
  calcite-value-list --> calcite-filter
  calcite-value-list --> calcite-scrim
  calcite-filter --> calcite-input
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  calcite-scrim --> calcite-loader
  style calcite-value-list fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
