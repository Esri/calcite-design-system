# calcite-color-picker

<!-- Auto Generated Below -->

## Usage

### Basic

```html
<calcite-color-picker dir="ltr" scale="m" value="#b33f33"></calcite-color-picker>
```

## Properties

| Property           | Attribute           | Description                                                                                                                                                                         | Type                                                                                                                                       | Default                                                           |
| ------------------ | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| `allowEmpty`       | `allow-empty`       | When `true`, an empty color (`null`) will be allowed as a `value`. When `false`, a color value is enforced, and clearing the input or blurring will restore the last valid `value`. | `boolean`                                                                                                                                  | `false`                                                           |
| `alphaChannel`     | `alpha-channel`     | When `true`, the component will allow updates to the color's alpha value.                                                                                                           | `boolean`                                                                                                                                  | `false`                                                           |
| `channelsDisabled` | `channels-disabled` | When `true`, hides the RGB/HSV channel inputs.                                                                                                                                      | `boolean`                                                                                                                                  | `false`                                                           |
| `disabled`         | `disabled`          | When `true`, interaction is prevented and the component is displayed with lower opacity.                                                                                            | `boolean`                                                                                                                                  | `false`                                                           |
| `format`           | `format`            | The format of `value`. When `"auto"`, the format will be inferred from `value` when set.                                                                                            | `"auto" \| "hex" \| "hexa" \| "hsl" \| "hsl-css" \| "hsla" \| "hsla-css" \| "hsv" \| "hsva" \| "rgb" \| "rgb-css" \| "rgba" \| "rgba-css"` | `"auto"`                                                          |
| `hexDisabled`      | `hex-disabled`      | When `true`, hides the hex input.                                                                                                                                                   | `boolean`                                                                                                                                  | `false`                                                           |
| `hideChannels`     | `hide-channels`     | <span style="color:red">**[DEPRECATED]**</span> use `channelsDisabled` instead<br/><br/>When `true`, hides the RGB/HSV channel inputs.                                              | `boolean`                                                                                                                                  | `false`                                                           |
| `hideHex`          | `hide-hex`          | <span style="color:red">**[DEPRECATED]**</span> use `hexDisabled` instead<br/><br/>When `true`, hides the hex input.                                                                | `boolean`                                                                                                                                  | `false`                                                           |
| `hideSaved`        | `hide-saved`        | <span style="color:red">**[DEPRECATED]**</span> use `savedDisabled` instead<br/><br/>When `true`, hides the saved colors section.                                                   | `boolean`                                                                                                                                  | `false`                                                           |
| `messageOverrides` | `message-overrides` | Use this property to override individual strings used by the component.                                                                                                             | `ColorPickerMessages`                                                                                                                      | `undefined`                                                       |
| `numberingSystem`  | `numbering-system`  | Specifies the Unicode numeral system used by the component for localization.                                                                                                        | `"arab" \| "arabext" \| "latn"`                                                                                                            | `undefined`                                                       |
| `savedDisabled`    | `saved-disabled`    | When `true`, hides the saved colors section.                                                                                                                                        | `boolean`                                                                                                                                  | `false`                                                           |
| `scale`            | `scale`             | Specifies the size of the component.                                                                                                                                                | `"l" \| "m" \| "s"`                                                                                                                        | `"m"`                                                             |
| `storageId`        | `storage-id`        | Specifies the storage ID for colors.                                                                                                                                                | `string`                                                                                                                                   | `undefined`                                                       |
| `value`            | `value`             | The component's value, where the value can be a CSS color string, or a RGB, HSL or HSV object. The type will be preserved as the color is updated.                                  | `HSL \| HSL & ObjectWithAlpha \| HSV \| HSV & ObjectWithAlpha \| RGB \| RGB & ObjectWithAlpha \| string`                                   | `normalizeHex(     hexify(DEFAULT_COLOR, this.alphaChannel),   )` |

## Events

| Event                      | Description                                                                                                                                                                                                  | Type                |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- |
| `calciteColorPickerChange` | Fires when the color value has changed.                                                                                                                                                                      | `CustomEvent<void>` |
| `calciteColorPickerInput`  | Fires as the color value changes. Similar to the `calciteColorPickerChange` event with the exception of dragging. When dragging the color field or hue slider thumb, this event fires as the thumb is moved. | `CustomEvent<void>` |

## Methods

### `setFocus() => Promise<void>`

Sets focus on the component's first focusable element.

#### Returns

Type: `Promise<void>`

## Dependencies

### Depends on

- [calcite-tab-title](../tab-title)
- [calcite-tab](../tab)
- [calcite-input-number](../input-number)
- [calcite-color-picker-swatch](../color-picker-swatch)
- [calcite-color-picker-hex-input](../color-picker-hex-input)
- [calcite-tabs](../tabs)
- [calcite-tab-nav](../tab-nav)
- [calcite-button](../button)

### Graph

```mermaid
graph TD;
  calcite-color-picker --> calcite-tab-title
  calcite-color-picker --> calcite-tab
  calcite-color-picker --> calcite-input-number
  calcite-color-picker --> calcite-color-picker-swatch
  calcite-color-picker --> calcite-color-picker-hex-input
  calcite-color-picker --> calcite-tabs
  calcite-color-picker --> calcite-tab-nav
  calcite-color-picker --> calcite-button
  calcite-tab-title --> calcite-icon
  calcite-input-number --> calcite-progress
  calcite-input-number --> calcite-icon
  calcite-input-number --> calcite-input-message
  calcite-input-message --> calcite-icon
  calcite-color-picker-hex-input --> calcite-input-text
  calcite-color-picker-hex-input --> calcite-input-number
  calcite-input-text --> calcite-progress
  calcite-input-text --> calcite-icon
  calcite-input-text --> calcite-input-message
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  style calcite-color-picker fill:#f9f,stroke:#333,stroke-width:4px
```

---

*Built with [StencilJS](https://stenciljs.com/)*
