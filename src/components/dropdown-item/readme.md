# calcite-dropdown-item

<!-- Auto Generated Below -->

## Properties

| Property      | Attribute       | Description                                                                                                          | Type                         | Default     |
| ------------- | --------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ----------- |
| `active`      | `active`        | <span style="color:red">**[DEPRECATED]**</span> Use selected instead.<br/><br/>Indicates whether the item is active. | `boolean`                    | `false`     |
| `href`        | `href`          | optionally pass a href - used to determine if the component should render as anchor                                  | `string`                     | `undefined` |
| `iconEnd`     | `icon-end`      | Specifies an icon to display at the end of the component.                                                            | `string`                     | `undefined` |
| `iconFlipRtl` | `icon-flip-rtl` | When true, the icon will be flipped when the element direction is right-to-left (`"rtl"`).                           | `"both" \| "end" \| "start"` | `undefined` |
| `iconStart`   | `icon-start`    | Specifies an icon to display at the start of the component.                                                          | `string`                     | `undefined` |
| `label`       | `label`         | Applies to the aria-label attribute on the button or hyperlink                                                       | `string`                     | `undefined` |
| `rel`         | `rel`           | The rel attribute to apply to the hyperlink                                                                          | `string`                     | `undefined` |
| `selected`    | `selected`      | When true, item is selected                                                                                          | `boolean`                    | `false`     |
| `target`      | `target`        | The target attribute to apply to the hyperlink                                                                       | `string`                     | `undefined` |

## Methods

### `setFocus() => Promise<void>`

Sets focus on the component.

#### Returns

Type: `Promise<void>`

## Slots

| Slot | Description             |
| ---- | ----------------------- |
|      | A slot for adding text. |

## Dependencies

### Depends on

- [calcite-icon](../icon)

### Graph

```mermaid
graph TD;
  calcite-dropdown-item --> calcite-icon
  style calcite-dropdown-item fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
