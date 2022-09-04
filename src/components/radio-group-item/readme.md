# calcite-radio-group-item

<!-- Auto Generated Below -->

## Properties

| Property       | Attribute       | Description                                                                                                                                                                                                   | Type               | Default     |
| -------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ----------- |
| `checked`      | `checked`       | When true, the component is checked.                                                                                                                                                                          | `boolean`          | `false`     |
| `icon`         | `icon`          | <span style="color:red">**[DEPRECATED]**</span> Use either iconStart or iconEnd but do not combine them with icon & iconPosition.<br/><br/>Optionally pass an icon to display - accepts Calcite UI icon names | `string`           | `undefined` |
| `iconEnd`      | `icon-end`      | Optionally pass an icon to display at the end - accepts Calcite UI icon names                                                                                                                                 | `string`           | `undefined` |
| `iconFlipRtl`  | `icon-flip-rtl` | When true, the icon will be flipped when the element direction is right-to-left ("rtl").                                                                                                                      | `boolean`          | `false`     |
| `iconPosition` | `icon-position` | <span style="color:red">**[DEPRECATED]**</span> Use either iconStart or iconEnd but do not combine them with icon & iconPosition.<br/><br/>Optionally used with icon, select where to position the icon       | `"end" \| "start"` | `"start"`   |
| `iconStart`    | `icon-start`    | Optionally pass an icon to display at the start - accepts Calcite UI icon names                                                                                                                               | `string`           | `undefined` |
| `value`        | `value`         | The component's value.                                                                                                                                                                                        | `any`              | `undefined` |

## Dependencies

### Depends on

- [calcite-icon](../icon)

### Graph

```mermaid
graph TD;
  calcite-radio-group-item --> calcite-icon
  style calcite-radio-group-item fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
