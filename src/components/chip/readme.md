# calcite-chip

<!-- Auto Generated Below -->

## Usage

### Basic

```html
<calcite-chip value="Global" dismissible icon="globe" appearance="clear" color="green">Global</calcite-chip>
```

## Properties

| Property             | Attribute       | Description                                                                                                                                   | Type                                               | Default      |
| -------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ------------ |
| `appearance`         | `appearance`    | specify the appearance style of the button, defaults to solid.                                                                                | `"clear" \| "solid"`                               | `"solid"`    |
| `closable`           | `closable`      | When true, show abutton user can click to dismiss the chip.                                                                                   | `boolean`                                          | `false`      |
| `closed`             | `closed`        | When true, hides the chip                                                                                                                     | `boolean`                                          | `false`      |
| `color`              | `color`         | specify the color of the button, defaults to blue                                                                                             | `"blue" \| "green" \| "grey" \| "red" \| "yellow"` | `"grey"`     |
| `dismissLabel`       | `dismiss-label` | Aria label for the "x" button                                                                                                                 | `string`                                           | `TEXT.close` |
| `dismissible`        | `dismissible`   | <span style="color:red">**[DEPRECATED]**</span> use closable instead<br/><br/>Optionally show a button the user can click to dismiss the chip | `boolean`                                          | `false`      |
| `icon`               | `icon`          | Specifies an icon to display.                                                                                                                 | `string`                                           | `undefined`  |
| `iconFlipRtl`        | `icon-flip-rtl` | When true, the icon will be flipped when the element direction is right-to-left (`"rtl"`).                                                    | `boolean`                                          | `false`      |
| `scale`              | `scale`         | specify the scale of the chip, defaults to m                                                                                                  | `"l" \| "m" \| "s"`                                | `"m"`        |
| `value` _(required)_ | `value`         | The assigned value for the chip                                                                                                               | `any`                                              | `undefined`  |

## Events

| Event                | Description                                                                                                                                               | Type               |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `calciteChipDismiss` | Emitted when the dismiss button is clicked **Note:**: The `el` event payload props is deprecated, please use the event's `target`/`currentTarget` instead | `CustomEvent<any>` |

## Methods

### `setFocus() => Promise<void>`

Sets focus on the component.

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
