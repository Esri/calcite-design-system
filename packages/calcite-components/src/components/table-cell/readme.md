# calcite-table-cell

<!-- Auto Generated Below -->

## Properties

| Property           | Attribute   | Description                                                             | Type                                                                                                            | Default     |
| ------------------ | ----------- | ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ----------- |
| `alignment`        | `alignment` | Specifies the alignment of the component.                               | `"center" \| "end" \| "start"`                                                                                  | `"start"`   |
| `colSpan`          | `col-span`  | Specifies the number of columns the component should span.              | `number`                                                                                                        | `undefined` |
| `messageOverrides` | --          | Use this property to override individual strings used by the component. | `{ keyboardDeselect?: string; keyboardSelect?: string; row?: string; selected?: string; unselected?: string; }` | `undefined` |
| `rowSpan`          | `row-span`  | Specifies the number of rows the component should span.                 | `number`                                                                                                        | `undefined` |

## Methods

### `setFocus() => Promise<void>`

Sets focus on the component.

#### Returns

Type: `Promise<void>`

## Slots

| Slot | Description                                      |
| ---- | ------------------------------------------------ |
|      | A slot for adding content, usually text content. |

## CSS Custom Properties

| Name                                | Description                                      |
| ----------------------------------- | ------------------------------------------------ |
| `--calcite-table-cell-background`   | Specifies the background color of the component. |
| `--calcite-table-cell-border-color` | Specifies the border color of the component.     |

## Dependencies

### Used by

- [calcite-table-row](../table-row)

### Graph

```mermaid
graph TD;
  calcite-table-row --> calcite-table-cell
  style calcite-table-cell fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
