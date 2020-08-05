# calcite-rating

<!-- Auto Generated Below -->

## Properties

| Property       | Attribute       | Description                                                | Type                 | Default     |
| -------------- | --------------- | ---------------------------------------------------------- | -------------------- | ----------- |
| `count`        | `count`         | specify the count of rating items, defaults to 5           | `number`             | `5`         |
| `disabled`     | `disabled`      | is the rating component in a selectable mode               | `boolean`            | `false`     |
| `displayValue` | `display-value` | display rating value                                       | `boolean`            | `false`     |
| `iconType`     | `icon-type`     | specify the icon used for the rating, defaults to star     | `"circle" \| "star"` | `"star"`    |
| `precision`    | `precision`     | the precision of the rating component - half or whole step | `"half" \| "whole"`  | `"whole"`   |
| `readOnly`     | `read-only`     | is the rating component in a selectable mode               | `boolean`            | `false`     |
| `scale`        | `scale`         | specify the scale of the component, defaults to m          | `"l" \| "m" \| "s"`  | `"m"`       |
| `theme`        | `theme`         | specify the theme of scrim, defaults to light              | `"dark" \| "light"`  | `undefined` |
| `value`        | `value`         | the value of the rating component                          | `number`             | `0`         |

## Dependencies

### Depends on

- [calcite-icon](../calcite-icon)
- [calcite-chip](../calcite-chip)

### Graph

```mermaid
graph TD;
  calcite-rating --> calcite-icon
  calcite-rating --> calcite-chip
  calcite-chip --> calcite-icon
  style calcite-rating fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
