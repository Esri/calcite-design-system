# calcite-pagination

For comprehensive guidance on using and implementing `calcite-pagination`, refer to the [documentation page](https://developers.arcgis.com/calcite-design-system/components/paination/).

<!-- Auto Generated Below -->

## Properties

| Property           | Attribute           | Description                                                                                                       | Type                            | Default     |
| ------------------ | ------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------- | ----------- |
| `groupSeparator`   | `group-separator`   | When `true`, number values are displayed with a group separator corresponding to the language and country format. | `boolean`                       | `false`     |
| `messageOverrides` | `message-overrides` | Use this property to override individual strings used by the component.                                           | `PaginationMessages`            | `undefined` |
| `numberingSystem`  | `numbering-system`  | Specifies the Unicode numeral system used by the component for localization.                                      | `"arab" \| "arabext" \| "latn"` | `undefined` |
| `pageSize`         | `page-size`         | Specifies the number of items per page.                                                                           | `number`                        | `20`        |
| `scale`            | `scale`             | Specifies the size of the component.                                                                              | `"l" \| "m" \| "s"`             | `"m"`       |
| `startItem`        | `start-item`        | Specifies the starting item number.                                                                               | `number`                        | `1`         |
| `totalItems`       | `total-items`       | Specifies the total number of items.                                                                              | `number`                        | `0`         |

## Events

| Event                     | Description                           | Type                |
| ------------------------- | ------------------------------------- | ------------------- |
| `calcitePaginationChange` | Emits when the selected page changes. | `CustomEvent<void>` |

## Methods

### `goTo(page: number | "start" | "end") => Promise<void>`

Set a specified page as active.

#### Parameters

| Name   | Type                         | Description |
| ------ | ---------------------------- | ----------- |
| `page` | `number \| "start" \| "end"` |             |

#### Returns

Type: `Promise<void>`

### `nextPage() => Promise<void>`

Go to the next page of results.

#### Returns

Type: `Promise<void>`

### `previousPage() => Promise<void>`

Go to the previous page of results.

#### Returns

Type: `Promise<void>`

### `setFocus() => Promise<void>`

Sets focus on the component's first focusable element.

#### Returns

Type: `Promise<void>`

## Dependencies

### Used by

- [calcite-table](../table)

### Depends on

- [calcite-icon](../icon)

### Graph

```mermaid
graph TD;
  calcite-pagination --> calcite-icon
  calcite-table --> calcite-pagination
  style calcite-pagination fill:#f9f,stroke:#333,stroke-width:4px
```

---
