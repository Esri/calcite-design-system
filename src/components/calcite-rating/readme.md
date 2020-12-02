# calcite-rating

<!-- Auto Generated Below -->

## Properties

| Property       | Attribute       | Description                                                                                     | Type                | Default       |
| -------------- | --------------- | ----------------------------------------------------------------------------------------------- | ------------------- | ------------- |
| `average`      | `average`       | optionally pass a cumulative average rating to display                                          | `number`            | `undefined`   |
| `count`        | `count`         | optionally pass a number of previous ratings to display                                         | `number`            | `undefined`   |
| `disabled`     | `disabled`      | is the rating component in a selectable mode                                                    | `boolean`           | `false`       |
| `displayValue` | `display-value` | display rating value                                                                            | `boolean`           | `false`       |
| `intlRating`   | `intl-rating`   | Localized string for "Rating" (used for aria label)                                             | `string`            | `TEXT.rating` |
| `intlStars`    | `intl-stars`    | Localized string for labelling each star, `${num}` in the string will be replaced by the number | `string`            | `TEXT.stars`  |
| `readOnly`     | `read-only`     | is the rating component in a selectable mode                                                    | `boolean`           | `false`       |
| `scale`        | `scale`         | specify the scale of the component, defaults to m                                               | `"l" \| "m" \| "s"` | `"m"`         |
| `theme`        | `theme`         | specify the theme of scrim, defaults to light                                                   | `"dark" \| "light"` | `undefined`   |
| `value`        | `value`         | the value of the rating component                                                               | `number`            | `0`           |

## Events

| Event                 | Description | Type               |
| --------------------- | ----------- | ------------------ |
| `calciteRatingChange` |             | `CustomEvent<any>` |

## Methods

### `setFocus() => Promise<void>`

#### Returns

Type: `Promise<void>`

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
