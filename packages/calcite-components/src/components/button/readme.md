# calcite-button

For comprehensive guidance on using and implementing `calcite-button`, refer to the [documentation page](https://developers.arcgis.com/calcite-design-system/components/button/).

<!-- Auto Generated Below -->

## Properties

| Property           | Attribute           | Description                                                                                                                                                                                                                                               | Type                                                                                                        | Default     |
| ------------------ | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------- |
| `alignment`        | `alignment`         | Specifies the alignment of the component's elements.                                                                                                                                                                                                      | `"center" \| "end" \| "icon-end-space-between" \| "icon-start-space-between" \| "space-between" \| "start"` | `"center"`  |
| `appearance`       | `appearance`        | Specifies the appearance style of the component.                                                                                                                                                                                                          | `"outline" \| "outline-fill" \| "solid" \| "transparent"`                                                   | `"solid"`   |
| `disabled`         | `disabled`          | When `true`, interaction is prevented and the component is displayed with lower opacity.                                                                                                                                                                  | `boolean`                                                                                                   | `false`     |
| `download`         | `download`          | Prompts the user to save the linked URL instead of navigating to it. Can be used with or without a value: Without a value, the browser will suggest a filename/extension See <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-download>. | `boolean \| string`                                                                                         | `false`     |
| `form`             | `form`              | The `id` of the form that will be associated with the component. When not set, the component will be associated with its ancestor form element, if any.                                                                                                   | `string`                                                                                                    | `undefined` |
| `href`             | `href`              | Specifies the URL of the linked resource, which can be set as an absolute or relative path.                                                                                                                                                               | `string`                                                                                                    | `undefined` |
| `iconEnd`          | `icon-end`          | Specifies an icon to display at the end of the component.                                                                                                                                                                                                 | `string`                                                                                                    | `undefined` |
| `iconFlipRtl`      | `icon-flip-rtl`     | Displays the `iconStart` and/or `iconEnd` as flipped when the element direction is right-to-left (`"rtl"`).                                                                                                                                               | `"both" \| "end" \| "start"`                                                                                | `undefined` |
| `iconStart`        | `icon-start`        | Specifies an icon to display at the start of the component.                                                                                                                                                                                               | `string`                                                                                                    | `undefined` |
| `kind`             | `kind`              | Specifies the kind of the component, which will apply to the border and background if applicable.                                                                                                                                                         | `"brand" \| "danger" \| "inverse" \| "neutral"`                                                             | `"brand"`   |
| `label`            | `label`             | Accessible name for the component.                                                                                                                                                                                                                        | `string`                                                                                                    | `undefined` |
| `loading`          | `loading`           | When `true`, a busy indicator is displayed and interaction is disabled.                                                                                                                                                                                   | `boolean`                                                                                                   | `false`     |
| `messageOverrides` | `message-overrides` | Use this property to override individual strings used by the component.                                                                                                                                                                                   | `ButtonMessages`                                                                                            | `undefined` |
| `name`             | `name`              | Specifies the name of the component on form submission.                                                                                                                                                                                                   | `string`                                                                                                    | `undefined` |
| `rel`              | `rel`               | Defines the relationship between the `href` value and the current document.                                                                                                                                                                               | `string`                                                                                                    | `undefined` |
| `round`            | `round`             | When `true`, adds a round style to the component.                                                                                                                                                                                                         | `boolean`                                                                                                   | `false`     |
| `scale`            | `scale`             | Specifies the size of the component.                                                                                                                                                                                                                      | `"l" \| "m" \| "s"`                                                                                         | `"m"`       |
| `splitChild`       | `split-child`       | Specifies if the component is a child of a `calcite-split-button`.                                                                                                                                                                                        | `"primary" \| "secondary" \| boolean`                                                                       | `false`     |
| `target`           | `target`            | Specifies where to open the linked document defined in the `href` property.                                                                                                                                                                               | `string`                                                                                                    | `undefined` |
| `type`             | `type`              | Specifies the default behavior of the component.                                                                                                                                                                                                          | `string`                                                                                                    | `"button"`  |
| `width`            | `width`             | Specifies the width of the component.                                                                                                                                                                                                                     | `"auto" \| "full" \| "half"`                                                                                | `"auto"`    |

## Methods

### `setFocus() => Promise<void>`

Sets focus on the component.

#### Returns

Type: `Promise<void>`

## Slots

| Slot | Description             |
| ---- | ----------------------- |
|      | A slot for adding text. |

## Dependencies

### Used by

- [calcite-color-picker](../color-picker)
- [calcite-fab](../fab)
- [calcite-inline-editable](../inline-editable)
- [calcite-split-button](../split-button)
- [calcite-tab-nav](../tab-nav)
- [calcite-table](../table)

### Depends on

- [calcite-loader](../loader)
- [calcite-icon](../icon)

### Graph

```mermaid
graph TD;
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  calcite-color-picker --> calcite-button
  calcite-fab --> calcite-button
  calcite-inline-editable --> calcite-button
  calcite-split-button --> calcite-button
  calcite-tab-nav --> calcite-button
  calcite-table --> calcite-button
  style calcite-button fill:#f9f,stroke:#333,stroke-width:4px
```

---

*Built with [StencilJS](https://stenciljs.com/)*
