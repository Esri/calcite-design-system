# calcite-tab

<!-- Auto Generated Below -->

## Usage

### Basic

`calcite-tab` wraps the content you would like to appear when that tab is selected:

```html
<calcite-tab>My stuff!</calcite-tab>
```

## Properties

| Property   | Attribute  | Description                                                                                                        | Type      | Default     |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------ | --------- | ----------- |
| `selected` | `selected` | When `true`, the component's contents are selected. Only one tab can be selected within the `calcite-tabs` parent. | `boolean` | `false`     |
| `tab`      | `tab`      | Specifies a unique name for the component. When specified, use the same value on the `calcite-tab-title`.          | `string`  | `undefined` |

## Methods

### `getTabIndex() => Promise<number>`

Returns the index of the component item within the tab array.

#### Returns

Type: `Promise<number>`

## Slots

| Slot | Description                       |
| ---- | --------------------------------- |
|      | A slot for adding custom content. |

## CSS Custom Properties

| Name                                  | Description                                                                                                                             |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `--calcite-tab-content-block-padding` | [Deprecated] Use `--calcite-tab-content-space-y` instead. Specifies the block padding of the component's content in the `default` slot. |
| `--calcite-tab-content-space-y`       | Specifies the vertical space of the component's content in the `default` slot.                                                          |

## Dependencies

### Used by

- [calcite-color-picker](../color-picker)

### Graph

```mermaid
graph TD;
  calcite-color-picker --> calcite-tab
  style calcite-tab fill:#f9f,stroke:#333,stroke-width:4px
```

---

*Built with [StencilJS](https://stenciljs.com/)*
