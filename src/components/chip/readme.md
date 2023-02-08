# calcite-chip

<!-- Auto Generated Below -->

## Usage

### Basic

```html
<calcite-chip value="Global" closable icon="globe" appearance="outline" kind="brand">Global</calcite-chip>
```

## Properties

| Property             | Attribute           | Description                                                                                  | Type                                     | Default     |
| -------------------- | ------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------- | ----------- |
| `appearance`         | `appearance`        | Specifies the appearance style of the component.                                             | `"outline" \| "outline-fill" \| "solid"` | `"solid"`   |
| `closable`           | `closable`          | When `true`, a close button is added to the component.                                       | `boolean`                                | `false`     |
| `closed`             | `closed`            | When `true`, hides the component.                                                            | `boolean`                                | `false`     |
| `icon`               | `icon`              | Specifies an icon to display.                                                                | `string`                                 | `undefined` |
| `iconFlipRtl`        | `icon-flip-rtl`     | When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). | `boolean`                                | `false`     |
| `kind`               | `kind`              | Specifies the kind of the component (will apply to border and background if applicable).     | `"brand" \| "inverse" \| "neutral"`      | `"neutral"` |
| `messageOverrides`   | `message-overrides` | Use this property to override individual strings used by the component.                      | `ChipMessages`                           | `undefined` |
| `scale`              | `scale`             | Specifies the size of the component.                                                         | `"l" \| "m" \| "s"`                      | `"m"`       |
| `value` _(required)_ | `value`             | The component's value.                                                                       | `any`                                    | `undefined` |

## Events

| Event              | Description                             | Type                |
| ------------------ | --------------------------------------- | ------------------- |
| `calciteChipClose` | Fires when the close button is clicked. | `CustomEvent<void>` |

## Methods

### `setFocus() => Promise<void>`

When `closable` is `true`, sets focus on the component's "close" button (the first focusable item).

#### Returns

Type: `Promise<void>`

## Slots

| Slot      | Description                 |
| --------- | --------------------------- |
|           | A slot for adding text.     |
| `"image"` | A slot for adding an image. |

## Dependencies

### Used by

- [calcite-alert](../alert)
- [calcite-combobox](../combobox)
- [calcite-rating](../rating)

### Depends on

- [calcite-icon](../icon)

### Graph

```mermaid
graph TD;
  calcite-chip --> calcite-icon
  calcite-alert --> calcite-chip
  calcite-combobox --> calcite-chip
  calcite-rating --> calcite-chip
  style calcite-chip fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
