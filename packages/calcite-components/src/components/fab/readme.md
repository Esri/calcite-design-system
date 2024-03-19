# calcite-fab

<!-- Auto Generated Below -->

## Usage

### Basic

Renders a `calcite-fab` that displays only an icon and a tooltip label.

```html
<calcite-fab label="Performs my custom action"></calcite-fab>
```

### Loading-and-disabled

Renders a `calcite-fab` that is `loading` and `disabled`.

```html
<calcite-fab loading disabled></calcite-fab>
```

### Styling

Configure styling for a `calcite-fab` to fit your UI and branding with the `appearance` and `kind` attributes/properties:

```html
<calcite-fab appearance="outline-fill" kind="danger" icon="trash" label="Remove layer"></calcite-fab>
```

### With-text

Renders a `calcite-fab` that displays text alongside an icon.

```html
<calcite-fab label="Performs my custom action" text="Perform Action!" text-enabled></calcite-fab>
```

## Properties

| Property      | Attribute       | Description                                                                                  | Type                                            | Default      |
| ------------- | --------------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------- | ------------ |
| `appearance`  | `appearance`    | Specifies the appearance style of the component.                                             | `"outline-fill" \| "solid"`                     | `"solid"`    |
| `disabled`    | `disabled`      | When `true`, interaction is prevented and the component is displayed with lower opacity.     | `boolean`                                       | `false`      |
| `icon`        | `icon`          | Specifies an icon to display.                                                                | `string`                                        | `ICONS.plus` |
| `iconFlipRtl` | `icon-flip-rtl` | When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). | `boolean`                                       | `false`      |
| `kind`        | `kind`          | Specifies the kind of the component, which will apply to border and background.              | `"brand" \| "danger" \| "inverse" \| "neutral"` | `"brand"`    |
| `label`       | `label`         | Accessible name for the component.                                                           | `string`                                        | `undefined`  |
| `loading`     | `loading`       | When `true`, a busy indicator is displayed.                                                  | `boolean`                                       | `false`      |
| `scale`       | `scale`         | Specifies the size of the component.                                                         | `"l" \| "m" \| "s"`                             | `"m"`        |
| `text`        | `text`          | Specifies text to accompany the component's icon.                                            | `string`                                        | `undefined`  |
| `textEnabled` | `text-enabled`  | When `true`, displays the `text` value in the component.                                     | `boolean`                                       | `false`      |

## Methods

### `setFocus() => Promise<void>`

Sets focus on the component.

#### Returns

Type: `Promise<void>`

## Dependencies

### Depends on

- [calcite-button](../button)

### Graph

```mermaid
graph TD;
  calcite-fab --> calcite-button
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  style calcite-fab fill:#f9f,stroke:#333,stroke-width:4px
```

---

*Built with [StencilJS](https://stenciljs.com/)*
