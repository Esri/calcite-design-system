# calcite-switch

`calcite-switch` is used to toggle a value on or off.

<!-- Auto Generated Below -->

## Properties

| Property   | Attribute  | Description                        | Type                | Default     |
| ---------- | ---------- | ---------------------------------- | ------------------- | ----------- |
| `disabled` | `disabled` | True if the switch is disabled     | `boolean`           | `false`     |
| `name`     | `name`     | The name of the checkbox input     | `string`            | `""`        |
| `scale`    | `scale`    | The scale of the switch            | `"l" \| "m" \| "s"` | `"m"`       |
| `switched` | `switched` | True if the switch is initially on | `boolean`           | `false`     |
| `theme`    | `theme`    | The component's theme.             | `"dark" \| "light"` | `undefined` |
| `value`    | `value`    | The value of the checkbox input    | `string`            | `""`        |

## Events

| Event                 | Description | Type               |
| --------------------- | ----------- | ------------------ |
| `calciteSwitchChange` |             | `CustomEvent<any>` |

## Dependencies

### Used by

- [calcite-block-section](../calcite-block-section)

### Graph

```mermaid
graph TD;
  calcite-block-section --> calcite-switch
  style calcite-switch fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
