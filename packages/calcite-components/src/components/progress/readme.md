# calcite-progress

For comprehensive guidance on using and implementing `calcite-progress`, refer to the [documentation page](https://developers.arcgis.com/calcite-design-system/components/progress/).

<!-- Auto Generated Below -->

## Properties

| Property   | Attribute  | Description                                                                                         | Type                               | Default         |
| ---------- | ---------- | --------------------------------------------------------------------------------------------------- | ---------------------------------- | --------------- |
| `label`    | `label`    | Accessible name for the component.                                                                  | `string`                           | `undefined`     |
| `reversed` | `reversed` | When `true` and for `"indeterminate"` progress bars, reverses the animation direction.              | `boolean`                          | `false`         |
| `text`     | `text`     | Text that displays under the component's indicator.                                                 | `string`                           | `undefined`     |
| `type`     | `type`     | Specifies the component type. Use `"indeterminate"` if finding actual progress value is impossible. | `"determinate" \| "indeterminate"` | `"determinate"` |
| `value`    | `value`    | When `type` is `"determinate"`, the component's progress value with a range of 0.0 - 1.0.           | `number`                           | `0`             |

## CSS Custom Properties

| Name                                  | Description                                 |
| ------------------------------------- | ------------------------------------------- |
| `--calcite-progress-background-color` | Specifies the component's background color. |
| `--calcite-progress-fill-color`       | Specifies the component's fill color.       |
| `--calcite-progress-text-color`       | Specifies the component's text color.       |

## Dependencies

### Used by

- [calcite-carousel](../carousel)
- [calcite-input](../input)
- [calcite-input-number](../input-number)
- [calcite-input-text](../input-text)

### Graph

```mermaid
graph TD;
  calcite-carousel --> calcite-progress
  calcite-input --> calcite-progress
  calcite-input-number --> calcite-progress
  calcite-input-text --> calcite-progress
  style calcite-progress fill:#f9f,stroke:#333,stroke-width:4px
```

---

*Built with [StencilJS](https://stenciljs.com/)*
