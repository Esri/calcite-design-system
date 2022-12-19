# calcite-tree

<!-- Auto Generated Below -->

## Usage

### Basic

`<calcite-tree>` can be used as a sidebar navigation tree with optional lines and different selection modes.

```html
<calcite-tree>
  <calcite-tree-item>
    <a href="#">Child 1</a>
    <calcite-tree slot="children">
      <calcite-tree-item>
        <a href="#">Grandchild 1</a>
      </calcite-tree-item>
      <calcite-tree-item>
        <a href="#">Grandchild 2</a>
      </calcite-tree-item>
    </calcite-tree>
  </calcite-tree-item>
</calcite-tree>
```

## Properties

| Property        | Attribute        | Description                                    | Type                                                                                                   | Default    |
| --------------- | ---------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ---------- |
| `lines`         | `lines`          | Displays indentation guide lines.              | `boolean`                                                                                              | `false`    |
| `scale`         | `scale`          | Specifies the size of the component.           | `"l" \| "m" \| "s"`                                                                                    | `"m"`      |
| `selectedItems` | --               | Specifies the component's selected items.      | `HTMLCalciteTreeItemElement[]`                                                                         | `[]`       |
| `selectionMode` | `selection-mode` | Customize how the component's selection works. | `"ancestors" \| "children" \| "multichildren" \| "multiple" \| "none" \| "single" \| "single-persist"` | `"single"` |

## Events

| Event               | Description                                                 | Type                |
| ------------------- | ----------------------------------------------------------- | ------------------- |
| `calciteTreeSelect` | Fires when the user selects/deselects `calcite-tree-items`. | `CustomEvent<void>` |

## Slots

| Slot | Description                              |
| ---- | ---------------------------------------- |
|      | A slot for `calcite-tree-item` elements. |

---

_Built with [StencilJS](https://stenciljs.com/)_
