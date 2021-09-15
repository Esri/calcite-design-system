# calcite-rating

<!-- Auto Generated Below -->

## Usage

### Basic

```html
<calcite-rating
  show-chip
  scale="m"
  value="0"
  average="4.4"
  count="10"
  intl-rating="Rating"
  intl-stars="Rating"
></calcite-rating>
```

## Properties

| Property     | Attribute     | Description                                                                                     | Type                | Default       |
| ------------ | ------------- | ----------------------------------------------------------------------------------------------- | ------------------- | ------------- |
| `average`    | `average`     | optionally pass a cumulative average rating to display                                          | `number`            | `undefined`   |
| `count`      | `count`       | optionally pass a number of previous ratings to display                                         | `number`            | `undefined`   |
| `disabled`   | `disabled`    | is the rating component in a selectable mode                                                    | `boolean`           | `false`       |
| `intlRating` | `intl-rating` | Localized string for "Rating" (used for aria label)                                             | `string`            | `TEXT.rating` |
| `intlStars`  | `intl-stars`  | Localized string for labelling each star, `${num}` in the string will be replaced by the number | `string`            | `TEXT.stars`  |
| `readOnly`   | `read-only`   | is the rating component in a selectable mode                                                    | `boolean`           | `false`       |
| `scale`      | `scale`       | specify the scale of the component, defaults to m                                               | `"l" \| "m" \| "s"` | `"m"`         |
| `showChip`   | `show-chip`   | Show average and count data summary chip (if available)                                         | `boolean`           | `false`       |
| `value`      | `value`       | the value of the rating component                                                               | `number`            | `0`           |

## Events

| Event                 | Description                              | Type                              |
| --------------------- | ---------------------------------------- | --------------------------------- |
| `calciteRatingChange` | Fires when the rating value has changed. | `CustomEvent<{ value: number; }>` |

## Methods

### `setFocus() => Promise<void>`

Sets focus on the component.

#### Returns

Type: `Promise<void>`

## CSS Custom Properties

| Name                            | Description                                              |
| ------------------------------- | -------------------------------------------------------- |
| `--calcite-rating-spacing-unit` | the amount of left/right margin between each rating star |

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
