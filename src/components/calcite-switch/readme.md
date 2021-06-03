# calcite-switch

`calcite-switch` is used to toggle a value on or off.

<!-- Auto Generated Below -->

## Usage

### Basic

```html
<label> <calcite-switch switched></calcite-switch> Switch is on </label>
```

## Properties

| Property   | Attribute  | Description                        | Type                | Default     |
| ---------- | ---------- | ---------------------------------- | ------------------- | ----------- |
| `disabled` | `disabled` | True if the switch is disabled     | `boolean`           | `false`     |
| `name`     | `name`     | The name of the switch input       | `string`            | `undefined` |
| `scale`    | `scale`    | The scale of the switch            | `"l" \| "m" \| "s"` | `"m"`       |
| `switched` | `switched` | True if the switch is initially on | `boolean`           | `false`     |
| `value`    | `value`    | The value of the switch input      | `any`               | `undefined` |

## Events

| Event                 | Description                                | Type               |
| --------------------- | ------------------------------------------ | ------------------ |
| `calciteSwitchChange` | Fires when the switched value has changed. | `CustomEvent<any>` |

## Methods

### `setFocus() => Promise<void>`

#### Returns

Type: `Promise<void>`

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
